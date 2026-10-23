import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/app/_content/caseStudiesData";
import { BLOG_POSTS } from "@/app/_content/blogData";
import { fetchCaseStudies, fetchArticles, fetchPageUpdatedDates } from "@/lib/api";
import { ROUTES, isLive } from "@/lib/routes";

const SITE_URL = "https://www.whisperslab.com";

// Rebuild hourly so new Strapi entries reach the sitemap without a redeploy.
export const revalidate = 3600;

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
    if (!strapiStudies.length) console.error("Sitemap: Strapi returned no case studies, listing local studies only.");
    if (Array.isArray(strapiStudies)) {
      strapiStudies.forEach((cs: { slug: string; updatedAt?: string }) => caseStudyDateMap.set(cs.slug, cs.updatedAt ? new Date(cs.updatedAt) : commonDate));
    }
  } catch (err) {
    console.error("Error fetching case studies for sitemap:", err);
  }

  BLOG_POSTS.forEach((post) => blogDateMap.set(post.slug, new Date(post.publishedAt)));
  try {
    const strapiArticles = await fetchArticles();
    if (!strapiArticles.length) console.error("Sitemap: Strapi returned no articles, listing local posts only.");
    if (Array.isArray(strapiArticles)) {
      strapiArticles.forEach((article: { slug: string; updatedAt?: string }) => blogDateMap.set(article.slug, article.updatedAt ? new Date(article.updatedAt) : commonDate));
    }
  } catch (err) {
    console.error("Error fetching articles for sitemap:", err);
  }

  // Service, integration and industry pages can be edited in Strapi, and the
  // two hubs change whenever a post or case study is added, so each registry
  // page takes the newest of its code date and those.
  const pageDates = await fetchPageUpdatedDates();
  const hubDates: Record<string, Date[]> = {
    "/blog": Array.from(blogDateMap.values()),
    "/case-studies": Array.from(caseStudyDateMap.values()),
  };
  const latest = (dates: (Date | undefined)[]) =>
    dates.reduce<Date | undefined>((max, d) => (d && !isNaN(d.getTime()) && (!max || d > max) ? d : max), undefined);

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
      lastModified:
        latest([r.updated ? new Date(r.updated) : undefined, pageDates.get(r.path), ...(hubDates[r.path] ?? [])]) ?? commonDate,
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
