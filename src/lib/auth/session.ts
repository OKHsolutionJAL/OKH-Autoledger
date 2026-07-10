import { profiles, stores } from "@/lib/demo-data";
import type { AppSession, UserRole } from "@/lib/domain";

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

export function requireStore(session: AppSession) {
  if (!session.store) {
    throw new Error("Store context is required for this route.");
  }

  return session.store;
}

export function canEditFinancials(session: AppSession) {
  return session.isAdmin || session.profile.canEditFinancials;
}
