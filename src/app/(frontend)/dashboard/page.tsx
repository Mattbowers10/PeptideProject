import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentUser } from '@/lib/auth'
import { getMockUser, type DashboardUser } from '@/lib/mock-user'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { OverviewTab } from '@/components/dashboard/OverviewTab'
import { ProfileTab } from '@/components/dashboard/ProfileTab'
import { ActivityTab } from '@/components/dashboard/ActivityTab'
import { MembershipTab } from '@/components/dashboard/MembershipTab'
import { PartnerOverviewTab } from '@/components/dashboard/PartnerOverviewTab'
import { AffiliateLinksTab } from '@/components/dashboard/AffiliateLinksTab'
import { AnalyticsTab } from '@/components/dashboard/AnalyticsTab'
import { ListsTab } from '@/components/dashboard/ListsTab'
import type { User } from '@/payload-types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your Peptide United account, membership, and research activity.',
}

type SearchParams = { tab?: string; as?: string; tier?: string }

/** Convert a full Payload User to a DashboardUser shape */
function toDashboardUser(u: User): DashboardUser {
  return {
    id: u.id,
    email: u.email,
    name: u.name ?? null,
    role: u.role,
    membershipTier: u.membershipTier,
    membershipExpiresAt: u.membershipExpiresAt ?? null,
    stripeCustomerId: u.stripeCustomerId ?? null,
    stripeSubscriptionId: u.stripeSubscriptionId ?? null,
    partnerProfile: u.partnerProfile ?? null,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  // ── Auth resolution ──────────────────────────────────────────────────────
  // If ?as= is present, use mock auth (dev/preview convenience)
  // Otherwise, require a real session — redirect to /login if absent
  let user: DashboardUser

  if (params.as) {
    user = getMockUser(params)
  } else {
    const realUser = await getCurrentUser()
    if (!realUser) {
      redirect(`/login?redirect=/dashboard${params.tab ? `?tab=${params.tab}` : ''}`)
    }
    // Allow ?tier= override for testing without changing DB
    user = params.tier
      ? { ...toDashboardUser(realUser), membershipTier: params.tier as DashboardUser['membershipTier'] }
      : toDashboardUser(realUser)
  }

  const tab = params.tab ?? 'overview'
  const isPartner = user.role === 'partner'

  // Fetch partner data if needed
  let partnerData = null
  let affiliateLinks = null
  let clickEvents = null

  if (isPartner && ['partner', 'links', 'analytics'].includes(tab)) {
    const payload = await getPayload({ config })

    if (tab === 'partner' || tab === 'analytics') {
      const [partnerResult, linksResult] = await Promise.all([
        payload.find({
          collection: 'partners',
          where: { id: { equals: user.partnerProfile } },
          limit: 1,
          depth: 0,
        }),
        payload.find({
          collection: 'affiliate-links',
          where: { partner: { equals: user.partnerProfile } },
          limit: 100,
          depth: 1,
        }),
      ])
      partnerData = partnerResult.docs[0] ?? null
      affiliateLinks = linksResult.docs
    }

    if (tab === 'links') {
      const payload2 = await getPayload({ config })
      const linksResult = await payload2.find({
        collection: 'affiliate-links',
        where: { partner: { equals: user.partnerProfile } },
        limit: 100,
        depth: 1,
        sort: '-clicks',
      })
      affiliateLinks = linksResult.docs
    }

    if (tab === 'analytics' && affiliateLinks && affiliateLinks.length > 0) {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const linkIds = affiliateLinks.map((l) => l.id)
      const payload3 = await getPayload({ config })
      const clickResult = await payload3.find({
        collection: 'click-events',
        where: {
          affiliateLink: { in: linkIds },
          createdAt: { greater_than: thirtyDaysAgo.toISOString() },
        },
        limit: 1000,
        sort: '-createdAt',
      })
      clickEvents = clickResult.docs
    }
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Sidebar */}
      <Suspense>
        <DashboardSidebar
          userName={user.name ?? ''}
          userEmail={user.email}
          isPartner={isPartner}
        />
      </Suspense>

      {/* Content */}
      <main className="min-w-0 flex-1">
        {tab === 'overview' && <OverviewTab user={user} />}
        {tab === 'profile' && <ProfileTab user={user} />}
        {tab === 'activity' && <ActivityTab />}
        {tab === 'membership' && <MembershipTab user={user} />}
        {tab === 'lists' && <ListsTab user={user} />}
        {tab === 'stacks' && (
          <div className="space-y-4">
            <div>
              <h1 className="text-[28px] font-medium tracking-heading text-black">Stack Builder</h1>
              <p className="mt-1 text-[14px] text-black/50">Build multi-peptide research stacks with side-by-side profile comparison.</p>
            </div>
            <div className="rounded-comfortable border p-6 text-center" style={{ borderColor: 'var(--border-light)' }}>
              <p className="text-[14px] text-black/60 mb-4">The Stack Builder is a full-page tool.</p>
              <Link href="/stacks" className="btn-dark text-[14px]">Open Stack Builder →</Link>
            </div>
          </div>
        )}
        {tab === 'partner' && isPartner && (
          <PartnerOverviewTab
            user={user}
            partner={partnerData}
            affiliateLinks={affiliateLinks ?? []}
          />
        )}
        {tab === 'links' && isPartner && (
          <AffiliateLinksTab affiliateLinks={affiliateLinks ?? []} />
        )}
        {tab === 'analytics' && isPartner && (
          <AnalyticsTab
            affiliateLinks={affiliateLinks ?? []}
            clickEvents={clickEvents ?? []}
          />
        )}
      </main>
    </div>
  )
}
