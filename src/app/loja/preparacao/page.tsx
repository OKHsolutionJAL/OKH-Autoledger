import Link from "next/link";
import { AlertTriangle, CalendarClock, CheckCircle2, CircleDot, Plus, Wrench } from "lucide-react";
import { createPreparationTaskAction, updatePreparationTaskStatusAction } from "@/app/actions";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getAppSession } from "@/lib/auth/session";
import { daysInStock, number, vehicleName, yen } from "@/lib/calculations";
import type { ChecklistItem, ChecklistStatus, Vehicle } from "@/lib/domain";
import { normalizeLocale, translator } from "@/lib/i18n";
import { getPreparationItems } from "@/lib/repositories/preparation";
import { getStoreVehicles } from "@/lib/repositories/vehicles";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; prep?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  created: { text: "Tarefa de preparacao criada com sucesso.", success: true },
  updated: { text: "Status da tarefa atualizado.", success: true },
  "demo-validated": { text: "Fluxo validado no modo demo. Entre com uma conta real para gravar no Supabase.", success: true },
  "missing-fields": { text: "Escolha um carro e informe o nome da tarefa." },
  "create-error": { text: "Nao consegui criar a tarefa. Confira login, loja e permissoes." },
  "update-error": { text: "Nao consegui atualizar esta tarefa agora." }
};

const statusLabels: Record<ChecklistStatus, string> = {
  pending: "Pendente",
  in_progress: "Em andamento",
  completed: "Concluida",
  cancelled: "Cancelada"
};

const categories = ["Shaken", "Mecanica", "Pintura", "Limpeza", "Fotos", "Anuncio", "Documentos", "Entrega"];

function isLate(item: ChecklistItem) {
  return item.status !== "completed" && item.status !== "cancelled" && new Date(`${item.dueDate}T23:59:00+09:00`) < new Date();
}

function vehicleMap(vehicles: Vehicle[]) {
  return new Map(vehicles.map((vehicle) => [vehicle.id, vehicle]));
}

function TaskAction({
  item,
  locale,
  status,
  label
}: {
  item: ChecklistItem;
  locale: string;
  status: ChecklistStatus;
  label: string;
}) {
  return (
    <form action={updatePreparationTaskStatusAction}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="taskId" value={item.id} />
      <input type="hidden" name="vehicleId" value={item.vehicleId} />
      <input type="hidden" name="status" value={status} />
      <button className="button small secondary" type="submit">
        {label}
      </button>
    </form>
  );
}

function PreparationTaskCard({ item, vehicle, locale }: { item: ChecklistItem; vehicle?: Vehicle; locale: string }) {
  return (
    <article className={`task-card ${isLate(item) ? "is-late" : ""}`}>
      <div className="task-card-head">
        <div>
          <strong>{item.name}</strong>
          <span>{vehicle ? `${vehicleName(vehicle)} - ${vehicle.plate}` : "Carro nao encontrado"}</span>
        </div>
        <span className={`badge badge-${item.status.replaceAll("_", "-")}`}>{statusLabels[item.status]}</span>
      </div>
      <div className="task-meta">
        <span>{item.category}</span>
        <span>{item.dueDate}</span>
        <span>{yen(item.actualValue || item.estimatedValue)}</span>
      </div>
      {item.notes ? <p>{item.notes}</p> : null}
      <div className="task-actions">
        {item.status === "pending" ? <TaskAction item={item} locale={locale} status="in_progress" label="Iniciar" /> : null}
        {item.status !== "completed" && item.status !== "cancelled" ? <TaskAction item={item} locale={locale} status="completed" label="Concluir" /> : null}
        {item.status !== "cancelled" && item.status !== "completed" ? <TaskAction item={item} locale={locale} status="cancelled" label="Cancelar" /> : null}
      </div>
    </article>
  );
}

