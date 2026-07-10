import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Store, UserCog } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { normalizeLocale, roleLabels, translator } from "@/lib/i18n";
import type { Locale, UserRole } from "@/lib/domain";

type LoginPageProps = {
  searchParams?: Promise<{ locale?: string }>;
};

const profileLinks: Array<{ role: string; actualRole: UserRole; href: string; icon: typeof Store }> = [
  { role: "owner", actualRole: "store_owner", href: "/loja/dashboard", icon: Store },
  { role: "employee", actualRole: "store_employee", href: "/loja/carros", icon: Store },
  { role: "admin", actualRole: "okh_admin_master", href: "/admin/dashboard", icon: UserCog },
  { role: "operator", actualRole: "okh_operator", href: "/admin/dashboard", icon: UserCog }
];

function localeHref(locale: Locale) {
  return `/login?locale=${locale}`;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);

  return (
    <main className="login-page">
      <section className="login-visual">
        <Image src="/assets/premium-sport-garage.png" alt="Premium sport car in dark garage" fill priority sizes="(max-width: 900px) 100vw, 52vw" />
        <div className="login-overlay" />
        <div className="login-copy">
          <BrandMark />
          <h1>{t("loginTitle")}</h1>
          <p>{t("loginSubtitle")}</p>
        </div>
      </section>
      <section className="login-panel">
        <div className="login-card">
          <div className="login-card-head">
            <span className="metric-icon success">
              <LockKeyhole size={18} />
            </span>
            <div>
              <h2>OKH AutoLedger SaaS</h2>
              <p>{t("chooseProfile")}</p>
            </div>
          </div>
          <div className="profile-list">
            {profileLinks.map((profile) => {
              const Icon = profile.icon;
              return (
                <Link key={profile.role} href={`${profile.href}?locale=${locale}&role=${profile.role}`} className="profile-option">
                  <Icon size={18} />
                  <span>{roleLabels[locale][profile.actualRole]}</span>
                  <ArrowRight size={16} />
                </Link>
              );
            })}
          </div>
          <div className="locale-row">
            {(["pt", "en", "ja", "es"] as Locale[]).map((item) => (
              <Link key={item} className={item === locale ? "is-active" : ""} href={localeHref(item)}>
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <p className="demo-note">Demo mode local. Supabase entra na proxima etapa usando `database/schema.sql`.</p>
        </div>
      </section>
    </main>
  );
}
