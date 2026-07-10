import type { Locale, StoreStatus, VehicleStatus } from "@/lib/domain";
import { storeStatusLabels, vehicleStatusLabels } from "@/lib/i18n";

type Props =
  | { type: "vehicle"; value: VehicleStatus; locale: Locale }
  | { type: "store"; value: StoreStatus; locale: Locale }
  | { type: "plain"; value: string; locale?: Locale };

export function StatusBadge(props: Props) {
  const label =
    props.type === "vehicle"
      ? vehicleStatusLabels[props.locale][props.value]
      : props.type === "store"
        ? storeStatusLabels[props.locale][props.value]
        : props.value;

  return <span className={`badge badge-${props.value.replaceAll("_", "-")}`}>{label}</span>;
}
