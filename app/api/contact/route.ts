import { NextResponse } from "next/server";
import { contactSchema, sanitizeText } from "@/lib/validation";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
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

  const { error } = await supabaseAdmin.from("contact_submissions").insert({
    name: sanitizeText(input.name),
    email: input.email.trim().toLowerCase(),
    company: input.company ? sanitizeText(input.company) : null,
    subject: sanitizeText(input.subject),
    message: sanitizeText(input.message),
  });

  if (error) {
    return NextResponse.json({ error: "Unable to submit message right now." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
