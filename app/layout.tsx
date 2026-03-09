/* ═══════════════════════════════════════════════════════════
   app/layout.tsx — GUÍA DE INTEGRACIÓN
   
   NO reemplaces tu layout.tsx completo.
   Solo agrega las líneas marcadas con ✅
   ═══════════════════════════════════════════════════════════ */

import type { Metadata } from "next";
import { fonts } from "@/config/theme";

// ✅ AGREGAR: estilos globales de San Luca v2
import "@/styles/san-luca.css";

// ✅ AGREGAR: Navbar y Footer
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "San Luca Ristorante — Auténtica Cocina Italiana",
  description:
    "Restaurante italiano premium en Aguascalientes. Cocina artesanal con ingredientes frescos y recetas de tres generaciones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head
     >
        {/* ✅ AGREGAR: Google Font para texto script */}
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* ✅ AGREGAR: Navbar global */}
        <Navbar />

        {/* Tu contenido existente (pages, rutas, etc.) */}
        <main>{children}</main>

        {/* ✅ AGREGAR: Footer global */}
        <Footer />
      </body>
    </html>
  );
}
