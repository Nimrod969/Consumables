import { useEffect, type ReactNode } from "react";
import { useStockStore } from "@/lib/store";

export function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void Promise.resolve(useStockStore.persist.rehydrate()).then(() => {
      useStockStore.getState().ensureSeed();
    });
  }, []);
  return children;
}
