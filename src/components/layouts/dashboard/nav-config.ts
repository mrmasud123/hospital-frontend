import {
  LayoutDashboard,
  CalendarClock,
  Users,
  Stethoscope,
  FileText,
  Bell,
  UserRound,
  Building2,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  Settings,
} from "lucide-react";
import type { NavSection, UserRole } from "@/types/nav";

export const roleLabels: Record<UserRole, string> = {
  patient: "Patient Portal",
  doctor: "Doctor Portal",
  receptionist: "Receptionist Portal",
  admin: "Admin Portal",
};

export const navConfig: Record<UserRole, NavSection[]> = {
  patient: [
    {
      items: [
        { label: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
        { label: "Appointments", href: "/patient/appointments", icon: CalendarClock },
        { label: "Doctors", href: "/patient/doctors", icon: Stethoscope },
        { label: "Prescriptions", href: "/patient/prescriptions", icon: FileText },
        { label: "Notifications", href: "/patient/notifications", icon: Bell, badge: 3 },
      ],
    },
    {
      title: "Account",
      items: [{ label: "Profile", href: "/patient/profile", icon: UserRound }],
    },
  ],
  doctor: [
    {
      items: [
        { label: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
        { label: "Appointments", href: "/doctor/appointments", icon: CalendarClock },
        { label: "Patients", href: "/doctor/patients", icon: Users },
        { label: "Prescriptions", href: "/doctor/prescriptions", icon: FileText, badge: 5 },
      ],
    },
    {
      title: "Account",
      items: [{ label: "Profile", href: "/doctor/profile", icon: UserRound }],
    },
  ],
  receptionist: [
    {
      items: [
        { label: "Dashboard", href: "/receptionist/dashboard", icon: LayoutDashboard },
        { label: "Patients", href: "/receptionist/patients", icon: Users },
        { label: "Appointments", href: "/receptionist/appointments", icon: CalendarClock },
        { label: "Doctor Schedules", href: "/receptionist/doctors", icon: Stethoscope },
      ],
    },
  ],
  admin: [
    {
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Departments", href: "/admin/departments", icon: Building2 },
        { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
        { label: "Patients", href: "/admin/patients", icon: Users },
        { label: "Appointments", href: "/admin/appointments", icon: CalendarClock },
        { label: "Prescriptions", href: "/admin/prescriptions", icon: FileText },
      ],
    },
    {
      title: "System",
      items: [
        { label: "Users", href: "/admin/users", icon: ClipboardList },
        { label: "Roles & Permissions", href: "/admin/roles", icon: ShieldCheck },
        { label: "Reports", href: "/admin/reports", icon: BarChart3 },
        { label: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ],
};
