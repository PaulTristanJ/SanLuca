// ─────────────────────────────────────────────
//  app/menu/comida/page.tsx
//  PDF Página 2 → PLATOS INSIGNIA + tabs + grid categorías
// ─────────────────────────────────────────────

import type { Metadata } from "next";
import { getFeaturedDishes, getMenuCategories } from "@/lib/db";
import PlatosInsignia from "@/components/menu/Platosinsignia";
import ComidaSectionsClient from "@/components/menu/ComidaSectionsClient";

export const metadata: Metadata = {
    title: "Menú Comida | San Luca",
    description:
        "Cocina italiana de autor — Clásica, Autor, Bebidas, Vinos y más",
};

export default async function MenuComidaPage() {
    const [featured, categories] = await Promise.all([
        getFeaturedDishes(),
        getMenuCategories(),
    ]);

    // Mapear dishes de DB para PlatosInsignia
    const insigniaDishes = featured.slice(0, 3).map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description ?? null,
        price: Number(d.price),
        imageUrl: d.imageUrl ?? null,
        category: (d as any).categoryName ?? null,
    }));

    // Mapear categorías de DB para el grid de imágenes
    const dbCategories = categories.map((c) => ({
        id: c.id,
        name: c.name,
        imageUrl: (c as any).imageUrl ?? null,
    }));

    return (
        <main style={{ background: "#1a2628", minHeight: "100vh" }}>
            {/* PDF PÁGINA 2: PLATOS INSIGNIA */}
            <div style={{ paddingTop: "80px" }}>
                <PlatosInsignia dishes={insigniaDishes} />
            </div>

            {/* PDF PÁGINA 2 bottom + PÁGINA 3: Tabs + Category Grid */}
            <ComidaSectionsClient dbCategories={dbCategories} />
        </main>
    );
}