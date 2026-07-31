// Hand-authored — dedicated Case Studies page. Markup mirrors the existing
// site patterns verbatim (nav-solid header, contact-banner-style banner,
// the homepage's .case-study card components, join-section + footer) so the
// page matches the established design system exactly.
export const CASE_STUDIES_HTML = `

<header class="nav-wrap nav-solid">
  <div class="container nav">
    <a href="/" class="logo">
      <img src="/assets/logo-trim.png" alt="Whispers Lab" width="348" height="45">
    </a>
    <nav class="nav-links">
      <a href="/">Home</a>
      <a href="/audit">AI Audit</a>
      <a href="/core-build">Core Build</a>
      <a href="/case-studies">Case Studies</a>
      <a href="/contact">Contact</a>
    </nav>
    <a href="/book" class="btn btn-cta">Book Free Discovery Call
      <svg class="btn-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <button class="burger" id="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/">Home</a>
    <a href="/audit">AI Audit</a>
    <a href="/core-build">Core Build</a>
    <a href="/case-studies">Case Studies</a>
    <a href="/contact">Contact</a>
    <a href="/book" class="btn btn-cta">Book Free Discovery Call</a>
  </div>
</header>

<main>

  <!-- SMALL BANNER -->
  <section class="contact-banner">
    <div class="container">
      <span class="eyebrow eyebrow-light">REAL RESULTS · CASE STUDIES</span>
      <h1>Every system we've built, in one place.</h1>
    </div>
  </section>

  <!-- CASE STUDIES LIST -->
  <section class="section case-section">
    <div class="container">

      <div class="cases-list">

        <!-- CASE 1 -->
        <article class="case-study">
          <div class="case-study-head">
            <div class="case-tags">
              <span class="case-industry">FINANCIAL SERVICES · SAAS</span>
              <span class="case-build case-build-ai">AI-POWERED</span>
            </div>
            <h3>The AI-Powered Financial Document Reader</h3>
            <p class="case-goal"><strong>The goal:</strong> Stop the manual data entry of bank statements and invoices.</p>
          </div>
          <div class="case-study-body">
            <div class="case-block case-before">
              <span class="case-label case-label-before">BEFORE · THE PAIN</span>
              <p>The client relied on slow, manual data entry and outdated, restrictive scanners to process sensitive accounting and compliance documents. This bottleneck slowed daily operations and made it incredibly hard to scale.</p>
            </div>
            <div class="case-block case-after">
              <span class="case-label case-label-after">AFTER · THE OUTPUT</span>
              <p>We built a custom AI system that acts like a digital data-entry clerk. It instantly reads uploaded bank statements, pulls the exact transaction data needed, and securely organizes it into their database, without a single human touch.</p>
            </div>
          </div>
          <div class="case-numbers">
            <div class="case-metric"><span class="case-metric-num">100%</span><span class="case-metric-label">elimination of manual data entry</span></div>
            <div class="case-metric"><span class="case-metric-num">~15 hrs</span><span class="case-metric-label">saved weekly (≈40 docs/day × 4 min)</span></div>
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">hours wasted copying &amp; pasting</span></div>
            <div class="case-metric"><span class="case-metric-num">1</span><span class="case-metric-label">fully automated, secure AI pipeline</span></div>
          </div>
        </article>

        <!-- CASE 2 -->
        <article class="case-study">
          <div class="case-study-head">
            <div class="case-tags">
              <span class="case-industry">E-COMMERCE · RETAIL</span>
              <span class="case-build case-build-ai">AI-POWERED</span>
            </div>
            <h3>The AI Catalog &amp; Content Engine</h3>
            <p class="case-goal"><strong>The goal:</strong> Automate the cleanup and translation of massive supplier product catalogs.</p>
          </div>
          <div class="case-study-body">
            <div class="case-block case-before">
              <span class="case-label case-label-before">BEFORE · THE PAIN</span>
              <p>The store owner was losing sales to high cart abandonment. Supplier catalogs were messy and in raw foreign languages, so the team spent countless hours manually rewriting titles, fixing pricing errors, and translating descriptions just to look trustworthy to buyers.</p>
            </div>
            <div class="case-block case-after">
              <span class="case-label case-label-after">AFTER · THE OUTPUT</span>
              <p>We built a one-click AI system. It fetches the raw supplier data, then instantly cleans the text, translates it perfectly into the local language, formats descriptions beautifully, and pushes everything live to the store automatically.</p>
            </div>
          </div>
          <div class="case-numbers">
            <div class="case-metric"><span class="case-metric-num">100%</span><span class="case-metric-label">automated translation &amp; formatting</span></div>
            <div class="case-metric"><span class="case-metric-num">~22 hrs</span><span class="case-metric-label">saved weekly (≈500 products × 2.5 min)</span></div>
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">hours writing product descriptions</span></div>
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">duplicate entries or catalog errors</span></div>
          </div>
        </article>

        <!-- CASE 3 -->
        <article class="case-study">
          <div class="case-study-head">
            <div class="case-tags">
              <span class="case-industry">REAL ESTATE · LEAD SALES</span>
              <span class="case-build case-build-auto">AUTOMATED</span>
            </div>
            <h3>The Lead Sales Engine That Runs Itself</h3>
            <p class="case-goal"><strong>The goal:</strong> Stop manually sourcing, pitching, and selling property leads one at a time.</p>
          </div>
          <div class="case-study-body">
            <div class="case-block case-before">
              <span class="case-label case-label-before">BEFORE · THE PAIN</span>
              <p>Every lead meant looking up the homeowner by hand, texting contractors one at a time, sending a payment link, then emailing the details over. Leads occasionally got sold twice, which meant a refund and an angry contractor.</p>
            </div>
            <div class="case-block case-after">
              <span class="case-label case-label-after">AFTER · THE OUTPUT</span>
              <p>New leads are found, enriched with contact details, and pitched to contractors automatically. A locked "preview" proves the lead is worth buying without giving it away — the second someone pays, it's marked sold and delivered, so it can never go out twice.</p>
            </div>
          </div>
          <div class="case-numbers">
            <div class="case-metric"><span class="case-metric-num">100%</span><span class="case-metric-label">of lead pitching &amp; delivery automated</span></div>
            <div class="case-metric"><span class="case-metric-num">~15 hrs</span><span class="case-metric-label">saved weekly (≈30 leads/wk × 30 min manual cycle)</span></div>
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">leads sold twice since launch</span></div>
            <div class="case-metric"><span class="case-metric-num">24/7</span><span class="case-metric-label">pipeline runs with nobody at a desk</span></div>
          </div>
        </article>

        <!-- CASE 4 -->
        <article class="case-study">
          <div class="case-study-head">
            <div class="case-tags">
              <span class="case-industry">PROFESSIONAL SERVICES · FINANCE &amp; HR</span>
              <span class="case-build case-build-auto">AUTOMATED</span>
            </div>
            <h3>The Zero Double-Entry Financial Pipeline</h3>
            <p class="case-goal"><strong>The goal:</strong> Stop retyping every customer and invoice into two separate systems.</p>
          </div>
          <div class="case-study-body">
            <div class="case-block case-before">
              <span class="case-label case-label-before">BEFORE · THE PAIN</span>
              <p>Every customer and invoice was built once in the operations app, then rebuilt by hand in the accounting system. Quotes sent to customers hit a login wall, so plenty never got read at all.</p>
            </div>
            <div class="case-block case-after">
              <span class="case-label case-label-after">AFTER · THE OUTPUT</span>
              <p>Customers and invoices now sync both ways automatically, with a safeguard that stops the two systems endlessly "correcting" each other. Quotes go out as branded PDFs straight to the inbox, no login required, with a one-click Accept button that updates both systems at once.</p>
            </div>
          </div>
          <div class="case-numbers">
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">records typed twice</span></div>
            <div class="case-metric"><span class="case-metric-num">~10 hrs</span><span class="case-metric-label">saved weekly on manual invoice &amp; contact entry</span></div>
            <div class="case-metric"><span class="case-metric-num">1</span><span class="case-metric-label">click for customers to accept a quote</span></div>
            <div class="case-metric"><span class="case-metric-num">100%</span><span class="case-metric-label">of internal data stayed private</span></div>
          </div>
        </article>

        <!-- CASE 5 -->
        <article class="case-study">
          <div class="case-study-head">
            <div class="case-tags">
              <span class="case-industry">EDUCATION · RELATIONSHIP MANAGEMENT</span>
              <span class="case-build case-build-auto">AUTOMATED</span>
            </div>
            <h3>The CRM That Fills Itself In</h3>
            <p class="case-goal"><strong>The goal:</strong> Get the founder's relationships out of his personal inbox and into a system the team can actually use.</p>
          </div>
          <div class="case-study-body">
            <div class="case-block case-before">
              <span class="case-label case-label-before">BEFORE · THE PAIN</span>
              <p>Years of conversations with schools and educators sat in one person's email and calendar. Logging them by hand meant wading through internal chatter, newsletters, and bot invites just to find the real ones.</p>
            </div>
            <div class="case-block case-after">
              <span class="case-label case-label-after">AFTER · THE OUTPUT</span>
              <p>Emails and meetings now log themselves automatically, with the noise filtered out before it ever reaches the database. Even conversations with people missing from the contact list still get matched to the right organization, so nothing important is lost to a forgotten record.</p>
            </div>
          </div>
          <div class="case-numbers">
            <div class="case-metric"><span class="case-metric-num">100%</span><span class="case-metric-label">of relevant emails &amp; meetings auto-logged</span></div>
            <div class="case-metric"><span class="case-metric-num">~6 hrs</span><span class="case-metric-label">saved weekly on manual CRM updates</span></div>
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">spam or internal noise reaching the database</span></div>
            <div class="case-metric"><span class="case-metric-num">2</span><span class="case-metric-label">ways every contact gets matched, so none slip through</span></div>
          </div>
        </article>

        <!-- CASE 6 -->
        <article class="case-study">
          <div class="case-study-head">
            <div class="case-tags">
              <span class="case-industry">COACHING · CLIENT ONBOARDING</span>
              <span class="case-build case-build-auto">AUTOMATED</span>
            </div>
            <h3>The Onboarding Pipeline That Runs on Autopilot</h3>
            <p class="case-goal"><strong>The goal:</strong> Get new coaching clients booked, prepped, and logged without a single manual step.</p>
          </div>
          <div class="case-study-body">
            <div class="case-block case-before">
              <span class="case-label case-label-before">BEFORE · THE PAIN</span>
              <p>Booking one client meant a run of emails to find a time, a meeting link built by hand, manual reminders, and clients regularly showing up before finishing their intake forms.</p>
            </div>
            <div class="case-block case-after">
              <span class="case-label case-label-after">AFTER · THE OUTPUT</span>
              <p>Clients now book themselves. A quiet minimum-notice rule creates the exact window they need to finish intake forms before the session, meeting links and reminders go out automatically, and the CRM updates itself the moment a booking is made — all inside tools the business already owned.</p>
            </div>
          </div>
          <div class="case-numbers">
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">emails needed to book a session</span></div>
            <div class="case-metric"><span class="case-metric-num">~5 hrs</span><span class="case-metric-label">saved weekly on scheduling &amp; reminders</span></div>
            <div class="case-metric"><span class="case-metric-num">100%</span><span class="case-metric-label">of clients arrive with intake forms done</span></div>
            <div class="case-metric"><span class="case-metric-num">$0</span><span class="case-metric-label">extra software — built on tools already paid for</span></div>
          </div>
        </article>

        <!-- CASE 7 -->
        <article class="case-study">
          <div class="case-study-head">
            <div class="case-tags">
              <span class="case-industry">AUTOMOTIVE · FIELD INSPECTIONS</span>
              <span class="case-build case-build-auto">AUTOMATED</span>
            </div>
            <h3>The Inspection Report That Writes Itself</h3>
            <p class="case-goal"><strong>The goal:</strong> Turn a field inspection form into a finished, premium report with zero manual formatting.</p>
          </div>
          <div class="case-study-body">
            <div class="case-block case-before">
              <span class="case-label case-label-before">BEFORE · THE PAIN</span>
              <p>Every inspection produced a form response with 38+ photos and written notes. Someone then spent an afternoon building it into a polished, multi-page document by hand, matching a premium layout the client insisted on.</p>
            </div>
            <div class="case-block case-after">
              <span class="case-label case-label-after">AFTER · THE OUTPUT</span>
              <p>The finished report now builds itself the moment the form is submitted. Photos arrange into a clean grid, notes and images are handled as separate streams so nothing overlaps, and the document grows to however many pages the job needs.</p>
            </div>
          </div>
          <div class="case-numbers">
            <div class="case-metric"><span class="case-metric-num">100%</span><span class="case-metric-label">of report formatting automated</span></div>
            <div class="case-metric"><span class="case-metric-num">~4 hrs</span><span class="case-metric-label">saved per inspection report</span></div>
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">overlapping text or clipped pages</span></div>
            <div class="case-metric"><span class="case-metric-num">38+</span><span class="case-metric-label">photos laid out automatically, every time</span></div>
          </div>
        </article>

        <!-- CASE 8 -->
        <article class="case-study">
          <div class="case-study-head">
            <div class="case-tags">
              <span class="case-industry">WAREHOUSING · FULFILLMENT OPS</span>
              <span class="case-build case-build-auto">AUTOMATED</span>
            </div>
            <h3>The Self-Cleaning Warehouse System</h3>
            <p class="case-goal"><strong>The goal:</strong> Clear thousands of empty warehouse slots and stop a document backlog from growing every day.</p>
          </div>
          <div class="case-study-body">
            <div class="case-block case-before">
              <span class="case-label case-label-before">BEFORE · THE PAIN</span>
              <p>Empty warehouse locations had to be removed one at a time. Separately, every shipping slip generated left a leftover file behind in cloud storage — thousands of them, and the browser froze every time anyone tried to bulk-delete them.</p>
            </div>
            <div class="case-block case-after">
              <span class="case-label case-label-after">AFTER · THE OUTPUT</span>
              <p>A single report now clears every empty location in one upload. The shipping slip workflow deletes its own leftover files the moment they're no longer needed, and the existing backlog was cleared automatically in batches, with no browser involved.</p>
            </div>
          </div>
          <div class="case-numbers">
            <div class="case-metric"><span class="case-metric-num">1</span><span class="case-metric-label">upload clears every empty location</span></div>
            <div class="case-metric"><span class="case-metric-num">~3 hrs</span><span class="case-metric-label">saved weekly on manual cleanup</span></div>
            <div class="case-metric"><span class="case-metric-num">0</span><span class="case-metric-label">leftover files generated going forward</span></div>
            <div class="case-metric"><span class="case-metric-num">1,000s</span><span class="case-metric-label">of backlogged files cleared without a browser crash</span></div>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- FOOTER / LEAD MAGNET CTA -->
  <section class="section join-section" id="framework">
    <div class="container join-inner">
      <span class="eyebrow eyebrow-light">WEEKLY AI SHORTCUTS TO BUY BACK YOUR TIME</span>
      <h2>Delete one hour of busywork this week.</h2>
      <p class="section-copy">Get our free "Busywork Elimination Framework" and join our Tuesday newsletter. Every week, we send you one manual task to eliminate and the exact AI tool to replace it.</p>
      <form class="newsletter-form">
        <input type="email" name="email" class="newsletter-input" placeholder="Enter your email" aria-label="Email address" required>
        <button type="submit" class="newsletter-btn">Send Me The Framework</button>
      </form>
      <span class="newsletter-note">No spam. Zero tech jargon. Just hours bought back.</span>
    </div>
  </section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <p class="footer-mandate">THE LAB REPORT: WEEKLY AI SHORTCUTS TO BUY BACK YOUR TIME.</p>
    <div class="footer-row">
      <p class="footer-links"><a href="/audit">AI AUDIT</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="/core-build">CORE BUILD</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="/case-studies">CASE STUDIES</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="/contact">CONTACT</a></p>
      <div class="footer-social">
        <a href="https://www.instagram.com/whispers__lab/" target="_blank" rel="noopener" aria-label="Instagram" class="social-icon">
          <svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/whispers-lab/" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-icon">
          <svg viewBox="0 0 24 24" fill="none"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.45 20h-3.37v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.06 2.26 4.06 5.2V20Z" fill="currentColor"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>
`;
