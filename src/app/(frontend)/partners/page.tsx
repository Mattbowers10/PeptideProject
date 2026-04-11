import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Partner, AffiliateLink, Peptide } from '@/payload-types'

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

type PopulatedLink = Omit<AffiliateLink, 'peptide'> & { peptide: Peptide | number }

export default async function PartnersPage() {
  const payload = await getPayload({ config })

  const { docs: partners } = await payload.find({
    collection: 'partners',
    where: { status: { equals: 'active' } },
    limit: 50,
    depth: 1,
    overrideAccess: true,
  })

  // Fetch all active affiliate links in one query, depth:1 to get peptide name
  const { docs: allLinks } = await payload.find({
    collection: 'affiliate-links',
    where: { isActive: { equals: true } },
    limit: 500,
    depth: 1,
    overrideAccess: true,
  })

  // Group links by partner ID
  const linksByPartner: Record<number, PopulatedLink[]> = {}
  for (const link of allLinks as PopulatedLink[]) {
    const partnerId = typeof link.partner === 'object' ? link.partner.id : link.partner
    if (!linksByPartner[partnerId]) linksByPartner[partnerId] = []
    linksByPartner[partnerId].push(link)
  }

  // Sort: premium first, then verified, then basic
  const rankMap: Record<string, number> = { premium: 0, verified: 1, basic: 2 }
  const sorted = [...(partners as Partner[])].sort(
    (a, b) =>
      (rankMap[a.verificationTier ?? 'basic'] ?? 2) -
      (rankMap[b.verificationTier ?? 'basic'] ?? 2),
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
        {sorted.length === 0 ? (
          <div className="card-dark p-10 text-center">
            <p className="text-[15px] text-white/40">No active partners listed yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((partner) => {
              const tier = partner.verificationTier ?? 'basic'
              const links = linksByPartner[partner.id] ?? []
              const preview = links.slice(0, 5)
              const remaining = links.length - preview.length

              return (
                <div key={partner.id} className="card-dark flex flex-col p-6">
                  {/* Tier badge + peptide count */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono ${TIER_STYLE[tier] ?? TIER_STYLE.basic}`}
                    >
                      {TIER_LABEL[tier] ?? tier}
                    </span>
                    {links.length > 0 && (
                      <span className="font-mono text-[10px] tracking-mono text-white/25">
                        {links.length} peptide{links.length !== 1 ? 's' : ''}
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

                  {/* Peptide preview pills */}
                  {preview.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {preview.map((link) => {
                        const peptide = typeof link.peptide === 'object' ? link.peptide : null
                        if (!peptide) return null
                        return (
                          <a
                            key={link.id}
                            href={`/go/${link.trackingCode}`}
                            rel="noopener noreferrer sponsored"
                            className="rounded-sharp border px-2 py-0.5 font-mono text-[10px] tracking-mono text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                          >
                            {peptide.name}
                          </a>
                        )
                      })}
                      {remaining > 0 && (
                        <span className="rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono text-white/20">
                          +{remaining} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto pt-5">
                    <Link
                      href={`/partners/${partner.slug}`}
                      className="btn-glass w-full justify-center text-[13px]"
                    >
                      View all peptides →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Become a partner CTA ─────────────────────────────── */}
      <section
        className="border-t mx-auto max-w-[1200px] px-6 pb-16 pt-12"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
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
