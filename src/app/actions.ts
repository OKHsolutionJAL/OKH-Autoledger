"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { normalizeLocale } from "@/lib/i18n";
import type { ChecklistStatus, StorePlan, UserRole, VehicleIntakeMode, VehicleOrigin } from "@/lib/domain";
import { slugifyListing } from "@/lib/social-listing";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const vehicleOrigins: VehicleOrigin[] = ["auction", "direct_purchase", "trade_in", "consignment", "internal_resale", "other"];
const checklistStatuses: ChecklistStatus[] = ["pending", "in_progress", "completed", "cancelled"];
const verificationRoles: UserRole[] = ["okh_admin_master", "okh_operator", "store_owner"];
const maxUploadSize = 10 * 1024 * 1024;

type SupabaseServerClient = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;
type ActionProfile = { role: UserRole; can_edit_financials: boolean };
type ListingVehicleRow = {
  id: string;
  store_id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number | null;
  color: string | null;
  advertised_price: number | null;
  notes: string | null;
};
type ListingStoreRow = { name: string; phone: string | null };

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

function readChecklistStatus(formData: FormData) {
  const status = readText(formData, "status") as ChecklistStatus;
  return checklistStatuses.includes(status) ? status : "pending";
}

function readIntakeMode(formData: FormData): VehicleIntakeMode {
  return readText(formData, "intakeMode") === "photo_minimal" ? "photo_minimal" : "complete";
}

function canVerifyVehicleRegistration(role?: UserRole) {
  return role ? verificationRoles.includes(role) : false;
}

function getUploadFile(formData: FormData, name: string) {
  const value = formData.get(name);
  return value instanceof File && value.size > 0 ? value : null;
}

function getFileExtension(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (fromName) {
    return fromName;
  }

  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "application/pdf") return "pdf";
  return "jpg";
}

function uploadPath(storeId: string, vehicleId: string, folder: "photos" | "documents", file: File) {
  return `stores/${storeId}/vehicles/${vehicleId}/${folder}/${randomUUID()}.${getFileExtension(file)}`;
}

async function getActionProfile(supabase: SupabaseServerClient, userId: string) {
  const { data } = await supabase.from("profiles").select("role, can_edit_financials").eq("id", userId).maybeSingle<ActionProfile>();
  return data;
}

async function uploadVehicleFile({
  supabase,
  storeId,
  vehicleId,
  userId,
  file,
  fileType,
  description
}: {
  supabase: SupabaseServerClient;
  storeId: string;
  vehicleId: string;
  userId: string;
  file: File;
  fileType: "vehicle_photo" | "document_photo";
  description: string;
}) {
  if (file.size > maxUploadSize) {
    return { error: "too-large" };
  }

  const bucket = fileType === "vehicle_photo" ? "vehicle-photos" : "vehicle-documents";
  const path = uploadPath(storeId, vehicleId, fileType === "vehicle_photo" ? "photos" : "documents", file);
  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false
  });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { error: metadataError } = await supabase.from("files").insert({
    store_id: storeId,
    vehicle_id: vehicleId,
    file_type: fileType,
    file_url: `${bucket}:${path}`,
    description,
    uploaded_by: userId
  });

  if (metadataError) {
    return { error: metadataError.message };
  }

  return { error: null };
}

