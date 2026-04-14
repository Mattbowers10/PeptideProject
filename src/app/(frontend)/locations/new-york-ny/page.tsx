import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'Peptide Research in New York City | Peptide United' },
  description:
    'A reference guide for peptide researchers in New York City — compound profiles, regulatory context, and research resources.',
}

// ── Hardcoded curated peptide list ────────────────────────────────────

const NYC_PEPTIDES = [
  {
    name: 'BPC-157',
    slug: 'bpc-157',
    description:
      'Body Protection Compound-157 — a synthetic pentadecapeptide derived from a protective protein in gastric juice. Extensively studied in animal models for tissue repair and gut health.',
  },
  {
    name: 'TB-500',
    slug: 'tb-500',
    description:
      'Thymosin Beta-4 synthetic analog — studied for its role in actin regulation, cellular migration, and tissue regeneration in animal models.',
  },
  {
    name: 'Semaglutide',
    slug: 'semaglutide',
    description:
      'GLP-1 receptor agonist with FDA approval for type 2 diabetes and obesity indications. One of the most clinically studied peptides in modern medicine.',
  },
  {
    name: 'Ipamorelin',
    slug: 'ipamorelin',
    description:
      'A selective growth hormone secretagogue that stimulates GH release with minimal off-target effects on cortisol and prolactin — studied in endocrine and metabolic research.',
  },
  {
    name: 'CJC-1295',
    slug: 'cjc-1295',
    description:
      'A GHRH analog with extended half-life due to drug affinity complex technology. Used in research examining sustained growth hormone release patterns.',
  },
  {
    name: 'GHK-Cu',
    slug: 'ghk-cu',
    description:
      'Glycine-histidine-lysine copper complex — a naturally occurring human plasma tripeptide with extensive research into skin remodeling, wound healing, and anti-inflammatory activity.',
  },
]

// ── Category links ────────────────────────────────────────────────────

const CATEGORIES = [
  { name: 'Growth Hormone Peptides', slug: 'growth-hormone', icon: '📈' },
  { name: 'Tissue Repair & Recovery', slug: 'tissue-repair', icon: '🔬' },
  { name: 'Metabolic & Weight', slug: 'metabolic', icon: '⚗️' },
  { name: 'Skin & Anti-Aging', slug: 'skin-anti-aging', icon: '🧴' },
  { name: 'Nootropics & Cognition', slug: 'nootropics', icon: '🧠' },
]

// ── Page ──────────────────────────────────────────────────────────────

