/**
 * Vercel Cron — PubMed Study Sync
 *
 * Scheduled daily at 02:00 UTC via vercel.json.
 * Vercel automatically passes Authorization: Bearer ${CRON_SECRET} when invoking.
 *
 * Can also be triggered manually:
 *   curl -X GET https://peptidewiki.com/api/cron/sync-pubmed \
 *     -H "Authorization: Bearer YOUR_CRON_SECRET"
 */

import { NextRequest, NextResponse } from 'next/server'
import { runPubmedSync } from '@/lib/syncPubmedJob'

export const maxDuration = 300 // 5 minutes — Vercel Pro max for cron functions

export async function GET(req: NextRequest) {
  // Verify the request is from Vercel cron or an authorized caller
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.error('[cron/sync-pubmed] CRON_SECRET env var is not set')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await runPubmedSync()
    return NextResponse.json({ ok: true, ...result }, { status: 200 })
  } catch (err: any) {
    console.error('[cron/sync-pubmed] Fatal error:', err)
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'Unknown error' },
      { status: 500 },
    )
  }
}
