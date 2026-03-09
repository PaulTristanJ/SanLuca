"use client";

import { useState } from "react";
import { colors, fonts } from "@/config/theme";
import { Texture, Label } from "@/components/ui/Editorial";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const DISHES = [
  {
    name: "Pappardelle al Tartufo",
    cat: "Pasta",
    desc: "Pasta ancha artesanal, crema de trufa negra, pecorino romano, aceite de trufa blanca",
    price: "$325",
  },
  {
    name: "Ossobuco alla Milanese",
    cat: "Secondi",
    desc: "Chamorro braseado lentamente, gremolata cítrica, risotto azafrán, reducción de vino",
    price: "$385",
  },
  {
    name: "Burrata con Prosciutto",
    cat: "Antipasti",
    desc: "Burrata cremosa de Puglia, jamón de Parma 24 meses, higos confitados, miel de trufa",
    price: "$225",
  },
];

function DishCard({
  name,
  cat,
  desc,
  price,
  index,
}: {
  name: string;
  cat: string;
  desc: string;
  price: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(186,132,60,0.06)"
          : "rgba(245,241,232,0.02)",
        border: `1px solid ${hovered ? "rgba(186,132,60,0.12)" : "rgba(245,241,232,0.04)"}`,
        padding: "clamp(32px,4vw,52px)",
        transition: "all 0.5s cubic-bezier(.25,.46,.45,.94)",
        cursor: "default",
        position: "relative",
      }}
    >
      {/* Background number */}
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: "4rem",
          fontWeight: 800,
          color: "rgba(186,132,60,0.06)",
          position: "absolute",
          top: 16,
          right: 24,
          lineHeight: 1,
        }}
      >
        0{index + 1}
      </div>

      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: "0.6rem",
          fontWeight: 800,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: colors.peru,
          marginBottom: 16,
        }}
      >
        {cat}
      </div>

      <h3
        style={{
          fontFamily: fonts.primary,
          fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
          fontWeight: 800,
          color: colors.cream,
          letterSpacing: "0.04em",
          margin: "0 0 12px",
          lineHeight: 1.15,
        }}
      >
        {name}
      </h3>

      <p
        style={{
          fontFamily: fonts.primary,
          fontSize: "0.9rem",
          fontWeight: 400,
          color: "rgba(245,241,232,0.38)",
          lineHeight: 1.7,
          margin: "0 0 24px",
        }}
      >
        {desc}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: fonts.primary,
            fontSize: "1.2rem",
            fontWeight: 800,
            color: colors.peru,
          }}
        >
          {price}
        </span>
        <div
          style={{
            width: hovered ? 32 : 0,
            height: 1,
            background: colors.peru,
            transition: "width 0.5s cubic-bezier(.25,.46,.45,.94)",
          }}
        />
      </div>
    </div>
  );
}

export default function FeaturedMenu() {
  return (
    <section
      style={{
        background: colors.dark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Texture />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(80px,12vw,160px) clamp(24px,5vw,80px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: "clamp(48px,6vw,80px)",
          }}
        >
          <Reveal>
            <Label light>02 — Piatti</Label>
            <h2
              style={{
                fontFamily: fonts.primary,
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                fontWeight: 800,
                color: colors.cream,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 0.95,
                margin: "12px 0 0",
              }}
            >
              Platos
              <br />
              <span style={{ color: colors.peru }}>Signature</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Button href="/menu">Ver Menú Completo</Button>
          </Reveal>
        </div>

        {/* Dishes grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: 2,
          }}
        >
          {DISHES.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.12}>
              <DishCard {...d} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
