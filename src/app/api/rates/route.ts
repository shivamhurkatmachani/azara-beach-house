import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic   = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control":        "no-store, no-cache, must-revalidate, max-age=0",
  "CDN-Cache-Control":    "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

export async function GET() {
  try {
    const rates = await prisma.seasonRate.findMany({
      where:   { isActive: true },
      orderBy: { startDate: "asc" },
    });
    return NextResponse.json(rates, { headers: NO_CACHE_HEADERS });
  } catch {
    return NextResponse.json([], { status: 200, headers: NO_CACHE_HEADERS });
  }
}
