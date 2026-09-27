import type { NextConfig } from "next";

// Strapi-hosted media (e.g. an industry's heroImage) is served from
// NEXT_PUBLIC_STRAPI_URL, an external host next/image blocks by default
// unless it's explicitly allow-listed here.
function strapiRemotePattern() {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;
  if (!url) return null;
  try {
    const { protocol, hostname } = new URL(url);
    return { protocol: protocol.replace(":", "") as "http" | "https", hostname, pathname: "/uploads/**" };
  } catch {
    return null;
  }
}

const strapiPattern = strapiRemotePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: strapiPattern ? [strapiPattern] : [],
  },
};

export default nextConfig;
