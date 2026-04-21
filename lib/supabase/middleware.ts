import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { INTERNAL_ADMIN_LOGIN_PATH, adminLoginPath, isAdminLoginPath } from "@/lib/admin-route";
import { isAdminEmail, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

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

  if (pathname.startsWith(INTERNAL_ADMIN_LOGIN_PATH) || pathname.startsWith("/admin/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminLoginPath(pathname)) {
    if (isAllowedAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.rewrite(new URL(INTERNAL_ADMIN_LOGIN_PATH, request.url));
  }

  if (pathname.startsWith("/admin") && !isAllowedAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
