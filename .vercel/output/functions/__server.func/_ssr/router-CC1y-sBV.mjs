import { i as __toESM } from "../_runtime.mjs";
import { a as Overlay2, b as require_react, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose, y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { S as stockStatus, T as useStockStore, _ as needsPurchase, a as SCHOOL_SHORT, b as statusLabel, c as SelectField, d as cn, f as daysLabel, g as money, h as formatDateTime, i as SCHOOL_NAME, l as avgDailyOut, n as EprdBadge, o as SCHOOL_SITE_LABEL, p as daysUntilEmpty, r as EprdMark, s as SCHOOL_URL, t as Button, u as buttonVariants, v as qty, w as useActiveItems, x as stockFill, y as schoolLabel } from "./eprd-mark-atiruvtQ.mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ShoppingCart, b as ArchiveRestore, d as Package, f as LayoutGrid, g as ArrowUpRight, h as Boxes, i as Trash2, l as Plus, m as ClipboardList, o as Settings, r as TriangleAlert, t as X, u as Pencil, v as ArrowDownLeft, y as Archive } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CC1y-sBV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function StoreProvider({ children }) {
	(0, import_react.useEffect)(() => {
		Promise.resolve(useStockStore.persist.rehydrate()).then(() => {
			useStockStore.getState().ensureSeed();
		});
	}, []);
	return children;
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-1.5rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl bg-surface p-5 text-ink shadow-lg", "max-h-[90dvh] overflow-y-auto", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 rounded-md p-2 text-muted hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/35",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Fechar"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-xl font-medium tracking-tight text-ink", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink shadow-sm transition-[box-shadow,border-color] duration-150 placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/35 focus-visible:border-pine", "disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium text-ink leading-none", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink shadow-sm transition-[box-shadow,border-color] duration-150 placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/35 focus-visible:border-pine", "disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var CATEGORIES = [
	{
		id: "papelaria",
		label: "Papelaria"
	},
	{
		id: "informatica",
		label: "Informática"
	},
	{
		id: "limpeza",
		label: "Limpeza"
	},
	{
		id: "copa",
		label: "Copa e bar"
	},
	{
		id: "saude",
		label: "Saúde e higiene"
	},
	{
		id: "laboratorio",
		label: "Laboratório"
	},
	{
		id: "desporto",
		label: "Desporto"
	},
	{
		id: "manutencao",
		label: "Manutenção"
	}
];
var UNITS = [
	"un",
	"cx",
	"pack",
	"resma",
	"rolo",
	"fardo",
	"L",
	"kg",
	"garrafa"
];
var MOVEMENT_REASONS = [
	"Compra / reposição",
	"Consumo diário",
	"Aula / atividade",
	"Evento da escola",
	"Inventário",
	"Perda / danificado",
	"Transferência",
	"Outro"
];
var DEPARTMENTS = [
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
	"Outro"
];
var empty = {
	name: "",
	category: "papelaria",
	unit: "un",
	quantity: "0",
	minQuantity: "2",
	reorderQty: "4",
	location: "",
	supplier: "",
	unitCost: "0",
	notes: ""
};
function fromItem(item) {
	return {
		name: item.name,
		category: item.category,
		unit: item.unit,
		quantity: String(item.quantity),
		minQuantity: String(item.minQuantity),
		reorderQty: String(item.reorderQty),
		location: item.location,
		supplier: item.supplier,
		unitCost: String(item.unitCost),
		notes: item.notes
	};
}
function ItemFormDialog({ open, onOpenChange, item }) {
	const addItem = useStockStore((s) => s.addItem);
	const updateItem = useStockStore((s) => s.updateItem);
	const [form, setForm] = (0, import_react.useState)(empty);
	(0, import_react.useEffect)(() => {
		if (open) setForm(item ? fromItem(item) : empty);
	}, [open, item]);
	function set(key, value) {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
	}
	function submit(e) {
		e.preventDefault();
		const name = form.name.trim();
		if (name.length < 2) {
			toast.error("Indica o nome do consumível.");
			return;
		}
		const payload = {
			name,
			category: form.category,
			unit: form.unit,
			quantity: Number(form.quantity) || 0,
			minQuantity: Number(form.minQuantity) || 0,
			reorderQty: Number(form.reorderQty) || 0,
			location: form.location,
			supplier: form.supplier,
			unitCost: Number(form.unitCost) || 0,
			notes: form.notes
		};
		if (item) {
			updateItem(item.id, payload);
			toast.success("Artigo atualizado.");
		} else {
			addItem(payload);
			toast.success("Artigo adicionado ao stock.");
		}
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: item ? "Editar artigo" : "Novo consumível" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Define o stock mínimo — o Reabastece avisa assim que chegar a esse valor." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.name,
								onChange: (e) => set("name", e.target.value),
								placeholder: "ex. Papel A4 80g",
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Categoria",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
									value: form.category,
									onChange: (e) => set("category", e.target.value),
									children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c.id,
										children: c.label
									}, c.id))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Unidade",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
									value: form.unit,
									onChange: (e) => set("unit", e.target.value),
									children: UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: u,
										children: u
									}, u))
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Stock atual",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										step: "0.01",
										value: form.quantity,
										onChange: (e) => set("quantity", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Mínimo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										step: "0.01",
										value: form.minQuantity,
										onChange: (e) => set("minQuantity", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "A pedir",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										step: "0.01",
										value: form.reorderQty,
										onChange: (e) => set("reorderQty", e.target.value)
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Localização",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.location,
									onChange: (e) => set("location", e.target.value),
									placeholder: "Armazém, copa…"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Fornecedor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.supplier,
									onChange: (e) => set("supplier", e.target.value),
									placeholder: "Nome do fornecedor"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Custo unitário (€)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: "0.01",
								value: form.unitCost,
								onChange: (e) => set("unitCost", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Notas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: form.notes,
								onChange: (e) => set("notes", e.target.value),
								placeholder: "Referência, validade, observações…"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: item ? "Guardar" : "Adicionar"
				})] })
			]
		}) })
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-surface-2 text-ink",
		pine: "bg-ok-bg text-ok",
		gold: "bg-gold-bg text-gold-fg",
		warn: "bg-warn-bg text-warn",
		danger: "bg-danger-bg text-danger",
		muted: "bg-surface-2 text-muted",
		outline: "border border-line text-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var variant = {
	esgotado: "danger",
	repor: "warn",
	vigiar: "muted",
	ok: "pine"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: variant[status],
		children: statusLabel(status)
	});
}
function Progress({ value, className, barClassName }) {
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full bg-pine transition-[width] duration-300 ease-out", barClassName),
			style: { width: `${pct}%` }
		})
	});
}
var Sheet = Dialog$1;
var SheetPortal = DialogPortal$1;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-ink/40", className),
	...props
}));
SheetOverlay.displayName = DialogOverlay$1.displayName;
var SheetContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-surface text-ink shadow-xl", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 rounded-md p-2 text-muted hover:bg-surface-2 hover:text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Fechar"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent$1.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 border-b border-line p-5 pr-12", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function SheetBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex-1 overflow-y-auto p-5", className),
		...props
	});
}
function SheetFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border-t border-line p-4", className),
		...props
	});
}
function ItemSheet({ item, onOpenChange, onEdit, onMove, onArchive, onRestore, onDelete }) {
	const movements = useStockStore((s) => s.movements);
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: false,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {})
	});
	const status = stockStatus(item);
	const category = CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;
	const history = movements.filter((m) => m.itemId === item.id).slice(0, 8);
	const days = daysUntilEmpty(item, movements);
	const daily = avgDailyOut(item.id, movements);
	const fill = stockFill(item);
	const bar = status === "esgotado" || status === "repor" ? "bg-danger" : status === "vigiar" ? "bg-warn" : "bg-pine";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: !!item,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [item.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted",
						children: "Arquivado"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: category
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: item.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [
					item.location || "Sem localização",
					" · ",
					item.supplier || "Sem fornecedor"
				] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetBody, {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-medium tabular-nums tracking-tight",
							children: qty(item.quantity, item.unit)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								"mínimo ",
								qty(item.minQuantity, item.unit),
								" · pedido típico",
								" ",
								qty(item.reorderQty, item.unit)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: fill,
							className: "mt-3",
							barClassName: bar
						}),
						item.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Fora do stock ativo. Restaura se voltar a ser usado na EPRD."
						}) : days !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								"Ao ritmo atual (~",
								qty(daily, item.unit),
								"/dia) acaba em",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-ink",
									children: daysLabel(days)
								}),
								"."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Ainda sem consumo recente para estimar a rutura."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Custo unitário",
								value: money(item.unitCost)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Valor em stock",
								value: money(item.unitCost * item.quantity)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Atualizado",
								value: formatDateTime(item.updatedAt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								label: "Notas",
								value: item.notes || "—"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Movimentos recentes"
					}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Ainda não há movimentos neste artigo."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 divide-y divide-line",
						children: history.map((mv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-3 py-2.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									mv.type === "entrada" ? "Entrada" : mv.type === "saida" ? "Saída" : "Ajuste",
									" ",
									"· ",
									qty(mv.quantity, item.unit)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted",
								children: [mv.reason, mv.department ? ` · ${mv.department}` : ""]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-xs text-subtle tabular-nums",
								children: formatDateTime(mv.at)
							})]
						}, mv.id))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFooter, {
				className: "grid grid-cols-2 gap-2",
				children: item.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					onClick: () => onRestore(item),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, {}), "Restaurar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "text-danger",
					onClick: () => onDelete(item),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Apagar"]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => onMove(item, "saida"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {}), "Saída"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => onMove(item, "entrada"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, {}), "Entrada"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => onEdit(item),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), "Editar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => onArchive(item),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {}), "Arquivar"]
					})
				] })
			})
		] })
	});
}
function Info({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-bg px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-0.5 font-medium",
			children: value
		})]
	});
}
function MovementDialog({ open, onOpenChange, item, type }) {
	const addMovement = useStockStore((s) => s.addMovement);
	const [quantity, setQuantity] = (0, import_react.useState)("1");
	const [reason, setReason] = (0, import_react.useState)(type === "entrada" ? "Compra / reposição" : "Consumo diário");
	const [department, setDepartment] = (0, import_react.useState)("Secretaria");
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setQuantity(type === "ajuste" && item ? String(item.quantity) : "1");
		setReason(type === "entrada" ? "Compra / reposição" : "Consumo diário");
		setDepartment("Secretaria");
		setNote("");
	}, [
		open,
		type,
		item
	]);
	const titles = {
		entrada: "Entrada de stock",
		saida: "Saída / consumo",
		ajuste: "Ajuste de inventário"
	};
	function submit(e) {
		e.preventDefault();
		if (!item) return;
		const n = Number(quantity);
		if (!Number.isFinite(n) || n < 0 || type !== "ajuste" && n <= 0) {
			toast.error("Indica uma quantidade válida.");
			return;
		}
		if (type === "saida" && n > item.quantity) {
			toast.error(`Só existem ${qty(item.quantity, item.unit)} em stock.`);
			return;
		}
		addMovement({
			itemId: item.id,
			type,
			quantity: n,
			reason,
			department,
			note
		});
		toast.success(type === "entrada" ? "Entrada registada." : type === "saida" ? "Saída registada." : "Stock ajustado.");
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: titles[type] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					item.name,
					" · atual ",
					qty(item.quantity, item.unit)
				] }) : null })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: type === "ajuste" ? "Nova quantidade" : "Quantidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: "0.01",
								value: quantity,
								onChange: (e) => setQuantity(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Motivo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								value: reason,
								onChange: (e) => setReason(e.target.value),
								children: MOVEMENT_REASONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: r,
									children: r
								}, r))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Setor / curso" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								value: department,
								onChange: (e) => setDepartment(e.target.value),
								children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d,
									children: d
								}, d))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nota (opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: note,
								onChange: (e) => setNote(e.target.value),
								placeholder: "Quem, turma, fatura…"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Registar"
				})] })
			]
		}) })
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	ref,
	className: cn("fixed inset-0 z-50 bg-ink/40", className),
	...props
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl bg-surface p-5 text-ink shadow-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("font-display text-xl font-medium", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function SettingsDialog({ open, onOpenChange }) {
	const establishment = useStockStore((s) => s.establishment);
	const setName = useStockStore((s) => s.setEstablishmentName);
	const clearAll = useStockStore((s) => s.clearAll);
	const [name, setLocalName] = (0, import_react.useState)(establishment.name);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	function save() {
		setName(name);
		toast.success("Nome atualizado.");
		onOpenChange(false);
	}
	function empty() {
		clearAll();
		setConfirmClear(false);
		toast.success("Economato esvaziado.");
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (next) setLocalName(useStockStore.getState().establishment.name);
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Economato" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				"Gestão de consumíveis da ",
				SCHOOL_NAME,
				", no Porto. Podes ajustar o nome que aparece no cabeçalho."
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setLocalName(e.target.value),
							placeholder: SCHOOL_NAME
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Site da escola:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: SCHOOL_URL,
								target: "_blank",
								rel: "noreferrer",
								className: "font-medium text-pine underline underline-offset-2",
								children: SCHOOL_SITE_LABEL
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Esvaziar dados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Apaga todos os artigos, movimentos e a lista de compras. Não dá para desfazer."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "text-danger",
								onClick: () => setConfirmClear(true),
								children: "Esvaziar economato"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Fechar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				children: "Guardar nome"
			})] })
		] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: confirmClear,
		onOpenChange: setConfirmClear,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Esvaziar o economato?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Todos os consumíveis e o histórico desaparecem. Depois podes voltar a adicionar artigos no catálogo." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			className: "bg-danger text-pine-fg hover:bg-danger/90",
			onClick: empty,
			children: "Esvaziar"
		})] })] })
	})] });
}
var WorkspaceContext = (0, import_react.createContext)(null);
function useWorkspace() {
	const ctx = (0, import_react.useContext)(WorkspaceContext);
	if (!ctx) throw new Error("useWorkspace must be used within Workspace");
	return ctx;
}
function Workspace({ children }) {
	const archiveItem = useStockStore((s) => s.archiveItem);
	const restoreItem = useStockStore((s) => s.restoreItem);
	const deleteItem = useStockStore((s) => s.deleteItem);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const [moveItem, setMoveItem] = (0, import_react.useState)(null);
	const [moveType, setMoveType] = (0, import_react.useState)("saida");
	const [moveOpen, setMoveOpen] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [pendingArchive, setPendingArchive] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const api = (0, import_react.useMemo)(() => ({
		openNew: () => {
			setEditing(null);
			setFormOpen(true);
		},
		openEdit: (item) => {
			setEditing(item);
			setFormOpen(true);
		},
		openMove: (item, type) => {
			setMoveItem(item);
			setMoveType(type);
			setMoveOpen(true);
		},
		openItem: (item) => setDetail(item),
		openSettings: () => setSettingsOpen(true)
	}), []);
	const items = useStockStore((s) => s.items);
	const liveDetail = detail ? items.find((i) => i.id === detail.id) ?? null : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WorkspaceContext.Provider, {
		value: api,
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemFormDialog, {
				open: formOpen,
				onOpenChange: setFormOpen,
				item: editing
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovementDialog, {
				open: moveOpen,
				onOpenChange: setMoveOpen,
				item: moveItem,
				type: moveType
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemSheet, {
				item: liveDetail,
				onOpenChange: (open) => {
					if (!open) setDetail(null);
				},
				onEdit: (item) => {
					setEditing(item);
					setFormOpen(true);
				},
				onMove: (item, type) => {
					setMoveItem(item);
					setMoveType(type);
					setMoveOpen(true);
				},
				onArchive: (item) => setPendingArchive(item),
				onRestore: (item) => {
					restoreItem(item.id);
					toast.success(`«${item.name}» voltou ao stock.`);
				},
				onDelete: (item) => setPendingDelete(item)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {
				open: settingsOpen,
				onOpenChange: setSettingsOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingArchive,
				onOpenChange: (o) => !o && setPendingArchive(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Arquivar consumível?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: pendingArchive ? `«${pendingArchive.name}» sai do stock, dos alertas e da lista de compras. O histórico fica guardado.` : null })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						if (!pendingArchive) return;
						archiveItem(pendingArchive.id);
						setDetail(null);
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
						setDetail(null);
						toast.success("Artigo apagado.");
						setPendingDelete(null);
					},
					children: "Apagar"
				})] })] })
			})
		]
	});
}
var NAV = [
	{
		to: "/",
		label: "Painel",
		short: "Painel",
		icon: LayoutGrid
	},
	{
		to: "/stock",
		label: "Stock",
		short: "Stock",
		icon: Package
	},
	{
		to: "/consumiveis",
		label: "Consumíveis",
		short: "Catálogo",
		icon: Boxes
	},
	{
		to: "/compras",
		label: "Compras",
		short: "Compras",
		icon: ShoppingCart
	},
	{
		to: "/historico",
		label: "Histórico",
		short: "Histórico",
		icon: ClipboardList
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { openNew, openSettings } = useWorkspace();
	const establishment = useStockStore((s) => s.establishment);
	const alerts = useActiveItems().filter(needsPurchase).length;
	const label = schoolLabel(establishment.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink lg:grid lg:grid-cols-[240px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "no-print hidden bg-pine text-pine-fg lg:flex lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-white/10 px-6 pt-8 pb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EprdMark, { className: "h-9" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 font-display text-3xl italic tracking-tight",
								children: "Reabastece"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-gold",
								children: ["Economato · ", SCHOOL_SHORT]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1 px-3 pt-5",
						children: NAV.map((item) => {
							const active = pathname === item.to;
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("relative flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150", active ? "bg-white/10 text-pine-fg" : "text-pine-fg/70 hover:bg-white/5 hover:text-pine-fg"),
								children: [
									active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold" }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", active ? "text-gold" : "") }),
									item.label,
									item.to === "/compras" && alerts > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto rounded-full bg-gold px-2 py-0.5 text-xs font-medium text-gold-fg tabular-nums",
										children: alerts
									}) : null
								]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-white/10 px-4 pb-6 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: openSettings,
							className: "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-pine-fg/80 hover:bg-white/5 hover:text-pine-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: SCHOOL_URL,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-1 block truncate px-2 py-1 text-xs text-pine-fg/50 hover:text-gold",
							children: [
								SCHOOL_SHORT,
								" · ",
								SCHOOL_SITE_LABEL
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col overflow-x-hidden pb-20 lg:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "no-print sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur-sm lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EprdBadge, { className: "lg:hidden" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl italic tracking-tight lg:hidden",
								children: "Reabastece"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted",
								children: label
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "lg:hidden",
							onClick: openSettings,
							"aria-label": "Definições",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: openNew,
							size: "sm",
							className: "hidden sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo artigo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: openNew,
							size: "icon",
							className: "sm:hidden",
							"aria-label": "Novo artigo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-4 py-5 lg:px-8 lg:py-7",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden",
				children: NAV.map((item) => {
					const active = pathname === item.to;
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium leading-tight", active ? "text-pine" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-5", active ? "text-pine" : "") }), item.to === "/compras" && alerts > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-2 -top-1 size-2 rounded-full bg-gold" }) : null]
						}), item.short]
					}, item.to);
				})
			})
		]
	});
}
var styles_default = "/assets/styles-BVjLXBWT.css";
var APP_NAME = "Reabastece";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Economato da Escola Profissional Raul Dória — gestão de consumíveis com alerta antes de faltar."
			},
			{
				name: "theme-color",
				content: "#202F58"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,500;1,6..72,600&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				toastOptions: { className: "font-sans" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-ADSX-Mo_.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./compras-DeQo70ji.mjs");
var Route$3 = createFileRoute("/compras")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./consumiveis-Cf3B8sKt.mjs");
var Route$2 = createFileRoute("/consumiveis")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./historico-CpfpWB3w.mjs");
var Route$1 = createFileRoute("/historico")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./stock-BTRObTnM.mjs");
var Route = createFileRoute("/stock")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	ComprasRoute: Route$3.update({
		id: "/compras",
		path: "/compras",
		getParentRoute: () => Route$5
	}),
	ConsumiveisRoute: Route$2.update({
		id: "/consumiveis",
		path: "/consumiveis",
		getParentRoute: () => Route$5
	}),
	HistoricoRoute: Route$1.update({
		id: "/historico",
		path: "/historico",
		getParentRoute: () => Route$5
	}),
	StockRoute: Route.update({
		id: "/stock",
		path: "/stock",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { AlertDialogCancel as a, AlertDialogFooter as c, Progress as d, StatusBadge as f, AlertDialogAction as i, AlertDialogHeader as l, Input as m, useWorkspace as n, AlertDialogContent as o, CATEGORIES as p, AlertDialog as r, AlertDialogDescription as s, router_exports as t, AlertDialogTitle as u };
