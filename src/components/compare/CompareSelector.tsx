'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

type PeptideOption = { slug: string; name: string }

export function CompareSelector({
  peptides,
  slugA,
  slugB,
}: {
  peptides: PeptideOption[]
  slugA: string
  slugB: string
}) {
  const router = useRouter()

  function navigate(a: string, b: string) {
    const params = new URLSearchParams()
    if (a) params.set('a', a)
    if (b) params.set('b', b)
    router.push(`/compare?${params.toString()}`)
  }

  function handleSwap() {
    navigate(slugB, slugA)
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Peptide A */}
      <div className="flex-1 w-full">
        <label className="mono-label mb-1.5 block text-white/30">Peptide A</label>
        <select
          value={slugA}
          onChange={(e) => navigate(e.target.value, slugB)}
          className="w-full rounded-comfortable border bg-white/[0.06] py-2.5 px-3 text-[14px] text-white focus:outline-none focus:bg-white/[0.1] transition-colors"
          style={{ borderColor: 'var(--border-dark)' }}
        >
          <option value="" disabled>
            Choose a peptide…
          </option>
          {peptides.map((p) => (
            <option key={p.slug} value={p.slug} className="bg-midnight">
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Swap button */}
      <button
        onClick={handleSwap}
        disabled={!slugA || !slugB}
        className="mt-5 hidden shrink-0 rounded-comfortable border p-2.5 text-white/50 transition-colors hover:text-white hover:bg-white/10 disabled:opacity-30 sm:block"
        style={{ borderColor: 'var(--border-dark)' }}
        title="Swap peptides"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 16V4m0 0L3 8m4-4l4 4" />
          <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </button>

      {/* Peptide B */}
      <div className="flex-1 w-full">
        <label className="mono-label mb-1.5 block text-white/30">Peptide B</label>
        <select
          value={slugB}
          onChange={(e) => navigate(slugA, e.target.value)}
          className="w-full rounded-comfortable border bg-white/[0.06] py-2.5 px-3 text-[14px] text-white focus:outline-none focus:bg-white/[0.1] transition-colors"
          style={{ borderColor: 'var(--border-dark)' }}
        >
          <option value="" disabled>
            Choose a peptide…
          </option>
          {peptides.map((p) => (
            <option key={p.slug} value={p.slug} className="bg-midnight">
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile swap */}
      <button
        onClick={handleSwap}
        disabled={!slugA || !slugB}
        className="sm:hidden flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 disabled:opacity-30 transition-colors"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 16V4m0 0L3 8m4-4l4 4" />
          <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
        Swap
      </button>
    </div>
  )
}
