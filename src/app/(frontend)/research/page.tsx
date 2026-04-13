import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import { fetchActiveClinicalTrials, type ClinicalTrial } from '@/lib/clinicalTrials'
import type { Article, Peptide, Study } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Research Hub',
  description:
    'Live PubMed study feed, active clinical trials, evidence updates, and monthly synthesis — all focused on peptide research.',
}

// ── Type for evidence update (collection not yet in generated types) ──
type EvidenceUpdate = {
  id: number
  title: string
  publishedAt: string
  changeType: string
  significance: 'minor' | 'moderate' | 'major'
  summary: string
  studyTitle?: string | null
  studyLink?: string | null
  peptide: Peptide | number
  status: string
}

// ── Helpers ──────────────────────────────────────────────────────────

const STUDY_TYPE_LABEL: Record<string, string> = {
  human:          'Human',
  'meta-analysis':'Meta-analysis',
  review:         'Review',
  animal:         'Animal',
  'in-vitro':     'In vitro',
  'case-study':   'Case study',
}

const CHANGE_TYPE_LABEL: Record<string, string> = {
  'study-published':  'New study',
  'trial-completed':  'Trial completed',
  'trial-started':    'Trial started',
  'fda-action':       'FDA action',
  retraction:         'Retraction',
  regulatory:         'Regulatory',
  'grade-change':     'Grade change',
}

const STATUS_COLOR: Record<string, string> = {
  RECRUITING:             '#22c55e',
  ACTIVE_NOT_RECRUITING:  'var(--sunrise-500)',
  NOT_YET_RECRUITING:     'rgba(255,255,255,0.4)',
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function significanceDot(s: string) {
  const color =
    s === 'major'    ? 'var(--sunrise-500)' :
    s === 'moderate' ? '#eab308' :
                       'rgba(255,255,255,0.25)'
  return (
    <span
      className="inline-block h-2 w-2 rounded-full shrink-0"
      style={{ background: color }}
    />
  )
}

// ── Data fetchers ─────────────────────────────────────────────────────

async function getData(compoundSlug?: string, studyType?: string, page = 1) {
  const payload = await getPayload({ config })
  const LIMIT = 20

  // Resolve compound filter → peptide ID
  let peptideFilter: number | undefined
  let filteredPeptide: Peptide | undefined
  if (compoundSlug) {
    const r = await payload.find({
      collection: 'peptides',
      where: { slug: { equals: compoundSlug } },
      limit: 1,
      depth: 0,
    })
    if (r.docs[0]) {
      filteredPeptide = r.docs[0] as Peptide
      peptideFilter = filteredPeptide.id
    }
  }

  // Build studies where clause
  const studiesWhere: Where = {}
  if (peptideFilter) studiesWhere.peptides = { contains: peptideFilter }
  if (studyType)     studiesWhere.studyType = { equals: studyType }

  const [studiesResult, peptidesList, updatesResult, articlesResult] = await Promise.all([
    payload.find({
      collection: 'studies',
      where: Object.keys(studiesWhere).length ? studiesWhere : undefined,
      sort: '-publishedDate',
      limit: LIMIT,
      page,
      depth: 1,
    }),
    payload.find({
      collection: 'peptides',
      limit: 200,
      depth: 0,
      sort: 'name',
    }),
    (payload.find as any)({
      collection: 'evidence-updates',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 6,
      depth: 1,
    }),
    payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 4,
      depth: 0,
    }),
  ])

  return {
    studies:         studiesResult.docs as Study[],
    totalStudies:    studiesResult.totalDocs,
    totalPages:      studiesResult.totalPages,
    peptides:        peptidesList.docs as Peptide[],
    filteredPeptide,
    evidenceUpdates: (updatesResult.docs ?? []) as EvidenceUpdate[],
    articles:        articlesResult.docs as Article[],
  }
}

