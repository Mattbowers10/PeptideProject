import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PeptideCard } from '@/components/PeptideCard'
import { CompoundPanel } from '@/components/CompoundPanel'
import { RecentlyViewed } from '@/components/RecentlyViewed'
import { EmailCapture } from '@/components/EmailCapture'
import type { Category, Peptide } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: { absolute: 'Peptide United — The Peptide Research Encyclopedia' },
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

  const [categoriesResult, featuredResult, indexResult] = await Promise.all([
    payload.find({ collection: 'categories', limit: 100, sort: 'name' }),
    payload.find({ collection: 'peptides', limit: 8, depth: 1, sort: 'name' }),
    payload.find({ collection: 'peptides', limit: 24, depth: 0, sort: 'name' }),
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
    featuredPeptides: featuredResult.docs as Peptide[],
    indexPeptides: indexResult.docs as Peptide[],
    countMap,
  }
}

export default async function HomePage() {
  const { categories, featuredPeptides, indexPeptides, countMap } = await getData()

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────
          White. Asymmetric. The statement, then the search, then the
          product itself — a live compound record — sitting beside it.
      ──────────────────────────────────────────────────────────────── */}
      <section className="border-b bg-white" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-center">

            {/* Left — statement + search */}
            <div>
              <h1 className="text-[52px] font-medium leading-[1.02] tracking-display text-black sm:text-[68px] lg:text-[76px] anim-fade-up anim-delay-1">
                The research<br />
                record for<br />
                <span className="text-gradient">peptide science.</span>
              </h1>

              <p className="mt-5 max-w-md text-[17px] leading-[1.6] text-black/55 anim-fade-up anim-delay-2">
                102 evidence-graded profiles. Every mechanism traced to primary literature.
                Free to read.
              </p>

              <form action="/peptides" method="GET" className="mt-8 flex max-w-lg gap-2 anim-fade-up anim-delay-3">
                <input
                  name="q"
                  type="search"
                  placeholder="BPC-157, Retatrutide, GHK-Cu…"
                  className="flex-1 rounded-sharp border bg-white px-4 py-3 text-[15px] tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-sunrise-500/30"
                  style={{ borderColor: 'var(--border-light)' }}
                />
                <button type="submit" className="btn-dark shrink-0">Search</button>
              </form>

              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[13px] anim-fade-up anim-delay-3">
                <span className="text-black/30">Popular:</span>
                {['BPC-157', 'Retatrutide', 'GHK-Cu', 'Tesamorelin', 'Ipamorelin'].map((name) => (
                  <Link
                    key={name}
                    href={`/peptides?q=${encodeURIComponent(name)}`}
                    className="text-black/50 transition-colors underline-offset-2 hover:text-black hover:underline"
                  >
                    {name}
                  </Link>
                ))}
              </div>

              {/* Inline stats — no separate section */}
              <div
                className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t pt-8 anim-fade-up anim-delay-4"
                style={{ borderColor: 'var(--border-light)' }}
              >
                {[
                  { n: '102', l: 'profiles' },
                  { n: '16', l: 'categories' },
                  { n: '1,200+', l: 'citations' },
                ].map((s) => (
                  <div key={s.l}>
                    <span className="block text-[44px] font-medium leading-none tracking-display text-black">{s.n}</span>
                    <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.13em] text-black/35">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — cycling compound panel (desktop only) */}
            {featuredPeptides.length > 0 && (
              <div className="hidden lg:block anim-fade-up anim-delay-3">
                <CompoundPanel peptides={featuredPeptides} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Compound index ticker ────────────────────────────────────────
          Auto-scrolling. Duplicated array for seamless loop.
          Pauses on hover.
      ──────────────────────────────────────────────────────────────── */}
      <div
        className="border-b flex items-stretch overflow-hidden"
        style={{ borderColor: 'var(--border-light)', background: 'rgba(30,21,17,0.018)' }}
      >
        {/* Static label */}
        <div
          className="flex shrink-0 items-center border-r px-5 py-3"
          style={{ borderColor: 'var(--border-light)', zIndex: 1, background: 'rgba(253,250,247,0.95)' }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/25">
            Index
          </span>
        </div>

        {/* Animated scrolling track — content doubled for seamless loop */}
        <div className="ticker-track">
          {[...indexPeptides, ...indexPeptides].map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              href={`/peptides/${p.slug}`}
              className="flex shrink-0 items-center border-r px-5 py-3 font-mono text-[11px] tracking-tight text-black/40 transition-colors hover:bg-black/[0.025] hover:text-black"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <span
                className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background:
                    p.researchStatus === 'approved'
                      ? '#22c55e'
                      : p.researchStatus === 'preclinical'
                      ? 'rgba(0,0,0,0.18)'
                      : 'var(--sunrise-500)',
                }}
              />
              {p.name}
            </Link>
          ))}
        </div>

        {/* Static "All" link on right */}
        <Link
          href="/peptides"
          className="flex shrink-0 items-center border-l px-5 py-3 font-mono text-[11px] transition-colors hover:text-black"
          style={{ borderColor: 'var(--border-light)', color: 'var(--sunrise-500)', zIndex: 1, background: 'rgba(253,250,247,0.95)' }}
        >
          All 102+ →
        </Link>
      </div>

      {/* ── Research categories ────────────────────────────────────────── */}
      <section className="border-b bg-white py-14" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-8 flex items-baseline justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/30">
                Research areas
              </p>
              <h2 className="mt-1.5 text-[28px] font-medium tracking-display text-black">
                16 categories
              </h2>
            </div>
            <Link
              href="/categories"
              className="text-[13px] tracking-tight text-black/40 transition-colors hover:text-black"
            >
              Browse all →
            </Link>
          </div>

          {/* Table-of-contents list — editorial, not cards */}
          <div className="grid gap-x-12 lg:grid-cols-2">
            {[categories.slice(0, Math.ceil(categories.length / 2)), categories.slice(Math.ceil(categories.length / 2))].map(
              (col, colIdx) => (
                <div key={colIdx} className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
                  {col.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/peptides?category=${cat.slug}`}
                      className="group flex items-center gap-3 py-3.5 transition-colors"
                    >
                      <span className="flex-1 text-[15px] font-medium tracking-tight text-black transition-colors group-hover:text-midnight">
                        {cat.name}
                      </span>
                      {countMap[cat.id] !== undefined && (
                        <span className="shrink-0 font-mono text-[11px] text-black/30">
                          {countMap[cat.id]}
                        </span>
                      )}
                      <span className="font-mono text-[11px] text-black/20 transition-colors group-hover:translate-x-0.5 group-hover:text-black/50">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Compound grid ───────────────────────────────────────────────── */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-[1200px] px-6 py-14">
          <div className="mb-7 flex items-baseline justify-between">
            <h2 className="text-[22px] font-medium tracking-heading text-white">
              Specimen index
            </h2>
            <Link
              href="/peptides"
              className="text-[13px] tracking-tight text-white/40 transition-colors hover:text-white"
            >
              All 102+ →
            </Link>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPeptides.map((peptide) => (
              <PeptideCard key={peptide.id} peptide={peptide} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial methodology ───────────────────────────────────────
          Two-column running text. No icons. No cards. Reads like a
          journal editor's note, not a features list.
      ──────────────────────────────────────────────────────────────── */}
      <section className="border-b bg-white py-16" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 max-w-lg">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/30">
              Editorial
            </p>
            <h2 className="mt-2 text-[30px] font-medium leading-[1.1] tracking-display text-black">
              How this works.
            </h2>
          </div>

          <div className="grid gap-12 border-t pt-10 lg:grid-cols-2" style={{ borderColor: 'var(--border-light)' }}>
            <div className="space-y-6">
              <p className="text-[15px] leading-[1.8] text-black/60">
                Every profile starts with a PubMed search — not a supplier's product page.
                We identify the primary literature, note the study design (in vitro, animal model,
                or human trial), and rate the evidence accordingly. You will always know whether a
                claim comes from a rat study or a randomized controlled trial.
              </p>
              <p className="text-[15px] leading-[1.8] text-black/60">
                Profiles follow a fixed structure: mechanism of action, pharmacokinetics
                (half-life, bioavailability, routes of administration), clinical evidence
                with direct study links, and a standardized safety profile. The format
                does not change based on commercial interest in the compound.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-[15px] leading-[1.8] text-black/60">
                Vetted suppliers appear in our partner directory because they publish
                third-party certificates of analysis and pass our sourcing review —
                not because they advertise with us. Research profiles are written before
                any commercial relationship is established, and editorial findings are
                never altered by partner status.
              </p>
              <div
                className="rounded-sharp border-l-2 py-1 pl-5"
                style={{ borderColor: 'var(--sunrise-500)' }}
              >
                <p className="text-[14px] leading-[1.7] text-black/50">
                  If you find an error — a miscited study, an outdated half-life figure,
                  a mechanism described incorrectly — email us. We correct it publicly
                  and note the revision in the profile.
                </p>
              </div>
            </div>
          </div>

          {/* Three concise commitments — horizontal rule style, not cards */}
          <div
            className="mt-12 grid grid-cols-3 gap-8 border-t pt-8"
            style={{ borderColor: 'var(--border-light)' }}
          >
            {[
              { label: 'PubMed-sourced', note: 'Every citation links to its primary study' },
              { label: 'Standardized format', note: 'Same structure, every profile' },
              { label: 'No paid placements', note: 'Editorial independent of supplier relationships' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[13px] font-medium text-black">{item.label}</p>
                <p className="mt-0.5 text-[12px] text-black/40">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upgrade — show the product, not a feature table ─────────────
          A real partial profile. The gate is visible. The pitch is
          implicit.
      ──────────────────────────────────────────────────────────────── */}
      <section className="border-b py-16" style={{ borderColor: 'var(--border-light)', background: 'rgba(30,21,17,0.018)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/30">
                Researcher plan
              </p>
              <h2 className="mt-2 text-[30px] font-medium leading-[1.1] tracking-display text-black">
                Free summaries say what.<br />
                Full profiles say why.
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-black/55">
                The free tier covers research status, an overview, and administration
                routes. The Researcher plan adds the full mechanism of action, pharmacokinetic
                data, direct PubMed study links with evidence grades, and the compound
                comparison tool. $12/month.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/upgrade" className="btn-dark text-[14px]">See plans →</Link>
                <Link href="/guide" className="btn-outline text-[14px]">Free guide</Link>
              </div>
            </div>

            {/* Partial profile preview */}
            <div
              className="overflow-hidden rounded-comfortable border bg-white shadow-warm"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <div className="border-b px-5 py-4" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/30">
                    Research profile
                  </p>
                  <span
                    className="rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em]"
                    style={{ background: 'rgba(232,98,42,0.1)', color: 'var(--sunrise-500)' }}
                  >
                    Preclinical
                  </span>
                </div>
                <p className="mt-1 text-[18px] font-medium tracking-tight text-black">BPC-157</p>
              </div>

              {/* Free section — visible */}
              <div className="border-b px-5 py-4" style={{ borderColor: 'var(--border-light)' }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-600">
                  Free
                </p>
                <p className="mt-2 text-[13px] leading-[1.65] text-black/60">
                  A 15-amino acid partial sequence of Body Protection Compound, derived from
                  human gastric juice. Studied extensively in rodent models for tissue repair,
                  tendon healing, and gastrointestinal protection.
                </p>
              </div>

              {/* Gated section — blurred */}
              <div className="relative">
                <div className="select-none px-5 py-4 blur-[3px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/30">
                    Mechanism of action
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.65] text-black/60">
                    BPC-157 upregulates vascular endothelial growth factor (VEGF) and its
                    receptor VEGFR2, promoting angiogenesis at injury sites. It also
                    sensitizes growth hormone receptors on tendon fibroblasts via the
                    FAK-paxillin pathway, and modulates nitric oxide synthesis through…
                  </p>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/30">
                    Researcher plan
                  </p>
                  <Link href="/upgrade" className="btn-dark mt-2 text-[13px]">
                    Unlock for $12/mo →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof — one strong quote, not three equal cards ──────── */}
      <section className="border-b bg-white py-16" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-16 lg:grid-cols-[2fr_1fr] lg:items-start">
            {/* Dominant quote */}
            <div>
              <p
                className="text-[24px] font-medium leading-[1.5] tracking-tight text-black sm:text-[26px]"
              >
                &ldquo;The mechanism breakdowns go further than anything I&rsquo;ve found
                outside of primary literature. I&rsquo;ve started sending patients here
                before appointments.&rdquo;
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-black/30">
                Functional medicine practitioner
              </p>
            </div>

            {/* Supporting quotes — smaller, stacked */}
            <div
              className="space-y-6 border-l pl-10"
              style={{ borderColor: 'var(--border-light)' }}
            >
              {[
                {
                  q: 'PubMed-linked profiles cut my pre-protocol research time in half.',
                  role: 'PhD researcher, biochemistry',
                },
                {
                  q: 'Finally something I can share with colleagues. No anecdotes dressed up as evidence.',
                  role: 'Compounding pharmacist',
                },
              ].map((t) => (
                <div key={t.role}>
                  <p className="text-[13px] leading-[1.7] text-black/55">&ldquo;{t.q}&rdquo;</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-black/25">
                    {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recently viewed ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1200px] px-6 py-4">
        <RecentlyViewed />
      </div>

      {/* ── Email — one line, no bullet points ──────────────────────────── */}
      <section className="border-t bg-midnight py-14" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="mx-auto max-w-[680px] px-6 text-center">
          <h2 className="text-[26px] font-medium tracking-heading text-white">
            New peptide research, once a week.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-[14px] leading-[1.6] text-white/40">
            PubMed updates and new profiles. Not a sales email.
          </p>
          <div className="mt-7">
            <EmailCapture
              variant="dark"
              source="homepage"
            />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[28px] font-medium tracking-display text-black sm:text-[34px]">
                Start with the database.
              </p>
              <p className="mt-1 text-[15px] text-black/50">
                Every profile has a free summary. No account required.
              </p>
            </div>
            <Link href="/peptides" className="btn-dark shrink-0">
              Browse 102 peptides →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
