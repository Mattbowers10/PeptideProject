import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Partner, AffiliateLink, Peptide } from '@/payload-types'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

type PopulatedLink = Omit<AffiliateLink, 'peptide' | 'partner'> & {
  peptide: Peptide | number
  partner: Partner | number
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'partners',
    where: { slug: { equals: slug }, status: { equals: 'active' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const partner = docs[0] as Partner | undefined
  if (!partner) return { title: 'Partner Not Found' }

  return {
    title: { absolute: `${partner.name} | Research Partners | Peptide United` },
    description: partner.description ?? `Browse research peptides available from ${partner.name}.`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'partners',
    where: { status: { equals: 'active' } },
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })
  return (docs as Partner[]).map((p) => ({ slug: p.slug }))
}

export default async function PartnerDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // Fetch partner
  const { docs } = await payload.find({
    collection: 'partners',
    where: { slug: { equals: slug }, status: { equals: 'active' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const partner = docs[0] as Partner | undefined
  if (!partner) notFound()

  // Fetch all active affiliate links for this partner
  const { docs: links } = await payload.find({
    collection: 'affiliate-links',
    where: {
      and: [
        { partner: { equals: partner.id } },
        { isActive: { equals: true } },
      ],
    },
    limit: 200,
    depth: 1,
    overrideAccess: true,
  })

  const populatedLinks = (links as PopulatedLink[]).filter(
    (l) => typeof l.peptide === 'object' && l.trackingCode,
  )

  const tier = partner.verificationTier ?? 'basic'

  return (
    <div className="bg-midnight min-h-screen">
      {/* ── Breadcrumb ───────────────────────────────────────── */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-3">
          <nav className="flex items-center gap-2 font-mono text-[11px] tracking-mono text-white/30">
            <Link href="/partners" className="transition-colors hover:text-white/60">
              Partners
            </Link>
            <span>/</span>
            <span className="text-white/50">{partner.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-12 pb-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            {/* Tier badge */}
            <span
              className={`mb-4 inline-block rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono ${TIER_STYLE[tier]}`}
            >
              {TIER_LABEL[tier]}
            </span>

            <h1 className="text-[36px] font-medium leading-[1.05] tracking-display text-white sm:text-[44px]">
              {partner.name}
            </h1>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-mono text-[12px] tracking-mono text-white/30 transition-colors hover:text-white/60"
            >
              {getDomain(partner.website)} ↗
            </a>
            {partner.description && (
              <p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-white/50">
                {partner.description}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-[28px] font-medium tracking-display text-white">
                {populatedLinks.length}
              </p>
              <p className="mt-0.5 font-mono text-[10px] tracking-mono text-white/30">
                peptides
              </p>
            </div>
          </div>
        </div>

        {/* Disclosure */}
        <div className="mt-6 inline-block rounded-sharp border border-lavender/20 px-4 py-2">
          <p className="font-mono text-[11px] tracking-mono text-lavender/60">
            Affiliate disclosure — Peptide United earns a commission on purchases made through these links.
          </p>
        </div>
      </section>

      {/* ── Peptide link table ───────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 pb-20">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-[14px] font-medium tracking-subheading text-white/70">
            Available Peptides
          </h2>
          <p className="font-mono text-[11px] tracking-mono text-white/30">
            {populatedLinks.length} products
          </p>
        </div>

        {populatedLinks.length === 0 ? (
          <div className="card-dark p-10 text-center">
            <p className="text-[15px] text-white/40">No active peptide links for this partner.</p>
          </div>
        ) : (
          <div
            className="overflow-hidden rounded-sharp border"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {populatedLinks.map((link, i) => {
              const peptide = link.peptide as Peptide
              const isLast = i === populatedLinks.length - 1
              return (
                <div
                  key={link.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                  style={
                    !isLast
                      ? { borderBottom: '1px solid rgba(255,255,255,0.06)' }
                      : undefined
                  }
                >
                  {/* Peptide info */}
                  <div className="min-w-0">
                    <Link
                      href={`/peptides/${peptide.slug}`}
                      className="text-[14px] font-medium tracking-tight text-white transition-colors hover:text-white/70"
                    >
                      {peptide.name}
                    </Link>
                    {peptide.halfLife && (
                      <p className="mt-0.5 font-mono text-[10px] tracking-mono text-white/25">
                        Half-life: {peptide.halfLife}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-3">
                    <Link
                      href={`/peptides/${peptide.slug}`}
                      className="font-mono text-[11px] tracking-mono text-white/30 transition-colors hover:text-white/60"
                    >
                      Research →
                    </Link>
                    <a
                      href={`/go/${link.trackingCode}`}
                      rel="noopener noreferrer sponsored"
                      className="btn-glass text-[12px]"
                    >
                      Shop →
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Back link ────────────────────────────────────────── */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="mx-auto max-w-[1200px] px-6 py-8">
          <Link
            href="/partners"
            className="font-mono text-[12px] tracking-mono text-white/30 transition-colors hover:text-white/60"
          >
            ← All Partners
          </Link>
        </div>
      </div>
    </div>
  )
}
