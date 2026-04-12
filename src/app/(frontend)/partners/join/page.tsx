import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'List Your Peptide Brand | Partner Program',
  description:
    'Join the Peptide United partner program. Reach qualified researchers, practitioners, and biohackers actively seeking verified peptide suppliers.',
}

const BENEFITS = [
  {
    icon: '◎',
    title: 'Reach qualified buyers',
    body: 'Our audience consists of researchers, practitioners, and biohackers who already understand peptides. No education required — they arrive ready to purchase.',
  },
  {
    icon: '✓',
    title: 'COA-verified badge',
    body: 'Partners who provide Certificates of Analysis for every product earn a verified trust badge displayed prominently on their listing.',
  },
  {
    icon: '↗',
    title: 'Direct product links',
    body: 'Affiliate links are tracked per-peptide, not sitewide. You get granular data on which compounds drive conversions.',
  },
]

const INCLUDED = [
  'Listed in the verified partner directory',
  'Affiliate links tracked per peptide',
  'COA-verified badge (if applicable)',
  'Analytics dashboard — clicks and conversions',
]

const FAQS = [
  {
    q: 'How long does vetting take?',
    a: 'Our team reviews applications within 5 business days. We manually verify your website, product pages, and COA documentation before making a decision.',
  },
  {
    q: 'What gets you rejected?',
    a: 'Missing COAs, unlicensed health claims, unprofessional storefronts, or products outside the scope of legitimate peptide research. We hold a high bar intentionally.',
  },
  {
    q: 'Can I list multiple brands?',
    a: 'Yes — submit a separate application for each brand. Each brand gets its own listing, slug, and affiliate link tracking.',
  },
  {
    q: 'Is there a refund if rejected?',
    a: 'The $99 application fee covers vetting time and is non-refundable. If you are rejected, you may reapply after 90 days with updated documentation.',
  },
]

export default function PartnersJoinPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="gradient-pastel py-20">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <p className="mono-label mb-4 text-black/40">Partner program</p>
          <h1 className="text-[40px] font-medium leading-[1.05] tracking-display text-black sm:text-[56px]">
            List Your Peptide Brand on{' '}
            <span className="text-gradient">Peptide United</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.6] text-black/55">
            Peptide United serves researchers, practitioners, and biohackers who come here specifically to understand and source research-grade peptides. Put your brand in front of an audience that is already educated and ready to buy.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/partners/apply" className="btn-dark">
              Apply Now →
            </Link>
            <a href="#pricing" className="btn-glass">
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* ── Benefits grid ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <p className="mono-label mb-3 text-center text-black/30">Why list with us</p>
        <h2 className="mb-12 text-center text-[28px] font-medium tracking-heading text-black">
          Built for serious suppliers
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="card-light flex flex-col gap-3 p-7">
              <span className="font-mono text-[22px] text-lavender">{b.icon}</span>
              <h3 className="text-[17px] font-medium tracking-subheading text-black">{b.title}</h3>
              <p className="text-[14px] leading-[1.6] text-black/55">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Standards section ─────────────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <p className="mono-label mb-4 text-white/30">Our standards</p>
          <h2 className="text-[32px] font-medium tracking-heading text-white">
            We vet every application.
            <br />
            Not every provider makes the cut.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-[1.65] text-white/50">
            To be listed on Peptide United, you must carry Certificates of Analysis for every product, maintain a professional storefront, and supply compounds that are appropriate for legitimate research applications. We do not list vendors who make unsupported health claims or operate in legal gray areas.
          </p>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {['Certificates of Analysis required', 'Professional, compliant website', 'Research-grade compounds only'].map((req) => (
              <div
                key={req}
                className="rounded-sharp border px-5 py-4"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span className="font-mono text-[11px] tracking-mono text-lavender">✓</span>
                <p className="mt-2 text-[13px] leading-[1.5] text-white/60">{req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────── */}
      <section id="pricing" className="mx-auto max-w-[900px] px-6 py-20">
        <p className="mono-label mb-3 text-center text-black/30">Pricing</p>
        <h2 className="mb-12 text-center text-[28px] font-medium tracking-heading text-black">
          Simple, transparent fees
        </h2>
        <div className="card-light mx-auto max-w-[500px] p-8">
          <div className="flex items-baseline gap-2">
            <span className="text-[42px] font-medium tracking-tight text-black">$99</span>
            <span className="text-[15px] text-black/40">one-time application + onboarding</span>
          </div>
          <p className="mt-1 text-[14px] text-black/40">
            Then{' '}
            <span className="font-medium text-black">$19/month</span> to maintain an active listing
          </p>

          <div className="my-6 h-px bg-black/[0.06]" />

          <p className="mono-label mb-3 text-black/30">What's included</p>
          <ul className="flex flex-col gap-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[14px] text-black/65">
                <span className="mt-0.5 font-mono text-lavender">→</span>
                {item}
              </li>
            ))}
          </ul>

          <Link href="/partners/apply" className="btn-dark mt-8 w-full justify-center">
            Start your application →
          </Link>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-[780px] px-6">
          <p className="mono-label mb-3 text-center text-white/30">FAQ</p>
          <h2 className="mb-12 text-center text-[28px] font-medium tracking-heading text-white">
            Common questions
          </h2>
          <div className="flex flex-col gap-6">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-sharp border px-6 py-5"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <p className="text-[15px] font-medium tracking-subheading text-white">{faq.q}</p>
                <p className="mt-2 text-[14px] leading-[1.65] text-white/50">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────────── */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[700px] px-6 text-center">
          <h2 className="text-[30px] font-medium tracking-heading text-black">
            Ready to apply?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.6] text-black/55">
            Join the verified suppliers already reaching Peptide United's research-focused audience.
          </p>
          <Link href="/partners/apply" className="btn-dark mt-7">
            Apply now →
          </Link>
        </div>
      </section>
    </div>
  )
}
