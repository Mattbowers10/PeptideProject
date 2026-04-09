import React from 'react'
import type { User, Partner, AffiliateLink } from '@/payload-types'
import { formatNumber, formatDate } from '@/lib/format'

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-400',
  pending: 'bg-amber-400',
  suspended: 'bg-red-400',
}

const VERIFICATION_LABELS: Record<string, string> = {
  basic: 'Basic',
  verified: 'Verified',
  premium: 'Premium',
}

type Props = {
  user: User
  partner: Partner | null
  affiliateLinks: AffiliateLink[]
}

export function PartnerOverviewTab({ user, partner, affiliateLinks }: Props) {
  if (!partner) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-[28px] font-medium tracking-heading text-black">Partner Overview</h1>
        </div>
        <div className="card-light p-10 text-center">
          <p className="text-[16px] font-medium text-black">Partner profile not found</p>
          <p className="mt-2 text-[13px] text-black/40">
            Your account is linked as a partner but no partner profile was found.
            Contact an administrator.
          </p>
        </div>
      </div>
    )
  }

  const totalClicks = affiliateLinks.reduce((sum, l) => sum + (l.clicks ?? 0), 0)
  const totalUnique = affiliateLinks.reduce((sum, l) => sum + (l.uniqueClicks ?? 0), 0)
  const activeLinks = affiliateLinks.filter((l) => l.isActive).length
  const statusDot = STATUS_COLORS[partner.status] ?? 'bg-neutral-400'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">
          Partner Overview
        </h1>
        <p className="mt-1 text-[14px] text-black/50">
          {partner.name} — partner portal dashboard
        </p>
      </div>

      {/* ── Dark stat cards ───────────────────────────────────── */}
      <section className="rounded-comfortable bg-midnight p-6">
        <p className="mono-label mb-4 text-white/30">Performance</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Total clicks</p>
            <p className="mt-2 text-[32px] font-medium tracking-display text-white">
              {formatNumber(totalClicks)}
            </p>
          </div>
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Unique clicks</p>
            <p className="mt-2 text-[32px] font-medium tracking-display text-white">
              {formatNumber(totalUnique)}
            </p>
          </div>
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Active links</p>
            <p className="mt-2 text-[32px] font-medium tracking-display text-white">
              {activeLinks}
            </p>
          </div>
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Commission rate</p>
            <p className="mt-2 text-[32px] font-medium tracking-display text-white">
              {partner.commissionRate ?? 0}%
            </p>
          </div>
        </div>
      </section>

      {/* ── Partner info ──────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card-light p-5">
          <p className="mono-label mb-3 text-black/30">Partner status</p>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${statusDot}`} />
            <span className="text-[14px] font-medium capitalize tracking-tight text-black">
              {partner.status}
            </span>
          </div>
          <div className="rule mt-3 pt-3">
            <p className="mono-label-sm text-black/30">Verification</p>
            <p className="mt-1 text-[14px] text-black/70">
              {VERIFICATION_LABELS[partner.verificationTier ?? 'basic'] ?? partner.verificationTier}
            </p>
          </div>
          {partner.acceptedTermsAt && (
            <div className="rule mt-3 pt-3">
              <p className="mono-label-sm text-black/30">Terms accepted</p>
              <p className="mt-1 text-[14px] text-black/70">
                {formatDate(partner.acceptedTermsAt)}
              </p>
            </div>
          )}
        </div>

        <div className="card-light p-5">
          <p className="mono-label mb-3 text-black/30">Contact & website</p>
          <div className="space-y-3">
            <div>
              <p className="mono-label-sm text-black/30">Email</p>
              <p className="mt-0.5 text-[14px] text-black/70">{partner.contactEmail}</p>
            </div>
            <div className="rule pt-3">
              <p className="mono-label-sm text-black/30">Website</p>
              <p className="mt-0.5 text-[14px] text-black/70">{partner.website}</p>
            </div>
            {partner.carriedPeptides && (
              <div className="rule pt-3">
                <p className="mono-label-sm text-black/30">Carried peptides</p>
                <p className="mt-0.5 text-[14px] text-black/70">
                  {Array.isArray(partner.carriedPeptides) ? partner.carriedPeptides.length : 0} peptides
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
