import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.blockedDate.findMany({ select: { date: true } });
  return NextResponse.json({ blocked: rows.map(r => r.date) });
}
