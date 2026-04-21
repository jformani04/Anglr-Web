import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ChevronRight } from 'lucide-react';
import AnglrLogo from '@/components/AnglrLogo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ANGLR Privacy Policy — how we collect, use, and protect your data.',
  robots: 'index, follow',
};

const LAST_UPDATED = 'April 21, 2025';
const CONTACT_EMAIL = 'anglr.contact@gmail.com';

const sections = [
  { id: 'collection', label: 'Data Collection' },
  { id: 'usage', label: 'How We Use It' },
  { id: 'storage', label: 'Storage & Security' },
  { id: 'sharing', label: 'Sharing' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'changes', label: 'Policy Changes' },
  { id: 'contact', label: 'Contact Us' },
];

function SectionAnchor({ id }: { id: string }) {
  return <span id={id} className="block -mt-24 pt-24 invisible" aria-hidden="true" />;
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* ── Top nav ── */}
      <header className="sticky top-0 z-50 border-b border-anglr-border/60 bg-anglr-bg/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <AnglrLogo size="sm" href="/" />
          <nav className="hidden md:flex items-center gap-1">
            {sections.slice(0, 4).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 text-xs font-medium text-anglr-text-muted hover:text-anglr-text-secondary rounded-lg hover:bg-anglr-surface/60 transition-all"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <Link
            href="/reset-password"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-anglr-text-muted hover:text-anglr-text-secondary transition-colors"
          >
            <Shield size={12} />
            Reset Password
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:gap-16">
          {/* ── Sidebar TOC (desktop) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-widest text-anglr-text-muted mb-4">
                Contents
              </p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-anglr-text-muted hover:text-anglr-text-secondary hover:bg-anglr-surface/50 transition-all group"
                  >
                    <ChevronRight
                      size={12}
                      className="text-anglr-blue opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    />
                    {s.label}
                  </a>
                ))}
              </nav>

              {/* Contact card */}
              <div className="mt-8 p-4 rounded-xl bg-anglr-surface/50 border border-anglr-border">
                <p className="text-xs font-semibold text-anglr-text-secondary mb-1">Questions?</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xs text-anglr-blue hover:text-blue-400 transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="min-w-0">
            {/* Hero header */}
            <div className="mb-10 pb-8 border-b border-anglr-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-anglr-blue/10 border border-anglr-blue/20">
                  <Shield size={20} className="text-anglr-blue" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-anglr-text-muted">
                  Legal
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-anglr-text-primary tracking-tight mb-3">
                Privacy Policy
              </h1>
              <p className="text-sm text-anglr-text-secondary leading-relaxed max-w-xl">
                Your privacy matters to us. This policy explains exactly what data ANGLR collects,
                why we collect it, and how you can control it.
              </p>
              <p className="text-xs text-anglr-text-muted mt-4">
                Last updated: <strong className="text-anglr-text-secondary">{LAST_UPDATED}</strong>
                &nbsp;·&nbsp; Effective immediately
              </p>

              {/* Mobile TOC */}
              <div className="mt-6 p-4 rounded-xl bg-anglr-surface/50 border border-anglr-border lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-widest text-anglr-text-muted mb-3">
                  Jump to
                </p>
                <div className="flex flex-wrap gap-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="text-xs text-anglr-blue bg-anglr-blue/10 border border-anglr-blue/20 px-3 py-1 rounded-full hover:bg-anglr-blue/20 transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Article content ── */}
            <article className="prose-anglr space-y-2">

              {/* Intro */}
              <p>
                ANGLR (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your personal
                information. This Privacy Policy applies to the ANGLR mobile application and associated web
                services (collectively, the &quot;Service&quot;). By using the Service, you agree to the
                collection and use of information in accordance with this policy.
              </p>

              {/* ── 1. Data Collection ── */}
              <SectionAnchor id="collection" />
              <h2>1. Information We Collect</h2>

              <h3>Account Information</h3>
              <p>
                When you create an ANGLR account we collect:
              </p>
              <ul>
                <li>Email address (used for authentication and notifications)</li>
                <li>Display name and optional profile photo</li>
                <li>Encrypted password (stored via Supabase Auth — we never see your plaintext password)</li>
              </ul>

              <h3>Fishing & Activity Data</h3>
              <p>
                The core of ANGLR is your catch and trip data. We store what you choose to log:
              </p>
              <ul>
                <li>Catch records: species, weight, length, bait/lure, date and time</li>
                <li>Location data: GPS coordinates of catch spots and fishing sessions (only when you grant permission)</li>
                <li>Photos attached to catch logs</li>
                <li>Trip notes, weather conditions, and water temperature you enter manually</li>
                <li>Fishing spots and waypoints you create</li>
              </ul>

              <h3>Device & Technical Information</h3>
              <p>We automatically collect limited technical data to operate and improve the Service:</p>
              <ul>
                <li>Device type, operating system version, and app version</li>
                <li>IP address and approximate geographic region (country/state level)</li>
                <li>Crash reports and error logs (via third-party analytics, anonymized)</li>
                <li>App usage patterns (screens visited, features used — no keystroke logging)</li>
              </ul>

              <h3>Location Data</h3>
              <p>
                Location access is <strong>entirely optional</strong> and controlled by your device permissions.
                We request location only when you actively log a catch or start a trip. We do not track your
                location in the background. You can revoke location permission at any time in your device settings.
              </p>

              {/* ── 2. Usage ── */}
              <SectionAnchor id="usage" />
              <h2>2. How We Use Your Information</h2>

              <p>We use the information we collect solely to:</p>
              <ul>
                <li>Create and manage your ANGLR account</li>
                <li>Store, sync, and display your fishing logs across your devices</li>
                <li>Generate personalized statistics and insights (catch trends, best spots, seasonal patterns)</li>
                <li>Send transactional emails — password resets, account security alerts (no marketing without consent)</li>
                <li>Diagnose bugs and improve app stability</li>
                <li>Comply with applicable laws and enforce our Terms of Service</li>
              </ul>

              <p>
                We do <strong>not</strong> use your data to build advertising profiles, sell to data brokers,
                or train third-party AI models without your explicit consent.
              </p>

              <h3>Analytics</h3>
              <p>
                Aggregated, anonymized usage statistics may be used to understand which features are popular
                and where to invest development effort. These statistics cannot be linked back to individual users.
              </p>

              {/* ── 3. Storage ── */}
              <SectionAnchor id="storage" />
              <h2>3. Data Storage & Security</h2>

              <h3>Where We Store Data</h3>
              <p>
                Your data is stored on <strong>Supabase</strong> infrastructure, which is hosted on AWS in
                the United States (us-east-1 region) by default. If you are located in the EU, data
                transfers are covered by Standard Contractual Clauses.
              </p>

              <h3>How We Protect It</h3>
              <ul>
                <li>All data in transit is encrypted using TLS 1.2 or higher</li>
                <li>Data at rest is encrypted using AES-256</li>
                <li>Passwords are hashed using bcrypt — never stored in plaintext</li>
                <li>Row-level security (RLS) policies ensure users can only access their own data</li>
                <li>We conduct regular security audits and dependency updates</li>
              </ul>

              <h3>Data Retention</h3>
              <p>
                We retain your data for as long as your account is active. If you delete your account,
                your personal data is purged within 30 days. Anonymized aggregate statistics may be
                retained indefinitely.
              </p>

              <h3>Backups</h3>
              <p>
                We maintain automated daily backups for disaster recovery. Backup data is subject to the
                same encryption and access controls as production data.
              </p>

              {/* ── 4. Sharing ── */}
              <SectionAnchor id="sharing" />
              <h2>4. Sharing Your Information</h2>

              <p>
                We do <strong>not</strong> sell, rent, or trade your personal information to third parties.
                We may share limited information only in these circumstances:
              </p>

              <h3>Service Providers</h3>
              <ul>
                <li>
                  <strong>Supabase</strong> — database, authentication, and storage infrastructure.
                  Supabase processes data only as directed by us and under a data processing agreement.
                </li>
                <li>
                  <strong>Vercel</strong> — web hosting for account management pages.
                </li>
                <li>
                  <strong>Crash reporting tools</strong> (e.g., Sentry) — receive anonymized error data
                  to help us fix bugs.
                </li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>
                We may disclose your information if required by law, court order, or government authority,
                or if we believe disclosure is necessary to protect the rights, property, or safety of
                ANGLR, our users, or the public.
              </p>

              <h3>Business Transfers</h3>
              <p>
                If ANGLR is acquired or merges with another company, your data may be transferred as
                part of that transaction. We will notify you via email before your data becomes subject
                to a different privacy policy.
              </p>

              {/* ── 5. Your Rights ── */}
              <SectionAnchor id="rights" />
              <h2>5. Your Rights & Controls</h2>

              <p>
                Depending on your location you may have the following rights regarding your personal data:
              </p>

              <h3>Access & Portability</h3>
              <ul>
                <li>Request a copy of all personal data we hold about you</li>
                <li>Export your catch logs and fishing data in a standard format (CSV/JSON)</li>
              </ul>

              <h3>Correction</h3>
              <ul>
                <li>Update or correct inaccurate personal information through the app settings</li>
              </ul>

              <h3>Deletion</h3>
              <ul>
                <li>Delete individual catch records or trips at any time within the app</li>
                <li>Request full account deletion by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
                <li>Account deletion removes all personal data within 30 days</li>
              </ul>

              <h3>Opt-Out</h3>
              <ul>
                <li>Disable location access via device settings</li>
                <li>Opt out of non-essential emails via in-app notification settings</li>
                <li>Opt out of analytics by contacting us (we will honor the request within 5 business days)</li>
              </ul>

              <h3>GDPR (EU Users)</h3>
              <p>
                If you are located in the European Economic Area, you have rights under the General Data
                Protection Regulation (GDPR), including the right to lodge a complaint with your local
                supervisory authority. Our legal basis for processing your data is <strong>contract
                performance</strong> (operating the Service) and <strong>legitimate interests</strong>
                (improving the Service and preventing fraud).
              </p>

              <h3>CCPA (California Users)</h3>
              <p>
                California residents have the right to know what personal information is collected, request
                deletion, and opt out of the sale of personal information. We do not sell personal
                information. To exercise your rights, contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>

              {/* ── 6. Children ── */}
              <SectionAnchor id="children" />
              <h2>6. Children&apos;s Privacy</h2>

              <p>
                ANGLR is not directed to children under the age of 13 (or 16 in the EU). We do not
                knowingly collect personal information from children. If you believe a child has provided
                us with personal information, please contact us immediately at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will delete it promptly.
              </p>

              {/* ── 7. Changes ── */}
              <SectionAnchor id="changes" />
              <h2>7. Changes to This Policy</h2>

              <p>
                We may update this Privacy Policy from time to time. When we make material changes, we will:
              </p>
              <ul>
                <li>Update the &quot;Last updated&quot; date at the top of this page</li>
                <li>Send a notification email to your registered address at least 14 days before the change takes effect</li>
                <li>Display an in-app banner for significant changes</li>
              </ul>

              <p>
                Continued use of the Service after the effective date constitutes acceptance of the
                updated policy. If you do not agree with the changes, you may delete your account.
              </p>

              {/* ── 8. Contact ── */}
              <SectionAnchor id="contact" />
              <h2>8. Contact Us</h2>

              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your
                personal data, please reach out:
              </p>

              <div className="not-prose mt-4 p-5 rounded-2xl bg-anglr-surface/60 border border-anglr-border space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-anglr-blue/10 border border-anglr-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield size={14} className="text-anglr-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-anglr-text-primary">ANGLR Privacy Team</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm text-anglr-blue hover:text-blue-400 transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <p className="text-xs text-anglr-text-muted mt-1">
                      We aim to respond to all privacy requests within 5 business days.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs text-anglr-text-muted">
                This privacy policy was last reviewed and updated on{' '}
                <strong className="text-anglr-text-secondary">{LAST_UPDATED}</strong>.
              </p>
            </article>
          </main>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t border-anglr-border py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <AnglrLogo size="sm" />
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-anglr-text-muted hover:text-anglr-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/reset-password" className="text-xs text-anglr-text-muted hover:text-anglr-text-secondary transition-colors">
              Reset Password
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-xs text-anglr-text-muted hover:text-anglr-text-secondary transition-colors">
              Contact
            </a>
          </div>
          <p className="text-xs text-anglr-text-muted">© {new Date().getFullYear()} ANGLR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
