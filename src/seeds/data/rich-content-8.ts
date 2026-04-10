/**
 * Rich content batch 8 — 10 peptides
 * angiotensin-1-7, alpha-msh, galanin, neurotensin, trh,
 * kpv, gonadorelin, urocortin-1, acth, bradykinin
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

export const richContent8 = {

  // ─── Angiotensin 1-7 ──────────────────────────────────────────
  'angiotensin-1-7': {
    mechanismOfAction: lex(
      h3('Counter-Regulatory Renin-Angiotensin Axis'),
      p(t('Angiotensin-(1-7) [Ang-(1-7)] is a 7-amino acid peptide (Asp-Arg-Val-Tyr-Ile-His-Pro) produced primarily by the cleavage of angiotensin II (Ang II) by angiotensin-converting enzyme 2 (ACE2). The Ang-(1-7)/ACE2/Mas receptor axis represents the counter-regulatory arm of the renin-angiotensin-aldosterone system (RAAS), opposing the vasoconstriction, fibrosis, and inflammation driven by the classical Ang II/ACE/AT1R axis.')),
      h3('Mas Receptor Signalling'),
      p(t('Ang-(1-7) is the principal endogenous ligand of the Mas receptor, a Gαi/Gαq-coupled GPCR. Mas activation in vascular endothelium stimulates eNOS → nitric oxide (NO) production → vasodilation. In the kidney, Mas activation promotes natriuresis and reduces tubular sodium reabsorption. In the heart, Mas activation is anti-fibrotic, anti-hypertrophic, and cardioprotective.')),
      h3('Mechanisms of Protection'),
      ul(
        'Vasodilation: endothelial NO synthesis and kinin potentiation',
        'Anti-fibrosis: TGF-β1 pathway inhibition; reduced collagen deposition in heart and kidney',
        'Anti-inflammation: NF-κB inhibition; reduced IL-6, TNF-α, MCP-1',
        'Anti-thrombosis: reduced platelet aggregation via NO/prostacyclin',
        'SARS-CoV-2 relevance: ACE2 is the viral entry receptor; viral ACE2 downregulation shifts balance toward Ang II excess',
      ),
    ),
    pharmacokinetics: lex(
      h3('Stability and Formulation'),
      p(t('Native Ang-(1-7) has a very short plasma half-life (~1 minute) due to rapid degradation by ACE (which converts it to Ang-(1-5)) and prolyl carboxypeptidase. Inclusion in β-cyclodextrin (HP-β-CD) or PEGylated forms extends half-life substantially. The oral formulation in HP-β-CD (CPCR4006) achieves systemic bioavailability of ~25% with a half-life extended to ~3 hours.')),
      h3('Administration Routes in Research'),
      p(t('Research protocols use continuous SC infusion (osmotic pump) at 100–576 mcg/kg/day in rodent models, producing plasma concentrations in the physiological range. Clinical trials in humans have used subcutaneous infusion at 3–100 mcg/kg/hour. The oral HP-β-CD formulation (once or twice daily capsules) is used in several ongoing Phase 2 trials for cardiovascular and COVID-19 sequelae applications.')),
      h3('Research Dosing'),
      ul(
        'Rodent SC infusion: 100–576 mcg/kg/day via osmotic minipump',
        'Human IV infusion (Phase 1): 3–100 mcg/kg/hour; dose-dependent vasodilation',
        'Oral HP-β-CD (clinical trials): 3 mg twice daily to 30 mg twice daily',
        'TXA127 (clinical-grade Ang-(1-7)): SC or IV; multiple Phase 2 trials',
      ),
    ),
    researchFindings: lex(
      h3('Cardiovascular Protection'),
      p(t('In spontaneously hypertensive rats and heart failure models, Ang-(1-7) infusion reduces blood pressure, cardiac hypertrophy, and interstitial fibrosis. Santos et al. (2003) demonstrated that Mas knockout mice develop hypertension, cardiac hypertrophy, and metabolic syndrome — confirming the cardiovascular significance of endogenous Ang-(1-7) signalling.')),
      h3('Post-COVID-19 Sequelae'),
      p(t('SARS-CoV-2 uses ACE2 as its entry receptor, downregulating ACE2 upon binding and internalisation. Reduced ACE2 activity impairs Ang-(1-7) generation, shifting the RAAS toward Ang II excess — contributing to pulmonary fibrosis, endothelial dysfunction, and cardiovascular complications of COVID-19. Clinical trials with TXA127 showed improvement in acute COVID-19 oxygen saturation and reduced inflammatory markers.')),
      h3('Metabolic Syndrome Research'),
      p(t('Ang-(1-7) improves insulin sensitivity in obese rodents via Mas receptor on skeletal muscle — activating PI3K/Akt insulin signalling pathways and reducing IRS-1 serine phosphorylation (which causes insulin resistance). Fat mass reduction, improved glucose tolerance, and reduced hepatic steatosis have all been documented in diet-induced obesity models.')),
      h3('Oncology — Mast Cell Activation'),
      ul(
        'Anti-tumour: Ang-(1-7) reduces VEGF expression and tumour angiogenesis',
        'Clinical trial: Ang-(1-7) in chemotherapy-induced thrombocytopenia recovery',
        'Haematopoiesis: Mas receptor on progenitor cells promotes bone marrow recovery after chemotherapy',
        'Breast cancer model: reduced pulmonary metastasis with chronic Ang-(1-7) treatment',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Clinical Safety Data'),
      p(t('Phase 1 and 2 clinical trial data for Ang-(1-7) (as TXA127 and AVE 0991 analogues) show an excellent safety profile. The primary pharmacodynamic effect — vasodilation — means hypotension is the dose-limiting adverse effect at infusion rates above 100 mcg/kg/hour. Oral formulations in HP-β-CD are well tolerated with GI discomfort as the most commonly reported adverse event.')),
      h3('Adverse Effects'),
      ul(
        'Hypotension: vasodilatory effect; dose-dependent; monitor BP during infusion',
        'Flushing: NO-mediated vasodilation in skin; transient',
        'Headache: vasodilatory; common at higher doses',
        'GI: mild nausea with oral formulation; resolves with food co-administration',
      ),
      h3('Interactions and Contraindications'),
      p(t('Ang-(1-7) potentiates the effects of ACE inhibitors and ARBs — concurrent use may produce additive hypotension. No significant interaction with anticoagulants. Contraindicated in symptomatic hypotension. In COVID-19 research, the interaction between viral ACE2 downregulation and exogenous Ang-(1-7) replacement is an active safety consideration being monitored in ongoing trials.')),
    ),
  },

  // ─── Alpha-MSH ────────────────────────────────────────────────
  'alpha-msh': {
    mechanismOfAction: lex(
      h3('Melanocortin-1 and 4 Receptor Agonist'),
      p(t('Alpha-melanocyte-stimulating hormone (α-MSH) is a 13-amino acid peptide (Ac-Ser-Tyr-Ser-Met-Glu-His-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH₂) derived from POMC cleavage by prohormone convertase 1 (PC1) in pituitary melanotroph cells and POMC neurons of the hypothalamic arcuate nucleus. It activates melanocortin receptors MC1R (skin melanocytes) and MC4R (hypothalamic neurons, reproductive and cardiovascular control), along with MC3R (peripheral energy balance).')),
      h3('MC1R — Pigmentation and Immunomodulation'),
      p(t('At MC1R on melanocytes, α-MSH activates adenylyl cyclase → cAMP → PKA, stimulating tyrosinase activity and switching melanin synthesis from pheomelanin (yellow/red) to eumelanin (brown/black). This eumelanin shift confers photoprotection. MC1R on macrophages and keratinocytes mediates potent anti-inflammatory effects: reducing NF-κB activation, suppressing IL-1β, IL-6, and TNF-α, and upregulating IL-10.')),
      h3('MC4R — Energy Balance and Sexual Function'),
      p(t('MC4R in the paraventricular nucleus (PVN) is the primary anorexigenic node of the melanocortin system. α-MSH (and the synthetic analogue PT-141/bremelanotide) activates MC4R to: (1) suppress NPY/AgRP appetitive signals; (2) increase energy expenditure via sympathetic activation; (3) modulate sexual arousal circuits — MC4R knockout mice are hyperphagic, obese, and display reproductive dysfunction.')),
      ul(
        'MC1R: eumelanin production, photoprotection, anti-inflammation',
        'MC3R: peripheral energy sensing; adipocyte and gut MC3R in energy balance',
        'MC4R: anorexia, energy expenditure, sexual function',
        'MC2R: ACTH receptor (not α-MSH target) — adrenocortical steroidogenesis',
        'MC5R: exocrine gland function; sweat, sebum, lacrimal secretion',
      ),
    ),
    pharmacokinetics: lex(
      h3('Native α-MSH Stability'),
      p(t('Native α-MSH has a plasma half-life of approximately 30 minutes, degraded by serum peptidases targeting the Met-Glu bond and C-terminal amide. The N-terminal acetylation and C-terminal amidation inherent to native α-MSH confer moderate stability vs. unmodified fragments. PT-141 (bremelanotide) represents a cyclic analogue with substantially improved stability and selectivity for MC3R/MC4R over MC1R.')),
      h3('Research Administration'),
      p(t('Intranasal delivery of α-MSH and its analogues (as used in early PT-141 research) produces peak plasma concentrations within 30–60 minutes with partial CNS delivery via olfactory transport. SC injection provides >85% bioavailability. Afamelanotide (Scenesse, a Nle4-D-Phe7-α-MSH analogue) is administered as a biodegradable implant, providing 60-day sustained MC1R activation for erythropoietic protoporphyria.')),
      h3('Dosing Protocols'),
      ul(
        'Afamelanotide (MC1R, photoprotection): 16 mg subcutaneous implant every 60 days',
        'PT-141/bremelanotide (MC3R/MC4R): 1.75 mg SC pre-sexual activity (FDA-approved HSDD)',
        'Research α-MSH: 0.5–3 mg SC or IN; short duration',
        'Melanotan I (α-MSH analogue): 0.5–1 mg SC daily for tanning research',
      ),
    ),
    researchFindings: lex(
      h3('Erythropoietic Protoporphyria'),
      p(t('Afamelanotide (Nle4-D-Phe7-α-MSH) received FDA and EMA approval for erythropoietic protoporphyria (EPP) in 2019 — a rare genetic disorder where porphyrin accumulation causes severe phototoxic pain. Phase 3 RCTs (CLINUVEL) demonstrated afamelanotide increased pain-free sun exposure time from 69 to 369 minutes over 6 months vs. placebo, transforming quality of life for EPP patients.')),
      h3('Photoprotection in UV-Sensitive Disorders'),
      p(t('By stimulating eumelanin production and activating DNA repair pathways (MC1R → MITF → DNA-PK), α-MSH analogues confer photoprotection independent of sunscreen. In clinical trials for polymorphous light eruption and xeroderma pigmentosum (a rare DNA repair disorder), afamelanotide reduced photosensitivity reactions by 50–75%.')),
      h3('Anti-inflammatory Research'),
      p(t('Intracerebral or peripheral α-MSH suppresses neuroinflammation in models of stroke, traumatic brain injury, and systemic sepsis. MC1R and MC4R on microglia and peripheral macrophages inhibit NF-κB and reduce cytokine storm characteristics. This anti-inflammatory mechanism is being explored in rheumatoid arthritis, IBD, and COVID-19 cytokine storm contexts.')),
      h3('Sexual Function'),
      ul(
        'Bremelanotide (PT-141): FDA-approved for hypoactive sexual desire disorder (HSDD) in premenopausal women',
        'MC4R in MPOA: activates limbic desire circuits independently of genital vascular mechanisms',
        'Mechanism differs from PDE5 inhibitors: central arousal rather than peripheral vasodilation',
        'Male HSDD: Phase 2 data show improvement; application under investigation',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Afamelanotide Safety'),
      p(t('The approved afamelanotide implant demonstrates a well-characterised safety profile after Phase 3 trials and post-approval surveillance. The most common adverse effects are nausea (25%), fatigue (15%), and injection site reactions (23%). Tanning/hyperpigmentation is an expected pharmacodynamic effect (desired for EPP indication). Melanocytic naevi (moles) darkening is expected — naevus surveillance is recommended.')),
      h3('Bremelanotide Safety'),
      ul(
        'Nausea: 40% of patients; most common dose-limiting AE',
        'Flushing: facial flushing within 1 hour; transient',
        'Transient hypertension: blood pressure elevation for 8–12 hours post-dose',
        'Hyperpigmentation: chronic use; facial melanin deposition possible',
        'Contraindicated: high cardiovascular risk due to transient BP elevation',
      ),
      h3('Melanotan Analogue Research Risks'),
      p(t('Unregulated melanotan II (MT-II) carries the full spectrum of MC receptor agonism: nausea (high rate at effective tanning doses), spontaneous erection (MC3R/MC4R), darkening of all melanocytic lesions including atypical naevi, and systemic hypertension. Unlike afamelanotide (selective MC1R) and bremelanotide (MC3R/MC4R), MT-II activates all five receptors non-selectively, increasing adverse effect burden and complicating safety monitoring.')),
    ),
  },

  // ─── Galanin ─────────────────────────────────────────────────
  'galanin': {
    mechanismOfAction: lex(
      h3('Neuromodulatory Peptide'),
      p(t('Galanin is a 29-amino acid (human) or 30-amino acid (rodent) neuropeptide encoded by the GAL gene, widely expressed in the central and peripheral nervous systems — hypothalamus, brainstem, dorsal root ganglia, enteric nervous system, and spinal cord. It acts through three GPCRs: GalR1 (Gαi; inhibitory), GalR2 (Gαq; excitatory or inhibitory context-dependent), and GalR3 (Gαi; inhibitory). Galanin functions primarily as a neuromodulator — dampening or amplifying co-released neurotransmitter effects.')),
      h3('GalR1/GalR3 Inhibitory Signalling'),
      p(t('GalR1 and GalR3 activation inhibits adenylyl cyclase (reducing cAMP), activates inwardly rectifying potassium channels (GIRK; hyperpolarising neurons), and reduces voltage-gated calcium channel conductance. These inhibitory effects suppress neurotransmitter release from presynaptic terminals, explaining galanin\'s broad inhibitory modulatory role in pain, mood, and appetite circuits.')),
      h3('Physiological Functions'),
      ul(
        'Pain modulation: spinal dorsal horn galanin suppresses C-fibre nociceptive transmission',
        'Appetite: hypothalamic GalR1 stimulates feeding behaviour, particularly fat intake',
        'Mood: locus coeruleus galanin dampens noradrenergic firing → anti-stress, anxiolytic',
        'Hippocampal memory: galanin inhibits ACh release → negative modulation of memory',
        'Autonomic: galanin in sympathetic ganglia modulates noradrenaline co-release',
        'Neurogenesis: GalR2 in hippocampal progenitors promotes adult neurogenesis',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Stability'),
      p(t('Native galanin has a very short plasma half-life (<5 minutes) due to rapid degradation by serine proteases and endopeptidases. This precludes systemic therapeutic use of native peptide. Research approaches use: (1) centrally administered galanin (ICV or intrathecal); (2) GalR-selective agonists with modified stability; (3) viral vector-mediated galanin overexpression. Clinical translation has focused on small-molecule GalR agonists and antagonists.')),
      h3('GalR-Selective Research Tools'),
      p(t('A diverse pharmacological toolkit exists: M35 (galanin(1-13)-Pro-Pro-(Ala-Leu)₂-Ala-amide) is a broad GalR antagonist used to probe galanin physiology. Galnon and galmic are non-peptide GalR agonists with CNS penetration. NAX 5055 (galanin analogue) is a GalR1/2 agonist developed as an anti-epileptic agent that reached Phase 1 clinical trials.')),
      h3('Research Context'),
      ul(
        'ICV galanin in rodents: stimulates feeding and fat intake within 30 min',
        'Intrathecal galanin: anti-nociceptive in inflammatory pain models',
        'GalR1 agonists: anxiolytic and antidepressant-like in forced swim and EPM tests',
        'GalR2 agonists: pro-neurogenic; hippocampal neuron proliferation promotion',
      ),
    ),
    researchFindings: lex(
      h3('Alzheimer\'s Disease'),
      p(t('Galanin is pathologically upregulated in the basal forebrain of Alzheimer\'s disease patients — surrounding and inhibiting surviving cholinergic neurons in the nucleus basalis of Meynert. GalR1 overactivation suppresses ACh release from surviving neurons, exacerbating cognitive impairment beyond what cell loss alone would predict. GalR1 antagonists thus represent potential therapeutic targets for preserving residual cholinergic function in AD.')),
      h3('Epilepsy and Neuroprotection'),
      p(t('Galanin is an endogenous anti-epileptic molecule: galanin levels in hippocampus rise after seizures, GalR1-mediated hyperpolarisation limits seizure propagation, and galanin knockout mice show dramatically increased seizure susceptibility. Conversely, galanin overexpression in transgenic mice confers seizure resistance. NAX 5055, a galanin analogue, reduced seizure duration in multiple rodent models.')),
      h3('Depression and Anxiety Research'),
      p(t('The locus coeruleus (LC) — primary noradrenergic nucleus — co-expresses galanin with noradrenaline. Chronic stress depletes LC galanin, reducing the inhibitory buffer on stress-reactive noradrenergic firing. GalR1 agonism reduces LC firing rate and attenuates stress-induced behaviour. Antidepressants (SSRIs, TCAs) upregulate galanin in LC — a previously underappreciated mechanism of action.')),
      h3('Pain Research'),
      ul(
        'Spinal dorsal horn: galanin reduces C-fibre-evoked glutamate release → analgesic',
        'Inflammation: galanin upregulated in DRG after peripheral inflammation',
        'Neuropathic pain: intrathecal galanin reduces allodynia and hyperalgesia',
        'GalR2 in DRG: paradoxically pro-nociceptive in some models — GalR selectivity matters',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('No Approved Galanin Therapeutics'),
      p(t('No galanin agonist or antagonist has received regulatory approval. All safety data derive from preclinical studies and one Phase 1 trial for NAX 5055. Systemic galanin agonism theoretically risks excessive appetite stimulation, hypotension (via sympathetic inhibition), and cognitive impairment (via cholinergic suppression). These mechanistic concerns have driven selective GalR subtype approaches.')),
      h3('Research Safety Observations'),
      ul(
        'ICV galanin: hyperphagia, reduced locomotion, mild sedation',
        'Systemic native galanin: hypotension via sympathetic inhibition',
        'NAX 5055 Phase 1: well tolerated at anti-seizure doses; mild sedation reported',
        'GalR1 antagonists: potential anxiety reduction in Alzheimer\'s without significant adverse effects in preclinical studies',
      ),
      h3('Research Directions'),
      p(t('The primary challenge in galanin pharmacology is receptor subtype selectivity — GalR1 (inhibitory, cognition-negative) vs. GalR2 (mixed, pro-neurogenic) vs. GalR3 (inhibitory). Developing agents that activate GalR2 for neurogenesis while sparing GalR1/3 cognitive suppression represents the current frontier. Structure-activity studies of galanin(1-13)-Gly-Pro fragments have identified GalR2-preferring sequences for further development.')),
    ),
  },

  // ─── Neurotensin ─────────────────────────────────────────────
  'neurotensin': {
    mechanismOfAction: lex(
      h3('Neurotensin Receptors and Distribution'),
      p(t('Neurotensin (NT) is a 13-amino acid peptide (pGlu-Leu-Tyr-Glu-Asn-Lys-Pro-Arg-Arg-Pro-Tyr-Ile-Leu) distributed throughout the brain (hypothalamus, dopaminergic systems, spinal cord) and GI tract (N-cells of the intestine, released postprandially by fat). It acts through three receptors: NTS1 and NTS2 (Gαq- and Gαi-coupled GPCRs respectively, both high-affinity) and NTS3/sortilin (intracellular trafficking receptor).')),
      h3('Dopaminergic Modulation'),
      p(t('The most studied central NT circuit involves modulation of mesolimbic and nigrostriatal dopamine systems. NT is co-released with dopamine from VTA and substantia nigra neurons, where it functions as an endogenous antipsychotic: NTS1 activation on D2R-expressing neurons reduces D2R sensitivity by inducing receptor internalisation, dampening dopaminergic hyperactivity. This NT-DA coupling has been called a "natural antipsychotic system."')),
      h3('Thermoregulation and Pain'),
      ul(
        'Hypothermia: NT causes dose-dependent core temperature reduction (distinct from opioid hypothermia)',
        'Analgesia: intrathecal NT produces opioid-independent analgesia via NTS2 in spinal cord',
        'GI: NT stimulates pancreatic enzyme secretion and slows gastric emptying postprandially',
        'Fat absorption: NT in gut L-cells released by dietary fat; regulates intestinal motility',
        'Cardiovascular: peripheral NT causes hypotension via vasodilation and cardiac effects',
      ),
    ),
    pharmacokinetics: lex(
      h3('Native NT Stability'),
      p(t('Native NT is rapidly degraded in plasma by endopeptidases (neprilysin, thimet oligopeptidase) and in the CNS by neurolysin, with a half-life of <3 minutes systemically. This requires intrathecal, ICV, or intranasal delivery for CNS effects, or the use of NT analogues with improved stability. NT(8-13) — the C-terminal hexapeptide — retains full receptor-binding activity and is used as a research tool.')),
      h3('NT Analogues'),
      p(t('PD149163 is a brain-penetrant NT analogue with antipsychotic-like activity in rodent models. NT69L (D-Lys8 substitution) is protease-resistant and shows hypothermic and analgesic effects with 30-minute half-life after IV administration. JMV449 and JMV2009 are NT analogues used in pain and antipsychotic research. No NT analogue has achieved clinical approval.')),
      h3('Research Dosing'),
      ul(
        'ICV NT: 0.1–10 nmol produces dose-dependent hypothermia and analgesia in rats',
        'Intrathecal NT(8-13): 1–100 nmol; effective analgesia in inflammatory and neuropathic models',
        'NT69L IV: 1–4 mg/kg; antipsychotic-like effects without catalepsy in rodents',
        'PD149163 SC: 1–30 mg/kg; prepulse inhibition restoration in schizophrenia models',
      ),
    ),
    researchFindings: lex(
      h3('Antipsychotic Research'),
      p(t('The NT system is one of the most studied neuropeptide pathways in schizophrenia research. Decreased CSF NT levels are found in untreated schizophrenia; antipsychotic drugs normalise NT levels. NT analogues that enter the brain (PD149163, NT69L) produce antipsychotic-like effects in dopamine hyperactivity models without causing extrapyramidal side effects (catalepsy) — a key distinction from traditional D2R blockers.')),
      h3('Opioid-Independent Analgesia'),
      p(t('Intrathecal neurotensin produces dose-dependent analgesia in thermal, mechanical, and chemical pain models through NTS2 and NTS1 in the spinal cord. Unlike opioids, NT analgesia does not decrease with repeated use and cross-tolerance with opioids is absent. This has stimulated research into NT-opioid combinations for pain management — NT potentially allowing opioid dose reduction while maintaining analgesic efficacy.')),
      h3('Thermoregulation and Neuroprotection'),
      p(t('NT-induced hypothermia is being investigated as a neuroprotective strategy for stroke and traumatic brain injury. Mild hypothermia (32–34°C) reduces ischaemic brain injury; NT-mediated hypothermia achieves this pharmacologically without intensive external cooling. Rodent stroke studies demonstrate 30–40% infarct volume reduction with NT-induced hypothermia initiated within 1 hour of ischaemia.')),
      h3('Cancer — NT Receptor Expression'),
      ul(
        'NTS1/NTS3 overexpression in colon, pancreatic, and lung cancers',
        'NT promotes tumour cell proliferation (autocrine loop in NTS1-expressing cancer cells)',
        'NTS1 antagonists (SR48692): anti-proliferative in colorectal cancer models',
        'NT-based radiopharmaceuticals: radiolabelled NT analogues target NTS1+ tumours for diagnostic imaging',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Systemic NT Effects'),
      p(t('Systemic neurotensin administration produces predictable pharmacodynamic effects: hypotension (vasodilation and cardiac effects), hypothermia, and GI effects (nausea, gastric distension slowing). At analgesic doses in animal studies, motor impairment is not observed — distinguishing NT analgesia from opioid-type sedation. These cardiovascular effects limit systemic NT use in research.')),
      h3('Research Safety Profile'),
      ul(
        'Hypothermia: potentially therapeutic (neuroprotection) or adverse depending on magnitude and context',
        'Hypotension: significant cardiovascular monitoring required for IV NT administration',
        'No physical dependence: opioid-independent mechanism; no withdrawal syndrome',
        'CNS delivery needed for psychiatric/analgesic applications — systemic administration inefficient',
      ),
      h3('No Clinical Translation Yet'),
      p(t('Despite decades of preclinical evidence for NT analogues in schizophrenia and pain, none have reached late clinical-stage trials. Challenges include: CNS penetration (the blood-brain barrier excludes most peptides), receptor subtype selectivity (NTS1 vs. NTS2 have opposite pain modulatory roles), and the complexity of targeting the dopamine system without on-target cardiovascular adverse effects.')),
    ),
  },

  // ─── TRH ─────────────────────────────────────────────────────
  'trh': {
    mechanismOfAction: lex(
      h3('Thyrotropin-Releasing Hormone'),
      p(t('Thyrotropin-releasing hormone (TRH; pGlu-His-Pro-NH₂) is the simplest and best-characterised of the hypothalamic releasing hormones — a tripeptide produced by paraventricular nucleus neurons and widely distributed throughout the CNS (cerebral cortex, limbic system, brainstem, spinal cord). Its classical role is to stimulate TSH (thyrotropin) secretion from anterior pituitary thyrotrophs, driving thyroid gland T4/T3 synthesis and secretion.')),
      h3('Pituitary Signalling'),
      p(t('TRH binds to TRHR1 (Gαq-coupled GPCR) on thyrotrophs, activating phospholipase C → IP3 → intracellular calcium release and DAG → PKC. This triggers TSH granule exocytosis within seconds and upregulates TSH gene transcription. TRH simultaneously stimulates prolactin secretion (via lactotroph TRHR), explaining the elevated prolactin seen in hypothyroidism.')),
      h3('Extra-Pituitary CNS Effects'),
      p(t('TRH receptors are expressed throughout the CNS, where TRH functions as a neuromodulator independent of the pituitary-thyroid axis. These direct CNS effects include: analeptic activity (reversal of CNS depression from barbiturates, alcohol, opioids), antidepressant effects (via monoamine potentiation), and neuroprotection (reduced excitotoxic neuronal death). Intrathecal TRH activates spinal motor neurons.')),
      ul(
        'Hypothalamus: TSH → thyroid axis stimulation',
        'Brainstem: arousal promotion; antagonises CNS depressant effects',
        'Limbic system: antidepressant monoamine modulation',
        'Spinal cord: intrathecal TRH activates motor neurons (ALS research context)',
        'Autonomic: increases heart rate and blood pressure (sympathomimetic)',
      ),
    ),
    pharmacokinetics: lex(
      h3('Rapid Degradation'),
      p(t('TRH has a very short plasma half-life of 5–6 minutes, degraded by serum TRH-degrading ectoenzyme (TRH-DE/pyroglutamyl peptidase II) and other peptidases. Despite this, the short plasma half-life does not limit clinical use for the TRH stimulation test (IV bolus), as pituitary response is measured at 20 and 60 minutes after a single injection.')),
      h3('TRH Stimulation Test'),
      p(t('200–400 mcg IV TRH produces peak TSH at 20–30 minutes (normal: >5 mU/L rise; blunted or absent in primary hyperthyroidism or pituitary disease). This test was the standard diagnostic for thyroid and pituitary disease before ultrasensitive TSH assays; it is now rarely used clinically but remains important in research for probing the TRH-TSH axis.')),
      h3('Analogue Development'),
      ul(
        'Taltirelin (CG-3703): TRH analogue with 10× potency and longer half-life; approved in Japan for spinocerebellar degeneration',
        'Montirelin: TRH analogue with CNS-selective effects; investigated in depression',
        'CNS-directed delivery: intrathecal and intranasal TRH bypasses peripheral degradation',
        'TRH oral bioavailability: very low (<1%); intranasal or parenteral required',
      ),
    ),
    researchFindings: lex(
      h3('Analeptic Effects'),
      p(t('TRH\'s ability to reverse CNS depression (barbiturate coma, alcohol intoxication, opioid sedation) was discovered by Prange and colleagues in the 1970s and is reproducible and robust across animal models. The mechanism appears to involve potentiation of brainstem arousal systems and inhibition of dopamine-mediated sedation. This analeptic property has been explored in overdose settings, though short duration of action limits practical utility.')),
      h3('Amyotrophic Lateral Sclerosis'),
      p(t('Intrathecal TRH produces transient improvement in motor function in ALS patients — measured as improved muscle strength, grip force, and ALS Functional Rating Scale scores. The mechanism involves direct TRH receptor activation on anterior horn motor neurons. Though not disease-modifying, the symptomatic benefit drove development of taltirelin, now approved in Japan for this indication.')),
      h3('Antidepressant Research'),
      p(t('Intravenous TRH produces rapid antidepressant effects in bipolar and unipolar depressed patients within hours, predating ketamine research into rapid antidepressants by decades. The effect is transient (24–48 hours) and not sustained, but its existence confirms TRH as a genuine rapid-acting CNS antidepressant. Intranasal TRH is being studied for sustained delivery with repeated dosing.')),
      h3('Spinal Cord Injury'),
      ul(
        'Intrathecal TRH: improved motor scores and sensory levels in incomplete SCI patients',
        'Anti-excitotoxic: TRH reduces glutamate-induced motor neuron death in vitro',
        'Hypothermia antagonism: TRH reverses spinal cord ischaemia via metabolic activation',
        'Current status: ongoing research without definitive Phase 3 SCI trial',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Acute IV TRH Effects'),
      p(t('Intravenous TRH (200–400 mcg bolus) produces transient adverse effects within minutes: nausea (60%), urge to urinate (50%), flushing (40%), mild blood pressure elevation (30%), and brief tachycardia. These are dose-dependent, resolve within 10–30 minutes, and are related to direct cardiovascular and smooth muscle TRH receptor activation, not thyroid axis stimulation (which occurs too slowly to cause acute symptoms).')),
      h3('Prolonged or High-Dose Considerations'),
      ul(
        'Hyperthyroidism: excessive TSH stimulation with chronic or high-dose TRH; thyroid monitoring required',
        'Hyperprolactinaemia: prolactin elevation with chronic TRH; galactorrhoea possible',
        'Tachyarrhythmia: direct cardiac chronotropic effects at high doses',
        'Hypertension: sympathomimetic TRH CNS effects; monitor BP',
      ),
      h3('Intranasal TRH Research Safety'),
      p(t('Intranasal TRH (0.5–2 mg) in research volunteers produced mild nasal irritation and transient flushing without the acute GI and urinary effects of IV administration. TSH elevation was modest (2–3-fold), suggesting partial CNS delivery with limited systemic exposure. No serious adverse events have been reported in published intranasal TRH research, making this route potentially more tolerable for chronic studies.')),
    ),
  },

  // ─── KPV ─────────────────────────────────────────────────────
  'kpv': {
    mechanismOfAction: lex(
      h3('Alpha-MSH C-Terminal Tripeptide'),
      p(t('KPV (Lys-Pro-Val) is the C-terminal tripeptide of α-MSH, derived from POMC cleavage. While α-MSH activates MC1R/MC3R/MC4R, KPV exerts its primary anti-inflammatory effects through a partially distinct mechanism: it binds to MCRs (particularly MC1R) with lower affinity than full α-MSH but penetrates intracellularly — interacting directly with NF-κB signalling components and reducing nuclear translocation of p65 in immune cells and epithelial cells.')),
      h3('NF-κB Pathway Inhibition'),
      p(t('KPV\'s most characterised mechanism is inhibition of NF-κB — the master transcription factor for inflammatory cytokine gene expression. In intestinal epithelial cells, macrophages, and dendritic cells, KPV reduces IκB kinase (IKK) activity, preventing IκBα phosphorylation and degradation, thereby trapping the NF-κB p65/p50 dimer in the cytoplasm. The result is reduced transcription of IL-1β, IL-6, IL-8, TNF-α, and iNOS.')),
      h3('Epithelial Barrier Effects'),
      ul(
        'Tight junction upregulation: KPV increases occludin and ZO-1 expression in gut epithelium',
        'Intestinal permeability: reduced paracellular leak in inflamed epithelium',
        'Mucus layer: goblet cell preservation and mucin-2 production supported',
        'Anti-apoptotic: reduces epithelial cell apoptosis during inflammatory challenge',
        'Macrophage polarisation: promotes M2 (anti-inflammatory) macrophage phenotype',
      ),
    ),
    pharmacokinetics: lex(
      h3('Oral Bioavailability'),
      p(t('As a tripeptide, KPV has remarkable properties: it is relatively resistant to GI luminal peptidases (the Pro-Val bond resists most endopeptidases) and is absorbed intact through PepT1 on intestinal epithelial cells. Oral bioavailability in rodent studies is ~40–60%, substantially higher than most bioactive peptides. This makes oral delivery practical for GI applications without complex encapsulation.')),
      h3('Novel Delivery Systems'),
      p(t('Nanoparticle-encapsulated KPV (in hyaluronic acid or PLGA nanoparticles) has been developed for colitis research — oral nanoparticles increase delivery to inflamed colonic tissue through CD44 receptor-mediated uptake by activated macrophages and epithelial cells. This tissue-targeted delivery increases KPV colonic concentrations 10–20-fold compared to free KPV, reducing systemic absorption.')),
      h3('Research Dosing'),
      ul(
        'Oral free KPV (rodent colitis): 0.5–5 mg/kg/day in drinking water or gavage',
        'Oral nanoparticle KPV: 0.05–0.5 mg/kg/day (10× dose reduction vs. free KPV)',
        'Topical (skin inflammation): 0.01–0.1% in cream formulation',
        'SC injection research: 100–500 mcg/kg/day; broader anti-inflammatory effect',
      ),
    ),
    researchFindings: lex(
      h3('Inflammatory Bowel Disease'),
      p(t('Liang et al. and Bhatt et al. demonstrated that oral KPV (in nanoparticle formulation) significantly reduced colitis severity in DSS-induced and TNBS-induced mouse colitis models — equivalent to or exceeding the effect of standard-dose budesonide in inflammatory scoring, colon length, myeloperoxidase activity, and cytokine levels. The effect was colonic tissue-targeted, with minimal systemic exposure.')),
      h3('Skin Inflammation'),
      p(t('KPV applied topically reduced contact dermatitis, atopic dermatitis, and wound inflammation in mouse models. At 0.05% cream concentration, KPV reduced oedema, leukocyte infiltration, and cytokine levels (IL-4, IL-31, TNF-α) in allergen-challenged skin by 60–70% vs. vehicle. MC1R expression in skin keratinocytes and dermal macrophages mediates this local anti-inflammatory action.')),
      h3('Neuroprotection'),
      p(t('KPV and related α-MSH fragments show neuroprotective effects in CNS inflammation models. In neuroinflammatory models driven by LPS or IL-1β, KPV reduces microglial NF-κB activation and IL-6/TNF-α production, protecting dopaminergic neurons in substantia nigra models of Parkinson\'s disease. The small size of KPV facilitates CNS penetration compared to full α-MSH.')),
      h3('Wound Healing'),
      ul(
        'Keratinocyte migration: KPV accelerates re-epithelialisation in wound models',
        'Angiogenesis: MC1R on endothelial cells; moderate pro-angiogenic effect',
        'Infection context: anti-inflammatory without immunosuppressive bacterial-clearance deficit',
        'Diabetic wound model: improved closure rates vs. saline controls',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('KPV has an excellent preclinical safety profile. As a naturally occurring POMC-derived tripeptide fragment, immunogenicity is minimal. Chronic oral administration in rodents (90 days) has not produced organ toxicity, significant weight changes, or haematological abnormalities. The targeted anti-inflammatory mechanism (NF-κB suppression) without broad immunosuppression means infection risk is substantially lower than corticosteroid comparators.')),
      h3('Advantages over Corticosteroids'),
      ul(
        'No HPA axis suppression: KPV does not activate glucocorticoid receptors',
        'No bone density reduction: key limitation of chronic steroid use; absent with KPV',
        'No glucose dysregulation: MCR-mediated anti-inflammation does not affect insulin/glucagon',
        'Preserved pathogen clearance: innate immune pathogen response maintained',
      ),
      h3('Research Gaps'),
      p(t('No human clinical trials for KPV have been published despite substantial preclinical evidence. The transition from rodent colitis models to IBD patients faces the typical challenges of peptide-based GI therapeutics. Safety in immunocompromised patients is uncharacterised. Long-term effects on the melanocortin system with chronic oral dosing require investigation. KPV remains a research compound with significant therapeutic potential but no regulatory status.')),
    ),
  },

  // ─── Gonadorelin ─────────────────────────────────────────────
  'gonadorelin': {
    mechanismOfAction: lex(
      h3('Endogenous GnRH Agonist'),
      p(t('Gonadorelin is the synthetic form of gonadotropin-releasing hormone (GnRH; also called LHRH), a 10-amino acid hypothalamic decapeptide (pGlu-His-Trp-Ser-Tyr-Gly-Leu-Arg-Pro-Gly-NH₂) produced by GnRH neurons of the preoptic area and arcuate nucleus. Gonadorelin acts on GnRH receptor (GnRHR) — a Gαq-coupled GPCR on anterior pituitary gonadotrophs — to stimulate LH and FSH synthesis and secretion in a frequency-dependent manner.')),
      h3('Pulsatile vs. Continuous Signalling'),
      p(t('The critical pharmacological principle of GnRH physiology is frequency dependence: pulsatile GnRH (1 pulse per 60–120 minutes) stimulates LH and FSH release, maintaining HPG axis activation. Continuous GnRH or long-acting agonists (leuprolide, triptorelin) produce paradoxical GnRHR downregulation and desensitisation within 1–2 weeks — suppressing LH/FSH to castrate levels. This paradox is exploited therapeutically to achieve medical androgen/oestrogen deprivation in prostate cancer, endometriosis, and uterine fibroids.')),
      h3('HPG Axis Stimulation'),
      ul(
        'Pulsatile gonadorelin → LH pulse → Leydig cell testosterone / follicular oestradiol',
        'FSH → Sertoli cell spermatogenesis support / follicular development',
        'LH surge (follicular phase) → ovulation trigger in females',
        'Restoration of HPG axis in hypothalamic amenorrhoea and hypogonadotrophic hypogonadism',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Half-life'),
      p(t('Gonadorelin has a biexponential plasma decay with t½α ~2–4 minutes and t½β ~10–40 minutes. This rapid clearance necessitates either IV bolus (for stimulation test) or pulsatile SC/IV delivery via programmable infusion pump (for therapeutic hypogonadotrophic hypogonadism treatment). Compared to synthetic GnRH superagonists (leuprolide t½ ~3 hours, triptorelin depot ~24 hours), gonadorelin\'s short half-life paradoxically preserves pulsatile receptor activation.')),
      h3('Clinical Applications'),
      p(t('Gonadorelin acetate (Factrel, Lutrepulse) is approved for: (1) LH/FSH stimulation test — 100 mcg IV bolus with LH/FSH measurement at 30 and 60 minutes; (2) ovulation induction in hypothalamic amenorrhoea — pulsatile delivery at 2.5–20 mcg per pulse every 60–120 minutes via portable pump. In males, gonadorelin pulsatile therapy restores spermatogenesis in hypogonadotrophic hypogonadism where exogenous testosterone would suppress.')),
      h3('Dosing Protocols'),
      ul(
        'Stimulation test: 100 mcg IV bolus; LH >10 mIU/mL at 30 min = intact pituitary',
        'Ovulation induction (female): 5–20 mcg/pulse SC every 90 min via pump',
        'Male hypogonadotrophic hypogonadism: 25 nmol/pulse IV every 2 hours',
        'Cycle length: until ovulation (female) or 6+ months for spermatogenesis (male)',
      ),
    ),
    researchFindings: lex(
      h3('Hypogonadotrophic Hypogonadism'),
      p(t('The landmark Crowley et al. studies (1985–1990) established that pulsatile GnRH delivery restores full gonadal function — spermatogenesis and fertility — in men with idiopathic hypogonadotrophic hypogonadism (IHH, including Kallmann syndrome). Unlike hCG/hMG (gonadotropin replacement), gonadorelin pump therapy stimulates endogenous LH and FSH simultaneously, better replicating physiological HPG axis function.')),
      h3('Ovulation Induction'),
      p(t('Pulsatile gonadorelin produces excellent ovulation induction rates (90%) in hypothalamic amenorrhoea (low BMI, excessive exercise, stress) compared to exogenous gonadotropins, with lower risk of ovarian hyperstimulation syndrome (OHSS). Randomised trials show comparable live birth rates to gonadotropin injection protocols in WHO Group I anovulation.')),
      h3('Testosterone Use and Hypogonadism in Men'),
      p(t('In TRT (testosterone replacement therapy) research, co-administration of gonadorelin (every other day SC) is investigated to prevent testicular atrophy and preserve spermatogenesis during exogenous testosterone use — which suppresses LH/FSH and halts endogenous testosterone and sperm production. Small studies and clinical practice suggest gonadorelin maintains testicular volume and sperm count, though formal RCT data are limited.')),
      h3('Diagnostic Value'),
      ul(
        'GnRH stimulation test: distinguishes hypothalamic vs. pituitary hypogonadism',
        'Puberty assessment: normal LH response confirms intact pituitary in delayed puberty',
        'Central precocious puberty diagnosis: exaggerated LH response to gonadorelin',
        'Post-TRT recovery assessment: gonadorelin test predicts HPG axis recovery timeline',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Acute IV Administration'),
      p(t('IV gonadorelin (stimulation test dose) is very well tolerated. The most common adverse effects are mild and transient: flushing (10%), nausea (5%), light-headedness (5%). Headache and abdominal discomfort are occasionally reported. No serious adverse events have been documented in the extensive diagnostic stimulation test literature.')),
      h3('Pulsatile Pump Therapy'),
      ul(
        'Injection site reactions: common with long-term SC pump; site rotation essential',
        'Multiple pregnancy: FSH-driven multi-follicular development risk; monitoring required',
        'OHSS: rare with physiological GnRH pulsing vs. gonadotropin injections',
        'Infection: SC cannula site infection risk with prolonged pump use',
      ),
      h3('TRT Co-administration Safety'),
      p(t('No formal safety data from RCTs for gonadorelin co-use with TRT. Clinically, the risk of exogenous testosterone on LH suppression is well understood — gonadorelin provides pulsatile LH stimulation to Leydig cells, maintaining intratesticular testosterone (which is 50–100× serum levels) required for spermatogenesis. Anti-doping implications: both testosterone and gonadorelin are on WADA prohibited lists.')),
    ),
  },

  // ─── Urocortin-1 ─────────────────────────────────────────────
  'urocortin-1': {
    mechanismOfAction: lex(
      h3('CRF Family Peptide — CRF1R and CRF2R Agonist'),
      p(t('Urocortin-1 (UCN1) is a 40-amino acid peptide belonging to the corticotropin-releasing factor (CRF) family, with ~45% sequence homology to CRF. It is expressed in the Edinger-Westphal nucleus (midbrain), lateral hypothalamus, dorsal root ganglia, and cardiac myocytes. Unlike CRF (which has high CRF1R affinity), UCN1 binds both CRF1R and CRF2R with equally high affinity (Kd ~0.2–1.0 nM), giving it a distinct pharmacological profile.')),
      h3('Cardiac Cytoprotection via CRF2R'),
      p(t('CRF2R is the dominant receptor in cardiac myocytes, vascular smooth muscle, and skeletal muscle. UCN1 binding to cardiac CRF2R activates adenylyl cyclase (Gαs) → cAMP → PKA, which: (1) produces positive inotropy and chronotropy (increased contractility and heart rate); (2) activates PKA-mediated phosphorylation of survival kinase pathways (PI3K/Akt, ERK1/2 MPAK); (3) inhibits MPTP (mitochondrial permeability transition pore) opening — preventing ischaemia-reperfusion injury-induced cardiomyocyte death.')),
      h3('Dual Receptor Physiology'),
      ul(
        'CRF1R (hypothalamus, pituitary, brain): stress axis activation → ACTH → cortisol',
        'CRF2R (heart, skeletal muscle, GI): cardioprotection, vasodilation, feeding suppression',
        'UCN1 activates both: net cardiovascular effect is vasodilation + inotropy',
        'Amygdala CRF1R/CRF2R: opposing anxiety-promoting (CRF1R) and stress-recovery (CRF2R) effects',
        'GI: CRF2R in colonic myenteric plexus delays gastric emptying under stress',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Kinetics'),
      p(t('UCN1 has a plasma half-life of approximately 30–40 minutes after IV administration in humans, substantially longer than CRF (~5 minutes). It is degraded by serum endopeptidases but the 40-residue helical structure confers moderate resistance. The longer half-life makes UCN1 practical for IV infusion studies without continuous peptide degradation complicating kinetics.')),
      h3('Human Infusion Studies'),
      p(t('Phase 1 and 2 clinical studies have administered UCN1 via IV infusion at 7.5–150 ng/kg/min. Haemodynamic effects (vasodilation, increased cardiac output) are dose-proportional and reproducible. The cardiovascular effect lasts 30–60 minutes after infusion cessation, consistent with cardiac receptor occupancy kinetics rather than extended plasma half-life.')),
      h3('Clinical Research Dosing'),
      ul(
        'Phase 1 cardiac safety: 7.5–150 ng/kg/min IV; dose-proportional vasodilation',
        'Phase 2 heart failure: 7.5–75 ng/kg/min for 60–120 minute infusions',
        'SC research: less studied; cardiac effects via systemic distribution',
        'Rat cardiac I-R injury: 0.1–1 mcg/kg IV bolus before ischaemia',
      ),
    ),
    researchFindings: lex(
      h3('Human Heart Failure Studies'),
      p(t('Rademaker et al. (2002–2005) conducted IV UCN1 infusion studies in stable heart failure patients, demonstrating dose-dependent increases in cardiac output (18–35%), reduced systemic vascular resistance (20–40%), and maintained or reduced filling pressures — a haemodynamic profile superior to dobutamine in some parameters with less tachycardia. UCN1 produced natriuresis and diuresis through renal vasodilation.')),
      h3('Cardioprotection — I-R Injury'),
      p(t('Pre-ischaemic UCN1 treatment in rodent and pig models reduces myocardial infarct size by 40–60% in ischaemia-reperfusion injury paradigms. The protective mechanism requires CRF2R and involves PKC-ε/δ, PI3K/Akt (RISK pathway), and SAFE pathway (JAK-STAT3) activation. Post-ischaemic UCN1 (at reperfusion) reduces infarct size by 25–35%, supporting its potential use in primary PCI settings.')),
      h3('Stress and Anxiety Research'),
      p(t('The dual CRF1R/CRF2R pharmacology of UCN1 produces complex behavioural effects. In the amygdala, where CRF1R mediates anxiety and CRF2R mediates stress recovery, UCN1 activates both — initial anxiogenic (CRF1R) followed by anxiolytic recovery (CRF2R) phases. CRF2R-selective analogues (stressin1, antisauvagine) are being developed to dissociate the cardioprotective and anti-stress effects from HPA axis activation.')),
      h3('Chronic Cardiac Benefit'),
      ul(
        'UCN1 reduces cardiac hypertrophy in pressure-overload models',
        'Anti-fibrotic: TGF-β1 reduction in cardiac fibroblasts',
        'Mitochondrial protection: MPTP inhibition preserving mitochondrial membrane potential',
        'CRF2R cardiac knockout: exacerbated I-R injury — confirms endogenous UCN1 protection',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Haemodynamic Adverse Effects'),
      p(t('The primary adverse effects of UCN1 infusion are haemodynamic and predictable from its vasodilatory mechanism: hypotension (blood pressure reduction of 10–25 mmHg at mid-range doses), tachycardia (reflex and direct CRF1R-mediated), and flushing. These effects are dose-proportional, reversible within 30–60 minutes of infusion cessation, and manageable with dose titration.')),
      h3('HPA Axis Activation'),
      ul(
        'CRF1R agonism: ACTH and cortisol elevation with high-dose UCN1',
        'Chronic treatment risk: HPA hyperstimulation, Cushing-like effects theoretical at supraphysiological doses',
        'CRF2R-selective analogues avoid this: primary development goal',
        'Adrenal monitoring: cortisol measurement recommended in prolonged infusion research',
      ),
      h3('Tolerability in Human Studies'),
      p(t('Published Phase 2 trials report UCN1 infusion was well tolerated in heart failure patients. The most common adverse events were flushing (35%), headache (20%), and mild nausea (15%). No serious cardiac arrhythmias, significant HPA activation at clinical doses, or organ toxicity was observed. Larger and longer-duration studies are needed to fully characterise the safety profile for chronic heart failure applications.')),
    ),
  },

  // ─── ACTH ─────────────────────────────────────────────────────
  'acth': {
    mechanismOfAction: lex(
      h3('Adrenocorticotropic Hormone'),
      p(t('Adrenocorticotropic hormone (ACTH; corticotropin) is a 39-amino acid peptide cleaved from the POMC precursor by PC1 in anterior pituitary corticotroph cells. The biological activity resides in the N-terminal 13-18 residues; full-length ACTH(1-39) is the main circulating form. ACTH acts on MC2R (the ACTH-specific melanocortin receptor) on adrenocortical cells — the only MC receptor with exclusive ACTH affinity — and on MC1R/MC3R/MC4R with the full α-MSH-containing ACTH sequence.')),
      h3('MC2R Adrenocortical Signalling'),
      p(t('MC2R on zona fasciculata and zona reticularis adrenocortical cells is coupled to Gαs → adenylyl cyclase → cAMP → PKA. PKA phosphorylates StAR (steroidogenic acute regulatory protein), which transports cholesterol into mitochondrial inner membranes — the rate-limiting step in adrenal steroidogenesis. The full steroidogenic cascade is then activated: cholesterol → pregnenolone → progesterone → 17-OH-progesterone → cortisol (fasciculata) and DHEA/DHEAS (reticularis).')),
      h3('Melanocortin and Immunological Effects'),
      ul(
        'MC2R (zona fasciculata/reticularis): cortisol and DHEA/DHEAS synthesis',
        'MC1R (skin): pigmentation — explains hyperpigmentation in Addison\'s (excess ACTH)',
        'MC3R/MC4R (brain): ACTH fragments have direct CNS effects (learning, attention)',
        'Anti-inflammatory: ACTH stimulates cortisol → broad immunosuppression',
        'Zona glomerulosa: MC2R stimulates aldosterone only weakly; primarily angiotensin II regulated',
      ),
    ),
    pharmacokinetics: lex(
      h3('ACTH Plasma Kinetics'),
      p(t('Endogenous ACTH circulates at picomolar concentrations with a plasma half-life of approximately 10–25 minutes, degraded primarily in the liver and kidneys. Concentrations follow a pronounced circadian rhythm — peak between 06:00–08:00 (coinciding with cortisol awakening response) and nadir at midnight. ACTH diurnal rhythm is driven by suprachiasmatic nucleus-regulated CRH pulsatility from the paraventricular nucleus.')),
      h3('Therapeutic Formulations'),
      p(t('Synthetic ACTH(1-24) (cosyntropin/tetracosactide) contains the full biological activity of ACTH in the first 24 residues. The ACTH stimulation test (250 mcg cosyntropin IV or IM) is the gold standard for adrenal insufficiency diagnosis — peak cortisol <18 mcg/dL at 30 or 60 minutes confirms adrenal insufficiency. Repository corticotropin injection (Acthar Gel; purified porcine ACTH 1-39 in gelatin) is approved for multiple sclerosis relapses, infantile spasms, and select autoimmune disorders.')),
      h3('Clinical Dosing'),
      ul(
        'Stimulation test: cosyntropin 250 mcg IV or IM bolus; cortisol at 0, 30, 60 min',
        'Low-dose stimulation test: 1 mcg cosyntropin IV (more sensitive for secondary AI)',
        'Acthar Gel: 40–80 units IM/SC daily for infantile spasms; 80–120 units for MS relapse',
        'Plasma ACTH measurement: EDTA tube, immediate cold centrifuge; fragile analyte',
      ),
    ),
    researchFindings: lex(
      h3('Infantile Spasms'),
      p(t('ACTH is the most effective treatment for infantile spasms (West syndrome) — a severe early-onset epileptic encephalopathy. The UKISS, ISMISS, and ICISS trials demonstrated ACTH gel produces spasm cessation in 65–75% of patients within 2 weeks, superior to vigabatrin in some subgroups. The mechanism is not solely cortisol-mediated: ACTH fragments have direct anticonvulsant effects via MC3R/MC4R in developing brain circuits.')),
      h3('Multiple Sclerosis'),
      p(t('Acthar Gel (repository corticotropin) is FDA-approved for MS relapses, though modern guidelines favour IV methylprednisolone for its superior efficacy and convenience. The proposed advantage of ACTH over steroids: it stimulates endogenous steroid production (with full steroid complexity including DHEA, pregnenolone, and mineralocorticoids) rather than providing a single synthetic corticosteroid, potentially producing a more physiological anti-inflammatory response. Evidence base is substantially older than modern MS standards.')),
      h3('HPA Axis Research'),
      p(t('ACTH research has established the fundamental understanding of stress physiology, adrenal function, and circadian neuroendocrinology. ACTH measurement is essential for differentiating primary (Addison\'s disease; elevated ACTH) from secondary/tertiary (pituitary/hypothalamic; low-normal ACTH) adrenal insufficiency, directing appropriate replacement therapy and underlying diagnosis investigation.')),
      h3('Melanocortin and Cognition'),
      ul(
        'ACTH(4-10) fragment: attention and memory enhancement in human studies (1970s literature)',
        'ACTH(4-9) analogues: ORG-2766 investigated for neuroprotection in clinical trials',
        'Semax contains ACTH(4-7) as its functional core — see Semax entry',
        'MC4R in PVN: ACTH CNS effects on autonomic and appetite regulation',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Stimulation Test Safety'),
      p(t('Cosyntropin stimulation testing is extremely safe. The 250 mcg IV or IM dose has an excellent safety record with no significant adverse events in thousands of reported test administrations. Hypersensitivity reactions are rare (<1/10,000). The low-dose test (1 mcg) has an even more benign profile as it is below the HPA activation threshold required to cause meaningful cortisol elevation in normal subjects.')),
      h3('Acthar Gel Adverse Effects'),
      ul(
        'Corticosteroid class effects: sodium retention, hypertension, hyperglycaemia, immune suppression',
        'HPA axis suppression: with prolonged courses; gradual taper required on discontinuation',
        'Hypokalaemia: aldosterone-mediated with sustained ACTH courses',
        'Psychiatric: mood changes, insomnia common with ACTH courses (cortisol-mediated)',
        'Infantile spasms: irritability, hypertension, electrolyte disturbance require monitoring',
      ),
      h3('Differences from Direct Corticosteroids'),
      p(t('ACTH therapy produces a broader steroidogenic profile than synthetic corticosteroids — including DHEA, DHEAS, pregnenolone, and neurosteroids alongside cortisol. Some clinicians hypothesise this broader steroid milieu produces different (potentially more favourable) immunomodulatory effects than prednisolone or methylprednisolone alone. The evidence for clinical superiority in most indications is insufficient; ACTH\'s primary modern role remains diagnostic.')),
    ),
  },

  // ─── Bradykinin ───────────────────────────────────────────────
  'bradykinin': {
    mechanismOfAction: lex(
      h3('Kinin System Nonapeptide'),
      p(t('Bradykinin (BK; Arg-Pro-Pro-Gly-Phe-Ser-Pro-Phe-Arg) is a 9-amino acid vasoactive peptide generated from high-molecular-weight kininogen (HMWK) by the serine protease plasma kallikrein, and from low-molecular-weight kininogen (LMWK) by tissue kallikrein. It acts on two GPCRs: B2 receptor (constitutively expressed; Gαq/Gαi; mediates acute BK effects) and B1 receptor (inducible by inflammation; Gαq/Gαi; mediates chronic inflammatory signalling).')),
      h3('B2 Receptor Signalling'),
      p(t('BK/B2R coupling activates phospholipase C → IP3/DAG → PKC and intracellular calcium → eNOS activation (NO production) and phospholipase A2 → arachidonic acid → prostacyclin/prostaglandin E2. These mediators produce: vasodilation, increased vascular permeability, pain sensitisation (via nociceptor TRPV1 and TRPA1 activation), and bronchoconstriction. BK is rapidly degraded (half-life <30 seconds) by ACE (which converts BK to inactive BK(1-7)) and neutral endopeptidase.')),
      h3('Physiological and Pathological Roles'),
      ul(
        'Vasodilation: NO and PGI2 release from endothelium; reduces blood pressure',
        'Vascular permeability: oedema formation at sites of tissue injury',
        'Pain: TRPV1/TRPA1 sensitisation on nociceptors; hyperalgesia and allodynia',
        'Bronchoconstriction: smooth muscle B2R contraction',
        'ACE inhibitor cough: BK accumulation (from reduced ACE degradation) triggers airway B2R',
        'Hereditary angioedema: unregulated BK generation causes subcutaneous/mucosal oedema',
      ),
    ),
    pharmacokinetics: lex(
      h3('Rapid Degradation'),
      p(t('Bradykinin has an exceptionally short plasma half-life of 15–30 seconds, primarily degraded by ACE (kininase II) in the pulmonary circulation on a single pass, plus carboxypeptidase N (kininase I) and neutral endopeptidase. This extreme brevity limits systemic BK to local paracrine signalling; pharmacological BK effects require either local injection, ACE inhibition (preventing degradation), or B1/B2R agonist use.')),
      h3('Des-Arg9 Bradykinin — B1 Receptor Agonist'),
      p(t('ACE and carboxypeptidases cleave the C-terminal arginine of BK, producing des-Arg9-BK — a selective B1R agonist (not B2R). B1R is upregulated 10–100-fold in inflamed tissues (by IL-1β, TNF-α, LPS), making des-Arg9-BK the dominant kinin in chronic inflammation. This differential degradation product pharmacology has important implications for separating acute (B2R) from chronic (B1R) inflammatory signalling.')),
      h3('Research Applications'),
      ul(
        'IV BK infusion (vascular research): 0.1–10 mcg/min; vasodilation measurement',
        'Intra-arterial BK: 0.3–3 mcg; forearm vasodilation in pharmacodynamic studies',
        'Icatibant (B2R antagonist): therapeutic reference for hereditary angioedema',
        'ACE inhibitor + BK: co-administration reveals BK contribution to ACEi cardioprotection',
      ),
    ),
    researchFindings: lex(
      h3('Cardiovascular Cardioprotection'),
      p(t('Bradykinin-B2R signalling on cardiomyocytes activates PKC-ε and PI3K/Akt pathways, promoting ischaemic preconditioning. The cardioprotective benefit of ACE inhibitors (beyond blood pressure reduction) is partially mediated by BK accumulation: co-administration of the B2R antagonist icatibant blocks 30–40% of ACE inhibitor cardioprotection in experimental myocardial infarction, establishing BK as an important ACEi effector.')),
      h3('Hereditary Angioedema'),
      p(t('Type 1 and 2 hereditary angioedema (HAE) result from C1-inhibitor deficiency, causing unregulated plasma kallikrein activity and BK overproduction. The pathological role of BK in HAE was confirmed by: (1) icatibant (B2R antagonist) dramatically reducing attack severity and duration; (2) kallikrein inhibition (ecallantide) preventing BK generation; (3) C1-inhibitor replacement. BK-mediated HAE has established BK as a dominant mediator of non-histaminergic angioedema.')),
      h3('ACE Inhibitor Mechanisms'),
      p(t('The standard teaching that ACE inhibitors work by blocking Ang II formation is incomplete — ACE also degrades bradykinin. Accumulated BK contributes to: the antihypertensive effect (via eNOS/NO vasodilation), cardioprotection (via preconditioning kinase cascades), renal protection (via glomerular BK2R), and the ACEi cough adverse effect (via airway B2R). This dual mechanism distinguishes ACEis pharmacologically from ARBs (which block Ang II only).')),
      h3('Pain Research'),
      ul(
        'B2R sensitises TRPV1 on nociceptors via phospholipase C → PKC phosphorylation',
        'BK directly activates TRPA1 (cold pain receptor) via IP3-independent mechanism',
        'B1R in chronic pain: inducible receptor maintains thermal and mechanical hyperalgesia',
        'B1R knockout: markedly reduced chronic inflammatory pain; B2R knockout: reduced acute pain',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Exogenous BK Administration Effects'),
      p(t('Intravenous bradykinin infusion at research doses produces dose-proportional: hypotension (vasodilation via NO/PGI2), tachycardia (reflex), pain at IV site (local B2R activation of nociceptors), and bronchoconstriction in susceptible individuals. These effects are terminated within 1–2 minutes by ACE degradation. IV BK is a controlled research procedure requiring haemodynamic monitoring.')),
      h3('ACE Inhibitor BK Accumulation Adverse Effects'),
      ul(
        'Dry persistent cough: airway BK accumulation in 10–20% of ACEi users; class effect',
        'Angioedema: rare (0.1–0.7% of ACEi users) but potentially life-threatening tongue/laryngeal oedema',
        'ACEi cough: more common in Asian populations (pharmacogenomic BK pathway variation)',
        'Switching to ARB: eliminates BK-mediated effects (cough, angioedema) as ARBs do not inhibit BK degradation',
      ),
      h3('B1R Antagonists as Therapeutic Target'),
      p(t('The inducible nature of B1R (expressed only in inflamed tissue) makes it an attractive therapeutic target for selective anti-inflammatory analgesia without systemic effects. B1R antagonists (SSR240612, BI 113823) show efficacy in chronic pain, diabetic nephropathy, and cardiometabolic disease models with good tolerability. Clinical development is ongoing with some Phase 2 trial results.')),
    ),
  },
}
