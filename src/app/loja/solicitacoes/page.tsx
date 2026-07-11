import Link from "next/link";
import { AlertTriangle, ClipboardList, FileText, Inbox, Plus, Send, Upload, UserCheck } from "lucide-react";
import { createServiceRequestAction } from "@/app/actions";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { number, vehicleName } from "@/lib/calculations";
import type { PremiumPriority, PremiumRequest, PremiumRequestStatus } from "@/lib/domain";
import { getAppSession } from "@/lib/auth/session";
import { todayInJapan } from "@/lib/dates";
import { normalizeLocale, translator } from "@/lib/i18n";
import { getStoreRequests } from "@/lib/repositories/requests";
import { getStoreVehicles } from "@/lib/repositories/vehicles";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; request?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  created: { text: "Solicitacao criada com sucesso.", success: true },
  "demo-validated": { text: "Solicitacao validada no modo demo. Entre com uma conta real para gravar no Supabase.", success: true },
  "missing-fields": { text: "Informe assunto e detalhes da solicitacao." },
  "create-error": { text: "Nao consegui criar a solicitacao agora. Confira login, loja e permissao." }
};

const serviceTypes = [
  "Servico diverso / a decidir",
  "Cadastro de carro",
  "Completar dados por fotos",
  "Revisao de anuncio",
  "Publicacao em redes",
  "Documento / transferencia",
  "Preparacao / reparo",
  "Custo / financeiro",
  "Venda / entrega",
  "Suporte do sistema",
  "Plano / limite",
  "Outro"
];

const statusLabels: Record<PremiumRequestStatus, string> = {
  received: "Recebida",
  in_review: "Em analise",
  missing_information: "Faltando info",
  registering: "Em execucao",
  published: "Concluida",
  cancelled: "Cancelada"
};

const priorityLabels: Record<PremiumPriority, string> = {
  low: "Baixa",
  normal: "Normal",
  high: "Alta"
};

const boardGroups: Array<{ title: string; statuses: PremiumRequestStatus[] }> = [
  { title: "Entrada", statuses: ["received"] },
  { title: "Andamento", statuses: ["in_review", "registering"] },
  { title: "Faltando info", statuses: ["missing_information"] },
  { title: "Fechadas", statuses: ["published", "cancelled"] }
];

function extractServiceType(notes: string) {
  const line = notes
    .split("\n")
    .map((item) => item.trim())
    .find((item) => item.toLowerCase().startsWith("tipo:"));

  return line ? line.replace(/^Tipo:\s*/i, "").replace(/\.$/, "") : "Servico diverso / a decidir";
}

function requestDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", { timeZone: "Asia/Tokyo" });
}

function requestRows(requests: PremiumRequest[], statuses: PremiumRequestStatus[]) {
  return requests.filter((request) => statuses.includes(request.status));
}

function RequestCard({ request }: { request: PremiumRequest }) {
  return (
    <article className={`request-row priority-${request.priority}`}>
      <div className="request-row-head">
        <strong>{request.vehicleName}</strong>
        <span className={`badge badge-${request.status.replaceAll("_", "-")}`}>{statusLabels[request.status]}</span>
      </div>
      <div className="request-meta">
        <span>{extractServiceType(request.notes)}</span>
        <span>Prioridade {priorityLabels[request.priority]}</span>
        <span>{requestDate(request.createdAt)}</span>
      </div>
      <p>{request.notes || "Sem detalhes adicionais."}</p>
      <div className="request-owner">
        <UserCheck size={15} />
        <span>{request.assignedTo ? "Responsavel definido" : "Aguardando responsavel"}</span>
      </div>
    </article>
  );
}

