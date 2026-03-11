// ─────────────────────────────────────────────
//  app/menu/brunch/[category]/page.tsx
//  Platillos de brunch — mismo estilo PDF p.4
// ─────────────────────────────────────────────

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMenuCategoryById } from "@/lib/db";
import { fonts, colors } from "@/config/theme";
import DishCardGold from "@/components/menu/DishCardGold";

type PageProps = {
    params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const data = await getMenuCategoryById(category);
    if (!data) return { title: "Categoría no encontrada" };
    return {
        title: `${data.name} | Brunch | San Luca`,
        description: `Platillos de brunch en ${data.name}`,
    };
}

export default async function BrunchCategoryPage({ params }: PageProps) {
    const { category } = await params;
    const data = await getMenuCategoryById(category);

    if (!data) return notFound();

    return (
        <main
            style={{
                background: "#1a2628",
                minHeight: "100vh",
                paddingTop: "100px",
                paddingBottom: "5rem",
            }}
        >
            {/* ── TÍTULO ── */}
            <div
                style={{
                    textAlign: "center",
                    padding: "2.5rem clamp(1.5rem, 4vw, 4rem) 3.5rem",
                    position: "relative",
                }}
            >
                {/* Watermark */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: fonts.primary,
                        fontSize: "clamp(5rem, 14vw, 11rem)",
                        fontWeight: 800,
                        color: "rgba(201,150,74,0.04)",
                        textTransform: "uppercase",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                >
                    {data.name}
                </div>

                <p
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "0.65rem",
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: colors.peru,
                        margin: "0 0 0.75rem",
                        position: "relative",
                    }}
                >
                    San Luca · Brunch
                </p>

                <h1
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                        margin: "0 0 0.5rem",
                        position: "relative",
                    }}
                >
                    {data.name.toUpperCase()}
                </h1>

                <p
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.3)",
                        margin: 0,
                        position: "relative",
                    }}
                >
                    {data.dishes.length}{" "}
                    {data.dishes.length === 1 ? "platillo" : "platillos"}
                </p>
            </div>

            {/* ── DISH GRID DORADO ── */}
            <div
                style={{
                    maxWidth: "1320px",
                    margin: "0 auto",
                    padding: "0 clamp(1.5rem, 4vw, 4rem)",
                }}
            >
                {data.dishes.length === 0 ? (
                    <p
                        style={{
                            textAlign: "center",
                            fontFamily: fonts.primary,
                            fontSize: "0.8rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.3)",
                            padding: "5rem",
                        }}
                    >
                        Próximamente
                    </p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
                            gap: "1rem",
                        }}
                    >
                        {data.dishes.map((dish) => (
                            <DishCardGold
                                key={dish.id}
                                name={dish.name}
                                description={dish.description ?? null}
                                price={Number(dish.price)}
                                weight={(dish as any).weight ?? null}
                                imageUrl={dish.imageUrl ?? null}
                                allergens={(dish as any).allergens ?? null}
                            />
                        ))}
                    </div>
                )}

                <div
                    style={{
                        marginTop: "4rem",
                        paddingTop: "2rem",
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                    }}
                >
                    <Link
                        href="/menu/brunch"
                        style={{
                            fontFamily: fonts.primary,
                            fontSize: "0.72rem",
                            letterSpacing: "0.28em",
                            textTransform: "uppercase",
                            color: colors.peru,
                            textDecoration: "none",
                        }}
                    >
                        ← Volver a Brunch
                    </Link>
                </div>
            </div>
        </main>
    );
}