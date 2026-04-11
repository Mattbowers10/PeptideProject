import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getStripe, PRICE_IDS } from '@/lib/stripe'
import { getCurrentUser } from '@/lib/auth'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
const VALID_PAID_TIERS = ['researcher', 'pro', 'clinic']

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { tier } = body as { tier?: string }

    if (!tier || !VALID_PAID_TIERS.includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // ── Test mode: bypass Stripe entirely ───────────────────────────
    if (process.env.BILLING_TEST_MODE === 'true') {
      const payload = await getPayload({ config })
      const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { membershipTier: tier as 'researcher' | 'pro' | 'clinic', membershipExpiresAt: expiresAt },
        overrideAccess: true,
      })
      return NextResponse.json({
        url: `${APP_URL}/dashboard?tab=membership&checkout=success&test=1`,
      })
    }

    // ── Live mode: Stripe checkout ───────────────────────────────────
    const priceId = PRICE_IDS[tier]
    if (!priceId) {
      return NextResponse.json(
        { error: `Stripe price ID for "${tier}" is not configured.` },
        { status: 500 },
      )
    }

    const stripe = getStripe()

    // Create or retrieve Stripe customer
    let customerId = user.stripeCustomerId ?? undefined

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { payloadUserId: String(user.id) },
      })
      customerId = customer.id

      const payload = await getPayload({ config })
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { stripeCustomerId: customerId },
        overrideAccess: true,
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${APP_URL}/dashboard?tab=membership&checkout=success`,
      cancel_url: `${APP_URL}/upgrade`,
      subscription_data: {
        metadata: { payloadUserId: String(user.id), tier },
      },
      allow_promotion_codes: true,
      customer_update: { name: 'auto' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout]', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
