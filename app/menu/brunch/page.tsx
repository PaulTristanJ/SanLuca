// ─────────────────────────────────────────────
//  app/menu/brunch/page.tsx
//  Brunch — mismo estilo visual del PDF
// ─────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getMenuCategories } from "@/lib/db";
import { fonts, colors } from "@/config/theme";
import { BRUNCH_GROUPS } from "@/config/Menustructure";
export const metadata: Metadata = {
    title: "Brunch | San Luca",
    description: "El mejor brunch italiano",
};

export default async function MenuBrunchPage() {
    const categories = await getMenuCategories();

    const dbCategories = categories.map((c) => ({
        id: c.id,
        name: c.name,
        imageUrl: (c as any).imageUrl ?? null,
    }));

    return (
        <main
            style={{
                background: "#1a2628",
                minHeight: "100vh",
                paddingTop: "80px",
            }}
        >
            {/* ── HEADER ── */}
            <div
                style={{
                    padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)",
                    maxWidth: "1320px",
                    margin: "0 auto",
                    position: "relative",
                }}
            >
                {/* Breadcrumb */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "2.5rem",
                    }}
                >
                    <Link
                        href="/menu"
                        style={{
                            fontFamily: fonts.primary,
                            fontSize: "0.68rem",
                            letterSpacing: "0.28em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.3)",
                            textDecoration: "none",
                        }}
                    >
                        Menú
                    </Link>
                    <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                    <span
                        style={{
                            fontFamily: fonts.primary,
                            fontSize: "0.68rem",
                            letterSpacing: "0.28em",
                            textTransform: "uppercase",
                            color: colors.peru,
                        }}
                    >
                        Brunch
                    </span>
                </div>

                {/* Watermark */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "3rem",
                        transform: "translateY(-50%)",
                        fontFamily: fonts.primary,
                        fontSize: "clamp(6rem, 15vw, 13rem)",
                        fontWeight: 800,
                        color: "rgba(201,150,74,0.04)",
                        letterSpacing: "-0.04em",
                        userSelect: "none",
                        pointerEvents: "none",
                        textTransform: "uppercase",
                    }}
                >
                    BRUNCH
                </div>

                <p
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "0.68rem",
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: colors.peru,
                        margin: "0 0 0.75rem",
                    }}
                >
                    Fin de Semana
                </p>

                <h1
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "clamp(3rem, 7vw, 6.5rem)",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                        margin: "0 0 1rem",
                        lineHeight: 0.9,
                    }}
                >
                    SAN LUCA{" "}
                    <span style={{ color: colors.peru }}>BRUNCH</span>
                </h1>

                <p
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.4)",
                        maxWidth: "50ch",
                        lineHeight: 1.7,
                        margin: 0,
                    }}
                >
                    Una experiencia única de brunch italiano. Platos salados, dulces
                    artesanales y bebidas especiales.
                </p>
            </div>

            {/* ── CATEGORY GRID ── */}
            <div
                style={{
                    maxWidth: "1320px",
                    margin: "0 auto",
                    padding: "0 clamp(1.5rem, 4vw, 4rem) 5rem",
                }}
            >
                {BRUNCH_GROUPS.map((group) => (
                    <div key={group.slug} style={{ marginBottom: "3.5rem" }}>
                        {/* Group label */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1.5rem",
                                marginBottom: "1.5rem",
                                paddingBottom: "1rem",
                                borderBottom: "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily: fonts.primary,
                                    fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "#ffffff",
                                    margin: 0,
                                }}
                            >
                                {group.groupName}
                            </h2>
                            {group.groupSubtitle && (
                                <span
                                    style={{
                                        fontFamily: fonts.primary,
                                        fontSize: "0.78rem",
                                        color: "rgba(255,255,255,0.3)",
                                        fontStyle: "italic",
                                    }}
                                >
                                    {group.groupSubtitle}
                                </span>
                            )}
                        </div>

                        {/* Category grid */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                                gridAutoRows: "180px",
                                gap: "6px",
                            }}
                        >
                            {group.categories.map((cat) => {
                                const dbMatch = dbCategories.find(
                                    (d) =>
                                        d.id === cat.slug ||
                                        d.name.toLowerCase() === cat.name.toLowerCase()
                                );
                                return (
                                    <BrunchCategoryCard
                                        key={cat.slug}
                                        name={cat.name}
                                        description={cat.description}
                                        imageUrl={dbMatch?.imageUrl ?? null}
                                        href={`/menu/brunch/${cat.slug}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

// ── Brunch category card ─────────────────────
function BrunchCategoryCard({
    name,
    description,
    imageUrl,
    href,
}: {
    name: string;
    description?: string;
    imageUrl?: string | null;
    href: string;
}) {
    return (
        <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    background: "#253032",
                    cursor: "pointer",
                }}
            >
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        style={{ objectFit: "cover", opacity: 0.5 }}
                    />
                )}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(17,26,28,0.9) 0%, transparent 60%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "1.25rem",
                        left: "1.25rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: fonts.primary,
                            fontSize: "0.88rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#ffffff",
                            margin: 0,
                        }}
                    >
                        {name.toUpperCase()}
                    </p>
                    {description && (
                        <p
                            style={{
                                fontFamily: fonts.primary,
                                fontSize: "0.7rem",
                                color: "rgba(255,255,255,0.45)",
                                margin: "4px 0 0",
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}