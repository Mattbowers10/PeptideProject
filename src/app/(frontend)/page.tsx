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
  title: 'Peptide United — Research-First Peptide Encyclopedia',
  description:
    'Comprehensive, evidence-based profiles for 100+ peptides. Mechanisms of action, pharmacokinetics, clinical research, and trusted suppliers — all in one place.',
  openGraph: {
    title: 'Peptide United — Research-First Peptide Encyclopedia',
    description:
      'Comprehensive, evidence-based profiles for 100+ peptides. Mechanisms, pharmacokinetics, studies, and trusted suppliers.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://peptideunited.com',
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
            <p className="mono-label mb-4 text-black/40 anim-fade-up anim-delay-1">Research encyclopedia</p>

            <h1 className="mt-4 text-[48px] font-medium leading-[1.05] tracking-display text-black sm:text-[64px] anim-fade-up anim-delay-2">
              The Gold Standard<br />
              <span className="text-gradient">for Peptide Research.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[18px] leading-[1.4] tracking-tight text-black/60 anim-fade-up anim-delay-3">
              Evidence-based profiles for 100+ peptides. Mechanisms, pharmacokinetics,
              and direct links to peer-reviewed studies.
            </p>

            {/* Search */}
            <form action="/peptides" method="GET" className="mt-8 flex gap-2 anim-fade-up anim-delay-4">
              <input
                name="q"
                type="search"
                placeholder="Search BPC-157, Semaglutide, TB-500…"
                className="w-full max-w-sm rounded-sharp border bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-sunrise-500/30"
                style={{ borderColor: 'var(--border-light)' }}
              />
              <button type="submit" className="btn-dark">
                Search
              </button>
            </form>

            {/* Popular links */}
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[13px] anim-fade-up anim-delay-5">
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

            {/* Credibility badges */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 anim-fade-up anim-delay-5">
              {[
                '🔬 PubMed-synced research',
                '✓ Evidence-rated profiles',
                '🔓 Free summaries, always',
              ].map((badge) => (
                <span key={badge} className="text-[13px] text-black/45">
                  {badge}
                </span>
              ))}
            </div>

            {/* Lead magnet */}
            <div className="anim-fade-up anim-delay-6 relative z-10 mt-8 max-w-md -mb-12 rounded-comfortable border bg-white p-5 shadow-warm-lg" style={{ borderColor: 'var(--border-light)' }}>
              <EmailCapture
                leadMagnet
                source="lead-magnet"
                variant="homepage"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <section className="border-b bg-white" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { num: '102', label: 'Peptide profiles' },
              { num: '16', label: 'Research categories' },
              { num: '1,000+', label: 'PubMed studies linked' },
              { num: 'Free', label: 'Core access, always' },
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

      {/* ── Upgrade conversion strip ───────────────────────── */}
      <section className="border-y py-14" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mono-label mb-3 text-black/30">Researcher plan</p>
              <h2 className="text-[28px] font-medium tracking-heading text-black">
                Go deeper than the summary.
              </h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-black/55">
                Free summaries show you what a peptide is. Researcher profiles show you
                how it works — mechanism of action, pharmacokinetics, PubMed-linked
                studies, and evidence ratings.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/upgrade" className="btn-dark text-[14px]">
                  See plans →
                </Link>
                <Link href="/guide" className="btn-outline text-[14px]">
                  Free research guide
                </Link>
              </div>
            </div>
            <div className="grid gap-2">
              {[
                { free: true,  label: 'Peptide summary & research status' },
                { free: true,  label: 'Category browsing & search' },
                { free: false, label: 'Full mechanism of action profile' },
                { free: false, label: 'Pharmacokinetics & half-life data' },
                { free: false, label: 'PubMed study links & evidence ratings' },
                { free: false, label: 'Peptide comparison tool' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 rounded-comfortable px-4 py-2.5 text-[13px]"
                  style={{ background: row.free ? 'rgba(0,0,0,0.02)' : 'rgba(232,98,42,0.06)', borderLeft: row.free ? '2px solid rgba(0,0,0,0.08)' : '2px solid rgba(232,98,42,0.25)' }}
                >
                  <span className={row.free ? 'text-emerald-500' : 'text-lavender'}>
                    {row.free ? '✓ Free' : '🔬 Researcher'}
                  </span>
                  <span className={row.free ? 'text-black/60' : 'text-black/80'}>{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ───────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-10 text-center text-black/25">Why researchers use Peptide United</p>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                quote: 'The most thorough peptide mechanism breakdowns I\u2019ve found outside of primary literature.',
                role: 'Functional Medicine Practitioner',
              },
              {
                quote: 'PubMed-linked profiles save hours of research time. The half-life data is a game-changer for protocol design.',
                role: 'PhD Researcher, Biochemistry',
              },
              {
                quote: 'Finally a credible, research-first source I can share with colleagues without cringing at the marketing language.',
                role: 'Compounding Pharmacist',
              },
            ].map((t) => (
              <div
                key={t.role}
                className="rounded-comfortable p-6"
                style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-light)' }}
              >
                <p className="text-[14px] leading-[1.7] text-black/65 before:content-['\u201c'] after:content-['\u201d']">
                  {t.quote}
                </p>
                <p className="mt-4 font-mono text-[11px] tracking-mono text-black/30">&mdash; {t.role}</p>
              </div>
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
