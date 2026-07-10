import {
  BarChart3,
  Car,
  CheckCircle2,
  FileText,
  JapaneseYen,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Store,
  Upload,
  UserCircle,
  Users,
  Warehouse,
  Wrench
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { signOutAction } from "@/app/auth/actions";
import type { AppSession, Locale } from "@/lib/domain";
import { roleLabels, translator } from "@/lib/i18n";
import { BrandMark } from "@/components/ui/BrandMark";
import { LanguageMenu } from "@/components/ui/LanguageMenu";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

function withLocale(href: string, locale: Locale) {
  return `${href}?locale=${locale}`;
}

export function AppShell({
  locale,
  session,
  active,
  title,
  subtitle,
  actions,
  children
}: {
  locale: Locale;
  session: AppSession;
  active: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const t = translator(locale);
  const storeNav: NavItem[] = [
    { href: "/loja/dashboard", label: t("storeDashboard"), icon: LayoutDashboard },
    { href: "/loja/carros", label: t("cars"), icon: Car },
    { href: "/loja/entrada", label: t("vehicleIntake"), icon: Plus },
    { href: "/loja/preparacao", label: t("preparation"), icon: Wrench },
    { href: "/loja/custos", label: t("costs"), icon: JapaneseYen },
    { href: "/loja/vendas", label: t("sales"), icon: CheckCircle2 },
    { href: "/loja/solicitacoes", label: t("requests"), icon: Upload },
    { href: "/loja/relatorios", label: t("reports"), icon: BarChart3 },
    { href: "/loja/configuracoes", label: t("settings"), icon: Settings }
  ];
  const adminNav: NavItem[] = [
    { href: "/admin/dashboard", label: t("adminDashboard"), icon: LayoutDashboard },
    { href: "/admin/lojas", label: t("stores"), icon: Warehouse },
    { href: "/admin/planos", label: t("plans"), icon: FileText },
    { href: "/admin/usuarios", label: t("users"), icon: Users },
    { href: "/admin/carros", label: t("cars"), icon: Car },
    { href: "/admin/pagamentos", label: t("payments"), icon: JapaneseYen },
    { href: "/admin/configuracoes", label: t("settings"), icon: Settings }
  ];
  const nav = session.isAdmin ? adminNav : storeNav;
  const mobileNav = [...nav.slice(0, 4), { href: "/perfil", label: "Perfil", icon: UserCircle }];
  const path = active === "/perfil" ? "/perfil" : active.startsWith("/admin") ? "/admin/dashboard" : active.startsWith("/loja/carros") ? "/loja/carros" : "/loja/dashboard";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <BrandMark />
        <div className="tenant-card">
          <span>{session.isAdmin ? t("console") : t("currentStore")}</span>
          <strong>{session.isAdmin ? "Admin global" : session.store?.name}</strong>
          <small>{session.isAdmin ? "todos os store_id" : session.store?.storeCode}</small>
        </div>
        <nav className="side-nav">
          {nav.map((item) => {
            const Icon = item.icon;
            const selected = active.startsWith(item.href);
            return (
              <Link key={item.href} href={withLocale(item.href, locale)} className={selected ? "is-active" : ""}>
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <span>{roleLabels[locale][session.role]}</span>
          <Link className="profile-link" href={withLocale("/perfil", locale)}>
            <UserCircle size={15} /> Perfil
          </Link>
          <form action={signOutAction} className="logout-form">
            <input type="hidden" name="locale" value={locale} />
            <button type="submit">
              <LogOut size={15} /> Logout
            </button>
          </form>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="top-actions">
            <LanguageMenu locale={locale} path={path} />
            {actions}
          </div>
        </header>
        <section className="page-content">{children}</section>
      </main>
      <nav className="mobile-nav">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={withLocale(item.href, locale)} className={active.startsWith(item.href) ? "is-active" : ""}>
              <Icon size={17} />
              <span>{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
