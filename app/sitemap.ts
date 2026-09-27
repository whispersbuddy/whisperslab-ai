import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/app/_content/caseStudiesData";
import { BLOG_POSTS } from "@/app/_content/blogData";
import { fetchCaseStudies, fetchArticles } from "@/lib/api";
import { ROUTES, isLive } from "@/lib/routes";

const SITE_URL = "https://www.whisperslab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const commonDate = new Date("2026-08-05");
  const caseStudyDateMap = new Map<string, Date>();
  const blogDateMap = new Map<string, Date>();

  try {
    const csFileStat = fs.statSync(path.join(process.cwd(), 'app/_content/caseStudiesData.ts'));
    CASE_STUDIES.forEach((cs) => caseStudyDateMap.set(cs.slug, csFileStat.mtime));
  } catch {
    CASE_STUDIES.forEach((cs) => caseStudyDateMap.set(cs.slug, commonDate));
  }

  try {
    const strapiStudies = await fetchCaseStudies();
    if (Array.isArray(strapiStudies)) {
      strapiStudies.forEach((cs: { slug: string; updatedAt?: string }) => caseStudyDateMap.set(cs.slug, cs.updatedAt ? new Date(cs.updatedAt) : commonDate));
    }
  } catch (err) {
    console.error("Error fetching case studies for sitemap:", err);
  }

  BLOG_POSTS.forEach((post) => blogDateMap.set(post.slug, new Date(post.publishedAt)));
  try {
    const strapiArticles = await fetchArticles();
    if (Array.isArray(strapiArticles)) {
      strapiArticles.forEach((article: { slug: string; updatedAt?: string }) => blogDateMap.set(article.slug, article.updatedAt ? new Date(article.updatedAt) : commonDate));
    }
  } catch (err) {
    console.error("Error fetching articles for sitemap:", err);
  }

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  }> = [
    // Registry pages (lib/routes.ts): only live ones are listed.
    ...ROUTES.filter(isLive).map((r) => ({
      path: r.path,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      lastModified: r.updated ? new Date(r.updated) : commonDate,
    })),
    ...Array.from(caseStudyDateMap.entries()).map(([slug, date]) => ({
      path: `/case-studies/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: date,
    })),
    ...Array.from(blogDateMap.entries()).map(([slug, date]) => ({
      path: `/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: date,
    })),
  ];

  return routes.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority,
  }));
}
