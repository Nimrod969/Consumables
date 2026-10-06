import type { Item, Movement, StockStatus } from "./types";

export function stockStatus(item: Item): StockStatus {
  if (item.quantity <= 0) return "esgotado";
  if (item.quantity <= item.minQuantity) return "repor";
  if (item.quantity <= item.minQuantity * 1.4) return "vigiar";
  return "ok";
}

export function statusLabel(status: StockStatus): string {
  switch (status) {
    case "esgotado":
      return "Esgotado";
    case "repor":
      return "A repor";
    case "vigiar":
      return "A vigiar";
    case "ok":
      return "OK";
  }
}

export function suggestedReorder(item: Item): number {
  const target = item.reorderQty > 0 ? item.reorderQty : Math.max(item.minQuantity * 2, 1);
  return Math.max(1, Math.ceil(target - item.quantity));
}

export function stockFill(item: Item): number {
  const ceiling = Math.max(item.minQuantity * 2, item.quantity, 1);
  return Math.max(0, Math.min(100, (item.quantity / ceiling) * 100));
}

const WINDOW_DAYS = 45;

export function avgDailyOut(itemId: string, movements: Movement[], now = Date.now()): number {
  const since = now - WINDOW_DAYS * 24 * 60 * 60 * 1000;
  let total = 0;
  for (const m of movements) {
    if (m.itemId !== itemId || m.type !== "saida") continue;
    if (new Date(m.at).getTime() < since) continue;
    total += m.quantity;
  }
  return total / WINDOW_DAYS;
}

export function daysUntilEmpty(item: Item, movements: Movement[], now = Date.now()): number | null {
  const daily = avgDailyOut(item.id, movements, now);
  if (daily <= 0.02) return null;
  return item.quantity / daily;
}

export function needsPurchase(item: Item): boolean {
  if (item.archived) return false;
  const s = stockStatus(item);
  return s === "esgotado" || s === "repor";
}
