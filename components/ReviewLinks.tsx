// Visible links to the third-party review profiles. No counts or scores on
// purpose: those change on the platforms, so any number here would go stale.
// Never add review or rating schema for these (Google ignores self-hosted
// reviews of your own business).
import { Star } from "lucide-react";
import { CLUTCH_URL, TRUSTPILOT_URL } from "@/lib/social";

export default function ReviewLinks({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  return (
    <div className={`review-links review-links-${tone}${compact ? " review-links-compact" : ""}`}>
      <span>{compact ? "Client reviews" : "Read what clients say on"}</span>
      <a href={TRUSTPILOT_URL} target="_blank" rel="noopener">
        <Star aria-hidden="true" />
        Trustpilot
      </a>
      {compact ? null : <span>and</span>}
      <a href={CLUTCH_URL} target="_blank" rel="noopener">
        <Star aria-hidden="true" />
        Clutch
      </a>
    </div>
  );
}
