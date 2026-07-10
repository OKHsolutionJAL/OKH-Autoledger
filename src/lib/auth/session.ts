import { profiles, stores } from "@/lib/demo-data";
import type { AppSession, UserRole } from "@/lib/domain";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

const demoRoleToProfile: Record<string, UserRole> = {
  owner: "store_owner",
  employee: "store_employee",
  readonly: "read_only",
  admin: "okh_admin_master",
  operator: "okh_operator"
};

export function resolveDemoRole(input?: string): UserRole {
  return demoRoleToProfile[input || ""] || (input as UserRole) || "store_owner";
}

export function getDemoSession(roleInput?: string, storeId = "store-1"): AppSession {
  const role = resolveDemoRole(roleInput);
  const profile =
    profiles.find((item) => item.role === role && (item.storeId === storeId || item.storeId === null)) ||
    profiles.find((item) => item.role === "store_owner") ||
    profiles[0];
  const store = profile.storeId ? stores.find((item) => item.id === profile.storeId) || stores[0] : stores.find((item) => item.id === storeId) || stores[0];

  return {
    profile: { ...profile, role },
    store,
    role,
    isAdmin: role === "okh_admin_master" || role === "okh_operator"
  };
}

type ProfileRow = {
  id: string;
  store_id: string | null;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "blocked" | "invited" | "inactive";
  can_edit_financials: boolean;
};

type StoreRow = {
  id: string;
  store_code: string;
  name: string;
  owner_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  plan: "starter" | "pro" | "premium_operational";
  status: "active" | "overdue" | "blocked" | "free_trial" | "cancelled";
  car_limit: number | null;
  premium_entry_enabled: boolean;
};

function isDemoModeEnabled() {
  return process.env.NEXT_PUBLIC_OKH_DEMO_MODE !== "false";
}

function mapProfile(row: ProfileRow) {
  return {
    id: row.id,
    storeId: row.store_id,
    name: row.name,
    email: row.email,
    role: row.role,
    status: row.status,
    canEditFinancials: row.can_edit_financials
  };
}

function mapStore(row: StoreRow) {
  return {
    id: row.id,
    storeCode: row.store_code,
    name: row.name,
    ownerName: row.owner_name,
    email: row.email,
    phone: row.phone || "",
    address: row.address || "",
    plan: row.plan,
    status: row.status,
    carLimit: row.car_limit,
    premiumEntryEnabled: row.premium_entry_enabled,
    monthlyRevenue: 0,
    activeCarsMonth: 0,
    carsThisMonth: 0
  };
}

export async function getAppSession(roleInput?: string, storeId = "store-1"): Promise<AppSession> {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

    if (supabase && user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, store_id, name, email, role, status, can_edit_financials")
        .eq("id", user.id)
        .maybeSingle<ProfileRow>();

      if (profile && profile.status === "active") {
        const sessionProfile = mapProfile(profile);
        let sessionStore = null;

        if (profile.store_id) {
          const { data: store } = await supabase
            .from("stores")
            .select("id, store_code, name, owner_name, email, phone, address, plan, status, car_limit, premium_entry_enabled")
            .eq("id", profile.store_id)
            .maybeSingle<StoreRow>();

          sessionStore = store ? mapStore(store) : null;
        }

        return {
          profile: sessionProfile,
          store: sessionStore,
          role: profile.role,
          isAdmin: profile.role === "okh_admin_master" || profile.role === "okh_operator"
        };
      }
    }
  }

  if (isDemoModeEnabled()) {
    return getDemoSession(roleInput, storeId);
  }

  return getDemoSession(roleInput, storeId);
}

export function requireStore(session: AppSession) {
  if (!session.store) {
    throw new Error("Store context is required for this route.");
  }

  return session.store;
}

export function canEditFinancials(session: AppSession) {
  return session.isAdmin || session.profile.canEditFinancials;
}
