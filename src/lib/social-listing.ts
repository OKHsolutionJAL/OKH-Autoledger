import type { Locale, Store, Vehicle } from "@/lib/domain";
import { vehicleName, yen } from "@/lib/calculations";

export type SocialPlatform = "whatsapp" | "instagram" | "facebook" | "marketplace";

export type ShareLine = {
  id: string;
  label: string;
  text: string;
  defaultOn: boolean;
};

export type VehicleSharePayload = {
  vehicleId: string;
  headline: string;
  storeName: string;
  publicPath: string;
  platformIntros: Record<SocialPlatform, string>;
  lines: ShareLine[];
  hashtags: string;
};

export const socialPlatformLabels: Record<SocialPlatform, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
  marketplace: "Marketplace"
};

export const socialPlatforms: SocialPlatform[] = ["whatsapp", "instagram", "facebook", "marketplace"];

function formatMileage(value: number) {
  return `${new Intl.NumberFormat("ja-JP").format(value)} km`;
}

export function slugifyListing(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function defaultListingSlug(vehicle: Vehicle) {
  return `${slugifyListing(`${vehicle.year} ${vehicle.brand} ${vehicle.model}`)}-${vehicle.id.slice(0, 8)}`;
}

export function listingPathFromSlug(slug: string, locale: Locale) {
  return `/v/${slug}?locale=${locale}`;
}

export function fallbackListingPath(vehicle: Vehicle, locale: Locale) {
  return listingPathFromSlug(defaultListingSlug(vehicle), locale);
}

export function buildVehicleSharePayload({
  vehicle,
  store,
  locale,
  listingSlug
}: {
  vehicle: Vehicle;
  store: Store | null;
  locale: Locale;
  listingSlug?: string | null;
}): VehicleSharePayload {
  const name = vehicleName(vehicle);
  const storeName = store?.name || "OKH AutoLedger";
  const publicPath = listingSlug ? listingPathFromSlug(listingSlug, locale) : fallbackListingPath(vehicle, locale);

  return {
    vehicleId: vehicle.id,
    headline: `${vehicle.year} ${name}`,
    storeName,
    publicPath,
    platformIntros: {
      whatsapp: `Tenho esse ${name} disponivel na loja.`,
      instagram: `${name} pronto para venda.`,
      facebook: `Confira esse ${name} disponivel agora.`,
      marketplace: `${vehicle.year} ${name} - ${vehicle.color}`
    },
    lines: [
      { id: "price", label: "Preco", text: `Preco anunciado: ${yen(vehicle.advertisedPrice)}`, defaultOn: true },
      { id: "year", label: "Ano", text: `Ano: ${vehicle.year}`, defaultOn: true },
      { id: "mileage", label: "Km", text: `Quilometragem: ${formatMileage(vehicle.mileage)}`, defaultOn: true },
      { id: "color", label: "Cor", text: `Cor: ${vehicle.color}`, defaultOn: true },
      { id: "store", label: "Loja", text: `Loja: ${storeName}`, defaultOn: true },
      { id: "plate", label: "Placa", text: `Placa: ${vehicle.plate}`, defaultOn: false },
      { id: "notes", label: "Observacao", text: vehicle.notes ? `Obs: ${vehicle.notes}` : "Obs: consulte disponibilidade e condicoes.", defaultOn: Boolean(vehicle.notes) }
    ],
    hashtags: "#OKHAutoLedger #CarrosNoJapao #CarrosUsados #AutoSales"
  };
}
