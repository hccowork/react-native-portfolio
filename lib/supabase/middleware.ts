import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { adminLoginPath, isAdminLoginPath } from "@/lib/admin-route";
import { isAdminEmail, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";
const ADMIN_BLOCKED_PATH = "/admin-blocked";

export async function updateSession(request: NextRequest) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAllowedAdmin = Boolean(user && isAdminEmail(user.email));
  const pathname = request.nextUrl.pathname;

  if (isAdminLoginPath(pathname)) {
    if (isAllowedAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.rewrite(new URL("/admin/login", request.url));
  }

  if (pathname === "/admin/login") {
    return NextResponse.rewrite(new URL(ADMIN_BLOCKED_PATH, request.url));
  }

  if (pathname.startsWith("/admin") && !isAllowedAdmin) {
    return NextResponse.rewrite(new URL(ADMIN_BLOCKED_PATH, request.url));
  }

  return response;
}
