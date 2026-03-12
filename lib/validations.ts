// lib/validations/reservation.ts
import { z } from "zod";

export const createReservationSchema = z.object({
  // Titular de la reserva
  guestName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100),
  guestPhone: z
    .string()
    .regex(/^[\d\s\+\-\(\)]{8,20}$/, "Número de teléfono inválido"),

  // Detalles del turno
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:MM)"),
  guests: z
    .number()
    .int()
    .min(1, "Mínimo 1 persona")
    .max(20, "Máximo 20 personas"),

  // Preferencias
  sectionPreference: z
    .enum(["Terraza", "Planta Alta", "Salón"])
    .optional(),
  occasion: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;