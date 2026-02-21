import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!body.password) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const env = getServerEnv();
  const input = Buffer.from(body.password);
  const expected = Buffer.from(env.adminPassword);

  if (input.length !== expected.length || !timingSafeEqual(input, expected)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminSessionToken(),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
