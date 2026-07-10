const GARAGE_IMAGE = "assets/premium-sport-garage.png";
const TODAY = new Date("2026-07-10T12:00:00+09:00");

const icons = {
  gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/><path d="M12 20h.01"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2l-1.5-5.5A3 3 0 0 0 16.6 9H7.4a3 3 0 0 0-2.9 2.5L3 17h2"/><path d="M7 17h10"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 13h14"/></svg>',
  yen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 14v7"/><path d="M8 4l4 7 4-7"/><path d="M6 11h12"/><path d="M6 15h12"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.8-2.8 2.2-2.6Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-7"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>',
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10h16"/><path d="M5 10l1-6h12l1 6"/><path d="M6 10v10h12V10"/><path d="M9 20v-6h6v6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1A1.7 1.7 0 0 0 19.4 9c.2.6.8 1 1.5 1h.1a2 2 0 1 1 0 4h-.1c-.7 0-1.3.4-1.5 1Z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/></svg>'
};

const storeNav = [
  ["dashboard", "Dashboard", "gauge"],
  ["cars", "Carros", "car"],
  ["entry", "Entrada", "plus"],
  ["preparation", "Preparação", "wrench"],
  ["costs", "Custos", "yen"],
  ["sales", "Vendas", "check"],
  ["premium", "Solicitações", "upload"],
  ["reports", "Relatórios", "chart"],
  ["settings", "Configurações", "settings"]
];

const adminNav = [
  ["adminDashboard", "Dashboard Admin", "gauge"],
  ["stores", "Lojas", "store"],
  ["plans", "Planos", "file"],
  ["users", "Usuários", "users"],
  ["adminPremium", "Solicitações Premium", "upload"],
  ["assisted", "Cadastros Assistidos", "plus"],
  ["carsByStore", "Carros por Loja", "car"],
  ["payments", "Pagamentos", "yen"],
  ["globalReports", "Relatórios Globais", "chart"],
  ["adminSettings", "Configurações", "settings"]
];

const viewCopy = {
  dashboard: ["Dashboard da Loja", "Controle de estoque, margem, preparação e alertas operacionais."],
  cars: ["Carros", "Cards e tabela com filtros, custos, status e lucro por veículo."],
  entry: ["Entrada de Veículos", "Fluxo rápido para criar veículo, checklist previsto e preço mínimo."],
  preparation: ["Preparação", "Kanban operacional dos carros em preparo."],
  costs: ["Custos", "Previsto, real e diferença por categoria."],
  sales: ["Vendas", "Resultado final, margem e status financeiro."],
  premium: ["Solicitações Premium", "Envio de dados e fotos para cadastro assistido pela OKH."],
  reports: ["Relatórios", "Lucro, estoque, custos e exportações operacionais."],
  settings: ["Configurações da Loja", "Custos padrão, pneus e modelos de checklist."],
  details: ["Detalhes do Carro", "Resumo financeiro, checklist, custos, venda, arquivos e histórico."],
  adminDashboard: ["Dashboard Admin OKH", "Visão global de lojas, receita, planos e operação premium."],
  stores: ["Lojas", "Gestão multi-tenant com planos, bloqueios e entrada como admin."],
  storeCreate: ["Cadastro de Loja", "Criar uma nova loja com store_id automático."],
  plans: ["Planos", "Starter, Pro, Premium Operacional e cobrança por carro extra."],
  users: ["Usuários e Permissões", "Papéis, limites e matriz de acesso."],
  adminPremium: ["Solicitações Premium", "Kanban de atendimento e publicação no painel da loja."],
  assisted: ["Cadastros Assistidos", "Admin OKH cadastra carros para qualquer loja pelo ID."],
  carsByStore: ["Carros por Loja", "Inventário agrupado por store_id."],
  payments: ["Pagamentos", "Mensalidades, inadimplência e bloqueios."],
  globalReports: ["Relatórios Globais", "Receita recorrente, carros cadastrados e performance por loja."],
  adminSettings: ["Configurações Admin", "Logs, segurança e padrões operacionais da OKH."]
};

const roles = [
  {
    id: "owner",
    label: "Dono da Loja",
    text: "Dashboard da própria loja com finanças e equipe."
  },
  {
    id: "employee",
    label: "Funcionário",
    text: "Carros, checklist, fotos e preparação."
  },
  {
    id: "readonly",
    label: "Somente leitura",
    text: "Consulta de dashboard, carros e relatórios."
  },
  {
    id: "admin",
    label: "Admin Master OKH",
    text: "Todas as lojas, planos, pagamentos e relatórios."
  },
  {
    id: "operator",
    label: "Operador OKH",
    text: "Cadastro assistido e solicitações premium."
  }
];

const languageOptions = [
  ["pt", "Português", "PT"],
  ["en", "English", "EN"],
  ["ja", "日本語", "JA"],
  ["es", "Español", "ES"]
];

const uiText = {
  pt: {
    loginTitle: "Controle premium por carro, da entrada à venda.",
    loginSubtitle: "Plataforma interna para lojistas, vendedores e operações OKH acompanharem estoque, preparação, checklist, custos previstos, custos reais, lucro e prejuízo em iene japonês.",
    loginFootnote: "Protótipo multi-tenant: cada loja opera pelo próprio store_id; Admin OKH enxerga todas as lojas.",
    loginHeading: "Entrar no OKH AutoLedger",
    loginIntro: "Escolha um perfil para abrir a tela inicial correspondente.",
    email: "Email",
    defaultStore: "Store ID padrão",
    demoLoaded: "Dados demo carregados localmente. Nenhuma loja pública ou marketplace foi criado.",
    enterPanel: "Entrar no painel",
    language: "Idioma",
    hiddenLanguage: "Idioma escondido",
    currentStore: "Loja atual",
    okhConsole: "Console OKH",
    globalAdmin: "Admin global",
    allStores: "todos os store_id",
    storePanel: "Painel do Lojista",
    adminPanel: "Painel Admin OKH",
    viewAsStore: "Ver como loja",
    backToAdmin: "Voltar ao Admin",
    logout: "Sair",
    createStore: "Criar loja",
    registerCar: "Cadastrar carro",
    addCost: "Adicionar custo",
    newCar: "Novo carro",
    applyChecklist: "Aplicar checklist",
    requestRegistration: "Solicitar cadastro",
    markSold: "Marcar como vendido",
    generateReport: "Gerar relatório",
    pro: "Pro",
    activeInStore: "Ativos no store_id atual",
    purchaseActualCosts: "Compra + custos reais",
    advertisedPriceBase: "Baseado no preço anunciado",
    julySales: "venda(s) em julho",
    completedOut: "Saídas concluídas",
    entryPartsShaken: "Entrada, peças ou shaken",
    readyListed: "Pronto ou anunciado",
    negativeResult: "Previsto ou real negativo",
    stockTurnAttention: "Atenção para giro de estoque"
  },
  en: {
    loginTitle: "Premium control per car, from intake to sale.",
    loginSubtitle: "Internal platform for dealers, sales teams and OKH operations to track stock, preparation, checklists, estimated costs, actual costs, profit and loss in Japanese yen.",
    loginFootnote: "Multi-tenant prototype: each store works with its own store_id; OKH Admin sees all stores.",
    loginHeading: "Sign in to OKH AutoLedger",
    loginIntro: "Choose a profile to open the matching start screen.",
    email: "Email",
    defaultStore: "Default Store ID",
    demoLoaded: "Demo data is loaded locally. No public marketplace was created.",
    enterPanel: "Enter dashboard",
    language: "Language",
    hiddenLanguage: "Hidden language",
    currentStore: "Current store",
    okhConsole: "OKH Console",
    globalAdmin: "Global admin",
    allStores: "all store_id",
    storePanel: "Store Panel",
    adminPanel: "OKH Admin Panel",
    viewAsStore: "View as store",
    backToAdmin: "Back to Admin",
    logout: "Sign out",
    createStore: "Create store",
    registerCar: "Register car",
    addCost: "Add cost",
    newCar: "New car",
    applyChecklist: "Apply checklist",
    requestRegistration: "Request registration",
    markSold: "Mark as sold",
    generateReport: "Generate report",
    pro: "Pro",
    activeInStore: "Active in current store_id",
    purchaseActualCosts: "Purchase + actual costs",
    advertisedPriceBase: "Based on advertised price",
    julySales: "sale(s) in July",
    completedOut: "Completed sales",
    entryPartsShaken: "Intake, parts or shaken",
    readyListed: "Ready or listed",
    negativeResult: "Estimated or actual negative",
    stockTurnAttention: "Attention to stock turnover"
  },
  ja: {
    loginTitle: "入庫から販売まで、車両ごとの利益を管理。",
    loginSubtitle: "販売店、営業チーム、OKH運用向けの内部管理プラットフォーム。 在庫、準備、チェックリスト、予定コスト、実コスト、利益と損失を円で管理します。",
    loginFootnote: "マルチテナント試作版: 各店舗は固有の store_id で運用し、OKH Admin は全店舗を確認できます。",
    loginHeading: "OKH AutoLedger にログイン",
    loginIntro: "プロフィールを選択して開始画面を開きます。",
    email: "メール",
    defaultStore: "標準 Store ID",
    demoLoaded: "デモデータはローカルで読み込まれています。公開マーケットプレイスは作成されていません。",
    enterPanel: "ダッシュボードへ",
    language: "言語",
    hiddenLanguage: "隠し言語",
    currentStore: "現在の店舗",
    okhConsole: "OKH コンソール",
    globalAdmin: "全体管理",
    allStores: "すべての store_id",
    storePanel: "店舗パネル",
    adminPanel: "OKH 管理パネル",
    viewAsStore: "店舗として表示",
    backToAdmin: "管理へ戻る",
    logout: "ログアウト",
    createStore: "店舗作成",
    registerCar: "車両登録",
    addCost: "コスト追加",
    newCar: "新規車両",
    applyChecklist: "チェックリスト適用",
    requestRegistration: "登録依頼",
    markSold: "販売済みにする",
    generateReport: "レポート作成",
    pro: "Pro",
    activeInStore: "現在の store_id の在庫",
    purchaseActualCosts: "仕入 + 実コスト",
    advertisedPriceBase: "掲載価格ベース",
    julySales: "7月の販売数",
    completedOut: "販売完了",
    entryPartsShaken: "入庫、部品、車検待ち",
    readyListed: "販売準備済みまたは掲載中",
    negativeResult: "予定または実績がマイナス",
    stockTurnAttention: "在庫回転に注意"
  },
  es: {
    loginTitle: "Control premium por coche, desde entrada hasta venta.",
    loginSubtitle: "Plataforma interna para tiendas, vendedores y operación OKH controlar stock, preparación, checklist, costos previstos, costos reales, lucro y pérdida en yenes japoneses.",
    loginFootnote: "Prototipo multi-tenant: cada tienda opera con su propio store_id; Admin OKH ve todas las tiendas.",
    loginHeading: "Entrar en OKH AutoLedger",
    loginIntro: "Elige un perfil para abrir la pantalla inicial correspondiente.",
    email: "Email",
    defaultStore: "Store ID predeterminado",
    demoLoaded: "Datos demo cargados localmente. No se creó marketplace público.",
    enterPanel: "Entrar al panel",
    language: "Idioma",
    hiddenLanguage: "Idioma escondido",
    currentStore: "Tienda actual",
    okhConsole: "Consola OKH",
    globalAdmin: "Admin global",
    allStores: "todos los store_id",
    storePanel: "Panel de Tienda",
    adminPanel: "Panel Admin OKH",
    viewAsStore: "Ver como tienda",
    backToAdmin: "Volver al Admin",
    logout: "Salir",
    createStore: "Crear tienda",
    registerCar: "Registrar coche",
    addCost: "Agregar costo",
    newCar: "Nuevo coche",
    applyChecklist: "Aplicar checklist",
    requestRegistration: "Solicitar registro",
    markSold: "Marcar vendido",
    generateReport: "Generar reporte",
    pro: "Pro",
    activeInStore: "Activos en el store_id actual",
    purchaseActualCosts: "Compra + costos reales",
    advertisedPriceBase: "Basado en precio anunciado",
    julySales: "venta(s) en julio",
    completedOut: "Ventas concluidas",
    entryPartsShaken: "Entrada, piezas o shaken",
    readyListed: "Listo o anunciado",
    negativeResult: "Previsto o real negativo",
    stockTurnAttention: "Atención al giro de stock"
  }
};

const navLabels = {
  en: {
    dashboard: "Dashboard",
    cars: "Cars",
    entry: "Vehicle Intake",
    preparation: "Preparation",
    costs: "Costs",
    sales: "Sales",
    premium: "Requests",
    reports: "Reports",
    settings: "Settings",
    adminDashboard: "Admin Dashboard",
    stores: "Stores",
    plans: "Plans",
    users: "Users",
    adminPremium: "Premium Requests",
    assisted: "Assisted Entries",
    carsByStore: "Cars by Store",
    payments: "Payments",
    globalReports: "Global Reports",
    adminSettings: "Settings"
  },
  ja: {
    dashboard: "ダッシュボード",
    cars: "車両",
    entry: "入庫",
    preparation: "準備",
    costs: "コスト",
    sales: "販売",
    premium: "依頼",
    reports: "レポート",
    settings: "設定",
    adminDashboard: "管理ダッシュボード",
    stores: "店舗",
    plans: "プラン",
    users: "ユーザー",
    adminPremium: "プレミアム依頼",
    assisted: "代行登録",
    carsByStore: "店舗別車両",
    payments: "支払い",
    globalReports: "全体レポート",
    adminSettings: "設定"
  },
  es: {
    dashboard: "Dashboard",
    cars: "Coches",
    entry: "Entrada",
    preparation: "Preparación",
    costs: "Costos",
    sales: "Ventas",
    premium: "Solicitudes",
    reports: "Reportes",
    settings: "Configuración",
    adminDashboard: "Dashboard Admin",
    stores: "Tiendas",
    plans: "Planes",
    users: "Usuarios",
    adminPremium: "Solicitudes Premium",
    assisted: "Registros Asistidos",
    carsByStore: "Coches por Tienda",
    payments: "Pagos",
    globalReports: "Reportes Globales",
    adminSettings: "Configuración"
  }
};

const viewCopyByLocale = {
  en: {
    dashboard: ["Store Dashboard", "Stock, margin, preparation and operational alerts."],
    cars: ["Cars", "Cards and table with filters, costs, status and profit per vehicle."],
    entry: ["Vehicle Intake", "Fast flow to create a vehicle, planned checklist and minimum price."],
    preparation: ["Preparation", "Operational kanban for cars in preparation."],
    costs: ["Costs", "Estimated, actual and variance by category."],
    sales: ["Sales", "Final result, margin and financial status."],
    premium: ["Premium Requests", "Send data and photos for OKH assisted registration."],
    reports: ["Reports", "Profit, stock, costs and operational exports."],
    settings: ["Store Settings", "Default costs, tires and checklist templates."],
    details: ["Car Details", "Financial summary, checklist, costs, sale, files and history."],
    adminDashboard: ["OKH Admin Dashboard", "Global view of stores, revenue, plans and premium operation."]
  },
  ja: {
    dashboard: ["店舗ダッシュボード", "在庫、利益率、準備状況、運用アラート。"],
    cars: ["車両", "フィルター、コスト、ステータス、車両ごとの利益。"],
    entry: ["車両入庫", "車両作成、予定チェックリスト、最低価格の簡単フロー。"],
    preparation: ["準備", "準備中車両の運用カンバン。"],
    costs: ["コスト", "予定、実績、カテゴリ別差額。"],
    sales: ["販売", "最終結果、利益率、支払い状況。"],
    premium: ["プレミアム依頼", "OKH代行登録用のデータと写真を送信。"],
    reports: ["レポート", "利益、在庫、コスト、エクスポート。"],
    settings: ["店舗設定", "標準コスト、タイヤ、チェックリストテンプレート。"],
    details: ["車両詳細", "財務サマリー、チェックリスト、コスト、販売、ファイル、履歴。"],
    adminDashboard: ["OKH 管理ダッシュボード", "店舗、売上、プラン、プレミアム運用の全体表示。"]
  },
  es: {
    dashboard: ["Dashboard de Tienda", "Stock, margen, preparación y alertas operativas."],
    cars: ["Coches", "Cards y tabla con filtros, costos, status y lucro por vehículo."],
    entry: ["Entrada de Vehículos", "Flujo rápido para crear vehículo, checklist previsto y precio mínimo."],
    preparation: ["Preparación", "Kanban operativo de coches en preparación."],
    costs: ["Costos", "Previsto, real y diferencia por categoría."],
    sales: ["Ventas", "Resultado final, margen y estado financiero."],
    premium: ["Solicitudes Premium", "Envío de datos y fotos para registro asistido por OKH."],
    reports: ["Reportes", "Lucro, stock, costos y exportaciones operativas."],
    settings: ["Configuración de Tienda", "Costos estándar, neumáticos y modelos de checklist."],
    details: ["Detalles del Coche", "Resumen financiero, checklist, costos, venta, archivos e historial."],
    adminDashboard: ["Dashboard Admin OKH", "Vista global de tiendas, ingresos, planes y operación premium."]
  }
};

const roleTranslations = {
  en: {
    owner: ["Store Owner", "Own store dashboard with finance and team."],
    employee: ["Employee", "Cars, checklist, photos and preparation."],
    readonly: ["Read only", "View dashboard, cars and reports."],
    admin: ["OKH Master Admin", "All stores, plans, payments and reports."],
    operator: ["OKH Operator", "Assisted entries and premium requests."]
  },
  ja: {
    owner: ["店舗オーナー", "自店舗の財務とチームを管理。"],
    employee: ["店舗スタッフ", "車両、チェックリスト、写真、準備。"],
    readonly: ["閲覧のみ", "ダッシュボード、車両、レポート閲覧。"],
    admin: ["OKH 管理者", "全店舗、プラン、支払い、レポート。"],
    operator: ["OKH オペレーター", "代行登録とプレミアム依頼。"]
  },
  es: {
    owner: ["Dueño de Tienda", "Dashboard de la propia tienda con finanzas y equipo."],
    employee: ["Empleado", "Coches, checklist, fotos y preparación."],
    readonly: ["Solo lectura", "Consulta dashboard, coches y reportes."],
    admin: ["Admin Master OKH", "Todas las tiendas, planes, pagos y reportes."],
    operator: ["Operador OKH", "Registros asistidos y solicitudes premium."]
  }
};