export default async function StoreRequestsPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = await getAppSession(params.role, params.store || "store-1");
  const storeId = session.store?.id || "store-1";
  const [requests, vehicles] = await Promise.all([getStoreRequests(storeId), getStoreVehicles(storeId)]);
  const openRequests = requests.filter((request) => !["published", "cancelled"].includes(request.status));
  const highPriority = openRequests.filter((request) => request.priority === "high");
  const missingInfo = requests.filter((request) => request.status === "missing_information");
  const completed = requests.filter((request) => ["published", "cancelled"].includes(request.status));
  const message = params.request ? messages[params.request] : null;

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/solicitacoes"
      title={t("requests")}
      subtitle="Pedidos de servicos, suporte operacional, cadastro, documentos, anuncios e demandas ainda a definir."
      actions={
        <Link className="button secondary" href={`/loja/entrada?locale=${locale}`}>
          <Plus size={17} /> {t("vehicleIntake")}
        </Link>
      }
    >
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}

      <div className="metric-grid">
        <MetricCard label="Abertas" value={number(openRequests.length)} detail="recebidas ou em execucao" icon={Inbox} tone={openRequests.length ? "warning" : "success"} />
        <MetricCard label="Alta prioridade" value={number(highPriority.length)} detail="precisam atencao" icon={AlertTriangle} tone={highPriority.length ? "danger" : "success"} />
        <MetricCard label="Faltando info" value={number(missingInfo.length)} detail="aguardando loja" icon={FileText} tone={missingInfo.length ? "warning" : "success"} />
        <MetricCard label="Fechadas" value={number(completed.length)} detail="concluidas ou canceladas" icon={ClipboardList} tone="success" />
      </div>

      <div className="requests-layout">
        <section className="panel request-form-panel">
          <div className="panel-head">
            <h2>Nova solicitacao</h2>
            <Upload size={18} />
          </div>
          <form action={createServiceRequestAction} className="form-grid request-form">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="storeId" value={storeId} />
            <label className="wide">
              Tipo de servico
              <select name="serviceType" defaultValue="Servico diverso / a decidir">
                {serviceTypes.map((serviceType) => (
                  <option key={serviceType} value={serviceType}>
                    {serviceType}
                  </option>
                ))}
              </select>
            </label>
            <label className="wide">
              Assunto
              <input name="subject" placeholder="Ex: Verificar documento antes da transferencia" required />
            </label>
            <label>
              Prioridade
              <select name="priority" defaultValue="normal">
                <option value="low">Baixa</option>
                <option value="normal">Normal</option>
                <option value="high">Alta</option>
              </select>
            </label>
            <label>
              Prazo desejado
              <input name="desiredDate" type="date" min={todayInJapan()} />
            </label>
            <label className="wide">
              Referencia livre
              <input name="vehicleLabel" list="vehicle-options" placeholder="Carro, placa, cliente ou sem vinculo" />
              <datalist id="vehicle-options">
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={`${vehicleName(vehicle)} - ${vehicle.plate}`} />
                ))}
              </datalist>
            </label>
            <label className="wide">
              Contato preferido
              <input name="contactPreference" placeholder="WhatsApp, telefone, email ou sem preferencia" />
            </label>
            <label className="wide">
              Detalhes
              <textarea name="details" placeholder="Descreva o pedido, arquivos existentes, pendencias, links ou decisao que precisa ser tomada." required />
            </label>
            <button className="button" type="submit">
              <Send size={17} /> Enviar solicitacao
            </button>
          </form>
        </section>

        <section className="panel request-board-panel">
          <div className="panel-head">
            <h2>Fila de atendimento</h2>
            <span className="source-pill">{number(requests.length)} registros</span>
          </div>
          <div className="request-board">
            {boardGroups.map((group) => {
              const rows = requestRows(requests, group.statuses);
              return (
                <div className="request-stage" key={group.title}>
                  <div className="request-stage-head">
                    <strong>{group.title}</strong>
                    <span>{number(rows.length)}</span>
                  </div>
                  <div className="request-stage-list">
                    {rows.map((request) => (
                      <RequestCard key={request.id} request={request} />
                    ))}
                    {rows.length === 0 ? <div className="sales-empty">Sem solicitacoes nesta etapa.</div> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Todas as solicitacoes</h2>
          <StatusBadge type="plain" value="servicos diversos" />
        </div>
        <div className="table-wrap">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Assunto</th>
                <th>Tipo</th>
                <th>{t("status")}</th>
                <th>Prioridade</th>
                <th>Criada em</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <strong>{request.vehicleName}</strong>
                    <span>{request.notes}</span>
                  </td>
                  <td>{extractServiceType(request.notes)}</td>
                  <td>{statusLabels[request.status]}</td>
                  <td>{priorityLabels[request.priority]}</td>
                  <td>{requestDate(request.createdAt)}</td>
                </tr>
              ))}
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={5}>Nenhuma solicitacao criada nesta loja ainda.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
