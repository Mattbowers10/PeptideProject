'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'

export type Tier = 'free' | 'researcher' | 'pro' | 'clinic'

export const TIER_RANK: Record<Tier, number> = { free: 0, researcher: 1, pro: 2, clinic: 3 }

const TIER_LABEL: Record<Tier, string> = {
  free: 'Free',
  researcher: 'Researcher',
  pro: 'Pro',
  clinic: 'Clinic',
}

function PaywallGateInner({
  minTier,
  children,
  title,
  description,
}: {
  minTier: Tier
  children: React.ReactNode
  title: string
  description: string
}) {
  const searchParams = useSearchParams()
  const { user, loading } = useAuth()

  // Determine effective tier:
  // 1. ?tier= URL param overrides (dev/preview convenience)
  // 2. Real user session
  // 3. Default to 'free'
  const urlTierParam = searchParams.get('tier') as Tier | null
  const effectiveTier: Tier = urlTierParam ?? (user?.membershipTier as Tier) ?? 'free'

  const hasAccess = TIER_RANK[effectiveTier] >= TIER_RANK[minTier]

  // While auth is resolving, show nothing to avoid flash
  if (loading) {
    return <div className="h-40 rounded-comfortable bg-white/5 animate-pulse" />
  }

  if (hasAccess) return <>{children}</>

  return (
    <div className="relative overflow-hidden rounded-comfortable">
      {/* Blurred preview */}
      <div className="pointer-events-none select-none blur-sm opacity-40 px-6 py-4 bg-white/5">
        <p className="text-[14px] leading-[1.6] text-white/50">
          {description.slice(0, 180)}…
        </p>
        <p className="mt-3 text-[14px] leading-[1.6] text-white/40">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan
          eros in sem dignissim, ac facilisis purus molestie. Praesent dictum augue vel
          mi posuere, in vehicula risus ultrices.
        </p>
      </div>

      {/* Lock gate — centered overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-midnight/80 backdrop-blur-[2px] px-6 text-center">
        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <svg
            className="h-5 w-5 text-lavender"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p className="text-[15px] font-medium text-white">{title}</p>
        <p className="mt-1 max-w-xs text-[13px] text-white/50">
          Available on the {TIER_LABEL[minTier]} plan and above.
        </p>
        {user ? (
          <Link
            href={`/upgrade?highlight=${minTier}`}
            className="btn-dark mt-4 text-[13px]"
          >
            Unlock with {TIER_LABEL[minTier]} →
          </Link>
        ) : (
          <div className="mt-4 flex gap-2">
            <Link href="/login" className="btn-glass text-[13px]">
              Sign in
            </Link>
            <Link href="/register" className="btn-dark text-[13px]">
              Create account
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export function PaywallGate({
  minTier = 'researcher',
  children,
  title = 'Researcher Access Required',
  description = '',
}: {
  minTier?: Tier
  children: React.ReactNode
  title?: string
  description?: string
}) {
  return (
    <Suspense
      fallback={
        <div className="h-40 rounded-comfortable bg-white/5 animate-pulse" />
      }
    >
      <PaywallGateInner minTier={minTier} title={title} description={description}>
        {children}
      </PaywallGateInner>
    </Suspense>
  )
}
