/**
 * Slugs featured in the free research guide.
 *
 * These 10 peptides have their full profile content — mechanism of action,
 * pharmacokinetics, research findings, and safety — available to all users
 * regardless of membership tier. The intent is to demonstrate the depth of
 * the database and encourage upgrades for access to all 100+ profiles.
 */
export const GUIDE_SLUGS = [
  'bpc-157',
  'tb-500',
  'semaglutide',
  'ipamorelin',
  'cjc-1295',
  'epithalon',
  'pt-141',
  'ghk-cu',
  'ss-31',
  'mots-c',
] as const

export type GuideSlug = (typeof GUIDE_SLUGS)[number]

export function isGuideSlug(slug: string): boolean {
  return (GUIDE_SLUGS as readonly string[]).includes(slug)
}
