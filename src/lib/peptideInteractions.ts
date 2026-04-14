export type InteractionType = 'synergistic' | 'neutral' | 'additive' | 'antagonistic' | 'caution'
export type EvidenceLevel = 'well-documented' | 'emerging' | 'theoretical'

export interface PeptideInteraction {
  slugA: string
  slugB: string
  type: InteractionType
  evidenceLevel: EvidenceLevel
  summary: string
}

export const INTERACTIONS: PeptideInteraction[] = [
  {
    slugA: 'bpc-157',
    slugB: 'tb-500',
    type: 'synergistic',
    evidenceLevel: 'well-documented',
    summary:
      'BPC-157 and TB-500 have complementary tissue-repair mechanisms — BPC-157 promotes angiogenesis and tendon healing while TB-500 enhances actin-driven cell migration. Together they exhibit amplified regenerative effects beyond either alone.',
  },
  {
    slugA: 'bpc-157',
    slugB: 'ghk-cu',
    type: 'synergistic',
    evidenceLevel: 'emerging',
    summary:
      'Both peptides independently upregulate collagen synthesis and wound healing pathways; the combination may produce additive-to-synergistic collagen remodeling and anti-inflammatory effects.',
  },
  {
    slugA: 'ipamorelin',
    slugB: 'cjc-1295',
    type: 'synergistic',
    evidenceLevel: 'well-documented',
    summary:
      'This is the canonical GHRH + GHRP stack: CJC-1295 stimulates pituitary GHRH receptors while ipamorelin activates GHS-R1a, producing amplified GH pulses that are greater than either peptide alone.',
  },
  {
    slugA: 'ghrp-2',
    slugB: 'cjc-1295',
    type: 'synergistic',
    evidenceLevel: 'well-documented',
    summary:
      'CJC-1295 and GHRP-2 act on separate pituitary receptor populations (GHRH-R and GHS-R1a respectively), resulting in synergistic GH pulse amplification when co-administered.',
  },
  {
    slugA: 'ghrp-6',
    slugB: 'cjc-1295',
    type: 'synergistic',
    evidenceLevel: 'well-documented',
    summary:
      'Like other GHRH + GHRP pairings, CJC-1295 and GHRP-6 act via complementary receptor pathways to produce significantly greater GH release than either secretagogue alone.',
  },
  {
    slugA: 'ipamorelin',
    slugB: 'ghrp-2',
    type: 'additive',
    evidenceLevel: 'emerging',
    summary:
      'Both ipamorelin and GHRP-2 are GHS-R1a agonists but differ in selectivity and side-effect profile; combining them appears to produce additive GH release with overlapping rather than synergistic receptor engagement.',
  },
  {
    slugA: 'semaglutide',
    slugB: 'tirzepatide',
    type: 'caution',
    evidenceLevel: 'well-documented',
    summary:
      'Both are GLP-1 receptor agonists (tirzepatide also hits GIP-R); stacking them is redundant and likely amplifies GI side effects including nausea, vomiting, and gastroparesis risk without meaningful additional benefit.',
  },
  {
    slugA: 'epithalon',
    slugB: 'ss-31',
    type: 'synergistic',
    evidenceLevel: 'theoretical',
    summary:
      'Epithalon targets telomere elongation and epigenetic aging markers while SS-31 is a mitochondria-targeted antioxidant; the combination theoretically addresses complementary longevity pathways at the nuclear and organelle level.',
  },
  {
    slugA: 'mots-c',
    slugB: 'ss-31',
    type: 'synergistic',
    evidenceLevel: 'emerging',
    summary:
      'MOTS-c drives mitochondrial biogenesis and metabolic reprogramming via AMPK, while SS-31 directly protects the inner mitochondrial membrane from oxidative stress — together they may offer complementary mitochondrial support.',
  },
  {
    slugA: 'pt-141',
    slugB: 'selank',
    type: 'neutral',
    evidenceLevel: 'theoretical',
    summary:
      'PT-141 acts on melanocortin receptors (MC3R/MC4R) to affect sexual arousal, whereas selank modulates GABAergic/serotonergic anxiety pathways. No known mechanistic overlap or interaction has been identified.',
  },
  {
    slugA: 'tb-500',
    slugB: 'ghk-cu',
    type: 'synergistic',
    evidenceLevel: 'emerging',
    summary:
      'TB-500 promotes systemic wound healing and angiogenesis via thymosin beta-4, while GHK-Cu acts locally to stimulate angiogenesis and extracellular matrix remodeling. The combination may enhance tissue repair and wound closure.',
  },
  {
    slugA: 'selank',
    slugB: 'semax',
    type: 'additive',
    evidenceLevel: 'emerging',
    summary:
      'Selank exerts anxiolytic and immunomodulatory effects primarily through GABA-A modulation and BDNF upregulation, while semax predominantly drives cognitive enhancement via BDNF and dopaminergic pathways. Overlapping BDNF activity suggests additive nootropic potential.',
  },
  {
    slugA: 'bpc-157',
    slugB: 'ipamorelin',
    type: 'additive',
    evidenceLevel: 'theoretical',
    summary:
      'BPC-157 promotes tissue healing through local growth factor upregulation while ipamorelin stimulates systemic GH release. The combination theoretically offers complementary anabolic and regenerative support through distinct mechanisms.',
  },
  {
    slugA: 'semaglutide',
    slugB: 'bpc-157',
    type: 'neutral',
    evidenceLevel: 'theoretical',
    summary:
      'Semaglutide targets GLP-1 receptors for glycemic control and weight loss, while BPC-157 acts on local growth factors for tissue repair. No known mechanistic interaction exists between these two compounds.',
  },
  {
    slugA: 'epithalon',
    slugB: 'mots-c',
    type: 'synergistic',
    evidenceLevel: 'theoretical',
    summary:
      'Epithalon modulates telomerase activity and longevity-related gene expression while MOTS-c regulates mitochondrial-to-nuclear retrograde signaling and metabolic homeostasis — together they may target complementary aging hallmarks.',
  },
  {
    slugA: 'ghk-cu',
    slugB: 'ss-31',
    type: 'synergistic',
    evidenceLevel: 'theoretical',
    summary:
      'GHK-Cu drives extracellular matrix renewal and skin anti-aging through copper-dependent pathways, while SS-31 reduces mitochondrial ROS. Their combination theoretically addresses both cellular energy deficits and structural tissue aging.',
  },
  {
    slugA: 'hexarelin',
    slugB: 'cjc-1295',
    type: 'synergistic',
    evidenceLevel: 'well-documented',
    summary:
      'Hexarelin is a potent GHS-R1a agonist; combined with CJC-1295 at the GHRH-R, the dual-receptor activation paradigm reliably amplifies GH pulse magnitude beyond either agent alone.',
  },
  {
    slugA: 'pt-141',
    slugB: 'oxytocin',
    type: 'caution',
    evidenceLevel: 'emerging',
    summary:
      'PT-141 (bremelanotide) acts on melanocortin receptors to promote sexual arousal, and oxytocin enhances social bonding and sexual behavior via hypothalamic pathways. Concurrent use may produce unpredictable potentiation of behavioral and cardiovascular effects.',
  },
]

/**
 * Look up the interaction between two peptides by slug.
 * Order-insensitive — checks both (slugA, slugB) and (slugB, slugA).
 */
export function getInteraction(slugA: string, slugB: string): PeptideInteraction | null {
  for (const interaction of INTERACTIONS) {
    if (
      (interaction.slugA === slugA && interaction.slugB === slugB) ||
      (interaction.slugA === slugB && interaction.slugB === slugA)
    ) {
      return interaction
    }
  }
  return null
}
