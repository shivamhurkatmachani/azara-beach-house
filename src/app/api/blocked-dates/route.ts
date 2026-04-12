import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [blockedRows, bookings] = await Promise.all([
    prisma.blockedDate.findMany({ select: { date: true } }),
    prisma.booking.findMany({
      where:  { status: { not: "cancelled" } },
      select: { checkIn: true, checkOut: true },
    }),
  ]);

  const blocked = new Set<string>(blockedRows.map((r) => r.date));

  // Expand each booking's check-in → check-out range into individual dates
  for (const b of bookings) {
    const cursor = new Date(b.checkIn);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date(b.checkOut);
    end.setHours(0, 0, 0, 0);
    // Block all nights (check-in inclusive, check-out exclusive — guests leave that morning)
    while (cursor < end) {
      blocked.add(cursor.toISOString().split("T")[0]);
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  return NextResponse.json(
    { blocked: Array.from(blocked) },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
