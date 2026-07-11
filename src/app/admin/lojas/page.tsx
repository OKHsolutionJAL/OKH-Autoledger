import { AlertTriangle, Building2, Car, Crown, Plus, Store, Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getAppSession } from "@/lib/auth/session";
import { number, yen } from "@/lib/calculations";
import { normalizeLocale, planLabels, translator } from "@/lib/i18n";
import { getAdminStores } from "@/lib/repositories/stores";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; stores?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  created: { text: "Loja criada no Supabase com sucesso.", success: true },
  "demo-validated": {
    text: "Formulario validado. Entre com um Admin Master real para gravar a loja no Supabase.",
    success: true
  }
};

export default async function AdminStoresPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = await getAppSession(params.role || "admin", params.store || "store-1");
  const dashboard = await getAdminStores();
  const message = params.stores ? messages[params.stores] : null;

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/admin/lojas"
      title={t("stores")}
      subtitle="Controle das lojas, planos, limites e status operacional."
      actions={
        <Link className="button" href={`/admin/lojas/nova?locale=${locale}`}>
          <Plus size={17} /> {t("createStore")}
        </Link>
      }
    >
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}
      {dashboard.source === "demo" ? (
        <div className="auth-alert">Mostrando dados demo. Quando entrar como Admin Master real, esta tela passa a listar as lojas do Supabase.</div>
      ) : null}

      <div className="metric-grid admin">
        <MetricCard label={t("activeStores")} value={dashboard.activeStores.length} detail="ativas + trial" icon={Store} tone="success" />
        <MetricCard label={t("blockedStores")} value={dashboard.blockedStores.length} detail="bloqueadas ou vencidas" icon={AlertTriangle} tone="danger" />
        <MetricCard label="Trial" value={dashboard.trialStores.length} detail="lojas em teste" icon={Users} tone="warning" />
        <MetricCard label="Premium" value={dashboard.premiumStores.length} detail="entrada premium" icon={Crown} />
        <MetricCard label="Limite total" value={number(dashboard.totalCarLimit)} detail="capacidade de estoque" icon={Car} />
        <MetricCard label={t("monthlyRevenue")} value={yen(dashboard.monthlyRevenue)} detail={dashboard.source === "demo" ? "demo" : "em breve via payments"} icon={Building2} />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Lojas cadastradas</h2>
            <span className="source-pill">{dashboard.source === "supabase" ? "Supabase" : "Demo"}</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t("stores")}</th>
                  <th>{t("plans")}</th>
                  <th>{t("status")}</th>
                  <th>Dono</th>
                  <th>Limite</th>
                  <th>Premium</th>
                  <th>Contato</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.stores.map((store) => (
                  <tr key={store.id}>
                    <td>
                      <strong>{store.name}</strong>
                      <span>{store.storeCode}</span>
                    </td>
                    <td>{planLabels[store.plan]}</td>
                    <td>
                      <StatusBadge type="store" value={store.status} locale={locale} />
                    </td>
                    <td>
                      <strong>{store.ownerName}</strong>
                      <span>{store.address || "Sem endereco"}</span>
                    </td>
                    <td>{store.carLimit ? number(store.carLimit) : "Ilimitado"}</td>
                    <td>{store.premiumEntryEnabled ? "Ativo" : "Nao"}</td>
                    <td>
                      <strong>{store.email}</strong>
                      <span>{store.phone || "Sem telefone"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Resumo operacional</h2>
            <Store size={18} />
          </div>
          <div className="list">
            <div className="list-row">
              <div>
                <strong>Fonte de dados</strong>
                <span>{dashboard.source === "supabase" ? "Banco conectado" : "Fallback demo"}</span>
              </div>
              <StatusBadge type="plain" value={dashboard.source} />
            </div>
            <div className="list-row">
              <div>
                <strong>Lojas ativas</strong>
                <span>Podem operar estoque e custos</span>
              </div>
              <strong>{dashboard.activeStores.length}</strong>
            </div>
            <div className="list-row">
              <div>
                <strong>Atenção</strong>
                <span>Overdue ou bloqueadas</span>
              </div>
              <strong>{dashboard.blockedStores.length}</strong>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
