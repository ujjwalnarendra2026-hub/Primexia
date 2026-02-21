import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";

function buildToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return "";
  }

  return createHmac("sha256", secret).update("primexia-admin").digest("hex");
}

export function getAdminSessionToken() {
  return buildToken();
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const cookieValue = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!cookieValue) {
    return false;
  }

  const expected = buildToken();
  if (!expected || cookieValue.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(expected));
}
