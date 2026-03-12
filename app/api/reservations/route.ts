// app/api/reservations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createReservationSchema } from "@/lib/validations";
import type { ApiResponse } from "@/types";

// ──────────────────────────────────────────────
// POST /api/reservations
// Crea una nueva reserva para el usuario autenticado
// ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
    try {
        // 1. Verificar autenticación
        // NOTA: Adapta esto a tu sistema de auth (NextAuth, Clerk, JWT, etc.)
        // Por ahora usamos el header x-user-id para testing manual con curl/Postman
        const userId =
            request.headers.get("x-user-id") ??
            // request.headers.get("authorization") ?? // para JWT
            null;

        if (!userId) {
            return NextResponse.json<ApiResponse>(
                { success: false, error: "No autenticado" },
                { status: 401 }
            );
        }

        // 2. Verificar que el usuario existe
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json<ApiResponse>(
                { success: false, error: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        // 3. Validar el body con Zod
        const body = await request.json();
        const validation = createReservationSchema.safeParse(body);

        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    error: Object.values(errors).flat().join(", "),
                },
                { status: 400 }
            );
        }

        const { date, time, ...rest } = validation.data;

        // 4. Combinar fecha + hora en un solo DateTime
        const reservationDate = new Date(`${date}T${time}:00`);

        if (isNaN(reservationDate.getTime())) {
            return NextResponse.json<ApiResponse>(
                { success: false, error: "Fecha u hora inválida" },
                { status: 400 }
            );
        }

        // 5. Verificar que la fecha no sea en el pasado
        if (reservationDate < new Date()) {
            return NextResponse.json<ApiResponse>(
                { success: false, error: "No puedes reservar en una fecha pasada" },
                { status: 400 }
            );
        }

        // 6. Crear la reserva
        const reservation = await prisma.reservation.create({
            data: {
                userId,
                date: reservationDate,
                ...rest,
            },
            select: {
                id: true,
                guestPhone: true,
                guestName: true,
                date: true,
                guests: true,
                sectionPreference: true,
                occasion: true,
                notes: true,
                status: true,
                wantsPreOrder: true,
                qrToken: true,
                createdAt: true,
            },
        });

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                data: reservation,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("[API] POST /api/reservations error:", error);
        return NextResponse.json<ApiResponse>(
            { success: false, error: "Error al crear la reserva" },
            { status: 500 }
        );
    }
}

// ──────────────────────────────────────────────
// GET /api/reservations
// Devuelve las reservas del usuario autenticado
// ──────────────────────────────────────────────
export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json<ApiResponse>(
                { success: false, error: "No autenticado" },
                { status: 401 }
            );
        }

        const reservations = await prisma.reservation.findMany({
            where: { userId },
            orderBy: { date: "asc" },
            select: {
                id: true,
                guestName: true,
                date: true,
                guests: true,
                sectionPreference: true,
                status: true,
                paymentStatus: true,
                wantsPreOrder: true,
                table: {
                    select: {
                        number: true,
                        section: { select: { name: true } },
                    },
                },
            },
        });

        return NextResponse.json<ApiResponse>({
            success: true,
            data: reservations,
        });
    } catch (error) {
        console.error("[API] GET /api/reservations error:", error);
        return NextResponse.json<ApiResponse>(
            { success: false, error: "Error al obtener reservas" },
            { status: 500 }
        );
    }
}