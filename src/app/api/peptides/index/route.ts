/**
 * Lightweight peptide search index
 * Returns all peptide names, slugs, aliases, and categories for client-side filtering.
 * Cached for 1 hour — revalidated on next request after expiry.
 */

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Category, Peptide } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export type PeptideIndexItem = {
  slug: string
  name: string
  aliases: string[]
  summary: string
  status: string
  categories: string[]
}

export async function GET() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'peptides',
    limit: 500,
    depth: 1,
    sort: 'name',
    overrideAccess: true,
  })

  const index: PeptideIndexItem[] = (docs as Peptide[]).map((p) => ({
    slug: p.slug,
    name: p.name,
    aliases: (p.aliases ?? []).map((a) => a.alias ?? '').filter(Boolean),
    summary: p.summary?.slice(0, 120) ?? '',
    status: p.researchStatus ?? '',
    categories: (p.categories ?? [])
      .filter((c): c is Category => typeof c === 'object')
      .map((c) => c.name),
  }))

  return NextResponse.json(index, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  })
}
