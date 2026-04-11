import Stripe from 'stripe'

// Lazy stripe instance — only throws at call time, not at import time.
// This allows test-mode flows to work without STRIPE_SECRET_KEY configured.
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable')
  }
  _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-03-25.dahlia',
  })
  return _stripe
}

// Kept for backwards-compat — will throw at call time if key is missing
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as never)[prop as keyof Stripe]
  },
})

// Map tier slug → Stripe Price ID (set via env vars)
export const PRICE_IDS: Record<string, string | undefined> = {
  researcher: process.env.STRIPE_PRICE_RESEARCHER,
  pro: process.env.STRIPE_PRICE_PRO,
  clinic: process.env.STRIPE_PRICE_CLINIC,
}

// Map Stripe Price ID → membership tier slug
export function tierFromPriceId(priceId: string): 'researcher' | 'pro' | 'clinic' | null {
  for (const [tier, pid] of Object.entries(PRICE_IDS)) {
    if (pid === priceId) return tier as 'researcher' | 'pro' | 'clinic'
  }
  return null
}
