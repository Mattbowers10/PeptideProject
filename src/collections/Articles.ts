import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    description: 'Research articles and guides for the /research hub.',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug — e.g. "bpc-157-complete-guide"' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Research Guide', value: 'guide' },
        { label: 'Peptide Comparison', value: 'comparison' },
        { label: 'Clinical Context', value: 'clinical' },
        { label: 'Mechanism Deep Dive', value: 'mechanism' },
        { label: 'Protocol Overview', value: 'protocol' },
        { label: 'Regulatory Update', value: 'regulatory' },
      ],
      defaultValue: 'guide',
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Set to schedule future publishing.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary shown in listing cards and meta description.' },
    },
    {
      name: 'readTimeMinutes',
      type: 'number',
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Estimated read time in minutes.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'relatedPeptides',
      type: 'relationship',
      relationTo: 'peptides',
      hasMany: true,
      admin: {
        description: 'Peptides this article directly covers.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
      admin: { description: 'Searchable tags for filtering.' },
    },
    {
      name: 'seoTitle',
      type: 'text',
      admin: { description: 'Override title for <head> — leave blank to use article title.' },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      admin: { description: 'Override meta description — leave blank to use excerpt.' },
    },
  ],
}
