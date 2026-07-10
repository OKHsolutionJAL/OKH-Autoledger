import { adminDashboard, storeDashboard, storeVehicles } from "@/lib/calculations";
import { stores } from "@/lib/demo-data";

export async function getStoreDashboard(storeId: string) {
  return storeDashboard(storeId);
}

export async function getStoreVehicles(storeId: string) {
  return storeVehicles(storeId);
}

export async function getAdminDashboard() {
  return adminDashboard();
}

export async function getStores() {
  return stores;
}
