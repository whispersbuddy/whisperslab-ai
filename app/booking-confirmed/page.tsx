import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking — Whispers Lab",
  robots: { index: false, follow: false },
};

export default function BookingConfirmedPage() {
  return (
    <div className="booking-page">
      <div className="container booking-page-inner">
        <a href="/" className="logo">
          <img src="/assets/logo-trim.png" alt="Whispers Lab" />
        </a>
        <span className="eyebrow">ALMOST THERE</span>
        <h1>
          Thanks for the details. Pick a time below to{" "}
          <span className="grad-word">scope your build</span>.
        </h1>
        <p className="section-copy">
          We reviewed what you sent, now let&rsquo;s put it on the calendar.
          Grab a slot below and we&rsquo;ll walk through your build in detail.
        </p>
        <div data-calendly="scope" className="booking-embed" />
        <a href="/" className="link-underline">
          ← Back to homepage
        </a>
      </div>
    </div>
  );
}
