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

export function ActivityTab() {
  const [items, setItems] = useState<ViewedPeptide[]>([])

  useEffect(() => {
    setItems(getRecent())
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">
          Research Activity
        </h1>
        <p className="mt-1 text-[14px] text-black/50">
          Your recently viewed peptides, stored locally on this device.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="card-light p-10 text-center">
          <p className="text-[16px] font-medium tracking-heading text-black">
            No activity yet
          </p>
          <p className="mt-2 text-[13px] text-black/40">
            Start browsing peptide profiles to build your research history.
          </p>
          <Link href="/peptides" className="btn-dark mt-5">
            Browse Peptides
          </Link>
        </div>
      ) : (
        <>
          {/* Stats bar */}
          <div className="rounded-comfortable bg-midnight p-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="mono-label-sm text-white/30">Peptides viewed</p>
                <p className="mt-1 text-[28px] font-medium tracking-display text-white">
                  {items.length}
                </p>
              </div>
              <div>
                <p className="mono-label-sm text-white/30">Most recent</p>
                <p className="mt-1 text-[14px] tracking-tight text-white/70">
                  {formatRelativeTime(items[0].viewedAt)}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="mono-label-sm text-white/30">Storage</p>
                <p className="mt-1 text-[14px] tracking-tight text-white/70">
                  Local device only
                </p>
              </div>
            </div>
          </div>

          {/* Activity list */}
          <div className="card-light">
            <div className="p-4 pb-0">
              <p className="mono-label text-black/30">Viewing history</p>
            </div>
            <div className="p-2">
              {items.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/peptides/${item.slug}`}
                  className="flex items-center justify-between rounded-sharp px-3 py-3 transition-colors hover:bg-black/[0.03]"
                  style={i < items.length - 1 ? { borderBottom: '1px solid var(--border-light)' } : {}}
                >
                  <div>
                    <p className="text-[14px] font-medium tracking-tight text-black">
                      {item.name}
                    </p>
                    <p className="mono-label-sm mt-0.5 text-black/30">
                      /peptides/{item.slug}
                    </p>
                  </div>
                  <span className="mono-label-sm shrink-0 text-black/30">
                    {formatRelativeTime(item.viewedAt)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Clear button */}
          <button
            onClick={() => {
              localStorage.removeItem('pw_recently_viewed')
              setItems([])
            }}
            className="btn-outline text-[13px] text-black/50"
          >
            Clear history
          </button>
        </>
      )}
    </div>
  )
}
