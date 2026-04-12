import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ResearchBadge } from '@/components/ResearchBadge'
import { PrintButton } from '@/components/PrintButton'
import type { Peptide } from '@/payload-types'

export const revalidate = 86400

export const metadata: Metadata = {
  title: '10 Most Researched Peptides — Free Research Guide | Peptide United',
  description:
    'A curated research guide covering the 10 most studied peptides — mechanisms, research status, and where to learn more.',
}

const GUIDE_SLUGS = [
  'bpc-157',
  'tb-500',
  'semaglutide',
  'ipamorelin',
  'cjc-1295',
  'epithalon',
  'pt-141',
  'ghk-cu',
  'ss-31',
  'mots-c',
]

export default async function GuidePage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'peptides',
    where: { slug: { in: GUIDE_SLUGS } },
    limit: 20,
    depth: 0,
    overrideAccess: true,
  })

  // Sort results to match the intended guide order
  const peptideMap = new Map((docs as Peptide[]).map((p) => [p.slug, p]))
  const peptides = GUIDE_SLUGS.map((slug) => peptideMap.get(slug)).filter(
    (p): p is Peptide => p !== undefined,
  )

  return (
    <>
      {/* ── Dark hero ──────────────────────────────────────────── */}
      <section className="bg-midnight py-16 print:hidden">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mono-label mb-3 text-white/30">Free research guide</p>
              <h1 className="text-[40px] font-medium leading-[1.05] tracking-display text-white sm:text-[52px]">
                10 Most Researched
                <br />
                <span className="text-lavender">Peptides</span>
              </h1>
              <p className="mt-4 max-w-xl text-[16px] leading-[1.6] text-white/55">
                A curated reference covering the ten peptides with the deepest body of
                preclinical and clinical research. Use this guide as a starting point
                for your own literature review.
              </p>
            </div>
            <div className="mt-2 shrink-0">
              <PrintButton />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-[13px] text-white/40">
            <span>10 peptide profiles</span>
            <span>·</span>
            <span>Research status included</span>
            <span>·</span>
            <span>Links to full profiles</span>
          </div>
        </div>
      </section>

      {/* ── Print-only header ──────────────────────────────────── */}
      <div className="hidden print:block px-6 pt-8 pb-4 border-b border-black/10">
        <p className="text-[11px] uppercase tracking-[0.12em] text-black/40 mb-1">Peptide United · Free Research Guide</p>
        <h1 className="text-[28px] font-medium text-black">10 Most Researched Peptides</h1>
        <p className="text-[13px] text-black/50 mt-1">peptideunited.com/guide</p>
      </div>

      {/* ── Guide content ──────────────────────────────────────── */}
      <div className="mx-auto max-w-[900px] px-6 py-12">
        {peptides.length === 0 ? (
          <p className="text-black/40 text-[15px]">Guide content coming soon. Check back shortly.</p>
        ) : (
          <div className="space-y-6">
            {peptides.map((peptide, index) => (
              <article
                key={peptide.id}
                className="rounded-comfortable border bg-white p-6 shadow-sm"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="shrink-0 font-mono text-[13px] text-black/25"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-[22px] font-medium tracking-heading text-black">
                      {peptide.name}
                    </h2>
                  </div>
                  {peptide.researchStatus && (
                    <div className="mt-1 shrink-0">
                      <ResearchBadge status={peptide.researchStatus} variant="light" />
                    </div>
                  )}
                </div>

                {peptide.summary && (
                  <p className="mt-3 text-[15px] leading-[1.65] text-black/65 pl-9">
                    {peptide.summary}
                  </p>
                )}

                <div className="mt-4 pl-9">
                  <Link
                    href={`/peptides/${peptide.slug}`}
                    className="text-[13px] font-medium text-lavender underline-offset-2 hover:underline print:hidden"
                  >
                    Full profile →
                  </Link>
                  <span className="hidden print:inline text-[11px] text-black/40">
                    peptideunited.com/peptides/{peptide.slug}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── Disclaimer ─────────────────────────────────────────── */}
        <p className="mt-10 rounded-comfortable border bg-black/[0.02] px-5 py-4 text-[12px] leading-[1.6] text-black/40"
          style={{ borderColor: 'var(--border-light)' }}
        >
          <strong className="font-medium text-black/50">Research use only.</strong> All information
          in this guide is for educational purposes and references preclinical and clinical
          literature. It is not medical advice and should not be used for self-treatment or
          self-diagnosis.
        </p>
      </div>

      {/* ── Upgrade CTA strip ──────────────────────────────────── */}
      <section className="border-t bg-midnight py-14 print:hidden" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <p className="mono-label mb-3 text-white/30">Go deeper</p>
          <h2 className="text-[26px] font-medium tracking-heading text-white">
            Unlock full mechanism profiles, pharmacokinetics,
            <br className="hidden sm:block" /> and 100+ more peptides.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-[1.6] text-white/50">
            The Researcher plan gives you complete access — mechanism of action,
            pharmacokinetics, PubMed-linked studies, and evidence ratings for every
            profile in the wiki.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/upgrade" className="btn-dark">
              See Researcher plan →
            </Link>
            <Link href="/peptides" className="btn-glass">
              Browse all peptides
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
