/**
 * POST /api/membership/test-upgrade
 *
 * Test-mode only endpoint — sets the authenticated user's membership tier
 * directly in the database without going through Stripe.
 *
 * Requires:
 *   - BILLING_TEST_MODE=true in environment
 *   - Valid authenticated session
 *
 * Body: { tier: 'free' | 'researcher' | 'pro' | 'clinic' }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentUser } from '@/lib/auth'

const VALID_TIERS = ['free', 'researcher', 'pro', 'clinic'] as const
type Tier = (typeof VALID_TIERS)[number]

export async function POST(req: NextRequest) {
  // Guard: only available in test mode
  if (process.env.BILLING_TEST_MODE !== 'true') {
    return NextResponse.json(
      { error: 'Test upgrade is only available in BILLING_TEST_MODE.' },
      { status: 403 },
    )
  }

  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { tier } = body as { tier?: string }

  if (!tier || !VALID_TIERS.includes(tier as Tier)) {
    return NextResponse.json(
      { error: `Invalid tier. Must be one of: ${VALID_TIERS.join(', ')}` },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config })

  // Set an expiry 1 year out for paid tiers (test convenience)
  const expiresAt =
    tier !== 'free'
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      : null

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      membershipTier: tier as Tier,
      ...(expiresAt ? { membershipExpiresAt: expiresAt } : { membershipExpiresAt: null }),
    },
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true, tier })
}
