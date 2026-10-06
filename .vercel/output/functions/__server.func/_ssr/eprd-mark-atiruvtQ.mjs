import { i as __toESM } from "../_runtime.mjs";
import { b as require_react, v as Slot, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as format, t as pt } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/eprd-mark-atiruvtQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function stockStatus(item) {
	if (item.quantity <= 0) return "esgotado";
	if (item.quantity <= item.minQuantity) return "repor";
	if (item.quantity <= item.minQuantity * 1.4) return "vigiar";
	return "ok";
}
function statusLabel(status) {
	switch (status) {
		case "esgotado": return "Esgotado";
		case "repor": return "A repor";
		case "vigiar": return "A vigiar";
		case "ok": return "OK";
	}
}
function suggestedReorder(item) {
	const target = item.reorderQty > 0 ? item.reorderQty : Math.max(item.minQuantity * 2, 1);
	return Math.max(1, Math.ceil(target - item.quantity));
}
function stockFill(item) {
	const ceiling = Math.max(item.minQuantity * 2, item.quantity, 1);
	return Math.max(0, Math.min(100, item.quantity / ceiling * 100));
}
var WINDOW_DAYS = 45;
function avgDailyOut(itemId, movements, now = Date.now()) {
	const since = now - 3888e6;
	let total = 0;
	for (const m of movements) {
		if (m.itemId !== itemId || m.type !== "saida") continue;
		if (new Date(m.at).getTime() < since) continue;
		total += m.quantity;
	}
	return total / WINDOW_DAYS;
}
function daysUntilEmpty(item, movements, now = Date.now()) {
	const daily = avgDailyOut(item.id, movements, now);
	if (daily <= .02) return null;
	return item.quantity / daily;
}
function needsPurchase(item) {
	if (item.archived) return false;
	const s = stockStatus(item);
	return s === "esgotado" || s === "repor";
}
var SCHOOL_NAME = "Escola Profissional Raul Dória";
var SCHOOL_SHORT = "EPRD";
var SCHOOL_URL = "https://rauldoria.pt";
var SCHOOL_SITE_LABEL = "rauldoria.pt";
function schoolLabel$1(name) {
	const trimmed = name.trim();
	return trimmed.length > 0 ? trimmed : SCHOOL_NAME;
}
function applyQty(current, type, quantity) {
	if (type === "entrada") return current + quantity;
	if (type === "saida") return Math.max(0, current - quantity);
	return Math.max(0, quantity);
}
function normalizeItem(it) {
	return {
		...it,
		archived: Boolean(it.archived),
		archivedAt: it.archivedAt ?? null
	};
}
function normalizeMovement(mv) {
	return {
		...mv,
		department: mv.department ?? ""
	};
}
var useStockStore = create()(persist((set, get) => ({
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
			establishment: { name: establishment.name?.trim() ? establishment.name : SCHOOL_NAME },
			hydrated: true
		});
	},
	setEstablishmentName: (name) => set({ establishment: { name: name.trim() || "Escola Profissional Raul Dória" } }),
	clearAll: () => {
		set({
			items: [],
			movements: [],
			drafts: {},
			introDismissed: false
		});
	},
	dismissIntro: () => set({ introDismissed: true }),
	addItem: (input) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const id = input.id ?? uid("item");
		set({ items: [{
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
			updatedAt: now
		}, ...get().items] });
		return id;
	},
	updateItem: (id, patch) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		set({ items: get().items.map((it) => it.id === id ? {
			...it,
			...patch,
			name: patch.name?.trim() ?? it.name,
			location: patch.location?.trim() ?? it.location,
			supplier: patch.supplier?.trim() ?? it.supplier,
			notes: patch.notes?.trim() ?? it.notes,
			updatedAt: now
		} : it) });
	},
	archiveItem: (id) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const drafts = { ...get().drafts };
		delete drafts[id];
		set({
			items: get().items.map((it) => it.id === id ? {
				...it,
				archived: true,
				archivedAt: now,
				updatedAt: now
			} : it),
			drafts
		});
	},
	restoreItem: (id) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		set({ items: get().items.map((it) => it.id === id ? {
			...it,
			archived: false,
			archivedAt: null,
			updatedAt: now
		} : it) });
	},
	deleteItem: (id) => {
		set({
			items: get().items.filter((it) => it.id !== id),
			movements: get().movements.filter((mv) => mv.itemId !== id),
			drafts: Object.fromEntries(Object.entries(get().drafts).filter(([key]) => key !== id))
		});
	},
	addMovement: ({ itemId, type, quantity, reason, department, note }) => {
		const item = get().items.find((it) => it.id === itemId);
		if (!item || item.archived || quantity <= 0) return;
		const resultingQty = applyQty(item.quantity, type, quantity);
		const mv = {
			id: uid("mv"),
			itemId,
			type,
			quantity,
			reason,
			department: department?.trim() ?? "",
			note: note?.trim() ?? "",
			at: (/* @__PURE__ */ new Date()).toISOString(),
			resultingQty
		};
		set({
			items: get().items.map((it) => it.id === itemId ? {
				...it,
				quantity: resultingQty,
				updatedAt: mv.at
			} : it),
			movements: [mv, ...get().movements]
		});
	},
	setDraft: (itemId, patch) => {
		const prev = get().drafts[itemId] ?? {
			qty: 0,
			checked: true
		};
		set({ drafts: {
			...get().drafts,
			[itemId]: {
				...prev,
				...patch
			}
		} });
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
				note: "Registo a partir da lista de compras"
			});
			count += 1;
		}
		const drafts = { ...get().drafts };
		for (const id of itemIds) delete drafts[id];
		set({ drafts });
		return count;
	}
}), {
	name: "reabastece-eprd-v5",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({
		establishment: state.establishment,
		items: state.items,
		movements: state.movements,
		drafts: state.drafts,
		introDismissed: state.introDismissed
	})
}));
function useActiveItems() {
	const items = useStockStore((s) => s.items);
	return (0, import_react.useMemo)(() => items.filter((it) => !it.archived), [items]);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-pine text-pine-fg shadow-sm hover:bg-pine-deep",
			secondary: "bg-surface-2 text-ink hover:bg-line",
			outline: "border border-line bg-surface text-ink hover:bg-surface-2",
			ghost: "text-ink hover:bg-surface-2",
			danger: "bg-danger text-pine-fg hover:bg-danger/90",
			link: "text-pine underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-md px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var SelectField = import_react.forwardRef(({ className, children, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		ref,
		className: cn("flex h-11 w-full appearance-none rounded-lg border border-line bg-surface bg-[length:12px] bg-[right_12px_center] bg-no-repeat px-3 pr-9 text-sm text-ink shadow-sm", "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b675f%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/35 focus-visible:border-pine", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children
	});
});
SelectField.displayName = "SelectField";
function money(value) {
	return new Intl.NumberFormat("pt-PT", {
		style: "currency",
		currency: "EUR"
	}).format(value);
}
function qty(value, unit) {
	const n = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 2 }).format(value);
	return unit ? `${n} ${unit}` : n;
}
function formatDate(iso) {
	return format(new Date(iso), "d MMM yyyy", { locale: pt });
}
function formatDateTime(iso) {
	return format(new Date(iso), "d MMM yyyy, HH:mm", { locale: pt });
}
function daysLabel(days) {
	if (days < 1) return "hoje / amanhã";
	if (days < 1.5) return "1 dia";
	return `${Math.round(days)} dias`;
}
var schoolLabel = schoolLabel$1;
function EprdMark({ className, title = "Escola Profissional Raul Dória" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/eprd-logo.png",
		alt: title,
		className: cn("h-8 w-auto select-none object-contain object-left", className)
	});
}
function EprdBadge({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-pine", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/eprd-logo.png",
			alt: "",
			className: "h-4 w-auto select-none object-contain"
		})
	});
}
//#endregion
export { suggestedReorder as C, stockStatus as S, useStockStore as T, needsPurchase as _, SCHOOL_SHORT as a, statusLabel as b, SelectField as c, cn as d, daysLabel as f, money as g, formatDateTime as h, SCHOOL_NAME as i, avgDailyOut as l, formatDate as m, EprdBadge as n, SCHOOL_SITE_LABEL as o, daysUntilEmpty as p, EprdMark as r, SCHOOL_URL as s, Button as t, buttonVariants as u, qty as v, useActiveItems as w, stockFill as x, schoolLabel as y };
