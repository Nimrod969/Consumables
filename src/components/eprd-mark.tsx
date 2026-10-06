import { cn } from "@/lib/utils";

export function EprdMark({
  className,
  title = "Escola Profissional Raul Dória",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <img
      src="/eprd-logo.png"
      alt={title}
      className={cn("h-8 w-auto select-none object-contain object-left", className)}
    />
  );
}

export function EprdBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-pine",
        className,
      )}
    >
      <img src="/eprd-logo.png" alt="" className="h-4 w-auto select-none object-contain" />
    </span>
  );
}
