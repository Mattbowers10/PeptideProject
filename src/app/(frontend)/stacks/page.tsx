import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { StackBuilderClient } from './StackBuilderClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Peptide Stack Builder | Peptide United',
  description: 'Build and save custom peptide research stacks. View mechanism interactions, route compatibility, and half-life data side by side.',
}

export default function StacksPage() {
  return (
    <main>
      {/* Hero */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-3 text-black/40">Pro feature</p>
          <h1 className="text-[36px] font-medium leading-[1.1] tracking-display text-black sm:text-[48px]">
            Stack Builder
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.5] text-black/55">
            Combine up to 6 peptides to view their research profiles side by side — half-lives, routes, mechanisms, and status in one view.
          </p>
        </div>
      </section>

      {/* Stack builder — Pro gated */}
      <section className="mx-auto max-w-[1200px] px-6 py-12">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-comfortable bg-black/[0.03]" />}>
          <StackBuilderClient />
        </Suspense>
      </section>
    </main>
  )
}
