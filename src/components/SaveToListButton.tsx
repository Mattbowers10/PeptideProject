'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/useAuth'

type PeptideList = { id: number; name: string; peptides?: (number | { id: number })[] }

export function SaveToListButton({ peptideId }: { peptideId: number }) {
  const { user, loading } = useAuth()
  const [lists, setLists] = useState<PeptideList[]>([])
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saving'>('idle')

  const canSave = user?.membershipTier && ['researcher', 'pro', 'clinic'].includes(user.membershipTier)

  useEffect(() => {
    if (open && canSave) {
      fetch('/api/lists').then(r => r.json()).then(d => setLists(d.lists ?? []))
    }
  }, [open, canSave])

  async function addToList(listId: number) {
    setStatus('saving')
    const list = lists.find(l => l.id === listId)
    const existing = (list?.peptides ?? []).map(p => typeof p === 'object' ? p.id : p)
    if (existing.includes(peptideId)) { setOpen(false); setStatus('idle'); return }
    const updated = [...existing, peptideId]
    await fetch(`/api/lists/${listId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peptides: updated }),
    })
    setOpen(false)
    setStatus('idle')
  }

  if (loading || !user) return null
  if (!canSave) return null  // don't show to free users (they see upgrade via PaywallGate)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="btn-glass text-[12px]"
      >
        + Save to list
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 min-w-[180px] rounded-comfortable border bg-midnight/95 py-1 shadow-lg backdrop-blur-sm" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {lists.length === 0 ? (
            <p className="px-4 py-2 text-[12px] text-white/40">No lists yet — create one in your dashboard.</p>
          ) : (
            lists.map(list => (
              <button
                key={list.id}
                onClick={() => addToList(list.id)}
                disabled={status === 'saving'}
                className="w-full px-4 py-2 text-left text-[13px] text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                {list.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
