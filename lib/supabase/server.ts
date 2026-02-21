import { createClient } from "@supabase/supabase-js";
import { getServerEnv } from "@/lib/env";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  created_at: string;
}

export function getSupabaseAdmin() {
  const env = getServerEnv();
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
