// Shared "join the newsletter" CTA block, matches app/_content/*.ts's
// join-section markup exactly.
export default function NewsletterSection() {
  return (
    <section className="section join-section" id="framework">
      <div className="container join-inner">
        <span className="eyebrow eyebrow-light">
          WEEKLY AI SHORTCUTS TO BUY BACK YOUR TIME
        </span>
        <h2>Delete one hour of busywork this week.</h2>
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
