import Link from "next/link";
import { KeyRound, Mail } from "lucide-react";
import { requestPasswordResetAction } from "@/app/auth/actions";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { normalizeLocale } from "@/lib/i18n";

type PageProps = {
  searchParams?: Promise<{ locale?: string; auth?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  "missing-email": { text: "Informe o email da conta." },
  "missing-env": { text: "Supabase ainda nao esta configurado neste ambiente." },
  "reset-error": { text: "Nao foi possivel enviar o email de redefinicao." },
  "reset-sent": { text: "Enviamos o link de redefinicao para o email informado.", success: true }
};

export default async function RecoverPasswordPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const message = params.auth ? messages[params.auth] : null;

  return (
    <AuthPageShell locale={locale}>
      <div className="login-card">
        <div className="login-card-head">
          <span className="metric-icon warning">
            <KeyRound size={18} />
          </span>
          <div>
            <h2>Esqueci a senha</h2>
            <p>Receba um link seguro para redefinir sua senha.</p>
          </div>
        </div>
        {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}
        <form action={requestPasswordResetAction} className="auth-form">
          <input type="hidden" name="locale" value={locale} />
          <label className="auth-field">
            Email
            <input name="email" type="email" placeholder="owner@loja.jp" autoComplete="email" required />
          </label>
          <button className="button auth-submit" type="submit">
            <Mail size={17} /> Enviar link
          </button>
        </form>
        <div className="auth-link-row">
          <Link href={`/login?locale=${locale}`}>Voltar para entrar</Link>
          <Link href={`/cadastro?locale=${locale}`}>Criar cadastro</Link>
        </div>
      </div>
    </AuthPageShell>
  );
}
