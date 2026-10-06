import { i as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as stockStatus, _ as needsPurchase, c as SelectField, d as cn, t as Button, v as qty, w as useActiveItems, x as stockFill } from "./eprd-mark-atiruvtQ.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowUpRight, s as Search, v as ArrowDownLeft } from "../_libs/lucide-react.mjs";
import { d as Progress, f as StatusBadge, m as Input, n as useWorkspace, p as CATEGORIES } from "./router-CC1y-sBV.mjs";
import { t as IntroBanner } from "./intro-banner-oM29tODC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock-BTRObTnM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_FILTERS = [
	{
		id: "todos",
		label: "Todos"
	},
	{
		id: "esgotado",
		label: "Esgotados"
	},
	{
		id: "repor",
		label: "A repor"
	},
	{
		id: "vigiar",
		label: "A vigiar"
	},
	{
		id: "ok",
		label: "OK"
	}
];
function StockPage() {
	const items = useActiveItems();
	const { openItem, openMove, openNew } = useWorkspace();
	const [q, setQ] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("todas");
	const [status, setStatus] = (0, import_react.useState)("todos");
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return items.filter((it) => {
			if (category !== "todas" && it.category !== category) return false;
			const st = stockStatus(it);
			if (status !== "todos" && st !== status) return false;
			if (!query) return true;
			return it.name.toLowerCase().includes(query) || it.supplier.toLowerCase().includes(query) || it.location.toLowerCase().includes(query);
		}).sort((a, b) => {
			const rank = {
				esgotado: 0,
				repor: 1,
				vigiar: 2,
				ok: 3
			};
			const d = rank[stockStatus(a)] - rank[stockStatus(b)];
			return d !== 0 ? d : a.name.localeCompare(b.name, "pt");
		});
	}, [
		items,
		q,
		category,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight md:text-4xl",
					children: "Stock"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-muted",
					children: [
						filtered.length,
						" ",
						filtered.length === 1 ? "artigo" : "artigos",
						status === "todos" && items.some(needsPurchase) ? ` · ${items.filter(needsPurchase).length} a repor` : null
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/consumiveis",
						children: "Gerir catálogo"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-2 sm:grid-cols-[1fr_160px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						placeholder: "Procurar nome, fornecedor ou local…",
						value: q,
						onChange: (e) => setQ(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
					value: category,
					onChange: (e) => setCategory(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "todas",
						children: "Todas as categorias"
					}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.label
					}, c.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex gap-2 overflow-x-auto pb-1",
				children: STATUS_FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setStatus(f.id),
					className: cn("h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-colors duration-150", status === f.id ? "bg-pine text-pine-fg" : "bg-surface-2 text-muted hover:text-ink"),
					children: f.label
				}, f.id))
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Nenhum artigo neste filtro"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Ajusta a pesquisa ou adiciona um consumível novo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						onClick: openNew,
						children: "Novo artigo"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3",
				children: filtered.map((item) => {
					const statusNow = stockStatus(item);
					const fill = stockFill(item);
					const bar = statusNow === "esgotado" || statusNow === "repor" ? "bg-danger" : statusNow === "vigiar" ? "bg-warn" : "bg-pine";
					const categoryLabel = CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openItem(item),
								className: "min-w-0 flex-1 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: statusNow })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: [categoryLabel, item.location ? ` · ${item.location}` : ""]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 max-w-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-1 flex justify-between text-xs text-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums",
												children: qty(item.quantity, item.unit)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "tabular-nums",
												children: ["mín. ", qty(item.minQuantity, item.unit)]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											value: fill,
											barClassName: bar
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 sm:flex-col lg:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "flex-1",
									onClick: () => openMove(item, "saida"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {}), "Saída"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "flex-1",
									onClick: () => openMove(item, "entrada"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, {}), "Entrada"]
								})]
							})]
						})
					}, item.id);
				})
			})
		]
	});
}
//#endregion
export { StockPage as component };
