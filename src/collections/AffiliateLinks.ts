import type { CollectionConfig } from 'payload'

export const AffiliateLinks: CollectionConfig = {
  slug: 'affiliate-links',
  admin: {
    useAsTitle: 'trackingCode',
    defaultColumns: ['partner', 'peptide', 'trackingCode', 'clicks', 'isActive'],
  },
  access: {
    // Partners see only their own links
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      if (req.user?.role === 'partner') {
        return {
          'partner.id': { equals: req.user?.partnerProfile },
        }
      }
      return true // links themselves are public (needed for redirect)
    },
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.trackingCode) {
          // Generate a short unique tracking code using the global crypto API
          data.trackingCode = crypto.randomUUID().replace(/-/g, '').slice(0, 10)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'partner',
      type: 'relationship',
      relationTo: 'partners',
      required: true,
    },
    {
      name: 'peptide',
      type: 'relationship',
      relationTo: 'peptides',
      required: true,
    },
    {
      name: 'trackingCode',
      type: 'text',
      unique: true,
      admin: {
        description: 'Auto-generated short code. URL will be /go/[trackingCode]',
        readOnly: true,
      },
    },
    {
      name: 'destinationUrl',
      type: 'text',
      required: true,
      admin: {
        description: "Partner's direct product page URL (with any UTM params they provide).",
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    // Aggregate stats (incremented via ClickEvents)
    {
      name: 'clicks',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Total clicks. Incremented by the /go/[code] redirect handler.',
      },
    },
    {
      name: 'uniqueClicks',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'lastClickAt',
      type: 'date',
      admin: { readOnly: true },
    },
  ],
}
