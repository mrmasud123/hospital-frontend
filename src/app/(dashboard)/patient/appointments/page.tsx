"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import {
    Calendar,
    Clock,
    Plus,
    X,
    Stethoscope,
    MapPin,
    ChevronRight,
    CalendarX2,
} from "lucide-react";

type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "completed";

interface Doctor {
    id: number;
    name?: string;
    specialization: string;
}

interface Appointment {
    id: number;
    doctor: Doctor;
    date: string;
    time: string;
    status: AppointmentStatus;
    location: string;
    reason: string;
}

const statusStyles: Record<AppointmentStatus, string> = {
    confirmed: "bg-primary-soft text-primary",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    cancelled: "bg-danger/10 text-danger",
    completed: "bg-surface-muted text-text-muted",
};

const statusLabel: Record<AppointmentStatus, string> = {
    confirmed: "Confirmed",
    pending: "Awaiting confirmation",
    cancelled: "Cancelled",
    completed: "Completed",
};

function useAppointments() {
    return useQuery({
        queryKey: ["appointments"],
        queryFn: async () => {
            const { data } = await axios.get("/api/proxy/appointments");
            return data.data as Appointment[];
        },
        // placeholderData: DEMO_APPOINTMENTS,
    });
}

function useDoctors() {
    return useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const { data } = await axios.get("/api/proxy/doctors");
            console.log(data);
            return data.data as Doctor[];
        },

        // placeholderData: DEMO_DOCTORS,
    });
}

function useBookAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: {
            doctor_id: number;
            date: string;
            time: string;
            reason: string;
        }) => {
            const { data } = await axios.post("/api/proxy/appointments", payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            Swal.fire({
                title: "Appointment requested",
                text: "You'll get a confirmation once the doctor accepts.",
                icon: "success",
                confirmButtonText: "OK",
            });
        },
        onError: (err: any) => {
            Swal.fire({
                title: "Couldn't book appointment",
                text: err.response?.data?.message ?? "Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        },
    });
}

function useCancelAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await axios.patch(`/api/proxy/appointments/${id}/cancel`);
        },
        onSuccess: () => {
            Swal.fire({
                title: "Appointment cancelled",
                text: "The doctor has been notified.",
                icon: "success",
                confirmButtonText: "Done",
                timer: 2500,
                timerProgressBar: true,
            }).then((res)=>{

                queryClient.invalidateQueries({ queryKey: ["appointments"] });
            });
        },
        onError: (err: any) => {
            Swal.fire({
                title: "Couldn't cancel appointment",
                text: err.response?.data?.message ?? "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "Try again",
            });
        },
    });
}

const TIME_SLOTS = {
    Morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    Afternoon: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM"],
    Evening: ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"],
};

export default function AppointmentsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const { data: appointments, isLoading } = useAppointments();

    const upcoming = appointments?.filter((a) => a.status !== "cancelled" && a.status !== "completed") ?? [];
    const past = appointments?.filter((a) => a.status === "cancelled" || a.status === "completed") ?? [];

    return (
        <div className="mx-auto max-w-4xl px-6 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-foreground">
                        Appointments
                    </h1>
                    <p className="mt-1 text-sm text-text-muted">
                        Manage your upcoming visits and book new ones.
                    </p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                    <Plus className="h-4 w-4" />
                    Book appointment
                </button>
            </div>

            {/* Upcoming */}
            <section className="mb-10">
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
                    Upcoming
                </h2>

                {isLoading && (
                    <div className="space-y-3">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-24 animate-pulse rounded-lg bg-surface-muted" />
                        ))}
                    </div>
                )}

                {!isLoading && upcoming.length === 0 && (
                    <EmptyState onBook={() => setModalOpen(true)} />
                )}

                <div className="space-y-3">
                    {upcoming.map((appt) => (
                        <AppointmentCard key={appt.id} appointment={appt} />
                    ))}
                </div>
            </section>

            {/* History */}
            {past.length > 0 && (
                <section>
                    <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
                        History
                    </h2>
                    <div className="space-y-3">
                        {past.map((appt) => (
                            <AppointmentCard key={appt.id} appointment={appt} muted />
                        ))}
                    </div>
                </section>
            )}

            {modalOpen && <BookAppointmentModal onClose={() => setModalOpen(false)} />}
        </div>
    );
}

