import React from 'react'
import Link from 'next/link'
import type { Category } from '@/payload-types'

type Props = { category: Category; count?: number }

export function CategoryCard({ category, count }: Props) {
  return (
    <Link
      href={`/peptides?category=${category.slug}`}
      className="card-light group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-warm"
    >
      <span className="mono-label mb-3 text-black/30">
        {category.icon && <span className="mr-1">{category.icon}</span>}
        {count !== undefined && `${count} peptides`}
      </span>

      <h3 className="text-base font-medium tracking-subheading text-black transition-colors group-hover:text-midnight">
        {category.name}
      </h3>

      {category.description && (
        <p className="mt-1.5 text-[13px] leading-[1.5] text-black/50 line-clamp-2">
          {category.description}
        </p>
      )}
    </Link>
  )
}
