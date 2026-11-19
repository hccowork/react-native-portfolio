import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep local development assets separate from production build output.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  typedRoutes: true,
};

export default nextConfig;
