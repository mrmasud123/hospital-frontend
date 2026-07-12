export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm font-medium text-accent">Contact</p>
      <h1 className="mt-3 font-display text-3xl text-foreground">Get in touch.</h1>
      <p className="mt-4 text-text-muted">
        Placeholder page — confirms the public layout renders for /contact.
        Contact form and map go here.
      </p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Name</label>
          <input
            type="text"
            className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Message</label>
          <textarea
            rows={4}
            className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          Send message
        </button>
      </div>
    </div>
  );
}
