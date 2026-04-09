import React from 'react'
import type { Study } from '@/payload-types'

const STUDY_TYPE_LABELS: Record<string, string> = {
  'in-vitro': 'In Vitro',
  animal: 'Animal',
  human: 'Human (Clinical)',
  review: 'Systematic Review',
  'meta-analysis': 'Meta-Analysis',
  'case-study': 'Case Study',
}

const STUDY_TYPE_COLORS: Record<string, string> = {
  'in-vitro': 'bg-white/[0.06] text-white/50',
  animal: 'bg-white/[0.06] text-white/50',
  human: 'bg-lavender/20 text-lavender',
  review: 'bg-lavender/10 text-lavender/80',
  'meta-analysis': 'bg-lavender/10 text-lavender/80',
  'case-study': 'bg-white/[0.06] text-white/50',
}

function StudyCard({ study }: { study: Study }) {
  const year = study.publishedDate
    ? new Date(study.publishedDate).getFullYear()
    : null
  const authorNames = (study.authors ?? [])
    .slice(0, 3)
    .map((a) => a.name)
    .filter(Boolean)
    .join(', ')
  const moreAuthors = (study.authors ?? []).length > 3
    ? ` +${(study.authors ?? []).length - 3} more`
    : ''
  const typeLabel = study.studyType ? STUDY_TYPE_LABELS[study.studyType] ?? study.studyType : null
  const typeColor = study.studyType ? STUDY_TYPE_COLORS[study.studyType] ?? 'bg-white/[0.06] text-white/50' : ''

  return (
    <div className="rule-dark py-5">
      {/* Header row */}
      <div className="mb-2 flex flex-wrap items-start gap-2">
        {typeLabel && (
          <span className={`rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono ${typeColor}`}>
            {typeLabel}
          </span>
        )}
        {year && (
          <span className="font-mono text-[10px] tracking-mono text-white/25">{year}</span>
        )}
        {study.journal && (
          <span className="font-mono text-[10px] tracking-mono text-white/25 italic">
            {study.journal}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-[14px] font-medium leading-[1.4] tracking-tight text-white/85">
        {study.title}
      </p>

      {/* Authors */}
      {authorNames && (
        <p className="mt-1 text-[12px] text-white/35">
          {authorNames}{moreAuthors}
        </p>
      )}

      {/* Abstract snippet */}
      {study.abstract && (
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-white/45">
          {study.abstract}
        </p>
      )}

      {/* PubMed link */}
      {study.url && (
        <a
          href={study.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] tracking-mono text-lavender/60 transition-colors hover:text-lavender"
        >
          PubMed ↗
        </a>
      )}
    </div>
  )
}

export function StudiesSection({ studies }: { studies: Study[] }) {
  if (!studies.length) return null

  // Sort: human > review > meta-analysis > animal > in-vitro; then by date desc
  const sorted = [...studies].sort((a, b) => {
    const rank: Record<string, number> = { human: 0, 'meta-analysis': 1, review: 2, animal: 3, 'in-vitro': 4, 'case-study': 5 }
    const ra = rank[a.studyType ?? ''] ?? 9
    const rb = rank[b.studyType ?? ''] ?? 9
    if (ra !== rb) return ra - rb
    return (b.publishedDate ?? '').localeCompare(a.publishedDate ?? '')
  })

  return (
    <section className="card-dark p-6">
      <div className="mb-1 flex items-center justify-between">
        <p className="mono-label text-white/30">Linked Studies</p>
        <span className="font-mono text-[11px] tracking-mono text-white/20">
          {studies.length} {studies.length === 1 ? 'study' : 'studies'}
        </span>
      </div>
      <p className="mb-4 text-[12px] text-white/25">
        PubMed-indexed research associated with this peptide. Human trials ranked first.
      </p>
      <div>
        {sorted.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  )
}
