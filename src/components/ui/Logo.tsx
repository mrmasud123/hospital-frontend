import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  /** "default" for light surfaces, "inverted" for the deep-teal auth panel */
  variant?: "default" | "inverted";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 font-display text-xl tracking-tight",
        variant === "inverted" ? "text-primary-foreground" : "text-foreground",
        className
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold",
          variant === "inverted"
            ? "bg-primary-foreground/15 text-primary-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        M
      </span>
      MR&nbsp;Health
    </Link>
  );
}
