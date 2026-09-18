import Link from "next/link";

// Labelled list of internal links, styled like the existing "related case
// study" box on blog posts. Renders nothing when there's nothing to link.
export default function RelatedLinks({
  label,
  links,
}: {
  label: string;
  links: { href: string; title: string }[];
}) {
  if (links.length === 0) return null;
  return (
    <div className="blog-related-case">
      <span className="blog-takeaways-label">{label}</span>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.title} →</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
