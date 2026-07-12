import { AuthShell } from "@/components/layouts/auth/AuthShell";

/**
 * Individual auth pages (login/register/forgot-password/reset-password)
 * are responsible for their own <form> content and pass their own
 * title/subtitle by wrapping themselves — this layout only supplies the
 * shared split-screen shell so every auth page feels like one flow.
 *
 * Pages should render:
 *   <AuthShell title="Welcome back" subtitle="Sign in to continue">
 *     ...form...
 *   </AuthShell>
 * so this layout intentionally stays a plain pass-through.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-background">{children}</div>;
}
