import type { ChecklistItem, PremiumRequest, Profile, Store, Vehicle, VehicleCost } from "@/lib/domain";

export const stores: Store[] = [
  {
    id: "store-1",
    storeCode: "OKH-TKY-001",
    name: "Sakura Auto Koshigaya",
    ownerName: "Marcos Tanaka",
    email: "marcos@sakuraauto.jp",
    phone: "+81 90-2200-4188",
    address: "Koshigaya, Saitama",
    plan: "pro",
    status: "active",
    carLimit: 50,
    premiumEntryEnabled: true,
    monthlyRevenue: 9800,
    activeCarsMonth: 6,
    carsThisMonth: 4
  },
  {
    id: "store-2",
    storeCode: "OKH-NGY-014",
    name: "Nagoya Kei Garage",
    ownerName: "Priscila Yamamoto",
    email: "ops@keigarage.jp",
    phone: "+81 80-7720-9911",
    address: "Nagoya, Aichi",
    plan: "starter",
    status: "free_trial",
    carLimit: 20,
    premiumEntryEnabled: false,
    monthlyRevenue: 4980,
    activeCarsMonth: 12,
    carsThisMonth: 3
  },
  {
    id: "store-3",
    storeCode: "OKH-OSA-022",
    name: "Osaka Minivan Base",
    ownerName: "Ana Costa",
    email: "admin@osakaminivan.jp",
    phone: "+81 70-1000-3319",
    address: "Sakai, Osaka",
    plan: "premium_operational",
    status: "overdue",
    carLimit: null,
    premiumEntryEnabled: true,
    monthlyRevenue: 29800,
    activeCarsMonth: 24,
    carsThisMonth: 17
  },
  {
    id: "store-4",
    storeCode: "OKH-FUK-036",
    name: "Fukuoka Trade Cars",
    ownerName: "Rafael Mori",
    email: "finance@fuktrade.jp",
    phone: "+81 90-7744-8801",
    address: "Fukuoka, Fukuoka",
    plan: "pro",
    status: "blocked",
    carLimit: 50,
    premiumEntryEnabled: false,
    monthlyRevenue: 9800,
    activeCarsMonth: 8,
    carsThisMonth: 1
  }
];

export const profiles: Profile[] = [
  {
    id: "usr-1",
    storeId: null,
    name: "Keven OKH",
    email: "admin@okh.jp",
    role: "okh_admin_master",
    status: "active",
    canEditFinancials: true
  },
  {
    id: "usr-2",
    storeId: null,
    name: "Ana OKH",
    email: "operacao@okh.jp",
    role: "okh_operator",
    status: "active",
    canEditFinancials: true
  },
  {
    id: "usr-3",
    storeId: "store-1",
    name: "Marcos Tanaka",
    email: "marcos@sakuraauto.jp",
    role: "store_owner",
    status: "active",
    canEditFinancials: true
  },
  {
    id: "usr-4",
    storeId: "store-1",
    name: "Bruno Sato",
    email: "bruno@sakuraauto.jp",
    role: "store_employee",
    status: "active",
    canEditFinancials: false
  }
];

export const vehicles: Vehicle[] = [
  {
    id: "veh-1",
    storeId: "store-1",
    brand: "Toyota",
    model: "Aqua S",
    year: 2020,
    plate: "KSG 24-18",
    chassis: "NHP10-2209418",
    mileage: 42800,
    color: "Branco",
    origin: "auction",
    purchasePrice: 820000,
    entryDate: "2026-05-05",
    status: "in_preparation",
    advertisedPrice: 1120000,
    minimumPrice: 1030000,
    soldPrice: null,
    soldDate: null,
    notes: "Shaken pendente e fotos novas necessarias.",
    imageFocus: "center",
    intakeMode: "complete",
    verificationStatus: "verified",
    verifiedAt: "2026-05-05T09:30:00+09:00",
    signedAt: "2026-05-05T09:30:00+09:00"
  },
  {
    id: "veh-2",
    storeId: "store-1",
    brand: "Honda",
    model: "N-Box Custom",
    year: 2021,
    plate: "OMA 91-40",
    chassis: "JF3-3312881",
    mileage: 31800,
    color: "Prata",
    origin: "direct_purchase",
    purchasePrice: 760000,
    entryDate: "2026-06-20",
    status: "ready_for_sale",
    advertisedPrice: 1040000,
    minimumPrice: 930000,
    soldPrice: null,
    soldDate: null,
    notes: "Pronto para anuncio premium.",
    imageFocus: "center",
    intakeMode: "complete",
    verificationStatus: "verified",
    verifiedAt: "2026-06-20T11:00:00+09:00",
    signedAt: "2026-06-20T11:00:00+09:00"
  },
  {
    id: "veh-3",
    storeId: "store-1",
    brand: "Nissan",
    model: "Serena Highway Star",
    year: 2018,
    plate: "KSB 77-02",
    chassis: "C27-119882",
    mileage: 78200,
    color: "Preto",
    origin: "trade_in",
    purchasePrice: 780000,
    entryDate: "2026-04-25",
    status: "sold",
    advertisedPrice: 1280000,
    minimumPrice: 1110000,
    soldPrice: 1180000,
    soldDate: "2026-07-03",
    notes: "Venda concluida com margem saudavel.",
    imageFocus: "center",
    intakeMode: "complete",
    verificationStatus: "verified",
    verifiedAt: "2026-04-25T15:20:00+09:00",
    signedAt: "2026-04-25T15:20:00+09:00"
  },
  {
    id: "veh-4",
    storeId: "store-1",
    brand: "Suzuki",
    model: "Alto L",
    year: 2019,
    plate: "KUK 12-08",
    chassis: "HA36S-774211",
    mileage: 63800,
    color: "Azul",
    origin: "auction",
    purchasePrice: 385000,
    entryDate: "2026-04-01",
    status: "loss",
    advertisedPrice: 420000,
    minimumPrice: 490000,
    soldPrice: null,
    soldDate: null,
    notes: "Custo real acima do previsto; revisar preco anunciado.",
    imageFocus: "center",
    intakeMode: "complete",
    verificationStatus: "verified",
    verifiedAt: "2026-04-01T10:45:00+09:00",
    signedAt: "2026-04-01T10:45:00+09:00"
  },
  {
    id: "veh-5",
    storeId: "store-2",
    brand: "Daihatsu",
    model: "Tanto X",
    year: 2022,
    plate: "NGY 11-45",
    chassis: "LA650S-118201",
    mileage: 22600,
    color: "Vermelho",
    origin: "auction",
    purchasePrice: 740000,
    entryDate: "2026-07-02",
    status: "waiting_shaken",
    advertisedPrice: 980000,
    minimumPrice: 890000,
    soldPrice: null,
    soldDate: null,
    notes: "Aguardando shaken.",
    imageFocus: "center",
    intakeMode: "complete",
    verificationStatus: "verified",
    verifiedAt: "2026-07-02T14:10:00+09:00",
    signedAt: "2026-07-02T14:10:00+09:00"
  }
];

