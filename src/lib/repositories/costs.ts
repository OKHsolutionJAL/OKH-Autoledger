import { vehicleCosts as demoVehicleCosts } from "@/lib/demo-data";
import type { VehicleCost } from "@/lib/domain";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

type VehicleCostRow = {
  id: string;
  store_id: string;
  vehicle_id: string;
  category: string;
  description: string;
  estimated_value: number | null;
  actual_value: number | null;
  cost_date: string | null;
  receipt_url: string | null;
  notes: string | null;
};

const COST_SELECT = "id, store_id, vehicle_id, category, description, estimated_value, actual_value, cost_date, receipt_url, notes";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value: string) {
  return uuidPattern.test(value);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function mapCost(row: VehicleCostRow): VehicleCost {
  return {
    id: row.id,
    storeId: row.store_id,
    vehicleId: row.vehicle_id,
    category: row.category,
    description: row.description,
    estimatedValue: row.estimated_value ?? 0,
    actualValue: row.actual_value ?? 0,
    costDate: row.cost_date || todayIsoDate(),
    receiptUrl: row.receipt_url,
    notes: row.notes || ""
  };
}

async function getSupabaseStoreCosts(storeId: string) {
  if (!hasSupabaseEnv() || !isUuid(storeId)) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("vehicle_costs")
    .select(COST_SELECT)
    .eq("store_id", storeId)
    .is("archived_at", null)
    .order("cost_date", { ascending: false });

  if (error) {
    return null;
  }

  return ((data || []) as VehicleCostRow[]).map(mapCost);
}

export async function getStoreVehicleCosts(storeId: string): Promise<VehicleCost[]> {
  const supabaseCosts = await getSupabaseStoreCosts(storeId);

  if (supabaseCosts) {
    return supabaseCosts;
  }

  return demoVehicleCosts.filter((cost) => cost.storeId === storeId);
}
