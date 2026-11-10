"use client";

// Tabbed showcase for the three platforms we build on. All three panels are in
// the HTML at all times (inactive ones are hidden with the `hidden` attribute),
// so crawlers see every link whichever tab is open.
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Platform = {
  name: string;
  logo: string;
  w: number;
  h: number;
  blurb: string;
  href: string;
};

export default function PlatformTabs({ platforms }: { platforms: Platform[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="hm-tabs">
      <div className="hm-tablist" role="tablist" aria-label="Platforms we build on">
        {platforms.map((p, i) => (
          <button
            key={p.name}
            id={`hm-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`hm-panel-${i}`}
            className={active === i ? "is-active" : undefined}
            onClick={() => setActive(i)}
          >
            {p.name}
          </button>
        ))}
      </div>
      {platforms.map((p, i) => (
        <div
          key={p.name}
          id={`hm-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`hm-tab-${i}`}
          hidden={active !== i}
          className="hm-tabpanel"
        >
          <div className="hm-tabcopy">
            <h3>{p.name} consultants</h3>
            <p>{p.blurb}</p>
            <Link href={p.href} className="hm-btn hm-btn-light">
              <span>See how we build on {p.name}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="hm-tabvisual" aria-hidden="true">
            <Image src={p.logo} alt="" width={p.w} height={p.h} />
          </div>
        </div>
      ))}
    </div>
  );
}
