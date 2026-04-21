const DEFAULT_ADMIN_LOGIN_PATH = "/secure-admin-entry";
export const INTERNAL_ADMIN_LOGIN_PATH = "/internal-admin-auth-gateway";

function normalizePathname(value?: string | null) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return DEFAULT_ADMIN_LOGIN_PATH;
  }

  const withLeadingSlash = trimmedValue.startsWith("/") ? trimmedValue : `/${trimmedValue}`;
  const withoutTrailingSlash =
    withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;

  if (
    withoutTrailingSlash.startsWith("/admin") ||
    withoutTrailingSlash.startsWith("/_next") ||
    withoutTrailingSlash === INTERNAL_ADMIN_LOGIN_PATH
  ) {
    return DEFAULT_ADMIN_LOGIN_PATH;
  }

  return withoutTrailingSlash;
}

export const adminLoginPath = normalizePathname(process.env.ADMIN_LOGIN_PATH);

export function isAdminLoginPath(pathname: string) {
  return normalizePathname(pathname) === adminLoginPath;
}
