import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Peptide Wiki — Research Methodology & Mission',
  description:
    'Peptide Wiki is a research-first encyclopedia covering 100+ peptide compounds. Learn about our methodology, data sources, and commitment to evidence-based information.',
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="gradient-pastel py-20">
        <div className="mx-auto max-w-[800px] px-6">
          <p className="mono-label mb-4 text-black/40">Our mission</p>
          <h1 className="text-[42px] font-medium leading-[1.08] tracking-display text-black sm:text-[56px]">
            Research-first.
            <br />
            <span className="text-lavender">Always.</span>
          </h1>
          <p className="mt-5 text-[17px] leading-[1.65] tracking-tight text-black/55">
            Peptide Wiki exists to bring the same rigour to peptide information that researchers
            expect from primary literature — without the commercial noise.
          </p>
        </div>
      </section>

      {/* What we are / what we aren't */}
      <section className="mx-auto max-w-[800px] px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-comfortable border p-6" style={{ borderColor: 'var(--border-light)' }}>
            <p className="mono-label mb-4 text-emerald-600">What we are</p>
            <ul className="space-y-2.5 text-[14px] leading-[1.6] text-black/65">
              {[
                'A research encyclopedia covering 100+ peptide compounds',
                'Synced with PubMed for up-to-date study references',
                'Written for clinicians, researchers, and informed enthusiasts',
                'Committed to evidence ratings and source transparency',
                'Free at the core — summaries are always accessible',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-comfortable border p-6" style={{ borderColor: 'var(--border-light)' }}>
            <p className="mono-label mb-4 text-black/40">What we are not</p>
            <ul className="space-y-2.5 text-[14px] leading-[1.6] text-black/65">
              {[
                'A medical advice service — nothing here is clinical guidance',
                'A peptide vendor or supplement retailer',
                'Affiliated with or endorsed by any pharmaceutical company',
                'A replacement for consulting qualified healthcare professionals',
                'Making any claims about treating, curing, or preventing disease',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-black/25">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-midnight py-16">
        <div className="mx-auto max-w-[800px] px-6">
          <p className="mono-label mb-3 text-white/30">Research methodology</p>
          <h2 className="mb-8 text-[28px] font-medium tracking-heading text-white">
            How profiles are built
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'PubMed literature search',
                body: 'Every profile begins with a structured search of PubMed using compound-specific MeSH terms and chemical synonyms. We index studies from peer-reviewed journals and flag preprints separately.',
              },
              {
                step: '02',
                title: 'Evidence classification',
                body: 'Studies are classified by type (RCT, observational, in vitro, animal model) and assigned evidence ratings. We distinguish between human and preclinical data and do not conflate animal findings with clinical evidence.',
              },
              {
                step: '03',
                title: 'Mechanism synthesis',
                body: 'Mechanism of action profiles are synthesised from primary literature and review articles. We cite specific pathways, receptors, and signalling cascades where established by research.',
              },
              {
                step: '04',
                title: 'Pharmacokinetic data',
                body: 'Half-life, bioavailability, and route data are drawn from pharmacology studies and clinical pharmacokinetics literature. Where data is limited or conflicting, this is explicitly noted.',
              },
              {
                step: '05',
                title: 'Regulatory status',
                body: 'Regulatory classifications are checked against FDA, EMA, and TGA databases. Research status badges reflect the current state of clinical development, not commercial availability.',
              },
              {
                step: '06',
                title: 'Continuous PubMed sync',
                body: 'Profiles are connected to live PubMed searches that sync daily. New studies are surfaced and flagged for review, ensuring profiles stay current with the literature.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="shrink-0 font-mono text-[12px] tracking-mono text-lavender/50 pt-0.5">
                  {item.step}
                </div>
                <div>
                  <p className="text-[15px] font-medium tracking-subheading text-white">{item.title}</p>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-white/50">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data sources */}
      <section className="mx-auto max-w-[800px] px-6 py-16">
        <p className="mono-label mb-3 text-black/40">Data sources</p>
        <h2 className="mb-6 text-[22px] font-medium tracking-heading text-black">
          Where the data comes from
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: 'PubMed / NCBI', desc: 'Primary source for peer-reviewed studies, abstracts, and MeSH classifications.' },
            { name: 'DrugBank', desc: 'Pharmacological data, molecular properties, and drug interaction references.' },
            { name: 'FDA Drug Database', desc: 'Approval status, scheduling, and regulatory classification.' },
            { name: 'ChEMBL', desc: 'Bioactivity data, assay results, and target information.' },
            { name: 'ClinicalTrials.gov', desc: 'Ongoing and completed human trial registrations and results.' },
            { name: 'UniProt', desc: 'Protein target data for mechanism of action profiles.' },
          ].map((source) => (
            <div
              key={source.name}
              className="rounded-comfortable p-4"
              style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-light)' }}
            >
              <p className="text-[13px] font-medium text-black">{source.name}</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-black/50">{source.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section
        className="py-14"
        style={{ background: 'linear-gradient(160deg, #f8f9ff 0%, #fafafa 100%)' }}
      >
        <div className="mx-auto max-w-[660px] px-6 text-center">
          <p className="mono-label mb-3 text-black/30">Research use only</p>
          <p className="text-[14px] leading-[1.75] text-black/55">
            All content on Peptide Wiki is for educational and research purposes only. It refers to
            preclinical and clinical research literature and should not be interpreted as medical
            advice, treatment recommendations, or endorsement of any therapeutic use. Always consult
            qualified healthcare professionals before making any clinical decisions.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/peptides" className="btn-dark text-[13px]">
              Explore the database →
            </Link>
            <Link href="/upgrade" className="btn-outline text-[13px]">
              Research plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
