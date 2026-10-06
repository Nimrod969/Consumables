import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IntroBanner } from "@/components/intro-banner";
import { SelectField } from "@/components/ui/select-field";
import { formatDateTime, qty } from "@/lib/format";
import { useStockStore } from "@/lib/store";
import type { MovementType } from "@/lib/types";

export const Route = createFileRoute("/historico")({ component: HistoricoPage });

function HistoricoPage() {
  const items = useStockStore((s) => s.items);
  const movements = useStockStore((s) => s.movements);
  const [type, setType] = useState<"todos" | MovementType>("todos");
  const [itemId, setItemId] = useState("todos");

  const filtered = useMemo(() => {
    return [...movements]
      .filter((mv) => (type === "todos" ? true : mv.type === type))
      .filter((mv) => (itemId === "todos" ? true : mv.itemId === itemId))
      .sort((a, b) => +new Date(b.at) - +new Date(a.at));
  }, [movements, type, itemId]);

  return (
    <div className="mx-auto max-w-3xl">
      <IntroBanner />
      <div className="mb-5">
        <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">Histórico</h1>
        <p className="mt-1 text-muted">Entradas, saídas e ajustes de inventário.</p>
      </div>

      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        <SelectField value={type} onChange={(e) => setType(e.target.value as typeof type)}>
          <option value="todos">Todos os tipos</option>
          <option value="entrada">Entradas</option>
          <option value="saida">Saídas</option>
          <option value="ajuste">Ajustes</option>
        </SelectField>
        <SelectField value={itemId} onChange={(e) => setItemId(e.target.value)}>
          <option value="todos">Todos os artigos</option>
          {items
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name, "pt"))
            .map((it) => (
              <option key={it.id} value={it.id}>
                {it.archived ? `${it.name} (arquivado)` : it.name}
              </option>
            ))}
        </SelectField>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]">
          <p className="font-medium">Sem movimentos neste filtro</p>
          <p className="mt-1 text-sm text-muted">Regista uma entrada ou saída a partir do stock.</p>
        </div>
      ) : (
        <ol className="relative border-l border-line pl-5">
          {filtered.map((mv) => {
            const item = items.find((it) => it.id === mv.itemId);
            const label =
              mv.type === "entrada" ? "Entrada" : mv.type === "saida" ? "Saída" : "Ajuste";
            return (
              <li key={mv.id} className="mb-6">
                <span
                  className={`absolute -left-1.5 mt-1.5 size-3 rounded-full ${
                    mv.type === "entrada"
                      ? "bg-pine"
                      : mv.type === "saida"
                        ? "bg-warn"
                        : "bg-muted"
                  }`}
                />
                <p className="text-xs text-subtle tabular-nums">{formatDateTime(mv.at)}</p>
                <p className="mt-1 font-medium">
                  {label} · {item ? qty(mv.quantity, item.unit) : mv.quantity}
                </p>
                <p className="text-sm text-muted">
                  {item ? `${item.name}${item.archived ? " (arquivado)" : ""}` : "Artigo removido"}{" "}
                  · {mv.reason}
                  {mv.department ? ` · ${mv.department}` : ""}
                  {mv.note ? ` · ${mv.note}` : ""}
                </p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
