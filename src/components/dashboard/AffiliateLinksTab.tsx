import React from 'react'
import type { AffiliateLink, Peptide } from '@/payload-types'
import { formatNumber, formatDate } from '@/lib/format'
import { CopyButton } from './CopyButton'

type Props = {
  affiliateLinks: AffiliateLink[]
}

export function AffiliateLinksTab({ affiliateLinks }: Props) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">
          Affiliate Links
        </h1>
        <p className="mt-1 text-[14px] text-black/50">
          {affiliateLinks.length} link{affiliateLinks.length !== 1 ? 's' : ''} — manage your tracking URLs.
        </p>
      </div>

      {affiliateLinks.length === 0 ? (
        <div className="card-light p-10 text-center">
          <p className="text-[16px] font-medium text-black">No affiliate links yet</p>
          <p className="mt-2 text-[13px] text-black/40">
            Links are created by administrators. Contact support to get started.
          </p>
        </div>
      ) : (
        <div className="card-light overflow-hidden">
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_auto_80px_80px_auto] items-center gap-4 px-5 py-3"
            style={{ borderBottom: '1px solid var(--border-light)' }}
          >
            <p className="mono-label-sm text-black/30">Peptide</p>
            <p className="mono-label-sm text-black/30">Tracking URL</p>
            <p className="mono-label-sm text-right text-black/30">Clicks</p>
            <p className="mono-label-sm text-right text-black/30">Unique</p>
            <p className="mono-label-sm text-right text-black/30">Status</p>
          </div>

          {/* Rows */}
          {affiliateLinks.map((link, i) => {
            const peptide = typeof link.peptide === 'object' ? (link.peptide as Peptide) : null
            const trackingUrl = `${appUrl}/go/${link.trackingCode}`
            const isLast = i === affiliateLinks.length - 1

            return (
              <div
                key={link.id}
                className="grid grid-cols-[1fr_auto_80px_80px_auto] items-center gap-4 px-5 py-4"
                style={!isLast ? { borderBottom: '1px solid var(--border-light)' } : {}}
              >
                {/* Peptide name */}
                <div>
                  <p className="text-[14px] font-medium tracking-tight text-black">
                    {peptide?.name ?? 'Unknown'}
                  </p>
                  {link.lastClickAt && (
                    <p className="mono-label-sm mt-0.5 text-black/25">
                      Last click {formatDate(link.lastClickAt)}
                    </p>
                  )}
                </div>

                {/* Tracking URL + copy */}
                <div className="flex items-center gap-2">
                  <code className="font-mono text-[11px] text-black/40">
                    /go/{link.trackingCode}
                  </code>
                  <CopyButton text={trackingUrl} />
                </div>

                {/* Clicks */}
                <p className="text-right text-[14px] font-medium tabular-nums tracking-tight text-black">
                  {formatNumber(link.clicks ?? 0)}
                </p>

                {/* Unique */}
                <p className="text-right text-[14px] tabular-nums tracking-tight text-black/60">
                  {formatNumber(link.uniqueClicks ?? 0)}
                </p>

                {/* Status */}
                <div className="flex justify-end">
                  <span className={`inline-flex items-center rounded-sharp px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                    link.isActive
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-black/[0.04] text-black/40'
                  }`}>
                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                      link.isActive ? 'bg-emerald-400' : 'bg-neutral-400'
                    }`} />
                    {link.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
