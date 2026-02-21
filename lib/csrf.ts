import { createHmac } from "node:crypto";
import { cookies } from "next/headers";

const CSRF_COOKIE_NAME = "csrf_token";
const CSRF_HEADER_NAME = "x-csrf-token";
const CSRF_SECRET = process.env.CSRF_SECRET || "csrf_secret_key";

/**
 * Generate a CSRF token
 */
export function generateCsrfToken(): string {
  const randomBytes = require("crypto").randomBytes(32).toString("hex");
  const token = createHmac("sha256", CSRF_SECRET).update(randomBytes).digest("hex");
  return token;
}

/**
 * Set CSRF token in cookie for client to read
 */
export async function setCsrfToken(response: any) {
  const token = generateCsrfToken();
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false, // Must be readable by client
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return token;
}

/**
 * Verify CSRF token from request
 */
export async function verifyCsrfToken(request: Request): Promise<boolean> {
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!headerToken || !cookieToken) {
    return false;
  }

  // Verify tokens match
  return headerToken === cookieToken;
}
