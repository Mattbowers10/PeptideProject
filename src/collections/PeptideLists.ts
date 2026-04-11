import type { CollectionConfig } from 'payload'

export const PeptideLists: CollectionConfig = {
  slug: 'peptide-lists',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'owner', 'peptideCount', 'createdAt'],
  },
  access: {
    // Users can only see their own lists; admins see all
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      if (!req.user) return false
      return { owner: { equals: req.user.id } }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return { owner: { equals: req.user?.id } }
    },
    delete: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return { owner: { equals: req.user?.id } }
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 80,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'peptides',
      type: 'relationship',
      relationTo: 'peptides',
      hasMany: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Optional private notes about this list.' },
    },
  ],
}
