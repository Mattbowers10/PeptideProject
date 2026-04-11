import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CategoryCard } from '@/components/CategoryCard'
import { PeptideCard } from '@/components/PeptideCard'
import { RecentlyViewed } from '@/components/RecentlyViewed'
import { EmailCapture } from '@/components/EmailCapture'
import type { Category, Peptide } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Peptide Wiki — Research-First Peptide Encyclopedia',
  description:
    'Comprehensive, evidence-based profiles for 100+ peptides. Mechanisms of action, pharmacokinetics, clinical research, and trusted suppliers — all in one place.',
  openGraph: {
    title: 'Peptide Wiki — Research-First Peptide Encyclopedia',
    description:
      'Comprehensive, evidence-based profiles for 100+ peptides. Mechanisms, pharmacokinetics, studies, and trusted suppliers.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://peptidewiki.com',
  },
}

async function getData() {
  const payload = await getPayload({ config })

  const [categoriesResult, peptidesResult] = await Promise.all([
    payload.find({ collection: 'categories', limit: 100, sort: 'name' }),
    payload.find({ collection: 'peptides', limit: 6, depth: 1, sort: 'name' }),
  ])

  const countMap: Record<number, number> = {}
  for (const cat of categoriesResult.docs) {
    const { totalDocs } = await payload.find({
      collection: 'peptides',
      where: { categories: { contains: cat.id } },
      limit: 0,
    })
    countMap[cat.id] = totalDocs
  }

  return {
    categories: categoriesResult.docs as Category[],
    featuredPeptides: peptidesResult.docs as Peptide[],
    countMap,
  }
}

export default async function HomePage() {
  const { categories, featuredPeptides, countMap } = await getData()

  return (
    <>
      {/* ── Hero — pastel gradient ─────────────────────────────── */}
      <section className="gradient-pastel py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl">
            <p className="mono-label mb-4 text-black/40">Research encyclopedia</p>

            <h1 className="text-[48px] font-medium leading-[1.05] tracking-display text-black sm:text-[64px]">
              The peptide
              <br />
              <span className="text-lavender">reference.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[18px] leading-[1.4] tracking-tight text-black/60">
              Evidence-based profiles for 100+ peptides. Mechanisms, pharmacokinetics,
              and direct links to peer-reviewed studies.
            </p>

            {/* Search */}
            <form action="/peptides" method="GET" className="mt-8 flex gap-2">
              <input
                name="q"
                type="search"
                placeholder="Search BPC-157, Semaglutide, TB-500…"
                className="w-full max-w-sm rounded-sharp border bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
                style={{ borderColor: 'var(--border-light)' }}
              />
              <button type="submit" className="btn-dark">
                Search
              </button>
            </form>

            {/* Popular links */}
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
              <span className="text-black/30">Popular:</span>
              {['BPC-157', 'Semaglutide', 'Ipamorelin', 'PT-141', 'Epithalon'].map((name) => (
                <Link
                  key={name}
                  href={`/peptides?q=${encodeURIComponent(name)}`}
                  className="text-black/50 underline-offset-2 transition-colors hover:text-black hover:underline"
                >
                  {name}
                </Link>
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <section className="border-b bg-white" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-8">
          <div className="grid grid-cols-3 gap-6">
            {[
              { num: '100+', label: 'Peptide profiles' },
              { num: '16', label: 'Research categories' },
              { num: 'Free', label: 'Access to summaries' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[28px] font-medium tracking-display text-black sm:text-[36px]">
                  {stat.num}
                </p>
                <p className="mono-label mt-1 text-black/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mono-label mb-2 text-black/30">Browse by category</p>
            <h2 className="text-[28px] font-medium tracking-heading text-black">
              Research Areas
            </h2>
          </div>
          <Link href="/categories" className="text-sm tracking-tight text-black/40 transition-colors hover:text-black">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              count={countMap[cat.id]}
            />
          ))}
        </div>
      </section>

      {/* ── Featured peptides ──────────────────────────────────── */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mono-label mb-2 text-white/30">Specimen index</p>
              <h2 className="text-[28px] font-medium tracking-heading text-white">
                Explore Peptides
              </h2>
            </div>
            <Link
              href="/peptides"
              className="text-sm tracking-tight text-white/40 transition-colors hover:text-white"
            >
              View all 100+ →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPeptides.map((peptide) => (
              <PeptideCard key={peptide.id} peptide={peptide} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Recently viewed (relationship layer) ───────────────── */}
      <div className="mx-auto max-w-[1200px] px-6">
        <RecentlyViewed />
      </div>

      {/* ── Email capture ───────────────────────────────────────── */}
      <section className="bg-midnight py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mono-label mb-3 text-white/30">Research updates</p>
              <EmailCapture
                variant="dark"
                source="homepage"
                heading="Stay updated on peptide research."
                subheading="New profiles, synced PubMed studies, and research summaries — delivered free."
              />
            </div>
            <div className="space-y-4">
              {[
                { icon: '🔬', text: 'Weekly digest of new PubMed studies across 16 research categories' },
                { icon: '📊', text: 'Profile updates when new pharmacokinetics or mechanism data is published' },
                { icon: '🔓', text: 'Early access to new peptide profiles and research tools' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[18px]">{item.icon}</span>
                  <p className="text-[14px] leading-[1.5] text-white/50">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="border-t py-16" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="mono-label mb-3 text-black/30">Open access</p>
          <h2 className="mx-auto max-w-md text-[28px] font-medium tracking-heading text-black">
            Research-grade information, free.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.5] text-black/50">
            Every profile includes a summary, research status, and administration
            routes — no account required.
          </p>
          <Link href="/peptides" className="btn-dark mt-6">
            Browse All Peptides
          </Link>
        </div>
      </section>
    </>
  )
}
