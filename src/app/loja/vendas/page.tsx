import Link from "next/link";
import { AlertTriangle, CalendarCheck, Car, CheckCircle2, FileText, JapaneseYen, LineChart, Plus, Tags, UserCheck, WalletCards } from "lucide-react";
import { createVehicleSaleAction, reserveVehicleAction } from "@/app/actions";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { daysInStock, number, pct, totalsWithCosts, vehicleName, yen } from "@/lib/calculations";
import { currentMonthInJapan, todayInJapan } from "@/lib/dates";
import type { Vehicle, VehicleCost, VehicleStatus } from "@/lib/domain";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, translator } from "@/lib/i18n";
import { getStoreVehicleCosts } from "@/lib/repositories/costs";
import { getStoreVehicles } from "@/lib/repositories/vehicles";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; vehicle?: string; sale?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  created: { text: "Venda registrada com sucesso.", success: true },
  reserved: { text: "Carro marcado como reservado.", success: true },
  "demo-validated": { text: "Acao validada no modo demo. Entre com uma conta real para gravar no Supabase.", success: true },
  "missing-fields": { text: "Escolha o carro e informe o preco final da venda." },
  "reserve-error": { text: "Nao consegui reservar este carro agora." },
  "create-error": { text: "Nao consegui registrar a venda agora. Confira login, loja e permissao." },
  "commission-error": { text: "A venda foi registrada, mas a comissao nao entrou em custos. Lance a comissao manualmente em Custos." }
};

const saleStatuses: VehicleStatus[] = ["ready_for_sale", "listed", "reserved", "loss"];
const paymentMethods = ["Dinheiro", "Transferencia", "Financiamento", "Cartao", "Entrada + parcelas", "Outro"];

function costsForVehicle(costs: VehicleCost[], vehicleId: string) {
  return costs.filter((cost) => cost.vehicleId === vehicleId);
}

function selectedVehicle(vehicles: Vehicle[], vehicleId?: string) {
  return vehicles.find((vehicle) => vehicle.id === vehicleId) || vehicles.find((vehicle) => saleStatuses.includes(vehicle.status)) || vehicles.find((vehicle) => vehicle.status !== "sold" && vehicle.status !== "archived") || vehicles[0];
}

function reserveForm(vehicle: Vehicle, locale: string) {
  if (vehicle.status === "reserved" || vehicle.status === "sold") {
    return null;
  }

  return (
    <form action={reserveVehicleAction}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="vehicleId" value={vehicle.id} />
      <button className="button small secondary" type="submit">
        Reservar
      </button>
    </form>
  );
}

