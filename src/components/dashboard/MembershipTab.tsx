'use client'

import React, { useState } from 'react'
import type { DashboardUser } from '@/lib/mock-user'
import { formatDate } from '@/lib/format'

const IS_TEST_MODE = process.env.NEXT_PUBLIC_BILLING_TEST_MODE === 'true'

const TIERS = [
  {
    key: 'free',
    name: 'Free Explorer',
    price: '$0',
    period: 'forever',
    description: 'Core research browsing, no account required.',
    features: [
      { label: 'Peptide summaries & status badges', included: true },
      { label: 'Category browsing', included: true },
      { label: 'Cmd+K search', included: true },
      { label: 'Full mechanism profiles', included: false },
      { label: 'Pharmacokinetics data', included: false },
      { label: 'PubMed study links', included: false },
      { label: 'Comparison tool', included: false },
      { label: 'Clinical PDFs & stack tool', included: false },
      { label: 'Multi-seat access', included: false },
    ],
  },
  {
    key: 'researcher',
    name: 'Researcher',
    price: '$12',
    period: '/month',
    description: 'Full depth research profiles for serious investigators.',
    badge: null as string | null,
    features: [
      { label: 'Peptide summaries & status badges', included: true },
      { label: 'Category browsing', included: true },
      { label: 'Cmd+K search', included: true },
      { label: 'Full mechanism profiles', included: true },
      { label: 'Pharmacokinetics data', included: true },
      { label: 'PubMed study links', included: true },
      { label: 'Comparison tool (save 25 lists)', included: true },
      { label: 'Clinical PDFs & stack tool', included: false },
      { label: 'Multi-seat access', included: false },
    ],
  },
  {
    key: 'pro',
    name: 'Pro / Practitioner',
    price: '$39',
    period: '/month',
    description: 'Full intelligence suite for practitioners and consultants.',
    badge: 'Most Popular',
    features: [
      { label: 'Peptide summaries & status badges', included: true },
      { label: 'Category browsing', included: true },
      { label: 'Cmd+K search', included: true },
      { label: 'Full mechanism profiles', included: true },
      { label: 'Pharmacokinetics data', included: true },
      { label: 'PubMed study links', included: true },
      { label: 'Comparison tool (unlimited lists)', included: true },
      { label: 'Clinical PDFs & stack tool', included: true },
      { label: 'Multi-seat access', included: false },
    ],
  },
  {
    key: 'clinic',
    name: 'Clinic',
    price: '$149',
    period: '/month',
    description: 'Team access, white-label, and quarterly advisory calls.',
    badge: null as string | null,
    features: [
      { label: 'Peptide summaries & status badges', included: true },
      { label: 'Category browsing', included: true },
      { label: 'Cmd+K search', included: true },
      { label: 'Full mechanism profiles', included: true },
      { label: 'Pharmacokinetics data', included: true },
      { label: 'PubMed study links', included: true },
      { label: 'Comparison tool (unlimited lists)', included: true },
      { label: 'Clinical PDFs & stack tool', included: true },
      { label: '5-seat team access + white-label', included: true },
    ],
  },
]

const TIER_ORDER = ['free', 'researcher', 'pro', 'clinic']

function tierRank(tier: string) {
  return TIER_ORDER.indexOf(tier)
}