// ── Page ──────────────────────────────────────────────────────────────

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: Promise<{ compound?: string; type?: string; page?: string }>
}) {
  const sp = await searchParams
  const compound = sp.compound ?? ''
  const studyType = sp.type ?? ''
  const page = Math.max(1, Number(sp.page ?? '1'))

  const [
    { studies, totalStudies, totalPages, peptides, filteredPeptide, evidenceUpdates, articles },
    clinicalTrials,
  ] = await Promise.all([
    getData(compound || undefined, studyType || undefined, page),
    fetchActiveClinicalTrials(8),
  ])

  const ARTICLE_CATEGORY_COLOR: Record<string, string> = {
    guide:       'rgba(232,98,42,0.15)',
    comparison:  'rgba(255,255,255,0.08)',
    clinical:    'rgba(34,197,94,0.15)',
    mechanism:   'rgba(99,102,241,0.15)',
    protocol:    'rgba(234,179,8,0.12)',
    regulatory:  'rgba(255,255,255,0.06)',
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-midnight py-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
            Research Hub
          </p>
          <h1 className="mt-2 text-[36px] font-medium leading-[1.05] tracking-display text-white sm:text-[48px]">
            The living record of<br className="hidden sm:block" /> peptide science.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-white/45">
            PubMed studies synced daily. Active clinical trials. Evidence updates when
            the science materially changes. Monthly synthesis for practitioners.
          </p>

          {/* Stat bar */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {[
              { n: totalStudies.toString(), l: 'indexed studies' },
              { n: clinicalTrials.length.toString(), l: 'active trials' },
              { n: articles.length.toString(), l: 'research articles' },
              { n: evidenceUpdates.length.toString(), l: 'evidence updates' },
            ].map((s) => (
              <div key={s.l}>
                <span className="block text-[36px] font-medium leading-none tracking-display text-white">{s.n}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">

          {/* ── LEFT: Study feed ──────────────────────────────────── */}
          <div>
            {/* Filter bar */}
            <form method="GET" action="/research" className="mb-6 flex flex-wrap gap-3">
              <select
                name="compound"
                defaultValue={compound}
                className="rounded-sharp border bg-white px-3 py-2 text-[13px] tracking-tight text-black focus:outline-none"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <option value="">All compounds</option>
                {peptides.map((p) => (
                  <option key={p.id} value={p.slug}>{p.name}</option>
                ))}
              </select>

              <select
                name="type"
                defaultValue={studyType}
                className="rounded-sharp border bg-white px-3 py-2 text-[13px] tracking-tight text-black focus:outline-none"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <option value="">All study types</option>
                {Object.entries(STUDY_TYPE_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>

              <button type="submit" className="btn-dark text-[13px]">Filter</button>

              {(compound || studyType) && (
                <Link href="/research" className="btn-outline text-[13px]">Clear</Link>
              )}
            </form>

            {/* Active filter label */}
            {filteredPeptide && (
              <div className="mb-4 flex items-center gap-2">
                <span className="font-mono text-[11px] text-black/40 uppercase tracking-[0.1em]">Showing:</span>
                <span
                  className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[11px] text-white"
                  style={{ background: 'var(--sunrise-500)' }}
                >
                  {filteredPeptide.name}
                  <Link href="/research" className="opacity-60 hover:opacity-100">×</Link>
                </span>
              </div>
            )}

            {/* Section header */}
            <div className="mb-4 flex items-baseline justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/30">Layer 1</p>
                <h2 className="text-[20px] font-medium tracking-display text-black">Study feed</h2>
              </div>
              <span className="font-mono text-[11px] text-black/35">
                {totalStudies.toLocaleString()} studies
              </span>
            </div>

            {/* Study list */}
            {studies.length === 0 ? (
              <div className="rounded-comfortable border bg-white px-8 py-12 text-center" style={{ borderColor: 'var(--border-light)' }}>
                <p className="text-[15px] font-medium text-black/60">
                  {compound || studyType ? 'No studies match this filter.' : 'No studies indexed yet.'}
                </p>
                <p className="mt-2 text-[13px] text-black/35">
                  {compound || studyType
                    ? 'Try clearing the filters above.'
                    : 'Run the PubMed sync job to populate studies.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {studies.map((study) => {
                  const linkedPeptides = (study.peptides ?? []).filter(
                    (p): p is Peptide => typeof p === 'object',
                  )
                  const authors = study.authors ?? []
                  const year = study.publishedDate
                    ? new Date(study.publishedDate).getFullYear()
                    : null

                  const typeColor =
                    study.studyType === 'human'
                      ? 'rgba(232,98,42,0.12)'
                      : study.studyType === 'meta-analysis' || study.studyType === 'review'
                      ? 'rgba(99,102,241,0.1)'
                      : 'rgba(30,21,17,0.05)'

                  return (
                    <div
                      key={study.id}
                      className="rounded-comfortable border bg-white p-5 transition-shadow hover:shadow-warm"
                      style={{ borderColor: 'var(--border-light)' }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-black/60"
                            style={{ background: typeColor }}
                          >
                            {STUDY_TYPE_LABEL[study.studyType ?? ''] ?? study.studyType ?? 'Unknown'}
                          </span>
                          {study.qualityScore && study.qualityScore >= 4 && (
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: 'var(--sunrise-500)' }}>
                              {'★'.repeat(study.qualityScore)}
                            </span>
                          )}
                        </div>
                        {year && (
                          <span className="shrink-0 font-mono text-[11px] text-black/30">{year}</span>
                        )}
                      </div>

                      <h3 className="mt-2.5 text-[14px] font-medium leading-[1.45] tracking-tight text-black">
                        {study.url ? (
                          <a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-2"
                          >
                            {study.title}
                          </a>
                        ) : (
                          study.title
                        )}
                      </h3>

                      {study.journal && (
                        <p className="mt-1 text-[12px] italic text-black/40">{study.journal}</p>
                      )}

                      {authors.length > 0 && (
                        <p className="mt-1 font-mono text-[11px] text-black/30">
                          {authors
                            .slice(0, 3)
                            .map((a) => a.name)
                            .join(', ')}
                          {authors.length > 3 && ` +${authors.length - 3} more`}
                        </p>
                      )}

                      {study.abstract && (
                        <p className="mt-2.5 text-[13px] leading-[1.55] text-black/50 line-clamp-2">
                          {study.abstract}
                        </p>
                      )}

                      {linkedPeptides.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {linkedPeptides.slice(0, 4).map((p) => (
                            <Link
                              key={p.id}
                              href={`/peptides/${p.slug}`}
                              className="rounded px-2 py-0.5 font-mono text-[10px] text-black/50 transition-colors hover:text-black"
                              style={{ background: 'rgba(30,21,17,0.05)', border: '1px solid var(--border-light)' }}
                            >
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                {page > 1 ? (
                  <Link
                    href={`/research?${new URLSearchParams({ ...(compound ? { compound } : {}), ...(studyType ? { type: studyType } : {}), page: String(page - 1) })}`}
                    className="btn-outline text-[13px]"
                  >
                    ← Previous
                  </Link>
                ) : <span />}
                <span className="font-mono text-[12px] text-black/40">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link
                    href={`/research?${new URLSearchParams({ ...(compound ? { compound } : {}), ...(studyType ? { type: studyType } : {}), page: String(page + 1) })}`}
                    className="btn-outline text-[13px]"
                  >
                    Next →
                  </Link>
                ) : <span />}
              </div>
            )}
          </div>

          {/* ── RIGHT: Sidebar ────────────────────────────────────── */}
          <aside className="space-y-8 lg:sticky lg:top-6">

            {/* Layer 2 — Evidence updates */}
            <div>
              <div className="mb-3 border-b pb-2" style={{ borderColor: 'var(--border-light)' }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/30">Layer 2</p>
                <h2 className="text-[16px] font-medium tracking-display text-black">Evidence updates</h2>
              </div>

              {evidenceUpdates.length === 0 ? (
                <p className="text-[13px] text-black/35">
                  No evidence updates yet. Add them via the Payload admin panel.
                </p>
              ) : (
                <div className="space-y-4">
                  {evidenceUpdates.map((update) => {
                    const peptide = typeof update.peptide === 'object' ? update.peptide : null
                    return (
                      <div
                        key={update.id}
                        className="rounded-sharp border p-4"
                        style={{ borderColor: 'var(--border-light)' }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {significanceDot(update.significance)}
                          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/40">
                            {CHANGE_TYPE_LABEL[update.changeType] ?? update.changeType}
                          </span>
                          <span className="ml-auto font-mono text-[10px] text-black/25">
                            {formatDate(update.publishedAt)}
                          </span>
                        </div>
                        <p className="text-[13px] font-medium leading-[1.4] tracking-tight text-black">
                          {update.title}
                        </p>
                        {update.summary && (
                          <p className="mt-1.5 text-[12px] leading-[1.55] text-black/50 line-clamp-2">
                            {update.summary}
                          </p>
                        )}
                        <div className="mt-2.5 flex items-center gap-3">
                          {peptide && (
                            <Link
                              href={`/peptides/${(peptide as Peptide).slug}`}
                              className="font-mono text-[10px] text-black/40 underline-offset-2 hover:text-black hover:underline"
                            >
                              {(peptide as Peptide).name} →
                            </Link>
                          )}
                          {update.studyLink && (
                            <a
                              href={update.studyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10px] text-black/30 underline-offset-2 hover:text-black hover:underline"
                            >
                              Source ↗
                            </a>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Layer 1 supplement — Active clinical trials */}
            <div>
              <div className="mb-3 border-b pb-2" style={{ borderColor: 'var(--border-light)' }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/30">Clinical trials</p>
                <h2 className="text-[16px] font-medium tracking-display text-black">Active trials</h2>
              </div>

              {clinicalTrials.length === 0 ? (
                <p className="text-[13px] text-black/35">
                  No active trials found. Check{' '}
                  <a href="https://clinicaltrials.gov" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    clinicaltrials.gov
                  </a>{' '}
                  directly.
                </p>
              ) : (
                <div className="space-y-3">
                  {clinicalTrials.map((trial) => (
                    <a
                      key={trial.nctId}
                      href={trial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-sharp border p-3.5 transition-all hover:border-black/20 hover:shadow-warm"
                      style={{ borderColor: 'var(--border-light)' }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: STATUS_COLOR[trial.status] ?? 'rgba(30,21,17,0.2)' }}
                        />
                        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/35">
                          {trial.phases.length ? trial.phases.join(' / ') : 'N/A'} · {trial.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-[13px] font-medium leading-[1.4] tracking-tight text-black line-clamp-2">
                        {trial.title}
                      </p>
                      {trial.conditions.length > 0 && (
                        <p className="mt-1 font-mono text-[10px] text-black/35 line-clamp-1">
                          {trial.conditions.slice(0, 2).join(', ')}
                        </p>
                      )}
                      <p className="mt-1.5 font-mono text-[9px] text-black/25">{trial.nctId}</p>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Layer 3 — Monthly synthesis articles */}
            <div>
              <div className="mb-3 border-b pb-2" style={{ borderColor: 'var(--border-light)' }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/30">Layer 3</p>
                <h2 className="text-[16px] font-medium tracking-display text-black">Research articles</h2>
              </div>

              {articles.length === 0 ? (
                <p className="text-[13px] text-black/35">No articles published yet.</p>
              ) : (
                <div className="space-y-3">
                  {articles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/research/${article.slug}`}
                      className="block rounded-sharp border p-3.5 transition-all hover:border-black/20 hover:shadow-warm"
                      style={{ borderColor: 'var(--border-light)' }}
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <span
                          className="rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-black/50"
                          style={{ background: ARTICLE_CATEGORY_COLOR[article.category] ?? 'rgba(30,21,17,0.05)' }}
                        >
                          {article.category}
                        </span>
                        {article.readTimeMinutes && (
                          <span className="font-mono text-[10px] text-black/25">
                            {article.readTimeMinutes} min
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] font-medium leading-[1.4] tracking-tight text-black line-clamp-2">
                        {article.title}
                      </p>
                      {article.excerpt && (
                        <p className="mt-1 text-[12px] leading-[1.5] text-black/45 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                      <p className="mt-2 font-mono text-[10px] text-black/25">
                        {formatDate(article.publishedAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              )}

              {articles.length > 0 && (
                <Link href="/research/articles" className="mt-3 block text-center font-mono text-[11px] text-black/40 hover:text-black">
                  All articles →
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