const i18nAdditions = {
  pt: {
    inStock: "Carros em estoque",
    totalInvestment: "Investimento total",
    estimatedProfit: "Lucro previsto",
    realizedProfitMonth: "Lucro realizado no mês",
    soldThisMonth: "Vendidos no mês",
    inPreparation: "Em preparação",
    readyForSale: "Prontos para venda",
    losingCars: "Com prejuízo",
    stuck60: "Parados 60+ dias",
    recentCars: "Carros recentes",
    viewAll: "Ver todos",
    pendingTasks: "Tarefas pendentes",
    pending: "pendentes",
    noPendingTasks: "Nenhuma tarefa pendente.",
    alerts: "Alertas",
    noCriticalAlerts: "Operação sem alertas críticos no momento.",
    marginRanking: "Ranking de margem",
    profitMonthly: "Lucro mensal",
    lastSixMonths: "últimos 6 meses",
    vehicleFlow: "Entrada e saída de veículos",
    operationalVolume: "volume operacional",
    searchCars: "Buscar por marca, modelo, placa...",
    all: "Todos",
    allYears: "Todos os anos",
    announcedPrice: "Preço anunciado",
    origin: "Origem",
    tableOperational: "Tabela operacional",
    costsProfitDays: "Custos, lucro e dias em estoque",
    vehicle: "Veículo",
    status: "Status",
    purchase: "Compra",
    estimated: "Previsto",
    actual: "Real",
    totalCost: "Custo total",
    announced: "Anunciado",
    profit: "Lucro",
    days: "Dias",
    activeStores: "Lojas ativas",
    blockedStores: "Lojas bloqueadas",
    starterPlans: "Planos Starter",
    proPlans: "Planos Pro",
    premiumPlans: "Planos Premium",
    monthlyRevenue: "Receita mensal",
    carsThisMonth: "Carros no mês",
    premiumPending: "Premium pendentes",
    assistedDone: "Assistidos concluídos",
    byOperator: "Por operador OKH",
    includesTrial: "Inclui teste grátis",
    overdueOrBlocked: "Inadimplentes ou bloqueadas",
    currentPortfolio: "Carteira atual",
    operational: "Operacional",
    mrrEstimate: "MRR estimado",
    registeredJuly: "Cadastrados em julho",
    openRequests: "Solicitações abertas",
    publishedPanel: "Publicados no painel",
    assistedEntries: "Cadastros assistidos",
    storesRevenue: "Lojas e receita",
    premiumRequestsTitle: "Solicitações premium",
    openStores: "Abrir lojas",
    kanban: "Kanban",
    stores: "Lojas",
    plans: "Planos",
    entryStatus: "Entrada",
    waitingParts: "Aguardando peças",
    waitingShaken: "Aguardando shaken",
    reserved: "Reservado",
    sold: "Vendido",
    until2018: "Até 2018",
    priceUpTo: "Até ¥700.000",
    priceMid: "¥700.000 a ¥1.200.000",
    priceAbove: "Acima de ¥1.200.000",
    auction: "Leilão",
    directPurchase: "Compra direta",
    tradeIn: "Troca",
    consignment: "Consignado",
    minimumPrice: "Preço mínimo",
    soldPrice: "Preço vendido",
    realProfit: "Lucro real",
    margin: "Margem",
    positiveEstimatedProfit: "Lucro previsto positivo.",
    lowMarginAlert: "Este carro está abaixo da margem desejada.",
    bestMargin: "Maior margem",
    lowestMargin: "Menor margem",
    stopped60Alert: "carro parado há mais de 60 dias.",
    costOverEstimateAlert: "custo real acima do previsto.",
    estimatedLossAlert: "prejuízo previsto detectado.",
    actualLossAlert: "prejuízo real detectado.",
    lateTaskAlert: "tarefa atrasada:",
    late: "Atrasada",
    onTime: "Pendente",
    noVehiclesFound: "Nenhum veículo encontrado.",
    actualCosts: "Custos reais",
    details: "Detalhes",
    cost: "Custo",
    soldShort: "Vendido",
    open: "Abrir"
  },
  en: {
    inStock: "Cars in stock",
    totalInvestment: "Total investment",
    estimatedProfit: "Estimated profit",
    realizedProfitMonth: "Realized profit this month",
    soldThisMonth: "Sold this month",
    inPreparation: "In preparation",
    readyForSale: "Ready for sale",
    losingCars: "Cars at loss",
    stuck60: "Stuck 60+ days",
    recentCars: "Recent cars",
    viewAll: "View all",
    pendingTasks: "Pending tasks",
    pending: "pending",
    noPendingTasks: "No pending tasks.",
    alerts: "Alerts",
    noCriticalAlerts: "No critical alerts right now.",
    marginRanking: "Margin ranking",
    profitMonthly: "Monthly profit",
    lastSixMonths: "last 6 months",
    vehicleFlow: "Vehicle intake and exit",
    operationalVolume: "operational volume",
    searchCars: "Search by brand, model, plate...",
    all: "All",
    allYears: "All years",
    announcedPrice: "Advertised price",
    origin: "Origin",
    tableOperational: "Operational table",
    costsProfitDays: "Costs, profit and days in stock",
    vehicle: "Vehicle",
    status: "Status",
    purchase: "Purchase",
    estimated: "Estimated",
    actual: "Actual",
    totalCost: "Total cost",
    announced: "Listed",
    profit: "Profit",
    days: "Days",
    activeStores: "Active stores",
    blockedStores: "Blocked stores",
    starterPlans: "Starter plans",
    proPlans: "Pro plans",
    premiumPlans: "Premium plans",
    monthlyRevenue: "Monthly revenue",
    carsThisMonth: "Cars this month",
    premiumPending: "Premium pending",
    assistedDone: "Assisted completed",
    byOperator: "By OKH operator",
    includesTrial: "Includes free trial",
    overdueOrBlocked: "Overdue or blocked",
    currentPortfolio: "Current portfolio",
    operational: "Operational",
    mrrEstimate: "Estimated MRR",
    registeredJuly: "Registered in July",
    openRequests: "Open requests",
    publishedPanel: "Published to panel",
    assistedEntries: "Assisted entries",
    storesRevenue: "Stores and revenue",
    premiumRequestsTitle: "Premium requests",
    openStores: "Open stores",
    kanban: "Kanban",
    stores: "Stores",
    plans: "Plans",
    entryStatus: "Intake",
    waitingParts: "Waiting for parts",
    waitingShaken: "Waiting for shaken",
    reserved: "Reserved",
    sold: "Sold",
    until2018: "Up to 2018",
    priceUpTo: "Up to ¥700,000",
    priceMid: "¥700,000 to ¥1,200,000",
    priceAbove: "Above ¥1,200,000",
    auction: "Auction",
    directPurchase: "Direct purchase",
    tradeIn: "Trade-in",
    consignment: "Consignment",
    minimumPrice: "Minimum price",
    soldPrice: "Sold price",
    realProfit: "Real profit",
    margin: "Margin",
    positiveEstimatedProfit: "Estimated profit is positive.",
    lowMarginAlert: "This car is below the target margin.",
    bestMargin: "Best margin",
    lowestMargin: "Lowest margin",
    stopped60Alert: "car has been in stock for more than 60 days.",
    costOverEstimateAlert: "actual cost is above estimate.",
    estimatedLossAlert: "estimated loss detected.",
    actualLossAlert: "actual loss detected.",
    lateTaskAlert: "late task:",
    late: "Late",
    onTime: "Pending",
    noVehiclesFound: "No vehicles found.",
    actualCosts: "Actual costs",
    details: "Details",
    cost: "Cost",
    soldShort: "Sold",
    open: "Open"
  },
  ja: {
    inStock: "在庫車両",
    totalInvestment: "総投資額",
    estimatedProfit: "予定利益",
    realizedProfitMonth: "今月の実利益",
    soldThisMonth: "今月販売",
    inPreparation: "準備中",
    readyForSale: "販売準備完了",
    losingCars: "赤字車両",
    stuck60: "60日超在庫",
    recentCars: "最近の車両",
    viewAll: "すべて表示",
    pendingTasks: "未完了タスク",
    pending: "未完了",
    noPendingTasks: "未完了タスクはありません。",
    alerts: "アラート",
    noCriticalAlerts: "現在、重要なアラートはありません。",
    marginRanking: "利益率ランキング",
    profitMonthly: "月別利益",
    lastSixMonths: "過去6か月",
    vehicleFlow: "入庫と販売",
    operationalVolume: "運用ボリューム",
    searchCars: "メーカー、モデル、ナンバーで検索...",
    all: "すべて",
    allYears: "すべての年式",
    announcedPrice: "掲載価格",
    origin: "仕入元",
    tableOperational: "運用テーブル",
    costsProfitDays: "コスト、利益、在庫日数",
    vehicle: "車両",
    status: "ステータス",
    purchase: "仕入",
    estimated: "予定",
    actual: "実績",
    totalCost: "総コスト",
    announced: "掲載",
    profit: "利益",
    days: "日数",
    activeStores: "有効店舗",
    blockedStores: "停止店舗",
    starterPlans: "Starter プラン",
    proPlans: "Pro プラン",
    premiumPlans: "Premium プラン",
    monthlyRevenue: "月次売上",
    carsThisMonth: "今月の車両",
    premiumPending: "未対応Premium",
    assistedDone: "代行完了",
    byOperator: "OKH担当別",
    includesTrial: "無料トライアル含む",
    overdueOrBlocked: "未払いまたは停止",
    currentPortfolio: "現在の構成",
    operational: "運用中",
    mrrEstimate: "推定MRR",
    registeredJuly: "7月登録",
    openRequests: "未対応依頼",
    publishedPanel: "店舗パネル公開済み",
    assistedEntries: "代行登録",
    storesRevenue: "店舗と売上",
    premiumRequestsTitle: "プレミアム依頼",
    openStores: "店舗を開く",
    kanban: "カンバン",
    stores: "店舗",
    plans: "プラン",
    entryStatus: "入庫",
    waitingParts: "部品待ち",
    waitingShaken: "車検待ち",
    reserved: "予約済み",
    sold: "販売済み",
    until2018: "2018年まで",
    priceUpTo: "¥700,000まで",
    priceMid: "¥700,000から¥1,200,000",
    priceAbove: "¥1,200,000以上",
    auction: "オークション",
    directPurchase: "直接買取",
    tradeIn: "下取り",
    consignment: "委託",
    minimumPrice: "最低価格",
    soldPrice: "販売価格",
    realProfit: "実利益",
    margin: "利益率",
    positiveEstimatedProfit: "予想利益はプラスです。",
    lowMarginAlert: "この車両は目標利益率を下回っています。",
    bestMargin: "最高利益率",
    lowestMargin: "最低利益率",
    stopped60Alert: "60日以上在庫にあります。",
    costOverEstimateAlert: "実コストが予定を超えています。",
    estimatedLossAlert: "予想損失が検出されました。",
    actualLossAlert: "実損失が検出されました。",
    lateTaskAlert: "遅延タスク:",
    late: "遅延",
    onTime: "保留",
    noVehiclesFound: "車両が見つかりません。",
    actualCosts: "実コスト",
    details: "詳細",
    cost: "コスト",
    soldShort: "販売済み",
    open: "開く"
  },
  es: {
    inStock: "Coches en stock",
    totalInvestment: "Inversión total",
    estimatedProfit: "Lucro previsto",
    realizedProfitMonth: "Lucro realizado del mes",
    soldThisMonth: "Vendidos en el mes",
    inPreparation: "En preparación",
    readyForSale: "Listos para venta",
    losingCars: "Con pérdida",
    stuck60: "Parados 60+ días",
    recentCars: "Coches recientes",
    viewAll: "Ver todos",
    pendingTasks: "Tareas pendientes",
    pending: "pendientes",
    noPendingTasks: "No hay tareas pendientes.",
    alerts: "Alertas",
    noCriticalAlerts: "Operación sin alertas críticas ahora.",
    marginRanking: "Ranking de margen",
    profitMonthly: "Lucro mensual",
    lastSixMonths: "últimos 6 meses",
    vehicleFlow: "Entrada y salida de vehículos",
    operationalVolume: "volumen operativo",
    searchCars: "Buscar por marca, modelo, placa...",
    all: "Todos",
    allYears: "Todos los años",
    announcedPrice: "Precio anunciado",
    origin: "Origen",
    tableOperational: "Tabla operativa",
    costsProfitDays: "Costos, lucro y días en stock",
    vehicle: "Vehículo",
    status: "Status",
    purchase: "Compra",
    estimated: "Previsto",
    actual: "Real",
    totalCost: "Costo total",
    announced: "Anunciado",
    profit: "Lucro",
    days: "Días",
    activeStores: "Tiendas activas",
    blockedStores: "Tiendas bloqueadas",
    starterPlans: "Planes Starter",
    proPlans: "Planes Pro",
    premiumPlans: "Planes Premium",
    monthlyRevenue: "Ingreso mensual",
    carsThisMonth: "Coches del mes",
    premiumPending: "Premium pendientes",
    assistedDone: "Asistidos concluidos",
    byOperator: "Por operador OKH",
    includesTrial: "Incluye prueba gratis",
    overdueOrBlocked: "Inadimplentes o bloqueadas",
    currentPortfolio: "Cartera actual",
    operational: "Operacional",
    mrrEstimate: "MRR estimado",
    registeredJuly: "Registrados en julio",
    openRequests: "Solicitudes abiertas",
    publishedPanel: "Publicados en el panel",
    assistedEntries: "Registros asistidos",
    storesRevenue: "Tiendas e ingresos",
    premiumRequestsTitle: "Solicitudes premium",
    openStores: "Abrir tiendas",
    kanban: "Kanban",
    stores: "Tiendas",
    plans: "Planes",
    entryStatus: "Entrada",
    waitingParts: "Esperando piezas",
    waitingShaken: "Esperando shaken",
    reserved: "Reservado",
    sold: "Vendido",
    until2018: "Hasta 2018",
    priceUpTo: "Hasta ¥700.000",
    priceMid: "¥700.000 a ¥1.200.000",
    priceAbove: "Más de ¥1.200.000",
    auction: "Subasta",
    directPurchase: "Compra directa",
    tradeIn: "Intercambio",
    consignment: "Consignado",
    minimumPrice: "Precio mínimo",
    soldPrice: "Precio vendido",
    realProfit: "Lucro real",
    margin: "Margen",
    positiveEstimatedProfit: "Lucro previsto positivo.",
    lowMarginAlert: "Este coche está por debajo del margen objetivo.",
    bestMargin: "Mayor margen",
    lowestMargin: "Menor margen",
    stopped60Alert: "coche parado hace más de 60 días.",
    costOverEstimateAlert: "costo real arriba de lo previsto.",
    estimatedLossAlert: "pérdida prevista detectada.",
    actualLossAlert: "pérdida real detectada.",
    lateTaskAlert: "tarea atrasada:",
    late: "Atrasada",
    onTime: "Pendiente",
    noVehiclesFound: "No se encontraron vehículos.",
    actualCosts: "Costos reales",
    details: "Detalles",
    cost: "Costo",
    soldShort: "Vendido",
    open: "Abrir"
  }
};

Object.entries(i18nAdditions).forEach(([locale, additions]) => {
  Object.assign(uiText[locale], additions);
});

Object.assign(viewCopyByLocale.en, {
  stores: ["Stores", "Multi-tenant management with plans, blocks and admin impersonation."],
  storeCreate: ["Create Store", "Create a new store with automatic store_id."],
  plans: ["Plans", "Starter, Pro, Premium Operational and extra-car billing."],
  users: ["Users and Permissions", "Roles, limits and access matrix."],
  adminPremium: ["Premium Requests", "Service kanban and publishing to the store panel."],
  assisted: ["Assisted Entries", "OKH Admin registers cars for any store by ID."],
  carsByStore: ["Cars by Store", "Inventory grouped by store_id."],
  payments: ["Payments", "Monthly fees, overdue stores and blocks."],
  globalReports: ["Global Reports", "Recurring revenue, registered cars and store performance."],
  adminSettings: ["Admin Settings", "Logs, security and OKH operating standards."]
});

Object.assign(viewCopyByLocale.ja, {
  stores: ["店舗", "プラン、停止、管理者としての表示を含むマルチテナント管理。"],
  storeCreate: ["店舗作成", "自動 store_id で新しい店舗を作成。"],
  plans: ["プラン", "Starter、Pro、Premium Operational、追加車両課金。"],
  users: ["ユーザーと権限", "ロール、制限、アクセス権限。"],
  adminPremium: ["プレミアム依頼", "対応カンバンと店舗パネルへの公開。"],
  assisted: ["代行登録", "OKH Admin が任意の店舗IDに車両登録。"],
  carsByStore: ["店舗別車両", "store_id 別の在庫。"],
  payments: ["支払い", "月額、未払い、停止管理。"],
  globalReports: ["全体レポート", "継続売上、登録車両、店舗別実績。"],
  adminSettings: ["管理設定", "ログ、セキュリティ、OKH運用標準。"]
});

Object.assign(viewCopyByLocale.es, {
  stores: ["Tiendas", "Gestión multi-tenant con planes, bloqueos y entrada como admin."],
  storeCreate: ["Crear Tienda", "Crear una nueva tienda con store_id automático."],
  plans: ["Planes", "Starter, Pro, Premium Operacional y cobro por coche extra."],
  users: ["Usuarios y Permisos", "Roles, límites y matriz de acceso."],
  adminPremium: ["Solicitudes Premium", "Kanban de atención y publicación en el panel de la tienda."],
  assisted: ["Registros Asistidos", "Admin OKH registra coches para cualquier tienda por ID."],
  carsByStore: ["Coches por Tienda", "Inventario agrupado por store_id."],
  payments: ["Pagos", "Mensualidades, mora y bloqueos."],
  globalReports: ["Reportes Globales", "Ingreso recurrente, coches registrados y performance por tienda."],
  adminSettings: ["Configuración Admin", "Logs, seguridad y estándares operativos OKH."]
});

let stores = [
  {
    id: "store-1",
    store_code: "OKH-TKY-001",
    name: "Sakura Auto Koshigaya",
    owner_name: "Marcos Tanaka",
    email: "marcos@sakuraauto.jp",
    phone: "+81 90-2200-4188",
    address: "Koshigaya, Saitama",
    plan: "Pro",
    status: "Ativa",
    car_limit: "Ilimitado",
    premium_entry_enabled: true,
    created_at: "2026-02-11",
    monthly_revenue: 9800,
    last_access: "2026-07-10 08:42",
    active_cars_month: 6,
    cars_this_month: 4
  },
  {
    id: "store-2",
    store_code: "OKH-NGY-014",
    name: "Nagoya Kei Garage",
    owner_name: "Priscila Yamamoto",
    email: "ops@keigarage.jp",
    phone: "+81 80-7720-1102",
    address: "Nagoya, Aichi",
    plan: "Starter",
    status: "Teste grátis",
    car_limit: 20,
    premium_entry_enabled: false,
    created_at: "2026-06-02",
    monthly_revenue: 4980,
    last_access: "2026-07-09 19:12",
    active_cars_month: 12,
    cars_this_month: 3
  },
  {
    id: "store-3",
    store_code: "OKH-OSA-022",
    name: "Osaka Minivan Base",
    owner_name: "Rafael Mori",
    email: "rafael@minivanbase.jp",
    phone: "+81 70-1444-9321",
    address: "Sakai, Osaka",
    plan: "Premium Operacional",
    status: "Inadimplente",
    car_limit: "45/mês",
    premium_entry_enabled: true,
    created_at: "2026-01-18",
    monthly_revenue: 29800,
    last_access: "2026-07-08 14:07",
    active_cars_month: 24,
    cars_this_month: 17
  },
  {
    id: "store-4",
    store_code: "OKH-FUK-036",
    name: "Fukuoka Trade Cars",
    owner_name: "Daniela Ito",
    email: "daniela@tradecars.jp",
    phone: "+81 90-3104-8841",
    address: "Fukuoka, Fukuoka",
    plan: "Pro",
    status: "Bloqueada",
    car_limit: "Ilimitado",
    premium_entry_enabled: true,
    created_at: "2026-04-23",
    monthly_revenue: 9800,
    last_access: "2026-07-01 11:28",
    active_cars_month: 8,
    cars_this_month: 1
  }
];

let vehicles = [
  {
    id: "veh-1",
    store_id: "store-1",
    brand: "Toyota",
    model: "Aqua S",
    year: 2020,
    plate: "KSG 24-18",
    chassis: "NHP10-782441",
    mileage: 42800,
    color: "Branco",
    origin: "Leilão",
    purchase_price: 820000,
    entry_date: "2026-05-02",
    status: "Em preparação",
    advertised_price: 1120000,
    minimum_price: 1040000,
    sold_price: null,
    sold_date: null,
    notes: "Veículo de leilão com pequena avaria traseira. Fotos pendentes.",
    created_by: "usr-3",
    created_at: "2026-05-02T09:15:00",
    focus: "center"
  },
  {
    id: "veh-2",
    store_id: "store-1",
    brand: "Honda",
    model: "N-Box Custom",
    year: 2021,
    plate: "OMA 91-40",
    chassis: "JF3-612844",
    mileage: 31800,
    color: "Prata",
    origin: "Compra direta",
    purchase_price: 760000,
    entry_date: "2026-06-19",
    status: "Pronto para venda",
    advertised_price: 1040000,
    minimum_price: 965000,
    sold_price: null,
    sold_date: null,
    notes: "Carro já preparado. Conferir documentos antes de anunciar em todos os canais.",
    created_by: "usr-4",
    created_at: "2026-06-19T13:31:00",
    focus: "right"
  },
  {
    id: "veh-3",
    store_id: "store-1",
    brand: "Nissan",
    model: "Serena Highway Star",
    year: 2018,
    plate: "KSB 77-02",
    chassis: "C27-090812",
    mileage: 78200,
    color: "Preto",
    origin: "Troca",
    purchase_price: 780000,
    entry_date: "2026-04-22",
    status: "Vendido",
    advertised_price: 1280000,
    minimum_price: 1100000,
    sold_price: 1180000,
    sold_date: "2026-07-03",
    notes: "Venda concluída com comissão reduzida.",
    created_by: "usr-3",
    created_at: "2026-04-22T16:10:00",
    focus: "left"
  },
  {
    id: "veh-4",
    store_id: "store-1",
    brand: "Suzuki",
    model: "Alto L",
    year: 2019,
    plate: "KUK 12-08",
    chassis: "HA36S-441210",
    mileage: 63800,
    color: "Azul",
    origin: "Leilão",
    purchase_price: 390000,
    entry_date: "2026-04-01",
    status: "Prejuízo",
    advertised_price: 420000,
    minimum_price: 455000,
    sold_price: null,
    sold_date: null,
    notes: "Custo real acima do previsto. Reavaliar preço ou arquivar.",
    created_by: "usr-4",
    created_at: "2026-04-01T10:05:00",
    focus: "center"
  },
  {
    id: "veh-5",
    store_id: "store-2",
    brand: "Daihatsu",
    model: "Move X",
    year: 2020,
    plate: "NGY 20-41",
    chassis: "LA150S-881102",
    mileage: 50200,
    color: "Vermelho",
    origin: "Consignado",
    purchase_price: 520000,
    entry_date: "2026-06-25",
    status: "Aguardando shaken",
    advertised_price: 720000,
    minimum_price: 690000,
    sold_price: null,
    sold_date: null,
    notes: "Shaken vence em agosto. Preparar pacote com custo previsto.",
    created_by: "usr-7",
    created_at: "2026-06-25T09:42:00",
    focus: "right"
  },
  {
    id: "veh-6",
    store_id: "store-2",
    brand: "Mazda",
    model: "Demio XD",
    year: 2017,
    plate: "NGY 44-39",
    chassis: "DJ5FS-330991",
    mileage: 88100,
    color: "Cinza",
    origin: "Revenda interna",
    purchase_price: 470000,
    entry_date: "2026-05-28",
    status: "Anunciado",
    advertised_price: 690000,
    minimum_price: 640000,
    sold_price: null,
    sold_date: null,
    notes: "Anúncio publicado. Acompanhar margem e tempo parado.",
    created_by: "usr-7",
    created_at: "2026-05-28T12:22:00",
    focus: "left"
  },
  {
    id: "veh-7",
    store_id: "store-3",
    brand: "Toyota",
    model: "Voxy ZS",
    year: 2019,
    plate: "OSA 80-11",
    chassis: "ZRR80-288441",
    mileage: 66500,
    color: "Preto",
    origin: "Leilão",
    purchase_price: 1120000,
    entry_date: "2026-06-01",
    status: "Cadastrando",
    advertised_price: 1580000,
    minimum_price: 1490000,
    sold_price: null,
    sold_date: null,
    notes: "Cadastro assistido pela OKH. Fotos em organização.",
    created_by: "usr-2",
    created_at: "2026-06-01T09:30:00",
    focus: "right"
  },
  {
    id: "veh-8",
    store_id: "store-3",
    brand: "Honda",
    model: "Stepwgn Spada",
    year: 2018,
    plate: "OSA 33-78",
    chassis: "RP3-192011",
    mileage: 72500,
    color: "Branco",
    origin: "Compra direta",
    purchase_price: 1040000,
    entry_date: "2026-05-14",
    status: "Vendido",
    advertised_price: 1490000,
    minimum_price: 1370000,
    sold_price: 1410000,
    sold_date: "2026-07-07",
    notes: "Venda premium concluída pelo operador OKH.",
    created_by: "usr-2",
    created_at: "2026-05-14T15:00:00",
    focus: "center"
  }
];

let vehicleCosts = [
  ["c1", "store-1", "veh-1", "Shaken", "Preparação de shaken", 60000, 68000, "2026-05-07", "usr-3", "Recibo recebido"],
  ["c2", "store-1", "veh-1", "Óleo", "Óleo + filtro", 8000, 9200, "2026-05-06", "usr-4", ""],
  ["c3", "store-1", "veh-1", "Pintura", "Retoque para-choque traseiro", 45000, 57000, "2026-05-13", "usr-4", "Custo real acima do previsto"],
  ["c4", "store-1", "veh-2", "Polimento", "Polimento premium", 35000, 33000, "2026-06-22", "usr-4", ""],
  ["c5", "store-1", "veh-2", "Higienização", "Higienização completa", 25000, 24000, "2026-06-23", "usr-4", ""],
  ["c6", "store-1", "veh-3", "Pneus", "Jogo 195/65R15", 36000, 38000, "2026-04-26", "usr-3", ""],
  ["c7", "store-1", "veh-3", "Comissão", "Comissão venda", 35000, 35000, "2026-07-03", "usr-3", ""],
  ["c8", "store-1", "veh-4", "Transporte", "Retirada do leilão", 18000, 23000, "2026-04-02", "usr-4", ""],
  ["c9", "store-1", "veh-4", "Bateria", "Troca bateria", 18000, 22000, "2026-04-04", "usr-4", ""],
  ["c10", "store-1", "veh-4", "Freios", "Pastilhas e mão de obra", 22000, 31000, "2026-04-09", "usr-4", "Prejuízo detectado"],
  ["c11", "store-2", "veh-5", "Shaken", "Shaken kei car", 60000, 0, "2026-07-18", "usr-7", "Previsto"],
  ["c12", "store-2", "veh-6", "Fotos", "Sessão de fotos", 12000, 12000, "2026-06-02", "usr-7", ""],
  ["c13", "store-3", "veh-7", "Documento", "Conferência e organização", 15000, 9000, "2026-06-04", "usr-2", ""],
  ["c14", "store-3", "veh-8", "Higienização", "Premium", 25000, 26000, "2026-05-18", "usr-2", ""],
  ["c15", "store-3", "veh-8", "Comissão", "Comissão venda", 45000, 45000, "2026-07-07", "usr-2", ""]
].map(([id, store_id, vehicle_id, category, description, estimated_value, actual_value, date, created_by, notes]) => ({
  id,
  store_id,
  vehicle_id,
  category,
  description,
  estimated_value,
  actual_value,
  date,
  receipt_url: "",
  notes,
  created_by,
  created_at: `${date}T10:00:00`
}));

