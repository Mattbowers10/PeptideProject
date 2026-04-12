import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { GoalFilterGrid } from '@/components/GoalFilterGrid'
import type { Category } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Find Peptides By Goal',
  description:
    'Browse 100+ research peptides by goal — performance, longevity, cognitive enhancement, body composition, recovery, and more.',
}

export default async function CategoriesPage() {
  const payload = await getPayload({ config })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })

  // Count peptides per category (sequential to stay within connection limits)
  const withCounts: { cat: Category; count: number }[] = []
  for (const cat of categories as Category[]) {
    const { totalDocs } = await payload.find({
      collection: 'peptides',
      where: { categories: { contains: cat.id } },
      limit: 0,
    })
    withCounts.push({ cat, count: totalDocs })
  }

  return (
    <>
      {/* Header */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-3 text-black/40">Guided discovery</p>
          <h1 className="text-[36px] font-medium leading-[1.1] tracking-display text-black sm:text-[48px]">
            Find by Research Goal
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.5] text-black/50">
            Filter by broad goal, then select a research area to see matching peptides.
          </p>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-12">
        <GoalFilterGrid entries={withCounts} />
      </section>

      {/* CTA */}
      <section className="border-t py-12" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="mono-label mb-1 text-black/30">Research deeper</p>
              <p className="text-[15px] text-black/60">
                Free plans show summaries. Researcher unlocks mechanism profiles, pharmacokinetics, and study links.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link href="/peptides" className="btn-outline text-[13px]">
                Browse all peptides
              </Link>
              <Link href="/upgrade" className="btn-dark text-[13px]">
                View plans →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
