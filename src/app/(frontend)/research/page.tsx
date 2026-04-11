import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Article } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Research Hub | Peptide Wiki',
  description: 'In-depth guides, clinical context, and mechanism deep dives across 100+ peptide compounds.',
  openGraph: {
    title: 'Peptide Wiki Research Hub — Guides & Deep Dives',
    description: 'Curated research articles on peptide mechanisms, protocols, and clinical context.',
  },
}

// Category display info
const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  guide:      { label: 'Research Guide',     color: 'text-emerald-600 bg-emerald-50' },
  comparison: { label: 'Comparison',          color: 'text-blue-600 bg-blue-50' },
  clinical:   { label: 'Clinical Context',    color: 'text-purple-600 bg-purple-50' },
  mechanism:  { label: 'Mechanism Deep Dive', color: 'text-orange-600 bg-orange-50' },
  protocol:   { label: 'Protocol Overview',   color: 'text-rose-600 bg-rose-50' },
  regulatory: { label: 'Regulatory Update',   color: 'text-gray-600 bg-gray-100' },
}

export default async function ResearchPage() {
  let articles: Article[] = []
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 50,
      depth: 0,
    })
    articles = docs as Article[]
  } catch {
    // Articles table may not exist yet (pre-migration) — show empty state
  }

  return (
    <>
      {/* Hero */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-3 text-black/40">Research hub</p>
          <h1 className="text-[36px] font-medium leading-[1.1] tracking-display text-black sm:text-[48px]">
            Guides & Deep Dives
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.5] text-black/50">
            Mechanism deep dives, protocol overviews, and clinical context — written for researchers and practitioners.
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-12">
        {articles.length === 0 ? (
          <div className="rounded-comfortable border py-16 text-center" style={{ borderColor: 'var(--border-light)' }}>
            <p className="mono-label text-black/30">Coming soon</p>
            <p className="mt-2 text-[14px] text-black/40">Research articles are being prepared. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const cat = CATEGORY_LABELS[article.category] ?? { label: article.category, color: 'text-black/50 bg-black/5' }
              return (
                <Link
                  key={article.id}
                  href={`/research/${article.slug}`}
                  className="group flex flex-col rounded-comfortable border bg-white p-5 transition-shadow hover:shadow-md"
                  style={{ borderColor: 'var(--border-light)' }}
                >
                  <span className={`inline-block self-start rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono ${cat.color}`}>
                    {cat.label}
                  </span>
                  <h2 className="mt-3 text-[16px] font-medium leading-[1.3] tracking-heading text-black group-hover:text-lavender transition-colors">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-black/50">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {article.publishedAt && (
                      <p className="font-mono text-[11px] tracking-mono text-black/25">
                        {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                    {article.readTimeMinutes && (
                      <p className="font-mono text-[11px] tracking-mono text-black/25">
                        {article.readTimeMinutes} min read
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t py-12" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="mono-label mb-2 text-black/30">Or explore the database</p>
          <div className="flex justify-center gap-3">
            <Link href="/peptides" className="btn-outline text-[13px]">Browse all peptides</Link>
            <Link href="/upgrade" className="btn-dark text-[13px]">View research plans →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
