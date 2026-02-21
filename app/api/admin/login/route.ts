import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { ADMIN_COOKIE_NAME, getAdminSessionToken, logAdminAction } from "@/lib/admin-auth";
import {
  isLockedOut,
  recordLoginAttempt,
  getRemainingAttempts,
  BRUTE_FORCE_CONFIG,
} from "@/lib/brute-force";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  // Check if IP is locked out due to too many failed attempts
  const locked = await isLockedOut(clientIp);
  if (locked) {
    await logAdminAction("login", {
      ip: clientIp,
      success: false,
      reason: `IP locked out - too many failed attempts`,
    });
    return NextResponse.json(
      {
        error: `Too many failed login attempts. Please try again in ${BRUTE_FORCE_CONFIG.LOCKOUT_MINUTES} minutes.`,
      },
      { status: 429 }
    );
  }

  const body = (await request.json()) as { password?: string };

  if (!body.password) {
    await recordLoginAttempt(clientIp, false);
    await logAdminAction("login", { ip: clientIp, success: false, reason: "No password provided" });
    const remaining = await getRemainingAttempts(clientIp);
    return NextResponse.json(
      {
        error: "Password is required.",
        attemptsRemaining: remaining,
      },
      { status: 400 }
    );
  }

  const env = getServerEnv();
  const input = Buffer.from(body.password);
  const expected = Buffer.from(env.adminPassword);

  if (input.length !== expected.length || !timingSafeEqual(input, expected)) {
    await recordLoginAttempt(clientIp, false);
    await logAdminAction("login", { ip: clientIp, success: false, reason: "Invalid password" });
    const remaining = await getRemainingAttempts(clientIp);
    return NextResponse.json(
      {
        error: "Invalid password.",
        attemptsRemaining: remaining,
      },
      { status: 401 }
    );
  }

  // Successful login - record attempt
  await recordLoginAttempt(clientIp, true);
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
