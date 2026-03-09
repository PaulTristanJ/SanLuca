"use client";

import { colors, fonts } from "@/config/theme";
import { Texture, Label } from "@/components/ui/Editorial";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function ReservationCTA() {
  return (
    <section
      id="reservar"
      style={{
        background: `linear-gradient(160deg, ${colors.dark} 0%, #263234 100%)`,
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <Texture />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(600px, 80vw)",
          height: "min(600px, 80vw)",
          borderRadius: "50%",
          border: "1px solid rgba(186,132,60,0.04)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(80px,14vw,180px) 24px",
        }}
      >
        <Reveal>
          <Label light>05 — Prenotazione</Label>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: fonts.primary,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              fontWeight: 800,
              color: colors.cream,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              lineHeight: 0.9,
              margin: "16px 0",
            }}
          >
            Reserva tu
            <br />
            <span style={{ color: colors.peru }}>Experiencia</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            style={{
              fontFamily: fonts.primary,
              fontSize: "1.05rem",
              fontWeight: 400,
              color: "rgba(245,241,232,0.4)",
              maxWidth: 440,
              margin: "24px auto 40px",
              lineHeight: 1.8,
            }}
          >
            Cada velada en San Luca es única. Reserva tu mesa y déjanos crear
            un momento que recordarás.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button dark href="/contact">
              Reservar Ahora
            </Button>
            <Button href="tel:+524491234567">Llamar</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
