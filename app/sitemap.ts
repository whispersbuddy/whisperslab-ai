import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/app/_content/caseStudiesData";
import { BLOG_POSTS } from "@/app/_content/blogData";

const SITE_URL = "https://www.whisperslab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/audit", changeFrequency: "monthly", priority: 0.9 },
    { path: "/core-build", changeFrequency: "monthly", priority: 0.9 },
    { path: "/case-studies", changeFrequency: "weekly", priority: 0.8 },
    ...CASE_STUDIES.map((cs) => ({
      path: `/case-studies/${cs.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    ...BLOG_POSTS.map((post) => ({
      path: `/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/book", changeFrequency: "monthly", priority: 0.6 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
