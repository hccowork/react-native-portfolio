import { NextResponse } from "next/server";
import { adminLoginPath } from "@/lib/admin-route";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL(adminLoginPath, request.url));
}
