import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ResearchBadge } from '@/components/ResearchBadge'
import { RecordViewClient } from '@/components/RecordViewClient'
import { RecentlyViewed } from '@/components/RecentlyViewed'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import { PaywallGate } from '@/components/PaywallGate'
import { AffiliateSection } from '@/components/AffiliateSection'
import { StudiesSection } from '@/components/StudiesSection'
import { SaveToListButton } from '@/components/SaveToListButton'
import { ShareButtons } from '@/components/ShareButtons'
import { PeptideUpgradeCTA } from '@/components/PeptideUpgradeCTA'
import { isGuideSlug } from '@/lib/guideConfig'
import { ProfileTOC } from '@/components/ProfileTOC'
import { PeptideFAQ } from '@/components/PeptideFAQ'
import type { TOCSection } from '@/components/ProfileTOC'
import type { AffiliateLink, Category, Partner, Peptide, Study } from '@/payload-types'

export const revalidate = 3600

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'peptides',
    limit: 500,
    depth: 0,
    overrideAccess: true,
  })
  return (docs as Peptide[]).map((p) => ({ slug: p.slug }))
}

async function getPeptide(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'peptides',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    overrideAccess: true, // fetch all fields; paywall gate is enforced at UI layer
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
    title: { absolute: `${peptide.name} | Peptide United` },
    description: peptide.summary,
    openGraph: {
      title: `${peptide.name} — Peptide Research Profile`,
      description: peptide.summary ?? undefined,
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

  // Fetch related peptides from same categories (sequential to respect pool limits)
  const categoryIds = categories.map((c) => c.id)

  let relatedPeptides: Peptide[] = []
  if (categoryIds.length > 0) {
    const payload2 = await getPayload({ config })
    const { docs } = await payload2.find({
      collection: 'peptides',
      where: {
        and: [
          { categories: { in: categoryIds } },
          { slug: { not_equals: peptide.slug } },
        ],
      },
      limit: 3,
      depth: 0,
      overrideAccess: true,
    })
    relatedPeptides = docs as Peptide[]
  }

  // Evidence updates for this peptide
  const payload3 = await getPayload({ config })
  const evidenceUpdatesResult = await (payload3.find as any)({
    collection: 'evidence-updates',
    where: {
      and: [
        { peptide: { equals: peptide.id } },
        { status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
    limit: 3,
    depth: 0,
  })
  const peptideEvidenceUpdates = evidenceUpdatesResult.docs ?? []

  // Studies — populated at depth 2
  const studies = ((peptide.studies ?? []).filter(
    (s): s is Study => typeof s === 'object',
  ) as Study[])

  // Affiliate links — populated with partner data at depth 2
  type PopulatedLink = Omit<AffiliateLink, 'partner'> & { partner: Partner | number }
  const affiliateLinks = ((peptide.affiliateLinks ?? []).filter(
    (l): l is AffiliateLink => typeof l === 'object',
  ) as PopulatedLink[])

  // Rich text — cast to the shape RichTextRenderer expects
  type LexicalData = { root: { children: unknown[] } }
  const moa = peptide.mechanismOfAction as LexicalData | null | undefined
  const pk = peptide.pharmacokinetics as LexicalData | null | undefined
  const findings = peptide.researchFindings as LexicalData | null | undefined
  const safety = peptide.sideEffectsAndSafety as LexicalData | null | undefined

  const hasGatedContent = moa || pk || findings || safety
  const isFreeProfile = isGuideSlug(peptide.slug)

  const base = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://peptideunited.com').replace(/\/$/, '')

  // Build TOC sections based on what data exists
  const tocSections: TOCSection[] = [
    { id: 'summary', label: 'Summary' },
    ...(peptide.administrationRoutes && peptide.administrationRoutes.length > 0
      ? [{ id: 'administration', label: 'Administration' }]
      : []),
    ...(moa ? [{ id: 'mechanism', label: 'Mechanism' }] : []),
    ...(pk ? [{ id: 'pharmacokinetics', label: 'Pharmacokinetics' }] : []),
    ...(findings ? [{ id: 'findings', label: 'Research Findings' }] : []),
    ...(safety ? [{ id: 'safety', label: 'Safety' }] : []),
    { id: 'faq', label: 'FAQ' },
    ...(studies.length > 0 ? [{ id: 'studies', label: 'Studies' }] : []),
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ChemicalSubstance',
    name: peptide.name,
    alternateName: peptide.aliases?.map((a) => a.alias).filter(Boolean) ?? [],
    description: peptide.summary,
    url: `${base}/peptides/${peptide.slug}`,
    identifier: peptide.casNumber ?? undefined,
    molecularFormula: peptide.molecularFormula ?? undefined,
    potentialUse: 'Research use only',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
              { '@type': 'ListItem', position: 2, name: 'Peptides', item: `${base}/peptides` },
              { '@type': 'ListItem', position: 3, name: peptide.name, item: `${base}/peptides/${peptide.slug}` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What is ${peptide.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: peptide.summary ?? `${peptide.name} is a peptide compound currently being studied in scientific research.`,
                },
              },
              peptide.halfLife ? {
                '@type': 'Question',
                name: `What is the half-life of ${peptide.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `The half-life of ${peptide.name} is approximately ${peptide.halfLife}.`,
                },
              } : null,
              peptide.molecularFormula ? {
                '@type': 'Question',
                name: `What is the molecular formula of ${peptide.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `The molecular formula of ${peptide.name} is ${peptide.molecularFormula}.`,
                },
              } : null,
            ].filter(Boolean),
          }),
        }}
      />

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

            <div className="mt-2 flex flex-col items-end gap-3">
              <ResearchBadge status={peptide.researchStatus} variant="dark" />
              <div className="flex items-center gap-2">
                <Link
                  href={`/compare?a=${peptide.slug}`}
                  className="btn-glass text-[12px]"
                >
                  Compare →
                </Link>
                <SaveToListButton peptideId={peptide.id} />
              </div>
              <ShareButtons
                url={`${base}/peptides/${peptide.slug}`}
                title={`${peptide.name} — Research Profile | Peptide United`}
              />
            </div>
          </div>
        </header>

        {/* ── Mobile TOC ─────────────────────────────────────── */}
        <div className="mx-auto max-w-[1200px] px-6 pb-4">
          <ProfileTOC sections={tocSections} />
        </div>

        {/* ── Summary — glass card ───────────────────────────── */}
        <section id="summary" className="mx-auto max-w-[1200px] px-6 pb-10 scroll-mt-20">
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

            {/* ── Main content ─────────────────────────────── */}
            <div className="space-y-6 lg:col-span-3">

              {/* Administration Routes — free */}
              {peptide.administrationRoutes && peptide.administrationRoutes.length > 0 && (
                <section id="administration" className="card-dark p-6 scroll-mt-20">
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

              {/* ── Gated research content ───────────────── */}
              {hasGatedContent && (
                <section className="card-dark p-6">
                  <p className="mono-label mb-5 text-white/30">Research Profile</p>
                  <div className="space-y-8">

                    {moa && (
                      <div id="mechanism" className="scroll-mt-20">
                        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-lavender/70">
                          Mechanism of Action
                        </p>
                        <PaywallGate
                          minTier="researcher"
                          title="Mechanism Detail — Researcher+"
                          description={peptide.summary ?? ''}
                          freeAccess={isFreeProfile}
                        >
                          <RichTextRenderer data={moa as Parameters<typeof RichTextRenderer>[0]['data']} />
                        </PaywallGate>
                      </div>
                    )}

                    {pk && (
                      <div id="pharmacokinetics" className="scroll-mt-20">
                        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-lavender/70">
                          Pharmacokinetics
                        </p>
                        <PaywallGate
                          minTier="researcher"
                          title="Pharmacokinetics — Researcher+"
                          description={peptide.summary ?? ''}
                          freeAccess={isFreeProfile}
                        >
                          <RichTextRenderer data={pk as Parameters<typeof RichTextRenderer>[0]['data']} />
                        </PaywallGate>
                      </div>
                    )}

                    {findings && (
                      <div id="findings" className="scroll-mt-20">
                        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-lavender/70">
                          Key Research Findings
                        </p>
                        <PaywallGate
                          minTier="researcher"
                          title="Research Findings — Researcher+"
                          description={peptide.summary ?? ''}
                          freeAccess={isFreeProfile}
                        >
                          <RichTextRenderer data={findings as Parameters<typeof RichTextRenderer>[0]['data']} />
                        </PaywallGate>
                      </div>
                    )}

                    {safety && (
                      <div id="safety" className="scroll-mt-20">
                        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.1em] text-lavender/70">
                          Side Effects & Safety
                        </p>
                        <PaywallGate
                          minTier="researcher"
                          title="Safety Profile — Researcher+"
                          description={peptide.summary ?? ''}
                          freeAccess={isFreeProfile}
                        >
                          <RichTextRenderer data={safety as Parameters<typeof RichTextRenderer>[0]['data']} />
                        </PaywallGate>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* PubMed search terms — free (links are free; gated content is above) */}
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

              {/* Auto-generated FAQ accordion */}
              <div id="faq" className="scroll-mt-20">
                <PeptideFAQ peptide={peptide} />
              </div>

              {/* PubMed-linked studies */}
              <div id="studies" className="scroll-mt-20">
                <StudiesSection studies={studies} />
              </div>

              {/* Affiliate links */}
              <AffiliateSection links={affiliateLinks} />

              {/* Related Peptides */}
              {relatedPeptides.length > 0 && (
                <section className="card-dark p-6">
                  <p className="mono-label mb-4 text-white/30">Related Compounds</p>
                  <div className="space-y-0">
                    {relatedPeptides.map((related) => (
                      <Link
                        key={related.id}
                        href={`/peptides/${related.slug}`}
                        className="rule-dark flex items-center justify-between py-3 text-[14px] tracking-tight text-white/70 transition-colors hover:text-white"
                      >
                        <span>{related.name}</span>
                        <span className="text-white/30">→</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* ── Sidebar ──────────────────────────────────── */}
            <aside className="space-y-6 lg:col-span-2">
              {/* Desktop TOC */}
              <div className="hidden lg:block">
                <div className="sticky top-20 space-y-6">
                  <div className="rounded-sharp border border-black/[0.07] bg-white p-5">
                    <ProfileTOC sections={tocSections} />
                  </div>
                </div>
              </div>

              <div className="card-dark p-6">
                <p className="mono-label mb-4 text-white/30">Molecular Information</p>
                <dl>
                  <SpecimenRow label="CAS Number" value={peptide.casNumber} />
                  <SpecimenRow label="Formula" value={peptide.molecularFormula} />
                  <SpecimenRow label="Weight" value={peptide.molecularWeight} />
                  <SpecimenRow label="Half-Life" value={peptide.halfLife} />
                </dl>
              </div>

              {/* Sidebar access card */}
              {hasGatedContent && (
                isFreeProfile ? (
                  <div className="card-dark p-5" style={{ borderColor: 'rgba(232,98,42,0.25)' }}>
                    <p className="mono-label mb-2" style={{ color: 'var(--sunrise-500)' }}>
                      Free Profile
                    </p>
                    <p className="text-[13px] leading-[1.65] text-white/50">
                      This is one of 10 profiles available in full on the free tier — part of
                      the{' '}
                      <Link href="/guide" className="underline underline-offset-2 text-white/60 hover:text-white">
                        free research guide
                      </Link>
                      . Upgrade to unlock all 102+ profiles.
                    </p>
                    <Link
                      href="/upgrade"
                      className="btn-dark mt-4 w-full justify-center text-[13px]"
                    >
                      Unlock all profiles →
                    </Link>
                  </div>
                ) : (
                  <PeptideUpgradeCTA minTier="researcher" />
                )
              )}

              {/* Research disclaimer */}
              <div className="card-dark border-lavender/20 p-5">
                <p className="mono-label mb-2 text-lavender/60">Research Use Only</p>
                <p className="text-[12px] leading-[1.6] text-white/40">
                  The information on this page is for educational purposes and refers to
                  preclinical and clinical research. It is not medical advice and should
                  not be used for self-treatment.
                </p>
              </div>

              {/* Evidence updates for this compound */}
              {peptideEvidenceUpdates.length > 0 && (
                <div className="card-dark p-5">
                  <p className="mono-label mb-3 text-white/30">Evidence Updates</p>
                  <div className="space-y-3">
                    {peptideEvidenceUpdates.map((update: any) => (
                      <div key={update.id} className="border-t pt-3 first:border-0 first:pt-0" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className="h-1.5 w-1.5 rounded-full shrink-0"
                            style={{
                              background:
                                update.significance === 'major'    ? 'var(--sunrise-500)' :
                                update.significance === 'moderate' ? '#eab308' :
                                                                     'rgba(255,255,255,0.25)',
                            }}
                          />
                          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/25">
                            {update.changeType?.replace(/-/g, ' ')}
                          </span>
                          <span className="ml-auto font-mono text-[9px] text-white/20">
                            {update.publishedAt
                              ? new Date(update.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                              : ''}
                          </span>
                        </div>
                        <p className="text-[12px] leading-[1.45] text-white/65">{update.title}</p>
                        {update.studyLink && (
                          <a
                            href={update.studyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block font-mono text-[10px] text-white/30 hover:text-white/60"
                          >
                            Source ↗
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  <Link href="/research" className="mt-3 block font-mono text-[10px] text-white/30 hover:text-white/60">
                    All evidence updates →
                  </Link>
                </div>
              )}
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