export default function NewYorkLocationPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="gradient-pastel py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-3 text-black/40">Location Guide · New York City</p>
          <h1 className="text-[40px] font-medium leading-[1.05] tracking-display text-black sm:text-[56px]">
            Peptide Research<br className="hidden sm:block" /> in New York City
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-black/55">
            New York City is one of the most active centers for biomedical research in the world.
            From world-class academic medical centers to independent research institutions, NYC
            hosts a diverse community studying peptide compounds across oncology, metabolic disease,
            regenerative medicine, and beyond. This guide provides a reference for researchers
            navigating the peptide research landscape in New York.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/peptides" className="btn-dark">
              Browse All Compounds
            </Link>
            <Link href="/disclaimer" className="btn-outline">
              Research Disclaimer
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick stats bar ──────────────────────────────────────── */}
      <div
        className="border-b border-t"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-wrap divide-x" style={{ borderColor: 'var(--border-light)' }}>
            {[
              { n: '200+', label: 'Peptide profiles' },
              { n: '6', label: 'NYC academic medical centers' },
              { n: '12+', label: 'Research universities' },
              { n: '50+', label: 'Active clinical trials in NY state' },
              { n: '100%', label: 'Research use only' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col px-8 py-6 first:pl-0">
                <span className="text-[28px] font-medium leading-none tracking-display text-black">
                  {stat.n}
                </span>
                <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-black/35">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Top peptides for NYC researchers ─────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-8 flex items-baseline justify-between">
            <div>
              <p className="mono-label mb-1.5 text-black/35">Curated reference list</p>
              <h2 className="text-[28px] font-medium tracking-heading text-black">
                Top Peptides for NYC Researchers
              </h2>
            </div>
            <Link
              href="/peptides"
              className="hidden font-mono text-[12px] text-black/40 underline-offset-2 hover:text-black hover:underline sm:block"
            >
              View all compounds →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NYC_PEPTIDES.map((peptide) => (
              <div
                key={peptide.slug}
                className="flex flex-col rounded-comfortable border bg-white p-6 transition-shadow hover:shadow-warm"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <h3 className="text-[16px] font-medium tracking-tight text-black">
                  {peptide.name}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-[1.6] text-black/50">
                  {peptide.description}
                </p>
                <Link
                  href={`/peptides/${peptide.slug}`}
                  className="mt-4 font-mono text-[11px] text-lavender underline-offset-2 transition-colors hover:underline"
                >
                  View profile →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research context section ──────────────────────────────── */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Main editorial content */}
            <div className="space-y-10">
              <div>
                <p className="mono-label mb-3 text-black/35">Research context</p>
                <h2 className="mb-5 text-[28px] font-medium tracking-heading text-black">
                  NYC as a Peptide Research Hub
                </h2>
                <div className="space-y-4 text-[15px] leading-[1.7] text-black/60">
                  <p>
                    New York City is home to some of the world&apos;s most influential biomedical
                    research institutions. NYU Langone Health, Memorial Sloan Kettering Cancer
                    Center, Weill Cornell Medicine, Mount Sinai Health System, Columbia University
                    Irving Medical Center, and Rockefeller University collectively conduct billions
                    of dollars in annual research — including significant work on peptide
                    therapeutics, protein engineering, and small molecule design.
                  </p>
                  <p>
                    The NYC research ecosystem benefits from dense clustering of pharmaceutical
                    companies, biotech startups, and CROs (contract research organizations),
                    particularly in areas like the Alexandria Center for Life Science on the East
                    Side. This creates a robust supply chain for research-grade reagents and
                    compound sourcing that supports a wide range of laboratory investigations.
                  </p>
                  <p>
                    Research into peptide compounds in NYC spans multiple disciplines: oncology
                    researchers at MSKCC investigate peptide-based cancer diagnostics; metabolic
                    scientists at Columbia study GLP-1 analogs; neuroscientists across multiple
                    institutions examine neuropeptide signaling. The breadth of active research
                    makes NYC one of the most significant peptide research markets in the country.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="mb-5 text-[24px] font-medium tracking-heading text-black">
                  Regulatory Environment in New York State
                </h2>
                <div className="space-y-4 text-[15px] leading-[1.7] text-black/60">
                  <p>
                    New York State follows federal FDA regulations as the baseline for research
                    compound oversight. The New York State Department of Health (NYSDOH) and the
                    Office of Professional Medical Conduct (OPMC) oversee medical practice, but
                    academic research conducted under IRB approval and institutional oversight
                    operates under federal research frameworks.
                  </p>
                  <p>
                    For researchers operating outside of institutional settings — independent labs,
                    private research organizations, or wellness practitioners — it&apos;s essential
                    to understand the distinction between compounds approved for human therapeutic
                    use and those classified as research chemicals. Most peptides in this database
                    fall into the latter category.
                  </p>
                  <p>
                    New York State does not have specific peptide-targeting legislation, but broader
                    drug analog laws and FDA enforcement actions can apply. The FDA has issued
                    warning letters to vendors selling research peptides with implied health claims.
                    Any use, marketing, or procurement of these compounds must align with their
                    research-use-only classification.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="mb-5 text-[24px] font-medium tracking-heading text-black">
                  What &ldquo;Research Use Only&rdquo; Means
                </h2>
                <div className="space-y-4 text-[15px] leading-[1.7] text-black/60">
                  <p>
                    &ldquo;Research use only&rdquo; (RUO) is a regulatory designation indicating
                    that a compound is intended solely for in vitro or animal research, and is not
                    cleared, approved, or intended for human diagnostic or therapeutic use. RUO
                    compounds are not subject to the same manufacturing standards as pharmaceutical
                    drugs (cGMP), though reputable suppliers adhere to rigorous analytical
                    standards.
                  </p>
                  <p>
                    For NYC researchers, this means peptide compounds sourced for laboratory
                    research should never be represented or used as treatments, supplements, or
                    drugs. The research use designation protects both the supplier and the
                    researcher when compounds are used appropriately in laboratory settings with
                    proper documentation, institutional approval where required, and appropriate
                    safety protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar: Key institutions + resources */}
            <aside className="space-y-6">
              <div
                className="rounded-comfortable border bg-white p-6"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <p className="mono-label mb-4 text-black/30">Key NYC Research Institutions</p>
                <ul className="space-y-3">
                  {[
                    { name: 'NYU Langone Health', focus: 'Clinical & translational research' },
                    { name: 'Memorial Sloan Kettering', focus: 'Oncology peptide therapeutics' },
                    { name: 'Weill Cornell Medicine', focus: 'Metabolic disease, endocrinology' },
                    { name: 'Mount Sinai Health System', focus: 'Genomics, regenerative medicine' },
                    { name: 'Columbia University CUIMC', focus: 'Neuroscience, nephrology' },
                    { name: 'Rockefeller University', focus: 'Basic biomedical science' },
                  ].map((inst) => (
                    <li key={inst.name} className="flex flex-col">
                      <span className="text-[13px] font-medium text-black">{inst.name}</span>
                      <span className="text-[12px] text-black/40">{inst.focus}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-comfortable border bg-white p-6"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <p className="mono-label mb-4 text-black/30">Regulatory Resources</p>
                <ul className="space-y-2.5">
                  {[
                    { label: 'FDA Drug Database', href: 'https://www.accessdata.fda.gov/scripts/cder/daf/' },
                    { label: 'ClinicalTrials.gov — NY', href: 'https://clinicaltrials.gov/search?locStr=New+York&country=United+States&state=New+York' },
                    { label: 'NY Dept of Health', href: 'https://www.health.ny.gov/' },
                    { label: 'NIH Research Compliance', href: 'https://oir.nih.gov/sourcebook' },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-black/50 underline-offset-2 transition-colors hover:text-black hover:underline"
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-comfortable border bg-white p-6"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <p className="mono-label mb-3 text-black/30">Check the FDA Tracker</p>
                <p className="mb-4 text-[13px] leading-[1.6] text-black/50">
                  See the current regulatory status of every peptide in our database — approved,
                  in trials, preclinical, or discontinued.
                </p>
                <Link href="/fda-tracker" className="btn-dark w-full justify-center">
                  FDA Regulatory Tracker →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Compound categories section ───────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-2 text-black/35">Browse by category</p>
          <h2 className="mb-8 text-[28px] font-medium tracking-heading text-black">
            Peptide Categories
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-start rounded-comfortable border bg-white p-5 transition-all hover:border-black/15 hover:shadow-warm"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <span className="mb-3 text-2xl">{cat.icon}</span>
                <span className="text-[14px] font-medium tracking-tight text-black">
                  {cat.name}
                </span>
                <span className="mt-1 font-mono text-[10px] text-black/35">View profiles →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section ──────────────────────────────────────────── */}
      <section className="bg-midnight py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-dark p-8 sm:col-span-2">
              <p className="mono-label mb-3 text-white/30">Start researching</p>
              <h2 className="text-[28px] font-medium leading-[1.1] tracking-display text-white">
                200+ compound profiles, fully indexed.
              </h2>
              <p className="mt-3 text-[14px] leading-[1.65] text-white/45">
                Browse our complete peptide database — research status, mechanism of action,
                pharmacokinetics, and curated study feeds. All in one place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/peptides" className="btn-glass">
                  Browse All Peptides
                </Link>
                <Link href="/research" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
                  Research Hub
                </Link>
              </div>
            </div>

            <div className="card-dark p-8">
              <p className="mono-label mb-3 text-white/30">Go deeper</p>
              <h2 className="text-[22px] font-medium leading-[1.1] tracking-display text-white">
                Researcher access.
              </h2>
              <p className="mt-3 text-[13px] leading-[1.65] text-white/40">
                Full mechanism of action, pharmacokinetics, study summaries, and stack builder.
              </p>
              <Link href="/upgrade" className="btn-dark mt-5 w-full justify-center border border-white/10">
                View Plans →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div
            className="rounded-comfortable border bg-amber-50 px-6 py-5"
            style={{ borderColor: 'rgba(245,158,11,0.20)' }}
          >
            <p className="mono-label mb-2 text-amber-700/70">Research Use Only</p>
            <p className="text-[13px] leading-[1.65] text-amber-900/70">
              All information on this page is provided for educational and research reference
              purposes only. Nothing on this page constitutes medical advice, a clinical
              recommendation, or an endorsement of any specific compound for human use. Peptide
              compounds referenced here are for laboratory and research purposes only unless
              explicitly noted as FDA-approved therapeutics. Regulations governing the purchase,
              possession, and use of research compounds vary by jurisdiction — consult applicable
              federal, state, and local regulations before acquiring any research chemical.
            </p>
            <Link
              href="/disclaimer"
              className="mt-3 inline-block font-mono text-[11px] text-amber-800/60 underline underline-offset-2 hover:text-amber-900"
            >
              Read full disclaimer →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
