// The four offers as cards, reusing the homepage's .pricing-card styles.
import { ClipboardCheck, Hammer, ShieldCheck, TrendingUp } from "lucide-react";
import { OFFERS, type Offer } from "@/lib/offers";

const ICONS = { audit: ClipboardCheck, "core-build": Hammer, "automation-care": ShieldCheck, "growth-partner": TrendingUp } as const;

export default function PricingCards({ highlight = "audit", offers = OFFERS }: { highlight?: Offer["key"]; offers?: Offer[] }) {
  return (
    <div className="cards-grid pricing-grid">
      {offers.map((o) => {
        const Icon = ICONS[o.key];
        return (
          <div key={o.key} className={"card pricing-card" + (o.key === highlight ? " featured" : "")}>
            <div className="pricing-top">
              <span className="pricing-icon">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div className="price">{o.price}</div>
            </div>
            <h3>{o.name}</h3>
            <p>{o.pitch}</p>
            <ul className="card-list">
              {o.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <a href={o.href} className="card-cta">
              {o.cta} →
            </a>
          </div>
        );
      })}
    </div>
  );
}
