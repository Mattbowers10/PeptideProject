'use client'

import { useState, useEffect } from 'react'
import type { User } from '@/payload-types'

export type AuthState = {
  user: User | null
  loading: boolean
}

/**
 * Client-side hook to fetch the current authenticated user via /api/users/me.
 * Reads Payload's HTTP-only session cookie automatically (credentials: 'include').
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/users/me', {
      credentials: 'include',
      cache: 'no-store',
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data.user ?? null)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })
  }, [])

  return { user, loading }
}
