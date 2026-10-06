import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { ItemFormDialog } from "@/components/item-form-dialog";
import { ItemSheet } from "@/components/item-sheet";
import { MovementDialog } from "@/components/movement-dialog";
import { SettingsDialog } from "@/components/settings-dialog";
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
import { useStockStore } from "@/lib/store";
import type { Item, MovementType } from "@/lib/types";

type WorkspaceApi = {
  openNew: () => void;
  openEdit: (item: Item) => void;
  openMove: (item: Item, type: MovementType) => void;
  openItem: (item: Item) => void;
  openSettings: () => void;
};

const WorkspaceContext = createContext<WorkspaceApi | null>(null);

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within Workspace");
  return ctx;
}

export function Workspace({ children }: { children: ReactNode }) {
  const archiveItem = useStockStore((s) => s.archiveItem);
  const restoreItem = useStockStore((s) => s.restoreItem);
  const deleteItem = useStockStore((s) => s.deleteItem);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [detail, setDetail] = useState<Item | null>(null);
  const [moveItem, setMoveItem] = useState<Item | null>(null);
  const [moveType, setMoveType] = useState<MovementType>("saida");
  const [moveOpen, setMoveOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pendingArchive, setPendingArchive] = useState<Item | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Item | null>(null);

  const api = useMemo<WorkspaceApi>(
    () => ({
      openNew: () => {
        setEditing(null);
        setFormOpen(true);
      },
      openEdit: (item) => {
        setEditing(item);
        setFormOpen(true);
      },
      openMove: (item, type) => {
        setMoveItem(item);
        setMoveType(type);
        setMoveOpen(true);
      },
      openItem: (item) => setDetail(item),
      openSettings: () => setSettingsOpen(true),
    }),
    [],
  );

  const items = useStockStore((s) => s.items);
  const liveDetail = detail ? (items.find((i) => i.id === detail.id) ?? null) : null;

  return (
    <WorkspaceContext.Provider value={api}>
      {children}
      <ItemFormDialog open={formOpen} onOpenChange={setFormOpen} item={editing} />
      <MovementDialog
        open={moveOpen}
        onOpenChange={setMoveOpen}
        item={moveItem}
        type={moveType}
      />
      <ItemSheet
        item={liveDetail}
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
        onEdit={(item) => {
          setEditing(item);
          setFormOpen(true);
        }}
        onMove={(item, type) => {
          setMoveItem(item);
          setMoveType(type);
          setMoveOpen(true);
        }}
        onArchive={(item) => setPendingArchive(item)}
        onRestore={(item) => {
          restoreItem(item.id);
          toast.success(`«${item.name}» voltou ao stock.`);
        }}
        onDelete={(item) => setPendingDelete(item)}
      />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <AlertDialog open={!!pendingArchive} onOpenChange={(o) => !o && setPendingArchive(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Arquivar consumível?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingArchive
                ? `«${pendingArchive.name}» sai do stock, dos alertas e da lista de compras. O histórico fica guardado.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!pendingArchive) return;
                archiveItem(pendingArchive.id);
                setDetail(null);
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
                setDetail(null);
                toast.success("Artigo apagado.");
                setPendingDelete(null);
              }}
            >
              Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </WorkspaceContext.Provider>
  );
}
