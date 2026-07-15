"use client";


export default function HomePage() {
   // const token = useAuthStore.getState().token;
   // console.log("Token: "+token);
    return (
        <main className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
                </div>

                <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-5 text-center lg:py-32">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                    🏥 Trusted Healthcare for Every Family
                  </span>

                    <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">
                        Compassionate Care.
                        <br />
                        Modern Medicine.
                        <br />
                        Better Health.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                        Meridian Health provides world-class healthcare with experienced
                        doctors, modern facilities, and patient-first services—available
                        whenever you need them.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <button className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:opacity-90">
                            Book Appointment
                        </button>

                        <button className="rounded-xl border border-border bg-card px-8 py-3 font-semibold transition hover:bg-muted">
                            Find a Doctor
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-5 grid w-full max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">
                        {[
                            ["50+", "Expert Doctors"],
                            ["24/7", "Emergency Care"],
                            ["20k+", "Happy Patients"],
                            ["15+", "Departments"],
                        ].map(([value, label]) => (
                            <div
                                key={label}
                                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                            >
                                <h3 className="text-3xl font-bold">{value}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="mx-auto max-w-7xl px-6 py-5">
                <div className="text-center">
                    <p className="font-semibold text-primary">Our Services</p>

                    <h2 className="mt-2 text-4xl font-bold">
                        Comprehensive Healthcare Solutions
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        We provide specialized medical care with advanced technology and
                        compassionate professionals.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: "🩺",
                            title: "General Medicine",
                            desc: "Complete primary healthcare for patients of all ages.",
                        },
                        {
                            icon: "❤️",
                            title: "Cardiology",
                            desc: "Heart specialists using modern diagnostic technology.",
                        },
                        {
                            icon: "🧠",
                            title: "Neurology",
                            desc: "Advanced treatment for neurological disorders.",
                        },
                        {
                            icon: "🚑",
                            title: "Emergency",
                            desc: "24/7 emergency response with rapid medical attention.",
                        },
                    ].map((service) => (
                        <div
                            key={service.title}
                            className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="text-4xl">{service.icon}</div>

                            <h3 className="mt-5 text-xl font-semibold">
                                {service.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-muted/40 py-5">
                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
                    <div>
                        <h2 className="text-4xl font-bold">
                            Why Patients Choose Meridian Health
                        </h2>

                        <p className="mt-5 text-muted-foreground">
                            We combine experienced healthcare professionals with advanced
                            medical technology to deliver safe, reliable, and compassionate
                            care.
                        </p>

                        <div className="mt-10 space-y-6">
                            {[
                                "Experienced & Certified Doctors",
                                "Modern Medical Equipment",
                                "24/7 Emergency Services",
                                "Easy Online Appointment Booking",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        ✓
                                    </div>

                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-border bg-card p-10 shadow-lg">
                        <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 via-primary/10 to-transparent" />

                        <div className="mt-8 space-y-5">
                            <div className="flex items-center justify-between rounded-xl bg-background p-4">
                                <span>Patient Satisfaction</span>
                                <span className="font-bold text-primary">98%</span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-background p-4">
                                <span>Average Waiting Time</span>
                                <span className="font-bold text-primary">&lt; 15 mins</span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-background p-4">
                                <span>Emergency Response</span>
                                <span className="font-bold text-primary">24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-6 py-5">
                <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-xl">
                    <h2 className="text-4xl font-bold">
                        Your Health Is Our Highest Priority
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/80">
                        Schedule your appointment today and receive exceptional healthcare
                        from our experienced medical professionals.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <button className="rounded-xl bg-white px-8 py-3 font-semibold text-primary transition hover:bg-white/90">
                            Book Appointment
                        </button>

                        <button className="rounded-xl border border-white/40 px-8 py-3 font-semibold transition hover:bg-white/10">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}