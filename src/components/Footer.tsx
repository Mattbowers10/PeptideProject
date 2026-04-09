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

        {/* Footer links */}
        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <Link href="/peptides" className="text-sm text-white/50 transition-colors hover:text-white">
              Peptides
            </Link>
            <Link href="/categories" className="text-sm text-white/50 transition-colors hover:text-white">
              Categories
            </Link>
          </div>

          <p className="mono-label text-white/30">
            For research and educational purposes only
          </p>
        </div>
      </div>
    </footer>
  )
}