export default async function StoreSalesPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = await getAppSession(params.role, params.store || "store-1");
  const storeId = session.store?.id || "store-1";
  const [vehicles, costs] = await Promise.all([getStoreVehicles(storeId), getStoreVehicleCosts(storeId)]);
  const canSeeFinancials = session.isAdmin || session.profile.canEditFinancials || session.role === "store_owner";
  const readyVehicles = vehicles.filter((vehicle) => ["ready_for_sale", "listed", "loss"].includes(vehicle.status));
  const reservedVehicles = vehicles.filter((vehicle) => vehicle.status === "reserved");
  const soldVehicles = vehicles.filter((vehicle) => vehicle.status === "sold");
  const monthKey = currentMonthInJapan();
  const soldThisMonth = soldVehicles.filter((vehicle) => vehicle.soldDate?.startsWith(monthKey));
  const currentVehicle = selectedVehicle(vehicles, params.vehicle);
  const currentCosts = currentVehicle ? costsForVehicle(costs, currentVehicle.id) : [];
  const currentTotals = currentVehicle ? totalsWithCosts(currentVehicle, currentCosts) : null;
  const revenue = soldThisMonth.reduce((sum, vehicle) => sum + (vehicle.soldPrice || 0), 0);
  const realizedProfit = soldThisMonth.reduce((sum, vehicle) => {
    const total = totalsWithCosts(vehicle, costsForVehicle(costs, vehicle.id));
    return sum + (total.actualProfit || 0);
  }, 0);
  const averageTicket = soldThisMonth.length ? Math.round(revenue / soldThisMonth.length) : 0;
  const averageMargin = soldThisMonth.length
    ? soldThisMonth.reduce((sum, vehicle) => sum + totalsWithCosts(vehicle, costsForVehicle(costs, vehicle.id)).marginPercentage, 0) / soldThisMonth.length
    : 0;
  const vehiclesBelowMinimum = saleStatuses
    .map((status) => vehicles.filter((vehicle) => vehicle.status === status))
    .flat()
    .filter((vehicle) => vehicle.advertisedPrice < vehicle.minimumPrice);
  const message = params.sale ? messages[params.sale] : null;

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/vendas"
      title={t("sales")}
      subtitle="Fechamento de venda, reserva, preco final, comissao e lucro realizado por carro."
      actions={
        <>
          <Link className="button secondary" href={`/loja/custos?locale=${locale}`}>
            <JapaneseYen size={17} /> {t("costs")}
          </Link>
          <Link className="button" href={`/loja/entrada?locale=${locale}`}>
            <Plus size={17} /> {t("newCar")}
          </Link>
        </>
      }
    >
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}

      <div className="metric-grid">
        <MetricCard label="Prontos" value={number(readyVehicles.length)} detail="anunciados ou liberados" icon={Car} tone="success" />
        <MetricCard label={t("soldThisMonth")} value={number(soldThisMonth.length)} detail={monthKey} icon={CheckCircle2} tone="success" />
        <MetricCard label="Receita vendida" value={canSeeFinancials ? yen(revenue) : "Restrito"} detail={`ticket ${canSeeFinancials ? yen(averageTicket) : "restrito"}`} icon={JapaneseYen} />
        <MetricCard label={t("realizedProfit")} value={canSeeFinancials ? yen(realizedProfit) : "Restrito"} detail={`margem media ${canSeeFinancials ? pct(averageMargin) : "restrita"}`} icon={LineChart} tone={realizedProfit >= 0 ? "success" : "danger"} />
      </div>

      <div className="sales-layout">
        <section className="panel sales-board-panel">
          <div className="panel-head">
            <h2>Fila de vendas</h2>
            <span className="source-pill">{number(readyVehicles.length + reservedVehicles.length)} ativos</span>
          </div>

          <div className="sales-stage-grid">
            <div className="sales-stage">
              <div className="sales-stage-head">
                <strong>Pronto</strong>
                <span>{number(readyVehicles.length)}</span>
              </div>
              <div className="sales-car-list">
                {readyVehicles.map((vehicle) => {
                  const total = totalsWithCosts(vehicle, costsForVehicle(costs, vehicle.id));
                  return (
                    <article key={vehicle.id} className={currentVehicle?.id === vehicle.id ? "sales-car-row is-active" : "sales-car-row"}>
                      <Link href={`/loja/vendas?locale=${locale}&vehicle=${vehicle.id}`}>
                        <strong>{vehicleName(vehicle)}</strong>
                        <span>{vehicle.plate} - {daysInStock(vehicle)} dias</span>
                      </Link>
                      <div>
                        <strong>{yen(vehicle.advertisedPrice)}</strong>
                        {canSeeFinancials ? <span className={total.estimatedProfit >= 0 ? "profit" : "loss"}>{yen(total.estimatedProfit)}</span> : null}
                      </div>
                      {reserveForm(vehicle, locale)}
                    </article>
                  );
                })}
                {readyVehicles.length === 0 ? <div className="sales-empty">Nenhum carro pronto agora.</div> : null}
              </div>
            </div>

            <div className="sales-stage">
              <div className="sales-stage-head">
                <strong>Reservado</strong>
                <span>{number(reservedVehicles.length)}</span>
              </div>
              <div className="sales-car-list">
                {reservedVehicles.map((vehicle) => (
                  <article key={vehicle.id} className={currentVehicle?.id === vehicle.id ? "sales-car-row is-active" : "sales-car-row"}>
                    <Link href={`/loja/vendas?locale=${locale}&vehicle=${vehicle.id}`}>
                      <strong>{vehicleName(vehicle)}</strong>
                      <span>{vehicle.plate} - aguardando fechamento</span>
                    </Link>
                    <div>
                      <strong>{yen(vehicle.advertisedPrice)}</strong>
                      <StatusBadge type="vehicle" value={vehicle.status} locale={locale} />
                    </div>
                  </article>
                ))}
                {reservedVehicles.length === 0 ? <div className="sales-empty">Sem reservas abertas.</div> : null}
              </div>
            </div>

            <div className="sales-stage">
              <div className="sales-stage-head">
                <strong>Vendido</strong>
                <span>{number(soldVehicles.length)}</span>
              </div>
              <div className="sales-car-list">
                {soldVehicles.slice(0, 5).map((vehicle) => {
                  const total = totalsWithCosts(vehicle, costsForVehicle(costs, vehicle.id));
                  return (
                    <article key={vehicle.id} className={currentVehicle?.id === vehicle.id ? "sales-car-row is-active" : "sales-car-row"}>
                      <Link href={`/loja/vendas?locale=${locale}&vehicle=${vehicle.id}`}>
                        <strong>{vehicleName(vehicle)}</strong>
                        <span>{vehicle.soldDate || "sem data"} - {vehicle.plate}</span>
                      </Link>
                      <div>
                        <strong>{yen(vehicle.soldPrice || 0)}</strong>
                        {canSeeFinancials ? <span className={(total.actualProfit || 0) >= 0 ? "profit" : "loss"}>{yen(total.actualProfit || 0)}</span> : null}
                      </div>
                    </article>
                  );
                })}
                {soldVehicles.length === 0 ? <div className="sales-empty">Nenhuma venda fechada.</div> : null}
              </div>
            </div>
          </div>
        </section>

        <section className="panel sale-form-panel">
          <div className="panel-head">
            <h2>Registrar venda</h2>
            <WalletCards size={18} />
          </div>

          {currentVehicle && currentTotals ? (
            <>
              <div className="sales-price-grid">
                <div>
                  <span>Anuncio</span>
                  <strong>{yen(currentVehicle.advertisedPrice)}</strong>
                </div>
                <div>
                  <span>Minimo</span>
                  <strong>{yen(currentVehicle.minimumPrice)}</strong>
                </div>
                <div>
                  <span>Investimento</span>
                  <strong>{canSeeFinancials ? yen(currentTotals.actualTotalInvestment) : "Restrito"}</strong>
                </div>
                <div>
                  <span>Lucro no anuncio</span>
                  <strong className={currentTotals.estimatedProfit >= 0 ? "profit" : "loss"}>{canSeeFinancials ? yen(currentTotals.estimatedProfit) : "Restrito"}</strong>
                </div>
              </div>

              <div className="sales-helper">
                {currentVehicle.advertisedPrice < currentVehicle.minimumPrice ? (
                  <div className="is-warning">
                    <AlertTriangle size={18} />
                    <span>Preco anunciado abaixo do minimo definido.</span>
                  </div>
                ) : currentTotals.estimatedProfit < 0 ? (
                  <div className="is-danger">
                    <AlertTriangle size={18} />
                    <span>Venda no preco anunciado gera prejuizo previsto.</span>
                  </div>
                ) : (
                  <div className="is-good">
                    <CheckCircle2 size={18} />
                    <span>Preco atual cobre investimento e margem prevista.</span>
                  </div>
                )}
                {vehiclesBelowMinimum.length ? (
                  <div className="is-warning">
                    <Tags size={18} />
                    <span>{number(vehiclesBelowMinimum.length)} carro(s) com anuncio abaixo do minimo.</span>
                  </div>
                ) : null}
              </div>

              <form action={createVehicleSaleAction} className="form-grid sales-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="storeId" value={storeId} />
                <label className="wide">
                  Carro
                  <select name="vehicleId" defaultValue={currentVehicle.id} required>
                    {vehicles
                      .filter((vehicle) => vehicle.status !== "archived")
                      .map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicleName(vehicle)} - {vehicle.plate}
                        </option>
                      ))}
                  </select>
                </label>
                <label>
                  Preco final
                  <input name="soldPrice" type="number" defaultValue={currentVehicle.soldPrice || currentVehicle.advertisedPrice || ""} required />
                </label>
                <label>
                  Data
                  <input name="soldDate" type="date" defaultValue={currentVehicle.soldDate || todayInJapan()} />
                </label>
                <label>
                  Comissao
                  <input name="commissionValue" type="number" placeholder="0" />
                </label>
                <label>
                  Pagamento
                  <select name="paymentMethod" defaultValue="Transferencia">
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Cliente
                  <input name="buyerName" placeholder="Nome do comprador" />
                </label>
                <label>
                  Entrega
                  <input name="deliveryDate" type="date" />
                </label>
                <label className="wide">
                  Observacoes
                  <textarea name="notes" placeholder="Sinal, parcelas, pendencias de entrega, garantia ou documentos." />
                </label>
                <button className="button" type="submit">
                  <CheckCircle2 size={17} /> Fechar venda
                </button>
              </form>
            </>
          ) : (
            <div className="auth-alert">Cadastre um carro antes de registrar venda.</div>
          )}
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Vendas fechadas</h2>
          <span className="source-pill">{number(soldVehicles.length)} registros</span>
        </div>
        <div className="table-wrap">
          <table className="sales-table">
            <thead>
              <tr>
                <th>{t("vehicle")}</th>
                <th>Data</th>
                <th>Venda</th>
                <th>Investimento</th>
                <th>{t("profit")}</th>
                <th>Margem</th>
                <th>Dias</th>
              </tr>
            </thead>
            <tbody>
              {soldVehicles.map((vehicle) => {
                const total = totalsWithCosts(vehicle, costsForVehicle(costs, vehicle.id));
                const profit = total.actualProfit || 0;
                return (
                  <tr key={vehicle.id}>
                    <td>
                      <strong>{vehicleName(vehicle)}</strong>
                      <span>{vehicle.plate}</span>
                    </td>
                    <td>{vehicle.soldDate || "-"}</td>
                    <td>{yen(vehicle.soldPrice || 0)}</td>
                    <td>{canSeeFinancials ? yen(total.actualTotalInvestment) : "Restrito"}</td>
                    <td className={profit >= 0 ? "profit" : "loss"}>{canSeeFinancials ? yen(profit) : "Restrito"}</td>
                    <td>{canSeeFinancials ? pct(total.marginPercentage) : "Restrito"}</td>
                    <td>{daysInStock(vehicle)}</td>
                  </tr>
                );
              })}
              {soldVehicles.length === 0 ? (
                <tr>
                  <td colSpan={7}>Nenhuma venda registrada nesta loja ainda.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Checklist de fechamento</h2>
          <CalendarCheck size={18} />
        </div>
        <div className="sales-close-grid">
          <div>
            <UserCheck size={18} />
            <strong>Confirmar cliente</strong>
            <span>Nome, contato, forma de pagamento e sinal.</span>
          </div>
          <div>
            <FileText size={18} />
            <strong>Documentos</strong>
            <span>Shaken, transferencia, recibos e assinatura final.</span>
          </div>
          <div>
            <JapaneseYen size={18} />
            <strong>Custos finais</strong>
            <span>Comissao, limpeza, transporte de entrega e garantia.</span>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
