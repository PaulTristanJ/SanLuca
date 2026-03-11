// ─────────────────────────────────────────────
//  app/menu/brunch/page.tsx
//  Redirect a /menu — la experiencia brunch
//  ya está en la single page con el switch
// ─────────────────────────────────────────────

import { redirect } from "next/navigation";

export default function BrunchPage() {
    redirect("/menu");
}