export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function splitCsv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeSocialLinkUrl(value: string) {
  const url = value.trim();

  if (!url) {
    return "";
  }

  if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) {
    return url;
  }

  // Social URLs are commonly entered as "www.github.com/..." without a protocol.
  if (/^[a-z0-9.-]+\.[a-z]{2,}(?:\/|$)/i.test(url)) {
    return `https://${url}`;
  }

  return "";
}

export function normalizeWhatsAppNumber(value?: string | null) {
  const digits = value?.replace(/\D/g, "") ?? "";

  // WhatsApp numbers must include a country code and have up to 15 digits.
  return /^\d{8,15}$/.test(digits) ? digits : "";
}
