'use client'

import React, { useState } from 'react'

type Variant = 'homepage' | 'dark'

export function EmailCapture({
  variant = 'homepage',
  source = 'homepage',
  peptideSlug,
  heading,
  subheading,
  leadMagnet = false,
}: {
  variant?: Variant
  source?: string
  peptideSlug?: string
  heading?: string
  subheading?: string
  leadMagnet?: boolean
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Resolve effective values based on leadMagnet mode
  const effectiveSource = leadMagnet ? 'lead-magnet' : source
  const effectiveHeading = heading ?? (leadMagnet ? 'Get the free research guide' : 'Stay updated on peptide research.')
  const effectiveSubheading = subheading ?? (leadMagnet
    ? '10 Most Researched Peptides — free PDF guide for researchers.'
    : 'New profiles, synced PubMed studies, and research summaries — delivered free.')
  const buttonText = leadMagnet ? 'Download free guide' : 'Get updates'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: effectiveSource, peptideSlug }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  const isDark = variant === 'dark'

  if (status === 'success') {
    if (leadMagnet) {
      return (
        <div className="space-y-3">
          <p className={`text-emerald-500 text-[14px]`}>✓ Done! Your guide is ready.</p>
          <a
            href="/guide"
            target="_blank"
            className={`btn-dark inline-flex items-center gap-2 text-[13px]`}
          >
            Read the guide →
          </a>
          <p className={`text-[11px] mt-1 ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Opens in a new tab · Print or save as PDF
          </p>
        </div>
      )
    }
    return (
      <div className={`text-center py-2 ${isDark ? 'text-white/70' : 'text-black/60'}`}>
        <span className="text-emerald-500 mr-2">✓</span>
        You&apos;re on the list. We&apos;ll be in touch.
      </div>
    )
  }

  return (
    <div>
      {effectiveHeading && (
        <p className={`text-[18px] font-medium tracking-heading mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
          {effectiveHeading}
        </p>
      )}
      {effectiveSubheading && (
        <p className={`text-[14px] mb-4 ${isDark ? 'text-white/50' : 'text-black/50'}`}>
          {effectiveSubheading}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className={`flex-1 rounded-sharp border px-4 py-2.5 text-[14px] tracking-tight focus:outline-none focus:ring-2 ${
            isDark
              ? 'bg-white/[0.06] border-white/10 text-white placeholder:text-white/30 focus:ring-lavender/40'
              : 'bg-white border-black/10 text-black placeholder:text-black/30 focus:ring-lavender/40'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-dark shrink-0 disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing…' : buttonText}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-[13px] text-red-400">{errorMsg}</p>
      )}
      <p className={`mt-2 text-[11px] ${isDark ? 'text-white/20' : 'text-black/30'}`}>
        No spam. Unsubscribe any time.
      </p>
    </div>
  )
}
