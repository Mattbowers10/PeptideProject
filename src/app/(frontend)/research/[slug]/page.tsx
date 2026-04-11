import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import type { Article, Peptide } from '@/payload-types'

export const revalidate = 3600

// Category display info
const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  guide:      { label: 'Research Guide',     color: 'text-emerald-400 bg-emerald-400/10' },
  comparison: { label: 'Comparison',          color: 'text-sky-400 bg-sky-400/10' },
  clinical:   { label: 'Clinical Context',    color: 'text-purple-400 bg-purple-400/10' },
  mechanism:  { label: 'Mechanism Deep Dive', color: 'text-orange-400 bg-orange-400/10' },
  protocol:   { label: 'Protocol Overview',   color: 'text-rose-400 bg-rose-400/10' },
  regulatory: { label: 'Regulatory Update',   color: 'text-white/40 bg-white/10' },
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      limit: 200,
      depth: 0,
    })
    return (docs as Article[]).map((a) => ({ slug: a.slug }))
  } catch {
    // Articles table may not exist yet (pre-migration) — return empty so build succeeds
    return []
  }
}

async function getArticle(slug: string): Promise<Article | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return (result.docs[0] as Article | undefined) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article Not Found' }

  const title = article.seoTitle ?? article.title
  const description = article.seoDescription ?? article.excerpt ?? undefined

  return {
    title: `${title} | Peptide Wiki`,
    description,
    openGraph: {
      title: `${title} — Peptide Wiki Research`,
      description,
    },
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article || article.status !== 'published') notFound()

  const cat = CATEGORY_LABELS[article.category] ?? { label: article.category, color: 'text-white/40 bg-white/10' }

  // Related peptides — populated at depth 2
  const relatedPeptides = ((article.relatedPeptides ?? []).filter(
    (p): p is Peptide => typeof p === 'object' && p !== null,
  ) as Peptide[])

  type LexicalData = { root: { children: unknown[] } }
  const body = article.body as LexicalData | null | undefined

  const base = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://peptidewiki.com').replace(/\/$/, '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt ?? undefined,
    url: `${base}/research/${article.slug}`,
    datePublished: article.publishedAt ?? undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Peptide Wiki',
      url: base,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-midnight min-h-screen">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1200px] px-6 pt-8">
          <nav className="flex items-center gap-2 text-[13px]">
            <Link href="/" className="text-white/30 transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link href="/research" className="text-white/30 transition-colors hover:text-white">
              Research
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 line-clamp-1">{article.title}</span>
          </nav>
        </div>

        {/* Article header */}
        <header className="mx-auto max-w-[1200px] px-6 pt-10 pb-8">
          <span className={`inline-block rounded-sharp px-2 py-0.5 font-mono text-[10px] tracking-mono ${cat.color}`}>
            {cat.label}
          </span>
          <h1 className="mt-4 text-[36px] font-medium leading-[1.1] tracking-display text-white sm:text-[48px]">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-white/60">
              {article.excerpt}
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {article.publishedAt && (
              <p className="font-mono text-[11px] tracking-mono text-white/30">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            )}
            {article.readTimeMinutes && (
              <p className="font-mono text-[11px] tracking-mono text-white/30">
                {article.readTimeMinutes} min read
              </p>
            )}
          </div>
        </header>

        {/* Two-column layout */}
        <div className="mx-auto max-w-[1200px] px-6 pb-16">
          <div className="grid gap-6 lg:grid-cols-5">

            {/* Main content */}
            <div className="space-y-6 lg:col-span-3">
              {body && (
                <section className="card-dark p-6 sm:p-8">
                  <RichTextRenderer data={body as Parameters<typeof RichTextRenderer>[0]['data']} />
                </section>
              )}

              {/* Related peptides */}
              {relatedPeptides.length > 0 && (
                <section className="card-dark p-6">
                  <p className="mono-label mb-4 text-white/30">Related Peptides</p>
                  <div className="flex flex-wrap gap-2">
                    {relatedPeptides.map((peptide) => (
                      <Link
                        key={peptide.id}
                        href={`/peptides/${peptide.slug}`}
                        className="btn-glass text-[12px]"
                      >
                        {peptide.name} →
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <section className="card-dark p-6">
                  <p className="mono-label mb-4 text-white/30">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((t, i) =>
                      t.tag ? (
                        <span
                          key={i}
                          className="rounded-sharp bg-white/[0.06] px-3 py-1 font-mono text-[11px] tracking-mono text-white/40"
                        >
                          {t.tag}
                        </span>
                      ) : null,
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:col-span-2">
              {/* Upgrade CTA */}
              <div className="card-dark border-lavender/20 p-5">
                <p className="mono-label mb-2 text-lavender/60">Unlock Full Access</p>
                <p className="mb-4 text-[13px] leading-[1.6] text-white/50">
                  Get full mechanism profiles, pharmacokinetics, research findings,
                  and safety data for 100+ peptides on the Researcher plan.
                </p>
                <Link href="/upgrade" className="btn-dark w-full justify-center text-[13px]">
                  View research plans →
                </Link>
              </div>

              {/* Research disclaimer */}
              <div className="card-dark border-lavender/20 p-5">
                <p className="mono-label mb-2 text-lavender/60">Research Use Only</p>
                <p className="text-[12px] leading-[1.6] text-white/40">
                  The information in this article is for educational purposes and refers to
                  preclinical and clinical research. It is not medical advice and should
                  not be used for self-treatment.
                </p>
              </div>

              {/* Back to research */}
              <div className="card-dark p-5">
                <p className="mono-label mb-3 text-white/30">Explore more</p>
                <div className="flex flex-col gap-2">
                  <Link href="/research" className="text-[13px] text-white/50 transition-colors hover:text-white">
                    ← All research articles
                  </Link>
                  <Link href="/peptides" className="text-[13px] text-white/50 transition-colors hover:text-white">
                    Browse peptide database →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="rule-dark mx-auto max-w-[1200px] px-6 pb-12">
          <div className="flex items-center justify-between pt-6">
            <Link
              href="/research"
              className="text-[13px] tracking-tight text-white/40 transition-colors hover:text-white"
            >
              ← Back to research hub
            </Link>
            <Link
              href="/peptides"
              className="text-[13px] tracking-tight text-white/40 transition-colors hover:text-white"
            >
              Browse peptides →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
