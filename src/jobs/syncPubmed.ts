/**
 * PubMed Sync — CLI runner
 *
 * Run manually:  npm run seed:pubmed
 * Scheduled:     Vercel cron via /api/cron/sync-pubmed (see vercel.json)
 */

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

async function main() {
  const { runPubmedSync } = await import('../lib/syncPubmedJob')
  const result = await runPubmedSync()
  console.log('\nResult:', result)
  process.exit(result.errors.length > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
