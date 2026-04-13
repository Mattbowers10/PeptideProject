import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Partner Directory — Coming Soon | Peptide United',
  description:
    'The Peptide United partner directory is launching soon. Verified research-grade peptide suppliers will be listed here with full COA transparency.',
}

export default function PartnersPage() {
  return (
    <div className="bg-midnight min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-[900px] px-6 pt-28 pb-20 text-center">
        <span className="mb-5 inline-block rounded-sharp border px-3 py-1 font-mono text-[11px] tracking-mono text-lavender/60" style={{ borderColor: 'rgba(139,92,246,0.2)' }}>
          Coming soon
        </span>

        <h1 className="text-[40px] font-medium leading-[1.06] tracking-display text-white sm:text-[56px]">
          Partner Directory
        </h1>

        <p className="mx-auto mt-5 max-w-[480px] text-[16px] leading-[1.65] text-white/50">
          We're vetting and onboarding verified research-grade peptide suppliers.
          The directory will go live once our first cohort of partners has been reviewed and approved.
        </p>

        {/* What to expect */}
        <div className="mx-auto mt-14 max-w-[600px] grid gap-3 text-left sm:grid-cols-3">
          {[
            { icon: '✓', label: 'COA verified', desc: 'Every partner must provide third-party Certificates of Analysis.' },
            { icon: '◎', label: 'Tracked links', desc: 'Affiliate links are tracked per peptide, not sitewide.' },
            { icon: '↗', label: 'Research aligned', desc: 'Only suppliers of research-grade compounds make the cut.' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-sharp border p-5"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <p className="font-mono text-[18px] text-lavender">{item.icon}</p>
              <p className="mt-2 text-[13px] font-medium text-white">{item.label}</p>
              <p className="mt-1 text-[12px] leading-[1.55] text-white/40">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/peptides" className="btn-dark">
            Browse the research database →
          </Link>
          <Link href="/" className="btn-glass">
            Back to home
          </Link>
        </div>
      </section>

      {/* Footer note */}
      <div
        className="border-t py-8 text-center"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <p className="font-mono text-[11px] tracking-mono text-white/20">
          Interested in listing your brand?{' '}
          <a
            href="mailto:partners@peptideunited.com"
            className="text-white/40 underline underline-offset-2 transition-colors hover:text-white/60"
          >
            Get in touch early.
          </a>
        </p>
      </div>
    </div>
  )
}
