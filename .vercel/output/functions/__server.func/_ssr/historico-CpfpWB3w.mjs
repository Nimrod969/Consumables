import { i as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { T as useStockStore, c as SelectField, h as formatDateTime, v as qty } from "./eprd-mark-atiruvtQ.mjs";
import { t as IntroBanner } from "./intro-banner-oM29tODC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/historico-CpfpWB3w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HistoricoPage() {
	const items = useStockStore((s) => s.items);
	const movements = useStockStore((s) => s.movements);
	const [type, setType] = (0, import_react.useState)("todos");
	const [itemId, setItemId] = (0, import_react.useState)("todos");
	const filtered = (0, import_react.useMemo)(() => {
		return [...movements].filter((mv) => type === "todos" ? true : mv.type === type).filter((mv) => itemId === "todos" ? true : mv.itemId === itemId).sort((a, b) => +new Date(b.at) - +new Date(a.at));
	}, [
		movements,
		type,
		itemId
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight md:text-4xl",
					children: "Histórico"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: "Entradas, saídas e ajustes de inventário."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
					value: type,
					onChange: (e) => setType(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "todos",
							children: "Todos os tipos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "entrada",
							children: "Entradas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "saida",
							children: "Saídas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "ajuste",
							children: "Ajustes"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
					value: itemId,
					onChange: (e) => setItemId(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "todos",
						children: "Todos os artigos"
					}), items.slice().sort((a, b) => a.name.localeCompare(b.name, "pt")).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: it.id,
						children: it.archived ? `${it.name} (arquivado)` : it.name
					}, it.id))]
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Sem movimentos neste filtro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Regista uma entrada ou saída a partir do stock."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative border-l border-line pl-5",
				children: filtered.map((mv) => {
					const item = items.find((it) => it.id === mv.itemId);
					const label = mv.type === "entrada" ? "Entrada" : mv.type === "saida" ? "Saída" : "Ajuste";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -left-1.5 mt-1.5 size-3 rounded-full ${mv.type === "entrada" ? "bg-pine" : mv.type === "saida" ? "bg-warn" : "bg-muted"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle tabular-nums",
								children: formatDateTime(mv.at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-medium",
								children: [
									label,
									" · ",
									item ? qty(mv.quantity, item.unit) : mv.quantity
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									item ? `${item.name}${item.archived ? " (arquivado)" : ""}` : "Artigo removido",
									" ",
									"· ",
									mv.reason,
									mv.department ? ` · ${mv.department}` : "",
									mv.note ? ` · ${mv.note}` : ""
								]
							})
						]
					}, mv.id);
				})
			})
		]
	});
}
//#endregion
export { HistoricoPage as component };
