import { Save } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { createVehicleAction } from "@/app/actions";
import { getDemoSession } from "@/lib/auth/session";
import { normalizeLocale, translator } from "@/lib/i18n";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string }>;
};

export default async function VehicleIntakePage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = getDemoSession(params.role, params.store || "store-1");

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/entrada"
      title={t("vehicleIntake")}
      subtitle="Primeiro formulario real do fluxo: cria o contrato de dados para inserir veiculo no Supabase."
    >
      <section className="panel form-panel">
        <div className="panel-head">
          <h2>{t("newCar")}</h2>
          <span>{session.store?.storeCode}</span>
        </div>
        <form action={createVehicleAction} className="form-grid">
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
            Preco de compra
            <input name="purchasePrice" type="number" defaultValue="820000" required />
          </label>
          <label>
            Preco anunciado
            <input name="advertisedPrice" type="number" defaultValue="1120000" required />
          </label>
          <label className="wide">
            Observacoes
            <textarea name="notes" defaultValue="Shaken pendente e fotos novas necessarias." />
          </label>
          <button className="button" type="submit">
            <Save size={17} /> Validar cadastro
          </button>
        </form>
      </section>
    </AppShell>
  );
}
