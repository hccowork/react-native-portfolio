import Link from "next/link";
import { loginAction } from "@/app/admin/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Admin Access</p>
        <h1>Sign in to update your portfolio</h1>
        <p className="auth-copy">
          Use the email and password you create in Supabase Auth for your admin account.
        </p>
        {!hasSupabaseEnv() ? (
          <div className="notice-card">
            <p>
              Add your Supabase environment variables first. Until then, the public site uses demo
              content and admin login stays disabled.
            </p>
          </div>
        ) : null}
        {params.error ? (
          <div className="error-banner">Login failed. Check your credentials and try again.</div>
        ) : null}
        <form action={loginAction} className="auth-form">
          <label>
            Email
            <input type="email" name="email" placeholder="admin@example.com" required />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="••••••••" required />
          </label>
          <button type="submit" className="button button-primary" disabled={!hasSupabaseEnv()}>
            Sign in
          </button>
        </form>
        <Link href="/" className="text-link">
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
