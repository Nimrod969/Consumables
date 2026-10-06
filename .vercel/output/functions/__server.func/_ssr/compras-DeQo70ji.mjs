import { i as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as suggestedReorder, S as stockStatus, T as useStockStore, _ as needsPurchase, g as money, t as Button, v as qty, w as useActiveItems, y as schoolLabel } from "./eprd-mark-atiruvtQ.mjs";
import { c as Printer } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as StatusBadge, m as Input, n as useWorkspace } from "./router-CC1y-sBV.mjs";
import { t as IntroBanner } from "./intro-banner-oM29tODC.mjs";
import { n as CardContent, t as Card } from "./card-BtVYpzdY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compras-DeQo70ji.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ComprasPage() {
	const items = useActiveItems();
	const drafts = useStockStore((s) => s.drafts);
	const setDraft = useStockStore((s) => s.setDraft);
	const applyPurchases = useStockStore((s) => s.applyPurchases);
	const establishment = useStockStore((s) => s.establishment);
	const { openItem } = useWorkspace();
	const rows = (0, import_react.useMemo)(() => {
		return items.filter(needsPurchase).map((item) => {
			const suggested = suggestedReorder(item);
			const draft = drafts[item.id];
			return {
				item,
				qty: draft?.qty && draft.qty > 0 ? draft.qty : suggested,
				checked: draft?.checked ?? true
			};
		}).sort((a, b) => a.item.quantity - b.item.quantity);
	}, [items, drafts]);
	const selected = rows.filter((r) => r.checked);
	const estimated = selected.reduce((sum, r) => sum + r.qty * r.item.unitCost, 0);
	function register() {
		const ids = selected.filter((r) => r.qty > 0).map((r) => r.item.id);
		if (ids.length === 0) {
			toast.error("Seleciona pelo menos um artigo com quantidade.");
			return;
		}
		const n = applyPurchases(ids);
		toast.success(n === 1 ? "Compra registada como entrada." : `${n} compras registadas como entradas.`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight md:text-4xl",
					children: "Lista de compras"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-muted",
					children: [
						"Gerada automaticamente a partir do stock mínimo",
						establishment.name ? ` de ${schoolLabel(establishment.name)}` : "",
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "no-print",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), "Imprimir"]
				})]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Nada a pedir"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Quando um artigo chegar ao stock mínimo, aparece aqui para pedires."
				})]
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "no-print mt-1 flex size-11 items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: row.checked,
								onChange: (e) => setDraft(row.item.id, {
									qty: row.qty,
									checked: e.target.checked
								}),
								className: "size-4 accent-pine"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "sr-only",
								children: ["Incluir ", row.item.name]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openItem(row.item),
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: row.item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: stockStatus(row.item) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										"Há ",
										qty(row.item.quantity, row.item.unit),
										" · mínimo",
										" ",
										qty(row.item.minQuantity, row.item.unit),
										row.item.supplier ? ` · ${row.item.supplier}` : ""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted",
											children: "Pedir"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 0,
											step: "0.01",
											className: "h-9 w-24",
											value: row.qty,
											onChange: (e) => setDraft(row.item.id, {
												checked: row.checked,
												qty: Number(e.target.value) || 0
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted",
											children: row.item.unit
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm tabular-nums text-muted",
									children: money(row.qty * row.item.unitCost)
								})]
							})]
						})]
					})
				}, row.item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-20 z-20 mt-5 overflow-hidden rounded-xl bg-pine text-pine-fg lg:bottom-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-pine-fg/70",
							children: [
								selected.length,
								" ",
								selected.length === 1 ? "artigo" : "artigos",
								" selecionados"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl tabular-nums",
							children: money(estimated)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "no-print bg-surface text-ink hover:bg-surface-2",
							onClick: register,
							disabled: selected.length === 0,
							children: "Marcar como comprado"
						})]
					})
				})]
			})] })
		]
	});
}
//#endregion
export { ComprasPage as component };
