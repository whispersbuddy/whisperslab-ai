// /blog index in the homepage design system. Styles: app/styles/blog-resources.css.
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import type { PostSummary } from "@/lib/content";

const fmt = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

function Meta({ post }: { post: PostSummary }) {
  return (
    <p className="hm-pmeta">
      {post.categoryName ? <b>{post.categoryName}</b> : null}
      {post.categoryName ? <i aria-hidden="true">/</i> : null}
      <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time>
      {post.readTime ? (
        <>
          <i aria-hidden="true">/</i>
          <span>{post.readTime}</span>
        </>
      ) : null}
    </p>
  );
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="hm-pcard">
      <div className="hm-pcard-img">
        <img src={post.heroImage} alt={post.heroImageAlt} loading="lazy" />
      </div>
      <div className="hm-pcard-body">
        <Meta post={post} />
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className="hm-plink">
          Read <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const [lead, ...rest] = posts;
  return (
    <main className="hm hm-bidx">
      <section className="hm-section hm-dark hm-phero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <nav className="hm-crumbs" aria-label="Breadcrumb">
            <span>
              <Link href="/">Home</Link>
              <i aria-hidden="true">/</i>
            </span>
            <span aria-current="page">Blog</span>
          </nav>
          <p className="hm-eyebrow hm-eyebrow-light">The Lab Report · Blog · {posts.length} guides</p>
          <h1>
            Automation, <span className="hm-grad-text">minus the hype.</span>
          </h1>
          <p className="hm-lead">
            Plain guides for small business owners: what to fix first, how it works, and what it looks like in your
            industry.
          </p>
        </div>
      </section>

      <section className="hm-section hm-white">
        <div className="container">
          {lead ? (
            <Link href={`/blog/${lead.slug}`} className="hm-pfeat">
              <div className="hm-pfeat-img">
                <img src={lead.heroImage} alt={lead.heroImageAlt} />
              </div>
              <div className="hm-pfeat-body">
                <p className="hm-eyebrow">Latest</p>
                <h2>{lead.title}</h2>
                <p>{lead.description}</p>
                <Meta post={lead} />
                <span className="hm-plink">
                  Read the guide <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ) : null}

          {rest.length > 0 ? (
            <ul className="hm-pgrid">
              {rest.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <NewsletterSection variant="home" />
    </main>
  );
}
