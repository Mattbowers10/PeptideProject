'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { getInteraction, type InteractionType } from '@/lib/peptideInteractions'

const TIER_RANK: Record<string, number> = { free: 0, researcher: 1, pro: 2, clinic: 3 }

type PeptideEntry = {
  id: number
  name: string
  slug: string
  summary?: string
  researchStatus?: string
  halfLife?: string
  molecularFormula?: string
  administrationRoutes?: { route: string }[]
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  approved:     { label: 'FDA Approved',   color: 'text-emerald-600 bg-emerald-50' },
  human:        { label: 'Human Trials',   color: 'text-blue-600 bg-blue-50' },
  preclinical:  { label: 'Preclinical',    color: 'text-amber-600 bg-amber-50' },
  experimental: { label: 'Experimental',   color: 'text-orange-600 bg-orange-50' },
  discontinued: { label: 'Discontinued',   color: 'text-gray-500 bg-gray-100' },
}

const INTERACTION_BADGE: Record<InteractionType, { bg: string; text: string }> = {
  synergistic: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  additive:    { bg: 'bg-blue-50',    text: 'text-blue-700' },
  neutral:     { bg: 'bg-gray-100',   text: 'text-gray-500' },
  caution:     { bg: 'bg-amber-50',   text: 'text-amber-700' },
  antagonistic:{ bg: 'bg-red-50',     text: 'text-red-700' },
}

const ROUTE_LABELS: Record<string, string> = {
  subcutaneous: 'SQ', intramuscular: 'IM', intravenous: 'IV',
  oral: 'Oral', intranasal: 'IN', transdermal: 'TD',
  topical: 'Top', sublingual: 'SL',
}

