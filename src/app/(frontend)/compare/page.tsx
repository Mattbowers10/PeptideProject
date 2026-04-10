import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CompareSelector } from '@/components/compare/CompareSelector'
import { CompareTable } from '@/components/compare/CompareTable'
import type { Peptide } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Compare Peptides | Peptide Wiki',
  description:
    'Compare two peptides side-by-side — research status, half-life, administration routes, mechanisms, and more.',
}

export const revalidate = 3600

async function getAllPeptides() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'peptides',
    limit: 300,
    overrideAccess: true,
    select: { name: true, slug: true } as any,
    sort: 'name',
  })
  return result.docs as { name: string; slug: string }[]
}

async function getPeptide(slug: string): Promise<Peptide | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'peptides',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })
  return (result.docs[0] as Peptide) ?? null
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string }>
}) {
  const { a = '', b = '' } = await searchParams

  const [allPeptides, peptideA, peptideB] = await Promise.all([
    getAllPeptides(),
    a ? getPeptide(a) : null,
    b ? getPeptide(b) : null,
  ])

  const bothSelected = !!peptideA && !!peptideB

  return (
    <div className="bg-midnight min-h-screen">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        {/* Page header */}
        <div className="mb-8">
          <p className="mono-label mb-2 text-white/30">Research Tool</p>
          <h1 className="text-[36px] font-medium tracking-display text-white sm:text-[48px]">
            Compare Peptides
          </h1>
          <p className="mt-2 text-[15px] text-white/50">
            Select two peptides to view a side-by-side breakdown of their profiles, mechanisms, and research data.
          </p>
        </div>

        {/* Selector */}
        <div className="card-dark p-6 mb-8">
          <CompareSelector peptides={allPeptides} slugA={a} slugB={b} />
        </div>

        {/* States */}
        {!a && !b && (
          <div className="rounded-comfortable border py-20 text-center" style={{ borderColor: 'var(--border-dark)' }}>
            <p className="text-[15px] text-white/30">Choose two peptides above to begin comparing.</p>
          </div>
        )}

        {(a || b) && !bothSelected && (
          <div className="rounded-comfortable border py-20 text-center" style={{ borderColor: 'var(--border-dark)' }}>
            {a && !peptideA && (
              <p className="text-[15px] text-white/30 mb-2">
                Peptide &ldquo;{a}&rdquo; not found.
              </p>
            )}
            {b && !peptideB && (
              <p className="text-[15px] text-white/30 mb-2">
                Peptide &ldquo;{b}&rdquo; not found.
              </p>
            )}
            {((a && peptideA && !b) || (b && peptideB && !a)) && (
              <p className="text-[15px] text-white/30">
                Select a second peptide to compare.
              </p>
            )}
          </div>
        )}

        {/* Comparison table */}
        {bothSelected && (
          <CompareTable peptideA={peptideA} peptideB={peptideB} />
        )}
      </div>
    </div>
  )
}
