import Link from "next/link";
import { KeyRound } from "lucide-react";
import { updatePasswordAction } from "@/app/auth/actions";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { normalizeLocale } from "@/lib/i18n";

type PageProps = {
  searchParams?: Promise<{ locale?: string; auth?: string }>;
};

const messages: Record<string, string> = {
  "missing-fields": "Informe e confirme a nova senha.",
  "weak-password": "Use uma senha com pelo menos 8 caracteres.",
  "password-mismatch": "A confirmacao da senha nao confere.",
  "missing-env": "Supabase ainda nao esta configurado neste ambiente.",
  "update-error": "Nao foi possivel atualizar a senha. Solicite um novo link."
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const message = params.auth ? messages[params.auth] : "";

  return (
    <AuthPageShell locale={locale}>
      <div className="login-card">
        <div className="login-card-head">
          <span className="metric-icon success">
            <KeyRound size={18} />
          </span>
          <div>
            <h2>Redefinir senha</h2>
            <p>Digite a nova senha para concluir a recuperacao.</p>
          </div>
        </div>
        {message ? <div className="auth-alert">{message}</div> : null}
        <form action={updatePasswordAction} className="auth-form">
          <input type="hidden" name="locale" value={locale} />
          <label className="auth-field">
            Nova senha
            <input name="password" type="password" placeholder="Minimo 8 caracteres" autoComplete="new-password" required />
          </label>
          <label className="auth-field">
            Confirmar nova senha
            <input name="confirmPassword" type="password" placeholder="Repita a senha" autoComplete="new-password" required />
          </label>
          <button className="button auth-submit" type="submit">
            <KeyRound size={17} /> Salvar nova senha
          </button>
        </form>
        <div className="auth-link-row">
          <Link href={`/login?locale=${locale}`}>Voltar para entrar</Link>
          <Link href={`/recuperar-senha?locale=${locale}`}>Solicitar novo link</Link>
        </div>
      </div>
    </AuthPageShell>
  );
}
