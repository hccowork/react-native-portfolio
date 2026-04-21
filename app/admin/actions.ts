"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminLoginPath } from "@/lib/admin-route";
import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";
import type { AdminActionState } from "@/lib/types";
import { slugify, splitCsv } from "@/lib/utils";

const ASSET_BUCKET = "portfolio-assets";
const RESUME_BUCKET = "portfolio-resumes";

function success(message: string): AdminActionState {
  return {
    status: "success",
    message,
    submittedAt: Date.now(),
  };
}

function failure(message: string): AdminActionState {
  return {
    status: "error",
    message,
    submittedAt: Date.now(),
  };
}

function revalidatePortfolio() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/projects");
  revalidatePath("/contact");
  revalidatePath("/admin");
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(formData.get(key) ?? fallback);
  return Number.isFinite(value) ? value : fallback;
}

async function uploadPublicFile(bucket: string, folder: string, file: File) {
  const client = createAdminSupabaseClient();

  if (!client || !file || file.size === 0) {
    throw new Error("Supabase storage is not available.");
  }

  const extension = file.name.includes(".") ? file.name.split(".").pop() : "";
  const safeName = slugify(file.name.replace(/\.[^/.]+$/, "")) || "asset";
  const path = `${folder}/${Date.now()}-${safeName}${extension ? `.${extension}` : ""}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await client.storage.from(bucket).upload(path, arrayBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: true,
  });

  if (error) {
    console.error(`Failed to upload to ${bucket}`, error);
    throw new Error(error.message);
  }

  const { data } = client.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function loginAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return;
  }

  const email = getString(formData, "email");
  const password = getString(formData, "password");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`${adminLoginPath}?error=invalid-credentials` as any);
  }

  redirect("/admin");
}

export async function upsertProfileAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  try {
    const avatarFile = formData.get("avatar_file");
    const resumeFile = formData.get("resume_file");

    const avatarUrl =
      avatarFile instanceof File && avatarFile.size > 0
        ? await uploadPublicFile(ASSET_BUCKET, "avatars", avatarFile)
        : getString(formData, "avatar_url");

    const resumeUrl =
      resumeFile instanceof File && resumeFile.size > 0
        ? await uploadPublicFile(RESUME_BUCKET, "resumes", resumeFile)
        : getString(formData, "resume_url");

    const payload = {
      id: getString(formData, "id") || "profile-1",
      full_name: getString(formData, "full_name"),
      title: getString(formData, "title"),
      intro: getString(formData, "intro"),
      long_bio: getString(formData, "long_bio"),
      location: getString(formData, "location"),
      email: getString(formData, "email"),
      resume_url: resumeUrl,
      avatar_url: avatarUrl,
      years_experience: getNumber(formData, "years_experience"),
      projects_shipped: getNumber(formData, "projects_shipped"),
      companies_worked: getNumber(formData, "companies_worked"),
    };

    const { error } = await client.from("profile").upsert(payload);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePortfolio();
    return success("Profile updated successfully.");
  } catch (error) {
    return failure(error instanceof Error ? error.message : "Failed to update profile.");
  }
}

export async function upsertProjectAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  try {
    const title = getString(formData, "title");
    const imageFile = formData.get("image_file");
    const imageUrl =
      imageFile instanceof File && imageFile.size > 0
        ? await uploadPublicFile(ASSET_BUCKET, "projects", imageFile)
        : getString(formData, "image_url");

    const payload = {
      id: getString(formData, "id") || undefined,
      title,
      slug: getString(formData, "slug") || slugify(title),
      summary: getString(formData, "summary"),
      description: getString(formData, "description"),
      tech_stack: splitCsv(getString(formData, "tech_stack")),
      image_url: imageUrl,
      live_url: getString(formData, "live_url"),
      github_url: getString(formData, "github_url"),
      platform: getString(formData, "platform"),
      featured: formData.get("featured") === "on",
      sort_order: getNumber(formData, "sort_order", 99),
    };

    const { error } = await client.from("projects").upsert(payload);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePortfolio();
    return success(payload.id ? "Project updated successfully." : "Project created successfully.");
  } catch (error) {
    return failure(error instanceof Error ? error.message : "Failed to save project.");
  }
}

export async function deleteProjectAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  const { error } = await client.from("projects").delete().eq("id", getString(formData, "id"));

  if (error) {
    return failure(error.message);
  }

  revalidatePortfolio();
  return success("Project deleted.");
}

export async function upsertSkillAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  const payload = {
    id: getString(formData, "id") || undefined,
    name: getString(formData, "name"),
    category: getString(formData, "category"),
    sort_order: getNumber(formData, "sort_order", 99),
  };

  const { error } = await client.from("skills").upsert(payload);

  if (error) {
    return failure(error.message);
  }

  revalidatePortfolio();
  return success(payload.id ? "Skill updated successfully." : "Skill created successfully.");
}

export async function deleteSkillAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  const { error } = await client.from("skills").delete().eq("id", getString(formData, "id"));

  if (error) {
    return failure(error.message);
  }

  revalidatePortfolio();
  return success("Skill deleted.");
}

export async function upsertExperienceAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  const payload = {
    id: getString(formData, "id") || undefined,
    company: getString(formData, "company"),
    role: getString(formData, "role"),
    start_label: getString(formData, "start_label"),
    end_label: getString(formData, "end_label"),
    summary: getString(formData, "summary"),
    achievements: splitCsv(getString(formData, "achievements")),
    sort_order: getNumber(formData, "sort_order", 99),
  };

  const { error } = await client.from("experiences").upsert(payload);

  if (error) {
    return failure(error.message);
  }

  revalidatePortfolio();
  return success(payload.id ? "Experience updated successfully." : "Experience created successfully.");
}

export async function deleteExperienceAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  const { error } = await client.from("experiences").delete().eq("id", getString(formData, "id"));

  if (error) {
    return failure(error.message);
  }

  revalidatePortfolio();
  return success("Experience deleted.");
}

export async function upsertSocialLinkAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  const payload = {
    id: getString(formData, "id") || undefined,
    label: getString(formData, "label"),
    href: getString(formData, "href"),
    sort_order: getNumber(formData, "sort_order", 99),
  };

  const { error } = await client.from("social_links").upsert(payload);

  if (error) {
    return failure(error.message);
  }

  revalidatePortfolio();
  return success(payload.id ? "Social link updated successfully." : "Social link created successfully.");
}

export async function deleteSocialLinkAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  const { error } = await client.from("social_links").delete().eq("id", getString(formData, "id"));

  if (error) {
    return failure(error.message);
  }

  revalidatePortfolio();
  return success("Social link deleted.");
}

export async function deleteMessageAction(
  _previousState: AdminActionState,
  formData: FormData,
) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return failure("Supabase is not configured yet.");
  }

  const { error } = await client.from("messages").delete().eq("id", getString(formData, "id"));

  if (error) {
    return failure(error.message);
  }

  revalidatePortfolio();
  return success("Message archived.");
}
