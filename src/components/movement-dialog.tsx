import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/ui/select-field";
import { useStockStore } from "@/lib/store";
import { DEPARTMENTS, MOVEMENT_REASONS, type Item, type MovementType } from "@/lib/types";
import { qty } from "@/lib/format";

export function MovementDialog({
  open,
  onOpenChange,
  item,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item | null;
  type: MovementType;
}) {
  const addMovement = useStockStore((s) => s.addMovement);
  const [quantity, setQuantity] = useState("1");
  const [reason, setReason] = useState<string>(
    type === "entrada" ? "Compra / reposição" : "Consumo diário",
  );
  const [department, setDepartment] = useState("Secretaria");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) return;
    setQuantity(type === "ajuste" && item ? String(item.quantity) : "1");
    setReason(type === "entrada" ? "Compra / reposição" : "Consumo diário");
    setDepartment("Secretaria");
    setNote("");
  }, [open, type, item]);

  const titles: Record<MovementType, string> = {
    entrada: "Entrada de stock",
    saida: "Saída / consumo",
    ajuste: "Ajuste de inventário",
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!item) return;
    const n = Number(quantity);
    if (!Number.isFinite(n) || n < 0 || (type !== "ajuste" && n <= 0)) {
      toast.error("Indica uma quantidade válida.");
      return;
    }
    if (type === "saida" && n > item.quantity) {
      toast.error(`Só existem ${qty(item.quantity, item.unit)} em stock.`);
      return;
    }
    addMovement({ itemId: item.id, type, quantity: n, reason, department, note });
    toast.success(
      type === "entrada"
        ? "Entrada registada."
        : type === "saida"
          ? "Saída registada."
          : "Stock ajustado.",
    );
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>{titles[type]}</DialogTitle>
            <DialogDescription>
              {item ? (
                <>
                  {item.name} · atual {qty(item.quantity, item.unit)}
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label>{type === "ajuste" ? "Nova quantidade" : "Quantidade"}</Label>
              <Input
                type="number"
                min={0}
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Motivo</Label>
              <SelectField value={reason} onChange={(e) => setReason(e.target.value)}>
                {MOVEMENT_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </SelectField>
            </div>
            <div className="grid gap-1.5">
              <Label>Setor / curso</Label>
              <SelectField value={department} onChange={(e) => setDepartment(e.target.value)}>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </SelectField>
            </div>
            <div className="grid gap-1.5">
              <Label>Nota (opcional)</Label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Quem, turma, fatura…"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Registar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
