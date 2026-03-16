import twilio from "twilio";

function getClient() {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) throw new Error("Twilio credentials not configured");
    return twilio(sid, token);
}

function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    // Add Mexico country code if not present
    if (digits.startsWith("52") && digits.length === 12) return `+${digits}`;
    if (digits.length === 10) return `+52${digits}`;
    return `+${digits}`;
}

export async function sendReservationQR(params: {
    phone: string;
    guestName: string;
    date: Date;
    guests: number;
    sectionPreference?: string | null;
    qrToken: string;
}) {
    const appUrl = process.env.APP_URL ?? "http://localhost:3000";
    const checkinUrl = `${appUrl}/checkin/${params.qrToken}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(checkinUrl)}`;

    const dateStr = params.date.toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const section = params.sectionPreference ? `\n📍 ${params.sectionPreference}` : "";

    const body =
        `¡Hola ${params.guestName}! 🍽️\n\n` +
        `Tu reserva en *San Luca* ha sido registrada.\n\n` +
        `📅 ${dateStr}\n` +
        `👥 ${params.guests} ${params.guests === 1 ? "persona" : "personas"}${section}\n\n` +
        `Guarda este QR y preséntalo al llegar para tu check-in.\n` +
        `También puedes acceder aquí: ${checkinUrl}`;

    const from = `whatsapp:${process.env.TWILIO_WHATSAPP_FROM ?? "+14155238886"}`;
    const to = `whatsapp:${formatPhone(params.phone)}`;

    await getClient().messages.create({ from, to, body, mediaUrl: [qrImageUrl] });
}
