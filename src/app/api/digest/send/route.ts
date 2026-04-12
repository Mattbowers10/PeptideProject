import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendEmail } from '@/lib/email'
import { weeklyDigestEmail } from '@/lib/email-templates'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  // Auth: CRON_SECRET header required
  const secret = req.headers.get('authorization')?.replace('Bearer ', '')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  // Fetch recent published articles (last 7 days)
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      and: [
        { status: { equals: 'published' } },
        { publishedAt: { greater_than: weekAgo } },
      ],
    },
    limit: 3,
    sort: '-publishedAt',
    depth: 0,
  })

  // Fetch 5 featured peptides (hardcoded top research ones)
  const featuredSlugs = ['bpc-157', 'ipamorelin', 'epithalon', 'ghk-cu', 'tb-500']
  const featuredPeptides: { name: string; url: string; status?: string }[] = []
  for (const slug of featuredSlugs) {
    const { docs } = await payload.find({
      collection: 'peptides',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (docs[0]) {
      featuredPeptides.push({
        name: docs[0].name,
        url: `https://peptideunited.com/peptides/${slug}`,
        status: (docs[0] as { researchStatus?: string }).researchStatus ?? undefined,
      })
    }
  }

  // Fetch all subscribers
  const { docs: subscribers } = await payload.find({
    collection: 'email-subscribers',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })

  const weekOf = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  const articleData = articles.map(a => ({
    title: (a as { title: string }).title,
    url: `https://peptideunited.com/research/${(a as { slug: string }).slug}`,
    excerpt: (a as { excerpt?: string }).excerpt ?? undefined,
    category: ((a as { category?: string }).category) ?? 'Research',
  }))

  // Send in batches of 10 (rate limiting)
  let sent = 0
  let failed = 0
  for (const sub of subscribers) {
    try {
      const { subject, html } = weeklyDigestEmail({
        articles: articleData,
        peptides: featuredPeptides,
        weekOf,
      })
      const result = await sendEmail({ to: (sub as { email: string }).email, subject, html })
      if (result.ok) sent++
      else failed++
    } catch {
      failed++
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: subscribers.length })
}
