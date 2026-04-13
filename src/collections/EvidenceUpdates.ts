import type { CollectionConfig } from 'payload'

export const EvidenceUpdates: CollectionConfig = {
  slug: 'evidence-updates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'peptide', 'significance', 'publishedAt', 'status'],
    group: 'Research',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "BPC-157: New Human Trial Data Changes Evidence Grade"' },
    },
    {
      name: 'peptide',
      type: 'relationship',
      relationTo: 'peptides',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'changeType',
      type: 'select',
      required: true,
      options: [
        { label: 'New Study Published', value: 'study-published' },
        { label: 'Clinical Trial Completed', value: 'trial-completed' },
        { label: 'Clinical Trial Started', value: 'trial-started' },
        { label: 'FDA Action', value: 'fda-action' },
        { label: 'Study Retracted', value: 'retraction' },
        { label: 'Regulatory Update', value: 'regulatory' },
        { label: 'Evidence Grade Change', value: 'grade-change' },
      ],
    },
    {
      name: 'significance',
      type: 'select',
      required: true,
      options: [
        { label: 'Minor', value: 'minor' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Major', value: 'major' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: '300–400 words. What changed, what the new evidence shows, what it means.',
        rows: 6,
      },
    },
    {
      name: 'studyTitle',
      type: 'text',
      admin: { description: 'Title of the primary paper or event that prompted this update' },
    },
    {
      name: 'studyLink',
      type: 'text',
      admin: { description: 'URL to primary source (PubMed, FDA, ClinicalTrials.gov, etc.)' },
    },
    {
      name: 'linkedStudy',
      type: 'relationship',
      relationTo: 'studies',
      admin: { description: 'Optional: link to a Study record if one exists in the DB' },
    },
  ],
}
