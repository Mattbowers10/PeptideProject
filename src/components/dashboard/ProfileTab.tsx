'use client'

import React, { useState } from 'react'
import type { User } from '@/payload-types'

export function ProfileTab({ user }: { user: User }) {
  const [name, setName] = useState(user.name ?? '')
  const [email, setEmail] = useState(user.email)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder — will wire to Payload API when auth is live
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-medium tracking-heading text-black">Profile</h1>
        <p className="mt-1 text-[14px] text-black/50">
          Manage your account information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card-light max-w-lg p-6">
        <p className="mono-label mb-5 text-black/30">Account details</p>

        {/* Name */}
        <div className="mb-5">
          <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium tracking-tight text-black/70">
            Display Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-sharp border bg-white px-3 py-2.5 text-[14px] tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
            style={{ borderColor: 'var(--border-light)' }}
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium tracking-tight text-black/70">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sharp border bg-white px-3 py-2.5 text-[14px] tracking-tight text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-lavender/50"
            style={{ borderColor: 'var(--border-light)' }}
          />
        </div>

        {/* Role (read-only) */}
        <div className="mb-6">
          <label className="mb-1.5 block text-[13px] font-medium tracking-tight text-black/70">
            Role
          </label>
          <p className="text-[14px] capitalize text-black/50">{user.role}</p>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-dark">
            Save Changes
          </button>
          {saved && (
            <span className="text-[13px] text-emerald-600">Changes saved (demo)</span>
          )}
        </div>
      </form>

      {/* Danger zone */}
      <div className="card-light max-w-lg border-red-200 p-6">
        <p className="mono-label mb-2 text-red-500/60">Danger zone</p>
        <p className="text-[13px] text-black/50">
          Account deletion will be available when authentication is fully implemented.
        </p>
      </div>
    </div>
  )
}
