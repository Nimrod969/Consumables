import { Archive, ArchiveRestore, ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatDateTime, money, qty, daysLabel } from "@/lib/format";
import { avgDailyOut, daysUntilEmpty, stockFill, stockStatus } from "@/lib/status";
import { useStockStore } from "@/lib/store";
import { CATEGORIES, type Item, type MovementType } from "@/lib/types";

export function ItemSheet({
  item,
  onOpenChange,
  onEdit,
  onMove,
  onArchive,
  onRestore,
  onDelete,
}: {
  item: Item | null;
  onOpenChange: (open: boolean) => void;
  onEdit: (item: Item) => void;
  onMove: (item: Item, type: MovementType) => void;
  onArchive: (item: Item) => void;
  onRestore: (item: Item) => void;
  onDelete: (item: Item) => void;
}) {
  const movements = useStockStore((s) => s.movements);
  if (!item) {
    return (
      <Sheet open={false} onOpenChange={onOpenChange}>
        <SheetContent />
      </Sheet>
    );
  }

  const status = stockStatus(item);
  const category = CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;
  const history = movements.filter((m) => m.itemId === item.id).slice(0, 8);
  const days = daysUntilEmpty(item, movements);
  const daily = avgDailyOut(item.id, movements);
  const fill = stockFill(item);
  const bar =
    status === "esgotado" || status === "repor"
      ? "bg-danger"
      : status === "vigiar"
        ? "bg-warn"
        : "bg-pine";

  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-2">
            {item.archived ? (
              <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
                Arquivado
              </span>
            ) : (
              <StatusBadge status={status} />
            )}
            <span className="text-xs text-muted">{category}</span>
          </div>
          <SheetTitle>{item.name}</SheetTitle>
          <SheetDescription>
            {item.location || "Sem localização"} · {item.supplier || "Sem fornecedor"}
          </SheetDescription>
        </SheetHeader>
        <SheetBody className="flex flex-col gap-6">
          <div>
            <p className="text-3xl font-medium tabular-nums tracking-tight">
              {qty(item.quantity, item.unit)}
            </p>
            <p className="mt-1 text-sm text-muted">
              mínimo {qty(item.minQuantity, item.unit)} · pedido típico{" "}
              {qty(item.reorderQty, item.unit)}
            </p>
            <Progress value={fill} className="mt-3" barClassName={bar} />
            {item.archived ? (
              <p className="mt-2 text-sm text-muted">
                Fora do stock ativo. Restaura se voltar a ser usado na EPRD.
              </p>
            ) : days !== null ? (
              <p className="mt-2 text-sm text-muted">
                Ao ritmo atual (~{qty(daily, item.unit)}/dia) acaba em{" "}
                <span className="font-medium text-ink">{daysLabel(days)}</span>.
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted">Ainda sem consumo recente para estimar a rutura.</p>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Info label="Custo unitário" value={money(item.unitCost)} />
            <Info label="Valor em stock" value={money(item.unitCost * item.quantity)} />
            <Info label="Atualizado" value={formatDateTime(item.updatedAt)} />
            <Info label="Notas" value={item.notes || "—"} />
          </dl>

          <div>
            <h3 className="text-sm font-medium">Movimentos recentes</h3>
            {history.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Ainda não há movimentos neste artigo.</p>
            ) : (
              <ul className="mt-2 divide-y divide-line">
                {history.map((mv) => (
                  <li key={mv.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                    <div>
                      <p className="font-medium">
                        {mv.type === "entrada" ? "Entrada" : mv.type === "saida" ? "Saída" : "Ajuste"}{" "}
                        · {qty(mv.quantity, item.unit)}
                      </p>
                      <p className="text-muted">
                        {mv.reason}
                        {mv.department ? ` · ${mv.department}` : ""}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-subtle tabular-nums">
                      {formatDateTime(mv.at)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </SheetBody>
        <SheetFooter className="grid grid-cols-2 gap-2">
          {item.archived ? (
            <>
              <Button variant="secondary" onClick={() => onRestore(item)}>
                <ArchiveRestore />
                Restaurar
              </Button>
              <Button variant="outline" className="text-danger" onClick={() => onDelete(item)}>
                <Trash2 />
                Apagar
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => onMove(item, "saida")}>
                <ArrowUpRight />
                Saída
              </Button>
              <Button onClick={() => onMove(item, "entrada")}>
                <ArrowDownLeft />
                Entrada
              </Button>
              <Button variant="secondary" onClick={() => onEdit(item)}>
                <Pencil />
                Editar
              </Button>
              <Button variant="outline" onClick={() => onArchive(item)}>
                <Archive />
                Arquivar
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-bg px-3 py-2">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}
