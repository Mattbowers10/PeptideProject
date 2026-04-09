/**
 * Affiliate redirect handler
 * GET /go/[code] → records the click → 302 to partner destination
 */
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'affiliate-links',
    where: {
      trackingCode: { equals: code },
      isActive: { equals: true },
    },
    limit: 1,
  })

  const link = docs[0]

  if (!link) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Determine device type from user agent
  const ua = req.headers.get('user-agent') ?? ''
  const deviceType = /mobile/i.test(ua) ? 'mobile' : /tablet/i.test(ua) ? 'tablet' : 'desktop'

  // Log the click event (fire and forget — don't block redirect)
  void (async () => {
    try {
      // Check uniqueness via cookie presence (simple session approach)
      const cookieKey = `clicked_${code}`
      const isUnique = !req.cookies.get(cookieKey)

      await payload.create({
        collection: 'click-events',
        data: {
          affiliateLink: link.id,
          referrer: req.headers.get('referer') ?? undefined,
          deviceType,
          isUnique,
        },
      })

      // Increment aggregate counters on the link
      await payload.update({
        collection: 'affiliate-links',
        id: link.id,
        data: {
          clicks: (link.clicks ?? 0) + 1,
          uniqueClicks: isUnique ? (link.uniqueClicks ?? 0) + 1 : (link.uniqueClicks ?? 0),
          lastClickAt: new Date().toISOString(),
        },
      })
    } catch (_) {
      // Swallow errors — never block the redirect
    }
  })()

  const response = NextResponse.redirect(link.destinationUrl as string, { status: 302 })

  // Set a session cookie to track uniqueness (7 days)
  response.cookies.set(`clicked_${code}`, '1', {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'lax',
  })

  return response
}
