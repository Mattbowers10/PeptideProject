import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getMockUser } from '@/lib/mock-user'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { OverviewTab } from '@/components/dashboard/OverviewTab'
import { ProfileTab } from '@/components/dashboard/ProfileTab'
import { ActivityTab } from '@/components/dashboard/ActivityTab'
import { MembershipTab } from '@/components/dashboard/MembershipTab'
import { PartnerOverviewTab } from '@/components/dashboard/PartnerOverviewTab'
import { AffiliateLinksTab } from '@/components/dashboard/AffiliateLinksTab'
import { AnalyticsTab } from '@/components/dashboard/AnalyticsTab'

export const metadata: Metadata = {
  title: 'Dashboard | Peptide Wiki',
  description: 'Manage your Peptide Wiki account, membership, and research activity.',
}

type SearchParams = { tab?: string; as?: string; tier?: string }

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const user = getMockUser(params)
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
      const payload = await getPayload({ config })
      const linksResult = await payload.find({
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
      const payload = await getPayload({ config })
      const clickResult = await payload.find({
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
