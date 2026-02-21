import { NextResponse } from "next/server";
import { contactSchema, sanitizeText } from "@/lib/validation";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// Rate limiting constants
const RATE_LIMIT_REQUESTS = 5; // requests
const RATE_LIMIT_WINDOW = 3600; // seconds (1 hour)

async function checkRateLimit(clientIp: string): Promise<boolean> {
  const supabaseAdmin = getSupabaseAdmin();
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW * 1000);

  // Get count of recent requests from this IP
  const { count, error: countError } = await supabaseAdmin
    .from("rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("client_ip", clientIp)
    .gt("created_at", windowStart.toISOString());

  if (countError) {
    console.error("[v0] Rate limit check error:", countError);
    return true; // Allow on error
  }

  const requestCount = count || 0;

  if (requestCount >= RATE_LIMIT_REQUESTS) {
    return false; // Rate limited
  }

  // Record this request
  const { error: insertError } = await supabaseAdmin.from("rate_limits").insert({
    client_ip: clientIp,
    created_at: now.toISOString(),
  });

  if (insertError) {
    console.error("[v0] Failed to record rate limit:", insertError);
  }

  return true; // Not rate limited
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  // Check rate limit
  const allowed = await checkRateLimit(clientIp);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(RATE_LIMIT_WINDOW) } },
    );
  }

  const payload = await request.json();
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("contact_submissions")
    .insert({
      name: sanitizeText(input.name),
      email: input.email.trim().toLowerCase(),
      company: input.company ? sanitizeText(input.company) : null,
      subject: sanitizeText(input.subject),
      message: sanitizeText(input.message),
      client_ip: clientIp,
    })
    .select("id");

  if (error) {
    console.error("[v0] Submission error:", error);
    return NextResponse.json({ error: "Unable to submit message right now." }, { status: 500 });
  }

  // Trigger email sending via Supabase function
  if (data && data[0]) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            id: data[0].id,
            name: input.name,
            email: input.email,
            company: input.company,
            subject: input.subject,
            message: input.message,
          }),
        });

        if (!response.ok) {
          console.error("[v0] Email function failed:", await response.text());
        }
      }
    } catch (emailError) {
      console.error("[v0] Email trigger error:", emailError);
      // Don't fail the submission if email fails
    }
  }

  return NextResponse.json({ ok: true });
}
