"use client";

import { useState } from "react";
import { colors, fonts } from "@/config/theme";
import Button from "@/components/ui/Button";

export default function ReservarPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        guests: "2",
        date: "",
        time: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(form);

        alert("Reserva enviada. Nos pondremos en contacto contigo.");
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                background: `linear-gradient(160deg, ${colors.dark} 0%, #263234 100%)`,
                padding: "140px 24px 80px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 620,
                    color: colors.cream,
                }}
            >
                <h1
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "clamp(2.5rem,4vw,3.5rem)",
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                    }}
                >
                    Reservar Mesa
                </h1>

                <p
                    style={{
                        color: "rgba(245,241,232,0.6)",
                        marginBottom: 40,
                        lineHeight: 1.6,
                        fontFamily: fonts.primary,
                    }}
                >
                    Reserva tu mesa en San Luca y disfruta una experiencia gastronómica
                    única.
                </p>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 18,

                    }}
                >
                    <input
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={input}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={input}
                    />

                    <input
                        name="phone"
                        placeholder="Teléfono"
                        value={form.phone}
                        onChange={handleChange}
                        style={input}
                    />

                    <div style={{ display: "flex", gap: 12 }}>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            style={{ ...input, flex: 1 }}
                        />

                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            required
                            style={{ ...input, flex: 1 }}
                        />
                    </div>

                    <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        style={input}
                    >
                        <option value="1">1 Persona</option>
                        <option value="2">2 Personas</option>
                        <option value="3">3 Personas</option>
                        <option value="4">4 Personas</option>
                        <option value="5">5 Personas</option>
                        <option value="6">6 Personas</option>
                    </select>

                    <textarea
                        name="message"
                        placeholder="Mensaje o solicitud especial"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        style={input}
                    />

                    <div style={{ marginTop: 10 }}>
                        <Button dark>Confirmar Reserva</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}

const input: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "14px 16px",
    color: "#F5F1E8",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    outline: "none",
    borderRadius: 4,
};