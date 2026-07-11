import { stores as demoStores } from "@/lib/demo-data";
import type { Store, StorePlan, StoreStatus } from "@/lib/domain";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

type StoreRow = {
  id: string;
  store_code: string;
  name: string;
  owner_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  plan: StorePlan;
  status: StoreStatus;
  car_limit: number | null;
  premium_entry_enabled: boolean;
};

export type AdminStoresSource = "supabase" | "demo";

export type AdminStoresResult = {
  stores: Store[];
  source: AdminStoresSource;
  activeStores: Store[];
  blockedStores: Store[];
  trialStores: Store[];
  premiumStores: Store[];
  monthlyRevenue: number;
  carsThisMonth: number;
  totalCarLimit: number;
};

function mapStore(row: StoreRow): Store {
  return {
    id: row.id,
    storeCode: row.store_code,
    name: row.name,
    ownerName: row.owner_name,
    email: row.email,
    phone: row.phone || "",
    address: row.address || "",
    plan: row.plan,
    status: row.status,
    carLimit: row.car_limit,
    premiumEntryEnabled: row.premium_entry_enabled,
    monthlyRevenue: 0,
    activeCarsMonth: 0,
    carsThisMonth: 0
  };
}

function summarize(stores: Store[], source: AdminStoresSource): AdminStoresResult {
  return {
    stores,
    source,
    activeStores: stores.filter((store) => store.status === "active" || store.status === "free_trial"),
    blockedStores: stores.filter((store) => store.status === "blocked" || store.status === "overdue"),
    trialStores: stores.filter((store) => store.status === "free_trial"),
    premiumStores: stores.filter((store) => store.plan === "premium_operational" || store.premiumEntryEnabled),
    monthlyRevenue: stores.reduce((sum, store) => sum + store.monthlyRevenue, 0),
    carsThisMonth: stores.reduce((sum, store) => sum + store.carsThisMonth, 0),
    totalCarLimit: stores.reduce((sum, store) => sum + (store.carLimit || 0), 0)
  };
}

async function getSupabaseStores() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("stores")
    .select("id, store_code, name, owner_name, email, phone, address, plan, status, car_limit, premium_entry_enabled")
    .is("archived_at", null)
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return null;
  }

  return data.map(mapStore);
}

export async function getAdminStores(): Promise<AdminStoresResult> {
  const supabaseStores = await getSupabaseStores();

  if (supabaseStores) {
    return summarize(supabaseStores, "supabase");
  }

  return summarize(demoStores, "demo");
}
