import React from 'react'
import type { Metadata } from 'next'
import ApplyClient from './ApplyClient'

export const metadata: Metadata = {
  title: 'Apply to Partner Program | Peptide United',
  description:
    'Submit your application to list your peptide brand on Peptide United. Applications are reviewed within 5 business days.',
}

export default function ApplyPage() {
  return (
    <div className="bg-white">
      {/* Top gradient strip */}
      <div className="gradient-pastel py-10">
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <p className="mono-label mb-2 text-black/40">Partner application</p>
          <h1 className="text-[30px] font-medium tracking-heading text-black">
            Apply to list your brand
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-[14px] leading-[1.6] text-black/50">
            Fill in the form below. Applications are reviewed within 5 business days.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-[700px] px-6 py-14">
        <ApplyClient />
      </div>
    </div>
  )
}
