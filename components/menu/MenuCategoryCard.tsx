"use client";

// ─────────────────────────────────────────────
//  components/menu/MenuCategoryCard.tsx
//  Card para categorías del menú
// ─────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { fonts, colors } from "@/config/theme";

type MenuCategoryCardProps = {
    slug: string;
    name: string;
    nameIt?: string;
    description?: string;
    imageUrl?: string;
    href: string;
    dishCount?: number;
    size?: "default" | "large";
};

export default function MenuCategoryCard({
    name,
    nameIt,
    description,
    imageUrl,
    href,
    dishCount,
    size = "default",
}: MenuCategoryCardProps) {
    const [hovered, setHovered] = useState(false);

    const cardHeight = size === "large" ? "280px" : "200px";

    return (
        <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
            <article
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: "relative",
                    height: cardHeight,
                    overflow: "hidden",
                    borderRadius: "3px",
                    cursor: "pointer",
                    background: "#0d0d0b",
                    border: `1px solid ${hovered ? colors.peru : "rgba(186,132,60,0.15)"}`,
                    transition: "border-color 0.35s ease",
                }}
            >
                {/* Background image */}
                {imageUrl ? (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            transition: "transform 0.6s ease",
                            transform: hovered ? "scale(1.07)" : "scale(1)",
                        }}
                    >
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{
                                objectFit: "cover",
                                opacity: hovered ? 0.55 : 0.35,
                                transition: "opacity 0.35s ease",
                            }}
                        />
                    </div>
                ) : (
                    /* Fallback gradient pattern */
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: `radial-gradient(ellipse at 30% 50%, rgba(186,132,60,0.08) 0%, transparent 70%)`,
                            opacity: hovered ? 1 : 0.5,
                            transition: "opacity 0.35s ease",
                        }}
                    />
                )}

                {/* Gradient overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        padding: "1.75rem",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                    }}
                >
                    {nameIt && (
                        <p
                            style={{
                                fontFamily: fonts.primary,
                                fontSize: "0.65rem",
                                letterSpacing: "0.3em",
                                textTransform: "uppercase",
                                color: colors.peru,
                                margin: "0 0 6px",
                                opacity: hovered ? 1 : 0.7,
                                transition: "opacity 0.3s ease",
                            }}
                        >
                            {nameIt}
                        </p>
                    )}

                    <h3
                        style={{
                            fontFamily: fonts.primary,
                            fontSize: size === "large" ? "1.65rem" : "1.25rem",
                            fontWeight: 400,
                            letterSpacing: "0.06em",
                            color: "#fff",
                            margin: "0 0 6px",
                        }}
                    >
                        {name}
                    </h3>

                    {description && (
                        <p
                            style={{
                                fontFamily: fonts.primary,
                                fontSize: "0.78rem",
                                color: "rgba(255,255,255,0.5)",
                                margin: 0,
                                lineHeight: 1.5,
                                maxWidth: "28ch",
                                opacity: hovered ? 1 : 0,
                                transform: hovered ? "translateY(0)" : "translateY(6px)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {description}
                        </p>
                    )}

                    {dishCount !== undefined && (
                        <p
                            style={{
                                fontFamily: fonts.primary,
                                fontSize: "0.65rem",
                                letterSpacing: "0.2em",
                                color: "rgba(255,255,255,0.35)",
                                margin: "8px 0 0",
                                textTransform: "uppercase",
                                opacity: hovered ? 1 : 0.5,
                                transition: "opacity 0.3s ease",
                            }}
                        >
                            {dishCount} platillos
                        </p>
                    )}
                </div>

                {/* Arrow indicator */}
                <div
                    style={{
                        position: "absolute",
                        top: "1.25rem",
                        right: "1.25rem",
                        width: "28px",
                        height: "28px",
                        border: `1px solid ${colors.peru}`,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? "scale(1)" : "scale(0.7)",
                        transition: "all 0.3s ease",
                        zIndex: 2,
                    }}
                >
                    <span
                        style={{
                            color: colors.peru,
                            fontSize: "0.75rem",
                            lineHeight: 1,
                        }}
                    >
                        →
                    </span>
                </div>
            </article>
        </Link>
    );
}