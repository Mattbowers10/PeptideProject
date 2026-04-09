'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { DashboardUser } from '@/lib/mock-user'

export function ProfileTab({ user }: { user: DashboardUser }) {
  const router = useRouter()
  const [name, setName] = useState(user.name ?? '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Only wired for real users (id > 0 and not mock)
  const isMock = typeof user.id === 'number' && user.id <= 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isMock) {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2500)
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name }),
      })

      if (res.ok) {
        setStatus('success')
        router.refresh()
        setTimeout(() => setStatus('idle'), 2500)
      } else {
        const data = await res.json()
        setStatus('error')
        setErrorMsg(data.errors?.[0]?.message ?? 'Failed to save changes.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">Profile</h1>
        <p className="mt-1 text-[14px] text-black/50">
          Manage your account information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-light max-w-lg p-6">
        <p className="mono-label mb-5 text-black/30">Account details</p>

        {/* Name */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-1.5 block text-[13px] font-medium tracking-tight text-black/70"
          >
            Display Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-sharp border bg-white px-3 py-2.5 text-[14px] tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
            style={{ borderColor: 'var(--border-light)' }}
          />
        </div>

        {/* Email — read-only (changing email via Payload requires a separate verify flow) */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-1.5 block text-[13px] font-medium tracking-tight text-black/70"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className="w-full rounded-sharp border bg-black/[0.03] px-3 py-2.5 text-[14px] tracking-tight text-black/50 focus:outline-none"
            style={{ borderColor: 'var(--border-light)' }}
          />
          <p className="mt-1 text-[11px] text-black/30">
            Email changes require verification — contact support.
          </p>
        </div>

        {/* Membership tier (read-only) */}
        <div className="mb-6">
          <label className="mb-1.5 block text-[13px] font-medium tracking-tight text-black/70">
            Membership
          </label>
          <p className="text-[14px] capitalize text-black/50">
            {user.membershipTier === 'free'
              ? 'Free Explorer'
              : user.membershipTier === 'researcher'
              ? 'Researcher'
              : 'Pro'}
          </p>
        </div>

        {status === 'error' && (
          <div className="mb-4 rounded-sharp bg-red-50 px-3 py-2.5">
            <p className="text-[13px] text-red-600">{errorMsg}</p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-dark disabled:opacity-60"
          >
            {status === 'loading' ? 'Saving…' : 'Save changes'}
          </button>
          {status === 'success' && (
            <span className="text-[13px] text-emerald-600">✓ Changes saved</span>
          )}
        </div>
      </form>

      {/* Change password */}
      <div className="card-light max-w-lg p-6">
        <p className="mono-label mb-2 text-black/30">Security</p>
        <p className="mb-4 text-[13px] text-black/50">
          Use the link below to reset your password. We&apos;ll send a reset link to your email address.
        </p>
        <button
          type="button"
          onClick={async () => {
            await fetch('/api/users/forgot-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email }),
            })
            alert(`Password reset link sent to ${user.email}`)
          }}
          className="btn-outline text-[13px]"
        >
          Send password reset email
        </button>
      </div>
    </div>
  )
}
