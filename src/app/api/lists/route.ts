import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentUser } from '@/lib/auth'

// GET /api/lists — fetch the authenticated user's lists
export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'peptide-lists',
    where: { owner: { equals: user.id } },
    depth: 1,
    limit: 50,
    overrideAccess: true,
  })

  return NextResponse.json({ lists: docs })
}

// POST /api/lists — create a new list
export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Enforce tier limit: free users get 0, researcher gets 25, pro/clinic unlimited
  const tier = user.membershipTier ?? 'free'
  if (tier === 'free') {
    return NextResponse.json({ error: 'Saved lists require a Researcher plan or higher.' }, { status: 403 })
  }

  const payload = await getPayload({ config })

  // Enforce 25-list cap for Researcher tier
  if (tier === 'researcher') {
    const { totalDocs } = await payload.find({
      collection: 'peptide-lists',
      where: { owner: { equals: user.id } },
      limit: 0,
      overrideAccess: true,
    })
    if (totalDocs >= 25) {
      return NextResponse.json({ error: 'Researcher plan allows up to 25 saved lists. Upgrade to Pro for unlimited.' }, { status: 403 })
    }
  }

  const body = await req.json()
  const { name, notes } = body as { name?: string; notes?: string }
  if (!name?.trim()) return NextResponse.json({ error: 'List name is required.' }, { status: 400 })

  const list = await payload.create({
    collection: 'peptide-lists',
    data: { name: name.trim(), owner: user.id, notes: notes ?? undefined },
    overrideAccess: true,
  })

  return NextResponse.json({ list }, { status: 201 })
}
