import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")?.toUpperCase();
  if (!code) return NextResponse.json({ valid: false, error: "No code provided" }, { status: 400 });

  try {
    const promo = await prisma.promoCode.findUnique({ where: { code } });
    if (!promo) return NextResponse.json({ valid: false, error: "Invalid promo code" });
    if (!promo.isActive) return NextResponse.json({ valid: false, error: "Promo code is inactive" });

    const now = new Date();
    if (now < promo.validFrom) return NextResponse.json({ valid: false, error: "Promo code not yet active" });
    if (now > promo.validTo)   return NextResponse.json({ valid: false, error: "Promo code has expired" });
    if (promo.usedCount >= promo.maxUses) return NextResponse.json({ valid: false, error: "Promo code has reached its usage limit" });

    return NextResponse.json({ valid: true, discount: promo.discount, code: promo.code });
  } catch {
    return NextResponse.json({ valid: false, error: "Failed to validate code" }, { status: 500 });
  }
}
