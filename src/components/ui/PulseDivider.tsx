import { cn } from "@/lib/utils";

/**
 * The signature element of the HMS UI: a single, quiet line that breaks
 * rhythm exactly once — a nod to a vitals trace without being a literal
 * heartbeat icon. Used once per surface: sidebar footer, auth panel,
 * topbar underline. Never repeated as decoration.
 */
export function PulseDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      preserveAspectRatio="none"
      className={cn("pulse-line h-6 w-full text-primary/40", className)}
      aria-hidden="true"
    >
      <path
        d="M0 12 H70 L82 12 L90 3 L100 21 L108 12 L118 12 L126 6 L132 12 H240"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse-line"
      />
    </svg>
  );
}
