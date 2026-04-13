import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CompareTable } from '@/components/compare/CompareTable'
import type { Peptide } from '@/payload-types'

export const revalidate = 3600

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

function parsePair(pair: string): [string, string] | null {
  const idx = pair.indexOf('-vs-')
  if (idx === -1) return null
  return [pair.slice(0, idx), pair.slice(idx + 4)]
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params
  const parsed = parsePair(pair)
  if (!parsed) return { title: 'Peptide Comparison' }
  const [slugA, slugB] = parsed

  const payload = await getPayload({ config })
  const a = await getPeptideBySlug(payload, slugA)
  const b = await getPeptideBySlug(payload, slugB)

  const nameA = a?.name ?? slugA
  const nameB = b?.name ?? slugB

  return {
    title: { absolute: `${nameA} vs ${nameB} — Research Comparison | Peptide United` },
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


export default async function PairComparisonPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params
  const parsed = parsePair(pair)
  if (!parsed) notFound()
  const [slugA, slugB] = parsed

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
          <CompareTable peptideA={peptideA} peptideB={peptideB} />

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
