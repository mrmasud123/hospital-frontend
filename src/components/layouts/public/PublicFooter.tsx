import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { PulseDivider } from "@/components/ui/PulseDivider";

const columns = [
  {
    title: "Care",
    links: [
      { label: "Find a doctor", href: "/doctors" },
      { label: "Departments", href: "/departments" },
      { label: "Book an appointment", href: "/appointments/book" },
    ],
  },
  {
    title: "Hospital",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Patient portal", href: "/login" },
      { label: "Create an account", href: "/register" },
      { label: "Prescriptions", href: "/patient/prescriptions" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 pt-14">
        {/*<PulseDivider className="mb-10 h-5" />*/}

        <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              Meridian Health provides coordinated, round-the-clock care across
              every department — from first appointment to follow-up.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-foreground">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Meridian Health. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-text-muted hover:text-foreground">
              Privacy policy
            </Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-foreground">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
