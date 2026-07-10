import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  tone?: "success" | "warning" | "danger";
}) {
  return (
    <article className="metric-card">
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
      <span className={`metric-icon ${tone || ""}`}>
        <Icon size={18} />
      </span>
    </article>
  );
}
