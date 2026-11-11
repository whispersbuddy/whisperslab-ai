// Shared "join the newsletter" CTA block, matches app/_content/*.ts's
// join-section markup exactly. The form keeps the .newsletter-form hooks that
// components/ClientEffects.tsx wires to /api/newsletter.
//
// variant="home" is the redesigned homepage version: a dark panel with the
// pitch on the left and what arrives each Tuesday plus the form on the right.
const ISSUE = [
  { n: "01", t: "One manual task to delete", d: "A real task small teams do by hand every week." },
  { n: "02", t: "The exact tool to replace it", d: "Named, with how to set it up." },
  { n: "03", t: "The Busywork Elimination Framework", d: "Free when you join." },
];

export default function NewsletterSection({ variant = "default" }: { variant?: "default" | "home" }) {
  if (variant === "home") {
    return (
      <section className="hm-section hm-paper hm-news-section" id="framework">
        <div className="container">
          <div className="hm-news">
            <div className="hm-news-bg" aria-hidden="true" />
            <div className="hm-news-copy">
              <p className="hm-eyebrow hm-eyebrow-light">Every Tuesday · Free</p>
              <h2>Delete one hour of busywork this week.</h2>
              <p>
                Join the Tuesday newsletter and get our free &quot;Busywork Elimination Framework&quot;. One manual task
                to eliminate and the exact AI tool to replace it, every week.
              </p>
            </div>
            <div className="hm-news-card">
              <ol className="hm-news-issue">
                {ISSUE.map((i) => (
                  <li key={i.n}>
                    <span>{i.n}</span>
                    <div>
                      <b>{i.t}</b>
                      <small>{i.d}</small>
                    </div>
                  </li>
                ))}
              </ol>
              <form className="newsletter-form">
                <input
                  type="email"
                  name="email"
                  className="newsletter-input"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Send me the framework
                </button>
              </form>
              <span className="newsletter-note">No spam. Zero tech jargon. Just hours bought back.</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section join-section" id="framework">
      <div className="container join-inner">
        <span className="eyebrow eyebrow-light">
          WEEKLY AI SHORTCUTS TO BUY BACK YOUR TIME
        </span>
        <p className="join-heading">Delete one hour of busywork this week.</p>
        <p className="section-copy">
          Get our free &quot;Busywork Elimination Framework&quot; and join our
          Tuesday newsletter. Every week, we send you one manual task to
          eliminate and the exact AI tool to replace it.
        </p>
        <form className="newsletter-form">
          <input
            type="email"
            name="email"
            className="newsletter-input"
            placeholder="Enter your email"
            aria-label="Email address"
            required
          />
          <button type="submit" className="newsletter-btn">
            Send Me The Framework
          </button>
        </form>
        <span className="newsletter-note">
          No spam. Zero tech jargon. Just hours bought back.
        </span>
      </div>
    </section>
  );
}
