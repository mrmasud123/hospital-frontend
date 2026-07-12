const departments = ["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Radiology", "Oncology"];

export default function DepartmentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-medium text-accent">Departments</p>
      <h1 className="mt-3 font-display text-3xl text-foreground">
        Every department, one hospital.
      </h1>
      <p className="mt-4 max-w-xl text-text-muted">
        Placeholder page — confirms the public layout renders for /departments.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((name) => (
          <div key={name} className="rounded-lg border border-border bg-surface p-5">
            <p className="font-display text-lg text-foreground">{name}</p>
            <p className="mt-1 text-sm text-text-muted">Department overview coming soon.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
