'use client'

import React, { useEffect, useRef, useState } from 'react'

export type TOCSection = { id: string; label: string }

export function ProfileTOC({ sections }: { sections: TOCSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { threshold: 0.4 },
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [sections])

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ── Desktop: vertical sticky list (inside sidebar) ── */}
      <div className="hidden lg:block">
        <p className="mono-label mb-3 text-white/30">On This Page</p>
        <nav>
          <ul className="space-y-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={handleClick(id)}
                  className={
                    activeId === id
                      ? 'block text-[13px] font-medium text-white transition-colors'
                      : 'block text-[13px] text-white/35 transition-colors hover:text-white/70'
                  }
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── Mobile: horizontal scroll nav ── */}
      <div
        className="flex gap-5 overflow-x-auto border-b py-3 lg:hidden"
        style={{ borderColor: 'var(--border-dark)' }}
      >
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={handleClick(id)}
            className={
              activeId === id
                ? 'mono-label whitespace-nowrap text-white'
                : 'mono-label whitespace-nowrap text-white/35 hover:text-white/70'
            }
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
