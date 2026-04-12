import React from 'react'
import Link from 'next/link'
import type { Peptide, Category } from '@/payload-types'
import { ResearchBadge } from './ResearchBadge'

type Props = { peptide: Peptide }

export function PeptideCard({ peptide }: Props) {
  const categories = (peptide.categories ?? []).filter(
    (c): c is Category => typeof c === 'object',
  )

  return (
    <Link
      href={`/peptides/${peptide.slug}`}
      className="card-light group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-warm"
    >
      {/* Specimen header: name + status */}
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <h3 className="text-base font-medium tracking-subheading text-black transition-colors group-hover:text-midnight">
          {peptide.name}
        </h3>
        <ResearchBadge status={peptide.researchStatus} />
      </div>

      {/* Aliases as annotation */}
      {peptide.aliases && peptide.aliases.length > 0 && (
        <p className="mono-label-sm mb-3 text-black/40">
          {peptide.aliases
            .slice(0, 2)
            .map((a) => a.alias)
            .join(' · ')}
        </p>
      )}

      {/* Summary */}
      <p className="mb-4 flex-1 text-[14px] leading-[1.5] tracking-tight text-black/60 line-clamp-3">
        {peptide.summary}
      </p>

      {/* Molecular data annotation */}
      {peptide.molecularFormula && (
        <p className="mb-3 font-mono text-[10px] tracking-mono text-black/30">
          {peptide.molecularFormula}
          {peptide.molecularWeight && <span> · {peptide.molecularWeight}</span>}
        </p>
      )}

      {/* Category tags */}
      {categories.length > 0 && (
        <div className="rule pt-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 3).map((cat) => (
              <span
                key={cat.id}
                className="mono-label-sm text-black/40"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </Link>
  )
}
