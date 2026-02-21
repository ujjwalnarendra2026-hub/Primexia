import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { ADMIN_COOKIE_NAME, getAdminSessionToken, logAdminAction } from "@/lib/admin-auth";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const body = (await request.json()) as { password?: string };

  if (!body.password) {
    await logAdminAction("login", { ip: clientIp, success: false, reason: "No password provided" });
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const env = getServerEnv();
  const input = Buffer.from(body.password);
  const expected = Buffer.from(env.adminPassword);

  if (input.length !== expected.length || !timingSafeEqual(input, expected)) {
    await logAdminAction("login", { ip: clientIp, success: false, reason: "Invalid password" });
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  // Log successful login
  await logAdminAction("login", { ip: clientIp, success: true });

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
