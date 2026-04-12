import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name:     String(body.name || ""),
        email:    String(body.email || ""),
        phone:    body.phone  ? String(body.phone)  : null,
        checkIn:  body.checkIn  || null,
        checkOut: body.checkOut || null,
        guests:   body.guests   || null,
        message:  body.message  || null,
      },
    });
    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (err) {
    console.error("Contact inquiry error:", err);
    return NextResponse.json({ ok: false, error: "Failed to save inquiry" }, { status: 500 });
  }
}
