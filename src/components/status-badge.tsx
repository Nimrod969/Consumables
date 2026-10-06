import { Badge } from "@/components/ui/badge";
import type { StockStatus } from "@/lib/types";
import { statusLabel } from "@/lib/status";

const variant: Record<StockStatus, "danger" | "warn" | "muted" | "pine"> = {
  esgotado: "danger",
  repor: "warn",
  vigiar: "muted",
  ok: "pine",
};

export function StatusBadge({ status }: { status: StockStatus }) {
  return <Badge variant={variant[status]}>{statusLabel(status)}</Badge>;
}
