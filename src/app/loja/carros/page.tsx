import { JapaneseYen, Plus, Search } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VerificationBadge } from "@/components/vehicles/VerificationBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { daysInStock, totals, vehicleName, yen } from "@/lib/calculations";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, originLabels, translator } from "@/lib/i18n";
import { getStoreVehicles } from "@/lib/repositories/dashboard";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; vehicle?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  created: { text: "Carro cadastrado no Supabase com sucesso.", success: true },
  "created-verified": { text: "Carro cadastrado, verificado e assinado com sucesso.", success: true },
  "created-pending": { text: "Entrada criada com dados minimos. O cadastro ficou pendente para conferencia e assinatura.", success: true },
  "demo-validated": {
    text: "Cadastro validado no modo demo. Entre com uma conta real da loja para gravar no Supabase.",
    success: true
  }
};

export default async function StoreCarsPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = await getAppSession(params.role, params.store || "store-1");
  const cars = await getStoreVehicles(session.store?.id || "store-1");
  const message = params.vehicle ? messages[params.vehicle] : null;

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/carros"
      title={t("cars")}
      subtitle="Estoque operacional por loja com calculo de custo, margem e lucro."
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
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}
      <section className="panel filters">
        <label>
          <Search size={16} />
          <input placeholder="Marca, modelo, placa..." />
        </label>
        <select defaultValue="all">
          <option value="all">Todos</option>
          <option value="in_preparation">{t("inPreparation")}</option>
          <option value="ready_for_sale">{t("readyForSale")}</option>
          <option value="sold">{t("soldThisMonth")}</option>
        </select>
        <select defaultValue="origin">
          <option value="origin">Origem</option>
          <option>{originLabels[locale].auction}</option>
          <option>{originLabels[locale].direct_purchase}</option>
          <option>{originLabels[locale].trade_in}</option>
        </select>
      </section>

      <div className="vehicle-grid">
        {cars.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} locale={locale} />
        ))}
      </div>
      {cars.length === 0 ? (
        <div className="auth-alert">Nenhum carro cadastrado nesta loja ainda. Use Novo carro para criar o primeiro registro real.</div>
      ) : null}

      <section className="panel">
        <div className="panel-head">
          <h2>Tabela operacional</h2>
          <span>{cars.length} store_id</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{t("vehicle")}</th>
                <th>{t("status")}</th>
                <th>Verificacao</th>
                <th>{t("purchase")}</th>
                <th>{t("actual")}</th>
                <th>{t("advertised")}</th>
                <th>{t("profit")}</th>
                <th>{t("days")}</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((vehicle) => {
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
                    <td>
                      <VerificationBadge status={vehicle.verificationStatus} locale={locale} />
                      <span>{vehicle.intakeMode === "photo_minimal" ? "Fotos" : "Completo"}</span>
                    </td>
                    <td>{yen(vehicle.purchasePrice)}</td>
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
    </AppShell>
  );
}
