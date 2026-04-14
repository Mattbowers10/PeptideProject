import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Peptide, Category } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: { absolute: 'FDA Regulatory Status Tracker | Peptide United' },
  description:
    'Track the FDA and regulatory research status of peptide compounds — from preclinical studies through approved drugs. For research use only.',
}

// ── Status config ─────────────────────────────────────────────────────

type ResearchStatus = 'approved' | 'phase3' | 'phase2' | 'phase1' | 'preclinical' | 'discontinued'

const STATUS_CONFIG: Record<
  ResearchStatus,
  { label: string; badgeBg: string; badgeText: string; sectionBorder: string; dot: string }
> = {
  approved: {
    label: 'FDA Approved',
    badgeBg: 'rgba(16,185,129,0.12)',
    badgeText: '#059669',
    sectionBorder: 'rgba(16,185,129,0.25)',
    dot: '#10b981',
  },
  phase3: {
    label: 'Phase III Trial',
    badgeBg: 'rgba(59,130,246,0.12)',
    badgeText: '#2563eb',
    sectionBorder: 'rgba(59,130,246,0.25)',
    dot: '#3b82f6',
  },
  phase2: {
    label: 'Phase II Trial',
    badgeBg: 'rgba(99,155,255,0.10)',
    badgeText: '#4f86f7',
    sectionBorder: 'rgba(99,155,255,0.20)',
    dot: '#60a5fa',
  },
  phase1: {
    label: 'Phase I Trial',
    badgeBg: 'rgba(139,92,246,0.12)',
    badgeText: '#7c3aed',
    sectionBorder: 'rgba(139,92,246,0.20)',
    dot: '#8b5cf6',
  },
  preclinical: {
    label: 'Preclinical Research',
    badgeBg: 'rgba(245,158,11,0.12)',
    badgeText: '#d97706',
    sectionBorder: 'rgba(245,158,11,0.20)',
    dot: '#f59e0b',
  },
  discontinued: {
    label: 'Discontinued / Withdrawn',
    badgeBg: 'rgba(107,114,128,0.12)',
    badgeText: '#6b7280',
    sectionBorder: 'rgba(107,114,128,0.20)',
    dot: '#9ca3af',
  },
}

const STATUS_ORDER: ResearchStatus[] = [
  'approved',
  'phase3',
  'phase2',
  'phase1',
  'preclinical',
  'discontinued',
]

// ── Data ──────────────────────────────────────────────────────────────

type PeptideRow = Pick<
  Peptide,
  'id' | 'name' | 'slug' | 'researchStatus' | 'legalStatus' | 'lastPubmedSync'
> & {
  categories?: (number | Category)[] | null
}

async function getPeptides(): Promise<PeptideRow[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'peptides',
    limit: 1000,
    depth: 1,
    sort: 'name',
    select: {
      name: true,
      slug: true,
      researchStatus: true,
      legalStatus: true,
      categories: true,
      lastPubmedSync: true,
    },
  })
  return result.docs as PeptideRow[]
}

// ── Page ─────────────────────────────────────────────────────────────

