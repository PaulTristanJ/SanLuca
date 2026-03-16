"use client";

// ─────────────────────────────────────────────
//  components/menu/DishCardGold.tsx
//  Página 4 PDF — card horizontal dorada
//  imagen | nombre | descripción | precio | peso | ⊕
// ─────────────────────────────────────────────

import Image from "next/image";
import { useState } from "react";
import { fonts, colors } from "@/config/theme";

type DishCardGoldProps = {
    name: string;
    description?: string | null;
    price: number;
    weight?: number | null;
    imageUrl?: string | null;
    allergens?: string | null;
};

export default function DishCardGold({
    name,
    description,
    price,
    weight,
    imageUrl,
}: DishCardGoldProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <article
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#b8963e",
                border: `1px solid ${hovered ? "#d4ad56" : "#c9a44a"}`,
                transition: "all 0.25s ease",
                boxShadow: hovered
                    ? "0 6px 24px rgba(0,0,0,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.25)",
                cursor: "pointer",
                minHeight: "120px",
            }}
        >
            {/* Left — image area */}
            <div
                style={{
                    position: "relative",
                    width: "100px",
                    flexShrink: 0,
                    background: "#0d1214",
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
                            opacity: 0.75,
                            transform: hovered ? "scale(1.08)" : "scale(1)",
                            transition: "transform 0.4s ease",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(135deg, #1a2628 0%, #111a1c 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.5rem",
                                opacity: 0.2,
                                color: "#b8963e",
                            }}
                        >
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
                    gap: "0.4rem",
                }}
            >
                {/* Name + description */}
                <div>
                    <h3
                        style={{
                            fontFamily: fonts.primary,
                            fontSize: "0.88rem",
                            fontWeight: 800,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "#111a1c",
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
                                color: "rgba(17,26,28,0.7)",
                                margin: 0,
                                lineHeight: 1.4,
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* Bottom: price + weight + ⊕ */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                        marginTop: "0.25rem",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                        <span
                            style={{
                                fontFamily: fonts.primary,
                                fontSize: "1rem",
                                fontWeight: 800,
                                color: "#111a1c",
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
                                    color: "rgba(17,26,28,0.6)",
                                }}
                            >
                                {weight}GR
                            </span>
                        )}
                    </div>

                    {/* ⊕ button */}
                    <div
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "2px solid #111a1c",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            background: hovered ? "#111a1c" : "transparent",
                            transition: "background 0.2s ease",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.1rem",
                                lineHeight: 1,
                                color: hovered ? "#b8963e" : "#111a1c",
                                fontWeight: 300,
                                transition: "color 0.2s ease",
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