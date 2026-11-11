// /contact in the homepage design system. The form keeps the `.contact-form`
// class and field names because components/ClientEffects.tsx wires it to
// /api/contact. Styles: app/styles/contact.css.
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";
import type { Crumb } from "@/lib/seo";

const STEPS = [
  { t: "You send the details", d: "A few lines about the work you want gone. Two minutes, no jargon needed." },
  { t: "A person reads it", d: "Someone on the team replies within 24 hours. No chatbot, no sales script." },
  { t: "We suggest a next step", d: "Usually a free discovery call. Sometimes the honest answer is that it is not worth automating yet." },
];

export default function ContactPage({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <main className="contact-page hm">
      <section className="hm-section hm-dark hm-phero hm-cphero">
        <div className="hm-dark-bg" aria-hidden="true" />
        <div className="container">
          <nav className="hm-crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.path}>
                {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                {i < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}
              </span>
            ))}
          </nav>
          <p className="hm-eyebrow hm-eyebrow-light">Contact</p>
          <h1>
            Tell us what is eating your <span className="hm-grad-text">week.</span>
          </h1>
          <p className="hm-lead">Describe the manual work you want gone. A real person replies within 24 hours.</p>
        </div>
      </section>

      <section className="hm-section hm-white hm-cbody">
        <div className="container hm-cgrid">
          <div className="hm-cinfo">
            <p className="hm-eyebrow">What happens next</p>
            <ol className="hm-csteps">
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="hm-cdetails">
              <li>
                <Mail size={20} aria-hidden="true" />
                <span>
                  <small>Email</small>
                  <b>hello@whisperslab.com</b>
                </span>
              </li>
              <li>
                <Clock size={20} aria-hidden="true" />
                <span>
                  <small>Hours</small>
                  <b>Monday to Friday, 9:00 AM to 5:00 PM</b>
                </span>
              </li>
              <li>
                <MapPin size={20} aria-hidden="true" />
                <span>
                  <small>Registered address</small>
                  <b>30 N Gould St, Ste R, Sheridan, WY 82801</b>
                </span>
              </li>
            </ul>

            <div className="hm-cbook">
              <b>Prefer to talk?</b>
              <p>Skip the form and pick a time for a free discovery call.</p>
              <Link href="/book" className="hm-btn hm-btn-outline">
                <span>Book a free discovery call</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hm-cform">
            <h2>Tell us about your business</h2>
            <p>Takes under two minutes.</p>
            <form className="contact-form hm-form">
              <label className="hm-field">
                <span>Full name</span>
                <input type="text" name="name" placeholder="Jane Doe" autoComplete="name" required />
              </label>
              <label className="hm-field">
                <span>Business email</span>
                <input type="email" name="email" placeholder="jane@yourcompany.com" autoComplete="email" required />
              </label>
              <label className="hm-field">
                <span>Company name</span>
                <input type="text" name="company" placeholder="Your company" autoComplete="organization" />
              </label>
              <label className="hm-field">
                <span>What is your biggest operational bottleneck right now?</span>
                <select name="bottleneck" required defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Manual Data Entry &amp; Reporting</option>
                  <option>Lead Routing &amp; CRM Sync</option>
                  <option>Client Onboarding &amp; Handoffs</option>
                  <option>Invoicing &amp; Reminders</option>
                  <option>Just exploring AI automation</option>
                </select>
              </label>
              <label className="hm-field">
                <span>Briefly describe the manual task you hate doing the most</span>
                <textarea name="message" rows={4} placeholder="e.g. Copy-pasting invoice data into our accounting software every week" />
              </label>
              <button type="submit" className="hm-btn hm-form-submit">
                Send message
              </button>
              <small className="hm-form-note">No spam and no cold-call lists. We only use this to reply to you.</small>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
