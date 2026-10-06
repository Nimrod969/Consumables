export const CATEGORIES = [
  { id: "papelaria", label: "Papelaria" },
  { id: "informatica", label: "Informática" },
  { id: "limpeza", label: "Limpeza" },
  { id: "copa", label: "Copa e bar" },
  { id: "saude", label: "Saúde e higiene" },
  { id: "laboratorio", label: "Laboratório" },
  { id: "desporto", label: "Desporto" },
  { id: "manutencao", label: "Manutenção" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const UNITS = [
  "un",
  "cx",
  "pack",
  "resma",
  "rolo",
  "fardo",
  "L",
  "kg",
  "garrafa",
] as const;

export type Unit = (typeof UNITS)[number];

export const MOVEMENT_TYPES = [
  { id: "entrada", label: "Entrada" },
  { id: "saida", label: "Saída" },
  { id: "ajuste", label: "Ajuste" },
] as const;

export type MovementType = (typeof MOVEMENT_TYPES)[number]["id"];

export const MOVEMENT_REASONS = [
  "Compra / reposição",
  "Consumo diário",
  "Aula / atividade",
  "Evento da escola",
  "Inventário",
  "Perda / danificado",
  "Transferência",
  "Outro",
] as const;

export const DEPARTMENTS = [
  "Secretaria",
  "Direção",
  "Informática",
  "Desenvolvimento de Software",
  "Sistemas e Redes",
  "Ação Educativa",
  "Proteção Civil",
  "Comércio",
  "Reprografia",
  "Sala de professores",
  "Ciências",
  "Educação física",
  "Laboratório",
  "Biblioteca",
  "Limpeza",
  "Copa",
  "Gabinete de saúde",
  "Outro",
] as const;

export type StockStatus = "esgotado" | "repor" | "vigiar" | "ok";

export type Item = {
  id: string;
  name: string;
  category: CategoryId;
  unit: string;
  quantity: number;
  minQuantity: number;
  reorderQty: number;
  location: string;
  supplier: string;
  unitCost: number;
  notes: string;
  archived: boolean;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Movement = {
  id: string;
  itemId: string;
  type: MovementType;
  quantity: number;
  reason: string;
  department: string;
  note: string;
  at: string;
  resultingQty: number;
};

export type PurchaseDraft = {
  qty: number;
  checked: boolean;
};

export type Establishment = {
  name: string;
};
