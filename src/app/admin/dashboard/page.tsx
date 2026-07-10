import { AlertTriangle, Car, FileText, JapaneseYen, Plus, Store, Upload, Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getDemoSession } from "@/lib/auth/session";
import { number, yen } from "@/lib/calculations";
import { normalizeLocale, planLabels, translator } from "@/lib/i18n";
import { getAdminDashboard } from "@/lib/repositories/dashboard";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string }>;
};

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = getDemoSession(params.role || "admin", params.store || "store-1");
  const dashboard = await getAdminDashboard();

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/admin/dashboard"
      title={t("adminDashboard")}
      subtitle="Visao global de lojas, receita, planos e operacao premium."
      actions={
        <>
          <Link className="button secondary" href={`/admin/lojas/nova?locale=${locale}`}>
            <Store size={17} /> {t("createStore")}
          </Link>
          <Link className="button" href={`/admin/cadastros-assistidos?locale=${locale}`}>
            <Plus size={17} /> {t("registerCar")}
          </Link>
        </>
      }
    >
      <div className="metric-grid admin">
        <MetricCard label={t("activeStores")} value={dashboard.activeStores.length} detail="inclui trial" icon={Store} tone="success" />
        <MetricCard label={t("blockedStores")} value={dashboard.blockedStores.length} detail="inadimplentes ou bloqueadas" icon={AlertTriangle} tone="danger" />
        <MetricCard label="Starter" value={dashboard.stores.filter((store) => store.plan === "starter").length} detail={t("plans")} icon={FileText} />
        <MetricCard label="Pro" value={dashboard.stores.filter((store) => store.plan === "pro").length} detail={t("plans")} icon={FileText} />
        <MetricCard label="Premium" value={dashboard.stores.filter((store) => store.plan === "premium_operational").length} detail="operational" icon={Upload} tone="warning" />
        <MetricCard label={t("monthlyRevenue")} value={yen(dashboard.monthlyRevenue)} detail="MRR demo" icon={JapaneseYen} tone="success" />
        <MetricCard label={t("carsThisMonth")} value={number(dashboard.carsThisMonth)} detail="registrados" icon={Car} />
        <MetricCard label={t("premiumPending")} value={dashboard.pendingPremium.length} detail="solicitacoes abertas" icon={Users} tone="warning" />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Lojas e receita</h2>
            <Link className="button small" href={`/admin/lojas?locale=${locale}`}>
              {t("open")}
            </Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t("stores")}</th>
                  <th>{t("plans")}</th>
                  <th>{t("status")}</th>
                  <th>{t("carsThisMonth")}</th>
                  <th>{t("monthlyRevenue")}</th>
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
                    <td>{store.carsThisMonth}</td>
                    <td>{yen(store.monthlyRevenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <h2>Premium</h2>
            <Upload size={18} />
          </div>
          <div className="list">
            {dashboard.pendingPremium.concat(dashboard.publishedPremium).map((request) => (
              <div className="list-row" key={request.id}>
                <div>
                  <strong>{request.vehicleName}</strong>
                  <span>{request.storeId} · {request.priority}</span>
                </div>
                <StatusBadge type="plain" value={request.status.replaceAll("_", " ")} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
