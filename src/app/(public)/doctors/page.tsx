"use client"

import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    avatar: string | null;
}

function useDoctors() {
    return useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const { data } = await axios.get("/api/proxy/doctors");
            return data.data as Doctor[];
        },
    });
}
function DoctorAvatar({ name, avatar }: { name: string; avatar: string | null }) {
    const initials = name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    if (avatar) {
        return (
            <img
                src={avatar}
                alt={name}
                className="h-10 w-10 rounded-full object-cover"
                onError={(e) => {
                    // if the URL 404s, hide the broken image instead of showing the icon
                    e.currentTarget.style.display = "none";
                }}
            />
        );
    }

    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-primary">
            {initials}
        </div>
    );
}
export default function DoctorsPage() {
    const user = useAuthStore((s) => s.user);
    const { data: doctors, isLoading, isError } = useDoctors();

    return (
        <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="text-sm font-medium text-accent">Doctors</p>
            <h1 className="mt-3 font-display text-3xl text-foreground">
                Find the right doctor for you.
            </h1>
            <p className="mt-4 max-w-xl text-text-muted">
                Browse our doctors and book an appointment with the right specialist.
            </p>

            {isLoading && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-28 animate-pulse rounded-lg bg-surface-muted" />
                    ))}
                </div>
            )}

            {isError && (
                <p className="mt-10 text-sm text-danger">
                    Couldn&#39;t load doctors right now. Please try again shortly.
                </p>
            )}

            {!isLoading && !isError && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {doctors?.map((doc) => (
                        <div key={doc.id} className="rounded-lg border border-border bg-surface p-5">
                            <DoctorAvatar name={doc.name} avatar={doc.avatar} />
                            <p className="mt-3 font-display text-lg text-foreground">{doc.name}</p>
                            <p className="text-sm text-text-muted">{doc.specialization}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}