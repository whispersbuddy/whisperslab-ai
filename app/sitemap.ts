import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/app/_content/caseStudiesData";
import { BLOG_POSTS } from "@/app/_content/blogData";
import { fetchCaseStudies, fetchArticles } from "@/lib/api";

const SITE_URL = "https://www.whisperslab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allCaseStudySlugs = new Set([...CASE_STUDIES.map((cs) => cs.slug)]);
  try {
    const strapiStudies = await fetchCaseStudies();
    if (Array.isArray(strapiStudies)) {
      strapiStudies.forEach((cs: any) => allCaseStudySlugs.add(cs.slug));
    }
  } catch (err) {
    console.error("Error fetching case studies for sitemap:", err);
  }

  const allBlogSlugs = new Set([...BLOG_POSTS.map((post) => post.slug)]);
  try {
    const strapiArticles = await fetchArticles();
    if (Array.isArray(strapiArticles)) {
      strapiArticles.forEach((article: any) => allBlogSlugs.add(article.slug));
    }
  } catch (err) {
    console.error("Error fetching articles for sitemap:", err);
  }

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/audit", changeFrequency: "monthly", priority: 0.9 },
    { path: "/core-build", changeFrequency: "monthly", priority: 0.9 },
    { path: "/case-studies", changeFrequency: "weekly", priority: 0.8 },
    ...Array.from(allCaseStudySlugs).map((slug) => ({
      path: `/case-studies/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    ...Array.from(allBlogSlugs).map((slug) => ({
      path: `/blog/${slug}`,
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
