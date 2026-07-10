import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, JapaneseYen } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { costsForVehicle, daysInStock, pct, totals, vehicleName, yen } from "@/lib/calculations";
import { vehicles } from "@/lib/demo-data";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, originLabels, translator } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ vehicleId: string }>;
  searchParams?: Promise<{ locale?: string; role?: string; store?: string }>;
};

export default async function VehicleDetailsPage({ params, searchParams }: PageProps) {
  const route = await params;
  const query = (await searchParams) || {};
  const locale = normalizeLocale(query.locale);
  const t = translator(locale);
  const session = await getAppSession(query.role, query.store || "store-1");
  const vehicle = vehicles.find((item) => item.id === route.vehicleId) || vehicles[0];
  const total = totals(vehicle);
  const rows = costsForVehicle(vehicle.id);

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/carros"
      title={vehicleName(vehicle)}
      subtitle={`${vehicle.plate} · ${originLabels[locale][vehicle.origin]} · ${daysInStock(vehicle)} dias`}
      actions={
        <Link className="button secondary" href={`/loja/carros?locale=${locale}`}>
          <ArrowLeft size={17} /> Voltar
        </Link>
      }
    >
      <section className="detail-grid">
        <div className="panel detail-photo">
          <Image src="/assets/premium-sport-garage.png" alt={vehicleName(vehicle)} fill sizes="(max-width: 900px) 100vw, 45vw" />
          <StatusBadge type="vehicle" value={vehicle.status} locale={locale} />
        </div>
        <div className="panel summary-panel">
          <div className="summary-grid">
            <div>
              <span>{t("purchase")}</span>
              <strong>{yen(vehicle.purchasePrice)}</strong>
            </div>
            <div>
              <span>{t("actual")}</span>
              <strong>{yen(total.actualTotalInvestment)}</strong>
            </div>
            <div>
              <span>{t("advertised")}</span>
              <strong>{yen(vehicle.advertisedPrice)}</strong>
            </div>
            <div>
              <span>{t("profit")}</span>
              <strong className={(total.actualProfit ?? total.estimatedProfit) >= 0 ? "profit" : "loss"}>{yen(total.actualProfit ?? total.estimatedProfit)}</strong>
            </div>
            <div>
              <span>Margem</span>
              <strong>{pct(total.marginPercentage)}</strong>
            </div>
            <div>
              <span>{t("days")}</span>
              <strong>{daysInStock(vehicle)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>{t("costs")}</h2>
          <JapaneseYen size={18} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Descricao</th>
                <th>Previsto</th>
                <th>{t("actual")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((cost) => (
                <tr key={cost.id}>
                  <td>{cost.category}</td>
                  <td>{cost.description}</td>
                  <td>{yen(cost.estimatedValue)}</td>
                  <td>{yen(cost.actualValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
