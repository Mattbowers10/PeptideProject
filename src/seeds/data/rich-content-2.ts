/**
 * Rich content (Lexical JSON) — batch 2
 * Peptides: GHRP-6, GHRP-2, Sermorelin, Hexarelin, Tesamorelin,
 *           AOD-9604, Semax, IGF-1 LR3, Thymosin Beta-4, Tirzepatide
 */

// ── Lexical node helpers ──────────────────────────────────────────────────────
const t = (text: string, format = 0) => ({
  type: 'text' as const, format, detail: 0, mode: 'normal' as const,
  style: '', text, version: 1,
})
const p = (...texts: ReturnType<typeof t>[]) => ({
  type: 'paragraph' as const, format: '' as const, indent: 0, version: 1,
  children: texts, direction: 'ltr' as const,
})
const h3 = (text: string) => ({
  type: 'heading' as const, tag: 'h3' as const, format: '' as const,
  indent: 0, version: 1, children: [t(text)], direction: 'ltr' as const,
})
const ul = (...items: string[]) => ({
  type: 'list' as const, listType: 'bullet' as const, start: 1, tag: 'ul' as const,
  format: '' as const, indent: 0, version: 1,
  children: items.map((item, i) => ({
    type: 'listitem' as const, value: i + 1, format: '' as const, indent: 0,
    version: 1, children: [t(item)], direction: 'ltr' as const,
  })),
  direction: 'ltr' as const,
})
const lex = (...nodes: object[]) => ({
  root: { type: 'root' as const, format: '' as const, indent: 0, version: 1,
    children: nodes, direction: 'ltr' as const },
})

