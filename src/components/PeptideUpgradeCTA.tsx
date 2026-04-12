'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { TIER_RANK } from './PaywallGate'
import type { Tier } from './PaywallGate'

/**
 * Sidebar upgrade CTA on peptide profile pages.
 * Only renders if the current user's tier is below `minTier`.
 * Hides itself for users who already have sufficient access.
 */
export function PeptideUpgradeCTA({ minTier = 'researcher' }: { minTier?: Tier }) {
  const { user, loading } = useAuth()

  // While resolving, render nothing (avoids flash)
  if (loading) return null

  const userTier = (user?.membershipTier as Tier | undefined) ?? 'free'
  const hasAccess = TIER_RANK[userTier] >= TIER_RANK[minTier]

  // Already unlocked — no need to show the CTA
  if (hasAccess) return null

  return (
    <div className="card-dark border-lavender/20 p-5">
      <p className="mono-label mb-2 text-lavender/60">Unlock Full Profile</p>
      <p className="mb-4 text-[13px] leading-[1.6] text-white/50">
        Mechanism of action, pharmacokinetics, research findings, and safety data are
        available on the Researcher plan.
      </p>
      {user ? (
        <Link href="/upgrade" className="btn-dark w-full justify-center text-[13px]">
          Unlock with Researcher →
        </Link>
      ) : (
        <div className="flex flex-col gap-2">
          <Link href="/register" className="btn-dark w-full justify-center text-[13px]">
            Create free account
          </Link>
          <Link href="/login" className="btn-glass w-full justify-center text-[13px]">
            Sign in
          </Link>
        </div>
      )}
    </div>
  )
}
