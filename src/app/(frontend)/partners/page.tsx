import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Partner, Peptide } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Research Partners | Peptide Wiki',
  description:
    'Verified suppliers and research partners listed on Peptide Wiki. Affiliate links are clearly disclosed.',
}

const TIER_LABEL: Record<string, string> = {
  basic: 'Listed',
  verified: 'Verified',
  premium: 'Premium',
}

const TIER_STYLE: Record<string, string> = {
  basic: 'bg-white/[0.06] text-white/40',
  verified: 'bg-lavender/20 text-lavender',
  premium: 'bg-amber-400/20 text-amber-300',
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export default async function PartnersPage() {
  const payload = await getPayload({ config })

  const { docs: partners } = await payload.find({
    collection: 'partners',
    where: { status: { equals: 'active' } },
    sort: '-verificationTier',
    limit: 50,
    depth: 1,
    overrideAccess: true,
  })

  // For each partner get carried peptide count
  const withCounts = await Promise.all(
    (partners as Partner[]).map(async (p) => {
      const count = Array.isArray(p.carriedPeptides) ? p.carriedPeptides.length : 0
      return { partner: p, peptideCount: count }
    }),
  )

  // Sort: premium first, then verified, then basic
  const rankMap: Record<string, number> = { premium: 0, verified: 1, basic: 2 }
  withCounts.sort(
    (a, b) =>
      (rankMap[a.partner.verificationTier ?? 'basic'] ?? 2) -
      (rankMap[b.partner.verificationTier ?? 'basic'] ?? 2),
  )

  return (
    <div className="bg-midnight min-h-screen">
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-12">
        <p className="mono-label mb-3 text-white/30">Sourcing directory</p>
        <h1 className="text-[42px] font-medium leading-[1.05] tracking-display text-white sm:text-[52px]">
          Research Partners
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-[1.55] text-white/50">
          Verified suppliers of research-grade peptides. Affiliate relationships are
          clearly disclosed — our editorial content is never influenced by commercial
          partnerships.
        </p>

        {/* Disclosure */}
        <div className="mt-6 inline-block rounded-sharp border border-lavender/20 px-4 py-2">
          <p className="font-mono text-[11px] tracking-mono text-lavender/60">
            Affiliate disclosure — Peptide Wiki earns a commission on purchases made through partner links.
          </p>
        </div>
      </section>

      {/* ── Partner grid ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 pb-20">
        {withCounts.length === 0 ? (
          <div className="card-dark p-10 text-center">
            <p className="text-[15px] text-white/40">No active partners listed yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {withCounts.map(({ partner, peptideCount }) => {
              const tier = partner.verificationTier ?? 'basic'
              return (
                <div
                  key={partner.id}
                  className="card-dark flex flex-col p-6"
                >
                  {/* Tier badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono ${TIER_STYLE[tier] ?? TIER_STYLE.basic}`}
                    >
                      {TIER_LABEL[tier] ?? tier}
                    </span>
                    {peptideCount > 0 && (
                      <span className="font-mono text-[10px] tracking-mono text-white/25">
                        {peptideCount} peptide{peptideCount !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {/* Name + domain */}
                  <h2 className="text-[18px] font-medium tracking-subheading text-white">
                    {partner.name}
                  </h2>
                  <p className="mt-0.5 font-mono text-[11px] tracking-mono text-white/30">
                    {getDomain(partner.website)}
                  </p>

                  {/* Description */}
                  {partner.description && (
                    <p className="mt-3 text-[13px] leading-[1.55] text-white/50">
                      {partner.description}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="mt-auto pt-5">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn-glass w-full justify-center text-[13px]"
                    >
                      Visit {getDomain(partner.website)} ↗
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Become a partner CTA ─────────────────────────────── */}
      <section className="border-t mx-auto max-w-[1200px] px-6 pb-16 pt-12" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="text-center">
          <p className="mono-label mb-2 text-white/30">Partner program</p>
          <h2 className="text-[24px] font-medium tracking-heading text-white">
            List your peptides on Peptide Wiki
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-[14px] leading-[1.55] text-white/40">
            We work with verified research suppliers. Affiliate links, featured placement,
            and COA upload capability available for verified partners.
          </p>
          <Link href="/dashboard" className="btn-dark mt-6">
            Apply via Dashboard →
          </Link>
        </div>
      </section>
    </div>
  )
}
