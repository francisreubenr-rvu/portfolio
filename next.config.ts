import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // For GitHub Pages: set NEXT_PUBLIC_BASE_PATH to your repo name, e.g. "/portfolio"
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
};

export default nextConfig;
