'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { getUserInitials } from '@/lib/auth'

export function UserNav() {
  const { user, loading } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  async function handleSignOut() {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    })
    router.push('/')
    router.refresh()
  }

  // While loading — show nothing to avoid layout shift
  if (loading) return null

  // Not logged in — show Sign in button
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="btn-glass py-1.5 px-3 text-sm">
          Sign in
        </Link>
      </div>
    )
  }

  // Logged in — show avatar + dropdown
  const initials = getUserInitials(user)
  const tierLabel = user.membershipTier === 'free'
    ? 'Free'
    : user.membershipTier === 'researcher'
    ? 'Researcher'
    : 'Pro'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-sharp px-2 py-1 transition-colors hover:bg-white/[0.08]"
        aria-expanded={open}
        aria-label="Account menu"
      >
        {/* Avatar */}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lavender/30 text-[11px] font-medium text-white">
          {initials}
        </span>
        <span className="hidden text-[13px] tracking-tight text-white/70 md:block">
          {user.name ?? user.email.split('@')[0]}
        </span>
        <svg
          className={`hidden h-3 w-3 text-white/40 transition-transform md:block ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 w-52 rounded-comfortable border bg-midnight shadow-xl"
          style={{ borderColor: 'rgba(255,255,255,0.10)' }}
        >
          {/* User info */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[13px] font-medium text-white">
              {user.name ?? 'Account'}
            </p>
            <p className="mt-0.5 text-[11px] text-white/40 truncate">{user.email}</p>
            <span className="mt-1.5 inline-block rounded-sharp bg-lavender/20 px-1.5 py-0.5 font-mono text-[10px] tracking-mono text-lavender">
              {tierLabel}
            </span>
          </div>

          {/* Links */}
          <div className="p-1.5">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-sharp px-3 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/dashboard?tab=profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-sharp px-3 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="8" r="4" />
                <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              Profile
            </Link>
            <Link
              href="/dashboard?tab=membership"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-sharp px-3 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" />
              </svg>
              Membership
            </Link>
          </div>

          {/* Sign out */}
          <div className="p-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-sharp px-3 py-2 text-[13px] text-white/40 transition-colors hover:bg-white/[0.06] hover:text-red-400"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
