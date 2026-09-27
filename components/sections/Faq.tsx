// FAQ list using the existing .faq-* styles from the Audit and Core Build
// pages. Pair with faqSchema() from lib/seo.ts for FAQPage JSON-LD.
export type FaqItem = { q: string; a: string };

export default function Faq({ eyebrow = "CLEARING THE AIR", title, items }: { eyebrow?: string; title: string; items: FaqItem[] }) {
  return (
    <section className="section faq-section">
      <div className="container">
        <div className="section-head-center">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <div className="faq-list">
          {items.map((f, i) => (
            <details key={f.q} className="faq-item" open={i === 0}>
              <summary className="faq-question">
                {f.q}
                <span className="faq-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="faq-answer">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
