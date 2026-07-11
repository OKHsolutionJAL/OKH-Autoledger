"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { normalizeLocale } from "@/lib/i18n";
import type { StorePlan } from "@/lib/domain";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createVehicleAction(formData: FormData) {
  const storeId = String(formData.get("storeId") || "");
  const brand = String(formData.get("brand") || "").trim();
  const model = String(formData.get("model") || "").trim();

  if (!storeId || !brand || !model) {
    throw new Error("Informe store_id, marca e modelo.");
  }

  // Supabase insert enters here in the next step. For now the action validates
  // the SaaS contract and refreshes the store route.
  revalidatePath("/loja/carros");
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
