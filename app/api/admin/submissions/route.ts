import { NextResponse } from "next/server";
import { isAdminAuthenticated, logAdminAction } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function GET(request: Request) {
  const clientIp = getClientIp(request);
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("contact_submissions")
    .select("id, name, email, company, subject, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[v0] Failed to load submissions:", error);
    await logAdminAction("submissions_viewed", { ip: clientIp, success: false, reason: "Database error" });
    return NextResponse.json({ error: "Failed to load submissions." }, { status: 500 });
  }

  // Log successful submissions view
  await logAdminAction("submissions_viewed", { ip: clientIp, success: true });

  return NextResponse.json({ submissions: data ?? [] });
}

export async function DELETE(request: Request) {
  const clientIp = getClientIp(request);
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = (await request.json()) as { id?: string };

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from("contact_submissions").delete().eq("id", id);

    if (error) {
      console.error("[v0] Failed to delete submission:", error);
      await logAdminAction("submission_deleted", {
        ip: clientIp,
        success: false,
        reason: "Database error",
      });
      return NextResponse.json({ error: "Failed to delete submission." }, { status: 500 });
    }

    // Log successful deletion
    await logAdminAction("submission_deleted", { ip: clientIp, success: true });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[v0] Delete submission error:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}
