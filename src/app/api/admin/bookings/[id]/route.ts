import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const booking = await prisma.booking.findUnique({ where: { id: params.id } });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const body = await req.json();
  const data: { status?: string; adminNotes?: string; paidAmount?: number } = {};

  if ("status"     in body) data.status     = String(body.status);
  if ("adminNotes" in body) data.adminNotes = String(body.adminNotes ?? "");
  if ("paidAmount" in body) data.paidAmount = Number(body.paidAmount) || 0;

  const booking = await prisma.booking.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(booking);
}
