import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PeptideCard } from '@/components/PeptideCard'
import type { Category, Peptide } from '@/payload-types'

export const revalidate = 3600

async function getCategory(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] as Category | undefined
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) return { title: 'Category Not Found' }
  return {
    title: `${category.name} | Peptide United`,
    description: category.description ?? undefined,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const category = await getCategory(slug)
  if (!category) notFound()

  const { docs: peptides, totalDocs } = await payload.find({
    collection: 'peptides',
    where: { categories: { contains: category.id } },
    limit: 100,
    depth: 1,
    sort: 'name',
  })

  return (
    <>
      {/* ── Header — pastel gradient ───────────────────────────── */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-[13px]">
            <Link href="/" className="text-black/30 transition-colors hover:text-black">
              Home
            </Link>
            <span className="text-black/20">/</span>
            <Link href="/categories" className="text-black/30 transition-colors hover:text-black">
              Categories
            </Link>
            <span className="text-black/20">/</span>
            <span className="text-black/60">{category.name}</span>
          </nav>

          {category.icon && (
            <span className="mb-3 inline-block text-[36px]" role="img" aria-hidden="true">
              {category.icon}
            </span>
          )}

          <h1 className="text-[36px] font-medium leading-[1.1] tracking-display text-black sm:text-[48px]">
            {category.name}
          </h1>

          {category.description && (
            <p className="mt-3 max-w-xl text-[15px] leading-[1.5] text-black/50">
              {category.description}
            </p>
          )}

          <p className="mono-label mt-4 text-black/40">
            {totalDocs} peptide{totalDocs !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </section>

      {/* ── Peptides grid ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 py-12">
        {peptides.length === 0 ? (
          <div className="card-light p-12 text-center">
            <p className="text-[18px] font-medium tracking-heading text-black">
              No peptides found in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(peptides as Peptide[]).map((peptide) => (
              <PeptideCard key={peptide.id} peptide={peptide} />
            ))}
          </div>
        )}
      </section>

      {/* ── Navigation ─────────────────────────────────────────── */}
      <section className="border-t py-8" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between">
          <Link
            href="/categories"
            className="text-[13px] tracking-tight text-black/40 transition-colors hover:text-black"
          >
            ← All categories
          </Link>
          <Link
            href="/peptides"
            className="text-[13px] tracking-tight text-black/40 transition-colors hover:text-black"
          >
            Browse all peptides →
          </Link>
        </div>
      </section>
    </>
  )
}
