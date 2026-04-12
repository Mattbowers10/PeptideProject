import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PeptideCard } from '@/components/PeptideCard'
import type { Category, Peptide } from '@/payload-types'
import type { Where } from 'payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'All Peptides',
  description:
    'Browse 100+ peptide profiles with research status, mechanism of action, and administration routes.',
}

type SearchParams = {
  q?: string
  category?: string
  status?: string
  page?: string
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'preclinical', label: 'Preclinical' },
  { value: 'phase1', label: 'Phase I' },
  { value: 'phase2', label: 'Phase II' },
  { value: 'phase3', label: 'Phase III' },
  { value: 'approved', label: 'Approved' },
  { value: 'discontinued', label: 'Discontinued' },
]

const PAGE_SIZE = 24

async function getData(params: SearchParams) {
  const payload = await getPayload({ config })

  const currentPage = Math.max(1, parseInt(params.page ?? '1', 10))
  const where: Where = {}

  if (params.q) {
    where.or = [
      { name: { like: params.q } },
      { 'aliases.alias': { like: params.q } },
      { summary: { like: params.q } },
    ]
  }

  if (params.status) {
    where.researchStatus = { equals: params.status }
  }

  if (params.category) {
    const catResult = await payload.find({
      collection: 'categories',
      where: { slug: { equals: params.category } },
      limit: 1,
    })
    if (catResult.docs[0]) {
      where.categories = { contains: catResult.docs[0].id }
    }
  }

  const peptidesResult = await payload.find({
    collection: 'peptides',
    where,
    limit: PAGE_SIZE,
    page: currentPage,
    depth: 1,
    sort: 'name',
  })
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
    sort: 'name',
  })

  return {
    peptides: peptidesResult.docs as Peptide[],
    totalDocs: peptidesResult.totalDocs,
    totalPages: peptidesResult.totalPages,
    currentPage,
    categories: categoriesResult.docs as Category[],
  }
}

export default async function PeptidesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { peptides, totalDocs, totalPages, currentPage, categories } = await getData(params)

  const buildUrl = (overrides: Partial<SearchParams>) => {
    const next = { ...params, ...overrides }
    const qs = new URLSearchParams()
    if (next.q) qs.set('q', next.q)
    if (next.category) qs.set('category', next.category)
    if (next.status) qs.set('status', next.status)
    if (next.page && next.page !== '1') qs.set('page', next.page)
    const str = qs.toString()
    return `/peptides${str ? `?${str}` : ''}`
  }

  const hasFilters = !!(params.q || params.category || params.status)

  return (
    <>
      {/* ── Page header — pastel gradient ──────────────────────── */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-3 text-black/40">Specimen index</p>
          <h1 className="text-[36px] font-medium leading-[1.1] tracking-display text-black sm:text-[48px]">
            Peptide Database
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.5] text-black/50">
            {totalDocs} peptide{totalDocs !== 1 ? 's' : ''} —{' '}
            {hasFilters ? 'filtered results' : 'all research profiles'}
          </p>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full shrink-0 lg:w-56">
            <div className="card-light p-5">
              {/* Search */}
              <form action="/peptides" method="GET">
                {params.category && (
                  <input type="hidden" name="category" value={params.category} />
                )}
                {params.status && (
                  <input type="hidden" name="status" value={params.status} />
                )}
                <p className="mono-label mb-2 text-black/30">Search</p>
                <input
                  name="q"
                  type="search"
                  defaultValue={params.q ?? ''}
                  placeholder="Name or alias…"
                  className="w-full rounded-sharp border bg-white px-3 py-2.5 text-sm tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
                  style={{ borderColor: 'var(--border-light)' }}
                />
                <button type="submit" className="btn-dark mt-2 w-full justify-center">
                  Search
                </button>
              </form>

              {/* Status filter */}
              <div className="mt-6">
                <p className="mono-label mb-2 text-black/30">Research Status</p>
                <div className="flex flex-col gap-0.5">
                  {STATUS_OPTIONS.map((opt) => (
                    <Link
                      key={opt.value}
                      href={buildUrl({ status: opt.value, page: '1' })}
                      className={`rounded-sharp px-3 py-1.5 text-[13px] tracking-tight transition-colors ${
                        (params.status ?? '') === opt.value
                          ? 'bg-midnight text-white font-medium'
                          : 'text-black/60 hover:bg-black/[0.04]'
                      }`}
                    >
                      {opt.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category filter */}
              <div className="mt-6">
                <p className="mono-label mb-2 text-black/30">Category</p>
                <div className="flex flex-col gap-0.5">
                  <Link
                    href={buildUrl({ category: '', page: '1' })}
                    className={`rounded-sharp px-3 py-1.5 text-[13px] tracking-tight transition-colors ${
                      !params.category
                        ? 'bg-midnight text-white font-medium'
                        : 'text-black/60 hover:bg-black/[0.04]'
                    }`}
                  >
                    All Categories
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={buildUrl({ category: cat.slug, page: '1' })}
                      className={`rounded-sharp px-3 py-1.5 text-[13px] tracking-tight transition-colors ${
                        params.category === cat.slug
                          ? 'bg-midnight text-white font-medium'
                          : 'text-black/60 hover:bg-black/[0.04]'
                      }`}
                    >
                      {cat.icon && <span className="mr-1">{cat.icon}</span>}
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            {peptides.length === 0 ? (
              <div className="card-light p-12 text-center">
                <p className="text-[18px] font-medium tracking-heading text-black">
                  No peptides found
                </p>
                <p className="mt-2 text-[14px] text-black/40">
                  Try adjusting your search or filters
                </p>
                <Link href="/peptides" className="btn-outline mt-5">
                  Clear all filters
                </Link>
              </div>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {peptides.map((peptide) => (
                    <PeptideCard key={peptide.id} peptide={peptide} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-3">
                    {currentPage > 1 && (
                      <Link
                        href={buildUrl({ page: String(currentPage - 1) })}
                        className="btn-outline"
                      >
                        ← Previous
                      </Link>
                    )}
                    <span className="mono-label text-black/30">
                      Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                      <Link
                        href={buildUrl({ page: String(currentPage + 1) })}
                        className="btn-outline"
                      >
                        Next →
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
