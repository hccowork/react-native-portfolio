import { NextResponse } from "next/server";
import { isValidResumeUrl } from "@/lib/resume";
import { supabaseUrl } from "@/lib/supabase/env";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

const RESUME_BUCKET = "portfolio-resumes";
const RESUME_FOLDER = "resumes";

export const dynamic = "force-dynamic";

function getStoredResumePath(resumeUrl?: string | null) {
  if (!isValidResumeUrl(resumeUrl) || !supabaseUrl) {
    return null;
  }

  try {
    const storedUrl = new URL(resumeUrl);
    const storageUrl = new URL(supabaseUrl);
    const publicPathPrefix = `/storage/v1/object/public/${RESUME_BUCKET}/`;

    if (storedUrl.origin !== storageUrl.origin || !storedUrl.pathname.startsWith(publicPathPrefix)) {
      return null;
    }

    return decodeURIComponent(storedUrl.pathname.slice(publicPathPrefix.length));
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const client = createAdminSupabaseClient();

  if (!client) {
    return NextResponse.json({ error: "Resume downloads are not configured." }, { status: 503 });
  }

  const { data: profile, error: profileError } = await client
    .from("profile")
    .select("resume_url")
    .limit(1)
    .maybeSingle();

  if (profileError) {
    return NextResponse.json({ error: "Unable to load the resume." }, { status: 500 });
  }

  const storedResumePath = getStoredResumePath(profile?.resume_url);

  if (storedResumePath) {
    const { data: signedFile, error: signedFileError } = await client.storage
      .from(RESUME_BUCKET)
      .createSignedUrl(storedResumePath, 60);

    if (!signedFileError && signedFile?.signedUrl) {
      return NextResponse.redirect(new URL(signedFile.signedUrl, request.url));
    }
  }

  if (isValidResumeUrl(profile?.resume_url)) {
    return NextResponse.redirect(profile.resume_url);
  }

  const { data: files, error: filesError } = await client.storage.from(RESUME_BUCKET).list(RESUME_FOLDER, {
    limit: 1,
    sortBy: { column: "created_at", order: "desc" },
  });

  const latestResume = files?.[0];

  if (filesError || !latestResume) {
    return NextResponse.json(
      { error: "No uploaded resume is available yet." },
      { status: 404 },
    );
  }

  const { data: signedFile, error: signedFileError } = await client.storage
    .from(RESUME_BUCKET)
    .createSignedUrl(`${RESUME_FOLDER}/${latestResume.name}`, 60);

  if (signedFileError || !signedFile?.signedUrl) {
    return NextResponse.json({ error: "Unable to prepare the resume download." }, { status: 500 });
  }

  return NextResponse.redirect(new URL(signedFile.signedUrl, request.url));
}
