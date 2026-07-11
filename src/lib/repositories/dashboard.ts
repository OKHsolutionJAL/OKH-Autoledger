import { adminDashboard, storeDashboard } from "@/lib/calculations";
import { stores } from "@/lib/demo-data";
import { getStoreVehicles as getRepositoryStoreVehicles } from "@/lib/repositories/vehicles";

export async function getStoreDashboard(storeId: string) {
  return storeDashboard(storeId);
}

export async function getStoreVehicles(storeId: string) {
  return getRepositoryStoreVehicles(storeId);
}

export async function getAdminDashboard() {
  return adminDashboard();
}

export async function getStores() {
  return stores;
}
