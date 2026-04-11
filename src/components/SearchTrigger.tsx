'use client'

import React, { useState, useEffect } from 'react'
import { SearchModal } from './SearchModal'

export function SearchTrigger() {
  const [open, setOpen] = useState(false)

  // Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search peptides"
        className="hidden items-center gap-2 rounded-sharp border px-3 py-1.5 transition-colors hover:bg-white/[0.06] md:flex"
        style={{ borderColor: 'var(--border-dark)' }}
      >
        <svg
          className="h-3.5 w-3.5 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <span className="text-sm text-white/40">Search…</span>
        <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/25">
          ⌘K
        </kbd>
      </button>

      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
