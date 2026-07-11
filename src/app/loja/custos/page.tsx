import Link from "next/link";
import { AlertTriangle, FileText, JapaneseYen, Plus, ReceiptText, TrendingDown, TrendingUp, WalletCards } from "lucide-react";
import { createVehicleCostAction } from "@/app/actions";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { daysInStock, number, pct, totalsWithCosts, vehicleName, yen } from "@/lib/calculations";
import type { Vehicle, VehicleCost } from "@/lib/domain";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, translator } from "@/lib/i18n";
import { getStoreVehicleCosts } from "@/lib/repositories/costs";
import { getStoreVehicles } from "@/lib/repositories/vehicles";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; vehicle?: string; cost?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  created: { text: "Custo lancado com sucesso.", success: true },
  "demo-validated": { text: "Lancamento validado no modo demo. Entre com uma conta real para gravar no Supabase.", success: true },
  "missing-fields": { text: "Escolha um carro e informe categoria e descricao." },
  "receipt-error": { text: "Nao consegui subir o recibo. O custo nao foi gravado." },
  "create-error": { text: "Nao consegui gravar o custo agora. Confira login, loja e permissao." }
};

const categories = [
  "Compra",
  "Leilao",
  "Transporte",
  "Shaken",
  "Mecanica",
  "Pintura",
  "Pneus",
  "Bateria",
  "Limpeza",
  "Fotos",
  "Documentacao",
  "Comissao",
  "Outros"
];

function vehicleMap(vehicles: Vehicle[]) {
  return new Map(vehicles.map((vehicle) => [vehicle.id, vehicle]));
}

function costsForVehicle(costs: VehicleCost[], vehicleId: string) {
  return costs.filter((cost) => cost.vehicleId === vehicleId);
}

function categorySummary(costs: VehicleCost[]) {
  return categories
    .map((category) => {
      const rows = costs.filter((cost) => cost.category === category);
      return {
        category,
        count: rows.length,
        estimated: rows.reduce((sum, cost) => sum + cost.estimatedValue, 0),
        actual: rows.reduce((sum, cost) => sum + cost.actualValue, 0)
      };
    })
    .filter((item) => item.count > 0)
    .sort((a, b) => b.actual - a.actual);
}

function selectedVehicle(vehicles: Vehicle[], vehicleId?: string) {
  return vehicles.find((vehicle) => vehicle.id === vehicleId) || vehicles.find((vehicle) => ["in_preparation", "waiting_shaken", "ready_for_sale", "listed"].includes(vehicle.status)) || vehicles[0];
}

