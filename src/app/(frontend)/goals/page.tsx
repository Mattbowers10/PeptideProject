import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { GoalCard } from '@/components/GoalCard'
import type { Category } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Find Peptides By Research Goal | Peptide Wiki',
  description:
    'Browse 100+ research peptides organized by goal — fat loss, cognitive enhancement, healing & recovery, anti-aging, and more.',
}

export const revalidate = 3600

async function getData() {
  const payload = await getPayload({ config })

  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })

  const countMap: Record<number, number> = {}
  for (const cat of categoriesResult.docs) {
    const { totalDocs } = await payload.find({
      collection: 'peptides',
      where: { categories: { contains: cat.id } },
      limit: 0,
    })
    countMap[cat.id] = totalDocs
  }

  return {
    categories: categoriesResult.docs as Category[],
    countMap,
  }
}

export default async function GoalsPage() {
  const { categories, countMap } = await getData()

  return (
    <>
      {/* Hero */}
      <section className="gradient-pastel py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-4 text-black/40">Guided discovery</p>
          <h1 className="text-[42px] font-medium leading-[1.05] tracking-display text-black sm:text-[56px]">
            What are you
            <br />
            <span className="text-lavender">researching?</span>
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-[1.4] tracking-tight text-black/60">
            Select a research goal to see the peptides most relevant to your area of interest.
          </p>
        </div>
      </section>

      {/* Goal grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-14">
        <p className="mono-label mb-6 text-black/30">
          {categories.length} research areas
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <GoalCard key={cat.id} category={cat} count={countMap[cat.id]} />
          ))}
        </div>
      </section>
    </>
  )
}
