import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { getCategoryBySlug } from "@/app/_content/blogTaxonomy";
import { getBlogPostBySlug, BLOG_POSTS } from "@/app/_content/blogData";
import { fetchArticles } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog — Whispers Lab",
  description:
    "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "Blog — Whispers Lab",
    description:
      "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
    url: "/blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whispers Lab — We delete busywork.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Whispers Lab",
    description:
      "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
    images: ["/og-image.png"],
  },
};

const SITE_URL = "https://www.whisperslab.com";

function getResolvedImageUrl(imagePath?: string): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://localhost:1337")) {
    return imagePath.replace("http://localhost:1337", process.env.NEXT_PUBLIC_STRAPI_URL || "");
  }
  if (imagePath.startsWith("/uploads/")) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${imagePath}`;
  }
  return imagePath;
}

export default async function BlogPage() {
  const articles = await fetchArticles();

  const posts = [...articles].map((article: any) => {
    const staticData = getBlogPostBySlug(article.slug) || BLOG_POSTS.find(p => p.title === article.title);

    // Check if Strapi has an image (cover or heroImage)
    const strapiImage = article.cover?.url || article.heroImage;

    // Resolve category correctly if Strapi sends an object
    const categoryVal = typeof article.category === "object" ? article.category : (article.category || staticData?.category);

    return {
      ...staticData,
      ...article,
      heroImage: strapiImage || staticData?.heroImage,
      heroImageAlt: article.heroImageAlt || staticData?.heroImageAlt,
      category: categoryVal,
      publishedAt: article.publishedAt || staticData?.publishedAt,
      readTime: article.readTime || staticData?.readTime,
    };
  }).sort((a: any, b: any) => {
    const timeDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    if (timeDiff !== 0) return timeDiff;
    
    // If publishedAt is identical, fallback to createdAt to ensure newest created comes first
    const createA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const createB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return createB - createA;
  });

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog",
    description:
      "Automation guides for small business owners: what to fix first, how it actually works, and what it looks like in your industry.",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <SiteHeader />
      <main>
        <section className="contact-banner">
          <div className="container">
            <span className="eyebrow eyebrow-light">THE LAB REPORT · BLOG</span>
            <h1>Automation, minus the hype.</h1>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="blog-grid">
              {posts.map((post: any) => {
                const category = typeof post.category === "object" ? post.category : getCategoryBySlug(post.category);
                const imageUrl = getResolvedImageUrl(post.heroImage);

                return (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-grid-card"
                    key={post.slug}
                  >
                    <div className="blog-grid-card-image">
                      <img src={imageUrl} alt={post.heroImageAlt} />
                    </div>
                    <div className="blog-grid-card-body">
                      <span className="blog-category-badge">{category?.name}</span>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <time className="blog-meta" dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" · "}
                        {post.readTime}
                      </time>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
