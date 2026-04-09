/**
 * Database seed script
 * Run: node --import tsx/esm src/seeds/seed.ts
 *   or: npx tsx src/seeds/seed.ts
 *
 * Seeds: categories → peptides (top 100)
 * Safe to re-run — skips existing records by slug.
 */

import payload from 'payload'
import config from '@payload-config'
import { categoriesData } from './data/categories'
import { peptidesData } from './data/peptides'
import { peptidesData2 } from './data/peptides2'

async function seed() {
  await payload.init({ config })

  console.log('\n── Seeding categories ──────────────────────────')
  const categorySlugToId: Record<string, string> = {}

  for (const cat of categoriesData) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      categorySlugToId[cat.slug] = existing.docs[0].id as string
      console.log(`  skip: ${cat.name}`)
    } else {
      const created = await payload.create({ collection: 'categories', data: cat })
      categorySlugToId[cat.slug] = created.id as string
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
