// /book: a bare page (no site header or footer, see BARE_PATHS) with the
// Calendly embed. ClientEffects initialises any [data-calendly] element.
import Link from "next/link";
import { Check } from "lucide-react";

const POINTS = [
  "We ask about the work that eats your week, then tell you what is worth automating first.",
  "You leave with a clear next step, even if that step is not working with us.",
  "Free, with no pressure and no sales script.",
];

export default function BookPage() {
  return (
    <main className="book-page hm">
      <section className="hm-section hm-dark hm-bhero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <div className="hm-bhero-top">
            <Link href="/" aria-label="Whispers Lab home">
              <img src="/assets/logo-trim.png" alt="Whispers Lab" width={348} height={45} />
            </Link>
            <Link href="/">Back to homepage</Link>
          </div>
          <div className="hm-bgrid">
            <div>
              <p className="hm-eyebrow hm-eyebrow-light">Free discovery call</p>
              <h1>
                Let us find your next <span className="hm-grad-text">10 to 20 hours.</span>
              </h1>
              <p className="hm-lead">Pick a time that suits you. A real conversation about where automation can save you the most time.</p>
              <ul className="hm-blist">
                {POINTS.map((p) => (
                  <li key={p}>
                    <Check size={18} aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hm-bembed">
              <div data-calendly="discovery" className="booking-embed" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
