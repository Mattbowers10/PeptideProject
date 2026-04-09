import type { CollectionConfig } from 'payload'

export const Studies: CollectionConfig = {
  slug: 'studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'studyType', 'publishedDate', 'peptides'],
  },
  fields: [
    // ── PubMed Identity ───────────────────────────────────────
    {
      name: 'pubmedId',
      type: 'text',
      required: true,
      unique: true,
      label: 'PubMed ID (PMID)',
    },
    {
      name: 'doi',
      type: 'text',
      label: 'DOI',
    },

    // ── Bibliographic ─────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'authors',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },
    {
      name: 'journal',
      type: 'text',
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'url',
      type: 'text',
      label: 'PubMed URL',
    },

    // ── Content ───────────────────────────────────────────────
    {
      name: 'abstract',
      type: 'textarea',
    },
    {
      name: 'studyType',
      type: 'select',
      options: [
        { label: 'In Vitro', value: 'in-vitro' },
        { label: 'Animal', value: 'animal' },
        { label: 'Human (Clinical)', value: 'human' },
        { label: 'Systematic Review', value: 'review' },
        { label: 'Meta-Analysis', value: 'meta-analysis' },
        { label: 'Case Study', value: 'case-study' },
      ],
    },
    {
      name: 'keyFindings',
      type: 'richText',
      label: 'Key Findings',
      admin: {
        description: 'Editorially-summarized key takeaways from this study.',
      },
    },
    {
      name: 'qualityScore',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Internal quality/reliability score (1–5). Used for ranking.',
      },
    },

    // ── Relationships ─────────────────────────────────────────
    {
      name: 'peptides',
      type: 'relationship',
      relationTo: 'peptides',
      hasMany: true,
    },

    // ── Sync Metadata ─────────────────────────────────────────
    {
      name: 'syncedAt',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'pubmed',
      options: [
        { label: 'PubMed', value: 'pubmed' },
        { label: 'Manual Entry', value: 'manual' },
      ],
    },
  ],
}
