import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getCurrentUser } from '@/lib/auth'

// PATCH /api/lists/[id] — update list (add/remove peptides, rename, notes)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  const payload = await getPayload({ config })
  // Verify ownership
  const existing = await payload.findByID({ collection: 'peptide-lists', id: Number(id), depth: 0, overrideAccess: true })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const ownerId = typeof existing.owner === 'object' ? (existing.owner as { id: number }).id : existing.owner
  if (ownerId !== user.id && user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const updated = await payload.update({
    collection: 'peptide-lists',
    id: Number(id),
    data: body,
    depth: 1,
    overrideAccess: true,
  })
  return NextResponse.json({ list: updated })
}

// DELETE /api/lists/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  const payload = await getPayload({ config })
  const existing = await payload.findByID({ collection: 'peptide-lists', id: Number(id), depth: 0, overrideAccess: true })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const ownerId = typeof existing.owner === 'object' ? (existing.owner as { id: number }).id : existing.owner
  if (ownerId !== user.id && user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await payload.delete({ collection: 'peptide-lists', id: Number(id), overrideAccess: true })
  return NextResponse.json({ ok: true })
}
