import { BadgeCheck, Camera, FileText, Save } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { createVehicleAction } from "@/app/actions";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, originLabels, translator } from "@/lib/i18n";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; vehicle?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  "missing-fields": { text: "Preencha loja, marca, modelo, ano, placa, chassis e data de entrada." },
  "missing-files": { text: "Para entrada rapida, envie pelo menos uma foto do carro ou documento." },
  "create-error": { text: "Nao consegui gravar o carro no Supabase. Verifique login, loja e permissoes do perfil." },
  "upload-error": { text: "O carro foi criado, mas uma foto/documento nao subiu. Abra o carro e tente anexar novamente." },
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
          <div className="wide intake-options">
            <label className="intake-option">
              <input type="radio" name="intakeMode" value="complete" defaultChecked />
              <span>
                <BadgeCheck size={17} />
                Cadastro completo
              </span>
            </label>
            <label className="intake-option">
              <input type="radio" name="intakeMode" value="photo_minimal" />
              <span>
                <Camera size={17} />
                Entrada rapida por fotos
              </span>
            </label>
          </div>
          <label>
            Marca
            <input name="brand" defaultValue="Toyota" />
          </label>
          <label>
            Modelo
            <input name="model" defaultValue="Aqua S" />
          </label>
          <label>
            Ano
            <input name="year" type="number" defaultValue="2020" />
          </label>
          <label>
            Placa
            <input name="plate" defaultValue="KSG 24-18" />
          </label>
          <label>
            Chassis
            <input name="chassis" defaultValue="NHP10-2209418" />
          </label>
          <label>
            Km
            <input name="mileage" type="number" defaultValue="42800" />
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
            <input name="entryDate" type="date" defaultValue={today} />
          </label>
          <label>
            Preco de compra
            <input name="purchasePrice" type="number" defaultValue="820000" />
          </label>
          <label>
            Preco anunciado
            <input name="advertisedPrice" type="number" defaultValue="1120000" />
          </label>
          <label>
            Preco minimo
            <input name="minimumPrice" type="number" defaultValue="1030000" />
          </label>
          <label className="wide">
            Observacoes
            <textarea name="notes" defaultValue="Shaken pendente e fotos novas necessarias." />
          </label>
          <label>
            Foto do carro
            <input name="vehiclePhoto" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" />
          </label>
          <label>
            Documento principal
            <input name="documentPhoto" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" capture="environment" />
          </label>
          <label className="wide">
            Documento extra
            <input name="documentPhotoExtra" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" />
          </label>
          <button className="button" type="submit">
            <Save size={17} /> {t("registerCar")}
          </button>
          <span className="form-footnote">
            <FileText size={15} /> Entrada rapida fica pendente ate um perfil autorizado completar e assinar.
          </span>
        </form>
      </section>
    </AppShell>
  );
}
