"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronsLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { PulseDivider } from "@/components/ui/PulseDivider";
import { navConfig, roleLabels } from "./nav-config";
import { useSidebarStore } from "@/store/useSidebarStore";
import type { UserRole } from "@/types/nav";

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);
  const sections = navConfig[role];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex h-screen flex-col border-r border-border bg-surface transition-[width] duration-200",
        collapsed ? "w-[76px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && <Logo className="text-base" />}
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-text-muted hover:bg-surface-muted hover:text-foreground"
        >
          <ChevronsLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {!collapsed && (
        <p className="px-4 pb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
          {roleLabels[role]}
        </p>
      )}

      <nav className="thin-scrollbar flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((section, i) => (
          <div key={i} className={cn(i > 0 && "mt-6")}>
            {section.title && !collapsed && (
              <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = pathname?.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary-soft text-primary"
                          : "text-text-muted hover:bg-surface-muted hover:text-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                      )}
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && item.badge ? (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        {!collapsed && <PulseDivider className="mb-3 h-4" />}
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-danger",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-[18px] w-[18px]" />
          {!collapsed && "Sign out"}
        </button>
      </div>
    </aside>
  );
}
