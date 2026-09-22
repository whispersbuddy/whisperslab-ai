// Dark top banner for content pages (About, legal, hubs). Matches the look of
// the contact page banner so the transparent header sits on a dark background.
import type { Crumb } from "@/lib/seo";

export default function PageBanner({
  eyebrow,
  title,
  highlight,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  /** Optional trailing words rendered with the brand gradient. */
  highlight?: string;
  intro?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="page-banner">
      <div className="container">
        {crumbs && crumbs.length > 1 ? (
          <nav className="crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) =>
              i < crumbs.length - 1 ? (
                <span key={c.path}>
                  <a href={c.path}>{c.name}</a>
                  <span aria-hidden="true"> › </span>
                </span>
              ) : (
                <span key={c.path} aria-current="page">
                  {c.name}
                </span>
              )
            )}
          </nav>
        ) : null}
        <span className="eyebrow eyebrow-light">{eyebrow}</span>
        <h1>
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="grad-word">{highlight}</span>
            </>
          ) : null}
        </h1>
        {intro ? <p className="page-banner-intro">{intro}</p> : null}
      </div>
    </section>
  );
}
