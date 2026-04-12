'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const YEARS_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'under1', label: 'Less than 1 year' },
  { value: '1to3', label: '1–3 years' },
  { value: '3to5', label: '3–5 years' },
  { value: 'over5', label: 'More than 5 years' },
]

interface FormState {
  companyName: string
  website: string
  contactName: string
  contactEmail: string
  description: string
  carriedPeptidesList: string
  hasCOA: boolean
  yearsInBusiness: string
}

const INITIAL: FormState = {
  companyName: '',
  website: '',
  contactName: '',
  contactEmail: '',
  description: '',
  carriedPeptidesList: '',
  hasCOA: false,
  yearsInBusiness: '',
}

const testMode = process.env.NEXT_PUBLIC_BILLING_TEST_MODE === 'true'

export default function ApplyClient() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testSuccess, setTestSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setForm((f) => ({ ...f, [name]: value }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/partner-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Submission failed. Please try again.')
      }

      if (testMode) {
        setSubmittedEmail(form.contactEmail)
        setTestSuccess(true)
      } else {
        // In production: redirect to Stripe checkout
        // For now redirect to success page
        router.push('/partners/apply/success')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  if (testSuccess) {
    return (
      <div className="card-light mx-auto max-w-[560px] p-10 text-center">
        <span className="font-mono text-[32px] text-lavender">✓</span>
        <h2 className="mt-4 text-[22px] font-medium tracking-heading text-black">
          Application submitted
        </h2>
        <p className="mt-3 text-[14px] leading-[1.65] text-black/55">
          Test mode — payment bypassed. Your application has been recorded for{' '}
          <span className="font-mono text-black">{submittedEmail}</span>.
        </p>
        <p className="mt-2 text-[13px] text-black/40">
          Our team will review your application and follow up within 5 business days.
        </p>
        <a href="/partners" className="btn-dark mt-7 inline-flex">
          Back to partner directory →
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-light mx-auto max-w-[600px] p-8"
      noValidate
    >
      {/* Progress */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-lavender font-mono text-[12px] text-white">
          1
        </div>
        <div className="flex-1 h-px bg-black/10" />
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15 font-mono text-[12px] text-black/30">
          2
        </div>
        <span className="font-mono text-[11px] tracking-mono text-black/30">Information → Payment</span>
      </div>

      <h2 className="mb-6 text-[20px] font-medium tracking-heading text-black">
        About your business
      </h2>

      {/* Company Name */}
      <div className="mb-5">
        <label className="mono-label mb-1.5 block text-black/50" htmlFor="companyName">
          Company Name *
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          value={form.companyName}
          onChange={handleChange}
          required
          placeholder="Acme Peptides Inc."
          className="w-full rounded-sharp border bg-white px-3 py-2.5 text-sm tracking-tight text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-lavender/50"
          style={{ borderColor: 'var(--border-light)' }}
        />
      </div>

      {/* Website */}
      <div className="mb-5">
        <label className="mono-label mb-1.5 block text-black/50" htmlFor="website">
          Website URL *
        </label>
        <input
          id="website"
          name="website"
          type="url"
          value={form.website}
          onChange={handleChange}
          required
          placeholder="https://yourstore.com"
          className="w-full rounded-sharp border bg-white px-3 py-2.5 text-sm tracking-tight text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-lavender/50"
          style={{ borderColor: 'var(--border-light)' }}
        />
      </div>

      {/* Contact Name + Email */}
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mono-label mb-1.5 block text-black/50" htmlFor="contactName">
            Contact Name *
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            value={form.contactName}
            onChange={handleChange}
            required
            placeholder="Jane Smith"
            className="w-full rounded-sharp border bg-white px-3 py-2.5 text-sm tracking-tight text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-lavender/50"
            style={{ borderColor: 'var(--border-light)' }}
          />
        </div>
        <div>
          <label className="mono-label mb-1.5 block text-black/50" htmlFor="contactEmail">
            Contact Email *
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={form.contactEmail}
            onChange={handleChange}
            required
            placeholder="jane@yourstore.com"
            className="w-full rounded-sharp border bg-white px-3 py-2.5 text-sm tracking-tight text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-lavender/50"
            style={{ borderColor: 'var(--border-light)' }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="mono-label mb-1.5 block text-black/50" htmlFor="description">
          About your business *
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Tell us about your business and the peptides you carry. What makes your products research-grade? Who is your target customer?"
          className="w-full rounded-sharp border bg-white px-3 py-2.5 text-sm tracking-tight text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-lavender/50 resize-none"
          style={{ borderColor: 'var(--border-light)' }}
        />
      </div>

      {/* Peptides carried */}
      <div className="mb-5">
        <label className="mono-label mb-1.5 block text-black/50" htmlFor="carriedPeptidesList">
          Peptides you carry
        </label>
        <textarea
          id="carriedPeptidesList"
          name="carriedPeptidesList"
          value={form.carriedPeptidesList}
          onChange={handleChange}
          rows={4}
          placeholder={'BPC-157\nTB-500\nIpamorelin'}
          className="w-full rounded-sharp border bg-white px-3 py-2.5 font-mono text-sm tracking-tight text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-lavender/50 resize-none"
          style={{ borderColor: 'var(--border-light)' }}
        />
        <p className="mt-1 font-mono text-[11px] tracking-mono text-black/30">One per line</p>
      </div>

      {/* Years in business */}
      <div className="mb-5">
        <label className="mono-label mb-1.5 block text-black/50" htmlFor="yearsInBusiness">
          Years in business
        </label>
        <select
          id="yearsInBusiness"
          name="yearsInBusiness"
          value={form.yearsInBusiness}
          onChange={handleChange}
          className="w-full rounded-sharp border bg-white px-3 py-2.5 text-sm tracking-tight text-black focus:outline-none focus:ring-2 focus:ring-lavender/50"
          style={{ borderColor: 'var(--border-light)' }}
        >
          {YEARS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* COA checkbox */}
      <div className="mb-7">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            name="hasCOA"
            type="checkbox"
            checked={form.hasCOA}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 accent-lavender"
          />
          <span className="text-[14px] text-black/65">
            We provide Certificates of Analysis for all products
          </span>
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-sharp border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-[13px] text-red-700">{error}</p>
        </div>
      )}

      {/* Test mode notice */}
      {testMode && (
        <div
          className="mb-5 rounded-sharp border px-4 py-3"
          style={{ borderColor: 'rgba(232,98,42,0.25)', background: 'rgba(232,98,42,0.05)' }}
        >
          <p className="font-mono text-[11px] tracking-mono text-lavender">
            BILLING TEST MODE — payment will be bypassed on submission
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-dark w-full justify-center"
      >
        {submitting ? 'Submitting…' : testMode ? 'Submit application (test mode)' : 'Continue to payment →'}
      </button>

      <p className="mt-4 text-center font-mono text-[11px] tracking-mono text-black/30">
        $99 one-time application fee · $19/month after approval
      </p>
    </form>
  )
}
