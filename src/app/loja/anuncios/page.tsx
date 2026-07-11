import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Megaphone, Plus, Share2 } from "lucide-react";
import { publishVehicleListingAction } from "@/app/actions";
import { AppShell } from "@/components/layout/AppShell";
import { SocialSharePanel } from "@/components/social/SocialSharePanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { daysInStock, number, vehicleName, yen } from "@/lib/calculations";
import { getAppSession } from "@/lib/auth/session";
import { normalizeLocale, translator } from "@/lib/i18n";
import { getPublicListingByVehicleId } from "@/lib/repositories/public-listings";
import { getStoreVehicles } from "@/lib/repositories/vehicles";
import { buildVehicleSharePayload, defaultListingSlug } from "@/lib/social-listing";

type PageProps = {
  searchParams?: Promise<{ locale?: string; role?: string; store?: string; vehicle?: string; shared?: string; slug?: string }>;
};

const messages: Record<string, { text: string; success?: boolean }> = {
  published: { text: "Link de visualizacao gerado com sucesso.", success: true },
  "publish-error": { text: "Nao consegui gerar o link publico agora. Confira login, loja e permissao." }
};

export default async function SocialAdsPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};
  const locale = normalizeLocale(params.locale);
  const t = translator(locale);
  const session = await getAppSession(params.role, params.store || "store-1");
  const vehicles = await getStoreVehicles(session.store?.id || "store-1");
  const selected = vehicles.find((vehicle) => vehicle.id === params.vehicle) || vehicles.find((vehicle) => ["ready_for_sale", "listed"].includes(vehicle.status)) || vehicles[0];
  const existingListing = selected ? await getPublicListingByVehicleId(selected.id) : null;
  const listingSlug = params.slug || existingListing?.slug || (selected ? defaultListingSlug(selected) : null);
  const payload = selected
    ? buildVehicleSharePayload({
        vehicle: selected,
        store: session.store,
        locale,
        listingSlug
      })
    : null;
  const message = params.shared ? messages[params.shared] : null;

  return (
    <AppShell
      locale={locale}
      session={session}
      active="/loja/anuncios"
      title="Anuncios"
      subtitle="Postagem rapida com texto, dados basicos e link de visualizacao."
      actions={
        <Link className="button" href={`/loja/entrada?locale=${locale}`}>
          <Plus size={17} /> {t("newCar")}
        </Link>
      }
    >
      {message ? <div className={message.success ? "auth-alert success" : "auth-alert"}>{message.text}</div> : null}

      {selected && payload ? (
        <div className="ads-layout">
          <section className="panel ad-picker">
            <div className="panel-head">
              <h2>Carros</h2>
              <span className="source-pill">{number(vehicles.length)}</span>
            </div>
            <div className="ad-car-list">
              {vehicles.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  className={vehicle.id === selected.id ? "ad-car-row is-active" : "ad-car-row"}
                  href={`/loja/anuncios?locale=${locale}&vehicle=${vehicle.id}`}
                >
                  <div>
                    <strong>{vehicleName(vehicle)}</strong>
                    <span>
                      {vehicle.year} - {vehicle.mileage.toLocaleString("ja-JP")} km
                    </span>
                  </div>
                  <span>{yen(vehicle.advertisedPrice)}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="panel ad-preview-panel">
            <div className="panel-head">
              <h2>Preview</h2>
              <StatusBadge type="vehicle" value={selected.status} locale={locale} />
            </div>
            <div className="social-preview-card">
              <div className="social-preview-photo">
                <Image src="/assets/premium-sport-garage.png" alt={vehicleName(selected)} fill sizes="(max-width: 900px) 100vw, 40vw" />
              </div>
              <div className="social-preview-body">
                <span>{session.store?.name || "OKH AutoLedger"}</span>
                <h2>{payload.headline}</h2>
                <strong>{yen(selected.advertisedPrice)}</strong>
                <div className="social-spec-grid">
                  <div>
                    <span>Ano</span>
                    <strong>{selected.year}</strong>
                  </div>
                  <div>
                    <span>Km</span>
                    <strong>{selected.mileage.toLocaleString("ja-JP")}</strong>
                  </div>
                  <div>
                    <span>Cor</span>
                    <strong>{selected.color}</strong>
                  </div>
                  <div>
                    <span>Dias</span>
                    <strong>{daysInStock(selected)}</strong>
                  </div>
                </div>
                <Link className="button small secondary" href={payload.publicPath} target="_blank">
                  <ExternalLink size={16} /> Abrir link
                </Link>
              </div>
            </div>
          </section>

          <section className="panel ad-copy-panel">
            <div className="panel-head">
              <h2>Postagem</h2>
              <Share2 size={18} />
            </div>
            <SocialSharePanel payload={payload} />
          </section>

          <section className="panel ad-publish-panel">
            <div className="panel-head">
              <h2>Link de visualizacao</h2>
              <Megaphone size={18} />
            </div>
            <form action={publishVehicleListingAction} className="form-grid">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="vehicleId" value={selected.id} />
              <input type="hidden" name="listingSlug" value={listingSlug || selected.id} />
              <label className="wide">
                Texto publico curto
                <textarea name="publicNotes" placeholder="Ex: revisado, pronto para entrega, consulte financiamento." defaultValue={selected.notes} />
              </label>
              <button className="button" type="submit">
                <Megaphone size={17} /> Gerar link
              </button>
              <Link className="button secondary" href={payload.publicPath} target="_blank">
                <ExternalLink size={17} /> Visualizar
              </Link>
            </form>
          </section>
        </div>
      ) : (
        <div className="auth-alert">Nenhum carro disponivel para anuncio. Cadastre um carro primeiro.</div>
      )}
    </AppShell>
  );
}