export async function createVehicleAction(formData: FormData) {
  const locale = normalizeLocale(readText(formData, "locale") || "pt");
  const intakeMode = readIntakeMode(formData);
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
  const vehiclePhoto = getUploadFile(formData, "vehiclePhoto");
  const documentPhoto = getUploadFile(formData, "documentPhoto");
  const documentPhotoExtra = getUploadFile(formData, "documentPhotoExtra");

  if (intakeMode === "complete" && (!storeId || !brand || !model || !year || !plate || !chassis || !entryDate)) {
    redirect(`/loja/entrada?locale=${locale}&vehicle=missing-fields`);
  }

  if (intakeMode === "photo_minimal" && !vehiclePhoto && !documentPhoto && !documentPhotoExtra) {
    redirect(`/loja/entrada?locale=${locale}&vehicle=missing-files`);
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const profile = await getActionProfile(supabase, user.id);
      const canSign = canVerifyVehicleRegistration(profile?.role);
      const now = new Date().toISOString();
      const pendingCode = randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
      const verificationStatus = intakeMode === "complete" && canSign ? "verified" : "pending_review";
      const { data, error } = await supabase
        .from("vehicles")
        .insert({
        store_id: storeId,
        brand: brand || "A identificar",
        model: model || "Entrada por fotos",
        year: year || Number(new Date().getFullYear()),
        plate: plate || `PEND-${pendingCode}`,
        chassis: chassis || `PENDING-${pendingCode}`,
        mileage,
        color: color || null,
        origin,
        purchase_price: purchasePrice,
        entry_date: entryDate || new Date().toISOString().slice(0, 10),
        status: "entry",
        advertised_price: advertisedPrice,
        minimum_price: minimumPrice,
        notes: notes || null,
        created_by: user.id,
        intake_mode: intakeMode,
        verification_status: verificationStatus,
        verified_at: verificationStatus === "verified" ? now : null,
        verified_by: verificationStatus === "verified" ? user.id : null,
        signed_at: verificationStatus === "verified" ? now : null,
        signed_by: verificationStatus === "verified" ? user.id : null
      })
        .select("id")
        .single<{ id: string }>();

      if (error || !data) {
        redirect(`/loja/entrada?locale=${locale}&vehicle=create-error`);
      }

      const uploads = [
        vehiclePhoto ? uploadVehicleFile({ supabase, storeId, vehicleId: data.id, userId: user.id, file: vehiclePhoto, fileType: "vehicle_photo", description: "Foto principal do carro" }) : null,
        documentPhoto ? uploadVehicleFile({ supabase, storeId, vehicleId: data.id, userId: user.id, file: documentPhoto, fileType: "document_photo", description: "Documento do carro" }) : null,
        documentPhotoExtra ? uploadVehicleFile({ supabase, storeId, vehicleId: data.id, userId: user.id, file: documentPhotoExtra, fileType: "document_photo", description: "Documento extra" }) : null
      ].filter(Boolean);

      for (const upload of uploads) {
        const result = upload ? await upload : { error: null };
        if (result.error) {
          redirect(`/loja/carros/${data.id}?locale=${locale}&vehicle=upload-error`);
        }
      }

      revalidatePath("/loja/dashboard");
      revalidatePath("/loja/carros");
      redirect(`/loja/carros?locale=${locale}&vehicle=${verificationStatus === "verified" ? "created-verified" : "created-pending"}`);
    }
  }

  revalidatePath("/loja/carros");
  redirect(`/loja/carros?locale=${locale}&vehicle=demo-validated`);
}

export async function verifyVehicleAction(formData: FormData) {
  const locale = normalizeLocale(readText(formData, "locale") || "pt");
  const vehicleId = readText(formData, "vehicleId");
  const notes = readText(formData, "completionNotes");

  if (!vehicleId) {
    redirect(`/loja/carros?locale=${locale}&vehicle=verify-error`);
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const profile = await getActionProfile(supabase, user.id);

      if (!canVerifyVehicleRegistration(profile?.role)) {
        redirect(`/loja/carros/${vehicleId}?locale=${locale}&vehicle=verify-denied`);
      }

      const now = new Date().toISOString();
      const { error } = await supabase
        .from("vehicles")
        .update({
          verification_status: "verified",
          verified_at: now,
          verified_by: user.id,
          signed_at: now,
          signed_by: user.id,
          completion_notes: notes || null
        })
        .eq("id", vehicleId);

      if (error) {
        redirect(`/loja/carros/${vehicleId}?locale=${locale}&vehicle=verify-error`);
      }

      revalidatePath("/loja/carros");
      revalidatePath(`/loja/carros/${vehicleId}`);
      redirect(`/loja/carros/${vehicleId}?locale=${locale}&vehicle=verified`);
    }
  }

  revalidatePath("/loja/carros");
  redirect(`/loja/carros/${vehicleId}?locale=${locale}&vehicle=demo-verified`);
}

export async function createPreparationTaskAction(formData: FormData) {
  const locale = normalizeLocale(readText(formData, "locale") || "pt");
  const storeId = readText(formData, "storeId");
  const vehicleId = readText(formData, "vehicleId");
  const name = readText(formData, "name");
  const category = readText(formData, "category") || "Preparacao";
  const dueDate = readText(formData, "dueDate");
  const estimatedValue = readNumber(formData, "estimatedValue");
  const notes = readText(formData, "notes");

  if (!storeId || !vehicleId || !name) {
    redirect(`/loja/preparacao?locale=${locale}&prep=missing-fields`);
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from("vehicle_checklist_items").insert({
        store_id: storeId,
        vehicle_id: vehicleId,
        name,
        category,
        status: "pending",
        estimated_value: estimatedValue,
        actual_value: 0,
        responsible_user_id: user.id,
        due_date: dueDate || null,
        notes: notes || null
      });

      if (error) {
        redirect(`/loja/preparacao?locale=${locale}&prep=create-error`);
      }

      revalidatePath("/loja/dashboard");
      revalidatePath("/loja/preparacao");
      redirect(`/loja/preparacao?locale=${locale}&prep=created`);
    }
  }

  revalidatePath("/loja/preparacao");
  redirect(`/loja/preparacao?locale=${locale}&prep=demo-validated`);
}

