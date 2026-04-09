'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.token) {
        router.push(redirect)
        router.refresh()
      } else {
        setStatus('error')
        setErrorMsg(data.errors?.[0]?.message ?? data.message ?? 'Invalid email or password.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mono-label mb-2 text-black/30">Account access</p>
          <h1 className="text-[28px] font-medium tracking-heading text-black">Sign in</h1>
          <p className="mt-2 text-[14px] text-black/50">
            Access your research dashboard and full peptide profiles.
          </p>
        </div>

        {/* Form */}
        <div className="card-light p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mono-label mb-1.5 block text-black/40"
              >
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
              <label
                htmlFor="password"
                className="mono-label mb-1.5 block text-black/40"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
              {status === 'loading' ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="mt-5 space-y-2 text-center text-[13px] text-black/40">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-black underline underline-offset-2 hover:text-black/70">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
