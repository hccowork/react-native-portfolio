import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/data";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolioData();

  return {
    title: `${profile.full_name} | ${profile.title}`,
    description: profile.intro,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
