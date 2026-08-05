import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientEffects from "@/components/ClientEffects";

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
        alt: "Whispers Lab — We delete busywork.",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Whispers Lab",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo-trim.png`,
  description:
    "AI automation agency helping small business owners — primarily in the United States — eliminate manual busywork through custom-built automation and AI systems. Works with clients remotely worldwide.",
  founder: {
    "@type": "Person",
    name: "Haris Ali",
  },
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
  ],
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <ClientEffects />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
