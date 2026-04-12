import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = false

export const metadata: Metadata = {
  title: 'Peptide Research Glossary',
  description:
    'Definitions of key terms used across peptide research — half-life, bioavailability, pharmacokinetics, GHRPs, lyophilized, and more.',
}

type Term = {
  term: string
  letter: string
  slug: string
  definition: string
  searchQuery?: string
}

const TERMS: Term[] = [
  // A
  {
    term: 'Analog',
    letter: 'A',
    slug: 'analog',
    definition:
      'A compound that is structurally similar to a naturally occurring peptide or molecule but differs in one or more chemical modifications. Analogs are engineered to improve potency, selectivity, half-life, or bioavailability compared to the parent compound. Many research peptides — such as BPC-157 or semaglutide — are analogs of endogenous sequences.',
    searchQuery: 'analog',
  },
  {
    term: 'Angiogenesis',
    letter: 'A',
    slug: 'angiogenesis',
    definition:
      'The physiological process by which new blood vessels form from pre-existing vasculature. Several peptides promote angiogenesis as part of their wound-healing and tissue-repair mechanisms. BPC-157, for example, upregulates VEGF (vascular endothelial growth factor) signaling to stimulate capillary formation at injury sites.',
    searchQuery: 'angiogenesis',
  },
  // B
  {
    term: 'Bioavailability',
    letter: 'B',
    slug: 'bioavailability',
    definition:
      'The fraction of an administered dose that reaches systemic circulation in an active form. Oral bioavailability of most peptides is very low because digestive enzymes cleave peptide bonds before absorption. This is why most research peptides are administered via subcutaneous injection or other parenteral routes, which offer near-complete bioavailability.',
    searchQuery: 'bioavailability',
  },
  {
    term: 'Blood-Brain Barrier (BBB)',
    letter: 'B',
    slug: 'blood-brain-barrier',
    definition:
      'A highly selective semipermeable border formed by endothelial cells lining the cerebral capillaries. The BBB restricts the passage of large or hydrophilic molecules — including most peptides — from the bloodstream into the central nervous system. Some neuropeptides cross via active transport, lipid solubility, or nasal administration, which bypasses the barrier via the olfactory pathway.',
    searchQuery: 'blood brain barrier',
  },
  // C
  {
    term: 'Certificate of Analysis (COA)',
    letter: 'C',
    slug: 'certificate-of-analysis',
    definition:
      'A document issued by a laboratory that certifies the identity, purity, and potency of a compound. A COA typically reports results from HPLC, mass spectrometry, and microbiological testing. When sourcing research peptides, a third-party COA is the primary indicator of quality — verifying that the compound is what it claims to be at the stated concentration.',
    searchQuery: 'COA',
  },
  {
    term: 'Collagen Synthesis',
    letter: 'C',
    slug: 'collagen-synthesis',
    definition:
      'The biological process by which cells — primarily fibroblasts — produce collagen, the most abundant structural protein in connective tissue, skin, tendons, and bone. Several peptides, including BPC-157 and GHK-Cu, upregulate collagen synthesis pathways, supporting wound repair, tendon healing, and skin elasticity.',
    searchQuery: 'collagen',
  },
  {
    term: 'Cyclized Peptide',
    letter: 'C',
    slug: 'cyclized-peptide',
    definition:
      'A peptide in which the N-terminus and C-terminus — or two side chains — are covalently bonded to form a ring structure. Cyclization confers resistance to proteolytic degradation and can lock the peptide into a bioactive conformation, often improving potency and half-life relative to its linear counterpart. PT-141 (bremelanotide) and some GHRP variants are cyclized.',
    searchQuery: 'cyclic peptide',
  },
  // D
  {
    term: 'Disulfide Bond',
    letter: 'D',
    slug: 'disulfide-bond',
    definition:
      'A covalent bond formed between the sulfur atoms of two cysteine residues. Disulfide bonds stabilize the three-dimensional structure of peptides and proteins. They are critical to the folding and activity of many endogenous peptides including insulin, oxytocin, and vasopressin. Disrupting disulfide bonds typically destroys biological activity.',
    searchQuery: 'disulfide',
  },
  // E
  {
    term: 'Elimination Half-Life',
    letter: 'E',
    slug: 'elimination-half-life',
    definition:
      'The time required for the plasma concentration of a compound to decrease by 50% through metabolic clearance and excretion. Elimination half-life determines dosing frequency — compounds with short half-lives require more frequent administration. Not to be confused with the terminal phase half-life; for most peptides, elimination is rapid (minutes to a few hours) due to proteolytic degradation.',
    searchQuery: 'half-life',
  },
  {
    term: 'Endogenous',
    letter: 'E',
    slug: 'endogenous',
    definition:
      'Naturally produced within the body. An endogenous peptide is one the body synthesizes itself — for example, ghrelin, growth hormone, or oxytocin. Research peptides are often analogs or fragments of endogenous sequences, designed to mimic or enhance natural signaling. Contrast with exogenous (externally administered).',
    searchQuery: 'endogenous',
  },
  // F
  {
    term: 'Fragment Peptide',
    letter: 'F',
    slug: 'fragment-peptide',
    definition:
      'A shorter amino acid sequence derived from a larger parent peptide or protein. Fragments are studied because they may retain or isolate a specific biological activity of the parent molecule while reducing side effects. HGH Fragment 176-191, for instance, is derived from the C-terminal region of human growth hormone and is studied for its lipolytic activity.',
    searchQuery: 'fragment',
  },
  // G
  {
    term: 'Growth Hormone (GH)',
    letter: 'G',
    slug: 'growth-hormone',
    definition:
      'A 191-amino acid peptide hormone secreted by the anterior pituitary gland. GH stimulates cell growth, reproduction, and regeneration. It acts both directly (binding GH receptors) and indirectly (stimulating IGF-1 production in the liver). Many research peptides — GHRPs, GHRHs, and secretagogues — are studied for their ability to stimulate endogenous GH release.',
    searchQuery: 'growth hormone',
  },
  {
    term: 'Growth Hormone Releasing Hormone (GHRH)',
    letter: 'G',
    slug: 'ghrh',
    definition:
      'A 44-amino acid hypothalamic peptide that stimulates the pituitary to synthesize and release growth hormone. GHRH analogs such as CJC-1295 and tesamorelin are research peptides designed to extend the half-life of native GHRH and produce sustained GH release. GHRH acts through the GHRH receptor (GHRHR) on somatotroph cells.',
    searchQuery: 'GHRH',
  },
  {
    term: 'Growth Hormone Releasing Peptide (GHRP)',
    letter: 'G',
    slug: 'ghrp',
    definition:
      'A class of synthetic peptides that stimulate GH secretion by binding ghrelin receptors (GHS-R1a) in the pituitary and hypothalamus. GHRPs act synergistically with GHRH — combining both produces a significantly amplified GH pulse. Common research GHRPs include GHRP-2, GHRP-6, hexarelin, and ipamorelin, each differing in GH release potency and side-effect profile.',
    searchQuery: 'GHRP',
  },
  {
    term: 'GLP-1 (Glucagon-Like Peptide-1)',
    letter: 'G',
    slug: 'glp-1',
    definition:
      'An incretin hormone secreted by L-cells of the small intestine in response to food intake. GLP-1 stimulates insulin secretion, suppresses glucagon, slows gastric emptying, and reduces appetite via central hypothalamic pathways. GLP-1 receptor agonists (semaglutide, liraglutide, tirzepatide) are among the most clinically significant peptide drugs in current use for type 2 diabetes and obesity.',
    searchQuery: 'GLP-1',
  },
  // H
  {
    term: 'Half-Life',
    letter: 'H',
    slug: 'half-life',
    definition:
      'The time it takes for the concentration of a substance in the body to reduce by half. For peptides, half-life is typically short due to rapid enzymatic degradation by peptidases. Modifications such as PEGylation, cyclization, albumin binding, or fusion to longer carrier proteins are used to extend peptide half-life and reduce dosing frequency in research and clinical settings.',
    searchQuery: 'half-life',
  },
  {
    term: 'HPLC (High-Performance Liquid Chromatography)',
    letter: 'H',
    slug: 'hplc',
    definition:
      'An analytical technique used to separate, identify, and quantify components in a mixture. In peptide research, HPLC is the standard method for verifying compound purity. A reversed-phase HPLC assay separates peptides by hydrophobicity; the resulting chromatogram shows peaks for each component, and the area under the target peak indicates purity (e.g., ≥98% pure). COAs should always include HPLC data.',
    searchQuery: 'HPLC',
  },
  // I
  {
    term: 'IGF-1 (Insulin-Like Growth Factor 1)',
    letter: 'I',
    slug: 'igf-1',
    definition:
      'A peptide hormone structurally similar to insulin, primarily produced in the liver in response to GH signaling. IGF-1 mediates many of growth hormone\'s anabolic effects: promoting protein synthesis, cell proliferation, and inhibiting apoptosis. Research peptides that stimulate GH secretion — GHRPs, GHRHs — raise IGF-1 as a downstream effect.',
    searchQuery: 'IGF-1',
  },
  {
    term: 'In Vitro',
    letter: 'I',
    slug: 'in-vitro',
    definition:
      'Latin for "in glass." Refers to experiments conducted outside of a living organism, typically using isolated cells, tissues, or biochemical systems in a controlled laboratory environment (e.g., cell culture dishes, test tubes). In vitro studies are the first step in evaluating a compound\'s activity but cannot fully predict how it will behave in a living system.',
    searchQuery: 'in vitro',
  },
  {
    term: 'In Vivo',
    letter: 'I',
    slug: 'in-vivo',
    definition:
      'Latin for "within the living." Refers to experiments conducted in a living organism — most commonly rodent models (rats or mice) in preclinical research. In vivo studies account for the full complexity of absorption, distribution, metabolism, excretion, and immune response. Results from in vivo animal models are more predictive than in vitro data but still require human trials to establish clinical relevance.',
    searchQuery: 'in vivo',
  },
  {
    term: 'Intramuscular (IM)',
    letter: 'I',
    slug: 'intramuscular',
    definition:
      'A route of administration in which a compound is injected directly into muscle tissue. IM injections offer reliable absorption with moderately rapid onset and are used when subcutaneous administration is not preferred. The deltoid, vastus lateralis, and gluteus medius are common injection sites. Some peptides with larger volumes or depot formulations are administered IM.',
    searchQuery: 'intramuscular',
  },
  {
    term: 'Intranasal',
    letter: 'I',
    slug: 'intranasal',
    definition:
      'Administration of a compound via the nasal cavity. Intranasal delivery can achieve rapid absorption through the nasal mucosa and, for some neuropeptides, direct transport to the CNS via the olfactory and trigeminal nerve pathways — partially bypassing the blood-brain barrier. Peptides studied via this route include PT-141, oxytocin, and BPC-157. Bioavailability varies widely by compound.',
    searchQuery: 'intranasal',
  },
  // L
  {
    term: 'Lipolysis',
    letter: 'L',
    slug: 'lipolysis',
    definition:
      'The metabolic breakdown of stored triglycerides in adipose tissue into free fatty acids and glycerol, which are then released into the bloodstream for use as fuel. Several peptides influence lipolysis: GH and its secretagogues promote fat mobilization, while fragment peptides like HGH Frag 176-191 are specifically studied for localized lipolytic activity.',
    searchQuery: 'lipolysis',
  },
  {
    term: 'Lyophilized',
    letter: 'L',
    slug: 'lyophilized',
    definition:
      'Freeze-dried. Lyophilization is a preservation process in which a compound is first frozen, then placed under vacuum to remove water by sublimation. The resulting powder is highly stable at room temperature, has an extended shelf life, and is reconstituted with bacteriostatic water or saline before use. Most research peptides are supplied in lyophilized form to maintain potency during storage and shipping.',
    searchQuery: 'lyophilized',
  },
  // M
  {
    term: 'Mechanism of Action (MOA)',
    letter: 'M',
    slug: 'mechanism-of-action',
    definition:
      'The specific biochemical interaction through which a compound produces its pharmacological effect. Understanding a peptide\'s MOA means knowing which receptor it binds, which signaling cascade it activates or inhibits, and what downstream cellular responses result. The MOA section of each Peptide United profile describes the primary receptor targets and signaling pathways involved.',
    searchQuery: 'mechanism of action',
  },
  {
    term: 'Molecular Weight',
    letter: 'M',
    slug: 'molecular-weight',
    definition:
      'The mass of a molecule expressed in Daltons (Da) or kiloDaltons (kDa). For peptides, molecular weight is determined by the number and type of amino acids in the chain. Molecular weight influences pharmacokinetic properties such as renal clearance (smaller peptides are filtered more easily), membrane permeability, and immunogenicity. Typical research peptides range from ~500 Da (dipeptides) to ~5,000 Da.',
    searchQuery: 'molecular weight',
  },
  {
    term: 'mTOR (Mechanistic Target of Rapamycin)',
    letter: 'M',
    slug: 'mtor',
    definition:
      'A serine/threonine protein kinase that serves as a central regulator of cell growth, protein synthesis, autophagy, and metabolism. mTOR integrates signals from amino acids, growth factors (including IGF-1), and energy status. Peptides that raise IGF-1 or GH indirectly activate mTOR complex 1 (mTORC1), stimulating protein synthesis and anabolic signaling in muscle tissue.',
    searchQuery: 'mTOR',
  },
  // N
  {
    term: 'Neuropeptide',
    letter: 'N',
    slug: 'neuropeptide',
    definition:
      'A peptide produced and released by neurons to communicate with other neurons or peripheral cells. Neuropeptides modulate synaptic transmission, pain, mood, appetite, stress response, and circadian rhythms. Unlike classical neurotransmitters, they are often synthesized in the cell body and released from dense-core vesicles. Examples include oxytocin, substance P, NPY, and VIP.',
    searchQuery: 'neuropeptide',
  },
  {
    term: 'Nootropic',
    letter: 'N',
    slug: 'nootropic',
    definition:
      'A compound that may enhance cognitive function — including memory, focus, creativity, or processing speed — with low toxicity and few side effects. In peptide research, compounds like Semax, Selank, and Dihexa are studied for nootropic effects via BDNF upregulation, AMPA receptor modulation, or HGF/MET pathway activation. The term was coined by Romanian chemist Corneliu Giurgea in 1972.',
    searchQuery: 'nootropic cognitive',
  },
  // O
  {
    term: 'Off-Label',
    letter: 'O',
    slug: 'off-label',
    definition:
      'Use of a drug or compound for a purpose, population, or dosage regimen not approved by a regulatory body (e.g., FDA). Off-label use is legal for licensed physicians but involves the compound being used outside its approved indication. Many peptides discussed in research contexts — including those with Phase II or III data — are used off-label pending or absent formal approval.',
    searchQuery: 'off-label',
  },
  // P
  {
    term: 'Peptide Bond',
    letter: 'P',
    slug: 'peptide-bond',
    definition:
      'The covalent chemical bond formed between the carboxyl group (–COOH) of one amino acid and the amino group (–NH₂) of the next, with the release of a water molecule (condensation). Peptide bonds form the backbone of all peptide and protein chains. The partial double-bond character of the peptide bond creates planarity that constrains the chain\'s conformation.',
    searchQuery: 'peptide bond',
  },
  {
    term: 'Pharmacodynamics',
    letter: 'P',
    slug: 'pharmacodynamics',
    definition:
      'The study of how a drug or compound affects the body — specifically its mechanism of action, receptor binding affinity, dose-response relationships, and therapeutic and adverse effects. If pharmacokinetics describes what the body does to the drug, pharmacodynamics describes what the drug does to the body. Both are profiled for each compound in the Peptide United.',
    searchQuery: 'pharmacodynamics',
  },
  {
    term: 'Pharmacokinetics',
    letter: 'P',
    slug: 'pharmacokinetics',
    definition:
      'The study of how the body processes a compound over time — encompassing Absorption, Distribution, Metabolism, and Excretion (ADME). Pharmacokinetic parameters include bioavailability, volume of distribution, half-life, time to peak concentration (Tmax), and clearance rate. For peptides, the key pharmacokinetic challenge is rapid proteolytic degradation and low oral bioavailability.',
    searchQuery: 'pharmacokinetics',
  },
  {
    term: 'Phase I Trial',
    letter: 'P',
    slug: 'phase-i-trial',
    definition:
      'The first stage of human clinical testing for a new compound, primarily designed to assess safety, tolerability, and pharmacokinetics in a small group of healthy volunteers (typically 20–100 participants). Phase I trials determine the maximum tolerated dose and identify adverse effects. They are not designed to evaluate efficacy. A compound\'s Phase I completion indicates basic human safety has been assessed.',
    searchQuery: 'Phase I clinical trial',
  },
  {
    term: 'Phase II Trial',
    letter: 'P',
    slug: 'phase-ii-trial',
    definition:
      'The second stage of clinical testing, evaluating a compound\'s efficacy and further assessing its safety in a larger patient population with the target condition (typically 100–300 participants). Phase II trials determine whether the compound shows preliminary evidence of effectiveness and help establish the optimal dosing regimen before the larger and more expensive Phase III trials.',
    searchQuery: 'Phase II clinical trial',
  },
  {
    term: 'Phase III Trial',
    letter: 'P',
    slug: 'phase-iii-trial',
    definition:
      'The pivotal stage of clinical testing, involving large randomized controlled trials (typically 1,000–3,000+ participants) comparing the compound to a placebo or existing standard of care. Phase III data form the basis for regulatory approval submissions. A compound that successfully completes Phase III trials has demonstrated clinically meaningful efficacy and an acceptable safety profile at population scale.',
    searchQuery: 'Phase III clinical trial',
  },
  {
    term: 'Preclinical',
    letter: 'P',
    slug: 'preclinical',
    definition:
      'Research conducted prior to human clinical trials, typically including in vitro (cell culture) and in vivo (animal model) studies. Preclinical research establishes proof of concept, identifies potential mechanisms of action, and assesses initial safety and toxicity profiles. Most research peptides on the Peptide United have preclinical data only — human evidence is noted where it exists.',
    searchQuery: 'preclinical research',
  },
  {
    term: 'Subcutaneous (SubQ)',
    letter: 'S',
    slug: 'subcutaneous',
    definition:
      'A route of administration in which a compound is injected into the subcutaneous tissue — the layer of fat just beneath the skin. SubQ is the most common administration route for research peptides, offering reliable absorption and ease of self-injection compared to intramuscular or intravenous routes. Typical injection sites include the abdomen, thigh, or upper arm.',
    searchQuery: 'subcutaneous injection',
  },
  {
    term: 'Receptor Agonist',
    letter: 'R',
    slug: 'receptor-agonist',
    definition:
      'A molecule that binds to a receptor and activates it, producing a biological response. Full agonists produce the maximum possible response; partial agonists produce a submaximal response even at full receptor occupancy. Most peptides that mimic endogenous hormones or neurotransmitters act as receptor agonists — for example, GHRP peptides are ghrelin receptor (GHS-R1a) agonists.',
    searchQuery: 'agonist',
  },
  {
    term: 'Receptor Antagonist',
    letter: 'R',
    slug: 'receptor-antagonist',
    definition:
      'A molecule that binds to a receptor and blocks it, preventing the endogenous ligand or agonist from activating it. Antagonists themselves produce no response but inhibit receptor signaling. In peptide research, antagonists are used experimentally to block specific pathways and confirm a mechanism of action, and clinically where inhibition of a signaling axis is the therapeutic goal.',
    searchQuery: 'antagonist',
  },
]

