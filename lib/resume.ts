export function isValidResumeUrl(value?: string | null): value is string {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
