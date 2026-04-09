import type { User } from '@/payload-types'

type MockSearchParams = {
  as?: string
  tier?: string
}

/**
 * Returns a mock user for dashboard development.
 * Swap this for a real Payload `/api/users/me` call when auth is wired up.
 *
 * Query param overrides:
 *   ?as=partner   — returns a partner-role user with linked partnerProfile
 *   ?tier=pro     — overrides membership tier (free | researcher | pro)
 */
export function getMockUser(params?: MockSearchParams): User {
  const isPartner = params?.as === 'partner'
  const tier = (params?.tier ?? 'free') as User['membershipTier']

  const base: User = {
    id: 1,
    email: 'demo@peptidewiki.com',
    name: 'Alex Chen',
    role: isPartner ? 'partner' : 'member',
    membershipTier: tier,
    membershipExpiresAt: tier !== 'free' ? '2027-01-15T00:00:00.000Z' : undefined,
    stripeCustomerId: tier !== 'free' ? 'cus_mock_123' : undefined,
    stripeSubscriptionId: tier !== 'free' ? 'sub_mock_456' : undefined,
    partnerProfile: isPartner ? (1 as unknown as User['partnerProfile']) : undefined,
    createdAt: '2025-11-03T10:00:00.000Z',
    updatedAt: '2026-04-01T14:30:00.000Z',
  }

  return base
}
