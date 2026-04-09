import React from 'react'

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="h-8 w-48 animate-pulse rounded-sharp bg-black/[0.06]" />
      <div className="h-4 w-72 animate-pulse rounded-sharp bg-black/[0.04]" />

      {/* Stat cards skeleton */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-light animate-pulse p-6">
            <div className="h-3 w-20 rounded bg-black/[0.06]" />
            <div className="mt-3 h-8 w-16 rounded bg-black/[0.08]" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="card-light animate-pulse p-6">
        <div className="space-y-3">
          <div className="h-3 w-full rounded bg-black/[0.04]" />
          <div className="h-3 w-3/4 rounded bg-black/[0.04]" />
          <div className="h-3 w-1/2 rounded bg-black/[0.04]" />
        </div>
      </div>
    </div>
  )
}
