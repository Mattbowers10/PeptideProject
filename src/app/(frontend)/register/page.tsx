'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        // Auto-login after registration
        const loginRes = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        })

        if (loginRes.ok) {
          router.push('/dashboard')
          router.refresh()
        } else {
          setStatus('success') // registered but not auto-logged in
        }
      } else {
        setStatus('error')
        const msg =
          data.errors?.[0]?.message ??
          data.message ??
          'Registration failed. Please try again.'
        setErrorMsg(msg)
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="card-light p-8">
            <p className="mb-2 text-3xl">✓</p>
            <h2 className="text-[20px] font-medium tracking-heading text-black">Account created</h2>
            <p className="mt-2 text-[14px] text-black/50">
              Your account is ready.{' '}
              <Link href="/login" className="text-black underline underline-offset-2">
                Sign in
              </Link>{' '}
              to access your dashboard.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mono-label mb-2 text-black/30">Free account</p>
          <h1 className="text-[28px] font-medium tracking-heading text-black">Create account</h1>
          <p className="mt-2 text-[14px] text-black/50">
            Free tier includes peptide summaries, research status, and category browsing.
          </p>
        </div>

        {/* Form */}
        <div className="card-light p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mono-label mb-1.5 block text-black/40">
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-sharp border bg-white px-3 py-2.5 text-[14px] text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
                style={{ borderColor: 'var(--border-light)' }}
              />
            </div>

            <div>
              <label htmlFor="email" className="mono-label mb-1.5 block text-black/40">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-sharp border bg-white px-3 py-2.5 text-[14px] text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
                style={{ borderColor: 'var(--border-light)' }}
              />
            </div>

            <div>
              <label htmlFor="password" className="mono-label mb-1.5 block text-black/40">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full rounded-sharp border bg-white px-3 py-2.5 text-[14px] text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
                style={{ borderColor: 'var(--border-light)' }}
              />
            </div>

            {status === 'error' && (
              <div className="rounded-sharp bg-red-50 px-3 py-2.5">
                <p className="text-[13px] text-red-600">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-dark w-full justify-center disabled:opacity-60"
            >
              {status === 'loading' ? 'Creating account…' : 'Create free account'}
            </button>
          </form>

          <p className="mt-4 text-center text-[12px] text-black/30">
            By creating an account you agree to our terms of service.
            No credit card required.
          </p>
        </div>

        {/* Footer links */}
        <div className="mt-5 text-center text-[13px] text-black/40">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-black underline underline-offset-2 hover:text-black/70">
              Sign in
            </Link>
          </p>
        </div>

        {/* Tier comparison teaser */}
        <div className="mt-8 card-light p-5">
          <p className="mono-label mb-3 text-black/30">What you get</p>
          <ul className="space-y-2">
            {[
              { label: 'Peptide summaries & research status', free: true },
              { label: 'Category browsing & search', free: true },
              { label: 'Recently viewed history', free: true },
              { label: 'Full mechanism profiles', free: false },
              { label: 'Pharmacokinetics data', free: false },
              { label: 'PubMed study links', free: false },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-[13px]">
                <span className={item.free ? 'text-emerald-500' : 'text-black/20'}>
                  {item.free ? '✓' : '—'}
                </span>
                <span className={item.free ? 'text-black/70' : 'text-black/30'}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/dashboard?tab=membership" className="btn-outline mt-4 w-full justify-center text-[13px]">
            View Researcher & Pro plans →
          </Link>
        </div>
      </div>
    </div>
  )
}
