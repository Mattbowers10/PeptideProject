import React from 'react'
import Link from 'next/link'
import type { DashboardUser } from '@/lib/mock-user'
import { formatDate } from '@/lib/format'
import { OverviewRecentlyViewed } from './OverviewRecentlyViewed'

const TIER_LABELS: Record<string, string> = {
  free: 'Free Explorer',
  researcher: 'Researcher',
  pro: 'Pro',
}

const TIER_COLORS: Record<string, string> = {
  free: 'bg-black/[0.06] text-black/60',
  researcher: 'bg-sky-100 text-sky-700',
  pro: 'bg-lavender/30 text-indigo-700',
}

export function OverviewTab({ user }: { user: DashboardUser }) {
  const tierLabel = TIER_LABELS[user.membershipTier] ?? user.membershipTier
  const tierColor = TIER_COLORS[user.membershipTier] ?? TIER_COLORS.free

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">
          Welcome back, {user.name?.split(' ')[0] || 'there'}
        </h1>
        <p className="mt-1 text-[14px] text-black/50">
          Your research dashboard — track activity and manage your account.
        </p>
      </div>

      {/* ── Dark stat cards ───────────────────────────────────── */}
      <section className="rounded-comfortable bg-midnight p-6">
        <p className="mono-label mb-4 text-white/30">Account snapshot</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {/* Membership tier */}
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Membership</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`inline-flex items-center rounded-sharp px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${tierColor}`}>
                {tierLabel}
              </span>
            </div>
            {user.membershipTier !== 'free' && user.membershipExpiresAt && (
              <p className="mt-2 font-mono text-[10px] tracking-mono text-white/25">
                Renews {formatDate(user.membershipExpiresAt)}
              </p>
            )}
          </div>

          {/* Member since */}
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Member since</p>
            <p className="mt-2 text-[24px] font-medium tracking-display text-white">
              {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          </div>

          {/* Role */}
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Role</p>
            <p className="mt-2 text-[24px] font-medium tracking-display text-white capitalize">
              {user.role}
            </p>
            {user.role === 'partner' && (
              <p className="mt-1 font-mono text-[10px] tracking-mono text-white/25">
                Partner portal enabled
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Quick links ───────────────────────────────────────── */}
      <section className="grid gap-3 sm:grid-cols-2">
        <Link href="/peptides" className="card-light group flex items-center gap-4 p-5 transition-all hover:shadow-blue-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-comfortable bg-lavender/20 text-[18px]">
            🧬
          </div>
          <div>
            <p className="text-[14px] font-medium tracking-subheading text-black group-hover:text-midnight">
              Browse Peptides
            </p>
            <p className="text-[12px] text-black/40">Explore 100+ research profiles</p>
          </div>
        </Link>

        <Link href="/categories" className="card-light group flex items-center gap-4 p-5 transition-all hover:shadow-blue-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-comfortable bg-lavender/20 text-[18px]">
            📂
          </div>
          <div>
            <p className="text-[14px] font-medium tracking-subheading text-black group-hover:text-midnight">
              Research Categories
            </p>
            <p className="text-[12px] text-black/40">16 categories of peptide research</p>
          </div>
        </Link>
      </section>

      {/* ── Recently viewed (client island) ───────────────────── */}
      <OverviewRecentlyViewed />
    </div>
  )
}
