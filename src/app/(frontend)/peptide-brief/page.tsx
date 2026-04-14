import type { Metadata } from 'next'
import { SubscribeForm } from './SubscribeForm'
import { BookOpen, FlaskConical, Brain, ShieldCheck, TrendingUp, Microscope } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Peptide Brief — Weekly Research Digest',
  description:
    'A free weekly newsletter breaking down the latest peptide research — mechanisms, clinical findings, and practical protocols. Written for serious researchers.',
  openGraph: {
    title: 'The Peptide Brief — Weekly Research Digest',
    description:
      'Free weekly peptide research digest. Mechanisms, clinical findings, and protocols — no fluff.',
  },
}

const insideItems = [
  {
    icon: Microscope,
    title: 'Study Breakdowns',
    body: 'One key paper, decoded. We pull the signal from dense PubMed abstracts and tell you what it actually means.',
  },
  {
    icon: Brain,
    title: 'Mechanism Explainers',
    body: 'How does BPC-157 accelerate tendon repair? What makes GHK-Cu pro-angiogenic? Short, precise answers.',
  },
  {
    icon: FlaskConical,
    title: 'Protocol Roundups',
    body: 'Dosing ranges, half-lives, and stacking notes drawn directly from the research literature.',
  },
  {
    icon: TrendingUp,
    title: 'Emerging Compounds',
    body: 'Early-stage peptides worth watching before they hit the mainstream — with honest caveats on the data.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guidance',
    body: 'What to look for in a COA, how to read HPLC data, and red flags in supplier claims.',
  },
  {
    icon: BookOpen,
    title: 'Reading List',
    body: 'Three links worth your time: a study, a forum thread, a dataset. Curated weekly.',
  },
]

const sampleIssue = [
  {
    number: '01',
    label: 'Study Breakdown',
    headline: 'BPC-157 Accelerates Rotator Cuff Healing in Rat Model',
    excerpt:
      'A 2023 study in the Journal of Orthopaedic Research found subcutaneous BPC-157 (10 µg/kg/day × 14 days) produced a 2.4× increase in collagen I deposition versus control — with no adverse histological findings.',
  },
  {
    number: '02',
    label: 'Mechanism Note',
    headline: 'Why Selank Modulates the HPA Axis',
    excerpt:
      'Selank\'s anxiolytic profile traces to enkephalin-degrading enzyme inhibition and BDNF upregulation in the prefrontal cortex — distinct from benzodiazepine pathways and without tolerance concerns observed in animal models.',
  },
  {
    number: '03',
    label: 'Emerging Compound',
    headline: 'Dihexa: Hepatocyte Growth Factor Mimetic',
    excerpt:
      'Dihexa (HGF antagonist reversal peptide) shows 10⁷× greater potency than BDNF in hippocampal synaptogenesis assays. Human trials remain absent — but the preclinical density is substantial.',
  },
]

