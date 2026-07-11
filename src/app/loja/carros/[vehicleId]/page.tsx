import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, JapaneseYen, ShieldCheck } from "lucide-react";
import { verifyVehicleAction } from "@/app/actions";
import { AppShell } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { VerificationBadge } from "@/components/vehicles/VerificationBadge";
import { daysInStock, pct, totalsWithCosts, vehicleName, yen } from "@/lib/calculations";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, originLabels, translator } from "@/lib/i18n";
import { getVehicleById, getVehicleCosts, getVehicleFiles } from "@/lib/repositories/vehicles";

type PageProps = {
  params: Promise<{ vehicleId: string }>;
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; vehicle?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  verified: { text: "Cadastro verificado e assinado com sucesso.", success: true },
  "demo-verified": { text: "Assinatura validada no modo demo. Entre com uma conta real para gravar no Supabase.", success: true },
  "verify-denied": { text: "Este perfil nao pode assinar cadastro de veiculo." },
  "verify-error": { text: "Nao consegui verificar o cadastro agora. Confira login, perfil e permissao." },
  "upload-error": { text: "O carro foi criado, mas uma foto/documento nao subiu. Tente anexar novamente depois." }
};

function canSignVehicle(role: string) {
  return ["okh_admin_master", "okh_operator", "store_owner"].includes(role);
}

export default async function VehicleDetailsPage({ params, searchParams }: PageProps) {
  const route = await params;
  const query = (await searchParams) || {};
  const locale = normalizeLocale(query.locale);
  const t = translator(locale);
  const session = await getAppSession(query.role, query.store || "store-1");
  const vehicle = await getVehicleById(route.vehicleId);

  if (!vehicle) {
    notFound();
  }

  const rows = await getVehicleCosts(vehicle.id);
  const files = await getVehicleFiles(vehicle.id);
  const total = totalsWithCosts(vehicle, rows);
  const message = query.vehicle ? messages[query.vehicle] : null;
  const photos = files.filter((file) => file.fileType === "vehicle_photo");
  const docs = files.filter((file) => file.fileType === "document_photo");
  const showSignAction = vehicle.verificationStatus !== "verified" && canSignVehicle(session.role);

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/carros"
      title={vehicleName(vehicle)}
      subtitle={`${vehicle.plate} - ${originLabels[locale][vehicle.origin]} - ${daysInStock(vehicle)} dias`}
      actions={
        <Link className="button secondary" href={`/loja/carros?locale=${locale}`}>
          <ArrowLeft size={17} /> Voltar
        </Link>
      }
    >
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}

      <section className="detail-grid">
        <div className="panel detail-photo">
          <Image src="/assets/premium-sport-garage.png" alt={vehicleName(vehicle)} fill sizes="(max-width: 900px) 100vw, 45vw" />
          <StatusBadge type="vehicle" value={vehicle.status} locale={locale} />
          <div className="verification-float">
            <VerificationBadge status={vehicle.verificationStatus} locale={locale} />
          </div>
        </div>
        <div className="panel summary-panel">
          <div className="summary-grid">
            <div>
              <span>{t("purchase")}</span>
              <strong>{yen(vehicle.purchasePrice)}</strong>
            </div>
            <div>
              <span>{t("actual")}</span>
              <strong>{yen(total.actualTotalInvestment)}</strong>
            </div>
            <div>
              <span>{t("advertised")}</span>
              <strong>{yen(vehicle.advertisedPrice)}</strong>
            </div>
            <div>
              <span>{t("profit")}</span>
              <strong className={(total.actualProfit ?? total.estimatedProfit) >= 0 ? "profit" : "loss"}>{yen(total.actualProfit ?? total.estimatedProfit)}</strong>
            </div>
            <div>
              <span>Margem</span>
              <strong>{pct(total.marginPercentage)}</strong>
            </div>
            <div>
              <span>{t("days")}</span>
              <strong>{daysInStock(vehicle)}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Cadastro e verificacao</h2>
            <VerificationBadge status={vehicle.verificationStatus} locale={locale} />
          </div>
          <div className="list">
            <div className="list-row">
              <div>
                <strong>Modo de entrada</strong>
                <span>{vehicle.intakeMode === "photo_minimal" ? "Entrada rapida por fotos" : "Cadastro completo"}</span>
              </div>
              <span className="source-pill">{vehicle.intakeMode === "photo_minimal" ? "Fotos" : "Completo"}</span>
            </div>
            <div className="list-row">
              <div>
                <strong>Arquivos anexados</strong>
                <span>{photos.length} foto(s) do carro, {docs.length} documento(s)</span>
              </div>
              <FileText size={18} />
            </div>
            <div className="list-row">
              <div>
                <strong>Assinatura</strong>
                <span>{vehicle.signedAt ? new Date(vehicle.signedAt).toLocaleString("pt-BR") : "Pendente"}</span>
              </div>
              <ShieldCheck size={18} />
            </div>
          </div>
          {showSignAction ? (
            <form action={verifyVehicleAction} className="verify-form">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="vehicleId" value={vehicle.id} />
              <label>
                Nota de conclusao
                <textarea name="completionNotes" placeholder="Dados conferidos pelas fotos e documentos." />
              </label>
              <button className="button" type="submit">
                <ShieldCheck size={17} /> Verificar e assinar
              </button>
            </form>
          ) : null}
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>{t("costs")}</h2>
            <JapaneseYen size={18} />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Descricao</th>
                  <th>Previsto</th>
                  <th>{t("actual")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((cost) => (
                  <tr key={cost.id}>
                    <td>{cost.category}</td>
                    <td>{cost.description}</td>
                    <td>{yen(cost.estimatedValue)}</td>
                    <td>{yen(cost.actualValue)}</td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4}>Nenhum custo cadastrado para este carro ainda.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
