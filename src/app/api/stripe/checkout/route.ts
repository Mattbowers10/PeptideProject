import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { stripe, PRICE_IDS } from '@/lib/stripe'
import { getCurrentUser } from '@/lib/auth'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { tier } = body as { tier?: string }

    if (!tier || !['researcher', 'pro'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const priceId = PRICE_IDS[tier]
    if (!priceId) {
      return NextResponse.json(
        { error: `Stripe price ID for "${tier}" is not configured.` },
        { status: 500 },
      )
    }

    // Create or retrieve Stripe customer
    let customerId = user.stripeCustomerId ?? undefined

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { payloadUserId: String(user.id) },
      })
      customerId = customer.id

      // Persist customer ID back to Payload
      const payload = await getPayload({ config })
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { stripeCustomerId: customerId },
        overrideAccess: true,
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${APP_URL}/dashboard?tab=membership&checkout=success`,
      cancel_url: `${APP_URL}/dashboard?tab=membership`,
      subscription_data: {
        metadata: { payloadUserId: String(user.id), tier },
      },
      allow_promotion_codes: true,
      // Pre-fill email
      customer_update: { name: 'auto' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout]', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
