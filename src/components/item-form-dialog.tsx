import { useEffect, useState, type FormEvent, type ReactNode } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useStockStore } from "@/lib/store";
import { CATEGORIES, UNITS, type Item } from "@/lib/types";

type FormState = {
  name: string;
  category: Item["category"];
  unit: string;
  quantity: string;
  minQuantity: string;
  reorderQty: string;
  location: string;
  supplier: string;
  unitCost: string;
  notes: string;
};

const empty: FormState = {
  name: "",
  category: "papelaria",
  unit: "un",
  quantity: "0",
  minQuantity: "2",
  reorderQty: "4",
  location: "",
  supplier: "",
  unitCost: "0",
  notes: "",
};

function fromItem(item: Item): FormState {
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
    notes: item.notes,
  };
}

export function ItemFormDialog({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: Item | null;
}) {
  const addItem = useStockStore((s) => s.addItem);
  const updateItem = useStockStore((s) => s.updateItem);
  const [form, setForm] = useState<FormState>(empty);

  useEffect(() => {
    if (open) setForm(item ? fromItem(item) : empty);
  }, [open, item]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: FormEvent) {
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
      notes: form.notes,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>{item ? "Editar artigo" : "Novo consumível"}</DialogTitle>
            <DialogDescription>
              Define o stock mínimo — o Reabastece avisa assim que chegar a esse valor.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Field label="Nome">
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="ex. Papel A4 80g"
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Categoria">
                <SelectField
                  value={form.category}
                  onChange={(e) => set("category", e.target.value as Item["category"])}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </SelectField>
              </Field>
              <Field label="Unidade">
                <SelectField value={form.unit} onChange={(e) => set("unit", e.target.value)}>
                  {UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </SelectField>
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Stock atual">
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.quantity}
                  onChange={(e) => set("quantity", e.target.value)}
                />
              </Field>
              <Field label="Mínimo">
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.minQuantity}
                  onChange={(e) => set("minQuantity", e.target.value)}
                />
              </Field>
              <Field label="A pedir">
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.reorderQty}
                  onChange={(e) => set("reorderQty", e.target.value)}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Localização">
                <Input
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="Armazém, copa…"
                />
              </Field>
              <Field label="Fornecedor">
                <Input
                  value={form.supplier}
                  onChange={(e) => set("supplier", e.target.value)}
                  placeholder="Nome do fornecedor"
                />
              </Field>
            </div>
            <Field label="Custo unitário (€)">
              <Input
                type="number"
                min={0}
                step="0.01"
                value={form.unitCost}
                onChange={(e) => set("unitCost", e.target.value)}
              />
            </Field>
            <Field label="Notas">
              <Textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Referência, validade, observações…"
              />
            </Field>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{item ? "Guardar" : "Adicionar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
