import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import config from '@payload-config'

export const runtime = 'nodejs'
export const revalidate = 86400

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CATEGORY_LABELS: Record<string, string> = {
  guide:      'Research Guide',
  comparison: 'Comparison',
  clinical:   'Clinical Context',
  mechanism:  'Mechanism Deep Dive',
  protocol:   'Protocol Overview',
  regulatory: 'Regulatory Update',
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  const article = result.docs[0] as any

  const title = article?.title ?? slug
  const excerpt = article?.excerpt ?? ''
  const category = article?.category ?? ''
  const categoryLabel = CATEGORY_LABELS[category] ?? category

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%)',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            background: 'rgba(108,99,255,0.15)',
            border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: '4px',
            padding: '4px 10px',
            color: '#6c63ff',
            fontSize: '12px',
            letterSpacing: '0.1em',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            PEPTIDE WIKI · RESEARCH HUB
          </div>
          {categoryLabel && (
            <div style={{
              background: 'rgba(0,0,0,0.06)',
              borderRadius: '4px',
              padding: '4px 10px',
              color: 'rgba(0,0,0,0.4)',
              fontSize: '12px',
              letterSpacing: '0.06em',
            }}>
              {categoryLabel}
            </div>
          )}
        </div>

        {/* Article title */}
        <div style={{
          fontSize: title.length > 50 ? '48px' : '60px',
          fontWeight: 700,
          color: '#0a0a2e',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          maxWidth: '960px',
          marginBottom: '24px',
        }}>
          {title}
        </div>

        {/* Excerpt */}
        {excerpt && (
          <div style={{
            fontSize: '20px',
            color: 'rgba(10,10,46,0.5)',
            lineHeight: 1.55,
            maxWidth: '800px',
          }}>
            {excerpt.length > 150 ? excerpt.slice(0, 147) + '…' : excerpt}
          </div>
        )}

        {/* Bottom bar */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(10,10,46,0.1)',
          paddingTop: '24px',
        }}>
          <div style={{ color: 'rgba(10,10,46,0.3)', fontSize: '14px', letterSpacing: '0.05em' }}>
            peptidewiki.com
          </div>
          <div style={{ color: 'rgba(10,10,46,0.25)', fontSize: '14px' }}>
            Research use only
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
