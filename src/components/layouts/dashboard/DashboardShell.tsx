"use client";

import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { useSidebarStore } from "@/store/useSidebarStore";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/nav";

export function DashboardShell({
  role,
  breadcrumbs,
  userName,
  children,
}: {
  role: UserRole;
  breadcrumbs: string[];
  userName: string;
  children: React.ReactNode;
}) {
  const collapsed = useSidebarStore((s) => s.collapsed);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role={role} />
      <div
        className={cn(
          "transition-[padding] duration-200",
          collapsed ? "pl-[76px]" : "pl-64"
        )}
      >
        <DashboardTopbar breadcrumbs={breadcrumbs} userName={userName} userRole={role} />
        <main className="p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
