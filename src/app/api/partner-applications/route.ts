import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { companyName, website, contactName, contactEmail, description } = body

    // Basic required-field validation
    const missing: string[] = []
    if (!companyName?.trim()) missing.push('companyName')
    if (!website?.trim()) missing.push('website')
    if (!contactName?.trim()) missing.push('contactName')
    if (!contactEmail?.trim()) missing.push('contactEmail')
    if (!description?.trim()) missing.push('description')

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    const testMode = process.env.BILLING_TEST_MODE === 'true'

    const doc = await payload.create({
      collection: 'partner-applications',
      data: {
        companyName: companyName.trim(),
        website: website.trim(),
        contactName: contactName.trim(),
        contactEmail: contactEmail.trim(),
        description: description.trim(),
        carriedPeptidesList: body.carriedPeptidesList?.trim() ?? '',
        hasCOA: Boolean(body.hasCOA),
        yearsInBusiness: body.yearsInBusiness ?? undefined,
        status: 'submitted',
        applicationFeeStatus: testMode ? 'paid' : 'unpaid',
        submittedAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })

    return NextResponse.json({ ok: true, id: doc.id })
  } catch (err) {
    console.error('[POST /api/partner-applications]', err)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 },
    )
  }
}
