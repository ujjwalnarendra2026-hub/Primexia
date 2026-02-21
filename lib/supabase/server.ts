import { createClient } from "@supabase/supabase-js";
import { Agent } from "undici";
import { getSupabaseEnv } from "@/lib/env";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  notes?: string | null;
  created_at: string;
}

export function getSupabaseAdmin() {
  const env = getSupabaseEnv();
  const allowInsecureTls =
    process.env.NODE_ENV !== "production" &&
    process.env.ALLOW_INSECURE_SUPABASE_TLS !== "false";

  const insecureAgent = allowInsecureTls
    ? new Agent({
        connect: { rejectUnauthorized: false },
      })
    : null;

  const customFetch: typeof fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    if (!insecureAgent) {
      return fetch(input, init);
    }
    return fetch(input, { ...(init ?? {}), dispatcher: insecureAgent as never } as RequestInit);
  }) as typeof fetch;

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    global: {
      fetch: customFetch,
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
