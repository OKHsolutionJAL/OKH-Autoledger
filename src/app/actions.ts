"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { normalizeLocale } from "@/lib/i18n";
import type { StorePlan, VehicleOrigin } from "@/lib/domain";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const vehicleOrigins: VehicleOrigin[] = ["auction", "direct_purchase", "trade_in", "consignment", "internal_resale", "other"];

function readText(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

function readNumber(formData: FormData, name: string) {
  const value = Number(formData.get(name) || 0);
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}

function readOptionalNumber(formData: FormData, name: string) {
  const raw = readText(formData, name);
  if (!raw) {
    return null;
  }

  const value = Number(raw);
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : null;
}

function readVehicleOrigin(formData: FormData) {
  const origin = readText(formData, "origin") as VehicleOrigin;
  return vehicleOrigins.includes(origin) ? origin : "auction";
}

export async function createVehicleAction(formData: FormData) {
  const locale = normalizeLocale(readText(formData, "locale") || "pt");
  const storeId = readText(formData, "storeId");
  const brand = readText(formData, "brand");
  const model = readText(formData, "model");
  const year = readNumber(formData, "year");
  const plate = readText(formData, "plate").toUpperCase();
  const chassis = readText(formData, "chassis").toUpperCase();
  const mileage = readNumber(formData, "mileage");
  const color = readText(formData, "color");
  const origin = readVehicleOrigin(formData);
  const purchasePrice = readNumber(formData, "purchasePrice");
  const entryDate = readText(formData, "entryDate");
  const advertisedPrice = readOptionalNumber(formData, "advertisedPrice");
  const minimumPrice = readOptionalNumber(formData, "minimumPrice");
  const notes = readText(formData, "notes");

  if (!storeId || !brand || !model || !year || !plate || !chassis || !entryDate) {
    redirect(`/loja/entrada?locale=${locale}&vehicle=missing-fields`);
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from("vehicles").insert({
        store_id: storeId,
        brand,
        model,
        year,
        plate,
        chassis,
        mileage,
        color: color || null,
        origin,
        purchase_price: purchasePrice,
        entry_date: entryDate,
        status: "entry",
        advertised_price: advertisedPrice,
        minimum_price: minimumPrice,
        notes: notes || null,
        created_by: user.id
      });

      if (error) {
        redirect(`/loja/entrada?locale=${locale}&vehicle=create-error`);
      }

      revalidatePath("/loja/dashboard");
      revalidatePath("/loja/carros");
      redirect(`/loja/carros?locale=${locale}&vehicle=created`);
    }
  }

  revalidatePath("/loja/carros");
  redirect(`/loja/carros?locale=${locale}&vehicle=demo-validated`);
}

export async function createStoreAction(formData: FormData) {
  const locale = normalizeLocale(String(formData.get("locale") || "pt"));
  const name = String(formData.get("name") || "").trim();
  const ownerName = String(formData.get("ownerName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const plan = String(formData.get("plan") || "starter") as StorePlan;
  const carLimitValue = Number(formData.get("carLimit") || 0);
  const carLimit = Number.isFinite(carLimitValue) && carLimitValue > 0 ? carLimitValue : null;

  if (!name || !ownerName || !email) {
    redirect(`/admin/lojas/nova?locale=${locale}&stores=missing-fields`);
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const storeCode = `OKH-${randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
      const { error } = await supabase.from("stores").insert({
        store_code: storeCode,
        name,
        owner_name: ownerName,
        email,
        phone: phone || null,
        address: address || null,
        plan,
        status: "free_trial",
        car_limit: carLimit,
        premium_entry_enabled: plan === "premium_operational"
      });

      if (error) {
        redirect(`/admin/lojas/nova?locale=${locale}&stores=create-error`);
      }

      revalidatePath("/admin/dashboard");
      revalidatePath("/admin/lojas");
      redirect(`/admin/lojas?locale=${locale}&stores=created`);
    }
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/lojas");
  redirect(`/admin/lojas?locale=${locale}&stores=demo-validated`);
}
