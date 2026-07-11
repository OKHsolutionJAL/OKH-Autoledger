import { Save } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { createVehicleAction } from "@/app/actions";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, originLabels, translator } from "@/lib/i18n";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; vehicle?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  "missing-fields": { text: "Preencha loja, marca, modelo, ano, placa, chassis e data de entrada." },
  "create-error": { text: "Nao consegui gravar o carro no Supabase. Verifique login, loja e permissoes do perfil." },
  "demo-validated": { text: "Formulario validado. Entre com uma conta real da loja para gravar no Supabase.", success: true }
};

export default async function VehicleIntakePage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = await getAppSession(params.role, params.store || "store-1");
  const message = params.vehicle ? messages[params.vehicle] : null;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/entrada"
      title={t("vehicleIntake")}
      subtitle="Cadastro real de veiculo conectado ao Supabase quando a sessao da loja estiver ativa."
    >
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}
      <section className="panel form-panel">
        <div className="panel-head">
          <h2>{t("newCar")}</h2>
          <span>{session.store?.storeCode}</span>
        </div>
        <form action={createVehicleAction} className="form-grid">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="storeId" value={session.store?.id || ""} />
          <label>
            Marca
            <input name="brand" defaultValue="Toyota" required />
          </label>
          <label>
            Modelo
            <input name="model" defaultValue="Aqua S" required />
          </label>
          <label>
            Ano
            <input name="year" type="number" defaultValue="2020" required />
          </label>
          <label>
            Placa
            <input name="plate" defaultValue="KSG 24-18" required />
          </label>
          <label>
            Chassis
            <input name="chassis" defaultValue="NHP10-2209418" required />
          </label>
          <label>
            Km
            <input name="mileage" type="number" defaultValue="42800" required />
          </label>
          <label>
            Cor
            <input name="color" defaultValue="Branco" />
          </label>
          <label>
            Origem
            <select name="origin" defaultValue="auction">
              <option value="auction">{originLabels[locale].auction}</option>
              <option value="direct_purchase">{originLabels[locale].direct_purchase}</option>
              <option value="trade_in">{originLabels[locale].trade_in}</option>
              <option value="consignment">{originLabels[locale].consignment}</option>
              <option value="internal_resale">{originLabels[locale].internal_resale}</option>
              <option value="other">{originLabels[locale].other}</option>
            </select>
          </label>
          <label>
            Data de entrada
            <input name="entryDate" type="date" defaultValue={today} required />
          </label>
          <label>
            Preco de compra
            <input name="purchasePrice" type="number" defaultValue="820000" required />
          </label>
          <label>
            Preco anunciado
            <input name="advertisedPrice" type="number" defaultValue="1120000" required />
          </label>
          <label>
            Preco minimo
            <input name="minimumPrice" type="number" defaultValue="1030000" />
          </label>
          <label className="wide">
            Observacoes
            <textarea name="notes" defaultValue="Shaken pendente e fotos novas necessarias." />
          </label>
          <button className="button" type="submit">
            <Save size={17} /> {t("registerCar")}
          </button>
        </form>
      </section>
    </AppShell>
  );
}
