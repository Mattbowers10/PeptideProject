/**
 * Content seed script — run AFTER the main seed.ts
 *
 * Populates:
 *  1. Rich content (Lexical JSON) for the top 10 peptide profiles
 *  2. Partner records (PureRawz, Behemoth Labz, BC9)
 *  3. Affiliate links connecting partners → peptides
 *
 * Run: node --import tsx/esm src/seeds/seedContent.ts
 *   or: npx tsx src/seeds/seedContent.ts
 */

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

async function seed() {
  const { default: payload } = await import('payload')
  const { default: config } = await import('@payload-config')
  const { richContent } = await import('./data/rich-content')
  const { richContent2 } = await import('./data/rich-content-2')
  const { richContent3 } = await import('./data/rich-content-3')
  const { richContent4 } = await import('./data/rich-content-4')
  const { richContent5 } = await import('./data/rich-content-5')
  const { richContent6 } = await import('./data/rich-content-6')
  const { richContent7 } = await import('./data/rich-content-7')
  const { richContent8 } = await import('./data/rich-content-8')
  const { richContent9 } = await import('./data/rich-content-9')
  const { richContent10 } = await import('./data/rich-content-10')
  const { richContent11 } = await import('./data/rich-content-11')
  const { partnersData } = await import('./data/partners-data')

  await payload.init({ config })

  // ── 1. Rich content for peptides ────────────────────────────
  console.log('\n── Updating peptide rich content ───────────────────────')

  const allRichContent = { ...richContent, ...richContent2, ...richContent3, ...richContent4, ...richContent5, ...richContent6, ...richContent7, ...richContent8, ...richContent9, ...richContent10, ...richContent11 }

  for (const [slug, content] of Object.entries(allRichContent)) {
    const existing = await payload.find({
      collection: 'peptides',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      console.log(`  skip: ${slug} (peptide not found — run seed.ts first)`)
      continue
    }

    const peptide = existing.docs[0]!
    await payload.update({
      collection: 'peptides',
      id: peptide.id,
      data: {
        mechanismOfAction: content.mechanismOfAction as any,
        pharmacokinetics: content.pharmacokinetics as any,
        researchFindings: content.researchFindings as any,
        sideEffectsAndSafety: content.sideEffectsAndSafety as any,
      },
    })
    console.log(`  ✓ ${slug}`)
  }

  // ── 2. Partners ──────────────────────────────────────────────
  console.log('\n── Seeding partners ────────────────────────────────────')
  const partnerSlugToId: Record<string, number> = {}

  for (const partnerData of partnersData) {
    const existing = await payload.find({
      collection: 'partners',
      where: { slug: { equals: partnerData.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      partnerSlugToId[partnerData.slug] = existing.docs[0]!.id
      console.log(`  skip: ${partnerData.name} (already exists)`)
      continue
    }

    // Resolve carried peptide slugs → IDs
    const peptideIds: number[] = []
    for (const pSlug of partnerData.carriedPeptideSlugs) {
      const result = await payload.find({
        collection: 'peptides',
        where: { slug: { equals: pSlug } },
        limit: 1,
      })
      if (result.docs[0]) peptideIds.push(result.docs[0].id)
    }

    const { carriedPeptideSlugs, affiliateLinkSlugs, destinations, ...rest } = partnerData
    const created = await payload.create({
      collection: 'partners',
      data: {
        ...rest,
        carriedPeptides: peptideIds,
      } as any,
    })
    partnerSlugToId[partnerData.slug] = created.id
    console.log(`  ✓ ${partnerData.name}`)
  }

  // ── 3. Affiliate links ───────────────────────────────────────
  console.log('\n── Seeding affiliate links ─────────────────────────────')

  for (const partnerData of partnersData) {
    const partnerId = partnerSlugToId[partnerData.slug]
    if (!partnerId) continue

    for (const peptideSlug of partnerData.affiliateLinkSlugs) {
      const destination = partnerData.destinations[peptideSlug]
      if (!destination) continue

      // Find peptide
      const peptideResult = await payload.find({
        collection: 'peptides',
        where: { slug: { equals: peptideSlug } },
        limit: 1,
      })
      const peptide = peptideResult.docs[0]
      if (!peptide) {
        console.log(`  skip link: ${partnerData.slug}/${peptideSlug} (peptide not found)`)
        continue
      }

      // Check for existing link
      const existingLink = await payload.find({
        collection: 'affiliate-links',
        where: {
          and: [
            { partner: { equals: partnerId } },
            { peptide: { equals: peptide.id } },
          ],
        },
        limit: 1,
        overrideAccess: true,
      })

      if (existingLink.docs.length > 0) {
        console.log(`  skip: ${partnerData.name} → ${peptideSlug} (link exists)`)
        continue
      }

      const link = await payload.create({
        collection: 'affiliate-links',
        data: {
          partner: partnerId,
          peptide: peptide.id,
          destinationUrl: destination,
          isActive: true,
        },
        overrideAccess: true,
      })

      // Update peptide to link back to this affiliate link
      const currentLinks = ((peptide.affiliateLinks as any[]) ?? []).map((l: any) =>
        typeof l === 'object' ? l.id : l,
      )
      await payload.update({
        collection: 'peptides',
        id: peptide.id,
        data: {
          affiliateLinks: [...currentLinks, link.id],
        },
      })

      console.log(`  ✓ ${partnerData.name} → ${peptideSlug}`)
    }
  }

  console.log('\nContent seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
