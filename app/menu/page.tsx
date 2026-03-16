// ─────────────────────────────────────────────
//  app/menu/page.tsx
//  Ruta /menu — solo el sistema de menú interactivo
//  El hero principal vive en app/page.tsx (HOME)
// ─────────────────────────────────────────────

import type { Metadata } from "next";
import { getFeaturedDishes, getMenuCategories } from "@/lib/db";
import MenuPageClient from "@/components/menu/MenuPageClient";

export const metadata: Metadata = {
  title: "Menú | San Luca",
  description: "Explora nuestro menú de cocina italiana premium",
};

export default async function MenuPage() {
  const [featured, categories] = await Promise.all([
    getFeaturedDishes(),
    getMenuCategories(),
  ]);

  const featuredDishes = featured.slice(0, 3).map((d) => ({
    id: d.id,
    name: d.name,
    description: d.description ?? null,
    price: Number(d.price),
    imageUrl: d.imageUrl ?? null,
    category: (d as any).categoryName ?? null,
  }));

  const dbCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    imageUrl: (c as any).imageUrl ?? null,
  }));

  return (
    <MenuPageClient
      featuredDishes={featuredDishes}
      dbCategories={dbCategories}
    />
  );
}