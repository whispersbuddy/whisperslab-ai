import type { ReactNode } from "react";

type LegacyOfferBodyProps = {
  html: string;
  insertBefore: string;
  className: string;
  children: ReactNode;
};

export default function LegacyOfferBody({ html, insertBefore, className, children }: LegacyOfferBodyProps) {
  const mainOpen = html.indexOf("<main>");
  const insertion = html.indexOf(insertBefore);
  const mainClose = html.indexOf("</main>");

  if (mainOpen === -1 || insertion === -1 || mainClose === -1 || !(mainOpen < insertion && insertion < mainClose)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html.slice(0, mainOpen) }} />
      <main className={className}>
        <div dangerouslySetInnerHTML={{ __html: html.slice(mainOpen + "<main>".length, insertion) }} />
        {children}
        <div dangerouslySetInnerHTML={{ __html: html.slice(insertion, mainClose) }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: html.slice(mainClose + "</main>".length) }} />
    </>
  );
}

export function OfferAssuranceBand({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: Array<{ label: string; body: string }>;
}) {
  return (
    <section className="offer-assurance section">
      <div className="container">
        <header><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{intro}</p></header>
        <div>{items.map((item, index) => <article key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3><p>{item.body}</p></article>)}</div>
      </div>
    </section>
  );
}
