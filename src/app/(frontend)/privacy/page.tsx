import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Peptide Wiki',
  description:
    'Privacy Policy for Peptide Wiki — how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mono-label mb-2 text-black/30">Legal</p>
        <h1 className="text-[36px] font-medium tracking-heading text-black">Privacy Policy</h1>
        <p className="mt-3 text-[14px] text-black/40">Last updated: April 9, 2026</p>
      </div>

      <div className="space-y-10">

        {/* Intro */}
        <section>
          <p className="text-[15px] leading-[1.75] text-black/60">
            Peptide Wiki (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;the Site&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website and use our services.
          </p>
        </section>

        {/* 1 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">1. Information We Collect</h2>
          <h3 className="mb-2 text-[15px] font-medium text-black/70">Information you provide directly</h3>
          <ul className="mb-4 space-y-2 pl-4">
            {[
              'Account information: name, email address, password (hashed and never stored in plaintext)',
              'Membership information: subscription tier and billing details (processed by Stripe)',
              'Email newsletter subscriptions',
              'Profile updates and preferences',
            ].map((item) => (
              <li key={item} className="flex gap-2 text-[14px] leading-[1.7] text-black/60">
                <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/20" />
                {item}
              </li>
            ))}
          </ul>
          <h3 className="mb-2 text-[15px] font-medium text-black/70">Information collected automatically</h3>
          <ul className="space-y-2 pl-4">
            {[
              'Log data: IP address, browser type, pages visited, time spent, referring URLs',
              'Cookies and similar tracking technologies (see Section 5)',
              'Usage patterns: search queries, peptide profiles viewed, features accessed',
              'Device information: operating system, screen resolution, language settings',
            ].map((item) => (
              <li key={item} className="flex gap-2 text-[14px] leading-[1.7] text-black/60">
                <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/20" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 2 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">2. How We Use Your Information</h2>
          <ul className="space-y-2 pl-4">
            {[
              'To provide and maintain your account and membership access',
              'To send transactional emails (password resets, subscription confirmations)',
              'To send research updates and newsletters (only if you opted in)',
              'To improve the Site, personalize content, and analyze usage patterns',
              'To detect, prevent, and address technical issues or abuse',
              'To comply with legal obligations',
            ].map((item) => (
              <li key={item} className="flex gap-2 text-[14px] leading-[1.7] text-black/60">
                <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/20" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] leading-[1.75] text-black/60">
            We do not sell your personal information to third parties.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">3. Information Sharing</h2>
          <p className="mb-3 text-[15px] leading-[1.75] text-black/60">
            We may share your information with:
          </p>
          <ul className="space-y-3 pl-4">
            {[
              {
                title: 'Service providers',
                body: 'Third-party vendors who assist us in operating the Site — including Supabase (database hosting), Vercel (infrastructure), and Stripe (payment processing). These providers are contractually bound to protect your data.',
              },
              {
                title: 'Affiliate partners (limited)',
                body: 'When you click an affiliate link, the Partner\'s website will receive standard referral data (e.g., referring URL). We do not share your personal account data with Partners.',
              },
              {
                title: 'Legal requirements',
                body: 'When required by law, court order, or governmental authority, or to protect the rights, property, or safety of Peptide Wiki, our users, or the public.',
              },
              {
                title: 'Business transfers',
                body: 'In connection with a merger, acquisition, or sale of all or a portion of our assets, your data may be transferred as part of that transaction.',
              },
            ].map((item) => (
              <li key={item.title} className="pl-0">
                <p className="text-[14px] leading-[1.7] text-black/60">
                  <span className="font-medium text-black/70">{item.title}: </span>
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">4. Data Retention</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            We retain your account information for as long as your account is active or as needed
            to provide services. If you delete your account, we will delete or anonymize your
            personal data within 30 days, except where retention is required by law or for
            legitimate business purposes (e.g., transaction records).
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            Email subscriber records are retained until you unsubscribe. Click events and
            analytics data may be retained in aggregated, anonymized form indefinitely.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">5. Cookies and Tracking</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            We use the following types of cookies and local storage:
          </p>
          <ul className="mt-3 space-y-3 pl-4">
            {[
              {
                title: 'Authentication cookie',
                body: 'An HTTP-only, secure session token (payload-token) that keeps you logged in. Required for account functionality.',
              },
              {
                title: 'Local storage',
                body: 'We store your recently viewed peptide history (pw_recently_viewed) in your browser\'s local storage for the Research Activity dashboard. This data never leaves your device.',
              },
              {
                title: 'Analytics',
                body: 'We may use privacy-respecting analytics tools to understand aggregate traffic patterns. We do not use Google Analytics or similar services that build cross-site tracking profiles.',
              },
            ].map((item) => (
              <li key={item.title} className="pl-0">
                <p className="text-[14px] leading-[1.7] text-black/60">
                  <span className="font-medium text-black/70">{item.title}: </span>
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 6 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">6. Your Rights</h2>
          <p className="mb-3 text-[15px] leading-[1.75] text-black/60">
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <ul className="space-y-2 pl-4">
            {[
              'Access: request a copy of the personal data we hold about you',
              'Correction: request correction of inaccurate or incomplete data',
              'Deletion: request deletion of your personal data ("right to be forgotten")',
              'Portability: request your data in a machine-readable format',
              'Objection: object to certain processing activities',
              'Withdrawal of consent: withdraw consent for email marketing at any time',
            ].map((item) => (
              <li key={item} className="flex gap-2 text-[14px] leading-[1.7] text-black/60">
                <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/20" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] leading-[1.75] text-black/60">
            To exercise these rights, contact us via your dashboard or email. We will respond
            within 30 days.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">7. Children&apos;s Privacy</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            The Site is not directed to individuals under the age of 18. We do not knowingly
            collect personal information from minors. If you believe a minor has provided us with
            personal information, please contact us immediately and we will delete that information.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">8. Security</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            We implement industry-standard security measures to protect your personal information,
            including encrypted connections (TLS/HTTPS), HTTP-only authentication cookies, and
            hashed password storage. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">9. Changes to This Policy</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            We may update this Privacy Policy periodically. We will notify registered users of
            material changes via email. Your continued use of the Site after changes constitutes
            your acceptance of the updated policy.
          </p>
        </section>

        {/* Contact box */}
        <section className="rounded-comfortable border bg-black/[0.02] p-6" style={{ borderColor: 'var(--border-light)' }}>
          <h2 className="mb-2 text-[16px] font-medium tracking-tight text-black">Contact</h2>
          <p className="text-[14px] leading-[1.75] text-black/60">
            For privacy inquiries, data requests, or to exercise your rights, contact us through
            the{' '}
            <Link href="/dashboard" className="text-black underline underline-offset-2 hover:text-black/70">
              dashboard
            </Link>{' '}
            or by email.
          </p>
        </section>

        {/* Legal nav */}
        <div className="flex gap-6 border-t pt-8" style={{ borderColor: 'var(--border-light)' }}>
          <Link href="/terms" className="text-[13px] text-black/40 underline underline-offset-2 hover:text-black/70">
            Terms of Service
          </Link>
          <Link href="/disclaimer" className="text-[13px] text-black/40 underline underline-offset-2 hover:text-black/70">
            Research Disclaimer
          </Link>
        </div>
      </div>
    </div>
  )
}
