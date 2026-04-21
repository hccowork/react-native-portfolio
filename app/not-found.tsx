import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | NOT FOUND",
};

export default function NotFound() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">404</p>
        <h1>NOT FOUND</h1>
        <p className="auth-copy">
          The page you&apos;re looking for doesn&apos;t exist or is unavailable.
        </p>
        <Link href="/" className="text-link">
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
