import { i as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { T as useStockStore, c as SelectField, d as cn, m as formatDate, t as Button, v as qty } from "./eprd-mark-atiruvtQ.mjs";
import { b as ArchiveRestore, i as Trash2, s as Search, u as Pencil, y as Archive } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as AlertDialogCancel, c as AlertDialogFooter, i as AlertDialogAction, l as AlertDialogHeader, m as Input, n as useWorkspace, o as AlertDialogContent, p as CATEGORIES, r as AlertDialog, s as AlertDialogDescription, u as AlertDialogTitle } from "./router-CC1y-sBV.mjs";
import { t as IntroBanner } from "./intro-banner-oM29tODC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/consumiveis-Cf3B8sKt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConsumiveisPage() {
	const items = useStockStore((s) => s.items);
	const archiveItem = useStockStore((s) => s.archiveItem);
	const restoreItem = useStockStore((s) => s.restoreItem);
	const deleteItem = useStockStore((s) => s.deleteItem);
	const { openNew, openEdit } = useWorkspace();
	const [q, setQ] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("todas");
	const [filter, setFilter] = (0, import_react.useState)("ativos");
	const [pendingArchive, setPendingArchive] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const archivedCount = items.filter((it) => it.archived).length;
	const activeCount = items.length - archivedCount;
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return items.filter((it) => {
			if (filter === "ativos" && it.archived) return false;
			if (filter === "arquivados" && !it.archived) return false;
			if (category !== "todas" && it.category !== category) return false;
			if (!query) return true;
			return it.name.toLowerCase().includes(query) || it.supplier.toLowerCase().includes(query) || it.location.toLowerCase().includes(query) || it.notes.toLowerCase().includes(query);
		}).sort((a, b) => {
			if (a.archived !== b.archived) return a.archived ? 1 : -1;
			return a.name.localeCompare(b.name, "pt");
		});
	}, [
		items,
		q,
		category,
		filter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight md:text-4xl",
					children: "Consumíveis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: "Catálogo do economato da EPRD. Adiciona artigos novos ou arquiva os que já não se usam."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-2 sm:grid-cols-[1fr_180px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						placeholder: "Procurar nome, local, fornecedor…",
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
				children: [
					{
						id: "ativos",
						label: `Em uso (${activeCount})`
					},
					{
						id: "arquivados",
						label: `Arquivados (${archivedCount})`
					},
					{
						id: "todos",
						label: "Todos"
					}
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f.id),
					className: cn("h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-colors duration-150", filter === f.id ? "bg-pine text-pine-fg" : "bg-surface-2 text-muted hover:text-ink"),
					children: f.label
				}, f.id))
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: filter === "arquivados" ? "Nenhum consumível arquivado" : "Nenhum consumível neste filtro"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: filter === "arquivados" ? "Quando um artigo deixar de se usar, arquiva-o em vez de o apagar." : "Adiciona o primeiro artigo ao catálogo."
					}),
					filter !== "arquivados" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						onClick: openNew,
						children: "Novo consumível"
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3",
				children: filtered.map((item) => {
					const categoryLabel = CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: item.name
										}), item.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted",
											children: "Arquivado"
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: [
											categoryLabel,
											item.location ? ` · ${item.location}` : "",
											item.archived ? item.archivedAt ? ` · desde ${formatDate(item.archivedAt)}` : "" : ` · ${qty(item.quantity, item.unit)} em stock`
										]
									}),
									item.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-subtle",
										children: item.notes
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => openEdit(item),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), "Editar"]
								}), item.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "secondary",
									size: "sm",
									onClick: () => {
										restoreItem(item.id);
										toast.success(`«${item.name}» voltou ao stock.`);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, {}), "Restaurar"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-danger",
									onClick: () => setPendingDelete(item),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Apagar"]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "secondary",
									size: "sm",
									onClick: () => setPendingArchive(item),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {}), "Arquivar"]
								})]
							})]
						})
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingArchive,
				onOpenChange: (o) => !o && setPendingArchive(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Arquivar consumível?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: pendingArchive ? `«${pendingArchive.name}» sai do stock, dos alertas e da lista de compras. O histórico fica guardado — podes restaurá-lo mais tarde.` : null })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						if (!pendingArchive) return;
						archiveItem(pendingArchive.id);
						toast.success("Consumível arquivado.");
						setPendingArchive(null);
					},
					children: "Arquivar"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingDelete,
				onOpenChange: (o) => !o && setPendingDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Apagar em definitivo?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: pendingDelete ? `«${pendingDelete.name}» e o respetivo histórico saem da aplicação. Esta ação não se desfaz.` : null })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-danger text-pine-fg hover:bg-danger/90",
					onClick: () => {
						if (!pendingDelete) return;
						deleteItem(pendingDelete.id);
						toast.success("Consumível apagado.");
						setPendingDelete(null);
					},
					children: "Apagar"
				})] })] })
			})
		]
	});
}
//#endregion
export { ConsumiveisPage as component };
