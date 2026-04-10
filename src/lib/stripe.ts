import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
})

// Map tier slug → Stripe Price ID (set via env vars)
export const PRICE_IDS: Record<string, string | undefined> = {
  researcher: process.env.STRIPE_PRICE_RESEARCHER,
  pro: process.env.STRIPE_PRICE_PRO,
}

// Map Stripe Price ID → membership tier slug
export function tierFromPriceId(priceId: string): 'researcher' | 'pro' | null {
  for (const [tier, pid] of Object.entries(PRICE_IDS)) {
    if (pid === priceId) return tier as 'researcher' | 'pro'
  }
  return null
}
