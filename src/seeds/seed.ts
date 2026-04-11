/**
 * Database seed script
 * Run: node --import tsx/esm src/seeds/seed.ts
 *   or: npx tsx src/seeds/seed.ts
 *
 * Seeds: categories → peptides (top 100)
 * Safe to re-run — skips existing records by slug.
 */

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

async function seed() {
  const { default: payload } = await import('payload')
  const { default: config } = await import('@payload-config')
  const { categoriesData } = await import('./data/categories')
  const { peptidesData } = await import('./data/peptides')
  const { peptidesData2 } = await import('./data/peptides2')

  await payload.init({ config })

  console.log('\n── Seeding categories ──────────────────────────')
  const categorySlugToId: Record<string, number> = {}

  for (const cat of categoriesData) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      categorySlugToId[cat.slug] = existing.docs[0].id
      console.log(`  skip: ${cat.name}`)
    } else {
      const created = await payload.create({ collection: 'categories', data: cat })
      categorySlugToId[cat.slug] = created.id
      console.log(`  ✓ ${cat.name}`)
    }
  }

  console.log('\n── Seeding peptides ────────────────────────────')
  const allPeptides = [...peptidesData, ...peptidesData2]

  let created = 0
  let skipped = 0

  for (const peptide of allPeptides) {
    const existing = await payload.find({
      collection: 'peptides',
      where: { slug: { equals: peptide.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    // Resolve category slugs → IDs
    const categoryIds = (peptide.categories as string[])
      .map((slug) => categorySlugToId[slug])
      .filter(Boolean)

    const { categories: _cats, ...rest } = peptide

    await payload.create({
      collection: 'peptides',
      data: {
        ...rest,
        categories: categoryIds,
      } as any,
    })

    console.log(`  ✓ ${peptide.name}`)
    created++
  }

  console.log(`\nDone. Created: ${created} peptides, Skipped: ${skipped} (already exist)`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