export default async function StoreCostsPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = await getAppSession(params.role, params.store || "store-1");
  const storeId = session.store?.id || "store-1";
  const [vehicles, costs] = await Promise.all([getStoreVehicles(storeId), getStoreVehicleCosts(storeId)]);
  const carsById = vehicleMap(vehicles);
  const currentVehicle = selectedVehicle(vehicles, params.vehicle);
  const currentCosts = currentVehicle ? costsForVehicle(costs, currentVehicle.id) : [];
  const currentTotals = currentVehicle ? totalsWithCosts(currentVehicle, currentCosts) : null;
  const canSeeFinancials = session.isAdmin || session.profile.canEditFinancials || session.role === "store_owner";
  const allActualCosts = costs.reduce((sum, cost) => sum + cost.actualValue, 0);
  const allEstimatedCosts = costs.reduce((sum, cost) => sum + cost.estimatedValue, 0);
  const variance = allActualCosts - allEstimatedCosts;
  const vehiclesAtRisk = vehicles.filter((vehicle) => {
    const total = totalsWithCosts(vehicle, costsForVehicle(costs, vehicle.id));
    return total.costDelta > 0 || total.estimatedProfit < 0;
  });
  const missingReceipts = costs.filter((cost) => cost.actualValue > 0 && !cost.receiptUrl && !cost.notes.toLowerCase().includes("recibo"));
  const message = params.cost ? messages[params.cost] : null;

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/custos"
      title={t("costs")}
      subtitle="Controle financeiro por carro com custo previsto, real, comprovante e margem."
      actions={
        <Link className="button secondary" href={`/loja/carros?locale=${locale}`}>
          <Plus size={17} /> {t("cars")}
        </Link>
      }
    >
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}

      <div className="metric-grid">
        <MetricCard label="Custos reais" value={yen(allActualCosts)} detail={`${number(costs.length)} lancamentos`} icon={JapaneseYen} />
        <MetricCard label="Diferenca" value={yen(variance)} detail="real contra previsto" icon={variance > 0 ? TrendingDown : TrendingUp} tone={variance > 0 ? "warning" : "success"} />
        <MetricCard label="Em risco" value={number(vehiclesAtRisk.length)} detail="carros com margem pressionada" icon={AlertTriangle} tone={vehiclesAtRisk.length ? "danger" : "success"} />
        <MetricCard label="Sem recibo" value={number(missingReceipts.length)} detail="custos reais sem comprovante" icon={ReceiptText} tone={missingReceipts.length ? "warning" : "success"} />
      </div>

      <div className="costs-layout">
        <section className="panel cost-car-panel">
          <div className="panel-head">
            <h2>Carros</h2>
            <span className="source-pill">{vehicles.length}</span>
          </div>
          <div className="cost-car-list">
            {vehicles.map((vehicle) => {
              const rows = costsForVehicle(costs, vehicle.id);
              const total = totalsWithCosts(vehicle, rows);
              const result = total.actualProfit ?? total.estimatedProfit;
              return (
                <Link key={vehicle.id} href={`/loja/custos?locale=${locale}&vehicle=${vehicle.id}`} className={currentVehicle?.id === vehicle.id ? "cost-car-row is-active" : "cost-car-row"}>
                  <div>
                    <strong>{vehicleName(vehicle)}</strong>
                    <span>{vehicle.plate} - {daysInStock(vehicle)} dias</span>
                  </div>
                  <div>
                    <span>{yen(total.totalActualCosts)}</span>
                    {canSeeFinancials ? <strong className={result >= 0 ? "profit" : "loss"}>{yen(result)}</strong> : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="panel cost-main-panel">
          <div className="panel-head">
            <h2>{currentVehicle ? vehicleName(currentVehicle) : "Resumo"}</h2>
            {currentVehicle ? <StatusBadge type="vehicle" value={currentVehicle.status} locale={locale} /> : <span className="source-pill">sem carro</span>}
          </div>

          {currentVehicle && currentTotals ? (
            <>
              <div className="finance-strip">
                {canSeeFinancials ? (
                  <div>
                    <span>Compra</span>
                    <strong>{yen(currentVehicle.purchasePrice)}</strong>
                  </div>
                ) : null}
                <div>
                  <span>Custos reais</span>
                  <strong>{yen(currentTotals.totalActualCosts)}</strong>
                </div>
                <div>
                  <span>Investimento</span>
                  <strong>{canSeeFinancials ? yen(currentTotals.actualTotalInvestment) : "Restrito"}</strong>
                </div>
                <div>
                  <span>Margem</span>
                  <strong className={currentTotals.marginPercentage >= 0 ? "profit" : "loss"}>{canSeeFinancials ? pct(currentTotals.marginPercentage) : "Restrito"}</strong>
                </div>
              </div>

              <div className="cost-health">
                <div className={currentTotals.costDelta > 0 ? "is-warning" : "is-good"}>
                  <WalletCards size={18} />
                  <div>
                    <strong>{currentTotals.costDelta > 0 ? `Acima do previsto em ${yen(currentTotals.costDelta)}` : "Dentro do previsto"}</strong>
                    <span>Compare custo real com custo planejado antes de anunciar ou vender.</span>
                  </div>
                </div>
                {canSeeFinancials ? (
                  <div className={(currentTotals.actualProfit ?? currentTotals.estimatedProfit) >= 0 ? "is-good" : "is-danger"}>
                    <TrendingUp size={18} />
                    <div>
                      <strong>{yen(currentTotals.actualProfit ?? currentTotals.estimatedProfit)}</strong>
                      <span>Resultado estimado com preco anunciado atual.</span>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="category-grid">
                {categorySummary(currentCosts).map((item) => (
                  <article key={item.category}>
                    <span>{item.category}</span>
                    <strong>{yen(item.actual)}</strong>
                    <small>{item.count} item(ns), previsto {yen(item.estimated)}</small>
                  </article>
                ))}
                {currentCosts.length === 0 ? <div className="auth-alert">Nenhum custo lancado para este carro ainda.</div> : null}
              </div>
            </>
          ) : (
            <div className="auth-alert">Cadastre um carro antes de lancar custos.</div>
          )}
        </section>

        <section className="panel cost-form-panel">
          <div className="panel-head">
            <h2>Novo custo</h2>
            <FileText size={18} />
          </div>
          <form action={createVehicleCostAction} className="form-grid">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="storeId" value={storeId} />
            <label className="wide">
              Carro
              <select name="vehicleId" defaultValue={currentVehicle?.id} required>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicleName(vehicle)} - {vehicle.plate}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Categoria
              <select name="category" defaultValue="Mecanica" required>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Data
              <input name="costDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
            </label>
            <label className="wide">
              Descricao
              <input name="description" placeholder="Ex: Troca de oleo e filtro" required />
            </label>
            <label>
              Previsto
              <input name="estimatedValue" type="number" placeholder="0" />
            </label>
            <label>
              Real
              <input name="actualValue" type="number" placeholder="0" />
            </label>
            <label className="wide">
              Recibo
              <input name="receipt" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" />
            </label>
            <label className="wide">
              Observacoes
              <textarea name="notes" placeholder="Fornecedor, autorizacao, motivo da diferenca ou numero do recibo." />
            </label>
            <button className="button" type="submit" disabled={vehicles.length === 0}>
              <Plus size={17} /> Lancar custo
            </button>
          </form>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Ultimos lancamentos</h2>
          <span className="source-pill">{number(costs.length)} registros</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{t("vehicle")}</th>
                <th>Categoria</th>
                <th>Descricao</th>
                <th>Previsto</th>
                <th>{t("actual")}</th>
                <th>Diferenca</th>
                <th>Recibo</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((cost) => {
                const vehicle = carsById.get(cost.vehicleId);
                const delta = cost.actualValue - cost.estimatedValue;
                return (
                  <tr key={cost.id}>
                    <td>
                      <strong>{vehicle ? vehicleName(vehicle) : "Carro nao encontrado"}</strong>
                      <span>{vehicle?.plate || cost.vehicleId}</span>
                    </td>
                    <td>{cost.category}</td>
                    <td>
                      <strong>{cost.description}</strong>
                      <span>{cost.costDate}{cost.notes ? ` - ${cost.notes}` : ""}</span>
                    </td>
                    <td>{yen(cost.estimatedValue)}</td>
                    <td>{yen(cost.actualValue)}</td>
                    <td className={delta > 0 ? "loss" : "profit"}>{yen(delta)}</td>
                    <td>{cost.receiptUrl || cost.notes.toLowerCase().includes("recibo") ? "OK" : "Pendente"}</td>
                  </tr>
                );
              })}
              {costs.length === 0 ? (
                <tr>
                  <td colSpan={7}>Nenhum custo lancado nesta loja ainda.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
