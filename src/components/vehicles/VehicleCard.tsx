import Image from "next/image";
import Link from "next/link";
import type { Locale, Vehicle } from "@/lib/domain";
import { daysInStock, pct, totals, vehicleName, yen } from "@/lib/calculations";
import { originLabels, translator } from "@/lib/i18n";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function VehicleCard({ vehicle, locale }: { vehicle: Vehicle; locale: Locale }) {
  const t = translator(locale);
  const total = totals(vehicle);
  const result = total.actualProfit ?? total.estimatedProfit;

  return (
    <article className="vehicle-card">
      <div className="vehicle-photo">
        <Image src="/assets/premium-sport-garage.png" alt={vehicleName(vehicle)} fill sizes="(max-width: 900px) 100vw, 33vw" />
        <StatusBadge type="vehicle" value={vehicle.status} locale={locale} />
      </div>
      <div className="vehicle-body">
        <div className="vehicle-title">
          <div>
            <h3>{vehicleName(vehicle)}</h3>
            <span>
              {vehicle.year} · {vehicle.color} · {vehicle.mileage.toLocaleString("ja-JP")} km
            </span>
          </div>
          <strong>{vehicle.plate}</strong>
        </div>
        <div className="mini-stats">
          <div>
            <span>{t("purchase")}</span>
            <strong>{yen(vehicle.purchasePrice)}</strong>
          </div>
          <div>
            <span>{t("actual")}</span>
            <strong>{yen(total.totalActualCosts)}</strong>
          </div>
          <div>
            <span>{t("profit")}</span>
            <strong className={result >= 0 ? "profit" : "loss"}>{yen(result)}</strong>
          </div>
          <div>
            <span>{t("days")}</span>
            <strong>{daysInStock(vehicle)}</strong>
          </div>
        </div>
        <div className="vehicle-meta">
          <span>{originLabels[locale][vehicle.origin]}</span>
          <strong className={total.marginPercentage >= 0 ? "profit" : "loss"}>{pct(total.marginPercentage)}</strong>
        </div>
        <Link className="button small secondary" href={`/loja/carros/${vehicle.id}?locale=${locale}`}>
          {t("open")}
        </Link>
      </div>
    </article>
  );
}
