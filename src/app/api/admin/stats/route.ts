import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

function isoDate(d: Date) {
  return d.toISOString().split("T")[0];
}

export async function GET() {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const now   = new Date();
  const today = isoDate(now);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  // Last 7 days range
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  // Next 30 days
  const thirtyDaysLater = new Date(now);
  thirtyDaysLater.setDate(now.getDate() + 30);

  const [
    allBookings,
    monthBookings,
    blockedDates,
    recentBookings,
  ] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.booking.findMany({
      where: {
        createdAt: { gte: monthStart, lte: monthEnd },
        status: { not: "cancelled" },
      },
    }),
    prisma.blockedDate.findMany({ select: { date: true } }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  // Revenue this month
  const monthRevenue = monthBookings.reduce((s, b) => s + b.grandTotal, 0);
  const monthCount   = monthBookings.length;

  // Today check-ins / check-outs
  const todayCheckIns  = allBookings.filter(b => isoDate(b.checkIn)  === today && b.status !== "cancelled").length;
  const todayCheckOuts = allBookings.filter(b => isoDate(b.checkOut) === today && b.status !== "cancelled").length;

  // Status breakdown
  const statusMap: Record<string, number> = {};
  for (const b of allBookings) {
    statusMap[b.status] = (statusMap[b.status] ?? 0) + 1;
  }

  // Last 7 days revenue
  const last7: { date: string; revenue: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dayStr = isoDate(d);
    const rev = allBookings
      .filter(b => isoDate(b.createdAt) === dayStr && b.status !== "cancelled")
      .reduce((s, b) => s + b.grandTotal, 0);
    last7.push({ date: dayStr, revenue: rev });
  }

  // Upcoming arrivals (next 30 days)
  const upcomingArrivals = allBookings
    .filter(b => {
      const ci = new Date(b.checkIn);
      return ci >= now && ci <= thirtyDaysLater && b.status !== "cancelled";
    })
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
    .slice(0, 8);

  // Booked date map (next 30 days)
  const bookedDateMap: Record<string, string> = {};
  for (const b of allBookings) {
    if (b.status === "cancelled") continue;
    const ci = new Date(b.checkIn); ci.setHours(0,0,0,0);
    const co = new Date(b.checkOut); co.setHours(0,0,0,0);
    const c  = new Date(ci);
    while (c < co) {
      bookedDateMap[isoDate(c)] = b.ref;
      c.setDate(c.getDate() + 1);
    }
  }

  return NextResponse.json({
    monthCount,
    monthRevenue,
    todayCheckIns,
    todayCheckOuts,
    statusMap,
    last7Revenue: last7,
    upcomingArrivals,
    bookedDateMap,
    blockedDates: blockedDates.map(b => b.date),
    recentBookings,
  });
}
