import React from 'react'
import Link from 'next/link'
import { MobileNav } from './MobileNav'
import { UserNav } from './UserNav'
import { SearchTrigger } from './SearchTrigger'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-midnight" style={{ borderColor: 'var(--border-dark)' }}>
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white transition-opacity hover:opacity-80"
        >
          <span className="text-base font-medium tracking-heading">Peptide United</span>
        </Link>

        {/* Desktop nav — hidden below sm */}
        <nav className="hidden items-center gap-5 sm:flex">
          <Link
            href="/peptides"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Peptides
          </Link>
          <Link
            href="/categories"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Categories
          </Link>
          <Link
            href="/partners"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Partners
          </Link>
          <Link
            href="/research"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Research
          </Link>
          <Link
            href="/compare"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Compare
          </Link>
          <Link
            href="/stacks"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Stacks
          </Link>
          <Link
            href="/dashboard"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/upgrade"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Pricing
          </Link>
          {/* Search trigger */}
          <SearchTrigger />
        </nav>

        {/* User nav (desktop) + mobile hamburger */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <UserNav />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
