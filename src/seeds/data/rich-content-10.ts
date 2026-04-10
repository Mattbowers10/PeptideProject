/**
 * Rich content batch 10 — 10 peptides
 * ace-031, argireline, cortagen, cortexin, defensin-alpha,
 * elafin, leuphasyl, magainin-2, melanotan-i, p21
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

export const richContent10 = {

  // ─── ACE-031 ─────────────────────────────────────────────────
  'ace-031': {
    mechanismOfAction: lex(
      h3('Activin Receptor Type IIB Fusion Protein'),
      p(t('ACE-031 is a recombinant fusion protein consisting of the extracellular domain of activin receptor type IIB (ActRIIB) linked to the Fc region of human IgG1. It functions as a ligand trap — binding and neutralising multiple members of the TGF-β superfamily that negatively regulate muscle mass: myostatin (GDF-8), activin A, GDF-11, and to a lesser extent BMP-9. By capturing these circulating inhibitory ligands, ACE-031 prevents their engagement with ActRIIB on muscle fibres and satellite cells.')),
      h3('Myostatin-ActRIIB Pathway Blockade'),
      p(t('Myostatin (GDF-8) is the dominant negative regulator of skeletal muscle mass. Under normal physiology, myostatin binds ActRIIB on muscle fibres and satellite cells, activating Smad2/3 → transcription of atrophy genes (atrogin-1, MuRF1) and suppression of IGF-1/PI3K/Akt/mTOR anabolic signalling. ACE-031 traps myostatin before receptor binding, releasing the braking signal — allowing unopposed mTOR-driven protein synthesis and satellite cell proliferation.')),
      h3('Broad Ligand Trapping vs. Selective Myostatin Inhibition'),
      ul(
        'Myostatin: primary muscle inhibitory ligand — 50–100 ng/mL circulating; ACE-031 EC50 ~0.2 nM',
        'Activin A: also trapped; bone loss concern (activin A promotes osteoclastogenesis)',
        'GDF-11: trapped; some evidence for cardiac and CNS regulatory roles',
        'Net anabolic effect: larger lean mass increase than selective myostatin inhibition alone',
        'Bone density: paradoxically reduced in clinical trials due to activin A trapping (pro-osteoclast)',
      ),
    ),
    pharmacokinetics: lex(
      h3('IgG Fc Fusion Kinetics'),
      p(t('As an IgG1 Fc fusion protein, ACE-031 has the extended plasma half-life characteristic of antibody-based therapeutics. The Fc region engages neonatal Fc receptor (FcRn) for recycling, conferring an apparent half-life of approximately 10–14 days in humans. This enables SC dosing every 1–3 months in clinical studies.')),
      h3('Bioavailability and Distribution'),
      p(t('SC bioavailability of IgG Fc fusions is typically 50–80% (lymphatic absorption). Distribution is restricted to plasma and interstitial fluid (Vd ~10–12 L) given the large molecular weight (~100 kDa for the dimer). Steady-state concentrations are reached after 4–5 half-lives (6–8 weeks). Elimination is via Fc-mediated lysosomal degradation in endothelial cells after FcRn saturation.')),
      h3('Clinical Trial Dosing'),
      ul(
        'DMD/BMD children (TOPAZ trial): 0.1–3 mg/kg SC monthly',
        'Healthy postmenopausal women (Phase 2): 1–3 mg/kg SC single and multiple doses',
        'Safety monitoring: epistaxis, telangiectasias, and bone density required',
        'Dose-proportional lean mass increase with single SC dose over 4 weeks',
      ),
    ),
    researchFindings: lex(
      h3('Preclinical Muscle Wasting Data'),
      p(t('ACE-031 in mdx mice (Duchenne muscular dystrophy model) and aged rodents produced 15–30% increases in lean muscle mass and grip strength over 4–8 weeks. Studies in obese mice showed preferential lean mass gain without fat mass change, suggesting the muscle anabolic effect is independent of adipose tissue. Muscle fibre cross-sectional area increased across fast- and slow-twitch fibre types.')),
      h3('Healthy Volunteer Phase 2 Trial'),
      p(t('A single-dose escalation study in 48 healthy postmenopausal women (Sherman et al.) demonstrated dose-proportional lean mass increases of 1.5–3.3% at 4 weeks (vs. 0.05% placebo) with single SC doses of 1–3 mg/kg. Bone-specific alkaline phosphatase decreased (suggesting bone formation suppression), consistent with activin A trapping effects. Epistaxis and telangiectasias (possibly from BMP-9 or VEGF modulation) were noted as adverse events.')),
      h3('Duchenne Muscular Dystrophy — TOPAZ Trial'),
      p(t('The TOPAZ Phase 2 trial in boys with DMD enrolled 50 patients receiving ACE-031 0.1–3 mg/kg monthly vs. placebo. Lean mass increased significantly across doses; however, the trial was discontinued after reports of nose bleeds, gum bleeding, and skin telangiectasias — attributed to broad ligand trapping (particularly BMP-9, which maintains vascular homeostasis). The programme was paused to reassess the benefit-risk profile.')),
      h3('Alternative Approaches'),
      ul(
        'Bimagrumab (BYM338): anti-ActRIIB antibody; less broad ligand trapping; ongoing Phase 3',
        'Apitegromab (SRK-015): myostatin-selective propeptide inhibitor; less off-target',
        'Trevogrumab: anti-myostatin antibody; Phase 2 in sarcopenia and cachexia',
        'Domagrozumab: anti-myostatin antibody; DMD Phase 3 ongoing',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Clinical Safety Signals — TOPAZ Discontinuation'),
      p(t('The most significant safety finding from ACE-031 clinical development was the dose-dependent occurrence of telangiectasias (dilated skin capillaries), gingival bleeding, and epistaxis — attributed to neutralisation of BMP-9 (a major vascular quiescence signal) and possibly VEGF pathway disruption. These events were dose-dependent and resolved after discontinuation but led to pausing of the paediatric DMD programme.')),
      h3('Adverse Effects'),
      ul(
        'Telangiectasias: cutaneous vascular dilation; dose-dependent; reversible',
        'Epistaxis and gingival bleeding: mucosal haemorrhage; mechanism: BMP-9 neutralisation',
        'Bone mineral density: reduced over 3 months due to activin A trapping (anti-osteoblastic)',
        'Injection site reactions: common for SC biologics; mild',
      ),
      h3('Lessons for Muscle Therapeutics'),
      p(t('ACE-031 illustrates the importance of ligand specificity in muscle biology. Broad ActRIIB ligand trapping amplifies the anabolic effect but captures essential vascular (BMP-9) and bone (activin A) signals. Next-generation approaches target myostatin specifically (apitegromab, trevogrumab) or use biased ActRIIB antibodies that spare BMP-9 binding to address the vascular safety concern while preserving the anti-atrophy benefit.')),
    ),
  },

  // ─── Argireline ──────────────────────────────────────────────
  'argireline': {
    mechanismOfAction: lex(
      h3('SNAP-25 Mimetic Botulinum-Like Peptide'),
      p(t('Argireline (Acetyl hexapeptide-3; Ac-Glu-Glu-Met-Gln-Arg-Arg-NH₂) is a synthetic hexapeptide derived from the N-terminal sequence of SNAP-25 (synaptosomal-associated protein 25 kDa) — a component of the SNARE complex required for neurotransmitter vesicle fusion at neuromuscular junctions. The peptide is designed to competitively inhibit SNARE complex formation, mimicking the functional endpoint (though not the molecular mechanism) of botulinum neurotoxin type A, but without actual toxin activity.')),
      h3('SNARE Complex Competition'),
      p(t('Acetylcholine (ACh) release from motor neuron terminals requires formation of the SNARE complex: synaptobrevin (v-SNARE) on the vesicle binds syntaxin-1 and SNAP-25 (t-SNAREs) on the presynaptic membrane. Argireline\'s hexapeptide sequence mimics the N-terminal SNAP-25 domain, competing with endogenous SNAP-25 for syntaxin-1 binding, partially inhibiting SNARE complex assembly and reducing ACh exocytosis — resulting in reduced facial muscle contraction amplitude.')),
      h3('Topical Application Mechanism'),
      p(t('As a topical cosmetic active, argireline penetrates the stratum corneum and epidermis to reach subepidermal nerve endings and neuromuscular junctions. The reduction in ACh release transiently reduces the amplitude of repeated facial muscle contractions (expression lines) without paralysing muscles or producing the systemic effects of botulinum toxin. Effects are reversible and dose-dependent on formulation concentration and frequency of application.')),
      ul(
        'SNARE complex inhibition → reduced ACh vesicle release → reduced NMJ signal',
        'Facial expression muscle relaxation: mimics BoNT-A endpoint by different mechanism',
        'No toxin activity: zero lethal activity; not a toxin derivative',
        'Additional collagen stimulation: some in vitro data suggest fibroblast collagen-I upregulation',
      ),
    ),
    pharmacokinetics: lex(
      h3('Topical Penetration'),
      p(t('Argireline penetration through the skin is the critical PK parameter for its cosmetic efficacy. In vitro skin penetration studies using Franz cell diffusion with human ex vivo skin show limited penetration of free argireline through the stratum corneum (~0.5–2% of applied dose), with enhancement by formulation strategies: liposomal encapsulation (3–5× enhancement), nanoparticle delivery, or penetration enhancers (dimethyl isosorbide, propylene glycol). The fraction reaching neuromuscular junctions is the functional dose.')),
      h3('Stability'),
      p(t('Argireline is stable in aqueous formulations at pH 4.5–6.5 and temperatures below 30°C. It is susceptible to oxidation of the methionine residue (to methionine sulfoxide) at higher pH and in the presence of oxidants, which reduces receptor binding affinity. Antioxidant co-formulation (vitamin C, vitamin E, ferulic acid) is commonly included to preserve argireline potency in cosmetic products.')),
      h3('Cosmetic Formulation'),
      ul(
        'Commercial concentration: 5–10% in serum formulations (e.g., Leuphasyl at 4%, Argireline at 10%)',
        'Onset of visible effect: 2–4 weeks of twice-daily application',
        'Combination: argireline + acetyl octapeptide-3 (SNAP-8) for enhanced NMJ inhibition',
        'Delivery enhancement: liposomal argireline shows superior wrinkle reduction vs. free peptide',
      ),
    ),
    researchFindings: lex(
      h3('Clinical Wrinkle Reduction Studies'),
      p(t('Blanes-Mira et al. (2002) conducted the foundational study demonstrating argireline reduces acetylcholine release in mouse phrenic nerve-hemidiaphragm preparations, confirming the SNARE-competitive mechanism. Clinical topical studies showed 10% argireline cream applied twice daily for 30 days reduced wrinkle depth (SELS profilometry) by 17–27% vs. baseline, with statistically significant reduction in forehead and periocular wrinkle areas.')),
      h3('Comparison to Botulinum Toxin'),
      p(t('Argireline does not replicate the full clinical effect of botulinum toxin A — the molecular approach (SNAP-25 competitive inhibition) produces partial SNARE inhibition, whereas BoNT-A cleaves SNAP-25 proteolytically and irreversibly. Clinical wrinkle reduction with argireline (17–27%) is substantially less than BoNT-A (60–80%). However, the topical reversibility, no injection requirement, and safety profile position argireline as a maintenance treatment between BoNT-A sessions or for patients avoiding injections.')),
      h3('Combination Peptide Studies'),
      p(t('Research combining argireline with leuphasyl (enkephalin receptor agonist) and SNAP-8 (longer SNAP-25 fragment with greater SNARE inhibition) showed additive wrinkle-reducing effects. The rationale: argireline inhibits at the SNARE complex level; leuphasyl reduces ACh release upstream (via δ-opioid receptor inhibition of vesicle trafficking); SNAP-8 enhances SNARE competition. Combination formulations achieved 35–40% wrinkle depth reduction in 60-day studies.')),
      h3('Ex Vivo NMJ Studies'),
      ul(
        'SNARE complex formation: 30–50% inhibition at 10 µM argireline in vitro',
        'ACh release: 20–30% reduction in mouse phrenic nerve preparations at 10 µM',
        'Cell toxicity: zero cytotoxicity at cosmetically relevant concentrations (up to 100 µM)',
        'Collagen synthesis: 15–20% upregulation in dermal fibroblast cultures at 10 ppm',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Excellent Safety Record'),
      p(t('Argireline has an outstanding safety profile with no serious adverse events reported in published clinical trials or significant pharmacovigilance signals despite widespread cosmetic use for over 20 years. The topical application route limits systemic absorption to negligible quantities, and the competitive (non-covalent) SNARE inhibition mechanism is fully reversible — there is no analogue of the botulinum toxin\'s irreversible protease activity.')),
      h3('Adverse Effects'),
      ul(
        'Local skin reactions: mild redness or irritation in <5% of users, typically transient',
        'Ptosis: theoretical risk with periocular application and excessive formulation concentration; not reported in clinical literature',
        'Allergic contact dermatitis: rare case reports; patch testing advisable in sensitive individuals',
        'No systemic effects: confirmed by lack of plasma argireline detection at cosmetic doses',
      ),
      h3('Regulatory Status'),
      p(t('Argireline is approved and widely used as a cosmetic ingredient (INCI: Acetyl Hexapeptide-3) under EU Cosmetics Regulation, FDA OTC cosmetics regulations, and equivalent frameworks globally. It is not classified as a drug and does not require prescription. No banned substance classifications in any jurisdiction. The INCI database lists it as a safe cosmetic ingredient with no restrictions on use concentration (manufacturer recommends maximum 10% in leave-on products).')),
    ),
  },

  // ─── Cortagen ────────────────────────────────────────────────
  'cortagen': {
    mechanismOfAction: lex(
      h3('Pineal Tetrapeptide Bioregulator'),
      p(t('Cortagen (Ala-Glu-Asp-Pro) is a synthetic tetrapeptide developed at the St. Petersburg Institute of Bioregulation by Khavinson et al. as a tissue-specific bioregulator targeting the cerebral cortex. Like epithalon (which targets the pineal gland) and vilon (which targets the thymus), cortagen belongs to the class of short peptide bioregulators proposed to restore gene expression patterns in ageing or damaged tissues by interacting directly with chromatin regulatory elements.')),
      h3('DNA-Peptide Interaction Model'),
      p(t('The proposed mechanism of cortagen and related tetrapeptide bioregulators involves direct interaction with specific DNA promoter sequences and histone proteins, acting as epigenetic modulators. The Ala-Glu-Asp-Pro sequence is proposed to interact with regulatory elements of cortical neuron-specific genes, restoring expression of neuroprotective and neuroplasticity genes that decline with age or neurological insult. This model is supported by chromatin immunoprecipitation studies demonstrating peptide-DNA co-precipitation.')),
      h3('Neurological Effects'),
      ul(
        'Neuronal gene expression: restoration of age-related decline in Bcl-2, BDNF, and synaptic plasticity gene expression',
        'Antioxidant: cortagen upregulates SOD and catalase in cortical neurons',
        'Neuroprotection: reduced glutamate excitotoxicity-induced neuronal death in culture',
        'Cognitive function: improved performance in rodent spatial memory tasks with cortagen treatment',
        'Cerebrovascular: some evidence for improved microcirculation in cortical vasculature',
      ),
    ),
    pharmacokinetics: lex(
      h3('Administration and Stability'),
      p(t('Cortagen is administered parenterally (SC or IM injection) or intranasally in research protocols. As a tetrapeptide, its oral bioavailability is low (<5%) due to rapid GI degradation. SC bioavailability is estimated at 70–85% in rodent models. Plasma half-life is approximately 15–30 minutes, with downstream transcriptional effects persisting for days to weeks — consistent with the proposed epigenetic mechanism.')),
      h3('Intranasal Delivery'),
      p(t('Intranasal cortagen is favoured for CNS applications given the direct olfactory nerve pathway to cortical targets. Animal studies demonstrate cortexin and similar tetrapeptides accumulate in cortical tissue at higher concentrations after intranasal delivery vs. equivalent SC doses. This delivery advantage underpins nasal spray formulations developed by Russian research groups for neurological applications.')),
      h3('Research Protocols'),
      ul(
        'SC injection: 0.1–0.5 mg/kg daily for 10-day courses, twice yearly (standard Russian protocol)',
        'Intranasal: 5–10 µg per nostril daily for 10 days',
        'Combination with epithalon: some protocols use cortagen + epithalon for combined cortical + pineal targeting',
        'Long-term: 10-day courses repeated every 3–6 months for neuroprotection',
      ),
    ),
    researchFindings: lex(
      h3('Khavinson Neurological Studies'),
      p(t('Khavinson et al. published series of studies (2000–2015) on cortagen in aged rats with cognitive impairment. Cortagen treatment (10-day courses, twice yearly for 2 years) improved spatial memory (Morris water maze), reduced markers of cortical neurodegeneration (reduced lipofuscin accumulation, preserved synaptic density), and normalised age-related decline in cortical BDNF and NGF expression.')),
      h3('Stroke and Ischaemia'),
      p(t('In rodent ischaemic stroke models (middle cerebral artery occlusion), cortagen administration beginning 1–24 hours after ischaemia reduced infarct volume by 20–35% and improved neurological function scores. The proposed mechanism: cortagen upregulates anti-apoptotic Bcl-2 family members in the ischaemic penumbra, protecting neurons from delayed death. These findings parallel the neuroprotection data for cortexin (a related cortical peptide complex).')),
      h3('Anti-ageing Research'),
      p(t('In the broader Khavinson anti-ageing peptide programme, cortagen given to aged animals (alongside epithalon, thymalin, and vilon) produced multimodal longevity effects: improved cognitive performance on cross-sectional testing at ages 18–24 months (corresponding to geriatric human equivalent), reduced cortical neuronal loss, and normalisation of several age-related biomarkers. Independent replication of these findings by non-Russian groups remains limited.')),
      h3('Neuroprotection Mechanisms'),
      ul(
        'Bcl-2/Bcl-xL upregulation: anti-apoptotic protection in cortical neurons',
        'SOD/catalase induction: reduced ROS-mediated neuronal damage',
        'BDNF/NGF support: sustained neurotrophic factor availability',
        'Glutamate excitotoxicity: reduced NMDA receptor-mediated calcium influx in cortegen-treated neurons',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('Cortagen has not been studied in formal Western clinical trials with independent safety monitoring. Available safety data derive from Russian clinical research reports, which consistently describe cortagen as well tolerated with no serious adverse events at research doses. As a natural tetrapeptide sequence, immunogenicity is expected to be minimal. Animal toxicology shows no significant organ toxicity at 10–100× research doses.')),
      h3('Known Adverse Effects'),
      ul(
        'Injection site reactions: mild erythema and pain at SC injection site',
        'No systemic adverse effects documented in published literature',
        'No endocrine disruption: unlike pituitary or thyroid-targeting peptides',
        'No carcinogenic signal in standard rodent safety studies',
      ),
      h3('Research Context'),
      p(t('Cortagen exists in a similar regulatory and evidentiary position as other Russian peptide bioregulators: published primarily in Russian-language journals, based on institutional research at the Khavinson institutes, and without independent large-scale randomised controlled trials. The mechanistic model (direct DNA/histone interaction) is plausible but requires independent structural validation. It is available as a research compound, not approved as a drug in any major Western regulatory jurisdiction.')),
    ),
  },

  // ─── Cortexin ────────────────────────────────────────────────
  'cortexin': {
    mechanismOfAction: lex(
      h3('Polypeptide Cortical Neuroprotectant'),
      p(t('Cortexin is a polypeptide complex extracted from the cerebral cortex of cattle (bovine cortex) by acid extraction and lyophilisation, containing a mixture of small peptides (predominantly 1–10 kDa), amino acids, nucleic acid derivatives, and trace elements. Unlike the synthetic tetrapeptide bioregulators (cortagen, vilon), cortexin is an organ-specific extract containing multiple bioactive peptide sequences that collectively exert neuroprotective, nootropic, and neurotrophic effects in the mammalian brain.')),
      h3('Neurotrophic and Anti-excitotoxic Mechanisms'),
      p(t('Cortexin\'s polypeptide components modulate multiple neuroprotective pathways: (1) BDNF/NGF-like activity — stimulating TrkB and TrkA signalling in surviving neurons, promoting dendritic arborisation and synaptic maintenance; (2) GABA-A receptor modulation — reducing excessive glutamatergic excitation that drives excitotoxic neuronal death; (3) antioxidant enzyme induction (SOD, catalase, glutathione peroxidase) — reducing ROS-mediated neuronal membrane damage after ischaemia or trauma.')),
      h3('Metabolic Neuroprotection'),
      ul(
        'Oxidative phosphorylation: cortexin peptides support mitochondrial ETC complex activity in hypoxic neurons',
        'Glucose metabolism: improved neuronal glucose utilisation efficiency under ischaemic conditions',
        'Apoptosis inhibition: Bcl-2 upregulation; caspase-3 suppression in ischaemic neurons',
        'Neurotransmitter balance: GABA/glutamate ratio normalisation after brain injury',
        'Neuroplasticity: synaptic protein (PSD-95, synapsin) expression support during recovery',
      ),
    ),
    pharmacokinetics: lex(
      h3('IM Administration'),
      p(t('Cortexin is administered exclusively by intramuscular injection (10 mg/1 mL reconstituted) — the polypeptide mixture would be degraded by GI enzymes if taken orally, and IV administration risks immune reactions from the heterogeneous extract composition. Following IM injection, the peptide mixture is absorbed into systemic circulation within 30–60 minutes, partially penetrates the blood-brain barrier (small peptide fractions), and produces peak CNS effects at 1–3 hours.')),
      h3('Blood-Brain Barrier Penetration'),
      p(t('Small peptides within cortexin (particularly fragments <1 kDa) penetrate the BBB via carrier-mediated transport (oligopeptide transporters) and passive diffusion. Larger peptides may access the brain via circumventricular organs lacking a tight BBB. Despite the heterogeneous composition, consistent neurotrophic effects are demonstrated in ischaemic brain models where BBB permeability is increased, facilitating more extensive cortexin peptide entry into damaged tissue.')),
      h3('Clinical Dosing (Russia/Eastern Europe)'),
      ul(
        'Standard course: 10 mg IM daily for 10 days (one ampoule/day)',
        'Paediatric: 0.5 mg/kg IM daily × 10 days (max 10 mg/day)',
        'Stroke recovery: 10 mg IM daily × 10 days; repeat course at 3 months',
        'Long-term prophylaxis: 2 courses per year in patients with TIA or cognitive impairment',
      ),
    ),
    researchFindings: lex(
      h3('Ischaemic Stroke Clinical Studies'),
      p(t('Multiple Russian clinical trials (Skvorsova et al., Gromova et al.) demonstrate that cortexin 10 mg IM daily for 10 days initiated within 6 hours of ischaemic stroke onset significantly improved NIHSS scores at 10 days and modified Rankin Scale at 30 days vs. placebo. One meta-analysis of 8 trials (n=920 patients) showed cortexin reduced 30-day NIHSS score by mean 2.1 points more than control — a clinically meaningful difference. These results have driven registered drug status in Russia, Ukraine, and several post-Soviet countries.')),
      h3('Traumatic Brain Injury'),
      p(t('Cortexin is included in TBI treatment protocols in Russia (Class III evidence). Studies in moderate-to-severe TBI patients show accelerated consciousness recovery, reduced duration of post-traumatic encephalopathy, and improved 6-month GOS-E scores with cortexin vs. standard care. The anti-excitotoxic and antioxidant mechanisms are most relevant in acute TBI where secondary injury cascades drive delayed neuronal loss.')),
      h3('Paediatric Encephalopathy and Autism'),
      p(t('A notable application of cortexin is in paediatric perinatal encephalopathy, neonatal hypoxia, and autism spectrum disorder-related cognitive symptoms. Russian paediatric studies report improved EEG biomarkers (reduced epileptiform activity), language development improvements, and reduced hyperactivity with 10-day cortexin courses in children. These findings require independent replication with modern placebo-controlled trial designs.')),
      h3('Cognitive Function in Ageing'),
      ul(
        'Age-associated cognitive decline: improved attention, processing speed, and memory in MCI patients',
        'Dyscirculatory encephalopathy: reduced headache, improved cognitive testing in cerebrovascular disease',
        'Depression comorbidity: reduced depressive symptoms in post-stroke depression with cortexin',
        'EEG normalisation: reduced slow-wave power excess characteristic of cerebrovascular disease',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Tolerability'),
      p(t('Cortexin has an extensive clinical safety record from decades of use in Russia. Across published clinical trials involving thousands of patients, the adverse effect rate is very low. The most common adverse events are injection site pain and mild transient dizziness (2–5%). No serious adverse events (organ toxicity, anaphylaxis, carcinogenicity) have been documented in published literature.')),
      h3('Adverse Effects'),
      ul(
        'Injection site pain: IM injection discomfort; standard for IM biologics',
        'Mild dizziness: transient, first days of treatment; adapts quickly',
        'Headache: reported in <5% of patients; usually first-day transient',
        'Allergic reactions: rare; cross-reactivity with bovine protein possible in bovine allergen sensitised patients',
      ),
      h3('BSE/Prion Concerns'),
      p(t('As a bovine cortex-derived product, cortexin raises theoretical concerns regarding transmissible spongiform encephalopathy (BSE/prion). Manufacturers use cattle from certified BSE-free herds (primarily from Russia and neighbouring countries with low BSE incidence) and employ acid extraction processes that theoretically inactivate prion proteins. No BSE transmission case has been attributed to cortexin use, and it is produced from bovine cortex (not spinal cord or brain stem — the highest-risk tissues). However, the prion concern is a theoretical safety consideration that has limited Western regulatory acceptance.')),
    ),
  },

  // ─── Defensin Alpha ──────────────────────────────────────────
  'defensin-alpha': {
    mechanismOfAction: lex(
      h3('Cationic Antimicrobial Peptides'),
      p(t('Alpha-defensins are a family of small (29–35 amino acid) cationic, arginine-rich peptides with three conserved intramolecular disulfide bonds forming a β-sheet-rich structure. In humans, the primary alpha-defensins are HNP-1 through HNP-4 (human neutrophil peptides, stored at high concentrations in azurophilic granules of neutrophils) and HD-5 and HD-6 (human defensins 5 and 6, produced by Paneth cells in intestinal crypts). They represent critical components of innate immune defence.')),
      h3('Membrane Disruption Mechanism'),
      p(t('Alpha-defensins kill bacteria, fungi, and enveloped viruses by targeting the negatively charged membranes of these organisms, while sparing mammalian cells (which have zwitterionic phospholipid membranes with cholesterol stabilisation). The proposed mechanisms include: (1) pore formation — oligomeric defensin complexes insert into bacterial membranes, creating ion channels that collapse membrane potential; (2) carpet mechanism — defensins coat and solubilise the membrane in a detergent-like manner; (3) inhibition of cell wall synthesis — targeting lipid II in Gram-positive bacteria.')),
      h3('Immunomodulatory Functions'),
      ul(
        'Chemotaxis: defensins are chemoattractants for dendritic cells, T-cells, and monocytes (CCR6 ligands)',
        'Adjuvant activity: enhance adaptive immune responses by promoting DC maturation',
        'Viral neutralisation: HNP-1 blocks HIV gp120-CD4 interaction; HNP-1 inhibits HSV entry',
        'Wound healing: alpha-defensins promote keratinocyte migration and angiogenesis',
        'LPS sequestration: cationic defensins bind and neutralise endotoxin',
        'NET formation: HNPs are co-released with neutrophil extracellular traps',
      ),
    ),
    pharmacokinetics: lex(
      h3('Endogenous Concentrations'),
      p(t('HNP-1 through HNP-4 are released at sites of infection at concentrations of 1–10 mg/mL locally — far exceeding their antimicrobial MIC (minimum inhibitory concentration) against susceptible pathogens. Plasma concentrations during systemic infection can reach 10–100 µg/mL (normally <0.1 µg/mL). HD-5 and HD-6 are secreted luminally from Paneth cells into intestinal crypts at concentrations reaching 1–10 mg/mL locally, far exceeding bactericidal levels.')),
      h3('Recombinant Defensin Therapeutics'),
      p(t('Recombinant alpha-defensins are being developed as topical antimicrobials (HNP-1, HD-5), systemic agents for resistant infections (modified defensins with reduced susceptibility to salt inhibition — a major limitation of native HNPs), and adjuvants for vaccination. Stability challenges include: salt (physiological NaCl concentrations inhibit HNP antimicrobial activity), protease susceptibility (defensins can be cleaved by bacterial proteases), and formulation instability in aqueous solutions.')),
      h3('Topical and Research Dosing'),
      ul(
        'Topical antimicrobial (experimental): 10–100 µg/mL cream or gel',
        'Recombinant HD-5 (intestinal colonisation): 1–10 µg intraluminal in animal models',
        'Defensin-adjuvant vaccines: 5–50 µg defensin per dose in experimental vaccine formulations',
        'Salt inhibition: NaCl at physiological concentrations (150 mM) reduces HNP activity 4–8×',
      ),
    ),
    researchFindings: lex(
      h3('Intestinal Host Defence'),
      p(t('Paneth cell HD-5 and HD-6 are critical regulators of the intestinal microbiome composition. HD-5 creates a sterile zone in intestinal crypts, prevents bacteria from accessing epithelial stem cells, and selectively kills pathogens while sparing commensals. HD-5 deficiency in mice leads to dysbiosis and increased susceptibility to Salmonella and other enteropathogens. Crohn\'s disease is associated with reduced Paneth cell defensin expression — a potential pathogenic mechanism.')),
      h3('HIV and Antiviral Activity'),
      p(t('HNP-1, HNP-2, and HNP-3 inhibit HIV-1 replication in cell culture by multiple mechanisms: blocking CCR5 co-receptor (by interfering with gp120-CCR5 binding), inhibiting HIV reverse transcriptase, and blocking viral particle budding. Individuals with high genital tract defensin concentrations show reduced HIV acquisition in epidemiological studies. These findings motivated development of defensin-based topical microbicides for HIV prevention.')),
      h3('Cancer — Defensins as Tumour Suppressors'),
      p(t('Alpha-defensins are downregulated in colorectal, lung, and breast cancers. In colorectal cancer, reduced HD-5 expression correlates with increased tumour aggressiveness and microbiome dysbiosis (reduced diversity, increased Fusobacterium nucleatum). HNP-1 has direct pro-apoptotic effects on cancer cells in vitro via mitochondrial membrane disruption. Defensin-based cancer peptide therapeutics are in early exploratory stages.')),
      h3('Cystic Fibrosis'),
      ul(
        'CF mucus: high salt concentration inactivates airway defensins → bacterial lung colonisation',
        'Salt concentration correction with ENaC inhibitors may restore airway defensin activity',
        'Aerosolised synthetic defensins: in vitro active against Pseudomonas aeruginosa at CF-relevant conditions',
        'HNP-1 resistance in CF pathogens: Pseudomonas resistance mechanisms include OprH upregulation',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Cytotoxicity Concerns'),
      p(t('At concentrations far above their antimicrobial MIC, alpha-defensins exhibit cytotoxicity against mammalian cells — including red blood cell haemolysis and epithelial cell disruption. This narrow therapeutic index (antimicrobial/cytotoxic ratio = 3–10×) limits systemic use of native HNPs. Engineering approaches (selective membrane targeting, reduced haemolytic variants, cyclic or retro-inverso configurations) aim to improve the therapeutic index for systemic applications.')),
      h3('Topical Safety'),
      ul(
        'Topical HNPs: no systemic absorption at antimicrobial doses; safe for local application',
        'Mild local irritation: cationic peptide membrane interaction causes mild erythema at high concentrations',
        'No sensitisation reported: defensins are endogenous; immunogenicity minimal',
        'Topical defensin-adjuvant interaction: enhancing local immune responses with topical application generally beneficial',
      ),
      h3('Inflammatory Activation Concern'),
      p(t('Alpha-defensins are pro-inflammatory at high concentrations — activating mast cells, promoting DC maturation, and inducing cytokine release. In context of excessive release during severe sepsis or systemic inflammation, HNPs may contribute to collateral tissue damage. This dual role (antimicrobial benefit vs. inflammatory amplification at high concentrations) is a key consideration in defensin-based therapeutics design — local delivery strategies (topical, intraluminal) minimise systemic inflammatory exposure.')),
    ),
  },

  // ─── Elafin ──────────────────────────────────────────────────
  'elafin': {
    mechanismOfAction: lex(
      h3('Serine Protease Inhibitor and Antimicrobial Peptide'),
      p(t('Elafin (also known as skin-derived antileukoprotease, SKALP, or peptide inhibitor of leucocyte elastase, PILE) is a 9.9 kDa cysteine-rich secretory peptide produced by epithelial cells (lung, skin, gastrointestinal tract) and immune cells (macrophages, neutrophils) in response to inflammatory stimuli. Elafin belongs to the Whey Acidic Protein (WAP) domain family and functions as an endogenous serine protease inhibitor — a counterbalance to the destructive protease activity that characterises excessive inflammation.')),
      h3('Dual Functional Domains'),
      p(t('Elafin has two distinct functional domains: (1) the WAP domain — a four-disulfide core domain that inhibits neutrophil elastase and proteinase-3 with high potency (Ki ~0.1 nM) by forming a reversible tight-binding complex with the protease active site; (2) a cationic N-terminal domain — which has antimicrobial activity (direct membrane disruption) against Gram-positive bacteria (S. aureus, S. pneumoniae) and Candida albicans, independent of protease inhibition.')),
      h3('Immunomodulatory Properties'),
      ul(
        'NF-κB inhibition: elafin binds to IκBα, stabilising it and preventing NF-κB nuclear translocation',
        'LPS signalling: reduced TLR4 signal transduction in macrophages with elafin',
        'T-cell modulation: elafin reduces DC-driven Th1 polarisation in inflammatory contexts',
        'Transglutaminase crosslinking: elafin is crosslinked to ECM components by TGase 2 for sustained activity at inflammatory sites',
        'Elastase inhibition: protects ECM proteins (elastin, fibronectin) from excessive neutrophil elastase degradation during inflammation',
      ),
    ),
    pharmacokinetics: lex(
      h3('Endogenous Production'),
      p(t('Elafin is expressed at low baseline levels in skin and lung, dramatically upregulated (10–100×) by TNF-α, IL-1β, IL-17, and bacterial products. In healthy lung lavage fluid, elafin is present at ~1–5 ng/mL; in ARDS or severe pneumonia, levels rise to 100–1000 ng/mL. Circulating plasma elafin is also elevated in systemic inflammatory conditions (sepsis, IBD flare, acute pancreatitis).')),
      h3('Recombinant Elafin Therapeutic Research'),
      p(t('Recombinant human elafin (rh-elafin) and elafin-producing genetically modified Lactobacillus acidophilus (for intestinal delivery) have been developed as research therapeutics. Recombinant elafin delivered by inhalation (nebulisation) or intrabronchially achieves effective concentrations in the lung. IV rh-elafin has been studied in cardiac surgery for ischaemia-reperfusion lung injury prevention.')),
      h3('Research Dosing'),
      ul(
        'Inhalation: nebulised elafin 5–20 mg twice daily in lung inflammatory disease models',
        'IV cardiac surgery (animal): 1–5 mg/kg IV perioperative; lung protection endpoint',
        'Lactobacillus-elafin (intestinal): 5×10⁹ CFU/day in IBD models',
        'Topical skin (research): 0.01–0.1% in psoriasis model applications',
      ),
    ),
    researchFindings: lex(
      h3('ARDS and Lung Protection'),
      p(t('In models of acute respiratory distress syndrome (ARDS) and ventilator-induced lung injury, elafin administration reduces neutrophil elastase-mediated alveolar damage, preserves alveolo-capillary barrier integrity, and reduces inflammatory cytokine concentrations in BAL fluid. Murine LPS-ARDS studies demonstrated elafin reduced alveolar protein leak by 40% and histological lung injury score by 50% vs. vehicle. IV rh-elafin was safe in Phase 1 cardiac surgery patients.')),
      h3('IBD Research — Lactobacillus-Elafin'),
      p(t('Motta et al. (2012, Science Translational Medicine) demonstrated that genetically modified Lactobacillus lactis secreting elafin significantly reduced colitis severity in two murine IBD models (DSS and TNBS colitis), with reduced colon NF-κB activity, reduced IL-1β and TNF-α, and preserved mucosal architecture. The Lactobacillus delivery system allows continuous local elafin production at intestinal epithelial surfaces — a biologically elegant approach.')),
      h3('Psoriasis and Skin Inflammation'),
      p(t('Elafin is highly expressed in psoriatic plaques where neutrophil elastase activity is elevated. Topical elafin in animal psoriasis models reduced plaque thickness, scaling, and immune cell infiltration. As an endogenous skin protein, elafin is well tolerated topically and is being explored as an adjunct to existing psoriasis therapies to reduce protease-mediated epidermal damage in plaque and pustular psoriasis variants.')),
      h3('Microbiome and Mucosal Immunity'),
      ul(
        'Antimicrobial: elafin active against S. aureus MIC ~5 µg/mL; important in infected skin barrier',
        'Microbiome shaping: elafin selectively inhibits pathobionts over commensal lactobacilli',
        'HIV: elafin reduces HIV-1 replication in cervicovaginal mucosa models',
        'Lung microbiome: elafin shapes respiratory microbiome by preferential inhibition of elastase-producing pathogens',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('Elafin is an endogenous protein present in healthy individuals — immunogenicity against recombinant elafin is expected to be minimal. IV rh-elafin in cardiac surgery patients (Phase 1) was well tolerated with no significant adverse events. Topical elafin in skin studies showed no systemic absorption or local sensitisation. The serine protease inhibitor mechanism is tissue-targeted to excess neutrophil elastase and does not broadly suppress immune function.')),
      h3('Theoretical Considerations'),
      ul(
        'Excess protease inhibition: over-suppression of elastase could impair bacterial killing by neutrophils',
        'At therapeutic concentrations: protease inhibition is proportional to elastase excess; physiological elastase for bacterial killing is largely unimpaired',
        'Dosing balance: local tissue delivery (inhaled, topical, intraluminal) preserves systemic neutrophil function',
        'Infection risk: no increased infection rate in animal or Phase 1 human studies',
      ),
      h3('Regulatory Status'),
      p(t('No recombinant elafin product has received regulatory approval. It remains an investigational compound in Phase 1–2 research contexts. The elafin-secreting Lactobacillus approach (biotherapeutic) is also in early development and faces regulatory classification challenges (live biotherapeutic vs. gene medicine). As an endogenous human protein, the safety framework for rh-elafin is more favourable than synthetic or non-human compounds.')),
    ),
  },

  // ─── Leuphasyl ───────────────────────────────────────────────
  'leuphasyl': {
    mechanismOfAction: lex(
      h3('Enkephalin-Receptor Modulating Cosmetic Pentapeptide'),
      p(t('Leuphasyl (Tyr-D-Ala-Gly-Phe-Leu; Acetyl pentapeptide-18 in INCI nomenclature) is a synthetic pentapeptide derived from the enkephalin family structure, designed to activate δ-opioid receptors (DOR) on presynaptic neurons at the neuromuscular junction. Its proposed mechanism complements that of argireline (SNARE inhibition) by acting upstream: leuphasyl-mediated DOR activation on motor neuron terminals inhibits voltage-gated calcium channel conductance, reducing the calcium influx that triggers acetylcholine vesicle exocytosis.')),
      h3('DOR Signalling at NMJ'),
      p(t('DOR is a Gαi-coupled GPCR expressed on presynaptic terminals of motor neurons. Upon activation: Gαi inhibits adenylyl cyclase (reduces cAMP-dependent vesicle fusion machinery); Gβγ directly inhibits N-type and P/Q-type voltage-gated calcium channels; GIRK channel activation hyperpolarises the terminal. Net result: reduced presynaptic calcium transient → reduced ACh vesicle fusion → reduced neuromuscular transmission → reduced facial muscle contraction amplitude.')),
      h3('Cosmetic Mechanism Summary'),
      ul(
        'DOR activation → Gβγ inhibition of VGCC → reduced presynaptic Ca²⁺',
        'Upstream of SNARE complex: reduces the trigger for SNARE-mediated ACh exocytosis',
        'Synergistic with argireline: dual-mechanism approach targets both ACh release trigger and SNARE machinery',
        'Tissue target: periocular and forehead neuromuscular junctions (expression lines)',
        'Reversible: no covalent modification; effects dependent on maintained topical application',
      ),
    ),
    pharmacokinetics: lex(
      h3('Topical Penetration'),
      p(t('Leuphasyl penetrates the stratum corneum as a small pentapeptide (~680 Da). Penetration is enhanced by its partial lipophilicity (D-Ala substitution and Phe residue provide hydrophobic character). Franz cell studies in human ex vivo skin demonstrate ~1.5–2% penetration of applied dose. Formulation strategies that enhance penetration include: peptide-lipid complexes, nanoparticle encapsulation, and ethanol/penetration enhancer co-solvents.')),
      h3('Stability'),
      p(t('The D-Ala substitution at position 2 (replacing the L-Ala of [Leu5]-enkephalin) confers resistance to aminopeptidases, substantially improving stability in skin formulations. Standard L-enkephalin is degraded within minutes in serum; D-Ala2 substitution extends half-life to hours. Formulation stability is maintained at pH 5.0–5.5 (skin-compatible) with standard antioxidant preservation.')),
      h3('Commercial Use'),
      ul(
        'INCI name: Acetyl pentapeptide-18',
        'Commercial concentration: 4% in cosmetic serums and creams',
        'Combination: leuphasyl 4% + argireline 4% studied as synergistic wrinkle treatment',
        'Onset: visible reduction in expression line depth after 4 weeks twice-daily application',
      ),
    ),
    researchFindings: lex(
      h3('NMJ Inhibition Studies'),
      p(t('In vitro electrophysiology studies demonstrate that leuphasyl at 10–100 µM reduces acetylcholine release from mouse phrenic nerve preparations by 15–25%, consistent with DOR-mediated presynaptic inhibition. This effect was blocked by the DOR antagonist naltrindole, confirming receptor-specific action. The mechanism complements argireline\'s SNARE inhibition, which reduces ACh release by 20–30% by a distinct pathway — supporting their combination use.')),
      h3('Clinical Wrinkle Studies'),
      p(t('A double-blind RCT of leuphasyl 4% cream (manufacturer-sponsored, 30 participants) applied twice daily for 4 weeks to forehead wrinkles showed significant reduction in wrinkle depth by profilometry (PRIMOS measurement): mean reduction of 11.4% vs. 3.1% vehicle. A combination cream (leuphasyl 4% + argireline 4%) produced a 24.6% reduction — demonstrating additive efficacy consistent with the complementary mechanisms.')),
      h3('Comparison with Botulinum Toxin'),
      p(t('The leuphasyl + argireline combination represents the strongest topical NMJ-inhibitory approach studied, with peak efficacy of 24–35% wrinkle depth reduction in published studies. BoNT-A clinical reduction at 1 month typically achieves 50–80% wrinkle depth reduction. The topical peptide combination is positioned for maintenance use between BoNT-A injections or as a daily adjunct to reduce injection frequency requirements.')),
      h3('Tolerability and Consumer Data'),
      ul(
        'Consumer acceptability: high; no injection required; suitable for injection-averse users',
        'Consistent cosmetic benefit across skin types in manufacturer studies',
        'No tolerance development: efficacy maintained with 12-week continuous use in product studies',
        'Perceived benefit: reduced "made-up" or fatigued appearance from reduced expression line depth',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('Leuphasyl has an excellent safety profile consistent with its cosmetic ingredient status. No serious adverse events have been reported in clinical trials or post-market surveillance. The topical application route and limited systemic absorption mean systemic DOR activation is negligible — no opioid-like CNS effects, respiratory depression, or addiction potential. Leuphasyl is approved as a cosmetic ingredient by the EU Cosmetics Regulation.')),
      h3('Adverse Effects'),
      ul(
        'Local skin reactions: mild redness or stinging in <3% of users; typically related to vehicle pH',
        'Sensitisation: no significant sensitisation in repeat insult patch tests',
        'No systemic effects: plasma DOR activation absent at topical cosmetic doses',
        'Combination with argireline: no additional adverse effects vs. either alone',
      ),
      h3('Regulatory and INCI Status'),
      p(t('INCI name: Acetyl Pentapeptide-18. Listed in the EU Cosmetics Ingredient Database. No concentration limit specified in EU regulations; manufacturer recommended maximum is 4–6%. FDA classifies it as a cosmetic ingredient without drug claims requiring clinical trials. No WADA prohibited list status. Widely marketed as a "botox alternative" — while this comparison is mechanistically informed, regulators in some jurisdictions have challenged marketing claims that directly compare effects to prescription botulinum toxin products.')),
    ),
  },

  // ─── Magainin-2 ──────────────────────────────────────────────
  'magainin': {
    mechanismOfAction: lex(
      h3('Frog Skin Antimicrobial Peptide'),
      p(t('Magainin-2 is a 23-amino acid cationic amphipathic antimicrobial peptide (GIGKFLHSAKKFGKAFVGEIMNS) originally isolated from the skin of the African clawed frog (Xenopus laevis) by Michael Zasloff in 1987. It belongs to the defensin-like AMP (antimicrobial peptide) superfamily. In solution, magainin-2 is disordered, but upon contact with negatively charged microbial membranes, it adopts an amphipathic α-helical conformation that enables membrane insertion.')),
      h3('Membrane Disruption Mechanism'),
      p(t('Magainin-2 disrupts bacterial and fungal cell membranes by the "toroidal pore" mechanism: multiple magainin-2 helices intercalate into the phospholipid bilayer in a parallel orientation, causing lipid head groups to curve inward — creating a water-filled toroidal pore ~2–5 nm in diameter. Ion efflux (K+, Na+) and entry of water through these pores collapse the membrane electrochemical gradient, leading to osmotic lysis. The selective targeting of anionic microbial membranes vs. zwitterionic mammalian membranes provides the basis for therapeutic selectivity.')),
      h3('Spectrum of Activity'),
      ul(
        'Gram-positive bacteria: S. aureus, MRSA, S. pneumoniae, E. faecalis (MIC 5–25 µg/mL)',
        'Gram-negative bacteria: E. coli, P. aeruginosa, K. pneumoniae (MIC 10–50 µg/mL)',
        'Fungi: C. albicans, C. neoformans (MIC 25–100 µg/mL)',
        'Protozoa: Leishmania, Plasmodium (antimalarial activity)',
        'Enveloped viruses: HSV, HIV (membrane disruption mechanism)',
        'No activity against mammalian cells: anionic membrane selectivity',
      ),
    ),
    pharmacokinetics: lex(
      h3('Topical Application'),
      p(t('Magainin-2\'s primary therapeutic route is topical — applied directly to wound surfaces, skin infections, or mucosal surfaces where local concentrations can greatly exceed systemic levels. Topical bioavailability in intact skin is low (<5%), but wound or mucosa penetration is substantially higher. The psoralen-magainin derivative MSI-78 (pexiganan) was developed as a topical cream for diabetic foot ulcer infections, with Phase 3 trials demonstrating efficacy comparable to ofloxacin.')),
      h3('Systemic Administration Challenges'),
      p(t('Systemic (IV) magainin use is limited by: (1) haemolytic activity at concentrations required for systemic antimicrobial effect; (2) rapid inactivation by serum proteins (albumin binding reduces antimicrobial activity); (3) clearance by plasma peptidases. Modified analogues with improved stability (cyclic magainins, D-amino acid substitutions, pegylated forms) are under development for systemic applications against resistant pathogens.')),
      h3('Pexiganan Development'),
      ul(
        'MSI-78 (pexiganan): magainin-2 analogue optimised for topical use; 22 amino acids',
        'Phase 3 (LIDO-1, LIDO-2): comparable to ofloxacin in diabetic foot ulcer infection',
        'FDA rejection (1999): non-inferiority design; requested active comparator superiority',
        'Re-developed by Dipexium: Locilex (pexiganan 0.8% cream) — approved Canada; US Phase 3 completed 2018',
      ),
    ),
    researchFindings: lex(
      h3('MRSA and Antibiotic Resistance'),
      p(t('Magainin-2 and its analogues are active against MRSA (methicillin-resistant Staphylococcus aureus) and other drug-resistant organisms by virtue of their membrane-disruptive mechanism — bacteria cannot develop resistance by single-gene mutation (as with antibiotic target modification) because the mechanism requires modifying the entire membrane lipid composition. This makes AMPs particularly attractive in the era of antimicrobial resistance.')),
      h3('Pexiganan Clinical Trials'),
      p(t('The Dipexium LIDO clinical trials (2013–2018) enrolled 524 patients with mildly infected diabetic foot ulcers. Pexiganan cream twice daily for 14 days produced non-inferior clinical cure rates (72%) vs. ofloxacin (74%). Microbiological eradication was similar across both arms. Crucially, no resistance development was observed in pexiganan-treated patients — supporting the AMP\'s resistance-resilient mechanism.')),
      h3('Anti-cancer Research'),
      p(t('Magainin-2 shows selective cytotoxicity against tumour cells — which express elevated phosphatidylserine on their outer membrane leaflet (normally restricted to the inner leaflet in healthy cells), resembling bacterial membranes. In vitro, magainin-2 kills breast, colon, and prostate cancer cells at 10–50 µg/mL without significant normal cell toxicity at equivalent concentrations. This tumour-selective membrane disruption is an active area of AMP cancer research.')),
      h3('Anti-biofilm Activity'),
      ul(
        'Magainin-2 disrupts preformed S. aureus and P. aeruginosa biofilms at 2–4× MIC',
        'Prevents biofilm formation on medical device surfaces when used as coating',
        'Synergistic with antibiotics against biofilm: magainin-2 permeabilises biofilm-embedded bacteria enabling antibiotic entry',
        'Wound care context: biofilm disruption in chronic wound infections is clinically relevant',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Topical Pexiganan Safety'),
      p(t('Topical pexiganan has an excellent safety profile from Phase 3 clinical trials. Local adverse effects (erythema, pruritus, burning) occurred in <5% of patients and were comparable to vehicle control. No systemic adverse effects were detected — consistent with minimal topical absorption. Haemolytic activity of native magainin-2 is not clinically relevant at topical therapeutic concentrations that produce local antimicrobial effects.')),
      h3('Systemic Use Limitations'),
      ul(
        'Haemolysis: RBC lysis at systemic concentrations; therapeutic index narrow for IV use',
        'Serum inactivation: albumin binding reduces antimicrobial activity 4–8× in serum',
        'Protease susceptibility: rapid degradation by serum proteases',
        'Nephrotoxicity: high-dose IV in animal studies causes proximal tubular injury',
      ),
      h3('Future Directions and Safety'),
      p(t('Modified magainin analogues with improved serum stability (D-amino acid substitutions), reduced haemolysis (net charge reduction strategies), and enhanced Gram-negative activity (lipid A-targeting modifications) are in development. These structural optimisations aim to expand the therapeutic window for systemic use against resistant nosocomial pathogens, where the mechanism-of-action resistance resilience is a compelling differentiator from conventional antibiotics.')),
    ),
  },

  // ─── Melanotan I ─────────────────────────────────────────────
  'melanotan-i': {
    mechanismOfAction: lex(
      h3('Selective MC1R Agonist'),
      p(t('Melanotan I (afamelanotide; Nle4-D-Phe7-α-MSH) is a 13-amino acid synthetic analogue of α-MSH with two key modifications: substitution of methionine at position 4 with norleucine (Nle4 — eliminates oxidation-sensitive sulfur) and replacement of L-phenylalanine at position 7 with D-phenylalanine (D-Phe7 — confers protease resistance and increased receptor affinity). These changes produce an analogue with ~100× greater potency and substantially extended half-life vs. native α-MSH, with selective MC1R activation profile.')),
      h3('MC1R Signalling — Melanin Synthesis'),
      p(t('MC1R on melanocytes is coupled to Gαs → adenylyl cyclase → cAMP → PKA. PKA phosphorylates CREB, which drives expression of MITF (microphthalmia-associated transcription factor) — the master regulator of melanocyte gene expression. MITF upregulates tyrosinase (rate-limiting enzyme in melanin synthesis), TYRP-1, TYRP-2, and DCT, shifting melanin synthesis from pheomelanin (yellow/red) to eumelanin (brown/black). Eumelanin provides substantially greater UV photoprotection.')),
      h3('Non-Pigmentary MC1R Effects'),
      ul(
        'DNA repair: MC1R → MITF → upregulation of nucleotide excision repair (NER) genes',
        'Anti-inflammatory: MC1R on keratinocytes and macrophages → NF-κB inhibition',
        'Melanocyte survival: MC1R activation promotes Bcl-2 and reduces UV-induced apoptosis',
        'Eumelanin shielding: eumelanin absorbs UV radiation 2× more efficiently than pheomelanin',
        'No MC4R activity: unlike melanotan II — no appetite suppression, no spontaneous erection',
      ),
    ),
    pharmacokinetics: lex(
      h3('Subcutaneous Implant (Afamelanotide)'),
      p(t('The approved form of melanotan I is afamelanotide as a biodegradable poly(lactic-co-glycolic acid) (PLGA) subcutaneous implant (Scenesse, 16 mg). The implant is inserted subdermal (upper abdomen) by a healthcare provider and releases afamelanotide continuously over 60 days. Peak plasma concentrations occur at 48–72 hours after implant insertion and decline gradually as the PLGA matrix is degraded. This delivery system eliminates the need for frequent self-injection and produces stable steady-state MC1R occupancy.')),
      h3('Free Peptide Kinetics'),
      p(t('In aqueous injection form (used in research), afamelanotide half-life is approximately 1–3 hours (substantially longer than native α-MSH\'s 30 minutes due to D-Phe7 protease resistance). Bioavailability SC is >85%. Peak skin melanin densitometric changes are visible within 2–3 days and persist for 2–4 weeks after a single injection course, reflecting the slow turnover of melanosome melanin deposits.')),
      h3('Research Dosing'),
      ul(
        'Afamelanotide implant (EPP approved use): 16 mg PLGA implant every 60 days',
        'Research SC injection: 0.5–1 mg daily for 5–10 days (tanning research protocols)',
        'Photoprotection trials: 16 mg implant 60 days before summer UV exposure season',
        'Skin cancer prevention trials: 16 mg every 2 months during high-UV seasons',
      ),
    ),
    researchFindings: lex(
      h3('Erythropoietic Protoporphyria'),
      p(t('Afamelanotide received EU (2014) and FDA (2019) approval for erythropoietic protoporphyria (EPP). Pivotal trials (Langendonk et al., 2015, NEJM) demonstrated that afamelanotide implant increased pain-free sun exposure from a median of 69 minutes to 369 minutes over 6 months vs. placebo — a 5× increase. Patients reported dramatically improved quality of life through reduced EPP-related pain avoidance behaviour.')),
      h3('Photoprotection in High-Risk Populations'),
      p(t('Clinical trials are ongoing in xeroderma pigmentosum (XP) — a DNA repair disorder where UV exposure causes extreme photosensitivity and near-inevitable skin cancer. In XP patients and healthy volunteers, afamelanotide demonstrated: increased UV minimal erythema dose (MED), reduced sunburn cell formation, and upregulated NER gene expression. A Phase 3 trial for skin cancer prevention in organ transplant recipients (highest skin cancer risk group) is in progress.')),
      h3('Variegate Porphyria and Polymorphous Light Eruption'),
      p(t('Afamelanotide is under investigation for variegate porphyria (another photosensitivity disorder) and polymorphous light eruption (PMLE) — the most common photodermatosis affecting 10–15% of the population in Northern Europe. Phase 2 PMLE data showed afamelanotide significantly reduced PMLE lesion development and itch scores during UV exposure challenge compared to placebo.')),
      h3('Skin Cancer Prevention'),
      ul(
        'Eumelanin induces: higher eumelanin:pheomelanin ratio → reduced UV-induced DNA damage',
        'NER upregulation: MITF-driven DNA repair capacity enhancement',
        'Organ transplant recipients Phase 3: evaluating squamous cell carcinoma reduction',
        'Actinic keratosis: pilot data show reduced AK lesion count with afamelanotide courses',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Approved Safety Profile'),
      p(t('The afamelanotide implant has an established safety profile from Phase 3 trials and post-approval experience. Most adverse events are mild and consistent with pharmacodynamic skin effects. Nausea (25%), fatigue (15%), and hyperpigmentation (expected; managed by informing patients) are the most common. The lack of MC4R activity eliminates the erectile, appetite, and cardiovascular adverse effects seen with melanotan II.')),
      h3('Adverse Effects'),
      ul(
        'Nausea: 25%; peaks at 48–72 hours post-implant; resolves spontaneously',
        'Hyperpigmentation: generalised darkening; expected pharmacodynamic effect',
        'Naevus darkening: melanocytic naevi darken; dermatological surveillance recommended',
        'Implant site reactions: bruising, erythema at insertion site; resolve within 1 week',
        'Headache: 15%; possibly vasoactive via CGRP/calcitonin pathway cross-reactivity',
      ),
      h3('Melanoma Risk Monitoring'),
      p(t('MC1R polymorphisms (loss-of-function variants) are established melanoma risk factors — the endogenous eumelanin protection is reduced in red hair/fair skin variants. Afamelanotide overcomes this by providing supraphysiological MC1R agonism regardless of polymorphism. Theoretical concern: could afamelanotide stimulate existing subclinical melanoma cells? In clinical trials, no increase in melanoma incidence has been detected over 5+ years of follow-up, and atypical naevi are monitored by mandatory dermatological examination.')),
    ),
  },

  // ─── P21 ─────────────────────────────────────────────────────
  'p21': {
    mechanismOfAction: lex(
      h3('Thymosin Beta-4 Derived Tetrapeptide'),
      p(t('P21 is a tetrapeptide fragment derived from thymosin beta-4 (TB-4) — specifically the N-terminal sequence Ac-SDKP (N-acetyl-Ser-Asp-Lys-Pro), also known as acetyl-SDKP or AcSDKP. It is naturally released from the larger TB-4 molecule by prolyl oligopeptidase (POP) and is found in plasma, urine, and amniotic fluid. P21 acts primarily by inhibiting haematopoietic stem cell proliferation and exerts anti-fibrotic, anti-inflammatory, and anti-angiogenic effects via multiple mechanisms.')),
      h3('Haematopoietic Stem Cell Regulation'),
      p(t('P21 was originally characterised as a negative regulator of haematopoiesis — inhibiting haematopoietic stem cell entry into the S-phase of the cell cycle (quiescence maintenance). This property was exploited therapeutically: P21 pre-treatment of bone marrow before cytotoxic chemotherapy shifts stem cells into G0/G1 quiescence, protecting them from S-phase-specific chemotherapy toxicity. ACE (angiotensin-converting enzyme) degrades AcSDKP — ACE inhibitor administration raises P21 plasma levels 3–5× by blocking degradation.')),
      h3('Anti-fibrotic Mechanisms'),
      ul(
        'TGF-β1 inhibition: P21 reduces TGF-β1-stimulated collagen-I and fibronectin synthesis',
        'Macrophage M1→M2 shift: P21 reduces pro-fibrotic M1 macrophage activation',
        'Myofibroblast suppression: reduced α-SMA expression in activated fibroblasts',
        'Collagen cross-linking: P21 reduces lysyl oxidase (LOX) expression → less irreversible fibrosis',
        'Anti-inflammatory: NF-κB inhibition in macrophages and endothelial cells',
        'Anti-angiogenic: inhibits FGF-2-driven endothelial proliferation in tumour vasculature contexts',
      ),
    ),
    pharmacokinetics: lex(
      h3('Endogenous P21 Kinetics'),
      p(t('Circulating AcSDKP (P21) is present in plasma at approximately 0.5–1.5 nM in healthy adults, regulated by the balance of prolyl oligopeptidase (synthesis from TB-4) and ACE (degradation). ACE inhibitor use raises plasma P21 by blocking ACE-mediated cleavage at the Asp-Lys bond. This identifies a novel mechanism for part of the organ-protective effects of ACE inhibitors beyond Ang II suppression.')),
      h3('Recombinant P21 Administration'),
      p(t('Research protocols use synthetic AcSDKP administered by SC injection or IV infusion. Plasma half-life of exogenous P21 is 30–60 minutes (degraded by ACE and other dipeptidyl peptidases). Doses of 100–1000 µg/kg/day are used in rodent fibrosis models. The discovery that ACE inhibitors naturally elevate P21 has led to research comparing exogenous P21 with ACE inhibitor-induced P21 elevation for fibrotic organ protection.')),
      h3('Research Protocols'),
      ul(
        'Cardiac fibrosis (rodent): 800 µg/kg/day SC infusion via osmotic pump × 4 weeks',
        'Renal fibrosis: 800 µg/kg/day in UUO models; collagen reduction endpoint',
        'Haematopoietic protection: 100–500 µg/kg SC before chemotherapy in mice',
        'ACE inhibitor + P21: enalapril (10 mg/kg) raises P21 3× with additive anti-fibrotic outcome',
      ),
    ),
    researchFindings: lex(
      h3('Cardiac Fibrosis Research'),
      p(t('Peng et al. and Rhaleb et al. demonstrated that exogenous AcSDKP significantly reduces myocardial fibrosis in pressure-overload and post-MI rat models: collagen volume fraction reduced by 40–60%, diastolic function improved (reduced LVEDP), and myofibroblast density decreased. The anti-fibrotic effect is additive with ACE inhibitors, providing mechanistic explanation for how ACE inhibitors reduce cardiac fibrosis (via AcSDKP elevation, independently of blood pressure effects).')),
      h3('Renal Fibrosis and Diabetic Nephropathy'),
      p(t('AcSDKP reduces renal fibrosis markers in diabetic nephropathy models (STZ-induced diabetes) and unilateral ureteral obstruction (UUO): tubulointerstitial collagen deposition reduced by 30–50%, TGF-β1 expression reduced, and Smad2/3 phosphorylation attenuated. Plasma AcSDKP is lower in diabetic patients with microalbuminuria vs. normoalbuminuric diabetic controls, suggesting endogenous P21 deficiency may contribute to diabetic nephropathy progression.')),
      h3('Bone Marrow Protection'),
      p(t('The original therapeutic concept for P21 — protecting haematopoietic stem cells from chemotherapy-induced aplasia — was demonstrated in multiple rodent and primate studies. Pre-treatment with AcSDKP before cyclophosphamide or 5-fluorouracil reduced nadir neutropenia severity and accelerated recovery. Phase 1 human trials showed AcSDKP was safe and produced detectable G0/G1 stem cell fraction enrichment at 24 hours.')),
      h3('Anti-inflammatory and Lung Research'),
      ul(
        'Lung fibrosis: AcSDKP reduced bleomycin-induced pulmonary fibrosis 30–40% in rodents',
        'IPF: plasma AcSDKP lower in IPF patients than controls; potential biomarker',
        'SARS-CoV-2 lung fibrosis: theoretical AcSDKP relevance given ACE downregulation by virus',
        'Anti-angiogenic: reduces tumour angiogenesis in FGF-2-driven models without anti-tumour direct cytotoxicity',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Haematopoietic Safety'),
      p(t('P21 (AcSDKP) inhibits haematopoietic stem cell proliferation — the same property that provides chemotherapy protection. Concerns exist about whether P21 administration could cause bone marrow suppression. At research doses in rodents (up to 1000 µg/kg/day), no significant thrombocytopenia or leukopenia was observed — suggesting that physiologically relevant concentrations cause quiescence (protective G0 arrest) rather than apoptosis. Monitoring of CBC during sustained research administration is prudent.')),
      h3('Phase 1 Safety Data'),
      ul(
        'No significant adverse events in Phase 1 haematopoietic protection trial',
        'No haematological toxicity at studied doses (0.1–1 mg/kg)',
        'Injection site reactions: mild; standard for SC peptide administration',
        'No immunogenicity: AcSDKP is an endogenous peptide; anti-drug antibodies not observed',
      ),
      h3('Theoretical Concerns'),
      p(t('The anti-angiogenic properties of P21 raise theoretical concerns about wound healing impairment (angiogenesis is essential for granulation tissue formation). Animal wound healing studies show P21 does not significantly impair wound closure at anti-fibrotic doses, possibly because P21 selectively inhibits pathological (FGF-2-driven, excessive) angiogenesis while sparing the physiological wound healing angiogenic response mediated by VEGF and other pathways. Long-term studies are needed to confirm this selectivity in vivo.')),
    ),
  },
}