let checklistItems = [
  ["ck1", "store-1", "veh-1", "Trocar óleo", "Óleo", "Concluído", 8000, 9200, "usr-4", "2026-05-06", "2026-05-06", ""],
  ["ck2", "store-1", "veh-1", "Fazer shaken", "Shaken", "Em andamento", 60000, 68000, "usr-3", "2026-07-08", null, "Prazo estourado"],
  ["ck3", "store-1", "veh-1", "Tirar fotos", "Anúncio", "Pendente", 12000, 0, "usr-4", "2026-07-12", null, ""],
  ["ck4", "store-1", "veh-2", "Polimento premium", "Polimento", "Concluído", 35000, 33000, "usr-4", "2026-06-22", "2026-06-22", ""],
  ["ck5", "store-1", "veh-2", "Publicar anúncio", "Anúncio", "Pendente", 0, 0, "usr-3", "2026-07-14", null, ""],
  ["ck6", "store-1", "veh-3", "Preparar entrega", "Entrega", "Concluído", 0, 0, "usr-3", "2026-07-04", "2026-07-03", ""],
  ["ck7", "store-1", "veh-4", "Revisar freios", "Freios", "Concluído", 22000, 31000, "usr-4", "2026-04-09", "2026-04-09", "Custo alto"],
  ["ck8", "store-1", "veh-4", "Reavaliar preço anunciado", "Venda", "Pendente", 0, 0, "usr-3", "2026-07-02", null, "Carro abaixo da margem desejada"],
  ["ck9", "store-2", "veh-5", "Fazer shaken", "Shaken", "Pendente", 60000, 0, "usr-7", "2026-07-18", null, ""],
  ["ck10", "store-3", "veh-7", "Organizar fotos", "Fotos", "Em andamento", 12000, 0, "usr-2", "2026-07-11", null, ""],
  ["ck11", "store-3", "veh-8", "Relatório mensal", "Relatório", "Concluído", 0, 0, "usr-2", "2026-07-08", "2026-07-08", ""]
].map(([id, store_id, vehicle_id, name, category, status, estimated_value, actual_value, responsible_user_id, due_date, completed_at, notes]) => ({
  id,
  store_id,
  vehicle_id,
  name,
  category,
  status,
  estimated_value,
  actual_value,
  responsible_user_id,
  due_date,
  completed_at,
  notes
}));

let users = [
  { id: "usr-1", store_id: null, name: "Keven OKH", email: "admin@okh.jp", role: "Admin Master OKH", status: "Ativo", created_at: "2026-01-01" },
  { id: "usr-2", store_id: null, name: "Ana OKH", email: "operacao@okh.jp", role: "Operador OKH", status: "Ativo", created_at: "2026-02-03" },
  { id: "usr-3", store_id: "store-1", name: "Marcos Tanaka", email: "marcos@sakuraauto.jp", role: "Dono da Loja", status: "Ativo", created_at: "2026-02-11" },
  { id: "usr-4", store_id: "store-1", name: "Bruno Sato", email: "bruno@sakuraauto.jp", role: "Funcionário da Loja", status: "Ativo", created_at: "2026-03-01" },
  { id: "usr-5", store_id: "store-1", name: "Elaine Lee", email: "relatorios@sakuraauto.jp", role: "Somente Leitura", status: "Ativo", created_at: "2026-03-17" },
  { id: "usr-7", store_id: "store-2", name: "Priscila Yamamoto", email: "ops@keigarage.jp", role: "Dono da Loja", status: "Ativo", created_at: "2026-06-02" }
];

let premiumRequests = [
  {
    id: "req-1",
    store_id: "store-1",
    vehicle_name: "Toyota Vitz F",
    brand: "Toyota",
    model: "Vitz F",
    year: 2019,
    mileage: 54400,
    purchase_price: 610000,
    origin: "Leilão",
    shaken_info: "Válido até 2027/02",
    notes: "Fotos externas enviadas. Falta documento do leilão.",
    status: "Recebido",
    priority: "Alta",
    created_by: "usr-3",
    assigned_to: "usr-2",
    created_at: "2026-07-09T10:21:00"
  },
  {
    id: "req-2",
    store_id: "store-3",
    vehicle_name: "Daihatsu Tanto Custom",
    brand: "Daihatsu",
    model: "Tanto Custom",
    year: 2020,
    mileage: 38300,
    purchase_price: 780000,
    origin: "Compra direta",
    shaken_info: "Sem shaken",
    notes: "Criar checklist Shaken + Venda.",
    status: "Cadastrando",
    priority: "Normal",
    created_by: "usr-2",
    assigned_to: "usr-2",
    created_at: "2026-07-07T16:44:00"
  },
  {
    id: "req-3",
    store_id: "store-2",
    vehicle_name: "Honda Fit Hybrid",
    brand: "Honda",
    model: "Fit Hybrid",
    year: 2018,
    mileage: 71900,
    purchase_price: 520000,
    origin: "Troca",
    shaken_info: "Informação pendente",
    notes: "Solicitar chassi e fotos internas.",
    status: "Faltando informação",
    priority: "Normal",
    created_by: "usr-7",
    assigned_to: "usr-2",
    created_at: "2026-07-08T11:17:00"
  },
  {
    id: "req-4",
    store_id: "store-1",
    vehicle_name: "Suzuki Wagon R",
    brand: "Suzuki",
    model: "Wagon R",
    year: 2021,
    mileage: 29800,
    purchase_price: 620000,
    origin: "Compra direta",
    shaken_info: "Válido até 2028/04",
    notes: "Publicado no painel da loja.",
    status: "Publicado",
    priority: "Baixa",
    created_by: "usr-3",
    assigned_to: "usr-2",
    created_at: "2026-07-05T09:06:00"
  }
];

let costPresets = [
  ["Troca de óleo simples", "Óleo", 5000, true, "Kei e compactos"],
  ["Óleo + filtro", "Filtro", 8000, true, "Padrão loja"],
  ["Polimento simples", "Polimento", 15000, true, ""],
  ["Polimento premium", "Polimento", 35000, true, "Carros escuros"],
  ["Higienização completa", "Higienização", 25000, true, ""],
  ["Revisão básica", "Mão de obra", 10000, true, ""],
  ["Revisão completa", "Mão de obra", 30000, true, ""],
  ["Shaken kei car", "Shaken", 60000, true, ""],
  ["Shaken compacto", "Shaken", 80000, true, ""],
  ["Shaken minivan", "Shaken", 120000, true, ""]
].map(([name, category, average_value, active, notes], index) => ({
  id: `preset-${index + 1}`,
  store_id: "store-1",
  name,
  category,
  average_value,
  active,
  notes
}));

let tirePresets = [
  ["155/65R14", "Econômico", "Kei", 24000, "Entrada"],
  ["195/65R15", "Econômico", "Compacto", 36000, ""],
  ["215/45R17", "Médio", "Sport", 55000, ""],
  ["225/40R18", "Premium", "Sedan", 85000, "Usar em carros de maior margem"]
].map(([size, brand, type, average_value, notes], index) => ({
  id: `tire-${index + 1}`,
  store_id: "store-1",
  size,
  brand,
  type,
  average_value,
  active: true,
  notes
}));

const checklistTemplates = [
  {
    id: "tpl-1",
    store_id: "store-1",
    name: "Checklist Revenda Simples",
    description: "Rápido para carros com baixa preparação.",
    active: true,
    items: ["Trocar óleo", "Revisão básica", "Lavagem interna", "Polimento simples", "Tirar fotos", "Publicar anúncio"]
  },
  {
    id: "tpl-2",
    store_id: "store-1",
    name: "Checklist Revenda Completa",
    description: "Preparação completa com margem mais alta.",
    active: true,
    items: ["Óleo + filtro", "Revisão completa", "Higienização", "Polimento premium", "Verificar pneus", "Verificar bateria", "Verificar freios", "Tirar fotos", "Publicar anúncio"]
  },
  {
    id: "tpl-3",
    store_id: "store-1",
    name: "Checklist Shaken + Venda",
    description: "Para carros que precisam sair com shaken pronto.",
    active: true,
    items: ["Fazer shaken", "Trocar óleo", "Revisão básica", "Limpeza interna", "Conferir documentos", "Preparar entrega"]
  },
  {
    id: "tpl-4",
    store_id: "store-1",
    name: "Checklist Carro de Leilão",
    description: "Inclui transporte, taxas e anúncio.",
    active: true,
    items: ["Taxa de leilão", "Transporte", "Revisão", "Óleo", "Limpeza", "Polimento", "Fotos", "Anúncio", "Margem desejada"]
  }
];

const plans = [
  {
    name: "Starter",
    price: 4980,
    range: "por mês",
    features: ["Até 20 carros ativos", "Cadastro de veículos", "Controle de custos", "Checklist básico", "Lucro/prejuízo", "Dashboard simples"]
  },
  {
    name: "Pro",
    price: 9800,
    range: "por mês",
    features: ["Carros ilimitados", "Fotos e documentos", "PDF/Excel", "Checklists personalizados", "Tabela de custos padrão", "Mais de um usuário", "Dashboard avançado"]
  },
  {
    name: "Premium Operacional",
    price: 19800,
    range: "a ¥39.800/mês",
    features: ["Tudo do Pro", "Cadastro assistido pela OKH", "Organização de fotos", "Checklist aplicado", "Registro de custos enviados", "Relatório mensal", "Cobrança por carro extra"]
  }
];

let activityLogs = [
  ["log-1", "store-1", "usr-3", "vehicle", "veh-1", "Criou veículo", "", "Toyota Aqua S", "Cadastro inicial", "2026-05-02T09:15:00"],
  ["log-2", "store-1", "usr-4", "cost", "veh-1", "Alterou custo", "¥45.000", "¥57.000", "Pintura ficou acima do previsto", "2026-05-13T14:26:00"],
  ["log-3", "store-1", "usr-3", "vehicle", "veh-3", "Marcou como vendido", "Anunciado", "Vendido", "Venda finalizada", "2026-07-03T17:42:00"],
  ["log-4", "store-1", "usr-4", "checklist", "veh-2", "Concluiu checklist", "Pendente", "Concluído", "Polimento premium concluído", "2026-06-22T15:10:00"],
  ["log-5", "store-3", "usr-2", "premium_request", "req-2", "Assumiu solicitação", "", "Cadastrando", "Cadastro premium em andamento", "2026-07-07T17:21:00"]
].map(([id, store_id, user_id, entity_type, entity_id, action, old_value, new_value, notes, created_at]) => ({
  id,
  store_id,
  user_id,
  entity_type,
  entity_id,
  action,
  old_value,
  new_value,
  notes,
  created_at
}));

const state = {
  isLoggedIn: false,
  role: "owner",
  panel: "store",
  view: "dashboard",
  selectedStoreId: "store-1",
  selectedVehicleId: "veh-1",
  detailTab: "summary",
  search: "",
  statusFilter: "Todos",
  locale: localStorage.getItem("okh_locale") || "pt",
  languageOpen: false,
  modal: null,
  toast: ""
};

function i(name) {
  return icons[name] || icons.file;
}

function t(key) {
  return uiText[state.locale]?.[key] || uiText.pt[key] || key;
}

function navLabel(view, fallback) {
  return navLabels[state.locale]?.[view] || fallback;
}

function getViewCopy(view) {
  return viewCopyByLocale[state.locale]?.[view] || viewCopy[view] || viewCopy.dashboard;
}

function localizedRole(role) {
  const translated = roleTranslations[state.locale]?.[role.id];
  return translated ? { ...role, label: translated[0], text: translated[1] } : role;
}

