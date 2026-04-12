import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const { searchParams } = new URL(req.url);
  const status   = searchParams.get("status") ?? "";
  const dateFrom = searchParams.get("dateFrom") ?? "";
  const dateTo   = searchParams.get("dateTo") ?? "";
  const search   = searchParams.get("search") ?? "";

  const where: Record<string, unknown> = {};

  if (status) where.status = status;

  if (dateFrom || dateTo) {
    where.checkIn = {
      ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
      ...(dateTo   ? { lte: new Date(dateTo + "T23:59:59") } : {}),
    };
  }

  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName:  { contains: search, mode: "insensitive" } },
      { email:     { contains: search, mode: "insensitive" } },
      { ref:       { contains: search, mode: "insensitive" } },
    ];
  }

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}
