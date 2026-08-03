// Shared header for JSX-authored pages (case studies index + detail
// pages). Matches app/_content/*.ts's header markup exactly -- same
// classes/ids so ClientEffects.tsx's burger/mobile-menu wiring keeps
// working unmodified. Uses the "nav-solid" variant since these are
// non-hero pages, same as contact/audit/core-build.
export default function SiteHeader() {
  return (
    <header className="nav-wrap nav-solid">
      <div className="container nav">
        <a href="/" className="logo">
          <img src="/assets/logo-trim.png" alt="Whispers Lab" width={348} height={45} />
        </a>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/audit">AI Audit</a>
          <a href="/core-build">Core Build</a>
          <a href="/case-studies">Case Studies</a>
          <a href="/contact">Contact</a>
        </nav>
        <a href="/book" className="btn btn-cta">
          Book Free Discovery Call
          <svg
            className="btn-arrow"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <button className="burger" id="burger" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="mobile-menu" id="mobileMenu">
        <a href="/">Home</a>
        <a href="/audit">AI Audit</a>
        <a href="/core-build">Core Build</a>
        <a href="/case-studies">Case Studies</a>
        <a href="/contact">Contact</a>
        <a href="/book" className="btn btn-cta">
          Book Free Discovery Call
        </a>
      </div>
    </header>
  );
}
