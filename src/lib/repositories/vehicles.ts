import { vehicleCosts as demoVehicleCosts, vehicles as demoVehicles } from "@/lib/demo-data";
import type { Vehicle, VehicleCost, VehicleOrigin, VehicleStatus } from "@/lib/domain";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

type VehicleRow = {
  id: string;
  store_id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  chassis: string;
  mileage: number | null;
  color: string | null;
  origin: VehicleOrigin;
  purchase_price: number | null;
  entry_date: string | null;
  status: VehicleStatus;
  advertised_price: number | null;
  minimum_price: number | null;
  sold_price: number | null;
  sold_date: string | null;
  notes: string | null;
};

type VehicleCostRow = {
  id: string;
  store_id: string;
  vehicle_id: string;
  category: string;
  description: string;
  estimated_value: number | null;
  actual_value: number | null;
  cost_date: string | null;
  notes: string | null;
};

const VEHICLE_SELECT =
  "id, store_id, brand, model, year, plate, chassis, mileage, color, origin, purchase_price, entry_date, status, advertised_price, minimum_price, sold_price, sold_date, notes";

const VEHICLE_COST_SELECT = "id, store_id, vehicle_id, category, description, estimated_value, actual_value, cost_date, notes";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value: string) {
  return uuidPattern.test(value);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function mapVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    storeId: row.store_id,
    brand: row.brand,
    model: row.model,
    year: row.year,
    plate: row.plate,
    chassis: row.chassis,
    mileage: row.mileage ?? 0,
    color: row.color || "Nao informado",
    origin: row.origin,
    purchasePrice: row.purchase_price ?? 0,
    entryDate: row.entry_date || todayIsoDate(),
    status: row.status,
    advertisedPrice: row.advertised_price ?? 0,
    minimumPrice: row.minimum_price ?? 0,
    soldPrice: row.sold_price,
    soldDate: row.sold_date,
    notes: row.notes || "",
    imageFocus: "center"
  };
}

function mapVehicleCost(row: VehicleCostRow): VehicleCost {
  return {
    id: row.id,
    storeId: row.store_id,
    vehicleId: row.vehicle_id,
    category: row.category,
    description: row.description,
    estimatedValue: row.estimated_value ?? 0,
    actualValue: row.actual_value ?? 0,
    costDate: row.cost_date || todayIsoDate(),
    notes: row.notes || ""
  };
}

async function getSupabaseClientForData() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  return createSupabaseServerClient();
}

async function getSupabaseStoreVehicles(storeId: string) {
  if (!isUuid(storeId)) {
    return null;
  }

  const supabase = await getSupabaseClientForData();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("vehicles")
    .select(VEHICLE_SELECT)
    .eq("store_id", storeId)
    .is("archived_at", null)
    .order("entry_date", { ascending: false });

  if (error || !data?.length) {
    return null;
  }

  return (data as VehicleRow[]).map(mapVehicle);
}

async function getSupabaseVehicle(vehicleId: string) {
  if (!isUuid(vehicleId)) {
    return null;
  }

  const supabase = await getSupabaseClientForData();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("vehicles")
    .select(VEHICLE_SELECT)
    .eq("id", vehicleId)
    .is("archived_at", null)
    .maybeSingle<VehicleRow>();

  if (error || !data) {
    return null;
  }

  return mapVehicle(data);
}

async function getSupabaseVehicleCosts(vehicleId: string) {
  if (!isUuid(vehicleId)) {
    return null;
  }

  const supabase = await getSupabaseClientForData();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("vehicle_costs")
    .select(VEHICLE_COST_SELECT)
    .eq("vehicle_id", vehicleId)
    .is("archived_at", null)
    .order("cost_date", { ascending: false });

  if (error) {
    return null;
  }

  return ((data || []) as VehicleCostRow[]).map(mapVehicleCost);
}

export async function getStoreVehicles(storeId: string): Promise<Vehicle[]> {
  const supabaseVehicles = await getSupabaseStoreVehicles(storeId);

  if (supabaseVehicles) {
    return supabaseVehicles;
  }

  return demoVehicles.filter((vehicle) => vehicle.storeId === storeId);
}

export async function getVehicleById(vehicleId: string): Promise<Vehicle | null> {
  const supabaseVehicle = await getSupabaseVehicle(vehicleId);

  if (supabaseVehicle) {
    return supabaseVehicle;
  }

  return demoVehicles.find((vehicle) => vehicle.id === vehicleId) || null;
}

export async function getVehicleCosts(vehicleId: string): Promise<VehicleCost[]> {
  const supabaseCosts = await getSupabaseVehicleCosts(vehicleId);

  if (supabaseCosts) {
    return supabaseCosts;
  }

  return demoVehicleCosts.filter((cost) => cost.vehicleId === vehicleId);
}
