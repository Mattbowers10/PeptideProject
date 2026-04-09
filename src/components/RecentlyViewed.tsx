'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

type ViewedPeptide = { slug: string; name: string; viewedAt: number }

const STORAGE_KEY = 'pw_recently_viewed'
const MAX_ITEMS = 8

/** Read from localStorage */
function getRecent(): ViewedPeptide[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

/** Push a peptide view — deduplicates and caps at MAX_ITEMS */
export function recordView(slug: string, name: string) {
  const existing = getRecent().filter((p) => p.slug !== slug)
  const updated = [{ slug, name, viewedAt: Date.now() }, ...existing].slice(0, MAX_ITEMS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

/** Renders a horizontal strip of recently viewed peptides */
export function RecentlyViewed({ exclude }: { exclude?: string }) {
  const [items, setItems] = useState<ViewedPeptide[]>([])

  useEffect(() => {
    const recent = getRecent().filter((p) => p.slug !== exclude)
    setItems(recent)
  }, [exclude])

  if (items.length === 0) return null

  return (
    <section className="border-t py-6" style={{ borderColor: 'var(--border-light)' }}>
      <p className="mono-label mb-3 text-black/30">Continue your research</p>
      <div className="flex flex-wrap gap-2">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/peptides/${p.slug}`}
            className="btn-outline text-xs"
          >
            {p.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
