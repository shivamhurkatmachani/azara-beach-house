import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function GET() {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;
  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(inquiries);
}

export async function PATCH(req: NextRequest) {
  const authErr = requireAdminAuth();
  if (authErr) return authErr;
  const { id, status } = await req.json();
  const updated = await prisma.contactInquiry.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(updated);
}
