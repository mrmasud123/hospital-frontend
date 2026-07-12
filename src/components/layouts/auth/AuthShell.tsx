import { Logo } from "@/components/ui/Logo";
import { PulseDivider } from "@/components/ui/PulseDivider";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel — deep teal, only shown on wider screens */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <Logo variant="inverted" />

        <div className="max-w-md">
          <p className="font-display text-3xl leading-tight">
            Coordinated care, from the front desk to the follow-up.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            One account gives you appointments, prescriptions, and your care
            team's notes in a single, always-current record.
          </p>
        </div>

        <div>
          <PulseDivider className="mb-6 h-5 text-primary-foreground/40" />
          <p className="text-xs text-primary-foreground/50">
            Meridian Health · Secure patient &amp; staff access
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <h1 className="font-display text-2xl text-foreground">{title}</h1>
          <p className="mt-2 text-sm text-text-muted">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
