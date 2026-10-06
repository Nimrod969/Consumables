import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import { IntroBanner } from "@/components/intro-banner";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SelectField } from "@/components/ui/select-field";
import { useWorkspace } from "@/components/workspace";
import { qty } from "@/lib/format";
import { needsPurchase, stockFill, stockStatus } from "@/lib/status";
import { useActiveItems } from "@/lib/store";
import { CATEGORIES, type StockStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stock")({ component: StockPage });

const STATUS_FILTERS: { id: "todos" | StockStatus; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "esgotado", label: "Esgotados" },
  { id: "repor", label: "A repor" },
  { id: "vigiar", label: "A vigiar" },
  { id: "ok", label: "OK" },
];

function StockPage() {
  const items = useActiveItems();
  const { openItem, openMove, openNew } = useWorkspace();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("todas");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]["id"]>("todos");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items
      .filter((it) => {
        if (category !== "todas" && it.category !== category) return false;
        const st = stockStatus(it);
        if (status !== "todos" && st !== status) return false;
        if (!query) return true;
        return (
          it.name.toLowerCase().includes(query) ||
          it.supplier.toLowerCase().includes(query) ||
          it.location.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        const rank = { esgotado: 0, repor: 1, vigiar: 2, ok: 3 };
        const d = rank[stockStatus(a)] - rank[stockStatus(b)];
        return d !== 0 ? d : a.name.localeCompare(b.name, "pt");
      });
  }, [items, q, category, status]);

  return (
    <div className="mx-auto max-w-6xl">
      <IntroBanner />
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">Stock</h1>
          <p className="mt-1 text-muted">
            {filtered.length} {filtered.length === 1 ? "artigo" : "artigos"}
            {status === "todos" && items.some(needsPurchase)
              ? ` · ${items.filter(needsPurchase).length} a repor`
              : null}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/consumiveis">Gerir catálogo</Link>
        </Button>
      </div>

      <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_160px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <Input
            className="pl-9"
            placeholder="Procurar nome, fornecedor ou local…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <SelectField value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="todas">Todas as categorias</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setStatus(f.id)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-colors duration-150",
              status === f.id ? "bg-pine text-pine-fg" : "bg-surface-2 text-muted hover:text-ink",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]">
          <p className="font-medium">Nenhum artigo neste filtro</p>
          <p className="mt-1 text-sm text-muted">Ajusta a pesquisa ou adiciona um consumível novo.</p>
          <Button className="mt-4" onClick={openNew}>
            Novo artigo
          </Button>
        </div>
      ) : (
        <ul className="grid gap-3">
          {filtered.map((item) => {
            const statusNow = stockStatus(item);
            const fill = stockFill(item);
            const bar =
              statusNow === "esgotado" || statusNow === "repor"
                ? "bg-danger"
                : statusNow === "vigiar"
                  ? "bg-warn"
                  : "bg-pine";
            const categoryLabel =
              CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;
            return (
              <li
                key={item.id}
                className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{item.name}</p>
                      <StatusBadge status={statusNow} />
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {categoryLabel}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    <div className="mt-3 max-w-md">
                      <div className="mb-1 flex justify-between text-xs text-muted">
                        <span className="tabular-nums">
                          {qty(item.quantity, item.unit)}
                        </span>
                        <span className="tabular-nums">mín. {qty(item.minQuantity, item.unit)}</span>
                      </div>
                      <Progress value={fill} barClassName={bar} />
                    </div>
                  </button>
                  <div className="flex gap-2 sm:flex-col lg:flex-row">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openMove(item, "saida")}
                    >
                      <ArrowUpRight />
                      Saída
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => openMove(item, "entrada")}>
                      <ArrowDownLeft />
                      Entrada
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
