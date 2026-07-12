import type { LucideIcon } from "lucide-react";

export type UserRole = "patient" | "doctor" | "receptionist" | "admin";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Small count badge, e.g. unread notifications or pending prescriptions */
  badge?: number;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
