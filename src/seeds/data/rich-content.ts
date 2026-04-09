/**
 * Rich content (Lexical JSON) for the top 10 peptide profiles.
 * Fields: mechanismOfAction, pharmacokinetics, researchFindings, sideEffectsAndSafety
 */

// ── Lexical node helpers ──────────────────────────────────────────────────────
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

const ul = (...items: string[]) => ({
  type: 'list' as const,
  listType: 'bullet' as const,
  start: 1,
  tag: 'ul' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  children: items.map((item, i) => ({
    type: 'listitem' as const,
    value: i + 1,
    format: '' as const,
    indent: 0,
    version: 1,
    children: [t(item)],
    direction: 'ltr' as const,
  })),
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

// ── Content definitions ───────────────────────────────────────────────────────

export const richContent: Record<
  string,
  {
    mechanismOfAction: object
    pharmacokinetics: object
    researchFindings: object
    sideEffectsAndSafety: object
  }
> = {
  // ── BPC-157 ────────────────────────────────────────────────────────────────
  'bpc-157': {
    mechanismOfAction: lex(
      p(t('BPC-157 (Body Protection Compound 157) is a synthetic 15-amino acid peptide derived from a protein found in human gastric juice. Despite its small size, it operates through several interconnected molecular pathways.')),
      h3('Angiogenesis and VEGF Activation'),
      p(t('One of BPC-157\'s most documented effects is the upregulation of vascular endothelial growth factor (VEGF) and its receptor VEGFR2. This promotes angiogenesis — the formation of new blood vessels — which accelerates nutrient delivery and healing in injured tissues.')),
      h3('Growth Hormone Receptor Sensitization'),
      p(t('BPC-157 upregulates growth hormone receptors on tendon fibroblasts. This sensitization enhances the anabolic and repair-signaling effects of endogenous GH at the tissue level, which may explain its pronounced effects on tendon and ligament healing observed in animal studies.')),
      h3('Nitric Oxide (NO) Modulation'),
      p(t('The peptide modulates the nitric oxide system, stimulating NO synthesis in endothelial cells while also providing cytoprotection against NO overproduction in inflammatory states. This dual role contributes to its observed cardiovascular and anti-inflammatory effects.')),
      h3('FAK-Paxillin Pathway'),
      p(t('BPC-157 activates the focal adhesion kinase (FAK)–paxillin signaling axis, which governs cell survival, adhesion, and migration. This pathway is central to its ability to promote cellular repair and resist apoptosis under stress conditions.')),
      h3('Neurotransmitter Modulation'),
      p(t('Research has identified interactions with the dopaminergic and serotonergic neurotransmitter systems, including modulation of dopamine release and 5-HT receptor sensitivity. These effects may account for the observed improvements in movement and mood-related outcomes in animal models.')),
    ),
    pharmacokinetics: lex(
      p(t('BPC-157 presents an unusual pharmacokinetic profile driven by its remarkable stability in biological environments.')),
      h3('Stability in Gastric Acid'),
      p(t('Unlike most peptides, BPC-157 is stable in gastric acid. This derives from its origin as a fragment of a gastric protein — it is inherently resistant to pepsin and acid hydrolysis, which is why oral administration remains under active investigation.')),
      h3('Routes of Administration'),
      ul(
        'Subcutaneous injection: Most studied in animal models; provides predictable systemic exposure. Estimated half-life ~4 hours.',
        'Intramuscular injection: Used in some research protocols; similar profile to SC.',
        'Oral: Investigated given GI stability. Animal data suggests absorption occurs but bioavailability data is incomplete.',
        'Topical: Applied to wound sites in some studies, with local cytoprotective effects documented.'
      ),
      h3('Distribution and Clearance'),
      p(t('BPC-157 distributes to target tissues including the GI tract, tendons, muscles, and the CNS. It is cleared primarily through renal pathways. No significant protein binding has been documented. The peptide does not appear to accumulate with repeated dosing based on animal pharmacokinetic studies.')),
    ),
    researchFindings: lex(
      p(t('The majority of BPC-157 research consists of animal studies, primarily in rodents. No human clinical trials have been published to date.')),
      h3('Tendon and Ligament Repair'),
      p(t('Multiple studies in rat models demonstrate significantly accelerated healing of transected Achilles tendons, ligaments, and muscles when treated with BPC-157. Histological analysis shows increased fibroblast density, collagen organization, and vascularization compared to controls.')),
      h3('Gastrointestinal Cytoprotection'),
      p(t('BPC-157 shows remarkable protective and healing effects across the GI tract — from esophagus to colon. It heals gastric ulcers in rat models, accelerates colon anastomosis healing, and protects against NSAIDs-induced GI damage. This aligns with its endogenous role as a gastric cytoprotective factor.')),
      h3('Neurological Effects'),
      p(t('Animal studies report improved recovery from brain and spinal cord injuries, reversal of dopamine depletion models, and protection against glutamate excitotoxicity. These findings suggest neuroprotective and neuroregenerative potential.')),
      h3('Systemic Organ Protection'),
      p(t('Cytoprotective effects have been documented in the liver, pancreas, heart, and kidneys in various injury models. The peptide appears to exert broad protective effects against ischemia-reperfusion injury and toxic insults.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('BPC-157 has demonstrated an excellent safety profile in preclinical studies spanning decades of research.')),
      h3('Toxicity'),
      p(t('No LD50 has been identified in any animal model, meaning a lethal dose could not be established even at very high doses. This is a notable indicator of low acute toxicity.')),
      h3('Adverse Effects in Animal Studies'),
      p(t('No significant systemic adverse effects have been reported in animal studies. There are no documented cases of organ toxicity, significant hormone disruption, or mutagenicity in the published preclinical literature.')),
      h3('Absence of Human Data'),
      p(t('It is important to note that no human clinical trials have been published as of 2025. All safety data is extrapolated from animal studies. The absence of human trials means the true adverse effect profile in humans remains unknown.')),
      h3('Research Use Classification'),
      p(t('BPC-157 is classified as a research compound only. It has not been approved by the FDA, EMA, or any other regulatory body for human use. It should not be used for self-treatment.')),
    ),
  },

  // ── TB-500 ─────────────────────────────────────────────────────────────────
  'tb-500': {
    mechanismOfAction: lex(
      p(t('TB-500 is a synthetic analog of Thymosin Beta-4 (Tβ4), corresponding to its actin-binding domain (amino acids 17–23). It replicates key biological activities of the full 43-amino acid endogenous peptide.')),
      h3('Actin Sequestration'),
      p(t('TB-500\'s primary molecular role is binding G-actin (globular/monomeric actin) with high affinity, which modulates the G-actin to F-actin (filamentous) ratio. This regulation of actin dynamics is central to cell motility, tissue remodeling, and wound contraction.')),
      h3('Cell Migration and Angiogenesis'),
      p(t('By modulating actin polymerization, TB-500 promotes keratinocyte and endothelial cell migration — essential steps in wound closure and neovascularization. It stimulates the formation of new blood vessels (angiogenesis) via upregulation of VEGF and activation of hypoxia-inducible signaling pathways.')),
      h3('Anti-inflammatory Activity'),
      p(t('TB-500 downregulates pro-inflammatory cytokines including IL-6, IL-8, and TNF-α. It activates NF-κB-inhibiting pathways, which contributes to its ability to reduce inflammation at injury sites without suppressing necessary immune responses.')),
      h3('Matrix Metalloproteinase Activation'),
      p(t('The peptide activates matrix metalloproteinases (MMPs), enzymes critical for degrading and remodeling the extracellular matrix — an essential step in tissue repair and scar remodeling.')),
    ),
    pharmacokinetics: lex(
      p(t('TB-500\'s pharmacokinetic profile is shaped by its peptide structure and typical parenteral routes of administration.')),
      h3('Endogenous Distribution'),
      p(t('Endogenous Thymosin Beta-4 is found in high concentrations in platelets, macrophages, and wound fluid — indicating a central role in the body\'s natural healing response. Plasma levels rise in response to injury.')),
      h3('Routes of Administration'),
      ul(
        'Subcutaneous injection: Standard research route. Gradual absorption provides extended tissue exposure.',
        'Intramuscular injection: Used in some research protocols.',
        'Topical application: Investigated in corneal epithelial injury studies (Fleming et al. clinical trial).'
      ),
      h3('Half-life and Clearance'),
      p(t('The intact peptide has a relatively short circulating half-life due to enzymatic degradation. However, downstream signaling effects on VEGF, actin dynamics, and cytokine modulation persist for significantly longer. Cleared primarily via renal filtration. No significant hepatic first-pass effect with parenteral administration.')),
    ),
    researchFindings: lex(
      p(t('Thymosin Beta-4/TB-500 has been studied in wound healing, cardiac repair, and neurological contexts.')),
      h3('Wound Healing'),
      p(t('Animal studies demonstrate accelerated closure of full-thickness wounds, with improved collagen deposition and reduced scar formation. Corneal epithelial repair studies in animals and a small human trial (Fleming et al.) showed accelerated healing of corneal epithelial defects.')),
      h3('Cardiac Repair'),
      p(t('Research in cardiac ischemia models shows that Tβ4 treatment promotes cardiomyocyte survival, activates cardiac progenitor cells, and stimulates angiogenesis in the infarcted region. These findings have driven interest in cardiac regeneration applications.')),
      h3('Neuroprotection'),
      p(t('Animal studies have demonstrated neuroprotective effects following stroke and traumatic brain injury, including reduced inflammation, promotion of neural cell survival, and accelerated remyelination in some models.')),
      h3('Hair Growth'),
      p(t('Studies in mouse models demonstrate activation of hair follicle stem cells and promotion of hair growth, with potential applications in androgenic alopecia.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('TB-500 has shown a favorable tolerability profile in both preclinical and limited clinical settings.')),
      h3('Clinical Tolerability'),
      p(t('The topical formulation studied in the Fleming corneal trial was well-tolerated. Subcutaneous and intramuscular routes in animal studies have not revealed significant systemic toxicity.')),
      h3('Potential Concerns'),
      ul(
        'Mild injection site reactions (redness, tenderness) are possible with subcutaneous or intramuscular administration.',
        'Theoretical concern regarding stimulation of dormant cancer cells via VEGF/angiogenesis pathways — no evidence of this in animal studies but warrants caution in oncology contexts.',
        'Limited long-term human safety data available.'
      ),
      h3('Regulatory Status'),
      p(t('Not approved for human use by the FDA or EMA. Classified as a research compound. Available as a banned performance-enhancing substance in professional sports (WADA prohibited list).')),
    ),
  },

  // ── Semaglutide ────────────────────────────────────────────────────────────
  semaglutide: {
    mechanismOfAction: lex(
      p(t('Semaglutide is a glucagon-like peptide-1 (GLP-1) receptor agonist developed by Novo Nordisk. GLP-1 is an incretin hormone secreted by intestinal L-cells in response to nutrient ingestion.')),
      h3('GLP-1 Receptor Activation'),
      p(t('Semaglutide binds and activates GLP-1 receptors (GLP-1R) expressed in multiple tissues. In the pancreas, activation stimulates glucose-dependent insulin secretion (protecting against hypoglycemia) and suppresses glucagon release, both reducing post-meal blood glucose elevation.')),
      h3('Central Appetite Suppression'),
      p(t('GLP-1 receptors in the hypothalamus and brainstem regulate appetite and satiety. Semaglutide activates these central receptors, suppressing appetite, reducing caloric intake, and modifying food preferences toward less calorie-dense options. This central mechanism accounts for the significant weight loss observed in trials.')),
      h3('Gastric Emptying Delay'),
      p(t('Semaglutide slows gastric emptying, which attenuates post-prandial glucose excursions and prolongs satiety. This mechanism contributes to both glycemic control and reduced food intake.')),
      h3('Extended Half-life via Albumin Binding'),
      p(t('Native GLP-1 has a half-life of ~2 minutes due to DPP-4 degradation. Semaglutide incorporates a C18 fatty diacid chain via a linker, enabling noncovalent binding to serum albumin. This dramatically extends the half-life to ~168 hours, enabling once-weekly dosing.')),
    ),
    pharmacokinetics: lex(
      p(t('Semaglutide\'s pharmacokinetic profile is precisely engineered for once-weekly subcutaneous dosing or once-daily oral dosing.')),
      h3('Half-life'),
      p(t('Approximately 168 hours (7 days) — achieved through albumin binding and DPP-4 resistance via structural modifications (Aib8 substitution, C18 fatty diacid).')),
      h3('Subcutaneous Formulation (Ozempic / Wegovy)'),
      p(t('Bioavailability: ~89%. Time to peak concentration (Tmax): 1–3 days. Steady-state reached after 4–5 weeks of once-weekly dosing. Volume of distribution: ~12.5L. Degraded via proteolytic cleavage; renal elimination is minor.')),
      h3('Oral Formulation (Rybelsus)'),
      p(t('Requires the absorption enhancer SNAC (sodium N-(8-[2-hydroxybenzoyl]amino)caprylate), which transiently raises local gastric pH and facilitates transcellular absorption. Oral bioavailability: ~1% of the dose with the standard 14mg tablet. Must be taken fasting with ≤4oz water, 30 minutes before food or medication.')),
    ),
    researchFindings: lex(
      p(t('Semaglutide has one of the most robust clinical trial programs in modern endocrinology.')),
      h3('SUSTAIN Program (Diabetes)'),
      p(t('The SUSTAIN trials (1–10) established semaglutide\'s superiority in HbA1c reduction vs insulin glargine, sitagliptin, exenatide ER, and dulaglutide. SUSTAIN-6 demonstrated 26% reduction in major adverse cardiovascular events (MACE) — cardiovascular death, non-fatal MI, non-fatal stroke.')),
      h3('STEP Program (Obesity)'),
      p(t('STEP 1–4 trials with 2.4mg/week semaglutide in adults with obesity (without diabetes) demonstrated mean weight loss of 14.9–17.4% over 68 weeks. STEP 4 showed weight regain after discontinuation, confirming the need for ongoing treatment.')),
      h3('SELECT Trial (2023)'),
      p(t('A landmark cardiovascular outcomes trial in 17,604 adults with obesity/overweight and established cardiovascular disease but no diabetes. Semaglutide 2.4mg reduced the primary MACE endpoint by 20% vs placebo — establishing a cardiovascular benefit independent of its metabolic effects.')),
      h3('PIONEER Program (Oral Semaglutide)'),
      p(t('PIONEER 1–10 trials validated oral semaglutide (Rybelsus) in T2DM across multiple comparators and patient populations, demonstrating HbA1c reductions and weight loss effects comparable to injectable formulations.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Semaglutide\'s safety profile is well-characterized from large-scale clinical trials involving tens of thousands of participants.')),
      h3('Common Adverse Effects'),
      ul(
        'GI: Nausea (15–44%), vomiting (5–24%), diarrhea (8–30%), constipation (5–24%) — typically transient, dose-dependent, most prominent during dose escalation.',
        'Injection site reactions: Mild, transient.',
        'Headache, fatigue, dizziness: Reported in a minority of patients.'
      ),
      h3('Serious Adverse Effects'),
      ul(
        'Pancreatitis: Rare (<1%), but discontinue if suspected. Patients with history of pancreatitis should use with caution.',
        'Gallbladder disease: Increased risk of cholelithiasis and cholecystitis with weight loss.',
        'Diabetic retinopathy: Worsening reported in some patients with pre-existing proliferative retinopathy, possibly from rapid glycemic improvement.'
      ),
      h3('Black Box Warning'),
      p(t('FDA black box warning: Risk of thyroid C-cell tumors. In rodent studies, semaglutide caused dose- and duration-dependent thyroid C-cell adenomas and carcinomas. Relevance to humans is uncertain. Contraindicated in patients with personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).')),
    ),
  },

  // ── Ipamorelin ─────────────────────────────────────────────────────────────
  ipamorelin: {
    mechanismOfAction: lex(
      p(t('Ipamorelin is a synthetic pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH2) and selective ghrelin receptor (GHSR-1a) agonist. It is classified as a growth hormone secretagogue (GHS) within the GHRP class.')),
      h3('Selective GHSR-1a Agonism'),
      p(t('Ipamorelin selectively activates the growth hormone secretagogue receptor type 1a (GHSR-1a) on pituitary somatotrophs, stimulating pulsatile GH release. Critically, this selectivity means it does not significantly elevate cortisol, prolactin, aldosterone, or ACTH — a key distinguishing feature from GHRP-6 and GHRP-2.')),
      h3('Pituitary GH Pulse Stimulation'),
      p(t('Upon binding GHSR-1a, ipamorelin triggers calcium signaling and PKC activation within somatotrophs, resulting in GH granule exocytosis. The resulting GH pulse follows a physiological pulsatile pattern, which is metabolically superior to sustained supraphysiological GH levels.')),
      h3('IGF-1 Axis Activation'),
      p(t('The GH pulse stimulated by ipamorelin drives hepatic IGF-1 production, which mediates many of the downstream anabolic and reparative effects including protein synthesis, fat mobilization, and tissue repair.')),
      h3('Synergy with GHRH Analogs'),
      p(t('Ipamorelin acts synergistically with GHRH analogs (e.g., CJC-1295, sermorelin). GHRH analogs increase GH synthesis and amplify somatotroph responsiveness, while ipamorelin triggers the release pulse. Combined administration produces substantially greater GH secretion than either compound alone.')),
    ),
    pharmacokinetics: lex(
      h3('Half-life'),
      p(t('Approximately 2 hours after subcutaneous injection. This short half-life produces a clean, discrete GH pulse rather than sustained elevation.')),
      h3('Routes of Administration'),
      ul(
        'Subcutaneous injection: Standard research route. Onset of GH pulse within 30–60 minutes.',
        'Intravenous: Used in research settings for precise timing of GH pulse measurement.',
        'Intranasal: Limited bioavailability; not standard.'
      ),
      h3('Dosing Considerations'),
      p(t('Ipamorelin is typically administered 2–3 times daily in research protocols to mimic physiological GH pulsatility. Administration on an empty stomach (somatostatin levels lowest) produces larger GH pulses. High-fat or high-carbohydrate meals suppress GH secretion via somatostatin; timing matters.')),
      h3('Elimination'),
      p(t('Cleared primarily via renal filtration. No significant hepatic metabolism of the intact peptide. No known drug-drug interactions via cytochrome P450 pathways.')),
    ),
    researchFindings: lex(
      p(t('Ipamorelin\'s research base includes animal studies and human Phase I/II clinical trials conducted by Novo Nordisk.')),
      h3('Selective GH Secretion'),
      p(t('Animal and human studies confirm dose-dependent GH release without significant cortisol, prolactin, or ACTH elevation — confirming the selectivity advantage over first-generation GHRPs. This makes ipamorelin the preferred GHRP for research protocols where stress hormone elevation is undesirable.')),
      h3('Body Composition Effects'),
      p(t('Animal studies demonstrate adipose tissue reduction (particularly visceral fat), lean mass preservation, and increased bone mineral density with sustained GH/IGF-1 elevation from ipamorelin treatment.')),
      h3('Human Phase I/II Trials'),
      p(t('Novo Nordisk completed Phase I/II trials demonstrating dose-dependent GH release, good tolerability, and no significant adverse hormonal effects. The compound was not advanced to Phase III; development focus shifted to other GH-related projects.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Ipamorelin demonstrates a favorable tolerability profile, particularly when compared to other growth hormone secretagogues.')),
      h3('Common Effects'),
      ul(
        'Mild flushing or warmth sensation shortly after injection (transient, dose-dependent).',
        'Mild water retention due to IGF-1 elevation (particularly at higher doses).',
        'Occasional headache at supraphysiological doses.',
        'Possible mild injection site reactions.'
      ),
      h3('Absence of Cortisol Elevation'),
      p(t('Unlike GHRP-6, ipamorelin does not significantly elevate cortisol. This is a clinically meaningful advantage for protocols where adrenal axis dysregulation is a concern.')),
      h3('Theoretical Concerns'),
      p(t('GH/IGF-1 elevation should be used cautiously in patients with active malignancy, uncontrolled diabetes, or active proliferative retinopathy. These concerns apply to all GH-stimulating compounds and are not ipamorelin-specific.')),
    ),
  },

  // ── CJC-1295 ───────────────────────────────────────────────────────────────
  'cjc-1295': {
    mechanismOfAction: lex(
      p(t('CJC-1295 is a modified analog of growth hormone-releasing hormone (GHRH), the hypothalamic peptide that naturally stimulates pituitary GH synthesis and secretion.')),
      h3('GHRH Receptor Agonism'),
      p(t('CJC-1295 binds and activates GHRH receptors (GHRHr) on pituitary somatotrophs, stimulating cAMP production, upregulating GH gene transcription, and enhancing GH synthesis and secretion. Unlike ipamorelin (a release trigger), CJC-1295 acts at the level of GH production.')),
      h3('DAC Technology (Drug Affinity Complex)'),
      p(t('Native GHRH has a half-life of ~7 minutes due to DPP-4 enzymatic degradation. CJC-1295 incorporates a maleimidoproprionic acid (MPA) reactive group that covalently bonds to Cys34 on circulating serum albumin. This albumin binding shields the peptide from enzymatic degradation and extends the half-life to 6–8 days. This is the critical pharmacological innovation of CJC-1295.')),
      h3('GH Axis Amplification'),
      p(t('By sustaining GHRH receptor stimulation over days, CJC-1295 increases GH pulse amplitude and frequency and elevates baseline IGF-1 levels. In combination with ipamorelin (which triggers the release pulse), the two compounds have pronounced synergistic effects on GH output.')),
    ),
    pharmacokinetics: lex(
      h3('Half-life'),
      p(t('CJC-1295 with DAC: 6–8 days due to albumin binding. Once-weekly or twice-weekly dosing is appropriate for this formulation. CJC-1295 without DAC (Mod GRF 1-29): ~30 minutes half-life; requires 2–3 times daily dosing.')),
      h3('Onset and Duration'),
      p(t('After a single subcutaneous dose of CJC-1295 (with DAC), GH elevation is observed within hours and sustained over 6+ days. IGF-1 elevation follows GH elevation with a 12–24 hour lag and remains elevated throughout the dosing period.')),
      h3('Subcutaneous Administration'),
      p(t('Standard research route. Peak plasma concentration achieved 2–4 hours post-injection. The extended half-life means plasma concentrations plateau after 3–4 weekly injections (steady-state).')),
    ),
    researchFindings: lex(
      p(t('CJC-1295 has been studied in animal models and in published human Phase I/II clinical trials.')),
      h3('Human Clinical Trials'),
      p(t('Tesch et al. and subsequent investigators demonstrated sustained, dose-dependent GH and IGF-1 elevation following single and multiple doses of CJC-1295 in healthy adult subjects. Mean IGF-1 increases of 26–91% above baseline were observed, persisting for up to 28 days after a single dose (with DAC formulation).')),
      h3('Body Composition in Animal Studies'),
      p(t('Animal studies show improved lean mass, reduced adiposity, and enhanced bone mineral density with sustained GH/IGF-1 elevation from CJC-1295 treatment.')),
      h3('Combination Research'),
      p(t('The combination of CJC-1295 (GHRH analog) with ipamorelin (GHRP) is among the most studied GH-stimulating peptide combinations. Synergistic increases in GH pulse amplitude are consistently demonstrated, with additive or supraadditive effects compared to either compound alone.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('CJC-1295\'s safety profile reflects both its GHRH-mimetic mechanism and the implications of sustained GH/IGF-1 elevation.')),
      h3('Common Adverse Effects'),
      ul(
        'Water retention and mild edema: Due to IGF-1 elevation, which promotes sodium and water retention. Typically dose-dependent and resolves with dose reduction.',
        'Joint pain or stiffness: Common with sustained GH elevation; dose-dependent.',
        'Carpal tunnel-like symptoms: Reported with high-dose GH protocols.',
        'Headache: Reported in some subjects in clinical trials.'
      ),
      h3('Hypoglycemia Risk'),
      p(t('GH has insulin-antagonizing effects. With sustained GH elevation, fasting glucose may rise modestly. However, acute hypoglycemia is possible in susceptible individuals or if combined with insulin sensitizers.')),
      h3('Contraindications'),
      p(t('Avoid in active malignancy due to IGF-1\'s mitogenic and anti-apoptotic signaling. Use with caution in diabetes mellitus, proliferative retinopathy, or history of intracranial hypertension. Not approved for human therapeutic use.')),
    ),
  },

  // ── PT-141 ─────────────────────────────────────────────────────────────────
  'pt-141': {
    mechanismOfAction: lex(
      p(t('PT-141 (bremelanotide) is a cyclic heptapeptide analog of alpha-melanocyte-stimulating hormone (α-MSH). It acts as a melanocortin receptor agonist — the only FDA-approved sexual dysfunction treatment that acts centrally rather than peripherally.')),
      h3('Melanocortin Receptor Agonism'),
      p(t('PT-141 binds melanocortin receptors with the following affinity profile: MC4R (hypothalamus, limbic system) > MC3R > MC1R > MC5R > MC2R. The MC4R agonism is the primary driver of its pro-sexual effects. MC1R agonism accounts for skin pigmentation effects with chronic use.')),
      h3('Central Sexual Arousal Pathway'),
      p(t('Unlike PDE5 inhibitors (sildenafil, tadalafil) which act on penile vasculature, PT-141 acts centrally in the hypothalamus and limbic system — regions governing sexual motivation and arousal. It activates dopaminergic neurons and melanocortin signaling cascades that increase libido and sexual arousal in both sexes.')),
      h3('Independence from Vascular Mechanisms'),
      p(t('PT-141\'s mechanism is not dependent on nitric oxide or cGMP pathways. This means it can produce pro-sexual effects in patients who do not respond to PDE5 inhibitors, and can theoretically be combined with them for additive effects (with appropriate monitoring for BP effects).')),
    ),
    pharmacokinetics: lex(
      h3('Routes of Administration'),
      ul(
        'Subcutaneous injection: FDA-approved route for Vyleesi (bremelanotide). Recommended dose: 1.75mg as needed.',
        'Intranasal spray: Investigated in early trials. Higher dose required; less reliable absorption but convenient.',
        'Oral: Not viable due to peptide degradation.'
      ),
      h3('Onset and Duration'),
      p(t('Subcutaneous: Onset of effects typically 30–60 minutes post-injection. Duration of action: up to 12 hours. Not recommended for use more than once per 24 hours; clinical trials used once-per-event dosing.')),
      h3('Half-life and Metabolism'),
      p(t('Half-life: approximately 2.7 hours. Metabolized via hydrolysis of the amide bond; metabolites are renally excreted. No significant CYP450 interactions documented.')),
    ),
    researchFindings: lex(
      p(t('PT-141 has the most extensive human clinical trial data of any peptide in the sexual dysfunction space.')),
      h3('Female Sexual Dysfunction (HSDD)'),
      p(t('Phase III trials (RECONNECT studies) in premenopausal women with hypoactive sexual desire disorder (HSDD) demonstrated significant improvements in the number of satisfying sexual events (SSE) and female sexual function index (FSFI) scores vs placebo. FDA approved bremelanotide (Vyleesi) for HSDD in premenopausal women in June 2019.')),
      h3('Male Sexual Dysfunction'),
      p(t('Phase IIa trials in men with erectile dysfunction (including those not responding to sildenafil) demonstrated pro-erectile effects independent of visual sexual stimulation. The central mechanism produced arousal-facilitated erections in a majority of subjects.')),
      h3('Animal Studies'),
      p(t('Extensive primate and rodent studies confirm dose-dependent increases in sexual behavior (mount frequency, ejaculation latency reduction) via central MC4R activation. Female rat studies show proceptive behavior induction at low doses.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('PT-141\'s FDA approval provides the most complete human safety dataset of any peptide on this site.')),
      h3('Common Adverse Effects (from Phase III RECONNECT trials)'),
      ul(
        'Nausea: 40% (most common; primarily within 2 hours of injection; typically mild to moderate)',
        'Flushing: 20%',
        'Headache: 11%',
        'Injection site reactions: 13%',
        'Fatigue, transient hypotension'
      ),
      h3('Blood Pressure Effects'),
      p(t('Transient increases in systolic BP (~6–9 mmHg) and diastolic BP (~5–7 mmHg) lasting up to 12 hours. Contraindicated in patients with uncontrolled hypertension or high cardiovascular risk. Monitor BP before and after first dose.')),
      h3('Hyperpigmentation'),
      p(t('Due to MC1R agonism. Reported with repeated/chronic use. Typically affects face, gums, and chest. This effect is cosmetically significant and limits chronic dosing. The FDA-approved dosing (maximum once per 24 hours, no more than 1 dose per 8 hours in trials) is designed to limit this risk.')),
      h3('Contraindications'),
      p(t('High cardiovascular risk, uncontrolled hypertension, history of MACE events. Not to be combined with nitrate medications. Caution in patients taking antihypertensives.')),
    ),
  },

  // ── Epithalon ──────────────────────────────────────────────────────────────
  epithalon: {
    mechanismOfAction: lex(
      p(t('Epithalon (also spelled Epitalon) is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) derived from epithalamin, an extract of the bovine pineal gland. It was developed by Vladimir Khavinson at the St. Petersburg Institute of Bioregulation and Gerontology.')),
      h3('Telomerase Activation'),
      p(t('Epithalon\'s most significant proposed mechanism is activation of telomerase (specifically, induction of hTERT, the catalytic subunit of telomerase) in somatic cells. Telomerase extends telomeres — the protective end caps of chromosomes that shorten with each cell division. This mechanism is associated with extended cellular replicative capacity and has implications for aging biology.')),
      h3('Pineal Gland Stimulation'),
      p(t('Epithalon stimulates the pineal gland to produce and secrete melatonin. In aged animals, melatonin secretion becomes dysregulated and reduced. Epithalon restores more youthful circadian melatonin patterns, which has downstream effects on sleep quality, immune function, and antioxidant activity (melatonin is a potent antioxidant).')),
      h3('Hypothalamic-Pituitary Axis Normalization'),
      p(t('Research demonstrates that Epithalon modulates the hypothalamic-pituitary axis, reducing age-related hormonal dysregulation including elevated basal cortisol and altered GH secretory patterns in aged models.')),
      h3('Antioxidant Activity'),
      p(t('Epithalon reduces lipid peroxidation and oxidative stress markers. This antioxidant effect is both direct and indirect (via melatonin elevation), contributing to cytoprotection at the cellular level.')),
    ),
    pharmacokinetics: lex(
      p(t('As a very short tetrapeptide, Epithalon has a limited pharmacokinetic profile that drives its cyclical research dosing protocols.')),
      h3('Routes of Administration'),
      ul(
        'Intravenous (IV): Used in most human clinical research. Rapid distribution.',
        'Subcutaneous injection: Increasingly used in research protocols. Good absorption.',
        'Nasal spray: Investigated in some protocols, but bioavailability data is limited.',
        'Oral: Not bioavailable — rapidly degraded by GI peptidases.'
      ),
      h3('Half-life'),
      p(t('Very short circulating half-life due to peptide size — minutes for the intact tetrapeptide. However, downstream effects (telomerase activation, pineal stimulation, antioxidant enzyme induction) persist well beyond peptide clearance.')),
      h3('Research Dosing Protocols'),
      p(t('Most published research uses cyclical protocols: 5–10 days of daily IV or SC administration, repeated twice yearly. This approach is hypothesized to trigger epigenetic effects that persist beyond the treatment window, similar to other bioregulatory peptides in the Khavinson research tradition.')),
    ),
    researchFindings: lex(
      p(t('Epithalon has a substantial body of research from Soviet and post-Soviet institutions, with some peer-reviewed publications in Western journals.')),
      h3('Lifespan Extension in Animal Models'),
      p(t('Multiple rodent studies report lifespan extension of up to 25% with Epithalon treatment. Khavinson et al. published results showing reduced cancer incidence, improved physiological parameters, and extended mean and maximum lifespan in treated cohorts.')),
      h3('Human Longitudinal Studies'),
      p(t('Long-term follow-up studies in elderly human subjects treated with Epithalon or epithalamin report normalization of circadian melatonin rhythm, improvements in immune function markers, reduced cardiovascular disease incidence, and apparent reduction in overall mortality vs untreated age-matched controls. These are largely observational data, not randomized controlled trials.')),
      h3('Telomerase Activation in Cell Culture'),
      p(t('In vitro studies in cultured human somatic cells demonstrate that Epithalon treatment activates telomerase, extends replicative lifespan beyond the Hayflick limit in some cell types, and does not induce chromosomal instability or malignant transformation at tested doses.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Epithalon has an excellent observed safety profile, consistent with its endogenous origin and small molecular size.')),
      h3('Human Safety Data'),
      p(t('No significant adverse effects have been documented in human observational studies and follow-up data spanning up to 12 years of treatment. Given the cyclical, short-duration dosing protocols, systemic accumulation is unlikely.')),
      h3('Genotoxicity'),
      p(t('In vitro and animal genotoxicity studies have not identified chromosomal aberrations, DNA damage, or mutagenic activity. Telomerase activation concerns (theoretical oncogenic risk via telomere lengthening) have not translated to increased cancer rates in animal or human studies — cancer incidence was actually reduced in Khavinson\'s long-term data.')),
      h3('Limitations of Safety Data'),
      p(t('Safety data is primarily from a single research group in St. Petersburg, Russia. The studies, while published in peer-reviewed journals, have not been independently replicated at scale in Western research institutions. No randomized controlled trials with safety as a primary endpoint have been conducted.')),
    ),
  },

  // ── Thymosin Alpha-1 ───────────────────────────────────────────────────────
  'thymosin-alpha-1': {
    mechanismOfAction: lex(
      p(t('Thymosin Alpha-1 (Tα1, thymalfasin) is a 28-amino acid, N-terminally acetylated peptide naturally produced by the thymic epithelium. It is commercially available as Zadaxin (SciClone Pharmaceuticals) and approved for clinical use in over 35 countries.')),
      h3('Toll-like Receptor Activation'),
      p(t('Tα1 binds and activates Toll-like receptors 2 and 9 (TLR-2, TLR-9) on dendritic cells and macrophages. TLR activation triggers innate immune signaling cascades that prime adaptive immunity, including NF-κB activation, production of pro-inflammatory cytokines (IL-12, IL-6, IFN-α), and upregulation of co-stimulatory molecules.')),
      h3('T-cell Differentiation and Th1 Polarization'),
      p(t('Tα1 promotes T-lymphocyte differentiation and maturation in the thymus. It biases the immune response toward Th1 polarization (cell-mediated immunity) — favoring cytotoxic T-cell and NK cell activation over Th2 (humoral/allergic) responses. This profile is beneficial in chronic viral infections and cancer immunotherapy contexts.')),
      h3('NK Cell Enhancement'),
      p(t('Natural killer (NK) cell cytotoxicity is increased by Tα1 treatment, enhancing the immune system\'s first-line antiviral and antitumor surveillance capacity.')),
      h3('MHC Class I Upregulation'),
      p(t('Tα1 increases expression of MHC class I molecules on the surface of infected or malignant cells, making them more visible to cytotoxic T-lymphocytes (CTLs). This antigen presentation enhancement is particularly valuable in chronic viral infections where viruses downregulate MHC-I to evade immune detection.')),
    ),
    pharmacokinetics: lex(
      h3('Routes of Administration'),
      p(t('Subcutaneous injection is the approved and predominant route. Standard Zadaxin dose: 1.6mg SC twice weekly for hepatitis B/C indications.')),
      h3('Half-life'),
      p(t('Approximately 2 hours. Despite the short half-life, immunological effects are sustained well beyond peptide clearance due to downstream cellular programming (memory T-cell priming, dendritic cell activation).')),
      h3('Distribution and Elimination'),
      p(t('Rapidly distributed to lymphoid tissues and sites of immune activation. Predominantly cleared via renal filtration. No significant hepatic first-pass metabolism with subcutaneous administration. No CYP450 interactions documented.')),
      h3('No Food-Drug Interactions'),
      p(t('As a peptide administered parenterally, Tα1 does not interact with the cytochrome P450 system. However, coadministration with immunosuppressants (e.g., cyclosporine, tacrolimus) would be expected to reduce its efficacy.')),
    ),
    researchFindings: lex(
      p(t('Thymosin Alpha-1 has one of the most extensive clinical research records of any research peptide, spanning decades of use in approved indications.')),
      h3('Hepatitis B'),
      p(t('Multiple randomized controlled trials demonstrate significant improvement in HBe antigen seroconversion, HBV DNA suppression, and ALT normalization with Tα1 treatment. Approved for use in chronic hepatitis B in several Asian and Eastern European countries.')),
      h3('Hepatitis C'),
      p(t('In combination with interferon-α, Tα1 improves sustained virological response (SVR) rates in chronic HCV. A Cochrane meta-analysis of 14 trials confirmed improved SVR over interferon alone.')),
      h3('COVID-19'),
      p(t('Clinical trials in Italy (Shi et al., 2020) and China demonstrated that Tα1 treatment in severe COVID-19 patients significantly reduced 28-day mortality vs standard of care. A mechanistic rationale was that Tα1 reversed T-cell exhaustion and lymphopenia, which were associated with severe outcomes.')),
      h3('Cancer and Immune Adjuvancy'),
      p(t('Phase II/III trials in hepatocellular carcinoma, melanoma, and lung cancer as an immune adjuvant have been conducted, with variable results. Its use as a vaccine adjuvant to improve immunogenicity in elderly or immunocompromised patients is an active research area.')),
      h3('Sepsis'),
      p(t('Studies in ICU patients with sepsis demonstrate reduced 28-day mortality with Tα1 treatment, attributed to reversal of immune paralysis (the "immunoparalysis" phenotype that contributes to sepsis mortality).')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Thymosin Alpha-1 has decades of clinical use with an established safety profile.')),
      h3('Tolerability'),
      p(t('Injection site reactions (mild redness, induration) are the most commonly reported adverse effect. Typically transient and self-resolving.')),
      h3('Systemic Safety'),
      p(t('No significant systemic adverse effects, organ toxicity, or serious adverse events attributable to Tα1 have been established in the extensive clinical trial literature. It has been administered to tens of thousands of patients across approved indications and clinical trials.')),
      h3('Autoimmune Risk'),
      p(t('Theoretical concern: Th1 polarization could theoretically exacerbate certain autoimmune conditions. However, this has not been observed clinically. Caution is warranted in patients with pre-existing autoimmune conditions; consult a physician before use.')),
      h3('Drug Interactions'),
      p(t('Concurrent use with immunosuppressants would antagonize Tα1\'s immunostimulatory effects. Not recommended in transplant patients on maintenance immunosuppression without specialist guidance.')),
    ),
  },

  // ── Selank ─────────────────────────────────────────────────────────────────
  selank: {
    mechanismOfAction: lex(
      p(t('Selank (TBKRPGP) is a synthetic heptapeptide developed by the Institute of Molecular Genetics of the Russian Academy of Sciences. It is a structural analog of the endogenous tetrapeptide tuftsin (Thr-Lys-Pro-Arg), with additional tripeptide Pro-Gly-Pro incorporated to improve stability.')),
      h3('GABA-A Receptor Modulation'),
      p(t('Selank interacts with GABA-A receptors at benzodiazepine binding sites, producing anxiolytic effects via positive allosteric modulation of GABAergic tone. Unlike benzodiazepines, it does not appear to cause significant receptor downregulation, respiratory depression, or dependence — properties that make it a safer anxiolytic candidate.')),
      h3('BDNF and Neuroplasticity'),
      p(t('Selank upregulates Brain-Derived Neurotrophic Factor (BDNF) and its receptor TrkB. BDNF is essential for neuronal survival, synaptic plasticity, learning, and memory consolidation. Elevated BDNF is associated with improved cognitive performance and resilience to neurodegeneration.')),
      h3('Serotonin System Modulation'),
      p(t('Selank activates 5-hydroxytryptophan (5-HTP) decarboxylase, increasing serotonin synthesis from tryptophan. This serotoninergic component contributes to anxiolytic and mood-stabilizing effects. Additionally, it modulates the expression of serotonin transporter (SERT), influencing serotonin reuptake dynamics.')),
      h3('Anti-inflammatory and Immune Modulation'),
      p(t('As a tuftsin analog, Selank retains immunomodulatory properties. It reduces IL-6 and TNF-α expression and modulates T-cell activity, providing an anti-inflammatory component that may contribute to its stress-protective (adaptogenic) properties.')),
    ),
    pharmacokinetics: lex(
      h3('Intranasal Route (Primary)'),
      p(t('Selank is approved in Russia as a nasal spray (Selank, PEPTOGEN). The intranasal route provides rapid CNS delivery via the olfactory bulb pathway, bypassing the blood-brain barrier. This explains why effects are felt rapidly despite the short plasma half-life of the intact peptide.')),
      h3('Subcutaneous Route'),
      p(t('Subcutaneous injection has been studied in research settings and used in clinical protocols. Provides systemic exposure with more predictable dosing.')),
      h3('Half-life'),
      p(t('The intact heptapeptide has a very short half-life (minutes) due to enzymatic degradation by aminopeptidases. The Pro-Gly-Pro tripeptide stabilizes it relative to tuftsin, but it is still rapidly metabolized. Despite this, behavioral and neurochemical effects (BDNF elevation, serotonin modulation) persist for 4–8 hours due to downstream signaling cascades.')),
    ),
    researchFindings: lex(
      p(t('Selank\'s research base is predominantly from Russian institutions, with a growing body of peer-reviewed publications in international journals.')),
      h3('Anxiolytic Efficacy'),
      p(t('Controlled clinical studies comparing Selank nasal spray to benzodiazepines (medazepam, phenazepam) in generalized anxiety disorder demonstrate comparable anxiolytic efficacy with a superior side effect profile. No sedation, no cognitive impairment, no dependence, and no withdrawal syndrome were documented in Selank-treated patients.')),
      h3('Cognitive Enhancement'),
      p(t('Studies demonstrate improvements in attention, memory consolidation, and processing speed in healthy volunteers and patients with cognitive impairment. The BDNF-mediated neuroplasticity enhancement is the proposed mechanism.')),
      h3('Adaptogenic Properties'),
      p(t('Animal and human stress studies show Selank reduces cortisol responses to stressors, improves performance under cognitively demanding conditions, and normalizes dysregulated stress responses — defining characteristics of an adaptogen.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Selank has an excellent safety and tolerability profile based on both animal studies and human clinical use.')),
      h3('Common Effects'),
      ul(
        'Mild nasal irritation or rhinorrhea with intranasal administration (transient).',
        'Mild injection site reactions with subcutaneous use.',
        'Occasional brief drowsiness reported in some users (mild, unlike benzodiazepines).'
      ),
      h3('Absence of Dependence and Withdrawal'),
      p(t('No physical dependence, tolerance, or withdrawal syndrome has been documented in clinical studies or post-marketing surveillance in Russia. This sharply differentiates Selank from classical GABA-A modulators (benzodiazepines, barbiturates).')),
      h3('No Sedation or Cognitive Impairment'),
      p(t('Unlike benzodiazepines, Selank does not cause significant sedation, motor impairment, or anterograde amnesia. Its use does not impair driving or complex cognitive tasks in clinical studies — a major clinical advantage.')),
    ),
  },

  // ── GHK-Cu ─────────────────────────────────────────────────────────────────
  'ghk-cu': {
    mechanismOfAction: lex(
      p(t('GHK-Cu (Copper peptide GHK) is a naturally occurring tripeptide-copper complex (Gly-His-Lys·Cu²⁺) first identified in human plasma by Loren Pickart in 1973. It serves as a critical carrier of copper — a cofactor for multiple essential enzymes.')),
      h3('TGF-β1 Pathway Activation'),
      p(t('GHK-Cu directly activates the TGF-β1 (transforming growth factor beta-1) signaling pathway, the primary driver of fibroblast proliferation and extracellular matrix (ECM) synthesis. This leads to upregulated collagen I, III, and IV production, elastin synthesis, and glycosaminoglycan deposition — the essential components of connective tissue repair.')),
      h3('Copper Delivery and Enzymatic Cofactor Activity'),
      p(t('GHK acts as a copper chaperone, delivering Cu²⁺ to copper-dependent enzymes including lysyl oxidase (essential for collagen and elastin crosslinking), superoxide dismutase (antioxidant defense), and cytochrome c oxidase (mitochondrial ATP production). This enzymatic activation underlies multiple tissue-repair and antioxidant effects.')),
      h3('TIMP Upregulation'),
      p(t('GHK-Cu upregulates tissue inhibitors of metalloproteinases (TIMPs), which regulate MMP activity. This balance prevents excessive ECM degradation while allowing appropriate tissue remodeling — important for scar-free healing vs fibrotic scarring.')),
      h3('Broad Gene Expression Effects'),
      p(t('Gene expression analyses reveal that GHK-Cu modulates an estimated 4,000 human genes. The majority of affected genes relate to tissue remodeling (collagen synthesis, MMP/TIMP balance), inflammation resolution, nervous system maintenance (BDNF, neuroplasmin), and metabolic activity. This broad genomic influence accounts for its wide-ranging biological effects.')),
    ),
    pharmacokinetics: lex(
      h3('Topical Application (Primary Research/Commercial Route)'),
      p(t('GHK-Cu is well-absorbed through the stratum corneum in a molecular weight-appropriate vehicle. The tripeptide-copper complex penetrates to the dermis, where it is taken up by fibroblasts and keratinocytes. This explains its extensive use in dermatological cosmetics and wound care.')),
      h3('Subcutaneous and Systemic'),
      p(t('Subcutaneous injection provides systemic delivery. GHK-Cu is naturally found in plasma (~110–200 ng/mL in young adults) and saliva. Plasma concentrations decline significantly with aging, correlating with reduced tissue repair capacity.')),
      h3('Metabolism'),
      p(t('Rapidly taken up by cells; the free copper ion is utilized by metalloenzymes or sequestered by metallothioneins. The peptide backbone (Gly-His-Lys) is metabolized via standard aminopeptidase pathways. No significant accumulation. Copper loading to toxic levels requires extremely high doses — not achievable with GHK-Cu at any physiological dosing scheme.')),
    ),
    researchFindings: lex(
      p(t('GHK-Cu has a substantial research record spanning wound healing, skin biology, hair growth, and neuroprotection.')),
      h3('Wound Healing'),
      p(t('Multiple animal and in vitro studies demonstrate accelerated wound closure, improved tensile strength, and enhanced collagen deposition with GHK-Cu treatment. Human skin wound studies show faster re-epithelialization and reduced scar formation.')),
      h3('Skin Aging and Dermatology'),
      p(t('Double-blind, placebo-controlled studies in human subjects demonstrate statistically significant improvements in skin thickness, elasticity, wrinkle depth, and collagen density with topical GHK-Cu application over 12-week periods. These studies are among the strongest evidence for any topical cosmeceutical.')),
      h3('Hair Growth'),
      p(t('GHK-Cu activates hair follicle stem cells and prolongs the anagen (growth) phase of the hair cycle in animal models. Human studies are limited but show promise for androgenic alopecia applications.')),
      h3('Neuroprotection'),
      p(t('Animal studies show nerve regeneration-promoting effects, including accelerated peripheral nerve repair following injury. The mechanism involves activation of neurotrophic signaling and antioxidant enzyme upregulation in neural tissue.')),
      h3('Anti-cancer Gene Expression Normalization'),
      p(t('Loren Pickart\'s analysis of GHK-Cu\'s gene expression profile found that it reverses gene expression patterns associated with metastatic colon cancer to more normal epithelial patterns. This observation, while preliminary, has generated interest in cancer biology research.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('GHK-Cu has an extensive safety record from both cosmetic use and clinical research.')),
      h3('Topical Safety'),
      p(t('GRAS (Generally Recognized as Safe) for cosmetic use. Decades of topical application in cosmeceutical products without significant adverse event reporting. Mild contact dermatitis has been rarely reported, typically due to vehicle ingredients rather than the peptide-copper complex.')),
      h3('Systemic Safety'),
      p(t('No significant systemic toxicity documented in animal studies or human research. Copper toxicity concerns are theoretical — the concentration of copper in any physiologically relevant GHK-Cu dose is far below the threshold for copper accumulation or toxicity. GHK is a natural copper carrier in human plasma.')),
      h3('Injectable Use'),
      p(t('High-concentration subcutaneous injection (higher than topical) may cause transient local reactions including redness or tenderness. No serious adverse effects have been reported in research literature with subcutaneous administration.')),
      h3('Regulatory Status'),
      p(t('GHK-Cu is approved as a cosmetic ingredient in many countries and widely used in skincare formulations. As a research injectable, it has not undergone FDA or EMA approval for therapeutic use. Classified as research use only for injection applications.')),
    ),
  },
}
