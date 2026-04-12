import type { CollectionConfig } from 'payload'

export const PartnerApplications: CollectionConfig = {
  slug: 'partner-applications',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'contactEmail', 'status', 'applicationFeeStatus', 'submittedAt'],
    description: 'Incoming partner applications. Flip status to "approved" to auto-create a Partner record.',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    create: () => true, // public form submissions
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // When status changes to 'approved', auto-create a pending Partner record
        if (
          operation === 'update' &&
          doc.status === 'approved' &&
          previousDoc?.status !== 'approved'
        ) {
          try {
            const payload = req.payload
            // Check if a partner with this email already exists
            const existing = await payload.find({
              collection: 'partners',
              where: { contactEmail: { equals: doc.contactEmail } },
              limit: 1,
              overrideAccess: true,
            })
            if (existing.docs.length === 0) {
              const slug = doc.companyName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
              await payload.create({
                collection: 'partners',
                data: {
                  name: doc.companyName,
                  slug,
                  website: doc.website,
                  contactEmail: doc.contactEmail,
                  description: doc.description,
                  status: 'pending',
                  verificationTier: 'basic',
                  notes: `Auto-created from application #${doc.id}`,
                },
                overrideAccess: true,
              })
            }
          } catch (err) {
            console.error('[PartnerApplications] Failed to auto-create Partner record:', err)
          }
        }
      },
    ],
  },
  fields: [
    // ── Company Info ─────────────────────────────────────────
    {
      name: 'companyName',
      type: 'text',
      required: true,
      admin: { description: 'Legal or trading name of the company.' },
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      admin: { description: 'Full URL of the company website.' },
    },

    // ── Contact ──────────────────────────────────────────────
    {
      name: 'contactName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },

    // ── Business Details ─────────────────────────────────────
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Tell us about your business and the peptides you carry.',
      },
    },
    {
      name: 'carriedPeptidesList',
      type: 'textarea',
      admin: {
        description: 'List the peptides you carry (one per line).',
      },
    },
    {
      name: 'hasCOA',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Do you provide Certificates of Analysis for all products?',
      },
    },
    {
      name: 'yearsInBusiness',
      type: 'select',
      options: [
        { label: 'Less than 1 year', value: 'under1' },
        { label: '1–3 years', value: '1to3' },
        { label: '3–5 years', value: '3to5' },
        { label: 'More than 5 years', value: 'over5' },
      ],
      admin: { description: 'How long has the company been operating?' },
    },

    // ── Application Status ───────────────────────────────────
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'submitted',
      options: [
        { label: 'Submitted', value: 'submitted' },
        { label: 'Under Review', value: 'reviewing' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        description: 'Flip to "Approved" to automatically create a Partner record.',
      },
    },
    {
      name: 'applicationFeeStatus',
      type: 'select',
      defaultValue: 'unpaid',
      options: [
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Paid', value: 'paid' },
      ],
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Stripe Checkout session ID for the application fee.',
      },
    },

    // ── Internal ─────────────────────────────────────────────
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: { description: 'Internal notes — not visible to applicants.' },
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: { readOnly: true },
    },
  ],
}
