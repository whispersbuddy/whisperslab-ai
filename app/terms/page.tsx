// DRAFT: have this reviewed by a lawyer before setting `live: true` for /terms
// in lib/routes.ts. These are website terms of use; client projects are covered
// by their own written agreements.
import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, buildMetadata, graph, requireLive } from "@/lib/seo";

const PATH = "/terms";
const LAST_UPDATED = "September 22, 2026";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use | Whispers Lab",
  description: "The terms that apply when you use the Whispers Lab website, its tools, and its content.",
  path: PATH,
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Terms of Use", path: PATH },
];

export default function TermsPage() {
  requireLive(PATH);
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(CRUMBS))} />
      <main>
        <PageBanner eyebrow="LEGAL" title="Terms of Use" crumbs={CRUMBS} />
        <section className="section">
          <div className="container">
            <article className="prose">
              <p className="updated">Last updated: {LAST_UPDATED}</p>
              <p>
                These terms apply when you use whisperslab.com, run by Whispers Lab LLC, 30 N Gould St, Ste R,
                Sheridan, WY 82801, USA. By using the site, you agree to them.
              </p>

              <h2>Using the site</h2>
              <p>
                You can read, share, and link to our pages. Please don&rsquo;t copy large parts of our content, try to
                break or overload the site, or use it for anything unlawful.
              </p>

              <h2>Our content</h2>
              <p>
                The text, designs, graphics, and case studies on this site belong to Whispers Lab unless we say
                otherwise. Tool and brand names we mention belong to their owners. Mentioning a tool does not mean we
                are partnered with or endorsed by its maker.
              </p>

              <h2>Estimates and general information</h2>
              <p>
                Our calculators, assessments, and articles give general information and estimates based on the numbers
                you enter. They are not a promise of results, and they are not legal, tax, or financial advice. Results
                in our case studies are from specific projects and will differ for your business.
              </p>

              <h2>Our services</h2>
              <p>
                Prices on this site, such as the $250 Automation Audit and builds starting from $2,500, can change. Any
                project we do for you is covered by a separate written agreement, which takes priority over these
                terms.
              </p>

              <h2>Links to other sites</h2>
              <p>We link to other websites and tools. We are not responsible for their content or how they handle your data.</p>

              <h2>No warranty</h2>
              <p>
                We work to keep the site accurate and available, but it is provided &ldquo;as is&rdquo;, without
                warranties of any kind.
              </p>

              <h2>Limitation of liability</h2>
              <p>
                To the extent the law allows, Whispers Lab is not liable for indirect or consequential losses that come
                from using this website.
              </p>

              <h2>Governing law</h2>
              <p>These terms are governed by the laws of the State of Wyoming, USA.</p>

              <h2>Changes and contact</h2>
              <p>
                We may update these terms and will change the date at the top when we do. Questions? Email{" "}
                <a href="mailto:hello@whisperslab.com">hello@whisperslab.com</a>.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
