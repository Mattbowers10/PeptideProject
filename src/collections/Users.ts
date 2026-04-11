import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'membershipTier', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'member',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Partner', value: 'partner' },
        { label: 'Member', value: 'member' },
      ],
      access: {
        // Only admins can change roles
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'membershipTier',
      type: 'select',
      defaultValue: 'free',
      required: true,
      options: [
        { label: 'Free (Explorer)', value: 'free' },
        { label: 'Researcher ($12/mo)', value: 'researcher' },
        { label: 'Pro / Practitioner ($39/mo)', value: 'pro' },
        { label: 'Clinic ($149/mo)', value: 'clinic' },
      ],
      admin: {
        description: 'Determines content access level across the app.',
      },
    },
    {
      name: 'membershipExpiresAt',
      type: 'date',
      admin: {
        description: 'When the current paid membership period ends.',
        condition: (data) => data.membershipTier !== 'free',
      },
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        description: 'Stripe customer ID for billing management.',
        readOnly: true,
      },
    },
    {
      name: 'stripeSubscriptionId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    // For partner users — linked partner record
    {
      name: 'partnerProfile',
      type: 'relationship',
      relationTo: 'partners',
      admin: {
        condition: (data) => data.role === 'partner',
        description: 'Linked partner account for portal access.',
      },
    },
  ],
}
