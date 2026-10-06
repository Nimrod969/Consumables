import { useState } from "react";
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
import { SCHOOL_NAME, SCHOOL_SITE_LABEL, SCHOOL_URL } from "@/lib/school";
import { useStockStore } from "@/lib/store";

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const establishment = useStockStore((s) => s.establishment);
  const setName = useStockStore((s) => s.setEstablishmentName);
  const clearAll = useStockStore((s) => s.clearAll);
  const [name, setLocalName] = useState(establishment.name);
  const [confirmClear, setConfirmClear] = useState(false);

  function save() {
    setName(name);
    toast.success("Nome atualizado.");
    onOpenChange(false);
  }

  function empty() {
    clearAll();
    setConfirmClear(false);
    toast.success("Economato esvaziado.");
    onOpenChange(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (next) setLocalName(useStockStore.getState().establishment.name);
          onOpenChange(next);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Economato</DialogTitle>
            <DialogDescription>
              Gestão de consumíveis da {SCHOOL_NAME}, no Porto. Podes ajustar o nome que aparece no
              cabeçalho.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Nome</Label>
              <Input
                value={name}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder={SCHOOL_NAME}
              />
            </div>
            <p className="text-sm text-muted">
              Site da escola:{" "}
              <a
                href={SCHOOL_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-pine underline underline-offset-2"
              >
                {SCHOOL_SITE_LABEL}
              </a>
            </p>
            <div className="grid gap-2">
              <p className="text-sm font-medium">Esvaziar dados</p>
              <p className="text-sm text-muted">
                Apaga todos os artigos, movimentos e a lista de compras. Não dá para desfazer.
              </p>
              <Button type="button" variant="outline" className="text-danger" onClick={() => setConfirmClear(true)}>
                Esvaziar economato
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button onClick={save}>Guardar nome</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={confirmClear} onOpenChange={setConfirmClear}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Esvaziar o economato?</AlertDialogTitle>
            <AlertDialogDescription>
              Todos os consumíveis e o histórico desaparecem. Depois podes voltar a adicionar artigos
              no catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-danger text-pine-fg hover:bg-danger/90"
              onClick={empty}
            >
              Esvaziar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
