import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { IntroBanner } from "@/components/intro-banner";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/components/workspace";
import { money, qty, schoolLabel } from "@/lib/format";
import { needsPurchase, stockStatus, suggestedReorder } from "@/lib/status";
import { useActiveItems, useStockStore } from "@/lib/store";

export const Route = createFileRoute("/compras")({ component: ComprasPage });

function ComprasPage() {
  const items = useActiveItems();
  const drafts = useStockStore((s) => s.drafts);
  const setDraft = useStockStore((s) => s.setDraft);
  const applyPurchases = useStockStore((s) => s.applyPurchases);
  const establishment = useStockStore((s) => s.establishment);
  const { openItem } = useWorkspace();

  const rows = useMemo(() => {
    return items
      .filter(needsPurchase)
      .map((item) => {
        const suggested = suggestedReorder(item);
        const draft = drafts[item.id];
        return {
          item,
          qty: draft?.qty && draft.qty > 0 ? draft.qty : suggested,
          checked: draft?.checked ?? true,
        };
      })
      .sort((a, b) => a.item.quantity - b.item.quantity);
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
    toast.success(
      n === 1 ? "Compra registada como entrada." : `${n} compras registadas como entradas.`,
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <IntroBanner />
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
            Lista de compras
          </h1>
          <p className="mt-1 text-muted">
            Gerada automaticamente a partir do stock mínimo
            {establishment.name ? ` de ${schoolLabel(establishment.name)}` : ""}.
          </p>
        </div>
        <Button variant="outline" className="no-print" onClick={() => window.print()}>
          <Printer />
          Imprimir
        </Button>
      </div>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="font-medium">Nada a pedir</p>
            <p className="mt-1 text-sm text-muted">
              Quando um artigo chegar ao stock mínimo, aparece aqui para pedires.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <ul className="grid gap-3">
            {rows.map((row) => (
              <li
                key={row.item.id}
                className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
              >
                <div className="flex items-start gap-3">
                  <label className="no-print mt-1 flex size-11 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={row.checked}
                      onChange={(e) => setDraft(row.item.id, { qty: row.qty, checked: e.target.checked })}
                      className="size-4 accent-pine"
                    />
                    <span className="sr-only">Incluir {row.item.name}</span>
                  </label>
                  <div className="min-w-0 flex-1">
                    <button type="button" onClick={() => openItem(row.item)} className="text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{row.item.name}</p>
                        <StatusBadge status={stockStatus(row.item)} />
                      </div>
                      <p className="mt-1 text-sm text-muted">
                        Há {qty(row.item.quantity, row.item.unit)} · mínimo{" "}
                        {qty(row.item.minQuantity, row.item.unit)}
                        {row.item.supplier ? ` · ${row.item.supplier}` : ""}
                      </p>
                    </button>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted">Pedir</span>
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          className="h-9 w-24"
                          value={row.qty}
                          onChange={(e) =>
                            setDraft(row.item.id, {
                              checked: row.checked,
                              qty: Number(e.target.value) || 0,
                            })
                          }
                        />
                        <span className="text-sm text-muted">{row.item.unit}</span>
                      </div>
                      <p className="text-sm tabular-nums text-muted">
                        {money(row.qty * row.item.unitCost)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-20 z-20 mt-5 overflow-hidden rounded-xl bg-pine text-pine-fg lg:bottom-6">
            <div className="h-1 bg-gold" />
            <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-pine-fg/70">
                  {selected.length} {selected.length === 1 ? "artigo" : "artigos"} selecionados
                </p>
                <p className="font-display text-2xl tabular-nums">{money(estimated)}</p>
              </div>
              <Button
                className="no-print bg-surface text-ink hover:bg-surface-2"
                onClick={register}
                disabled={selected.length === 0}
              >
                Marcar como comprado
              </Button>
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
