import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto bg-midnight text-white">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Large wordmark */}
        <div className="border-b py-16" style={{ borderColor: 'var(--border-dark)' }}>
          <p className="text-5xl font-medium tracking-display text-white/10 sm:text-7xl">
            peptide wiki
          </p>
        </div>

        {/* Footer link grid */}
        <div className="grid gap-8 py-12 sm:grid-cols-3">
          <div>
            <p className="mono-label mb-4 text-white/30">Research</p>
            <div className="flex flex-col gap-2">
              <Link href="/peptides" className="text-sm text-white/50 transition-colors hover:text-white">
                All Peptides
              </Link>
              <Link href="/categories" className="text-sm text-white/50 transition-colors hover:text-white">
                Categories
              </Link>
              <Link href="/peptides?status=approved" className="text-sm text-white/50 transition-colors hover:text-white">
                Approved Compounds
              </Link>
              <Link href="/peptides?status=human" className="text-sm text-white/50 transition-colors hover:text-white">
                Human Trials
              </Link>
              <Link href="/glossary" className="text-sm text-white/50 transition-colors hover:text-white">
                Glossary
              </Link>
            </div>
          </div>

          <div>
            <p className="mono-label mb-4 text-white/30">Partners</p>
            <div className="flex flex-col gap-2">
              <Link href="/partners" className="text-sm text-white/50 transition-colors hover:text-white">
                Partner Directory
              </Link>
              <Link href="/dashboard?tab=partner" className="text-sm text-white/50 transition-colors hover:text-white">
                Partner Dashboard
              </Link>
            </div>
          </div>

          <div>
            <p className="mono-label mb-4 text-white/30">Account</p>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard" className="text-sm text-white/50 transition-colors hover:text-white">
                Dashboard
              </Link>
              <Link href="/upgrade" className="text-sm text-white/50 transition-colors hover:text-white">
                Pricing & Plans
              </Link>
              <Link href="/dashboard?tab=membership" className="text-sm text-white/50 transition-colors hover:text-white">
                Manage Subscription
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t pb-8 pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-dark)' }}>
          <p className="mono-label text-white/20">
            © {new Date().getFullYear()} Peptide Wiki. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/terms" className="mono-label text-white/20 transition-colors hover:text-white/40">
              Terms
            </Link>
            <Link href="/privacy" className="mono-label text-white/20 transition-colors hover:text-white/40">
              Privacy
            </Link>
            <Link href="/disclaimer" className="mono-label text-white/20 transition-colors hover:text-white/40">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
