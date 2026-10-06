import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { T as useStockStore, a as SCHOOL_SHORT, o as SCHOOL_SITE_LABEL, r as EprdMark, s as SCHOOL_URL, t as Button } from "./eprd-mark-atiruvtQ.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intro-banner-oM29tODC.js
var import_jsx_runtime = require_jsx_runtime();
function IntroBanner() {
	const dismissed = useStockStore((s) => s.introDismissed);
	const dismiss = useStockStore((s) => s.dismissIntro);
	if (dismissed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex gap-3 rounded-xl bg-pine px-4 py-3 text-pine-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 hidden sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EprdMark, {
					className: "h-7",
					title: ""
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Economato da Escola Profissional Raul Dória"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-sm text-pine-fg/75",
						children: [
							"Começa em Consumíveis: adiciona os artigos da ",
							SCHOOL_SHORT,
							", define o stock mínimo, e o Reabastece avisa antes de faltar."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: SCHOOL_URL,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-2 inline-block text-sm font-medium text-gold underline underline-offset-2",
						children: SCHOOL_SITE_LABEL
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				className: "shrink-0 text-pine-fg hover:bg-white/10 hover:text-pine-fg",
				onClick: dismiss,
				"aria-label": "Fechar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})
		]
	});
}
//#endregion
export { IntroBanner as t };
