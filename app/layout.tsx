import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prem Mehta | React Native Developer",
  description:
    "React Native developer portfolio built with Next.js, Supabase, admin editing, and Vercel deployment in mind.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
