import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://peptidewiki.com').replace(/\/$/, '')
  const now = new Date()

  const payload = await getPayload({ config })

  const [peptidesResult, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'peptides',
      limit: 500,
      depth: 0,
      sort: 'name',
      overrideAccess: true,
    }),
    payload.find({
      collection: 'categories',
      limit: 100,
      depth: 0,
      sort: 'name',
    }),
  ])

  const peptideUrls: MetadataRoute.Sitemap = peptidesResult.docs.map((p) => ({
    url: `${base}/peptides/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = categoriesResult.docs.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/peptides`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    ...peptideUrls,
    ...categoryUrls,
  ]
}