export async function updatePreparationTaskStatusAction(formData: FormData) {
  const locale = normalizeLocale(readText(formData, "locale") || "pt");
  const taskId = readText(formData, "taskId");
  const vehicleId = readText(formData, "vehicleId");
  const status = readChecklistStatus(formData);

  if (!taskId) {
    redirect(`/loja/preparacao?locale=${locale}&prep=update-error`);
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("vehicle_checklist_items")
        .update({
          status,
          completed_at: status === "completed" ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq("id", taskId);

      if (error) {
        redirect(`/loja/preparacao?locale=${locale}&prep=update-error`);
      }

      revalidatePath("/loja/dashboard");
      revalidatePath("/loja/preparacao");
      if (vehicleId) revalidatePath(`/loja/carros/${vehicleId}`);
      redirect(`/loja/preparacao?locale=${locale}&prep=updated`);
    }
  }

  revalidatePath("/loja/preparacao");
  redirect(`/loja/preparacao?locale=${locale}&prep=demo-validated`);
}

export async function publishVehicleListingAction(formData: FormData) {
  const locale = normalizeLocale(readText(formData, "locale") || "pt");
  const vehicleId = readText(formData, "vehicleId");
  const fallbackSlug = readText(formData, "listingSlug");
  const publicNotes = readText(formData, "publicNotes");
  const intent = readText(formData, "intent") === "view" ? "view" : "generate";

  if (!vehicleId) {
    redirect(`/loja/anuncios?locale=${locale}&shared=publish-error`);
  }

  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { data: vehicle, error: vehicleError } = await supabase
        .from("vehicles")
        .select("id, store_id, brand, model, year, mileage, color, advertised_price, notes")
        .eq("id", vehicleId)
        .maybeSingle<ListingVehicleRow>();

      if (vehicleError || !vehicle) {
        redirect(`/loja/anuncios?locale=${locale}&shared=publish-error`);
      }

      const { data: store } = await supabase.from("stores").select("name, phone").eq("id", vehicle.store_id).maybeSingle<ListingStoreRow>();
      const slug = `${slugifyListing(`${vehicle.year} ${vehicle.brand} ${vehicle.model}`)}-${vehicle.id.slice(0, 8)}`;
      const title = `${vehicle.year} ${vehicle.brand} ${vehicle.model}`;
      const description = publicNotes || vehicle.notes || "Veiculo disponivel para consulta. Confira disponibilidade com a loja.";

      const { data, error } = await supabase
        .from("vehicle_public_listings")
        .upsert(
          {
            store_id: vehicle.store_id,
            vehicle_id: vehicle.id,
            slug,
            title,
            subtitle: `${vehicle.color || "Nao informado"} - ${(vehicle.mileage ?? 0).toLocaleString("ja-JP")} km`,
            price: vehicle.advertised_price ?? 0,
            mileage: vehicle.mileage ?? 0,
            year: vehicle.year,
            color: vehicle.color || null,
            store_name: store?.name || "OKH AutoLedger",
            store_phone: store?.phone || null,
            description,
            photo_url: "/assets/premium-sport-garage.png",
            active: true,
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: user.id
          },
          { onConflict: "vehicle_id" }
        )
        .select("slug")
        .single<{ slug: string }>();

      if (error || !data) {
        redirect(`/loja/anuncios?locale=${locale}&vehicle=${vehicleId}&shared=publish-error`);
      }

      revalidatePath("/loja/anuncios");
      revalidatePath(`/v/${data.slug}`);
      if (intent === "view") {
        redirect(`/v/${data.slug}?locale=${locale}`);
      }

      redirect(`/loja/anuncios?locale=${locale}&vehicle=${vehicleId}&shared=published&slug=${data.slug}`);
    }
  }

  const demoSlug = fallbackSlug || vehicleId;

  if (intent === "view") {
    redirect(`/v/${demoSlug}?locale=${locale}`);
  }

  redirect(`/loja/anuncios?locale=${locale}&vehicle=${vehicleId}&shared=published&slug=${demoSlug}`);
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
