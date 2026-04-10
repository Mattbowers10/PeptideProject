/**
 * Seed data for partner companies.
 * Affiliate link coverage targets the top 20 highest-traffic peptide profiles:
 * BPC-157, Semaglutide, Ipamorelin, CJC-1295, PT-141, TB-500, Epithalon,
 * Sermorelin, Thymosin Alpha-1, Selank, Tirzepatide, Tesamorelin, AOD-9604,
 * Hexarelin, DSIP, GHK-Cu, Semax, Fragment 176-191, GLP-1, Fragment 176-191
 *
 * NOTE: Verify all destination URLs against live product pages before running
 * the seed script in production. URLs follow each partner's standard slug pattern.
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
      'sermorelin', 'tirzepatide', 'tesamorelin', 'aod-9604', 'hexarelin',
      'dsip', 'semax', 'fragment-176-191',
    ],
    affiliateLinkSlugs: [
      // Top 20 priority profiles
      'bpc-157', 'tb-500', 'ipamorelin', 'cjc-1295', 'pt-141',
      'epithalon', 'thymosin-alpha-1', 'selank', 'ghk-cu', 'semaglutide',
      'sermorelin', 'tirzepatide', 'tesamorelin', 'aod-9604', 'hexarelin',
      'dsip', 'semax', 'fragment-176-191',
    ],
    destinations: {
      'bpc-157':          'https://www.purerawz.co/products/bpc-157-peptide',
      'tb-500':           'https://www.purerawz.co/products/tb-500-peptide',
      'ipamorelin':       'https://www.purerawz.co/products/ipamorelin-peptide',
      'cjc-1295':         'https://www.purerawz.co/products/cjc-1295-with-dac',
      'pt-141':           'https://www.purerawz.co/products/pt-141-peptide',
      'epithalon':        'https://www.purerawz.co/products/epithalon-peptide',
      'thymosin-alpha-1': 'https://www.purerawz.co/products/thymosin-alpha-1',
      'selank':           'https://www.purerawz.co/products/selank-peptide',
      'ghk-cu':           'https://www.purerawz.co/products/ghk-cu-peptide',
      'semaglutide':      'https://www.purerawz.co/products/semaglutide-peptide',
      'sermorelin':       'https://www.purerawz.co/products/sermorelin-peptide',
      'tirzepatide':      'https://www.purerawz.co/products/tirzepatide-peptide',
      'tesamorelin':      'https://www.purerawz.co/products/tesamorelin-peptide',
      'aod-9604':         'https://www.purerawz.co/products/aod-9604-peptide',
      'hexarelin':        'https://www.purerawz.co/products/hexarelin-peptide',
      'dsip':             'https://www.purerawz.co/products/dsip-peptide',
      'semax':            'https://www.purerawz.co/products/semax-peptide',
      'fragment-176-191': 'https://www.purerawz.co/products/fragment-176-191-peptide',
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
      'pt-141', 'thymosin-alpha-1', 'sermorelin', 'hexarelin', 'tesamorelin',
    ],
    affiliateLinkSlugs: [
      'bpc-157', 'tb-500', 'ipamorelin', 'cjc-1295', 'pt-141',
      'thymosin-alpha-1', 'sermorelin', 'hexarelin', 'tesamorelin', 'epithalon',
    ],
    destinations: {
      'bpc-157':          'https://www.behemothlabz.com/products/bpc-157',
      'tb-500':           'https://www.behemothlabz.com/products/tb-500',
      'ipamorelin':       'https://www.behemothlabz.com/products/ipamorelin',
      'cjc-1295':         'https://www.behemothlabz.com/products/cjc-1295',
      'pt-141':           'https://www.behemothlabz.com/products/pt-141',
      'thymosin-alpha-1': 'https://www.behemothlabz.com/products/thymosin-alpha-1',
      'sermorelin':       'https://www.behemothlabz.com/products/sermorelin',
      'hexarelin':        'https://www.behemothlabz.com/products/hexarelin',
      'tesamorelin':      'https://www.behemothlabz.com/products/tesamorelin',
      'epithalon':        'https://www.behemothlabz.com/products/epithalon',
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
      'bpc-157', 'tb-500', 'selank', 'ghk-cu', 'ipamorelin',
      'cjc-1295', 'epithalon', 'semax', 'aod-9604',
    ],
    affiliateLinkSlugs: [
      'bpc-157', 'tb-500', 'selank', 'ipamorelin', 'cjc-1295',
      'epithalon', 'semax', 'aod-9604',
    ],
    destinations: {
      'bpc-157':   'https://www.bc9.co/products/bpc-157',
      'tb-500':    'https://www.bc9.co/products/tb-500',
      'selank':    'https://www.bc9.co/products/selank',
      'ipamorelin':'https://www.bc9.co/products/ipamorelin',
      'cjc-1295':  'https://www.bc9.co/products/cjc-1295',
      'epithalon': 'https://www.bc9.co/products/epithalon',
      'semax':     'https://www.bc9.co/products/semax',
      'aod-9604':  'https://www.bc9.co/products/aod-9604',
    } as Record<string, string>,
  },
]
