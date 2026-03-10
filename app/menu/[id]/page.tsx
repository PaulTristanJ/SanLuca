
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getMenuCategoryById } from "@/lib/db";

type PageProps = {
  params: Promise<{ id: string }>;


};



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = await getMenuCategoryById(id);

  if (!category) {
    return {
      title: "Category not found",
    };
  }

  return {
    title: category.name,
    description: `Dishes in ${category.name}`,
  };
}

export default async function MenuCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = await getMenuCategoryById(id);

  if (!category) {
    return (
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <p>Category not found</p>
        <Link
          href="/menu"
          style={{ display: "inline-block", marginBottom: "1rem" }}
        >
          ← Volver al menú
        </Link>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Link
        href="/menu"
        style={{ display: "inline-block", marginBottom: "1rem" }}
      >
        ← Volver al menú
      </Link>

      <h1 style={{ marginBottom: "1.5rem" }}>{category.name}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
        {category.dishes.map((dish) => (
          <article
            key={dish.id}
            style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", background: "#fff" }}
          >
            {dish.imageUrl ? (
              <div style={{ position: "relative", width: "100%", height: "180px" }}>
                <Image
                  src={dish.imageUrl}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}

            <div style={{ padding: "1rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.1rem" }}>{dish.name}</h2>
              {dish.description ? (
                <p style={{ margin: "0.5rem 0", color: "#555" }}>{dish.description}</p>
              ) : null}
              <p style={{ margin: 0, fontWeight: 600 }}>${dish.price.toFixed(2)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}