export function StackBuilderClient() {
  const { user, loading } = useAuth()
  const [stack, setStack] = useState<PeptideEntry[]>([])
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<PeptideEntry[]>([])
  const [searching, setSearching] = useState(false)

  const tier = user?.membershipTier ?? 'free'
  const isPro = TIER_RANK[tier] >= 2

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.length < 2) { setSuggestions([]); return }
    const t = setTimeout(async () => {
      setSearching(true)
      try {
        const res = await fetch(`/api/peptides/index`)
        const data = await res.json()
        const q = query.toLowerCase()
        const matches = (data.peptides ?? [])
          .filter((p: PeptideEntry) => p.name.toLowerCase().includes(q) && !stack.find(s => s.id === p.id))
          .slice(0, 6)
        setSuggestions(matches)
      } catch { setSuggestions([]) }
      finally { setSearching(false) }
    }, 250)
    return () => clearTimeout(t)
  }, [query, stack])

  function addPeptide(p: PeptideEntry) {
    if (stack.length >= 6) return
    if (stack.find(s => s.id === p.id)) return
    setStack(prev => [...prev, p])
    setQuery('')
    setSuggestions([])
  }

  function removePeptide(id: number) {
    setStack(prev => prev.filter(p => p.id !== id))
  }

  if (loading) {
    return <div className="h-64 animate-pulse rounded-comfortable bg-black/[0.03]" />
  }

  if (!isPro) {
    return (
      <div className="rounded-comfortable border p-10 text-center" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lavender/10">
          <svg className="h-7 w-7 text-lavender" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.575 1.57a1.5 1.5 0 01-1.087.43H6.862a1.5 1.5 0 01-1.088-.43L4.2 15M19.8 15l1.2 1.2a2.25 2.25 0 010 3.182l-.6.6a2.25 2.25 0 01-3.182 0l-1.2-1.2M4.2 15l-1.2 1.2a2.25 2.25 0 000 3.182l.6.6a2.25 2.25 0 003.182 0l1.2-1.2" />
          </svg>
        </div>
        <p className="text-[18px] font-medium tracking-heading text-black">Stack Builder — Pro Plan</p>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-[1.6] text-black/50">
          Build, compare, and save multi-peptide research stacks. Available on the Pro / Practitioner plan and above.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/upgrade?highlight=pro" className="btn-dark text-[14px]">
            Unlock with Pro →
          </Link>
          <Link href="/peptides" className="btn-outline text-[14px]">
            Browse peptides
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3 text-left max-w-lg mx-auto">
          {[
            { icon: '⚗️', label: 'Up to 6 peptides per stack' },
            { icon: '📊', label: 'Side-by-side mechanism & PK data' },
            { icon: '🔄', label: 'Route compatibility at a glance' },
          ].map(f => (
            <div key={f.label} className="rounded-comfortable bg-black/[0.02] p-3">
              <span className="text-[18px]">{f.icon}</span>
              <p className="mt-1 text-[12px] text-black/55">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add peptide search */}
      <div className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={stack.length >= 6 ? 'Stack is full (6 max)' : 'Search and add a peptide to your stack…'}
            disabled={stack.length >= 6}
            className="flex-1 rounded-sharp border bg-white px-4 py-3 text-[14px] tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/40 disabled:opacity-50"
            style={{ borderColor: 'var(--border-light)' }}
          />
          {stack.length > 0 && (
            <button onClick={() => setStack([])} className="btn-outline shrink-0 text-[13px]">
              Clear stack
            </button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-comfortable border bg-white shadow-lg" style={{ borderColor: 'var(--border-light)' }}>
            {searching && <p className="px-4 py-2 text-[13px] text-black/40">Searching…</p>}
            {suggestions.map(p => (
              <button
                key={p.id}
                onClick={() => addPeptide(p)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[14px] text-black/80 transition-colors hover:bg-lavender/5 hover:text-black"
              >
                <span>{p.name}</span>
                <span className="font-mono text-[11px] text-black/30">+ Add</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stack counter */}
      <div className="flex items-center justify-between">
        <p className="mono-label text-black/30">{stack.length} / 6 peptides in stack</p>
        {stack.length >= 2 && (
          <Link
            href={`/compare?a=${stack[0]?.slug}&b=${stack[1]?.slug}`}
            className="btn-outline text-[12px]"
          >
            Compare first two →
          </Link>
        )}
      </div>

      {stack.length === 0 ? (
        <div className="rounded-comfortable border py-16 text-center" style={{ borderColor: 'var(--border-light)' }}>
          <p className="text-[14px] text-black/40">
            Search for peptides above to build your stack.
          </p>
          <p className="mt-1 font-mono text-[12px] text-black/25">
            Combine up to 6 compounds to view their profiles side by side.
          </p>
        </div>
      ) : (
        /* Stack grid */
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map(p => {
            const status = STATUS_LABELS[p.researchStatus ?? '']
            const routes = (p.administrationRoutes ?? []).map(r => ROUTE_LABELS[r.route] ?? r.route).slice(0, 3)
            return (
              <div key={p.id} className="relative rounded-comfortable border bg-white p-5" style={{ borderColor: 'var(--border-light)' }}>
                <button
                  onClick={() => removePeptide(p.id)}
                  className="absolute right-3 top-3 rounded px-1.5 py-0.5 font-mono text-[10px] tracking-mono text-black/25 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  ✕
                </button>

                <Link href={`/peptides/${p.slug}`} className="block pr-6">
                  <p className="text-[15px] font-medium tracking-subheading text-black hover:text-lavender transition-colors">
                    {p.name}
                  </p>
                </Link>

                {status && (
                  <span className={`mt-2 inline-block rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono ${status.color}`}>
                    {status.label}
                  </span>
                )}

                <dl className="mt-3 space-y-2">
                  {p.halfLife && (
                    <div className="flex justify-between text-[12px]">
                      <dt className="font-mono text-black/35">Half-life</dt>
                      <dd className="text-right text-black/70">{p.halfLife}</dd>
                    </div>
                  )}
                  {p.molecularFormula && (
                    <div className="flex justify-between text-[12px]">
                      <dt className="font-mono text-black/35">Formula</dt>
                      <dd className="text-right font-mono text-black/70">{p.molecularFormula}</dd>
                    </div>
                  )}
                  {routes.length > 0 && (
                    <div className="flex items-start justify-between text-[12px]">
                      <dt className="font-mono text-black/35">Routes</dt>
                      <dd className="flex flex-wrap justify-end gap-1">
                        {routes.map(r => (
                          <span key={r} className="rounded-sharp bg-black/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-black/50">{r}</span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>

                {p.summary && (
                  <p className="mt-3 line-clamp-2 text-[12px] leading-[1.5] text-black/45">
                    {p.summary}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Interaction Matrix */}
      {stack.length >= 2 && (() => {
        const pairs: Array<{ a: PeptideEntry; b: PeptideEntry }> = []
        for (let i = 0; i < stack.length; i++) {
          for (let j = i + 1; j < stack.length; j++) {
            pairs.push({ a: stack[i]!, b: stack[j]! })
          }
        }
        return (
          <div className="rounded-comfortable border p-5" style={{ borderColor: 'var(--border-light)' }}>
            <p className="mono-label text-black/40 mb-4">Interaction Overview</p>
            <div className="space-y-3">
              {pairs.map(({ a, b }) => {
                const ix = getInteraction(a.slug, b.slug)
                const badge = ix ? INTERACTION_BADGE[ix.type] : null
                return (
                  <div key={`${a.id}-${b.id}`} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-medium text-black/70">
                        {a.name} <span className="text-black/30">+</span> {b.name}
                      </span>
                      {badge ? (
                        <span
                          className={`inline-block rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono capitalize ${badge.bg} ${badge.text}`}
                        >
                          {ix!.type}
                        </span>
                      ) : (
                        <span className="inline-block rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono bg-gray-100 text-gray-400">
                          No data
                        </span>
                      )}
                    </div>
                    {ix && (
                      <p className="text-[12px] leading-[1.5] text-black/45 pl-0">{ix.summary}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {/* Research disclaimer */}
      <p className="font-mono text-[11px] tracking-mono text-black/25 text-center">
        For research purposes only. This tool does not constitute medical advice.
      </p>
    </div>
  )
}
