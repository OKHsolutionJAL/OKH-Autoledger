export type Locale = "pt" | "en" | "ja" | "es";

export type UserRole =
  | "okh_admin_master"
  | "okh_operator"
  | "store_owner"
  | "store_employee"
  | "read_only";

export type StorePlan = "starter" | "pro" | "premium_operational";
export type StoreStatus = "active" | "overdue" | "blocked" | "free_trial" | "cancelled";

export type VehicleStatus =
  | "entry"
  | "in_preparation"
  | "waiting_parts"
  | "waiting_shaken"
  | "ready_for_sale"
  | "listed"
  | "reserved"
  | "sold"
  | "archived"
  | "loss";

export type VehicleOrigin = "auction" | "direct_purchase" | "trade_in" | "consignment" | "internal_resale" | "other";
export type VehicleIntakeMode = "complete" | "photo_minimal";
export type VehicleVerificationStatus = "draft" | "pending_review" | "verified" | "rejected";

export type ChecklistStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type Store = {
  id: string;
  storeCode: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  plan: StorePlan;
  status: StoreStatus;
  carLimit: number | null;
  premiumEntryEnabled: boolean;
  monthlyRevenue: number;
  activeCarsMonth: number;
  carsThisMonth: number;
};

export type Profile = {
  id: string;
  storeId: string | null;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "blocked" | "invited" | "inactive";
  canEditFinancials: boolean;
};

export type Vehicle = {
  id: string;
  storeId: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  chassis: string;
  mileage: number;
  color: string;
  origin: VehicleOrigin;
  purchasePrice: number;
  entryDate: string;
  status: VehicleStatus;
  advertisedPrice: number;
  minimumPrice: number;
  soldPrice: number | null;
  soldDate: string | null;
  notes: string;
  imageFocus: string;
  intakeMode: VehicleIntakeMode;
  verificationStatus: VehicleVerificationStatus;
  verifiedAt: string | null;
  signedAt: string | null;
};

export type VehicleCost = {
  id: string;
  storeId: string;
  vehicleId: string;
  category: string;
  description: string;
  estimatedValue: number;
  actualValue: number;
  costDate: string;
  notes: string;
};

export type VehicleFile = {
  id: string;
  storeId: string;
  vehicleId: string | null;
  premiumRequestId: string | null;
  fileType: string;
  fileUrl: string;
  description: string;
  uploadedBy: string | null;
  createdAt: string;
};

export type ChecklistItem = {
  id: string;
  storeId: string;
  vehicleId: string;
  name: string;
  category: string;
  status: ChecklistStatus;
  estimatedValue: number;
  actualValue: number;
  dueDate: string;
  completedAt: string | null;
  notes: string;
};

export type PremiumRequest = {
  id: string;
  storeId: string;
  vehicleName: string;
  priority: "low" | "normal" | "high";
  status: "received" | "in_review" | "missing_information" | "registering" | "published" | "cancelled";
  createdAt: string;
};

export type VehicleTotals = {
  totalEstimatedCosts: number;
  totalActualCosts: number;
  estimatedTotalInvestment: number;
  actualTotalInvestment: number;
  estimatedProfit: number;
  actualProfit: number | null;
  marginPercentage: number;
  costDelta: number;
};

export type AppSession = {
  profile: Profile;
  store: Store | null;
  role: UserRole;
  isAdmin: boolean;
};
