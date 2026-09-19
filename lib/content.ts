// Merged, normalized views of blog posts and case studies (Strapi first, local
// _content files as fallback), shared by the blog index, the homepage strip and
// the related-content links on detail pages. Related links are derived from
// category, industry and case-study references, never hand-typed slugs, so
// they can't point at pages that don't exist.
import { cache } from "react";
import { BLOG_POSTS, type BlogBlock, type BlogPost } from "@/app/_content/blogData";
import { getCategoryBySlug } from "@/app/_content/blogTaxonomy";
import { CASE_STUDIES } from "@/app/_content/caseStudiesData";
import { fetchArticles, fetchCaseStudies } from "@/lib/api";

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  categoryKey: string;
  categoryName: string;
  publishedAt: string;
  createdAt?: string;
  heroImage: string;
  heroImageAlt: string;
  readTime: string;
  caseStudySlugs: string[];
};

// The fields read from a Strapi article (v5, flat). Local BlogPost entries
// satisfy it too, so both sources go through the same normalization.
type StrapiArticle = {
  slug: string;
  title: string;
  description?: string;
  category?: { slug?: string; name?: string } | string | null;
  content?: string | BlogBlock[];
  relatedCaseStudies?: { slug?: string }[];
  relatedCaseStudySlugs?: string[];
  publishedAt?: string;
  createdAt?: string;
  cover?: { url?: string };
  heroImage?: string;
  heroImageAlt?: string;
  readTime?: string;
};

export type CaseStudySummary = {
  slug: string;
  title: string;
  industry: string;
  goal: string;
};

export function getResolvedImageUrl(imagePath?: string): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://localhost:1337")) {
    return imagePath.replace("http://localhost:1337", process.env.NEXT_PUBLIC_STRAPI_URL || "");
  }
  if (imagePath.startsWith("/uploads/")) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${imagePath}`;
  }
  return imagePath;
}

const CASE_STUDY_LINK = /\/case-studies\/([a-z0-9-]+)/g;

function caseStudyLinksIn(content: StrapiArticle["content"]): string[] {
  const text =
    typeof content === "string"
      ? content
      : (content ?? []).map((b) => ("items" in b ? b.items.join(" ") : b.text)).join(" ");
  return [...text.matchAll(CASE_STUDY_LINK)].map((m) => m[1]);
}

function readTimeFor(content: StrapiArticle["content"], fallback?: string): string {
  if (fallback) return fallback;
  if (typeof content !== "string") return "";
  const minutes = Math.max(1, Math.round(content.trim().split(/\s+/).length / 225));
  return `${minutes} min read`;
}

function normalizePost(article: StrapiArticle, staticData?: BlogPost): PostSummary {
  const rawCategory = typeof article.category === "object" && article.category
    ? article.category
    : getCategoryBySlug(article.category || staticData?.category || "");
  const content = article.content || staticData?.content;
  const relationSlugs = (article.relatedCaseStudies ?? [])
    .map((cs) => cs?.slug)
    .filter((s): s is string => Boolean(s));

  return {
    slug: article.slug,
    title: article.title,
    description: article.description || staticData?.excerpt || "",
    categoryKey: rawCategory?.slug || rawCategory?.name || "",
    categoryName: rawCategory?.name || "",
    publishedAt: article.publishedAt || staticData?.publishedAt || "",
    createdAt: article.createdAt,
    heroImage: getResolvedImageUrl(article.cover?.url || article.heroImage || staticData?.heroImage),
    heroImageAlt: article.heroImageAlt || staticData?.heroImageAlt || "",
    readTime: readTimeFor(content, article.readTime || staticData?.readTime),
    caseStudySlugs: [
      ...new Set([
        ...relationSlugs,
        ...(article.relatedCaseStudySlugs || staticData?.relatedCaseStudySlugs || []),
        ...caseStudyLinksIn(content),
      ]),
    ],
  };
}

function newestFirst(a: PostSummary, b: PostSummary): number {
  const diff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  if (diff !== 0) return diff;
  return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
}

// If Strapi is unreachable, fall back to the local posts so /blog and every
// page linking to it keep rendering instead of erroring.
export const getAllPosts = cache(async (): Promise<PostSummary[]> => {
  const articles: StrapiArticle[] = await fetchArticles();
  const source: StrapiArticle[] = articles.length > 0 ? articles : BLOG_POSTS;
  return source
    .map((article) =>
      normalizePost(
        article,
        BLOG_POSTS.find((p) => p.slug === article.slug || p.title === article.title),
      ),
    )
    .filter((p) => p.slug && p.title)
    .sort(newestFirst);
});

// Union of Strapi and local case studies, Strapi winning on the same slug, so
// every study that has a working detail page can be linked to.
export const getAllCaseStudies = cache(async (): Promise<CaseStudySummary[]> => {
  const bySlug = new Map<string, CaseStudySummary>();
  for (const cs of [...(await fetchCaseStudies()), ...CASE_STUDIES]) {
    if (!cs?.slug || bySlug.has(cs.slug)) continue;
    bySlug.set(cs.slug, { slug: cs.slug, title: cs.title, industry: cs.industry ?? "", goal: cs.goal ?? "" });
  }
  return [...bySlug.values()];
});

// Industry labels look like "WAREHOUSING · FULFILLMENT OPS"; the first segment
// is the vertical.
function industryKey(industry: string): string {
  return industry.split("·")[0].trim().toLowerCase();
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<PostSummary[]> {
  const posts = await getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  const score = (p: PostSummary) =>
    (current?.categoryKey && p.categoryKey === current.categoryKey ? 2 : 0) +
    (current?.caseStudySlugs.some((s) => p.caseStudySlugs.includes(s)) ? 1 : 0);
  return posts
    .filter((p) => p.slug !== slug)
    .map((p, recency) => ({ p, recency, score: score(p) }))
    .sort((a, b) => b.score - a.score || a.recency - b.recency)
    .slice(0, limit)
    .map(({ p }) => p);
}

export async function getPostsForCaseStudy(caseStudySlug: string, limit = 3): Promise<PostSummary[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.caseStudySlugs.includes(caseStudySlug)).slice(0, limit);
}

export async function getRelatedCaseStudies(slug: string, limit = 3): Promise<CaseStudySummary[]> {
  const studies = await getAllCaseStudies();
  const current = studies.find((cs) => cs.slug === slug);
  const key = current ? industryKey(current.industry) : "";
  const others = studies.filter((cs) => cs.slug !== slug);
  const sameIndustry = others.filter((cs) => key && industryKey(cs.industry) === key);
  const rest = others.filter((cs) => !sameIndustry.includes(cs));
  return [...sameIndustry, ...rest].slice(0, limit);
}
