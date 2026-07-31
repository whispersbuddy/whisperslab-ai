import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/booking-confirmed",
    },
    sitemap: "https://www.whisperslab.com/sitemap.xml",
  };
}