// Group terms by letter
function groupByLetter(terms: Term[]): Map<string, Term[]> {
  const map = new Map<string, Term[]>()
  for (const t of terms) {
    const existing = map.get(t.letter) ?? []
    existing.push(t)
    map.set(t.letter, existing)
  }
  return map
}

// JSON-LD schema
function buildJsonLd(terms: Term[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Peptide Research Glossary',
    description: 'Definitions of key terms used in peptide research.',
    numberOfItems: terms.length,
    itemListElement: terms.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'DefinedTerm',
        name: t.term,
        description: t.definition,
        url: `https://peptideunited.com/glossary#${t.slug}`,
      },
    })),
  }
}

export default function GlossaryPage() {
  const sorted = [...TERMS].sort((a, b) =>
    a.letter === b.letter ? a.term.localeCompare(b.term) : a.letter.localeCompare(b.letter),
  )
  const grouped = groupByLetter(sorted)
  const letters = Array.from(grouped.keys()).sort()

  const jsonLd = buildJsonLd(sorted)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-3 text-black/40">Reference</p>
          <h1 className="text-[36px] font-medium leading-[1.1] tracking-display text-black sm:text-[48px]">
            Peptide Research Glossary
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.5] text-black/50">
            Definitions of key terms used across peptide research profiles — mechanisms,
            pharmacokinetics, clinical stages, and administration routes.
          </p>
        </div>
      </section>

      {/* Alphabetical jump nav */}
      <div className="sticky top-14 z-30 border-b bg-white/90 backdrop-blur-sm" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-wrap gap-1 py-3">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#${letter.toLowerCase()}`}
                className="flex h-8 w-8 items-center justify-center rounded-sharp text-[13px] font-medium tracking-tight text-black/40 transition-colors hover:bg-black hover:text-white"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Term sections */}
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="space-y-16">
          {letters.map((letter) => {
            const terms = grouped.get(letter)!
            return (
              <section key={letter} id={letter.toLowerCase()}>
                {/* Letter header */}
                <div
                  className="mb-6 border-b pb-2"
                  style={{ borderColor: 'var(--border-light)' }}
                >
                  <span className="text-[28px] font-medium tracking-display text-black/20">
                    {letter}
                  </span>
                </div>

                {/* Terms in this letter group */}
                <div className="space-y-10">
                  {terms.map((t) => (
                    <div key={t.slug} id={t.slug} className="scroll-mt-28">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h2 className="text-[18px] font-medium tracking-subheading text-black">
                          {t.term}
                        </h2>
                        {t.searchQuery && (
                          <Link
                            href={`/peptides?q=${encodeURIComponent(t.searchQuery)}`}
                            className="mono-label text-black/30 transition-colors hover:text-midnight"
                          >
                            See peptides →
                          </Link>
                        )}
                      </div>
                      <p className="mt-2 max-w-3xl text-[15px] leading-[1.65] text-black/60">
                        {t.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <section className="border-t py-16" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="mono-label mb-3 text-black/30">Now that you know the terminology</p>
          <h2 className="mx-auto max-w-sm text-[24px] font-medium tracking-heading text-black">
            Explore the research profiles.
          </h2>
          <Link href="/peptides" className="btn-dark mt-6">
            Browse All Peptides
          </Link>
        </div>
      </section>
    </>
  )
}
