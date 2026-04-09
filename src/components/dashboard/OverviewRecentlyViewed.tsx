'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatRelativeTime } from '@/lib/format'

type ViewedPeptide = { slug: string; name: string; viewedAt: number }

function getRecent(): ViewedPeptide[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('pw_recently_viewed') ?? '[]')
  } catch {
    return []
  }
}

export function OverviewRecentlyViewed() {
  const [items, setItems] = useState<ViewedPeptide[]>([])

  useEffect(() => {
    setItems(getRecent())
  }, [])

  if (items.length === 0) {
    return (
      <section className="card-light p-6">
        <p className="mono-label mb-2 text-black/30">Recent research</p>
        <p className="text-[14px] text-black/40">
          No recently viewed peptides yet. Start browsing to build your history.
        </p>
        <Link href="/peptides" className="btn-outline mt-4 text-[13px]">
          Browse Peptides
        </Link>
      </section>
    )
  }

  return (
    <section className="card-light p-6">
      <p className="mono-label mb-4 text-black/30">Continue your research</p>
      <div className="space-y-0">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/peptides/${item.slug}`}
            className="rule flex items-center justify-between py-3 transition-colors hover:bg-black/[0.02] -mx-2 px-2 rounded-sharp"
          >
            <span className="text-[14px] font-medium tracking-tight text-black">
              {item.name}
            </span>
            <span className="mono-label-sm text-black/30">
              {formatRelativeTime(item.viewedAt)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
