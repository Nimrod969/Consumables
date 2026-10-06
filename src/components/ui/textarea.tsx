import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-24 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink shadow-sm transition-[box-shadow,border-color] duration-150 placeholder:text-subtle",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/35 focus-visible:border-pine",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
