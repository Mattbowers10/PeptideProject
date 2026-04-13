'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { Peptide } from '@/payload-types'

const STATUS_LABEL: Record<string, string> = {
  preclinical:  'Preclinical',
  phase1:       'Phase I',
  phase2:       'Phase II',
  phase3:       'Phase III',
  approved:     'FDA Approved',
  discontinued: 'Discontinued',
}

/** Interval between auto-advances in ms. Must match the CSS animation duration. */
const CYCLE_MS = 5000

interface Props {
  peptides: Peptide[]
}

export function CompoundPanel({ peptides }: Props) {
  const [idx, setIdx]               = useState(0)
  const [visible, setVisible]       = useState(true)
  const [progressKey, setProgressKey] = useState(0)

  /**
   * Advance to a given index.
   * - Fades out current content
   * - Swaps compound + resets progress bar after 280ms
   * - Re-creating the interval is automatic: useEffect depends on `idx`
   */
  const advance = useCallback((next: number) => {
    setVisible(false)
    setTimeout(() => {
      setIdx(next)
      setProgressKey((k) => k + 1) // forces CSS animation restart
      setVisible(true)
    }, 280)
  }, [])

  // Auto-advance. Re-created whenever `idx` changes → also resets the 5s timer
  // after a manual dot click, because setIdx fires inside advance().
  useEffect(() => {
    if (peptides.length <= 1) return
    const t = setInterval(() => {
      advance((idx + 1) % peptides.length)
    }, CYCLE_MS)
    return () => clearInterval(t)
  }, [idx, peptides.length, advance])

  const compound = peptides[idx]
  if (!compound) return null

  const rows = [
    { label: 'HALF-LIFE',   value: compound.halfLife         ?? '—' },
    { label: 'MOL. WEIGHT', value: compound.molecularWeight  ?? '—' },
    { label: 'FORMULA',     value: compound.molecularFormula ?? '—' },
    { label: 'CAS',         value: compound.casNumber        ?? '—' },
  ]

  return (
    <div
      className="overflow-hidden rounded-comfortable backdrop-blur-xl"
      style={{
        background:  'rgba(255,255,255,0.62)',
        border:      '1px solid rgba(255,255,255,0.72)',
        boxShadow:   '0 8px 40px rgba(30,21,17,0.14), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      {/* ── Progress bar ── shows auto-advance timing, resets on compound change */}
      <div
        className="relative h-[2px] w-full overflow-hidden"
        style={{ background: 'rgba(30,21,17,0.07)' }}
      >
        {peptides.length > 1 && (
          <div
            key={progressKey}
            className="absolute inset-y-0 left-0 w-full origin-left"
            style={{
              background:  'var(--sunrise-500)',
              animation:   `panel-progress ${CYCLE_MS}ms linear forwards`,
            }}
          />
        )}
      </div>

      {/* ── Fading content ── */}
      <div
        className="transition-opacity duration-[280ms]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Record header */}
        <div
          className="border-b px-5 py-4"
          style={{ borderColor: 'rgba(30,21,17,0.08)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">
                Compound record
              </p>
              <p className="mt-1 text-[22px] font-medium tracking-tight text-black">
                {compound.name}
              </p>
            </div>
            <span
              className="mt-1 shrink-0 rounded px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em]"
              style={{ background: 'rgba(232,98,42,0.12)', color: 'var(--sunrise-500)' }}
            >
              {STATUS_LABEL[compound.researchStatus] ?? compound.researchStatus}
            </span>
          </div>
          {compound.summary && (
            <p className="mt-3 text-[12px] leading-[1.65] text-black/50 line-clamp-3">
              {compound.summary}
            </p>
          )}
        </div>

        {/* Key data rows */}
        <div className="divide-y" style={{ borderColor: 'rgba(30,21,17,0.07)' }}>
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-5 py-2.5"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/30">
                {row.label}
              </span>
              <span className="text-right font-mono text-[12px] tracking-tight text-black/60">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA + pagination dots — always visible ── */}
      <div
        className="border-t px-5 py-4"
        style={{ borderColor: 'rgba(30,21,17,0.08)' }}
      >
        <Link
          href={`/peptides/${compound.slug}`}
          className="btn-dark w-full justify-center text-[13px]"
        >
          View full profile →
        </Link>

        {peptides.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {peptides.map((p, i) => (
              <button
                key={i}
                onClick={() => { if (i !== idx) advance(i) }}
                aria-label={`View ${p.name}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width:      i === idx ? '18px' : '6px',
                  background: i === idx
                    ? 'var(--sunrise-500)'
                    : 'rgba(30,21,17,0.18)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
