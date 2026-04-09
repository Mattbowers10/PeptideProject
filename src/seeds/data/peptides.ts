// Top 100 most researched peptides
// categories: array of category slugs (resolved to IDs by the seed runner)

export const peptidesData = [
  // ── HEALING & RECOVERY ────────────────────────────────────────────────────

  {
    name: 'BPC-157',
    slug: 'bpc-157',
    aliases: [{ alias: 'Body Protection Compound 157' }, { alias: 'PL 14736' }],
    casNumber: '137525-51-0',
    molecularFormula: 'C₆₂H₉₈N₁₆O₂₂',
    molecularWeight: '1419.55 Da',
    categories: ['healing-recovery', 'pain-inflammation', 'cognitive-enhancement'],
    researchStatus: 'preclinical',
    summary:
      'BPC-157 is a 15-amino-acid peptide fragment derived from human gastric juice. It is one of the most extensively researched peptides for tissue repair, demonstrating accelerated healing of tendons, ligaments, muscle, bone, and gut lining in animal models. It appears to upregulate growth hormone receptors and promote angiogenesis at injury sites.',
    halfLife: '~4 hours (subcutaneous); oral stability under investigation',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Most studied route in animal models' },
      { route: 'intramuscular', notes: 'Used for local tissue effects' },
      { route: 'oral', notes: 'Systemic GI effects; bioavailability lower' },
    ],
    pubmedSearchTerms: [
      { term: 'BPC-157' },
      { term: 'body protection compound 157' },
      { term: 'PL 14736' },
    ],
  },

  {
    name: 'TB-500',
    slug: 'tb-500',
    aliases: [{ alias: 'Thymosin Beta-4 Fragment' }, { alias: 'Tβ4 fragment' }],
    casNumber: '77591-33-4',
    molecularFormula: 'C₂₁₂H₃₅₀N₅₆O₇₈S',
    molecularWeight: '4963.44 Da',
    categories: ['healing-recovery', 'muscle-performance', 'cardiovascular'],
    researchStatus: 'preclinical',
    summary:
      'TB-500 is a synthetic version of the active region of Thymosin Beta-4, a naturally occurring peptide found in virtually all human cells. Research shows it promotes actin polymerization and cell migration, which accelerates wound healing, muscle repair, and vascular growth. It is particularly studied for its ability to reduce inflammation and promote cardiac tissue repair.',
    halfLife: '~6–8 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard research route' },
      { route: 'intramuscular', notes: 'Equivalent absorption' },
    ],
    pubmedSearchTerms: [
      { term: 'thymosin beta-4' },
      { term: 'TB-500 peptide' },
      { term: 'Tβ4 wound healing' },
    ],
  },

  {
    name: 'GHK-Cu',
    slug: 'ghk-cu',
    aliases: [
      { alias: 'Copper Peptide GHK' },
      { alias: 'Glycyl-L-histidyl-L-lysine copper' },
    ],
    casNumber: '89030-95-5',
    molecularFormula: 'C₁₄H₂₄CuN₆O₄',
    molecularWeight: '340.84 Da (free ligand)',
    categories: ['healing-recovery', 'skin-cosmetic', 'anti-aging-longevity'],
    researchStatus: 'preclinical',
    summary:
      'GHK-Cu is a naturally occurring copper-binding tripeptide found in human plasma, saliva, and urine. Research demonstrates it stimulates collagen, elastin, and glycosaminoglycan synthesis, promotes wound healing, reduces inflammation, and activates protective antioxidant genes. Plasma levels decline with age, making it a significant anti-aging research target.',
    halfLife: 'Rapid — minutes in plasma; topical activity persists longer',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Systemic effects research' },
      { route: 'topical', notes: 'Widely used in cosmetic formulations' },
    ],
    pubmedSearchTerms: [
      { term: 'GHK-Cu copper peptide' },
      { term: 'glycyl-histidyl-lysine wound healing' },
      { term: 'GHK collagen synthesis' },
    ],
  },

  {
    name: 'KPV',
    slug: 'kpv',
    aliases: [{ alias: 'Lys-Pro-Val' }, { alias: 'α-MSH C-terminal tripeptide' }],
    categories: ['healing-recovery', 'immune-support', 'pain-inflammation'],
    researchStatus: 'preclinical',
    summary:
      'KPV is a tripeptide derived from the C-terminal sequence of alpha-melanocyte-stimulating hormone (α-MSH). It exhibits potent anti-inflammatory effects by inhibiting NF-κB signaling and proinflammatory cytokine production. Research is particularly focused on its potential for inflammatory bowel disease, colitis, and skin inflammation, with studies showing efficacy even when administered orally or topically.',
    halfLife: 'Short; oral and topical delivery under investigation',
    administrationRoutes: [
      { route: 'oral', notes: 'Gut-specific anti-inflammatory applications' },
      { route: 'topical', notes: 'Skin inflammation research' },
      { route: 'subcutaneous', notes: 'Systemic inflammation research' },
    ],
    pubmedSearchTerms: [
      { term: 'KPV peptide anti-inflammatory' },
      { term: 'Lys-Pro-Val melanocortin' },
      { term: 'alpha-MSH C-terminal inflammation' },
    ],
  },

  // ── GROWTH HORMONE AXIS ───────────────────────────────────────────────────

  {
    name: 'Sermorelin',
    slug: 'sermorelin',
    aliases: [
      { alias: 'GHRH(1-29)' },
      { alias: 'GRF 1-29 NH2' },
      { alias: 'Geref' },
    ],
    casNumber: '86168-78-7',
    molecularFormula: 'C₁₄₉H₂₄₆N₄₄O₄₂S',
    molecularWeight: '3357.88 Da',
    categories: ['growth-hormone-axis', 'anti-aging-longevity'],
    researchStatus: 'approved',
    summary:
      'Sermorelin is a synthetic analog of the first 29 amino acids of endogenous growth hormone-releasing hormone (GHRH). It stimulates the pituitary to produce and secrete growth hormone in a pulsatile, physiologic manner. FDA-approved for GH deficiency in children, it is extensively researched in adults for body composition, sleep quality, and age-related GH decline.',
    halfLife: '10–20 minutes',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard administration; typically at bedtime' },
      { route: 'intravenous', notes: 'Diagnostic testing context' },
    ],
    pubmedSearchTerms: [
      { term: 'sermorelin GHRH' },
      { term: 'growth hormone releasing hormone 1-29' },
      { term: 'sermorelin adult GH deficiency' },
    ],
  },

  {
    name: 'CJC-1295',
    slug: 'cjc-1295',
    aliases: [
      { alias: 'CJC-1295 with DAC' },
      { alias: 'DAC:GRF' },
    ],
    casNumber: '863288-34-0',
    molecularFormula: 'C₁₅₂H₂₅₂N₄₂O₄₂S',
    molecularWeight: '3647.28 Da',
    categories: ['growth-hormone-axis'],
    researchStatus: 'preclinical',
    summary:
      'CJC-1295 is a modified GHRH analog with a Drug Affinity Complex (DAC) that binds to serum albumin, dramatically extending its half-life compared to native GHRH. It produces sustained elevation of GH and IGF-1 levels over days rather than hours. Research focuses on body composition improvements, muscle growth, and fat loss through prolonged GH axis stimulation.',
    halfLife: '6–8 days (due to DAC albumin binding)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Weekly or twice-weekly dosing studied' },
    ],
    pubmedSearchTerms: [
      { term: 'CJC-1295 GHRH analog' },
      { term: 'DAC GRF growth hormone' },
      { term: 'CJC-1295 IGF-1' },
    ],
  },

  {
    name: 'Mod GRF 1-29',
    slug: 'mod-grf-1-29',
    aliases: [
      { alias: 'CJC-1295 without DAC' },
      { alias: 'Modified GRF 1-29' },
      { alias: 'Tetrasubstituted GRF' },
    ],
    categories: ['growth-hormone-axis'],
    researchStatus: 'preclinical',
    summary:
      'Mod GRF 1-29 is a modified version of GHRH(1-29) with four amino acid substitutions that increase stability and half-life without the DAC albumin-binding component. It produces a natural, pulsatile GH release and is commonly paired with GHRPs (like Ipamorelin) for a synergistic GH pulse. Its shorter duration preserves natural pituitary feedback mechanisms.',
    halfLife: '~30 minutes',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Typically administered 2–3x daily with a GHRP' },
    ],
    pubmedSearchTerms: [
      { term: 'modified GRF 1-29' },
      { term: 'CJC-1295 without DAC growth hormone' },
    ],
  },

  {
    name: 'Ipamorelin',
    slug: 'ipamorelin',
    aliases: [{ alias: 'NNC 26-0161' }],
    casNumber: '170851-70-4',
    molecularFormula: 'C₃₈H₄₉N₉O₅',
    molecularWeight: '711.86 Da',
    categories: ['growth-hormone-axis'],
    researchStatus: 'preclinical',
    summary:
      'Ipamorelin is a selective growth hormone secretagogue and ghrelin receptor agonist. Unlike other GHRPs, it stimulates GH release with high selectivity — producing minimal cortisol, ACTH, or prolactin elevation. It is among the most studied GHRPs for its clean GH pulse profile, making it a preferred research peptide for GH axis studies with reduced side effect concern.',
    halfLife: '~2 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard; often paired with CJC-1295 or Mod GRF 1-29' },
    ],
    pubmedSearchTerms: [
      { term: 'ipamorelin growth hormone secretagogue' },
      { term: 'NNC 26-0161 ghrelin receptor' },
    ],
  },

  {
    name: 'GHRP-2',
    slug: 'ghrp-2',
    aliases: [
      { alias: 'Pralmorelin' },
      { alias: 'Growth Hormone-Releasing Peptide 2' },
      { alias: 'KP-102' },
    ],
    casNumber: '158861-67-7',
    molecularFormula: 'C₄₅H₅₅N₉O₆',
    molecularWeight: '817.99 Da',
    categories: ['growth-hormone-axis', 'sleep-circadian'],
    researchStatus: 'phase2',
    summary:
      'GHRP-2 is a synthetic hexapeptide and potent ghrelin receptor agonist that stimulates growth hormone release from the pituitary. It produces a strong GH pulse with some elevation of cortisol and prolactin at higher doses. Research includes GH deficiency diagnosis, body composition, sleep quality, and appetite stimulation via its ghrelin-mimetic mechanism.',
    halfLife: '~1–2 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Most common research route' },
      { route: 'intranasal', notes: 'Studied for GH deficiency diagnosis' },
    ],
    pubmedSearchTerms: [
      { term: 'GHRP-2 pralmorelin' },
      { term: 'growth hormone releasing peptide 2' },
      { term: 'GHRP-2 GH secretion' },
    ],
  },

  {
    name: 'GHRP-6',
    slug: 'ghrp-6',
    aliases: [
      { alias: 'Growth Hormone-Releasing Peptide 6' },
      { alias: 'His-DTrp-Ala-Trp-DPhe-Lys-NH₂' },
    ],
    casNumber: '87616-84-0',
    molecularFormula: 'C₄₆H₅₆N₁₂O₆',
    molecularWeight: '873.02 Da',
    categories: ['growth-hormone-axis', 'healing-recovery'],
    researchStatus: 'preclinical',
    summary:
      'GHRP-6 is one of the original synthetic GHRPs, acting as a strong ghrelin receptor agonist. It produces robust GH release accompanied by significant appetite stimulation — a property that makes it both valuable for cachexia research and distinct from cleaner GHRPs like Ipamorelin. Research also shows cytoprotective and cardioprotective properties independent of GH secretion.',
    halfLife: '~15–60 minutes',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard research route' },
      { route: 'intramuscular', notes: 'Equivalent profile' },
    ],
    pubmedSearchTerms: [
      { term: 'GHRP-6 ghrelin receptor' },
      { term: 'growth hormone releasing peptide 6' },
      { term: 'GHRP-6 cardioprotection' },
    ],
  },

  {
    name: 'Hexarelin',
    slug: 'hexarelin',
    aliases: [
      { alias: 'Examorelin' },
      { alias: 'EP 23905' },
      { alias: 'His-D-2-MeTrp-Ala-Trp-D-Phe-Lys-NH₂' },
    ],
    casNumber: '140703-51-1',
    categories: ['growth-hormone-axis', 'cardiovascular'],
    researchStatus: 'phase2',
    summary:
      'Hexarelin is one of the most potent synthetic GHRP compounds, producing the largest GH pulse among GHRPs. Beyond its GH-stimulating properties, research highlights direct cardioprotective effects through CD36 receptor binding, independent of GH or IGF-1. Studies show benefits in heart failure models, myocardial infarction recovery, and protection against ventricular dysfunction.',
    halfLife: '~2 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'GH stimulation research' },
      { route: 'intravenous', notes: 'Cardiac research contexts' },
    ],
    pubmedSearchTerms: [
      { term: 'hexarelin examorelin' },
      { term: 'hexarelin cardioprotection CD36' },
      { term: 'hexarelin growth hormone pituitary' },
    ],
  },

  {
    name: 'Tesamorelin',
    slug: 'tesamorelin',
    aliases: [{ alias: 'Egrifta' }, { alias: 'TH9507' }],
    casNumber: '218949-48-5',
    categories: ['growth-hormone-axis', 'fat-loss-metabolic'],
    researchStatus: 'approved',
    summary:
      'Tesamorelin is a stabilized synthetic GHRH analog FDA-approved for reduction of excess abdominal fat in HIV-infected adults with lipodystrophy. It stimulates pulsatile GH secretion while preserving natural feedback regulation. Research demonstrates significant visceral adipose tissue reduction, improved lipid profiles, and cognitive benefits, making it a key study compound for metabolic dysfunction.',
    halfLife: '~26 minutes',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Daily abdominal injection; FDA-approved protocol' },
    ],
    pubmedSearchTerms: [
      { term: 'tesamorelin Egrifta GHRH' },
      { term: 'tesamorelin visceral fat HIV' },
      { term: 'TH9507 growth hormone' },
    ],
  },

  {
    name: 'IGF-1 LR3',
    slug: 'igf-1-lr3',
    aliases: [
      { alias: 'Long R3 IGF-1' },
      { alias: 'Insulin-like Growth Factor 1 Long R3' },
    ],
    casNumber: '946870-92-4',
    categories: ['growth-hormone-axis', 'muscle-performance'],
    researchStatus: 'preclinical',
    summary:
      'IGF-1 LR3 is a modified version of Insulin-like Growth Factor-1 with an arginine substitution and 13-amino-acid N-terminal extension, which reduces binding to IGF-binding proteins and extends its half-life. It promotes muscle cell hyperplasia and hypertrophy by activating the PI3K/AKT/mTOR pathway. Research explores its role in muscle wasting, recovery from injury, and anabolic signaling.',
    halfLife: '~20–30 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Most studied systemic route' },
      { route: 'intramuscular', notes: 'Local muscle hypertrophy research' },
    ],
    pubmedSearchTerms: [
      { term: 'IGF-1 LR3 muscle growth' },
      { term: 'long R3 IGF-1 anabolic' },
      { term: 'insulin-like growth factor 1 receptor' },
    ],
  },

  {
    name: 'Mechano Growth Factor',
    slug: 'mgf',
    aliases: [{ alias: 'MGF' }, { alias: 'IGF-1Ec' }],
    categories: ['growth-hormone-axis', 'muscle-performance', 'healing-recovery'],
    researchStatus: 'preclinical',
    summary:
      'Mechano Growth Factor (MGF) is a splice variant of the IGF-1 gene expressed in response to mechanical loading and muscle damage. Unlike systemic IGF-1, MGF activates satellite cells (muscle stem cells) to proliferate before differentiating — a critical step in muscle repair and growth. Research indicates it plays a distinct, non-overlapping role with systemic IGF-1 in tissue regeneration.',
    halfLife: 'Minutes (unmodified); PEGylated form extends to hours/days',
    administrationRoutes: [
      { route: 'intramuscular', notes: 'Local muscle repair research' },
      { route: 'subcutaneous', notes: 'Systemic research contexts' },
    ],
    pubmedSearchTerms: [
      { term: 'mechano growth factor MGF satellite cells' },
      { term: 'IGF-1Ec splice variant muscle repair' },
    ],
  },

  {
    name: 'PEG-MGF',
    slug: 'peg-mgf',
    aliases: [{ alias: 'PEGylated Mechano Growth Factor' }],
    categories: ['growth-hormone-axis', 'muscle-performance'],
    researchStatus: 'preclinical',
    summary:
      'PEG-MGF is a PEGylated (polyethylene glycol-modified) form of Mechano Growth Factor, designed to dramatically extend its biological half-life from minutes to days while preserving activity. PEGylation allows systemic delivery and sustained satellite cell activation without the need for local injection. Research shows enhanced muscle hypertrophy signaling compared to unmodified MGF.',
    halfLife: '~48–96 hours (PEGylated)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Systemic satellite cell activation' },
    ],
    pubmedSearchTerms: [
      { term: 'PEGylated MGF muscle hypertrophy' },
      { term: 'PEG-MGF satellite cells' },
    ],
  },

  // ── IMMUNE ────────────────────────────────────────────────────────────────

  {
    name: 'Thymosin Alpha-1',
    slug: 'thymosin-alpha-1',
    aliases: [
      { alias: 'Thymalfasin' },
      { alias: 'Tα1' },
      { alias: 'Zadaxin' },
    ],
    casNumber: '62304-98-7',
    molecularFormula: 'C₁₂₉H₂₁₅N₃₃O₅₅',
    molecularWeight: '3108.29 Da',
    categories: ['immune-support', 'anti-aging-longevity'],
    researchStatus: 'approved',
    summary:
      'Thymosin Alpha-1 is a naturally occurring 28-amino-acid peptide derived from thymosin fraction 5 of the thymus gland. Approved in over 35 countries for hepatitis B, hepatitis C, and as an immune adjuvant in cancer therapy, it enhances T-cell maturation, dendritic cell function, and NK cell activity. Research continues to expand into sepsis, COVID-19, autoimmune conditions, and vaccine response enhancement.',
    halfLife: '~2 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard clinical and research route' },
    ],
    pubmedSearchTerms: [
      { term: 'thymosin alpha-1 thymalfasin immune' },
      { term: 'Zadaxin T cell immunity' },
      { term: 'thymosin alpha 1 hepatitis cancer' },
    ],
  },

  {
    name: 'Thymosin Beta-4',
    slug: 'thymosin-beta-4',
    aliases: [
      { alias: 'Tβ4' },
      { alias: 'LKKTETQ' },
    ],
    casNumber: '77591-33-4',
    categories: ['immune-support', 'healing-recovery', 'cardiovascular'],
    researchStatus: 'phase2',
    summary:
      'Thymosin Beta-4 is the full-length 43-amino-acid peptide and one of the most abundant intracellular proteins in mammalian cells. It sequesters G-actin, regulating actin polymerization and cell motility, which underpins its role in wound healing, cardiac repair, and immune cell migration. Clinical trials have examined it for dry eye disease, epidermolysis bullosa, and cardiac repair after myocardial infarction.',
    halfLife: '~30–60 minutes (systemic)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard systemic route' },
      { route: 'topical', notes: 'Ophthalmic and wound care applications' },
      { route: 'intravenous', notes: 'Cardiac trial contexts' },
    ],
    pubmedSearchTerms: [
      { term: 'thymosin beta-4 wound healing' },
      { term: 'Tβ4 actin cardiac repair' },
      { term: 'thymosin beta 4 clinical trial' },
    ],
  },

  {
    name: 'LL-37',
    slug: 'll-37',
    aliases: [
      { alias: 'Cathelicidin' },
      { alias: 'hCAP18/LL-37' },
    ],
    categories: ['antimicrobial', 'immune-support', 'healing-recovery'],
    researchStatus: 'phase1',
    summary:
      'LL-37 is the only known human cathelicidin antimicrobial peptide, derived from the C-terminus of hCAP18 protein. It exhibits broad-spectrum antimicrobial activity against bacteria, fungi, and viruses by disrupting microbial membranes. Beyond direct killing, LL-37 modulates inflammation, promotes wound healing, and may have anticancer properties. Research focuses on chronic wound care, infection, and skin disorders like rosacea.',
    halfLife: 'Short (minutes in serum); local tissue concentrations persist',
    administrationRoutes: [
      { route: 'topical', notes: 'Wound care and skin infection research' },
      { route: 'subcutaneous', notes: 'Systemic immune studies' },
    ],
    pubmedSearchTerms: [
      { term: 'LL-37 cathelicidin antimicrobial' },
      { term: 'LL-37 wound healing skin' },
      { term: 'cathelicidin innate immunity' },
    ],
  },

  {
    name: 'Thymalin',
    slug: 'thymalin',
    aliases: [{ alias: 'Thymus Humoral Factor-Gamma 2' }, { alias: 'THF-γ2' }],
    categories: ['immune-support', 'anti-aging-longevity'],
    researchStatus: 'approved',
    summary:
      'Thymalin is a peptide complex isolated from bovine thymus gland, approved in Russia for use as an immunomodulator. Research demonstrates it restores age-related decline in T-cell function, enhances bone marrow activity, and supports immune homeostasis. Long-term studies in elderly populations show reductions in all-cause mortality and improved immune resilience, positioning it as a key anti-aging immunotherapy research compound.',
    halfLife: 'Variable (mixture of peptides)',
    administrationRoutes: [
      { route: 'intramuscular', notes: 'Standard clinical protocol in approved markets' },
      { route: 'subcutaneous', notes: 'Research contexts' },
    ],
    pubmedSearchTerms: [
      { term: 'thymalin thymus peptide immune aging' },
      { term: 'thymic peptides immunosenescence' },
    ],
  },

  {
    name: 'Thymopentin',
    slug: 'thymopentin',
    aliases: [{ alias: 'TP-5' }, { alias: 'Timunox' }],
    casNumber: '69558-55-0',
    categories: ['immune-support'],
    researchStatus: 'approved',
    summary:
      'Thymopentin (TP-5) is a synthetic pentapeptide corresponding to positions 32–36 of thymopoietin. It is approved in several countries for HIV infection, rheumatoid arthritis, and immune deficiencies. Research shows it selectively promotes T-cell maturation and differentiation, enhancing both cellular and humoral immune responses without causing immunosuppression.',
    halfLife: '~30 minutes',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard clinical route' },
      { route: 'intravenous', notes: 'Acute immune research' },
    ],
    pubmedSearchTerms: [
      { term: 'thymopentin TP-5 T cell' },
      { term: 'thymopoietin pentapeptide immunity' },
    ],
  },

  // ── COGNITIVE ─────────────────────────────────────────────────────────────

  {
    name: 'Selank',
    slug: 'selank',
    aliases: [{ alias: 'Selanc' }, { alias: 'TP-7' }],
    casNumber: '129954-34-3',
    molecularFormula: 'C₃₃H₅₇N₁₁O₉',
    molecularWeight: '751.87 Da',
    categories: ['cognitive-enhancement', 'immune-support'],
    researchStatus: 'approved',
    summary:
      'Selank is a synthetic heptapeptide analog of tuftsin developed by the Russian Institute of Molecular Genetics. Approved in Russia for anxiety and cognitive disorders, it exhibits anxiolytic effects comparable to benzodiazepines without sedation or dependence. Research shows it modulates GABA, serotonin, and dopamine systems, enhances BDNF expression, and improves memory consolidation and learning.',
    halfLife: '~5–10 minutes in serum; nasal effects last 1–3 hours',
    administrationRoutes: [
      { route: 'intranasal', notes: 'Primary approved route; rapid CNS delivery' },
      { route: 'subcutaneous', notes: 'Research contexts' },
    ],
    pubmedSearchTerms: [
      { term: 'selank anxiolytic peptide' },
      { term: 'selank GABA tuftsin memory' },
    ],
  },

  {
    name: 'Semax',
    slug: 'semax',
    aliases: [{ alias: 'MEHFPGP' }, { alias: 'Pro8-Gly9-Pro10-ACTH(4–10)' }],
    casNumber: '80714-61-0',
    categories: ['cognitive-enhancement', 'neuroprotection'],
    researchStatus: 'approved',
    summary:
      'Semax is a synthetic heptapeptide analog of ACTH(4-7) developed in Russia, where it is approved for stroke, TBI, peptic ulcers, and cognitive enhancement. It upregulates BDNF and its receptor TrkB, promotes dopamine and serotonin turnover, and has demonstrated neuroprotective effects in ischemia models. Research highlights improvements in attention, memory, and recovery from neurological injury.',
    halfLife: '~20 minutes (active metabolite activity is prolonged)',
    administrationRoutes: [
      { route: 'intranasal', notes: 'Primary approved route; efficient CNS delivery' },
      { route: 'subcutaneous', notes: 'Research contexts' },
    ],
    pubmedSearchTerms: [
      { term: 'semax ACTH neuroprotection' },
      { term: 'semax BDNF cognitive' },
      { term: 'semax stroke ischemia' },
    ],
  },

  {
    name: 'Dihexa',
    slug: 'dihexa',
    aliases: [
      { alias: 'N-hexanoic-Tyr-Ile-(6) aminohexanoic amide' },
      { alias: 'PNB-0408' },
    ],
    categories: ['cognitive-enhancement', 'neuroprotection'],
    researchStatus: 'preclinical',
    summary:
      'Dihexa is a small peptide derived from angiotensin IV that acts as a potent agonist at the HGF/c-Met receptor system, which mediates synaptogenesis — the formation of new synaptic connections. Animal studies suggest it may be several orders of magnitude more potent than BDNF at promoting synapse formation. Research focuses on Alzheimer\'s disease, cognitive decline, and traumatic brain injury.',
    halfLife: 'Hours; oral bioavailability appears high in animal models',
    administrationRoutes: [
      { route: 'oral', notes: 'Appears orally active in rodent models' },
      { route: 'subcutaneous', notes: 'Research standard' },
      { route: 'intranasal', notes: 'CNS delivery research' },
    ],
    pubmedSearchTerms: [
      { term: 'dihexa angiotensin cognitive enhancement' },
      { term: 'dihexa HGF cMet synaptogenesis' },
      { term: 'PNB-0408 memory' },
    ],
  },

  {
    name: 'NAP',
    slug: 'nap-davunetide',
    aliases: [
      { alias: 'Davunetide' },
      { alias: 'NAPVSIPQ' },
      { alias: 'AL-108' },
    ],
    casNumber: '491833-29-5',
    categories: ['neuroprotection', 'cognitive-enhancement'],
    researchStatus: 'phase2',
    summary:
      'NAP (NAPVSIPQ) is an 8-amino-acid neuroprotective peptide derived from activity-dependent neuroprotective protein (ADNP). It stabilizes microtubules by interacting with tubulin, protecting neurons against tau pathology, amyloid toxicity, and oxidative damage. Phase 2 trials in schizophrenia and progressive supranuclear palsy have been completed; research is ongoing for Alzheimer\'s disease and autism spectrum disorder.',
    halfLife: 'Short; intranasal delivery achieves meaningful CNS concentrations',
    administrationRoutes: [
      { route: 'intranasal', notes: 'Primary clinical route; superior CNS penetration' },
      { route: 'intravenous', notes: 'Research contexts' },
    ],
    pubmedSearchTerms: [
      { term: 'NAP davunetide ADNP neuroprotection' },
      { term: 'NAP NAPVSIPQ tau microtubule' },
      { term: 'davunetide Alzheimer schizophrenia' },
    ],
  },

  {
    name: 'Pinealon',
    slug: 'pinealon',
    aliases: [{ alias: 'EDR peptide' }, { alias: 'Glu-Asp-Arg' }],
    categories: ['cognitive-enhancement', 'anti-aging-longevity', 'neuroprotection'],
    researchStatus: 'preclinical',
    summary:
      'Pinealon is a synthetic tripeptide (Glu-Asp-Arg) developed by the St. Petersburg Institute of Bioregulation and Gerontology. It is characterized as a pineal gland cytoprotective peptide that penetrates the blood-brain barrier and acts as a transcription factor, regulating gene expression in neuronal cells. Research suggests neuroprotective, antioxidant, and cognition-preserving effects, particularly in aging and hypoxic conditions.',
    halfLife: 'Short; CNS penetration studied',
    administrationRoutes: [
      { route: 'oral', notes: 'Studied for CNS bioavailability' },
      { route: 'subcutaneous', notes: 'Standard research route' },
    ],
    pubmedSearchTerms: [
      { term: 'pinealon EDR peptide neuroprotection' },
      { term: 'Glu-Asp-Arg brain aging' },
    ],
  },

  {
    name: 'P21',
    slug: 'p21',
    aliases: [{ alias: 'P21 cognitive peptide' }],
    categories: ['cognitive-enhancement', 'neuroprotection'],
    researchStatus: 'preclinical',
    summary:
      'P21 is a peptide fragment derived from CNTF (Ciliary Neurotrophic Factor) designed to activate the STAT3 signaling pathway, which promotes neurogenesis and cognitive function. Animal research demonstrates improved spatial memory, increased hippocampal neurogenesis, and enhanced BDNF expression. It is studied as a non-cytokine CNTF functional mimetic without the systemic side effects of full-length CNTF.',
    halfLife: 'Unknown; under investigation',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Primary research route' },
    ],
    pubmedSearchTerms: [
      { term: 'P21 CNTF peptide neurogenesis' },
      { term: 'P21 cognitive BDNF hippocampus' },
    ],
  },

  // ── FAT LOSS & METABOLIC ──────────────────────────────────────────────────

  {
    name: 'AOD-9604',
    slug: 'aod-9604',
    aliases: [
      { alias: 'Anti-Obesity Drug 9604' },
      { alias: 'hGH Fragment 177-191' },
    ],
    casNumber: '221231-10-3',
    categories: ['fat-loss-metabolic'],
    researchStatus: 'phase3',
    summary:
      'AOD-9604 is a modified fragment of human growth hormone (hGH 177-191) that retains the lipolytic properties of GH without its anabolic or diabetogenic effects. It stimulates lipolysis through β3-adrenergic receptor pathways and inhibits lipogenesis. Phase 3 trials for obesity were conducted; it has since been investigated for osteoarthritis through cartilage repair properties.',
    halfLife: '~30 minutes',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Lipolysis research' },
      { route: 'oral', notes: 'Studied for obesity with some bioavailability' },
    ],
    pubmedSearchTerms: [
      { term: 'AOD-9604 lipolysis obesity' },
      { term: 'hGH fragment 177-191 fat loss' },
      { term: 'AOD 9604 osteoarthritis' },
    ],
  },

  {
    name: 'Fragment 176-191',
    slug: 'fragment-176-191',
    aliases: [
      { alias: 'HGH Frag 176-191' },
      { alias: 'Growth Hormone Fragment 176-191' },
    ],
    casNumber: '66004-57-7',
    categories: ['fat-loss-metabolic'],
    researchStatus: 'preclinical',
    summary:
      'Fragment 176-191 is the C-terminal amino acid sequence 176–191 of human growth hormone, closely related to AOD-9604. It mimics the lipolytic activity of natural GH without binding to the GH receptor, thus avoiding insulin resistance and proliferative effects. Research shows it reduces fat mass in animal models by enhancing fat metabolism and inhibiting new fat formation.',
    halfLife: '~30 minutes',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Primary research route' },
    ],
    pubmedSearchTerms: [
      { term: 'hGH fragment 176-191 lipolysis' },
      { term: 'growth hormone fragment fat metabolism' },
    ],
  },

  {
    name: 'Semaglutide',
    slug: 'semaglutide',
    aliases: [
      { alias: 'Ozempic' },
      { alias: 'Wegovy' },
      { alias: 'Rybelsus' },
    ],
    casNumber: '910463-68-2',
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic', 'cardiovascular'],
    researchStatus: 'approved',
    summary:
      'Semaglutide is a long-acting GLP-1 receptor agonist approved for type 2 diabetes (Ozempic, Rybelsus) and obesity (Wegovy). By mimicking the incretin hormone GLP-1, it enhances glucose-dependent insulin secretion, suppresses glucagon, slows gastric emptying, and reduces appetite via central hypothalamic pathways. Landmark trials demonstrate up to 15–17% body weight reduction and significant cardiovascular mortality benefit.',
    halfLife: '~1 week (allows once-weekly dosing)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Once-weekly injection (Ozempic/Wegovy)' },
      { route: 'oral', notes: 'Daily tablet (Rybelsus) — highest dose GLP-1 agonist in oral form' },
    ],
    pubmedSearchTerms: [
      { term: 'semaglutide GLP-1 obesity weight loss' },
      { term: 'semaglutide cardiovascular outcomes SUSTAIN' },
      { term: 'semaglutide type 2 diabetes' },
    ],
  },

  {
    name: 'Tirzepatide',
    slug: 'tirzepatide',
    aliases: [{ alias: 'Mounjaro' }, { alias: 'Zepbound' }],
    casNumber: '2023788-19-2',
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic'],
    researchStatus: 'approved',
    summary:
      'Tirzepatide is the first dual GIP/GLP-1 receptor agonist, approved for type 2 diabetes (Mounjaro) and obesity (Zepbound). By co-activating both incretin receptors, it achieves superior glycemic control and weight reduction compared to GLP-1 monotherapy — SURMOUNT trials showed up to 22.5% body weight reduction. It represents a new class of metabolic peptide therapeutics with broad cardiovascular and metabolic benefits.',
    halfLife: '~5 days (once-weekly dosing)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Once-weekly injection' },
    ],
    pubmedSearchTerms: [
      { term: 'tirzepatide GIP GLP-1 dual agonist' },
      { term: 'tirzepatide SURMOUNT obesity' },
      { term: 'tirzepatide type 2 diabetes weight' },
    ],
  },

  {
    name: 'Liraglutide',
    slug: 'liraglutide',
    aliases: [{ alias: 'Victoza' }, { alias: 'Saxenda' }],
    casNumber: '204656-20-2',
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic', 'cardiovascular'],
    researchStatus: 'approved',
    summary:
      'Liraglutide is a once-daily GLP-1 receptor agonist approved for type 2 diabetes (Victoza) and obesity (Saxenda). It achieves fatty acid attachment to albumin for extended half-life, enabling daily dosing. The LEADER trial established significant cardiovascular mortality benefit in high-risk patients, and research continues into neuroprotective and anti-inflammatory properties beyond metabolic indications.',
    halfLife: '~13 hours (daily dosing)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Once-daily injection' },
    ],
    pubmedSearchTerms: [
      { term: 'liraglutide GLP-1 Victoza' },
      { term: 'liraglutide LEADER cardiovascular' },
      { term: 'liraglutide obesity weight loss' },
    ],
  },

  {
    name: 'Exenatide',
    slug: 'exenatide',
    aliases: [
      { alias: 'Byetta' },
      { alias: 'Bydureon' },
      { alias: 'exendin-4' },
    ],
    casNumber: '141758-74-9',
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic', 'neuroprotection'],
    researchStatus: 'approved',
    summary:
      'Exenatide is a GLP-1 receptor agonist derived from exendin-4, a peptide found in Gila monster saliva. The first GLP-1 RA approved for type 2 diabetes, it established the GLP-1 drug class. Extended-release formulations (Bydureon) allow once-weekly dosing. Emerging research explores repurposing for Parkinson\'s disease, where small trials show motor improvement, and Alzheimer\'s disease neuroprotection.',
    halfLife: '~2.4 hours (immediate); ~2 weeks (extended-release microspheres)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Twice-daily (Byetta) or once-weekly (Bydureon)' },
    ],
    pubmedSearchTerms: [
      { term: 'exenatide exendin-4 GLP-1' },
      { term: 'exenatide Parkinson neuroprotection' },
      { term: 'exenatide type 2 diabetes' },
    ],
  },

  {
    name: 'Retatrutide',
    slug: 'retatrutide',
    aliases: [{ alias: 'LY3437943' }],
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic'],
    researchStatus: 'phase3',
    summary:
      'Retatrutide is a triple agonist targeting GIP, GLP-1, and glucagon receptors simultaneously. Phase 2 trials demonstrated up to 24.2% body weight reduction — the highest achieved by any pharmacotherapy to date. The addition of glucagon agonism enhances energy expenditure and lipid metabolism beyond dual incretin agonists. Phase 3 trials are underway for obesity and NASH.',
    halfLife: '~6 days (once-weekly dosing)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Once-weekly injection (clinical trial protocol)' },
    ],
    pubmedSearchTerms: [
      { term: 'retatrutide triple agonist GLP-1 GIP glucagon' },
      { term: 'LY3437943 obesity weight loss' },
    ],
  },

  {
    name: 'Pramlintide',
    slug: 'pramlintide',
    aliases: [{ alias: 'Symlin' }, { alias: 'synthetic amylin' }],
    casNumber: '151126-32-8',
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic'],
    researchStatus: 'approved',
    summary:
      'Pramlintide is a synthetic analog of amylin, a peptide co-secreted with insulin from pancreatic β-cells. Approved as adjunct therapy to insulin in type 1 and type 2 diabetes, it slows gastric emptying, suppresses postprandial glucagon, and promotes satiety. It is the only amylinomimetic approved for clinical use and is studied for its complementary role to insulin in postprandial glucose control.',
    halfLife: '~48 minutes',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Pre-meal injection' },
    ],
    pubmedSearchTerms: [
      { term: 'pramlintide amylin Symlin diabetes' },
      { term: 'amylin gastric emptying satiety' },
    ],
  },

  // ── SEXUAL HEALTH ─────────────────────────────────────────────────────────

  {
    name: 'PT-141',
    slug: 'pt-141',
    aliases: [
      { alias: 'Bremelanotide' },
      { alias: 'Vyleesi' },
    ],
    casNumber: '189691-06-3',
    categories: ['sexual-health'],
    researchStatus: 'approved',
    summary:
      'PT-141 (bremelanotide) is a cyclic heptapeptide melanocortin receptor agonist, FDA-approved for hypoactive sexual desire disorder (HSDD) in premenopausal women. Unlike PDE5 inhibitors, it acts centrally through MC3R and MC4R receptors in the hypothalamus to initiate sexual arousal, making it effective for psychological as well as physiological sexual dysfunction. Research also explores applications in male erectile dysfunction.',
    halfLife: '~2.7 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'FDA-approved route; administered before anticipated sexual activity' },
      { route: 'intranasal', notes: 'Earlier research formulation' },
    ],
    pubmedSearchTerms: [
      { term: 'PT-141 bremelanotide sexual dysfunction' },
      { term: 'bremelanotide melanocortin HSDD' },
      { term: 'Vyleesi female sexual arousal' },
    ],
  },

  {
    name: 'Melanotan II',
    slug: 'melanotan-ii',
    aliases: [{ alias: 'MT-II' }, { alias: 'MT2' }],
    casNumber: '121062-08-6',
    categories: ['sexual-health', 'skin-cosmetic'],
    researchStatus: 'preclinical',
    summary:
      'Melanotan II is a cyclic synthetic analog of α-MSH that non-selectively activates melanocortin receptors (MC1R–MC5R). It induces skin tanning (via MC1R), erectile function (via MC4R), and sexual arousal while also suppressing appetite. It was the precursor compound from which PT-141 was developed. Research continues despite regulatory concerns due to its broad receptor activity profile.',
    halfLife: '~1–3 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Primary research route' },
      { route: 'intranasal', notes: 'Studied for convenience' },
    ],
    pubmedSearchTerms: [
      { term: 'melanotan II melanocortin tanning' },
      { term: 'MT-II sexual function MC4R' },
      { term: 'melanotan II appetite suppression' },
    ],
  },

  {
    name: 'Melanotan I',
    slug: 'melanotan-i',
    aliases: [{ alias: 'Afamelanotide' }, { alias: 'Scenesse' }],
    casNumber: '75921-69-6',
    categories: ['skin-cosmetic', 'sexual-health'],
    researchStatus: 'approved',
    summary:
      'Melanotan I (afamelanotide) is a linear synthetic α-MSH analog with higher selectivity for MC1R than MT-II. FDA-approved as Scenesse for erythropoietic protoporphyria (EPP), where it reduces phototoxic pain by enhancing melanin production and UV protection. Research explores broader applications in vitiligo, polymorphous light eruption, and other photosensitive disorders.',
    halfLife: '~40 hours (implant formulation)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Biodegradable implant — 16 mg every 2 months (clinical)' },
    ],
    pubmedSearchTerms: [
      { term: 'afamelanotide Scenesse erythropoietic protoporphyria' },
      { term: 'melanotan I MC1R photoprotection' },
      { term: 'afamelanotide vitiligo' },
    ],
  },

  {
    name: 'Kisspeptin-10',
    slug: 'kisspeptin-10',
    aliases: [{ alias: 'KP-10' }, { alias: 'metastin 45-54' }],
    casNumber: '374683-28-0',
    categories: ['sexual-health'],
    researchStatus: 'phase2',
    summary:
      'Kisspeptin-10 is the shortest biologically active fragment of the kisspeptin peptide family, which are potent endogenous activators of the hypothalamic GnRH pulse generator. Research demonstrates it stimulates LH and FSH release and has been studied for infertility, hypogonadotropic hypogonadism, and modulating sexual aversion in psychological studies. It represents a key upstream regulator of the reproductive axis.',
    halfLife: '~28 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Clinical trial contexts for LH pulsatility studies' },
      { route: 'subcutaneous', notes: 'Research administration' },
    ],
    pubmedSearchTerms: [
      { term: 'kisspeptin-10 GnRH LH reproduction' },
      { term: 'kisspeptin fertility hypogonadism' },
    ],
  },

  // ── ANTI-AGING & LONGEVITY ────────────────────────────────────────────────

  {
    name: 'Epithalon',
    slug: 'epithalon',
    aliases: [
      { alias: 'Epitalon' },
      { alias: 'Epithalamin' },
      { alias: 'AEDG' },
      { alias: 'Ala-Glu-Asp-Gly' },
    ],
    casNumber: '307297-39-8',
    categories: ['anti-aging-longevity', 'sleep-circadian'],
    researchStatus: 'preclinical',
    summary:
      'Epithalon is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) modeled on the endogenous pineal peptide epithalamin. It is one of the most extensively studied longevity peptides, with Russian research demonstrating telomerase activation, telomere elongation, melatonin normalization, and extended lifespan in animal models. Long-term human studies show reduced all-cause mortality rates and improved biomarkers of aging.',
    halfLife: 'Short; longer-term effects persist after cyclic dosing',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard research and clinical protocol' },
      { route: 'intramuscular', notes: 'Equivalent to subcutaneous' },
    ],
    pubmedSearchTerms: [
      { term: 'epitalon epithalamin telomerase aging' },
      { term: 'AEDG peptide longevity' },
      { term: 'epithalon pineal anti-aging' },
    ],
  },

  {
    name: 'Humanin',
    slug: 'humanin',
    aliases: [{ alias: 'HN' }, { alias: 'mitochondria-derived peptide humanin' }],
    casNumber: '326914-71-0',
    categories: ['anti-aging-longevity', 'neuroprotection', 'mitochondrial-health'],
    researchStatus: 'preclinical',
    summary:
      'Humanin is a 21-amino-acid mitochondria-derived peptide (MDP) encoded within the 16S rRNA gene of mitochondrial DNA. It is cytoprotective against Alzheimer\'s-related neuronal death, reduces oxidative stress, improves insulin sensitivity, and suppresses apoptosis through multiple pathways (STAT3, IGFBP-3, FPRL1). Circulating humanin levels decline with age, linking it to age-related diseases.',
    halfLife: 'Short; analogs (HNG) extend activity significantly',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Systemic research' },
      { route: 'intranasal', notes: 'CNS delivery for neuroprotection studies' },
      { route: 'intravenous', notes: 'Acute study protocols' },
    ],
    pubmedSearchTerms: [
      { term: 'humanin mitochondria-derived peptide neuroprotection' },
      { term: 'humanin Alzheimer aging STAT3' },
      { term: 'humanin insulin sensitivity' },
    ],
  },

  {
    name: 'MOTS-c',
    slug: 'mots-c',
    aliases: [{ alias: 'Mitochondrial ORF of the 12S rRNA Type-C' }],
    categories: ['mitochondrial-health', 'fat-loss-metabolic', 'anti-aging-longevity'],
    researchStatus: 'preclinical',
    summary:
      'MOTS-c is a 16-amino-acid mitochondria-derived peptide encoded within the 12S rRNA gene. It regulates AMPK signaling, enhances insulin sensitivity, promotes muscle glucose uptake independently of insulin, and improves exercise capacity. Animal studies show it extends lifespan and protects against diet-induced obesity and age-related metabolic dysfunction. It translocates to the nucleus under stress to regulate adaptive gene expression.',
    halfLife: 'Short; exercise significantly elevates circulating MOTS-c',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Primary research route for metabolic studies' },
      { route: 'intravenous', notes: 'Acute administration in rodent models' },
    ],
    pubmedSearchTerms: [
      { term: 'MOTS-c mitochondrial peptide AMPK' },
      { term: 'MOTS-c insulin resistance exercise' },
      { term: 'MOTS-c aging longevity' },
    ],
  },

  {
    name: 'SS-31',
    slug: 'ss-31',
    aliases: [
      { alias: 'Elamipretide' },
      { alias: 'Szeto-Schiller 31' },
      { alias: 'MTP-131' },
      { alias: 'Bendavia' },
    ],
    casNumber: '736992-21-5',
    categories: ['mitochondrial-health', 'cardiovascular', 'anti-aging-longevity'],
    researchStatus: 'phase2',
    summary:
      'SS-31 (elamipretide) is a tetrapeptide that selectively targets cardiolipin in the inner mitochondrial membrane, stabilizing cristae architecture and enhancing ATP synthesis efficiency. It reduces mitochondrial ROS production and protects against ischemia-reperfusion injury, heart failure, and aging-related mitochondrial dysfunction. Phase 2 trials have been conducted for heart failure with preserved ejection fraction and Barth syndrome.',
    halfLife: '~2 hours; mitochondrial targeting is rapid',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Chronic administration for heart failure trials' },
      { route: 'intravenous', notes: 'Acute cardiac protection studies' },
    ],
    pubmedSearchTerms: [
      { term: 'SS-31 elamipretide cardiolipin mitochondria' },
      { term: 'elamipretide heart failure' },
      { term: 'Szeto-Schiller peptide ROS' },
    ],
  },

  {
    name: 'FOXO4-DRI',
    slug: 'foxo4-dri',
    aliases: [{ alias: 'Proxofim' }],
    categories: ['anti-aging-longevity'],
    researchStatus: 'preclinical',
    summary:
      'FOXO4-DRI is a D-retro-inverso peptide that disrupts the interaction between FOXO4 and p53 in senescent cells, triggering selective apoptosis of senescent cells (senolysis) while leaving healthy cells unaffected. Mouse studies demonstrated restoration of fitness, fur density, and renal function after treatment. It represents a first-in-class peptide senolytic, establishing proof-of-concept for peptide-mediated clearance of the senescent cell burden.',
    halfLife: 'Sufficient for cellular entry; exact PK under investigation',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Current preclinical protocol' },
      { route: 'subcutaneous', notes: 'Under investigation' },
    ],
    pubmedSearchTerms: [
      { term: 'FOXO4-DRI senolytic senescent cells' },
      { term: 'FOXO4 p53 apoptosis aging' },
      { term: 'proxofim senescence clearance' },
    ],
  },

  {
    name: 'Vilon',
    slug: 'vilon',
    aliases: [{ alias: 'Lys-Glu' }, { alias: 'KE dipeptide' }],
    categories: ['anti-aging-longevity', 'immune-support'],
    researchStatus: 'preclinical',
    summary:
      'Vilon is a synthetic dipeptide (Lys-Glu) developed at the St. Petersburg Institute of Bioregulation and Gerontology as a vascular cytoprotective peptide. Research demonstrates it reduces vascular endothelial cell aging, suppresses excessive collagen synthesis, and modulates the renin-angiotensin system. Long-term animal studies show improved vascular function and survival; it is often studied as part of peptide longevity protocols.',
    halfLife: 'Very short; longer-term epigenetic effects proposed',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard research protocol' },
    ],
    pubmedSearchTerms: [
      { term: 'Vilon dipeptide vascular aging' },
      { term: 'Lys-Glu KE peptide longevity' },
    ],
  },

  {
    name: 'Cortagen',
    slug: 'cortagen',
    aliases: [{ alias: 'Ala-Glu-Asp-Pro' }, { alias: 'AEDP' }],
    categories: ['anti-aging-longevity', 'neuroprotection'],
    researchStatus: 'preclinical',
    summary:
      'Cortagen is a synthetic tetrapeptide (Ala-Glu-Asp-Pro) characterized as a cortex cytoprotective peptide in research from the St. Petersburg Institute. It penetrates the blood-brain barrier and is reported to regulate neuronal gene expression, protect cortical neurons, and improve cognitive function in aging models. It is often studied alongside other peptide bioregulators from the same research group.',
    halfLife: 'Short; effects studied under cyclic protocols',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Standard research route' },
    ],
    pubmedSearchTerms: [
      { term: 'Cortagen peptide neuron aging' },
      { term: 'AEDP brain cytoprotection' },
    ],
  },

  // ── SKIN & COSMETIC ───────────────────────────────────────────────────────

  {
    name: 'Palmitoyl Pentapeptide-4',
    slug: 'palmitoyl-pentapeptide-4',
    aliases: [
      { alias: 'Matrixyl' },
      { alias: 'Pal-KTTKS' },
    ],
    categories: ['skin-cosmetic'],
    researchStatus: 'preclinical',
    summary:
      'Palmitoyl Pentapeptide-4 (Matrixyl) is a lipopeptide widely used in cosmetic anti-aging formulations. It is derived from the procollagen type I sequence and acts as a matrikine, signaling skin cells to produce collagen, elastin, fibronectin, and hyaluronic acid. Clinical studies demonstrate measurable reduction in wrinkle depth and improved skin elasticity with topical application.',
    halfLife: 'Topical activity; absorption and systemic PK not primary research focus',
    administrationRoutes: [
      { route: 'topical', notes: 'Primary application route in cosmetic formulations' },
    ],
    pubmedSearchTerms: [
      { term: 'palmitoyl pentapeptide-4 Matrixyl collagen skin' },
      { term: 'Pal-KTTKS wrinkle anti-aging cosmetic' },
    ],
  },

  {
    name: 'Argireline',
    slug: 'argireline',
    aliases: [
      { alias: 'Acetyl Hexapeptide-3' },
      { alias: 'Acetyl Hexapeptide-8' },
    ],
    categories: ['skin-cosmetic'],
    researchStatus: 'preclinical',
    summary:
      'Argireline is a synthetic hexapeptide derived from the N-terminal sequence of SNAP-25 protein, a key component of the SNARE complex that mediates acetylcholine release at neuromuscular junctions. It competitively inhibits neurotransmitter vesicle docking, reducing muscle contraction and expression-line formation. Often called "topical Botox," clinical studies show measurable reductions in peri-orbital wrinkle depth with consistent use.',
    halfLife: 'Topical application; systemic absorption negligible at cosmetic doses',
    administrationRoutes: [
      { route: 'topical', notes: 'Anti-wrinkle cosmetic applications' },
    ],
    pubmedSearchTerms: [
      { term: 'argireline acetyl hexapeptide SNAP-25 wrinkle' },
      { term: 'argireline neuromuscular junction skin aging' },
    ],
  },

  {
    name: 'SNAP-8',
    slug: 'snap-8',
    aliases: [{ alias: 'Acetyl Octapeptide-3' }],
    categories: ['skin-cosmetic'],
    researchStatus: 'preclinical',
    summary:
      'SNAP-8 is an extended version of Argireline (an octapeptide vs hexapeptide), designed with enhanced SNARE-inhibiting potency. By more completely blocking the formation of the SNARE complex, it more effectively reduces muscle contraction at treated sites. Cosmetic research shows superior wrinkle reduction efficacy compared to Argireline at equivalent concentrations, particularly in forehead lines.',
    halfLife: 'Topical; designed for surface skin penetration',
    administrationRoutes: [
      { route: 'topical', notes: 'Anti-expression-line cosmetic formulations' },
    ],
    pubmedSearchTerms: [
      { term: 'SNAP-8 octapeptide SNARE wrinkle' },
      { term: 'acetyl octapeptide anti-aging skin' },
    ],
  },

  {
    name: 'Leuphasyl',
    slug: 'leuphasyl',
    aliases: [{ alias: 'Pentapeptide-18' }],
    categories: ['skin-cosmetic'],
    researchStatus: 'preclinical',
    summary:
      'Leuphasyl is a pentapeptide that acts as an enkephalin analog, binding to δ-opioid receptors on muscle cells and neuronal cells to modulate acetylcholine release and reduce muscle contraction. Often combined with Argireline in cosmetic formulations for a synergistic anti-wrinkle effect, studies show the combination outperforms either compound alone in reducing crow\'s feet and forehead lines.',
    halfLife: 'Topical; designed for cosmetic skin penetration',
    administrationRoutes: [
      { route: 'topical', notes: 'Often combined with Argireline in formulations' },
    ],
    pubmedSearchTerms: [
      { term: 'leuphasyl pentapeptide enkephalin muscle relaxation' },
      { term: 'pentapeptide-18 wrinkle reduction skin' },
    ],
  },

  {
    name: 'Syn-Ake',
    slug: 'syn-ake',
    aliases: [{ alias: 'Dipeptide Diaminobutyroyl Benzylamide Diacetate' }],
    categories: ['skin-cosmetic'],
    researchStatus: 'preclinical',
    summary:
      'Syn-Ake is a synthetic dipeptide that mimics the mechanism of waglerin-1, a peptide found in Temple Viper venom, by antagonizing muscular nicotinic acetylcholine receptors and reducing muscle contraction. Applied topically, it reduces the depth of expression lines by temporarily relaxing facial muscles. It has become a common high-end cosmetic ingredient positioned as a non-injectable alternative to botulinum toxin.',
    halfLife: 'Topical; no significant systemic absorption at cosmetic concentrations',
    administrationRoutes: [
      { route: 'topical', notes: 'Cosmetic serum/cream formulations' },
    ],
    pubmedSearchTerms: [
      { term: 'syn-ake viper venom peptide wrinkle skin' },
      { term: 'dipeptide diaminobutyroyl nicotinic acetylcholine skin' },
    ],
  },

  // ── CARDIOVASCULAR ────────────────────────────────────────────────────────

  {
    name: 'Angiotensin 1-7',
    slug: 'angiotensin-1-7',
    aliases: [{ alias: 'Ang(1-7)' }, { alias: 'A779 counter-regulatory' }],
    categories: ['cardiovascular', 'anti-aging-longevity'],
    researchStatus: 'phase2',
    summary:
      'Angiotensin 1-7 is a 7-amino-acid peptide of the renin-angiotensin system (RAS) and the primary product of ACE2 enzyme activity. It opposes the vasoconstrictive, pro-inflammatory actions of Angiotensin II by acting on the Mas receptor — promoting vasodilation, natriuresis, anti-fibrosis, and anti-inflammation. Extensively studied for heart failure, hypertension, and COVID-19, it represents the counter-regulatory arm of the RAS.',
    halfLife: '~1–2 hours',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Clinical cardiovascular studies' },
      { route: 'subcutaneous', notes: 'Research protocols' },
      { route: 'intranasal', notes: 'CNS RAS research' },
    ],
    pubmedSearchTerms: [
      { term: 'angiotensin 1-7 Mas receptor cardiovascular' },
      { term: 'Ang(1-7) ACE2 heart failure' },
      { term: 'angiotensin 1-7 COVID ACE2' },
    ],
  },

  {
    name: 'Apelin',
    slug: 'apelin',
    aliases: [
      { alias: 'APLNR ligand' },
      { alias: 'apelin-13' },
      { alias: 'apelin-36' },
    ],
    categories: ['cardiovascular'],
    researchStatus: 'phase1',
    summary:
      'Apelin is an endogenous peptide that acts as the ligand for the APJ receptor (APLNR), a GPCR expressed throughout the cardiovascular system. It improves cardiac output and vascular tone through both positive inotropy and vasodilation, increases nitric oxide production, and reduces oxidative stress. Research focuses on heart failure, pulmonary arterial hypertension, and its potential to replace or complement established cardiac peptides.',
    halfLife: 'Very short (minutes); modified analogs extend activity',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Acute hemodynamic studies' },
    ],
    pubmedSearchTerms: [
      { term: 'apelin APJ receptor cardiovascular' },
      { term: 'apelin heart failure pulmonary hypertension' },
    ],
  },

  {
    name: 'BNP',
    slug: 'bnp',
    aliases: [
      { alias: 'Brain Natriuretic Peptide' },
      { alias: 'Nesiritide' },
      { alias: 'B-type Natriuretic Peptide' },
    ],
    casNumber: '114471-18-0',
    categories: ['cardiovascular'],
    researchStatus: 'approved',
    summary:
      'BNP (B-type/brain natriuretic peptide) is a 32-amino-acid hormone secreted by ventricular cardiomyocytes in response to wall stress and volume overload. Clinically, it is the primary biomarker for heart failure diagnosis and prognosis. Recombinant BNP (nesiritide/Natrecor) was approved for acute decompensated heart failure, producing vasodilation and natriuresis. Research into modified natriuretic peptides continues for heart failure therapy.',
    halfLife: '~20 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Acute heart failure treatment and diagnostic standard' },
    ],
    pubmedSearchTerms: [
      { term: 'BNP natriuretic peptide heart failure biomarker' },
      { term: 'nesiritide B-type natriuretic peptide heart failure' },
    ],
  },

  {
    name: 'Vasopressin',
    slug: 'vasopressin',
    aliases: [
      { alias: 'ADH' },
      { alias: 'Antidiuretic Hormone' },
      { alias: 'Arginine Vasopressin' },
      { alias: 'AVP' },
    ],
    casNumber: '11000-17-2',
    categories: ['cardiovascular'],
    researchStatus: 'approved',
    summary:
      'Vasopressin (AVP) is a 9-amino-acid neuropeptide produced in the hypothalamus and released by the posterior pituitary. It regulates water reabsorption via V2 receptors in renal collecting ducts and vasoconstriction via V1a receptors in blood vessels. Clinically used for diabetes insipidus, septic shock vasodilation, GI hemorrhage, and cardiac arrest. Extensive research also examines its roles in social bonding, memory, and stress responses.',
    halfLife: '10–20 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Vasopressor in septic shock; GI hemorrhage' },
      { route: 'intranasal', notes: 'Diabetes insipidus treatment and cognitive research' },
    ],
    pubmedSearchTerms: [
      { term: 'vasopressin ADH antidiuretic septic shock' },
      { term: 'arginine vasopressin social behavior memory' },
    ],
  },

  {
    name: 'Desmopressin',
    slug: 'desmopressin',
    aliases: [
      { alias: 'DDAVP' },
      { alias: '1-desamino-8-D-arginine vasopressin' },
    ],
    casNumber: '16679-58-6',
    categories: ['cardiovascular'],
    researchStatus: 'approved',
    summary:
      'Desmopressin (DDAVP) is a synthetic vasopressin analog modified to eliminate vasopressor activity while retaining antidiuretic potency. FDA-approved for central diabetes insipidus, nocturnal enuresis (bedwetting), and von Willebrand disease, it achieves selective V2 receptor activation. Research explores its role in cognitive enhancement, where intranasal administration shows effects on memory consolidation.',
    halfLife: '~75–100 minutes',
    administrationRoutes: [
      { route: 'intranasal', notes: 'Primary route for DI and enuresis' },
      { route: 'oral', notes: 'Tablet form for chronic use' },
      { route: 'intravenous', notes: 'Von Willebrand disease, acute settings' },
    ],
    pubmedSearchTerms: [
      { term: 'desmopressin DDAVP vasopressin diabetes insipidus' },
      { term: 'desmopressin memory cognitive' },
    ],
  },

  // ── SLEEP & CIRCADIAN ─────────────────────────────────────────────────────

  {
    name: 'DSIP',
    slug: 'dsip',
    aliases: [
      { alias: 'Delta Sleep Inducing Peptide' },
      { alias: 'Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu' },
    ],
    casNumber: '62568-57-4',
    categories: ['sleep-circadian'],
    researchStatus: 'preclinical',
    summary:
      'DSIP (Delta Sleep Inducing Peptide) is a nonapeptide first isolated from rabbit cerebral venous blood during electrically induced sleep. Research shows it promotes slow-wave sleep, reduces pain sensitivity, normalizes circadian rhythms, lowers cortisol, and exhibits stress-protective effects. It also stimulates LH release and may influence GH pulsatility. Multiple mechanisms of action are proposed; its receptor has not been fully characterized.',
    halfLife: 'Very short in plasma (~30 min); CNS effects outlast serum presence',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Primary research route' },
      { route: 'intravenous', notes: 'Original clinical research route' },
    ],
    pubmedSearchTerms: [
      { term: 'DSIP delta sleep inducing peptide' },
      { term: 'delta sleep peptide circadian cortisol' },
    ],
  },

  // ── PAIN & INFLAMMATION ───────────────────────────────────────────────────

  {
    name: 'VIP',
    slug: 'vip',
    aliases: [
      { alias: 'Vasoactive Intestinal Peptide' },
      { alias: 'Vasoactive Intestinal Polypeptide' },
    ],
    casNumber: '37221-79-7',
    categories: ['pain-inflammation', 'immune-support', 'cardiovascular'],
    researchStatus: 'phase2',
    summary:
      'VIP (Vasoactive Intestinal Peptide) is a 28-amino-acid neuropeptide with pleiotropic anti-inflammatory, bronchodilatory, and immunomodulatory effects mediated through VPAC1 and VPAC2 receptors. Research spans pulmonary arterial hypertension (inhaled VIP trials), inflammatory bowel disease, sepsis, Parkinson\'s disease, and CIRS (chronic inflammatory response syndrome). It suppresses Th1 cytokines and promotes Treg cell function.',
    halfLife: '~1–2 minutes in plasma; local effects persist longer',
    administrationRoutes: [
      { route: 'intranasal', notes: 'CIRS and pulmonary research' },
      { route: 'intravenous', notes: 'Pulmonary hypertension trials' },
      { route: 'subcutaneous', notes: 'Systemic inflammatory research' },
    ],
    pubmedSearchTerms: [
      { term: 'VIP vasoactive intestinal peptide inflammation' },
      { term: 'VIP pulmonary hypertension VPAC' },
      { term: 'vasoactive intestinal peptide immune Treg' },
    ],
  },

  // ── NEUROPROTECTION ───────────────────────────────────────────────────────

  {
    name: 'Cerebrolysin',
    slug: 'cerebrolysin',
    aliases: [{ alias: 'FPF 1070' }],
    categories: ['neuroprotection', 'cognitive-enhancement'],
    researchStatus: 'approved',
    summary:
      'Cerebrolysin is a mixture of neuropeptides and neurotrophic factors derived from porcine brain proteins. It mimics the actions of endogenous neurotrophic factors (NGF, BDNF, CNTF), promoting neuronal survival, synaptogenesis, and neuroplasticity. Approved in multiple countries for Alzheimer\'s disease, stroke recovery, and TBI, clinical trials show improvements in cognitive function, activities of daily living, and brain MRI outcomes.',
    halfLife: 'Complex mixture; individual peptide PK varies',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Standard clinical route (daily infusions in courses)' },
      { route: 'intramuscular', notes: 'Alternative clinical route' },
    ],
    pubmedSearchTerms: [
      { term: 'cerebrolysin Alzheimer neuroprotection' },
      { term: 'cerebrolysin stroke TBI cognitive' },
      { term: 'FPF 1070 neurotrophic' },
    ],
  },

  // ── MUSCLE & PERFORMANCE ──────────────────────────────────────────────────

  {
    name: 'Follistatin-344',
    slug: 'follistatin-344',
    aliases: [{ alias: 'FST-344' }, { alias: 'Follistatin isoform 344' }],
    categories: ['muscle-performance'],
    researchStatus: 'preclinical',
    summary:
      'Follistatin-344 is an isoform of follistatin, an endogenous glycoprotein that binds and neutralizes myostatin (GDF-8) and activin, thereby releasing the natural inhibition on muscle growth. Without myostatin\'s inhibitory signal, satellite cells proliferate and muscle fiber hypertrophy is dramatically enhanced. Gene therapy studies in animals and in rare myostatin-null humans demonstrate extreme muscle mass increases, driving significant research interest.',
    halfLife: 'Variable depending on binding partners; hours to days',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Research peptide administration' },
      { route: 'intramuscular', notes: 'Local muscle growth research' },
    ],
    pubmedSearchTerms: [
      { term: 'follistatin myostatin inhibitor muscle hypertrophy' },
      { term: 'follistatin-344 activin FST muscle' },
    ],
  },

  {
    name: 'Oxytocin',
    slug: 'oxytocin',
    aliases: [{ alias: 'Pitocin' }, { alias: 'the "bonding hormone"' }],
    casNumber: '50-56-6',
    categories: ['cognitive-enhancement', 'sexual-health'],
    researchStatus: 'approved',
    summary:
      'Oxytocin is a 9-amino-acid neuropeptide produced in the hypothalamus and released by the posterior pituitary. Beyond its classic roles in parturition and lactation, research demonstrates effects on social bonding, trust, empathy, fear extinction, and autism spectrum disorder. Intranasal oxytocin research has produced mixed results in clinical trials, but it remains one of the most studied peptides in social neuroscience.',
    halfLife: '~3–5 minutes in plasma; CNS effects longer lasting',
    administrationRoutes: [
      { route: 'intranasal', notes: 'Social neuroscience research' },
      { route: 'intravenous', notes: 'Obstetric/clinical applications' },
    ],
    pubmedSearchTerms: [
      { term: 'oxytocin bonding social trust neuropeptide' },
      { term: 'intranasal oxytocin autism behavior' },
    ],
  },

  // ── GLP-1 & METABOLIC (additional) ───────────────────────────────────────

  {
    name: 'GLP-1',
    slug: 'glp-1',
    aliases: [
      { alias: 'Glucagon-like Peptide-1' },
      { alias: 'GLP-1(7-37)' },
      { alias: 'GLP-1(7-36)amide' },
    ],
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic'],
    researchStatus: 'preclinical',
    summary:
      'GLP-1 is an endogenous incretin hormone secreted by intestinal L-cells in response to nutrient ingestion. It enhances glucose-dependent insulin secretion, suppresses glucagon, slows gastric emptying, and signals satiety to the hypothalamus. Native GLP-1 has a half-life of only 1–2 minutes due to DPP-4 degradation, which drove the development of DPP-4-resistant analogs (semaglutide, liraglutide, exenatide) that are now major drug classes.',
    halfLife: '~1–2 minutes (native); analogs range from hours to weeks',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Research; native GLP-1 only' },
    ],
    pubmedSearchTerms: [
      { term: 'GLP-1 glucagon-like peptide incretin insulin' },
      { term: 'GLP-1 receptor agonist satiety brain' },
    ],
  },

  {
    name: 'GIP',
    slug: 'gip',
    aliases: [
      { alias: 'Glucose-dependent Insulinotropic Polypeptide' },
      { alias: 'Gastric Inhibitory Polypeptide' },
    ],
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic'],
    researchStatus: 'preclinical',
    summary:
      'GIP is a 42-amino-acid incretin hormone secreted by duodenal K-cells in response to fat and carbohydrate ingestion. Like GLP-1, it enhances glucose-dependent insulin secretion. Unlike GLP-1, it also promotes insulin secretion during hypoglycemia, protects β-cells, and at high doses may stimulate glucagon in a glucose-independent manner. The GIP receptor\'s role in energy homeostasis underlies the efficacy of dual GIP/GLP-1 agonists like tirzepatide.',
    halfLife: '~7 minutes (native); GIPR agonist analogs under development',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Research tool for studying incretin physiology' },
    ],
    pubmedSearchTerms: [
      { term: 'GIP gastric inhibitory polypeptide incretin beta cell' },
      { term: 'GIP receptor agonist tirzepatide obesity' },
    ],
  },

  {
    name: 'Gonadorelin',
    slug: 'gonadorelin',
    aliases: [
      { alias: 'GnRH' },
      { alias: 'Gonadotropin-Releasing Hormone' },
      { alias: 'LHRH' },
      { alias: 'Luteinizing Hormone-Releasing Hormone' },
    ],
    casNumber: '33515-09-2',
    categories: ['sexual-health'],
    researchStatus: 'approved',
    summary:
      'Gonadorelin is a synthetic decapeptide identical to endogenous GnRH. When administered in pulsatile fashion it stimulates LH and FSH release from the pituitary, driving gonadal testosterone and estrogen production. Clinically used for diagnosing hypothalamic-pituitary dysfunction, treating hypogonadotropic hypogonadism, and inducing ovulation. Paradoxically, continuous administration causes receptor downregulation and hormonal suppression — the basis of GnRH agonist therapy in prostate cancer.',
    halfLife: '~2–10 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Pulsatile pump for hypogonadism' },
      { route: 'subcutaneous', notes: 'Research and compounded clinical use' },
      { route: 'intranasal', notes: 'Ovulation induction in some protocols' },
    ],
    pubmedSearchTerms: [
      { term: 'gonadorelin GnRH LHRH pituitary LH FSH' },
      { term: 'GnRH pulse hypogonadism testosterone' },
    ],
  },

  {
    name: 'α-MSH',
    slug: 'alpha-msh',
    aliases: [
      { alias: 'Alpha-Melanocyte-Stimulating Hormone' },
      { alias: 'α-Melanotropin' },
    ],
    casNumber: '581-05-5',
    categories: ['skin-cosmetic', 'pain-inflammation', 'fat-loss-metabolic'],
    researchStatus: 'preclinical',
    summary:
      'α-MSH is an endogenous 13-amino-acid peptide derived from POMC (pro-opiomelanocortin). It activates MC1R to stimulate melanin production in skin, MC4R to suppress appetite and regulate energy expenditure, and MC3R/MC1R to exert potent anti-inflammatory effects. It is the parent compound from which many synthetic melanocortin analogs (Melanotan I, II, PT-141, KPV) were derived and remains a cornerstone of melanocortin pharmacology research.',
    halfLife: '~2–5 minutes (native); analogs extend significantly',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Research tool for melanocortin receptor pharmacology' },
    ],
    pubmedSearchTerms: [
      { term: 'alpha-MSH melanocortin receptor anti-inflammatory' },
      { term: 'α-MSH POMC melanocyte skin pigmentation' },
      { term: 'alpha-melanocyte stimulating hormone MC4R appetite' },
    ],
  },

  {
    name: 'CRH',
    slug: 'crh',
    aliases: [
      { alias: 'Corticotropin-Releasing Hormone' },
      { alias: 'Corticotropin-Releasing Factor' },
      { alias: 'CRF' },
    ],
    casNumber: '9015-71-8',
    categories: ['cognitive-enhancement'],
    researchStatus: 'preclinical',
    summary:
      'CRH is a 41-amino-acid neuropeptide produced in the hypothalamus that drives the HPA axis stress response. It stimulates ACTH release from the anterior pituitary, ultimately triggering cortisol secretion. Beyond stress regulation, CRH receptors (CRHR1, CRHR2) are distributed throughout the brain and gut, mediating anxiety, depression, immune function, and GI motility. CRH antagonists are under development for anxiety, depression, and irritable bowel syndrome.',
    halfLife: '~1–2 hours',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Diagnostic testing of HPA axis function' },
    ],
    pubmedSearchTerms: [
      { term: 'CRH corticotropin releasing hormone HPA axis' },
      { term: 'CRF anxiety depression stress' },
    ],
  },

  {
    name: 'ACTH',
    slug: 'acth',
    aliases: [
      { alias: 'Adrenocorticotropic Hormone' },
      { alias: 'Corticotropin' },
      { alias: 'ACTH(1-39)' },
    ],
    casNumber: '9002-60-2',
    categories: ['anti-aging-longevity', 'healing-recovery'],
    researchStatus: 'approved',
    summary:
      'ACTH is a 39-amino-acid peptide hormone released by the anterior pituitary in response to CRH. Its primary role is stimulating the adrenal cortex to produce cortisol, but it also has direct melanotropic and lipolytic effects. Synthetic forms (cosyntropin) are used diagnostically for adrenal insufficiency testing. Longer-acting formulations (H.P. Acthar Gel) are approved for multiple sclerosis relapses, infantile spasms, and various inflammatory conditions.',
    halfLife: '~10–25 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Stimulation testing of adrenal function' },
      { route: 'intramuscular', notes: 'Acthar Gel clinical use' },
    ],
    pubmedSearchTerms: [
      { term: 'ACTH adrenocorticotropic hormone cortisol' },
      { term: 'cosyntropin adrenal insufficiency test' },
    ],
  },

  {
    name: 'Carnosine',
    slug: 'carnosine',
    aliases: [
      { alias: 'Beta-Alanyl-L-Histidine' },
      { alias: 'L-Carnosine' },
    ],
    casNumber: '305-84-0',
    categories: ['anti-aging-longevity', 'cognitive-enhancement', 'muscle-performance'],
    researchStatus: 'preclinical',
    summary:
      'Carnosine is a naturally occurring dipeptide (β-alanyl-L-histidine) found at high concentrations in skeletal muscle and the brain. It acts as a pH buffer in muscle (reducing acidosis during high-intensity exercise), a powerful antioxidant, an antiglycation agent (preventing protein-sugar crosslinking), and a chelator of zinc and copper. Research explores its role in aging, cognitive decline, autism, and exercise performance.',
    halfLife: 'Short in serum due to carnosinase enzyme; muscle half-life is days',
    administrationRoutes: [
      { route: 'oral', notes: 'Well-absorbed; standard for supplementation research' },
    ],
    pubmedSearchTerms: [
      { term: 'carnosine dipeptide antiglycation aging' },
      { term: 'L-carnosine muscle pH buffer exercise performance' },
      { term: 'carnosine brain neuroprotection' },
    ],
  },

  {
    name: 'Anserine',
    slug: 'anserine',
    aliases: [{ alias: 'Beta-Alanyl-N-methyl-L-histidine' }],
    casNumber: '584-85-0',
    categories: ['anti-aging-longevity', 'muscle-performance', 'neuroprotection'],
    researchStatus: 'preclinical',
    summary:
      'Anserine is a methylated dipeptide analog of carnosine found in high concentrations in avian and fish muscle. It shares carnosine\'s pH-buffering and antioxidant properties but shows superior blood-brain barrier penetration. Research highlights potential for cognitive decline prevention, reduction of amyloid-beta toxicity, and improved exercise performance. It is often studied alongside carnosine for synergistic effects.',
    halfLife: 'Similar to carnosine; some resistance to serum carnosinase',
    administrationRoutes: [
      { route: 'oral', notes: 'Dietary intake from poultry and fish; supplement research' },
    ],
    pubmedSearchTerms: [
      { term: 'anserine dipeptide carnosine cognitive aging' },
      { term: 'anserine exercise muscle antioxidant' },
    ],
  },

  {
    name: 'RGD Peptides',
    slug: 'rgd-peptides',
    aliases: [
      { alias: 'Arg-Gly-Asp' },
      { alias: 'Integrin-binding peptide' },
    ],
    categories: ['healing-recovery', 'skin-cosmetic'],
    researchStatus: 'preclinical',
    summary:
      'RGD (Arg-Gly-Asp) is a tripeptide sequence found in many extracellular matrix proteins (fibronectin, vitronectin, collagen) that serves as the primary recognition motif for integrin receptors. RGD-containing peptides and scaffolds are extensively used in biomaterials research to promote cell adhesion, migration, and proliferation for tissue engineering, wound healing, and regenerative medicine applications.',
    halfLife: 'Depends on delivery vehicle (free, surface-conjugated, or hydrogel)',
    administrationRoutes: [
      { route: 'topical', notes: 'Wound care scaffolds and cosmetic delivery systems' },
    ],
    pubmedSearchTerms: [
      { term: 'RGD Arg-Gly-Asp integrin cell adhesion' },
      { term: 'RGD peptide tissue engineering wound healing' },
    ],
  },

  {
    name: 'Magainin-2',
    slug: 'magainin-2',
    aliases: [{ alias: 'Magainin II' }],
    casNumber: '108433-95-0',
    categories: ['antimicrobial'],
    researchStatus: 'preclinical',
    summary:
      'Magainin-2 is a 23-amino-acid cationic antimicrobial peptide (AMP) isolated from the skin of the African clawed frog (Xenopus laevis). It kills bacteria through membrane disruption — forming toroidal pores in bacterial lipid bilayers — while showing low toxicity to mammalian cells due to differences in membrane composition. It is a key model peptide for AMP research and drug design, with a derivative (pexiganan) evaluated in clinical trials for diabetic foot ulcers.',
    halfLife: 'Rapid degradation in serum; formulation research ongoing',
    administrationRoutes: [
      { route: 'topical', notes: 'Primary route for antimicrobial applications' },
    ],
    pubmedSearchTerms: [
      { term: 'magainin-2 antimicrobial peptide membrane disruption' },
      { term: 'magainin frog skin bacteria pore' },
    ],
  },

  {
    name: 'Defensin Alpha',
    slug: 'defensin-alpha',
    aliases: [
      { alias: 'Human Neutrophil Peptides (HNP-1, HNP-2, HNP-3)' },
      { alias: 'α-defensins' },
    ],
    categories: ['antimicrobial', 'immune-support'],
    researchStatus: 'preclinical',
    summary:
      'Alpha-defensins are cationic antimicrobial peptides secreted by neutrophils (HNP-1 to 4) and Paneth cells (HD-5, HD-6) in the small intestine. They kill bacteria, fungi, and enveloped viruses through membrane disruption and also function as chemokines, recruiting immune cells and bridging innate and adaptive immunity. Paneth cell alpha-defensins (HD-5, HD-6) play a critical role in shaping intestinal microbiome composition.',
    halfLife: 'Variable; local tissue concentrations important',
    administrationRoutes: [
      { route: 'topical', notes: 'Wound and mucosal antimicrobial research' },
    ],
    pubmedSearchTerms: [
      { term: 'alpha-defensin HNP antimicrobial neutrophil' },
      { term: 'Paneth cell defensin intestinal microbiome' },
    ],
  },

  {
    name: 'Palmitoyl Tripeptide-1',
    slug: 'palmitoyl-tripeptide-1',
    aliases: [{ alias: 'Pal-GHK' }, { alias: 'Matrixyl component' }],
    categories: ['skin-cosmetic', 'healing-recovery'],
    researchStatus: 'preclinical',
    summary:
      'Palmitoyl Tripeptide-1 is a lipopeptide created by palmitoylating GHK (glycyl-histidyl-lysine), the same sequence as GHK-Cu without copper. The palmitoyl group enhances skin penetration, while the GHK sequence signals fibroblasts to upregulate collagen, elastin, and hyaluronic acid synthesis. It is a primary active ingredient in Matrixyl formulations and widely used in anti-aging cosmetics with clinical data supporting wrinkle reduction.',
    halfLife: 'Topical; designed for dermal penetration',
    administrationRoutes: [
      { route: 'topical', notes: 'Anti-aging cosmetic creams and serums' },
    ],
    pubmedSearchTerms: [
      { term: 'palmitoyl tripeptide-1 GHK collagen skin aging' },
      { term: 'Pal-GHK matrixyl fibroblast cosmetic' },
    ],
  },

  {
    name: 'Thymulin',
    slug: 'thymulin',
    aliases: [
      { alias: 'Serum Thymic Factor' },
      { alias: 'Facteur Thymique Sérique' },
      { alias: 'FTS' },
    ],
    casNumber: '61278-21-5',
    categories: ['immune-support', 'anti-aging-longevity'],
    researchStatus: 'preclinical',
    summary:
      'Thymulin is a nonapeptide produced exclusively by thymic epithelial cells, requiring zinc for biological activity. It promotes T-cell differentiation, enhances cytokine production, and is a key marker of thymic function. Circulating thymulin levels decline with age, paralleling thymic involution. Research examines its role in autoimmunity, inflammatory diseases, and as a zinc-dependent immune regulator in aging.',
    halfLife: '~1–2 hours',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Research immune studies' },
    ],
    pubmedSearchTerms: [
      { term: 'thymulin serum thymic factor zinc T cell' },
      { term: 'thymulin aging immune decline thymus' },
    ],
  },

  {
    name: 'Collagen Peptides',
    slug: 'collagen-peptides',
    aliases: [
      { alias: 'Hydrolyzed Collagen' },
      { alias: 'Collagen Hydrolysate' },
    ],
    categories: ['skin-cosmetic', 'healing-recovery', 'muscle-performance'],
    researchStatus: 'preclinical',
    summary:
      'Hydrolyzed collagen peptides are short-chain amino acid sequences (2–20 amino acids) produced by enzymatic hydrolysis of collagen. Research demonstrates that specific collagen dipeptides and tripeptides (Pro-Hyp, Hyp-Gly) are absorbed intact, reach fibroblasts in skin and joints, and stimulate collagen and hyaluronic acid synthesis. Meta-analyses support effects on skin elasticity, wrinkle depth, joint pain, and muscle mass when combined with resistance exercise.',
    halfLife: 'Hours; di/tripeptides absorbed within 1–2 hours of ingestion',
    administrationRoutes: [
      { route: 'oral', notes: 'Dietary supplement; primary research and application route' },
    ],
    pubmedSearchTerms: [
      { term: 'collagen peptides hydrolyzed skin aging elasticity' },
      { term: 'collagen hydrolysate joint pain cartilage' },
      { term: 'collagen peptide muscle recovery exercise' },
    ],
  },

  {
    name: 'Noopept',
    slug: 'noopept',
    aliases: [
      { alias: 'N-phenylacetyl-L-prolylglycine ethyl ester' },
      { alias: 'GVS-111' },
    ],
    casNumber: '157115-85-0',
    categories: ['cognitive-enhancement', 'neuroprotection'],
    researchStatus: 'approved',
    summary:
      'Noopept is a dipeptide-derived nootropic approved in Russia for cognitive disorders and memory impairment. It is hydrolyzed in vivo to release cycloprolylglycine, an endogenous neuropeptide. Research demonstrates neuroprotective, memory-enhancing, and anxiolytic effects, upregulation of BDNF and NGF in the hippocampus and cortex, and potential benefits in Alzheimer\'s disease models. It is significantly more potent than piracetam on a weight-for-weight basis.',
    halfLife: '~15–30 minutes (parent); active metabolite prolylglycine longer',
    administrationRoutes: [
      { route: 'oral', notes: 'Primary route; good bioavailability' },
      { route: 'sublingual', notes: 'Faster onset; used for cognitive effects' },
    ],
    pubmedSearchTerms: [
      { term: 'noopept GVS-111 cognitive neuroprotection' },
      { term: 'noopept BDNF NGF hippocampus memory' },
    ],
  },

  {
    name: 'ACE-031',
    slug: 'ace-031',
    aliases: [{ alias: 'ACVR2B-Fc' }, { alias: 'Bimagrumab-precursor' }],
    categories: ['muscle-performance'],
    researchStatus: 'phase2',
    summary:
      'ACE-031 is a fusion protein of the extracellular domain of activin type IIB receptor (ACVR2B) fused to human IgG1 Fc. It acts as a myostatin/activin trap, sequestering multiple TGF-β superfamily ligands (myostatin, GDF-11, activin A) that inhibit muscle growth. Phase 2 trials in Duchenne muscular dystrophy showed significant lean muscle mass gains before being halted for safety signals (nosebleeds, telangiectasias). Related compound bimagrumab continues development.',
    halfLife: '~11 days (Fc fusion extends half-life)',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Clinical trial protocol' },
      { route: 'subcutaneous', notes: 'Research' },
    ],
    pubmedSearchTerms: [
      { term: 'ACE-031 ACVR2B myostatin activin muscle' },
      { term: 'activin receptor IIB Fc fusion muscle wasting' },
    ],
  },

  {
    name: 'GDF-11',
    slug: 'gdf-11',
    aliases: [
      { alias: 'Growth Differentiation Factor 11' },
      { alias: 'Bone Morphogenetic Protein 11' },
      { alias: 'BMP-11' },
    ],
    categories: ['anti-aging-longevity', 'muscle-performance'],
    researchStatus: 'preclinical',
    summary:
      'GDF-11 is a member of the TGF-β superfamily that generated significant excitement when studies reported it as a "rejuvenating factor" in young parabiosis mouse blood. Subsequent research has been highly contested — some studies suggest it reverses cardiac hypertrophy and restores skeletal muscle and neural stem cell function in aged mice, while others find it increases with age and impairs muscle regeneration. It remains one of the most debated factors in aging biology.',
    halfLife: 'Unknown; context-dependent activity',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Parabiosis and injection studies in rodents' },
    ],
    pubmedSearchTerms: [
      { term: 'GDF-11 aging rejuvenation parabiosis' },
      { term: 'growth differentiation factor 11 cardiac muscle' },
    ],
  },

]