export function MembershipTab({ user }: { user: DashboardUser }) {
  const currentTier = user.membershipTier ?? 'free'
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [testSuccess, setTestSuccess] = useState<string | null>(null)

  async function handleUpgrade(tier: string) {
    setError(null)
    setTestSuccess(null)
    setLoading(tier)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed')
      if (data.url) {
        if (IS_TEST_MODE) {
          // In test mode the server already updated the DB — just reload
          setTestSuccess(`Tier set to "${tier}" — reloading…`)
          setTimeout(() => window.location.reload(), 1200)
        } else {
          window.location.href = data.url
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(null)
    }
  }

  async function handleManageBilling() {
    setError(null)
    setLoading('portal')
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Portal error')
      if (data.url) window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">Membership</h1>
        <p className="mt-1 text-[14px] text-black/50">
          Manage your subscription and access level.
        </p>
      </div>

      {/* Test-mode banner */}
      {IS_TEST_MODE && (
        <div className="rounded-comfortable border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
          <strong>Test mode active</strong> — tier changes apply instantly without Stripe. No payment is processed.
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="rounded-comfortable border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}

      {/* Test success banner */}
      {testSuccess && (
        <div className="rounded-comfortable border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700">
          {testSuccess}
        </div>
      )}

      {/* Current plan */}
      <section className="rounded-comfortable bg-midnight p-6">
        <p className="mono-label mb-3 text-white/30">Current plan</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[36px] font-medium tracking-display text-white">
              {TIERS.find((t) => t.key === currentTier)?.name ?? currentTier}
            </p>
            {currentTier !== 'free' && user.membershipExpiresAt && (
              <p className="mt-1 font-mono text-[11px] tracking-mono text-white/30">
                Renews {formatDate(user.membershipExpiresAt)}
              </p>
            )}
            {currentTier === 'free' && (
              <p className="mt-2 text-[13px] text-white/40">
                Upgrade to unlock full mechanism profiles, pharmacokinetics, and PubMed links.
              </p>
            )}
          </div>

          {/* Manage billing — shown for paid subscribers with a Stripe customer */}
          {currentTier !== 'free' && user.stripeCustomerId && !IS_TEST_MODE && (
            <button
              onClick={handleManageBilling}
              disabled={loading === 'portal'}
              className="btn-glass text-[13px] disabled:opacity-50"
            >
              {loading === 'portal' ? 'Redirecting…' : 'Manage billing'}
            </button>
          )}
        </div>
      </section>

      {/* Tier comparison — 4 columns */}
      <section>
        <p className="mono-label mb-4 text-black/30">Compare plans</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => {
            const isCurrent = tier.key === currentTier
            const isUpgrade = tierRank(tier.key) > tierRank(currentTier)
            const isDowngrade = tierRank(tier.key) < tierRank(currentTier) && tier.key !== 'free'

            return (
              <div
                key={tier.key}
                className={`rounded-comfortable border p-5 ${
                  tier.key === 'pro'
                    ? 'border-lavender bg-lavender/[0.06]'
                    : isCurrent
                      ? 'border-black/20 bg-white'
                      : 'bg-white'
                }`}
                style={tier.key !== 'pro' && !isCurrent ? { borderColor: 'var(--border-light)' } : {}}
              >
                {/* Badge */}
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-[14px] font-medium tracking-subheading text-black">
                      {tier.name}
                    </p>
                    {(tier as { badge?: string | null }).badge && (
                      <span className="mt-1 inline-block rounded bg-lavender/10 px-1.5 py-0.5 font-mono text-[9px] tracking-mono text-lavender">
                        {(tier as { badge?: string | null }).badge}
                      </span>
                    )}
                  </div>
                  {isCurrent && (
                    <span className="shrink-0 rounded-sharp bg-black/[0.06] px-2 py-0.5 font-mono text-[9px] tracking-mono text-black/40">
                      Current
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4 flex items-baseline gap-0.5">
                  <span className="text-[28px] font-medium tracking-display text-black">
                    {tier.price}
                  </span>
                  <span className="text-[13px] text-black/40">{tier.period}</span>
                </div>

                {/* Features */}
                <ul className="mb-5 space-y-1.5">
                  {tier.features.map((feat) => (
                    <li key={feat.label} className="flex items-start gap-2 text-[12px]">
                      <span className={feat.included ? 'text-emerald-500 shrink-0' : 'text-black/20 shrink-0'}>
                        {feat.included ? '✓' : '—'}
                      </span>
                      <span className={feat.included ? 'text-black/70' : 'text-black/30'}>
                        {feat.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isCurrent ? (
                  <span className="block text-center rounded-comfortable bg-black/[0.04] px-3 py-2 font-mono text-[11px] tracking-mono text-black/30">
                    Active plan
                  </span>
                ) : isUpgrade ? (
                  <button
                    onClick={() => handleUpgrade(tier.key)}
                    disabled={!!loading}
                    className={`w-full rounded-comfortable px-3 py-2 text-[13px] font-medium transition-colors disabled:opacity-60 ${
                      tier.key === 'pro'
                        ? 'bg-lavender text-white hover:bg-lavender/90'
                        : 'bg-midnight text-white hover:bg-midnight/90'
                    }`}
                  >
                    {loading === tier.key
                      ? IS_TEST_MODE
                        ? 'Activating…'
                        : 'Redirecting…'
                      : `Upgrade to ${tier.name.split(' ')[0]}`}
                  </button>
                ) : isDowngrade ? (
                  <button
                    onClick={handleManageBilling}
                    disabled={!!loading}
                    className="w-full rounded-comfortable border px-3 py-2 text-[13px] font-medium text-black/50 transition-colors hover:text-black/70 disabled:opacity-60"
                    style={{ borderColor: 'var(--border-light)' }}
                  >
                    {loading === 'portal' ? 'Redirecting…' : 'Switch plan'}
                  </button>
                ) : null}
              </div>
            )
          })}
        </div>
      </section>

      {/* Billing note */}
      <div className="card-light p-5">
        <p className="mono-label mb-2 text-black/30">Billing</p>
        <p className="text-[13px] text-black/50">
          {IS_TEST_MODE
            ? 'Test mode: upgrades apply immediately with no payment. Connect Stripe to enable real billing.'
            : 'All subscriptions are billed monthly via Stripe. Cancel any time — you retain access through the end of your billing period.'}{' '}
          Questions?{' '}
          <a
            href="mailto:support@peptidewiki.com"
            className="underline underline-offset-2 hover:text-black/70"
          >
            support@peptidewiki.com
          </a>
        </p>
      </div>
    </div>
  )
}
