import type { CollectionConfig } from 'payload'

// Access helper — free users see summary only; researcher/pro see full content
const researcherOrAbove = ({ req }: { req: any }) => {
  const tier = req.user?.membershipTier
  return tier === 'researcher' || tier === 'pro' || req.user?.role === 'admin'
}

export const Peptides: CollectionConfig = {
  slug: 'peptides',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'researchStatus', 'categories', 'lastPubmedSync'],
  },
  fields: [
    // ── Identity ─────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Primary/common name (e.g. BPC-157, Thymosin Alpha-1)' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'aliases',
      type: 'array',
      label: 'Also Known As',
      fields: [{ name: 'alias', type: 'text' }],
      admin: {
        description: 'Other names, CAS numbers, or brand names for this peptide.',
      },
    },
    {
      name: 'casNumber',
      type: 'text',
      label: 'CAS Number',
    },
    {
      name: 'molecularFormula',
      type: 'text',
    },
    {
      name: 'molecularWeight',
      type: 'text',
      admin: { description: 'e.g. 1419.53 Da' },
    },

    // ── Classification ────────────────────────────────────────
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'researchStatus',
      type: 'select',
      required: true,
      defaultValue: 'preclinical',
      options: [
        { label: 'Preclinical (Animal/In Vitro)', value: 'preclinical' },
        { label: 'Phase I Trial', value: 'phase1' },
        { label: 'Phase II Trial', value: 'phase2' },
        { label: 'Phase III Trial', value: 'phase3' },
        { label: 'Approved', value: 'approved' },
        { label: 'Discontinued', value: 'discontinued' },
      ],
    },

    // ── Summary (FREE) ────────────────────────────────────────
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short plain-text summary — visible to all users including free tier.',
      },
    },

    // ── Full Research Content (RESEARCHER+) ───────────────────
    {
      name: 'mechanismOfAction',
      type: 'richText',
      label: 'Mechanism of Action',
      access: { read: researcherOrAbove },
      admin: {
        description: 'Detailed molecular mechanism — Researcher tier and above.',
      },
    },
    {
      name: 'pharmacokinetics',
      type: 'richText',
      label: 'Pharmacokinetics',
      access: { read: researcherOrAbove },
      admin: {
        description: 'Absorption, distribution, metabolism, excretion, half-life.',
      },
    },
    {
      name: 'researchFindings',
      type: 'richText',
      label: 'Key Research Findings',
      access: { read: researcherOrAbove },
    },
    {
      name: 'administrationRoutes',
      type: 'array',
      label: 'Routes of Administration',
      fields: [
        {
          name: 'route',
          type: 'select',
          options: [
            { label: 'Subcutaneous', value: 'subcutaneous' },
            { label: 'Intramuscular', value: 'intramuscular' },
            { label: 'Intravenous', value: 'intravenous' },
            { label: 'Oral', value: 'oral' },
            { label: 'Intranasal', value: 'intranasal' },
            { label: 'Transdermal', value: 'transdermal' },
            { label: 'Topical', value: 'topical' },
            { label: 'Sublingual', value: 'sublingual' },
            { label: 'Intracerebroventricular', value: 'intracerebroventricular' },
            { label: 'Intrahippocampal', value: 'intrahippocampal' },
          ],
        },
        {
          name: 'notes',
          type: 'text',
          admin: { description: 'Bioavailability notes or considerations for this route.' },
        },
      ],
    },
    {
      name: 'halfLife',
      type: 'text',
      admin: { description: 'e.g. "30–60 minutes", "4 hours"' },
    },
    {
      name: 'sideEffectsAndSafety',
      type: 'richText',
      label: 'Side Effects & Safety Profile',
      access: { read: researcherOrAbove },
    },
    {
      name: 'legalStatus',
      type: 'richText',
      label: 'Legal & Regulatory Status',
      admin: {
        description: 'Research-use only notices, country-specific status, FDA scheduling.',
      },
    },

    // ── PubMed Sync ───────────────────────────────────────────
    {
      name: 'pubmedSearchTerms',
      type: 'array',
      label: 'PubMed Search Terms',
      fields: [{ name: 'term', type: 'text' }],
      admin: {
        description: 'Terms used to auto-fetch related studies from PubMed.',
      },
    },
    {
      name: 'studies',
      type: 'relationship',
      relationTo: 'studies',
      hasMany: true,
      admin: {
        description: 'PubMed-synced research studies for this peptide.',
      },
    },
    {
      name: 'lastPubmedSync',
      type: 'date',
      admin: { readOnly: true, description: 'Last time PubMed was queried for this peptide.' },
    },

    // ── Affiliate Links ───────────────────────────────────────
    {
      name: 'affiliateLinks',
      type: 'relationship',
      relationTo: 'affiliate-links',
      hasMany: true,
    },

    // ── SEO ───────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
