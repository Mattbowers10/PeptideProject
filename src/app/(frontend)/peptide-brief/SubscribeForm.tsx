'use client'

import React, { useState } from 'react'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type State = 'idle' | 'loading' | 'success' | 'error'

export function SubscribeForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setState('loading')
    setError('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'lead-magnet' }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setState('error')
      } else {
        setState('success')
      }
    } catch {
      setError('Network error — please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex items-center gap-3 py-3">
        <CheckCircle className="w-5 h-5 shrink-0" style={{ color: '#22c55e' }} />
        <p className={`text-sm font-medium ${variant === 'dark' ? 'text-white' : 'text-[#1E1511]'}`}>
          You&apos;re in. Check your inbox for a welcome message.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={`flex-1 min-w-0 px-4 py-3 text-sm rounded border outline-none transition-all
            focus:ring-2 focus:ring-[#E8622A]/30 focus:border-[#E8622A]
            ${variant === 'dark'
              ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50'
              : 'bg-white border-[rgba(30,21,17,0.15)] text-[#1E1511] placeholder:text-[#B8A396]'
            }`}
          disabled={state === 'loading'}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-dark flex items-center gap-2 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '12px', paddingBottom: '12px' }}
        >
          {state === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Subscribe Free</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
      {state === 'error' && (
        <p className="flex items-center gap-1.5 mt-2 text-xs text-red-600">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </form>
  )
}
