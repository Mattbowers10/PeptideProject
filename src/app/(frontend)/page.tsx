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
  title: 'Peptide United — The Peptide Research Encyclopedia',
  description:
    'Evidence-based profiles for 100+ research peptides. Mechanisms of action, pharmacokinetics, and direct links to PubMed-indexed studies — written for practitioners and researchers.',
  openGraph: {
    title: 'Peptide United — The Peptide Research Encyclopedia',
    description:
      'Evidence-based profiles for 100+ research peptides. Mechanisms of action, pharmacokinetics, and PubMed-indexed studies for functional medicine practitioners and researchers.',
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
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="gradient-pastel py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl">
            <p className="mono-label mb-4 text-black/40 anim-fade-up anim-delay-1">
              Peptide research encyclopedia
            </p>

            <h1 className="mt-4 text-[48px] font-medium leading-[1.05] tracking-display text-black sm:text-[64px] anim-fade-up anim-delay-2">
              The Gold Standard<br />
              <span className="text-gradient">for Peptide Research.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[18px] leading-[1.4] tracking-tight text-black/60 anim-fade-up anim-delay-3">
              Evidence-based profiles for 100+ peptides. Mechanisms of action,
              pharmacokinetics, and direct links to PubMed-indexed studies — written
              for practitioners and researchers, not marketing departments.
            </p>

            {/* Search */}
            <form action="/peptides" method="GET" className="mt-8 flex gap-2 anim-fade-up anim-delay-4">
              <input
                name="q"
                type="search"
                placeholder="Search BPC-157, Retatrutide, GHK-Cu…"
                className="w-full max-w-sm rounded-sharp border bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-sunrise-500/30"
                style={{ borderColor: 'var(--border-light)' }}
              />
              <button type="submit" className="btn-dark">
                Search
              </button>
            </form>

            {/* Popular searches — high-traffic, low-competition targets */}
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[13px] anim-fade-up anim-delay-5">
              <span className="text-black/30">Popular:</span>
              {['BPC-157', 'Retatrutide', 'GHK-Cu', 'Tesamorelin', 'Ipamorelin'].map((name) => (
                <Link
                  key={name}
                  href={`/peptides?q=${encodeURIComponent(name)}`}
                  className="text-black/50 underline-offset-2 transition-colors hover:text-black hover:underline"
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Credibility indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 anim-fade-up anim-delay-5">
              {[
                '1,200+ PubMed citations linked',
                'Evidence-rated profiles',
                'Free access, always',
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

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <section className="border-b bg-white" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { num: '102', label: 'Peptide profiles' },
              { num: '16', label: 'Research categories' },
              { num: '1,200+', label: 'PubMed studies linked' },
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

      {/* ── Quick Answer — featured snippet target ─────────────── */}
      <section className="border-b py-14" style={{ background: 'var(--stone-50)', borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mono-label mb-3 text-black/30">Quick reference</p>
              <h2 className="text-[24px] font-medium tracking-heading text-black">
                What are research peptides?
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-black/60">
                Research peptides are short chains of amino acids — typically 2 to 50
                residues — studied for their roles in tissue repair, immune regulation,
                hormone secretion, and neurological function. Unlike small-molecule drugs,
                they act with high receptor specificity and degrade naturally into amino
                acids. Most are administered subcutaneously due to low oral bioavailability.
              </p>
              <Link href="/glossary" className="mt-4 inline-block text-[13px] text-black/40 underline-offset-2 transition-colors hover:text-black hover:underline">
                Read the full glossary →
              </Link>
            </div>
            <div>
              <p className="mono-label mb-4 text-black/30">Categories covered</p>
              <div className="space-y-2">
                {[
                  { category: 'Growth hormone secretagogues', examples: 'GHRP-2, Ipamorelin, CJC-1295, Tesamorelin' },
                  { category: 'Tissue repair and wound healing', examples: 'BPC-157, TB-500, GHK-Cu' },
                  { category: 'Metabolic and GLP-1 analogs', examples: 'Semaglutide, Tirzepatide, Retatrutide, AOD-9604' },
                  { category: 'Cognitive function', examples: 'Semax, Selank, Dihexa' },
                  { category: 'Immune modulation', examples: 'Thymosin Alpha-1, KPV, LL-37' },
                  { category: 'Longevity and telomere biology', examples: 'Epithalon, MOTS-c, Humanin' },
                ].map((row) => (
                  <div
                    key={row.category}
                    className="rounded-comfortable px-4 py-3"
                    style={{ background: 'rgba(30,21,17,0.03)', border: '1px solid var(--border-light)' }}
                  >
                    <p className="text-[13px] font-medium text-black/80">{row.category}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-black/35">{row.examples}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mono-label mb-2 text-black/30">Browse by category</p>
            <h2 className="text-[28px] font-medium tracking-heading text-black">
              Research areas
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
                Explore peptides
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

      {/* ── How we research — E-E-A-T ──────────────────────────── */}
      <section className="border-b py-16" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10">
            <p className="mono-label mb-3 text-black/30">Editorial standards</p>
            <h2 className="text-[28px] font-medium tracking-heading text-black">
              How we research
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <p className="text-[15px] font-medium text-black mb-3">Primary literature first</p>
              <p className="text-[14px] leading-[1.75] text-black/55">
                Every profile starts with a PubMed search, not a product page. We pull
                primary literature, note the study design — in vitro, animal model, or
                human trial — and rate the evidence accordingly. You will always know
                whether a claim comes from a rat study or a randomized controlled trial.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-black mb-3">Standardized profile format</p>
              <p className="text-[14px] leading-[1.75] text-black/55">
                Profiles follow a consistent structure: mechanism of action,
                pharmacokinetics (half-life, bioavailability, routes), clinical evidence
                with study links, and administration context. The format does not change
                based on who makes the compound.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-black mb-3">No paid placements</p>
              <p className="text-[14px] leading-[1.75] text-black/55">
                Vetted suppliers appear in our directory because they publish third-party
                certificates of analysis and pass our sourcing criteria, not because they
                advertise with us. Research findings are editorially independent of
                commercial relationships.
              </p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t pt-10" style={{ borderColor: 'var(--border-light)' }}>
            {[
              { stat: 'PubMed-sourced', sub: 'Every citation links to its primary study' },
              { stat: 'Standardized profiles', sub: 'Same format, every entry' },
              { stat: 'No paid placements', sub: 'Supplier directory is editorially independent' },
            ].map((item) => (
              <div key={item.stat} className="text-center">
                <p className="text-[14px] font-medium text-black">{item.stat}</p>
                <p className="mt-1 text-[12px] text-black/40">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upgrade conversion strip ───────────────────────────── */}
      <section className="border-b py-14" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mono-label mb-3 text-black/30">Researcher plan</p>
              <h2 className="text-[28px] font-medium tracking-heading text-black">
                Free summaries cover what a peptide is. Full profiles cover how it works.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-black/55">
                The free tier gives you research status, a compound overview, and
                administration routes. The Researcher plan adds the mechanism of action,
                pharmacokinetics data, PubMed study links, evidence ratings, and the
                peptide comparison tool. $12/month.
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
                { free: true,  label: 'Peptide summary and research status' },
                { free: true,  label: 'Category browsing and search' },
                { free: true,  label: 'Administration routes overview' },
                { free: false, label: 'Full mechanism of action profile' },
                { free: false, label: 'Pharmacokinetics and half-life data' },
                { free: false, label: 'PubMed study links and evidence ratings' },
                { free: false, label: 'Peptide comparison tool' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 rounded-comfortable px-4 py-2.5 text-[13px]"
                  style={{ background: row.free ? 'rgba(0,0,0,0.02)' : 'rgba(232,98,42,0.06)', borderLeft: row.free ? '2px solid rgba(0,0,0,0.08)' : '2px solid rgba(232,98,42,0.25)' }}
                >
                  <span className={`font-mono text-[10px] tracking-wide ${row.free ? 'text-emerald-600' : 'text-lavender'}`}>
                    {row.free ? 'FREE' : 'RESEARCHER'}
                  </span>
                  <span className={row.free ? 'text-black/60' : 'text-black/80'}>{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-10 text-center text-black/25">
            Why researchers use Peptide United
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                quote: 'The mechanism breakdowns go further than anything I\'ve found outside of primary literature. I\'ve started sending patients here before appointments.',
                role: 'Functional medicine practitioner',
              },
              {
                quote: 'PubMed-linked profiles cut my pre-protocol research time in half. The half-life data alone is worth the subscription.',
                role: 'PhD researcher, biochemistry',
              },
              {
                quote: 'Finally something I can share with colleagues. No marketing language, no anecdotes dressed up as evidence.',
                role: 'Compounding pharmacist',
              },
            ].map((t) => (
              <div
                key={t.role}
                className="rounded-comfortable p-6"
                style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-light)' }}
              >
                <p className="text-[14px] leading-[1.75] text-black/65">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 font-mono text-[11px] tracking-mono text-black/30">
                  &mdash; {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recently viewed ─────────────────────────────────────── */}
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
                heading="New peptide research, once a week."
                subheading="PubMed updates, new compound profiles, and research summaries. Not a newsletter about selling you something."
              />
            </div>
            <div className="space-y-5">
              {[
                { label: 'Weekly digest', text: 'New PubMed studies across 16 research categories, summarized and linked.' },
                { label: 'Profile updates', text: 'When new pharmacokinetics or mechanism data is published, relevant profiles are flagged.' },
                { label: 'Early access', text: 'New peptide profiles and research tools go to subscribers first.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded"
                    style={{ background: 'rgba(232,98,42,0.15)' }}
                  >
                    <span className="font-mono text-[9px] font-medium text-sunrise-300 tracking-wide" style={{ color: 'var(--sunrise-300)' }}>
                      {item.label.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/70">{item.label}</p>
                    <p className="mt-0.5 text-[13px] leading-[1.6] text-white/40">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────── */}
      <section className="border-t py-16" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="mono-label mb-3 text-black/30">Open access</p>
          <h2 className="mx-auto max-w-md text-[28px] font-medium tracking-heading text-black">
            Start with the database.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.6] text-black/50">
            Every profile has a free summary, research status, and administration routes.
            No login required.
          </p>
          <Link href="/peptides" className="btn-dark mt-6">
            Browse all peptides
          </Link>
        </div>
      </section>
    </>
  )
}
