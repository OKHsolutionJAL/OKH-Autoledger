"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { normalizeLocale } from "@/lib/i18n";
import type { UserRole } from "@/lib/domain";

type LoginProfile = {
  role: UserRole;
  status: "active" | "blocked" | "invited" | "inactive";
};

function loginUrl(locale: string, status: string) {
  return `/login?locale=${locale}&auth=${status}`;
}

export async function signInAction(formData: FormData) {
  const locale = normalizeLocale(String(formData.get("locale") || "pt"));
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect(loginUrl(locale, "missing-fields"));
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(loginUrl(locale, "missing-env"));
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.user) {
    redirect(loginUrl(locale, "invalid-credentials"));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", data.user.id)
    .maybeSingle<LoginProfile>();

  if (!profile) {
    await supabase.auth.signOut();
    redirect(loginUrl(locale, "missing-profile"));
  }

  if (profile.status !== "active") {
    await supabase.auth.signOut();
    redirect(loginUrl(locale, "blocked-profile"));
  }

  const destination =
    profile.role === "okh_admin_master" || profile.role === "okh_operator" ? "/admin/dashboard" : "/loja/dashboard";

  redirect(`${destination}?locale=${locale}`);
}

export async function signOutAction(formData: FormData) {
  const locale = normalizeLocale(String(formData.get("locale") || "pt"));
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect(loginUrl(locale, "signed-out"));
}
