import { NextRequest, NextResponse } from "next/server";
import { ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_COOKIE, SESSION_VALUE } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return res;
}
