'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const MEMBER_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'profile', label: 'Profile' },
  { key: 'activity', label: 'Activity' },
  { key: 'membership', label: 'Membership' },
]

const PARTNER_TABS = [
  { key: 'partner', label: 'Partner Overview' },
  { key: 'links', label: 'Affiliate Links' },
  { key: 'analytics', label: 'Analytics' },
]

type Props = {
  userName: string
  userEmail: string
  isPartner: boolean
}

export function DashboardSidebar({ userName, userEmail, isPartner }: Props) {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') ?? 'overview'

  const buildTabUrl = (tab: string) => {
    const qs = new URLSearchParams(searchParams.toString())
    if (tab === 'overview') {
      qs.delete('tab')
    } else {
      qs.set('tab', tab)
    }
    const str = qs.toString()
    return `/dashboard${str ? `?${str}` : ''}`
  }

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <div className="card-light p-5">
        {/* User identity */}
        <div className="mb-5 pb-4" style={{ borderBottom: '1px solid var(--border-light)' }}>
          <p className="text-[15px] font-medium tracking-subheading text-black">
            {userName || 'Member'}
          </p>
          <p className="mt-0.5 text-[12px] text-black/40">{userEmail}</p>
        </div>

        {/* Member tabs */}
        <p className="mono-label mb-2 text-black/30">Account</p>
        <div className="flex flex-col gap-0.5">
          {MEMBER_TABS.map((tab) => (
            <Link
              key={tab.key}
              href={buildTabUrl(tab.key)}
              className={`rounded-sharp px-3 py-1.5 text-[13px] tracking-tight transition-colors ${
                currentTab === tab.key
                  ? 'bg-midnight text-white font-medium'
                  : 'text-black/60 hover:bg-black/[0.04]'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Partner tabs */}
        {isPartner && (
          <div className="mt-5">
            <p className="mono-label mb-2 text-black/30">Partner Portal</p>
            <div className="flex flex-col gap-0.5">
              {PARTNER_TABS.map((tab) => (
                <Link
                  key={tab.key}
                  href={buildTabUrl(tab.key)}
                  className={`rounded-sharp px-3 py-1.5 text-[13px] tracking-tight transition-colors ${
                    currentTab === tab.key
                      ? 'bg-midnight text-white font-medium'
                      : 'text-black/60 hover:bg-black/[0.04]'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
