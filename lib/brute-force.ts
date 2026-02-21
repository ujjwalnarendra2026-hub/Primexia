import { getSupabaseAdmin } from "@/lib/supabase/server";

export const BRUTE_FORCE_CONFIG = {
  MAX_ATTEMPTS: 5,
  WINDOW_MINUTES: 15,
  LOCKOUT_MINUTES: 30,
};

/**
 * Get the number of recent failed login attempts for an IP
 */
export async function getFailedAttempts(clientIp: string): Promise<number> {
  const supabaseAdmin = getSupabaseAdmin();
  const now = new Date();
  const windowStart = new Date(now.getTime() - BRUTE_FORCE_CONFIG.WINDOW_MINUTES * 60 * 1000);

  const { count, error } = await supabaseAdmin
    .from("login_attempts")
    .select("*", { count: "exact", head: true })
    .eq("client_ip", clientIp)
    .eq("success", false)
    .gt("created_at", windowStart.toISOString());

  if (error) {
    console.error("[v0] Failed to get attempt count:", error);
    return 0;
  }

  return count || 0;
}

/**
 * Check if an IP is currently locked out
 */
export async function isLockedOut(clientIp: string): Promise<boolean> {
  const supabaseAdmin = getSupabaseAdmin();
  const now = new Date();
  const lockoutStart = new Date(now.getTime() - BRUTE_FORCE_CONFIG.LOCKOUT_MINUTES * 60 * 1000);

  const { data, error } = await supabaseAdmin
    .from("login_attempts")
    .select("*")
    .eq("client_ip", clientIp)
    .eq("success", false)
    .gte("created_at", lockoutStart.toISOString())
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("[v0] Failed to check lockout status:", error);
    return false;
  }

  if (!data || data.length === 0) {
    return false;
  }

  // Check if we've hit max attempts in the window
  const failedAttempts = await getFailedAttempts(clientIp);
  return failedAttempts >= BRUTE_FORCE_CONFIG.MAX_ATTEMPTS;
}

/**
 * Record a login attempt
 */
export async function recordLoginAttempt(clientIp: string, success: boolean) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    await supabaseAdmin.from("login_attempts").insert({
      client_ip: clientIp,
      success,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[v0] Failed to record login attempt:", error);
  }
}

/**
 * Get remaining attempts before lockout
 */
export async function getRemainingAttempts(clientIp: string): Promise<number> {
  const failedAttempts = await getFailedAttempts(clientIp);
  const remaining = Math.max(0, BRUTE_FORCE_CONFIG.MAX_ATTEMPTS - failedAttempts);
  return remaining;
}

/**
 * Clear old login attempts (can be called periodically)
 */
export async function clearOldAttempts() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const cutoff = new Date(Date.now() - BRUTE_FORCE_CONFIG.LOCKOUT_MINUTES * 60 * 1000);

    await supabaseAdmin
      .from("login_attempts")
      .delete()
      .lt("created_at", cutoff.toISOString());
  } catch (error) {
    console.error("[v0] Failed to clear old attempts:", error);
  }
}
