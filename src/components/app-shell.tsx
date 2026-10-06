import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardList,
  LayoutGrid,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EprdBadge, EprdMark } from "@/components/eprd-mark";
import { useWorkspace } from "@/components/workspace";
import { useActiveItems, useStockStore } from "@/lib/store";
import { needsPurchase } from "@/lib/status";
import { schoolLabel } from "@/lib/format";
import { SCHOOL_SHORT, SCHOOL_SITE_LABEL, SCHOOL_URL } from "@/lib/school";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Painel", short: "Painel", icon: LayoutGrid },
  { to: "/stock", label: "Stock", short: "Stock", icon: Package },
  { to: "/consumiveis", label: "Consumíveis", short: "Catálogo", icon: Boxes },
  { to: "/compras", label: "Compras", short: "Compras", icon: ShoppingCart },
  { to: "/historico", label: "Histórico", short: "Histórico", icon: ClipboardList },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { openNew, openSettings } = useWorkspace();
  const establishment = useStockStore((s) => s.establishment);
  const items = useActiveItems();
  const alerts = items.filter(needsPurchase).length;
  const label = schoolLabel(establishment.name);

  return (
    <div className="min-h-dvh bg-bg text-ink lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="no-print hidden bg-pine text-pine-fg lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-6 pt-8 pb-6">
          <EprdMark className="h-9" />
          <p className="mt-5 font-display text-3xl italic tracking-tight">Reabastece</p>
          <p className="mt-1 text-sm text-gold">Economato · {SCHOOL_SHORT}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 pt-5">
          {NAV.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150",
                  active
                    ? "bg-white/10 text-pine-fg"
                    : "text-pine-fg/70 hover:bg-white/5 hover:text-pine-fg",
                )}
              >
                {active ? (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold" />
                ) : null}
                <Icon className={cn("size-4", active ? "text-gold" : "")} />
                {item.label}
                {item.to === "/compras" && alerts > 0 ? (
                  <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-xs font-medium text-gold-fg tabular-nums">
                    {alerts}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-4 pb-6 pt-4">
          <button
            type="button"
            onClick={openSettings}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-pine-fg/80 hover:bg-white/5 hover:text-pine-fg"
          >
            <Settings className="size-4" />
            <span className="truncate">{label}</span>
          </button>
          <a
            href={SCHOOL_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block truncate px-2 py-1 text-xs text-pine-fg/50 hover:text-gold"
          >
            {SCHOOL_SHORT} · {SCHOOL_SITE_LABEL}
          </a>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col overflow-x-hidden pb-20 lg:pb-0">
        <header className="no-print sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur-sm lg:px-8">
          <EprdBadge className="lg:hidden" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl italic tracking-tight lg:hidden">Reabastece</p>
            <p className="truncate text-sm text-muted">{label}</p>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={openSettings} aria-label="Definições">
            <Settings />
          </Button>
          <Button onClick={openNew} size="sm" className="hidden sm:inline-flex">
            <Plus />
            Novo artigo
          </Button>
          <Button onClick={openNew} size="icon" className="sm:hidden" aria-label="Novo artigo">
            <Plus />
          </Button>
        </header>
        <main className="flex-1 px-4 py-5 lg:px-8 lg:py-7">{children}</main>
      </div>

      <nav className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
        {NAV.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium leading-tight",
                active ? "text-pine" : "text-muted",
              )}
            >
              <span className="relative">
                <Icon className={cn("size-5", active ? "text-pine" : "")} />
                {item.to === "/compras" && alerts > 0 ? (
                  <span className="absolute -right-2 -top-1 size-2 rounded-full bg-gold" />
                ) : null}
              </span>
              {item.short}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
