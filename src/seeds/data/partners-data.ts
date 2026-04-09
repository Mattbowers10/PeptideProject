/**
 * Seed data for partner companies.
 * Based on the real research-chemical suppliers associated with this project.
 */
export const partnersData = [
  {
    name: 'PureRawz',
    slug: 'purerawz',
    description:
      'Research-grade peptides, nootropics, and SARMs with third-party certificate of analysis (COA) for every batch. Specializes in high-purity lyophilized peptides for laboratory research.',
    website: 'https://www.purerawz.co',
    status: 'active' as const,
    verificationTier: 'premium' as const,
    commissionRate: 10,
    contactEmail: 'partners@purerawz.co',
    carriedPeptideSlugs: [
      'bpc-157', 'tb-500', 'ipamorelin', 'cjc-1295', 'pt-141',
      'epithalon', 'thymosin-alpha-1', 'selank', 'ghk-cu', 'semaglutide',
    ],
    affiliateLinkSlugs: [
      'bpc-157', 'tb-500', 'ipamorelin', 'cjc-1295', 'pt-141',
      'epithalon', 'thymosin-alpha-1', 'selank', 'ghk-cu',
    ],
    destinations: {
      'bpc-157': 'https://www.purerawz.co/products/bpc-157-peptide',
      'tb-500': 'https://www.purerawz.co/products/tb-500-peptide',
      'ipamorelin': 'https://www.purerawz.co/products/ipamorelin-peptide',
      'cjc-1295': 'https://www.purerawz.co/products/cjc-1295-with-dac',
      'pt-141': 'https://www.purerawz.co/products/pt-141-peptide',
      'epithalon': 'https://www.purerawz.co/products/epithalon-peptide',
      'thymosin-alpha-1': 'https://www.purerawz.co/products/thymosin-alpha-1',
      'selank': 'https://www.purerawz.co/products/selank-peptide',
      'ghk-cu': 'https://www.purerawz.co/products/ghk-cu-peptide',
    } as Record<string, string>,
  },
  {
    name: 'Behemoth Labz',
    slug: 'behemoth-labz',
    description:
      'Premium research chemicals and peptides sourced from certified labs. Known for rigorous quality control, independent HPLC testing, and a wide catalog of peptide research compounds.',
    website: 'https://www.behemothlabz.com',
    status: 'active' as const,
    verificationTier: 'verified' as const,
    commissionRate: 8,
    contactEmail: 'partners@behemothlabz.com',
    carriedPeptideSlugs: [
      'bpc-157', 'tb-500', 'ipamorelin', 'cjc-1295', 'epithalon', 'ghk-cu',
    ],
    affiliateLinkSlugs: [
      'bpc-157', 'tb-500', 'ipamorelin', 'cjc-1295',
    ],
    destinations: {
      'bpc-157': 'https://www.behemothlabz.com/products/bpc-157',
      'tb-500': 'https://www.behemothlabz.com/products/tb-500',
      'ipamorelin': 'https://www.behemothlabz.com/products/ipamorelin',
      'cjc-1295': 'https://www.behemothlabz.com/products/cjc-1295',
    } as Record<string, string>,
  },
  {
    name: 'BC9',
    slug: 'bc9',
    description:
      'Specialist research chemical supplier focusing on high-purity, laboratory-verified compounds. Competitive pricing with comprehensive lot-specific COA documentation.',
    website: 'https://www.bc9.co',
    status: 'active' as const,
    verificationTier: 'verified' as const,
    commissionRate: 9,
    contactEmail: 'partners@bc9.co',
    carriedPeptideSlugs: [
      'bpc-157', 'tb-500', 'selank', 'ghk-cu',
    ],
    affiliateLinkSlugs: [
      'bpc-157', 'tb-500',
    ],
    destinations: {
      'bpc-157': 'https://www.bc9.co/products/bpc-157',
      'tb-500': 'https://www.bc9.co/products/tb-500',
    } as Record<string, string>,
  },
]
