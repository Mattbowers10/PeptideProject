import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'commissionRate', 'website'],
  },
  // Partners can read their own record; admins manage all
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      if (req.user?.role === 'partner') {
        return {
          id: {
            equals: req.user?.partnerProfile,
          },
        }
      }
      // Public: only show active partners
      return { status: { equals: 'active' } }
    },
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    // ── Identity ──────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Short description shown to users on the directory page.' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      admin: { description: 'Partner home URL (not the affiliate link).' },
    },

    // ── Trust & Verification ──────────────────────────────────
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending Review', value: 'pending' },
        { label: 'Suspended', value: 'suspended' },
      ],
    },
    {
      name: 'verificationTier',
      type: 'select',
      defaultValue: 'basic',
      options: [
        { label: 'Basic', value: 'basic' },
        { label: 'Verified (COA uploads enabled)', value: 'verified' },
        { label: 'Premium (featured placement)', value: 'premium' },
      ],
      admin: {
        description: 'Higher tiers get featured placement and unlock COA upload capability.',
      },
    },
    {
      name: 'acceptedTermsAt',
      type: 'date',
      admin: { readOnly: true },
    },

    // ── Commercial ────────────────────────────────────────────
    {
      name: 'commissionRate',
      type: 'number',
      min: 0,
      max: 100,
      admin: { description: 'Affiliate commission percentage (e.g. 10 = 10%).' },
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },

    // ── Peptides This Partner Carries ─────────────────────────
    {
      name: 'carriedPeptides',
      type: 'relationship',
      relationTo: 'peptides',
      hasMany: true,
      admin: {
        description: 'Which peptides does this partner supply? Used to auto-generate affiliate links.',
      },
    },

    // ── Portal Stats (computed/synced separately) ─────────────
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes (admin only).',
        condition: () => false, // hidden from partner users
      },
    },
  ],
}
