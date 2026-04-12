import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rates = await prisma.seasonRate.findMany({
      where:   { isActive: true },
      orderBy: { startDate: "asc" },
    });
    return NextResponse.json(rates, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
