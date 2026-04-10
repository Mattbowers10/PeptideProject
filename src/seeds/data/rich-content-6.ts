/**
 * Rich content batch 6 — 10 peptides
 * semaglutide, tirzepatide, ipamorelin, sermorelin, epithalon,
 * selank, semax, fragment-176-191, hexarelin, tesamorelin
 */

type LexicalNode = Record<string, unknown>

function t(text: string, formats: number = 0) {
  return { detail: 0, format: formats, mode: 'normal', style: '', text, type: 'text', version: 1 }
}
function p(...children: LexicalNode[]) {
  return {
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'paragraph',
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}
function h3(text: string) {
  return {
    children: [t(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'heading',
    version: 1,
    tag: 'h3',
  }
}
function ul(...items: string[]) {
  return {
    children: items.map((item) => ({
      children: [
        {
          children: [t(item)],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'listitem',
      version: 1,
      value: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    type: 'list',
    version: 1,
  }
}
function lex(...nodes: LexicalNode[]) {
  return { root: { children: nodes, direction: 'ltr', format: '', indent: 0, type: 'root', version: 1 } }
}

export const richContent6 = {

  // ─── Semaglutide ──────────────────────────────────────────────
  'semaglutide': {
    mechanismOfAction: lex(
      h3('GLP-1 Receptor Agonism'),
      p(t('Semaglutide is a long-acting glucagon-like peptide-1 (GLP-1) receptor agonist engineered for once-weekly dosing. It shares ~94% sequence homology with native GLP-1(7-36) amide but carries two key modifications: a C-18 fatty diacid chain tethered via a mini-PEG linker to lysine-34, and an Aib substitution at position 8 replacing alanine to confer protease resistance. These changes extend plasma half-life to ~168 hours.')),
      h3('Central and Peripheral Actions'),
      p(t('GLP-1R is expressed in pancreatic β-cells, hypothalamic appetite centres (arcuate and paraventricular nuclei), brainstem, gastric smooth muscle, cardiac myocytes, and hepatocytes. Upon binding, semaglutide activates Gαs→cAMP→PKA and Gαq→IP3 pathways simultaneously.')),
      ul(
        'β-cells: glucose-dependent insulin secretion amplification; suppression of glucagon from α-cells',
        'Hypothalamus/brainstem: reduced appetite through POMC/CART neuron activation, reduced NPY/AgRP signaling',
        'Gastric: delayed emptying reducing postprandial glucose excursions',
        'Liver: reduced hepatic glucose output via improved insulin sensitivity',
      ),
      h3('Weight Loss Mechanism'),
      p(t('The pronounced weight-loss effect of high-dose semaglutide (2.4 mg SC weekly) stems primarily from CNS action: penetration of circumventricular organs (area postrema, subfornical organ) lacking a tight blood-brain barrier, plus direct receptor activation in limbic and reward circuits reduces hedonic eating and food cravings. Studies confirm 15–17% mean body weight reduction at 68 weeks.')),
    ),
    pharmacokinetics: lex(
      h3('Absorption and Distribution'),
      p(t('Following subcutaneous injection, semaglutide reaches peak plasma concentration (Tmax) in 1–3 days. Bioavailability is ~89% for SC administration. The oral formulation (Rybelsus) co-administered with SNAC (salcaprozate sodium) achieves ~1% absolute bioavailability via gastric transcellular absorption.')),
      h3('Metabolism and Elimination'),
      p(t('Semaglutide is metabolized by sequential proteolytic cleavage and oxidation of the fatty acid side chain. Metabolites are excreted in urine (similarly sized) and feces. Terminal half-life is ~165 hours (~7 days), enabling once-weekly dosing. Steady state is reached after 4–5 weeks.')),
      h3('Dose-Exposure Relationship'),
      ul(
        'T2DM (Ozempic): 0.5–2 mg SC weekly; proportional exposure',
        'Obesity (Wegovy): 2.4 mg SC weekly (dose-escalation over 16 weeks)',
        'CVOT data: dose-proportional cardiovascular risk reduction',
        'Renal/hepatic impairment: no clinically significant dose adjustment required',
      ),
    ),
    researchFindings: lex(
      h3('SUSTAIN Programme (Glycaemic)'),
      p(t('Eight SUSTAIN trials demonstrated HbA1c reductions of 1.1–1.8% vs. comparators, with superior cardiovascular outcomes in SUSTAIN-6: 26% reduction in MACE (cardiovascular death, non-fatal MI, non-fatal stroke) vs. placebo (HR 0.74, p<0.001 for non-inferiority; p=0.02 for superiority).')),
      h3('STEP Programme (Obesity)'),
      p(t('STEP 1 (2021, NEJM): 1961 adults, 2.4 mg weekly vs. placebo; mean weight loss 14.9% vs. 2.4% at 68 weeks. STEP 4 demonstrated weight regain upon discontinuation, confirming chronic treatment requirement. STEP 5 extended to 104 weeks showing sustained 15.2% loss.')),
      h3('SELECT Trial (Cardiovascular)'),
      p(t('The SELECT trial (2023, NEJM) enrolled 17,604 overweight/obese adults without diabetes; semaglutide 2.4 mg reduced MACE by 20% vs. placebo (HR 0.80, 95% CI 0.72–0.90, p<0.001). This is the first weight-loss drug to demonstrate CV mortality benefit.')),
      h3('Emerging Research'),
      ul(
        'FLOW trial: 24% CKD progression reduction in diabetic kidney disease',
        'ESSENCE trial: exploring Alzheimers/neurodegeneration signal',
        'SOUL trial: oral semaglutide cardiovascular outcomes (ongoing)',
        'Non-alcoholic steatohepatitis: liver fat reduction 40% vs. placebo',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Gastrointestinal Effects'),
      p(t('The dominant adverse effects are GI: nausea (44%), vomiting (24%), diarrhea (30%), constipation (24%). These are dose-dependent and typically transient, peaking during dose escalation and resolving within 4–8 weeks. Gradual titration minimizes discontinuation rates.')),
      h3('Serious Adverse Events'),
      ul(
        'Thyroid C-cell tumors: rodent carcinogenicity signal at supratherapeutic doses; human relevance uncertain; contraindicated with personal/family history of MTC or MEN2',
        'Acute pancreatitis: rare; monitor for abdominal pain; discontinue if suspected',
        'Cholelithiasis: increased gallstone risk with rapid weight loss',
        'Hypoglycemia: low risk as monotherapy; higher with insulin/sulfonylurea combination',
      ),
      h3('Muscle Mass Consideration'),
      p(t('Meta-analyses confirm ~40% of weight lost with semaglutide is lean mass — muscle protein. Co-administration of resistance training and adequate protein intake (≥1.6 g/kg/day) is recommended to preserve muscle mass during treatment. This is an active area of mitigation research.')),
    ),
  },

  // ─── Tirzepatide ──────────────────────────────────────────────
  'tirzepatide': {
    mechanismOfAction: lex(
      h3('Dual GIP/GLP-1 Receptor Agonism'),
      p(t('Tirzepatide is a 39-amino acid synthetic peptide that is a first-in-class dual glucose-dependent insulinotropic polypeptide (GIP) and GLP-1 receptor co-agonist. It is based on the native GIP sequence and bears a C20 fatty diacid moiety for albumin binding, conferring a half-life of ~5 days. It activates both GIPR and GLP-1R with balanced potency.')),
      h3('Complementary Receptor Biology'),
      p(t('GIPR and GLP-1R signal through overlapping (Gαs/cAMP) but distinct downstream pathways and tissue distributions. Their combined activation produces additive or synergistic metabolic effects:')),
      ul(
        'Pancreas: GIPR potentiates glucose-stimulated insulin secretion; GLP-1R suppresses glucagon',
        'Adipose: GIPR directly promotes triglyceride storage/partitioning and reduces lipolysis-driven ectopic fat deposition',
        'CNS: GLP-1R drives appetite suppression; GIPR may enhance reward circuit modulation',
        'Gut: both receptors contribute to delayed gastric emptying',
      ),
      h3('Why GIPR Agonism Adds Value'),
      p(t('Counterintuitively, GIPR agonism (not antagonism) improves metabolic outcomes when combined with GLP-1R activation. GIPR expression in hypothalamic neurons participates in energy sensing. In preclinical and clinical data, combined action reduces body weight beyond GLP-1 agonism alone, likely through complementary CNS energy balance circuits.')),
    ),
    pharmacokinetics: lex(
      h3('Absorption'),
      p(t('Tirzepatide is administered subcutaneously once weekly. Tmax occurs at ~48 hours post-injection. Absolute bioavailability is ~80%. The C20 fatty diacid moiety enables high-affinity non-covalent albumin binding (>99%), dramatically extending the effective half-life.')),
      h3('Distribution and Elimination'),
      p(t('Apparent volume of distribution ~10.3 L, consistent with restricted distribution in plasma and interstitial fluid. Elimination half-life is ~5 days, supporting once-weekly dosing with steady-state plasma concentrations achieved after 4 weeks. Metabolism occurs primarily via proteolytic degradation; no CYP450 involvement.')),
      h3('Clinical Dosing'),
      ul(
        'Starting dose: 2.5 mg SC weekly × 4 weeks, then escalate',
        'Therapeutic range: 5–15 mg weekly (T2DM Mounjaro; obesity Zepbound)',
        'Maximum dose: 15 mg weekly',
        'No dose adjustment for renal/hepatic impairment (limited severe impairment data)',
      ),
    ),
    researchFindings: lex(
      h3('SURPASS Programme (T2DM)'),
      p(t('The SURPASS trials (2021) enrolled ~9,000 T2DM patients across 5 studies. SURPASS-2 (vs. semaglutide 1 mg): tirzepatide 15 mg achieved HbA1c reduction of 2.46% vs. 1.86% for semaglutide, and weight loss of 12.4 kg vs. 6.2 kg. First head-to-head superiority over a GLP-1 RA.')),
      h3('SURMOUNT Programme (Obesity)'),
      p(t('SURMOUNT-1 (2022, NEJM): 2,539 adults without diabetes; tirzepatide 15 mg achieved 22.5% mean body weight reduction vs. 2.4% placebo at 72 weeks — the highest weight loss reported for any pharmaceutical agent in a pivotal trial. 63% of participants achieved ≥20% weight loss at the highest dose.')),
      h3('SURMOUNT-MMO (Cardiovascular)'),
      p(t('SURMOUNT-MMO, reported in 2025, demonstrated 23% reduction in MACE in overweight/obese patients without diabetes, comparable to SELECT data for semaglutide, confirming the cardiovascular benefit is a class effect related to weight loss and metabolic improvement.')),
      h3('Body Composition'),
      ul(
        'SURMOUNT-1 sub-study: 30.5% of total weight lost was lean mass (vs. ~40% for semaglutide 2.4 mg)',
        'Visceral adipose tissue reduced 40–50%',
        'Liver fat reduced by 72% in NASH patients',
        'Improved insulin resistance independent of weight loss (GIPR-mediated)',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Gastrointestinal Profile'),
      p(t('GI AEs are the most common: nausea (18–33%), diarrhea (17–22%), vomiting (9–13%), constipation (11–12%). Rates are comparable to GLP-1 RA class. Severity is generally mild-to-moderate and transient. Dose escalation protocol reduces early discontinuation.')),
      h3('Serious Risks'),
      ul(
        'Thyroid C-cell tumors: class warning (rodent data); contraindicated in MTC/MEN2 history',
        'Pancreatitis: rare; monitor amylase/lipase if symptomatic',
        'Cholelithiasis: 2.2% vs. 0.8% placebo in SURMOUNT',
        'Hypersensitivity: injection site reactions and rare systemic reactions reported',
      ),
      h3('Gastroparesis Considerations'),
      p(t('Delayed gastric emptying can slow absorption of co-administered oral medications. Particular attention required for narrow therapeutic index drugs (warfarin, cyclosporine, oral contraceptives). Clinical monitoring recommended for affected co-medications.')),
    ),
  },

  // ─── Ipamorelin ───────────────────────────────────────────────
  'ipamorelin': {
    mechanismOfAction: lex(
      h3('Selective GHRP-Class Secretagogue'),
      p(t('Ipamorelin is a pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH₂) growth hormone secretagogue that acts as a selective agonist at the growth hormone secretagogue receptor type 1a (GHSR-1a). Unlike earlier GHRPs (GHRP-2, GHRP-6), ipamorelin was specifically engineered for selectivity — it stimulates GH release without significant elevation of cortisol, prolactin, or ACTH.')),
      h3('GHSR-1a Signaling'),
      p(t('GHSR-1a is a Gαq-coupled GPCR. Ipamorelin binding activates phospholipase C → IP3 → intracellular calcium release in somatotrophs, triggering GH exocytosis. Simultaneously, it suppresses somatostatin tone in the hypothalamus, amplifying pulsatile GH release. The net effect is a physiological GH pulse resembling endogenous secretion.')),
      h3('Selectivity Profile'),
      ul(
        'GH release: potent (EC50 ~1 nM in rat pituitary cells)',
        'Cortisol/ACTH: no significant stimulation at doses producing peak GH',
        'Prolactin: minimal stimulation unlike GHRP-2',
        'Appetite stimulation: substantially less than GHRP-6 (no notable NPY effects)',
        'IGF-1: secondary elevation proportional to GH pulse',
      ),
    ),
    pharmacokinetics: lex(
      h3('Peptide Stability'),
      p(t('Ipamorelin contains D-amino acids and an Aib residue at the N-terminus conferring moderate protease resistance. Subcutaneous bioavailability is ~90% in rodent models. Plasma half-life is short: approximately 2 hours, requiring 1–3× daily administration to generate multiple GH pulses.')),
      h3('Onset and Duration'),
      p(t('Peak GH elevation occurs within 15–30 minutes of injection, reaching 3–10× baseline somatotroph output. The GH pulse decays over 2–4 hours, closely mimicking physiological pulsatile release. Co-administration with CJC-1295 (a GHRH analogue) extends and amplifies the GH pulse through synergistic receptor action.')),
      h3('Common Protocols'),
      ul(
        'Monotherapy: 100–300 mcg SC 1–3× daily, typically pre-sleep or pre-workout',
        'CJC-1295/Ipamorelin combo: 1:1 ratio 100–200 mcg each; once daily pre-sleep preferred',
        'Cycle length: 8–12 weeks with 4-week off periods',
        'IGF-1 monitoring recommended after 4 weeks',
      ),
    ),
    researchFindings: lex(
      h3('Preclinical Selectivity Studies'),
      p(t('Raun et al. (1998) first characterized ipamorelin in rat pituitary cells, demonstrating potent GH release comparable to GHRP-6 with markedly reduced cortisol and prolactin stimulation. At 10× the GH-stimulating dose, cortisol release was 3-fold lower than GHRP-2.')),
      h3('GI Motility Research'),
      p(t('A distinct line of ipamorelin research examines GHSR-1a agonism in the enteric nervous system. Poitras et al. demonstrated that GHSR-1a activation in the gut accelerates gastric emptying and colonic motility — relevant to postoperative ileus research. This GI prokinetic effect is being explored as a clinical application independent of GH secretion.')),
      h3('Body Composition and Recovery'),
      p(t('Small clinical studies and case series document that ipamorelin/CJC-1295 combinations increase lean mass and reduce body fat over 12 weeks, with improvements in recovery markers (reduced DOMS duration, faster soft tissue healing). These effects are attributed to elevated IGF-1 and direct GH anabolic signaling.')),
      h3('Bone Density'),
      ul(
        'GHSR-1a agonism stimulates osteoblast differentiation via GH/IGF-1 axis',
        'Rat studies: femoral bone mineral density increased after 4-week ipamorelin treatment',
        'Human data limited; extrapolation from acromegaly and GH deficiency literature',
        'Potential application in age-related osteopenia under investigation',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Tolerability'),
      p(t('Ipamorelin is considered one of the best-tolerated GHRPs in research settings. Its selectivity profile means the side effects common to other GHRPs — significant hunger spikes, cortisol elevation, water retention from prolactin — are substantially reduced. Injection site reactions are the most common adverse event.')),
      h3('Common Effects'),
      ul(
        'Transient flushing/head rush: ~10–15 minutes post-injection; benign, dose-dependent',
        'Mild fluid retention: occurs with sustained GH elevation; reversible on cessation',
        'Headache: reported in ~15% of users during initial weeks',
        'Hypoglycemia: mild, transient; peak GH suppresses insulin briefly',
      ),
      h3('Long-term Considerations'),
      p(t('Sustained GH/IGF-1 elevation raises theoretical concerns about tissue proliferation. While no clinical data demonstrate carcinogenicity at research doses, individuals with active malignancy or proliferative diabetic retinopathy should avoid GH secretagogues. GHSR-1a desensitization with chronic use may reduce efficacy — cycling protocols address this.')),
    ),
  },

  // ─── Sermorelin ───────────────────────────────────────────────
  'sermorelin': {
    mechanismOfAction: lex(
      h3('GHRH Receptor Agonist'),
      p(t('Sermorelin is a synthetic 29-amino acid peptide corresponding to the biologically active N-terminal fragment of human growth hormone-releasing hormone (GHRH(1-29)-NH₂). It acts as a direct agonist at the GHRH receptor (GHRHR), a Gαs-coupled GPCR expressed primarily on pituitary somatotrophs.')),
      h3('Physiological Signaling'),
      p(t('GHRHR activation by sermorelin stimulates adenylyl cyclase → cAMP → PKA, which phosphorylates and activates the GH gene promoter while triggering calcium influx for GH vesicle exocytosis. Unlike synthetic GHRPs (ipamorelin, hexarelin), sermorelin uses the endogenous GHRH pathway — it requires a functioning hypothalamic-pituitary axis to work, and its effects are subject to normal somatostatin feedback.')),
      h3('Physiological Fidelity'),
      p(t('The key advantage of GHRH analogues over exogenous GH is feedback preservation. Somatostatin continues to inhibit excess GH, IGF-1 provides negative feedback, and pulsatile release patterns are maintained. This physiological regulation reduces the dysregulation risks associated with exogenous GH administration.')),
      ul(
        'Maintains hypothalamic-pituitary feedback axis integrity',
        'Pulsatile GH secretion preserved (vs. supraphysiological flat peaks with exogenous GH)',
        'Stimulates only endogenous GH synthesis — not exogenous hormone loading',
        'IGF-1 elevation proportional to somatotroph reserve',
      ),
    ),
    pharmacokinetics: lex(
      h3('Half-life and Dosing'),
      p(t('Sermorelin has a very short plasma half-life of approximately 10–20 minutes due to rapid degradation by DPP-IV and other serum peptidases. This short half-life is partly advantageous — it generates a discrete GH pulse without sustained supraphysiological exposure. Subcutaneous bioavailability is ~80% with Tmax at ~15 minutes.')),
      h3('Administration'),
      p(t('Standard research protocols administer sermorelin at bedtime (21:00–23:00) to coincide with the dominant physiological GH pulse during early sleep. This amplifies the natural nocturnal surge rather than competing with daytime feedback-suppressed states.')),
      h3('Combination Protocols'),
      ul(
        'Sermorelin alone: 200–500 mcg SC at bedtime, 5 days on / 2 days off',
        'Sermorelin + ipamorelin: 100–200 mcg each; synergistic via dual receptor mechanism',
        'Cycle length: 3–6 months; longer cycles accepted given physiological mechanism',
        'IGF-1 lab monitoring at baseline, 6 weeks, and end of cycle',
      ),
    ),
    researchFindings: lex(
      h3('Paediatric Growth Hormone Deficiency'),
      p(t('Sermorelin received FDA approval (1997) for treatment of idiopathic GH deficiency in children. Multiple clinical trials demonstrated comparable height velocity improvements to exogenous GH in GH-deficient children with intact somatotroph function, with a more favorable safety profile due to physiological regulation.')),
      h3('Adult Anti-Ageing Studies'),
      p(t('Walker et al. (1998–2002) conducted randomised controlled trials in adult GH-deficient patients and older adults with somatotrope hypofunction. Six months of sermorelin treatment produced: increased lean body mass, reduced adipose tissue, improved sleep quality, and increased IGF-1 to mid-normal reference range. Bone markers also improved.')),
      h3('Sleep Architecture'),
      p(t('Distinct from other GH secretagogues, sermorelin has demonstrated dose-dependent improvements in slow-wave (stage 3/4) sleep in multiple studies. GH is primarily secreted during SWS; the bidirectional GHRH-sleep relationship means GHRH receptor agonism promotes deeper, more restorative sleep architecture independent of GH effects on body composition.')),
      h3('Comparison to Exogenous GH'),
      ul(
        'Equivalent IGF-1 elevation at matched GH output',
        'No suppression of endogenous GHRH production (unlike exogenous GH)',
        'No pituitary downregulation — somatotrophs remain responsive',
        'Lower cost, no direct GH testing interference in anti-doping contexts',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('General Tolerability'),
      p(t('Sermorelin has an excellent safety record derived from its approval history and decades of paediatric use. As a physiological GHRH analogue, its side effect profile is mild and self-limiting. The intact feedback mechanism prevents GH excess even with chronic use.')),
      h3('Common Adverse Effects'),
      ul(
        'Injection site reactions: erythema, pain, swelling — most common adverse event',
        'Transient flushing: facial warmth within 30 minutes of injection',
        'Headache: reported in 10–20% of subjects; usually resolves within 1 week',
        'Nausea: mild; less common than with GHRPs; dose-dependent',
      ),
      h3('Contraindications'),
      p(t('Sermorelin is contraindicated in active malignancy, as GH/IGF-1 may promote tumour growth in hormone-sensitive cancers. Hypothyroidism should be treated before initiation (untreated hypothyroidism blunts GH response). No data in pregnancy or lactation; avoid in these populations.')),
    ),
  },

  // ─── Epithalon ────────────────────────────────────────────────
  'epithalon': {
    mechanismOfAction: lex(
      h3('Telomere Maintenance and Telomerase Activation'),
      p(t('Epithalon (Epitalon; Ala-Glu-Asp-Gly) is a synthetic tetrapeptide derived from the natural pineal gland peptide epithalamin. Its primary proposed mechanism is upregulation of telomerase (hTERT), the ribonucleoprotein enzyme responsible for maintaining telomere length. Telomere shortening in somatic cells is a primary driver of replicative senescence, and epithalon appears to activate telomerase in aged cells restoring replication capacity.')),
      h3('Epigenetic and Transcriptional Effects'),
      p(t('Beyond telomerase, epithalon has been shown to modulate chromatin structure — reducing heterochromatin condensation associated with aging — and to upregulate antioxidant enzyme gene expression (SOD, catalase, glutathione peroxidase). It interacts with DNA-histone complexes, potentially acting as an epigenetic modulator restoring youthful gene expression patterns.')),
      h3('Neuroendocrine Regulation'),
      p(t('Epithalon restores pineal gland melatonin synthesis in aged animals whose nocturnal melatonin peaks have declined. This occurs through peptide-mediated regulation of arylalkylamine N-acetyltransferase (AANAT), the rate-limiting enzyme in melatonin biosynthesis. Restored melatonin contributes to antioxidant, circadian, and immune regulatory effects.')),
      ul(
        'hTERT upregulation in somatic cells → telomere length maintenance',
        'Antioxidant enzyme induction → reduced oxidative DNA damage',
        'Melatonin restoration → circadian rhythm normalization, sleep improvement',
        'PCNA and p53 modulation → cell cycle checkpoint regulation',
      ),
    ),
    pharmacokinetics: lex(
      h3('Administration Routes'),
      p(t('Epithalon is administered primarily via subcutaneous or intravenous injection due to rapid peptidase degradation when taken orally. As a tetrapeptide, it has moderate resistance to degradation compared to dipeptides or tripeptides, but oral bioavailability remains very low (<5%). Intranasal delivery has been explored with moderate success.')),
      h3('Plasma Kinetics'),
      p(t('Limited formal pharmacokinetic studies exist in humans. Animal data suggest rapid distribution to target tissues within 30–60 minutes of SC injection, with plasma half-life under 30 minutes. Despite short circulating half-life, downstream gene-regulatory effects persist over 24–72 hours, suggesting receptor-mediated or nuclear mechanisms rather than sustained receptor occupancy.')),
      h3('Dosing Protocols in Research'),
      ul(
        'Standard protocol: 5–10 mg SC or IV daily for 10 days, twice yearly',
        'Extended protocol: 5 mg SC daily for 20 days, once yearly',
        'Khavinson research: 0.1 mg/kg for 5–15 days in human trials',
        'No established dose-response curve; empirical protocols from Russian research',
      ),
    ),
    researchFindings: lex(
      h3('Khavinson Longevity Studies'),
      p(t('Vladimir Khavinson and colleagues at the St. Petersburg Institute of Bioregulation have published extensively on epithalon since the 1980s. Their long-term cohort studies in elderly patients given annual epithalon courses (10-day cycles) reported 28–33% reduction in cardiovascular and cancer mortality over 12–15 years vs. controls, with improved cognitive scores and immune function.')),
      h3('Telomere Studies'),
      p(t('Anisimov et al. (2003–2011) demonstrated that epithalon treatment in aged mice increased mean lifespan by 11–16% and maximum lifespan by 13%, with reduced tumor incidence. In human somatic cell culture, epithalon extended replicative lifespan of retinal pigment epithelial cells beyond the Hayflick limit, associated with telomerase reactivation.')),
      h3('Cancer and Oncology Research'),
      p(t('Epithalon has shown oncostatic properties in multiple rodent tumor models (mammary, colon, liver). It reduces the expression of ras and bcl-2 oncogenes while upregulating p53. In the context of tamoxifen-treated breast cancer models, epithalon reduced distant metastasis formation. Its proposed use as an adjuvant oncology peptide requires rigorous human trial confirmation.')),
      h3('Neuroendocrine'),
      ul(
        'Melatonin nocturnal peak restored in aged rats to young-animal levels',
        'Circadian oscillator gene expression (Bmal1, Per1) normalized',
        'GnRH sensitivity in hypothalamus restored; LH/FSH profiles improved in aged females',
        'Cortisol diurnal rhythm normalization in stressed animals',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Record'),
      p(t('Epithalon has a long clinical research history in Russia with generally favorable safety data. As a naturally occurring tetrapeptide (derived from endogenous epithalamin), immunogenicity is low. No significant organ toxicity has been reported in animal or human studies at research doses.')),
      h3('Known Adverse Effects'),
      ul(
        'Injection site reactions: mild erythema, transient pain',
        'Fatigue: reported in some users during the initial treatment course',
        'Sleep changes: initial vivid dreams or sleep architecture changes related to melatonin effects',
        'No known significant drug interactions identified in available literature',
      ),
      h3('Theoretical Concerns'),
      p(t('The telomerase activation mechanism — while proposed to extend healthspan — raises theoretical concern regarding cancer risk, as telomerase reactivation is a hallmark of malignant transformation. Proponents argue that the full cellular context determines whether telomerase activation is benign (in normal somatic cells) vs. pathological (in cancer). Long-term safety data from independent, placebo-controlled trials are needed.')),
    ),
  },

  // ─── Selank ───────────────────────────────────────────────────
  'selank': {
    mechanismOfAction: lex(
      h3('Tuftsin Analogue and Anxiolytic Peptide'),
      p(t('Selank is a synthetic heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro) composed of a tuftsin fragment (Thr-Lys-Pro-Arg) stabilised by the Pro-Gly-Pro sequence. Tuftsin is an endogenous tetrapeptide derived from IgG that serves as an immunomodulatory signal. Selank was developed at the Institute of Molecular Genetics (Russia) to extend tuftsin stability while adding anxiolytic properties.')),
      h3('GABAergic and Serotonergic Modulation'),
      p(t('Selank exerts anxiolytic effects through positive modulation of GABA-A receptors — enhancing inhibitory chloride channel opening frequency without direct agonism — similar to benzodiazepines but without receptor binding site competition. Additionally, it upregulates serotonin turnover and increases the expression of 5-HT2A receptors in limbic structures, contributing to anxiolytic and mood-stabilising effects.')),
      h3('Enkephalin Regulation and Cognitive Enhancement'),
      p(t('A key mechanistic finding: selank inhibits enkephalinase (met-enkephalin-degrading enzyme), raising endogenous enkephalin levels. Elevated enkephalins contribute to anxiolysis and may also enhance dopaminergic neurotransmission in prefrontal circuits. Separately, selank upregulates BDNF expression in hippocampus and prefrontal cortex, providing a substrate for cognitive enhancement effects.')),
      ul(
        'GABA-A positive allosteric modulation → anxiolysis without sedation or tolerance',
        'Enkephalinase inhibition → elevated met-enkephalin',
        'BDNF upregulation → neuroplasticity enhancement',
        'IL-6 and interferon-gamma modulation → immune-cognitive coupling',
      ),
    ),
    pharmacokinetics: lex(
      h3('Intranasal Delivery'),
      p(t('Selank is most commonly administered intranasally, bypassing hepatic first-pass metabolism and achieving direct CNS delivery via olfactory nerve transport and systemic absorption through nasal mucosa. Intranasal bioavailability is estimated at 60–80%. Onset of anxiolytic effects is 5–20 minutes post-administration.')),
      h3('Stability and Half-life'),
      p(t('The Pro-Gly-Pro stabilising sequence substantially increases resistance to serum peptidases compared to native tuftsin, extending plasma half-life from minutes to approximately 3–5 minutes systemic but with prolonged tissue effects. Despite short plasma half-life, CNS-mediated effects persist for 4–6 hours, suggesting receptor cascade amplification.')),
      h3('Dosing'),
      ul(
        'Intranasal: 400–900 mcg (2–4 drops of 0.15% solution) per nostril, 2–3× daily',
        'Duration: 14–28 day courses typical in Russian clinical research',
        'Subcutaneous: 250–500 mcg in research contexts without nasal administration',
        'No tolerance development documented in short-term clinical studies',
      ),
    ),
    researchFindings: lex(
      h3('Anxiolytic Clinical Trials (Russia)'),
      p(t('Selective human trials conducted in Russia (1995–2010) demonstrated that selank 400 mcg intranasal 3× daily for 14 days produced comparable anxiolytic efficacy to medazepam (a benzodiazepine) in generalised anxiety disorder patients, with superior cognitive function preservation — no sedation, no psychomotor impairment, and no memory deficits associated with benzodiazepine class.')),
      h3('BDNF and Neuroprotection'),
      p(t('Dolotov et al. documented selank-induced BDNF mRNA upregulation of 1.5–2× in hippocampal neurons within 24 hours of administration, persisting for 4 days after a single dose. This BDNF elevation was associated with improved performance in hippocampus-dependent memory tasks in stressed rodents, suggesting neuroprotective potential in stress-related cognitive decline.')),
      h3('Immunomodulation'),
      p(t('Given its tuftsin origin, selank modulates innate immunity: it increases NK cell activity, normalises interferon-alpha/gamma balance, and upregulates monocyte activation markers during viral challenge in immunocompromised mice. These effects may underlie reported reductions in common cold incidence and severity in treated human cohorts.')),
      h3('Metabolic and Serotonin Studies'),
      ul(
        'Increased 5-HT turnover in raphe nuclei: 30–40% elevation in HIAA',
        'Reduced stress-induced corticosterone rise without basal HPA suppression',
        'Liver cytochrome P450 upregulation: may affect xenobiotic metabolism',
        'No benzodiazepine-type withdrawal syndrome upon discontinuation',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Tolerability Profile'),
      p(t('Selank demonstrates an excellent safety and tolerability profile in available literature. Unlike benzodiazepines, it produces no significant sedation at anxiolytic doses, no anterograde amnesia, no motor incoordination, and no dependence or withdrawal syndrome. It does not potentiate alcohol CNS depression.')),
      h3('Adverse Effects'),
      ul(
        'Nasal irritation: mild, transient with intranasal use; resolves in 1–2 days',
        'Fatigue: paradoxical mild fatigue reported in ~8% of users initially',
        'Headache: mild, early course; typically resolves within 1 week',
        'Appetite changes: mild increase noted; possibly serotonin-mediated',
      ),
      h3('Research Gaps'),
      p(t('The majority of selank research originates from Russian institutions and lacks international replication with placebo-controlled, double-blinded designs meeting modern regulatory standards. Long-term safety data beyond 6-month study periods are absent. Western regulatory approval has not been sought. Independent validation of the key BDNF, enkephalin, and clinical efficacy findings is needed.')),
    ),
  },

  // ─── Semax ────────────────────────────────────────────────────
  'semax': {
    mechanismOfAction: lex(
      h3('ACTH Fragment Analogue with Nootropic Properties'),
      p(t('Semax is a synthetic heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro) derived from the N-terminal fragment of adrenocorticotropic hormone (ACTH(4-7)) stabilised by a Pro-Gly-Pro extension. It was developed at Moscow State University as a cognitive enhancer. Unlike ACTH, semax lacks the full corticotropic activity — it does not significantly stimulate cortisol production — while retaining and amplifying CNS effects.')),
      h3('BDNF and Neurotrophic Signalling'),
      p(t('Semax is among the most potent known pharmacological BDNF inducers: intranasal administration produces rapid (within 1 hour) dose-dependent increases in hippocampal and cortical BDNF mRNA and protein. BDNF activates TrkB receptors triggering MAP kinase, PI3K/Akt, and PLCγ cascades — promoting synaptic long-term potentiation (LTP), dendritic arborisation, and neuronal survival.')),
      h3('Dopaminergic and Serotonergic Enhancement'),
      p(t('Semax acutely increases dopamine turnover in prefrontal cortex and limbic system (measured as elevated HVA/DOPAC ratios) and serotonin (5-HT) synthesis in the raphe-cortical projection. These monoamine effects underlie observed improvements in working memory, sustained attention, and executive function in both healthy subjects and cognitive impairment models.')),
      ul(
        'BDNF upregulation: 2–4× baseline in hippocampus within 1 hour',
        'NGF elevation: delayed (24–72 hours) with prolonged BDNF response',
        'Dopamine turnover: +25–40% in prefrontal cortex',
        'Serotonin synthesis: +20–30% in raphe-cortical neurons',
        'Nitric oxide (NO) reduction: anti-inflammatory neuroprotection',
      ),
    ),
    pharmacokinetics: lex(
      h3('Intranasal CNS Delivery'),
      p(t('Semax is administered intranasally, where it crosses the nasal epithelium and achieves direct brain delivery via olfactory nerve transport and perivascular spaces. Intranasal bioavailability exceeds systemic IV bioavailability for brain uptake — a paradox explained by avoiding blood-brain barrier and first-pass clearance. Onset of CNS effects occurs within 5–15 minutes.')),
      h3('Plasma Kinetics'),
      p(t('Plasma half-life is very short (~5–7 minutes) due to rapid peptidase cleavage. However, brain concentrations remain elevated for 4–12 hours following intranasal delivery, as the peptide accumulates in CNS interstitial fluid and binds to neuroreceptors and growth factor signalling complexes. This disconnect between plasma and CNS PK is characteristic of intranasal neuropeptides.')),
      h3('Dosing Protocols'),
      ul(
        'Cognitive enhancement: 600–2400 mcg intranasal daily, split 2× doses',
        'Neuroprotection/stroke: up to 12 mg/day in acute settings (Russian clinical use)',
        'Cycle length: 10–28 days on, then 2-week break',
        'N-acetyl semax amidate: more potent analogue; doses 10× lower effective',
      ),
    ),
    researchFindings: lex(
      h3('Stroke and Ischaemia Research'),
      p(t('Semax is licensed in Russia for use in ischaemic stroke, transient ischaemic attack, and hypertensive encephalopathy. Clinical studies (Gusev et al., 1997–2009) demonstrated that semax treatment within 6 hours of ischaemic stroke onset reduced infarct volume by 25–30% on MRI, improved 30-day NIHSS scores by 1.5–2 points vs. controls, and shortened hospital stay. BDNF-mediated neuroprotection and anti-inflammatory NO suppression are the proposed mechanisms.')),
      h3('Cognitive Enhancement in Healthy Subjects'),
      p(t('Double-blind crossover studies in healthy volunteers showed semax 600 mcg intranasal significantly improved working memory span (digit span, n-back performance), attention, and processing speed vs. placebo at 1–4 hours. Sustained improvement in memory consolidation tasks suggests LTP-related synaptic enhancement rather than simple stimulant arousal.')),
      h3('Optic Nerve Neuroprotection'),
      p(t('A distinct research line demonstrates semax prevents retinal ganglion cell loss in glaucoma and optic neuropathy models. Subconjunctival and intranasal semax reduced optic nerve degeneration by 40% in rat glaucoma models, associated with increased BDNF and NT-3 in retinal tissue. This is an active focus of Russian ophthalmology research.')),
      h3('Anxiety and Depression'),
      ul(
        'Reduces stress-induced corticosterone without anxiolytic sedation',
        'Anti-depressant-like effects in forced swim test (FST)',
        'Serotonin increase provides mood regulation',
        'BDNF elevation: same mechanism as conventional antidepressants at molecular level',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Tolerability'),
      p(t('Semax has been used clinically in Russia for over 25 years with a well-characterised safety record. Acute toxicity studies show a very high therapeutic index — rodent LD50 exceeds 5000 mg/kg (vs. effective doses of ~0.1 mg/kg). No serious adverse events have been reported in published clinical trials.')),
      h3('Common Effects'),
      ul(
        'Nasal irritation: mild burning sensation initially; adapts within 1–2 days',
        'Energising/stimulating: dopaminergic effect may disturb sleep if dosed late; use AM/early afternoon',
        'Appetite suppression: mild, temporary',
        'Anxiety: rare at standard doses; higher doses (>3 mg) may increase alertness to anxiety',
      ),
      h3('Regulatory Status'),
      p(t('Semax is a registered drug in Russia (prescription, for stroke and cognitive disorders) and Ukraine. It is not approved by FDA, EMA, or TGA but is legally purchasable as a research compound in most jurisdictions. No controlled substance scheduling. Long-term safety data beyond 3 months are limited in Western literature.')),
    ),
  },

  // ─── Fragment 176-191 ─────────────────────────────────────────
  'fragment-176-191': {
    mechanismOfAction: lex(
      h3('C-Terminal GH Fragment with Selective Lipolytic Action'),
      p(t('Fragment 176-191 (GH frag 176-191) is a stabilised synthetic peptide corresponding to amino acids 176–191 of the C-terminus of human growth hormone, with an added tyrosine residue at the N-terminus. It represents the region of GH responsible for lipolytic activity, isolated from the growth-promoting domains of full GH. The fragment retains the β3-adrenoceptor-like lipolytic signalling of native GH without IGF-1-mediated anabolic effects.')),
      h3('Adipocyte Signalling'),
      p(t('Fragment 176-191 binds to an as-yet incompletely characterised receptor on adipocytes (distinct from the classical GHR) and activates hormone-sensitive lipase (HSL) via a cAMP-independent mechanism — triggering triglyceride hydrolysis into free fatty acids and glycerol. Unlike full GH, it does not activate the JAK2-STAT5 pathway, explaining the absence of IGF-1 elevation and growth promotion.')),
      h3('Metabolic Selectivity'),
      ul(
        'Lipolysis: dose-dependent fat mobilisation from adipocytes',
        'IGF-1: no elevation (unlike full GH)',
        'Blood glucose: no diabetogenic effect (unlike supraphysiological GH)',
        'Insulin sensitivity: may improve; no insulin resistance documented',
        'Lean mass: no anabolic effect on muscle protein synthesis',
      ),
    ),
    pharmacokinetics: lex(
      h3('Administration'),
      p(t('Fragment 176-191 is administered subcutaneously, typically in proximity to the target adipose depot (though depot-localised fat loss is disputed). Bioavailability is estimated at 60–75% via SC route. Plasma half-life is short (~30 minutes), generating a discrete lipolytic signal. Peak plasma concentration occurs within 15–30 minutes.')),
      h3('Duration of Action'),
      p(t('Despite short plasma half-life, the downstream lipolytic effects — elevated free fatty acid flux — persist for several hours. This is consistent with lipase activation kinetics: once HSL is phosphorylated, continued FFA release from triglyceride pools continues until the lipid droplet is depleted or re-esterification catches up. Pre-fasting (3–4 hours) before injection is recommended to maximise FFA oxidation rather than re-esterification.')),
      h3('Research Dosing'),
      ul(
        'Standard: 250–500 mcg SC daily, preferably fasted (morning or pre-workout)',
        'Some protocols: 2× daily (morning + pre-workout), 500 mcg each',
        'Cycle length: 8–16 weeks',
        'No established tolerance development in rodent studies',
      ),
    ),
    researchFindings: lex(
      h3('Original University of Queensland Studies'),
      p(t('The pioneering work by Waters et al. (1999) at the University of Queensland first isolated and characterised the lipolytic activity of GH fragment 176-191 in rodents. Obese Zucker rat studies showed significant fat mass reduction with fragment treatment vs. full GH, with no change in IGF-1, glucose, or insulin — establishing the selectivity profile that generated research interest.')),
      h3('Anti-Obesity Potential'),
      p(t('Subsequent studies demonstrated that obese rodents treated with GH frag 176-191 showed 50% reduction in fat mass over 12 weeks compared to saline controls, without changes in food intake or growth parameters. A 1.5× increase in basal metabolic rate was measured by indirect calorimetry, suggesting the fragment also upregulates mitochondrial uncoupling in adipose tissue beyond simple lipolysis.')),
      h3('Human Data Limitations'),
      p(t('Formal human clinical trials for fragment 176-191 are sparse. Metabolic Pharmaceuticals (Australia) conducted Phase 2a/2b trials (AOD9604, a related fragment) in obese adults in the early 2000s but the lead compound failed to demonstrate sufficient weight loss in Phase 3. AOD9604 is the acetylated/tyrosine-modified version that eventually diverged from frag 176-191 research.')),
      h3('Bioavailability Comparison'),
      ul(
        'Fragment 176-191 vs. AOD9604: closely related; AOD9604 has Tyr at N-term',
        'Oral AOD9604: some bioavailability with enterically-coated formulations',
        'Fat loss in rodents: ~50% relative to full GH controls at equivalent doses',
        'Human Phase 3 (AOD9604): failed primary endpoint — 0.5 kg additional weight loss vs. 1.5 kg target',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('Fragment 176-191 lacks the significant adverse effects of supraphysiological GH: no water retention, no insulin resistance, no carpal tunnel syndrome, no acromegalic changes. This is because it bypasses GHR activation and consequent JAK2-STAT5-IGF-1 axis engagement. The fragment is considered metabolically benign outside of its lipolytic action.')),
      h3('Known Effects'),
      ul(
        'Injection site reactions: localised redness, brief pain',
        'Hypoglycaemia: mild, transient during fasted administration; monitor blood glucose',
        'No IGF-1 elevation: confirmed in multiple preclinical studies',
        'No carcinogenic signal in rodent toxicology',
      ),
      h3('Research Gaps'),
      p(t('Long-term human safety data are essentially absent. All available human-relevant safety data derive from the AOD9604 programme (which reached Phase 3 before the programme was discontinued for efficacy rather than safety reasons). The lack of IGF-1 activation and normal HPA axis interaction are reassuring, but extended use without formal human studies means research use carries inherent uncertainty.')),
    ),
  },

  // ─── Hexarelin ────────────────────────────────────────────────
  'hexarelin': {
    mechanismOfAction: lex(
      h3('Potent GHRP-Class GH Secretagogue'),
      p(t('Hexarelin (His-D-2-MeTrp-Ala-Trp-D-Phe-Lys-NH₂) is a synthetic hexapeptide growth hormone-releasing peptide with among the highest GH-releasing potency of any GHRP. It acts as a full agonist at GHSR-1a (EC50 ~0.5 nM), surpassing GHRP-2 and GHRP-6 in GH release per mole in rat pituitary assays. The 2-methyltryptophan modification confers protease resistance and enhanced receptor affinity.')),
      h3('CD36 Receptor Agonism — Cardioprotection'),
      p(t('A structurally distinct mechanism: hexarelin is the only GHRP demonstrated to directly bind CD36, a class B scavenger receptor expressed abundantly in cardiomyocytes, macrophages, and endothelial cells. CD36 activation by hexarelin triggers PI3K/Akt/eNOS signalling in cardiac tissue — promoting cardiomyocyte survival, reducing apoptosis, and improving contractile function. This effect is GH-independent and provides a separate cardioprotective mechanism.')),
      h3('Cardiovascular and GH Effects Combined'),
      ul(
        'GHSR-1a: maximal GH pulse induction > other GHRPs at equivalent doses',
        'CD36: cardioprotection via PI3K/Akt, anti-apoptotic effects',
        'IGF-1: secondary elevation proportional to GH release',
        'Cortisol: significant elevation — distinguishes hexarelin from ipamorelin',
        'Prolactin: mild elevation unlike GHRP-6 but above ipamorelin',
      ),
    ),
    pharmacokinetics: lex(
      h3('Half-life and Stability'),
      p(t('Hexarelin contains D-amino acids and a 2-methyltryptophan residue conferring moderate resistance to serum peptidases. Plasma half-life is approximately 20–30 minutes following SC injection — longer than GHRP-6 but shorter than modified analogues. Bioavailability SC is ~70%. Peak plasma GH response occurs 15–30 minutes post-injection.')),
      h3('Dosing Protocols'),
      p(t('Research protocols commonly use lower doses than other GHRPs due to hexarelin\'s superior potency and to limit cortisol elevation. GHSR-1a desensitisation with repeated dosing is well-documented and may be more pronounced than with other GHRPs; cycling or limiting to 1× daily administration is recommended.')),
      ul(
        'GH secretagogue use: 100–200 mcg SC 1–2× daily',
        'Cardioprotection research: 80 mcg/kg IV in animal studies; SC equivalent unclear',
        'Cycle length: 6–8 weeks to avoid significant desensitisation',
        '4-week washout period recommended between cycles',
      ),
    ),
    researchFindings: lex(
      h3('GH Release and IGF-1'),
      p(t('Massoud et al. and Arvat et al. (1990s) established hexarelin as the most potent GHRP in human studies: single IV doses of 2 mcg/kg produced GH peaks of 60–150 ng/mL vs. 20–40 ng/mL for GHRP-2 or GHRP-6 at similar doses. This potency advantage is offset by more pronounced ACTH and cortisol co-stimulation.')),
      h3('Cardiac Research — CD36 Mechanism'),
      p(t('Demers et al. (2004) first described hexarelin binding to CD36 in cardiomyocytes. Subsequent studies showed hexarelin treatment reduced infarct size by 30–40% in rodent ischaemia-reperfusion models, improved ejection fraction in cardiomyopathy models, and reduced cardiomyocyte apoptosis independently of GH. This CD36-mediated cardioprotection has generated interest in hexarelin as a potential cardiac ischaemia therapy.')),
      h3('Cardiac Function in GH Deficiency'),
      p(t('Multiple studies in adult GH-deficient patients demonstrated hexarelin improved left ventricular ejection fraction, wall thickness, and exercise capacity over 3–6 months — superior to GHRP-6 in cardiac parameters, potentially due to the combined GH-dependent and CD36-mediated mechanisms. This remains an active area of translational research.')),
      h3('Desensitisation Studies'),
      ul(
        'Repeated dosing 3× daily: 50% reduction in GH response by 2 weeks',
        '1× daily dosing: sustained GH response for 6–8 weeks',
        'GHRH co-administration restores responsiveness during desensitisation',
        'GHSR-1a receptor downregulation confirmed in pituitary cell cultures',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Adverse Effect Profile'),
      p(t('Hexarelin has a less favourable side-effect profile than ipamorelin or sermorelin due to its non-selective GHSR-1a activity pattern, producing more pronounced ACTH/cortisol and prolactin co-stimulation. This limits its tolerability in daily multi-dose protocols.')),
      h3('Common Adverse Effects'),
      ul(
        'Cortisol elevation: 30–50% rise above baseline; chronic HPA stimulation risk',
        'Transient flushing and warmth: 15–30 minutes post-injection',
        'Fatigue and lethargy: cortisol-mediated post-peak cortisol trough',
        'Water retention: GH-mediated sodium/water retention',
        'Appetite increase: GHSR-1a NPY effects less than GHRP-6 but present',
      ),
      h3('Desensitisation as a Limitation'),
      p(t('The most clinically relevant limitation is rapid GHSR-1a tachyphylaxis with frequent dosing. Unlike ipamorelin (which shows minimal desensitisation), hexarelin use produces significant receptor downregulation within 2 weeks of 3× daily dosing. This requires strict cycling protocols and limits practical utility in chronic protocols vs. other GHRPs.')),
    ),
  },

  // ─── Tesamorelin ─────────────────────────────────────────────
  'tesamorelin': {
    mechanismOfAction: lex(
      h3('Stabilised GHRH(1-44) Analogue'),
      p(t('Tesamorelin (TH9507) is a synthetic analogue of the complete 44-amino acid human GHRH(1-44) with a trans-3-hexenoic acid group conjugated to the tyrosine at the N-terminus. This modification confers protease resistance, particularly against DPP-IV cleavage at the Ala-2 residue that rapidly inactivates native GHRH. The result is a longer-acting GHRH analogue that activates GHRHR with full agonist activity.')),
      h3('GHRHR Signalling and GH Release'),
      p(t('GHRHR is a Gαs-coupled GPCR on pituitary somatotrophs. Tesamorelin binding activates adenylyl cyclase → cAMP → PKA, stimulating GH gene transcription, GH vesicle exocytosis, and calcium influx. As with other GHRH analogues, tesamorelin respects somatostatin feedback, preserving physiological pulsatility and avoiding supraphysiological GH excess.')),
      h3('Selective Visceral Fat Reduction'),
      p(t('Tesamorelin\'s primary clinical application is HIV-associated lipodystrophy — visceral adiposity caused by antiretroviral therapy. The mechanism involves GH/IGF-1-mediated activation of hormone-sensitive lipase in visceral adipocytes (which are more GH-sensitive than subcutaneous depots due to higher GH receptor density), resulting in preferential visceral fat mobilisation.')),
      ul(
        'GHRHR full agonism → physiological pulsatile GH release',
        'IGF-1 elevation: 60–150 ng/mL increase from baseline',
        'Visceral fat: selective lipolysis via high GH-receptor density in omental/mesenteric adipocytes',
        'Hepatic lipid metabolism: improved fatty acid oxidation',
      ),
    ),
    pharmacokinetics: lex(
      h3('Half-life'),
      p(t('The trans-3-hexenoic acid modification at the N-terminus protects the critical Tyr-Ala bond from DPP-IV cleavage, extending the half-life of tesamorelin compared to native GHRH. Plasma half-life is approximately 26 minutes SC — substantially longer than native GHRH (~7 minutes) but shorter than true long-acting agents. This necessitates daily SC injection.')),
      h3('FDA-Approved Dosing'),
      p(t('Tesamorelin is FDA-approved (as Egrifta) for HIV-associated lipodystrophy at 2 mg SC once daily. This dose produces 50–70% of maximal IGF-1 response without reaching GHRHR saturation, maintaining feedback regulation. Steady-state IGF-1 elevation is reached within 4 weeks.')),
      h3('Off-Label Research Protocols'),
      ul(
        'Lipodystrophy (approved): 2 mg SC once daily, continuous',
        'Metabolic syndrome/visceral obesity (research): 1–2 mg SC daily, 6–12 months',
        'Anti-aging protocols: 1 mg SC daily; IGF-1 monitoring essential',
        'Tesamorelin + ipamorelin: 1 mg + 100–200 mcg; synergistic GH/fat loss combination',
      ),
    ),
    researchFindings: lex(
      h3('Pivotal HIV Lipodystrophy Trials'),
      p(t('Two Phase 3 RCTs (Falutz et al., 2010, NEJM; Dhindsa et al., 2013) enrolled 816 HIV-positive adults with lipodystrophy. Tesamorelin 2 mg daily for 26–52 weeks reduced visceral adipose tissue (VAT) by 15–18% vs. no change in placebo, with significant trunk fat reduction on MRI. Triglycerides improved significantly; insulin sensitivity was unchanged at 52 weeks.')),
      h3('Metabolic Syndrome and Non-HIV Populations'),
      p(t('Growing research explores tesamorelin in non-HIV visceral obesity. A 26-week RCT in overweight adults (Stanley et al., 2012) showed 14.7% VAT reduction vs. 1.2% placebo, with improved IGF-1, reduced triglycerides, and no change in fasting glucose. This established proof-of-concept for broader metabolic applications.')),
      h3('Cognitive Effects'),
      p(t('Baker et al. (2012, Arch Neurology) conducted a 20-week RCT of tesamorelin in older adults with mild cognitive impairment (MCI). Tesamorelin improved executive function and verbal memory vs. placebo, with improvements correlating with IGF-1 elevation. The cognitive signal has generated interest in tesamorelin for age-related cognitive decline prevention.')),
      h3('Non-Alcoholic Fatty Liver Disease (NAFLD)'),
      ul(
        'Lima et al. (2010): liver fat reduced by MRS spectroscopy in HIV-lipodystrophy cohort',
        'Bhatt et al. (2019): significant VAT and liver fat reduction in non-HIV subjects',
        'NASH inflammation markers improved (AST, ALT) proportional to fat reduction',
        'Active trials examining tesamorelin in biopsy-confirmed NASH',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Tolerability in Clinical Trials'),
      p(t('Tesamorelin\'s safety profile is well-characterised from its FDA approval programme. In the pivotal trials, it was generally well tolerated with a discontinuation rate of 6–8% — mostly GI and injection-site related. The physiological GH stimulation mechanism produces a milder adverse effect profile than exogenous GH at equivalent IGF-1 elevations.')),
      h3('Common Adverse Effects'),
      ul(
        'Injection site reactions: erythema, pain, pruritis — most common at 25–30%',
        'Fluid retention: peripheral oedema, arthralgias, myalgias',
        'Nausea and vomiting: 8–12%',
        'Paraesthesias: tingling, numbness; GH-mediated fluid effects on nerve sheaths',
      ),
      h3('Glucose and Metabolic Monitoring'),
      p(t('GH stimulation can cause transient insulin resistance — fasting glucose monitoring is recommended every 4 weeks during therapy. In the pivotal trials, new-onset diabetes was not significantly elevated; however, pre-diabetic individuals showed progression in some analyses. HbA1c monitoring is prudent for those at metabolic risk.')),
      h3('Oncology Considerations'),
      p(t('As with all GH secretagogues, active malignancy is a contraindication. Tesamorelin is also contraindicated in pituitary tumour, pregnancy, and hypersensitivity. Unlike exogenous GH, the preserved IGF-1 feedback regulation substantially reduces but does not eliminate concern for GH/IGF-1 mediated tumour promotion in at-risk individuals.')),
    ),
  },
}
