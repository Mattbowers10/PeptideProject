'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { PeptideIndexItem } from '@/app/api/peptides/index/route'

const STATUS_LABEL: Record<string, string> = {
  preclinical: 'Preclinical',
  phase1: 'Phase I',
  phase2: 'Phase II',
  phase3: 'Phase III',
  approved: 'Approved',
  discontinued: 'Discontinued',
}

function score(item: PeptideIndexItem, q: string): number {
  const lq = q.toLowerCase()
  if (item.name.toLowerCase() === lq) return 100
  if (item.name.toLowerCase().startsWith(lq)) return 80
  if (item.name.toLowerCase().includes(lq)) return 60
  if (item.aliases.some((a) => a.toLowerCase().includes(lq))) return 40
  if (item.summary.toLowerCase().includes(lq)) return 20
  return 0
}

type Props = {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<PeptideIndexItem[]>([])
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Fetch index once on mount
  useEffect(() => {
    fetch('/api/peptides/index')
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => {})
  }, [])

  // Esc to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const results = query.trim()
    ? index
        .map((item) => ({ item, s: score(item, query.trim()) }))
        .filter(({ s }) => s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 8)
        .map(({ item }) => item)
    : index.slice(0, 6)

  const navigate = useCallback(
    (slug: string) => {
      onClose()
      router.push(`/peptides/${slug}`)
    },
    [router, onClose],
  )

  // Keyboard navigation within results
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((v) => Math.min(v + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((v) => Math.max(v - 1, 0))
    } else if (e.key === 'Enter' && results[selected]) {
      navigate(results[selected].slug)
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-sharp bg-midnight shadow-2xl"
        style={{ border: '1px solid rgba(255,255,255,0.10)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <svg
            className="h-4 w-4 shrink-0 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(0)
            }}
            onKeyDown={handleKey}
            placeholder="Search peptides…"
            className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/30 focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('')
                setSelected(0)
                inputRef.current?.focus()
              }}
              className="text-white/30 transition-colors hover:text-white/60"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[10px] text-white/30 sm:block">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && query ? (
            <p className="px-4 py-6 text-center font-mono text-[12px] text-white/30">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map((item, i) => (
              <button
                key={item.slug}
                data-idx={i}
                onClick={() => navigate(item.slug)}
                onMouseEnter={() => setSelected(i)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  i === selected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium tracking-tight text-white">
                    {item.name}
                  </p>
                  {item.summary && (
                    <p className="mt-0.5 truncate text-[11px] text-white/40">{item.summary}</p>
                  )}
                </div>
                {item.status && (
                  <span className="shrink-0 rounded-sharp bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] tracking-mono text-white/30">
                    {STATUS_LABEL[item.status] ?? item.status}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] text-white/20">
            <span>
              <kbd className="mr-1 rounded bg-white/[0.06] px-1 py-0.5">↑↓</kbd>navigate
            </span>
            <span>
              <kbd className="mr-1 rounded bg-white/[0.06] px-1 py-0.5">↵</kbd>open
            </span>
            <span>
              <kbd className="mr-1 rounded bg-white/[0.06] px-1 py-0.5">esc</kbd>close
            </span>
          </div>
          <a
            href={`/peptides${query ? `?q=${encodeURIComponent(query)}` : ''}`}
            className="font-mono text-[10px] text-white/30 transition-colors hover:text-white/60"
            onClick={onClose}
          >
            {query ? 'See all results →' : 'Browse all →'}
          </a>
        </div>
      </div>
    </div>
  )
}
