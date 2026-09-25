import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera um site 100% estático na pasta `out/` (compatível com GitHub Pages).
  output: "export",
  // Gera /design-system/index.html, que o GitHub Pages serve sem configuração extra.
  trailingSlash: true,
  // No GitHub Pages o site fica em /escolas-suz-2026; o workflow de deploy define BASE_PATH.
  basePath: process.env.BASE_PATH || "",
  images: { unoptimized: true },
};

export default nextConfig;