export default async function PreparationPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = await getAppSession(params.role, params.store || "store-1");
  const storeId = session.store?.id || "store-1";
  const [vehicles, items] = await Promise.all([getStoreVehicles(storeId), getPreparationItems(storeId)]);
  const carsById = vehicleMap(vehicles);
  const activeItems = items.filter((item) => item.status !== "completed" && item.status !== "cancelled");
  const completedItems = items.filter((item) => item.status === "completed");
  const lateItems = items.filter(isLate);
  const inProgress = items.filter((item) => item.status === "in_progress");
  const progress = items.length ? Math.round((completedItems.length / items.length) * 100) : 0;
  const message = params.prep ? messages[params.prep] : null;

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/preparacao"
      title={t("preparation")}
      subtitle="Checklist operacional para deixar cada carro pronto para venda, anuncio ou entrega."
      actions={
        <Link className="button secondary" href={`/loja/entrada?locale=${locale}`}>
          <Plus size={17} /> {t("newCar")}
        </Link>
      }
    >
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}

      <div className="metric-grid">
        <MetricCard label="Pendentes" value={number(activeItems.length)} detail="tarefas abertas" icon={CircleDot} tone={activeItems.length ? "warning" : "success"} />
        <MetricCard label="Em andamento" value={number(inProgress.length)} detail="preparacao ativa" icon={Wrench} />
        <MetricCard label="Atrasadas" value={number(lateItems.length)} detail="prazo vencido" icon={AlertTriangle} tone={lateItems.length ? "danger" : "success"} />
        <MetricCard label="Concluidas" value={`${progress}%`} detail={`${completedItems.length}/${items.length || 0} tarefas`} icon={CheckCircle2} tone="success" />
      </div>

      <div className="content-grid prep-layout">
        <section className="panel">
          <div className="panel-head">
            <h2>Quadro de preparacao</h2>
            <span className="source-pill">{items.length} tarefas</span>
          </div>
          <div className="prep-progress">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="task-board">
            {items.map((item) => (
              <PreparationTaskCard key={item.id} item={item} vehicle={carsById.get(item.vehicleId)} locale={locale} />
            ))}
            {items.length === 0 ? <div className="auth-alert">Nenhuma tarefa de preparacao ainda. Crie a primeira atividade no formulario ao lado.</div> : null}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Nova atividade</h2>
            <CalendarClock size={18} />
          </div>
          <form action={createPreparationTaskAction} className="form-grid prep-form">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="storeId" value={storeId} />
            <label className="wide">
              Carro
              <select name="vehicleId" required>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicleName(vehicle)} - {vehicle.plate} - {daysInStock(vehicle)} dias
                  </option>
                ))}
              </select>
            </label>
            <label className="wide">
              Atividade
              <input name="name" placeholder="Ex: Fazer shaken" required />
            </label>
            <label>
              Categoria
              <select name="category" defaultValue="Shaken">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Prazo
              <input name="dueDate" type="date" />
            </label>
            <label className="wide">
              Custo previsto
              <input name="estimatedValue" type="number" placeholder="0" />
            </label>
            <label className="wide">
              Observacoes
              <textarea name="notes" placeholder="Detalhes da preparacao, responsavel ou fornecedor." />
            </label>
            <button className="button" type="submit" disabled={vehicles.length === 0}>
              <Plus size={17} /> Criar tarefa
            </button>
          </form>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Carros em preparacao</h2>
          <Wrench size={18} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{t("vehicle")}</th>
                <th>{t("status")}</th>
                <th>Tarefas abertas</th>
                <th>Concluidas</th>
                <th>{t("days")}</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => {
                const vehicleItems = items.filter((item) => item.vehicleId === vehicle.id);
                const open = vehicleItems.filter((item) => item.status !== "completed" && item.status !== "cancelled").length;
                const done = vehicleItems.filter((item) => item.status === "completed").length;
                return (
                  <tr key={vehicle.id}>
                    <td>
                      <strong>{vehicleName(vehicle)}</strong>
                      <span>{vehicle.plate}</span>
                    </td>
                    <td>
                      <StatusBadge type="vehicle" value={vehicle.status} locale={locale} />
                    </td>
                    <td>{open}</td>
                    <td>{done}</td>
                    <td>{daysInStock(vehicle)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
