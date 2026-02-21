export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getServerEnv() {
  return {
    supabaseUrl: requireEnv("SUPABASE_URL"),
    supabaseServiceRoleKey: requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    adminPassword: requireEnv("ADMIN_DASHBOARD_PASSWORD"),
    adminSessionSecret: requireEnv("ADMIN_SESSION_SECRET"),
  };
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primexia.co";
