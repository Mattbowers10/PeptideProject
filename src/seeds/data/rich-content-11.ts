/**
 * Rich content batch 11 — 11 peptides (final batch)
 * palmitoyl-pentapeptide-4, palmitoyl-tripeptide-1, pinealon, rgd-peptides,
 * shlp2, snap-8, syn-ake, thymalin, thymopentin, thymulin, vilon
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

export const richContent11 = {

  // ─── Palmitoyl Pentapeptide-4 (Matrixyl) ─────────────────────
  'palmitoyl-pentapeptide-4': {
    mechanismOfAction: lex(
      h3('Matrikine-Based Collagen Stimulator'),
      p(t('Palmitoyl pentapeptide-4 (INCI: Palmitoyl Pentapeptide-4; commercially Matrixyl) is the palmitoyl-conjugated form of the pentapeptide Lys-Thr-Thr-Lys-Ser, which corresponds to a sequence within the C-terminal collagen III propeptide. It belongs to the matrikine class of peptides — small ECM-derived sequences that signal to fibroblasts to synthesise new extracellular matrix components. The palmitoyl fatty acid chain facilitates skin penetration through the stratum corneum lipid layers.')),
      h3('TGF-β Pathway Activation'),
      p(t('The Lys-Thr-Thr-Lys-Ser sequence is recognised by specific integrins and growth factor receptors on dermal fibroblasts, activating TGF-β-like signalling cascades that upregulate: (1) type I and type III collagen gene transcription; (2) elastin synthesis; (3) fibronectin and laminin production; (4) hyaluronic acid synthase (HAS2) expression. The signal is interpreted by fibroblasts as a "wound/collagen degradation" matrikine signal, stimulating matrix repair.')),
      h3('ECM Target Upregulation'),
      ul(
        'Collagen I: 2–3× upregulation in dermal fibroblast cultures at 50 ppm',
        'Collagen III: 1.5–2× upregulation; dominant in early wound healing response',
        'Elastin: 1.5–2× increase; improves skin snap-back and firmness',
        'Fibronectin: upregulated; improves cell-matrix adhesion and dermal architecture',
        'Hyaluronic acid: HAS2 enzyme upregulation → increased dermal water retention',
        'Collagenase inhibition: MMP-1 expression reduced; slowing existing collagen degradation',
      ),
    ),
    pharmacokinetics: lex(
      h3('Skin Penetration via Palmitoylation'),
      p(t('The palmitoyl fatty acid (C16) chain conjugated to the N-terminal lysine provides lipophilic anchoring in stratum corneum intercellular lipid domains. Franz cell studies demonstrate 15–20% penetration of palmitoyl pentapeptide-4 through human ex vivo skin (substantially higher than unmodified pentapeptides), with accumulation in the viable epidermis and upper dermis where fibroblasts reside. Palmitoyl conjugation increases penetration 10–20-fold vs. the free peptide.')),
      h3('Formulation Stability'),
      p(t('Palmitoyl pentapeptide-4 is stable in aqueous formulations at pH 4.5–7.0 and at room temperature. It is not susceptible to skin peptidase degradation as quickly as unmodified peptides due to the fatty acid conjugation protecting the N-terminus. Standard preservation and antioxidant co-formulation (at pH 5.0–5.5 with glycerin) is sufficient for 24-month product stability.')),
      h3('Commercial Concentrations'),
      ul(
        'Serum formulations: 3–8% Matrixyl (manufacturer recommends 3–5% effective range)',
        'Cream formulations: 3–5%',
        'Matrixyl 3000 (palmitoyl tripeptide-1 + palmitoyl tetrapeptide-7 combination): 3–5%',
        'Clinical effect onset: 4–8 weeks minimum with twice-daily application',
      ),
    ),
    researchFindings: lex(
      h3('Dermal Fibroblast Studies'),
      p(t('Multiple peer-reviewed studies confirm palmitoyl pentapeptide-4\'s fibroblast stimulatory effects. Lintner and Peschard (2000) demonstrated 2.7× collagen I upregulation in normal human dermal fibroblasts at 100 µM concentration — the foundational mechanistic study. Subsequent work confirmed fibronectin (1.8×), elastin (1.6×), and hyaluronic acid synthase (1.9×) upregulation in the same cell system.')),
      h3('Clinical Wrinkle Studies'),
      p(t('Sederma-sponsored and independent clinical studies show palmitoyl pentapeptide-4 (3–5% in serum) applied twice daily for 12 weeks reduces wrinkle depth (profilometry) by 12–25% vs. placebo. Skin firmness improved by measured echo density on ultrasonography. One independently conducted RCT (Robinson et al.) showed comparable effects between 3% Matrixyl serum and 0.1% retinol serum on crow\'s feet wrinkles at 12 weeks — establishing it as a retinol-comparable active.')),
      h3('Comparison with Retinoids'),
      p(t('Palmitoyl pentapeptide-4 induces collagen synthesis via a different pathway from retinoids (retinoic acid receptor-mediated transcription). As a result, the two can be combined for additive effect without mechanism redundancy. Unlike retinol/retinoids, palmitoyl pentapeptide-4 does not cause skin irritation, photosensitivity, or the initial "purging" reaction associated with retinoid use — making it suitable for sensitive skin and year-round use.')),
      h3('Combination with Matrixyl 3000'),
      ul(
        'Palmitoyl tripeptide-1: collagen I, III, IV signalling via procollagen III N-terminal sequence',
        'Palmitoyl tetrapeptide-7: reduces IL-6-driven matrix degradation (anti-inflammatory)',
        'Combined Matrixyl 3000 (3% total): additive collagen stimulation and anti-degradation',
        'Clinical data: 49% wrinkle depth reduction at 2 months in manufacturer-sponsored study',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Excellent Safety Profile'),
      p(t('Palmitoyl pentapeptide-4 has been used safely in millions of cosmetic products for over 20 years with no significant pharmacovigilance signals. As an endogenous-sequence-derived matrikine (mimicking natural ECM degradation signals), immunogenicity is minimal. No systemic effects have been documented at cosmetic concentrations. The peptide and its palmitoyl modification are metabolised locally to naturally occurring amino acids and fatty acids.')),
      h3('Adverse Effects'),
      ul(
        'Contact sensitisation: extremely rare; no significant sensitisation in HRIPT (human repeat insult patch test)',
        'Comedogenicity: not comedogenic at use concentrations',
        'Interaction with other cosmetic actives: compatible with AHAs, BHAs, niacinamide, vitamin C, and retinoids',
        'No photosensitisation: safe year-round including during UV exposure (unlike retinoids)',
      ),
      h3('Regulatory Status'),
      p(t('Palmitoyl Pentapeptide-4 is listed in the EU Cosmetics Ingredient Database and the US Personal Care Products Council International Cosmetic Ingredient Dictionary as a safe cosmetic ingredient. No concentration restrictions in any major regulatory framework. FDA classifies cosmetic effects (anti-wrinkle, moisturising) without requiring clinical trial evidence — only drug claims (altering structure or function of skin) require IND filing, which palmitoyl pentapeptide-4 cosmetics appropriately avoid.')),
    ),
  },

  // ─── Palmitoyl Tripeptide-1 ──────────────────────────────────
  'palmitoyl-tripeptide-1': {
    mechanismOfAction: lex(
      h3('Procollagen III-Derived Matrikine'),
      p(t('Palmitoyl tripeptide-1 (INCI: Palmitoyl Tripeptide-1) is the palmitoyl-conjugated form of the tripeptide Gly-His-Lys (GHK), originally isolated from human plasma as a naturally occurring copper-binding tripeptide. The palmitoyl conjugation enhances skin penetration and lipid phase stability. GHK (without palmitoylation) also occurs naturally in the N-terminal propeptide of type III procollagen — positioning it as a matrikine fragment that signals collagen repair. The Cu²⁺-binding capacity of His confers additional enzymatic activity.')),
      h3('GHK-Cu Mechanism (Palmitoyl Tripeptide-1 Copper Complex)'),
      p(t('When palmitoyl tripeptide-1 binds copper (as GHK-Cu), it acts as a chaperone delivering Cu²⁺ to copper-dependent enzymes in the skin: lysyl oxidase (LOX, requiring Cu²⁺ for collagen/elastin crosslinking), SOD (Cu/Zn-SOD for antioxidant defence), and ceruloplasmin. Copper delivery via GHK-Cu thus supports collagen maturation (crosslinking) rather than just synthesis — addressing both the quantity and quality of new collagen. The palmitoyl form without Cu²⁺ signals via the matrikine pathway independently.')),
      h3('Multiple Skin Target Actions'),
      ul(
        'Collagen I, III, IV upregulation: matrikine signalling to fibroblasts',
        'Elastin synthesis: GHK-Cu stimulates tropoelastin gene expression',
        'Glycosaminoglycans: hyaluronic acid and dermatan sulfate upregulation',
        'Wound healing: accelerates re-epithelialisation and granulation tissue formation',
        'Anti-oxidant: SOD and catalase upregulation via Cu²⁺ delivery',
        'Anti-inflammatory: reduces TNF-α-mediated collagen degradation in fibroblasts',
        'DNA repair: upregulates NER genes in skin cells under UV stress',
      ),
    ),
    pharmacokinetics: lex(
      h3('Skin Penetration'),
      p(t('The palmitoyl chain on tripeptide-1 inserts into stratum corneum intercellular lipid lamellae, facilitating partitioning and transdermal transport. Franz cell data show 10–15% penetration of the applied dose through full-thickness human skin. The tripeptide is smaller than pentapeptide-4, slightly enhancing passive diffusion once past the SC lipid barrier. Dermal accumulation provides sustained interaction with resident fibroblasts.')),
      h3('GHK-Cu Stability'),
      p(t('The Gly-His-Lys tripeptide has a very high copper-binding affinity (Kd ~1 fM) — one of the highest known for endogenous tripeptides. In cosmetic formulations, GHK-Cu stability requires: pH 5.5–6.5, exclusion of strong reducing agents (vitamin C above 5% can reduce Cu²⁺ to Cu⁺, altering the copper complex), and absence of chelating agents. The palmitoyl form without added copper relies on the matrikine pathway and ambient skin copper availability.')),
      h3('Commercial Application'),
      ul(
        'Palmitoyl tripeptide-1 (INCI): typically 3–5% in formulations; often combined with tetrapeptide-7',
        'GHK-Cu (copper peptide): 0.1–2% in serums; widely available without palmitoylation as separate product',
        'Matrixyl 3000 (Sederma): palmitoyl tripeptide-1 + palmitoyl tetrapeptide-7; 3% combination',
        'Clinical onset: 4–8 weeks of twice-daily application for visible improvement',
      ),
    ),
    researchFindings: lex(
      h3('Wound Healing Evidence'),
      p(t('The GHK tripeptide has one of the most extensive wound healing research bases of any cosmetic peptide. Pickart et al. documented GHK accelerates wound contraction, increases production of granulation tissue, enhances dermal epithelial stem cell proliferation, and reduces infection-induced tissue damage. GHK promotes expression of TGF-β, VEGF, and FGF — the core wound healing growth factor triad. These findings from surgical wound models inform its cosmetic anti-ageing rationale.')),
      h3('Anti-Ageing Clinical Data'),
      p(t('A double-blind placebo-controlled study of palmitoyl tripeptide-1 + tetrapeptide-7 (Matrixyl 3000) at 3% in a 2-month application period (32 participants) showed: 49% reduction in wrinkle depth (profilometry), 25% improvement in skin firmness (elasticity measurement), and 17% improvement in skin moisture. These manufacturer-sponsored results require independent replication but are consistent with the in vitro fibroblast stimulation data.')),
      h3('GHK-Cu Research Portfolio'),
      p(t('Pickart\'s decades of GHK research document: (1) systemic GHK declines with age (plasma GHK falls from ~200 ng/mL at age 20 to <80 ng/mL at age 60); (2) GHK-Cu promotes expression of >4000 genes in human fibroblasts by microarray analysis, including tissue remodelling, anti-inflammatory, and anti-tumour genes; (3) GHK-Cu blocks TGF-β-induced fibrosis in fibroblast and organ cultures; (4) GHK is chemotactic for macrophages and mast cells involved in wound repair.')),
      h3('Anti-cancer and Metastasis Suppression'),
      ul(
        'GHK normalises gene expression in metastatic breast and colon cancer cells to less aggressive patterns',
        'Suppresses expression of genes involved in invasion (MMP-2, MMP-9)',
        'Reduces VEGF-driven tumour angiogenesis in in vitro models',
        'Context: these are exploratory cancer biology findings, not clinical applications',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety of GHK and Palmitoyl Tripeptide-1'),
      p(t('GHK and palmitoyl tripeptide-1 have an outstanding safety record across cosmetic use. The tripeptide and its palmitoyl-conjugated form are metabolised to naturally occurring amino acids and fatty acid. No systemic toxicity has been documented. GHK-Cu is non-mutagenic (AMES test negative) and non-cytotoxic at concentrations well above cosmetic use levels.')),
      h3('Adverse Effects'),
      ul(
        'Sensitisation: not a known contact allergen; HRIPT negative in published testing',
        'Staining: GHK-Cu (copper complex) can produce very faint greenish tint in formulations; rare on skin',
        'Interaction with ascorbic acid: high-concentration vitamin C (>10%) may alter GHK-Cu complex; formulate separately or at lower pH',
        'No photosensitivity: suitable for daytime use without added SPF requirement',
      ),
      h3('Regulatory Status'),
      p(t('Palmitoyl Tripeptide-1 and GHK-Cu are approved cosmetic ingredients in the EU, US, and globally. No restrictions on use concentration in major regulatory frameworks. GHK tripeptide is also a naturally occurring endogenous peptide, further supporting safety assessment. The EU Cosmetics Ingredient Database lists both as established cosmetic ingredients with no safety concern at typical use concentrations.')),
    ),
  },

  // ─── Pinealon ────────────────────────────────────────────────
  'pinealon': {
    mechanismOfAction: lex(
      h3('Pineal Gland Targeting Tripeptide Bioregulator'),
      p(t('Pinealon (Ala-Glu-Asp; EDR tripeptide) is a synthetic tripeptide developed at the St. Petersburg Institute of Bioregulation by Khavinson et al. as a tissue-specific bioregulator targeting pineal gland function and neurological tissues. Like epithalon (Ala-Glu-Asp-Gly) and cortagen, it belongs to the short peptide bioregulator class proposed to restore epigenetic gene expression patterns in ageing or damaged tissues.')),
      h3('Neuroprotective and Antioxidant Actions'),
      p(t('Pinealon\'s proposed mechanism involves direct interaction with DNA regulatory elements in neural cells, restoring expression of neuroprotective genes (Bcl-2, HSP70, SOD, BDNF) that decline with age or ischaemic injury. In neuronal cell cultures, pinealon reduces ROS accumulation, prevents glutamate-induced excitotoxic death, and promotes neuronal survival under hypoxic conditions. These effects are attributed to the Asp residue\'s ability to modulate calcium ion handling and the Glu residue\'s interaction with chromatin regulatory sequences.')),
      h3('Melatonin and Circadian Effects'),
      ul(
        'Pineal gland targeting: Ala-Glu-Asp sequence proposed to interact with pinealocyte regulatory elements',
        'Melatonin restoration: animal studies show improved nocturnal melatonin peak in aged animals',
        'Circadian rhythm: pinealon normalises circadian clock gene expression (Bmal1, Per1, Cry1)',
        'Antioxidant cascade: melatonin increase → secondary antioxidant amplification',
        'Neurogenesis: BDNF upregulation supports hippocampal neurogenesis in aged rodents',
        'Anti-apoptotic: Bcl-2 family protein upregulation in neural cells under stress',
      ),
    ),
    pharmacokinetics: lex(
      h3('Administration'),
      p(t('Pinealon is administered sublingually (sublingual drops or tablets) for improved absorption bypassing GI peptidase degradation, or by SC injection. As a tripeptide, oral bioavailability is very low (<2%) due to rapid GI degradation by peptidases. Sublingual administration achieves estimated bioavailability of 15–30% via oral mucosal absorption. SC bioavailability is ~80%. Plasma half-life is under 20 minutes; tissue effects persist for days based on proposed epigenetic mechanisms.')),
      h3('Research Protocols'),
      p(t('Standard Russian research protocols use pinealon in 10-day courses administered twice yearly — paralleling epithalon protocols. Sublingual administration of 10 mg/day (2 drops of standard solution) for 10 days is the typical human research protocol. Animal studies use SC infusion at 0.1–0.5 mg/kg for 10 consecutive days. The twice-yearly course interval is proposed to maintain epigenetic regulatory effects without receptor desensitisation.')),
      h3('Dosing'),
      ul(
        'Sublingual (human research): 10–20 mg/day for 10 days, twice yearly',
        'SC injection: 0.1–0.5 mg/kg/day × 10 days (animal studies)',
        'Combination: often combined with epithalon and cortagen in multi-peptide protocols',
        'No established dose-response curve from independent studies',
      ),
    ),
    researchFindings: lex(
      h3('Neuroprotection in Ischaemia Models'),
      p(t('Khavinson group studies demonstrated pinealon reduced ischaemic neuronal death in hippocampal slice preparations by 35–50% at 100 nM concentrations, attributed to reduced intracellular calcium accumulation and upregulated Bcl-2. In global cerebral ischaemia models (gerbils), pinealon administered pre-ischaemia reduced hippocampal CA1 neuron loss by 40% and improved spatial memory retention in Morris water maze testing at 30 days.')),
      h3('Ageing and Cognitive Function'),
      p(t('In aged rodent studies, pinealon (10-day courses, twice yearly for 2 years) improved performance on cognitive tests (radial arm maze, Morris water maze) compared to untreated aged controls. Histological analysis showed preserved hippocampal CA1 and CA3 pyramidal neuron density and maintained synaptic density. These improvements were associated with normalised SOD activity and BDNF levels in hippocampal tissue.')),
      h3('Retinal Neuroprotection'),
      p(t('A distinct and compelling research line documents pinealon\'s protective effects on retinal neurons. In retinal ischaemia models and chronic ocular hypertension (glaucoma) models, pinealon reduced retinal ganglion cell (RGC) loss by 30–45%. This finding parallels semax\'s optic nerve research and represents a potential neuroprotection strategy for age-related macular degeneration and glaucoma, though no human ophthalmic trials have been published.')),
      h3('Longevity Research'),
      ul(
        'Khavinson cohort: annual pinealon courses in elderly patients associated with improved longevity markers',
        'Telomere length: modest improvement in leukocyte telomere length with 12-month pinealon/epithalon combination',
        'Biomarkers: improved SOD/catalase activity, reduced 8-OHdG (DNA oxidation marker)',
        'No independent Phase 3 trials: all evidence from Khavinson research group',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety'),
      p(t('Pinealon has not undergone formal Phase 1/2/3 clinical trials meeting Western regulatory standards. Available safety data from Russian clinical research reports describe excellent tolerability with no serious adverse events. As a tripeptide corresponding to three naturally occurring amino acids, immunogenicity and organ toxicity are expected to be minimal based on first principles.')),
      h3('Known Effects'),
      ul(
        'Injection site reactions: mild; standard for SC peptide injection',
        'Mild initial drowsiness: possibly melatonin-mediated effect; evening administration recommended',
        'No endocrine disruption reported: unlike some pineal-targeting compounds',
        'No carcinogenic signal in standard rodent toxicology studies',
      ),
      h3('Evidentiary Context'),
      p(t('Pinealon occupies the same research landscape as other Russian peptide bioregulators: a plausible mechanistic model (epigenetic DNA/histone interaction, melatonin restoration), consistent preclinical efficacy data from a single research group, absence of independent international replication, and no regulatory approval in Western markets. It is available as a research compound and in some Eastern European countries as a supplement. Independent validation of the primary findings is the key scientific requirement before broader acceptance.')),
    ),
  },

  // ─── RGD Peptides ────────────────────────────────────────────
  'rgd-peptides': {
    mechanismOfAction: lex(
      h3('Integrin Ligand Peptides'),
      p(t('RGD peptides are a class of bioactive sequences centred on the tripeptide Arg-Gly-Asp (RGD) — the minimal integrin-binding motif identified by Pierschbacher and Ruoslahti in 1984 as the active sequence of fibronectin. RGD is present in numerous extracellular matrix proteins: fibronectin, vitronectin, osteopontin, fibrinogen, von Willebrand factor, and collagen. It serves as a universal "cell attachment signal," recognised by a family of αv-integrins and α5β1 integrin on virtually all adherent cell types.')),
      h3('Integrin Signalling'),
      p(t('RGD binding to integrins (particularly αvβ3, αvβ5, and α5β1) activates outside-in signalling: integrin clustering at focal adhesions → recruitment of FAK (focal adhesion kinase), talin, paxillin, vinculin → activation of PI3K/Akt (survival), MAPK/ERK (proliferation), and Rho GTPase pathways (cytoskeletal organisation and cell migration). The quality and rigidity of the RGD-displaying substrate modulates the downstream signal — stiff substrates produce more FAK activation than soft substrates, driving mechanotransduction.')),
      h3('Applications of RGD in Research'),
      ul(
        'Biomaterial functionalisation: RGD coating improves cell attachment to synthetic scaffolds',
        'Wound healing: RGD-containing matrices accelerate re-epithelialisation and dermal cell migration',
        'Bone: RGD immobilised on titanium implants improves osteoblast adhesion and osseointegration',
        'Drug delivery: RGD-targeted nanoparticles home to αvβ3-expressing tumour vasculature',
        'Stem cell culture: RGD hydrogels (PEG-RGD) replace animal-derived ECM for defined culture',
        'Anti-platelet: cyclic RGD (eptifibatide) blocks αIIbβ3 integrin → anti-thrombotic therapy',
      ),
    ),
    pharmacokinetics: lex(
      h3('Short Half-life of Linear RGD'),
      p(t('Linear RGD tripeptide has negligible plasma half-life (<5 minutes) due to rapid renal clearance (very small peptide) and non-specific peptidase degradation. This necessitates either: (1) cyclic RGD (cRGD) — dramatically improved affinity and resistance to conformational degradation; (2) RGD in biomaterial scaffolds — solid-phase presentation for localised cell interaction; (3) RGD-conjugated biologics or nanoparticles for systemic delivery.')),
      h3('Cyclic RGD — Improved Pharmacology'),
      p(t('Cyclic RGD peptides (c(RGDfK), c(RGDyK), cilengitide/cyclo-RGDfNMeV) have 1000–10,000× higher integrin affinity than linear RGD due to conformationally preorganised RGD presentation matching the integrin binding groove. Cilengitide (EMD 121974), an αvβ3/αvβ5 antagonist, was studied in glioblastoma Phase 3 trials. Eptifibatide (Integrilin), a cyclic RGD-containing heptapeptide, is FDA-approved for acute coronary syndrome.')),
      h3('Biomedical Applications'),
      ul(
        'Eptifibatide: 180 mcg/kg IV bolus + 2 mcg/kg/min infusion in ACS',
        'Cilengitide: 500–2000 mg IV twice weekly (discontinued Phase 3)',
        'RGD-hydrogels: PEG-RGD at 1–5 mM RGD density for stem cell research',
        'Titanium implant coating: 1–10 µg/cm² RGD for enhanced osseointegration',
      ),
    ),
    researchFindings: lex(
      h3('Wound Healing and Regenerative Medicine'),
      p(t('RGD-functionalised hydrogels and scaffolds dramatically improve wound healing outcomes in animal models. Fibrin matrices with immobilised RGD accelerate skin wound closure by 30–40% and improve vascularisation of healing tissue vs. unfunctionalised controls. In nerve repair, RGD-modified conduits enhance Schwann cell attachment, axon regeneration, and functional recovery after peripheral nerve injury. These biomaterial applications represent the primary clinical translation pathway for RGD technology.')),
      h3('Bone and Dental Implants'),
      p(t('Titanium implant surfaces functionalised with RGD (by covalent silane chemistry or plasma deposition) show consistently improved osseointegration in animal models: increased pull-out force, faster bone-implant contact percentage, and reduced healing time. Multiple clinical pilot studies in dental implantology confirm faster bone integration with RGD-coated titanium, potentially reducing the conventional 3–6 month osseointegration waiting period.')),
      h3('Anti-cancer Targeting'),
      p(t('Tumour vasculature overexpresses αvβ3 integrin — making RGD-targeted therapeutics selectively enriched in the tumour microenvironment. Cyclic RGD-conjugated liposomes and nanoparticles show 3–5× tumour accumulation vs. non-targeted equivalents in xenograft models. RGD-PET imaging agents (galliou-NOTA-RGD) are used in clinical trials for αvβ3-positive tumour detection. The failed cilengitide trial highlights the complexity of anti-integrin therapy in cancer.')),
      h3('Cardiovascular — Eptifibatide'),
      ul(
        'ESPRIT trial: eptifibatide reduced death/MI by 37% in PCI patients (NEJM 2001)',
        'IMPACT-II: reduced ischaemic events in angioplasty patients',
        'PURSUIT: eptifibatide reduced 30-day death/MI in NSTE-ACS patients',
        'Mechanism: cyclic RGD blocks fibrinogen binding to αIIbβ3 → prevents platelet aggregation',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Eptifibatide Clinical Safety'),
      p(t('Eptifibatide\'s safety is well characterised from Phase 3 trials and post-approval use. The primary adverse effect is bleeding — major bleeding occurred in 1–2% of patients vs. 0.5–1% placebo, consistent with anti-platelet mechanism. Thrombocytopenia (platelet count <100,000) occurs in 0.5–1% of patients — a class effect of GP IIb/IIIa inhibitors. Platelet count monitoring at baseline and 4 hours post-initiation is recommended.')),
      h3('Biomaterial RGD Safety'),
      ul(
        'RGD-hydrogels (PEG-RGD): excellent biocompatibility; no significant inflammatory response in implantation studies',
        'RGD-coated titanium: no increased systemic RGD concentrations measured',
        'Linear RGD peptide: negligible systemic effects at research concentrations; rapidly renally cleared',
        'Cyclic RGD nanoparticles: biodistribution and toxicity characterisation in progress for each formulation',
      ),
      h3('Cilengitide Clinical Safety Lessons'),
      p(t('The CENTRIC trial (cilengitide in glioblastoma) was well tolerated but showed no survival benefit in unselected patients. Adverse effects of cilengitide (αvβ3 antagonist) included: thromboembolic events (paradoxical platelet activation via integrin signalling unblocking), fatigue, and nausea. These findings illustrated that integrin signalling blockade in vivo is more complex than preclinical models suggested — timing, tumour vascular normalisation state, and patient selection critically affect outcomes.')),
    ),
  },

  // ─── SHLP2 ───────────────────────────────────────────────────
  'shlp2': {
    mechanismOfAction: lex(
      h3('Small Humanin-Like Peptide 2 — Mitochondria-Derived'),
      p(t('SHLP2 (Small Humanin-Like Peptide 2) is a 12-amino acid mitochondria-derived peptide (MDP) encoded within the 16S ribosomal RNA region of the mitochondrial genome — the same genomic region that encodes humanin. Mots-c is encoded in the 12S rRNA region. SHLP2 was identified by Lee et al. in 2016 as part of a systematic search for open reading frames within mitochondrial rRNA sequences. Like humanin, SHLP2 is secreted from mitochondria and acts as a retrograde mitochondrial signalling molecule.')),
      h3('Cytoprotective and Metabolic Signalling'),
      p(t('SHLP2 binds formyl peptide receptor (FPR) family members and potentially GTPase-linked receptors on target cells, activating PI3K/Akt and MAPK/ERK survival pathways. Its primary characterised actions include: (1) inhibition of apoptosis — reducing cytochrome c release and caspase-3/7 activation; (2) reduction of mitochondrial ROS production; (3) enhancement of mitochondrial membrane potential; (4) promotion of mitochondrial biogenesis via PGC-1α upregulation. The net effect is improved cellular energy efficiency and stress resistance.')),
      h3('Tissue Expression and Regulation'),
      ul(
        'Highest expression: brain, testis, liver (high metabolic demand tissues)',
        'Age dependence: plasma SHLP2 declines significantly with age — proposed biomarker of mitochondrial health',
        'Exercise: resistance and aerobic exercise transiently increases circulating SHLP2 (along with MOTS-c)',
        'Fasting: caloric restriction raises SHLP2 — proposed mechanism for CR longevity effects',
        'Stress response: heat shock and oxidative stress upregulate mitochondrial SHLP2 expression',
      ),
    ),
    pharmacokinetics: lex(
      h3('Research-Stage Compound'),
      p(t('SHLP2 is a research-stage peptide with limited pharmacokinetic data in humans. Animal data suggest SC bioavailability of 60–80% for synthetic SHLP2. Plasma half-life is estimated at 30–90 minutes based on structural similarity to humanin (which is also a 12S rRNA-encoded MDP with comparable size). SHLP2 is expected to be degraded by serum peptidases and potentially FPR receptor internalisation.')),
      h3('In Vitro and Animal Dosing'),
      p(t('Research doses used in published studies: 1–100 nM in cell culture experiments; 0.5–5 mg/kg SC in rodent studies. Cytoprotective effects in neuronal cultures are observed at 1–10 nM — suggesting high potency relative to its peptide size. These concentrations are in the range of endogenous SHLP2 in young healthy subjects, supporting the concept that age-related SHLP2 decline represents a physiologically significant loss.')),
      h3('No Clinical Trials'),
      ul(
        'No Phase 1 human data published as of 2024',
        'Research use only: available from specialty peptide suppliers',
        'Half-life extension: PEGylation or fatty acid conjugation being explored in preclinical studies',
        'Comparison to humanin: similar MDP class; humanin has more extensive research history',
      ),
    ),
    researchFindings: lex(
      h3('Discovery and Prostate Cancer Research'),
      p(t('The foundational SHLP2 discovery paper (Lee et al., 2016, Scientific Reports) identified SHLP2 among 6 novel MDPs (SHLP1-6) by systematic ORF scanning of mitochondrial rRNA sequences. Initial characterisation showed SHLP2 as the most potent of the novel MDPs for promoting cell survival and reducing ROS in PC-3 prostate cancer and HeLa cells. Importantly, SHLP2 inhibited apoptosis of prostate epithelial cells while — paradoxically — reducing growth of prostate cancer cells, suggesting a context-dependent antisurvival effect in malignant cells.')),
      h3('Age-Related Decline and Longevity'),
      p(t('Epidemiological data from the CALERIE (Comprehensive Assessment of Long-term Effects of Reducing Intake of Energy) trial revealed that higher circulating SHLP2 levels correlate with better metabolic health markers and reduced all-cause mortality risk. SHLP2 declines ~40–60% between ages 30 and 70 in cross-sectional analyses — a decline paralleling the loss of mitochondrial function with ageing. This positions SHLP2 as both a biomarker and potential therapeutic target for age-related mitochondrial decline.')),
      h3('Neuroprotection'),
      p(t('SHLP2 reduces amyloid-β-induced neurotoxicity in hippocampal neuron cultures — reducing apoptosis by 50% and preserving mitochondrial membrane potential. This parallels humanin\'s neuroprotective actions via Aβ sequestration, though the SHLP2 mechanism appears to be primarily intracellular mitochondrial protection rather than extracellular Aβ binding. In aged mouse brain, SHLP2 infusion improved mitochondrial respiratory chain complex I and III activity.')),
      h3('Metabolic Research'),
      ul(
        'Insulin signalling: SHLP2 improves insulin receptor substrate phosphorylation in liver cells',
        'AMPK activation: metabolic sensing pathway upregulation consistent with caloric restriction mimicry',
        'Hepatic lipid metabolism: reduced hepatic lipid accumulation in high-fat diet mice with SHLP2',
        'Exercise mimetic: SHLP2 and MOTS-c share this property — mitochondrial exercise adaptation signalling',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('No Human Clinical Safety Data'),
      p(t('SHLP2 has no published human clinical safety data. Safety assessment is limited to in vitro and animal toxicology. In rodent studies at research doses (up to 5 mg/kg/day SC for 4 weeks), no significant adverse effects on body weight, organ histology, or haematology were reported. As an endogenous mitochondria-derived peptide present in all humans, the theoretical immunogenicity risk is low.')),
      h3('Theoretical Safety Considerations'),
      ul(
        'Prostate cancer context: SHLP2 inhibits prostate cancer cell growth but promotes normal prostate epithelial survival — net effect in in situ cancer is uncertain',
        'Anti-apoptotic effects: could theoretically protect damaged cells from programmed death; cancer risk monitoring needed in chronic use',
        'Mitochondrial signalling amplification: supraphysiological SHLP2 could alter metabolic gene expression in unpredictable ways',
        'No established therapeutic window in humans',
      ),
      h3('Research Outlook'),
      p(t('SHLP2 represents the leading edge of the mitochondria-derived peptide research frontier, which has already produced humanin (extensive preclinical data, early human studies) and MOTS-c (exercise mimetic, Phase 1 trials). If the MDP research trajectory holds, SHLP2 may advance to human safety trials within 3–5 years as the ageing/longevity field continues to grow. Current research use requires careful documentation and institutional review.')),
    ),
  },

  // ─── SNAP-8 ──────────────────────────────────────────────────
  'snap-8': {
    mechanismOfAction: lex(
      h3('Extended SNAP-25 Competitive Inhibitor'),
      p(t('SNAP-8 (Acetyl octapeptide-3; INCI: Acetyl Octapeptide-3) is an 8-amino acid synthetic analogue of the N-terminal region of SNAP-25 (Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH₂), designed as an extended version of argireline (Acetyl hexapeptide-3, 6 residues). The two additional C-terminal residues (Ala-Asp) provide greater steric competition with endogenous SNAP-25 for binding to syntaxin-1 in the SNARE complex assembly, producing more complete SNARE inhibition than argireline alone.')),
      h3('Enhanced SNARE Complex Inhibition'),
      p(t('The SNARE complex forms when SNAP-25 bridges synaptobrevin (on vesicle) and syntaxin-1 (on presynaptic membrane) in a four-helix bundle. SNAP-8 competes with full-length SNAP-25 for the syntaxin-1 binding site due to sequence homology with the N-terminal SNAP-25 helix. The longer 8-residue sequence of SNAP-8 (vs. argireline\'s 6 residues) provides 30–40% more complete SNARE inhibition in in vitro assays, translating to greater ACh release reduction at the neuromuscular junction.')),
      h3('Comparison to Argireline'),
      ul(
        'SNAP-8: 8 aa; inhibits SNARE ~50–60% at equivalent concentration (vs. argireline ~30–40%)',
        'Argireline: 6 aa; less steric competition; lower molecular weight (better penetration)',
        'Complementary mechanisms: SNAP-8 (SNARE) + leuphasyl (DOR/Ca²⁺) = three-mechanism approach',
        'Tri-peptide combination (SNAP-8 + argireline + leuphasyl): highest topical NMJ inhibition',
        'No receptor-mediated action: pure competitive SNARE inhibition mechanism',
      ),
    ),
    pharmacokinetics: lex(
      h3('Topical Penetration'),
      p(t('SNAP-8 at 8 amino acids (~1000 Da) has lower skin penetration efficiency vs. smaller peptides like argireline (~780 Da) or leuphasyl (~680 Da). Franz cell studies show 0.5–1.5% penetration of applied dose through human ex vivo skin. Formulation optimisation (liposomal encapsulation, penetration enhancers) increases effective dermal delivery. The penetration limitation partially offsets SNAP-8\'s superior in vitro SNARE inhibition vs. argireline in real-world cosmetic application.')),
      h3('Stability'),
      p(t('The acetyl N-terminus (Ac-Glu) provides protection against N-terminal aminopeptidases. The methionine residue (position 3) is susceptible to oxidation — standard cosmetic antioxidant system (0.1% vitamin E, BHT, or ascorbyl palmitate) is necessary to maintain Met in the reduced state and preserve SNARE-binding capacity. Stable at pH 4.5–6.5 and below 30°C.')),
      h3('Commercial Application'),
      ul(
        'INCI: Acetyl Octapeptide-3',
        'Commercial concentration: 5–10% in serum formulations',
        'Combination: often paired with argireline 5% in same product',
        'Onset of effect: 4–8 weeks twice-daily application for visible wrinkle reduction',
        'Patented by Lipotec (Spain): marketed as Leuphasyl, Argireline, SNAP-8 combination',
      ),
    ),
    researchFindings: lex(
      h3('In Vitro SNARE Inhibition'),
      p(t('Leandro laboratory at Lipotec conducted the foundational SNAP-8 characterisation: using surface plasmon resonance (SPR) to measure SNAP-25 N-terminal helix competition with syntaxin-1, SNAP-8 showed 1.8× greater inhibition constant than argireline at equal concentrations. ACh release assays from mouse diaphragm preparations confirmed SNAP-8 (10 µM) reduced ACh release by 32% (vs. argireline 22% at the same concentration).')),
      h3('Clinical Wrinkle Studies'),
      p(t('A controlled pilot study of SNAP-8 serum (10% in serum base) applied twice daily for 28 days to 16 volunteers showed 35% reduction in forehead wrinkle depth by profilometry, significantly greater than the 22% reduction with argireline 10% in a crossover comparison. Combined SNAP-8 5% + argireline 5% achieved 42% reduction — supporting additive benefit from complementary SNARE inhibition at different peptide positions.')),
      h3('Combination Peptide Studies'),
      p(t('The Lipotec-sponsored study of triple-peptide combination (Leuphasyl + Argireline + SNAP-8, each at 4–5%) showed 49% wrinkle depth reduction at 8 weeks in periocular wrinkles, compared to 27% for argireline alone and 35% for SNAP-8 alone. This additive architecture (pre-synaptic Ca²⁺ inhibition + two-point SNARE competition) represents the most comprehensive topical NMJ inhibition approach in published cosmetic research.')),
      h3('Long-term Efficacy'),
      ul(
        'SNAP-8 efficacy maintained at 12 weeks without tolerance development',
        'Wrinkle relaxation observed in both dynamic (expression) and static (resting) wrinkles after 12 weeks',
        'No rebound worsening upon discontinuation — unlike BoNT-A where muscle hyperactivity can occur post-treatment',
        'Continuous use beneficial: collagen synthesis upregulation (secondary effect) adds structural improvement',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('SNAP-8 has an excellent safety profile from clinical trials and cosmetic product use. The SNARE-competitive mechanism produces no receptor-mediated adverse effects — no opioid-type effects, no adrenergic effects, and no systemic NMJ inhibition at topical cosmetic doses. HRIPT (human repeat insult patch test) in 50 volunteers showed no sensitisation. In vitro cytotoxicity testing (MTT assay) in keratinocytes and fibroblasts shows zero toxicity up to 1 mM.')),
      h3('Adverse Effects'),
      ul(
        'Local irritation: <3% of users report mild redness; usually formulation-related',
        'No ptosis: unlike BoNT-A, SNAP-8 produces no muscle paralysis; ptosis risk absent',
        'No systemic effects: zero plasma absorption detected in skin penetration studies',
        'No sensitisation: negative in HRIPT and LLNA (murine local lymph node assay)',
      ),
      h3('Regulatory Status'),
      p(t('INCI: Acetyl Octapeptide-3. EU Cosmetics Regulation approved cosmetic ingredient. No concentration restrictions specified. FDA cosmetic ingredient without drug classification (no prescription required). Globally marketed in skincare products without regulatory barriers. Not a WADA prohibited substance. Marketed by Lipotec (a Lubrizol company) under the commercial name SNAP-8 with proprietary manufacturing standards.')),
    ),
  },

  // ─── Syn-ake ─────────────────────────────────────────────────
  'syn-ake': {
    mechanismOfAction: lex(
      h3('Nicotinic Acetylcholine Receptor Antagonist'),
      p(t('Syn-ake (Dipeptide diaminobutyroyl benzylamide diacetate; INCI: Dipeptide Diaminobutyroyl Benzylamide Diacetate) is a synthetic cyclic tripeptide analogue of waglerin-1 — a peptide toxin from the Temple Pit Viper (Tropidolaemus wagleri). Waglerin-1 specifically inhibits the muscle-type nicotinic acetylcholine receptor (nAChR) at the neuromuscular junction, blocking acetylcholine-mediated depolarisation. Syn-ake mimics this receptor blockade mechanism in a synthetic, non-toxic, topically applicable form.')),
      h3('nAChR Competitive Inhibition'),
      p(t('Syn-ake competes with acetylcholine at the α-subunit binding sites of the muscle-type nAChR (α1β1γδ composition), preventing receptor channel opening and postsynaptic depolarisation. Unlike botulinum toxin (which prevents ACh release presynaptically) and argireline/SNAP-8 (which inhibit SNARE assembly), syn-ake acts postsynaptically — blocking the signal at the muscle membrane level. This distinct target point means syn-ake produces additive NMJ inhibition when combined with presynaptic agents.')),
      h3('Mechanism Comparison'),
      ul(
        'Botulinum toxin: cleaves SNAP-25 presynaptically → no ACh release',
        'Argireline/SNAP-8: competitive SNARE inhibition → reduced ACh release',
        'Leuphasyl: DOR → reduced presynaptic Ca²⁺ → reduced ACh release',
        'Syn-ake: postsynaptic nAChR blockade → ACh released but cannot depolarise muscle',
        'Combination potential: all four mechanisms are additive (non-overlapping targets)',
        'Syn-ake selectivity: muscle nAChR > neuronal nAChR; minimises CNS off-target effects',
      ),
    ),
    pharmacokinetics: lex(
      h3('Topical Penetration'),
      p(t('Syn-ake as a cyclic tripeptide analogue with a benzylamide group has partial lipophilic character — the benzyl group improves partitioning into stratum corneum lipid domains. Franz cell penetration studies demonstrate 2–4% of applied dose reaches the viable epidermis, with detectable concentration in upper dermis. The small molecular weight and cyclic conformation improve skin penetration vs. linear peptides of comparable size.')),
      h3('Stability and Formulation'),
      p(t('The cyclic structure of syn-ake confers substantially improved peptidase resistance — ring-opening is required before peptide bond cleavage can occur, and the diaminobutyric acid modifications further enhance stability. Syn-ake is stable in aqueous cosmetic formulations at pH 4.5–7.0, at ambient temperature for 18–24 months. No specific antioxidant co-formulation is required (no oxidation-sensitive residues).')),
      h3('Commercial Use'),
      ul(
        'INCI: Dipeptide Diaminobutyroyl Benzylamide Diacetate',
        'Commercial concentration: 4–8% in serum and cream formulations',
        'Marketed by DSM: Syn-ake tradename',
        'Onset: 4 weeks twice-daily application for initial wrinkle reduction; 8 weeks for full effect',
        'Combination: syn-ake (postsynaptic) + argireline (presynaptic SNARE) → complementary mechanisms',
      ),
    ),
    researchFindings: lex(
      h3('In Vitro nAChR Inhibition'),
      p(t('Electrophysiological studies using patch-clamp recording from myotubes demonstrate syn-ake competitively inhibits nAChR channel opening in a dose-dependent manner: IC50 ~3–5 µM. At 10 µM (achievable in dermis), ACh-evoked end-plate potential amplitude is reduced by 50–60%. The reversibility of syn-ake inhibition (vs. irreversible enzymatic cleavage by BoNT-A) means the effect is concentration-dependent and immediately reversible upon removal.')),
      h3('Clinical Wrinkle Studies'),
      p(t('A manufacturer (DSM)-sponsored 28-day RCT of syn-ake serum (4%) vs. vehicle applied twice daily to forehead wrinkles in 45 volunteers showed: 52% reduction in the number of wrinkles by image analysis software, 29% reduction in wrinkle depth by profilometry, and self-assessed improvement in "relaxed" skin appearance by 63% of participants. These results are consistent with nAChR inhibition reducing expression muscle contraction amplitude over time.')),
      h3('Waglerin-1 Comparison'),
      p(t('Syn-ake was designed to match waglerin-1\'s nAChR binding affinity while eliminating the neurotoxic effects that limit the parent compound to research use. The cyclic structure and diaminobutyric acid modifications reduce receptor dwell time vs. waglerin-1 (preventing complete receptor blockade) while maintaining sufficient competitive inhibition for cosmetic muscle relaxation. Syn-ake has no lethal activity in standard toxicology assays.')),
      h3('Multi-peptide Combination Research'),
      ul(
        'Syn-ake + argireline: 55% wrinkle depth reduction at 8 weeks (vs. 35% argireline alone)',
        'Mechanism complementarity confirmed: pre- and post-synaptic inhibition fully additive',
        'No enhanced adverse effects in combination vs. single-peptide formulations',
        'Consumer acceptability: combination products rate higher for perceived efficacy in surveys',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('Syn-ake has an excellent safety profile from clinical studies and post-market surveillance. The nAChR competitive inhibition mechanism at cosmetic doses does not produce systemic neuromuscular blockade — the concentration reaching systemic circulation after topical application is orders of magnitude below the threshold for generalised nAChR inhibition. HRIPT in 25 volunteers showed no sensitisation potential.')),
      h3('Adverse Effects'),
      ul(
        'Local transient redness: <5% of users, usually resolves within 1 hour',
        'No muscle paralysis: cosmetic doses insufficient for complete NMJ blockade',
        'No ptosis: competitive (not irreversible) mechanism; facial muscle tone preserved',
        'No sensitisation: HRIPT and LLNA testing negative',
      ),
      h3('Regulatory Status'),
      p(t('INCI: Dipeptide Diaminobutyroyl Benzylamide Diacetate. EU Cosmetics Regulation approved ingredient. No concentration restrictions. FDA cosmetic ingredient. Globally available in luxury skincare products without prescription requirement. The "viper venom-inspired" marketing positioning is scientifically accurate but has been examined by regulators for substantiation — the mechanism is valid but the "snake venom" association requires careful marketing to avoid implied drug claims in some jurisdictions.')),
    ),
  },

  // ─── Thymalin ────────────────────────────────────────────────
  'thymalin': {
    mechanismOfAction: lex(
      h3('Thymus Polypeptide Bioregulator'),
      p(t('Thymalin (thymus humoral factor, THF) is a polypeptide extract from the thymic glands of young cattle, produced by acid extraction and purification at the St. Petersburg Institute of Bioregulation. Like cortexin (brain extract), thymalin is a complex mixture of bioactive peptides rather than a single defined molecule. Its primary biological activity targets T-cell maturation, immune homeostasis, and restoration of age-related immunosenescence — the progressive decline in thymic output and T-cell function that occurs from the third decade of life.')),
      h3('Thymic Hormone Mimicry'),
      p(t('Thymalin contains multiple thymic hormone-like peptides including fractions similar to thymosin alpha-1, thymulin, and other thymic polypeptides. These peptides interact with T-cell precursors and mature T-cells through glucocorticoid receptor, IL-2 receptor, and specific thymic hormone receptors, promoting: (1) T-cell differentiation and maturation in peripheral lymphoid tissue; (2) restoration of CD4/CD8 T-cell ratio toward youthful patterns; (3) enhanced NK cell activity; (4) improved antibody production by B-cells through T-cell helper function.')),
      h3('Immunological Targets'),
      ul(
        'Thymopoiesis restoration: promotes peripheral T-cell precursor maturation',
        'CD4+ T-cell increase: restores CD4/CD8 ratio toward youthful 2:1 pattern',
        'NK cell cytotoxicity: enhanced natural killer cell activity against tumour and viral targets',
        'B-cell antibody production: improved humoral immunity through T-helper restoration',
        'Cytokine balance: IL-2, IFN-γ normalisation; reduced immunosenescence-associated IL-6 elevation',
        'Autoimmunity modulation: regulatory T-cell (Treg) function support',
      ),
    ),
    pharmacokinetics: lex(
      h3('IM Administration'),
      p(t('Thymalin is administered exclusively by intramuscular injection (standardised to 10 mg per dose) — oral bioavailability is negligible due to polypeptide GI degradation. Following IM injection, thymalin peptide fractions are absorbed into systemic circulation within 1–2 hours, distributed to lymphoid organs (thymus, spleen, lymph nodes), and produce immunological effects over 24–72 hours. Plasma levels of individual thymalin peptides are not routinely measured; immune cell subset changes serve as biomarkers of activity.')),
      h3('Duration of Immunological Effects'),
      p(t('Unlike small molecule drugs, the immunological effects of thymalin persist well beyond peptide clearance due to gene expression and differentiation changes in T-cell populations. A 10-day course produces T-cell subset changes measurable for 3–6 months, supporting the twice-yearly course protocol used in longevity research. This is analogous to the sustained effects of vaccination or thymic export induction.')),
      h3('Clinical Protocols'),
      ul(
        'Standard course: 10 mg IM daily × 10 days; repeat every 6 months',
        'Immune deficiency: 5–20 mg IM daily × 14–28 days',
        'Oncology adjunct (research): 10 mg IM before/after chemotherapy cycles',
        'Paediatric: 1 mg/kg IM daily × 10 days',
      ),
    ),
    researchFindings: lex(
      h3('Longevity Research — St. Petersburg Cohort'),
      p(t('The most extensive thymalin research is the Khavinson group\'s 15-year cohort study of elderly patients (70–80 years at entry) receiving annual 10-day thymalin + epithalon courses. Treated patients showed: 28% lower cardiovascular mortality, 25% reduced cancer incidence, and 30% lower all-cause mortality at 15 years vs. age-matched untreated controls. These observational findings, while impressive, are subject to selection bias and require randomised trial confirmation.')),
      h3('Immune Function Restoration'),
      p(t('Multiple controlled studies demonstrate thymalin restores age-related immune decline: CD4+ T-cell counts increased by 30–40% after a 10-day course in patients with immunosenescence (CD4/CD8 <1.5); NK cell activity against K562 tumour cells increased 50%; serum IgG and IgA levels normalised in patients with age-related hypogammaglobulinaemia. These immune improvements were maintained for 3–6 months post-course.')),
      h3('Oncology Applications'),
      p(t('Thymalin as an immunomodulatory adjunct during chemotherapy has been studied in lung, ovarian, and colorectal cancer patients. Thymalin administration reduced chemotherapy-induced lymphopenia severity and accelerated immune recovery between cycles. Some studies report improved tumour response rates when thymalin was combined with chemotherapy vs. chemotherapy alone, attributed to restored anti-tumour NK and CD8+ T-cell function.')),
      h3('Infection and Vaccine Research'),
      ul(
        'Influenza: thymalin improves vaccine antibody response in elderly (seroconversion rate 15% higher)',
        'Post-surgical immunosuppression: thymalin accelerates immune recovery after major surgery',
        'HIV: early research showed CD4 count improvement in HIV patients; subsequent ART era limited this line',
        'Herpes zoster: reduced recurrence frequency with twice-yearly thymalin in immunosenescent patients',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Record'),
      p(t('Thymalin has an extensive clinical record from decades of use in Russia across tens of thousands of patients. Serious adverse events are extremely rare. As a thymic-derived polypeptide complex from bovine tissue, immunogenicity has been reported in <0.1% of patients (mild allergic reactions). No organ toxicity has been documented in published long-term studies.')),
      h3('Adverse Effects'),
      ul(
        'Injection site pain: IM injection; standard; ice application recommended',
        'Mild allergic reactions: rare; antihistamine pre-treatment can be considered in atopic patients',
        'Transient lymphadenopathy: mild; reflects immune activation; resolves in 2–4 weeks',
        'BSE/prion concern: same as cortexin (bovine-derived extract); theoretical risk managed by sourcing protocols',
      ),
      h3('Autoimmune Cautions'),
      p(t('Thymalin stimulates T-cell activity broadly — in patients with pre-existing autoimmune conditions, immune stimulation could theoretically exacerbate disease. There are no published case reports of autoimmune exacerbation with thymalin, but caution is appropriate in patients with active rheumatoid arthritis, SLE, or other autoimmune conditions. The Treg-supportive effects of thymic hormones may actually moderate autoimmunity — this balance is unstudied in prospective controlled trials.')),
    ),
  },

  // ─── Thymopentin ─────────────────────────────────────────────
  'thymopentin': {
    mechanismOfAction: lex(
      h3('Thymopoietin Active Pentapeptide'),
      p(t('Thymopentin (TP-5; Arg-Lys-Asp-Val-Tyr) is a synthetic 5-amino acid peptide corresponding to residues 32-36 of thymopoietin — the biologically active fragment of the 49-amino acid thymic hormone. Thymopoietin is produced by thymic epithelial cells and plays a central role in inducing the differentiation of prothymocytes into immunologically competent T-cells. Thymopentin retains the full immunomodulatory activity of intact thymopoietin while offering advantages of synthetic production, defined composition, and improved stability.')),
      h3('T-Cell Differentiation Mechanism'),
      p(t('Thymopentin binds to specific receptors on pre-T-cell precursors and triggers a differentiation programme: upregulation of CD2, CD3, CD4, and CD8 surface markers; induction of CD25 (IL-2R) expression enabling IL-2 responsiveness; and development of antigen-specific T-cell receptor (TCR) diversity. In peripheral blood, thymopentin restores the CD4/CD8 ratio toward 2:1 and enhances CD4+ T-helper cell helper function for both B-cell antibody production and CD8+ cytotoxic T-cell activation.')),
      h3('Downstream Immunological Effects'),
      ul(
        'T-cell maturation: pre-T cell → immunocompetent T cell differentiation induction',
        'CD4+/CD8+ ratio: restoration toward normal 2:1 in immunocompromised patients',
        'NK cell activity: enhanced NK cytotoxicity via IL-2-dependent NK activation',
        'B-cell help: CD4+ Th function restoration → improved antibody production',
        'Cytokine production: IL-2 and IFN-γ upregulation; IL-10 modulation',
        'MHC class II: upregulation on dendritic cells — improved antigen presentation',
      ),
    ),
    pharmacokinetics: lex(
      h3('SC and IM Administration'),
      p(t('Thymopentin is administered by SC or IM injection. Oral bioavailability is negligible. SC bioavailability is ~70–80%. Plasma half-life of the pentapeptide is approximately 30–40 minutes due to serum peptidase degradation. However, as with other thymic peptides, the immunological effects (T-cell differentiation changes) persist for days to weeks beyond peptide clearance through epigenetic T-cell programming.')),
      h3('Clinical Dosing Protocols'),
      p(t('For immune deficiency states: 50 mg SC 3× weekly for 6–12 weeks. For cancer adjunct immunomodulation: 50 mg IM daily or 3× weekly during/between chemotherapy cycles. For rheumatoid arthritis (studied in Asia): 10–50 mg SC 3× weekly for 3–6 months. A maintenance regimen of 50 mg weekly is used in some chronic immunodeficiency protocols.')),
      h3('Regulatory Status by Region'),
      ul(
        'China: approved drug (Thymopentin Injection, 50 mg/mL) for immunodeficiency and hepatitis B',
        'Italy: historically approved (Timunox) for immunostimulation; regulatory status evolved',
        'USA/EU: not approved; investigational status only',
        'Russia: available as research/experimental compound; not officially registered',
      ),
    ),
    researchFindings: lex(
      h3('HIV/AIDS Research (Pre-ART Era)'),
      p(t('The most extensive thymopentin clinical trials were conducted in the pre-ART era for HIV immunodeficiency. Multiple Phase 2/3 studies showed thymopentin increased CD4+ counts by 50–150 cells/µL and reduced opportunistic infections in AIDS-related complex patients. While these results were clinically meaningful in the pre-HAART era, the advent of effective antiretroviral therapy reduced interest in immunostimulatory adjuncts for HIV.')),
      h3('Hepatitis B — Clinical Evidence'),
      p(t('Thymopentin is approved in China for chronic hepatitis B (CHB) based on multiple domestic RCTs showing improved HBeAg seroconversion rates and ALT normalisation compared to placebo. Meta-analyses of Chinese studies (Song et al., 2013) demonstrated thymopentin + nucleoside analogue produced superior HBeAg loss rates vs. nucleoside analogue alone. These data have driven significant clinical use in China, though the quality of underlying trials varies.')),
      h3('Rheumatoid Arthritis'),
      p(t('Thymopentin\'s immunomodulatory rather than immunosuppressive mechanism led to studies in RA — the hypothesis being that thymic T-cell regulation could restore the immunological dysregulation underlying autoimmune disease. Several small trials showed modest reduction in RA disease activity (DAS28 improvement), but the effects were insufficient to compete with established DMARDs and biologics.')),
      h3('Cancer Adjunct'),
      ul(
        'Lung cancer (Chinese studies): improved NK cell activity during chemotherapy; reduced infection rate',
        'Colorectal cancer: immune recovery acceleration between chemotherapy cycles',
        'Immune biomarkers: consistent CD4+/NK improvement across cancer types in Chinese trials',
        'Survival data: limited; no definitive survival benefit in randomised controlled trials with modern standards',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Clinical Safety Profile'),
      p(t('Thymopentin has been used clinically in Asia (primarily China and Italy) for decades with an excellent safety record in thousands of patients. The most common adverse events are injection site reactions (pain, erythema at SC/IM sites) occurring in 5–10% of patients. Systemic adverse effects are uncommon and generally mild. No organ toxicity or carcinogenicity has been documented in long-term use.')),
      h3('Adverse Effects'),
      ul(
        'Injection site reactions: pain, redness, swelling — most common AE',
        'Fever: mild, transient; possibly immune activation-related',
        'Rash: rare; potential hypersensitivity; discontinue and assess',
        'Autoimmune exacerbation: theoretical; monitor in patients with autoimmune conditions',
      ),
      h3('Drug Interactions'),
      p(t('Thymopentin should be used cautiously with immunosuppressive drugs (cyclosporine, tacrolimus, corticosteroids) — the immunostimulatory effects of thymopentin directly antagonise pharmacological immunosuppression. In transplant patients, thymopentin could theoretically increase rejection risk if administered without careful immunological monitoring. This interaction has not been formally studied in controlled trials but represents a mechanistically predicted concern.')),
    ),
  },

  // ─── Thymulin ────────────────────────────────────────────────
  'thymulin': {
    mechanismOfAction: lex(
      h3('Zinc-Dependent Thymic Hormone'),
      p(t('Thymulin (FTS; facteur thymique sérique; nonapeptide Glu-Ala-Lys-Ser-Gln-Gly-Gly-Ser-Asn) is a zinc-dependent nonapeptide hormone produced exclusively by thymic epithelial cells. Unlike thymosin alpha-1 and thymopentin, thymulin is biologically active only when complexed with zinc (Zn²⁺) — the zinc ion chelated by the Glu-1 carboxylate, Gln-5 amide, and Asn-9 terminal groups. The thymulin-Zn²⁺ complex is the active hormone; the metal-free form (serum FTS, SFTS) is immunologically inactive.')),
      h3('T-Cell Maturation and Differentiation'),
      p(t('The thymulin-Zn²⁺ complex acts on specific surface receptors on thymocytes and peripheral T-cell precursors, inducing: (1) expression of T-cell differentiation antigens (CD2, CD3, TCR, CD4, CD8); (2) acquisition of alloreactivity and antigen responsiveness; (3) IL-2 secretion capacity and IL-2 receptor (CD25) expression; (4) NK cell maturation. These actions complement thymosin alpha-1 and thymosin beta-4, which also participate in T-cell development, but thymulin acts distinctively through its Zn²⁺-dependent receptor.')),
      h3('Zinc Dependency and Immunological Implications'),
      ul(
        'Zinc deficiency → inactive thymulin → T-cell maturation defect → immunodeficiency',
        'Zinc supplementation + thymulin: synergistic immunorestoration in deficient states',
        'Age-related zinc deficiency: plasma zinc declines 30–40% by age 70 → contributes to immunosenescence',
        'Thymulin bioassay: requires zinc chelation step to distinguish total from bioactive fraction',
        'Analogues: L-glutamic acid analogue (FTS analogue LQLISQ) with Zn²⁺ independent activity under development',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Kinetics and Zinc Requirement'),
      p(t('Thymulin circulates in plasma predominantly as inactive (zinc-free) FTS, with bioactive Zn²⁺-complexed thymulin representing a smaller fraction depending on plasma zinc status. Plasma thymulin concentration (measured by bioassay on thymocytes) peaks between ages 10–20 and declines progressively — reaching near-undetectable levels in humans over 70. Half-life of the synthetic peptide after SC injection is approximately 20–30 minutes; biological T-cell effects persist for 24–72 hours.')),
      h3('Synthetic Thymulin Administration'),
      p(t('Recombinant thymulin (as Zn-thymulin complex) can be administered SC or IM. Doses used in animal studies: 10–50 ng/mouse SC daily; human equivalent estimated at 1–5 µg/kg. Synthetic zinc-thymulin must be prepared in zinc-containing buffer (0.5–2 µM ZnSO4) to ensure bioactive complex formation before injection. Zinc supplementation (15–30 mg/day oral elemental zinc) has been studied as a way to increase bioactive thymulin from endogenous production.')),
      h3('Research Protocols'),
      ul(
        'Aged mouse immunorestoration: 10–50 ng/mouse SC × 10 days',
        'Human: no Phase 1/2 trials published for synthetic thymulin as of 2024',
        'Zinc + thymulin approach: 25 mg zinc gluconate/day for 3 months in elderly (increases bioactive thymulin)',
        'Thymulin bioassay: azathioprine-resistant thymocyte marker acquisition test',
      ),
    ),
    researchFindings: lex(
      h3('Immune Restoration in Aged Animals'),
      p(t('Dardenne et al. (1982–2000) conducted extensive studies demonstrating that: thymulin production is thymic-exclusive, declines with age in parallel with thymic involution, and restoration of thymulin in aged mice (by thymic grafts, zinc supplementation, or exogenous thymulin) partially restores T-cell function. Zinc supplementation in elderly humans with low plasma zinc increased measured thymulin bioactivity and improved CD4+/CD8+ T-cell ratios — linking zinc nutrition to immune ageing through the thymulin pathway.')),
      h3('Neuroprotection Research'),
      p(t('An unexpected and extensively studied function of thymulin is neuroprotection — particularly anti-nociceptive (pain-reducing) effects. Intracerebral thymulin reduces thermal hyperalgesia and inflammatory pain in rodent models, acting through inhibitory effects on spinal cord pain circuits. The neuroprotective mechanism involves thymulin modulation of microglial activation and cytokine production in CNS inflammatory contexts. Thymulin receptors have been identified in brain regions regulating pain (PAG, spinal cord).')),
      h3('Fertility and Reproductive Immunology'),
      p(t('Thymulin plays an underappreciated role in reproductive immunology: thymulin receptor expression in ovarian granulosa cells modulates follicular development and steroidogenesis; thymic involution at menopause correlates with reproductive immunological changes. Animal studies show thymulin deficiency impairs implantation (immune tolerance of the embryo is thymulin-dependent), and thymulin restoration in thymusectomised female mice restores normal pregnancy rates.')),
      h3('Autoimmunity and Tolerance'),
      ul(
        'Central tolerance: thymulin-driven clonal deletion of autoreactive T-cells in thymus',
        'Type 1 diabetes: thymulin deficiency accelerates islet autoimmunity in NOD mice',
        'Thymulin supplementation: delays T1D onset in NOD model by 25–40%',
        'Treg induction: thymulin promotes FoxP3+ regulatory T-cell development in thymus',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('Thymulin has not undergone formal Phase 1 clinical trials as a synthetic compound. Safety data derive from animal studies and indirect human evidence from zinc supplementation trials (which raise endogenous bioactive thymulin). Thymulin is an endogenous hormone produced in healthy individuals — theoretical immunogenicity against recombinant thymulin is minimal. No significant organ toxicity has been documented in animal studies at research doses.')),
      h3('Zinc Interaction Safety'),
      ul(
        'Zinc toxicity: excessive zinc supplementation (>40 mg/day elemental zinc long-term) can cause copper deficiency and anaemia',
        'Thymulin-zinc combination: recommended zinc at RDA level (8–11 mg/day) to avoid excess',
        'Immune overstimulation: theoretical risk with supraphysiological thymulin doses',
        'GI effects of oral zinc supplementation: nausea (30%), metallic taste (20%), particularly on empty stomach',
      ),
      h3('Research Limitations and Future'),
      p(t('The major research gap for thymulin is the absence of human clinical trials with synthetic thymulin itself. The strong animal data and the compelling mechanistic rationale (thymic hormone restoration in ageing/immunodeficiency) make thymulin an interesting candidate for human study. Current interest focuses on: (1) thymulin mimetics that do not require zinc for activity; (2) combination with zinc supplementation for elderly immune restoration; (3) neuroprotective applications building on the pain and neuroinflammation research.')),
    ),
  },

  // ─── Vilon ───────────────────────────────────────────────────
  'vilon': {
    mechanismOfAction: lex(
      h3('Vascular Targeting Dipeptide Bioregulator'),
      p(t('Vilon (Lys-Glu) is a synthetic dipeptide developed by Khavinson et al. at the St. Petersburg Institute of Bioregulation as a tissue-specific bioregulator primarily targeting vascular endothelium. It is the simplest of the Khavinson peptide bioregulators and corresponds to a sequence found in vascular regulatory proteins. Like other short peptide bioregulators (cortagen, pinealon, epithalon), vilon is proposed to interact directly with chromatin regulatory elements in endothelial cells, restoring gene expression patterns that decline with age.')),
      h3('Endothelial Gene Regulation'),
      p(t('Vilon has been shown to interact with the promoter regions of endothelial nitric oxide synthase (eNOS) and E-selectin genes in endothelial cell chromatin immunoprecipitation studies. The proposed mechanism: the Lys-Glu dipeptide inserts into the minor groove of specific AT-rich DNA sequences in vascular regulatory gene promoters, stabilising transcription factor binding and restoring age-related decline in eNOS expression. The net effect is improved endothelial NO production, reduced inflammatory adhesion molecule expression, and improved vascular homeostasis.')),
      h3('Vascular and Immune Targets'),
      ul(
        'eNOS upregulation: improved NO production → vasodilation, anti-platelet, anti-inflammatory',
        'E-selectin downregulation: reduced leukocyte rolling and adhesion to endothelium',
        'VEGF modulation: balanced pro-angiogenic signalling in ischaemic tissues',
        'T-lymphocyte influence: some immunomodulatory activity via lymphocyte Lys-Glu receptor',
        'Anti-apoptotic: Bcl-2 upregulation in endothelial cells under oxidative stress',
        'Collagen: vascular collagen-IV synthesis support for basement membrane integrity',
      ),
    ),
    pharmacokinetics: lex(
      h3('Stability of Lys-Glu Dipeptide'),
      p(t('As the simplest bioactive dipeptide, Lys-Glu has theoretical susceptibility to dipeptidyl peptidases in plasma. However, Lys-Glu is also a substrate for peptide transporters (PepT1, PepT2) that mediate rapid intracellular uptake, potentially conferring tissue distribution before complete plasma degradation. Plasma half-life is estimated at 5–10 minutes. As a dipeptide, it is both small enough to clear renal filtration and actively transported — producing complex PK dynamics.')),
      h3('Administration Routes'),
      p(t('Vilon is administered by SC injection or sublingually in research protocols. The Khavinson research group predominantly uses SC injection at 0.1–1 mg/day for 10-day courses. Sublingual administration is explored for convenience: the oral mucosal route bypasses GI dipeptidase degradation, achieving estimated 15–20% bioavailability via buccal absorption. Intranasal delivery (for direct CNS/vascular access) has also been studied in animal models.')),
      h3('Research Protocols'),
      ul(
        'SC injection: 0.1–1 mg/day × 10 days, twice yearly (standard Khavinson protocol)',
        'Sublingual: 5–10 mg/day × 10 days',
        'Combination: often used alongside epithalon, thymalin, and cortagen in polypeptide protocols',
        'Animal studies: 0.01–0.1 mg/kg SC for vascular endpoints',
      ),
    ),
    researchFindings: lex(
      h3('Endothelial Function Research'),
      p(t('Khavinson group studies demonstrate vilon (Lys-Glu) upregulates eNOS mRNA 1.5–2× and protein 1.3–1.7× in cultured human umbilical vein endothelial cells (HUVECs) at 1–10 µM concentrations, associated with increased NO production measured by Griess assay. In aged endothelial cells with reduced baseline eNOS expression, vilon restored eNOS to near-young levels — the proposed cellular basis for vascular ageing reversal.')),
      h3('Longevity and Anti-ageing Research'),
      p(t('In the Khavinson longitudinal study of aged patients receiving annual courses of the multi-peptide combination (epithalon + thymalin + vilon + cortagen), vilon-treated animals showed preserved endothelial function (flow-mediated dilation) at 24 months vs. untreated aged controls. Plasma markers of endothelial activation (sE-selectin, sICAM-1) were 25–30% lower in the multi-peptide group, consistent with vilon\'s anti-inflammatory endothelial effects.')),
      h3('Immune Modulation'),
      p(t('Separate from its vascular targets, vilon was initially characterised as a T-lymphocyte modulator — it promotes differentiation of CD4+ T-cells and enhances IL-2 production. The immunological and endothelial effects may be related: endothelial-T-cell crosstalk through adhesion molecules and cytokines is regulated by both pathways that vilon appears to modulate. This dual vascular/immune action distinguishes vilon from the more tissue-specific bioregulators like cortagen (CNS) and epithalon (pineal).')),
      h3('Tumour Research'),
      ul(
        'Anti-proliferative: vilon reduces S-phase entry in some cancer cell lines in vitro',
        'Oncostatic: reduced mammary tumour development in DMBA-treated rats with vilon',
        'Mechanism: reduced VEGF in tumour vasculature; anti-angiogenic effect',
        'No direct cytotoxicity: vilon anti-tumour effect through vascular and immune normalisation',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety of the Simplest Bioregulator'),
      p(t('Vilon\'s safety profile is expected to be the most favourable of the Khavinson bioregulators given it is only a dipeptide — metabolised to the naturally occurring amino acids lysine and glutamic acid. No organ toxicity has been documented in animal studies at research doses. No immunogenicity to the dipeptide has been observed. The absence of unusual chemical modifications (unlike PEGylated or fatty acid-conjugated peptides) further reduces theoretical safety concerns.')),
      h3('Known Adverse Effects'),
      ul(
        'Injection site reactions: mild; expected for any SC injection',
        'No systemic adverse effects reported in published Khavinson studies',
        'No hormonal effects: unlike pituitary-targeting peptides',
        'No known drug interactions',
      ),
      h3('Evidentiary Status'),
      p(t('Vilon shares the same evidentiary limitations as other Russian peptide bioregulators: research published primarily by the developing institution, absence of independent Phase 2/3 trials with rigorous design, and lack of Western regulatory approval. The mechanistic model (promoter DNA interaction for gene regulation) is consistent with known peptide-DNA minor groove binding phenomena, but requires independent structural and functional validation. Vilon is available as a research compound without drug approval in major Western markets.')),
    ),
  },
}
