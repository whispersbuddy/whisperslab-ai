import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/app/_content/caseStudiesData";
import { BLOG_POSTS } from "@/app/_content/blogData";
import { fetchCaseStudies, fetchArticles } from "@/lib/api";

const SITE_URL = "https://www.whisperslab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const commonDate = new Date("2026-08-05");
  const caseStudyDateMap = new Map<string, Date>();
  const blogDateMap = new Map<string, Date>();

  try {
    const csFileStat = fs.statSync(path.join(process.cwd(), 'app/_content/caseStudiesData.ts'));
    CASE_STUDIES.forEach((cs) => caseStudyDateMap.set(cs.slug, csFileStat.mtime));
  } catch (err) {
    CASE_STUDIES.forEach((cs) => caseStudyDateMap.set(cs.slug, commonDate));
  }

  try {
    const strapiStudies = await fetchCaseStudies();
    if (Array.isArray(strapiStudies)) {
      strapiStudies.forEach((cs: any) => caseStudyDateMap.set(cs.slug, cs.updatedAt ? new Date(cs.updatedAt) : commonDate));
    }
  } catch (err) {
    console.error("Error fetching case studies for sitemap:", err);
  }

  BLOG_POSTS.forEach((post) => blogDateMap.set(post.slug, new Date(post.publishedAt)));
  try {
    const strapiArticles = await fetchArticles();
    if (Array.isArray(strapiArticles)) {
      strapiArticles.forEach((article: any) => blogDateMap.set(article.slug, article.updatedAt ? new Date(article.updatedAt) : commonDate));
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
    { path: "/", changeFrequency: "weekly", priority: 1, lastModified: commonDate },
    { path: "/audit", changeFrequency: "monthly", priority: 0.9, lastModified: commonDate },
    { path: "/core-build", changeFrequency: "monthly", priority: 0.9, lastModified: commonDate },
    { path: "/case-studies", changeFrequency: "weekly", priority: 0.8, lastModified: commonDate },
    ...Array.from(caseStudyDateMap.entries()).map(([slug, date]) => ({
      path: `/case-studies/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: date,
    })),
    { path: "/blog", changeFrequency: "weekly", priority: 0.8, lastModified: commonDate },
    ...Array.from(blogDateMap.entries()).map(([slug, date]) => ({
      path: `/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: date,
    })),
    { path: "/contact", changeFrequency: "monthly", priority: 0.7, lastModified: commonDate },
    { path: "/book", changeFrequency: "monthly", priority: 0.6, lastModified: commonDate },
  ];

  return routes.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority,
  }));
}
