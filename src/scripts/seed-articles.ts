/**
 * Article seed script
 * Run: node --import tsx/esm src/scripts/seed-articles.ts
 *   or: npx tsx src/scripts/seed-articles.ts
 *
 * Seeds 3 starter research articles.
 * Safe to re-run — skips existing records by slug.
 */

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

// ── Lexical node helpers ────────────────────────────────────────────────────

const t = (text: string, format = 0) => ({
  type: 'text' as const,
  format,
  detail: 0,
  mode: 'normal' as const,
  style: '',
  text,
  version: 1,
})

const p = (...texts: ReturnType<typeof t>[]) => ({
  type: 'paragraph' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  children: texts,
  direction: 'ltr' as const,
})

const h3 = (text: string) => ({
  type: 'heading' as const,
  tag: 'h3' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  children: [t(text)],
  direction: 'ltr' as const,
})

const lex = (...nodes: object[]) => ({
  root: {
    type: 'root' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: nodes,
    direction: 'ltr' as const,
  },
})

// ── Article data ────────────────────────────────────────────────────────────

const articles = [
  {
    title: 'BPC-157: Complete Research Guide',
    slug: 'bpc-157-complete-guide',
    category: 'guide',
    status: 'published',
    publishedAt: '2025-01-15T00:00:00.000Z',
    readTimeMinutes: 8,
    excerpt:
      'A comprehensive overview of BPC-157 — its molecular structure, gastrointestinal origin, pleiotropic mechanisms, and the breadth of preclinical evidence supporting its regenerative properties.',
    tags: [{ tag: 'BPC-157' }, { tag: 'regeneration' }, { tag: 'GI peptides' }, { tag: 'angiogenesis' }],
    body: lex(
      p(t('BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide — a 15-amino-acid sequence (Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val) derived from a larger protein found in human gastric juice. Unlike many research peptides that act through a single receptor pathway, BPC-157 exerts its effects through a remarkable breadth of molecular targets, making it one of the most extensively studied peptides in preclinical gastroenterology and regenerative medicine.')),
      h3('Molecular Mechanisms'),
      p(t('The primary mechanism driving BPC-157\'s regenerative properties is its robust upregulation of the vascular endothelial growth factor (VEGF) signaling cascade. In animal models of tendon, ligament, and muscle injury, BPC-157 administration consistently accelerates angiogenesis — the formation of new blood vessels — at wound sites, which is a rate-limiting step in tissue repair. This effect is mediated in part through activation of the FAK-paxillin pathway, a key signaling axis in cytoskeletal reorganization and cell migration.')),
      p(t('Beyond vascular effects, BPC-157 has been shown to modulate nitric oxide (NO) synthase activity and interact with the dopaminergic and serotonergic systems. In rodent models of gut inflammation and ulceration, BPC-157 demonstrates cytoprotective properties that appear independent of prostaglandin pathways — a mechanistic distinction from conventional anti-inflammatory agents. This may explain its efficacy in NSAID-induced gut injury models, where prostaglandin-dependent protection is already compromised.')),
      h3('Gastrointestinal Research'),
      p(t('The bulk of peer-reviewed BPC-157 research has focused on gastrointestinal pathology. Multiple controlled animal studies have documented significant acceleration in healing of gastric ulcers, intestinal anastomoses, and inflammatory bowel disease models. A notable series of studies from Sikiric et al. demonstrated that BPC-157 counteracts ethanol-induced gastric lesions, cysteamine-induced duodenal ulcers, and acetic acid-induced colitis at doses ranging from 10 ng/kg to 10 μg/kg — an unusually wide therapeutic window suggesting a broad margin of safety in animal models.')),
      p(t('In models of short bowel syndrome, BPC-157 administration promoted intestinal adaptation, improving villus height and crypt depth — structural markers of absorptive capacity. These findings have generated interest in potential applications for post-surgical GI recovery, though no human clinical trials have been conducted as of the current date.')),
      h3('Musculoskeletal and Neural Applications'),
      p(t('Preclinical research has expanded well beyond the gut. Controlled rodent studies have documented accelerated healing of Achilles tendon transection, muscle crush injuries, and bone fractures following systemic or local BPC-157 administration. Mechanistically, this appears to involve upregulation of growth hormone receptor expression in tendon fibroblasts — an important finding given the difficulty of tendon repair due to poor vascularity. In spinal cord and peripheral nerve injury models, BPC-157 has demonstrated neuroprotective effects, reducing lesion size and improving functional recovery scores.')),
      p(t('It is critical to note that all of these findings come from animal studies — predominantly in rats and mice. The pharmacokinetics, efficacy, and safety profile in humans remain unknown, as BPC-157 has not advanced to controlled human clinical trials. Any extrapolation from preclinical data to human use represents a significant inferential leap. Researchers interested in this compound should treat it strictly as an investigational tool and consult primary literature for up-to-date study protocols.')),
    ),
    relatedPeptides: [],
    seoTitle: 'BPC-157 Complete Research Guide | Peptide United',
    seoDescription: 'A comprehensive research overview of BPC-157 covering molecular mechanisms, gastrointestinal research, musculoskeletal applications, and the limits of current preclinical evidence.',
  },
  {
    title: 'Peptide Half-Lives: What Researchers Need to Know',
    slug: 'peptide-half-lives-explained',
    category: 'mechanism',
    status: 'published',
    publishedAt: '2025-02-03T00:00:00.000Z',
    readTimeMinutes: 5,
    excerpt:
      'Understanding biological half-life is essential for interpreting peptide research data. This guide covers the pharmacokinetic principles behind peptide degradation and how they affect experimental design.',
    tags: [{ tag: 'pharmacokinetics' }, { tag: 'half-life' }, { tag: 'peptide stability' }, { tag: 'research design' }],
    body: lex(
      p(t('Biological half-life — the time required for the plasma concentration of a compound to fall to half its initial value — is one of the most consequential pharmacokinetic parameters in peptide research. Unlike small-molecule drugs, which often exhibit half-lives measured in hours or days, most unmodified peptides are rapidly degraded by endogenous proteases, frequently resulting in half-lives measured in minutes. This biological reality has profound implications for experimental design, dosing intervals, and the interpretation of in vivo study results.')),
      h3('Why Peptides Degrade Quickly'),
      p(t('The primary drivers of rapid peptide degradation are ubiquitous serine proteases (notably dipeptidyl peptidase IV, or DPP-IV), metalloproteinases, and aminopeptidases present throughout the bloodstream, gut lumen, and interstitial tissues. These enzymes are optimized to cleave peptide bonds — which is, after all, their core physiological function in protein catabolism. Unmodified peptides with exposed N- or C-termini are particularly vulnerable. Additionally, the kidneys filter and excrete small peptides efficiently, further shortening circulating half-life.')),
      p(t('For example, native GLP-1 (glucagon-like peptide 1) has a plasma half-life of roughly 1-2 minutes due to rapid DPP-IV cleavage. This pharmacokinetic liability was the core problem that drug developers had to solve to create semaglutide — achieved through fatty acid conjugation that enables albumin binding and dramatically extends circulation time. Understanding this principle helps researchers appreciate why route of administration, modification chemistry, and dosing frequency are inseparable from the pharmacological effect being studied.')),
      h3('Key Variables Affecting Half-Life'),
      p(t('Several factors modulate the effective half-life of a research peptide. Molecular weight plays a role: larger peptides may be filtered more slowly by the kidneys, though they may also face increased immunogenicity. Secondary and tertiary structure matters — cyclic peptides and those with disulfide-constrained conformations are often more protease-resistant than linear sequences. Route of administration is critical: subcutaneous injection typically yields slower absorption and longer effective exposure than intravenous injection, even if the terminal elimination half-life is similar.')),
      p(t('Modifications used in synthetic analogs — such as PEGylation (attachment of polyethylene glycol chains), d-amino acid substitution, N-methylation, and C-terminal amidation — are specifically designed to extend half-life by blocking protease recognition sites or increasing molecular size beyond renal filtration thresholds. Researchers should carefully distinguish between data generated with native peptide sequences versus chemically modified analogs, as these may have fundamentally different pharmacokinetic and pharmacodynamic profiles despite sharing a core sequence.')),
      h3('Implications for Study Design'),
      p(t('When evaluating preclinical peptide studies, researchers should critically assess whether dosing frequency was appropriate for the compound\'s known half-life. A once-daily injection of a peptide with a 10-minute half-life creates a very different exposure profile than the same dose given as a continuous infusion — and may produce qualitatively different outcomes depending on whether the mechanism requires sustained receptor occupancy or is amenable to pulsatile stimulation. Growth hormone secretagogues (GHRPs and GHRHs) are a canonical example: their downstream effect on GH pulsatility depends on the timing of receptor activation relative to the endogenous GH pulse cycle.')),
    ),
    relatedPeptides: [],
    seoTitle: 'Peptide Half-Lives Explained | Peptide United Research',
    seoDescription: 'A pharmacokinetics guide covering why peptides degrade rapidly, the key variables affecting half-life, and what this means for experimental study design.',
  },
  {
    title: 'Growth Hormone Peptides: Ipamorelin vs CJC-1295 vs Sermorelin',
    slug: 'growth-hormone-peptides-comparison',
    category: 'comparison',
    status: 'published',
    publishedAt: '2025-03-12T00:00:00.000Z',
    readTimeMinutes: 7,
    excerpt:
      'A mechanistic comparison of three widely studied growth hormone secretagogues — Ipamorelin, CJC-1295, and Sermorelin — covering receptor targets, pharmacokinetics, and how their differences affect research outcomes.',
    tags: [{ tag: 'growth hormone' }, { tag: 'Ipamorelin' }, { tag: 'CJC-1295' }, { tag: 'Sermorelin' }, { tag: 'GHRP' }, { tag: 'GHRH' }],
    body: lex(
      p(t('Growth hormone secretagogues occupy a central position in peptide research due to the GH/IGF-1 axis\'s broad influence on body composition, metabolism, cellular repair, and immune function. Three peptides — Sermorelin, Ipamorelin, and CJC-1295 — are among the most studied in this class, yet they operate through distinct mechanisms with meaningfully different pharmacokinetic profiles. Understanding these distinctions is essential for interpreting research data and designing experiments with appropriate controls.')),
      h3('Mechanism of Action: Two Receptor Pathways'),
      p(t('The fundamental mechanistic distinction separates GHRHs from GHRPs. Sermorelin and CJC-1295 are both analogs of endogenous growth hormone-releasing hormone (GHRH), acting as agonists at the GHRH receptor (GHRHR) on pituitary somatotrophs to stimulate GH synthesis and secretion. This is an amplification of a physiological signaling pathway — essentially providing more of a naturally occurring stimulus.')),
      p(t('Ipamorelin, by contrast, is a synthetic pentapeptide ghrelin mimetic — a GHRP (growth hormone releasing peptide) that acts at the growth hormone secretagogue receptor 1a (GHS-R1a). This receptor is distinct from GHRHR, and its activation triggers GH release through a different intracellular cascade (Gq/phospholipase C pathway versus GHRHR\'s Gs/adenylyl cyclase pathway). Importantly, ipamorelin is notable for its high selectivity: unlike older GHRPs such as GHRP-2 and GHRP-6, it does not significantly elevate cortisol, prolactin, or ACTH at research doses, making it a cleaner pharmacological tool for GH-specific studies.')),
      h3('Pharmacokinetics: The Critical Variable'),
      p(t('This is where the three peptides diverge most significantly from a research design perspective. Sermorelin has a short plasma half-life of approximately 10-20 minutes, closely mimicking the pulsatile nature of endogenous GHRH release. This means dosing frequency has a direct and profound impact on experimental outcomes — single daily injections produce brief GH pulses, while continuous infusion more closely approximates physiological GHRH exposure. Research using sermorelin must carefully account for this when comparing results across studies.')),
      p(t('CJC-1295 exists in two primary forms, and conflating them is a common source of confusion in the literature. CJC-1295 without DAC (Drug Affinity Complex) — sometimes called Modified GRF(1-29) — has a half-life of approximately 30 minutes, meaningfully longer than native GHRH or Sermorelin but still relatively short. CJC-1295 with DAC incorporates a reactive maleimide group that covalently binds to albumin following injection, dramatically extending the half-life to approximately 6-8 days. This creates a sustained, non-pulsatile GH elevation profile that is pharmacologically distinct from the pulsatile release produced by short-acting GHRH analogs. The two forms of CJC-1295 should be treated as different experimental tools.')),
      h3('Research Considerations'),
      p(t('When studying the GHRH and ghrelin pathways independently, single-agent protocols using sermorelin or ipamorelin allow for mechanistic isolation. Combination protocols — pairing a GHRHR agonist with a GHS-R1a agonist — produce synergistic GH release because the two pathways act on convergent downstream effectors while also having independent stimulatory effects. This synergy is well-documented in animal studies and is mechanistically coherent, but researchers should note that combination data cannot be used to infer the contribution of either agent alone.')),
      p(t('All three of these peptides remain in the investigational category for most applications. Sermorelin has received FDA approval for the specific indication of growth hormone deficiency diagnosis and treatment in children, which provides a regulatory anchor for its pharmacological profile. Ipamorelin and CJC-1295 do not have approved human indications. Researchers and clinicians should consult current regulatory guidance and treat any extrapolation from animal models to human physiology with appropriate scientific caution.')),
    ),
    relatedPeptides: [],
    seoTitle: 'Growth Hormone Peptides Comparison: Ipamorelin vs CJC-1295 vs Sermorelin | Peptide United',
    seoDescription: 'A mechanistic comparison of Ipamorelin, CJC-1295, and Sermorelin — covering receptor targets, pharmacokinetics, and research design implications for growth hormone secretagogues.',
  },
]

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')

  const payload = await getPayload({ config })

  console.log('\n── Seeding articles ────────────────────────────────────')

  for (const article of articles) {
    const existing = await payload.find({
      collection: 'articles',
      where: { slug: { equals: article.slug } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      console.log(`  skip: ${article.slug}`)
      continue
    }

    await payload.create({
      collection: 'articles',
      data: article as any,
      overrideAccess: true,
    })
    console.log(`  created: ${article.slug}`)
  }

  console.log('\nDone.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
