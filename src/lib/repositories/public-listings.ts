import { stores as demoStores, vehicles as demoVehicles } from "@/lib/demo-data";
import type { Store, Vehicle } from "@/lib/domain";
import { defaultListingSlug } from "@/lib/social-listing";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

export type VehiclePublicListing = {
  id: string;
  storeId: string;
  vehicleId: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  mileage: number;
  year: number;
  color: string;
  storeName: string;
  storePhone: string;
  description: string;
  photoUrl: string;
  publishedAt: string;
};

type ListingRow = {
  id: string;
  store_id: string;
  vehicle_id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  price: number | null;
  mileage: number | null;
  year: number | null;
  color: string | null;
  store_name: string;
  store_phone: string | null;
  description: string | null;
  photo_url: string | null;
  published_at: string;
};

const LISTING_SELECT =
  "id, store_id, vehicle_id, slug, title, subtitle, price, mileage, year, color, store_name, store_phone, description, photo_url, published_at";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i;
const fallbackPhotoUrl = "/assets/premium-sport-garage.png";

function isUuid(value: string) {
  return uuidPattern.test(value);
}

function publicPhotoUrl(value?: string | null) {
  if (!value) {
    return fallbackPhotoUrl;
  }

  if (value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return fallbackPhotoUrl;
}

function mapListing(row: ListingRow): VehiclePublicListing {
  return {
    id: row.id,
    storeId: row.store_id,
    vehicleId: row.vehicle_id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || "",
    price: row.price ?? 0,
    mileage: row.mileage ?? 0,
    year: row.year ?? new Date().getFullYear(),
    color: row.color || "Nao informado",
    storeName: row.store_name,
    storePhone: row.store_phone || "",
    description: row.description || "",
    photoUrl: publicPhotoUrl(row.photo_url),
    publishedAt: row.published_at
  };
}

function demoListing(vehicle: Vehicle, store?: Store): VehiclePublicListing {
  return {
    id: `demo-${vehicle.id}`,
    storeId: vehicle.storeId,
    vehicleId: vehicle.id,
    slug: defaultListingSlug(vehicle),
    title: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
    subtitle: `${vehicle.color} - ${vehicle.mileage.toLocaleString("ja-JP")} km`,
    price: vehicle.advertisedPrice,
    mileage: vehicle.mileage,
    year: vehicle.year,
    color: vehicle.color,
    storeName: store?.name || "OKH AutoLedger",
    storePhone: store?.phone || "",
    description: vehicle.notes || "Veiculo disponivel para consulta. Confira disponibilidade com a loja.",
    photoUrl: fallbackPhotoUrl,
    publishedAt: "2026-07-11T00:00:00+09:00"
  };
}

async function getSupabaseListingByVehicleId(vehicleId: string) {
  if (!hasSupabaseEnv() || !isUuid(vehicleId)) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("vehicle_public_listings")
    .select(LISTING_SELECT)
    .eq("vehicle_id", vehicleId)
    .eq("active", true)
    .is("archived_at", null)
    .maybeSingle<ListingRow>();

  if (error || !data) {
    return null;
  }

  return mapListing(data);
}

async function getSupabaseListingBySlug(slug: string) {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("vehicle_public_listings")
    .select(LISTING_SELECT)
    .eq("slug", slug)
    .eq("active", true)
    .is("archived_at", null)
    .maybeSingle<ListingRow>();

  if (error || !data) {
    return null;
  }

  return mapListing(data);
}

export async function getPublicListingByVehicleId(vehicleId: string): Promise<VehiclePublicListing | null> {
  return getSupabaseListingByVehicleId(vehicleId);
}

export async function getPublicListingBySlug(slug: string): Promise<VehiclePublicListing | null> {
  const supabaseListing = await getSupabaseListingBySlug(slug);

  if (supabaseListing) {
    return supabaseListing;
  }

  const vehicle = demoVehicles.find((item) => defaultListingSlug(item) === slug || item.id === slug);

  if (!vehicle) {
    return null;
  }

  return demoListing(vehicle, demoStores.find((store) => store.id === vehicle.storeId));
}
