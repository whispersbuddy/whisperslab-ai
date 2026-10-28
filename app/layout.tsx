import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./styles/sections.css";
import "./styles/pilots.css";
import "./styles/use-cases.css";
import ClientEffects from "@/components/ClientEffects";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CLUTCH_URL, GOODFIRMS_URL, SORTLIST_URL, TRUSTPILOT_URL, ZAPIER_PARTNER_URL } from "@/lib/social";
import { FOUNDER, graph, ORG_ID, SOURCE_CONTEXT, WEBSITE } from "@/lib/seo";

const SITE_URL = "https://www.whisperslab.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Whispers Lab",
  description: "We delete busywork.",
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    title: "Whispers Lab",
    description: "We delete busywork.",
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whispers Lab. We delete busywork.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whispers Lab",
    description: "We delete busywork.",
    images: ["/og-image.png"],
  },
};

// The one full Organization and WebSite description for the whole site. Page
// schemas point back to these through ORG_ID and WEBSITE_ID (lib/seo.ts).
const organizationSchema = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Whispers Lab",
  legalName: "Whispers Lab LLC",
  alternateName: "WhispersLab",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo-trim.png`,
  slogan: "We delete busywork.",
  description: SOURCE_CONTEXT,
  foundingDate: "2025",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 10,
    maxValue: 12,
  },
  founder: FOUNDER,
  knowsAbout: [
    "Small business automation",
    "Business process automation",
    "Workflow automation",
    "Data entry automation",
    "Bookkeeping automation",
    "Client onboarding automation",
    "Lead follow-up automation",
    "Software integration",
    "n8n",
    "Zapier",
    "Make (formerly Integromat)",
    "Airtable",
  ],
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "30 N Gould St, Ste R",
    addressLocality: "Sheridan",
    addressRegion: "WY",
    postalCode: "82801",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@whisperslab.com",
    areaServed: "US",
  },
  sameAs: [
    "https://www.instagram.com/whispers__lab/",
    "https://www.linkedin.com/company/whispers-lab/",
    CLUTCH_URL,
    TRUSTPILOT_URL,
    ZAPIER_PARTNER_URL,
    GOODFIRMS_URL,
    SORTLIST_URL,
  ],
};

const siteSchema = graph(organizationSchema, {
  ...WEBSITE,
  alternateName: "WhispersLab",
  inLanguage: "en-US",
  publisher: { "@id": ORG_ID },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        <meta name="geo.region" content="US" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <ClientEffects />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var h = window.location.hostname;
            if (h === 'whisperslab.com' || h === 'www.whisperslab.com') {
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-DT0L4C5NMQ';
              document.head.appendChild(s);
              gtag('js', new Date());
              gtag('config', 'G-DT0L4C5NMQ');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
