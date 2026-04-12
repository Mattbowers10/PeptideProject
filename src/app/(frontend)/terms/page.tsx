import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Peptide United — conditions governing use of our research database and platform.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mono-label mb-2 text-black/30">Legal</p>
        <h1 className="text-[36px] font-medium tracking-heading text-black">Terms of Service</h1>
        <p className="mt-3 text-[14px] text-black/40">Last updated: April 9, 2026</p>
      </div>

      <div className="prose-legal space-y-10">

        {/* 1 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">1. Acceptance of Terms</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            By accessing or using Peptide United (&ldquo;the Site,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;), you agree to be bound by
            these Terms of Service and all applicable laws and regulations. If you do not agree with
            any of these terms, you are prohibited from using the Site. These terms apply to all
            visitors, users, and members.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">2. Research and Educational Use Only</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            All content on Peptide United is provided strictly for research and educational purposes.
            Nothing on this Site constitutes medical advice, diagnosis, or treatment recommendations.
            You must not use any information from this Site to make decisions about your health or
            the health of others. Always consult a qualified healthcare professional before
            considering any peptide compound or research chemical.
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            The compounds described on this Site may be restricted, controlled, or prohibited in
            certain jurisdictions. It is your sole responsibility to understand and comply with the
            laws and regulations applicable in your location.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">3. Membership Accounts</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            To access certain features (including Researcher and Pro tier content), you must create
            an account. You are responsible for maintaining the confidentiality of your login
            credentials and for all activity that occurs under your account. You must provide
            accurate, current, and complete information during registration and keep it updated.
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            We reserve the right to suspend or terminate accounts that violate these terms, engage
            in fraudulent activity, or are used for any purpose inconsistent with the research and
            educational mission of the Site.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">4. Affiliate Relationships and Disclosures</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            Peptide United participates in affiliate programs with certain research chemical suppliers
            (&ldquo;Partners&rdquo;). When you click on a Partner link, we may receive a commission if you
            make a purchase. Partner links are clearly disclosed throughout the Site. Our editorial
            content and research summaries are not influenced by these affiliate relationships;
            Partners do not pay for favorable coverage.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">5. Intellectual Property</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            All content on this Site — including text, research summaries, data compilations,
            graphics, and software — is the property of Peptide United or its content providers and
            is protected by applicable intellectual property laws. You may not reproduce, distribute,
            modify, or create derivative works from any content without our express written permission.
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            References to scientific studies and publications are provided for citation purposes.
            Original studies are the property of their respective authors and publishers.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">6. Disclaimer of Warranties</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranty
            of any kind, express or implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose, or non-infringement. We do not
            warrant that the Site will be error-free, uninterrupted, or free of viruses or other
            harmful components.
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            Research information may be incomplete, out of date, or subject to ongoing scientific
            debate. We make no representations regarding the accuracy, completeness, or reliability
            of any scientific information presented.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">7. Limitation of Liability</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            To the maximum extent permitted by applicable law, Peptide United and its operators,
            employees, and affiliates shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages — including but not limited to loss of profits, data,
            goodwill, or other intangible losses — arising out of your use of or inability to use
            the Site or its content.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">8. Third-Party Links</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            The Site contains links to third-party websites, including Partner vendor sites and
            scientific publications. These links are provided for convenience only. We have no
            control over and assume no responsibility for the content, privacy policies, or practices
            of any third-party site. Accessing third-party sites is at your own risk.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">9. Changes to Terms</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            We reserve the right to modify these Terms of Service at any time. Changes will be
            posted on this page with an updated &ldquo;Last updated&rdquo; date. Your continued use of the
            Site after any changes constitutes your acceptance of the revised terms.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">10. Governing Law</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            These Terms of Service shall be governed by and construed in accordance with applicable
            laws. Any disputes arising from these terms or your use of the Site shall be subject to
            the exclusive jurisdiction of the courts in the applicable venue.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-comfortable border bg-black/[0.02] p-6" style={{ borderColor: 'var(--border-light)' }}>
          <h2 className="mb-2 text-[16px] font-medium tracking-tight text-black">Contact</h2>
          <p className="text-[14px] leading-[1.75] text-black/60">
            For questions about these Terms, please contact us through the{' '}
            <Link href="/dashboard" className="text-black underline underline-offset-2 hover:text-black/70">
              dashboard
            </Link>{' '}
            or reach out via email.
          </p>
        </section>

        {/* Legal nav */}
        <div className="flex gap-6 border-t pt-8" style={{ borderColor: 'var(--border-light)' }}>
          <Link href="/privacy" className="text-[13px] text-black/40 underline underline-offset-2 hover:text-black/70">
            Privacy Policy
          </Link>
          <Link href="/disclaimer" className="text-[13px] text-black/40 underline underline-offset-2 hover:text-black/70">
            Research Disclaimer
          </Link>
        </div>
      </div>
    </div>
  )
}
