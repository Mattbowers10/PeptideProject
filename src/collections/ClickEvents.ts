import type { CollectionConfig } from 'payload'

// Raw click event log — used for partner portal analytics
export const ClickEvents: CollectionConfig = {
  slug: 'click-events',
  admin: {
    defaultColumns: ['affiliateLink', 'createdAt', 'referrer', 'country'],
    // No editing — this is an append-only log
  },
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      // Partners can read click events for their own links only
      if (req.user?.role === 'partner') {
        return {
          'affiliateLink.partner.id': { equals: req.user?.partnerProfile },
        }
      }
      return false
    },
    create: () => true, // Created by the public redirect handler
    update: () => false,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'affiliateLink',
      type: 'relationship',
      relationTo: 'affiliate-links',
      required: true,
    },
    {
      name: 'referrer',
      type: 'text',
      admin: { description: 'HTTP referrer of the click.' },
    },
    {
      name: 'country',
      type: 'text',
      admin: { description: 'Country derived from IP (geo-lookup).' },
    },
    {
      name: 'deviceType',
      type: 'select',
      options: [
        { label: 'Desktop', value: 'desktop' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Tablet', value: 'tablet' },
        { label: 'Unknown', value: 'unknown' },
      ],
    },
    {
      name: 'isUnique',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'True if this is the first click from this session/IP for this link.' },
    },
  ],
  timestamps: true,
}
