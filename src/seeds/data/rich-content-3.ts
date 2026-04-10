/**
 * Rich content batch 3 — Lexical JSON for 10 high-traffic peptides:
 * Melanotan II, Liraglutide, Oxytocin, MOD-GRF 1-29, Follistatin-344,
 * LL-37, MGF, MOTS-c, DSIP, FOXO4-DRI
 */

// ── Lexical node helpers ─────────────────────────────────────────────────────

type TextNode = {
  type: 'text'
  text: string
  format?: number
  version: 1
}

type ParagraphNode = {
  type: 'paragraph'
  children: TextNode[]
  version: 1
}

type HeadingNode = {
  type: 'heading'
  tag: 'h1' | 'h2' | 'h3'
  children: TextNode[]
  version: 1
}

type ListItemNode = {
  type: 'listitem'
  children: TextNode[]
  value: number
  version: 1
}

type ListNode = {
  type: 'list'
  listType: 'bullet' | 'number'
  children: ListItemNode[]
  start: 1
  tag: 'ul' | 'ol'
  version: 1
}

type LexicalRoot = {
  root: {
    type: 'root'
    children: (ParagraphNode | HeadingNode | ListNode)[]
    direction: 'ltr'
    format: ''
    indent: 0
    version: 1
  }
}

function t(text: string, format = 0): TextNode {
  return { type: 'text', text, format, version: 1 }
}

function p(...texts: TextNode[]): ParagraphNode {
  return { type: 'paragraph', children: texts, version: 1 }
}

function h3(text: string): HeadingNode {
  return { type: 'heading', tag: 'h3', children: [t(text)], version: 1 }
}

function ul(...items: string[]): ListNode {
  return {
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    children: items.map(
      (item, i): ListItemNode => ({
        type: 'listitem',
        value: i + 1,
        children: [t(item)],
        version: 1,
      }),
    ),
    version: 1,
  }
}