// ── Content ───────────────────────────────────────────────────────────────────
export const richContent2: Record<string, {
  mechanismOfAction: object; pharmacokinetics: object;
  researchFindings: object; sideEffectsAndSafety: object
}> = {

  // ── GHRP-6 ───────────────────────────────────────────────────────────────
  'ghrp-6': {
    mechanismOfAction: lex(
      p(t('GHRP-6 (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide and the first GHRP class compound extensively characterized. It acts as an agonist at the ghrelin receptor (GHSR-1a) to stimulate pulsatile growth hormone secretion from the anterior pituitary.')),
      h3('Ghrelin Receptor Agonism'),
      p(t('GHRP-6 mimics the endogenous peptide ghrelin by binding GHSR-1a receptors on pituitary somatotrophs, triggering calcium mobilization and GH granule exocytosis. It also activates GHSR-1a in the hypothalamus, suppressing somatostatin (GH inhibitor) release, which amplifies net GH output.')),
      h3('Hunger and Appetite Stimulation'),
      p(t('GHRP-6 has the strongest appetite-stimulating effect of all GHRP compounds due to potent GHSR-1a activation in both the hypothalamus (orexigenic NPY/AgRP neurons) and the stomach. This ghrelin-like effect can increase food intake by 30–50% in animal models, which may be a therapeutic feature (cachexia) or a liability (obesity).')),
      h3('Gastroprotective Activity'),
      p(t('Independent of GH secretion, GHRP-6 has documented cytoprotective effects on the gastric mucosa — a property shared with BPC-157 but operating through distinct GHSR-1a-mediated pathways including anti-apoptotic and anti-inflammatory signaling in gut epithelial cells.')),
    ),
    pharmacokinetics: lex(
      h3('Half-life and Administration'),
      p(t('GHRP-6 has a short plasma half-life of approximately 15–60 minutes. It is administered subcutaneously or intravenously. The GH pulse peaks 15–45 minutes post-injection and returns to baseline within 2–3 hours. Intranasal delivery has been studied with limited bioavailability.')),
      h3('Timing Considerations'),
      p(t('GH secretagogue activity is highest in a fasted state when somatostatin tone is lowest. High carbohydrate or fat meals significantly blunt the GH response via insulin-mediated somatostatin increase. Administration timing 30–60 minutes from meals is standard in research protocols.')),
      h3('Frequency'),
      p(t('Typically administered 2–3 times daily in research protocols to simulate physiological GH pulsatility. More frequent dosing does not produce proportional increases in GH due to receptor desensitization between pulses.')),
    ),
    researchFindings: lex(
      p(t('GHRP-6 has extensive preclinical and some clinical research, including Phase I/II data from the original Bowers/Cytomedics development program.')),
      h3('GH Secretion'),
      p(t('GHRP-6 produces robust dose-dependent GH pulses in animal models and humans. It is synergistic with GHRH analogs — combined administration produces 2–8x greater GH response than either compound alone. This synergy forms the basis for GHRP-6 + CJC-1295 combination research protocols.')),
      h3('Body Composition'),
      p(t('Animal studies demonstrate dose-dependent increases in lean mass, reduction of visceral adiposity, and improved nitrogen balance with chronic GHRP-6 administration, consistent with GH/IGF-1 axis activation.')),
      h3('Cardiac Protection'),
      p(t('Multiple animal studies demonstrate cardioprotective effects of GHRP-6 in ischemia-reperfusion injury models, reducing infarct size and improving cardiac function. The mechanism appears partially independent of GH, involving direct GHSR-1a activation in cardiomyocytes and anti-apoptotic PI3K/Akt signaling.')),
    ),
    sideEffectsAndSafety: lex(
      h3('Common Effects'),
      ul(
        'Significant hunger/appetite stimulation — most pronounced of all GHRPs. Can be considered a benefit or liability depending on context.',
        'Cortisol elevation (moderate) — due to GHSR-1a activation of the HPA axis. Less pronounced than stress cortisol response but present.',
        'Prolactin elevation — mild, dose-dependent.',
        'Water retention — secondary to IGF-1 elevation.',
        'Flushing, tingling sensations within minutes of injection.',
        'Mild fatigue or headache at higher doses.'
      ),
      h3('Comparison to Other GHRPs'),
      p(t('GHRP-6 produces the strongest hunger effect of all GHRPs (GHRP-2, ipamorelin, hexarelin). Ipamorelin is preferred when cortisol and hunger effects must be minimized. GHRP-2 has higher GH release potency with similar cortisol/prolactin profile but less hunger.')),
      h3('Regulatory Status'),
      p(t('Not approved for human use. Classified as research compound. Banned by WADA as a performance-enhancing substance.')),
    ),
  },

  // ── GHRP-2 ───────────────────────────────────────────────────────────────
  'ghrp-2': {
    mechanismOfAction: lex(
      p(t('GHRP-2 (D-Ala-D-βNal-Ala-Trp-D-Phe-Lys-NH2) is a synthetic hexapeptide GHSR-1a agonist with greater GH-stimulating potency than GHRP-6 but less hunger-stimulating activity. It represents a second-generation GHRP optimized for GH release.')),
      h3('High-Potency GHSR-1a Agonism'),
      p(t('GHRP-2 binds GHSR-1a with higher affinity than GHRP-6, producing larger GH pulses at equivalent doses. This higher potency also translates to greater cortisol and prolactin activation — a trade-off versus ipamorelin\'s selectivity.')),
      h3('Somatostatin Suppression'),
      p(t('Like other GHRPs, GHRP-2 suppresses hypothalamic somatostatin release while simultaneously stimulating pituitary GH secretion. This dual mechanism (amplifying GH synthesis and reducing GH inhibition) underlies its potent GH-releasing effect.')),
      h3('IGF-1 Axis'),
      p(t('The GH pulse triggered by GHRP-2 stimulates hepatic IGF-1 production, mediating downstream anabolic, reparative, and metabolic effects. The magnitude of IGF-1 elevation correlates with GH pulse amplitude and cumulative GH exposure over time.')),
    ),
    pharmacokinetics: lex(
      h3('Half-life'),
      p(t('Approximately 15–60 minutes. Similar to GHRP-6. SC or IV administration. GH peak occurs at 15–30 minutes post-injection.')),
      h3('Synergistic Combinations'),
      p(t('GHRP-2 demonstrates synergy with GHRH analogs. The GHRP-2 + CJC-1295 combination is researched as a particularly potent GH-stimulating protocol. In this combination, CJC-1295 amplifies GH synthesis and somatotroph responsiveness, while GHRP-2 triggers the release pulse.')),
      h3('Frequency'),
      p(t('Administered 2–3 times daily in research protocols. High-frequency administration can lead to receptor desensitization, limiting returns from more than 3 daily doses.')),
    ),
    researchFindings: lex(
      p(t('GHRP-2 (pralmorelin) reached Phase III clinical trials, giving it one of the strongest human evidence bases among GHRP compounds.')),
      h3('Clinical Trials for GH Deficiency'),
      p(t('Phase III trials in Japan evaluated pralmorelin as a diagnostic agent for GH deficiency. It demonstrated reliable, reproducible GH secretion, dose-dependent responses, and superior GH peak vs some comparators. Approved in Japan as a GH deficiency diagnostic test (Ghrelin analog diagnostic).')),
      h3('Body Composition'),
      p(t('Research demonstrates significant dose-dependent increases in GH and IGF-1, with downstream improvements in lean mass and reductions in visceral adipose tissue in animal models.')),
      h3('Cancer Cachexia'),
      p(t('Clinical research exploring GHRP-2 for cancer-related cachexia and muscle wasting has shown promise, with increased IGF-1 and improved nitrogen balance in small trials.')),
    ),
    sideEffectsAndSafety: lex(
      h3('Adverse Effects Profile'),
      ul(
        'Cortisol elevation: More pronounced than ipamorelin; moderate vs GHRP-6.',
        'Prolactin elevation: Dose-dependent; mild at standard research doses.',
        'Hunger stimulation: Less than GHRP-6 but more than ipamorelin.',
        'Water retention: Secondary to IGF-1.',
        'Flushing, brief tingling sensation post-injection.',
        'Rare: facial pallor, cardiovascular effects at supraphysiological doses.'
      ),
      h3('Clinical Safety Data'),
      p(t('Pralmorelin\'s Phase III development provides human safety data from controlled trials, making it one of the better-characterized GHRP compounds. No serious adverse events attributed to the compound in trial populations at approved diagnostic doses.')),
    ),
  },

  // ── Sermorelin ────────────────────────────────────────────────────────────
  sermorelin: {
    mechanismOfAction: lex(
      p(t('Sermorelin (GHRH 1-29) is a 29-amino acid synthetic peptide corresponding to the biologically active N-terminal fragment of endogenous GHRH (growth hormone-releasing hormone). It was FDA-approved as Geref for pediatric GH deficiency and is the prototype GHRH analog in research.')),
      h3('GHRH Receptor Agonism'),
      p(t('Sermorelin binds the GHRH receptor (GHRHr) on pituitary somatotrophs — the same receptor activated by hypothalamic GHRH. This binding triggers adenylyl cyclase activation, cAMP production, PKA signaling, and ultimately GH gene transcription, synthesis, and secretion. It stimulates the entire GH production pathway, not just release.')),
      h3('Physiological Pulsatility'),
      p(t('Unlike exogenous recombinant HGH (which provides a continuous supraphysiological level), sermorelin stimulates the pituitary to produce and release GH in a physiological pulsatile pattern. This preserves the feedback regulation of the GH/IGF-1 axis and is thought to produce a more natural hormonal response with potentially fewer side effects.')),
      h3('Pituitary Preservation'),
      p(t('Sermorelin use maintains pituitary function and prevents the atrophy that can occur with chronic exogenous GH replacement. The pituitary continues to produce GH in response to sermorelin, whereas exogenous GH suppresses endogenous GH secretion through negative feedback.')),
    ),
    pharmacokinetics: lex(
      h3('Half-life'),
      p(t('Approximately 10–20 minutes — much shorter than CJC-1295 with DAC (6–8 days). Rapidly degraded by DPP-4. Subcutaneous injection required, typically given at bedtime to coincide with natural nocturnal GH peak.')),
      h3('Routes of Administration'),
      ul(
        'Subcutaneous injection: Standard route. Administered once daily at bedtime in clinical use.',
        'Intravenous: Used diagnostically to assess pituitary GH reserve.',
        'Intranasal: Studied but limited bioavailability.'
      ),
      h3('Clinical Dosing'),
      p(t('FDA-approved diagnostic dosing: 1 mcg/kg IV for GH stimulation test. Clinical replacement dosing (off-label, adult anti-aging medicine): typically 100–300 mcg SC nightly. Steady-state GH elevation develops over weeks with consistent use.')),
    ),
    researchFindings: lex(
      h3('FDA Approval — Pediatric GH Deficiency'),
      p(t('Sermorelin was FDA-approved (1990s, Geref by Serono) for the treatment of idiopathic GH deficiency in children. Phase III trials demonstrated significant improvement in growth velocity, height SDS, and IGF-1 levels, leading to approval. Later withdrawn from market for commercial (not safety) reasons as recombinant HGH became dominant.')),
      h3('Adult Anti-Aging and Wellness'),
      p(t('Observational data and small studies in adults with age-related GH decline show improvements in IGF-1, body composition (lean mass vs fat), sleep quality, and subjective wellbeing with sermorelin replacement. Preferred over exogenous GH by some clinicians due to physiological mechanism and preserved feedback.')),
      h3('Combination with GHRPs'),
      p(t('The sermorelin + ipamorelin combination is frequently used in functional medicine to provide dual-pathway GH stimulation: sermorelin acts at the GHRHr (synthesis and release) while ipamorelin acts at GHSR-1a (release trigger). This combination may produce greater GH output than either compound alone.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Sermorelin has an excellent long-term safety record from both pediatric clinical use and adult off-label use.')),
      ul(
        'Injection site reactions: Mild redness, pain, or swelling. Most common adverse effect.',
        'Transient flushing or warmth sensation post-injection.',
        'Headache: Occasional, typically mild.',
        'Hyperactivity or agitation: Rare, reported in pediatric trials.',
        'No significant cortisol, prolactin, or ACTH effects (unlike GHRPs).'
      ),
      h3('Safety vs Exogenous GH'),
      p(t('Sermorelin\'s physiological mechanism and preserved feedback regulation are frequently cited as safety advantages over exogenous recombinant GH: no supraphysiological IGF-1 peaks, no pituitary suppression, and endogenous regulation prevents excessive GH response. These theoretical advantages lack direct comparative clinical trial data but are supported by mechanism.')),
    ),
  },

  // ── Hexarelin ─────────────────────────────────────────────────────────────
  hexarelin: {
    mechanismOfAction: lex(
      p(t('Hexarelin (His-D-2-MeTrp-Ala-Trp-D-Phe-Lys-NH2) is a synthetic hexapeptide with the highest GH-releasing potency of all GHRP compounds. It is a GHSR-1a agonist with additional activity at the CD36 scavenger receptor, distinguishing it from other GHRPs with cardiac-specific effects.')),
      h3('GHSR-1a — Maximum GH Potency'),
      p(t('Hexarelin produces the largest GH pulses of any GHRP at equivalent doses due to its high-affinity, high-efficacy GHSR-1a binding. However, this potency comes with proportionally greater cortisol and prolactin activation and faster receptor desensitization with chronic use.')),
      h3('CD36 Receptor Activity'),
      p(t('Uniquely among GHRPs, hexarelin binds CD36 — a scavenger receptor expressed on cardiomyocytes, macrophages, and platelets. CD36 agonism activates cardioprotective signaling: PI3K/Akt pathway anti-apoptotic signaling, mitochondrial preservation, and protection against ischemia-reperfusion injury. This cardiac effect is GH-independent.')),
      h3('Desensitization Pattern'),
      p(t('Continuous or very frequent hexarelin administration leads to rapid GHSR-1a downregulation and tachyphylaxis, limiting GH responses within days. Cyclical dosing protocols (e.g., 4 weeks on, 4 weeks off) are used in research to prevent full desensitization.')),
    ),
    pharmacokinetics: lex(
      h3('Half-life and Administration'),
      p(t('Half-life approximately 30–60 minutes. Administered subcutaneously or intravenously. GH peak occurs within 30 minutes of injection. Desensitization develops faster than with other GHRPs, requiring lower dosing frequency or cyclical use in chronic protocols.')),
    ),
    researchFindings: lex(
      h3('GH Secretion'),
      p(t('Hexarelin produces the strongest acute GH response of any GHRP. In human clinical studies, IV hexarelin produced greater GH peaks than GHRH, GHRP-6, and ipamorelin at comparable doses.')),
      h3('Cardiac Protection'),
      p(t('Multiple animal studies demonstrate significant cardioprotection via CD36 activation: reduced infarct size in myocardial infarction models, improved systolic function, reduced cardiomyocyte apoptosis. These effects are maintained in GH-deficient animals, confirming GH-independence of the cardiac mechanism.')),
      h3('GH-Deficiency Correction'),
      p(t('Clinical studies in GH-deficient patients showed hexarelin restored GH secretion and improved IGF-1 levels, but desensitization limits long-term utility compared to GHRH analogs for sustained GH replacement.')),
    ),
    sideEffectsAndSafety: lex(
      ul(
        'Strong cortisol elevation — most pronounced cortisol activation among GHRPs.',
        'Prolactin elevation — dose-dependent.',
        'Water retention secondary to GH/IGF-1 elevation.',
        'Rapid desensitization with daily use — limits chronic dosing.',
        'Potential cardiac effects at supraphysiological doses: ST changes reported in one animal study.'
      ),
      h3('Clinical Context'),
      p(t('Hexarelin\'s cardiac protective properties via CD36 are of scientific interest, but the rapid desensitization and strong cortisol/prolactin profile limit its clinical utility compared to other GH secretagogues. Research applications include cardiac biology and GH axis studies requiring maximal acute GH stimulation.')),
    ),
  },

  // ── Tesamorelin ───────────────────────────────────────────────────────────
  tesamorelin: {
    mechanismOfAction: lex(
      p(t('Tesamorelin (TH9507) is a synthetic analog of GHRH in which the native 44-amino acid sequence is modified with the addition of a trans-3-hexenoic acid group at the N-terminus. This modification increases stability against DPP-4 degradation while preserving GHRHr binding and activity. It is FDA-approved as Egrifta for HIV-associated lipodystrophy.')),
      h3('GHRHr Agonism and Stabilization'),
      p(t('Tesamorelin binds GHRHr on pituitary somatotrophs with activity equivalent to native GHRH, stimulating GH synthesis and pulsatile secretion. The N-terminal modification extends the half-life from ~7 minutes (native GHRH) to ~26 minutes, enabling once-daily dosing and more sustained pituitary stimulation.')),
      h3('Visceral Adipose Tissue Reduction'),
      p(t('The downstream GH/IGF-1 elevation from tesamorelin preferentially reduces visceral adipose tissue (VAT) — the metabolically active intra-abdominal fat associated with cardiovascular risk and insulin resistance. This selective VAT reduction without significant peripheral fat or lean mass effects is the basis for its approval in HIV lipodystrophy.')),
    ),
    pharmacokinetics: lex(
      h3('Half-life'),
      p(t('Approximately 26 minutes — significantly longer than native GHRH (7 min) but much shorter than CJC-1295 with DAC (6–8 days). Once-daily subcutaneous injection is the approved dosing regimen.')),
      h3('Approved Dosing'),
      p(t('FDA-approved dose: 2 mg SC once daily. Pharmacokinetics are predictable with once-daily dosing producing consistent GH pulsatility augmentation. Peak plasma concentration at ~15 minutes post-injection. Cleared via proteolytic degradation; renal clearance minor.')),
    ),
    researchFindings: lex(
      h3('FDA-Approved Clinical Evidence'),
      p(t('PHASE III trials (ENCORE, LIPO-009) in HIV-infected patients with lipodystrophy demonstrated: 15–18% reduction in visceral adipose tissue vs placebo at 26 weeks, significant improvement in trunk fat ratio, improved IGF-1 levels, and no significant change in peripheral subcutaneous fat. These results led to FDA approval in 2010 (Egrifta).')),
      h3('Metabolic Effects'),
      p(t('Clinical data shows improvements in triglycerides and non-HDL cholesterol in some patient subgroups. Unlike visceral fat reduction seen with lifestyle interventions, tesamorelin\'s effects appear to be maintained only with continued treatment — discontinuation leads to VAT re-accumulation within 12 weeks.')),
      h3('Non-HIV Research'),
      p(t('Research in non-HIV populations with abdominal obesity and liver disease (NAFLD/NASH) has shown similar VAT reduction and improvements in liver fat content and liver enzymes. Phase II data is promising but no non-HIV approval has been granted.')),
    ),
    sideEffectsAndSafety: lex(
      ul(
        'Injection site reactions: Erythema, pruritus, induration — most common adverse effect (25–30%).',
        'Fluid retention and peripheral edema.',
        'Arthralgia and myalgia: 8–13% of patients.',
        'Glucose metabolism: Modest increase in fasting glucose and HbA1c; monitor in at-risk patients.',
        'Nausea: Occasional.',
        'Headache.'
      ),
      h3('Contraindications'),
      p(t('Contraindicated in active malignancy, pregnancy, hypersensitivity to tesamorelin or mannitol. Caution in patients with pre-existing glucose intolerance or diabetes. Monitor IGF-1 levels; reduce dose if consistently elevated. Not recommended in pituitary or hypothalamic disease.')),
    ),
  },

  // ── AOD-9604 ──────────────────────────────────────────────────────────────
  'aod-9604': {
    mechanismOfAction: lex(
      p(t('AOD-9604 (Anti-Obesity Drug 9604) is a synthetic peptide fragment of human growth hormone, corresponding to amino acids 177–191 of the GH sequence with an additional tyrosine residue at the N-terminus. It was designed to isolate the fat-metabolizing activity of GH while eliminating its anabolic and IGF-1-stimulating effects.')),
      h3('β3-Adrenergic Receptor-Mediated Lipolysis'),
      p(t('AOD-9604 stimulates lipolysis (fat breakdown) primarily by activating β3-adrenergic receptors in adipose tissue, mimicking the fat-specific actions of GH without binding to GH receptors or IGF-1 receptors. This receptor selectivity is the key differentiator — no anabolic, growth-promoting, or glucose-disrupting effects observed at therapeutic doses.')),
      h3('Lipogenesis Inhibition'),
      p(t('In addition to stimulating fat breakdown, AOD-9604 inhibits lipogenesis (new fat synthesis) in adipocytes. This dual action — increased fat burning + decreased fat storage — was the pharmacological rationale for developing it as an anti-obesity agent.')),
      h3('No GH Receptor Binding'),
      p(t('Unlike the full GH molecule, AOD-9604 does not bind GH receptors and therefore does not stimulate IGF-1 production, does not affect insulin sensitivity (no diabetogenic risk), and does not produce anabolic tissue growth effects. This profile supports its favorable safety record in clinical trials.')),
    ),
    pharmacokinetics: lex(
      h3('Routes of Administration'),
      ul(
        'Subcutaneous injection: Standard research route. Half-life ~15–30 minutes.',
        'Oral: Metabolic Pharmaceuticals investigated oral formulations in Phase IIb/III trials (TGA registered in Australia). AOD-9604 showed unusual GI stability allowing oral delivery — a distinctive feature among peptide drugs.',
        'Intranasal: Studied in early research.'
      ),
      h3('Regulatory History'),
      p(t('AOD-9604 was registered by the Australian Therapeutic Goods Administration (TGA) as a food ingredient (GRAS status attempted) and investigated in Phase II/III clinical trials for obesity. Clinical development was discontinued for commercial rather than safety reasons.')),
    ),
    researchFindings: lex(
      h3('Human Clinical Trials'),
      p(t('Phase IIa trials demonstrated significant reduction in body fat mass vs placebo over 12 weeks with oral AOD-9604. Phase IIb trials with oral AOD-9604 showed statistically significant weight loss in obese adults with no adverse metabolic effects on glucose, insulin, or lipids — supporting the receptor-selective mechanism.')),
      h3('Animal Studies'),
      p(t('Extensive animal data demonstrates dose-dependent fat loss without muscle loss, no growth promotion, no glucose disruption, and no reproductive effects. Effects are more pronounced in obese vs lean animals, consistent with targeting excess fat accumulation.')),
      h3('Cartilage and Joint Research'),
      p(t('A novel application emerged from in vitro and animal studies: AOD-9604 appears to stimulate cartilage regeneration and reduce collagen degradation in osteoarthritis models. Phase II trials for osteoarthritis were initiated (as Cytrx/Metabolic Pharmaceuticals \'tregopil\'-related research) with promising preliminary results.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('AOD-9604 demonstrated excellent safety in all clinical trials — one of the strongest safety profiles in peptide drug development.')),
      ul(
        'No significant adverse effects were reported in Phase IIa/IIb obesity trials.',
        'No effects on insulin sensitivity, glucose homeostasis, or HbA1c.',
        'No anabolic effects (no lean mass gain, no organ growth).',
        'No IGF-1 elevation.',
        'Mild injection site reactions possible with SC administration.',
        'TGA-registered GRAS status for oral use supports favorable safety profile.'
      ),
    ),
  },

  // ── Semax ─────────────────────────────────────────────────────────────────
  semax: {
    mechanismOfAction: lex(
      p(t('Semax (MEHFPGP) is a synthetic heptapeptide derived from the N-terminal fragment of ACTH(4-7) — the melanocortin sequence His-Phe-Arg-Trp — with a Pro-Gly-Pro C-terminal extension that improves stability. It was developed at the Institute of Molecular Genetics of the Russian Academy of Sciences and is approved in Russia and Ukraine.')),
      h3('BDNF and Neurotrophin Stimulation'),
      p(t('Semax\'s primary mechanism is upregulation of BDNF (Brain-Derived Neurotrophic Factor) and its receptor TrkB. BDNF is the master regulator of neuronal survival, synaptic plasticity, long-term potentiation (LTP), and neurogenesis. Elevated BDNF underpins improvements in memory consolidation, learning speed, and neuroprotection observed in research.')),
      h3('Serotonin System Modulation'),
      p(t('Semax activates 5-HTP decarboxylase, increasing serotonin synthesis from tryptophan. It also modulates serotonin reuptake transporter (SERT) expression, affecting synaptic serotonin availability. This serotoninergic component contributes to anxiolytic, mood-stabilizing, and antidepressant effects.')),
      h3('Dopaminergic Enhancement'),
      p(t('Semax increases dopamine turnover in the prefrontal cortex and limbic regions, enhancing executive function, working memory, and motivational drive. The dopaminergic component is relevant to its nootropic and anti-fatigue effects.')),
      h3('Neuroprotection'),
      p(t('Semax reduces neuronal death following ischemia by inhibiting caspase-3 activation, reducing glutamate excitotoxicity, and promoting neurovascular coupling. These mechanisms explain its approval for ischemic stroke treatment in Russia.')),
    ),
    pharmacokinetics: lex(
      h3('Intranasal Route (Primary)'),
      p(t('Semax nasal drops (0.1% solution) are the approved formulation in Russia. The intranasal route delivers peptide directly to CNS via the olfactory-CNS pathway, bypassing the blood-brain barrier. This achieves higher CNS concentrations than systemic injection at equivalent doses. Onset of effects: 10–30 minutes.')),
      h3('Subcutaneous Route'),
      p(t('SC injection provides systemic delivery with predictable pharmacokinetics. Used in clinical research settings for precise dosing. Half-life of intact peptide: minutes. CNS effects persist for hours via downstream BDNF and neurotrophin cascades.')),
    ),
    researchFindings: lex(
      h3('Stroke and Ischemia (Approved Indication)'),
      p(t('Approved in Russia for treatment of ischemic stroke, TBI, and optic nerve atrophy. Clinical trials demonstrate reduced neurological deficits, improved recovery timeline, and better functional outcomes vs standard of care when Semax is administered in the acute phase of ischemic stroke.')),
      h3('Cognitive Enhancement'),
      p(t('Human studies in healthy volunteers demonstrate significant improvements in attention, processing speed, working memory, and associative learning. Semax enhances EEG alpha-rhythm coherence, consistent with improved attentional focus and cognitive integration.')),
      h3('Attention Deficit Research'),
      p(t('Clinical studies in children with attention deficit disorders report improved attention, behavioral inhibition, and academic performance with Semax nasal spray, with an acceptable safety profile in pediatric populations.')),
      h3('Anxiety and Depression'),
      p(t('Adaptogenic and anxiolytic properties documented in both animal stress models and human studies. Does not produce sedation — anxiolytic effect is distinctly different from benzodiazepines.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Semax has decades of approved clinical use in Russia with an established safety record.')),
      ul(
        'Transient nasal irritation or mild burning with intranasal administration.',
        'Occasional brief headache, particularly with higher doses.',
        'Mild restlessness or increased energy — can be experienced as anxiety at high doses.',
        'No significant cardiovascular effects.',
        'No sedation.',
        'No dependence or withdrawal syndrome documented.'
      ),
      h3('Long-term Safety'),
      p(t('No significant long-term adverse effects documented in clinical use. Semax is non-habit forming and does not produce tolerance in standard research dosing protocols. The peptide is rapidly metabolized and does not accumulate.')),
    ),
  },

  // ── IGF-1 LR3 ─────────────────────────────────────────────────────────────
  'igf-1-lr3': {
    mechanismOfAction: lex(
      p(t('IGF-1 LR3 (Long Arg3 IGF-1) is a recombinant analog of insulin-like growth factor 1 with two structural modifications: substitution of glutamic acid at position 3 with arginine (Arg3), and addition of a 13-amino acid N-terminal extension. These changes reduce IGF-binding protein (IGFBP) affinity by more than 500-fold, dramatically extending bioavailability.')),
      h3('IGF-1 Receptor Activation'),
      p(t('IGF-1 LR3 binds the IGF-1 receptor (IGF-1R) — a tyrosine kinase receptor — with affinity similar to native IGF-1. IGF-1R activation triggers MAPK (ERK1/2) and PI3K/Akt/mTOR signaling cascades, resulting in cell proliferation, differentiation, protein synthesis, glucose uptake, and inhibition of apoptosis.')),
      h3('Reduced IGFBP Binding — Extended Activity'),
      p(t('In native IGF-1, 95–99% of circulating IGF-1 is bound to IGFBPs (insulin-like growth factor binding proteins), which regulate bioavailability and half-life. IGF-1 LR3\'s reduced IGFBP affinity means a far greater proportion remains free and biologically active, resulting in approximately 100x greater potency per dose vs native IGF-1.')),
      h3('mTOR-Mediated Protein Synthesis'),
      p(t('Akt activation by IGF-1R downstream of IGF-1 LR3 binding activates mTORC1, the primary regulator of protein synthesis. This drives ribosomal biogenesis, amino acid incorporation into muscle protein, and satellite cell activation — the mechanisms underlying hypertrophic effects in skeletal muscle.')),
    ),
    pharmacokinetics: lex(
      h3('Half-life'),
      p(t('IGF-1 LR3: approximately 20–30 hours due to reduced IGFBP binding and modified structure. This compares to 12–15 minutes for native IGF-1 (rapidly bound and cleared by IGFBPs). This extended half-life enables once-daily or every-other-day dosing in research protocols.')),
      h3('Administration'),
      p(t('Subcutaneous or intramuscular injection. Not orally bioavailable. Onset of receptor signaling within minutes; anabolic effects develop over days to weeks of sustained use. Primarily cleared via hepatic degradation and proteolysis.')),
    ),
    researchFindings: lex(
      h3('Muscle Biology Research'),
      p(t('Extensively used as a research tool in muscle biology. Studies demonstrate satellite cell (muscle stem cell) activation, increased muscle fiber cross-sectional area, enhanced protein synthesis rates, and accelerated recovery from eccentric damage in animal models.')),
      h3('GH-Independent Anabolism'),
      p(t('IGF-1 LR3 bypasses GH and acts directly on peripheral IGF-1 receptors. This makes it a useful research tool for studying GH-independent anabolic signaling and for models of GH resistance (Laron syndrome research).')),
      h3('Glucose Metabolism'),
      p(t('Activates GLUT4 translocation via PI3K/Akt, increasing glucose uptake in muscle and fat. At high doses, this creates significant hypoglycemic risk — the most serious acute safety concern.')),
    ),
    sideEffectsAndSafety: lex(
      h3('Primary Safety Concerns'),
      ul(
        'Hypoglycemia: Most significant acute risk. IGF-1 has insulin-like glucose-lowering effects; hypoglycemia can be severe and rapid-onset. Must administer with food or glucose source available.',
        'Tumor promotion: IGF-1R signaling promotes cell proliferation and survival. Contraindicated in any active malignancy; caution in cancer history.',
        'Jaw/facial growth: Acromegaly-like effects possible with chronic high-dose use.',
        'Joint pain: Secondary to increased soft tissue volume around joints.',
        'Water retention and edema.',
        'Headache.',
        'Intracranial hypertension: Rare; associated with GH/IGF-1 excess.'
      ),
      h3('Research Use Context'),
      p(t('IGF-1 LR3 is a powerful research compound with significant anabolic activity and meaningful safety considerations. The hypoglycemia risk requires particular caution. Not approved for human therapeutic use. Banned by WADA.')),
    ),
  },

  // ── Thymosin Beta-4 ───────────────────────────────────────────────────────
  'thymosin-beta-4': {
    mechanismOfAction: lex(
      p(t('Thymosin Beta-4 (Tβ4) is the full 43-amino acid endogenous peptide produced primarily by thymic epithelial cells, platelets, and wound macrophages. It is the most abundant intracellular peptide in mammalian cells and serves as the primary G-actin sequestering protein — regulating cytoskeletal dynamics across all tissue types.')),
      h3('Full-Sequence vs TB-500'),
      p(t('TB-500 corresponds specifically to the actin-binding fragment of Tβ4 (amino acids 17–23). The full Tβ4 sequence includes the N-terminal Ac-SDKP tetrapeptide, which has additional anti-fibrotic, anti-inflammatory, and hematopoietic progenitor mobilization activities not present in TB-500 alone.')),
      h3('Ac-SDKP Tetrapeptide Activity'),
      p(t('The N-terminal Ac-SDKP tetrapeptide, released from Tβ4 by ACE2 cleavage, independently inhibits TGF-β1-driven fibrosis, mobilizes hematopoietic progenitor cells from bone marrow, and has anti-inflammatory activity. This component makes the full Tβ4 sequence of particular interest in cardiac fibrosis and regenerative medicine research.')),
      h3('Cardiac Progenitor Cell Activation'),
      p(t('Full Tβ4 (but not the TB-500 fragment alone) activates epicardial cardiac progenitor cells, driving their differentiation into cardiomyocytes and vascular smooth muscle cells. This regenerative cardiac mechanism is the basis for ongoing Tβ4 research in myocardial infarction recovery.')),
    ),
    pharmacokinetics: lex(
      h3('Endogenous Levels'),
      p(t('Thymosin Beta-4 is found in high concentrations in platelets (~1.5 mg/mL), macrophages, and wound fluid, where it is released in response to injury to promote tissue repair. Plasma levels rise significantly following tissue damage.')),
      h3('Exogenous Administration'),
      p(t('Administered via subcutaneous or intravenous injection in research settings. Typical research dosing uses similar protocols to TB-500 (cyclical). The full-sequence peptide is more expensive to synthesize than the TB-500 fragment, which has driven the commercial market toward TB-500.')),
    ),
    researchFindings: lex(
      h3('Human Corneal Trial'),
      p(t('Fleming et al. published the most cited human Tβ4 trial: a Phase II study of topical Tβ4 eye drops in neurotrophic corneal epithelial defects demonstrated significantly accelerated healing and improved visual outcomes vs placebo — the strongest direct human clinical evidence for Tβ4 therapeutic activity.')),
      h3('Cardiac Regeneration'),
      p(t('Preclinical studies demonstrate that systemic Tβ4 treatment following myocardial infarction promotes cardiac progenitor cell activation, cardiomyocyte regeneration, angiogenesis in the infarct border zone, and improved ejection fraction. These findings support therapeutic development for acute MI and heart failure.')),
      h3('Neuroprotection and Multiple Sclerosis'),
      p(t('Animal studies in MS models show Tβ4 promotes oligodendrocyte progenitor cell migration and differentiation, accelerating remyelination and functional recovery. Tβ4 promotes PDGF-regulated migration of oligodendrocyte precursors into demyelinated lesions.')),
    ),
    sideEffectsAndSafety: lex(
      p(t('Thymosin Beta-4 has an excellent observed safety profile consistent with its endogenous origin and high natural tissue concentrations.')),
      ul(
        'Mild, transient injection site reactions.',
        'No significant systemic adverse effects in clinical or research use.',
        'Theoretical oncology caution: Tβ4 overexpression is observed in some cancers; the relationship to tumor promotion vs tumor suppression is context-dependent and area of active research.',
        'The Fleming corneal trial confirmed tolerability of topical formulation in human subjects.'
      ),
    ),
  },

  // ── Tirzepatide ───────────────────────────────────────────────────────────
  tirzepatide: {
    mechanismOfAction: lex(
      p(t('Tirzepatide (LY3298176) is a 39-amino acid synthetic peptide designed as a dual agonist of GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 (glucagon-like peptide-1) receptors — the first approved "twincretin." Developed by Eli Lilly, it is FDA-approved as Mounjaro (T2DM) and Zepbound (obesity).')),
      h3('GIP Receptor Agonism'),
      p(t('GIP is an incretin secreted by K-cells in the duodenum and jejunum. GIP receptor (GIPR) activation in the pancreas potentiates glucose-dependent insulin secretion. In adipose tissue, GIPR activation enhances fat storage (physiological) but tirzepatide\'s GLP-1 component counteracts this with weight loss. In the brain, GIPR agonism appears to synergistically enhance the appetite-suppressing effects of GLP-1R activation.')),
      h3('GLP-1 Receptor Agonism'),
      p(t('Tirzepatide also activates GLP-1 receptors — the same target as semaglutide — producing glucose-dependent insulin secretion, glucagon suppression, gastric emptying delay, and central appetite suppression via hypothalamic GLP-1R. The dual mechanism produces additive or potentially synergistic effects on weight loss vs GLP-1 monoagonism alone.')),
      h3('Structural Design'),
      p(t('Tirzepatide\'s sequence is based on the native GIP peptide with modifications to enable GLP-1R cross-agonism. A C20 fatty diacid is attached via an aminoisobutyric acid linker and a short PEG spacer, enabling albumin binding and a half-life of ~5 days (once-weekly dosing).')),
    ),
    pharmacokinetics: lex(
      h3('Half-life'),
      p(t('Approximately 5 days — enabled by albumin binding via the C20 fatty diacid modification. Once-weekly subcutaneous injection. Steady-state reached after approximately 4–8 weeks of once-weekly dosing.')),
      h3('Dose Escalation'),
      p(t('Tirzepatide uses a mandatory slow dose escalation (2.5 → 5 → 7.5 → 10 → 12.5 → 15 mg over months) to minimize GI side effects. Approved doses range from 5–15 mg weekly. The 10–15 mg doses produce the greatest weight loss but highest GI side effect rates.')),
    ),
    researchFindings: lex(
      h3('SURMOUNT-1 (Obesity Without Diabetes)'),
      p(t('SURMOUNT-1 is a landmark Phase III trial: 2,539 adults with obesity, 72-week treatment. Tirzepatide 15 mg produced mean weight loss of 20.9% — the highest ever observed in a pharmacological weight loss trial. 36% of participants achieved ≥25% body weight reduction. Tirzepatide 5 mg: 15.0% mean weight loss; 10 mg: 19.5%.')),
      h3('SURPASS Program (Type 2 Diabetes)'),
      p(t('SURPASS-2 directly compared tirzepatide to semaglutide 1 mg: tirzepatide produced significantly greater HbA1c reductions (−2.01% vs −1.86% at 10 mg) and greater weight loss (−8.5 kg vs −6.2 kg at 10 mg). All tirzepatide doses were non-inferior or superior to semaglutide 1 mg.')),
      h3('SURMOUNT-MMO (Cardiovascular Outcomes)'),
      p(t('Ongoing trial investigating cardiovascular event reduction with tirzepatide in obesity, following the precedent set by semaglutide\'s SELECT trial. Results anticipated 2025–2026.')),
    ),
    sideEffectsAndSafety: lex(
      h3('GI Adverse Effects'),
      ul(
        'Nausea: 20–40% (dose-dependent; highest during escalation phase).',
        'Vomiting: 10–25%.',
        'Diarrhea: 15–30%.',
        'Constipation: 10–20%.',
        'Decreased appetite (desired effect, but occasionally leads to inadequate caloric intake).'
      ),
      h3('Serious Adverse Effects'),
      ul(
        'Pancreatitis: Rare; similar risk to GLP-1 monoagonists.',
        'Gallbladder disease: Cholelithiasis risk with rapid weight loss.',
        'Hypoglycemia: Low risk as monotherapy; increases with insulin or sulfonylurea combination.'
      ),
      h3('Black Box Warning'),
      p(t('Thyroid C-cell tumor risk (same as semaglutide) — based on rodent carcinogenicity data. Relevance to humans is unclear. Contraindicated in personal or family history of medullary thyroid carcinoma or MEN 2. This is a class effect of all GLP-1 receptor agonists.')),
      h3('Regulatory Status'),
      p(t('FDA approved as Mounjaro (tirzepatide) for type 2 diabetes (2022) and Zepbound (tirzepatide) for chronic weight management in adults with obesity or overweight with weight-related comorbidity (2023). EMA approved for both indications.')),
    ),
  },
}
