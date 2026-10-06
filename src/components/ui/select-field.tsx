import * as React from "react";
import { cn } from "@/lib/utils";

export const SelectField = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full appearance-none rounded-lg border border-line bg-surface bg-[length:12px] bg-[right_12px_center] bg-no-repeat px-3 pr-9 text-sm text-ink shadow-sm",
          "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b675f%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/35 focus-visible:border-pine",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);
SelectField.displayName = "SelectField";
