/**
 * PubMed Sync Job
 *
 * Run via:  npx payload run src/jobs/syncPubmed.ts
 * Schedule: cron — daily at 02:00 UTC (configure in Trigger.dev or Vercel cron)
 *
 * For each active peptide with pubmedSearchTerms defined:
 *  1. Search PubMed for new PMIDs
 *  2. Skip PMIDs already in the DB
 *  3. Fetch article details for new PMIDs
 *  4. Create Study records
 *  5. Link studies back to the peptide
 *  6. Update peptide.lastPubmedSync
 */

import payload from 'payload'
import config from '@payload-config'
import { searchPubMed, fetchArticles } from '../lib/pubmed'

async function run() {
  await payload.init({ config })

  const { docs: peptides } = await payload.find({
    collection: 'peptides',
    limit: 200,
  })

  console.log(`Syncing PubMed for ${peptides.length} peptides...`)

  for (const peptide of peptides) {
    const terms: string[] = (peptide.pubmedSearchTerms ?? []).map((t: any) => t.term).filter(Boolean)
    if (terms.length === 0) continue

    try {
      // Combine all search terms into one OR query
      const query = terms.join(' OR ')
      const pmids = await searchPubMed(query, 30)

      // Get existing study PMIDs for this peptide to avoid duplicates
      const existingStudies = await payload.find({
        collection: 'studies',
        where: { pubmedId: { in: pmids } },
        limit: 100,
      })
      const existingPmids = new Set(existingStudies.docs.map((s: any) => s.pubmedId))
      const newPmids = pmids.filter((id) => !existingPmids.has(id))

      if (newPmids.length === 0) {
        console.log(`  ${peptide.name}: no new studies`)
        continue
      }

      const articles = await fetchArticles(newPmids)
      const createdIds: number[] = []

      for (const article of articles) {
        const study = await payload.create({
          collection: 'studies',
          data: {
            pubmedId: article.pubmedId,
            title: article.title,
            abstract: article.abstract,
            authors: article.authors,
            journal: article.journal,
            publishedDate: article.publishedDate,
            doi: article.doi ?? undefined,
            url: article.url,
            peptides: [peptide.id],
            source: 'pubmed',
            syncedAt: new Date().toISOString(),
          },
        })
        createdIds.push(study.id)
      }

      // Link new studies to peptide
      const currentStudyIds = ((peptide.studies as any[]) ?? []).map((s: any) =>
        typeof s === 'string' ? s : s.id,
      )

      await payload.update({
        collection: 'peptides',
        id: peptide.id,
        data: {
          studies: [...currentStudyIds, ...createdIds],
          lastPubmedSync: new Date().toISOString(),
        },
      })

      console.log(`  ${peptide.name}: +${createdIds.length} new studies`)

      // Respect rate limit (3 req/sec without API key)
      await sleep(400)
    } catch (err) {
      console.error(`  ${peptide.name}: sync failed —`, err)
    }
  }

  console.log('PubMed sync complete.')
  process.exit(0)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
