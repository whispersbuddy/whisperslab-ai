import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, type PostSummary } from "@/lib/content";

// Homepage "latest from the blog" strip. The homepage is the most-crawled page
// on the site, so linking the newest posts here is how new posts get found
// quickly. Heading markup mirrors the homepage's case-section.
//
// variant="home" renders the editorial layout used on the redesigned
// homepage: one featured guide plus a short list of the next ones. Other pages
// keep the original card grid.
const dateLabel = (post: PostSummary) =>
  new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) +
  (post.readTime ? ` · ${post.readTime}` : "");

export default async function LatestPosts({ variant = "default" }: { variant?: "default" | "home" }) {
  const posts = (await getAllPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  if (variant === "home") {
    const [lead, ...rest] = posts;
    return (
      <section className="hm-section hm-white hm-blog">
        <div className="container">
          <div className="hm-blog-head">
            <header className="hm-head">
              <p className="hm-eyebrow">The Lab Report</p>
              <h2>Fix the busywork yourself, one guide at a time.</h2>
              <p>Plain-English breakdowns of what to automate first and how it actually works.</p>
            </header>
            <Link href="/blog" className="hm-btn hm-btn-outline"><span>All guides</span><ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="hm-blog-grid">
            <Link href={`/blog/${lead.slug}`} className="hm-blog-lead">
              <img src={lead.heroImage} alt={lead.heroImageAlt} />
              <span className="hm-blog-shade" aria-hidden="true" />
              <span className="hm-blog-lead-body">
                {lead.categoryName ? <span className="hm-blog-tag">{lead.categoryName}</span> : null}
                <strong>{lead.title}</strong>
                <span className="hm-blog-meta">{dateLabel(lead)}</span>
              </span>
              <ArrowUpRight className="hm-blog-go" size={22} aria-hidden="true" />
            </Link>
            <ul className="hm-blog-list">
              {rest.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="hm-blog-item">
                    <img src={post.heroImage} alt={post.heroImageAlt} />
                    <span className="hm-blog-item-body">
                      {post.categoryName ? <span className="hm-blog-cat">{post.categoryName}</span> : null}
                      <strong>{post.title}</strong>
                      <span className="hm-blog-desc">{post.description}</span>
                      <span className="hm-blog-meta">{dateLabel(post)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section home-latest-section">
      <div className="container">
        <span className="eyebrow">THE LAB REPORT · LATEST GUIDES</span>
        <h2>Fix the busywork yourself, one guide at a time.</h2>
        <p className="section-copy">
          Plain-English breakdowns of what to automate first and how it actually works.
        </p>
        <Link href="/blog" className="link-cta">See all guides →</Link>

        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
