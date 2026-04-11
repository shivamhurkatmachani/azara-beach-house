import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "blocked-dates.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

/** PATCH /api/blocked-dates — replace the blocked dates array */
export async function PATCH(req: Request) {
  const body = await req.json();
  const filePath = path.join(process.cwd(), "data", "blocked-dates.json");
  fs.writeFileSync(filePath, JSON.stringify({ blocked: body.blocked ?? [] }, null, 2));
  return NextResponse.json({ ok: true });
}
