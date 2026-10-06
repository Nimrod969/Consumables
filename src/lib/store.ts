import { useMemo } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { uid } from "./utils";
import { suggestedReorder } from "./status";
import { SCHOOL_NAME } from "./school";
import type { Establishment, Item, Movement, MovementType, PurchaseDraft } from "./types";

type ItemInput = Omit<Item, "id" | "createdAt" | "updatedAt" | "archived" | "archivedAt"> & {
  id?: string;
};

type MovementInput = {
  itemId: string;
  type: MovementType;
  quantity: number;
  reason: string;
  department?: string;
  note?: string;
};

type StockState = {
  establishment: Establishment;
  items: Item[];
  movements: Movement[];
  drafts: Record<string, PurchaseDraft>;
  introDismissed: boolean;
  hydrated: boolean;
  ensureSeed: () => void;
  setEstablishmentName: (name: string) => void;
  clearAll: () => void;
  dismissIntro: () => void;
  addItem: (input: ItemInput) => string;
  updateItem: (id: string, patch: Partial<ItemInput>) => void;
  archiveItem: (id: string) => void;
  restoreItem: (id: string) => void;
  deleteItem: (id: string) => void;
  addMovement: (input: MovementInput) => void;
  setDraft: (itemId: string, patch: Partial<PurchaseDraft>) => void;
  applyPurchases: (itemIds: string[]) => number;
};

function applyQty(current: number, type: MovementType, quantity: number): number {
  if (type === "entrada") return current + quantity;
  if (type === "saida") return Math.max(0, current - quantity);
  return Math.max(0, quantity);
}

function normalizeItem(it: Item): Item {
  return {
    ...it,
    archived: Boolean(it.archived),
    archivedAt: it.archivedAt ?? null,
  };
}

function normalizeMovement(mv: Movement): Movement {
  return {
    ...mv,
    department: mv.department ?? "",
  };
}

export const useStockStore = create<StockState>()(
  persist(
    (set, get) => ({
      establishment: { name: SCHOOL_NAME },
      items: [],
      movements: [],
      drafts: {},
      introDismissed: false,
      hydrated: false,

      ensureSeed: () => {
        const { items, movements, establishment } = get();
        set({
          items: items.map(normalizeItem),
          movements: movements.map(normalizeMovement),
          establishment: {
            name: establishment.name?.trim() ? establishment.name : SCHOOL_NAME,
          },
          hydrated: true,
        });
      },

      setEstablishmentName: (name) =>
        set({
          establishment: { name: name.trim() || SCHOOL_NAME },
        }),

      clearAll: () => {
        set({
          items: [],
          movements: [],
          drafts: {},
          introDismissed: false,
        });
      },

      dismissIntro: () => set({ introDismissed: true }),

      addItem: (input) => {
        const now = new Date().toISOString();
        const id = input.id ?? uid("item");
        const next: Item = {
          id,
          name: input.name.trim(),
          category: input.category,
          unit: input.unit,
          quantity: Math.max(0, input.quantity),
          minQuantity: Math.max(0, input.minQuantity),
          reorderQty: Math.max(0, input.reorderQty),
          location: input.location.trim(),
          supplier: input.supplier.trim(),
          unitCost: Math.max(0, input.unitCost),
          notes: input.notes.trim(),
          archived: false,
          archivedAt: null,
          createdAt: now,
          updatedAt: now,
        };
        set({ items: [next, ...get().items] });
        return id;
      },

      updateItem: (id, patch) => {
        const now = new Date().toISOString();
        set({
          items: get().items.map((it) =>
            it.id === id
              ? {
                  ...it,
                  ...patch,
                  name: patch.name?.trim() ?? it.name,
                  location: patch.location?.trim() ?? it.location,
                  supplier: patch.supplier?.trim() ?? it.supplier,
                  notes: patch.notes?.trim() ?? it.notes,
                  updatedAt: now,
                }
              : it,
          ),
        });
      },

      archiveItem: (id) => {
        const now = new Date().toISOString();
        const drafts = { ...get().drafts };
        delete drafts[id];
        set({
          items: get().items.map((it) =>
            it.id === id ? { ...it, archived: true, archivedAt: now, updatedAt: now } : it,
          ),
          drafts,
        });
      },

      restoreItem: (id) => {
        const now = new Date().toISOString();
        set({
          items: get().items.map((it) =>
            it.id === id ? { ...it, archived: false, archivedAt: null, updatedAt: now } : it,
          ),
        });
      },

      deleteItem: (id) => {
        set({
          items: get().items.filter((it) => it.id !== id),
          movements: get().movements.filter((mv) => mv.itemId !== id),
          drafts: Object.fromEntries(Object.entries(get().drafts).filter(([key]) => key !== id)),
        });
      },

      addMovement: ({ itemId, type, quantity, reason, department, note }) => {
        const item = get().items.find((it) => it.id === itemId);
        if (!item || item.archived || quantity <= 0) return;
        const resultingQty = applyQty(item.quantity, type, quantity);
        const mv: Movement = {
          id: uid("mv"),
          itemId,
          type,
          quantity,
          reason,
          department: department?.trim() ?? "",
          note: note?.trim() ?? "",
          at: new Date().toISOString(),
          resultingQty,
        };
        set({
          items: get().items.map((it) =>
            it.id === itemId ? { ...it, quantity: resultingQty, updatedAt: mv.at } : it,
          ),
          movements: [mv, ...get().movements],
        });
      },

      setDraft: (itemId, patch) => {
        const prev = get().drafts[itemId] ?? { qty: 0, checked: true };
        set({
          drafts: {
            ...get().drafts,
            [itemId]: { ...prev, ...patch },
          },
        });
      },

      applyPurchases: (itemIds) => {
        let count = 0;
        for (const id of itemIds) {
          const item = get().items.find((it) => it.id === id);
          if (!item || item.archived) continue;
          const draft = get().drafts[id];
          const qty = draft?.qty && draft.qty > 0 ? draft.qty : suggestedReorder(item);
          if (qty <= 0) continue;
          get().addMovement({
            itemId: id,
            type: "entrada",
            quantity: qty,
            reason: "Compra / reposição",
            department: "Secretaria",
            note: "Registo a partir da lista de compras",
          });
          count += 1;
        }
        const drafts = { ...get().drafts };
        for (const id of itemIds) delete drafts[id];
        set({ drafts });
        return count;
      },
    }),
    {
      name: "reabastece-eprd-v5",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        establishment: state.establishment,
        items: state.items,
        movements: state.movements,
        drafts: state.drafts,
        introDismissed: state.introDismissed,
      }),
    },
  ),
);

export function useActiveItems(): Item[] {
  const items = useStockStore((s) => s.items);
  return useMemo(() => items.filter((it) => !it.archived), [items]);
}
