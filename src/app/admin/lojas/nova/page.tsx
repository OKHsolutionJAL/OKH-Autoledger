import { Save } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { createStoreAction } from "@/app/actions";
import { getDemoSession } from "@/lib/auth/session";
import { normalizeLocale, translator } from "@/lib/i18n";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string }>;
};

export default async function NewStorePage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = getDemoSession(params.role || "admin", params.store || "store-1");

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/admin/lojas"
      title={t("createStore")}
      subtitle="Fluxo Admin OKH para criar loja, store_id, plano e usuario dono."
    >
      <section className="panel form-panel">
        <div className="panel-head">
          <h2>Nova loja</h2>
          <span>multi-tenant</span>
        </div>
        <form action={createStoreAction} className="form-grid">
          <label>
            Nome da loja
            <input name="name" defaultValue="Tokyo Premium Motors" required />
          </label>
          <label>
            Responsavel
            <input name="ownerName" defaultValue="Kenji Sato" required />
          </label>
          <label>
            Email
            <input name="email" type="email" defaultValue="owner@tokyopremium.jp" required />
          </label>
          <label>
            Telefone
            <input name="phone" defaultValue="+81 90-0000-0000" />
          </label>
          <label>
            Plano
            <select name="plan" defaultValue="pro">
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="premium_operational">Premium Operational</option>
            </select>
          </label>
          <label>
            Limite de carros
            <input name="carLimit" type="number" defaultValue="50" />
          </label>
          <label className="wide">
            Endereco
            <textarea name="address" defaultValue="Tokyo, Japan" />
          </label>
          <button className="button" type="submit">
            <Save size={17} /> Validar loja
          </button>
        </form>
      </section>
    </AppShell>
  );
}
