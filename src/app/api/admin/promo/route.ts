import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function GET() {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const promos = await prisma.promoCode.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(promos);
}

export async function POST(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const body = await req.json();
  const promo = await prisma.promoCode.create({
    data: {
      code:      String(body.code).toUpperCase(),
      discount:  Number(body.discount),
      validFrom: new Date(body.validFrom),
      validTo:   new Date(body.validTo),
      maxUses:   Number(body.maxUses),
      isActive:  body.isActive ?? true,
    },
  });
  return NextResponse.json(promo);
}

export async function PUT(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const body = await req.json();
  const promo = await prisma.promoCode.update({
    where: { id: body.id },
    data: {
      code:      String(body.code).toUpperCase(),
      discount:  Number(body.discount),
      validFrom: new Date(body.validFrom),
      validTo:   new Date(body.validTo),
      maxUses:   Number(body.maxUses),
      isActive:  Boolean(body.isActive),
    },
  });
  return NextResponse.json(promo);
}

export async function DELETE(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const { id } = await req.json();
  await prisma.promoCode.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
