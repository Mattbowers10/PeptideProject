import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ResearchBadge } from '@/components/ResearchBadge'
import type { Peptide, Category } from '@/payload-types'

export const revalidate = 86400

// Pre-generate the top 30 high-value comparison pairs
const TOP_PAIRS = [
  ['bpc-157', 'tb-500'],
  ['ipamorelin', 'cjc-1295'],
  ['semaglutide', 'tirzepatide'],
  ['ipamorelin', 'sermorelin'],
  ['bpc-157', 'pentadeca-arginate'],
  ['epithalon', 'ghk-cu'],
  ['pt-141', 'kisspeptin'],
  ['cjc-1295', 'sermorelin'],
  ['tb-500', 'bpc-157'],
  ['selank', 'semax'],
  ['ipamorelin', 'ghrp-6'],
  ['ipamorelin', 'ghrp-2'],
  ['aod-9604', 'semaglutide'],
  ['hexarelin', 'ipamorelin'],
  ['thymosin-alpha-1', 'tb-500'],
  ['bpc-157', 'ghk-cu'],
  ['mots-c', 'ss-31'],
  ['cjc-1295', 'ghrp-6'],
  ['tesamorelin', 'sermorelin'],
  ['epithalon', 'bpc-157'],
]

export async function generateStaticParams() {
  return TOP_PAIRS.map(([a, b]) => ({ pair: `${a}-vs-${b}` }))
}

async function getPeptideBySlug(payload: Awaited<ReturnType<typeof getPayload>>, slug: string) {
  const { docs } = await payload.find({
    collection: 'peptides',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })
  return docs[0] as Peptide | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params
  const [slugA, slugB] = pair.split('-vs-')
  if (!slugA || !slugB) return { title: 'Peptide Comparison | Peptide United' }

  const payload = await getPayload({ config })
  const a = await getPeptideBySlug(payload, slugA)
  const b = await getPeptideBySlug(payload, slugB)

  const nameA = a?.name ?? slugA
  const nameB = b?.name ?? slugB

  return {
    title: `${nameA} vs ${nameB} — Research Comparison | Peptide United`,
    description: `Compare ${nameA} and ${nameB} side by side: research status, mechanism of action, pharmacokinetics, half-life, and administration routes.`,
    openGraph: {
      title: `${nameA} vs ${nameB} | Peptide United`,
      description: `Side-by-side comparison of ${nameA} and ${nameB} — mechanisms, pharmacokinetics, research status, and routes.`,
    },
    alternates: {
      canonical: `https://peptideunited.com/compare/${pair}`,
    },
  }
}

const ROUTE_LABELS: Record<string, string> = {
  subcutaneous: 'Subcutaneous (SQ)',
  intramuscular: 'Intramuscular (IM)',
  intravenous: 'Intravenous (IV)',
  oral: 'Oral',
  intranasal: 'Intranasal',
  transdermal: 'Transdermal',
  topical: 'Topical',
  sublingual: 'Sublingual',
}

const STATUS_LABELS: Record<string, string> = {
  approved: 'FDA Approved',
  human: 'Human Trials',
  preclinical: 'Preclinical Research',
  experimental: 'Experimental',
  discontinued: 'Discontinued',
}

function CompareCell({ value, label }: { value?: string | null; label: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-mono text-white/30 mb-1">{label}</p>
      <p className="text-[14px] tracking-tight text-white/80">{value ?? '—'}</p>
    </div>
  )
}

