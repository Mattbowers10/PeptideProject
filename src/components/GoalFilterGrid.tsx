'use client'

import React, { useState } from 'react'
import { CategoryCard } from '@/components/CategoryCard'
import type { Category } from '@/payload-types'

type Entry = { cat: Category; count: number }

const GOALS = [
  { key: 'all', label: 'All Goals', slugs: [] as string[] },
  {
    key: 'performance',
    label: 'Performance',
    slugs: ['muscle-performance', 'growth-hormone-axis', 'healing-recovery'],
  },
  {
    key: 'longevity',
    label: 'Longevity',
    slugs: ['anti-aging-longevity', 'mitochondrial-health', 'immune-support'],
  },
  {
    key: 'cognitive',
    label: 'Cognitive',
    slugs: ['cognitive-enhancement', 'neuroprotection', 'sleep-circadian'],
  },
  {
    key: 'body-composition',
    label: 'Body Composition',
    slugs: ['fat-loss-metabolic', 'glp1-metabolic-hormones'],
  },
  {
    key: 'recovery',
    label: 'Recovery',
    slugs: ['healing-recovery', 'pain-inflammation', 'cardiovascular'],
  },
  {
    key: 'cosmetic',
    label: 'Cosmetic & Skin',
    slugs: ['skin-cosmetic'],
  },
  {
    key: 'other',
    label: 'Other',
    slugs: ['antimicrobial', 'sexual-health'],
  },
]

export function GoalFilterGrid({ entries }: { entries: Entry[] }) {
  const [activeGoal, setActiveGoal] = useState('all')

  const goal = GOALS.find((g) => g.key === activeGoal)!
  const filtered =
    activeGoal === 'all'
      ? entries
      : entries.filter((e) => goal.slugs.includes(e.cat.slug))

  return (
    <>
      {/* Filter pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {GOALS.map((g) => (
          <button
            key={g.key}
            onClick={() => setActiveGoal(g.key)}
            className={`rounded-comfortable px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
              activeGoal === g.key
                ? 'bg-midnight text-white'
                : 'card-light text-black/60 hover:text-black'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map(({ cat, count }) => (
          <CategoryCard key={cat.id} category={cat} count={count} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-[14px] text-black/40">
          No categories found for this goal.
        </p>
      )}
    </>
  )
}
