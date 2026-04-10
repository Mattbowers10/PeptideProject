import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'
import { stripe, tierFromPriceId } from '@/lib/stripe'

// Next.js requires the raw body for Stripe signature verification
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[stripe/webhook] Missing STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const rawBody = await req.text()
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('[stripe/webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  try {
    switch (event.type) {
      // ── Subscription activated / renewed ──────────────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription') break

        const sub = await stripe.subscriptions.retrieve(session.subscription as string)
        await handleSubscriptionActive(payload, sub)
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        await handleSubscriptionActive(payload, sub)
        break
      }

      // ── Subscription cancelled / expired ──────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const userId = sub.metadata?.payloadUserId
        if (!userId) break

        await payload.update({
          collection: 'users',
          id: Number(userId),
          data: {
            membershipTier: 'free',
            membershipExpiresAt: null,
            stripeSubscriptionId: null,
          },
          overrideAccess: true,
        })
        break
      }

      default:
        // Unhandled event — ignore silently
        break
    }
  } catch (err) {
    console.error(`[stripe/webhook] Error handling ${event.type}:`, err)
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

// ── Helper — sync subscription state to Payload user ─────────────────────────
async function handleSubscriptionActive(
  payload: Awaited<ReturnType<typeof getPayload>>,
  sub: Stripe.Subscription,
) {
  const userId = sub.metadata?.payloadUserId
  if (!userId) {
    console.warn('[stripe/webhook] Subscription missing payloadUserId metadata', sub.id)
    return
  }

  // Determine tier from first line item price ID
  const priceId = sub.items.data[0]?.price?.id
  const tier = priceId ? tierFromPriceId(priceId) : null

  if (!tier) {
    console.warn('[stripe/webhook] Could not map priceId to tier:', priceId)
    return
  }

  // current_period_end is on SubscriptionItem in Stripe v22 (dahlia API)
  const periodEnd = sub.items.data[0]?.current_period_end
  const expiresAt = periodEnd ? new Date(periodEnd * 1000).toISOString() : null

  await payload.update({
    collection: 'users',
    id: Number(userId),
    data: {
      membershipTier: tier,
      membershipExpiresAt: expiresAt,
      stripeCustomerId: sub.customer as string,
      stripeSubscriptionId: sub.id,
    },
    overrideAccess: true,
  })
}
