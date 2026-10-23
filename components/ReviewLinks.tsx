// Visible links to the third-party review profiles. No counts or scores on
// purpose: those change on the platforms, so any number here would go stale.
// Never add review or rating schema for these (Google ignores self-hosted
// reviews of your own business).
//
// The logos are the platforms' own files, unaltered: Trustpilot's from its
// brand CDN (cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg) and
// Clutch's logotype from clutch.co (Oct 2026). Both sit on a white badge so
// the original colours work on dark sections too.
import { Fragment } from "react";
import Image from "next/image";
import { CLUTCH_URL, TRUSTPILOT_URL } from "@/lib/social";

const PLATFORMS = [
  { name: "Trustpilot", href: TRUSTPILOT_URL, logo: "/assets/brands/trustpilot-logo.svg", width: 90, height: 22 },
  { name: "Clutch", href: CLUTCH_URL, logo: "/assets/brands/clutch-logo.svg", width: 60, height: 17 },
];

export default function ReviewLinks({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <div className={`review-links review-links-${tone}${compact ? " review-links-compact" : ""}`}>
      <span>{compact ? "Client reviews" : "Read what clients say on"}</span>
      {PLATFORMS.map((p, i) => (
        <Fragment key={p.name}>
          {i > 0 && !compact ? <span>and</span> : null}
          <a href={p.href} target="_blank" rel="noopener" aria-label={`Whispers Lab reviews on ${p.name}`}>
            <Image src={p.logo} alt={p.name} width={p.width} height={p.height} unoptimized />
          </a>
        </Fragment>
      ))}
    </div>
  );
}
