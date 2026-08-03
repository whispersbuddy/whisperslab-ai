// Shared footer for JSX-authored pages. Matches app/_content/*.ts's
// footer markup exactly, including the newsletter-form's name="email"
// attribute (ClientEffects.tsx submits it via FormData -- without a name
// attribute the field is silently dropped, a bug fixed site-wide earlier).
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-mandate">
          THE LAB REPORT: WEEKLY AI SHORTCUTS TO BUY BACK YOUR TIME.
        </p>
        <div className="footer-row">
          <p className="footer-links">
            <a href="/audit">AI AUDIT</a>&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="/core-build">CORE BUILD</a>&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="/case-studies">CASE STUDIES</a>&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="/contact">CONTACT</a>
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/whispers__lab/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="social-icon"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/whispers-lab/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="social-icon"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.45 20h-3.37v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.06 2.26 4.06 5.2V20Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