export default function PeptideBriefPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="gradient-pastel">
        <div className="container mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
          {/* Eyebrow */}
          <div className="mono-label text-[#E8622A] mb-6 anim-fade-up">
            Free Weekly Newsletter
          </div>

          {/* Headline */}
          <h1
            className="font-sans font-700 tracking-display anim-fade-up anim-delay-1"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#1E1511',
            }}
          >
            The Peptide Brief
          </h1>
          <p
            className="mt-4 font-sans anim-fade-up anim-delay-2"
            style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 400,
              color: '#6B5A50',
              letterSpacing: '-0.01em',
            }}
          >
            Research-first. Jargon-free. Every week.
          </p>

          {/* Sub-copy */}
          <p
            className="mt-6 mx-auto max-w-xl text-[15px] leading-relaxed anim-fade-up anim-delay-3"
            style={{ color: '#7A6660' }}
          >
            A weekly digest breaking down the latest peptide research — mechanisms,
            clinical findings, and practical protocols. Written for researchers who
            want depth without the noise.
          </p>

          {/* Subscribe form */}
          <div className="mt-10 mx-auto max-w-md anim-fade-up anim-delay-4">
            <SubscribeForm variant="light" />
            <p className="mt-3 text-xs" style={{ color: '#B8A396' }}>
              No spam. Unsubscribe anytime. ~5 min read each week.
            </p>
          </div>

          {/* Social proof */}
          <div
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded border anim-fade-up anim-delay-5"
            style={{
              borderColor: 'rgba(30,21,17,0.12)',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider" style={{ color: '#7A6660' }}>
              Join 2,400+ researchers
            </span>
          </div>
        </div>
      </section>

      {/* ── What's inside ────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#FDFAF7' }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <p className="mono-label mb-3" style={{ color: '#E8622A' }}>Every Issue</p>
            <h2
              className="font-sans"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#1E1511',
              }}
            >
              What&apos;s inside the Brief
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {insideItems.map((item) => (
              <div key={item.title} className="card-light p-6">
                <div
                  className="w-9 h-9 rounded flex items-center justify-center mb-4"
                  style={{ background: 'rgba(232,98,42,0.08)' }}
                >
                  <item.icon className="w-4.5 h-4.5" style={{ color: '#E8622A', width: 18, height: 18 }} />
                </div>
                <h3
                  className="font-sans font-semibold mb-2"
                  style={{ fontSize: '15px', color: '#1E1511', letterSpacing: '-0.01em' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A6660' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample issue ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5EFE8' }}>
        <div className="container mx-auto max-w-3xl px-6">
          <div className="text-center mb-14">
            <p className="mono-label mb-3" style={{ color: '#E8622A' }}>Sample Issue</p>
            <h2
              className="font-sans"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#1E1511',
              }}
            >
              See what you&apos;re getting
            </h2>
          </div>

          {/* Simulated newsletter card */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              border: '1px solid rgba(30,21,17,0.10)',
              boxShadow: '0 8px 32px rgba(30,21,17,0.08)',
              background: '#FFFFFF',
            }}
          >
            {/* Email header bar */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ background: '#1E1511', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-widest" style={{ color: '#E8622A' }}>
                  The Peptide Brief
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Issue #47 &bull; Week of Jan 13, 2025
                </p>
              </div>
              <span
                className="font-mono text-[10px] uppercase px-2 py-1 rounded"
                style={{ background: 'rgba(232,98,42,0.15)', color: '#E8622A', letterSpacing: '0.05em' }}
              >
                Preview
              </span>
            </div>

            {/* Issue items */}
            <div className="divide-y" style={{ borderColor: 'rgba(30,21,17,0.07)' }}>
              {sampleIssue.map((item) => (
                <div key={item.number} className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <span
                      className="font-mono text-[11px] font-medium shrink-0 mt-0.5"
                      style={{ color: '#E8622A' }}
                    >
                      {item.number}
                    </span>
                    <div>
                      <p
                        className="font-mono text-[10px] uppercase tracking-widest mb-1"
                        style={{ color: '#B8A396' }}
                      >
                        {item.label}
                      </p>
                      <h4
                        className="font-sans font-semibold mb-2"
                        style={{ fontSize: '14px', color: '#1E1511', letterSpacing: '-0.01em' }}
                      >
                        {item.headline}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#7A6660' }}>
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blurred bottom teaser */}
            <div
              className="px-6 py-4 text-center text-sm"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0), #FDFAF7)',
                color: '#B8A396',
              }}
            >
              + 3 more items in the full issue →
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="bg-midnight py-24">
        <div className="container mx-auto max-w-2xl px-6 text-center">
          <p className="mono-label text-[#E8622A] mb-4">Free. Always.</p>
          <h2
            className="font-sans text-white mb-4"
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
            }}
          >
            Ready to read better research?
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
            The Peptide Brief lands in your inbox every Monday. Free forever.
            No courses to sell, no affiliate links — just the research.
          </p>
          <div className="mx-auto max-w-md">
            <SubscribeForm variant="dark" />
          </div>
        </div>
      </section>
    </>
  )
}
