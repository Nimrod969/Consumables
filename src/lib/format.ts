import { format, formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { schoolLabel as schoolLabelFromSchool } from "./school";

export function money(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function qty(value: number, unit?: string): string {
  const n = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 2 }).format(value);
  return unit ? `${n} ${unit}` : n;
}

export function formatDate(iso: string): string {
  return format(new Date(iso), "d MMM yyyy", { locale: pt });
}

export function formatDateTime(iso: string): string {
  return format(new Date(iso), "d MMM yyyy, HH:mm", { locale: pt });
}

export function fromNow(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: pt });
}

export function daysLabel(days: number): string {
  if (days < 1) return "hoje / amanhã";
  if (days < 1.5) return "1 dia";
  const rounded = Math.round(days);
  return `${rounded} dias`;
}

export const schoolLabel = schoolLabelFromSchool;

export function isActive(item: { archived?: boolean }): boolean {
  return !item.archived;
}
