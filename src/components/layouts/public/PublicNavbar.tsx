"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Departments", href: "/departments" },
  { label: "Doctors", href: "/doctors" },
  { label: "Contact", href: "/contact" },
];

export function PublicNavbar() {
  const user = useAuthStore((s) => s.user);

  return (
      <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
                <Link
                    href={`/patient/dashboard`}
                    className="hidden text-sm font-medium text-text-muted hover:text-foreground sm:inline"
                >
                  Hi, {user.name}
                </Link>
            ) : (
                <Link
                    href="/login"
                    className="hidden text-sm font-medium text-text-muted hover:text-foreground sm:inline"
                >
                  Sign in
                </Link>
            )}

            <Link
                href="/appointments/book"
                className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Book appointment
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>
  );
}