export default async function PairComparisonPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params
  const parts = pair.split('-vs-')
  if (parts.length !== 2) notFound()
  const [slugA, slugB] = parts

  const payload = await getPayload({ config })
  const peptideA = await getPeptideBySlug(payload, slugA)
  const peptideB = await getPeptideBySlug(payload, slugB)

  if (!peptideA || !peptideB) notFound()

  const base = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://peptideunited.com').replace(/\/$/, '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${peptideA.name} vs ${peptideB.name} Comparison`,
    description: `Research comparison of ${peptideA.name} and ${peptideB.name}: mechanisms, pharmacokinetics, status, and routes.`,
    url: `${base}/compare/${pair}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: `${base}/compare` },
        { '@type': 'ListItem', position: 3, name: `${peptideA.name} vs ${peptideB.name}`, item: `${base}/compare/${pair}` },
      ],
    },
  }

  const routesA = (peptideA.administrationRoutes ?? []).map(r => ROUTE_LABELS[r.route ?? ''] ?? r.route).filter(Boolean) as string[]
  const routesB = (peptideB.administrationRoutes ?? []).map(r => ROUTE_LABELS[r.route ?? ''] ?? r.route).filter(Boolean) as string[]
  const catA = (peptideA.categories ?? []).filter((c): c is Category => typeof c === 'object').map(c => c.name).join(', ')
  const catB = (peptideB.categories ?? []).filter((c): c is Category => typeof c === 'object').map(c => c.name).join(', ')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-midnight min-h-screen">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1200px] px-6 pt-8">
          <nav className="flex items-center gap-2 text-[13px]">
            <Link href="/" className="text-white/30 hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/compare" className="text-white/30 hover:text-white transition-colors">Compare</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60">{peptideA.name} vs {peptideB.name}</span>
          </nav>
        </div>

        {/* Header */}
        <header className="mx-auto max-w-[1200px] px-6 pt-10 pb-8">
          <p className="mono-label mb-3 text-white/30">Research comparison</p>
          <h1 className="text-[36px] font-medium leading-[1.08] tracking-display text-white sm:text-[48px]">
            {peptideA.name} <span className="text-white/25">vs</span> {peptideB.name}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-white/50">
            Side-by-side comparison of research status, mechanisms, pharmacokinetics, and administration routes.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/peptides/${peptideA.slug}`} className="btn-glass text-[13px]">{peptideA.name} profile →</Link>
            <Link href={`/peptides/${peptideB.slug}`} className="btn-glass text-[13px]">{peptideB.name} profile →</Link>
            <Link href={`/compare?a=${slugA}&b=${slugB}`} className="btn-dark text-[13px]">Open in compare tool →</Link>
          </div>
        </header>

        {/* Comparison table */}
        <div className="mx-auto max-w-[1200px] px-6 pb-16">
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              { peptide: peptideA, routes: routesA, cats: catA },
              { peptide: peptideB, routes: routesB, cats: catB },
            ].map(({ peptide, routes, cats }) => (
              <div key={peptide.id} className="card-dark p-6 space-y-5">
                <div>
                  <Link href={`/peptides/${peptide.slug}`} className="text-[22px] font-medium tracking-heading text-white hover:text-lavender transition-colors">
                    {peptide.name}
                  </Link>
                  {peptide.aliases && peptide.aliases.length > 0 && (
                    <p className="mt-1 font-mono text-[11px] tracking-mono text-white/30">
                      {peptide.aliases.map(a => a.alias).filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <div className="mt-2">
                    <ResearchBadge status={peptide.researchStatus} variant="dark" />
                  </div>
                </div>

                {peptide.summary && (
                  <p className="text-[14px] leading-[1.65] text-white/60">{peptide.summary}</p>
                )}

                <div className="grid gap-4 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <CompareCell label="Research Status" value={STATUS_LABELS[peptide.researchStatus ?? ''] ?? peptide.researchStatus} />
                  <CompareCell label="Half-Life" value={peptide.halfLife} />
                  <CompareCell label="Molecular Formula" value={peptide.molecularFormula} />
                  <CompareCell label="Molecular Weight" value={peptide.molecularWeight} />
                  <CompareCell label="CAS Number" value={peptide.casNumber} />
                  {cats && <CompareCell label="Research Categories" value={cats} />}
                  {routes.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] tracking-mono text-white/30 mb-1">Routes of Administration</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {routes.map(r => (
                          <span key={r} className="badge-dark text-[11px]">{r}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade gate for mechanism comparison */}
          <div className="mt-6 card-dark border-lavender/20 p-6 text-center">
            <p className="mono-label mb-2 text-lavender/60">Full mechanism comparison</p>
            <p className="text-[14px] text-white/50 mb-4">
              Mechanism of action, pharmacokinetics, and research findings comparison available on the Researcher plan.
            </p>
            <Link href="/upgrade?highlight=researcher" className="btn-dark text-[13px]">
              Unlock full comparison →
            </Link>
          </div>

          {/* Related comparisons */}
          <div className="mt-8">
            <p className="mono-label mb-4 text-white/30">Related comparisons</p>
            <div className="flex flex-wrap gap-2">
              {TOP_PAIRS
                .filter(([a, b]) => (a === slugA || b === slugA || a === slugB || b === slugB) && `${a}-vs-${b}` !== pair)
                .slice(0, 6)
                .map(([a, b]) => (
                  <Link
                    key={`${a}-vs-${b}`}
                    href={`/compare/${a}-vs-${b}`}
                    className="btn-glass text-[12px]"
                  >
                    {a.replace(/-/g, ' ')} vs {b.replace(/-/g, ' ')} →
                  </Link>
                ))
              }
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <Link href="/compare" className="text-[13px] text-white/40 hover:text-white transition-colors">← Compare tool</Link>
            <Link href="/peptides" className="text-[13px] text-white/40 hover:text-white transition-colors">Browse all peptides →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
