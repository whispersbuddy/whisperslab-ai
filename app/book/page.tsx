import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call — Whispers Lab",
};

export default function BookPage() {
  return (
    <div className="booking-page">
      <div className="container booking-page-inner">
        <a href="/" className="logo">
          <img
            src="/assets/logo-trim.png"
            alt="Whispers Lab"
            width={348}
            height={45}
          />
        </a>
        <span className="eyebrow">BOOK A CALL</span>
        <h1>
          Let&rsquo;s find your next{" "}
          <span className="grad-word">10–20+ hours.</span>
        </h1>
        <p className="section-copy">
          Pick a slot below. No forms, no back-and-forth, just a real
          conversation about where AI can save you the most time.
        </p>
        <div data-calendly="discovery" className="booking-embed" />
        <a href="/" className="link-underline">
          ← Back to homepage
        </a>
      </div>
    </div>
  );
}
