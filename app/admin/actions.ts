"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminSupabaseClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { slugify, splitCsv } from "@/lib/utils";

const ASSET_BUCKET = "portfolio-assets";
const RESUME_BUCKET = "portfolio-resumes";

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
    return "";
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
    return "";
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
    redirect("/admin/login?error=invalid-credentials");
  }

  redirect("/admin");
}

export async function upsertProfileAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

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

  await client.from("profile").upsert(payload);
  revalidatePortfolio();
}

export async function upsertProjectAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

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

  await client.from("projects").upsert(payload);
  revalidatePortfolio();
}

export async function deleteProjectAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  await client.from("projects").delete().eq("id", getString(formData, "id"));
  revalidatePortfolio();
}

export async function upsertSkillAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  await client.from("skills").upsert({
    id: getString(formData, "id") || undefined,
    name: getString(formData, "name"),
    category: getString(formData, "category"),
    sort_order: getNumber(formData, "sort_order", 99),
  });

  revalidatePortfolio();
}

export async function deleteSkillAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  await client.from("skills").delete().eq("id", getString(formData, "id"));
  revalidatePortfolio();
}

export async function upsertExperienceAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  await client.from("experiences").upsert({
    id: getString(formData, "id") || undefined,
    company: getString(formData, "company"),
    role: getString(formData, "role"),
    start_label: getString(formData, "start_label"),
    end_label: getString(formData, "end_label"),
    summary: getString(formData, "summary"),
    achievements: splitCsv(getString(formData, "achievements")),
    sort_order: getNumber(formData, "sort_order", 99),
  });

  revalidatePortfolio();
}

export async function deleteExperienceAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  await client.from("experiences").delete().eq("id", getString(formData, "id"));
  revalidatePortfolio();
}

export async function upsertSocialLinkAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  await client.from("social_links").upsert({
    id: getString(formData, "id") || undefined,
    label: getString(formData, "label"),
    href: getString(formData, "href"),
    sort_order: getNumber(formData, "sort_order", 99),
  });

  revalidatePortfolio();
}

export async function deleteSocialLinkAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  await client.from("social_links").delete().eq("id", getString(formData, "id"));
  revalidatePortfolio();
}

export async function deleteMessageAction(formData: FormData) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return;
  }

  await client.from("messages").delete().eq("id", getString(formData, "id"));
  revalidatePortfolio();
}