function AppointmentCard({appointment, muted = false,}: {
    appointment: Appointment;
    muted?: boolean;
}) {
    const cancelMutation = useCancelAppointment();

    async function handleCancel() {
        const confirm = await Swal.fire({
            title: "Cancel appointment?",
            text: `Your visit with ${appointment.doctor?.name ?? "N/A"} on ${appointment.date} will be cancelled.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it",
            cancelButtonText: "Keep it",
            confirmButtonColor: "#dc2626",
        });
        if (confirm.isConfirmed) {
            cancelMutation.mutate(appointment.id);
        }
    }

    return (
        <div
            className={`flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition ${
                muted ? "opacity-60" : "hover:border-primary/30"
            }`}
        >
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary-soft text-primary">
                <Stethoscope className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-foreground">{appointment.doctor?.name ?? "N/A"}</p>
                    <span
                        className={`flex-none rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[appointment.status]}`}
                    >
                        {statusLabel[appointment.status]}
                    </span>
                </div>
                <p className="text-sm text-text-muted">{appointment.doctor.specialization}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {appointment.time}
                    </span>
                    <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {appointment.location}
                    </span>
                </div>
            </div>

            {appointment.status === "confirmed" || appointment.status === "pending" ? (
                <button
                    onClick={handleCancel}
                    className="flex-none rounded-md px-3 py-1.5 text-sm font-medium text-danger hover:bg-danger/10"
                >
                    Cancel
                </button>
            ) : (
                <ChevronRight className="h-4 w-4 flex-none text-text-muted" />
            )}
        </div>
    );
}
function EmptyState({ onBook }: { onBook: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-14 text-center">
            <CalendarX2 className="h-9 w-9 text-text-muted" />
            <p className="mt-3 font-medium text-foreground">No upcoming appointments</p>
            <p className="mt-1 max-w-xs text-sm text-text-muted">
                Book a visit with a doctor and it'll show up here.
            </p>
            <button
                onClick={onBook}
                className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
                Book your first appointment
            </button>
        </div>
    );
}

function BookAppointmentModal({ onClose }: { onClose: () => void }) {
    const { data: doctors, isLoading: doctorsLoading } = useDoctors();
    const bookMutation = useBookAppointment();

    const [doctorId, setDoctorId] = useState<number | null>(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState<string | null>(null);
    const [reason, setReason] = useState("");

    const canSubmit = doctorId && date && time && reason.trim().length > 0;

    async function handleSubmit() {
        if (!canSubmit) return;
        await bookMutation.mutateAsync({
            doctor_id: doctorId!,
            date,
            time: time!,
            reason,
        });
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-surface shadow-xl">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between border-b border-border bg-surface px-6 py-4">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                        Book an appointment
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1.5 text-text-muted hover:bg-surface-muted hover:text-foreground"
                    >
                        <X className="h-4.5 w-4.5" />
                    </button>
                </div>

                <div className="space-y-5 px-6 py-5">
                    {/* Doctor select */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Doctor
                        </label>
                        {doctorsLoading ? (
                            <div className="h-10 animate-pulse rounded-md bg-surface-muted" />
                        ) : (
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {doctors?.map((doc) => (
                                    <button
                                        key={doc.id}
                                        onClick={() => setDoctorId(doc.id)}
                                        className={`rounded-md border px-3 py-2.5 text-left transition ${
                                            doctorId === doc.id
                                                ? "border-primary bg-primary-soft"
                                                : "border-border hover:border-primary/30"
                                        }`}
                                    >
                                        <p className="text-sm font-medium text-foreground">{doc?.name ?? "N/A"}</p>
                                        <p className="text-xs text-text-muted">{doc.specialization}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    {/* Time slots */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Time
                        </label>
                        <div className="space-y-3">
                            {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                                <div key={period}>
                                    <p className="mb-1.5 text-xs font-medium text-text-muted">{period}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {slots.map((slot) => (
                                            <button
                                                key={slot}
                                                onClick={() => setTime(slot)}
                                                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                                                    time === slot
                                                        ? "border-primary bg-primary text-white"
                                                        : "border-border text-text-muted hover:border-primary/30 hover:text-foreground"
                                                }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Reason for visit
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            placeholder="Briefly describe your symptoms or reason for the visit"
                            className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-border bg-surface px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface-muted"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit || bookMutation.isPending}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {bookMutation.isPending ? "Booking…" : "Confirm appointment"}
                    </button>
                </div>
            </div>
        </div>
    );
}