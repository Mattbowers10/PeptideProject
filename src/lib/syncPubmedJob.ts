/**
 * Core PubMed sync logic — shared between the Vercel cron route and the CLI script.
 *
 * For each peptide that has pubmedSearchTerms defined:
 *  1. Search PubMed for PMIDs matching the terms
 *  2. Skip any PMIDs already in the DB
 *  3. Fetch full article details for new PMIDs
 *  4. Create Study records
 *  5. Link studies back to the peptide
 *  6. Update peptide.lastPubmedSync timestamp
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { searchPubMed, fetchArticles } from './pubmed'

export type SyncResult = {
  peptidesSynced: number
  newStudies: number
  errors: string[]
  durationMs: number
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export async function runPubmedSync(): Promise<SyncResult> {
  const start = Date.now()
  const payload = await getPayload({ config })

  const { docs: peptides } = await payload.find({
    collection: 'peptides',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })

  let peptidesSynced = 0
  let newStudies = 0
  const errors: string[] = []

  console.log(`[pubmed-sync] Starting sync for ${peptides.length} peptides`)

  for (const peptide of peptides) {
    const terms: string[] = ((peptide.pubmedSearchTerms as any[]) ?? [])
      .map((t: any) => t.term as string)
      .filter(Boolean)

    if (terms.length === 0) continue

    try {
      const query = terms.join(' OR ')
      const pmids = await searchPubMed(query, 30)

      if (pmids.length === 0) {
        console.log(`[pubmed-sync]   ${peptide.name}: no results`)
        continue
      }

      // Find which PMIDs are already in the DB
      const existingResult = await payload.find({
        collection: 'studies',
        where: { pubmedId: { in: pmids } },
        limit: 100,
        depth: 0,
        overrideAccess: true,
      })
      const existingPmids = new Set(existingResult.docs.map((s: any) => s.pubmedId as string))
      const newPmids = pmids.filter((id) => !existingPmids.has(id))

      if (newPmids.length === 0) {
        console.log(`[pubmed-sync]   ${peptide.name}: all ${pmids.length} studies already synced`)
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
          overrideAccess: true,
        })
        createdIds.push(study.id)
        newStudies++
      }

      // Link new studies back to the peptide
      const currentStudyIds = ((peptide.studies as any[]) ?? []).map((s: any) =>
        typeof s === 'object' ? s.id : s,
      )
      await payload.update({
        collection: 'peptides',
        id: peptide.id,
        data: {
          studies: [...currentStudyIds, ...createdIds],
          lastPubmedSync: new Date().toISOString(),
        },
        overrideAccess: true,
      })

      console.log(`[pubmed-sync]   ${peptide.name}: +${createdIds.length} new studies`)
      peptidesSynced++

      // Respect NCBI rate limit — 10 req/sec with API key, 3 req/sec without
      await sleep(process.env.NCBI_API_KEY ? 120 : 400)
    } catch (err: any) {
      const msg = `${peptide.name}: ${err?.message ?? String(err)}`
      console.error(`[pubmed-sync]   ERROR ${msg}`)
      errors.push(msg)
    }
  }

  const durationMs = Date.now() - start
  console.log(
    `[pubmed-sync] Done — ${peptidesSynced} peptides synced, ${newStudies} new studies, ${errors.length} errors (${durationMs}ms)`,
  )

  return { peptidesSynced, newStudies, errors, durationMs }
}
