import { checklistItems, premiumRequests, stores, vehicleCosts, vehicles } from "@/lib/demo-data";
import type { ChecklistItem, Store, Vehicle, VehicleCost, VehicleTotals } from "@/lib/domain";

const TODAY = new Date("2026-07-10T12:00:00+09:00");

export function yen(value: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(value);
}

export function number(value: number) {
  return new Intl.NumberFormat("ja-JP").format(value);
}

export function pct(value: number) {
  return `${Number.isFinite(value) ? value.toFixed(1) : "0.0"}%`;
}

export function vehicleName(vehicle: Vehicle) {
  return `${vehicle.brand} ${vehicle.model}`;
}

export function isSold(vehicle: Vehicle) {
  return vehicle.status === "sold";
}

export function isInStock(vehicle: Vehicle) {
  return !["sold", "archived"].includes(vehicle.status);
}

export function daysInStock(vehicle: Vehicle) {
  const start = new Date(`${vehicle.entryDate}T00:00:00+09:00`);
  return Math.max(0, Math.floor((TODAY.getTime() - start.getTime()) / 86400000));
}

export function costsForVehicle(vehicleId: string) {
  return vehicleCosts.filter((cost) => cost.vehicleId === vehicleId);
}

export function checklistForVehicle(vehicleId: string) {
  return checklistItems.filter((item) => item.vehicleId === vehicleId);
}

export function totalsWithCosts(vehicle: Vehicle, rows: VehicleCost[]): VehicleTotals {
  const totalEstimatedCosts = rows.reduce((sum, cost) => sum + cost.estimatedValue, 0);
  const totalActualCosts = rows.reduce((sum, cost) => sum + cost.actualValue, 0);
  const estimatedTotalInvestment = vehicle.purchasePrice + totalEstimatedCosts;
  const actualTotalInvestment = vehicle.purchasePrice + totalActualCosts;
  const estimatedProfit = vehicle.advertisedPrice - estimatedTotalInvestment;
  const actualProfit = vehicle.soldPrice ? vehicle.soldPrice - actualTotalInvestment : null;
  const marginBase = vehicle.soldPrice || vehicle.advertisedPrice || 1;
  const marginSource = actualProfit ?? estimatedProfit;

  return {
    totalEstimatedCosts,
    totalActualCosts,
    estimatedTotalInvestment,
    actualTotalInvestment,
    estimatedProfit,
    actualProfit,
    marginPercentage: (marginSource / Math.max(marginBase, 1)) * 100,
    costDelta: totalActualCosts - totalEstimatedCosts
  };
}

export function totals(vehicle: Vehicle): VehicleTotals {
  return totalsWithCosts(vehicle, costsForVehicle(vehicle.id));
}

export function storeVehicles(storeId: string) {
  return vehicles.filter((vehicle) => vehicle.storeId === storeId);
}

export function storeChecklist(storeId: string) {
  return checklistItems.filter((item) => item.storeId === storeId);
}

export function lateChecklist(items: ChecklistItem[]) {
  return items.filter((item) => item.status !== "completed" && new Date(`${item.dueDate}T23:59:00+09:00`) < TODAY);
}

export function storeDashboard(storeId: string) {
  const cars = storeVehicles(storeId);
  const active = cars.filter(isInStock);
  const soldMonth = cars.filter((vehicle) => isSold(vehicle) && vehicle.soldDate?.startsWith("2026-07"));
  const pending = storeChecklist(storeId).filter((item) => item.status !== "completed" && item.status !== "cancelled");
  const alerts = cars.flatMap((vehicle) => {
    const total = totals(vehicle);
    const result: string[] = [];
    if (daysInStock(vehicle) > 60 && isInStock(vehicle)) result.push(`${vehicleName(vehicle)} parado ha mais de 60 dias.`);
    if (total.costDelta > 0) result.push(`${vehicleName(vehicle)} com custo real acima do previsto.`);
    if (total.estimatedProfit < 0 || (total.actualProfit ?? 0) < 0) result.push(`${vehicleName(vehicle)} com risco de prejuizo.`);
    return result;
  });

  return {
    cars,
    active,
    soldMonth,
    pending,
    alerts,
    investment: active.reduce((sum, vehicle) => sum + totals(vehicle).actualTotalInvestment, 0),
    predictedProfit: active.reduce((sum, vehicle) => sum + totals(vehicle).estimatedProfit, 0),
    realizedProfit: soldMonth.reduce((sum, vehicle) => sum + (totals(vehicle).actualProfit || 0), 0),
    inPreparation: active.filter((vehicle) => ["entry", "in_preparation", "waiting_parts", "waiting_shaken"].includes(vehicle.status)).length,
    ready: active.filter((vehicle) => ["ready_for_sale", "listed"].includes(vehicle.status)).length,
    loss: active.filter((vehicle) => totals(vehicle).estimatedProfit < 0 || vehicle.status === "loss").length,
    stuck: active.filter((vehicle) => daysInStock(vehicle) > 60).length
  };
}

export function adminDashboard() {
  const activeStores = stores.filter((store) => store.status === "active" || store.status === "free_trial");
  const blockedStores = stores.filter((store) => store.status === "blocked" || store.status === "overdue");
  const monthlyRevenue = stores.reduce((sum, store) => sum + store.monthlyRevenue, 0);
  const carsThisMonth = stores.reduce((sum, store) => sum + store.carsThisMonth, 0);
  const pendingPremium = premiumRequests.filter((request) => !["published", "cancelled"].includes(request.status));

  return {
    stores,
    activeStores,
    blockedStores,
    monthlyRevenue,
    carsThisMonth,
    pendingPremium,
    publishedPremium: premiumRequests.filter((request) => request.status === "published")
  };
}

export function defaultStore(): Store {
  return stores[0];
}
