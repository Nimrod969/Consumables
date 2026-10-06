import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as stockStatus, T as useStockStore, _ as needsPurchase, a as SCHOOL_SHORT, f as daysLabel, g as money, p as daysUntilEmpty, t as Button, v as qty, w as useActiveItems } from "./eprd-mark-atiruvtQ.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowRight, a as ShoppingCart, d as Package, n as Wallet, p as Clock, r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { f as StatusBadge, n as useWorkspace, p as CATEGORIES } from "./router-CC1y-sBV.mjs";
import { t as IntroBanner } from "./intro-banner-oM29tODC.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BtVYpzdY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ADSX-Mo_.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const items = useActiveItems();
	const allItems = useStockStore((s) => s.items);
	const movements = useStockStore((s) => s.movements);
	const { openItem, openNew } = useWorkspace();
	const alerts = items.filter(needsPurchase).sort((a, b) => a.quantity - b.quantity || a.name.localeCompare(b.name, "pt"));
	const stockValue = items.reduce((sum, it) => sum + it.quantity * it.unitCost, 0);
	const empty = items.filter((it) => it.quantity <= 0).length;
	const forecast = items.map((it) => ({
		item: it,
		days: daysUntilEmpty(it, movements)
	})).filter((row) => row.days !== null).sort((a, b) => a.days - b.days).slice(0, 6);
	const byCategory = CATEGORIES.map((cat) => {
		const group = items.filter((it) => it.category === cat.id);
		return {
			label: cat.label.split(" ")[0] ?? cat.label,
			artigos: group.length,
			alertas: group.filter(needsPurchase).length
		};
	}).filter((row) => row.artigos > 0);
	const recent = [...movements].sort((a, b) => +new Date(b.at) - +new Date(a.at)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight md:text-4xl",
					children: "Painel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: items.length === 0 ? "Ainda sem artigos. Adiciona o primeiro no catálogo." : `Consumíveis da ${SCHOOL_SHORT} — o que está a acabar, e o que convém pedir já.`
				})] }), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: openNew,
					children: "Novo consumível"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/compras",
						children: ["Lista de compras", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: Package,
						label: "Artigos",
						value: String(items.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: TriangleAlert,
						label: "A repor",
						value: String(alerts.length),
						tone: alerts.length ? "warn" : "ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: ShoppingCart,
						label: "Esgotados",
						value: String(empty),
						tone: empty ? "danger" : "ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: Wallet,
						label: "Valor em stock",
						value: money(stockValue)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-5 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Alertas de reposição" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "pt-4",
						children: alerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: items.length === 0 ? "Ainda não há consumíveis. Adiciona o primeiro no catálogo." : "Nada em rutura. O stock está acima do mínimo."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-line",
							children: alerts.map((item) => {
								const status = stockStatus(item);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openItem(item),
									className: "flex w-full items-center gap-3 py-3 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted",
											children: [
												qty(item.quantity, item.unit),
												" · mínimo ",
												qty(item.minQuantity, item.unit)
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status })]
								}) }, item.id);
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-muted" }), "Previsão de rutura"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "pt-4",
						children: forecast.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Regista saídas durante uns dias para estimar quando cada artigo acaba."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-3",
							children: forecast.map(({ item, days }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => openItem(item),
									className: "truncate text-left text-sm font-medium hover:underline",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `shrink-0 text-sm tabular-nums ${days <= 7 ? "text-danger" : "text-muted"}`,
									children: daysLabel(days)
								})]
							}, item.id))
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-5 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-row items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Stock por categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-3 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-sm bg-pine" }), "artigos"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-sm bg-gold" }), "a repor"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "min-h-48 pt-4 text-muted md:h-64",
						children: byCategory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "As categorias aparecem quando adicionares artigos."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChart, { data: byCategory })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Últimos movimentos" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "pt-4",
						children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Ainda não há movimentos."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-3",
							children: recent.map((mv) => {
								const found = allItems.find((it) => it.id === mv.itemId);
								if (!found) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => openItem(found),
									className: "flex w-full items-start justify-between gap-3 py-0.5 text-left text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium",
											children: found.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted",
											children: [
												mv.type === "entrada" ? "Entrada" : mv.type === "saida" ? "Saída" : "Ajuste",
												" ",
												"· ",
												qty(mv.quantity, found.unit),
												mv.department ? ` · ${mv.department}` : ""
											]
										})]
									})
								}) }, mv.id);
							})
						})
					})]
				})]
			})
		]
	});
}
function Kpi({ icon: Icon, label, value, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "flex items-start gap-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 text-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-wide text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 text-xl font-medium tabular-nums tracking-tight ${tone === "warn" ? "text-warn" : tone === "danger" ? "text-danger" : tone === "ok" ? "text-pine" : "text-ink"}`,
			children: value
		})] })]
	}) });
}
function CategoryChart({ data }) {
	const max = Math.max(...data.map((d) => d.artigos), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden h-full min-w-0 items-end gap-3 md:flex",
		children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-40 w-full items-end justify-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-3 rounded-t-md bg-pine",
					style: { height: `${Math.max(8, d.artigos / max * 100)}%` },
					title: `${d.artigos} artigos`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-3 rounded-t-md bg-gold",
					style: { height: `${Math.max(d.alertas > 0 ? 8 : 0, d.alertas / max * 100)}%` },
					title: `${d.alertas} a repor`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-full truncate text-center text-[11px] leading-tight text-muted",
				children: d.label
			})]
		}, d.label))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 md:hidden",
		children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-[7.5rem] shrink-0 text-sm text-ink",
					children: d.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-full bg-pine",
						style: { width: `${Math.max(6, d.artigos / max * 100)}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-8 shrink-0 text-right text-sm tabular-nums",
					children: d.artigos
				}),
				d.alertas > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-6 shrink-0 text-right text-xs tabular-nums text-warn",
					children: d.alertas
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-6 shrink-0" })
			]
		}, d.label))
	})] });
}
//#endregion
export { Home as component };
