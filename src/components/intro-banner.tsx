import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EprdMark } from "@/components/eprd-mark";
import { useStockStore } from "@/lib/store";
import { SCHOOL_SHORT, SCHOOL_SITE_LABEL, SCHOOL_URL } from "@/lib/school";

export function IntroBanner() {
  const dismissed = useStockStore((s) => s.introDismissed);
  const dismiss = useStockStore((s) => s.dismissIntro);

  if (dismissed) return null;

  return (
    <div className="mb-5 flex gap-3 rounded-xl bg-pine px-4 py-3 text-pine-fg">
      <div className="mt-0.5 hidden sm:block">
        <EprdMark className="h-7" title="" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">Economato da Escola Profissional Raul Dória</p>
        <p className="mt-0.5 text-sm text-pine-fg/75">
          Começa em Consumíveis: adiciona os artigos da {SCHOOL_SHORT}, define o stock mínimo, e o
          Reabastece avisa antes de faltar.
        </p>
        <a
          href={SCHOOL_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-sm font-medium text-gold underline underline-offset-2"
        >
          {SCHOOL_SITE_LABEL}
        </a>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        className="shrink-0 text-pine-fg hover:bg-white/10 hover:text-pine-fg"
        onClick={dismiss}
        aria-label="Fechar"
      >
        <X />
      </Button>
    </div>
  );
}
