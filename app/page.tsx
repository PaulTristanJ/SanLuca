/* ═══════════════════════════════════════════════════════════
   app/page.tsx — PÁGINA PRINCIPAL
   
   Reemplaza tu page.tsx actual con esto.
   Cada sección se importa como componente independiente.
   ═══════════════════════════════════════════════════════════ */

import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import FeaturedMenu from "@/components/FeaturedMenu";
import Experience from "@/components/Experience";
import ChefStory from "@/components/ChefStory";
import ReservationCTA from "@/components/ReservationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <FeaturedMenu />
      <Experience />
      <ChefStory />
      <ReservationCTA />
    </>
  );
}
