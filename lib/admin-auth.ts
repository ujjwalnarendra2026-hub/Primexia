import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase/server";

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

/**
 * Log admin actions for security audit trail
 */
export async function logAdminAction(
  action: "login" | "logout" | "submissions_viewed" | "submission_deleted",
  details: {
    ip?: string;
    success: boolean;
    reason?: string;
  }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    await supabaseAdmin.from("admin_audit_log").insert({
      action,
      success: details.success,
      client_ip: details.ip || "unknown",
      details: details.reason || null,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[v0] Failed to log admin action:", error);
  }
}
