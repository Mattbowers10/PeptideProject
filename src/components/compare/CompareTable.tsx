import React from 'react'
import Link from 'next/link'
import { ResearchBadge } from '@/components/ResearchBadge'
import { PaywallGate } from '@/components/PaywallGate'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import type { Category, Peptide } from '@/payload-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LexicalData = { root: { children: any[] } }

function CellEmpty() {
  return <span className="text-white/20">—</span>
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-4 pr-4">
      <span className="mono-label text-white/30">{children}</span>
    </div>
  )
}

function FreeRow({
  label,
  a,
  b,
}: {
  label: string
  a: React.ReactNode
  b: React.ReactNode
}) {
  return (
    <div
      className="grid grid-cols-[140px_1fr_1fr] gap-4 border-b py-4"
      style={{ borderColor: 'var(--border-dark)' }}
    >
      <RowLabel>{label}</RowLabel>
      <div className="text-[14px] text-white/75 min-w-0">{a}</div>
      <div className="text-[14px] text-white/75 min-w-0">{b}</div>
    </div>
  )
}

function GatedRow({
  label,
  a,
  b,
}: {
  label: string
  a: React.ReactNode
  b: React.ReactNode
}) {
  return (
    <div
      className="grid grid-cols-[140px_1fr_1fr] gap-4 border-b py-4"
      style={{ borderColor: 'var(--border-dark)' }}
    >
      <RowLabel>{label}</RowLabel>
      <div className="min-w-0">
        <PaywallGate minTier="researcher" title={`${label} — Researcher Access`}>
          <div className="text-[14px] text-white/75">{a}</div>
        </PaywallGate>
      </div>
      <div className="min-w-0">
        <PaywallGate minTier="researcher" title={`${label} — Researcher Access`}>
          <div className="text-[14px] text-white/75">{b}</div>
        </PaywallGate>
      </div>
    </div>
  )
}

export function CompareTable({
  peptideA,
  peptideB,
}: {
  peptideA: Peptide
  peptideB: Peptide
}) {
  const categoriesA = (peptideA.categories ?? [])
    .filter((c): c is Category => typeof c === 'object')
    .map((c) => c.name)
    .join(', ')

  const categoriesB = (peptideB.categories ?? [])
    .filter((c): c is Category => typeof c === 'object')
    .map((c) => c.name)
    .join(', ')

  const routesA = (peptideA.administrationRoutes ?? [])
    .map((r) => r.route)
    .filter(Boolean)
    .join(', ')

  const routesB = (peptideB.administrationRoutes ?? [])
    .map((r) => r.route)
    .filter(Boolean)
    .join(', ')

  const moaA = peptideA.mechanismOfAction as LexicalData | null | undefined
  const moaB = peptideB.mechanismOfAction as LexicalData | null | undefined
  const pkA = peptideA.pharmacokinetics as LexicalData | null | undefined
  const pkB = peptideB.pharmacokinetics as LexicalData | null | undefined
  const findingsA = peptideA.researchFindings as LexicalData | null | undefined
  const findingsB = peptideB.researchFindings as LexicalData | null | undefined
  const safetyA = peptideA.sideEffectsAndSafety as LexicalData | null | undefined
  const safetyB = peptideB.sideEffectsAndSafety as LexicalData | null | undefined

  return (
    <div className="card-dark overflow-x-auto">
      {/* Header row */}
      <div
        className="grid grid-cols-[140px_1fr_1fr] gap-4 border-b p-4"
        style={{ borderColor: 'var(--border-dark)' }}
      >
        <div />
        <div>
          <Link
            href={`/peptides/${peptideA.slug}`}
            className="text-[18px] font-medium tracking-heading text-white hover:text-lavender transition-colors"
          >
            {peptideA.name}
          </Link>
          {peptideA.aliases && peptideA.aliases.length > 0 && (
            <p className="mt-0.5 font-mono text-[11px] tracking-mono text-white/30">
              {peptideA.aliases
                .map((a) => a.alias)
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
          <div className="mt-2">
            <Link
              href={`/peptides/${peptideA.slug}`}
              className="btn-glass text-[12px]"
            >
              Full profile →
            </Link>
          </div>
        </div>
        <div>
          <Link
            href={`/peptides/${peptideB.slug}`}
            className="text-[18px] font-medium tracking-heading text-white hover:text-lavender transition-colors"
          >
            {peptideB.name}
          </Link>
          {peptideB.aliases && peptideB.aliases.length > 0 && (
            <p className="mt-0.5 font-mono text-[11px] tracking-mono text-white/30">
              {peptideB.aliases
                .map((a) => a.alias)
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
          <div className="mt-2">
            <Link
              href={`/peptides/${peptideB.slug}`}
              className="btn-glass text-[12px]"
            >
              Full profile →
            </Link>
          </div>
        </div>
      </div>

      {/* Free rows */}
      <div className="px-4">
        <FreeRow
          label="Research Status"
          a={<ResearchBadge status={peptideA.researchStatus} variant="dark" />}
          b={<ResearchBadge status={peptideB.researchStatus} variant="dark" />}
        />
        <FreeRow
          label="Half-Life"
          a={peptideA.halfLife ?? <CellEmpty />}
          b={peptideB.halfLife ?? <CellEmpty />}
        />
        <FreeRow
          label="Mol. Weight"
          a={peptideA.molecularWeight ?? <CellEmpty />}
          b={peptideB.molecularWeight ?? <CellEmpty />}
        />
        <FreeRow
          label="Admin Routes"
          a={routesA || <CellEmpty />}
          b={routesB || <CellEmpty />}
        />
        <FreeRow
          label="Categories"
          a={categoriesA || <CellEmpty />}
          b={categoriesB || <CellEmpty />}
        />

        {/* Gated rows */}
        <GatedRow
          label="Mechanism"
          a={moaA ? <RichTextRenderer data={moaA} /> : <CellEmpty />}
          b={moaB ? <RichTextRenderer data={moaB} /> : <CellEmpty />}
        />
        <GatedRow
          label="Pharmacokinetics"
          a={pkA ? <RichTextRenderer data={pkA} /> : <CellEmpty />}
          b={pkB ? <RichTextRenderer data={pkB} /> : <CellEmpty />}
        />
        <GatedRow
          label="Research Findings"
          a={findingsA ? <RichTextRenderer data={findingsA} /> : <CellEmpty />}
          b={findingsB ? <RichTextRenderer data={findingsB} /> : <CellEmpty />}
        />
        <GatedRow
          label="Safety"
          a={safetyA ? <RichTextRenderer data={safetyA} /> : <CellEmpty />}
          b={safetyB ? <RichTextRenderer data={safetyB} /> : <CellEmpty />}
        />
      </div>
    </div>
  )
}
