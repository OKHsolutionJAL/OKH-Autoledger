import { checklistItems as demoChecklistItems } from "@/lib/demo-data";
import { todayInJapan } from "@/lib/dates";
import type { ChecklistItem, ChecklistStatus } from "@/lib/domain";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

type ChecklistRow = {
  id: string;
  store_id: string;
  vehicle_id: string;
  name: string;
  category: string;
  status: ChecklistStatus;
  estimated_value: number | null;
  actual_value: number | null;
  due_date: string | null;
  completed_at: string | null;
  notes: string | null;
};

const CHECKLIST_SELECT = "id, store_id, vehicle_id, name, category, status, estimated_value, actual_value, due_date, completed_at, notes";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value: string) {
  return uuidPattern.test(value);
}

function todayIsoDate() {
  return todayInJapan();
}

function mapChecklistItem(row: ChecklistRow): ChecklistItem {
  return {
    id: row.id,
    storeId: row.store_id,
    vehicleId: row.vehicle_id,
    name: row.name,
    category: row.category,
    status: row.status,
    estimatedValue: row.estimated_value ?? 0,
    actualValue: row.actual_value ?? 0,
    dueDate: row.due_date || todayIsoDate(),
    completedAt: row.completed_at,
    notes: row.notes || ""
  };
}

async function getSupabasePreparationItems(storeId: string) {
  if (!hasSupabaseEnv() || !isUuid(storeId)) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("vehicle_checklist_items")
    .select(CHECKLIST_SELECT)
    .eq("store_id", storeId)
    .is("archived_at", null)
    .order("due_date", { ascending: true });

  if (error) {
    return null;
  }

  return ((data || []) as ChecklistRow[]).map(mapChecklistItem);
}

export async function getPreparationItems(storeId: string): Promise<ChecklistItem[]> {
  const supabaseItems = await getSupabasePreparationItems(storeId);

  if (supabaseItems) {
    return supabaseItems;
  }

  return demoChecklistItems.filter((item) => item.storeId === storeId);
}
