const DEFAULT_ADMIN_LOGIN_PATH = "/hc-admin-9x7k-secure-entry";
const INSECURE_ADMIN_LOGIN_PATHS = new Set(["/admin", "/admin/login"]);

function normalizePathname(value?: string | null) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return DEFAULT_ADMIN_LOGIN_PATH;
  }

  const withLeadingSlash = trimmedValue.startsWith("/") ? trimmedValue : `/${trimmedValue}`;
  const withoutTrailingSlash =
    withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;

  return withoutTrailingSlash;
}

const configuredAdminLoginPath = normalizePathname(process.env.ADMIN_LOGIN_PATH);

export const adminLoginPath = INSECURE_ADMIN_LOGIN_PATHS.has(configuredAdminLoginPath)
  ? DEFAULT_ADMIN_LOGIN_PATH
  : configuredAdminLoginPath;

export function isAdminLoginPath(pathname: string) {
  return normalizePathname(pathname) === adminLoginPath;
}
