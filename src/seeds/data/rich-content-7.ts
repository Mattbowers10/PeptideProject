/**
 * Rich content batch 7 — 10 peptides
 * ghrh, glucagon, somatostatin, substance-p, orexin-a,
 * neuropeptide-y, gip, igf-2, peg-mgf, collagen-peptides
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

export const richContent7 = {

  // ─── GHRH ─────────────────────────────────────────────────────
  'ghrh': {
    mechanismOfAction: lex(
      h3('Hypothalamic Growth Hormone Axis'),
      p(t('Growth hormone-releasing hormone (GHRH) is a 44-amino acid hypothalamic neuropeptide that is the primary physiological driver of pulsatile GH secretion from anterior pituitary somatotrophs. It is synthesised in the arcuate nucleus and periventricular nucleus neurons, released into the hypothalamo-hypophyseal portal circulation, and acts on GHRHR (a Gαs-coupled GPCR) on somatotrophs.')),
      h3('GHRHR Signal Transduction'),
      p(t('GHRH binding activates adenylyl cyclase → cAMP → PKA, which: (1) phosphorylates CREB transcription factor driving GH gene (GH1) transcription; (2) activates voltage-gated L-type calcium channels causing Ca²⁺ influx; (3) triggers exocytosis of GH-containing secretory granules. The GHRH signal is counterbalanced by somatostatin (SST) released from periventricular neurons — the interplay of GHRH and SST generates the pulsatile GH secretory pattern.')),
      h3('Downstream Effects'),
      ul(
        'Somatotroph: GH synthesis (transcription) and secretion (exocytosis)',
        'Pituitary: somatotroph proliferation and maintenance of GH cell mass',
        'Liver: GH → IGF-1 synthesis (GH acts on hepatic GHR)',
        'Peripheral tissues: GH + IGF-1 drive anabolic, lipolytic, and pro-survival signalling',
        'Feedback: elevated GH/IGF-1 → somatostatin release → GHRH pulsation maintained',
      ),
    ),
    pharmacokinetics: lex(
      h3('Native GHRH Stability'),
      p(t('Endogenous GHRH(1-44) and the truncated active fragment GHRH(1-29) are both rapidly degraded in plasma by DPP-IV (cleaving at Tyr-Ala bond at positions 1-2) and other serum peptidases, yielding a plasma half-life of 5–7 minutes. This is the driver behind synthetic GHRH analogues (sermorelin, tesamorelin, CJC-1295) designed with N-terminal modifications to resist DPP-IV.')),
      h3('Exogenous GHRH(1-29) Administration'),
      p(t('Research protocols using recombinant GHRH(1-29) require high-frequency pulsatile dosing to mimic physiological patterns. Continuous IV infusion produces rapid GH tachyphylaxis. Pulsed subcutaneous delivery (1 pulse per 2–3 hours) sustains GH responsiveness by paralleling the natural hypothalamic-pituitary dialogue.')),
      h3('Research Dosing'),
      ul(
        'IV bolus (pituitary stimulation test): 1 mcg/kg IV; peak GH at 60 min',
        'SC research protocols: 100–300 mcg 1–3× daily (low-frequency pulsing)',
        'Pulsatile infusion (research devices): 1–4 mcg/pulse every 90–120 min',
        'Synthetic analogues preferred for practical research use due to stability',
      ),
    ),
    researchFindings: lex(
      h3('GH Deficiency Diagnostics'),
      p(t('The GHRH stimulation test (intravenous GHRH 1 mcg/kg) is a validated tool for distinguishing hypothalamic from pituitary-origin GH deficiency. A robust GH response (>10 ng/mL peak) indicates intact somatotroph function with hypothalamic GHRH deficiency; a blunted response indicates pituitary disease. This test formed the basis for sermorelin\'s approval as a GH deficiency diagnostic.')),
      h3('Sleep Architecture'),
      p(t('GHRH administered intracerebroventricularly in animal studies dramatically increases slow-wave sleep (SWS) duration and depth. Peripheral GHRH administration also promotes SWS in humans, confirming a bidirectional sleep-GH axis where GHRH serves as a sleep-promoting neuropeptide beyond its hypophysiotropic role. This discovery underpins bedtime GHRH analogue dosing rationale.')),
      h3('Cognitive and Neuroprotective Research'),
      p(t('The GHRH receptor is expressed in hippocampus and cortex independent of the pituitary. Direct CNS GHRH signalling promotes neurogenesis, synaptic plasticity, and cognitive function. Baker et al. (2012) demonstrated GHRH analogue (tesamorelin) improved executive function in adults with MCI, suggesting central GHRH signalling rather than solely IGF-1-mediated effects.')),
      h3('Oncology — Paradoxical Antagonism'),
      ul(
        'GHRH antagonists (MIA-602, MR-409) suppress GH axis-dependent tumour growth',
        'Paradoxically, GHRH agonists show anti-tumour effects in some models via autocrine loops',
        'Tumour-derived GHRH (ectopic production in neuroendocrine tumours)',
        'GHRHR splice variants (SV1) in tumours: target for antagonist development',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety of GHRH Analogues'),
      p(t('The safety profile of exogenous GHRH and its analogues is excellent due to the preserved feedback mechanism. Unlike exogenous GH, supraphysiological IGF-1 elevation cannot be produced by GHRH agonism alone — somatostatin prevents unchecked GH secretion. This makes GHRH/GHRHR agonism intrinsically safer than GH replacement.')),
      h3('Common Effects'),
      ul(
        'Flushing: facial warmth 5–15 minutes post-injection; somatotroph activation-mediated',
        'Injection site reactions: common; mild',
        'Headache: transient; reported in 10–20% of subjects',
        'Nausea: uncommon at standard doses',
      ),
      h3('Monitoring Recommendations'),
      p(t('IGF-1 levels should be monitored every 4–6 weeks. Dose reduction if IGF-1 exceeds age-adjusted upper reference limit. Glucose monitoring if at metabolic risk — though GH-related insulin resistance is substantially blunted vs. exogenous GH. Avoid in active malignancy. No specific interaction data for commonly co-administered drugs.')),
    ),
  },

  // ─── Glucagon ─────────────────────────────────────────────────
  'glucagon': {
    mechanismOfAction: lex(
      h3('Counter-Regulatory Hormone'),
      p(t('Glucagon is a 29-amino acid peptide hormone produced by α-cells of the pancreatic islets of Langerhans. It is the primary counter-regulatory hormone to insulin — released when blood glucose falls — and acts through the glucagon receptor (GCGR), a Gαs-coupled GPCR expressed predominantly in the liver, kidney, brain, and heart. Glucagon maintains glucose homeostasis during fasting and hypoglycaemia.')),
      h3('Hepatic Glucose Production'),
      p(t('The primary metabolic action of glucagon is hepatic glucose mobilisation. GCGR activation drives cAMP → PKA signalling in hepatocytes, which: (1) activates glycogen phosphorylase to break down glycogen stores (glycogenolysis), releasing glucose; (2) upregulates phosphoenolpyruvate carboxykinase (PEPCK) and fructose-1,6-bisphosphatase to stimulate gluconeogenesis; (3) suppresses glycogen synthase, preventing futile glucose recycling.')),
      h3('Energy Metabolism and Lipolysis'),
      p(t('Beyond glucose, glucagon has important lipid and protein metabolism effects. In adipose tissue, GCGR activation stimulates lipolysis — releasing free fatty acids for hepatic β-oxidation. In the liver, glucagon promotes fatty acid oxidation over synthesis and drives ketogenesis during prolonged fasting. Glucagon also increases hepatic amino acid uptake (particularly alanine and glutamine) for gluconeogenesis substrate supply.')),
      ul(
        'Liver: glycogenolysis + gluconeogenesis → blood glucose elevation',
        'Adipose: lipolysis → FFA release → hepatic ketone production',
        'Heart: positive chronotropic and inotropic effects via cardiac GCGR',
        'Gut: slows gastric motility; reduces exocrine pancreatic secretion',
        'CNS: hypothalamic GCGR agonism → appetite suppression (therapeutically exploited)',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Half-life'),
      p(t('Native glucagon has a very short plasma half-life of 3–6 minutes, degraded by serum proteases and liver/kidney clearance. This requires parenteral (IM or SC) administration for therapeutic use. Lyophilised glucagon kits for emergency hypoglycaemia use reconstitution immediately before injection. Nasal glucagon powder (Baqsimi) offers non-injection emergency delivery with comparable efficacy.')),
      h3('Therapeutic Formulations'),
      p(t('Emergency hypoglycaemia: 1 mg IM or SC (GlucaGen, Glucagon Emergency Kit). Intranasal: 3 mg dry powder (Baqsimi) — equivalent glucose-raising effect, Tmax 30 min. Dasiglucagon and mini-glucagon analogues extend half-life for dual-chamber closed-loop insulin pump co-administration. Research-grade glucagon: lyophilised, reconstituted in acidic solution to prevent self-aggregation.')),
      h3('Dual Agonist Research'),
      ul(
        'Retatrutide: GLP-1R + GIPR + GCGR triple agonist; weekly SC dosing',
        'MEDI0382 (cotadutide): GLP-1R/GCGR dual agonist; half-life extended via fatty acid conjugation',
        'SAR425899: GLP-1R/GCGR dual; investigated in T2DM and NASH',
        'GCGR agonism contributes lipolysis and energy expenditure to dual/triple agonist effects',
      ),
    ),
    researchFindings: lex(
      h3('Emergency Hypoglycaemia'),
      p(t('The cornerstone application of exogenous glucagon is insulin-induced severe hypoglycaemia reversal. Multiple RCTs confirm 1 mg IM glucagon restores euglycaemia within 10–15 minutes in 95% of patients. Nasal glucagon (NASAL-HYP trial) demonstrated non-inferiority to IM injection with faster onset of response in some scenarios.')),
      h3('Beta-Cell Preservation'),
      p(t('Glucagon-induced cAMP elevation in β-cells was classically considered to potentiate insulin secretion. Research has revealed paradoxical glucagon hyper-secretion in T2DM (from α-cell insulin resistance and loss of paracrine insulin suppression), contributing to postprandial hyperglycaemia. GLP-1 receptor agonists suppress this inappropriate glucagon elevation — a key mechanism underlying GLP-1 RA efficacy.')),
      h3('Cardiac Applications'),
      p(t('Glucagon\'s positive inotropic and chronotropic effects (independent of adrenergic receptors) make it a second-line treatment for beta-blocker and calcium channel blocker overdose — cardiovascular emergencies where catecholamine-based therapies are ineffective due to receptor blockade. High-dose glucagon (5–10 mg IV) reverses bradycardia and hypotension in this context.')),
      h3('NASH and Liver Research'),
      ul(
        'GCGR agonism: reduces hepatic lipid accumulation via fatty acid oxidation upregulation',
        'MEDI0382 (cotadutide): Phase 2 data showing 50% liver fat reduction in NASH vs. 20% for GLP-1 RA alone',
        'Glucagon increases liver aminotransferase activity — monitoring needed',
        'Hepatic fibrosis: GCGR contributes anti-fibrotic signalling in some models',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Therapeutic Dose Profile'),
      p(t('At emergency doses (1 mg IM/SC), the primary adverse effects of glucagon are nausea (80–95%) and vomiting (20–35%), occurring as glucose levels recover. These are transient and self-limiting. Hyperglycaemia may occur after glucose recovery — monitor 1 hour post-administration.')),
      h3('High-Dose/Research Adverse Effects'),
      ul(
        'Nausea and vomiting: dose-proportional; nearly universal at >1 mg',
        'Hypertension: cardiac GCGR activation increases heart rate and blood pressure',
        'Hyperglycaemia: rebound hyperglycaemia possible, especially in T1DM post-rescue',
        'Hypokalemia: rare but reported with prolonged high-dose infusions',
      ),
      h3('Contraindications'),
      p(t('Glucagon is contraindicated in phaeochromocytoma (may trigger catecholamine crisis via GCGR on chromaffin cells) and insulinoma (may cause profound rebound hypoglycaemia after initial hyperglycaemic effect). Severe hepatic dysfunction markedly blunts glucagon\'s glycaemic effect as glycogen stores are depleted. No significant drug-drug interactions at emergency doses.')),
    ),
  },

  // ─── Somatostatin ─────────────────────────────────────────────
  'somatostatin': {
    mechanismOfAction: lex(
      h3('Pan-Inhibitory Neuropeptide'),
      p(t('Somatostatin (SS) is a cyclic 14-amino acid (SS-14) or 28-amino acid (SS-28) peptide produced throughout the body — in hypothalamic periventricular neurons (controlling GH), pancreatic δ-cells (controlling insulin and glucagon), enteric nervous system (controlling gut motility and secretion), and immune cells. It acts through five Gαi/o-coupled somatostatin receptors (SSTR1-5), inhibiting cAMP production and reducing cellular secretory activity across multiple tissues.')),
      h3('SSTR Subtypes and Tissue Distribution'),
      p(t('Each SSTR subtype has a distinct tissue distribution and functional signature: SSTR2 (most widely expressed; primary target of octreotide and lanreotide) mediates GH, glucagon, and insulin suppression; SSTR5 selectively suppresses insulin; SSTR1/3 are expressed in brain and immune tissue; SSTR4 in hippocampus. This subtype diversity makes SSTR agonism highly tissue-targeted.')),
      h3('Inhibitory Actions'),
      ul(
        'Anterior pituitary: SSTR2/5 on somatotrophs → GH suppression',
        'Pancreatic α-cells: SSTR2 → glucagon suppression',
        'Pancreatic β-cells: SSTR5 → insulin suppression',
        'GI tract: reduced gastric acid, pepsin, pancreatic enzymes, intestinal motility',
        'Neuroendocrine tumours: SSTR2/5 → anti-proliferative signalling (cyclin D1 suppression)',
      ),
    ),
    pharmacokinetics: lex(
      h3('Native Somatostatin Limitations'),
      p(t('Native SS-14 has an extremely short plasma half-life of 1–3 minutes due to rapid peptidase degradation, precluding clinical use as a therapeutic agent. This drove the development of synthetic analogues: octreotide (half-life 2 hours), lanreotide (half-life 30 hours), and pasireotide (half-life 12 hours, broader SSTR selectivity). These agents have displaced native somatostatin in clinical applications.')),
      h3('Research-Grade Administration'),
      p(t('For research purposes or pituitary stimulation testing, continuous IV infusion of native somatostatin at 250 mcg/hour maintains suppression of GH, insulin, and glucagon simultaneously. This forms the basis of the GHRH + somatostatin infusion paradigm used to map the growth hormone axis and test secretagogue potency.')),
      h3('Analogue Pharmacokinetics'),
      ul(
        'Octreotide SC: half-life 2 hours; Tmax 30 min; bioavailability 100% SC',
        'Octreotide LAR: monthly IM injection; stable plasma levels for 28 days',
        'Lanreotide Autogel: deep SC; half-life 25–30 days; bimonthly/monthly dosing',
        'Pasireotide: binds SSTR1/2/3/5; 2× daily SC; half-life 12 hours',
      ),
    ),
    researchFindings: lex(
      h3('Acromegaly Management'),
      p(t('Somatostatin analogues (SSAs) are the mainstay of medical management for acromegaly (GH-secreting pituitary adenomas). Octreotide and lanreotide normalise IGF-1 in 50–70% of patients, with tumour size reduction in 30–50%. Pasireotide (SSTR1/2/3/5 pan-agonist) achieves superior biochemical control in octreotide-resistant cases at the cost of increased hyperglycaemia (due to SSTR5-mediated insulin suppression).')),
      h3('Neuroendocrine Tumours'),
      p(t('The CLARINET and PROMID trials established SSAs as disease-modifying therapy for gastroenteropancreatic neuroendocrine tumours (GEP-NETs). CLARINET (2014, NEJM): lanreotide significantly improved progression-free survival in non-functioning GEP-NETs (HR 0.47 vs. placebo). SSAs reduce tumour-derived hormone hypersecretion (5-HT, gastrin, VIP) symptomatically and slow proliferation via SSTR2-mediated G1 arrest.')),
      h3('Portal Hypertension and GI Bleeding'),
      p(t('In acute variceal haemorrhage, somatostatin and its analogues are administered to reduce splanchnic blood flow (via mesenteric vasoconstriction), lowering portal pressure and bleeding rate. Meta-analyses confirm SSAs as adjuncts to endoscopic therapy, reducing rebleeding risk by 30–40% in the acute 5-day treatment window.')),
      h3('Anti-proliferative Mechanisms'),
      ul(
        'SSTR2 signalling: phosphotyrosine phosphatase activation → Ras/ERK inhibition',
        'Cell cycle: cyclin D1 and D3 suppression → G1 arrest in neuroendocrine cells',
        'Apoptosis: Bcl-2 downregulation; caspase-3 activation at high SSTR occupancy',
        'Angiogenesis: VEGF secretion reduction from tumour stromal cells',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Class Adverse Effects'),
      p(t('The most predictable adverse effects of somatostatin analogues derive from their mechanism: suppression of pancreatic, biliary, and GI secretion. GI effects (nausea, diarrhea, steatorrhea, flatulence) are common (30–50%) but diminish over weeks as the gut adapts. Cholelithiasis is a structural complication of chronic bile composition changes.')),
      h3('Endocrine Metabolic Effects'),
      ul(
        'Hyperglycaemia: insulin suppression (SSTR5) + glucagon suppression (net effect varies)',
        'Cholelithiasis: gallstone formation in 20–30% of long-term users; monitor with ultrasound',
        'Hypothyroidism: TSH suppression rare but documented with pasireotide',
        'GH/IGF-1 suppression: therapeutic in acromegaly; growth impairment in children at extended doses',
      ),
      h3('Injection Site and Systemic Effects'),
      p(t('Injection site reactions (pain, induration) are common with SC octreotide, particularly with multiple daily injections. Long-acting formulations (LAR, Autogel) substantially reduce injection frequency and site reactions. Bradycardia occurs in ~25% of patients, rarely requiring dose adjustment. QT prolongation has been reported at high doses — ECG monitoring advised in at-risk patients.')),
    ),
  },

  // ─── Substance P ──────────────────────────────────────────────
  'substance-p': {
    mechanismOfAction: lex(
      h3('Neurokinin-1 Receptor Agonist'),
      p(t('Substance P (SP) is an 11-amino acid neuropeptide (Arg-Pro-Lys-Pro-Gln-Gln-Phe-Phe-Gly-Leu-Met-NH₂) belonging to the tachykinin family. It is among the first discovered neuropeptides, initially described by von Euler and Gaddum in 1931. It is encoded by the TAC1 gene and is co-released with other neurotransmitters (notably glutamate) from primary afferent nociceptor C-fibres and A-δ fibres, as well as from CNS interneurons.')),
      h3('NK1R Signalling Cascade'),
      p(t('Substance P binds with highest affinity to the neurokinin-1 receptor (NK1R), a Gαq-coupled GPCR. NK1R activation stimulates phospholipase C → IP3/DAG → PKC and intracellular calcium mobilisation. In spinal dorsal horn neurons, this amplifies nociceptive signalling (pain wind-up). Peripheral NK1R activation on immune cells, smooth muscle, and vasculature produces neurogenic inflammation.')),
      h3('Physiological Functions'),
      ul(
        'Pain transmission: central sensitisation in dorsal horn via NK1R on projection neurons',
        'Neurogenic inflammation: vasodilation, plasma extravasation, mast cell degranulation',
        'GI function: enteric SP controls intestinal peristalsis and mucus secretion',
        'Mood/affective disorders: mesolimbic NK1R modulates stress response and depression',
        'Immune modulation: T-cell and NK cell activation; cytokine release',
        'Wound healing: SP accelerates keratinocyte migration and angiogenesis',
      ),
    ),
    pharmacokinetics: lex(
      h3('Endogenous Kinetics'),
      p(t('Substance P is released from synaptic vesicles at nociceptive synapses. Synaptic concentrations peak transiently then fall as SP is degraded by neutral endopeptidase (neprilysin/CD10), angiotensin-converting enzyme (ACE), and aminopeptidases. Plasma half-life of exogenous SP is approximately 1–3 minutes. Volume of distribution is large, reflecting extensive tissue binding.')),
      h3('Therapeutic Relevance (NK1R Antagonists)'),
      p(t('Clinically, substance P\'s pharmacology is exploited through antagonism rather than agonism. NK1R antagonists (aprepitant, fosaprepitant, netupitant) block SP binding to prevent chemotherapy-induced nausea and vomiting (CINV). In psychiatric research, NK1R antagonism has been investigated for depression and anxiety, with some clinical signal but insufficient for approval. Understanding SP PK informs antagonist dosing strategies.')),
      h3('Research Applications'),
      ul(
        'Local injection for wound healing research: 10–100 nM in vitro; mcg-range SC in animal models',
        'Intrathecal SP: used to study pain sensitisation models',
        'NK1R agonists as research probes: understanding neurogenic inflammation mechanisms',
        'Intra-articular SP in synovitis research',
      ),
    ),
    researchFindings: lex(
      h3('Pain Research and Central Sensitisation'),
      p(t('Decades of research have established SP as a master amplifier of chronic pain. Repeated C-fibre stimulation releases SP into the dorsal horn, activating NK1R on laminae I/V projection neurons — triggering wind-up (progressive amplification of pain response). NK1R deletion in mice markedly reduces responses to moderate and high-intensity nociceptive stimuli while leaving acute pain processing largely intact.')),
      h3('Wound Healing Research'),
      p(t('SP accelerates wound closure by activating keratinocyte NK1R (promoting migration and proliferation) and endothelial NK1R (promoting angiogenesis). Studies in diabetic rodents with impaired wound healing showed topical or peri-wound SP injections restored closure rates to near-normal levels. Denervated skin (lacking SP-releasing nociceptors) heals dramatically slower — a clinical problem in diabetic neuropathy.')),
      h3('Depression and Psychiatric Research'),
      p(t('The NK1R antagonist aprepitant showed antidepressant effects in early Phase 2 trials with a distinct mechanism from monoamine-based antidepressants (Kramer et al., 1998, Science). Though Phase 3 results were inconsistent, subsequent studies confirmed NK1R modulation of mesolimbic dopamine and 5-HT release — providing mechanistic substrate for SP\'s role in stress responses and emotional processing.')),
      h3('Inflammatory Diseases'),
      ul(
        'Rheumatoid arthritis: SP elevated in synovial fluid; NK1R on synoviocytes drives inflammation',
        'Inflammatory bowel disease: SP and NK1R drive intestinal inflammation and motility disorders',
        'Asthma: SP in airway nerves triggers bronchoconstriction and mucus hypersecretion',
        'NK1R antagonists in IBD: clinical trials ongoing; preliminary benefit in reducing disease activity',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Exogenous Substance P Effects'),
      p(t('Systemic substance P administration produces predictable vasodilation (flushing, hypotension), bronchoconstriction (via airway smooth muscle NK1R and mast cell activation), increased GI motility (cramping, diarrhoea), and nausea. These effects limit clinical therapeutic application of SP agonism — the therapeutic angle is primarily SP antagonism (NK1R blockers).')),
      h3('Research Safety Considerations'),
      ul(
        'Systemic SP injection: profound hypotension via endothelial NO release; research context only',
        'Local/topical application: minimal systemic effects; local neurogenic inflammation possible',
        'Intrathecal SP: used in pain research; exaggerated pain responses expected',
        'No human therapeutic SP agonist approved; all clinical applications are NK1R antagonists',
      ),
      h3('Pathological SP Elevation'),
      p(t('Elevated SP is implicated in fibromyalgia (3× normal CSF levels), CRPS, migraine (trigeminal SP release), and neuropathic pain. Treatments targeting SP include NK1R antagonists, capsaicin (depletes SP from TRPV1-expressing nociceptors with repeated application), and botulinum toxin (inhibits neuropeptide co-release). These indirect approaches effectively modulate SP\'s pathological contributions.')),
    ),
  },

  // ─── Orexin-A ─────────────────────────────────────────────────
  'orexin-a': {
    mechanismOfAction: lex(
      h3('Wake-Promoting Hypothalamic Neuropeptide'),
      p(t('Orexin-A (hypocretin-1) is a 33-amino acid neuropeptide derived from the prepro-orexin precursor, along with the 28-amino acid orexin-B (hypocretin-2). Orexins are produced exclusively by a small cluster (~10,000–80,000) of neurons in the lateral hypothalamic area (LHA) and perifornical area. Despite their limited source, orexin neurons project widely throughout the neuraxis — to every major brainstem arousal nucleus, spinal cord, and cortex.')),
      h3('OX1R and OX2R Signalling'),
      p(t('Orexin-A binds with high affinity to both OX1R and OX2R (Gαq-coupled GPCRs); orexin-B selectively targets OX2R. In brainstem arousal nuclei (locus coeruleus, dorsal raphe, tuberomammillary nucleus, basal forebrain), OX2R activation promotes release of noradrenaline, serotonin, histamine, and acetylcholine — the four major wake-promoting neurotransmitters. This coordinated arousal promotion sustains wakefulness across the 16-hour active period.')),
      h3('Narcolepsy and Wake-Sleep Boundary'),
      p(t('Loss of orexin neurons (autoimmune destruction) causes narcolepsy type 1 — characterised by excessive daytime sleepiness, cataplexy (sudden muscle weakness triggered by emotion), sleep paralysis, and hypnagogic hallucinations. This dramatic phenotype reveals orexin\'s role as a sleep-wake switch stabiliser — without orexin, the brain oscillates inappropriately between REM and wakefulness.')),
      ul(
        'Locus coeruleus (LC): NA release → cortical arousal, vigilance',
        'Dorsal raphe: 5-HT release → mood stabilisation, motor tone during wakefulness',
        'Tuberomammillary nucleus: histamine release → arousal maintenance',
        'VTA/nucleus accumbens: dopamine → reward, motivation, reinforcement learning',
        'Spinal cord: muscle tone maintenance during wakefulness (lost in cataplexy)',
      ),
    ),
    pharmacokinetics: lex(
      h3('CNS Penetration'),
      p(t('Intranasal orexin-A (in cyclodextrin formulation) achieves rapid CNS delivery, bypassing the blood-brain barrier via olfactory and trigeminal pathways. This delivery route produces detectable orexin-A in CSF within 5 minutes and wake-promoting effects within 20 minutes — substantially faster than any systemic route. Intracerebroventricular delivery is used in research.')),
      h3('Plasma Kinetics'),
      p(t('Endogenous orexin-A has a plasma half-life of ~20 minutes, with substantially longer CNS half-life (~60–120 minutes) due to relatively lower peptidase activity in the interstitial fluid. After intranasal delivery, peak wake-promoting effects last 4–6 hours, consistent with occupancy at OX1R/OX2R in arousal nuclei.')),
      h3('Research Dosing'),
      ul(
        'Intranasal (human research): 400–800 mcg in cyclodextrin vehicle',
        'Intranasal (primate sleep deprivation studies): 0.67–1 mg/mL; 2 actuations per nostril',
        'Suvorexant, lemborexant (OX1R/OX2R antagonists): 10–20 mg oral for insomnia (therapeutic inverse)',
        'OX2R-selective antagonists (JNJ-42847922): more selective for sleep initiation effects',
      ),
    ),
    researchFindings: lex(
      h3('Sleep Deprivation Reversal'),
      p(t('Siegel et al. (2001) and Ward et al. (2009) demonstrated intranasal orexin-A reversed cognitive and physiological impairment from 30–36 hours of sleep deprivation in rhesus monkeys — restoring alertness, working memory, and motor performance to baseline levels. This finding generated significant interest in orexin-A as a potential countermeasure for operational sleep deprivation (military, medical professions).')),
      h3('Narcolepsy Type 1 Replacement Therapy'),
      p(t('In narcolepsy type 1 patients with undetectable CSF orexin-1, peripheral exogenous orexin cannot reach the CNS at sufficient concentrations. Early trials of intrathecal orexin-A in narcoleptic dogs showed restoration of sleep-wake consolidation. TAK-994 (oral OX2R agonist prodrug) entered clinical trials in narcolepsy with initial Phase 2 results showing dramatic cataplexy reduction and improved wakefulness, though safety concerns paused the programme.')),
      h3('Metabolic Regulation'),
      p(t('Orexin-A regulates energy balance: LHA orexin neurons integrate metabolic signals (hypoglycaemia, ghrelin, leptin) and adjust feeding and arousal accordingly. Orexin promotes physical activity (via sympathetic activation and reward-motivated movement). Narcoleptic patients and orexin-deficient mice develop obesity despite lower caloric intake, suggesting orexin\'s metabolic role extends beyond arousal to energy expenditure regulation.')),
      h3('Addiction and Reward'),
      ul(
        'OX1R in VTA: orexin from LHA drives dopamine release during drug cue exposure',
        'OX1R antagonism: reduces cue-induced reinstatement of cocaine and opioid seeking',
        'Stress-induced relapse: orexin bridges stress response (CRF) to reward circuit activation',
        'SB-334867 (OX1R antagonist): reduces alcohol self-administration in dependent rats',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Therapeutic Index'),
      p(t('Limited human safety data exist for exogenous orexin-A due to the lack of approved therapeutics. Available research suggests intranasal orexin-A at studied doses (400–800 mcg) is well-tolerated, with no significant adverse effects beyond mild nasal irritation in primate studies. The physiological nature of the peptide and its targeted arousal system expression reduce off-target risk.')),
      h3('Potential Adverse Effects'),
      ul(
        'Hypertension: sympathetic activation (LC noradrenaline increase) may elevate blood pressure',
        'Appetite increase: orexin promotes feeding; weight gain with chronic administration',
        'Sleep disruption: dose-dependent insomnia; excessive alertness particularly with late administration',
        'Anxiety: potential via LC activation; CRF co-release in stress contexts',
      ),
      h3('OX2R Antagonist Safety (Inverse Reference)'),
      p(t('The approved OX1R/OX2R antagonists (suvorexant, lemborexant, daridorexant) provide a safety reference for orexin system manipulation. Their adverse effects — somnolence, sleep paralysis, hypnagogic hallucinations — represent excessive OXR blockade effects. Orexin agonism would theoretically produce opposite effects: excessive wakefulness, reduced REM intrusion, elevated sympathetic tone.')),
    ),
  },

  // ─── Neuropeptide Y ──────────────────────────────────────────
  'neuropeptide-y': {
    mechanismOfAction: lex(
      h3('Most Abundant Neuropeptide in the CNS'),
      p(t('Neuropeptide Y (NPY) is a 36-amino acid peptide belonging to the pancreatic polypeptide family (along with PYY and PP). It is the most abundant neuropeptide in the mammalian brain, highly conserved across species, and a master regulator of multiple physiological functions: energy balance, stress response, anxiety, cardiovascular tone, circadian rhythms, and bone homeostasis. It acts through five Y receptors (Y1R–Y5R), all Gαi/o-coupled GPCRs.')),
      h3('Hypothalamic Energy Regulation'),
      p(t('NPY released from arcuate nucleus AgRP/NPY neurons is the most potent known orexigenic (appetite-stimulating) signal in the hypothalamus. It acts through Y1R and Y5R on paraventricular nucleus (PVN) neurons to: (1) suppress anorexigenic melanocortin signals (POMC/CART); (2) increase food intake and reduce energy expenditure; (3) promote carbohydrate metabolism over fat oxidation. Fasting dramatically increases NPY expression; leptin suppresses it.')),
      h3('Y Receptor Subtypes and Functions'),
      ul(
        'Y1R: primary anorexigenic appetite control; vasoconstriction; anxiety modulation',
        'Y2R: autoreceptor on NPY neurons (negative feedback); also gut motility',
        'Y3R: cardiac regulation; primarily expressed in brainstem',
        'Y4R: high affinity for PP; satiety signalling from pancreatic PP cells',
        'Y5R: reinforces Y1R appetite stimulation; circadian clock modulation',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Half-life'),
      p(t('Endogenous NPY circulates at picomolar concentrations with a plasma half-life of approximately 3–5 minutes, degraded by dipeptidyl peptidase IV (DPP-IV) cleaving the N-terminal Tyr-Pro bond to produce NPY3-36, which preferentially activates Y2R (gut motility and satiety rather than appetite). This DPP-IV cleavage represents an endogenous mechanism modulating NPY\'s spectrum of activity.')),
      h3('CNS vs. Peripheral NPY'),
      p(t('Peripheral NPY is released from sympathetic nerve terminals co-localised with noradrenaline, contributing to vasoconstriction (Y1R on vascular smooth muscle) and cardiac effects. Plasma NPY does not readily cross the blood-brain barrier — CNS NPY effects are driven by central synthesis and release. This compartmentalisation has important research implications: peripheral NPY antagonism does not reliably modulate central appetite circuits.')),
      h3('Research Tools'),
      ul(
        'Intrahypothalamic NPY injection: gold standard for demonstrating appetite stimulation',
        'BIBP3226: selective Y1R antagonist used in appetite research',
        'NPY3-36: Y2R-preferring fragment; reduces food intake (Y2R autoreceptor)',
        'Icv NPY infusion: models hyperphagia and obesity in rodents',
      ),
    ),
    researchFindings: lex(
      h3('Appetite and Obesity'),
      p(t('Intracerebroventricular NPY injection in rodents produces the most robust hyperphagia of any known molecule — 10-gram food intake increases within 1 hour. Chronic ICV NPY infusion produces full metabolic syndrome: obesity, insulin resistance, hyperlipidaemia, and hypertension. Conversely, NPY gene knockout mice show reduced body weight, enhanced metabolic rate, and resistance to diet-induced obesity.')),
      h3('Stress Resilience'),
      p(t('NPY is elevated in the amygdala and locus coeruleus under acute stress and acts as an endogenous anxiolytic, dampening the fear response. Military personnel exposed to extreme stress show higher plasma NPY levels correlated with psychological resilience and lower PTSD incidence (Morgan et al., 2003). Intranasal NPY is being studied as a PTSD prophylaxis in high-stress occupations.')),
      h3('Cardiovascular Research'),
      p(t('NPY is co-released with noradrenaline from cardiac sympathetic nerves during intense adrenergic activation, producing direct positive chronotropy and inotropy (via cardiac Y1R) and sustained vasoconstriction. In heart failure, chronic sympathetic activation depletes NPY stores; NPY plasma levels are inversely correlated with prognosis. Y1R antagonists have been studied as anti-hypertensive agents.')),
      h3('Bone Metabolism'),
      ul(
        'Y1R on osteoblasts: NPY suppresses bone formation (novel non-hypothalamic role)',
        'Y2R on hypothalamic neurons: knockout increases cancellous bone mass 2–4×',
        'Indirect neural control: hypothalamic NPY circuits regulate peripheral bone through sympathetic innervation',
        'Therapeutic target: Y2R antagonism may promote bone formation in osteoporosis',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile of NPY Manipulation'),
      p(t('No exogenous NPY therapeutic is approved. Safety data derive from research studies. ICV NPY in rodents produces marked hyperphagia, hyperlipidaemia, and insulin resistance — demonstrating the pathological potential of sustained NPY overactivation. Peripheral injection at high doses produces vasoconstriction and hypertension via Y1R on vasculature.')),
      h3('Intranasal NPY Research Safety'),
      p(t('Limited human data on intranasal NPY (100–300 mcg doses) show modest anxiolytic effects and improved stress-food cue response without significant adverse effects. The blood-brain barrier provides partial protection against peripheral NPY effects even with higher systemic concentrations, as CNS entry is limited. Intranasal delivery bypasses this partially.')),
      h3('Cardiovascular Considerations'),
      ul(
        'Hypertension: Y1R vascular agonism at pharmacological doses',
        'Arrhythmia: sympathetic NPY co-release potentiates catecholamine cardiac effects',
        'Prolonged vasoconstriction: NPY has longer duration than noradrenaline at Y1R',
        'Coronary spasm: Y1R on coronary smooth muscle; risk in susceptible individuals',
      ),
    ),
  },

  // ─── GIP ──────────────────────────────────────────────────────
  'gip': {
    mechanismOfAction: lex(
      h3('Glucose-Dependent Insulinotropic Polypeptide'),
      p(t('Glucose-dependent insulinotropic polypeptide (GIP) is a 42-amino acid incretin hormone produced by K-cells of the duodenum and proximal jejunum in response to food ingestion (particularly carbohydrates and fats). It acts through the GIP receptor (GIPR), a Gαs-coupled GPCR, expressed in pancreatic β-cells and α-cells, adipose tissue, bone, brain, pituitary, heart, and adrenal cortex.')),
      h3('Incretin Action — Pancreatic Effects'),
      p(t('GIP\'s primary metabolic role is as an incretin: it amplifies glucose-stimulated insulin secretion from β-cells in a glucose-dependent manner (only when blood glucose is elevated). GIPR activation on β-cells stimulates adenylyl cyclase → cAMP → PKA/Epac2 pathway, phosphorylating secretory machinery and promoting insulin granule exocytosis. Concurrently, GIP stimulates glucagon from α-cells — a crucial difference from GLP-1, which suppresses glucagon.')),
      h3('Adipose, Bone, and CNS Effects'),
      ul(
        'Adipocytes: GIPR drives triglyceride uptake (LPL activation) and suppresses lipolysis → fat storage (agonism controversially promotes adiposity)',
        'Bone: GIPR on osteoblasts promotes bone formation markers; GIP-deficient mice have osteoporosis',
        'Brain: hypothalamic GIPR modulates energy sensing and may contribute to satiety through distinct circuits from GLP-1R',
        'Adrenal cortex: GIPR on zona fasciculata; food-dependent cortisol release in GIPR-dependent Cushing\'s',
        'Tirzepatide: combined GIPR + GLP-1R agonism produces synergistic weight loss exceeding GLP-1R alone',
      ),
    ),
    pharmacokinetics: lex(
      h3('Native GIP Stability'),
      p(t('Native GIP is rapidly inactivated by DPP-IV, which cleaves the N-terminal His-Ala bond to produce GIP(3-42) — an inactive or weakly antagonistic fragment. Plasma half-life of native GIP is 2–5 minutes. This rapid degradation limits therapeutic utility of native GIP and drove development of DPP-IV-resistant analogues (GIP receptor agonists with Aib or D-Ala at position 2) for research and therapeutic use.')),
      h3('DPP-IV Inhibitors and GIP Elevation'),
      p(t('DPP-IV inhibitors (gliptins: sitagliptin, saxagliptin, linagliptin) extend native GIP half-life 2–4-fold as a side effect of their primary GLP-1-preserving mechanism. This GIP elevation contributes to their modest glycaemic efficacy, though disentangling GIP vs. GLP-1 effects from DPP-4 inhibition is methodologically difficult.')),
      h3('Research Agonist Dosing'),
      ul(
        'Native GIP infusion (metabolic research): 0.8–4 pmol/kg/min IV; used to define GIP physiology',
        'GIP analogues in preclinical: DPA-GIP, d-Ala2-GIP, NNC0151 — SC dosing at nmol/kg',
        'Tirzepatide: balanced GIPR/GLP-1R agonist; approved 5–15 mg SC weekly',
        'GIPR antagonists (Am-1 series): used to demonstrate GIP physiology via blockade',
      ),
    ),
    researchFindings: lex(
      h3('Incretin Effect and T2DM'),
      p(t('The incretin effect — augmented insulin secretion in response to oral vs. IV glucose — accounts for 50–70% of postprandial insulin release. GIP and GLP-1 together mediate this effect. In T2DM, the GIP incretin response is markedly blunted (GIP resistance at the β-cell) while GLP-1 response is relatively preserved — explaining why GLP-1 agonism is more effective than GIP agonism alone in T2DM.')),
      h3('GIP Resistance in Obesity'),
      p(t('Obese individuals and T2DM patients show reduced β-cell GIPR signalling, possibly due to receptor downregulation by chronically elevated GIP. This paradoxical situation — chronic hyperGIPaemia from high-fat feeding reducing GIPR sensitivity — provides one mechanistic explanation for why GIPR agonism requires co-activation of GLP-1R (as in tirzepatide) to achieve therapeutic benefit in already-GIP-resistant individuals.')),
      h3('Bone Research'),
      p(t('GIP has emerged as an important bone anabolic signal. Postprandial GIP surges correlate with markers of bone formation and suppress resorption. GIP-deficient mice exhibit low bone mass. Tirzepatide trials show modest positive effects on bone mineral density — an emerging finding that distinguishes it from GLP-1 RA class, which is metabolically neutral for bone.')),
      h3('GIPR Antagonism Debate'),
      ul(
        'GIP agonism (adipose): increases LPL and fat storage → metabolic concern in obesity',
        'GIPR antagonism: reduces adiposity in mice; GIP receptor deletion improves insulin sensitivity',
        'Paradox resolution: GIP agonism + GLP-1R agonism together overcome individual GIP adipogenic effect',
        'CNS GIPR: hypothalamic GIPR agonism suppresses appetite — net energy balance benefit',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('GIP Agonist Safety'),
      p(t('No pure GIP receptor agonist is clinically approved. Safety data for GIP system manipulation derives primarily from tirzepatide (GIPR + GLP-1R dual agonist) trials. GIP-specific adverse effects are difficult to isolate. Based on mechanism and GIPR distribution, primary concerns would be adipogenic effects (paradoxically observed in isolated GIPR agonism) and adrenocortical stimulation.')),
      h3('DPP-IV Inhibitor Safety Reference'),
      p(t('DPP-IV inhibitors (sitagliptin, saxagliptin) that elevate GIP (and GLP-1) provide a tolerability reference. These have an excellent safety profile: minimal hypoglycaemia as monotherapy, good cardiovascular safety (saxagliptin SAVOR-TIMI, alogliptin EXAMINE trials), and minor adverse effects (nasopharyngitis, UTIs). The elevated GIP component appears safe in this context.')),
      h3('Potential Adverse Effects of GIPR Agonism'),
      ul(
        'Adipose expansion: lipogenic GIPR effects if GLP-1R co-agonism insufficient',
        'Cortisol: GIPR on adrenal zona fasciculata → mild postprandial cortisol rise (physiological)',
        'Bone effects: generally positive (anabolic); unlikely adverse impact',
        'GI: tirzepatide GI AEs partly GIPR-mediated; nausea, vomiting, diarrhea',
      ),
    ),
  },

  // ─── IGF-2 ────────────────────────────────────────────────────
  'igf-2': {
    mechanismOfAction: lex(
      h3('Foetal Growth Factor and Imprinted Gene Product'),
      p(t('Insulin-like growth factor 2 (IGF-2) is a 67-amino acid peptide structurally homologous to insulin and IGF-1. Unlike IGF-1, which is primarily GH-dependent and produced in adult liver, IGF-2 is predominantly expressed during foetal development (encoded by the maternally-imprinted, paternally-expressed IGF2 gene on chromosome 11p15.5) and remains the primary growth factor in utero. Dysregulation causes foetal overgrowth syndromes (Beckwith-Wiedemann) or growth restriction (Russell-Silver).')),
      h3('Receptor Promiscuity'),
      p(t('IGF-2 activates multiple receptors: (1) IGF-1R — the primary signalling receptor, shared with IGF-1, activating PI3K/Akt and MAPK/ERK cascades for cell survival, growth, and metabolism; (2) insulin receptor isoform A (IR-A) — the foetal isoform lacking exon 11, to which IGF-2 binds with nearly equal affinity as insulin; (3) IGF-2R (mannose-6-phosphate receptor) — a clearance receptor that internalises and degrades IGF-2, limiting its bioavailability.')),
      h3('Adult IGF-2 Functions'),
      ul(
        'Brain: expressed in choroid plexus and hippocampus; promotes neurogenesis and memory consolidation',
        'Liver: IGF-2 is the dominant IGF during regeneration after hepatectomy',
        'Muscle: IGF-2 activates PI3K/Akt in satellite cells; promotes myoblast differentiation',
        'Adipose: IR-A activation in preadipocytes drives adipogenesis',
        'Cancer: IGF-2 overexpression in Wilms tumour, hepatocellular carcinoma, colorectal cancer',
      ),
    ),
    pharmacokinetics: lex(
      h3('Bioavailability and IGFBP Binding'),
      p(t('IGF-2 circulates at higher concentrations than IGF-1 in adults (600–900 ng/mL vs. 100–400 ng/mL). Over 95% is bound to IGFBPs (primarily IGFBP-3 and ALS in the ternary complex), which dramatically extend plasma half-life from minutes to ~16 hours for the free fraction. Bioavailable IGF-2 (free + low-affinity IGFBP-bound) represents ~5% of total circulating IGF-2.')),
      h3('Exogenous Administration'),
      p(t('Recombinant human IGF-2 (rhIGF-2) is used in research. SC bioavailability is ~70%. Half-life after SC injection is ~10–14 hours due to IGFBP buffering. Unlike IGF-1 (which has mecasermin approval for GH insensitivity), no approved IGF-2 therapeutic exists. Research doses in animal studies: 1–10 mg/kg daily for metabolic or cognitive studies.')),
      h3('Research Context'),
      ul(
        'Memory studies: hippocampal IGF-2 injection; sub-nanomolar concentrations effective',
        'Muscle research: IGF-2 at 10–100 nM in cell culture; promotes myoblast differentiation',
        'Glycaemic: IR-A activation; dose-dependent glucose lowering',
        'IGFBP modulation: protease activation releases bioactive IGF-2 from complexes',
      ),
    ),
    researchFindings: lex(
      h3('Memory Consolidation'),
      p(t('Chen et al. (2011, Science) demonstrated that hippocampal IGF-2 expression doubles in the hours following fear conditioning, and that intra-hippocampal IGF-2 injection dramatically enhances long-term memory consolidation. IGF-2 acts through IGF-1R on hippocampal neurons to activate synaptic AMPA receptor trafficking — a molecular mechanism for memory encoding. This finding positions IGF-2 as a potential cognitive enhancement target distinct from IGF-1.')),
      h3('Foetal Programming and Epigenetics'),
      p(t('The IGF2/H19 imprinting locus is among the most studied in epigenetics. Loss of imprinting (LOI) of IGF2 — causing biallelic expression — is an early epigenetic event in colorectal cancer and Wilms tumour. IGF2 LOI occurs in normal tissues of ~30% of colorectal cancer patients, conferring 5× increased colorectal cancer risk. This epigenetic marker has potential as a population screening tool.')),
      h3('Insulin-Like Metabolic Effects'),
      p(t('Via IR-A, IGF-2 exerts insulin-like glucose-lowering and anabolic effects. In GH-deficient states, elevated IGF-2 can partially compensate for reduced IGF-1, maintaining some anabolic support. In hypoglycaemia from large tumours producing IGF-2 (non-islet cell tumour hypoglycaemia, NICTH), tumour-derived IGF-2 overwhelms IGF-2R clearance and activates IR-A on hepatocytes and muscle.')),
      h3('Muscle Research'),
      ul(
        'IGF-2 promotes myogenesis via IGF-1R → PI3K/Akt → mTOR in C2C12 myoblasts',
        'Satellite cell activation: IGF-2 upregulated during muscle regeneration after injury',
        'Comparison to IGF-1: comparable anabolic effects via shared IGF-1R signalling',
        'AAV-delivered IGF-2: ongoing preclinical gene therapy work in muscular dystrophy models',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Hypoglycaemia Risk'),
      p(t('The primary safety concern with exogenous IGF-2 is hypoglycaemia via IR-A activation. At supraphysiological doses, IGF-2 can suppress hepatic glucose output and stimulate peripheral glucose uptake with an effect profile resembling insulin. Hypoglycaemia risk is amplified in fasted states or with concurrent insulin use. Blood glucose monitoring is essential in any research application involving systemic IGF-2 administration.')),
      h3('Oncological Considerations'),
      p(t('IGF-2 and IGF-1R signalling are strongly implicated in proliferation and survival of multiple tumour types. IGF-1R inhibitors (ganitumab, figitumumab) were studied as oncology drugs (ultimately without clinical success in unselected populations). Exogenous IGF-2 administration is contraindicated in any context of suspected malignancy — its IGF-1R and IR-A agonism could promote tumour growth.')),
      h3('Growth and Developmental Effects'),
      ul(
        'Foetal IGF-2 excess: Beckwith-Wiedemann syndrome — macrosomia, organomegaly, hemihypertrophy',
        'Adult supraphysiological IGF-2: potential acromegalic-like tissue growth effects',
        'Injection site: SC reactions; mild with recombinant peptide',
        'Immunogenicity: recombinant IGF-2 generally low immunogenicity',
      ),
    ),
  },

  // ─── PEG-MGF ──────────────────────────────────────────────────
  'peg-mgf': {
    mechanismOfAction: lex(
      h3('Pegylated Mechano-Growth Factor'),
      p(t('PEG-MGF (pegylated mechano-growth factor) is a stabilised derivative of mechano-growth factor (MGF), itself a splice variant of the IGF-1 gene (IGF-1Ec in humans, IGF-1Eb in rodents). MGF contains a unique 24-amino acid C-terminal E-peptide domain not found in other IGF-1 splice variants, which confers distinct biological activity independent of the IGF-1 domain. PEGylation (addition of polyethylene glycol chains) dramatically extends MGF half-life from minutes to days.')),
      h3('MGF E-Peptide Receptor'),
      p(t('The C-terminal MGF E-peptide activates a receptor distinct from IGF-1R — likely a currently uncharacterised GPCR or integrin complex — producing rapid satellite cell activation and proliferation prior to differentiation. This is mechanistically distinct from the IGF-1 domain of MGF, which acts conventionally through IGF-1R. The E-peptide thus provides a unique "activation signal" that primes stem cells for muscle repair.')),
      h3('Dual Mechanism'),
      ul(
        'E-peptide domain: satellite cell activation and proliferation (IGF-1R-independent)',
        'IGF-1 domain: satellite cell differentiation and hypertrophy (via IGF-1R → PI3K/Akt/mTOR)',
        'Temporal sequence: E-peptide initiates repair → IGF-1 domain completes regeneration',
        'PEGylation effect: prolongs E-peptide and IGF-1 domain activity from minutes to 4–7 days',
        'NLS sequence: E-peptide enters nucleus directly and modulates gene transcription',
      ),
    ),
    pharmacokinetics: lex(
      h3('PEGylation Pharmacokinetics'),
      p(t('Native MGF E-peptide has a plasma half-life of <30 minutes due to rapid proteolytic degradation. The unique 24-amino acid C-terminal sequence lacks the protease-resistant features of the IGF-1 domain. PEGylation with 2-kDa to 40-kDa PEG chains confers steric protection against proteases and renal filtration, extending half-life to 4–7 days in rodent studies — enabling weekly dosing rather than daily injection.')),
      h3('Distribution and Tissue Uptake'),
      p(t('PEG-MGF distributes primarily to damaged/exercised skeletal muscle, where vascular permeability is enhanced. Muscle mechanical strain upregulates MGF expression locally — the therapeutic rationale for MGF use post-workout or post-injury is that exogenous PEG-MGF supplements this local signal when endogenous production is insufficient (ageing, injury severity). Cardiac and smooth muscle also express MGF following ischaemia.')),
      h3('Research Protocols'),
      ul(
        'PEG-MGF: 200–400 mcg SC 1–2× per week; administered post-resistance training session',
        'Native MGF: 100–200 mcg SC daily; less practical due to short half-life',
        'Cycle length: 4–8 weeks; often combined with IGF-1 LR3 for synergistic anabolic effect',
        'Timing: within 2 hours of muscle-damaging exercise for maximal satellite cell activation',
      ),
    ),
    researchFindings: lex(
      h3('Original MGF Research'),
      p(t('Goldspink et al. (1996–2007) at University College London pioneered MGF research, demonstrating that muscle mechanical loading (exercise or stretch) generates a local MGF splice variant in damaged fibres before systemic IGF-1 rises. Blocking endogenous MGF with specific antibodies prevented satellite cell activation after injury, confirming MGF\'s non-redundant role in muscle repair initiation.')),
      h3('PEG-MGF in Rodent Models'),
      p(t('Yang and Goldspink (2002) demonstrated that intramuscular injection of synthetic MGF E-peptide into aged mouse tibialis anterior produced a 25% increase in mean muscle fibre cross-sectional area over 3 weeks, without systemic IGF-1 changes. PEG-MGF showed equivalent effect at 10× lower dose due to extended exposure, establishing the dose-sparing advantage of PEGylation.')),
      h3('Cardiac Repair Research'),
      p(t('MGF is expressed in cardiac myocytes following ischaemia. Exogenous MGF or PEG-MGF treatment in rodent MI models reduced infarct size by 30–40% and improved ejection fraction — attributed to activation of resident cardiac progenitor cells expressing the MGF E-peptide receptor. This cardiac application is under early investigation.')),
      h3('Ageing Muscle'),
      ul(
        'MGF splice variant expression declines with age: reduced satellite cell activation',
        'Aged muscle responds to exogenous MGF despite reduced endogenous production',
        'PEG-MGF in sarcopenia models: maintained type II fibre size over 12 weeks',
        'Synergy with resistance training: IGF-1 and MGF pathways are additive, not redundant',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('PEG-MGF has a limited clinical safety database — no approved therapeutic, no formal Phase 1 human trials. The existing safety evidence derives from preclinical rodent and in vitro studies. At research doses, PEG-MGF has not produced significant organ toxicity in rodent 90-day studies. No significant IGF-1 elevation or systemic insulin-like hypoglycaemia has been reported at the SC doses studied.')),
      h3('Theoretical Concerns'),
      ul(
        'IGF-1R activation: potential tumour promotion in at-risk individuals',
        'Satellite cell hyperactivation: theoretical risk of fibrous repair over proper regeneration',
        'PEG-related immunogenicity: rare anti-PEG antibodies can reduce efficacy of PEGylated biologics',
        'Cardiomegaly: with chronic excessive satellite cell/progenitor activation in cardiac tissue',
      ),
      h3('Anti-Doping Status'),
      p(t('MGF and PEG-MGF are prohibited in competition under WADA\'s S2 category (Peptide Hormones, Growth Factors, Related Substances and Mimetics). Detection methods include immunoassay and mass spectrometry of urine and blood. PEGylation does not prevent detection; PEG itself serves as a detection marker in anti-doping screens. Research use outside competitive sport contexts is not governed by WADA regulations.')),
    ),
  },

  // ─── Collagen Peptides ────────────────────────────────────────
  'collagen-peptides': {
    mechanismOfAction: lex(
      h3('Bioactive Collagen-Derived Fragments'),
      p(t('Collagen peptides (also called hydrolysed collagen or collagen hydrolysate) are short-chain polypeptides derived from enzymatic or acid hydrolysis of native collagen (Type I, II, or III). The hydrolysis process cleaves the 1,000-residue collagen triple helix into peptide fragments of 2–20 amino acids — primarily dipeptides and tripeptides rich in proline, hydroxyproline, and glycine. These fragments are bioactive rather than merely providing substrate amino acids.')),
      h3('Fibroblast Stimulation'),
      p(t('The most studied collagen peptide fragments — Pro-Hyp and Gly-Pro-Hyp — act as agonists on collagen receptor (discoidin domain receptor, DDR) and integrins on fibroblasts and chondrocytes. Binding activates MAPK/ERK and TGF-β pathways, upregulating: (1) type I and type III collagen gene transcription; (2) hyaluronic acid synthase expression; (3) elastin synthesis. The net effect is a "scaffold repair signal" stimulating extracellular matrix regeneration.')),
      h3('Distribution to Connective Tissues'),
      ul(
        'Skin dermis: fibroblast stimulation → collagen and elastin synthesis → reduced wrinkle depth',
        'Articular cartilage: chondrocyte stimulation → cartilage matrix synthesis → joint support',
        'Tendons/ligaments: tenocyte activation → collagen cross-link formation',
        'Bone: osteoblast stimulation → bone matrix protein upregulation',
        'Gut: intestinal epithelial support → tight junction protein upregulation (gut lining integrity)',
      ),
    ),
    pharmacokinetics: lex(
      h3('Oral Bioavailability'),
      p(t('Unlike most peptides, collagen dipeptides and tripeptides (particularly Pro-Hyp) survive GI digestion and are absorbed intact through intestinal epithelium via peptide transporter PepT1. Plasma Pro-Hyp peaks within 60–90 minutes of oral administration and is detectable in skin tissue by 2 hours. This is exceptional for oral peptides — the hydroxyproline-containing fragments are resistant to brush-border peptidases.')),
      h3('Tissue Distribution Kinetics'),
      p(t('Radiolabelled collagen peptide studies (Iwai et al., 2005) confirmed that orally administered Pro-Hyp accumulates preferentially in skin dermis, cartilage, and bone — precisely the high-collagen tissues where fibroblasts and chondrocytes reside. Peak tissue concentration occurs at 12 hours and remains elevated for 24 hours, consistent with observed clinical effects from once-daily dosing.')),
      h3('Dosing'),
      ul(
        'Skin health: 2.5–10 g/day oral; 8–12 weeks minimum for clinical effect',
        'Joint health: 10–15 g/day (preferably with vitamin C for hydroxylation co-factor supply)',
        'Bone support: 5 g/day with calcium and vitamin D in research protocols',
        'Timing: post-exercise ingestion enhances delivery to stimulated musculoskeletal tissues',
      ),
    ),
    researchFindings: lex(
      h3('Skin Elasticity and Anti-Ageing'),
      p(t('A meta-analysis of 19 RCTs (Pu et al., 2023) covering 1,125 participants showed collagen peptide supplementation (2.5–10 g/day) significantly improved skin elasticity (SMD 0.64), hydration (SMD 0.71), and reduced wrinkle depth (SMD 0.72) vs. placebo at 8–12 weeks. Type I collagen peptides from bovine or marine sources produced comparable effects.')),
      h3('Joint Pain and Osteoarthritis'),
      p(t('The HEAL study and PECOS trial demonstrated that 10 g/day hydrolysed collagen reduced knee pain scores (VAS and WOMAC) by 20–30% in osteoarthritis and activity-related joint pain vs. placebo over 6 months. Proposed mechanism: cartilage stimulation + synovial anti-inflammatory effect. The evidence is modest but consistent across multiple independent RCTs.')),
      h3('Bone Mineral Density'),
      p(t('König et al. (2018) conducted a 12-month RCT in postmenopausal osteopenic women: 5 g/day specific collagen peptides + calcium + vitamin D produced significant increases in femoral neck BMD vs. calcium + vitamin D alone (p<0.05), with reduced bone resorption markers (CTX) and increased formation markers (P1NP). This suggests additive benefit to standard osteoporosis prophylaxis.')),
      h3('Tendon and Athletic Performance'),
      ul(
        'Shaw et al. (2017): 15 g collagen + vitamin C taken 60 min pre-exercise increased glycine in circulation and improved tendon collagen synthesis rate vs. control',
        'Dressler et al. (2018): Achilles tendinopathy; 2.5 g/day collagen peptides reduced pain and improved function over 6 months',
        'Muscle mass: no significant anabolic effect independent of exercise; not an alternative to protein for muscle hypertrophy',
        'Wound healing: wound strength and closure speed improved in animal and small human studies',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Excellent Safety Profile'),
      p(t('Collagen peptides have an exceptional safety record across clinical trials and decades of supplement use. The FDA classifies hydrolysed collagen as GRAS (generally recognised as safe). Adverse effects reported across all published RCTs are minimal: predominantly mild GI complaints (bloating, loose stools) at doses >15 g/day, occurring in <5% of subjects.')),
      h3('Allergen Considerations'),
      ul(
        'Bovine-derived: trace BSE risk in theoretical terms; regulated source standards eliminate practical risk',
        'Marine-derived: potential fish allergy trigger; relevant for known fish allergy sufferers',
        'Porcine: not suitable for religious dietary restrictions',
        'Egg shell membrane (Type I/V): alternative source for mixed allergen avoidance',
      ),
      h3('Hypercalcaemia Risk'),
      p(t('When combining collagen peptides with calcium supplementation for bone protocols, ensure total daily calcium intake (diet + supplements) does not exceed 2,500 mg in healthy adults to avoid hypercalcaemia and renal stone risk. Vitamin C (50–200 mg) taken alongside collagen peptides provides hydroxylation co-factor for collagen cross-linking — a practical optimisation without safety concern at these doses.')),
    ),
  },
}
