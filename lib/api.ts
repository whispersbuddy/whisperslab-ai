// Strapi responses are cached and refreshed two ways:
// - on publish, the Strapi webhook hits /api/revalidate, which expires these tags
// - otherwise every REVALIDATE_SECONDS, as a safety net if a webhook is missed
// This keeps blog and case-study pages static (fast TTFB) instead of calling
// Strapi on every request.
export const ARTICLES_TAG = 'articles';
export const CASE_STUDIES_TAG = 'case-studies';
const REVALIDATE_SECONDS = 3600;

function strapiInit(tag: string): RequestInit {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  return {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
  };
}

// Every fetcher returns an empty result on failure rather than throwing, so a
// Strapi outage degrades to the local fallback content instead of a 500.
export async function fetchArticles() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`;
    const res = await fetch(url, strapiInit(ARTICLES_TAG));

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const res = await fetch(url, strapiInit(ARTICLES_TAG));

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching article by slug (${slug}):`, error);
    return null;
  }
}

export async function fetchCaseStudies() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/case-studies?populate=*&sort[0]=createdAt:desc`;
    const res = await fetch(url, strapiInit(CASE_STUDIES_TAG));

    if (!res.ok) {
      throw new Error(`Failed to fetch case studies: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function fetchCaseStudyBySlug(slug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/case-studies?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const res = await fetch(url, strapiInit(CASE_STUDIES_TAG));

    if (!res.ok) {
      throw new Error(`Failed to fetch case study: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching case study by slug (${slug}):`, error);
    return null;
  }
}
