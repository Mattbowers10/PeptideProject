'use client'

import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'

const IS_TEST_MODE = process.env.NEXT_PUBLIC_BILLING_TEST_MODE === 'true'

const PLANS = [
  {
    key: 'free',
    name: 'Free Explorer',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Core research browsing for everyone.',
    badge: null as string | null,
    cta: 'Get started free',
    ctaHref: '/register',
    highlight: false,
    features: [
      'Peptide summaries & status badges',
      'Category browsing',
      'Cmd+K search',
    ],
  },
  {
    key: 'researcher',
    name: 'Researcher',
    monthlyPrice: 12,
    annualPrice: 10,
    description: 'Full mechanism profiles for serious investigators.',
    badge: null as string | null,
    cta: 'Start Researcher',
    ctaHref: null,
    highlight: false,
    features: [
      'Everything in Free',
      'Mechanism of action profiles',
      'Pharmacokinetics & half-life',
      'PubMed study links',
      'Comparison tool (25 saved lists)',
      'Ad-free + research newsletter',
    ],
  },
  {
    key: 'pro',
    name: 'Pro / Practitioner',
    monthlyPrice: 39,
    annualPrice: 32,
    description: 'Full intelligence suite for practitioners.',
    badge: 'Most Popular',
    cta: 'Start Pro',
    ctaHref: null,
    highlight: true,
    features: [
      'Everything in Researcher',
      'Clinical protocol PDFs',
      'Stack builder & protocol library',
      'Vendor intelligence',
      'Regulatory dashboard',
      'Unlimited saved lists',
      'Priority support',
    ],
  },
  {
    key: 'clinic',
    name: 'Clinic',
    monthlyPrice: 149,
    annualPrice: 124,
    description: 'Team access and white-label for clinics.',
    badge: null as string | null,
    cta: 'Start Clinic',
    ctaHref: null,
    highlight: false,
    features: [
      'Everything in Pro',
      '5 team seats',
      'Patient education briefs',
      'White-label exports',
      'Quarterly regulatory call',
      'Vendor vetting consultation',
    ],
  },
]

export function UpgradeClient() {
  const [annual, setAnnual] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()

  const highlight = searchParams.get('highlight')

  async function handleUpgrade(planKey: string) {
    if (!user) {
      router.push(`/register?redirect=/upgrade`)
      return
    }
    setError(null)
    setLoading(planKey)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: planKey }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed')
      if (data.url) {
        if (IS_TEST_MODE) {
          // Test mode — server already updated DB, redirect to dashboard
          router.push('/dashboard?tab=membership&checkout=success&test=1')
        } else {
          window.location.href = data.url
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(null)
    }
  }

  return (
    <section className="mx-auto max-w-[1100px] px-6 py-14">
      {/* Annual toggle */}
      <div className="mb-10 flex items-center justify-center gap-3">
        <span className={`text-[13px] ${!annual ? 'text-black' : 'text-black/40'}`}>Monthly</span>
        <button
          onClick={() => setAnnual((v) => !v)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            annual ? 'bg-lavender' : 'bg-black/20'
          }`}
          aria-label="Toggle annual billing"
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              annual ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
        <span className={`text-[13px] ${annual ? 'text-black' : 'text-black/40'}`}>
          Annual{' '}
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-[10px] text-emerald-700">
            save ~20%
          </span>
        </span>
      </div>

      {/* Test mode note */}
      {IS_TEST_MODE && (
        <div className="mb-6 rounded-comfortable border border-amber-200 bg-amber-50 px-4 py-3 text-center text-[13px] text-amber-800">
          <strong>Test mode</strong> — clicking upgrade applies the tier instantly with no payment.
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-comfortable border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] text-red-700">
          {error}
        </div>
      )}

      {/* Plan cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice
          const isCurrentUserTier = user?.membershipTier === plan.key
          const isHighlighted = highlight === plan.key || plan.highlight

          return (
            <div
              key={plan.key}
              className={`relative rounded-comfortable border p-6 transition-shadow ${
                isHighlighted
                  ? 'border-lavender bg-lavender/[0.05] shadow-lg'
                  : 'bg-white shadow-sm hover:shadow-md'
              }`}
              style={!isHighlighted ? { borderColor: 'var(--border-light)' } : {}}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-lavender px-3 py-0.5 font-mono text-[9px] tracking-mono text-white shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div className="mb-4">
                <p className="text-[14px] font-medium tracking-subheading text-black">
                  {plan.name}
                </p>
                <p className="mt-1 text-[12px] leading-[1.5] text-black/45">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-5 flex items-baseline gap-1">
                {price === 0 ? (
                  <span className="text-[32px] font-medium tracking-display text-black">Free</span>
                ) : (
                  <>
                    <span className="text-[32px] font-medium tracking-display text-black">
                      ${price}
                    </span>
                    <span className="text-[12px] text-black/40">/mo</span>
                    {annual && (
                      <span className="ml-1 font-mono text-[10px] text-emerald-600">billed annually</span>
                    )}
                  </>
                )}
              </div>

              {/* Features */}
              <ul className="mb-6 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px]">
                    <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                    <span className="text-black/65">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {isCurrentUserTier ? (
                <div className="rounded-comfortable bg-black/[0.04] py-2 text-center font-mono text-[11px] tracking-mono text-black/30">
                  Your current plan
                </div>
              ) : plan.ctaHref ? (
                <a
                  href={plan.ctaHref}
                  className={`block w-full rounded-comfortable py-2.5 text-center text-[13px] font-medium transition-colors ${
                    isHighlighted
                      ? 'bg-lavender text-white hover:bg-lavender/90'
                      : 'bg-midnight text-white hover:bg-midnight/90'
                  }`}
                >
                  {plan.cta}
                </a>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.key)}
                  disabled={!!loading}
                  className={`w-full rounded-comfortable py-2.5 text-center text-[13px] font-medium transition-colors disabled:opacity-60 ${
                    isHighlighted
                      ? 'bg-lavender text-white hover:bg-lavender/90'
                      : 'bg-midnight text-white hover:bg-midnight/90'
                  }`}
                >
                  {loading === plan.key
                    ? IS_TEST_MODE
                      ? 'Activating…'
                      : 'Redirecting…'
                    : plan.cta}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p className="mt-6 text-center font-mono text-[11px] tracking-mono text-black/25">
        All plans include a 14-day money-back guarantee · Cancel any time · No hidden fees
      </p>
    </section>
  )
}
