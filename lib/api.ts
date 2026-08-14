export async function fetchArticles() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error; // Rethrow or return empty array depending on preference, but throwing allows error boundaries to catch it
  }
}

export async function fetchArticleBySlug(slug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',
    });

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
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch case studies: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function fetchCaseStudyBySlug(slug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/case-studies?filters[slug][$eq]=${slug}&populate=*`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',
    });

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
