import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/env";

export async function getCurrentAdminUser() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return null;
  }

  return user;
}