export default async function FdaTrackerPage() {
  const peptides = await getPeptides()

  // Group by status
  const groups: Record<ResearchStatus, PeptideRow[]> = {
    approved: [],
    phase3: [],
    phase2: [],
    phase1: [],
    preclinical: [],
    discontinued: [],
  }

  for (const p of peptides) {
    const status = p.researchStatus as ResearchStatus
    if (groups[status]) {
      groups[status].push(p)
    }
  }

  const counts = Object.fromEntries(
    STATUS_ORDER.map((s) => [s, groups[s].length]),
  ) as Record<ResearchStatus, number>

  const totalCount = peptides.length

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Peptide FDA Regulatory Status Classifications',
    description:
      'A defined set of regulatory status categories for peptide research compounds, as tracked by Peptide United.',
    hasDefinedTerm: STATUS_ORDER.map((s) => ({
      '@type': 'DefinedTerm',
      name: STATUS_CONFIG[s].label,
      termCode: s,
      description: getStatusDescription(s),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-midnight py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-3 text-white/30">Regulatory Reference</p>
          <h1 className="text-[36px] font-medium leading-[1.05] tracking-display text-white sm:text-[48px]">
            FDA &amp; Regulatory<br className="hidden sm:block" /> Status Tracker
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-white/45">
            A reference index of {totalCount} peptide compounds organized by their current research
            and regulatory status. All compounds listed are for research purposes only and are not
            intended for human use. This tracker does not constitute medical or legal advice.
          </p>

          {/* Stat bar */}
          <div
            className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t pt-8"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {STATUS_ORDER.map((s) => {
              const cfg = STATUS_CONFIG[s]
              return (
                <a
                  key={s}
                  href={`#${s}`}
                  className="group flex flex-col transition-opacity hover:opacity-80"
                >
                  <span className="text-[32px] font-medium leading-none tracking-display text-white">
                    {counts[s]}
                  </span>
                  <span
                    className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                    style={{ color: cfg.dot }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: cfg.dot }}
                    />
                    {cfg.label}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Sticky filter/anchor bar ──────────────────────────────── */}
      <div
        className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur-sm"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div className="mx-auto max-w-[1200px] overflow-x-auto px-6">
          <div className="flex gap-1 py-2">
            {STATUS_ORDER.map((s) => {
              const cfg = STATUS_CONFIG[s]
              return (
                <a
                  key={s}
                  href={`#${s}`}
                  className="flex shrink-0 items-center gap-1.5 rounded-sharp px-3 py-1.5 text-[12px] font-medium tracking-tight text-black/50 transition-colors hover:bg-black/[0.04] hover:text-black"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: cfg.dot }}
                  />
                  {cfg.label}
                  <span className="ml-0.5 font-mono text-[10px] text-black/30">
                    ({counts[s]})
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="space-y-16">
          {STATUS_ORDER.map((status) => {
            const cfg = STATUS_CONFIG[status]
            const rows = groups[status]

            return (
              <section key={status} id={status}>
                {/* Section header */}
                <div
                  className="mb-6 flex items-center justify-between border-b pb-4"
                  style={{ borderColor: cfg.sectionBorder }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ background: cfg.dot }}
                    />
                    <h2 className="text-[22px] font-medium tracking-heading text-black">
                      {cfg.label}
                    </h2>
                  </div>
                  <span className="mono-label text-black/30">{rows.length} compounds</span>
                </div>

                {/* Status description */}
                <p className="mb-6 max-w-2xl text-[14px] leading-[1.6] text-black/45">
                  {getStatusDescription(status)}
                </p>

                {rows.length === 0 ? (
                  <div
                    className="rounded-comfortable border px-6 py-8 text-center"
                    style={{ borderColor: 'var(--border-light)' }}
                  >
                    <p className="text-[14px] text-black/35">
                      No compounds currently tracked in this category.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-comfortable border" style={{ borderColor: 'var(--border-light)' }}>
                    {rows.map((peptide, idx) => {
                      const cats = (peptide.categories ?? []).filter(
                        (c): c is Category => typeof c === 'object',
                      )
                      const lastSync = peptide.lastPubmedSync
                        ? new Date(peptide.lastPubmedSync).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : null

                      return (
                        <div
                          key={peptide.id}
                          className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
                            idx !== rows.length - 1
                              ? 'border-b'
                              : ''
                          } bg-white transition-colors hover:bg-stone-50`}
                          style={idx !== rows.length - 1 ? { borderColor: 'var(--border-light)' } : undefined}
                        >
                          {/* Left: name + categories */}
                          <div className="flex flex-wrap items-center gap-3">
                            <Link
                              href={`/peptides/${peptide.slug}`}
                              className="text-[14px] font-medium tracking-tight text-black transition-colors hover:text-lavender"
                            >
                              {peptide.name}
                            </Link>
                            {cats.map((cat) => (
                              <span
                                key={cat.id}
                                className="rounded px-2 py-0.5 font-mono text-[10px] text-black/50"
                                style={{ background: 'rgba(30,21,17,0.06)', border: '1px solid var(--border-light)' }}
                              >
                                {cat.icon && <span className="mr-1">{cat.icon}</span>}
                                {cat.name}
                              </span>
                            ))}
                          </div>

                          {/* Right: status badge + last updated */}
                          <div className="flex shrink-0 flex-wrap items-center gap-3">
                            {lastSync && (
                              <span className="font-mono text-[10px] text-black/30">
                                Updated {lastSync}
                              </span>
                            )}
                            <span
                              className="rounded-sharp px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em]"
                              style={{ background: cfg.badgeBg, color: cfg.badgeText }}
                            >
                              {cfg.label}
                            </span>
                            <Link
                              href={`/peptides/${peptide.slug}`}
                              className="font-mono text-[11px] text-black/30 underline-offset-2 transition-colors hover:text-black hover:underline"
                            >
                              Profile →
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>

      {/* ── Disclaimer footer ─────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <div
            className="rounded-comfortable border bg-amber-50 px-6 py-6"
            style={{ borderColor: 'rgba(245,158,11,0.20)' }}
          >
            <p className="mono-label mb-2 text-amber-700/70">Research Use Only</p>
            <p className="text-[13px] leading-[1.65] text-amber-900/70">
              All regulatory status information on this page is provided for research and
              informational purposes only. This tracker does not constitute medical, legal, or
              regulatory advice. Regulatory status may change; always verify current status with
              official sources including the{' '}
              <a
                href="https://www.fda.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                U.S. Food and Drug Administration
              </a>{' '}
              and relevant national regulatory bodies. The compounds listed are not approved for
              human therapeutic use unless explicitly noted as FDA Approved. Do not use any
              information on this page to make personal health decisions.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/disclaimer" className="font-mono text-[11px] text-amber-800/60 underline underline-offset-2 hover:text-amber-900">
                Full Disclaimer
              </Link>
              <Link href="/peptides" className="font-mono text-[11px] text-amber-800/60 underline underline-offset-2 hover:text-amber-900">
                Browse All Compounds →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── Status descriptions ───────────────────────────────────────────────

function getStatusDescription(status: ResearchStatus): string {
  switch (status) {
    case 'approved':
      return 'These compounds have received FDA approval for specific human therapeutic indications. Approved status applies to the specific drug formulation and indication — not to general peptide research use.'
    case 'phase3':
      return 'Phase III trials involve large-scale human studies comparing the compound against existing treatments or placebo. Positive results from Phase III typically precede FDA submission for approval.'
    case 'phase2':
      return 'Phase II trials evaluate efficacy and side effects in a larger group of participants. These studies begin to establish optimal dosing and identify adverse effects.'
    case 'phase1':
      return 'Phase I trials are early-stage human safety studies, typically involving a small number of healthy volunteers. The primary goal is to assess safety and tolerability in humans.'
    case 'preclinical':
      return 'Preclinical compounds are being studied in cell cultures or animal models. No human clinical trials have been initiated. These compounds are strictly for laboratory research use.'
    case 'discontinued':
      return 'These compounds had clinical development programs that were halted or withdrawn. Reasons include safety findings, lack of efficacy, or commercial decisions. Some may still have active research interest.'
  }
}
