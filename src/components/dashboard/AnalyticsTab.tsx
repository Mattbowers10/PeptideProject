import React from 'react'
import type { AffiliateLink, ClickEvent, Peptide } from '@/payload-types'
import { formatNumber } from '@/lib/format'
import { ClickChart } from './ClickChart'

type Props = {
  affiliateLinks: AffiliateLink[]
  clickEvents: ClickEvent[]
}

function buildDailyData(events: ClickEvent[], days: number = 14) {
  const now = new Date()
  const buckets: Record<string, number> = {}

  // Initialize buckets
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    buckets[key] = 0
  }

  // Fill buckets
  for (const event of events) {
    const d = new Date(event.createdAt)
    const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    if (key in buckets) {
      buckets[key]++
    }
  }

  return Object.entries(buckets).map(([label, value]) => ({ label, value }))
}

function getTopPeptides(links: AffiliateLink[], limit: number = 5) {
  return [...links]
    .sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0))
    .slice(0, limit)
    .map((link) => {
      const peptide = typeof link.peptide === 'object' ? (link.peptide as Peptide) : null
      return {
        name: peptide?.name ?? 'Unknown',
        slug: peptide?.slug ?? '',
        clicks: link.clicks ?? 0,
        uniqueClicks: link.uniqueClicks ?? 0,
      }
    })
}

function getCountryBreakdown(events: ClickEvent[]) {
  const counts: Record<string, number> = {}
  for (const event of events) {
    const country = event.country || 'Unknown'
    counts[country] = (counts[country] ?? 0) + 1
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}

export function AnalyticsTab({ affiliateLinks, clickEvents }: Props) {
  const totalClicks = clickEvents.length
  const uniqueClicks = clickEvents.filter((e) => e.isUnique).length
  const dailyData = buildDailyData(clickEvents)
  const topPeptides = getTopPeptides(affiliateLinks)
  const countries = getCountryBreakdown(clickEvents)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">Analytics</h1>
        <p className="mt-1 text-[14px] text-black/50">
          Click performance over the last 30 days.
        </p>
      </div>

      {/* ── Dark stats + chart ────────────────────────────────── */}
      <section className="rounded-comfortable bg-midnight p-6">
        {/* Summary stats */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Total clicks (30d)</p>
            <p className="mt-2 text-[32px] font-medium tracking-display text-white">
              {formatNumber(totalClicks)}
            </p>
          </div>
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Unique clicks (30d)</p>
            <p className="mt-2 text-[32px] font-medium tracking-display text-white">
              {formatNumber(uniqueClicks)}
            </p>
          </div>
          <div className="card-dark p-5">
            <p className="mono-label-sm text-white/30">Top country</p>
            <p className="mt-2 text-[24px] font-medium tracking-display text-white">
              {countries[0]?.[0] ?? '—'}
            </p>
            {countries[0] && (
              <p className="mono-label-sm mt-1 text-white/25">
                {countries[0][1]} clicks
              </p>
            )}
          </div>
        </div>

        {/* Daily chart */}
        <div>
          <p className="mono-label mb-4 text-white/30">Clicks — last 14 days</p>
          <ClickChart data={dailyData} maxHeight={120} />
        </div>
      </section>

      {/* ── Top performing peptides ────────────────────────────── */}
      <section className="card-light">
        <div className="p-5 pb-0">
          <p className="mono-label text-black/30">Top performing links</p>
        </div>
        {topPeptides.length === 0 ? (
          <div className="p-5">
            <p className="text-[13px] text-black/40">No click data yet.</p>
          </div>
        ) : (
          <div className="p-2">
            {topPeptides.map((item, i) => {
              const maxClicks = topPeptides[0]?.clicks ?? 1
              const barWidth = Math.max((item.clicks / maxClicks) * 100, 2)

              return (
                <div
                  key={item.slug || i}
                  className="flex items-center gap-4 px-3 py-3"
                  style={i < topPeptides.length - 1 ? { borderBottom: '1px solid var(--border-light)' } : {}}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium tracking-tight text-black">
                      {item.name}
                    </p>
                    {/* Mini bar */}
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-black/[0.04]">
                      <div
                        className="h-full rounded-full bg-lavender"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[14px] font-medium tabular-nums text-black">
                      {formatNumber(item.clicks)}
                    </p>
                    <p className="mono-label-sm text-black/30">
                      {formatNumber(item.uniqueClicks)} unique
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Country breakdown ─────────────────────────────────── */}
      {countries.length > 0 && (
        <section className="card-light p-5">
          <p className="mono-label mb-4 text-black/30">By country</p>
          <div className="space-y-2">
            {countries.map(([country, count]) => (
              <div key={country} className="flex items-center justify-between">
                <span className="text-[14px] tracking-tight text-black/70">{country}</span>
                <span className="mono-label-sm text-black/40">{formatNumber(count)} clicks</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
