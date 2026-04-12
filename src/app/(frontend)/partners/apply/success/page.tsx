import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Application Received | Peptide United',
  description: 'Your partner application has been received. Our team will review it within 5 business days.',
}

export default function ApplySuccessPage() {
  return (
    <div className="bg-white">
      <div className="gradient-pastel py-12">
        <div className="mx-auto max-w-[560px] px-6 text-center">
          <span className="font-mono text-[40px] text-lavender">✓</span>
          <h1 className="mt-4 text-[32px] font-medium tracking-heading text-black">
            Application received
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[560px] px-6 py-14">
        <div className="card-light p-8">
          <p className="mono-label mb-4 text-black/30">What happens next</p>
          <ol className="flex flex-col gap-5">
            <li className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/15 font-mono text-[12px] text-black/40">
                1
              </span>
              <div>
                <p className="text-[14px] font-medium text-black">Application review</p>
                <p className="mt-0.5 text-[13px] leading-[1.6] text-black/50">
                  Our team manually reviews your website, product pages, and documentation. This takes up to 5 business days.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/15 font-mono text-[12px] text-black/40">
                2
              </span>
              <div>
                <p className="text-[14px] font-medium text-black">Decision email</p>
                <p className="mt-0.5 text-[13px] leading-[1.6] text-black/50">
                  You will receive an approval or rejection notice at the email you provided. Approved applicants get onboarding instructions and access to the partner dashboard.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/15 font-mono text-[12px] text-black/40">
                3
              </span>
              <div>
                <p className="text-[14px] font-medium text-black">Go live</p>
                <p className="mt-0.5 text-[13px] leading-[1.6] text-black/50">
                  Once approved and listed, your peptide affiliate links are active and your listing appears in the partner directory immediately.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link href="/partners" className="btn-glass">
            ← Browse partner directory
          </Link>
        </div>
      </div>
    </div>
  )
}
