"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SECTIONS = ["Terraza", "Planta Alta", "Salón"] as const;
type Section = (typeof SECTIONS)[number];

const SECTION_IMAGES: Record<Section, string> = {
    "Terraza": "/images/terraza.jpg",
    "Planta Alta": "/images/planta-alta.jpg",
    "Salón": "/images/salon.jpg",
};

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

interface FormData {
    guestName: string;
    guestPhone: string;
    date: string;
    time: string;
    guests: number;
    sectionPreference: Section;
    occasion: string;
    notes: string;
}

interface ReservationFormProps {
    onSuccess?: (reservation: { id: string; qrToken: string }) => void;
}

export function ReservationForm({ onSuccess }: ReservationFormProps) {
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) router.push("/login?redirect=/reservation");
    }, [router]);

    const [form, setForm] = useState<FormData>({
        guestName: "",
        guestPhone: "",
        date: "",
        time: "",
        guests: 2,
        sectionPreference: "Terraza",
        occasion: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = <K extends keyof FormData>(field: K, value: FormData[K]) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async () => {
        setError(null);

        if (!form.guestName || !form.guestPhone || !form.date || !form.time) {
            setError("Por favor completa todos los campos requeridos.");
            return;
        }

        setLoading(true);
        try {
            const userId = localStorage.getItem("userId") ?? "";
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": userId,
                },
                body: JSON.stringify({
                    ...form,
                    guests: Number(form.guests),
                    occasion: form.occasion || undefined,
                    notes: form.notes || undefined,
                }),
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            onSuccess?.(data.data);
            router.push("/dashboard");
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Error al crear la reserva");
        } finally {
            setLoading(false);
        }
    };

    const activeIdx = SECTIONS.indexOf(form.sectionPreference);
    const thumbLeft = `calc(${(activeIdx / SECTIONS.length) * 100}% + 4px)`;
    const thumbWidth = `calc(${100 / SECTIONS.length}% - 8px)`;

    return (
        <div className="rf-wrapper">

            {/* ── Panel izquierdo ── */}
            <div className="rf-left">
                <div>
                    <h1 className="rf-hero-title">Reservar Mesa</h1>
                    <p className="rf-hero-sub">Tu mejor experiencia culinaria</p>
                </div>

                {/* Imagen + switch que sobresale por los lados */}
                <div className="rf-image-wrapper">
                    <div className="rf-image-box">
                        {SECTIONS.map((sec) => (
                            <img
                                key={sec}
                                src={SECTION_IMAGES[sec]}
                                alt={sec}
                                className="rf-image"
                                style={{ opacity: form.sectionPreference === sec ? 1 : 0 }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).parentElement!.style.background =
                                        "linear-gradient(135deg, #2a2f2e 0%, #3a3228 100%)";
                                }}
                            />
                        ))}
                    </div>

                    {/* Switch que sobresale 24px a cada lado */}
                    <div className="rf-switch-overlay">
                        <div className="rf-switch-track">
                            <div
                                className="rf-switch-thumb"
                                style={{ left: thumbLeft, width: thumbWidth }}
                            />
                            {SECTIONS.map((sec) => (
                                <button
                                    key={sec}
                                    className={`rf-switch-btn${form.sectionPreference === sec ? " rf-switch-btn--active" : ""}`}
                                    onClick={() => set("sectionPreference", sec)}
                                >
                                    {sec}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Panel derecho ── */}
            <div className="rf-right">
                <div>
                    <h2 className="rf-form-title">Crea tu Reserva</h2>
                    <p className="rf-form-sub">Tu reservación desde tu móvil</p>
                </div>

                <div className="rf-divider" />

                <div>
                    <label className="rf-label">Nombre</label>
                    <input
                        className="rf-input"
                        placeholder="Ej. María González"
                        value={form.guestName}
                        onChange={(e) => set("guestName", e.target.value)}
                    />
                </div>

                <div>
                    <label className="rf-label">Número celular</label>
                    <input
                        className="rf-input"
                        type="tel"
                        placeholder="+52 55 0000 0000"
                        value={form.guestPhone}
                        onChange={(e) => set("guestPhone", e.target.value)}
                    />
                </div>

                <div className="rf-row-three">
                    <div>
                        <label className="rf-label">Fecha</label>
                        <input
                            className="rf-input"
                            type="date"
                            value={form.date}
                            min={new Date().toISOString().split("T")[0]}
                            style={{ colorScheme: "dark" }}
                            onChange={(e) => set("date", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="rf-label">Hora</label>
                        <input
                            className="rf-input"
                            type="time"
                            value={form.time}
                            style={{ colorScheme: "dark" }}
                            onChange={(e) => set("time", e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="rf-label">Personas</label>
                        <select
                            className="rf-select"
                            value={form.guests}
                            onChange={(e) => set("guests", Number(e.target.value))}
                        >
                            {PARTY_SIZES.map((n) => (
                                <option key={n} value={n} style={{ background: "#1b2224" }}>
                                    {n} {n === 1 ? "persona" : "personas"}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="rf-label">Solicitud especial</label>
                    <textarea
                        className="rf-textarea"
                        placeholder="Alergias, decoración, peticiones especiales..."
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        maxLength={500}
                    />
                </div>

                {error && <div className="rf-error">⚠ {error}</div>}

                <button
                    className="rf-submit"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Creando reserva..." : "Reservar"}
                </button>
            </div>
        </div>
    );
}
