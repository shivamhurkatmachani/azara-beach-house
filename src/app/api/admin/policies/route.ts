import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function GET() {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const rows = await prisma.policy.findMany();
  const obj: Record<string, string> = {};
  rows.forEach(r => { obj[r.key] = r.value; });
  return NextResponse.json(obj);
}

export async function PUT(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;

  const updates: Record<string, string> = await req.json();
  await Promise.all(
    Object.entries(updates).map(([key, value]) =>
      prisma.policy.upsert({
        where:  { key },
        update: { value },
        create: { key, value },
      }),
    ),
  );
  return NextResponse.json({ ok: true });
}
