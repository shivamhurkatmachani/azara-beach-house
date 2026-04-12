import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "azara_admin_session";
export const SESSION_VALUE  = "authenticated_v1";
export const ADMIN_EMAIL    = "admin@azarabeachhouse.com";
export const ADMIN_PASSWORD = "Azara@2025!";

export function requireAdminAuth(): NextResponse | null {
  const session = cookies().get(SESSION_COOKIE);
  if (!session || session.value !== SESSION_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
