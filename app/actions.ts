"use server";

import { revalidatePath } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

export async function submitContactMessage(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  const payload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  await client.from("messages").insert(payload);
  revalidatePath("/contact");
  revalidatePath("/admin");
}
