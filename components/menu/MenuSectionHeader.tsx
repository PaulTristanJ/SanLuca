// ─────────────────────────────────────────────
//  components/menu/MenuSectionHeader.tsx
//  Encabezado reutilizable para secciones del menú
// ─────────────────────────────────────────────

import { fonts, colors } from "@/config/theme";

type MenuSectionHeaderProps = {
    overline?: string;
    title: string;
    titleAccent?: string;
    subtitle?: string;
};

export default function MenuSectionHeader({
    overline,
    title,
    titleAccent,
    subtitle,
}: MenuSectionHeaderProps) {
    return (
        <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            {overline && (
                <p
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "0.7rem",
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: colors.peru,
                        margin: "0 0 1rem",
                    }}
                >
                    {overline}
                </p>
            )}

            <h2
                style={{
                    fontFamily: fonts.primary,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    color: colors.dark,
                    margin: "0 0 1rem",
                    lineHeight: 1.1,
                }}
            >
                {title}{" "}
                {titleAccent && (
                    <span style={{ color: colors.peru }}>{titleAccent}</span>
                )}
            </h2>

            {subtitle && (
                <p
                    style={{
                        fontFamily: fonts.primary,
                        fontSize: "0.9rem",
                        color: "rgba(28,38,40,0.5)",
                        margin: 0,
                        maxWidth: "60ch",
                        lineHeight: 1.7,
                    }}
                >
                    {subtitle}
                </p>
            )}

            <div
                style={{
                    width: "32px",
                    height: "2px",
                    background: colors.peru,
                    marginTop: "1.25rem",
                }}
            />
        </div>
    );
}