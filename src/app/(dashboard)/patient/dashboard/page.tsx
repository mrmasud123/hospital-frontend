export default function PatientDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground">Welcome back</h1>
      <p className="mt-1 text-sm text-text-muted">
        Placeholder page — confirms the patient portal shell renders correctly.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {["Upcoming appointments", "Previous appointments", "Recent prescriptions"].map(
          (label) => (
            <div key={label} className="rounded-lg border border-border bg-surface p-5">
              <p className="text-sm text-text-muted">{label}</p>
              <p className="mt-2 font-display text-3xl text-foreground">—</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
