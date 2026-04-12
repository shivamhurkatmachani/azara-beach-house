import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

function isoDate(d: Date) {
  return d.toISOString().split("T")[0];
}

export async function GET(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const { searchParams } = new URL(req.url);
  const monthParam = searchParams.get("month") ?? isoDate(new Date()).substring(0, 7);
  const [year, mon] = monthParam.split("-").map(Number);

  const start = new Date(year, mon - 1, 1);
  const end   = new Date(year, mon, 0, 23, 59, 59);

  const [blocked, bookings] = await Promise.all([
    prisma.blockedDate.findMany(),
    prisma.booking.findMany({
      where: {
        status: { not: "cancelled" },
        OR: [
          { checkIn:  { gte: start, lte: end } },
          { checkOut: { gte: start, lte: end } },
          { AND: [{ checkIn: { lte: start } }, { checkOut: { gte: end } }] },
        ],
      },
    }),
  ]);

  // Expand bookings into per-day map
  const bookedDays: Record<string, { name: string; ref: string }> = {};
  for (const b of bookings) {
    const ci = new Date(b.checkIn); ci.setHours(0, 0, 0, 0);
    const co = new Date(b.checkOut); co.setHours(0, 0, 0, 0);
    const c  = new Date(ci);
    while (c < co) {
      bookedDays[isoDate(c)] = { name: `${b.firstName} ${b.lastName}`, ref: b.ref };
      c.setDate(c.getDate() + 1);
    }
  }

  return NextResponse.json({
    blocked:    blocked.map(b => ({ date: b.date, reason: b.reason })),
    bookedDays,
  });
}

export async function POST(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const { dates, reason } = await req.json();
  const toBlock: string[] = Array.isArray(dates) ? dates : [dates];

  await Promise.all(
    toBlock.map(date =>
      prisma.blockedDate.upsert({
        where:  { date },
        update: { reason: reason ?? null },
        create: { date, reason: reason ?? null },
      }),
    ),
  );

  return NextResponse.json({ ok: true, blocked: toBlock.length });
}

export async function DELETE(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const { dates } = await req.json();
  const toUnblock: string[] = Array.isArray(dates) ? dates : [dates];

  await prisma.blockedDate.deleteMany({
    where: { date: { in: toUnblock } },
  });

  return NextResponse.json({ ok: true });
}
