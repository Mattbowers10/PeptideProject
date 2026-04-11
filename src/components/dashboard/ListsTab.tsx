'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { DashboardUser } from '@/lib/mock-user'

type Peptide = { id: number; name: string; slug: string }
type PeptideList = {
  id: number
  name: string
  notes?: string | null
  peptides?: (number | Peptide)[]
}

const TIER_RANK: Record<string, number> = { free: 0, researcher: 1, pro: 2, clinic: 3 }

export function ListsTab({ user }: { user: DashboardUser }) {
  const tier = user.membershipTier ?? 'free'
  const canUseLists = TIER_RANK[tier] >= 1 // researcher+

  const [lists, setLists] = useState<PeptideList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const fetchLists = useCallback(async () => {
    try {
      const res = await fetch('/api/lists')
      if (!res.ok) throw new Error('Failed to load lists')
      const data = await res.json()
      setLists(data.lists ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error loading lists')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (canUseLists) fetchLists()
    else setLoading(false)
  }, [canUseLists, fetchLists])

  async function createList(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    setCreating(true)
    try {
      const res = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to create list')
      setLists((prev) => [data.list, ...prev])
      setNewName('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setCreating(false)
    }
  }

  async function deleteList(id: number) {
    if (!confirm('Delete this list?')) return
    await fetch(`/api/lists/${id}`, { method: 'DELETE' })
    setLists((prev) => prev.filter((l) => l.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  async function removePeptide(listId: number, peptideId: number) {
    const list = lists.find((l) => l.id === listId)
    if (!list) return
    const currentIds = (list.peptides ?? []).map((p) => (typeof p === 'object' ? p.id : p)).filter((id) => id !== peptideId)
    const res = await fetch(`/api/lists/${listId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peptides: currentIds }),
    })
    if (res.ok) {
      const data = await res.json()
      setLists((prev) => prev.map((l) => (l.id === listId ? data.list : l)))
    }
  }

  const maxLists = tier === 'researcher' ? 25 : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">Research Lists</h1>
        <p className="mt-1 text-[14px] text-black/50">
          Save and organise peptides into named lists for your research workflow.
        </p>
      </div>

      {!canUseLists ? (
        /* Free user — upgrade gate */
        <div className="rounded-comfortable border p-8 text-center" style={{ borderColor: 'var(--border-light)' }}>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lavender/10">
            <svg className="h-6 w-6 text-lavender" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-[16px] font-medium text-black">Saved Lists — Researcher+</p>
          <p className="mt-2 text-[13px] text-black/50">
            Save up to 25 peptide lists on the Researcher plan, unlimited on Pro and Clinic.
          </p>
          <Link href="/upgrade" className="btn-dark mt-5 inline-flex text-[13px]">
            Unlock with Researcher →
          </Link>
        </div>
      ) : (
        <>
          {error && (
            <div className="rounded-comfortable border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
              {error}
            </div>
          )}

          {/* New list form */}
          <form onSubmit={createList} className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="List name (e.g. GH stack research)"
              maxLength={80}
              className="flex-1 rounded-sharp border bg-white px-3 py-2.5 text-[14px] tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/40"
              style={{ borderColor: 'var(--border-light)' }}
            />
            <button type="submit" disabled={creating || !newName.trim()} className="btn-dark shrink-0 text-[13px] disabled:opacity-50">
              {creating ? 'Creating…' : '+ New list'}
            </button>
          </form>

          {maxLists && (
            <p className="font-mono text-[11px] tracking-mono text-black/25">
              {lists.length} / {maxLists} lists used
              {lists.length >= maxLists && ' — upgrade to Pro for unlimited'}
            </p>
          )}

          {/* Lists */}
          {loading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => <div key={i} className="h-14 animate-pulse rounded-comfortable bg-black/[0.04]" />)}
            </div>
          ) : lists.length === 0 ? (
            <div className="rounded-comfortable border px-6 py-10 text-center" style={{ borderColor: 'var(--border-light)' }}>
              <p className="text-[13px] text-black/40">No lists yet. Create one above to start saving peptides.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lists.map((list) => {
                const peptides = (list.peptides ?? []).filter((p): p is Peptide => typeof p === 'object')
                const isExpanded = expandedId === list.id
                return (
                  <div key={list.id} className="rounded-comfortable border bg-white" style={{ borderColor: 'var(--border-light)' }}>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : list.id)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <div>
                        <p className="text-[14px] font-medium text-black">{list.name}</p>
                        <p className="mt-0.5 font-mono text-[11px] tracking-mono text-black/30">
                          {peptides.length} peptide{peptides.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteList(list.id) }}
                          className="rounded px-2 py-1 font-mono text-[10px] tracking-mono text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          Delete
                        </button>
                        <span className="text-black/30">{isExpanded ? '↑' : '↓'}</span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t px-5 pb-4 pt-3" style={{ borderColor: 'var(--border-light)' }}>
                        {peptides.length === 0 ? (
                          <p className="text-[13px] text-black/35">
                            No peptides saved yet.{' '}
                            <Link href="/peptides" className="underline underline-offset-2 hover:text-black/60">
                              Browse peptides →
                            </Link>
                          </p>
                        ) : (
                          <ul className="space-y-1.5">
                            {peptides.map((p) => (
                              <li key={p.id} className="flex items-center justify-between">
                                <Link
                                  href={`/peptides/${p.slug}`}
                                  className="text-[13px] text-black/70 underline-offset-2 hover:text-black hover:underline"
                                >
                                  {p.name}
                                </Link>
                                <button
                                  onClick={() => removePeptide(list.id, p.id)}
                                  className="font-mono text-[10px] tracking-mono text-black/25 transition-colors hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
