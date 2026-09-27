// DRAFT: have this reviewed by a lawyer before setting `live: true` for
// /privacy-policy in lib/routes.ts. It describes what the site actually
// collects today (contact form, newsletter, Calendly, Google Analytics, Resend).
import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, buildMetadata, graph, requireLive } from "@/lib/seo";

const PATH = "/privacy-policy";
const LAST_UPDATED = "September 22, 2026";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Whispers Lab",
  description: "How Whispers Lab collects, uses, and protects the information you share through our website, forms, and bookings.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: PATH },
];

export default function PrivacyPolicyPage() {
  requireLive(PATH);
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(CRUMBS))} />
      <main>
        <PageBanner eyebrow="LEGAL" title="Privacy Policy" crumbs={CRUMBS} />
        <section className="section">
          <div className="container">
            <article className="prose">
              <p className="updated">Last updated: {LAST_UPDATED}</p>
              <p>
                This policy explains what information Whispers Lab LLC (&ldquo;Whispers Lab&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;) collects when you use whisperslab.com, how we use it, and the choices you have. We keep
                it short and plain on purpose.
              </p>

              <h2>Who we are</h2>
              <p>
                Whispers Lab LLC, 30 N Gould St, Ste R, Sheridan, WY 82801, USA. Our team works from Karachi, Pakistan.
                You can reach us at <a href="mailto:hello@whisperslab.com">hello@whisperslab.com</a>.
              </p>

              <h2>What we collect</h2>
              <ul>
                <li>
                  <strong>Contact form:</strong> your name, email, company name, your biggest bottleneck, and your
                  message.
                </li>
                <li>
                  <strong>Newsletter:</strong> your email address.
                </li>
                <li>
                  <strong>Call bookings:</strong> the name, email, time, and any answers you give when booking through
                  Calendly.
                </li>
                <li>
                  <strong>Usage data:</strong> pages visited, device and browser type, and approximate location,
                  collected through Google Analytics cookies.
                </li>
                <li>
                  <strong>Technical logs:</strong> IP address and request details kept briefly by our hosting provider
                  for security and reliability.
                </li>
              </ul>

              <h2>How we use it</h2>
              <ul>
                <li>To reply to you and run the projects you ask us for.</li>
                <li>To send the newsletter you signed up for. Every email has an unsubscribe link.</li>
                <li>To schedule and prepare for calls.</li>
                <li>To understand which pages are useful and improve the site.</li>
              </ul>
              <p>We do not sell your personal information, and we do not use it for advertising profiles.</p>

              <h2>Who we share it with</h2>
              <p>We only share information with services that help us run the site and our business:</p>
              <ul>
                <li>
                  <strong>Resend</strong>, which delivers form and newsletter emails.
                </li>
                <li>
                  <strong>Calendly</strong>, which handles call bookings.
                </li>
                <li>
                  <strong>Google Analytics</strong>, which measures site usage.
                </li>
                <li>Our website hosting provider.</li>
              </ul>
              <p>We may also share information if the law requires it.</p>

              <h2>Where your information is handled</h2>
              <p>
                Our service providers mainly store data in the United States. Our team in Pakistan may access it to do
                the work you asked for. We limit access to the people who need it.
              </p>

              <h2>How long we keep it</h2>
              <p>
                We keep inquiries and project records for as long as we are working together and for a reasonable time
                after, then delete them. You can unsubscribe from the newsletter at any time and your address is
                removed from future sends.
              </p>

              <h2>Your choices and rights</h2>
              <ul>
                <li>Ask us for a copy of the personal information we hold about you.</li>
                <li>Ask us to correct or delete it.</li>
                <li>Unsubscribe from emails using the link in any message.</li>
                <li>Block or delete cookies in your browser settings. The site still works without them.</li>
              </ul>
              <p>
                If you live in a US state with its own privacy law, such as California, you have these rights too, and
                we will not treat you differently for using them. Email{" "}
                <a href="mailto:hello@whisperslab.com">hello@whisperslab.com</a> and we will reply within 30 days.
              </p>

              <h2>Children</h2>
              <p>Our website and services are for businesses. We do not knowingly collect information from children under 13.</p>

              <h2>Changes to this policy</h2>
              <p>If we change this policy, we will update the date at the top of this page.</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
