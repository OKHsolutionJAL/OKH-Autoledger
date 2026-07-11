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
  missing_information: "Aguardando info",
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
  { title: "Recebidas", statuses: ["received"] },
  { title: "Em andamento", statuses: ["in_review", "registering"] },
  { title: "Aguardando informações", statuses: ["missing_information"] },
  { title: "Concluídas", statuses: ["published", "cancelled"] }
];

const noteLabels = ["Tipo", "Carro vinculado", "Prazo desejado", "Contato preferido", "Pedido"];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractNoteField(notes: string, label: string) {
  const nextLabels = noteLabels.filter((item) => item !== label).map(escapeRegex).join("|");
  const pattern = new RegExp(`${escapeRegex(label)}:\\s*([\\s\\S]*?)(?=(?:\\n|\\.\\s+)(?:${nextLabels}):|$)`, "i");
  const match = notes.match(pattern);

  return match?.[1]?.trim().replace(/\.$/, "") || "";
}

function extractServiceType(notes: string) {
  return extractNoteField(notes, "Tipo") || "Servico diverso / a decidir";
}

function formatDueDate(value: string) {
  if (!value) {
    return "Sem prazo";
  }

  const parts = value.split("-");

  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return value;
}

function requestDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", { timeZone: "Asia/Tokyo" });
}

function requestRows(requests: PremiumRequest[], statuses: PremiumRequestStatus[]) {
  return requests.filter((request) => statuses.includes(request.status));
}

function RequestCard({ request }: { request: PremiumRequest }) {
  const serviceType = extractServiceType(request.notes);
  const vehicleLabel = extractNoteField(request.notes, "Carro vinculado") || "Sem vinculo direto";
  const dueDate = formatDueDate(extractNoteField(request.notes, "Prazo desejado"));
  const description = extractNoteField(request.notes, "Pedido") || request.notes || "Sem detalhes adicionais.";

  return (
    <article className={`request-row priority-${request.priority}`}>
      <div className="request-status-line">
        <span className={`badge badge-${request.status.replaceAll("_", "-")}`}>{statusLabels[request.status]}</span>
      </div>

      <h3 className="request-title">{request.vehicleName}</h3>

      <div className="request-vehicle">
        <span>Veiculo</span>
        <strong>{vehicleLabel}</strong>
      </div>

      <p className="request-description">{description}</p>

      <div className="request-facts">
        <div>
          <span>Prioridade</span>
          <strong>{priorityLabels[request.priority]}</strong>
        </div>
        <div>
          <span>Prazo</span>
          <strong>{dueDate}</strong>
        </div>
      </div>

      <div className="request-type">
        <span>Tipo</span>
        <strong>{serviceType}</strong>
      </div>

      <details className="request-details">
        <summary>Abrir solicitação</summary>
        <div className="request-details-body">
          <strong>{request.vehicleName}</strong>
          <p>{request.notes || "Sem detalhes adicionais."}</p>
          <div className="request-owner">
            <UserCheck size={15} />
            <span>{request.assignedTo ? "Responsavel definido" : "Aguardando responsavel"}</span>
          </div>
          <span>Criada em {requestDate(request.createdAt)}</span>
        </div>
      </details>
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
                    {rows.length === 0 ? <div className="request-empty">Nenhuma solicitação nesta etapa.</div> : null}
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
