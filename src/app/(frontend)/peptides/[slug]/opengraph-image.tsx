import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'
import config from '@payload-config'

export const runtime = 'nodejs'
export const revalidate = 86400

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'peptides',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })
  const peptide = result.docs[0]

  const name = (peptide as any)?.name ?? slug
  const summary = (peptide as any)?.summary ?? 'Research-grade peptide profile'
  const status = (peptide as any)?.researchStatus ?? ''

  const STATUS_LABELS: Record<string, string> = {
    approved: 'FDA Approved',
    human: 'Human Trials',
    preclinical: 'Preclinical',
    experimental: 'Experimental',
    discontinued: 'Discontinued',
  }
  const statusLabel = STATUS_LABELS[status] ?? status

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#010120',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            background: 'rgba(108,99,255,0.2)',
            border: '1px solid rgba(108,99,255,0.4)',
            borderRadius: '4px',
            padding: '4px 10px',
            color: '#9d96ff',
            fontSize: '12px',
            letterSpacing: '0.1em',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}>
            PEPTIDE UNITED
          </div>
          {statusLabel && (
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '4px',
              padding: '4px 10px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '12px',
              letterSpacing: '0.08em',
            }}>
              {statusLabel}
            </div>
          )}
        </div>

        {/* Peptide name */}
        <div style={{
          fontSize: name.length > 20 ? '64px' : '80px',
          fontWeight: 600,
          color: 'white',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          maxWidth: '900px',
          marginBottom: '24px',
        }}>
          {name}
        </div>

        {/* Summary */}
        <div style={{
          fontSize: '20px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.5,
          maxWidth: '800px',
          overflow: 'hidden',
          display: '-webkit-box',
        }}>
          {summary.length > 150 ? summary.slice(0, 147) + '…' : summary}
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px', letterSpacing: '0.05em' }}>
            peptideunited.com
          </div>
          <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>
            Research use only
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
