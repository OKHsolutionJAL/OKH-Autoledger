import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { yen } from "@/lib/calculations";
import { getPublicListingBySlug } from "@/lib/repositories/public-listings";

type PageProps = {
  params: Promise<{ vehicleId: string }>;
};

function whatsappLink(phone: string, title: string) {
  const cleaned = phone.replace(/\D/g, "");

  if (!cleaned) {
    return "";
  }

  return `https://wa.me/${cleaned}?text=${encodeURIComponent(`Tenho interesse no ${title}.`)}`;
}

export default async function PublicVehiclePage({ params }: PageProps) {
  const route = await params;
  const listing = await getPublicListingBySlug(route.vehicleId);

  if (!listing) {
    notFound();
  }

  const wa = whatsappLink(listing.storePhone, listing.title);

  return (
    <main className="public-listing-page">
      <section className="public-hero">
        <div className="public-photo">
          <Image src={listing.photoUrl} alt={listing.title} fill priority sizes="100vw" />
        </div>
        <div className="public-panel">
          <Link className="public-back" href="/">
            <ArrowLeft size={16} /> OKH AutoLedger
          </Link>
          <span>{listing.storeName}</span>
          <h1>{listing.title}</h1>
          <p>{listing.subtitle}</p>
          <strong>{yen(listing.price)}</strong>
          <div className="public-specs">
            <div>
              <span>Ano</span>
              <strong>{listing.year}</strong>
            </div>
            <div>
              <span>Km</span>
              <strong>{listing.mileage.toLocaleString("ja-JP")}</strong>
            </div>
            <div>
              <span>Cor</span>
              <strong>{listing.color}</strong>
            </div>
          </div>
          {listing.description ? <p className="public-description">{listing.description}</p> : null}
          {wa ? (
            <a className="button" href={wa} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> Tenho interesse
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}
