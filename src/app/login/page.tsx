import Link from "next/link";
import { ArrowRight, LockKeyhole, LogIn, Store, UserCog } from "lucide-react";
import { signInAction } from "@/app/auth/actions";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { normalizeLocale, roleLabels, translator } from "@/lib/i18n";
import type { Locale, UserRole } from "@/lib/domain";

type LoginPageProps = {
  searchParams?: Promise<{ locale?: string; auth?: string }>;
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

const authMessages: Record<string, string> = {
  "missing-fields": "Informe email e senha para entrar.",
  "missing-env": "Supabase ainda nao esta configurado neste ambiente.",
  "invalid-credentials": "Email ou senha invalidos.",
  "missing-profile": "Login valido, mas este usuario ainda nao tem perfil OKH vinculado.",
  "blocked-profile": "Este usuario nao esta ativo. Verifique o status no painel OKH.",
  "signed-out": "Sessao encerrada com sucesso.",
  "check-email": "Cadastro recebido. Confira seu email para confirmar a conta.",
  confirmed: "Email confirmado. Agora voce ja pode entrar.",
  "password-updated": "Senha atualizada. Entre novamente.",
  "session-required": "Entre novamente para continuar.",
  "auth-code-error": "Nao foi possivel confirmar este link. Solicite um novo email."
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const authMessage = params.auth ? authMessages[params.auth] : "";
  const isSuccess = ["signed-out", "check-email", "confirmed", "password-updated"].includes(params.auth || "");

  return (
    <AuthPageShell locale={locale}>
      <div className="login-card">
        <div className="login-card-head">
          <span className="metric-icon success">
            <LockKeyhole size={18} />
          </span>
          <div>
            <h2>OKH AutoLedger SaaS</h2>
            <p>Acesso seguro com Supabase Auth</p>
          </div>
        </div>
        {authMessage ? <div className={isSuccess ? "auth-alert success" : "auth-alert"}>{authMessage}</div> : null}
        <form action={signInAction} className="auth-form">
          <input type="hidden" name="locale" value={locale} />
          <label className="auth-field">
            Email
            <input name="email" type="email" placeholder="admin@okh.jp" autoComplete="email" required />
          </label>
          <label className="auth-field">
            Senha
            <input name="password" type="password" placeholder="********" autoComplete="current-password" required />
          </label>
          <button className="button auth-submit" type="submit">
            <LogIn size={17} /> Entrar
          </button>
        </form>
        <div className="auth-link-row">
          <Link href={`/cadastro?locale=${locale}`}>Criar cadastro</Link>
          <Link href={`/recuperar-senha?locale=${locale}`}>Esqueci a senha</Link>
        </div>
        <details className="demo-access">
          <summary>{t("chooseProfile")}</summary>
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
        </details>
        <div className="locale-row">
          {(["pt", "en", "ja", "es"] as Locale[]).map((item) => (
            <Link key={item} className={item === locale ? "is-active" : ""} href={localeHref(item)}>
              {item.toUpperCase()}
            </Link>
          ))}
        </div>
        <p className="demo-note">Usuarios reais precisam existir no Supabase Auth e na tabela `profiles`.</p>
      </div>
    </AuthPageShell>
  );
}
