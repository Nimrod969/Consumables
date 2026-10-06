import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Archive, ArchiveRestore, Pencil, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { IntroBanner } from "@/components/intro-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWorkspace } from "@/components/workspace";
import { formatDate, qty } from "@/lib/format";
import { useStockStore } from "@/lib/store";
import { CATEGORIES, type Item } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/consumiveis")({ component: ConsumiveisPage });

type ListFilter = "ativos" | "arquivados" | "todos";

function ConsumiveisPage() {
  const items = useStockStore((s) => s.items);
  const archiveItem = useStockStore((s) => s.archiveItem);
  const restoreItem = useStockStore((s) => s.restoreItem);
  const deleteItem = useStockStore((s) => s.deleteItem);
  const { openNew, openEdit } = useWorkspace();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("todas");
  const [filter, setFilter] = useState<ListFilter>("ativos");
  const [pendingArchive, setPendingArchive] = useState<Item | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Item | null>(null);

  const archivedCount = items.filter((it) => it.archived).length;
  const activeCount = items.length - archivedCount;

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items
      .filter((it) => {
        if (filter === "ativos" && it.archived) return false;
        if (filter === "arquivados" && !it.archived) return false;
        if (category !== "todas" && it.category !== category) return false;
        if (!query) return true;
        return (
          it.name.toLowerCase().includes(query) ||
          it.supplier.toLowerCase().includes(query) ||
          it.location.toLowerCase().includes(query) ||
          it.notes.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (a.archived !== b.archived) return a.archived ? 1 : -1;
        return a.name.localeCompare(b.name, "pt");
      });
  }, [items, q, category, filter]);

  return (
    <div className="mx-auto max-w-6xl">
      <IntroBanner />
      <div className="mb-5">
        <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
          Consumíveis
        </h1>
        <p className="mt-1 text-muted">
          Catálogo do economato da EPRD. Adiciona artigos novos ou arquiva os que já não se usam.
        </p>
      </div>

      <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_180px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <Input
            className="pl-9"
            placeholder="Procurar nome, local, fornecedor…"
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
        {(
          [
            { id: "ativos", label: `Em uso (${activeCount})` },
            { id: "arquivados", label: `Arquivados (${archivedCount})` },
            { id: "todos", label: "Todos" },
          ] as const
        ).map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-colors duration-150",
              filter === f.id ? "bg-pine text-pine-fg" : "bg-surface-2 text-muted hover:text-ink",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]">
          <p className="font-medium">
            {filter === "arquivados" ? "Nenhum consumível arquivado" : "Nenhum consumível neste filtro"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {filter === "arquivados"
              ? "Quando um artigo deixar de se usar, arquiva-o em vez de o apagar."
              : "Adiciona o primeiro artigo ao catálogo."}
          </p>
          {filter !== "arquivados" ? (
            <Button className="mt-4" onClick={openNew}>
              Novo consumível
            </Button>
          ) : null}
        </div>
      ) : (
        <ul className="grid gap-3">
          {filtered.map((item) => {
            const categoryLabel =
              CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;
            return (
              <li
                key={item.id}
                className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{item.name}</p>
                      {item.archived ? (
                        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
                          Arquivado
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {categoryLabel}
                      {item.location ? ` · ${item.location}` : ""}
                      {item.archived
                        ? item.archivedAt
                          ? ` · desde ${formatDate(item.archivedAt)}`
                          : ""
                        : ` · ${qty(item.quantity, item.unit)} em stock`}
                    </p>
                    {item.notes ? <p className="mt-1 text-sm text-subtle">{item.notes}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                      <Pencil />
                      Editar
                    </Button>
                    {item.archived ? (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            restoreItem(item.id);
                            toast.success(`«${item.name}» voltou ao stock.`);
                          }}
                        >
                          <ArchiveRestore />
                          Restaurar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-danger"
                          onClick={() => setPendingDelete(item)}
                        >
                          <Trash2 />
                          Apagar
                        </Button>
                      </>
                    ) : (
                      <Button variant="secondary" size="sm" onClick={() => setPendingArchive(item)}>
                        <Archive />
                        Arquivar
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AlertDialog open={!!pendingArchive} onOpenChange={(o) => !o && setPendingArchive(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Arquivar consumível?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingArchive
                ? `«${pendingArchive.name}» sai do stock, dos alertas e da lista de compras. O histórico fica guardado — podes restaurá-lo mais tarde.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!pendingArchive) return;
                archiveItem(pendingArchive.id);
                toast.success("Consumível arquivado.");
                setPendingArchive(null);
              }}
            >
              Arquivar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar em definitivo?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete
                ? `«${pendingDelete.name}» e o respetivo histórico saem da aplicação. Esta ação não se desfaz.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-danger text-pine-fg hover:bg-danger/90"
              onClick={() => {
                if (!pendingDelete) return;
                deleteItem(pendingDelete.id);
                toast.success("Consumível apagado.");
                setPendingDelete(null);
              }}
            >
              Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
