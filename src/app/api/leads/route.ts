import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { ok: false, error: "name, email and phone are required" },
        { status: 400 },
      );
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name:    String(body.name).trim(),
        email:   String(body.email).trim(),
        phone:   String(body.phone).trim(),
        checkIn: body.travelDates ? String(body.travelDates).trim() : null,
        guests:  body.guests      ? String(body.guests)             : null,
        source:  "popup",
      },
    });

    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to save lead" },
      { status: 500 },
    );
  }
}
