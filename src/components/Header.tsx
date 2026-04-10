import React from 'react'
import Link from 'next/link'
import { MobileNav } from './MobileNav'
import { UserNav } from './UserNav'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-midnight" style={{ borderColor: 'var(--border-dark)' }}>
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white transition-opacity hover:opacity-80"
        >
          <span className="text-base font-medium tracking-heading">Peptide Wiki</span>
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
            href="/goals"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Goals
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
            href="/compare"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Compare
          </Link>
          <Link
            href="/dashboard"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          {/* Search */}
          <form action="/peptides" method="GET" className="hidden md:block">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                name="q"
                type="search"
                placeholder="Search…"
                className="w-40 rounded-sharp border bg-white/[0.08] py-1.5 pl-8 pr-3 text-sm text-white placeholder:text-white/40 transition-all focus:w-52 focus:bg-white/[0.12] focus:outline-none"
                style={{ borderColor: 'var(--border-dark)' }}
              />
            </div>
          </form>
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