function renderLanguageSwitcher() {
  return `
    <div class="language-menu ${state.languageOpen ? "is-open" : ""}">
      <button type="button" class="icon-button language-toggle" data-toggle-language title="${t("hiddenLanguage")}" aria-label="${t("language")}">
        ${i("globe")}
      </button>
      <div class="language-popover" role="menu" aria-label="${t("language")}">
        ${languageOptions
          .map(
            ([id, label, short]) => `
              <button type="button" class="language-option ${state.locale === id ? "is-active" : ""}" data-locale="${id}">
                <strong>${label}</strong>
                <span>${short}</span>
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function yen(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function number(value) {
  return new Intl.NumberFormat("pt-BR").format(Number(value || 0));
}

function pct(value) {
  if (!Number.isFinite(value)) return "0%";
  return `${value.toFixed(1).replace(".", ",")}%`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clean(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function statusClass(status) {
  const s = clean(status);
  if (s.includes("preju")) return "status-prejuizo";
  if (s.includes("bloque")) return "status-bloqueada";
  if (s.includes("inad")) return "status-inadimplente";
  if (s.includes("ativa")) return "status-ativa";
  if (s.includes("teste")) return "status-pendente";
  if (s.includes("pronto") || s.includes("publicado") || s.includes("concluido")) return "status-pronto";
  if (s.includes("vendido") || s.includes("premium")) return "status-vendido";
  if (s.includes("prepar") || s.includes("analise") || s.includes("cadastrando")) return "status-preparacao";
  if (s.includes("aguardando") || s.includes("pendente") || s.includes("faltando")) return "status-aguardando";
  if (s.includes("recebido") || s.includes("entrada")) return "status-entrada";
  if (s.includes("cancel")) return "status-cancelado";
  return "";
}

function badge(status) {
  return `<span class="badge ${statusClass(status)}">${escapeHtml(status)}</span>`;
}

function storeById(id = state.selectedStoreId) {
  return stores.find((store) => store.id === id) || stores[0];
}

function userById(id) {
  return users.find((user) => user.id === id) || { name: "Sistema OKH", role: "Sistema" };
}

function vehicleById(id = state.selectedVehicleId) {
  return vehicles.find((vehicle) => vehicle.id === id) || vehicles[0];
}

function vehiclesForStore(storeId = state.selectedStoreId) {
  return vehicles.filter((vehicle) => vehicle.store_id === storeId);
}

function costsForVehicle(vehicleId) {
  return vehicleCosts.filter((cost) => cost.vehicle_id === vehicleId);
}

function checklistForVehicle(vehicleId) {
  return checklistItems.filter((item) => item.vehicle_id === vehicleId);
}

function vehicleName(vehicle) {
  return `${vehicle.brand} ${vehicle.model}`;
}

function dateLabel(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}

function daysInStock(vehicle) {
  const diff = TODAY.getTime() - new Date(`${vehicle.entry_date}T00:00:00+09:00`).getTime();
  return Math.max(0, Math.round(diff / 86400000));
}

function totals(vehicle) {
  const rows = costsForVehicle(vehicle.id);
  const totalEstimatedCosts = rows.reduce((sum, cost) => sum + Number(cost.estimated_value || 0), 0);
  const totalActualCosts = rows.reduce((sum, cost) => sum + Number(cost.actual_value || 0), 0);
  const estimatedTotalInvestment = Number(vehicle.purchase_price || 0) + totalEstimatedCosts;
  const actualTotalInvestment = Number(vehicle.purchase_price || 0) + totalActualCosts;
  const estimatedProfit = Number(vehicle.advertised_price || 0) - estimatedTotalInvestment;
  const actualProfit = vehicle.sold_price ? Number(vehicle.sold_price) - actualTotalInvestment : null;
  const marginPercentage = vehicle.sold_price ? (actualProfit / Number(vehicle.sold_price)) * 100 : (estimatedProfit / Math.max(Number(vehicle.advertised_price || 1), 1)) * 100;
  return {
    totalEstimatedCosts,
    totalActualCosts,
    estimatedTotalInvestment,
    actualTotalInvestment,
    estimatedProfit,
    actualProfit,
    marginPercentage,
    costDelta: totalActualCosts - totalEstimatedCosts
  };
}

function isSold(vehicle) {
  return clean(vehicle.status).includes("vendido");
}

function isArchived(vehicle) {
  return clean(vehicle.status).includes("arquivado");
}

function isInStock(vehicle) {
  return !isSold(vehicle) && !isArchived(vehicle);
}

function roleLabel() {
  return roles.find((role) => role.id === state.role)?.label || "Usuário";
}

function visibleStoreNav() {
  if (state.role === "readonly") {
    return storeNav.filter(([view]) => ["dashboard", "cars", "reports"].includes(view));
  }
  return storeNav;
}

function render() {
  const app = document.getElementById("app");
  document.documentElement.lang = state.locale === "pt" ? "pt-BR" : state.locale;
  if (!state.isLoggedIn) {
    app.innerHTML = renderLogin();
    return;
  }
  app.innerHTML = renderShell();
}

function renderLogin() {
  return `
    <section class="login-page">
      <div class="login-copy">
        <img src="${GARAGE_IMAGE}" alt="Garagem automotiva limpa com carros em preparação" />
        <div class="brand-mark"><span class="brand-logo">OKH</span><span>AutoLedger</span></div>
        <div>
          <h1>Controle financeiro por carro, da entrada à venda.</h1>
          <p>Plataforma interna para lojistas, vendedores e operações OKH acompanharem estoque, preparação, checklist, custos previstos, custos reais, lucro e prejuízo em iene japonês.</p>
        </div>
        <p class="small">Protótipo multi-tenant: cada loja opera pelo próprio <strong>store_id</strong>; Admin OKH enxerga todas as lojas.</p>
      </div>
      <div class="login-panel">
        <form class="login-card" id="login-form">
          <h2>Entrar no OKH AutoLedger</h2>
          <p class="muted">Escolha um perfil para abrir a tela inicial correspondente.</p>
          <div class="role-grid">
            ${roles
              .map(
                (role) => `
                  <button type="button" class="role-card ${state.role === role.id ? "is-active" : ""}" data-role="${role.id}">
                    <strong>${role.label}</strong>
                    <span>${role.text}</span>
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="field-grid">
            <label class="field">
              <span>Email</span>
              <input value="demo@okh.jp" autocomplete="email" />
            </label>
            <label class="field">
              <span>Store ID padrão</span>
              <select name="store_id">
                ${stores.map((store) => `<option value="${store.id}" ${store.id === state.selectedStoreId ? "selected" : ""}>${store.store_code}</option>`).join("")}
              </select>
            </label>
          </div>
          <div class="alert success" style="margin:16px 0 18px;">Dados demo carregados localmente. Nenhuma loja pública ou marketplace foi criado.</div>
          <button class="button" type="submit">${i("lock")} Entrar no painel</button>
        </form>
      </div>
    </section>
  `;
}

function renderShell() {
  const nav = state.panel === "admin" ? adminNav : visibleStoreNav();
  const [title, subtitle] = viewCopy[state.view] || viewCopy.dashboard;
  return `
    <div class="app-shell">
      ${renderSidebar(nav)}
      <main class="main-area">
        <header class="topbar">
          <div>
            <h1>${title}</h1>
            <p>${subtitle}</p>
          </div>
          ${renderTopActions()}
        </header>
        <section class="page">${renderView()}</section>
        ${renderMobileBar(nav)}
      </main>
      ${renderModal()}
      ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
    </div>
  `;
}

function renderSidebar(nav) {
  const store = storeById();
  const tenant = state.panel === "admin"
    ? `<span>Console OKH</span><strong>Admin global</strong><code>todos os store_id</code>`
    : `<span>Loja atual</span><strong>${store.name}</strong><code>${store.store_code}</code>`;
  return `
    <aside class="sidebar">
      <div class="brand-mark"><span class="brand-logo">OKH</span><span>AutoLedger</span></div>
      <div class="tenant-pill">${tenant}</div>
      <div class="nav-section-title">${state.panel === "admin" ? "Painel Admin OKH" : "Painel do Lojista"}</div>
      <nav class="nav-list">
        ${nav
          .map(
            ([view, label, iconName]) => `
              <button type="button" class="nav-item ${state.view === view ? "is-active" : ""}" data-view="${view}">
                ${i(iconName)}
                <span>${label}</span>
              </button>
            `
          )
          .join("")}
      </nav>
      <div class="sidebar-footer">
        ${state.role === "admin" || state.role === "operator" ? renderPanelSwitcher() : ""}
        <button type="button" class="nav-item" data-action="logout">${i("logout")} <span>Sair</span></button>
      </div>
    </aside>
  `;
}

function renderPanelSwitcher() {
  if (state.panel === "admin") {
    return `<button type="button" class="nav-item" data-panel="store">${i("store")} <span>Ver como loja</span></button>`;
  }
  return `<button type="button" class="nav-item" data-panel="admin">${i("shield")} <span>Voltar ao Admin</span></button>`;
}

function renderTopActions() {
  const storeOptions = stores.map((store) => `<option value="${store.id}" ${store.id === state.selectedStoreId ? "selected" : ""}>${store.store_code}</option>`).join("");
  if (state.panel === "admin") {
    return `
      <div class="top-actions">
        <select class="search-box" data-store-switch style="max-width:190px;">${storeOptions}</select>
        <button type="button" class="button secondary" data-view="storeCreate">${i("store")} Criar loja</button>
        <button type="button" class="button" data-view="assisted">${i("plus")} Cadastrar carro</button>
      </div>
    `;
  }
  return `
    <div class="top-actions">
      <span class="badge ${statusClass(storeById().plan)}">${storeById().plan}</span>
      <button type="button" class="button secondary" data-modal="cost">${i("yen")} Adicionar custo</button>
      <button type="button" class="button" data-view="entry">${i("plus")} Novo carro</button>
    </div>
  `;
}

function renderMobileBar(nav) {
  const compact = nav.slice(0, 5);
  return `
    <nav class="mobile-bar">
      ${compact
        .map(
          ([view, label, iconName]) => `
            <button type="button" class="${state.view === view ? "is-active" : ""}" data-view="${view}">
              ${i(iconName)}
              <span>${label.split(" ")[0]}</span>
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function renderView() {
  switch (state.view) {
    case "dashboard":
      return renderStoreDashboard();
    case "cars":
      return renderCarsPage();
    case "entry":
      return renderVehicleEntry();
    case "preparation":
      return renderPreparation();
    case "costs":
      return renderCostsPage();
    case "sales":
      return renderSalesPage();
    case "premium":
      return renderPremiumRequestPage();
    case "reports":
      return renderReportsPage();
    case "settings":
      return renderSettingsPage();
    case "details":
      return renderVehicleDetails();
    case "adminDashboard":
      return renderAdminDashboard();
    case "stores":
      return renderStoresAdmin();
    case "storeCreate":
      return renderStoreCreateAdmin();
    case "plans":
      return renderPlansPage();
    case "users":
      return renderUsersPage();
    case "adminPremium":
      return renderAdminPremiumRequests();
    case "assisted":
      return renderAssistedEntries();
    case "carsByStore":
      return renderCarsByStore();
    case "payments":
      return renderPayments();
    case "globalReports":
      return renderGlobalReports();
    case "adminSettings":
      return renderAdminSettings();
    default:
      return renderStoreDashboard();
  }
}

function kpi(label, value, note, iconName = "chart", tone = "") {
  return `
    <article class="card kpi-card">
      <div class="kpi-top">
        <div>
          <div class="kpi-label">${label}</div>
          <div class="kpi-value">${value}</div>
        </div>
        <span class="icon-wrap ${tone}">${i(iconName)}</span>
      </div>
      <div class="kpi-note">${note}</div>
    </article>
  `;
}

function renderStoreDashboard() {
  const cars = vehiclesForStore();
  const active = cars.filter(isInStock);
  const soldMonth = cars.filter((vehicle) => isSold(vehicle) && vehicle.sold_date?.startsWith("2026-07"));
  const investment = active.reduce((sum, vehicle) => sum + totals(vehicle).actualTotalInvestment, 0);
  const predicted = active.reduce((sum, vehicle) => sum + totals(vehicle).estimatedProfit, 0);
  const realized = soldMonth.reduce((sum, vehicle) => sum + (totals(vehicle).actualProfit || 0), 0);
  const prep = active.filter((vehicle) => clean(vehicle.status).includes("prepar") || clean(vehicle.status).includes("aguard")).length;
  const ready = active.filter((vehicle) => clean(vehicle.status).includes("pronto") || clean(vehicle.status).includes("anunciado")).length;
  const loss = active.filter((vehicle) => totals(vehicle).estimatedProfit < 0 || clean(vehicle.status).includes("preju")).length;
  const stuck = active.filter((vehicle) => daysInStock(vehicle) > 60).length;
  const recent = [...cars].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  const pending = checklistItems
    .filter((item) => item.store_id === state.selectedStoreId && !["Concluído", "Cancelado"].includes(item.status))
    .slice(0, 6);
  const alerts = dashboardAlerts(cars).slice(0, 5);
  return `
    <div class="view-stack">
      <div class="quick-actions">
        <button type="button" class="button" data-view="entry">${i("plus")} Novo carro</button>
        <button type="button" class="button secondary" data-modal="cost">${i("yen")} Adicionar custo</button>
        <button type="button" class="button secondary" data-modal="checklist">${i("check")} Aplicar checklist</button>
        <button type="button" class="button secondary" data-view="premium">${i("upload")} Solicitar cadastro</button>
      </div>
      <div class="metric-grid">
        ${kpi("Carros em estoque", number(active.length), "Ativos no store_id atual", "car")}
        ${kpi("Investimento total", yen(investment), "Compra + custos reais", "yen")}
        ${kpi("Lucro previsto", yen(predicted), "Baseado no preço anunciado", "chart", predicted >= 0 ? "success" : "danger")}
        ${kpi("Lucro realizado no mês", yen(realized), `${soldMonth.length} venda(s) em julho`, "check", realized >= 0 ? "success" : "danger")}
        ${kpi("Vendidos no mês", number(soldMonth.length), "Saídas concluídas", "check", "success")}
        ${kpi("Em preparação", number(prep), "Entrada, peças ou shaken", "wrench", "warning")}
        ${kpi("Prontos para venda", number(ready), "Pronto ou anunciado", "car", "success")}
        ${kpi("Com prejuízo", number(loss), "Previsto ou real negativo", "alert", loss ? "danger" : "")}
        ${kpi("Parados 60+ dias", number(stuck), "Atenção para giro de estoque", "alert", stuck ? "warning" : "")}
      </div>
      <div class="content-grid">
        <div class="grid">
          <section class="card">
            <div class="card-header">
              <h2>Carros recentes</h2>
              <button type="button" class="button secondary small-btn" data-view="cars">Ver todos</button>
            </div>
            <div class="card-body table-wrap">
              <table>
                <thead><tr><th>Carro</th><th>Status</th><th>Custo real</th><th>Preço anunciado</th><th>Resultado</th><th></th></tr></thead>
                <tbody>${recent.map(renderVehicleRow).join("")}</tbody>
              </table>
            </div>
          </section>
          <section class="card">
            <div class="card-header"><h2>Lucro mensal</h2><span class="muted small">últimos 6 meses</span></div>
            <div class="card-body">${renderProfitChart()}</div>
          </section>
          <section class="card">
            <div class="card-header"><h2>Entrada e saída de veículos</h2><span class="muted small">volume operacional</span></div>
            <div class="card-body">${renderFlowChart()}</div>
          </section>
        </div>
        <div class="grid">
          <section class="card">
            <div class="card-header"><h2>Tarefas pendentes</h2>${badge(`${pending.length} pendentes`)}</div>
            <div class="card-body list">
              ${pending.map(renderTaskRow).join("") || '<div class="empty-state">Nenhuma tarefa pendente.</div>'}
            </div>
          </section>
          <section class="card">
            <div class="card-header"><h2>Alertas</h2><span class="icon-wrap warning">${i("alert")}</span></div>
            <div class="card-body grid">
              ${alerts.map((alert) => `<div class="alert ${alert.tone || ""}">${alert.text}</div>`).join("") || '<div class="alert success">Operação sem alertas críticos no momento.</div>'}
            </div>
          </section>
          <section class="card">
            <div class="card-header"><h2>Ranking de margem</h2></div>
            <div class="card-body list">${renderMarginRanking(cars)}</div>
          </section>
        </div>
      </div>
    </div>
  `;
}

function dashboardAlerts(cars) {
  return cars.flatMap((vehicle) => {
    const t = totals(vehicle);
    const alerts = [];
    if (daysInStock(vehicle) > 60 && isInStock(vehicle)) alerts.push({ tone: "", text: `${vehicleName(vehicle)}: carro parado há mais de 60 dias.` });
    if (t.actualTotalInvestment > t.estimatedTotalInvestment) alerts.push({ tone: "", text: `${vehicleName(vehicle)}: custo real acima do previsto.` });
    if (t.estimatedProfit < 0) alerts.push({ tone: "danger", text: `${vehicleName(vehicle)}: prejuízo previsto detectado.` });
    if (t.actualProfit !== null && t.actualProfit < 0) alerts.push({ tone: "danger", text: `${vehicleName(vehicle)}: prejuízo real detectado.` });
    const late = checklistForVehicle(vehicle.id).find((item) => item.status !== "Concluído" && new Date(`${item.due_date}T23:59:00+09:00`) < TODAY);
    if (late) alerts.push({ tone: "", text: `${vehicleName(vehicle)}: tarefa atrasada (${late.name}).` });
    return alerts;
  });
}

function renderVehicleRow(vehicle) {
  const t = totals(vehicle);
  const result = t.actualProfit ?? t.estimatedProfit;
  return `
    <tr>
      <td><strong>${vehicleName(vehicle)}</strong><br><span class="muted">${vehicle.plate} · ${number(vehicle.mileage)} km</span></td>
      <td>${badge(vehicle.status)}</td>
      <td>${yen(t.actualTotalInvestment)}</td>
      <td>${yen(vehicle.advertised_price)}</td>
      <td class="${result >= 0 ? "profit" : "loss"}"><strong>${yen(result)}</strong></td>
      <td><button type="button" class="button secondary small-btn" data-vehicle="${vehicle.id}">Abrir</button></td>
    </tr>
  `;
}

function renderTaskRow(item) {
  const vehicle = vehicleById(item.vehicle_id);
  const late = new Date(`${item.due_date}T23:59:00+09:00`) < TODAY;
  return `
    <div class="list-row">
      <div>
        <strong>${item.name}</strong>
        <span class="muted small">${vehicleName(vehicle)} · ${item.category} · ${dateLabel(item.due_date)}</span>
      </div>
      ${badge(late ? "Atrasada" : item.status)}
    </div>
  `;
}

function renderProfitChart() {
  const data = [
    ["Fev", 220000, "success"],
    ["Mar", 184000, "success"],
    ["Abr", 96000, "warning"],
    ["Mai", 254000, "success"],
    ["Jun", 178000, "success"],
    ["Jul", 312000, "success"]
  ];
  const max = Math.max(...data.map((row) => row[1]));
  return `<div class="chart">${data.map(([label, value, tone]) => chartRow(label, value, max, tone)).join("")}</div>`;
}

function renderFlowChart() {
  const data = [
    ["Entrada", 7, "warning"],
    ["Preparação", 5, "warning"],
    ["Prontos", 4, "success"],
    ["Vendidos", 3, "success"],
    ["Prejuízo", 1, "danger"]
  ];
  const max = Math.max(...data.map((row) => row[1]));
  return `<div class="chart">${data.map(([label, value, tone]) => chartRow(label, value, max, tone, "carros")).join("")}</div>`;
}

function chartRow(label, value, max, tone = "", suffix = "") {
  const width = Math.max(5, Math.round((value / max) * 100));
  return `
    <div class="chart-row">
      <span>${label}</span>
      <span class="bar-track"><span class="bar-fill ${tone}" style="width:${width}%"></span></span>
      <strong>${suffix ? `${value} ${suffix}` : yen(value)}</strong>
    </div>
  `;
}

function renderMarginRanking(cars) {
  const ranked = [...cars]
    .map((vehicle) => ({ vehicle, t: totals(vehicle) }))
    .sort((a, b) => b.t.marginPercentage - a.t.marginPercentage);
  const best = ranked.slice(0, 3);
  const worst = ranked.slice(-2).reverse();
  return `
    ${best
      .map(
        ({ vehicle, t }) => `
          <div class="list-row">
            <div><strong>${vehicleName(vehicle)}</strong><span class="muted small">Maior margem</span></div>
            <strong class="${t.marginPercentage >= 0 ? "profit" : "loss"}">${pct(t.marginPercentage)}</strong>
          </div>
        `
      )
      .join("")}
    ${worst
      .map(
        ({ vehicle, t }) => `
          <div class="list-row">
            <div><strong>${vehicleName(vehicle)}</strong><span class="muted small">Menor margem</span></div>
            <strong class="${t.marginPercentage >= 0 ? "profit" : "loss"}">${pct(t.marginPercentage)}</strong>
          </div>
        `
      )
      .join("")}
  `;
}

function renderCarsPage() {
  const statusOptions = ["Todos", "Entrada", "Em preparação", "Aguardando peças", "Aguardando shaken", "Pronto para venda", "Anunciado", "Reservado", "Vendido", "Prejuízo"];
  const filtered = vehiclesForStore()
    .filter((vehicle) => state.statusFilter === "Todos" || vehicle.status === state.statusFilter)
    .filter((vehicle) => clean(`${vehicle.brand} ${vehicle.model} ${vehicle.plate} ${vehicle.year}`).includes(clean(state.search)));
  return `
    <div class="view-stack">
      <section class="card pad">
        <div class="toolbar">
          <input class="search-box" data-filter="search" placeholder="Buscar por marca, modelo, placa..." value="${escapeHtml(state.search)}" />
          <select class="search-box" data-filter="statusFilter">
            ${statusOptions.map((status) => `<option ${state.statusFilter === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
          <select class="search-box"><option>Todos os anos</option><option>2021+</option><option>2019-2020</option><option>Até 2018</option></select>
          <select class="search-box"><option>Preço anunciado</option><option>Até ¥700.000</option><option>¥700.000 a ¥1.200.000</option><option>Acima de ¥1.200.000</option></select>
          <select class="search-box"><option>Origem</option><option>Leilão</option><option>Compra direta</option><option>Troca</option><option>Consignado</option></select>
        </div>
      </section>
      <div class="quick-actions">
        <button type="button" class="button" data-view="entry">${i("plus")} Novo carro</button>
        <button type="button" class="button secondary" data-modal="cost">${i("yen")} Adicionar custo</button>
        <button type="button" class="button secondary" data-modal="checklist">${i("check")} Aplicar checklist</button>
        <button type="button" class="button secondary" data-modal="sale">${i("check")} Marcar como vendido</button>
        <button type="button" class="button secondary" data-export="vehicle-report">${i("file")} Gerar relatório</button>
      </div>
      <div class="vehicle-grid">
        ${filtered.map(renderVehicleCard).join("") || '<div class="empty-state">Nenhum carro encontrado com os filtros atuais.</div>'}
      </div>
      <section class="card">
        <div class="card-header"><h2>Tabela operacional</h2><span class="muted small">Custos, lucro e dias em estoque</span></div>
        <div class="card-body table-wrap">
          <table>
            <thead><tr><th>Veículo</th><th>Status</th><th>Compra</th><th>Previsto</th><th>Real</th><th>Custo total</th><th>Anunciado</th><th>Lucro</th><th>Dias</th><th></th></tr></thead>
            <tbody>${filtered.map(renderVehicleTableLine).join("")}</tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderVehicleCard(vehicle) {
  const t = totals(vehicle);
  const result = t.actualProfit ?? t.estimatedProfit;
  return `
    <article class="card vehicle-card">
      <div class="vehicle-photo">
        <img src="${GARAGE_IMAGE}" alt="${vehicleName(vehicle)}" style="object-position:${vehicle.focus};" />
        ${badge(vehicle.status)}
      </div>
      <div class="vehicle-card-body">
        <div class="vehicle-title">
          <div>
            <h3>${vehicleName(vehicle)}</h3>
            <span class="muted small">${vehicle.year} · ${vehicle.color} · ${number(vehicle.mileage)} km</span>
          </div>
          <span class="plate">${vehicle.plate}</span>
        </div>
        <div class="mini-stats">
          <div class="mini-stat"><span>Compra</span><strong>${yen(vehicle.purchase_price)}</strong></div>
          <div class="mini-stat"><span>Custos reais</span><strong>${yen(t.totalActualCosts)}</strong></div>
          <div class="mini-stat"><span>Custo total</span><strong>${yen(t.actualTotalInvestment)}</strong></div>
          <div class="mini-stat"><span>Lucro</span><strong class="${result >= 0 ? "profit" : "loss"}">${yen(result)}</strong></div>
        </div>
        <div class="toolbar">
          <button type="button" class="button small-btn" data-vehicle="${vehicle.id}">Detalhes</button>
          <button type="button" class="button secondary small-btn" data-modal="cost" data-modal-vehicle="${vehicle.id}">Custo</button>
          <button type="button" class="button secondary small-btn" data-modal="sale" data-modal-vehicle="${vehicle.id}">Vendido</button>
        </div>
      </div>
    </article>
  `;
}

function renderVehicleTableLine(vehicle) {
  const t = totals(vehicle);
  const result = t.actualProfit ?? t.estimatedProfit;
  return `
    <tr>
      <td><strong>${vehicleName(vehicle)}</strong><br><span class="muted">${vehicle.plate} · ${vehicle.origin}</span></td>
      <td>${badge(vehicle.status)}</td>
      <td>${yen(vehicle.purchase_price)}</td>
      <td>${yen(t.totalEstimatedCosts)}</td>
      <td>${yen(t.totalActualCosts)}</td>
      <td>${yen(t.actualTotalInvestment)}</td>
      <td>${yen(vehicle.advertised_price)}</td>
      <td class="${result >= 0 ? "profit" : "loss"}"><strong>${yen(result)}</strong></td>
      <td>${daysInStock(vehicle)}</td>
      <td><button type="button" class="button secondary small-btn" data-vehicle="${vehicle.id}">Abrir</button></td>
    </tr>
  `;
}

function renderVehicleEntry() {
  return `
    <div class="content-grid">
      <section class="card">
        <div class="card-header">
          <h2>Cadastro de veículo</h2>
          ${badge(storeById().store_code)}
        </div>
        <div class="card-body">
          <form id="vehicle-entry-form" class="grid">
            <input type="hidden" name="store_id" value="${state.selectedStoreId}" />
            <div class="field-grid">
              <label class="field"><span>Loja / Store ID</span><input value="${storeById().store_code}" disabled /></label>
              <label class="field"><span>Marca</span><input name="brand" required placeholder="Toyota" /></label>
              <label class="field"><span>Modelo</span><input name="model" required placeholder="Aqua S" /></label>
              <label class="field"><span>Ano</span><input name="year" type="number" required value="2020" /></label>
              <label class="field"><span>Placa</span><input name="plate" required placeholder="KSG 24-18" /></label>
              <label class="field"><span>Chassi</span><input name="chassis" required placeholder="NHP10-000000" /></label>
              <label class="field"><span>Quilometragem</span><input name="mileage" type="number" required value="45000" /></label>
              <label class="field"><span>Cor</span><input name="color" required placeholder="Branco" /></label>
              <label class="field"><span>Data de entrada</span><input name="entry_date" type="date" required value="2026-07-10" /></label>
              <label class="field"><span>Origem</span><select name="origin" required><option>Leilão</option><option>Compra direta</option><option>Troca</option><option>Consignado</option><option>Revenda interna</option><option>Outro</option></select></label>
              <label class="field"><span>Valor de compra</span><input name="purchase_price" type="number" required value="650000" /></label>
              <label class="field"><span>Status inicial</span><select name="status" required><option>Entrada</option><option>Em preparação</option><option>Aguardando peças</option><option>Aguardando shaken</option></select></label>
              <label class="field"><span>Modelo de preparação</span><select name="template_id">${checklistTemplates.map((tpl) => `<option value="${tpl.id}">${tpl.name}</option>`).join("")}</select></label>
              <label class="field"><span>Margem desejada (%)</span><input name="margin" type="number" value="18" /></label>
              <label class="field"><span>Preço anunciado</span><input name="advertised_price" type="number" value="890000" /></label>
              <label class="field"><span>Preço mínimo</span><input name="minimum_price" type="number" value="820000" /></label>
            </div>
            <label class="field"><span>Observações internas</span><textarea name="notes" placeholder="Dados opcionais, fornecedor, local de compra, leilão..."></textarea></label>
            <div class="upload-grid">
              <div class="upload-slot">${i("camera")} Fotos externas</div>
              <div class="upload-slot">${i("camera")} Fotos internas</div>
              <div class="upload-slot">${i("file")} Documento shaken</div>
              <div class="upload-slot">${i("upload")} Comprovantes</div>
            </div>
            <div class="toolbar">
              <button class="button" type="submit">${i("plus")} Cadastrar carro</button>
              <button class="button secondary" type="button" data-view="cars">Cancelar</button>
            </div>
          </form>
        </div>
      </section>
      <aside class="grid">
        <section class="card pad">
          <h3>Fluxo de entrada</h3>
          <div class="list" style="margin-top:12px;">
            ${["Novo veículo entrou", "Informar origem e compra", "Selecionar preparação", "Criar checklist e custos", "Calcular preço mínimo", "Entrar no estoque"].map((step, index) => `<div class="list-row"><span>${index + 1}. ${step}</span>${i("check")}</div>`).join("")}
          </div>
        </section>
        <section class="card pad">
          <h3>Regra aplicada</h3>
          <p class="muted">Ao salvar, o sistema cria tarefas pendentes, custos previstos vinculados e registra log de atividade financeira. A exclusão definitiva fica bloqueada; o fluxo usa arquivamento.</p>
          <div class="alert">Preço mínimo sugerido considera valor de compra, custos previstos e margem desejada.</div>
        </section>
      </aside>
    </div>
  `;
}

function renderVehicleDetails() {
  const vehicle = vehicleById();
  const t = totals(vehicle);
  const tabs = [
    ["summary", "Resumo"],
    ["checklist", "Checklist"],
    ["costs", "Custos"],
    ["sale", "Venda"],
    ["files", "Fotos e Documentos"],
    ["history", "Histórico"]
  ];
  return `
    <div class="view-stack">
      <div class="toolbar">
        <button type="button" class="button secondary" data-view="cars">${i("arrow")} Voltar para carros</button>
        <button type="button" class="button" data-modal="cost" data-modal-vehicle="${vehicle.id}">${i("yen")} Adicionar custo</button>
        <button type="button" class="button secondary" data-modal="checklist" data-modal-vehicle="${vehicle.id}">${i("check")} Aplicar checklist</button>
        <button type="button" class="button secondary" data-modal="sale" data-modal-vehicle="${vehicle.id}">${i("check")} Marcar vendido</button>
      </div>
      <section class="card">
        <div class="card-header">
          <div>
            <h2>${vehicleName(vehicle)} · ${vehicle.year}</h2>
            <p class="muted">${vehicle.plate} · ${vehicle.chassis} · ${number(vehicle.mileage)} km · ${vehicle.origin}</p>
          </div>
          ${badge(vehicle.status)}
        </div>
        <div class="tabs">
          ${tabs.map(([id, label]) => `<button type="button" class="tab ${state.detailTab === id ? "is-active" : ""}" data-tab="${id}">${label}</button>`).join("")}
        </div>
        <div class="card-body">
          ${renderDetailTab(vehicle, t)}
        </div>
      </section>
    </div>
  `;
}

function renderDetailTab(vehicle, t) {
  if (state.detailTab === "checklist") return renderChecklistTab(vehicle);
  if (state.detailTab === "costs") return renderCostsTab(vehicle);
  if (state.detailTab === "sale") return renderSaleTab(vehicle);
  if (state.detailTab === "files") return renderFilesTab(vehicle);
  if (state.detailTab === "history") return renderHistoryTab(vehicle);
  return renderSummaryTab(vehicle, t);
}

function renderSummaryTab(vehicle, t) {
  const result = t.actualProfit ?? t.estimatedProfit;
  const alerts = dashboardAlerts([vehicle]);
  return `
    <div class="detail-hero">
      <div class="detail-image"><img src="${GARAGE_IMAGE}" alt="${vehicleName(vehicle)}" style="object-position:${vehicle.focus};" /></div>
      <div class="grid">
        <div class="summary-strip">
          <div class="summary-item"><span>Valor de compra</span><strong>${yen(vehicle.purchase_price)}</strong></div>
          <div class="summary-item"><span>Custos previstos</span><strong>${yen(t.totalEstimatedCosts)}</strong></div>
          <div class="summary-item"><span>Custos reais</span><strong>${yen(t.totalActualCosts)}</strong></div>
          <div class="summary-item"><span>Dias em estoque</span><strong>${daysInStock(vehicle)}</strong></div>
        </div>
        <div class="summary-strip">
          <div class="summary-item"><span>Custo total previsto</span><strong>${yen(t.estimatedTotalInvestment)}</strong></div>
          <div class="summary-item"><span>Custo total real</span><strong>${yen(t.actualTotalInvestment)}</strong></div>
          <div class="summary-item"><span>${t("minimumPrice")}</span><strong>${yen(vehicle.minimum_price)}</strong></div>
          <div class="summary-item"><span>Preço anunciado</span><strong>${yen(vehicle.advertised_price)}</strong></div>
        </div>
        <div class="summary-strip">
          <div class="summary-item"><span>Preço vendido</span><strong>${vehicle.sold_price ? yen(vehicle.sold_price) : "-"}</strong></div>
          <div class="summary-item"><span>Lucro previsto</span><strong class="${t.estimatedProfit >= 0 ? "profit" : "loss"}">${yen(t.estimatedProfit)}</strong></div>
          <div class="summary-item"><span>Lucro real</span><strong class="${(t.actualProfit ?? result) >= 0 ? "profit" : "loss"}">${t.actualProfit === null ? "-" : yen(t.actualProfit)}</strong></div>
          <div class="summary-item"><span>Margem</span><strong class="${t.marginPercentage >= 8 ? "profit" : t.marginPercentage < 0 ? "loss" : "warn"}">${pct(t.marginPercentage)}</strong></div>
        </div>
        <div class="grid">
          ${alerts.map((alert) => `<div class="alert ${alert.tone}">${alert.text}</div>`).join("") || '<div class="alert success">Lucro previsto positivo.</div>'}
          ${t.marginPercentage < 8 && t.marginPercentage >= 0 ? '<div class="alert">Este carro está abaixo da margem desejada.</div>' : ""}
        </div>
      </div>
    </div>
  `;
}

function renderChecklistTab(vehicle) {
  const rows = checklistForVehicle(vehicle.id);
  const done = rows.filter((item) => item.status === "Concluído").length;
  const progress = rows.length ? Math.round((done / rows.length) * 100) : 0;
  return `
    <div class="view-stack">
      <div class="summary-strip">
        <div class="summary-item"><span>Itens</span><strong>${rows.length}</strong></div>
        <div class="summary-item"><span>Concluídos</span><strong>${done}</strong></div>
        <div class="summary-item"><span>Progresso</span><strong>${progress}%</strong></div>
        <div class="summary-item"><span>Status</span><strong>${progress === 100 ? "Pronto" : "Em preparo"}</strong></div>
      </div>
      <div class="alert ${progress >= 70 ? "success" : ""}">Checklist ${progress}% concluído.</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Tarefa</th><th>Categoria</th><th>Status</th><th>Responsável</th><th>Prevista</th><th>Concluída</th><th>Custo</th><th>Observação</th></tr></thead>
          <tbody>
            ${rows
              .map(
                (item) => `
                  <tr>
                    <td><strong>${item.name}</strong></td>
                    <td>${item.category}</td>
                    <td>${badge(item.status)}</td>
                    <td>${userById(item.responsible_user_id).name}</td>
                    <td>${dateLabel(item.due_date)}</td>
                    <td>${dateLabel(item.completed_at)}</td>
                    <td>${yen(item.actual_value || item.estimated_value)}</td>
                    <td>${item.notes || "-"}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderCostsTab(vehicle) {
  const rows = costsForVehicle(vehicle.id);
  const t = totals(vehicle);
  return `
    <div class="view-stack">
      <div class="summary-strip">
        <div class="summary-item"><span>Total previsto</span><strong>${yen(t.totalEstimatedCosts)}</strong></div>
        <div class="summary-item"><span>Total real</span><strong>${yen(t.totalActualCosts)}</strong></div>
        <div class="summary-item"><span>Diferença</span><strong class="${t.costDelta <= 0 ? "profit" : "loss"}">${yen(t.costDelta)}</strong></div>
        <div class="summary-item"><span>Custo total real</span><strong>${yen(t.actualTotalInvestment)}</strong></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Categoria</th><th>Descrição</th><th>Valor previsto</th><th>Valor real</th><th>Diferença</th><th>Data</th><th>Responsável</th><th>Comprovante</th><th>Observação</th></tr></thead>
          <tbody>
            ${rows
              .map(
                (cost) => {
                  const delta = Number(cost.actual_value || 0) - Number(cost.estimated_value || 0);
                  return `
                    <tr>
                      <td>${cost.category}</td>
                      <td><strong>${cost.description}</strong></td>
                      <td>${yen(cost.estimated_value)}</td>
                      <td>${yen(cost.actual_value)}</td>
                      <td class="${delta <= 0 ? "profit" : "loss"}">${yen(delta)}</td>
                      <td>${dateLabel(cost.date)}</td>
                      <td>${userById(cost.created_by).name}</td>
                      <td>${cost.receipt_url ? "Anexado" : "-"}</td>
                      <td>${cost.notes || "-"}</td>
                    </tr>
                  `;
                }
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSaleTab(vehicle) {
  const t = totals(vehicle);
  const finalProfit = vehicle.sold_price ? t.actualProfit : Number(vehicle.advertised_price || 0) - t.actualTotalInvestment;
  return `
    <div class="content-grid">
      <form class="card pad grid" id="sale-form">
        <input type="hidden" name="vehicle_id" value="${vehicle.id}" />
        <h3>Dados da venda</h3>
        <div class="field-grid">
          <label class="field"><span>Preço anunciado</span><input name="advertised_price" type="number" value="${vehicle.advertised_price || 0}" /></label>
          <label class="field"><span>Preço mínimo</span><input name="minimum_price" type="number" value="${vehicle.minimum_price || 0}" /></label>
          <label class="field"><span>Preço vendido</span><input name="sold_price" type="number" value="${vehicle.sold_price || vehicle.advertised_price || 0}" /></label>
          <label class="field"><span>Data da venda</span><input name="sold_date" type="date" value="${vehicle.sold_date || "2026-07-10"}" /></label>
          <label class="field"><span>Forma de pagamento</span><select name="payment_method"><option>Transferência</option><option>Dinheiro</option><option>Cartão</option><option>Outro</option></select></label>
          <label class="field"><span>Comissão</span><input name="commission" type="number" value="35000" /></label>
          <label class="field"><span>Desconto concedido</span><input name="discount" type="number" value="0" /></label>
          <label class="field"><span>Cliente comprador (opcional)</span><input name="buyer" placeholder="Nome interno" /></label>
        </div>
        <label class="field"><span>Observações da venda</span><textarea name="notes">${vehicle.notes || ""}</textarea></label>
        <button class="button success" type="submit">${i("check")} Marcar como vendido</button>
      </form>
      <aside class="card pad grid">
        <h3>Resultado estimado</h3>
        <div class="summary-item"><span>Custo total real</span><strong>${yen(t.actualTotalInvestment)}</strong></div>
        <div class="summary-item"><span>Lucro final</span><strong class="${finalProfit >= 0 ? "profit" : "loss"}">${yen(finalProfit)}</strong></div>
        <div class="summary-item"><span>Margem percentual</span><strong class="${t.marginPercentage >= 0 ? "profit" : "loss"}">${pct(t.marginPercentage)}</strong></div>
        <div class="alert ${finalProfit >= 0 ? "success" : "danger"}">${finalProfit >= 0 ? "Resultado: lucro." : "Resultado: prejuízo."}</div>
      </aside>
    </div>
  `;
}

function renderFilesTab(vehicle) {
  return `
    <div class="view-stack">
      <div class="upload-grid">
        <div class="upload-slot">${i("camera")} Fotos externas<br><span class="small">3 arquivos</span></div>
        <div class="upload-slot">${i("camera")} Fotos internas<br><span class="small">2 arquivos</span></div>
        <div class="upload-slot">${i("alert")} Fotos de avarias<br><span class="small">1 arquivo</span></div>
        <div class="upload-slot">${i("file")} Documento shaken<br><span class="small">PDF pendente</span></div>
        <div class="upload-slot">${i("file")} Recibos<br><span class="small">2 comprovantes</span></div>
        <div class="upload-slot">${i("file")} Contratos<br><span class="small">sem arquivo</span></div>
        <div class="upload-slot">${i("upload")} Comprovantes<br><span class="small">arraste aqui</span></div>
        <div class="upload-slot">${i("upload")} Outros arquivos<br><span class="small">arraste aqui</span></div>
      </div>
      <div class="alert">Upload com preview planejado para fotos, documentos, recibos, contratos e comprovantes.</div>
    </div>
  `;
}

function renderHistoryTab(vehicle) {
  const logs = activityLogs.filter((log) => log.entity_id === vehicle.id || log.store_id === vehicle.store_id).slice(0, 8);
  return `
    <div class="timeline">
      ${logs
        .map(
          (log) => `
            <div class="timeline-item">
              <span class="timeline-dot"></span>
              <div class="timeline-content">
                <strong>${log.action}</strong>
                <p class="muted small">${userById(log.user_id).name} · ${new Date(log.created_at).toLocaleString("pt-BR")}</p>
                <p>${log.notes || "Registro automático de atividade."}</p>
                ${log.old_value || log.new_value ? `<div class="alert">Valor antigo: ${log.old_value || "-"} · Valor novo: ${log.new_value || "-"}</div>` : ""}
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderPreparation() {
  const columns = ["Entrada", "Em preparação", "Aguardando peças", "Aguardando shaken", "Pronto para venda", "Anunciado"];
  const cars = vehiclesForStore().filter(isInStock);
  return `
    <div class="view-stack">
      <div class="quick-actions">
        <button type="button" class="button" data-view="entry">${i("plus")} Novo carro</button>
        <button type="button" class="button secondary" data-modal="checklist">${i("check")} Aplicar checklist</button>
        <button type="button" class="button secondary" data-modal="cost">${i("yen")} Adicionar custo</button>
      </div>
      <div class="kanban">
        ${columns
          .map((column) => {
            const rows = cars.filter((vehicle) => vehicle.status === column);
            return `
              <section class="kanban-column">
                <div class="kanban-title"><span>${column}</span><strong>${rows.length}</strong></div>
                ${rows.map(renderPrepCard).join("") || '<div class="empty-state">Sem veículos</div>'}
              </section>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderPrepCard(vehicle) {
  const pending = checklistForVehicle(vehicle.id).filter((item) => item.status !== "Concluído").length;
  const t = totals(vehicle);
  const late = checklistForVehicle(vehicle.id).some((item) => item.status !== "Concluído" && new Date(`${item.due_date}T23:59:00+09:00`) < TODAY);
  return `
    <article class="kanban-card">
      <img src="${GARAGE_IMAGE}" alt="${vehicleName(vehicle)}" style="object-position:${vehicle.focus};" />
      <div><strong>${vehicleName(vehicle)}</strong><span class="muted small">${vehicle.plate}</span></div>
      ${badge(vehicle.status)}
      <div class="mini-stats">
        <div class="mini-stat"><span>Tarefas pendentes</span><strong>${pending}</strong></div>
        <div class="mini-stat"><span>Custos reais</span><strong>${yen(t.totalActualCosts)}</strong></div>
      </div>
      ${late ? '<div class="alert">Alerta: passou da previsão.</div>' : ""}
      <button type="button" class="button secondary small-btn" data-vehicle="${vehicle.id}">Abrir</button>
    </article>
  `;
}

function renderCostsPage() {
  const rows = vehicleCosts.filter((cost) => cost.store_id === state.selectedStoreId);
  const totalEstimated = rows.reduce((sum, cost) => sum + cost.estimated_value, 0);
  const totalActual = rows.reduce((sum, cost) => sum + cost.actual_value, 0);
  const byCategory = Object.entries(
    rows.reduce((acc, cost) => {
      acc[cost.category] = (acc[cost.category] || 0) + cost.actual_value;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  return `
    <div class="view-stack">
      <div class="summary-strip">
        <div class="summary-item"><span>Total previsto</span><strong>${yen(totalEstimated)}</strong></div>
        <div class="summary-item"><span>Total real</span><strong>${yen(totalActual)}</strong></div>
        <div class="summary-item"><span>Diferença</span><strong class="${totalActual - totalEstimated <= 0 ? "profit" : "loss"}">${yen(totalActual - totalEstimated)}</strong></div>
        <div class="summary-item"><span>Categorias</span><strong>${byCategory.length}</strong></div>
      </div>
      <div class="content-grid">
        <section class="card">
          <div class="card-header"><h2>Custos por veículo</h2><button type="button" class="button small-btn" data-modal="cost">${i("plus")} Adicionar</button></div>
          <div class="card-body table-wrap">
            <table>
              <thead><tr><th>Carro</th><th>Categoria</th><th>Descrição</th><th>Previsto</th><th>Real</th><th>Diferença</th><th>Data</th></tr></thead>
              <tbody>
                ${rows
                  .map((cost) => {
                    const vehicle = vehicleById(cost.vehicle_id);
                    const delta = cost.actual_value - cost.estimated_value;
                    return `<tr><td>${vehicleName(vehicle)}</td><td>${cost.category}</td><td>${cost.description}</td><td>${yen(cost.estimated_value)}</td><td>${yen(cost.actual_value)}</td><td class="${delta <= 0 ? "profit" : "loss"}">${yen(delta)}</td><td>${dateLabel(cost.date)}</td></tr>`;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        </section>
        <section class="card">
          <div class="card-header"><h2>Custos por categoria</h2></div>
          <div class="card-body chart">
            ${byCategory.map(([category, value]) => chartRow(category, value, Math.max(...byCategory.map((row) => row[1])) || 1, value > 50000 ? "warning" : "success")).join("")}
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderSalesPage() {
  const rows = vehiclesForStore().filter((vehicle) => vehicle.sold_price);
  return `
    <div class="view-stack">
      <div class="summary-strip">
        <div class="summary-item"><span>Carros vendidos</span><strong>${rows.length}</strong></div>
        <div class="summary-item"><span>Receita de venda</span><strong>${yen(rows.reduce((sum, vehicle) => sum + vehicle.sold_price, 0))}</strong></div>
        <div class="summary-item"><span>Lucro real</span><strong class="profit">${yen(rows.reduce((sum, vehicle) => sum + (totals(vehicle).actualProfit || 0), 0))}</strong></div>
        <div class="summary-item"><span>Margem média</span><strong>${pct(rows.reduce((sum, vehicle) => sum + totals(vehicle).marginPercentage, 0) / Math.max(rows.length, 1))}</strong></div>
      </div>
      <section class="card">
        <div class="card-header"><h2>Vendas concluídas</h2><button type="button" class="button secondary small-btn" data-export="sales">${i("file")} Exportar</button></div>
        <div class="card-body table-wrap">
          <table>
            <thead><tr><th>Carro</th><th>Data</th><th>Preço vendido</th><th>Custo real</th><th>Lucro real</th><th>Margem</th><th>Forma</th><th>Comissão</th><th>Status financeiro</th></tr></thead>
            <tbody>
              ${rows
                .map((vehicle) => {
                  const t = totals(vehicle);
                  return `<tr><td><strong>${vehicleName(vehicle)}</strong></td><td>${dateLabel(vehicle.sold_date)}</td><td>${yen(vehicle.sold_price)}</td><td>${yen(t.actualTotalInvestment)}</td><td class="${t.actualProfit >= 0 ? "profit" : "loss"}">${yen(t.actualProfit)}</td><td>${pct(t.marginPercentage)}</td><td>Transferência</td><td>${yen(35000)}</td><td>${badge(t.actualProfit >= 0 ? "Pago" : "Revisar")}</td></tr>`;
                })
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderReportsPage() {
  const cars = vehiclesForStore();
  const active = cars.filter(isInStock);
  const lossCars = cars.filter((vehicle) => (totals(vehicle).actualProfit ?? totals(vehicle).estimatedProfit) < 0);
  return `
    <div class="view-stack">
      <div class="quick-actions">
        <button type="button" class="button" data-export="pdf">${i("file")} Exportar PDF</button>
        <button type="button" class="button secondary" data-export="excel">${i("file")} Exportar Excel</button>
      </div>
      <div class="metric-grid">
        ${kpi("Lucro por carro", yen(cars.reduce((sum, vehicle) => sum + (totals(vehicle).actualProfit ?? totals(vehicle).estimatedProfit), 0)), "Somatório dos carros", "chart")}
        ${kpi("Carros vendidos no mês", cars.filter((vehicle) => vehicle.sold_date?.startsWith("2026-07")).length, "Julho de 2026", "check")}
        ${kpi("Carros parados", active.filter((vehicle) => daysInStock(vehicle) > 60).length, "Mais de 60 dias", "alert", "warning")}
        ${kpi("Estoque atual", yen(active.reduce((sum, vehicle) => sum + totals(vehicle).actualTotalInvestment, 0)), "Valor investido", "yen")}
      </div>
      <div class="two-col">
        <section class="card">
          <div class="card-header"><h2>Diferença previsto x real</h2></div>
          <div class="card-body chart">
            ${cars.map((vehicle) => chartRow(vehicleName(vehicle), Math.abs(totals(vehicle).costDelta), 70000, totals(vehicle).costDelta > 0 ? "danger" : "success")).join("")}
          </div>
        </section>
        <section class="card">
          <div class="card-header"><h2>Ranking de prejuízo</h2></div>
          <div class="card-body list">
            ${lossCars.map((vehicle) => `<div class="list-row"><div><strong>${vehicleName(vehicle)}</strong><span class="muted small">${vehicle.plate}</span></div><strong class="loss">${yen(totals(vehicle).actualProfit ?? totals(vehicle).estimatedProfit)}</strong></div>`).join("") || '<div class="empty-state">Nenhum prejuízo no período.</div>'}
          </div>
        </section>
      </div>
      <section class="card">
        <div class="card-header"><h2>Relatórios disponíveis</h2></div>
        <div class="card-body three-col">
          ${["Lucro mensal", "Lucro por carro", "Carros vendidos no mês", "Carros parados", "Custos por categoria", "Estoque atual", "Valor investido em estoque", "Ranking mais lucrativos", "Ranking com prejuízo"].map((name) => `<button type="button" class="button secondary" data-export="${name}">${i("file")} ${name}</button>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderSettingsPage() {
  return `
    <div class="view-stack">
      <div class="two-col">
        <section class="card">
          <div class="card-header"><h2>Tabela de custos padrão</h2><button type="button" class="button small-btn">${i("plus")} Novo item</button></div>
          <div class="card-body table-wrap">
            <table>
              <thead><tr><th>Nome</th><th>Categoria</th><th>Valor médio</th><th>Status</th><th>Observação</th></tr></thead>
              <tbody>${costPresets.map((preset) => `<tr><td><strong>${preset.name}</strong></td><td>${preset.category}</td><td>${yen(preset.average_value)}</td><td>${badge(preset.active ? "Ativo" : "Inativo")}</td><td>${preset.notes || "-"}</td></tr>`).join("")}</tbody>
            </table>
          </div>
        </section>
        <section class="card">
          <div class="card-header"><h2>Pneus</h2><button type="button" class="button small-btn">${i("plus")} Novo pneu</button></div>
          <div class="card-body table-wrap">
            <table>
              <thead><tr><th>Medida</th><th>Marca</th><th>Tipo</th><th>Valor jogo</th><th>Observação</th></tr></thead>
              <tbody>${tirePresets.map((tire) => `<tr><td><strong>${tire.size}</strong></td><td>${tire.brand}</td><td>${tire.type}</td><td>${yen(tire.average_value)}</td><td>${tire.notes || "-"}</td></tr>`).join("")}</tbody>
            </table>
          </div>
        </section>
      </div>
      <section class="card">
        <div class="card-header"><h2>Modelos de checklist</h2><button type="button" class="button small-btn">${i("plus")} Novo modelo</button></div>
        <div class="card-body three-col">
          ${checklistTemplates.map((tpl) => `<article class="card pad"><h3>${tpl.name}</h3><p class="muted">${tpl.description}</p><ul class="feature-list">${tpl.items.map((item) => `<li>${item}</li>`).join("")}</ul><button type="button" class="button secondary" data-modal="checklist">${i("check")} Aplicar em carro</button></article>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderPremiumRequestPage() {
  const rows = premiumRequests.filter((request) => request.store_id === state.selectedStoreId);
  return `
    <div class="content-grid">
      <section class="card">
        <div class="card-header"><h2>Solicitar cadastro de carro</h2>${badge(storeById().premium_entry_enabled ? "Premium habilitado" : "Plano sem premium")}</div>
        <div class="card-body">
          <form id="premium-request-form" class="grid">
            <div class="field-grid">
              <label class="field"><span>Loja / Store ID automático</span><input value="${storeById().store_code}" disabled /></label>
              <label class="field"><span>Nome do carro</span><input name="vehicle_name" required placeholder="Toyota Vitz F" /></label>
              <label class="field"><span>Marca</span><input name="brand" required placeholder="Toyota" /></label>
              <label class="field"><span>Modelo</span><input name="model" required placeholder="Vitz F" /></label>
              <label class="field"><span>Ano</span><input name="year" type="number" value="2019" required /></label>
              <label class="field"><span>Quilometragem</span><input name="mileage" type="number" value="54000" required /></label>
              <label class="field"><span>Valor de compra</span><input name="purchase_price" type="number" value="610000" required /></label>
              <label class="field"><span>Origem</span><select name="origin"><option>Leilão</option><option>Compra direta</option><option>Troca</option><option>Consignado</option></select></label>
              <label class="field"><span>Shaken</span><input name="shaken_info" placeholder="Válido até 2027/02" /></label>
              <label class="field"><span>Prioridade</span><select name="priority"><option>Normal</option><option>Alta</option><option>Baixa</option></select></label>
            </div>
            <div class="upload-grid"><div class="upload-slot">${i("camera")} Fotos</div><div class="upload-slot">${i("file")} Documentos</div><div class="upload-slot">${i("upload")} Comprovantes</div><div class="upload-slot">${i("alert")} Avarias</div></div>
            <label class="field"><span>Observações</span><textarea name="notes" placeholder="Dados faltantes, avarias, pedidos para a OKH..."></textarea></label>
            <button class="button" type="submit">${i("upload")} Enviar para a OKH</button>
          </form>
        </div>
      </section>
      <aside class="card">
        <div class="card-header"><h2>Minhas solicitações</h2></div>
        <div class="card-body list">
          ${rows.map(renderRequestListRow).join("") || '<div class="empty-state">Nenhuma solicitação enviada.</div>'}
        </div>
      </aside>
    </div>
  `;
}

function renderRequestListRow(request) {
  return `
    <div class="list-row">
      <div>
        <strong>${request.vehicle_name}</strong>
        <span class="muted small">${request.brand} ${request.model} · ${request.priority}</span>
      </div>
      ${badge(request.status)}
    </div>
  `;
}

function renderAdminDashboard() {
  const activeStores = stores.filter((store) => store.status === "Ativa" || store.status === "Teste grátis");
  const blockedStores = stores.filter((store) => store.status === "Bloqueada" || store.status === "Inadimplente");
  const monthly = stores.reduce((sum, store) => sum + store.monthly_revenue, 0);
  const monthCars = stores.reduce((sum, store) => sum + store.cars_this_month, 0);
  const pendingPremium = premiumRequests.filter((request) => !["Publicado", "Cancelado"].includes(request.status)).length;
  return `
    <div class="view-stack">
      <div class="metric-grid admin">
        ${kpi("Lojas ativas", activeStores.length, "Inclui teste grátis", "store", "success")}
        ${kpi("Lojas bloqueadas", blockedStores.length, "Inadimplentes ou bloqueadas", "alert", blockedStores.length ? "danger" : "")}
        ${kpi("Planos Starter", stores.filter((store) => store.plan === "Starter").length, "Carteira atual", "file")}
        ${kpi("Planos Pro", stores.filter((store) => store.plan === "Pro").length, "Carteira atual", "file")}
        ${kpi("Planos Premium", stores.filter((store) => store.plan.includes("Premium")).length, "Operacional", "shield", "warning")}
        ${kpi("Receita mensal", yen(monthly), "MRR estimado", "yen", "success")}
        ${kpi("Carros no mês", monthCars, "Cadastrados em julho", "car")}
        ${kpi("Premium pendentes", pendingPremium, "Solicitações abertas", "upload", pendingPremium ? "warning" : "")}
        ${kpi("Assistidos concluídos", premiumRequests.filter((r) => r.status === "Publicado").length, "Publicados no painel", "check", "success")}
        ${kpi("Por operador OKH", "Ana: 14", "Cadastros assistidos", "users")}
      </div>
      <div class="content-grid">
        <section class="card">
          <div class="card-header"><h2>Lojas e receita</h2><button type="button" class="button small-btn" data-view="stores">Abrir lojas</button></div>
          <div class="card-body table-wrap">
            <table>
              <thead><tr><th>Loja</th><th>Plano</th><th>Status</th><th>Carros ativos</th><th>Carros no mês</th><th>Receita</th></tr></thead>
              <tbody>${stores.map((store) => `<tr><td><strong>${store.name}</strong><br><span class="muted">${store.store_code}</span></td><td>${store.plan}</td><td>${badge(store.status)}</td><td>${store.active_cars_month}</td><td>${store.cars_this_month}</td><td>${yen(store.monthly_revenue)}</td></tr>`).join("")}</tbody>
            </table>
          </div>
        </section>
        <section class="card">
          <div class="card-header"><h2>Solicitações premium</h2><button type="button" class="button secondary small-btn" data-view="adminPremium">Kanban</button></div>
          <div class="card-body list">${premiumRequests.slice(0, 5).map(renderAdminRequestRow).join("")}</div>
        </section>
      </div>
    </div>
  `;
}

function renderStoresAdmin() {
  return `
    <div class="view-stack">
      <div class="quick-actions">
        <button type="button" class="button" data-view="storeCreate">${i("plus")} Criar loja</button>
        <button type="button" class="button secondary" data-view="assisted">${i("car")} Cadastrar carro para loja</button>
      </div>
      <section class="card">
        <div class="card-header"><h2>Lista de lojas</h2><span class="muted small">Uma loja não vê dados de outra loja</span></div>
        <div class="card-body table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Loja</th><th>Responsável</th><th>Contato</th><th>Plano</th><th>Status</th><th>Carros ativos</th><th>Carros mês</th><th>Receita</th><th>Último acesso</th><th>Ações</th></tr></thead>
            <tbody>
              ${stores
                .map(
                  (store) => `
                    <tr>
                      <td><strong>${store.store_code}</strong></td>
                      <td>${store.name}</td>
                      <td>${store.owner_name}</td>
                      <td>${store.phone}<br><span class="muted">${store.email}</span></td>
                      <td>${store.plan}</td>
                      <td>${badge(store.status)}</td>
                      <td>${store.active_cars_month}</td>
                      <td>${store.cars_this_month}</td>
                      <td>${yen(store.monthly_revenue)}</td>
                      <td>${store.last_access}</td>
                      <td>
                        <div class="toolbar">
                          <button type="button" class="button secondary small-btn" data-enter-store="${store.id}">Entrar</button>
                          <button type="button" class="button secondary small-btn" data-assisted-store="${store.id}">Cadastrar</button>
                          <button type="button" class="button secondary small-btn" data-toggle-block="${store.id}">Bloquear</button>
                          <button type="button" class="button secondary small-btn" data-view="plans">Plano</button>
                        </div>
                      </td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderStoreCreateAdmin() {
  const code = `OKH-${String(stores.length + 1).padStart(3, "0")}-${Math.floor(100 + Math.random() * 899)}`;
  return `
    <div class="content-grid">
      <section class="card">
        <div class="card-header"><h2>Criar loja</h2>${badge(code)}</div>
        <div class="card-body">
          <form id="admin-store-form" class="grid">
            <div class="field-grid">
              <label class="field"><span>Nome da loja</span><input name="name" required placeholder="Tokyo Compact Motors" /></label>
              <label class="field"><span>ID automático da loja</span><input name="store_code" value="${code}" readonly /></label>
              <label class="field"><span>Nome do responsável</span><input name="owner_name" required placeholder="Nome completo" /></label>
              <label class="field"><span>Email</span><input name="email" type="email" required placeholder="loja@email.jp" /></label>
              <label class="field"><span>Telefone</span><input name="phone" required placeholder="+81..." /></label>
              <label class="field"><span>Endereço</span><input name="address" placeholder="Cidade, província" /></label>
              <label class="field"><span>Plano</span><select name="plan"><option>Starter</option><option>Pro</option><option>Premium Operacional</option></select></label>
              <label class="field"><span>Limite de carros</span><input name="car_limit" value="20" /></label>
              <label class="field"><span>Permitir cadastro assistido</span><select name="premium_entry_enabled"><option value="true">Sim</option><option value="false">Não</option></select></label>
              <label class="field"><span>Criar usuário dono</span><select name="create_owner"><option>Sim</option><option>Não</option></select></label>
            </div>
            <button class="button" type="submit">${i("store")} Criar loja</button>
          </form>
        </div>
      </section>
      <aside class="card pad grid">
        <h3>Regras de segurança</h3>
        ${["Cada loja acessa apenas dados do próprio store_id.", "Admin OKH acessa todas as lojas.", "Operador OKH acessa funções operacionais.", "Dados importantes são arquivados, não excluídos definitivamente.", "Alteração financeira gera activity_logs."].map((text) => `<div class="alert success">${text}</div>`).join("")}
      </aside>
    </div>
  `;
}

function renderPlansPage() {
  return `
    <div class="view-stack">
      <div class="plan-grid">
        ${plans
          .map(
            (plan) => `
              <article class="card plan-card">
                <div>
                  <h2>${plan.name}</h2>
                  <div class="price">${yen(plan.price)}</div>
                  <p class="muted">${plan.range}</p>
                </div>
                <ul class="feature-list">${plan.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
                <button type="button" class="button secondary">Editar plano</button>
              </article>
            `
          )
          .join("")}
      </div>
      <section class="card pad">
        <h2>Carro adicional no Premium</h2>
        <p class="muted">Quando uma loja Premium ultrapassa o limite mensal contratado, cobrar de ¥1.000 a ¥2.000 por carro cadastrado pela OKH. O valor pode ser definido por contrato, volume e complexidade da preparação.</p>
        <div class="summary-strip">
          <div class="summary-item"><span>Base sugerida</span><strong>¥1.000</strong></div>
          <div class="summary-item"><span>Operação padrão</span><strong>¥1.500</strong></div>
          <div class="summary-item"><span>Cadastro complexo</span><strong>¥2.000</strong></div>
          <div class="summary-item"><span>Limite Osaka</span><strong>45/mês</strong></div>
        </div>
      </section>
    </div>
  `;
}

function renderUsersPage() {
  const headers = ["Permissão", "Admin", "Operador", "Dono", "Funcionário", "Leitura"];
  const rows = [
    ["Ver todas as lojas", true, false, false, false, false],
    ["Alterar planos", true, false, false, false, false],
    ["Controlar pagamentos", true, false, false, false, false],
    ["Cadastrar carro para loja", true, true, false, false, false],
    ["Gerenciar funcionários", false, false, true, false, false],
    ["Editar custos", true, true, true, true, false],
    ["Ver relatórios", true, true, true, true, true],
    ["Ver dados financeiros sensíveis", true, true, true, false, false]
  ];
  return `
    <div class="view-stack">
      <section class="card">
        <div class="card-header"><h2>Usuários</h2><button type="button" class="button small-btn">${i("plus")} Criar usuário</button></div>
        <div class="card-body table-wrap">
          <table>
            <thead><tr><th>Nome</th><th>Email</th><th>Loja</th><th>Perfil</th><th>Status</th><th>Criado em</th></tr></thead>
            <tbody>${users.map((user) => `<tr><td><strong>${user.name}</strong></td><td>${user.email}</td><td>${user.store_id ? storeById(user.store_id).store_code : "OKH Admin"}</td><td>${user.role}</td><td>${badge(user.status)}</td><td>${dateLabel(user.created_at)}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>
      <section class="card pad">
        <h2>Matriz de permissões</h2>
        <div class="permission-matrix" style="margin-top:14px;">
          ${headers.map((header) => `<div>${header}</div>`).join("")}
          ${rows.map((row) => `<div>${row[0]}</div>${row.slice(1).map((ok) => `<div class="${ok ? "check" : "dash"}">${ok ? "Sim" : "-"}</div>`).join("")}`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderAdminPremiumRequests() {
  const columns = ["Recebido", "Em análise", "Faltando informação", "Cadastrando", "Publicado"];
  return `
    <div class="view-stack">
      <div class="quick-actions">
        <button type="button" class="button" data-view="assisted">${i("plus")} Criar cadastro do carro</button>
        <button type="button" class="button secondary" data-export="premium">${i("file")} Relatório premium</button>
      </div>
      <div class="kanban requests">
        ${columns
          .map((column) => {
            const rows = premiumRequests.filter((request) => request.status === column);
            return `
              <section class="kanban-column">
                <div class="kanban-title"><span>${column}</span><strong>${rows.length}</strong></div>
                ${rows.map(renderPremiumKanbanCard).join("") || '<div class="empty-state">Sem solicitações</div>'}
              </section>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderPremiumKanbanCard(request) {
  const store = storeById(request.store_id);
  return `
    <article class="kanban-card">
      <div>
        <strong>${request.vehicle_name}</strong>
        <span class="muted small">${store.store_code} · ${store.name}</span>
      </div>
      ${badge(request.priority)}
      <div class="mini-stats">
        <div class="mini-stat"><span>Ano</span><strong>${request.year}</strong></div>
        <div class="mini-stat"><span>Compra</span><strong>${yen(request.purchase_price)}</strong></div>
      </div>
      <p class="muted small">${request.notes}</p>
      <div class="toolbar">
        <button type="button" class="button secondary small-btn" data-modal="requestInfo" data-request="${request.id}">Pedir info</button>
        <button type="button" class="button small-btn" data-publish-request="${request.id}">Publicar</button>
      </div>
    </article>
  `;
}

function renderAdminRequestRow(request) {
  const store = storeById(request.store_id);
  return `
    <div class="list-row">
      <div>
        <strong>${request.vehicle_name}</strong>
        <span class="muted small">${store.store_code} · ${request.priority}</span>
      </div>
      ${badge(request.status)}
    </div>
  `;
}

function renderAssistedEntries() {
  return `
    <div class="content-grid">
      <section class="card">
        <div class="card-header"><h2>Cadastro assistido pelo Admin</h2><span class="muted small">Publica no painel da loja pelo store_id</span></div>
        <div class="card-body">
          <form id="assisted-form" class="grid">
            <div class="field-grid">
              <label class="field"><span>Loja / Store ID</span><select name="store_id">${stores.map((store) => `<option value="${store.id}" ${store.id === state.selectedStoreId ? "selected" : ""}>${store.store_code} - ${store.name}</option>`).join("")}</select></label>
              <label class="field"><span>Checklist</span><select name="template_id">${checklistTemplates.map((tpl) => `<option value="${tpl.id}">${tpl.name}</option>`).join("")}</select></label>
              <label class="field"><span>Marca</span><input name="brand" required value="Toyota" /></label>
              <label class="field"><span>Modelo</span><input name="model" required value="Vitz F" /></label>
              <label class="field"><span>Ano</span><input name="year" type="number" required value="2019" /></label>
              <label class="field"><span>Placa</span><input name="plate" required value="OKH 10-24" /></label>
              <label class="field"><span>Chassi</span><input name="chassis" required value="NSP130-000000" /></label>
              <label class="field"><span>Quilometragem</span><input name="mileage" type="number" required value="54400" /></label>
              <label class="field"><span>Origem</span><select name="origin"><option>Leilão</option><option>Compra direta</option><option>Troca</option></select></label>
              <label class="field"><span>Valor de compra</span><input name="purchase_price" type="number" required value="610000" /></label>
              <label class="field"><span>Preço anunciado</span><input name="advertised_price" type="number" value="850000" /></label>
              <label class="field"><span>Preço mínimo</span><input name="minimum_price" type="number" value="790000" /></label>
            </div>
            <label class="field"><span>Observações internas</span><textarea name="notes">Cadastro assistido pela OKH a partir de solicitação premium.</textarea></label>
            <button class="button" type="submit">${i("upload")} Publicar no painel da loja</button>
          </form>
        </div>
      </section>
      <aside class="card">
        <div class="card-header"><h2>Fila assistida</h2></div>
        <div class="card-body list">${premiumRequests.filter((request) => request.status !== "Publicado").map(renderAdminRequestRow).join("")}</div>
      </aside>
    </div>
  `;
}

function renderCarsByStore() {
  return `
    <div class="view-stack">
      ${stores
        .map((store) => {
          const rows = vehicles.filter((vehicle) => vehicle.store_id === store.id);
          return `
            <section class="card">
              <div class="card-header">
                <div><h2>${store.name}</h2><p class="muted">${store.store_code} · ${store.plan}</p></div>
                ${badge(store.status)}
              </div>
              <div class="card-body table-wrap">
                <table>
                  <thead><tr><th>Carro</th><th>Status</th><th>Compra</th><th>Custo real</th><th>Anunciado</th><th>Resultado</th><th>Dias</th></tr></thead>
                  <tbody>${rows.map((vehicle) => {
                    const t = totals(vehicle);
                    const result = t.actualProfit ?? t.estimatedProfit;
                    return `<tr><td><strong>${vehicleName(vehicle)}</strong><br><span class="muted">${vehicle.plate}</span></td><td>${badge(vehicle.status)}</td><td>${yen(vehicle.purchase_price)}</td><td>${yen(t.totalActualCosts)}</td><td>${yen(vehicle.advertised_price)}</td><td class="${result >= 0 ? "profit" : "loss"}">${yen(result)}</td><td>${daysInStock(vehicle)}</td></tr>`;
                  }).join("")}</tbody>
                </table>
              </div>
            </section>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderPayments() {
  return `
    <div class="view-stack">
      <div class="metric-grid">
        ${kpi("MRR estimado", yen(stores.reduce((sum, store) => sum + store.monthly_revenue, 0)), "Planos atuais", "yen", "success")}
        ${kpi("Inadimplentes", stores.filter((store) => store.status === "Inadimplente").length, "Podem ser bloqueadas", "alert", "danger")}
        ${kpi("Teste grátis", stores.filter((store) => store.status === "Teste grátis").length, "Acompanhar conversão", "store")}
        ${kpi("Carros extras", yen(12000), "Cobrança Premium", "car")}
      </div>
      <section class="card">
        <div class="card-header"><h2>Controle de pagamentos</h2></div>
        <div class="card-body table-wrap">
          <table>
            <thead><tr><th>Loja</th><th>Plano</th><th>Mensalidade</th><th>Status</th><th>Vencimento</th><th>Ação</th></tr></thead>
            <tbody>${stores.map((store, index) => `<tr><td><strong>${store.name}</strong><br><span class="muted">${store.store_code}</span></td><td>${store.plan}</td><td>${yen(store.monthly_revenue)}</td><td>${badge(store.status === "Inadimplente" ? "Inadimplente" : "Pago")}</td><td>${dateLabel(`2026-07-${String(10 + index * 4).padStart(2, "0")}`)}</td><td><button type="button" class="button secondary small-btn" data-toggle-block="${store.id}">Bloquear loja</button></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderGlobalReports() {
  const totalCars = vehicles.length;
  const sold = vehicles.filter((vehicle) => vehicle.sold_price).length;
  const totalProfit = vehicles.reduce((sum, vehicle) => sum + (totals(vehicle).actualProfit ?? totals(vehicle).estimatedProfit), 0);
  return `
    <div class="view-stack">
      <div class="quick-actions">
        <button type="button" class="button" data-export="global-pdf">${i("file")} Exportar PDF</button>
        <button type="button" class="button secondary" data-export="global-excel">${i("file")} Exportar Excel</button>
      </div>
      <div class="metric-grid">
        ${kpi("Total de lojas", stores.length, "Carteira OKH", "store")}
        ${kpi("Carros cadastrados", totalCars, "Todas as lojas", "car")}
        ${kpi("Vendidos", sold, "Todas as lojas", "check", "success")}
        ${kpi("Lucro mapeado", yen(totalProfit), "Previsto + real", "chart", totalProfit >= 0 ? "success" : "danger")}
      </div>
      <div class="two-col">
        <section class="card">
          <div class="card-header"><h2>Carros cadastrados por mês</h2></div>
          <div class="card-body chart">${[["Mar", 12], ["Abr", 18], ["Mai", 24], ["Jun", 31], ["Jul", 25]].map(([label, value]) => chartRow(label, value, 31, "success", "carros")).join("")}</div>
        </section>
        <section class="card">
          <div class="card-header"><h2>Receita mensal recorrente</h2></div>
          <div class="card-body chart">${stores.map((store) => chartRow(store.name, store.monthly_revenue, 39800, store.plan.includes("Premium") ? "warning" : "success")).join("")}</div>
        </section>
      </div>
    </div>
  `;
}

function renderAdminSettings() {
  return `
    <div class="view-stack">
      <div class="two-col">
        <section class="card pad">
          <h2>Segurança multi-tenant</h2>
          <div class="grid" style="margin-top:14px;">
            <div class="alert success">Todas as entidades principais carregam store_id.</div>
            <div class="alert success">Admin OKH vê todas as lojas; painel da loja filtra pelo store_id selecionado.</div>
            <div class="alert">Funcionário pode ter finanças sensíveis ocultas por configuração do dono.</div>
            <div class="alert danger">Exclusão definitiva de dados importantes deve ser bloqueada; usar arquivamento.</div>
          </div>
        </section>
        <section class="card">
          <div class="card-header"><h2>Logs de atividade</h2></div>
          <div class="card-body timeline">
            ${activityLogs.map((log) => `<div class="timeline-item"><span class="timeline-dot"></span><div class="timeline-content"><strong>${log.action}</strong><p class="muted small">${storeById(log.store_id).store_code} · ${userById(log.user_id).name} · ${new Date(log.created_at).toLocaleString("pt-BR")}</p><p>${log.notes}</p></div></div>`).join("")}
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderModal() {
  if (!state.modal) return "";
  const { type, vehicleId, requestId } = state.modal;
  if (type === "cost") return modalShell("Adicionar custo", renderCostModal(vehicleId));
  if (type === "checklist") return modalShell("Aplicar checklist", renderChecklistModal(vehicleId));
  if (type === "sale") return modalShell("Marcar como vendido", renderSaleModal(vehicleId));
  if (type === "requestInfo") return modalShell("Pedir informação faltando", renderRequestInfoModal(requestId));
  return "";
}

function modalShell(title, body) {
  return `
    <div class="modal-backdrop" data-close-modal>
      <section class="modal" role="dialog" aria-modal="true" aria-label="${title}" data-modal-box>
        <div class="modal-header">
          <h2>${title}</h2>
          <button type="button" class="icon-button" data-close-modal aria-label="Fechar">${i("x")}</button>
        </div>
        <div class="modal-body">${body}</div>
      </section>
    </div>
  `;
}

function renderCostModal(vehicleId = state.selectedVehicleId) {
  const selected = vehicleById(vehicleId);
  const rows = vehiclesForStore();
  return `
    <form id="quick-cost-form" class="grid">
      <label class="field"><span>Veículo</span><select name="vehicle_id">${rows.map((vehicle) => `<option value="${vehicle.id}" ${vehicle.id === selected.id ? "selected" : ""}>${vehicleName(vehicle)} · ${vehicle.plate}</option>`).join("")}</select></label>
      <div class="field-grid">
        <label class="field"><span>Categoria</span><select name="category"><option>Compra</option><option>Shaken</option><option>Óleo</option><option>Filtro</option><option>Pneus</option><option>Bateria</option><option>Freios</option><option>Pintura</option><option>Polimento</option><option>Higienização</option><option>Transporte</option><option>Leilão</option><option>Documento</option><option>Taxas</option><option>Peças</option><option>Mão de obra</option><option>Comissão</option><option>Outros</option></select></label>
        <label class="field"><span>Descrição</span><input name="description" required placeholder="Óleo + filtro" /></label>
        <label class="field"><span>Valor previsto</span><input name="estimated_value" type="number" value="8000" required /></label>
        <label class="field"><span>Valor real</span><input name="actual_value" type="number" value="9000" required /></label>
        <label class="field"><span>Data</span><input name="date" type="date" value="2026-07-10" /></label>
        <label class="field"><span>Responsável</span><select name="created_by">${users.filter((user) => !user.store_id || user.store_id === state.selectedStoreId).map((user) => `<option value="${user.id}">${user.name}</option>`).join("")}</select></label>
      </div>
      <label class="field"><span>Observação</span><textarea name="notes" placeholder="Motivo da alteração, comprovante ou detalhe financeiro"></textarea></label>
      <button class="button" type="submit">${i("yen")} Salvar custo</button>
    </form>
  `;
}

function renderChecklistModal(vehicleId = state.selectedVehicleId) {
  return `
    <form id="quick-checklist-form" class="grid">
      <label class="field"><span>Veículo</span><select name="vehicle_id">${vehiclesForStore().map((vehicle) => `<option value="${vehicle.id}" ${vehicle.id === vehicleId ? "selected" : ""}>${vehicleName(vehicle)} · ${vehicle.plate}</option>`).join("")}</select></label>
      <label class="field"><span>Modelo</span><select name="template_id">${checklistTemplates.map((tpl) => `<option value="${tpl.id}">${tpl.name}</option>`).join("")}</select></label>
      <div class="alert">Ao aplicar, o sistema cria tarefas pendentes, custos previstos vinculados e sugere preço mínimo com base na margem desejada.</div>
      <button class="button" type="submit">${i("check")} Aplicar checklist</button>
    </form>
  `;
}

function renderSaleModal(vehicleId = state.selectedVehicleId) {
  const vehicle = vehicleById(vehicleId);
  return `
    <form id="quick-sale-form" class="grid">
      <input type="hidden" name="vehicle_id" value="${vehicle.id}" />
      <div class="field-grid">
        <label class="field"><span>Veículo</span><input value="${vehicleName(vehicle)}" disabled /></label>
        <label class="field"><span>Preço vendido</span><input name="sold_price" type="number" value="${vehicle.advertised_price}" required /></label>
        <label class="field"><span>Data da venda</span><input name="sold_date" type="date" value="2026-07-10" required /></label>
        <label class="field"><span>Comissão</span><input name="commission" type="number" value="35000" /></label>
      </div>
      <button class="button success" type="submit">${i("check")} Confirmar venda</button>
    </form>
  `;
}

function renderRequestInfoModal(requestId) {
  const request = premiumRequests.find((row) => row.id === requestId) || premiumRequests[0];
  return `
    <form id="request-info-form" class="grid">
      <input type="hidden" name="request_id" value="${request.id}" />
      <p><strong>${request.vehicle_name}</strong><br><span class="muted">${storeById(request.store_id).store_code}</span></p>
      <label class="field"><span>Mensagem para a loja</span><textarea name="message">Falta chassi, fotos internas e documento do shaken.</textarea></label>
      <button class="button" type="submit">${i("upload")} Marcar como faltando informação</button>
    </form>
  `;
}

function createVehicleFromForm(form, storeId = state.selectedStoreId, assisted = false) {
  const fd = new FormData(form);
  const id = `veh-${Date.now()}`;
  const template = checklistTemplates.find((tpl) => tpl.id === fd.get("template_id")) || checklistTemplates[0];
  const purchase = Number(fd.get("purchase_price") || 0);
  const advertised = Number(fd.get("advertised_price") || Math.round(purchase * 1.25));
  const vehicle = {
    id,
    store_id: fd.get("store_id") || storeId,
    brand: escapeHtml(fd.get("brand")),
    model: escapeHtml(fd.get("model")),
    year: Number(fd.get("year")),
    plate: escapeHtml(fd.get("plate")),
    chassis: escapeHtml(fd.get("chassis")),
    mileage: Number(fd.get("mileage")),
    color: escapeHtml(fd.get("color") || "Branco"),
    origin: fd.get("origin") || "Leilão",
    purchase_price: purchase,
    entry_date: fd.get("entry_date") || "2026-07-10",
    status: fd.get("status") || (assisted ? "Pronto para venda" : "Entrada"),
    advertised_price: advertised,
    minimum_price: Number(fd.get("minimum_price") || Math.round(advertised * 0.92)),
    sold_price: null,
    sold_date: null,
    notes: escapeHtml(fd.get("notes") || ""),
    created_by: assisted ? "usr-2" : "usr-3",
    created_at: TODAY.toISOString(),
    focus: "center"
  };
  vehicles.unshift(vehicle);
  template.items.slice(0, 6).forEach((name, index) => {
    const preset = costPresets.find((cost) => clean(name).includes(clean(cost.name).split(" ")[0]));
    checklistItems.push({
      id: `ck-${Date.now()}-${index}`,
      store_id: vehicle.store_id,
      vehicle_id: vehicle.id,
      name,
      category: preset?.category || "Preparação",
      status: "Pendente",
      estimated_value: preset?.average_value || 0,
      actual_value: 0,
      responsible_user_id: assisted ? "usr-2" : "usr-4",
      due_date: "2026-07-17",
      completed_at: null,
      notes: "Criado pelo modelo de checklist"
    });
    if (preset?.average_value) {
      vehicleCosts.push({
        id: `c-${Date.now()}-${index}`,
        store_id: vehicle.store_id,
        vehicle_id: vehicle.id,
        category: preset.category,
        description: name,
        estimated_value: preset.average_value,
        actual_value: 0,
        date: "2026-07-10",
        receipt_url: "",
        notes: "Custo previsto criado pelo checklist",
        created_by: assisted ? "usr-2" : "usr-3",
        created_at: TODAY.toISOString()
      });
    }
  });
  activityLogs.unshift({
    id: `log-${Date.now()}`,
    store_id: vehicle.store_id,
    user_id: assisted ? "usr-2" : "usr-3",
    entity_type: "vehicle",
    entity_id: vehicle.id,
    action: assisted ? "Cadastro publicado no painel da loja" : "Criou veículo",
    old_value: "",
    new_value: vehicleName(vehicle),
    notes: `Checklist aplicado: ${template.name}`,
    created_at: TODAY.toISOString()
  });
  state.selectedVehicleId = vehicle.id;
  state.detailTab = "summary";
  state.view = "details";
  showToast(assisted ? "Cadastro publicado no painel da loja." : "Veículo cadastrado com checklist e custos previstos.");
}

function showToast(message) {
  state.toast = message;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 3200);
}

document.addEventListener("click", (event) => {
  const roleButton = event.target.closest("[data-role]");
  if (roleButton) {
    state.role = roleButton.dataset.role;
    render();
    return;
  }

  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    state.view = viewButton.dataset.view;
    if (adminNav.some(([view]) => view === state.view) || ["storeCreate"].includes(state.view)) state.panel = "admin";
    if (storeNav.some(([view]) => view === state.view)) state.panel = "store";
    render();
    return;
  }

  const panelButton = event.target.closest("[data-panel]");
  if (panelButton) {
    state.panel = panelButton.dataset.panel;
    state.view = state.panel === "admin" ? "adminDashboard" : "dashboard";
    render();
    return;
  }

  const vehicleButton = event.target.closest("[data-vehicle]");
  if (vehicleButton) {
    state.selectedVehicleId = vehicleButton.dataset.vehicle;
    state.detailTab = "summary";
    state.view = "details";
    state.panel = "store";
    render();
    return;
  }

  const tab = event.target.closest("[data-tab]");
  if (tab) {
    state.detailTab = tab.dataset.tab;
    render();
    return;
  }

  const modalButton = event.target.closest("[data-modal]");
  if (modalButton) {
    state.modal = {
      type: modalButton.dataset.modal,
      vehicleId: modalButton.dataset.modalVehicle || state.selectedVehicleId,
      requestId: modalButton.dataset.request
    };
    render();
    return;
  }

  const closeModal = event.target.closest("[data-close-modal]");
  if (closeModal && !event.target.closest("[data-modal-box]")) {
    state.modal = null;
    render();
    return;
  }

  const closeButton = event.target.closest(".modal-header [data-close-modal]");
  if (closeButton) {
    state.modal = null;
    render();
    return;
  }

  const logout = event.target.closest('[data-action="logout"]');
  if (logout) {
    state.isLoggedIn = false;
    state.panel = "store";
    state.view = "dashboard";
    render();
    return;
  }

  const enterStore = event.target.closest("[data-enter-store]");
  if (enterStore) {
    state.selectedStoreId = enterStore.dataset.enterStore;
    state.panel = "store";
    state.view = "dashboard";
    showToast(`Entrando como admin em ${storeById().store_code}.`);
    render();
    return;
  }

  const assistedStore = event.target.closest("[data-assisted-store]");
  if (assistedStore) {
    state.selectedStoreId = assistedStore.dataset.assistedStore;
    state.panel = "admin";
    state.view = "assisted";
    render();
    return;
  }

  const toggleBlock = event.target.closest("[data-toggle-block]");
  if (toggleBlock) {
    const store = storeById(toggleBlock.dataset.toggleBlock);
    store.status = store.status === "Bloqueada" ? "Ativa" : "Bloqueada";
    activityLogs.unshift({
      id: `log-${Date.now()}`,
      store_id: store.id,
      user_id: "usr-1",
      entity_type: "store",
      entity_id: store.id,
      action: store.status === "Bloqueada" ? "Bloqueou loja" : "Desbloqueou loja",
      old_value: "",
      new_value: store.status,
      notes: "Controle administrativo de inadimplência",
      created_at: TODAY.toISOString()
    });
    showToast(`${store.name}: status atualizado para ${store.status}.`);
    render();
    return;
  }

  const publish = event.target.closest("[data-publish-request]");
  if (publish) {
    const request = premiumRequests.find((row) => row.id === publish.dataset.publishRequest);
    if (request) {
      request.status = "Publicado";
      const id = `veh-${Date.now()}`;
      vehicles.unshift({
        id,
        store_id: request.store_id,
        brand: request.brand,
        model: request.model,
        year: request.year,
        plate: "OKH NEW",
        chassis: "PREMIUM-PENDING",
        mileage: request.mileage,
        color: "Branco",
        origin: request.origin,
        purchase_price: request.purchase_price,
        entry_date: "2026-07-10",
        status: "Pronto para venda",
        advertised_price: Math.round(request.purchase_price * 1.28),
        minimum_price: Math.round(request.purchase_price * 1.18),
        sold_price: null,
        sold_date: null,
        notes: request.notes,
        created_by: "usr-2",
        created_at: TODAY.toISOString(),
        focus: "right"
      });
      state.selectedStoreId = request.store_id;
      state.selectedVehicleId = id;
      state.panel = "store";
      state.view = "details";
      showToast("Cadastro publicado no painel da loja.");
      render();
    }
    return;
  }

  const exportButton = event.target.closest("[data-export]");
  if (exportButton) {
    showToast("Relatório preparado para exportação PDF/Excel no protótipo.");
    render();
  }
});

document.addEventListener("input", (event) => {
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    state[filter.dataset.filter] = filter.value;
    render();
  }
});

document.addEventListener("change", (event) => {
  const storeSwitch = event.target.closest("[data-store-switch]");
  if (storeSwitch) {
    state.selectedStoreId = storeSwitch.value;
    render();
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === "login-form") {
    const fd = new FormData(form);
    state.selectedStoreId = fd.get("store_id") || "store-1";
    state.isLoggedIn = true;
    if (state.role === "admin") {
      state.panel = "admin";
      state.view = "adminDashboard";
    } else if (state.role === "operator") {
      state.panel = "admin";
      state.view = "adminPremium";
    } else if (state.role === "employee") {
      state.panel = "store";
      state.view = "preparation";
    } else {
      state.panel = "store";
      state.view = "dashboard";
    }
    render();
    return;
  }

  if (form.id === "vehicle-entry-form") {
    createVehicleFromForm(form, state.selectedStoreId, false);
    render();
    return;
  }

  if (form.id === "assisted-form") {
    createVehicleFromForm(form, new FormData(form).get("store_id"), true);
    state.panel = "store";
    render();
    return;
  }

  if (form.id === "premium-request-form") {
    const fd = new FormData(form);
    premiumRequests.unshift({
      id: `req-${Date.now()}`,
      store_id: state.selectedStoreId,
      vehicle_name: escapeHtml(fd.get("vehicle_name")),
      brand: escapeHtml(fd.get("brand")),
      model: escapeHtml(fd.get("model")),
      year: Number(fd.get("year")),
      mileage: Number(fd.get("mileage")),
      purchase_price: Number(fd.get("purchase_price")),
      origin: fd.get("origin"),
      shaken_info: escapeHtml(fd.get("shaken_info")),
      notes: escapeHtml(fd.get("notes")),
      status: "Recebido",
      priority: fd.get("priority"),
      created_by: "usr-3",
      assigned_to: "usr-2",
      created_at: TODAY.toISOString()
    });
    showToast("Solicitação enviada para a OKH.");
    render();
    return;
  }

  if (form.id === "admin-store-form") {
    const fd = new FormData(form);
    const store = {
      id: `store-${Date.now()}`,
      store_code: fd.get("store_code"),
      name: escapeHtml(fd.get("name")),
      owner_name: escapeHtml(fd.get("owner_name")),
      email: escapeHtml(fd.get("email")),
      phone: escapeHtml(fd.get("phone")),
      address: escapeHtml(fd.get("address")),
      plan: fd.get("plan"),
      status: "Ativa",
      car_limit: escapeHtml(fd.get("car_limit")),
      premium_entry_enabled: fd.get("premium_entry_enabled") === "true",
      created_at: "2026-07-10",
      monthly_revenue: fd.get("plan") === "Starter" ? 4980 : fd.get("plan") === "Pro" ? 9800 : 29800,
      last_access: "Primeiro acesso pendente",
      active_cars_month: 0,
      cars_this_month: 0
    };
    stores.unshift(store);
    state.selectedStoreId = store.id;
    state.view = "stores";
    showToast("Loja criada com store_id automático.");
    render();
    return;
  }

  if (form.id === "quick-cost-form") {
    const fd = new FormData(form);
    const vehicle = vehicleById(fd.get("vehicle_id"));
    const estimated = Number(fd.get("estimated_value"));
    const actual = Number(fd.get("actual_value"));
    vehicleCosts.push({
      id: `c-${Date.now()}`,
      store_id: vehicle.store_id,
      vehicle_id: vehicle.id,
      category: fd.get("category"),
      description: escapeHtml(fd.get("description")),
      estimated_value: estimated,
      actual_value: actual,
      date: fd.get("date"),
      receipt_url: "",
      notes: escapeHtml(fd.get("notes")),
      created_by: fd.get("created_by"),
      created_at: TODAY.toISOString()
    });
    activityLogs.unshift({
      id: `log-${Date.now()}`,
      store_id: vehicle.store_id,
      user_id: fd.get("created_by"),
      entity_type: "cost",
      entity_id: vehicle.id,
      action: "Adicionou custo",
      old_value: "",
      new_value: yen(actual),
      notes: fd.get("notes") || "Registro financeiro manual",
      created_at: TODAY.toISOString()
    });
    state.modal = null;
    showToast(actual > estimated ? "Custo real acima do previsto." : "Custo registrado.");
    render();
    return;
  }

  if (form.id === "quick-checklist-form") {
    const fd = new FormData(form);
    const vehicle = vehicleById(fd.get("vehicle_id"));
    const tpl = checklistTemplates.find((item) => item.id === fd.get("template_id"));
    tpl.items.forEach((name, index) => {
      checklistItems.push({
        id: `ck-${Date.now()}-${index}`,
        store_id: vehicle.store_id,
        vehicle_id: vehicle.id,
        name,
        category: "Preparação",
        status: "Pendente",
        estimated_value: 0,
        actual_value: 0,
        responsible_user_id: "usr-4",
        due_date: "2026-07-17",
        completed_at: null,
        notes: `Criado pelo modelo ${tpl.name}`
      });
    });
    state.modal = null;
    showToast("Checklist aplicado ao carro.");
    render();
    return;
  }

  if (form.id === "quick-sale-form" || form.id === "sale-form") {
    const fd = new FormData(form);
    const vehicle = vehicleById(fd.get("vehicle_id"));
    vehicle.sold_price = Number(fd.get("sold_price"));
    vehicle.sold_date = fd.get("sold_date");
    vehicle.status = "Vendido";
    if (fd.get("advertised_price")) vehicle.advertised_price = Number(fd.get("advertised_price"));
    if (fd.get("minimum_price")) vehicle.minimum_price = Number(fd.get("minimum_price"));
    activityLogs.unshift({
      id: `log-${Date.now()}`,
      store_id: vehicle.store_id,
      user_id: "usr-3",
      entity_type: "vehicle",
      entity_id: vehicle.id,
      action: "Marcou como vendido",
      old_value: "Em estoque",
      new_value: yen(vehicle.sold_price),
      notes: "Venda registrada com resultado final",
      created_at: TODAY.toISOString()
    });
    state.modal = null;
    state.detailTab = "sale";
    showToast("Carro marcado como vendido.");
    render();
    return;
  }

  if (form.id === "request-info-form") {
    const fd = new FormData(form);
    const request = premiumRequests.find((row) => row.id === fd.get("request_id"));
    if (request) {
      request.status = "Faltando informação";
      request.notes = escapeHtml(fd.get("message"));
    }
    state.modal = null;
    showToast("Solicitação marcada como faltando informação.");
    render();
  }
});

function renderLogin() {
  return `
    <section class="login-page">
      <div class="login-copy">
        <img src="${GARAGE_IMAGE}" alt="Premium sport car in a dark garage" />
        <div class="brand-mark"><span class="brand-logo">OKH</span><span>AutoLedger</span></div>
        <div>
          <h1>${t("loginTitle")}</h1>
          <p>${t("loginSubtitle")}</p>
        </div>
        <p class="small dark-note">${t("loginFootnote")}</p>
      </div>
      <div class="login-panel">
        <form class="login-card" id="login-form">
          <div class="card-header" style="padding:0; margin-bottom:12px;">
            <div>
              <h2>${t("loginHeading")}</h2>
              <p class="muted">${t("loginIntro")}</p>
            </div>
            ${renderLanguageSwitcher()}
          </div>
          <div class="role-grid">
            ${roles
              .map(localizedRole)
              .map(
                (role) => `
                  <button type="button" class="role-card ${state.role === role.id ? "is-active" : ""}" data-role="${role.id}">
                    <strong>${role.label}</strong>
                    <span>${role.text}</span>
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="field-grid">
            <label class="field">
              <span>${t("email")}</span>
              <input value="demo@okh.jp" autocomplete="email" />
            </label>
            <label class="field">
              <span>${t("defaultStore")}</span>
              <select name="store_id">
                ${stores.map((store) => `<option value="${store.id}" ${store.id === state.selectedStoreId ? "selected" : ""}>${store.store_code}</option>`).join("")}
              </select>
            </label>
          </div>
          <div class="alert success" style="margin:16px 0 18px;">${t("demoLoaded")}</div>
          <button class="button" type="submit">${i("lock")} ${t("enterPanel")}</button>
        </form>
      </div>
    </section>
  `;
}

function renderShell() {
  const nav = state.panel === "admin" ? adminNav : visibleStoreNav();
  const [title, subtitle] = getViewCopy(state.view);
  return `
    <div class="app-shell">
      ${renderSidebar(nav)}
      <main class="main-area">
        <header class="topbar">
          <div>
            <h1>${title}</h1>
            <p>${subtitle}</p>
          </div>
          ${renderTopActions()}
        </header>
        <section class="page">${renderView()}</section>
        ${renderMobileBar(nav)}
      </main>
      ${renderModal()}
      ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
    </div>
  `;
}

function renderSidebar(nav) {
  const store = storeById();
  const tenant = state.panel === "admin"
    ? `<span>${t("okhConsole")}</span><strong>${t("globalAdmin")}</strong><code>${t("allStores")}</code>`
    : `<span>${t("currentStore")}</span><strong>${store.name}</strong><code>${store.store_code}</code>`;
  return `
    <aside class="sidebar">
      <div class="brand-mark"><span class="brand-logo">OKH</span><span>AutoLedger</span></div>
      <div class="tenant-pill">${tenant}</div>
      <div class="nav-section-title">${state.panel === "admin" ? t("adminPanel") : t("storePanel")}</div>
      <nav class="nav-list">
        ${nav
          .map(
            ([view, label, iconName]) => `
              <button type="button" class="nav-item ${state.view === view ? "is-active" : ""}" data-view="${view}">
                ${i(iconName)}
                <span>${navLabel(view, label)}</span>
              </button>
            `
          )
          .join("")}
      </nav>
      <div class="sidebar-footer">
        ${state.role === "admin" || state.role === "operator" ? renderPanelSwitcher() : ""}
        <button type="button" class="nav-item" data-action="logout">${i("logout")} <span>${t("logout")}</span></button>
      </div>
    </aside>
  `;
}

function renderPanelSwitcher() {
  if (state.panel === "admin") {
    return `<button type="button" class="nav-item" data-panel="store">${i("store")} <span>${t("viewAsStore")}</span></button>`;
  }
  return `<button type="button" class="nav-item" data-panel="admin">${i("shield")} <span>${t("backToAdmin")}</span></button>`;
}

function renderTopActions() {
  const storeOptions = stores.map((store) => `<option value="${store.id}" ${store.id === state.selectedStoreId ? "selected" : ""}>${store.store_code}</option>`).join("");
  if (state.panel === "admin") {
    return `
      <div class="top-actions">
        ${renderLanguageSwitcher()}
        <select class="search-box" data-store-switch style="max-width:190px;">${storeOptions}</select>
        <button type="button" class="button secondary" data-view="storeCreate">${i("store")} ${t("createStore")}</button>
        <button type="button" class="button" data-view="assisted">${i("plus")} ${t("registerCar")}</button>
      </div>
    `;
  }
  return `
    <div class="top-actions">
      ${renderLanguageSwitcher()}
      <span class="badge ${statusClass(storeById().plan)}">${t("pro")}</span>
      <button type="button" class="button secondary" data-modal="cost">${i("yen")} ${t("addCost")}</button>
      <button type="button" class="button" data-view="entry">${i("plus")} ${t("newCar")}</button>
    </div>
  `;
}

function renderMobileBar(nav) {
  const compact = nav.slice(0, 5);
  return `
    <nav class="mobile-bar">
      ${compact
        .map(
          ([view, label, iconName]) => `
            <button type="button" class="${state.view === view ? "is-active" : ""}" data-view="${view}">
              ${i(iconName)}
              <span>${navLabel(view, label).split(" ")[0]}</span>
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

document.addEventListener("click", (event) => {
  const toggleLanguage = event.target.closest("[data-toggle-language]");
  if (toggleLanguage) {
    state.languageOpen = !state.languageOpen;
    render();
    return;
  }

  const localeButton = event.target.closest("[data-locale]");
  if (localeButton) {
    state.locale = localeButton.dataset.locale;
    state.languageOpen = false;
    localStorage.setItem("okh_locale", state.locale);
    render();
  }
});

const statusTranslations = {
  en: {
    "Entrada": "Intake",
    "Em preparação": "In preparation",
    "Aguardando peças": "Waiting for parts",
    "Aguardando shaken": "Waiting for shaken",
    "Pronto para venda": "Ready for sale",
    "Anunciado": "Listed",
    "Reservado": "Reserved",
    "Vendido": "Sold",
    "Prejuízo": "Loss",
    "Ativa": "Active",
    "Teste grátis": "Free trial",
    "Inadimplente": "Overdue",
    "Bloqueada": "Blocked",
    "Cadastrando": "Registering",
    "Ativo": "Active",
    "Recebido": "Received",
    "Faltando informação": "Missing info",
    "Publicado": "Published",
    "Cancelado": "Canceled",
    "Concluído": "Done",
    "Em andamento": "In progress",
    "Pendente": "Pending",
    "Atrasada": "Late"
  },
  ja: {
    "Entrada": "入庫",
    "Em preparação": "準備中",
    "Aguardando peças": "部品待ち",
    "Aguardando shaken": "車検待ち",
    "Pronto para venda": "販売準備完了",
    "Anunciado": "掲載中",
    "Reservado": "予約済み",
    "Vendido": "販売済み",
    "Prejuízo": "損失",
    "Ativa": "有効",
    "Teste grátis": "無料トライアル",
    "Inadimplente": "未払い",
    "Bloqueada": "停止中",
    "Cadastrando": "登録中",
    "Ativo": "有効",
    "Recebido": "受領済み",
    "Faltando informação": "情報不足",
    "Publicado": "公開済み",
    "Cancelado": "キャンセル",
    "Concluído": "完了",
    "Em andamento": "進行中",
    "Pendente": "保留",
    "Atrasada": "遅延"
  },
  es: {
    "Entrada": "Entrada",
    "Em preparação": "En preparación",
    "Aguardando peças": "Esperando piezas",
    "Aguardando shaken": "Esperando shaken",
    "Pronto para venda": "Listo para venta",
    "Anunciado": "Anunciado",
    "Reservado": "Reservado",
    "Vendido": "Vendido",
    "Prejuízo": "Pérdida",
    "Ativa": "Activa",
    "Teste grátis": "Prueba gratis",
    "Inadimplente": "En mora",
    "Bloqueada": "Bloqueada",
    "Cadastrando": "Registrando",
    "Ativo": "Activo",
    "Recebido": "Recibido",
    "Faltando informação": "Falta información",
    "Publicado": "Publicado",
    "Cancelado": "Cancelado",
    "Concluído": "Concluido",
    "Em andamento": "En progreso",
    "Pendente": "Pendiente",
    "Atrasada": "Atrasada"
  }
};

const originTranslations = {
  en: {
    "Leilão": "Auction",
    "Compra direta": "Direct purchase",
    "Troca": "Trade-in",
    "Consignado": "Consignment",
    "Revenda interna": "Internal resale"
  },
  ja: {
    "Leilão": "オークション",
    "Compra direta": "直接買取",
    "Troca": "下取り",
    "Consignado": "委託",
    "Revenda interna": "社内再販"
  },
  es: {
    "Leilão": "Subasta",
    "Compra direta": "Compra directa",
    "Troca": "Intercambio",
    "Consignado": "Consignado",
    "Revenda interna": "Reventa interna"
  }
};

const taskTranslations = {
  en: {
    "Trocar óleo": "Change oil",
    "Fazer shaken": "Do shaken",
    "Tirar fotos": "Take photos",
    "Polimento premium": "Premium polish",
    "Publicar anúncio": "Publish listing",
    "Preparar entrega": "Prepare delivery",
    "Revisar freios": "Inspect brakes",
    "Reavaliar preço anunciado": "Recheck advertised price",
    "Organizar fotos": "Organize photos",
    "Relatório mensal": "Monthly report"
  },
  ja: {
    "Trocar óleo": "オイル交換",
    "Fazer shaken": "車検対応",
    "Tirar fotos": "写真撮影",
    "Polimento premium": "プレミアム磨き",
    "Publicar anúncio": "広告掲載",
    "Preparar entrega": "納車準備",
    "Revisar freios": "ブレーキ確認",
    "Reavaliar preço anunciado": "掲載価格の再確認",
    "Organizar fotos": "写真整理",
    "Relatório mensal": "月次レポート"
  },
  es: {
    "Trocar óleo": "Cambiar aceite",
    "Fazer shaken": "Hacer shaken",
    "Tirar fotos": "Tomar fotos",
    "Polimento premium": "Pulido premium",
    "Publicar anúncio": "Publicar anuncio",
    "Preparar entrega": "Preparar entrega",
    "Revisar freios": "Revisar frenos",
    "Reavaliar preço anunciado": "Reevaluar precio anunciado",
    "Organizar fotos": "Organizar fotos",
    "Relatório mensal": "Reporte mensual"
  }
};

const categoryTranslations = {
  en: {
    "Óleo": "Oil",
    "Anúncio": "Listing",
    "Entrega": "Delivery",
    "Freios": "Brakes",
    "Venda": "Sale",
    "Fotos": "Photos",
    "Relatório": "Report"
  },
  ja: {
    "Óleo": "オイル",
    "Anúncio": "広告",
    "Entrega": "納車",
    "Freios": "ブレーキ",
    "Venda": "販売",
    "Fotos": "写真",
    "Relatório": "レポート"
  },
  es: {
    "Óleo": "Aceite",
    "Anúncio": "Anuncio",
    "Entrega": "Entrega",
    "Freios": "Frenos",
    "Venda": "Venta",
    "Fotos": "Fotos",
    "Relatório": "Reporte"
  }
};

function localizedValue(maps, value) {
  return maps[state.locale]?.[value] || value;
}

function statusLabel(status) {
  return localizedValue(statusTranslations, status);
}

function originLabel(origin) {
  return localizedValue(originTranslations, origin);
}

function taskLabel(name) {
  return localizedValue(taskTranslations, name);
}

function categoryLabel(category) {
  return localizedValue(categoryTranslations, category);
}

function badge(status) {
  return `<span class="badge ${statusClass(status)}">${escapeHtml(statusLabel(status))}</span>`;
}

function dashboardAlerts(cars) {
  return cars.flatMap((vehicle) => {
    const vehicleTotal = totals(vehicle);
    const alerts = [];
    if (daysInStock(vehicle) > 60 && isInStock(vehicle)) alerts.push({ tone: "", text: `${vehicleName(vehicle)}: ${t("stopped60Alert")}` });
    if (vehicleTotal.actualTotalInvestment > vehicleTotal.estimatedTotalInvestment) alerts.push({ tone: "", text: `${vehicleName(vehicle)}: ${t("costOverEstimateAlert")}` });
    if (vehicleTotal.estimatedProfit < 0) alerts.push({ tone: "danger", text: `${vehicleName(vehicle)}: ${t("estimatedLossAlert")}` });
    if (vehicleTotal.actualProfit !== null && vehicleTotal.actualProfit < 0) alerts.push({ tone: "danger", text: `${vehicleName(vehicle)}: ${t("actualLossAlert")}` });
    const late = checklistForVehicle(vehicle.id).find((item) => item.status !== "Concluído" && new Date(`${item.due_date}T23:59:00+09:00`) < TODAY);
    if (late) alerts.push({ tone: "warning", text: `${vehicleName(vehicle)}: ${t("lateTaskAlert")} ${taskLabel(late.name)}` });
    return alerts;
  });
}

function renderTaskRow(item) {
  const vehicle = vehicleById(item.vehicle_id);
  const late = new Date(`${item.due_date}T23:59:00+09:00`) < TODAY;
  return `
    <div class="list-row">
      <div>
        <strong>${taskLabel(item.name)}</strong>
        <span class="muted small">${vehicleName(vehicle)} · ${categoryLabel(item.category)} · ${dateLabel(item.due_date)}</span>
      </div>
      ${badge(late ? "Atrasada" : item.status)}
    </div>
  `;
}

function renderVehicleRow(vehicle) {
  const vehicleTotal = totals(vehicle);
  const result = vehicleTotal.actualProfit ?? vehicleTotal.estimatedProfit;
  return `
    <tr>
      <td><strong>${vehicleName(vehicle)}</strong><br><span class="muted">${vehicle.plate} · ${number(vehicle.mileage)} km</span></td>
      <td>${badge(vehicle.status)}</td>
      <td>${yen(vehicleTotal.actualTotalInvestment)}</td>
      <td>${yen(vehicle.advertised_price)}</td>
      <td class="${result >= 0 ? "profit" : "loss"}"><strong>${yen(result)}</strong></td>
      <td><button type="button" class="button secondary small-btn" data-vehicle="${vehicle.id}">${t("open")}</button></td>
    </tr>
  `;
}

function renderFlowChart() {
  const data = [
    [t("entryStatus"), 7, "warning"],
    [t("inPreparation"), 5, "warning"],
    [t("readyForSale"), 4, "success"],
    [t("sold"), 3, "success"],
    [t("losingCars"), 1, "danger"]
  ];
  const max = Math.max(...data.map((row) => row[1]));
  return `<div class="chart">${data.map(([label, value, tone]) => chartRow(label, value, max, tone, t("vehicle").toLowerCase())).join("")}</div>`;
}

function renderMarginRanking(cars) {
  const ranked = [...cars]
    .map((vehicle) => ({ vehicle, vehicleTotal: totals(vehicle) }))
    .sort((a, b) => b.vehicleTotal.marginPercentage - a.vehicleTotal.marginPercentage);
  const best = ranked.slice(0, 3);
  const worst = ranked.slice(-2).reverse();
  return `
    ${best
      .map(
        ({ vehicle, vehicleTotal }) => `
          <div class="list-row">
            <div><strong>${vehicleName(vehicle)}</strong><span class="muted small">${t("bestMargin")}</span></div>
            <strong class="${vehicleTotal.marginPercentage >= 0 ? "profit" : "loss"}">${pct(vehicleTotal.marginPercentage)}</strong>
          </div>
        `
      )
      .join("")}
    ${worst
      .map(
        ({ vehicle, vehicleTotal }) => `
          <div class="list-row">
            <div><strong>${vehicleName(vehicle)}</strong><span class="muted small">${t("lowestMargin")}</span></div>
            <strong class="${vehicleTotal.marginPercentage >= 0 ? "profit" : "loss"}">${pct(vehicleTotal.marginPercentage)}</strong>
          </div>
        `
      )
      .join("")}
  `;
}

function renderVehicleCard(vehicle) {
  const vehicleTotal = totals(vehicle);
  const result = vehicleTotal.actualProfit ?? vehicleTotal.estimatedProfit;
  return `
    <article class="card vehicle-card">
      <div class="vehicle-photo">
        <img src="${GARAGE_IMAGE}" alt="${vehicleName(vehicle)}" style="object-position:${vehicle.focus};" />
        ${badge(vehicle.status)}
      </div>
      <div class="vehicle-card-body">
        <div class="vehicle-title">
          <div>
            <h3>${vehicleName(vehicle)}</h3>
            <span class="muted small">${vehicle.year} · ${vehicle.color} · ${number(vehicle.mileage)} km</span>
          </div>
          <span class="plate">${vehicle.plate}</span>
        </div>
        <div class="mini-stats">
          <div class="mini-stat"><span>${t("purchase")}</span><strong>${yen(vehicle.purchase_price)}</strong></div>
          <div class="mini-stat"><span>${t("actualCosts")}</span><strong>${yen(vehicleTotal.totalActualCosts)}</strong></div>
          <div class="mini-stat"><span>${t("totalCost")}</span><strong>${yen(vehicleTotal.actualTotalInvestment)}</strong></div>
          <div class="mini-stat"><span>${t("profit")}</span><strong class="${result >= 0 ? "profit" : "loss"}">${yen(result)}</strong></div>
        </div>
        <div class="toolbar">
          <button type="button" class="button small-btn" data-vehicle="${vehicle.id}">${t("details")}</button>
          <button type="button" class="button secondary small-btn" data-modal="cost" data-modal-vehicle="${vehicle.id}">${t("cost")}</button>
          <button type="button" class="button secondary small-btn" data-modal="sale" data-modal-vehicle="${vehicle.id}">${t("soldShort")}</button>
        </div>
      </div>
    </article>
  `;
}

function renderVehicleTableLine(vehicle) {
  const vehicleTotal = totals(vehicle);
  const result = vehicleTotal.actualProfit ?? vehicleTotal.estimatedProfit;
  return `
    <tr>
      <td><strong>${vehicleName(vehicle)}</strong><br><span class="muted">${vehicle.plate} · ${originLabel(vehicle.origin)}</span></td>
      <td>${badge(vehicle.status)}</td>
      <td>${yen(vehicle.purchase_price)}</td>
      <td>${yen(vehicleTotal.totalEstimatedCosts)}</td>
      <td>${yen(vehicleTotal.totalActualCosts)}</td>
      <td>${yen(vehicleTotal.actualTotalInvestment)}</td>
      <td>${yen(vehicle.advertised_price)}</td>
      <td class="${result >= 0 ? "profit" : "loss"}"><strong>${yen(result)}</strong></td>
      <td>${daysInStock(vehicle)}</td>
      <td><button type="button" class="button secondary small-btn" data-vehicle="${vehicle.id}">${t("open")}</button></td>
    </tr>
  `;
}

function renderStoreDashboard() {
  const cars = vehiclesForStore();
  const active = cars.filter(isInStock);
  const soldMonth = cars.filter((vehicle) => isSold(vehicle) && vehicle.sold_date?.startsWith("2026-07"));
  const investment = active.reduce((sum, vehicle) => sum + totals(vehicle).actualTotalInvestment, 0);
  const predicted = active.reduce((sum, vehicle) => sum + totals(vehicle).estimatedProfit, 0);
  const realized = soldMonth.reduce((sum, vehicle) => sum + (totals(vehicle).actualProfit || 0), 0);
  const prep = active.filter((vehicle) => clean(vehicle.status).includes("prepar") || clean(vehicle.status).includes("aguard")).length;
  const ready = active.filter((vehicle) => clean(vehicle.status).includes("pronto") || clean(vehicle.status).includes("anunciado")).length;
  const loss = active.filter((vehicle) => totals(vehicle).estimatedProfit < 0 || clean(vehicle.status).includes("preju")).length;
  const stuck = active.filter((vehicle) => daysInStock(vehicle) > 60).length;
  const recent = [...cars].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  const pending = checklistItems
    .filter((item) => item.store_id === state.selectedStoreId && !["Concluído", "Cancelado"].includes(item.status))
    .slice(0, 6);
  const alerts = dashboardAlerts(cars).slice(0, 5);
  return `
    <div class="view-stack">
      <div class="quick-actions">
        <button type="button" class="button" data-view="entry">${i("plus")} ${t("newCar")}</button>
        <button type="button" class="button secondary" data-modal="cost">${i("yen")} ${t("addCost")}</button>
        <button type="button" class="button secondary" data-modal="checklist">${i("check")} ${t("applyChecklist")}</button>
        <button type="button" class="button secondary" data-view="premium">${i("upload")} ${t("requestRegistration")}</button>
      </div>
      <div class="metric-grid">
        ${kpi(t("inStock"), number(active.length), t("activeInStore"), "car")}
        ${kpi(t("totalInvestment"), yen(investment), t("purchaseActualCosts"), "yen")}
        ${kpi(t("estimatedProfit"), yen(predicted), t("advertisedPriceBase"), "chart", predicted >= 0 ? "success" : "danger")}
        ${kpi(t("realizedProfitMonth"), yen(realized), `${soldMonth.length} ${t("julySales")}`, "check", realized >= 0 ? "success" : "danger")}
        ${kpi(t("soldThisMonth"), number(soldMonth.length), t("completedOut"), "check", "success")}
        ${kpi(t("inPreparation"), number(prep), t("entryPartsShaken"), "wrench", "warning")}
        ${kpi(t("readyForSale"), number(ready), t("readyListed"), "car", "success")}
        ${kpi(t("losingCars"), number(loss), t("negativeResult"), "alert", loss ? "danger" : "")}
        ${kpi(t("stuck60"), number(stuck), t("stockTurnAttention"), "alert", stuck ? "warning" : "")}
      </div>
      <div class="content-grid">
        <div class="grid">
          <section class="card">
            <div class="card-header">
              <h2>${t("recentCars")}</h2>
              <button type="button" class="button secondary small-btn" data-view="cars">${t("viewAll")}</button>
            </div>
            <div class="card-body table-wrap">
              <table>
                <thead><tr><th>${t("vehicle")}</th><th>${t("status")}</th><th>${t("actual")}</th><th>${t("announcedPrice")}</th><th>${t("profit")}</th><th></th></tr></thead>
                <tbody>${recent.map(renderVehicleRow).join("")}</tbody>
              </table>
            </div>
          </section>
          <section class="card">
            <div class="card-header"><h2>${t("profitMonthly")}</h2><span class="muted small">${t("lastSixMonths")}</span></div>
            <div class="card-body">${renderProfitChart()}</div>
          </section>
          <section class="card">
            <div class="card-header"><h2>${t("vehicleFlow")}</h2><span class="muted small">${t("operationalVolume")}</span></div>
            <div class="card-body">${renderFlowChart()}</div>
          </section>
        </div>
        <div class="grid">
          <section class="card">
            <div class="card-header"><h2>${t("pendingTasks")}</h2>${badge(`${pending.length} ${t("pending")}`)}</div>
            <div class="card-body list">
              ${pending.map(renderTaskRow).join("") || `<div class="empty-state">${t("noPendingTasks")}</div>`}
            </div>
          </section>
          <section class="card">
            <div class="card-header"><h2>${t("alerts")}</h2><span class="icon-wrap warning">${i("alert")}</span></div>
            <div class="card-body grid">
              ${alerts.map((alert) => `<div class="alert ${alert.tone || ""}">${alert.text}</div>`).join("") || `<div class="alert success">${t("noCriticalAlerts")}</div>`}
            </div>
          </section>
          <section class="card">
            <div class="card-header"><h2>${t("marginRanking")}</h2></div>
            <div class="card-body list">${renderMarginRanking(cars)}</div>
          </section>
        </div>
      </div>
    </div>
  `;
}

function renderCarsPage() {
  const statusOptions = [
    ["Todos", t("all")],
    ["Entrada", t("entryStatus")],
    ["Em preparação", t("inPreparation")],
    ["Aguardando peças", t("waitingParts")],
    ["Aguardando shaken", t("waitingShaken")],
    ["Pronto para venda", t("readyForSale")],
    ["Anunciado", t("announced")],
    ["Reservado", t("reserved")],
    ["Vendido", t("sold")],
    ["Prejuízo", t("losingCars")]
  ];
  const filtered = vehiclesForStore()
    .filter((vehicle) => state.statusFilter === "Todos" || vehicle.status === state.statusFilter)
    .filter((vehicle) => clean(`${vehicle.brand} ${vehicle.model} ${vehicle.plate} ${vehicle.year}`).includes(clean(state.search)));
  return `
    <div class="view-stack">
      <section class="card pad">
        <div class="toolbar">
          <input class="search-box" data-filter="search" placeholder="${t("searchCars")}" value="${escapeHtml(state.search)}" />
          <select class="search-box" data-filter="statusFilter">
            ${statusOptions.map(([value, label]) => `<option value="${value}" ${state.statusFilter === value ? "selected" : ""}>${label}</option>`).join("")}
          </select>
          <select class="search-box"><option>${t("allYears")}</option><option>2021+</option><option>2019-2020</option><option>${t("until2018")}</option></select>
          <select class="search-box"><option>${t("announcedPrice")}</option><option>${t("priceUpTo")}</option><option>${t("priceMid")}</option><option>${t("priceAbove")}</option></select>
          <select class="search-box"><option>${t("origin")}</option><option>${t("auction")}</option><option>${t("directPurchase")}</option><option>${t("tradeIn")}</option><option>${t("consignment")}</option></select>
        </div>
      </section>
      <div class="quick-actions">
        <button type="button" class="button" data-view="entry">${i("plus")} ${t("newCar")}</button>
        <button type="button" class="button secondary" data-modal="cost">${i("yen")} ${t("addCost")}</button>
        <button type="button" class="button secondary" data-modal="checklist">${i("check")} ${t("applyChecklist")}</button>
        <button type="button" class="button secondary" data-modal="sale">${i("check")} ${t("markSold")}</button>
        <button type="button" class="button secondary" data-export="vehicle-report">${i("file")} ${t("generateReport")}</button>
      </div>
      <div class="vehicle-grid">
        ${filtered.map(renderVehicleCard).join("") || `<div class="empty-state">${t("noVehiclesFound")}</div>`}
      </div>
      <section class="card">
        <div class="card-header"><h2>${t("tableOperational")}</h2><span class="muted small">${t("costsProfitDays")}</span></div>
        <div class="card-body table-wrap">
          <table>
            <thead><tr><th>${t("vehicle")}</th><th>${t("status")}</th><th>${t("purchase")}</th><th>${t("estimated")}</th><th>${t("actual")}</th><th>${t("totalCost")}</th><th>${t("announced")}</th><th>${t("profit")}</th><th>${t("days")}</th><th></th></tr></thead>
            <tbody>${filtered.map(renderVehicleTableLine).join("")}</tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderSummaryTab(vehicle, vehicleTotals) {
  const result = vehicleTotals.actualProfit ?? vehicleTotals.estimatedProfit;
  const alerts = dashboardAlerts([vehicle]);
  return `
    <div class="detail-hero">
      <div class="detail-image"><img src="${GARAGE_IMAGE}" alt="${vehicleName(vehicle)}" style="object-position:${vehicle.focus};" /></div>
      <div class="grid">
        <div class="summary-strip">
          <div class="summary-item"><span>${t("purchase")}</span><strong>${yen(vehicle.purchase_price)}</strong></div>
          <div class="summary-item"><span>${t("estimated")}</span><strong>${yen(vehicleTotals.totalEstimatedCosts)}</strong></div>
          <div class="summary-item"><span>${t("actual")}</span><strong>${yen(vehicleTotals.totalActualCosts)}</strong></div>
          <div class="summary-item"><span>${t("days")}</span><strong>${daysInStock(vehicle)}</strong></div>
        </div>
        <div class="summary-strip">
          <div class="summary-item"><span>${t("totalCost")} ${t("estimated").toLowerCase()}</span><strong>${yen(vehicleTotals.estimatedTotalInvestment)}</strong></div>
          <div class="summary-item"><span>${t("totalCost")} ${t("actual").toLowerCase()}</span><strong>${yen(vehicleTotals.actualTotalInvestment)}</strong></div>
          <div class="summary-item"><span>Preço mínimo</span><strong>${yen(vehicle.minimum_price)}</strong></div>
          <div class="summary-item"><span>${t("announcedPrice")}</span><strong>${yen(vehicle.advertised_price)}</strong></div>
        </div>
        <div class="summary-strip">
          <div class="summary-item"><span>${t("soldPrice")}</span><strong>${vehicle.sold_price ? yen(vehicle.sold_price) : "-"}</strong></div>
          <div class="summary-item"><span>${t("estimatedProfit")}</span><strong class="${vehicleTotals.estimatedProfit >= 0 ? "profit" : "loss"}">${yen(vehicleTotals.estimatedProfit)}</strong></div>
          <div class="summary-item"><span>${t("realProfit")}</span><strong class="${(vehicleTotals.actualProfit ?? result) >= 0 ? "profit" : "loss"}">${vehicleTotals.actualProfit === null ? "-" : yen(vehicleTotals.actualProfit)}</strong></div>
          <div class="summary-item"><span>${t("margin")}</span><strong class="${vehicleTotals.marginPercentage >= 8 ? "profit" : vehicleTotals.marginPercentage < 0 ? "loss" : "warn"}">${pct(vehicleTotals.marginPercentage)}</strong></div>
        </div>
        <div class="grid">
          ${alerts.map((alert) => `<div class="alert ${alert.tone}">${alert.text}</div>`).join("") || `<div class="alert success">${t("positiveEstimatedProfit")}</div>`}
          ${vehicleTotals.marginPercentage < 8 && vehicleTotals.marginPercentage >= 0 ? `<div class="alert">${t("lowMarginAlert")}</div>` : ""}
        </div>
      </div>
    </div>
  `;
}

function renderAdminDashboard() {
  const activeStores = stores.filter((store) => store.status === "Ativa" || store.status === "Teste grátis");
  const blockedStores = stores.filter((store) => store.status === "Bloqueada" || store.status === "Inadimplente");
  const monthly = stores.reduce((sum, store) => sum + store.monthly_revenue, 0);
  const monthCars = stores.reduce((sum, store) => sum + store.cars_this_month, 0);
  const pendingPremium = premiumRequests.filter((request) => !["Publicado", "Cancelado"].includes(request.status)).length;
  return `
    <div class="view-stack">
      <div class="metric-grid admin">
        ${kpi(t("activeStores"), activeStores.length, t("includesTrial"), "store", "success")}
        ${kpi(t("blockedStores"), blockedStores.length, t("overdueOrBlocked"), "alert", blockedStores.length ? "danger" : "")}
        ${kpi(t("starterPlans"), stores.filter((store) => store.plan === "Starter").length, t("currentPortfolio"), "file")}
        ${kpi(t("proPlans"), stores.filter((store) => store.plan === "Pro").length, t("currentPortfolio"), "file")}
        ${kpi(t("premiumPlans"), stores.filter((store) => store.plan.includes("Premium")).length, t("operational"), "shield", "warning")}
        ${kpi(t("monthlyRevenue"), yen(monthly), t("mrrEstimate"), "yen", "success")}
        ${kpi(t("carsThisMonth"), monthCars, t("registeredJuly"), "car")}
        ${kpi(t("premiumPending"), pendingPremium, t("openRequests"), "upload", pendingPremium ? "warning" : "")}
        ${kpi(t("assistedDone"), premiumRequests.filter((r) => r.status === "Publicado").length, t("publishedPanel"), "check", "success")}
        ${kpi(t("byOperator"), "Ana: 14", t("assistedEntries"), "users")}
      </div>
      <div class="content-grid">
        <section class="card">
          <div class="card-header"><h2>${t("storesRevenue")}</h2><button type="button" class="button small-btn" data-view="stores">${t("openStores")}</button></div>
          <div class="card-body table-wrap">
            <table>
              <thead><tr><th>${t("stores") || "Loja"}</th><th>${t("plans") || "Plano"}</th><th>${t("status")}</th><th>${t("activeStores")}</th><th>${t("carsThisMonth")}</th><th>${t("monthlyRevenue")}</th></tr></thead>
              <tbody>${stores.map((store) => `<tr><td><strong>${store.name}</strong><br><span class="muted">${store.store_code}</span></td><td>${store.plan}</td><td>${badge(store.status)}</td><td>${store.active_cars_month}</td><td>${store.cars_this_month}</td><td>${yen(store.monthly_revenue)}</td></tr>`).join("")}</tbody>
            </table>
          </div>
        </section>
        <section class="card">
          <div class="card-header"><h2>${t("premiumRequestsTitle")}</h2><button type="button" class="button secondary small-btn" data-view="adminPremium">${t("kanban")}</button></div>
          <div class="card-body list">${premiumRequests.slice(0, 5).map(renderAdminRequestRow).join("")}</div>
        </section>
      </div>
    </div>
  `;
}

function bootFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const locale = params.get("locale");
  if (locale && languageOptions.some(([id]) => id === locale)) {
    state.locale = locale;
    localStorage.setItem("okh_locale", locale);
  }
  if (params.get("demo") !== "1") return;
  const role = params.get("role");
  const view = params.get("view");
  const store = params.get("store");
  const vehicle = params.get("vehicle");
  if (role && roles.some((item) => item.id === role)) state.role = role;
  if (store && stores.some((item) => item.id === store)) state.selectedStoreId = store;
  if (vehicle && vehicles.some((item) => item.id === vehicle)) state.selectedVehicleId = vehicle;
  state.isLoggedIn = true;
  state.panel = adminNav.some(([id]) => id === view) || view === "storeCreate" ? "admin" : "store";
  state.view = view || (state.panel === "admin" ? "adminDashboard" : "dashboard");
  if (state.role === "operator" && !view) {
    state.panel = "admin";
    state.view = "adminPremium";
  }
}

bootFromQuery();
render();
