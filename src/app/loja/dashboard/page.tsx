import { AlertTriangle, Car, CheckCircle2, JapaneseYen, LineChart, Plus, Upload, Wrench } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { daysInStock, number, totals, vehicleName, yen } from "@/lib/calculations";
import { getDemoSession } from "@/lib/auth/session";
import { normalizeLocale, translator } from "@/lib/i18n";
import { getStoreDashboard } from "@/lib/repositories/dashboard";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string }>;
};

export default async function StoreDashboardPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = getDemoSession(params.role, params.store || "store-1");
  const storeId = session.store?.id || "store-1";
  const dashboard = await getStoreDashboard(storeId);
  const recent = dashboard.cars.slice(0, 4);

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/dashboard"
      title={t("storeDashboard")}
      subtitle="Stock, margem, preparacao e alertas operacionais com store_id isolado."
      actions={
        <>
          <Link className="button secondary" href={`/loja/custos?locale=${locale}`}>
            <JapaneseYen size={17} /> {t("addCost")}
          </Link>
          <Link className="button" href={`/loja/entrada?locale=${locale}`}>
            <Plus size={17} /> {t("newCar")}
          </Link>
        </>
      }
    >
      <div className="quick-actions">
        <Link className="button" href={`/loja/entrada?locale=${locale}`}>
          <Plus size={17} /> {t("newCar")}
        </Link>
        <Link className="button secondary" href={`/loja/custos?locale=${locale}`}>
          <JapaneseYen size={17} /> {t("addCost")}
        </Link>
        <Link className="button secondary" href={`/loja/preparacao?locale=${locale}`}>
          <CheckCircle2 size={17} /> Checklist
        </Link>
        <Link className="button secondary" href={`/loja/solicitacoes?locale=${locale}`}>
          <Upload size={17} /> Premium
        </Link>
      </div>

      <div className="metric-grid">
        <MetricCard label={t("inStock")} value={number(dashboard.active.length)} detail="store_id atual" icon={Car} />
        <MetricCard label={t("totalInvestment")} value={yen(dashboard.investment)} detail="compra + custos reais" icon={JapaneseYen} />
        <MetricCard label={t("estimatedProfit")} value={yen(dashboard.predictedProfit)} detail="preco anunciado" icon={LineChart} tone={dashboard.predictedProfit >= 0 ? "success" : "danger"} />
        <MetricCard label={t("realizedProfit")} value={yen(dashboard.realizedProfit)} detail={`${dashboard.soldMonth.length} saida(s)`} icon={CheckCircle2} tone="success" />
        <MetricCard label={t("inPreparation")} value={dashboard.inPreparation} detail="entrada, pecas ou shaken" icon={Wrench} tone="warning" />
        <MetricCard label={t("readyForSale")} value={dashboard.ready} detail="pronto ou anunciado" icon={Car} tone="success" />
        <MetricCard label={t("carsAtLoss")} value={dashboard.loss} detail="previsto ou real negativo" icon={AlertTriangle} tone={dashboard.loss ? "danger" : undefined} />
        <MetricCard label={t("stuck60")} value={dashboard.stuck} detail="giro de estoque" icon={AlertTriangle} tone={dashboard.stuck ? "warning" : undefined} />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>{t("recentCars")}</h2>
            <Link href={`/loja/carros?locale=${locale}`} className="button small secondary">
              {t("open")}
            </Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t("vehicle")}</th>
                  <th>{t("status")}</th>
                  <th>{t("actual")}</th>
                  <th>{t("advertised")}</th>
                  <th>{t("profit")}</th>
                  <th>{t("days")}</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((vehicle) => {
                  const total = totals(vehicle);
                  const result = total.actualProfit ?? total.estimatedProfit;
                  return (
                    <tr key={vehicle.id}>
                      <td>
                        <strong>{vehicleName(vehicle)}</strong>
                        <span>{vehicle.plate}</span>
                      </td>
                      <td>
                        <StatusBadge type="vehicle" value={vehicle.status} locale={locale} />
                      </td>
                      <td>{yen(total.actualTotalInvestment)}</td>
                      <td>{yen(vehicle.advertisedPrice)}</td>
                      <td className={result >= 0 ? "profit" : "loss"}>{yen(result)}</td>
                      <td>{daysInStock(vehicle)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>{t("alerts")}</h2>
            <AlertTriangle size={18} />
          </div>
          <div className="alert-list">
            {dashboard.alerts.slice(0, 6).map((alert) => (
              <div className="alert" key={alert}>
                {alert}
              </div>
            ))}
            {dashboard.alerts.length === 0 ? <div className="alert success">Operacao sem alertas criticos.</div> : null}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
