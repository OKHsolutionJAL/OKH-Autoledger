import type { Locale, VehicleVerificationStatus } from "@/lib/domain";

const labels: Record<Locale, Record<VehicleVerificationStatus, string>> = {
  pt: {
    draft: "Rascunho",
    pending_review: "Pendente",
    verified: "Verificado",
    rejected: "Rejeitado"
  },
  en: {
    draft: "Draft",
    pending_review: "Pending",
    verified: "Verified",
    rejected: "Rejected"
  },
  ja: {
    draft: "下書き",
    pending_review: "確認待ち",
    verified: "確認済み",
    rejected: "差戻し"
  },
  es: {
    draft: "Borrador",
    pending_review: "Pendiente",
    verified: "Verificado",
    rejected: "Rechazado"
  }
};

export function VerificationBadge({ status, locale }: { status: VehicleVerificationStatus; locale: Locale }) {
  return <span className={`badge badge-${status.replaceAll("_", "-")}`}>{labels[locale][status]}</span>;
}
