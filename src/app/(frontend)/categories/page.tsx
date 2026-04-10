import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { GoalFilterGrid } from '@/components/GoalFilterGrid'
import type { Category } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Find Peptides By Goal | Peptide Wiki',
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
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="mono-label mb-2 text-black/30">Or explore directly</p>
          <Link href="/peptides" className="btn-dark">
            Browse All Peptides
          </Link>
        </div>
      </section>
    </>
  )
}
