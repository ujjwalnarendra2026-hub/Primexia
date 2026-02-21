import { NextResponse } from "next/server";
import { isAdminAuthenticated, logAdminAction } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  notes: string | null;
  created_at: string;
};

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

async function loadSubmissions(): Promise<{ data: Submission[] | null; error: unknown | null }> {
  const supabaseAdmin = getSupabaseAdmin();

  const primary = await supabaseAdmin
    .from("contact_submissions")
    .select("id, name, email, phone, subject, message, notes, created_at")
    .order("created_at", { ascending: false });

  if (!primary.error) {
    return { data: (primary.data as Submission[] | null) ?? [], error: null };
  }

  // Fallback for legacy schemas where some columns may differ.
  const fallback = await supabaseAdmin.from("contact_submissions").select("*");
  if (fallback.error) {
    return { data: null, error: fallback.error };
  }

  const normalized = ((fallback.data as Record<string, unknown>[] | null) ?? []).map((row) => ({
    id: String(row.id ?? crypto.randomUUID()),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    phone: row.phone ? String(row.phone) : null,
    subject: String(row.subject ?? ""),
    message: String(row.message ?? ""),
    notes: row.notes ? String(row.notes) : null,
    created_at: String(row.created_at ?? new Date(0).toISOString()),
  }));

  normalized.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return { data: normalized, error: null };
}

export async function GET(request: Request) {
  const clientIp = getClientIp(request);
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await loadSubmissions();

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

export async function PATCH(request: Request) {
  const clientIp = getClientIp(request);
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, notes } = (await request.json()) as { id?: string; notes?: string | null };

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required." }, { status: 400 });
    }

    const normalizedNotes = typeof notes === "string" ? notes.trim() : "";
    if (normalizedNotes.length > 2000) {
      return NextResponse.json({ error: "Notes cannot exceed 2000 characters." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    let { error } = await supabaseAdmin
      .from("contact_submissions")
      .update({ notes: normalizedNotes || null, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      const fallback = await supabaseAdmin
        .from("contact_submissions")
        .update({ notes: normalizedNotes || null })
        .eq("id", id);
      error = fallback.error;
    }

    if (error) {
      console.error("[v0] Failed to update submission notes:", error);
      await logAdminAction("submission_notes_updated", {
        ip: clientIp,
        success: false,
        reason: "Notes update database error",
      });
      return NextResponse.json({ error: "Failed to update notes." }, { status: 500 });
    }

    await logAdminAction("submission_notes_updated", { ip: clientIp, success: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[v0] Update submission notes error:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}
