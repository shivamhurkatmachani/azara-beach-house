import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function GET() {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const rates = await prisma.seasonRate.findMany({ orderBy: { startMonth: "asc" } });
  return NextResponse.json(rates);
}

export async function POST(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const body = await req.json();
  const rate = await prisma.seasonRate.create({
    data: {
      name:        body.name,
      startMonth:  Number(body.startMonth),
      startDay:    Number(body.startDay),
      endMonth:    Number(body.endMonth),
      endDay:      Number(body.endDay),
      nightlyRate: Number(body.nightlyRate),
      isActive:    body.isActive ?? true,
    },
  });
  return NextResponse.json(rate);
}

export async function PUT(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const body = await req.json();
  const rate = await prisma.seasonRate.update({
    where: { id: body.id },
    data: {
      name:        body.name,
      startMonth:  Number(body.startMonth),
      startDay:    Number(body.startDay),
      endMonth:    Number(body.endMonth),
      endDay:      Number(body.endDay),
      nightlyRate: Number(body.nightlyRate),
      isActive:    Boolean(body.isActive),
    },
  });
  return NextResponse.json(rate);
}

export async function DELETE(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const { id } = await req.json();
  await prisma.seasonRate.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
