import { KeyRound, Save, ShieldCheck, UserCircle } from "lucide-react";
import Link from "next/link";
import { updateProfileAction } from "@/app/auth/actions";
import { AppShell } from "@/components/layout/AppShell";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, roleLabels } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; profile?: string }>;
};

const profileMessages: Record<string, { text: string; success?: boolean }> = {
  updated: { text: "Perfil atualizado com sucesso.", success: true },
  "missing-name": { text: "Informe o nome do perfil." },
  "missing-env": { text: "Supabase ainda nao esta configurado neste ambiente." },
  "update-error": { text: "Nao foi possivel atualizar o perfil agora." }
};

export default async function ProfilePage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const session = await getAppSession(params.role, params.store || "store-1");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const message = params.profile ? profileMessages[params.profile] : null;
  const isRealSession = Boolean(user);

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/perfil"
      title="Perfil"
      subtitle="Conta, acesso, loja vinculada e seguranca."
      actions={
        <Link className="button secondary" href={`/recuperar-senha?locale=${locale}`}>
          <KeyRound size={17} /> Redefinir senha
        </Link>
      }
    >
      <div className="content-grid profile-layout">
        <section className="panel form-panel">
          <div className="panel-head">
            <h2>Dados do perfil</h2>
            <UserCircle size={18} />
          </div>
          {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}
          {!isRealSession ? <div className="auth-alert">Voce esta no modo demo. Entre com uma conta real para salvar alteracoes.</div> : null}
          <form action={updateProfileAction} className="form-grid">
            <input type="hidden" name="locale" value={locale} />
            <label>
              Nome
              <input name="name" defaultValue={session.profile.name} disabled={!isRealSession} required />
            </label>
            <label>
              Email
              <input value={user?.email || session.profile.email} disabled readOnly />
            </label>
            <label>
              Perfil de acesso
              <input value={roleLabels[locale][session.role]} disabled readOnly />
            </label>
            <label>
              Status
              <input value={session.profile.status} disabled readOnly />
            </label>
            <button className="button" type="submit" disabled={!isRealSession}>
              <Save size={17} /> Salvar perfil
            </button>
          </form>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Loja vinculada</h2>
            <ShieldCheck size={18} />
          </div>
          <div className="profile-summary">
            <div>
              <span>Loja</span>
              <strong>{session.store?.name || "Admin global"}</strong>
            </div>
            <div>
              <span>Codigo</span>
              <strong>{session.store?.storeCode || "OKH"}</strong>
            </div>
            <div>
              <span>Plano</span>
              <strong>{session.store?.plan || "admin"}</strong>
            </div>
            <div>
              <span>Financeiro</span>
              <strong>{session.profile.canEditFinancials ? "Liberado" : "Somente leitura"}</strong>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