const vehicleCostRows: Array<[string, string, string, string, string, number, number, string, string]> = [
  ["c1", "store-1", "veh-1", "Shaken", "Preparacao de shaken", 60000, 68000, "2026-05-07", "Recibo recebido"],
  ["c2", "store-1", "veh-1", "Oleo", "Oleo + filtro", 8000, 9200, "2026-05-06", ""],
  ["c3", "store-1", "veh-1", "Pintura", "Retoque para-choque traseiro", 45000, 57000, "2026-05-13", "Custo real acima do previsto"],
  ["c4", "store-1", "veh-2", "Polimento", "Polimento premium", 35000, 33000, "2026-06-22", ""],
  ["c5", "store-1", "veh-2", "Higienizacao", "Higienizacao completa", 25000, 24000, "2026-06-23", ""],
  ["c6", "store-1", "veh-3", "Pneus", "Jogo 195/65R15", 36000, 38000, "2026-04-26", ""],
  ["c7", "store-1", "veh-3", "Comissao", "Comissao venda", 35000, 35000, "2026-07-03", ""],
  ["c8", "store-1", "veh-4", "Transporte", "Retirada do leilao", 18000, 23000, "2026-04-02", ""],
  ["c9", "store-1", "veh-4", "Bateria", "Troca bateria", 18000, 22000, "2026-04-04", ""],
  ["c10", "store-1", "veh-4", "Freios", "Pastilhas e mao de obra", 22000, 31000, "2026-04-09", "Prejuizo detectado"],
  ["c11", "store-2", "veh-5", "Shaken", "Shaken kei car", 60000, 0, "2026-07-18", "Previsto"]
];

export const vehicleCosts: VehicleCost[] = vehicleCostRows.map(([id, storeId, vehicleId, category, description, estimatedValue, actualValue, costDate, notes]) => ({
  id,
  storeId,
  vehicleId,
  category,
  description,
  estimatedValue,
  actualValue,
  costDate,
  notes
}));

const checklistRows: Array<[string, string, string, string, string, ChecklistItem["status"], number, number, string, string | null, string]> = [
  ["ck1", "store-1", "veh-1", "Trocar oleo", "Oleo", "completed", 8000, 9200, "2026-05-06", "2026-05-06", ""],
  ["ck2", "store-1", "veh-1", "Fazer shaken", "Shaken", "in_progress", 60000, 68000, "2026-07-08", null, "Prazo estourado"],
  ["ck3", "store-1", "veh-1", "Tirar fotos", "Anuncio", "pending", 12000, 0, "2026-07-12", null, ""],
  ["ck4", "store-1", "veh-2", "Polimento premium", "Polimento", "completed", 35000, 33000, "2026-06-22", "2026-06-22", ""],
  ["ck5", "store-1", "veh-2", "Publicar anuncio", "Anuncio", "pending", 0, 0, "2026-07-14", null, ""],
  ["ck6", "store-1", "veh-3", "Preparar entrega", "Entrega", "completed", 0, 0, "2026-07-04", "2026-07-03", ""],
  ["ck7", "store-1", "veh-4", "Reavaliar preco anunciado", "Venda", "pending", 0, 0, "2026-07-02", null, "Carro abaixo da margem desejada"],
  ["ck8", "store-2", "veh-5", "Fazer shaken", "Shaken", "pending", 60000, 0, "2026-07-18", null, ""]
];

export const checklistItems: ChecklistItem[] = checklistRows.map(([id, storeId, vehicleId, name, category, status, estimatedValue, actualValue, dueDate, completedAt, notes]) => ({
  id,
  storeId,
  vehicleId,
  name,
  category,
  status,
  estimatedValue,
  actualValue,
  dueDate,
  completedAt,
  notes
}));

export const premiumRequests: PremiumRequest[] = [
  { id: "req-1", storeId: "store-1", vehicleName: "Toyota Vitz F", priority: "high", status: "received", createdAt: "2026-07-09T10:21:00" },
  { id: "req-2", storeId: "store-3", vehicleName: "Daihatsu Tanto Custom", priority: "normal", status: "registering", createdAt: "2026-07-07T16:44:00" },
  { id: "req-3", storeId: "store-2", vehicleName: "Honda Fit Hybrid", priority: "normal", status: "missing_information", createdAt: "2026-07-06T09:30:00" },
  { id: "req-4", storeId: "store-1", vehicleName: "Suzuki Wagon R", priority: "low", status: "published", createdAt: "2026-07-04T11:10:00" }
];
