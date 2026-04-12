import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { UpgradeClient } from './UpgradeClient'

export const metadata: Metadata = {
  title: 'Pricing & Plans | Peptide United',
  description:
    'Unlock full peptide research profiles, pharmacokinetics, PubMed links, and clinical tools. Choose the plan that fits your research depth.',
  openGraph: {
    title: 'Peptide United — Research Plans & Pricing',
    description: 'From free summaries to full clinical intelligence. Unlock the depth you need.',
  },
}

export default function UpgradePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="py-20 text-center"
        style={{
          background: 'linear-gradient(160deg, #f0f4ff 0%, #fafaff 60%, #f5f0ff 100%)',
        }}
      >
        <div className="mx-auto max-w-[720px] px-6">
          <p className="mono-label mb-4 text-black/30">Membership</p>
          <h1 className="text-[42px] font-medium leading-[1.08] tracking-display text-black sm:text-[56px]">
            Research at the depth
            <br />
            you need
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.65] tracking-tight text-black/55">
            Free summaries for everyone. Full mechanism profiles, pharmacokinetics, clinical tools,
            and team access for those who need to go deeper.
          </p>
        </div>
      </section>

      {/* ── Pricing cards (interactive) ──────────────────────────── */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-black/[0.03]" />}>
        <UpgradeClient />
      </Suspense>

      {/* ── Feature comparison table ─────────────────────────────── */}
      <section className="mx-auto max-w-[900px] px-6 pb-20">
        <h2 className="mb-8 text-center text-[22px] font-medium tracking-heading text-black">
          Full feature comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border-light)' }}>
                <th className="pb-3 pr-4 font-normal text-black/40 w-1/2">Feature</th>
                <th className="pb-3 px-3 text-center font-medium text-black/60">Free</th>
                <th className="pb-3 px-3 text-center font-medium text-black/60">Researcher</th>
                <th className="pb-3 px-3 text-center font-medium text-lavender">Pro</th>
                <th className="pb-3 px-3 text-center font-medium text-black/60">Clinic</th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? 'bg-black/[0.01]' : ''}
                >
                  <td className="py-3 pr-4 text-black/70">{row.label}</td>
                  <td className="py-3 px-3 text-center">{renderCell(row.free)}</td>
                  <td className="py-3 px-3 text-center">{renderCell(row.researcher)}</td>
                  <td className="py-3 px-3 text-center">{renderCell(row.pro)}</td>
                  <td className="py-3 px-3 text-center">{renderCell(row.clinic)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(160deg, #f8f9ff 0%, #fafafa 100%)' }}
      >
        <div className="mx-auto max-w-[660px] px-6">
          <h2 className="mb-10 text-center text-[22px] font-medium tracking-heading text-black">
            Questions
          </h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q}>
                <p className="text-[14px] font-medium text-black">{item.q}</p>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-black/55">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────── */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-[560px] px-6">
          <p className="mb-2 text-[13px] font-mono tracking-mono text-black/30">
            No commitment
          </p>
          <h2 className="mb-4 text-[28px] font-medium tracking-heading text-black">
            Start for free
          </h2>
          <p className="mb-6 text-[14px] leading-[1.65] text-black/50">
            Browse all peptide summaries, categories, and status badges at no cost. Upgrade
            any time when you need deeper profiles.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/register" className="btn-dark text-[14px]">
              Create free account →
            </Link>
            <Link href="/peptides" className="btn-outline text-[14px]">
              Browse peptides
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// ── Cell renderer ────────────────────────────────────────────────────────────
function renderCell(value: boolean | string) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 text-[11px]">
        ✓
      </span>
    )
  }
  if (value === false) {
    return <span className="text-black/20 text-[12px]">—</span>
  }
  return <span className="text-[11px] text-black/50">{value}</span>
}

// ── Feature rows ─────────────────────────────────────────────────────────────
const FEATURE_ROWS: {
  label: string
  free: boolean | string
  researcher: boolean | string
  pro: boolean | string
  clinic: boolean | string
}[] = [
  { label: 'Peptide summaries', free: true, researcher: true, pro: true, clinic: true },
  { label: 'Research status badges', free: true, researcher: true, pro: true, clinic: true },
  { label: 'Category & tag browsing', free: true, researcher: true, pro: true, clinic: true },
  { label: 'Cmd+K search', free: true, researcher: true, pro: true, clinic: true },
  { label: 'Mechanism of action profiles', free: false, researcher: true, pro: true, clinic: true },
  { label: 'Pharmacokinetics & half-life data', free: false, researcher: true, pro: true, clinic: true },
  { label: 'PubMed study links', free: false, researcher: true, pro: true, clinic: true },
  { label: 'Evidence ratings', free: false, researcher: true, pro: true, clinic: true },
  { label: 'Regulatory status detail', free: false, researcher: true, pro: true, clinic: true },
  { label: 'Peptide comparison tool', free: false, researcher: true, pro: true, clinic: true },
  { label: 'Saved comparison lists', free: false, researcher: '25 lists', pro: 'Unlimited', clinic: 'Unlimited' },
  { label: 'Ad-free experience', free: false, researcher: true, pro: true, clinic: true },
  { label: 'Research newsletter', free: false, researcher: true, pro: true, clinic: true },
  { label: 'Clinical protocol PDFs', free: false, researcher: false, pro: true, clinic: true },
  { label: 'Stack builder tool', free: false, researcher: false, pro: true, clinic: true },
  { label: 'Protocol library', free: false, researcher: false, pro: true, clinic: true },
  { label: 'Vendor intelligence', free: false, researcher: false, pro: true, clinic: true },
  { label: 'Regulatory dashboard', free: false, researcher: false, pro: true, clinic: true },
  { label: 'Priority support', free: false, researcher: false, pro: true, clinic: true },
  { label: 'Team seats', free: false, researcher: false, pro: false, clinic: '5 seats' },
  { label: 'Patient education briefs', free: false, researcher: false, pro: false, clinic: true },
  { label: 'White-label exports', free: false, researcher: false, pro: false, clinic: true },
  { label: 'Quarterly regulatory call', free: false, researcher: false, pro: false, clinic: true },
  { label: 'Vendor vetting consultation', free: false, researcher: false, pro: false, clinic: true },
]

// ── FAQ data ─────────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: 'Can I cancel any time?',
    a: 'Yes. Cancel from your dashboard at any time. You keep full access through the end of the billing period — no partial-month charges.',
  },
  {
    q: 'Is there an annual discount?',
    a: 'Annual billing saves ~20% versus monthly. You can switch to annual from the billing portal after subscribing.',
  },
  {
    q: 'What counts as a "team seat" on the Clinic plan?',
    a: 'Each seat is a separate login with full Pro-level access. The primary account holder can invite up to 4 additional users from the dashboard.',
  },
  {
    q: 'Can I upgrade or downgrade mid-cycle?',
    a: 'Yes. Upgrades apply immediately and are prorated. Downgrades take effect at the next renewal date.',
  },
  {
    q: 'Is the information on Peptide United medical advice?',
    a: 'No. All content is for educational and research purposes only. It refers to preclinical and clinical research literature and should not be used for self-treatment or clinical decision-making without appropriate professional oversight.',
  },
  {
    q: 'How do I get an invoice for my subscription?',
    a: 'Invoices are generated automatically via Stripe and emailed to your billing address. You can also download them from the billing portal in your dashboard.',
  },
]
