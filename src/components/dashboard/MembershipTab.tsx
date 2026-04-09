import React from 'react'
import type { User } from '@/payload-types'
import { formatDate } from '@/lib/format'

const TIERS = [
  {
    key: 'free',
    name: 'Free Explorer',
    price: '$0',
    period: 'forever',
    features: [
      { label: 'Peptide summaries', included: true },
      { label: 'Research status badges', included: true },
      { label: 'Category browsing', included: true },
      { label: 'Full mechanism profiles', included: false },
      { label: 'Pharmacokinetics data', included: false },
      { label: 'PubMed study links', included: false },
      { label: 'API access', included: false },
    ],
  },
  {
    key: 'researcher',
    name: 'Researcher',
    price: '$19',
    period: '/month',
    features: [
      { label: 'Peptide summaries', included: true },
      { label: 'Research status badges', included: true },
      { label: 'Category browsing', included: true },
      { label: 'Full mechanism profiles', included: true },
      { label: 'Pharmacokinetics data', included: true },
      { label: 'PubMed study links', included: true },
      { label: 'API access', included: false },
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$59',
    period: '/month',
    features: [
      { label: 'Peptide summaries', included: true },
      { label: 'Research status badges', included: true },
      { label: 'Category browsing', included: true },
      { label: 'Full mechanism profiles', included: true },
      { label: 'Pharmacokinetics data', included: true },
      { label: 'PubMed study links', included: true },
      { label: 'API access', included: true },
    ],
  },
]

export function MembershipTab({ user }: { user: User }) {
  const currentTier = user.membershipTier

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">Membership</h1>
        <p className="mt-1 text-[14px] text-black/50">
          Manage your subscription and access level.
        </p>
      </div>

      {/* Current plan — dark accent */}
      <section className="rounded-comfortable bg-midnight p-6">
        <p className="mono-label mb-3 text-white/30">Current plan</p>
        <div className="flex flex-wrap items-end gap-4">
          <p className="text-[36px] font-medium tracking-display text-white">
            {TIERS.find((t) => t.key === currentTier)?.name ?? currentTier}
          </p>
          {currentTier !== 'free' && user.membershipExpiresAt && (
            <p className="mb-1 font-mono text-[11px] tracking-mono text-white/30">
              Renews {formatDate(user.membershipExpiresAt)}
            </p>
          )}
        </div>
        {currentTier === 'free' && (
          <p className="mt-2 text-[13px] text-white/40">
            Upgrade to unlock full peptide profiles, pharmacokinetics, and PubMed links.
          </p>
        )}
      </section>

      {/* Tier comparison */}
      <section>
        <p className="mono-label mb-4 text-black/30">Compare plans</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {TIERS.map((tier) => {
            const isCurrent = tier.key === currentTier
            return (
              <div
                key={tier.key}
                className={`rounded-comfortable border p-5 ${
                  isCurrent
                    ? 'border-lavender bg-lavender/[0.06]'
                    : 'bg-white'
                }`}
                style={!isCurrent ? { borderColor: 'var(--border-light)' } : {}}
              >
                {/* Header */}
                <div className="mb-4">
                  <p className="text-[15px] font-medium tracking-subheading text-black">
                    {tier.name}
                  </p>
                  <div className="mt-1 flex items-baseline gap-0.5">
                    <span className="text-[28px] font-medium tracking-display text-black">
                      {tier.price}
                    </span>
                    <span className="text-[13px] text-black/40">{tier.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {tier.features.map((feat) => (
                    <li key={feat.label} className="flex items-start gap-2 text-[13px]">
                      <span className={feat.included ? 'text-emerald-500' : 'text-black/20'}>
                        {feat.included ? '✓' : '—'}
                      </span>
                      <span className={feat.included ? 'text-black/70' : 'text-black/30'}>
                        {feat.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-5">
                  {isCurrent ? (
                    <span className="badge-light">Current plan</span>
                  ) : (
                    <button className="btn-outline w-full justify-center text-[13px]" disabled>
                      {tier.key === 'free' ? 'Downgrade' : 'Upgrade'} — Coming Soon
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Billing note */}
      <div className="card-light p-5">
        <p className="mono-label mb-2 text-black/30">Billing</p>
        <p className="text-[13px] text-black/50">
          Stripe billing integration is coming in Phase 3. Subscription management,
          invoices, and payment methods will be available here.
        </p>
      </div>
    </div>
  )
}
