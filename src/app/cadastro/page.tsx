import Link from "next/link";
import { Building2, UserPlus } from "lucide-react";
import { signUpAction } from "@/app/auth/actions";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { normalizeLocale } from "@/lib/i18n";

type PageProps = {
  searchParams?: Promise<{ locale?: string; auth?: string }>;
};

const messages: Record<string, string> = {
  "missing-fields": "Preencha loja, responsavel, email e senha.",
  "weak-password": "Use uma senha com pelo menos 8 caracteres.",
  "password-mismatch": "A confirmacao da senha nao confere.",
  "missing-env": "Supabase ainda nao esta configurado neste ambiente.",
  "signup-error": "Nao foi possivel criar o cadastro agora. Verifique os dados e tente novamente."
};

export default async function SignUpPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const message = params.auth ? messages[params.auth] : "";

  return (
    <AuthPageShell locale={locale}>
      <div className="login-card wide">
        <div className="login-card-head">
          <span className="metric-icon success">
            <Building2 size={18} />
          </span>
          <div>
            <h2>Criar cadastro OKH</h2>
            <p>Abra uma loja em trial e crie o usuario dono.</p>
          </div>
        </div>
        {message ? <div className="auth-alert">{message}</div> : null}
        <form action={signUpAction} className="auth-form two-columns">
          <input type="hidden" name="locale" value={locale} />
          <label className="auth-field">
            Nome da loja
            <input name="storeName" placeholder="Tokyo Premium Motors" autoComplete="organization" required />
          </label>
          <label className="auth-field">
            Responsavel
            <input name="name" placeholder="Keven OKH" autoComplete="name" required />
          </label>
          <label className="auth-field">
            Email
            <input name="email" type="email" placeholder="owner@loja.jp" autoComplete="email" required />
          </label>
          <label className="auth-field">
            Telefone
            <input name="phone" placeholder="+81 90-0000-0000" autoComplete="tel" />
          </label>
          <label className="auth-field wide-field">
            Endereco
            <input name="address" placeholder="Tokyo, Japan" autoComplete="street-address" />
          </label>
          <label className="auth-field">
            Senha
            <input name="password" type="password" placeholder="Minimo 8 caracteres" autoComplete="new-password" required />
          </label>
          <label className="auth-field">
            Confirmar senha
            <input name="confirmPassword" type="password" placeholder="Repita a senha" autoComplete="new-password" required />
          </label>
          <button className="button auth-submit wide-field" type="submit">
            <UserPlus size={17} /> Criar cadastro
          </button>
        </form>
        <div className="auth-link-row">
          <Link href={`/login?locale=${locale}`}>Ja tenho cadastro</Link>
          <Link href={`/recuperar-senha?locale=${locale}`}>Esqueci a senha</Link>
        </div>
      </div>
    </AuthPageShell>
  );
}
