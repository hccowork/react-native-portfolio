export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function hasSupabaseEnv() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  if (adminEmails.length === 0) {
    return true;
  }

  return adminEmails.includes(email.toLowerCase());
}
