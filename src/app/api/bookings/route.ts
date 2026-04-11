import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

function genRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "AZR-";
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export async function POST(req: Request) {
  const booking = await req.json();
  const filePath = path.join(process.cwd(), "data", "bookings.json");

  let data: { bookings: unknown[] } = { bookings: [] };
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    /* file missing — use default */
  }

  const ref = genRef();
  data.bookings.push({
    ...booking,
    ref,
    createdAt: new Date().toISOString(),
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ ref });
}

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "bookings.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}
