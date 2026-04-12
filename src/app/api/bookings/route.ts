import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function genRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "AZR-";
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export async function POST(req: Request) {
  const body = await req.json();

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
      nights:          Number(body.nights),
      adults:          Number(body.adults),
      children:        Number(body.children ?? 0),
      firstName:       body.firstName,
      lastName:        body.lastName,
      email:           body.email,
      phone:           body.phone,
      gstNumber:       body.gstNumber ?? null,
      specialRequests: body.specialRequests ?? null,
      promoCode:       body.promoCode ?? null,
      paymentOption:   body.paymentOption,
      baseTotal:       Number(body.baseTotal),
      gstAmount:       Number(body.gstAmount),
      grandTotal:      Number(body.grandTotal),
    },
  });

  return NextResponse.json({ ref: booking.ref });
}

export async function GET() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ bookings });
}
