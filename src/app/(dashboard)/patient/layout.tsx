import { DashboardShell } from "@/components/layouts/dashboard/DashboardShell";

export default function PatientLayout({ children }: { children: React.ReactNode }) {

  return (
    <DashboardShell role="patient" breadcrumbs={["Patient"]} userName="Patient">
      {children}
    </DashboardShell>
  );
}
