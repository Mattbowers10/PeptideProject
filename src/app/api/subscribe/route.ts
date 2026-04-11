import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendEmail } from '@/lib/email'
import { welcomeEmail } from '@/lib/email-templates'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source = 'homepage', peptideSlug } = body as {
      email?: string
      source?: string
      peptideSlug?: string
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Check for duplicate
    const existing = await payload.find({
      collection: 'email-subscribers',
      where: { email: { equals: email.toLowerCase().trim() } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      // Already subscribed — treat as success (no error to user)
      return NextResponse.json({ success: true, alreadySubscribed: true })
    }

    await payload.create({
      collection: 'email-subscribers',
      data: {
        email: email.toLowerCase().trim(),
        source: (source as 'homepage' | 'paywall' | 'peptide' | 'footer' | 'lead-magnet') ?? 'homepage',
        peptideSlug: peptideSlug ?? undefined,
      },
      overrideAccess: true,
    })

    // Fire welcome email (non-blocking — don't fail the subscription if email fails)
    const { subject, html } = welcomeEmail({ downloadUrl: 'https://peptidewiki.com/guide' })
    sendEmail({ to: email.toLowerCase().trim(), subject, html }).catch(console.error)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[subscribe]', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
