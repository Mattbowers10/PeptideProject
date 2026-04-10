'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/peptides', label: 'Peptides' },
  { href: '/categories', label: 'Categories' },
  { href: '/partners', label: 'Partners' },
  { href: '/compare', label: 'Compare' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/login', label: 'Sign in' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Hamburger button — only visible on mobile */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-sharp text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white sm:hidden"
      >
        {open ? (
          // X icon
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 transform bg-midnight transition-transform duration-200 ease-out sm:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Panel header */}
        <div className="flex h-14 items-center justify-between px-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="text-[15px] font-medium tracking-tight text-white">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-sharp text-white/50 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="p-4">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-sharp px-4 py-3 text-[15px] tracking-tight transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/60 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Search in panel */}
          <div className="mt-6 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="mono-label mb-2 text-white/30">Search</p>
            <form action="/peptides" method="GET">
              <input
                name="q"
                type="search"
                placeholder="Search peptides…"
                className="w-full rounded-sharp border bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-lavender/40"
                style={{ borderColor: 'rgba(255,255,255,0.10)' }}
              />
              <button type="submit" className="btn-dark mt-2 w-full justify-center text-sm">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    </>
  )
}
