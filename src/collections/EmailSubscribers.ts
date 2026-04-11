import type { CollectionConfig } from 'payload'

export const EmailSubscribers: CollectionConfig = {
  slug: 'email-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'createdAt'],
    description: 'Email capture list. Users who opted in via the site.',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    create: () => true, // public — called from /api/subscribe
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'homepage',
      options: [
        { label: 'Homepage', value: 'homepage' },
        { label: 'Paywall Gate', value: 'paywall' },
        { label: 'Peptide Page', value: 'peptide' },
        { label: 'Footer', value: 'footer' },
        { label: 'Lead Magnet (Guide)', value: 'lead-magnet' },
      ],
    },
    {
      name: 'peptideSlug',
      type: 'text',
      admin: { description: 'Slug of the peptide page where the user subscribed, if applicable.' },
    },
  ],
}
