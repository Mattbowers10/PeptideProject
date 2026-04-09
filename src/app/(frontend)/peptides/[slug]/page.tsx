import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ResearchBadge } from '@/components/ResearchBadge'
import { RecordViewClient } from '@/components/RecordViewClient'
import { RecentlyViewed } from '@/components/RecentlyViewed'
import type { Category, Peptide } from '@/payload-types'

export const revalidate = 3600

async function getPeptide(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'peptides',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return result.docs[0] as Peptide | undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const peptide = await getPeptide(slug)
  if (!peptide) return { title: 'Peptide Not Found' }

  return {
    title: `${peptide.name} | Peptide Wiki`,
    description: peptide.summary,
    openGraph: {
      title: `${peptide.name} — Peptide Research Profile`,
      description: peptide.summary,
    },
  }
}

const ROUTE_LABELS: Record<string, string> = {
  subcutaneous: 'Subcutaneous',
  intramuscular: 'Intramuscular',
  intravenous: 'Intravenous',
  oral: 'Oral',
  intranasal: 'Intranasal',
  transdermal: 'Transdermal',
  topical: 'Topical',
  sublingual: 'Sublingual',
  intracerebroventricular: 'Intracerebroventricular',
  intrahippocampal: 'Intrahippocampal',
}

function SpecimenRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="rule-dark flex items-baseline gap-4 py-3">
      <dt className="mono-label w-40 shrink-0 text-white/30">{label}</dt>
      <dd className="text-[14px] tracking-tight text-white/80">{value}</dd>
    </div>
  )
}

export default async function PeptideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const peptide = await getPeptide(slug)

  if (!peptide) notFound()

  const categories = (peptide.categories ?? []).filter(
    (c): c is Category => typeof c === 'object',
  )

  return (
    <>
      {/* ── Record visit for relationship layer ──────────────── */}
      <RecordViewClient slug={peptide.slug} name={peptide.name} />

      {/* ══════════════════════════════════════════════════════════
          DARK WORLD — midnight #010120 specimen exhibition
         ══════════════════════════════════════════════════════════ */}
      <div className="bg-midnight min-h-screen">
        {/* ── Breadcrumb ─────────────────────────────────────── */}
        <div className="mx-auto max-w-[1200px] px-6 pt-8">
          <nav className="flex items-center gap-2 text-[13px]">
            <Link href="/" className="text-white/30 transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link href="/peptides" className="text-white/30 transition-colors hover:text-white">
              Peptides
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60">{peptide.name}</span>
          </nav>
        </div>

        {/* ── Specimen header ────────────────────────────────── */}
        <header className="mx-auto max-w-[1200px] px-6 pt-10 pb-8">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex-1">
              <h1 className="text-[42px] font-medium leading-[1.05] tracking-display text-white sm:text-[56px]">
                {peptide.name}
              </h1>

              {/* Aliases */}
              {peptide.aliases && peptide.aliases.length > 0 && (
                <p className="mt-2 font-mono text-[12px] tracking-mono text-white/40">
                  {peptide.aliases
                    .map((a) => a.alias)
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}

              {/* Category tags */}
              {categories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="badge-dark transition-colors hover:bg-white/20"
                    >
                      {cat.icon && <span className="mr-1">{cat.icon}</span>}
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2">
              <ResearchBadge status={peptide.researchStatus} variant="dark" />
            </div>
          </div>
        </header>

        {/* ── Summary — glass card ───────────────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 pb-10">
          <div className="card-dark p-6 sm:p-8">
            <p className="mono-label mb-3 text-white/30">Overview</p>
            <p className="max-w-3xl text-[16px] leading-[1.65] tracking-tight text-white/75">
              {peptide.summary}
            </p>
          </div>
        </section>

        {/* ── Two-column layout ──────────────────────────────── */}
        <div className="mx-auto max-w-[1200px] px-6 pb-16">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Main content */}
            <div className="space-y-6 lg:col-span-3">
              {/* Administration Routes */}
              {peptide.administrationRoutes && peptide.administrationRoutes.length > 0 && (
                <section className="card-dark p-6">
                  <p className="mono-label mb-4 text-white/30">Routes of Administration</p>
                  <div className="space-y-0">
                    {peptide.administrationRoutes.map((item, i) => (
                      <div key={item.id ?? i} className="rule-dark flex items-start gap-4 py-3">
                        <span className="badge-dark mt-0.5 shrink-0">
                          {item.route ? ROUTE_LABELS[item.route] ?? item.route : 'Unknown'}
                        </span>
                        {item.notes && (
                          <p className="text-[13px] leading-[1.5] text-white/50">{item.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PubMed search terms */}
              {peptide.pubmedSearchTerms && peptide.pubmedSearchTerms.length > 0 && (
                <section className="card-dark p-6">
                  <p className="mono-label mb-4 text-white/30">Research Search Terms</p>
                  <div className="flex flex-wrap gap-2">
                    {peptide.pubmedSearchTerms.map((t, i) => (
                      <a
                        key={t.id ?? i}
                        href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(t.term ?? '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-glass text-[12px]"
                      >
                        {t.term} ↗
                      </a>
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[10px] tracking-mono text-white/25">
                    Links open PubMed searches for peer-reviewed studies on this peptide.
                  </p>
                </section>
              )}
            </div>

            {/* Sidebar: molecular specimen data */}
            <aside className="space-y-6 lg:col-span-2">
              <div className="card-dark p-6">
                <p className="mono-label mb-4 text-white/30">Molecular Information</p>
                <dl>
                  <SpecimenRow label="CAS Number" value={peptide.casNumber} />
                  <SpecimenRow label="Formula" value={peptide.molecularFormula} />
                  <SpecimenRow label="Weight" value={peptide.molecularWeight} />
                  <SpecimenRow label="Half-Life" value={peptide.halfLife} />
                </dl>
              </div>

              {/* Research disclaimer */}
              <div className="card-dark border-lavender/20 p-5">
                <p className="mono-label mb-2 text-lavender/60">Research Use Only</p>
                <p className="text-[12px] leading-[1.6] text-white/40">
                  The information on this page is for educational purposes and refers to preclinical
                  and clinical research. It is not medical advice and should not be used for
                  self-treatment.
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <div className="rule-dark mx-auto max-w-[1200px] px-6 pb-12">
          <div className="flex items-center justify-between pt-6">
            <Link
              href="/peptides"
              className="text-[13px] tracking-tight text-white/40 transition-colors hover:text-white"
            >
              ← Back to all peptides
            </Link>
            <Link
              href="/categories"
              className="text-[13px] tracking-tight text-white/40 transition-colors hover:text-white"
            >
              Browse categories →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Relationship layer — back in light world ─────────── */}
      <div className="mx-auto max-w-[1200px] px-6">
        <RecentlyViewed exclude={peptide.slug} />
      </div>
    </>
  )
}
