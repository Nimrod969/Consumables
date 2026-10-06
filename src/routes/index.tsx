import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Clock, Package, ShoppingCart, Wallet } from "lucide-react";
import { IntroBanner } from "@/components/intro-banner";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspace } from "@/components/workspace";
import { daysLabel, money, qty } from "@/lib/format";
import { daysUntilEmpty, needsPurchase, stockStatus } from "@/lib/status";
import { useActiveItems, useStockStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/types";
import { SCHOOL_SHORT } from "@/lib/school";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const items = useActiveItems();
  const allItems = useStockStore((s) => s.items);
  const movements = useStockStore((s) => s.movements);
  const { openItem, openNew } = useWorkspace();

  const alerts = items
    .filter(needsPurchase)
    .sort((a, b) => a.quantity - b.quantity || a.name.localeCompare(b.name, "pt"));
  const stockValue = items.reduce((sum, it) => sum + it.quantity * it.unitCost, 0);
  const empty = items.filter((it) => it.quantity <= 0).length;

  const forecast = items
    .map((it) => ({ item: it, days: daysUntilEmpty(it, movements) }))
    .filter((row): row is { item: (typeof items)[number]; days: number } => row.days !== null)
    .sort((a, b) => a.days - b.days)
    .slice(0, 6);

  const byCategory = CATEGORIES.map((cat) => {
    const group = items.filter((it) => it.category === cat.id);
    return {
      label: cat.label.split(" ")[0] ?? cat.label,
      artigos: group.length,
      alertas: group.filter(needsPurchase).length,
    };
  }).filter((row) => row.artigos > 0);

  const recent = [...movements]
    .sort((a, b) => +new Date(b.at) - +new Date(a.at))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl">
      <IntroBanner />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">Painel</h1>
          <p className="mt-1 text-muted">
            {items.length === 0
              ? "Ainda sem artigos. Adiciona o primeiro no catálogo."
              : `Consumíveis da ${SCHOOL_SHORT} — o que está a acabar, e o que convém pedir já.`}
          </p>
        </div>
        {items.length === 0 ? (
          <Button onClick={openNew}>Novo consumível</Button>
        ) : (
          <Button asChild variant="outline">
            <Link to="/compras">
              Lista de compras
              <ArrowRight />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi icon={Package} label="Artigos" value={String(items.length)} />
        <Kpi
          icon={AlertTriangle}
          label="A repor"
          value={String(alerts.length)}
          tone={alerts.length ? "warn" : "ok"}
        />
        <Kpi
          icon={ShoppingCart}
          label="Esgotados"
          value={String(empty)}
          tone={empty ? "danger" : "ok"}
        />
        <Kpi icon={Wallet} label="Valor em stock" value={money(stockValue)} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Alertas de reposição</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {alerts.length === 0 ? (
              <p className="text-sm text-muted">
                {items.length === 0
                  ? "Ainda não há consumíveis. Adiciona o primeiro no catálogo."
                  : "Nada em rutura. O stock está acima do mínimo."}
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {alerts.map((item) => {
                  const status = stockStatus(item);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => openItem(item)}
                        className="flex w-full items-center gap-3 py-3 text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{item.name}</p>
                          <p className="text-sm text-muted">
                            {qty(item.quantity, item.unit)} · mínimo {qty(item.minQuantity, item.unit)}
                          </p>
                        </div>
                        <StatusBadge status={status} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-4 text-muted" />
              Previsão de rutura
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {forecast.length === 0 ? (
              <p className="text-sm text-muted">
                Regista saídas durante uns dias para estimar quando cada artigo acaba.
              </p>
            ) : (
              <ul className="grid gap-3">
                {forecast.map(({ item, days }) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => openItem(item)}
                      className="truncate text-left text-sm font-medium hover:underline"
                    >
                      {item.name}
                    </button>
                    <span
                      className={`shrink-0 text-sm tabular-nums ${days <= 7 ? "text-danger" : "text-muted"}`}
                    >
                      {daysLabel(days)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-end justify-between gap-3">
            <CardTitle>Stock por categoria</CardTitle>
            <p className="flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm bg-pine" />
                artigos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm bg-gold" />
                a repor
              </span>
            </p>
          </CardHeader>
          <CardContent className="min-h-48 pt-4 text-muted md:h-64">
            {byCategory.length === 0 ? (
              <p className="text-sm">As categorias aparecem quando adicionares artigos.</p>
            ) : (
              <CategoryChart data={byCategory} />
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Últimos movimentos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {recent.length === 0 ? (
              <p className="text-sm text-muted">Ainda não há movimentos.</p>
            ) : (
              <ul className="grid gap-3">
                {recent.map((mv) => {
                  const found = allItems.find((it) => it.id === mv.itemId);
                  if (!found) return null;
                  return (
                    <li key={mv.id}>
                      <button
                        type="button"
                        onClick={() => openItem(found)}
                        className="flex w-full items-start justify-between gap-3 py-0.5 text-left text-sm"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium">{found.name}</p>
                          <p className="text-muted">
                            {mv.type === "entrada" ? "Entrada" : mv.type === "saida" ? "Saída" : "Ajuste"}{" "}
                            · {qty(mv.quantity, found.unit)}
                            {mv.department ? ` · ${mv.department}` : ""}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: typeof Package;
  label: string;
  value: string;
  tone?: "default" | "warn" | "danger" | "ok";
}) {
  const toneClass =
    tone === "warn"
      ? "text-warn"
      : tone === "danger"
        ? "text-danger"
        : tone === "ok"
          ? "text-pine"
          : "text-ink";
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4">
        <span className="mt-0.5 text-muted">
          <Icon className="size-4" />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
          <p className={`mt-1 text-xl font-medium tabular-nums tracking-tight ${toneClass}`}>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryChart({
  data,
}: {
  data: { label: string; artigos: number; alertas: number }[];
}) {
  const max = Math.max(...data.map((d) => d.artigos), 1);
  return (
    <>
      <div className="hidden h-full min-w-0 items-end gap-3 md:flex">
        {data.map((d) => (
          <div key={d.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-40 w-full items-end justify-center gap-1">
              <div
                className="w-3 rounded-t-md bg-pine"
                style={{ height: `${Math.max(8, (d.artigos / max) * 100)}%` }}
                title={`${d.artigos} artigos`}
              />
              <div
                className="w-3 rounded-t-md bg-gold"
                style={{ height: `${Math.max(d.alertas > 0 ? 8 : 0, (d.alertas / max) * 100)}%` }}
                title={`${d.alertas} a repor`}
              />
            </div>
            <span className="w-full truncate text-center text-[11px] leading-tight text-muted">
              {d.label}
            </span>
          </div>
        ))}
      </div>
      <ul className="grid gap-3 md:hidden">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-3">
            <span className="w-[7.5rem] shrink-0 text-sm text-ink">{d.label}</span>
            <div className="flex h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-2">
              <span
                className="h-full bg-pine"
                style={{ width: `${Math.max(6, (d.artigos / max) * 100)}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-sm tabular-nums">{d.artigos}</span>
            {d.alertas > 0 ? (
              <span className="w-6 shrink-0 text-right text-xs tabular-nums text-warn">{d.alertas}</span>
            ) : (
              <span className="w-6 shrink-0" />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
