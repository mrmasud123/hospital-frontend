"use client";

import { Bell, Search, ChevronRight, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export function DashboardTopbar({
                                    breadcrumbs,
                                    userName,
                                    userRole,
                                }: {
    breadcrumbs: string[];
    userName: string;
    userRole: string;
}) {
    const user = useAuthStore((s) => s.user);
    const clearUser = useAuthStore((s) => s.clearUser);
    const router = useRouter();

    async function handleLogout() {
        Swal.fire({
            title: "Logging out…",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            await axios.post("/api/auth/logout");
            clearUser();
            Swal.close();
            router.push("/login");
            router.refresh();
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: "Something went wrong while logging out. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }

    return (
        <header className="flex h-16 items-center gap-4 border-b border-border bg-surface px-6">
            <ol className="flex items-center gap-1.5 text-sm text-text-muted">
                {breadcrumbs.map((crumb, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                        <span className={i === breadcrumbs.length - 1 ? "font-medium text-foreground" : ""}>
              {crumb}
            </span>
                    </li>
                ))}
            </ol>

            <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                    type="search"
                    placeholder="Search patients, appointments…"
                    className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
            </div>

            <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-md text-text-muted hover:bg-surface-muted hover:text-foreground"
            >
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>

            <ThemeToggle />

            <div className="flex items-center gap-2.5 border-l border-border pl-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft font-display text-sm text-primary">
                    {userName.charAt(0)}
                </div>
                <div className="hidden text-left leading-tight sm:block">
                    <p className="text-sm font-medium text-foreground">{user ? user.name : "N/A"}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
                className="flex h-9 w-9 items-center justify-center rounded-md text-text-muted hover:bg-surface-muted hover:text-danger"
            >
                <LogOut className="h-[18px] w-[18px]" />
            </button>
        </header>
    );
}
