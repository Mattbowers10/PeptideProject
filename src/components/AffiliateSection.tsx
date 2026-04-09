import React from 'react'
import type { AffiliateLink, Partner } from '@/payload-types'

type PopulatedLink = Omit<AffiliateLink, 'partner'> & {
  partner: Partner | number
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function AffiliateSection({ links }: { links: PopulatedLink[] }) {
  const active = links.filter((l) => l.isActive && l.trackingCode)
  if (active.length === 0) return null

  return (
    <section className="card-dark p-6">
      <p className="mono-label mb-1 text-white/30">Where to Source</p>
      <p className="mb-5 text-[12px] text-white/25">
        Affiliate links — Peptide Wiki may earn a commission on purchases. This does not
        affect our editorial independence.
      </p>

      <div className="space-y-3">
        {active.map((link) => {
          const partner = typeof link.partner === 'object' ? link.partner : null
          const partnerName = partner?.name ?? 'Partner'
          const domain = getDomain(link.destinationUrl)

          return (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4 rounded-sharp py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <p className="text-[14px] font-medium tracking-tight text-white">
                  {partnerName}
                </p>
                <p className="mt-0.5 font-mono text-[11px] tracking-mono text-white/30">
                  {domain}
                </p>
              </div>
              <a
                href={`/go/${link.trackingCode}`}
                className="btn-glass shrink-0 text-[12px]"
                rel="noopener noreferrer sponsored"
              >
                Visit →
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
