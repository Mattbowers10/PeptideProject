import React from 'react'
import Link from 'next/link'
import type { Category } from '@/payload-types'

type Props = { category: Category; count?: number }

export function GoalCard({ category, count }: Props) {
  return (
    <Link
      href={`/peptides?category=${category.slug}`}
      className="card-light group flex flex-col p-6 transition-all hover:shadow-blue-lg"
    >
      {/* Icon */}
      {category.icon && (
        <span className="mb-4 block text-[36px] leading-none">{category.icon}</span>
      )}

      {/* Goal name */}
      <h3 className="text-[17px] font-medium tracking-subheading text-black transition-colors group-hover:text-midnight">
        {category.name}
      </h3>

      {/* Description */}
      {category.description && (
        <p className="mt-2 flex-1 text-[13px] leading-[1.55] text-black/50 line-clamp-3">
          {category.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        {count !== undefined ? (
          <span className="mono-label text-black/30">{count} peptides</span>
        ) : (
          <span />
        )}
        <span className="text-[13px] tracking-tight text-black/30 transition-colors group-hover:text-midnight">
          Explore →
        </span>
      </div>
    </Link>
  )
}
