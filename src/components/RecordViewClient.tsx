'use client'

import { useEffect } from 'react'
import { recordView } from './RecentlyViewed'

/** Fires recordView on mount — client component boundary for the detail page */
export function RecordViewClient({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    recordView(slug, name)
  }, [slug, name])

  return null
}
