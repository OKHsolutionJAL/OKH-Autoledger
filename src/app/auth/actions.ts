"use server";

import { headers } from "next/headers";
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

function pageUrl(page: string, locale: string, statusKey: string, status: string) {
  return `/${page}?locale=${locale}&${statusKey}=${status}`;
}

async function getOrigin() {
  const headerStore = await headers();
  return headerStore.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3001";
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

export async function signUpAction(formData: FormData) {
  const locale = normalizeLocale(String(formData.get("locale") || "pt"));
  const name = String(formData.get("name") || "").trim();
  const storeName = String(formData.get("storeName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!name || !storeName || !email || !password || !confirmPassword) {
    redirect(pageUrl("cadastro", locale, "auth", "missing-fields"));
  }

  if (password.length < 8) {
    redirect(pageUrl("cadastro", locale, "auth", "weak-password"));
  }

  if (password !== confirmPassword) {
    redirect(pageUrl("cadastro", locale, "auth", "password-mismatch"));
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(pageUrl("cadastro", locale, "auth", "missing-env"));
  }

  const origin = await getOrigin();
  const next = `/login?locale=${locale}&auth=confirmed`;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
      data: {
        name,
        store_name: storeName,
        phone,
        address
      }
    }
  });

  if (error) {
    redirect(pageUrl("cadastro", locale, "auth", "signup-error"));
  }

  redirect(loginUrl(locale, "check-email"));
}

export async function requestPasswordResetAction(formData: FormData) {
  const locale = normalizeLocale(String(formData.get("locale") || "pt"));
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!email) {
    redirect(pageUrl("recuperar-senha", locale, "auth", "missing-email"));
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(pageUrl("recuperar-senha", locale, "auth", "missing-env"));
  }

  const origin = await getOrigin();
  const next = `/redefinir-senha?locale=${locale}`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`
  });

  if (error) {
    redirect(pageUrl("recuperar-senha", locale, "auth", "reset-error"));
  }

  redirect(pageUrl("recuperar-senha", locale, "auth", "reset-sent"));
}

export async function updatePasswordAction(formData: FormData) {
  const locale = normalizeLocale(String(formData.get("locale") || "pt"));
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!password || !confirmPassword) {
    redirect(pageUrl("redefinir-senha", locale, "auth", "missing-fields"));
  }

  if (password.length < 8) {
    redirect(pageUrl("redefinir-senha", locale, "auth", "weak-password"));
  }

  if (password !== confirmPassword) {
    redirect(pageUrl("redefinir-senha", locale, "auth", "password-mismatch"));
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(pageUrl("redefinir-senha", locale, "auth", "missing-env"));
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(pageUrl("redefinir-senha", locale, "auth", "update-error"));
  }

  await supabase.auth.signOut();
  redirect(loginUrl(locale, "password-updated"));
}

export async function updateProfileAction(formData: FormData) {
  const locale = normalizeLocale(String(formData.get("locale") || "pt"));
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    redirect(pageUrl("perfil", locale, "profile", "missing-name"));
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(pageUrl("perfil", locale, "profile", "missing-env"));
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(loginUrl(locale, "session-required"));
  }

  const { error } = await supabase.from("profiles").update({ name, updated_at: new Date().toISOString() }).eq("id", user.id);

  if (error) {
    redirect(pageUrl("perfil", locale, "profile", "update-error"));
  }

  await supabase.auth.updateUser({ data: { name } });
  redirect(pageUrl("perfil", locale, "profile", "updated"));
}

export async function signOutAction(formData: FormData) {
  const locale = normalizeLocale(String(formData.get("locale") || "pt"));
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect(loginUrl(locale, "signed-out"));
}
