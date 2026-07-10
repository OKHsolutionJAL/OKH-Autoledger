"use server";

import { revalidatePath } from "next/cache";

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
  const name = String(formData.get("name") || "").trim();
  const ownerName = String(formData.get("ownerName") || "").trim();
  const email = String(formData.get("email") || "").trim();

  if (!name || !ownerName || !email) {
    throw new Error("Informe loja, responsavel e email.");
  }

  revalidatePath("/admin/dashboard");
}
