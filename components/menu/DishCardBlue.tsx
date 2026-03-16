"use client";

// ─────────────────────────────────────────────
//  components/menu/DishCardBlue.tsx
//  Variante azul para platillos de BRUNCH
//  Mismo layout que DishCardGold, paleta azul
// ─────────────────────────────────────────────

import Image from "next/image";
import { useState } from "react";
import { fonts } from "@/config/theme";

type DishCardBlueProps = {
    name: string;
    description?: string | null;
    price: number;
    weight?: number | null;
    imageUrl?: string | null;
};

export default function DishCardBlue({
    name,
    description,
    price,
    weight,
    imageUrl,
}: DishCardBlueProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <article
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#4a7a9b",
                border: `1px solid ${hovered ? "#5a9abf" : "#3d6b8c"}`,
                transition: "all 0.25s ease",
                boxShadow: hovered
                    ? "0 6px 24px rgba(30,58,82,0.25)"
                    : "0 2px 8px rgba(30,58,82,0.12)",
                cursor: "pointer",
                minHeight: "120px",
            }}
        >
            {/* Left — image */}
            <div
                style={{
                    position: "relative",
                    width: "100px",
                    flexShrink: 0,
                    background: "#2c4a6e",
                    overflow: "hidden",
                }}
            >
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes="100px"
                        style={{
                            objectFit: "cover",
                            opacity: 0.8,
                            transform: hovered ? "scale(1.08)" : "scale(1)",
                            transition: "transform 0.4s ease",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(135deg, #2c4a6e 0%, #1e3a52 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span style={{ fontSize: "1.5rem", opacity: 0.2, color: "#fff" }}>
                            ✦
                        </span>
                    </div>
                )}
            </div>

            {/* Right — content */}
            <div
                style={{
                    flex: 1,
                    padding: "1rem 1.1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <h3
                        style={{
                            fontFamily: fonts.primary,
                            fontSize: "0.88rem",
                            fontWeight: 800,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "#ffffff",
                            margin: "0 0 0.3rem",
                            lineHeight: 1.2,
                        }}
                    >
                        {name}
                    </h3>
                    {description && (
                        <p
                            style={{
                                fontFamily: "'Dancing Script', cursive",
                                fontSize: "0.82rem",
                                color: "rgba(255,255,255,0.65)",
                                margin: 0,
                                lineHeight: 1.4,
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* Price + weight + ⊕ */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                        <span
                            style={{
                                fontFamily: fonts.primary,
                                fontSize: "1rem",
                                fontWeight: 800,
                                color: "#ffffff",
                            }}
                        >
                            ${price.toFixed(0)}
                        </span>
                        {weight && (
                            <span
                                style={{
                                    fontFamily: fonts.primary,
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.55)",
                                }}
                            >
                                {weight}GR
                            </span>
                        )}
                    </div>

                    <div
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: hovered ? "rgba(255,255,255,0.15)" : "transparent",
                            transition: "background 0.2s ease",
                            flexShrink: 0,
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.1rem",
                                lineHeight: 1,
                                color: "#ffffff",
                                fontWeight: 300,
                            }}
                        >
                            +
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}