function lex(...nodes: (ParagraphNode | HeadingNode | ListNode)[]): LexicalRoot {
  return {
    root: {
      type: 'root',
      children: nodes,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// ── Content ──────────────────────────────────────────────────────────────────

export const richContent3: Record<
  string,
  {
    mechanismOfAction: LexicalRoot
    pharmacokinetics: LexicalRoot
    researchFindings: LexicalRoot
    sideEffectsAndSafety: LexicalRoot
  }
> = {

  // ── Melanotan II ───────────────────────────────────────────────────────────
  'melanotan-ii': {
    mechanismOfAction: lex(
      p(t('Melanotan II (MT-II) is a synthetic cyclic heptapeptide analogue of α-melanocyte-stimulating hormone (α-MSH), engineered to resist enzymatic degradation while retaining full agonist activity at melanocortin receptors. Unlike the linear α-MSH, MT-II\'s cyclic lactam bridge confers resistance to peptidases and extends its effective half-life significantly beyond the endogenous peptide.')),
      h3('Melanocortin Receptor Agonism'),
      p(t('MT-II acts as a non-selective agonist across the melanocortin receptor family, with nanomolar affinity for MC1R, MC3R, MC4R, and MC5R. This broad receptor engagement distinguishes it from more selective analogues and underlies its diverse pharmacological profile:')),
      ul(
        'MC1R (melanocytes): stimulates eumelanin synthesis via cAMP/PKA→MITF→tyrosinase pathway, producing UV-independent skin darkening',
        'MC4R (hypothalamus/brainstem): mediates sexual arousal and erectile/genital engorgement; activates paraventricular nucleus neurons that release oxytocin spinally',
        'MC3R/MC4R (energy homeostasis): reduces food intake via anorexigenic signaling; interacts with leptin and AgRP/POMC circuitry',
        'MC5R (exocrine glands): influences sebaceous secretion and exocrine function',
      ),
      h3('Erection and Sexual Response Pathway'),
      p(t('MC4R activation in the medial preopine area and paraventricular nucleus (PVN) triggers oxytocinergic projections to the sacral spinal cord, increasing nitric oxide synthase (NOS) activity in penile and clitoral erectile tissue. This cascade is independent of direct vascular engagement and can occur in the absence of tactile stimulation, distinguishing MT-II\'s mechanism from PDE5 inhibitors (sildenafil). The two mechanisms are synergistic.')),
      h3('Melanogenesis'),
      p(t('At MC1R, the cAMP second-messenger cascade activates protein kinase A, which phosphorylates CREB and upregulates microphthalmia-associated transcription factor (MITF). MITF drives transcription of tyrosinase, TRP-1, and TRP-2 — the rate-limiting enzymes of eumelanin synthesis in melanosomes. The result is dose-dependent skin darkening that is potentiated by UV exposure but occurs partially without it.')),
    ),
    pharmacokinetics: lex(
      p(t('MT-II was designed specifically to overcome the pharmacokinetic limitations of α-MSH, which has a plasma half-life of under 30 minutes and low receptor selectivity. The cyclic backbone dramatically alters its metabolic profile.')),
      h3('Absorption and Bioavailability'),
      ul(
        'Route: typically administered subcutaneously; some intranasal research (lower bioavailability ~33%)',
        'Subcutaneous bioavailability: estimated ~80–95% in animal studies',
        'Tmax: approximately 1–2 hours post-subcutaneous injection',
        'Onset of sexual effects: 1–3 hours; pigmentation effects cumulative over days to weeks',
      ),
      h3('Distribution and Half-Life'),
      ul(
        'Plasma half-life: approximately 30–60 minutes (much longer than native α-MSH)',
        'Duration of pharmacodynamic effects: 6–12 hours for sexual effects; days for pigmentation',
        'Volume of distribution: wide; crosses blood–brain barrier to engage central MC4R',
        'Protein binding: moderate; primarily albumin',
      ),
      h3('Metabolism and Elimination'),
      p(t('MT-II is catabolized by endopeptidases and aminopeptidases, with the cyclic lactam bridge slowing this process considerably relative to linear analogues. Metabolites are renally excreted. The prolonged pigmentation effects reflect persistent upregulation of melanogenic machinery rather than extended peptide presence.')),
      h3('Dose–Response'),
      p(t('Clinical research used doses of 0.025 mg/kg for sexual effects. Pigmentation protocols in the literature used 0.025–0.1 mg/kg doses repeated over weeks. The dose–response for sexual arousal is steep; nausea is dose-limiting and highly correlated with dose escalation.')),
    ),
    researchFindings: lex(
      p(t('MT-II has a well-documented human research record, having entered Phase I and II clinical trials in the 1990s–2000s primarily for erectile dysfunction and female sexual dysfunction, plus additional research into skin pigmentation and appetite.')),
      h3('Erectile Dysfunction Studies'),
      p(t('A landmark double-blind crossover RCT by Wessells et al. (1998, University of Arizona) demonstrated statistically significant increases in erectile events measured by RigiScan in men with psychogenic and organic ED at 0.025 mg/kg MT-II versus placebo. Erections occurred in the absence of visual sexual stimulation. A follow-up study (2000) in 20 men with organic ED confirmed efficacy and delineated dose-dependent nausea.')),
      h3('Female Sexual Dysfunction'),
      p(t('Preliminary data in women with arousal disorder showed increased genital blood flow and self-reported arousal ratings. These results supported development of PT-141 (bremelanotide), a hydrolysis product of MT-II with a more favorable side-effect profile, which received FDA approval in 2019.')),
      h3('Pigmentation Research'),
      p(t('Dose-escalation studies demonstrated reliable UV-independent tanning with repeated dosing. The pigmentation is qualitatively similar to solar tanning (eumelanin-dominant) and persists for weeks after cessation. Research in fair-skinned subjects showed up to Fitzpatrick scale improvement of 1–2 points.')),
      h3('Appetite and Body Composition'),
      p(t('MC4R agonism reduces food intake in rodent models; human data is limited but suggests transient appetite suppression. No dedicated human trials on body composition have been completed with MT-II specifically, though the related compound setmelanotide (MC4R-biased agonist) is FDA-approved for rare obesity syndromes.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('MT-II has the most thoroughly characterized adverse effect profile of the melanocortin peptides due to its human clinical trial history. Its non-selectivity across MCRs is responsible for the breadth of side effects.')),
      h3('Common Adverse Effects'),
      ul(
        'Nausea and vomiting: most common dose-limiting effect; occurs in up to 80% at higher doses; mediated by central MC3R/MC4R and area postrema',
        'Spontaneous erections: expected pharmacological effect; can be unwanted',
        'Facial flushing: vasodilatory MC receptor effects; transient, dose-dependent',
        'Yawning: MC4R-mediated, common sentinel sign of activity',
        'Fatigue and somnolence: reported in clinical trials',
        'Stretching and pandiculation: characteristic melanocortinergic behavior observed in animal models and humans',
      ),
      h3('Pigmentation and Melanocytic Concerns'),
      p(t('The most significant safety concern with chronic MT-II use is potential stimulation of melanocytic proliferation. MCR agonism promotes melanocyte activity, and there are theoretical concerns about nevi (mole) darkening and proliferation. Several case reports describe rapid darkening of existing nevi and appearance of new nevi with repeated MT-II use. There are also isolated case reports of melanoma emergence, though causal attribution is impossible without controlled data. Individuals with atypical moles or melanoma risk factors should exercise particular caution.')),
      h3('Cardiovascular'),
      p(t('Transient blood pressure elevation has been reported, likely from peripheral vascular MC receptor activation. No serious cardiovascular events have been attributed to MT-II in controlled trials.')),
      h3('Regulatory and Legal Status'),
      p(t('MT-II has never received regulatory approval in any jurisdiction. It is a research compound only. Importation, sale for human use, and administration without medical supervision is illegal in most countries. The successor compound bremelanotide (PT-141) received FDA approval for hypoactive sexual desire disorder (HSDD) in premenopausal women in 2019, and represents the regulated clinical alternative.')),
    ),
  },

  // ── Liraglutide ───────────────────────────────────────────────────────────
  'liraglutide': {
    mechanismOfAction: lex(
      p(t('Liraglutide is a long-acting acylated GLP-1 receptor agonist developed by Novo Nordisk that shares 97% sequence homology with native human GLP-1(7-37). A C16 fatty acid chain attached via a glutamic acid linker to Lys26 enables reversible albumin binding, dramatically extending half-life and enabling once-daily subcutaneous dosing.')),
      h3('GLP-1 Receptor Signaling'),
      p(t('Liraglutide binds the GLP-1 receptor (GLP-1R), a class B G protein-coupled receptor expressed across multiple tissues. Receptor engagement activates Gαs, elevating intracellular cAMP and activating PKA and EPAC2 effectors:')),
      ul(
        'Pancreatic β-cells: glucose-dependent insulin secretion amplification; inhibition of glucagon secretion from α-cells',
        'Gastric: delayed gastric emptying, reducing postprandial glucose excursions',
        'Brain: hypothalamic GLP-1R activation suppresses appetite via arcuate nucleus POMC/CART neurons; area postrema GLP-1R mediates satiety signals',
        'Heart: direct cardioprotective signaling via cardiac GLP-1R (cAMP-dependent)',
        'Liver: indirect reduction of hepatic glucose output via insulin/glucagon ratio improvement',
      ),
      h3('Weight Regulation'),
      p(t('At the pharmacological doses used in obesity treatment (3 mg/day; Saxenda), liraglutide engages central GLP-1R in the arcuate nucleus and nucleus tractus solitarius, reducing appetite and increasing satiety. The weight loss mechanism is predominantly central rather than peripheral, distinguishing it from purely metabolic approaches.')),
      h3('Differentiation from Native GLP-1'),
      p(t('Native GLP-1 is rapidly inactivated by dipeptidyl peptidase-4 (DPP-4) with a plasma half-life of ~2 minutes. The Arg34Lys substitution in liraglutide eliminates the primary DPP-4 cleavage site, and albumin binding provides steric protection, yielding a half-life of ~13 hours.')),
    ),
    pharmacokinetics: lex(
      p(t('Liraglutide\'s pharmacokinetics are defined by its albumin-binding fatty acid tail, which creates a slow-release depot effect from the subcutaneous injection site.')),
      h3('Key Parameters'),
      ul(
        'Route: subcutaneous injection only (oral bioavailability negligible)',
        'Bioavailability: ~55% absolute from subcutaneous administration',
        'Tmax: 8–12 hours post-injection',
        'Half-life: approximately 13 hours, enabling once-daily dosing',
        'Volume of distribution: ~11–17 L (low; albumin-bound, largely intravascular)',
        'Protein binding: >98% (albumin)',
      ),
      h3('Dosing Regimens'),
      ul(
        'Type 2 diabetes (Victoza): starting 0.6 mg/day × 1 week, up to 1.8 mg/day',
        'Obesity (Saxenda): escalation from 0.6 mg/day weekly to 3.0 mg/day target',
        'Steady state achieved within 3–5 days',
        'No dose adjustment needed for mild-moderate renal impairment',
      ),
      h3('Metabolism and Excretion'),
      p(t('Liraglutide is metabolized endogenously through general protein catabolism pathways — primarily peptide bond hydrolysis — rather than CYP450 enzymes, minimizing drug-drug interactions. Metabolites are excreted via urine (~45%) and feces (~32%); less than 6% of dose is excreted unchanged.')),
    ),
    researchFindings: lex(
      p(t('Liraglutide has one of the most robust clinical evidence bases in the GLP-1 receptor agonist class, with large-scale cardiovascular outcomes trials, dedicated obesity studies, and regulatory approval in multiple indications.')),
      h3('LEADER Trial — Cardiovascular Outcomes'),
      p(t('The Liraglutide Effect and Action in Diabetes: Evaluation of Cardiovascular Outcome Results (LEADER) trial enrolled 9,340 patients with T2DM and high cardiovascular risk. Liraglutide demonstrated a 13% relative reduction in the primary composite endpoint of major adverse cardiovascular events (MACE: CV death, non-fatal MI, non-fatal stroke) versus placebo (HR 0.87, 95% CI 0.78–0.97, p<0.001 for non-inferiority; p=0.01 for superiority). CV mortality was reduced by 22%.')),
      h3('SCALE Obesity and Pre-diabetes Trial'),
      p(t('At 3 mg/day dosing, 3,731 non-diabetic obese or overweight subjects lost a mean of 8.4 kg over 56 weeks vs 2.8 kg for placebo (p<0.001). 63% of liraglutide patients achieved ≥5% weight loss versus 27% of placebo. Conversion from pre-diabetes to T2DM was reduced by 80%.')),
      h3('HbA1c Reduction'),
      p(t('In T2DM populations, liraglutide 1.8 mg reduces HbA1c by 1.0–1.5% from baseline, with weight loss of 2–3 kg at therapeutic doses. Hypoglycemia risk is low as insulin release is strictly glucose-dependent.')),
      h3('Non-Alcoholic Steatohepatitis (NASH)'),
      p(t('The LEAN trial showed liraglutide 1.8 mg reduced histological NASH activity score and promoted fibrosis resolution in 39% of treated vs 9% of placebo patients — the first pharmacological agent to show liver histology improvement in NASH, though no dedicated FDA approval has been sought.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Liraglutide has a well-defined safety profile established across tens of thousands of patients in clinical trials and real-world pharmacovigilance data spanning over a decade.')),
      h3('Gastrointestinal — Most Common'),
      ul(
        'Nausea: 28–40% during initial dose escalation; typically transient and self-limiting',
        'Vomiting: 10–15%',
        'Diarrhea: 12–17%',
        'Constipation: 10%',
        'GI symptoms peak in first 4–8 weeks and diminish as tolerance develops; slow dose escalation minimizes GI burden',
      ),
      h3('Pancreatitis — Black Box Warning'),
      p(t('A potential signal for pancreatitis emerged in early post-marketing data. All GLP-1 RAs carry an FDA black box warning for pancreatitis risk. The absolute rate is low (0.2–0.3%), but liraglutide should be discontinued if pancreatitis is suspected and avoided in patients with prior pancreatitis.')),
      h3('Thyroid C-Cell Tumors — Black Box Warning'),
      p(t('Rodent studies (rats and mice) showed dose- and duration-dependent thyroid C-cell hyperplasia and medullary thyroid carcinoma (MTC) with liraglutide. This finding is believed to be rodent-specific as human thyroid C-cells express GLP-1R at much lower density. Nevertheless, liraglutide is contraindicated in patients with personal or family history of MTC or Multiple Endocrine Neoplasia type 2 (MEN 2).')),
      h3('Gallbladder'),
      p(t('Increased risk of cholelithiasis (gallstones) and cholecystitis has been observed, likely related to altered bile composition and gallbladder motility during rapid weight loss. Risk is estimated at approximately 2× compared to non-treated obese controls.')),
      h3('Heart Rate'),
      p(t('Liraglutide increases resting heart rate by 2–3 bpm on average — a class effect of GLP-1 RAs. Clinical significance is unclear; no increase in cardiac events has been observed, but monitoring is recommended in patients with arrhythmia history.')),
    ),
  },

  // ── Oxytocin ──────────────────────────────────────────────────────────────
  'oxytocin': {
    mechanismOfAction: lex(
      p(t('Oxytocin is a cyclic nonapeptide neuropeptide (Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH₂) synthesized in magnocellular neurons of the hypothalamic paraventricular nucleus (PVN) and supraoptic nucleus (SON), then transported axonally to the posterior pituitary for systemic release, and locally released from dendrites and axon collaterals throughout the central nervous system.')),
      h3('Oxytocin Receptor (OXTR) Signaling'),
      p(t('The oxytocin receptor is a class A GPCR expressed in the uterus, mammary gland, brain, heart, kidney, and immune cells. Coupling to Gαq/11 activates phospholipase C → IP3/DAG → intracellular Ca²⁺ release and PKC activation. In select tissues, coupling to Gαi reduces cAMP and activates MAPK cascades. Key downstream effects include:')),
      ul(
        'Uterus: myometrial contraction via Ca²⁺/calmodulin-dependent myosin light-chain kinase',
        'Mammary gland: myoepithelial cell contraction driving milk ejection',
        'Brain: modulation of limbic circuits controlling social recognition, pair bonding, fear, and stress',
        'HPA axis: inhibition of corticotropin-releasing hormone (CRH) and ACTH release, reducing cortisol',
        'Autonomic: parasympathetic facilitation, reducing blood pressure and heart rate variability',
      ),
      h3('Social Behavior Neural Circuitry'),
      p(t('Oxytocinergic projections from the PVN innervate the amygdala, hippocampus, nucleus accumbens, and prefrontal cortex. In the amygdala, oxytocin reduces threat-related neural activity, decreasing fear responses and increasing approach behavior. In the nucleus accumbens, oxytocin potentiates dopaminergic reward signaling, reinforcing prosocial contact. These circuits underlie oxytocin\'s role in pair bonding, parental behavior, and trust.')),
      h3('Endogenous Release Triggers'),
      p(t('Physiological oxytocin release is triggered by: uterine distension during labor, suckling (Ferguson reflex), sexual activity, skin touch and warmth, and positive social interaction. Central oxytocin release is distinct from peripheral pituitary release and can occur independently.')),
    ),
    pharmacokinetics: lex(
      p(t('Oxytocin\'s pharmacokinetics are constrained by its peptide nature and rapid peripheral clearance. Central access after peripheral administration is limited by its hydrophilicity and the blood-brain barrier, which has major implications for interpreting human research.')),
      h3('Routes and Half-Life'),
      ul(
        'Intravenous (clinical obstetric use): half-life 1–6 minutes; rapid onset uterotonic effect',
        'Intranasal: bioavailability 3–8% central; Tmax 30–60 minutes; most human behavioral research uses this route (24–40 IU)',
        'Subcutaneous/intramuscular: half-life ~10–15 min; used in obstetrics',
        'Oral: essentially 0% bioavailability; degraded by GI peptidases',
      ),
      h3('Central vs. Peripheral'),
      p(t('The critical pharmacokinetic debate concerns whether intranasally administered oxytocin reaches the brain in sufficient concentrations to produce central effects. Some studies using CSF sampling in primates suggest limited penetration; others using indirect markers (pupil dilation, salivary cortisol) suggest functional central engagement. The controversy shapes interpretation of human behavioral studies.')),
      h3('Distribution'),
      ul(
        'Plasma protein binding: low (~30%)',
        'Metabolized by oxytocinase (placenta, liver, kidney) and nonspecific peptidases',
        'Primarily renal excretion of metabolites',
        'Endogenous half-life in blood: approximately 3–5 minutes',
      ),
    ),
    researchFindings: lex(
      p(t('Oxytocin has generated over 1,000 controlled human studies spanning social cognition, psychiatric disorders, reproductive medicine, and cardiology — making it one of the most extensively investigated neuropeptides.')),
      h3('Social Cognition and Trust'),
      p(t('The landmark Kosfeld et al. (2005, Nature) study using the "trust game" paradigm showed that intranasal oxytocin significantly increased investors\' monetary trust toward human — but not computer — trustees, establishing the first evidence for oxytocin\'s role in human social trust. Subsequent replications have been mixed, raising questions about effect size and context dependency.')),
      h3('Autism Spectrum Disorder'),
      p(t('Multiple Phase II/III RCTs have investigated intranasal oxytocin for ASD core symptoms (social cognition, emotion recognition). A large NIH-funded multicenter trial (YATES, 2021) in children with ASD found no significant improvement on the primary social cognition endpoint, despite earlier positive signals. The evidence base remains inconclusive and context-dependent.')),
      h3('Anxiety and PTSD'),
      p(t('Oxytocin reduces amygdala reactivity to threat stimuli in imaging studies and reduces self-reported anxiety in social threat paradigms. Preliminary clinical data in PTSD show reduced fear response and improved social engagement, supporting further investigation as an adjunct to psychotherapy.')),
      h3('Pair Bonding and Romantic Relationships'),
      p(t('Studies by Scheele et al. demonstrated that oxytocin increases the perceived attractiveness of and approach motivation toward a partner\'s face (vs. strangers) in coupled men, and reduces reward-circuit activation in response to attractive strangers — supporting a role in relationship maintenance and fidelity signaling.')),
      h3('Obstetric Medicine'),
      p(t('Synthetic oxytocin (Pitocin, Syntocinon) is one of the most widely used obstetric drugs globally: labor induction, augmentation, prevention of postpartum hemorrhage. The evidence base for these indications is extensive and constitutes the most robust clinical application.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Exogenous oxytocin\'s safety profile differs substantially between obstetric IV use (well-characterized from decades of use) and the intranasal doses used in behavioral research (40 IU = ~80 ng, much lower systemic exposure).')),
      h3('Intranasal Research Doses'),
      ul(
        'Generally well tolerated in healthy adults at 24–40 IU doses',
        'Mild nasal irritation or discomfort at administration site',
        'No serious adverse events attributable to oxytocin in published behavioral studies at these doses',
        'Potential for transient anxiety or distress in some individuals (social anxiety, trauma history) — context-dependent',
      ),
      h3('High-Dose Obstetric Use'),
      ul(
        'Antidiuretic effect (structural similarity to vasopressin): water retention, hyponatremia with prolonged high-dose IV infusion — can be severe',
        'Uterine hyperstimulation: tachysystole causing fetal heart rate decelerations; risk of uterine rupture at very high doses',
        'Nausea and vomiting with IV bolus dosing',
        'Maternal hypotension with rapid IV administration',
      ),
      h3('Psychological Effects — Nuances'),
      p(t('Contrary to the "love hormone" popular narrative, research shows oxytocin\'s effects are highly context-dependent and can amplify both positive and negative social signals. In individuals with BPD, social anxiety, or insecure attachment, oxytocin administration has increased jealousy, envy, and in-group favoritism while increasing out-group hostility. Oxytocin is not universally prosocial.')),
      h3('Regulatory Status'),
      p(t('Synthetic oxytocin is an FDA-approved prescription drug for labor induction and postpartum hemorrhage. Intranasal oxytocin formulations are investigational (no approved indication in the US). Nasal sprays sold online for "social enhancement" are largely unregulated and of unverified purity and dosing.')),
    ),
  },

  // ── MOD-GRF 1-29 ──────────────────────────────────────────────────────────
  'mod-grf-1-29': {
    mechanismOfAction: lex(
      p(t('MOD-GRF 1-29, also called CJC-1295 without DAC, is a 29-amino acid analogue of growth hormone-releasing hormone (GHRH) with four amino acid substitutions that confer protease resistance and receptor selectivity while preserving the full GH-stimulating activity of the native GHRH sequence.')),
      h3('Substitutions and Their Effects'),
      ul(
        'Tyr1→D-Ala1: blocks DPP-IV cleavage at position 2, the primary inactivation site of native GHRH',
        'Arg2 (retained): critical for GHRH-R binding',
        'Ala8→Gln8 (or Ser8 in some formulations): protease resistance',
        'Asn15→Ala15: improves stability without compromising receptor affinity',
        'Leu27→Met27: enhances binding selectivity for the pituitary GHRH-R',
      ),
      h3('GHRH Receptor Signaling'),
      p(t('MOD-GRF 1-29 binds the GHRH receptor (GHRHR), a class B GPCR expressed almost exclusively on pituitary somatotroph cells. Binding activates Gαs → adenylyl cyclase → cAMP → PKA, which:')),
      ul(
        'Phosphorylates CREB, driving GH gene transcription',
        'Activates voltage-gated Ca²⁺ channels, triggering GH granule exocytosis',
        'Stimulates somatotroph proliferation with chronic exposure',
        'Synergizes powerfully with GHRPs at GHSR-1a (distinct receptor) to amplify GH pulse amplitude by up to 10-fold versus either peptide alone',
      ),
      h3('Pulsatile vs. Continuous Stimulation'),
      p(t('A critical mechanistic concept: MOD-GRF 1-29 mimics a natural GHRH pulse when used at appropriate timing. Unlike CJC-1295 with DAC (which creates sustained GHRH receptor occupancy and risks desensitization), MOD-GRF 1-29\'s short duration (30–60 min biological effect) preserves the pulsatile GH secretion pattern that characterizes normal physiology. This preserves somatotroph sensitivity and maintains IGF-1 within physiological patterns.')),
    ),
    pharmacokinetics: lex(
      p(t('MOD-GRF 1-29 occupies a middle ground between the 2-minute half-life of native GHRH(1-44) and the multi-day half-life of CJC-1295-DAC, making it the most physiologically mimetic GHRH analogue for research purposes.')),
      h3('Key PK Parameters'),
      ul(
        'Route: subcutaneous injection (primary research route)',
        'Half-life: approximately 30 minutes (vs. ~2 min for native GHRH; vs. ~6–8 days for CJC-1295 with DAC)',
        'Tmax of GH peak: approximately 15–30 minutes post-injection',
        'GH pulse duration: 60–90 minutes',
        'Bioavailability: estimated >70% subcutaneous in rodent models; human data limited',
      ),
      h3('GH Response Amplitude'),
      p(t('MOD-GRF 1-29 alone produces modest GH pulses above baseline. In combination with a GHRP (ipamorelin, GHRP-6, GHRP-2, or hexarelin), GH release is synergistically amplified. The combination exploits two independent receptor pathways simultaneously, producing GH pulses that can reach 10–20× the magnitude of either peptide alone — the mechanistic basis for its near-universal co-administration with GHRPs in research protocols.')),
      h3('Timing Considerations'),
      p(t('Co-administration timing with GHRPs is critical. Both peptides should be injected simultaneously or within minutes of each other to engage somatotrophs during the same window. Pre-injection fasting of 2 hours optimizes GH response by minimizing somatostatin suppression from elevated blood glucose and free fatty acids.')),
    ),
    researchFindings: lex(
      p(t('MOD-GRF 1-29 lacks dedicated human clinical trials under that name. Human pharmacology data comes from studies on its structural predecessors (GHRH 1-29, Sermorelin) and the analogous CJC-1295 framework. Its use in research contexts is primarily as a physiologically mimetic GHRH source.')),
      h3('GHRH Analogue Lineage Evidence'),
      p(t('Research establishing MOD-GRF 1-29\'s likely utility draws from: (1) Sermorelin human clinical data demonstrating pulsatile GH restoration in GH-deficient adults; (2) CJC-1295 human pharmacology confirming the value of protease-resistant GHRH analogues; (3) Combination GHRH + GHRP synergy studies confirming up to 10× amplification of GH pulse amplitude vs monotherapy.')),
      h3('Combination Protocol Research'),
      p(t('Animal studies directly testing MOD-GRF 1-29 + ipamorelin combinations show: robust GH pulse induction, preservation of pituitary sensitivity with repeated dosing (in contrast to desensitization seen with continuous GHRH), physiological IGF-1 elevation proportionate to GH stimulation, and improved body composition markers (lean mass gain, fat reduction) in models of GH deficiency.')),
      h3('Age-Related GH Decline'),
      p(t('GHRH analogue research broadly shows that somatotroph responsiveness is preserved with aging — the decline in GH with age reflects reduced GHRH pulse amplitude and increased somatostatin tone, not intrinsic somatotroph failure. This supports GHRH analogue utility in adult GH deficiency and age-related GH insufficiency research.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('MOD-GRF 1-29 has a safety profile inferred from its structural relatives and the general class pharmacology of GHRH analogues. No dedicated safety database exists for MOD-GRF 1-29 specifically in humans.')),
      h3('Expected Class Effects'),
      ul(
        'Transient facial flushing and warmth at injection site: mild, dose-dependent, resolves within 30 minutes',
        'Water retention: GH-mediated; can cause temporary edema particularly with high-dose protocols',
        'Tingling or paresthesias: peripheral GH effect on nerve conduction; typically mild',
        'Transient hypoglycemia: GH-mediated insulin antagonism may initially reduce glucose; followed by rebound insulin resistance with chronic supraphysiological GH',
        'Headache: relatively uncommon; resolved with dose reduction',
      ),
      h3('Somatotroph Axis Considerations'),
      p(t('Unlike CJC-1295 with DAC, MOD-GRF 1-29\'s short half-life preserves pulsatile pituitary stimulation patterns and avoids the hypothalamic-pituitary axis downregulation that can occur with sustained GHRH receptor occupancy. Somatotroph desensitization is theoretically less likely, though long-term human data are absent.')),
      h3('Contraindications (Class-Based)'),
      ul(
        'Active malignancy: GH and IGF-1 elevation can promote proliferation; contraindicated',
        'Diabetic retinopathy: exacerbation risk with IGF-1 elevation',
        'Acromegaly or gigantism: do not administer',
        'Pregnancy: avoid; no safety data',
      ),
      h3('Regulatory Status'),
      p(t('MOD-GRF 1-29 is an unapproved research compound. No regulatory body has granted approval. Sermorelin (GHRH 1-29) has historical FDA approval for pediatric GH deficiency diagnostic use and is compounded for adults by licensed pharmacies in the US under physician supervision. MOD-GRF 1-29 as a research chemical is unregulated.')),
    ),
  },

  // ── Follistatin-344 ───────────────────────────────────────────────────────
  'follistatin-344': {
    mechanismOfAction: lex(
      p(t('Follistatin-344 (FST344) is the predominant isoform of follistatin, a monomeric glycoprotein produced by pituitary folliculostellate cells, gonadal granulosa cells, and many peripheral tissues. The 344-amino acid isoform is the primary circulating form; a 288-amino acid variant (FST288) is largely tissue-bound and locally acting. Follistatin functions as a high-affinity binding protein that sequesters and neutralizes TGF-β superfamily ligands.')),
      h3('Activin and Myostatin Antagonism'),
      p(t('Follistatin\'s primary research interest rests on its capacity to potently neutralize two ligands with opposing roles in muscle mass regulation:')),
      ul(
        'Myostatin (GDF-8): the primary negative regulator of skeletal muscle mass; binds ActRIIB → ALK4/5 → SMAD2/3 signaling to suppress myogenesis and promote atrophy. FST344 binds myostatin with Kd ~50–100 pM, preventing receptor engagement and reversing its catabolic signal',
        'Activin A and B: TGF-β family members that also engage ActRIIB and suppress muscle growth; FST344 neutralizes activins at sub-nanomolar affinity',
        'GDF-11: structurally related to myostatin; FST344 partially antagonizes GDF-11, relevant to aging research',
        'BMP-2, -4, -7: follistatin neutralizes bone morphogenetic proteins at lower affinity, relevant to bone and adipose regulation',
      ),
      h3('Downstream Muscle Effects'),
      p(t('Myostatin neutralization releases SMAD2/3 suppression, derepressing the PI3K/Akt/mTOR pathway in muscle cells. The net result is: increased satellite cell (muscle stem cell) activation, enhanced myoblast proliferation and differentiation, increased protein synthesis via mTORC1, and reduced protein degradation via decreased FOXO-mediated atrogene expression. In animal models, this produces significant muscle hypertrophy — in some gene overexpression models, 2–3× normal muscle mass.')),
      h3('Reproductive and Endocrine Actions'),
      p(t('Follistatin is the primary physiological antagonist of activin in the hypothalamic-pituitary-gonadal axis. Activin stimulates FSH release from the pituitary; follistatin neutralizes activin to modulate FSH pulsatility and ovarian follicle development. Exogenous follistatin administration disrupts this axis, suppressing FSH — a consideration in any research protocol.')),
    ),
    pharmacokinetics: lex(
      p(t('Follistatin-344 is a 35 kDa glycoprotein whose pharmacokinetics reflect both its protein nature and its tendency to bind heparan sulfate proteoglycans on cell surfaces, sequestering it near sites of synthesis.')),
      h3('Key Parameters'),
      ul(
        'Route: subcutaneous or intramuscular injection (protein; oral bioavailability zero)',
        'Half-life: approximately 30–60 minutes in plasma (shorter than expected due to HSPG binding and rapid receptor-mediated clearance)',
        'Volume of distribution: complex; much of FST is sequestered in tissues bound to HSPGs',
        'Binding targets: myostatin, activins, BMPs, and cell-surface HSPGs all act as distribution sinks',
        'Clearance: primarily hepatic; some renal clearance of smaller metabolites',
      ),
      h3('Bioavailability Challenges'),
      p(t('The short plasma half-life of FST344 raises questions about the duration of myostatin neutralization following injection. Tissue-bound follistatin likely extends the biological effect window beyond what plasma kinetics suggest. Gene therapy approaches (AAV-mediated FST delivery) have been explored in clinical research specifically to overcome the pharmacokinetic limitations of recombinant protein administration.')),
      h3('Dose Considerations'),
      p(t('Human research doses are not established in controlled trials. Animal studies use a range of 0.1–10 μg/kg. Recombinant follistatin is expensive to produce, limiting dose-escalation studies. Reported research use in humans ranges from 100 μg to 1 mg/injection, but without PK validation in humans, dose-response relationships are speculative.')),
    ),
    researchFindings: lex(
      p(t('Follistatin research spans basic muscle biology, gene therapy for muscular dystrophy, and recent early-phase human trials. The animal data is exceptional; human evidence is early-stage.')),
      h3('Myostatin Knockout and FST Overexpression Models'),
      p(t('Mice lacking myostatin (mstn−/−) exhibit muscle mass 2× normal. Transgenic mice overexpressing follistatin in muscle show muscle mass up to 3× normal without adverse effects on neuromuscular function. These "mighty mouse" models established the myostatin/follistatin axis as the dominant regulator of skeletal muscle mass in mammals and sparked intense pharmaceutical interest.')),
      h3('Nonhuman Primate and Canine Studies'),
      p(t('AAV-delivered follistatin (specifically FST344) injected into specific muscle groups of cynomolgus monkeys (Rodino-Klapac et al., 2009) produced robust local muscle hypertrophy (+15–25% volume) sustained for months without systemic adverse effects or inflammatory response. Similar gene therapy in Golden Retrievers with Duchenne muscular dystrophy (DMD) showed functional muscle improvement and limb strength gains.')),
      h3('Human Phase I/II Trials — DMD and IBM'),
      p(t('Ohio State University conducted Phase I/II trials of AAV1-FST344 intramuscular injection in subjects with Becker muscular dystrophy (BMD) and limb girdle MD. Results showed dose-dependent muscle hypertrophy at injection sites assessed by MRI, improved 6-minute walk test performance, and no serious adverse events attributable to follistatin. Similar trials in sporadic inclusion body myositis (sIBM) showed leg press strength improvement after 3 years (Mendell et al., 2015, Molecular Therapy).')),
      h3('Follistatin and Satellite Cells'),
      p(t('Beyond mass, follistatin enhances regenerative capacity by expanding satellite cell pools. In aged rodents with reduced satellite cell numbers and regenerative capacity, follistatin gene delivery restored satellite cell counts and improved recovery from injury — suggesting applications in age-related sarcopenia.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Follistatin\'s safety profile must be considered in the context of its broad TGF-β family antagonism and its potent effects on the reproductive axis. The gene therapy data provides the most relevant human safety information.')),
      h3('Reproductive Axis Suppression'),
      p(t('Follistatin\'s neutralization of activin suppresses FSH release. In women, this could disrupt ovarian folliculogenesis and menstrual cycling. In men, activin normally supports spermatogenesis; follistatin excess theoretically impairs sperm production. Follistatin transgenic mice show impaired fertility. This is the primary concern for chronic or systemic use.')),
      h3('Oncogenic Potential'),
      p(t('Follistatin is overexpressed in multiple cancers (breast, prostate, ovarian, melanoma) and appears to contribute to tumor progression by neutralizing activin\'s tumor-suppressive effects and facilitating evasion of immune surveillance via BMP antagonism. Exogenous follistatin administration in cancer-prone individuals is theoretically concerning, though causality in humans is not established.')),
      h3('BMP Pathway Suppression'),
      p(t('BMP inhibition by follistatin affects bone formation, adipogenesis, and vascular calcification. Long-term systemic follistatin excess could theoretically impair BMP-mediated bone remodeling, though localized intramuscular gene therapy has not shown bone density changes.')),
      h3('Observed Safety in Gene Therapy Trials'),
      ul(
        'No treatment-related serious adverse events in published Phase I/II trials (AAV1-FST344, intramuscular)',
        'Mild transient elevation of liver enzymes in some participants (AAV vector, not FST-specific)',
        'No systemic follistatin elevation (confirming localized expression with IM delivery)',
        'No reproductive endocrine disruption detected in trial participants (monitoring limited)',
      ),
      h3('Recombinant Protein vs. Gene Therapy Safety'),
      p(t('Research chemical use (recombinant FST344 injection) is uncharacterized in humans. The systemic distribution, immune response to exogenous recombinant protein, and reproductive axis effects are unquantified. This represents a substantially different and less controlled exposure profile than the localized gene therapy approach used in clinical trials.')),
    ),
  },

  // ── LL-37 ─────────────────────────────────────────────────────────────────
  'll-37': {
    mechanismOfAction: lex(
      p(t('LL-37 is a 37-amino acid cationic antimicrobial peptide (AMP) derived from the C-terminus of the human cathelicidin protein hCAP-18. It is the only cathelicidin in humans and is produced by neutrophils, macrophages, monocytes, mast cells, and epithelial cells of the skin, lung, and gut. The name reflects its two N-terminal leucines (LL) and its total length (37 residues).')),
      h3('Direct Antimicrobial Activity'),
      p(t('LL-37\'s mechanism against microorganisms exploits electrostatic interactions between its net +6 positive charge and negatively charged microbial membranes:')),
      ul(
        'Membrane disruption: LL-37 adopts an amphipathic α-helical structure upon contact with lipid bilayers; inserts into and disrupts bacterial membranes via carpet-like membrane solubilization or toroidal pore formation',
        'Broad-spectrum activity: gram-positive bacteria (S. aureus, S. pyogenes), gram-negative bacteria (E. coli, P. aeruginosa), fungi (C. albicans), enveloped viruses (HSV, HIV, influenza), and certain parasites',
        'Biofilm disruption: LL-37 inhibits biofilm formation and degrades existing biofilms through LPS neutralization and quorum-sensing interference',
        'Low resistance development: membrane-targeting mechanism is less susceptible to resistance evolution than antibiotic targets (enzymes, ribosomes)',
      ),
      h3('Immunomodulatory Functions'),
      p(t('Beyond direct killing, LL-37 is a potent immunomodulator that orchestrates innate and adaptive immune responses:')),
      ul(
        'Chemokine induction: stimulates CCL2, CXCL8 (IL-8), and CXCL10 release, recruiting neutrophils, monocytes, and T cells to infection sites',
        'TLR modulation: inhibits TLR4/MyD88 signaling (reducing LPS-driven inflammation) while potentiating TLR9 signaling (nucleic acid sensing)',
        'Dendritic cell maturation: promotes DC differentiation and antigen presentation capacity',
        'NET formation: induces neutrophil extracellular traps (NETs) contributing to pathogen clearance',
        'Wound healing: activates EGF receptor, EGFR/ERK/AP-1 pathway → keratinocyte migration and proliferation; stimulates angiogenesis via VEGF and FGF2 upregulation',
      ),
      h3('Receptor Interactions'),
      p(t('LL-37 engages multiple mammalian receptors including formyl peptide receptor-like 1 (FPRL1/FPR2), P2X7, EGFR, and TLR3/4. These interactions mediate its immunomodulatory and wound-healing functions and differentiate it from simple membrane-disrupting AMPs.')),
    ),
    pharmacokinetics: lex(
      p(t('LL-37\'s pharmacokinetics in humans are not thoroughly characterized due to the absence of approved pharmaceutical formulations. Data derives from research studies, topical applications, and inference from structural analogues.')),
      h3('Stability Challenges'),
      ul(
        'Serum half-life: short — LL-37 is susceptible to proteolytic degradation by tissue kallikreins, trypsin-like enzymes, and metalloproteinases; estimated t½ <30 min in plasma',
        'Salt sensitivity: antimicrobial activity is significantly attenuated at physiological NaCl concentrations (150 mM), raising questions about efficacy in certain anatomical compartments',
        'Protein binding: LL-37 binds plasma proteins (albumin, lipoproteins) and DNA, which reduces free concentration',
        'Aggregation: tendency to aggregate at higher concentrations, affecting bioavailability',
      ),
      h3('Routes and Local Concentrations'),
      ul(
        'Topical application: under investigation for wound care and dermatological conditions; local concentrations can be maintained above MIC',
        'Subcutaneous injection: used in research; systemic bioavailability and distribution poorly characterized',
        'Intranasal: explored for respiratory infection prophylaxis',
        'Endogenous levels: 1–5 μg/mL in wound fluid; elevated in psoriatic skin; nearly absent in chronic non-healing wounds (where supplementation may be rationale)',
      ),
      h3('Analogues to Improve PK'),
      p(t('Multiple LL-37 analogues (P60.4Ac, SAAP-148, OP-145) have been engineered to improve salt stability, reduce cytotoxicity, and maintain antimicrobial potency at physiological conditions — representing the translational response to LL-37\'s inherent PK limitations.')),
    ),
    researchFindings: lex(
      p(t('LL-37 research has expanded dramatically as antibiotic resistance has increased interest in host defense peptides. Research spans infectious diseases, wound healing, inflammatory conditions, and cancer biology.')),
      h3('Wound Healing'),
      p(t('LL-37 is deficient in chronic non-healing wounds (diabetic foot ulcers, venous leg ulcers). Topical LL-37 application in diabetic wound models restores keratinocyte migration, accelerates re-epithelialization, and increases neovascularization. A Phase II trial of topical LL-37 (Genta Inc., SAAP-148) in venous leg ulcers showed improved wound area reduction vs. standard of care, though the evidence base for recombinant LL-37 topicals in humans is still early-stage.')),
      h3('Respiratory Infections'),
      p(t('Vitamin D upregulates cathelicidin/LL-37 production, providing a proposed mechanism for vitamin D\'s epidemiological association with reduced respiratory infection risk. Direct LL-37 supplementation via intranasal delivery reduces viral titers in influenza models. Clinical evidence for direct LL-37 administration in respiratory infections is limited.')),
      h3('Psoriasis and Autoimmunity'),
      p(t('In psoriasis, excess LL-37 released from damaged keratinocytes forms complexes with self-DNA, which then activate TLR9 in plasmacytoid dendritic cells, triggering the type I interferon response that drives psoriatic inflammation. LL-37 paradoxically promotes autoimmunity in this context — a cautionary finding for research applications in inflammatory conditions.')),
      h3('Antimicrobial Resistance Organisms'),
      p(t('LL-37 demonstrates activity against MRSA, carbapenem-resistant Klebsiella pneumoniae, and Pseudomonas aeruginosa biofilms in preclinical models. The synergy between LL-37 and conventional antibiotics (reduced MIC of antibiotics in combination) is a subject of active investigation for combating treatment-resistant infections.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('LL-37\'s safety profile in humans is incompletely characterized. Its activity against both microbial and mammalian membranes is a key safety concern, and its immunomodulatory potency warrants careful consideration.')),
      h3('Cytotoxicity'),
      p(t('LL-37 exhibits concentration-dependent cytotoxicity to human cells, particularly at concentrations above ~10 μg/mL. At therapeutic antimicrobial concentrations (typically 1–10 μg/mL), selectivity for microbial over mammalian membranes is acceptable but not absolute. Hemolysis occurs at higher concentrations. Topical delivery is preferred over systemic to maintain therapeutic windows.')),
      h3('Inflammatory Potential'),
      p(t('As a potent immunostimulatory molecule, systemic LL-37 administration risks amplifying inflammatory cascades. In chronic inflammatory diseases (lupus, psoriasis, rheumatoid arthritis), LL-37 can exacerbate autoimmune pathology by facilitating immune complex formation with nucleic acids and activating innate immune sensors.')),
      h3('Cancer — Dual Role'),
      p(t('LL-37 has documented pro-tumorigenic effects in certain cancers (colon, ovarian, lung cancer cell lines) via EGFR and FPR2 activation, promoting cell survival and invasion. Conversely, it has demonstrated cytotoxic effects in other cancers (leukemia). The net oncological effect is context-dependent, and LL-37 administration to oncology patients should be approached with extreme caution.')),
      h3('Regulatory and Research Status'),
      p(t('No LL-37 product is FDA-approved. Multiple topical formulations and analogues are in clinical trials for wound healing. Systemic administration in humans is experimental and without regulatory approval. Recombinant LL-37 obtained outside of clinical trials is of unverified quality and safety.')),
    ),
  },

  // ── MGF ───────────────────────────────────────────────────────────────────
  'mgf': {
    mechanismOfAction: lex(
      p(t('Mechano Growth Factor (MGF) is a splice variant of the IGF-1 gene produced in response to mechanical load, damage, and exercise in skeletal muscle, cardiac muscle, bone, and brain. It arises from alternative splicing of exon 5 of the IGF-1 pre-mRNA, inserting a 52-nucleotide sequence that creates a unique C-terminal E-domain (Ec peptide in humans; Eb in rodents) and a frame-shifted peptide distinct from the standard Ea isoform (systemic IGF-1).')),
      h3('Unique E-Domain Biology'),
      p(t('The defining feature of MGF is its Ec peptide (C-terminal 24 amino acids: YQPPSTNKNT KSQRRKGSTF EEHK). Research suggests the Ec peptide has biological activity independent of the IGF-1 receptor:')),
      ul(
        'Satellite cell activation: MGF appears to activate muscle stem cells (satellite cells) through a distinct mechanism from mature IGF-1, promoting their proliferation and commitment to myogenesis',
        'Nuclear translocation: some data suggest the Ec domain enters the nucleus to regulate gene expression directly',
        'Unique receptor: preliminary evidence points to an MGF-specific receptor distinct from IGF-1R, though this remains an area of active investigation',
        'Resistance to IGFBP binding: the Ec domain reduces binding to IGF-binding proteins, potentially increasing local bioavailability',
      ),
      h3('IGF-1 Receptor Signaling (Shared N-Terminal Domain)'),
      p(t('MGF shares its N-terminal domain with systemic IGF-1 and can engage IGF-1R → IRS-1/2 → PI3K/Akt/mTOR, driving protein synthesis, glucose uptake, and cell survival. After local proteolytic processing, MGF is cleaved into a mature IGF-1-like fragment and the Ec peptide, each with separate biological functions. This processing may be rate-limiting for MGF\'s anabolic signaling.')),
      h3('Exercise Response'),
      p(t('Mechanical loading stimulates MGF expression in muscle fibers within hours, preceding the later systemic IGF-1 elevation. This temporal sequence suggests MGF mediates the immediate local muscle repair response (satellite cell recruitment) while systemic IGF-1 mediates the longer-term anabolic signal. Local MGF expression correlates with muscle hypertrophy response to resistance training.')),
    ),
    pharmacokinetics: lex(
      p(t('MGF and its synthetic analogue PEG-MGF (pegylated MGF) have very different pharmacokinetic profiles. Native MGF has extremely short plasma stability; pegylation dramatically extends systemic half-life.')),
      h3('Native MGF'),
      ul(
        'Plasma half-life: minutes in systemic circulation; very rapidly degraded by peptidases',
        'Local tissue half-life: longer due to HSPG binding and localized environment',
        'Route: subcutaneous or intramuscular for research; IV degradation too rapid for meaningful systemic effect',
        'Bioavailability: poorly characterized; likely low for systemic targets due to rapid clearance',
      ),
      h3('PEG-MGF (Pegylated Analogue)'),
      ul(
        'Half-life: approximately 48–72 hours (vs. minutes for native MGF)',
        'Pegylation reduces renal clearance and protease susceptibility',
        'Allows systemic delivery to muscle tissue over extended timeframe',
        'Trade-off: pegylation may reduce receptor binding affinity, though biological activity is retained',
      ),
      h3('Research Protocol Timing'),
      p(t('Given MGF\'s short half-life, the theoretical rationale for post-exercise administration is compelling — native MGF should be administered within the anabolic window (0–30 min post-exercise) to coincide with maximal satellite cell responsiveness. PEG-MGF allows more flexible timing. In practice, human pharmacokinetic data for research-grade MGF preparations is absent.')),
    ),
    researchFindings: lex(
      p(t('MGF research is primarily preclinical. Human data are essentially absent, with no published clinical trials. Animal and in vitro evidence is mechanistically rich but extrapolation to humans is uncertain.')),
      h3('Muscle Hypertrophy Animal Studies'),
      p(t('Goldspink et al.\'s foundational work established MGF as the exercise-responsive IGF-1 isoform. Intramuscular injections of MGF cDNA in mice produced 25% muscle hypertrophy over 2 weeks — compared to systemic IGF-1 which produced no hypertrophy when delivered locally. This suggested MGF has superior local muscle anabolic effects compared to systemic IGF-1, and established the concept of local vs. systemic IGF-1 isoform biology.')),
      h3('Aging and Sarcopenia'),
      p(t('MGF expression in response to muscle loading declines significantly with age — older muscles show blunted MGF upregulation after exercise. This may contribute to the progressive loss of satellite cell activation capacity with aging (sarcopenia). Restoration of MGF signaling in aged animals improves satellite cell activation and muscle regeneration. This provides theoretical rationale for MGF research in age-related muscle loss.')),
      h3('Cardiac and Neural Applications'),
      p(t('MGF is expressed in cardiac muscle in response to ischemic injury and may contribute to cardiomyocyte survival. In neural tissue, MGF expression follows injury and may promote neuronal survival via anti-apoptotic signaling. These non-muscle applications are preliminary but represent active research frontiers.')),
      h3('Limitations of Current Data'),
      p(t('The majority of MGF research uses gene delivery (cDNA transfection) rather than peptide injection, making direct translation to recombinant peptide use uncertain. Doses used in animal injection studies are not standardized, and the distinction between effects of the intact MGF sequence vs. the processed Ec peptide alone is not fully resolved.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('MGF lacks any human clinical safety data. Safety considerations are extrapolated from the IGF-1 class and from the specific biology of the MGF splice variant.')),
      h3('IGF-1 Class Risks'),
      ul(
        'Hypoglycemia: shared N-terminal domain engages IGF-1R; risk of insulin-like glucose-lowering',
        'Acromegaly-like effects with supraphysiological IGF-1R activation (cardiomegaly, jaw changes, soft tissue swelling) — less likely with short local half-life of native MGF',
        'Potential for tumor promotion in cancer-susceptible individuals via IGF-1R pathway',
        'Joint pain and edema from fluid retention',
      ),
      h3('Satellite Cell Overactivation'),
      p(t('Excessive satellite cell activation could theoretically lead to myopathy or impaired muscle architecture if the regenerative response is chronically overstimulated without appropriate mechanical loading. Animal models with sustained MGF overexpression have shown muscle fiber architecture disruption in some cases.')),
      h3('Ec Peptide Specifics'),
      p(t('The unique Ec peptide domain has not been independently safety-assessed in humans. Its putative receptor and downstream signaling are incompletely characterized. Theoretical risks from a poorly characterized receptor agonist include unpredictable effects in tissues expressing the putative MGF receptor.')),
      h3('Research Status'),
      p(t('MGF and PEG-MGF are research compounds with no regulatory approval in any jurisdiction. All available formulations are unregulated research chemicals. Human use outside of approved clinical trials is uncharacterized from a safety standpoint.')),
    ),
  },

  // ── MOTS-c ────────────────────────────────────────────────────────────────
  'mots-c': {
    mechanismOfAction: lex(
      p(t('MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a 16-amino acid peptide encoded within the 12S ribosomal RNA gene of the mitochondrial genome — making it one of the first discovered mitochondria-derived peptides (MDPs). It is produced in response to mitochondrial stress and metabolic challenges, functioning as a retrograde signaling molecule from mitochondria to the cytoplasm and nucleus.')),
      h3('Discovery and Mitochondrial Origin'),
      p(t('MOTS-c was discovered by Lee et al. (2015, Cell Metabolism) in a systematic search for small ORFs within the mitochondrial genome. Its existence demonstrated that the mitochondrial genome encodes functional signaling peptides beyond its traditionally recognized OXPHOS subunit genes — a paradigm-shifting finding. MOTS-c is conserved across mammals with high sequence identity, suggesting essential function.')),
      h3('AMPK Activation — Primary Mechanism'),
      p(t('MOTS-c translocates from mitochondria to the cytoplasm and nucleus, where it directly activates AMP-activated protein kinase (AMPK) — the master cellular energy sensor. AMPK activation by MOTS-c:')),
      ul(
        'Increases glucose uptake via GLUT4 translocation (insulin-sensitizing effect)',
        'Stimulates fatty acid oxidation via ACC phosphorylation and CPT1 activation',
        'Inhibits mTORC1 (anti-anabolic at supraphysiological energy states)',
        'Enhances mitochondrial biogenesis via PGC-1α upregulation',
        'Reduces ER stress and oxidative damage via NRF2 pathway activation',
      ),
      h3('Folate-Methionine Cycle Regulation'),
      p(t('MOTS-c inhibits the folate cycle by targeting AICAR transformylase, increasing AICAR (5-aminoimidazole-4-carboxamide ribonucleotide) — an endogenous AMPK activator. This novel mechanism for AMPK activation through metabolite accumulation distinguishes MOTS-c from direct AMPK activators like metformin and constitutes an integrated metabolic-epigenetic regulatory axis.')),
      h3('Nuclear Translocation and Gene Regulation'),
      p(t('Under stress conditions, MOTS-c translocates to the nucleus where it modulates the expression of nuclear-encoded genes involved in stress response, metabolism, and inflammation — fulfilling a transcriptional regulatory role beyond its metabolic AMPK function. This bidirectional organelle-to-nucleus signaling represents a novel regulatory tier.')),
    ),
    pharmacokinetics: lex(
      p(t('MOTS-c is a 16-amino acid peptide with relatively limited pharmacokinetic data in humans. Preclinical data and inference from its molecular properties provide the current understanding.')),
      h3('Key Parameters'),
      ul(
        'Molecular weight: approximately 2.1 kDa (small, facilitating cellular penetration)',
        'Route: intraperitoneal (rodent studies); subcutaneous in human research contexts',
        'Plasma half-life: estimated minutes in circulation; likely rapidly cleared by renal filtration and peptidases',
        'Cellular uptake: MOTS-c enters cells via unknown transporter(s); accumulates in mitochondria and nucleus',
        'Distribution: achieves skeletal muscle, liver, and adipose uptake in animal models',
      ),
      h3('Endogenous MOTS-c'),
      p(t('Endogenous circulating MOTS-c concentrations are detectable in human plasma (~250–500 pg/mL, varying by metabolic status and age). MOTS-c levels decline with age and insulin resistance, and increase acutely with exercise — parallel to other metabolic stress signals. These endogenous dynamics support MOTS-c as a physiological metabolic signaling peptide, not merely a pharmacological curiosity.')),
      h3('Exercise and Circulating MOTS-c'),
      p(t('Aerobic exercise acutely increases plasma MOTS-c in humans, peaking at approximately 30 minutes post-exercise and returning to baseline within 2 hours. Older individuals have lower exercise-induced MOTS-c release. This suggests MOTS-c is part of the "exerkine" response — signaling molecules released during exercise that mediate systemic metabolic adaptation.')),
    ),
    researchFindings: lex(
      p(t('MOTS-c research has grown rapidly since its 2015 discovery. Preclinical data are extensive; human data is emerging. The peptide has attracted significant interest as a potential "exercise mimetic" and longevity compound.')),
      h3('Obesity and Insulin Resistance'),
      p(t('Lee et al. (2015) demonstrated that MOTS-c injections in high-fat diet-fed obese mice prevented obesity, reduced fat accumulation, improved insulin sensitivity, and reversed established insulin resistance — effects comparable to those of moderate aerobic exercise. MOTS-c activated AMPK in skeletal muscle and adipose tissue, enhancing metabolic flexibility without changing food intake.')),
      h3('Exercise Mimicry'),
      p(t('MOTS-c has been explicitly investigated as an "exercise mimetic." In obese mice, MOTS-c+exercise synergistically improved metabolic outcomes beyond either alone. In old sedentary mice, MOTS-c alone partially recapitulated exercise-induced metabolic improvements, particularly in glucose homeostasis and mitochondrial function. This positions MOTS-c research within the emerging field of senescence/sarcopenia intervention.')),
      h3('Aging and Longevity'),
      p(t('Older humans and animals have lower circulating MOTS-c. In mouse aging models, MOTS-c administration extended lifespan and preserved metabolic function. In an analysis of long-lived humans (centenarians), specific MOTS-c gene variants associated with increased mitochondrial MOTS-c expression correlated with exceptional longevity and metabolic health — providing population genetics support for MOTS-c\'s role in longevity.')),
      h3('Type 2 Diabetes'),
      p(t('In streptozotocin-induced T2DM mouse models, MOTS-c restored β-cell function and reduced hyperglycemia. In humans with T2DM, plasma MOTS-c is significantly lower than in metabolically healthy controls. The mechanistic basis (AMPK activation, GLUT4 upregulation, pancreatic β-cell protection) supports early-stage clinical interest in MOTS-c for metabolic disease.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('MOTS-c has no human clinical trial safety data as of the current research literature. Safety assessment is based entirely on animal studies, which show a favorable preliminary profile.')),
      h3('Preclinical Safety'),
      ul(
        'No mortality or severe adverse effects observed in any published mouse or rat MOTS-c study',
        'No evidence of organ toxicity (liver, kidney, heart) in treated animals at studied doses',
        'No hypoglycemia reported despite potent insulin-sensitizing effects (glucose-lowering is AMPK-mediated and not dependent on insulin secretion)',
        'Transient injection site reactions not characterized (not reported)',
      ),
      h3('AMPK Pathway Considerations'),
      p(t('Chronic AMPK activation raises theoretical concerns in specific contexts: AMPK inhibits mTORC1, which is required for muscle protein synthesis — sustained activation without anabolic stimulus might impair muscle hypertrophy adaptations. The net effect on muscle mass vs. metabolic health may require optimized dosing timing relative to exercise and nutrition.')),
      h3('Interaction with Cancer Biology'),
      p(t('AMPK activators (including metformin) have generally favorable profiles in cancer prevention (metabolic antagonism of proliferating cells). However, context-dependent AMPK effects in established tumors are complex. MOTS-c\'s role in tumor biology is unstudied.')),
      h3('Human Research Status'),
      p(t('MOTS-c is not approved for human use in any jurisdiction. A limited number of human studies have measured endogenous MOTS-c levels as a biomarker, but no interventional human trials have been published as of 2026. It is available as a research chemical. Its safety profile in humans is essentially unknown.')),
    ),
  },

  // ── DSIP ──────────────────────────────────────────────────────────────────
  'dsip': {
    mechanismOfAction: lex(
      p(t('Delta Sleep-Inducing Peptide (DSIP) is a nonapeptide (Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu) first isolated from the cerebral venous blood of sleeping rabbits by Schoenenberger et al. in 1977. Despite decades of research, its receptor and canonical signaling mechanism remain incompletely characterized — a notable gap relative to most neuropeptides.')),
      h3('Proposed Mechanisms'),
      p(t('Multiple mechanisms have been proposed but not definitively established for DSIP\'s physiological effects:')),
      ul(
        'Somatostatin modulation: DSIP appears to interact with somatostatin systems, reducing somatostatin release and thereby disinhibiting GH secretion during sleep',
        'GABA-B receptor interactions: some binding studies suggest DSIP modulates GABA-B receptor function in the context of sleep promotion',
        'Hypothalamic-pituitary axis effects: DSIP influences LH, GH, and ACTH secretion patterns, suggesting neuroendocrine regulatory roles beyond direct sleep promotion',
        'Opioid system interaction: DSIP modulates β-endorphin and enkephalin release; some of its analgesic and stress-attenuating effects may be opioid-mediated',
        'Antioxidant and mitochondrial effects: more recent data suggests DSIP scavenges reactive oxygen species and preserves mitochondrial membrane potential',
      ),
      h3('Sleep Architecture Effects'),
      p(t('The original finding — that DSIP induces delta (slow-wave) sleep when administered to rabbits — has not been consistently replicated in later studies using different doses, routes, and species. Current understanding is that DSIP is a neuromodulator of sleep-wake regulation rather than a direct sleep-inducing substance, influencing the balance between delta wave activity and REM sleep in a dose- and context-dependent manner.')),
      h3('Stress Response'),
      p(t('DSIP attenuates stress responses in rodent models, reducing plasma corticosterone elevation following stress challenge. This may involve CRH suppression or direct adrenal effects. The "antistress" profile has driven much of the clinical research interest.')),
    ),
    pharmacokinetics: lex(
      p(t('DSIP\'s pharmacokinetics are complicated by its rapid degradation in plasma and by unusual transport characteristics that allow it to cross the blood-brain barrier.')),
      h3('Key Parameters'),
      ul(
        'Plasma half-life: approximately 2–4 minutes for intact peptide in blood',
        'Blood-brain barrier penetration: DSIP uniquely crosses the BBB via saturable active transport — unusual for a nonapeptide',
        'Routes: IV (clinical studies), subcutaneous (research use), intranasal (investigated)',
        'CSF concentration: detectable after IV administration in animals, supporting CNS delivery',
        'Bioavailability: very low oral (peptidase degradation); parenteral administration required',
      ),
      h3('Metabolites'),
      p(t('Rapid plasma degradation generates DSIP fragments (DSIP-related peptides, DRPs) that may retain some biological activity. The relationship between intact DSIP and its fragments in mediating observed effects is unclear — some researchers suggest that DRPs rather than intact DSIP are the active species in vivo.')),
      h3('DSIP in Cerebrospinal Fluid'),
      p(t('DSIP is naturally present in human CSF at concentrations of approximately 1–2 nM and in plasma at approximately 0.5 nM, with higher levels during non-REM sleep. These endogenous levels suggest a physiological role as a sleep-modulating neuropeptide, though the mechanism of endogenous regulation is unclear.')),
    ),
    researchFindings: lex(
      p(t('DSIP has an interesting but conflicted research history. Initial excitement from the 1970s-1980s has been tempered by reproducibility challenges. A modest body of human clinical research exists, primarily from European centers.')),
      h3('Sleep Studies — Variable Results'),
      p(t('Human sleep studies with DSIP have shown inconsistent results. Some controlled trials in insomnia patients showed improvements in sleep onset latency and total sleep time; others showed no significant effect. A key variable appears to be dose and administration route — IV administration in the evening produced more consistent effects than other routes or timings.')),
      h3('Opiate Withdrawal'),
      p(t('The most consistently positive human data for DSIP concerns opiate withdrawal. A series of Swiss clinical studies (Schoenenberger group, 1980s–1990s) found that IV DSIP administration reduced withdrawal symptom severity in heroin-dependent patients undergoing detoxification, including reductions in anxiety, dysphoria, insomnia, and autonomic symptoms. These findings have not been replicated in large RCTs, limiting their clinical impact.')),
      h3('Depression and Anxiety'),
      p(t('Pilot studies in patients with major depression and anxiety disorders showed improvements in mood and anxiety ratings following DSIP infusion courses. The effect on HPA axis dysregulation in depression (elevated cortisol) provides a mechanistic rationale. Again, no large RCTs have confirmed these findings.')),
      h3('Pain and Epilepsy'),
      p(t('Animal studies suggest DSIP has analgesic properties and anticonvulsant effects. Human data in these areas is essentially absent. The opioid system interactions provide a plausible mechanism for analgesia.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('DSIP has a generally benign safety profile in the limited human studies conducted, with few significant adverse effects reported at research doses.')),
      h3('Observed Adverse Effects in Clinical Studies'),
      ul(
        'Transient sedation: the intended pharmacological effect; can be unwanted in some contexts',
        'Mild headache: reported in some subjects following IV administration',
        'Nausea: occasional, mild',
        'Injection site reactions: expected with parenteral administration',
        'No cardiovascular, hepatic, or renal toxicity reported in clinical studies',
      ),
      h3('Endocrine Considerations'),
      p(t('DSIP modulates LH, GH, and ACTH secretion. Chronic use theoretical concern: disruption of normal HPA axis rhythmicity and GH pulsatility. No systematic endocrine safety data from long-term use exists.')),
      h3('Dependency Potential'),
      p(t('Given DSIP\'s interaction with the opioid system (proposed mechanism for opiate withdrawal efficacy), theoretical dependency potential should be considered, though no evidence of DSIP dependence has been reported in research subjects.')),
      h3('Research Status'),
      p(t('DSIP is a research compound with no regulatory approval. The scientific literature on DSIP is dated (most key human studies are from the 1980s–1990s), and modern rigorous replication is lacking. It is available as a synthetic research peptide, with dosing and safety in contemporary research contexts essentially uncharacterized relative to current standards.')),
    ),
  },

  // ── FOXO4-DRI ─────────────────────────────────────────────────────────────
  'foxo4-dri': {
    mechanismOfAction: lex(
      p(t('FOXO4-DRI is a D-amino acid retro-inverso peptide designed to selectively induce apoptosis in senescent cells — a strategy termed senolysis. It was developed by de Keizer et al. (2017, Cell) based on the finding that the transcription factor FOXO4 forms an apoptosis-suppressing interaction with p53 specifically in senescent cells, preventing them from activating their own apoptotic program.')),
      h3('Senescent Cell Biology'),
      p(t('Cellular senescence is a permanent cell cycle arrest triggered by DNA damage, telomere shortening, oncogenic stress, or other insults. Senescent cells accumulate with age and at sites of injury. They are characterized by:')),
      ul(
        'Resistance to apoptosis: upregulate anti-apoptotic proteins including BCL-2/BCL-XL and the FOXO4-p53 interaction',
        'SASP (Senescence-Associated Secretory Phenotype): constitutively secrete pro-inflammatory cytokines (IL-6, IL-8, TNF-α), proteases, and growth factors that damage surrounding tissue',
        'Contribution to aging and disease: accumulated senescent cells drive chronic inflammation ("inflammaging"), impair tissue regeneration, and promote age-related diseases including fibrosis, atherosclerosis, and cancer',
      ),
      h3('FOXO4-p53 Interaction in Senescence'),
      p(t('De Keizer\'s key discovery: in senescent (but not normal) cells, FOXO4 is upregulated and directly binds p53 in the nuclear compartment, retaining p53 away from the mitochondria where it would otherwise trigger cytochrome c release and apoptosis. FOXO4 effectively makes senescent cells apoptosis-resistant by hijacking p53 as a survival factor — a molecular mechanism distinct from normal cell survival.')),
      h3('FOXO4-DRI Mechanism'),
      p(t('FOXO4-DRI is a 34-amino acid peptide corresponding to the p53-binding domain of FOXO4, constructed entirely of D-amino acids in retro-inverso configuration (reversed sequence, D-form), conferring resistance to proteases. It acts as a competitive inhibitor of the FOXO4-p53 interaction:')),
      ul(
        'Enters senescent cells (which have compromised membrane integrity relative to normal cells)',
        'Competes with endogenous FOXO4 for p53 binding, displacing FOXO4',
        'Frees p53 to translocate to mitochondria',
        'Triggers cytochrome c release → caspase-3/7 activation → apoptosis',
        'Selectivity: normal cells do not exhibit FOXO4-p53 co-localization; FOXO4-DRI preferentially affects senescent cells',
      ),
    ),
    pharmacokinetics: lex(
      p(t('FOXO4-DRI\'s D-amino acid retro-inverso design is critical to its pharmacokinetics, conferring protease resistance that makes it a viable systemic peptide therapeutic.')),
      h3('Key Properties'),
      ul(
        'Molecular weight: approximately 4.2 kDa',
        'Protease resistance: D-amino acid configuration makes it essentially invisible to all cellular proteases (which are stereospecific for L-amino acids)',
        'Half-life: substantially extended relative to L-amino acid peptides; estimated hours rather than minutes',
        'Route: intraperitoneal (original mouse studies); subcutaneous in research contexts',
        'Cell penetration: enters cells via endocytic pathway; enhanced uptake in senescent cells with compromised membrane integrity',
      ),
      h3('Selectivity Mechanism — Pharmacokinetic Basis'),
      p(t('The senolytic selectivity of FOXO4-DRI is not purely pharmacokinetic but relies on the differential FOXO4-p53 expression in senescent vs. normal cells. Normal cells treated with FOXO4-DRI do not undergo apoptosis because they lack the FOXO4-p53 survival complex. This "pharmacodynamic selectivity" rather than PK selectivity is what defines its senolytic specificity.')),
      h3('In Vivo Dosing (Murine)'),
      p(t('De Keizer et al. used 5 mg/kg intraperitoneally, 3 times per week in mice. No human PK data has been published. Translational dose estimation from mouse to human (corrected for body surface area and bioavailability differences) is complex and uncertain for a novel first-in-class mechanism.')),
    ),
    researchFindings: lex(
      p(t('FOXO4-DRI has generated significant scientific and public interest as a prototype senolytic compound. The original study results were striking; replication and extension remain ongoing.')),
      h3('Original De Keizer 2017 Cell Study'),
      p(t('The landmark paper demonstrated that FOXO4-DRI treatment in naturally aged mice (31 months) and in mice with chemotherapy-induced accelerated senescence produced:')),
      ul(
        'Selective elimination of p21+ senescent cells in liver, gut, and kidney without significant normal cell toxicity assessed histologically',
        'Improved physical fitness: running speed, grip strength, and coordination improved significantly in aged mice',
        'Fur regrowth in chemotherapy-induced alopecia mouse model',
        'Restoration of renal function in cisplatin-induced renal fibrosis model',
        'Increased median healthspan (period of active, unimpaired function)',
      ),
      h3('Comparison to First-Generation Senolytics'),
      p(t('FOXO4-DRI was compared favorably to the Dasatinib+Quercetin (D+Q) senolytic combination in mechanistic specificity. Whereas D+Q targets BCL-2/BCL-XL and other anti-apoptotic proteins in multiple cell types (less selective), FOXO4-DRI\'s mechanism is theoretically more specific to the FOXO4-p53 interaction found in senescent cells. However, direct head-to-head comparison studies are limited.')),
      h3('Independent Replications and Extensions'),
      p(t('Multiple independent groups have confirmed FOXO4-DRI\'s senolytic activity in cell culture and in vivo models. Applications being investigated include: idiopathic pulmonary fibrosis, atherosclerosis, NASH/liver fibrosis, and cognitive decline in aging models. Results are generally supportive but effect sizes vary by model and tissue.')),
      h3('Human Trials — Status'),
      p(t('As of 2026, no published human clinical trials of FOXO4-DRI exist. The peptide is in preclinical development at several academic medical centers. Human research is complicated by the absence of validated senescent cell burden biomarkers for human studies, the difficulty of histological confirmation of senolysis, and regulatory novelty of the "senolytic" drug class.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('FOXO4-DRI\'s primary safety concern is off-target apoptosis — the elimination of non-senescent cells that might share aspects of the FOXO4-p53 expression pattern. The existing data is reassuring but limited.')),
      h3('Animal Safety Data'),
      ul(
        'No significant weight loss, behavioral abnormality, or organ pathology observed in treated aged mice in original study',
        'Liver and kidney histology (H&E, TUNEL staining) showed selective apoptosis in p21+ cells without global tissue damage',
        'No acute toxicity at 5 mg/kg 3×/week dosing in mice',
        'No immune-mediated reactions reported (D-amino acid peptides theoretically more immunogenic; not observed at therapeutic doses)',
      ),
      h3('Immunogenicity of D-Amino Acid Peptides'),
      p(t('D-amino acid peptides are not normally encountered by the immune system, potentially making them immunogenic. Repeated administration could trigger antibody formation that neutralizes FOXO4-DRI activity or causes immune reactions. This is a theoretical concern not yet evaluated in long-term animal studies or humans.')),
      h3('Off-Target Apoptosis Risk'),
      p(t('FOXO4 and p53 are expressed in multiple non-senescent tissues. The selectivity of FOXO4-DRI depends on the specific co-localization of FOXO4 and p53 seen only in senescent cells. If this assumption fails in any tissue — particularly rapidly dividing tissues (bone marrow, gut epithelium, skin) — off-target apoptosis could cause toxicity similar to chemotherapy side effects. This risk has not been fully characterized across all tissues.')),
      h3('Stem Cell Senescence'),
      p(t('Some stem cell populations undergo senescence as part of normal tissue homeostasis. FOXO4-DRI treatment could eliminate these senescent stem cells, potentially depleting stem cell niches needed for normal tissue renewal. This is a theoretical concern requiring careful evaluation in longer-term studies.')),
      h3('Human Use Context'),
      p(t('FOXO4-DRI is available as a research chemical. Human self-experimentation is occurring in "biohacker" communities without medical supervision. Given the absence of human safety data and the profound biological consequences of targeted apoptosis, such use represents a significant and uncharacterized risk. The peptide should be considered experimental with unknown human safety profile.')),
    ),
  },

}
