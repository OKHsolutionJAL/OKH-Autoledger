import { premiumRequests as demoRequests } from "@/lib/demo-data";
import type { PremiumPriority, PremiumRequest, PremiumRequestStatus } from "@/lib/domain";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

type PremiumRequestRow = {
  id: string;
  store_id: string;
  vehicle_name: string;
  priority: PremiumPriority;
  status: PremiumRequestStatus;
  notes: string | null;
  assigned_to: string | null;
  created_at: string;
};

const REQUEST_SELECT = "id, store_id, vehicle_name, priority, status, notes, assigned_to, created_at";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value: string) {
  return uuidPattern.test(value);
}

function mapRequest(row: PremiumRequestRow): PremiumRequest {
  return {
    id: row.id,
    storeId: row.store_id,
    vehicleName: row.vehicle_name,
    priority: row.priority,
    status: row.status,
    notes: row.notes || "",
    assignedTo: row.assigned_to,
    createdAt: row.created_at
  };
}

async function getSupabaseStoreRequests(storeId: string) {
  if (!hasSupabaseEnv() || !isUuid(storeId)) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("premium_requests")
    .select(REQUEST_SELECT)
    .eq("store_id", storeId)
    .is("archived_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return ((data || []) as PremiumRequestRow[]).map(mapRequest);
}

export async function getStoreRequests(storeId: string): Promise<PremiumRequest[]> {
  const supabaseRequests = await getSupabaseStoreRequests(storeId);

  if (supabaseRequests) {
    return supabaseRequests;
  }

  return demoRequests.filter((request) => request.storeId === storeId);
}
