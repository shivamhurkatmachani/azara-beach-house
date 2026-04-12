import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function genRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "AZR-";
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const nights    = Number(body.nights);
    const baseTotal = Number(body.baseTotal);
    const gstAmount = Number(body.gstAmount);
    const grandTotal= Number(body.grandTotal);

    if (!body.firstName || !body.email || !body.checkIn || !body.checkOut) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (isNaN(nights) || isNaN(baseTotal) || isNaN(grandTotal)) {
      return NextResponse.json({ error: "Invalid pricing data" }, { status: 400 });
    }

    // If a promo code was used, increment its usedCount
    if (body.promoCode) {
      await prisma.promoCode.updateMany({
        where: { code: body.promoCode.toUpperCase(), isActive: true },
        data:  { usedCount: { increment: 1 } },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        ref:             genRef(),
        checkIn:         new Date(body.checkIn),
        checkOut:        new Date(body.checkOut),
        nights,
        adults:          Number(body.adults) || 1,
        children:        Number(body.children) || 0,
        firstName:       String(body.firstName),
        lastName:        String(body.lastName || ""),
        email:           String(body.email),
        phone:           String(body.phone || ""),
        gstNumber:       body.gstNumber ?? null,
        specialRequests: body.specialRequests ?? null,
        promoCode:       body.promoCode ?? null,
        paymentOption:   String(body.paymentOption || "100"),
        baseTotal,
        gstAmount,
        grandTotal,
      },
    });

    return NextResponse.json({ ref: booking.ref });
  } catch (err) {
    console.error("Booking creation error:", err);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ bookings });
}
