"use server";

import { revalidatePath } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import type { FormActionState } from "@/lib/types";

const initialFormState: FormActionState = {
  status: "idle",
  message: "",
  submittedAt: 0,
};

function contactSuccess(message: string): FormActionState {
  return {
    status: "success",
    message,
    submittedAt: Date.now(),
  };
}

function contactFailure(message: string): FormActionState {
  return {
    status: "error",
    message,
    submittedAt: Date.now(),
  };
}

export async function submitContactMessage(
  _previousState: FormActionState = initialFormState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return contactFailure("Contact form is not configured yet.");
  }

  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return contactFailure("Please fill in your name, email, and message.");
  }

  const { error } = await client.from("messages").insert(payload);

  if (error) {
    return contactFailure(error.message || "Failed to send your message.");
  }

  revalidatePath("/contact");
  revalidatePath("/admin");
  return contactSuccess("Your message has been sent successfully.");
}
