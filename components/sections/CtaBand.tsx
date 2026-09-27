// Dark closing call-to-action band used at the end of funnel pages.
export default function CtaBand({
  title,
  body,
  primary = { href: "/audit", label: "Book Your Audit ($250)" },
  secondary = { href: "/book", label: "Book a free discovery call" },
}: {
  title: string;
  body: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="section cta-band">
      <div className="container">
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="cta-band-actions">
          <a href={primary.href} className="btn btn-primary">
            {primary.label}
          </a>
          {secondary ? (
            <a href={secondary.href} className="btn btn-ghost">
              {secondary.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
