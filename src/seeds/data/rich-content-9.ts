/**
 * Rich content batch 9 — 10 peptides
 * adrenomedullin, anp, bnp, cholecystokinin, crh,
 * endothelin-1, enkephalins, relaxin-2, apelin, anserine
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

export const richContent9 = {

  // ─── Adrenomedullin ──────────────────────────────────────────
  'adrenomedullin': {
    mechanismOfAction: lex(
      h3('Multi-Receptor Vasodilatory Peptide'),
      p(t('Adrenomedullin (ADM) is a 52-amino acid peptide belonging to the calcitonin gene-related peptide (CGRP) superfamily, first isolated from human phaeochromocytoma tissue in 1993 by Kitamura et al. It is ubiquitously produced by vascular endothelium, smooth muscle, cardiac myocytes, adrenal cortex, kidneys, and lungs. ADM acts through a receptor complex: calcitonin receptor-like receptor (CLR) paired with receptor activity-modifying protein 2 (RAMP2) forms AM1 receptor, and CLR + RAMP3 forms AM2 receptor. Both signal via Gαs → cAMP.')),
      h3('Cardiovascular and Endothelial Actions'),
      p(t('The primary action of ADM is potent, prolonged vasodilation. In vascular endothelium, cAMP activates eNOS generating NO, and also PKA-mediated vasodilation via smooth muscle KATP channel opening. ADM reduces vascular permeability by maintaining endothelial tight junctions — a critical function during sepsis where ADM preserves the endothelial barrier and reduces capillary leak.')),
      h3('Pleiotropic Effects'),
      ul(
        'Vasodilation: among the most potent endogenous vasodilators, equal to CGRP',
        'Anti-permeability: endothelial barrier stabilisation; anti-oedema',
        'Anti-fibrosis: reduces TGF-β1-induced collagen deposition in heart and kidney',
        'Natriuresis and diuresis: renal ADM receptors promote sodium excretion',
        'Anti-apoptotic: PI3K/Akt survival signalling in cardiomyocytes and endothelium',
        'Lymphangiogenesis: RAMP2/CLR in lymphatic endothelium essential for lymphatic development',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Kinetics'),
      p(t('ADM has a plasma half-life of approximately 20–30 minutes — substantially longer than most vasopeptides — due to the disulfide ring structure that confers partial protease resistance. Circulating ADM is predominantly bound to complement factor H (acting as an ADM binding protein), extending the apparent half-life and creating a large bioavailable reservoir. Free (bioactive) ADM is a small fraction of total immunoreactive ADM.')),
      h3('MR-proADM as Biomarker'),
      p(t('Because ADM is rapidly degraded during sample handling, clinical studies measure MR-proADM (mid-regional pro-adrenomedullin; residues 45-92 of pre-pro-ADM) — a stable surrogate for ADM production. MR-proADM is a validated biomarker for sepsis severity, heart failure prognosis (superior to BNP in some comparisons), and CAP (community-acquired pneumonia) risk stratification.')),
      h3('Therapeutic Delivery'),
      ul(
        'IV infusion research: 10–50 pmol/kg/min; dose-proportional vasodilation',
        'Adrecizumab (anti-ADM antibody): paradoxically stabilises ADM bioactivity by preventing CLR cleavage',
        'Recombinant ADM peptide: SC and IV for experimental cardiovascular and sepsis studies',
        'MR-proADM: >2 nmol/L threshold associated with increased 30-day sepsis mortality',
      ),
    ),
    researchFindings: lex(
      h3('Sepsis and Vasodilatory Shock'),
      p(t('ADM is massively upregulated in sepsis (10–100× normal levels) — contributing to the characteristic vasodilation and hypotension of septic shock. Paradoxically, anti-ADM antibodies (adrecizumab) improve outcomes in experimental sepsis by stabilising ADM\'s endothelial barrier function while moderating excessive vasodilation. The ADRENOSS-2 Phase 2 trial showed adrecizumab improved MAP and organ perfusion in septic shock patients with high MR-proADM.')),
      h3('Heart Failure'),
      p(t('ADM is upregulated in heart failure proportionally to disease severity. IV ADM infusion in heart failure patients reduces pulmonary artery pressure (20%), pulmonary capillary wedge pressure (25%), and systemic vascular resistance, while increasing cardiac output by 30–40% — a haemodynamic profile similar to nitroprusside but sustained and without tolerance. Phase 2 data support feasibility; larger trials ongoing.')),
      h3('Pre-eclampsia and Obstetric Research'),
      p(t('RAMP2/CLR (AM1 receptor) is essential for placental vascular development. RAMP2 heterozygous knockout mice develop placental insufficiency and pre-eclampsia-like syndrome. In human pre-eclampsia, ADM and RAMP2 are downregulated, and placental ADM signalling is impaired. This has generated interest in ADM as a therapeutic target for pre-eclampsia prevention.')),
      h3('Fibrosis and Organ Protection'),
      ul(
        'Renal fibrosis: ADM reduces TGF-β1-mediated tubulointerstitial fibrosis in CKD models',
        'Cardiac fibrosis: anti-fibrotic in pressure overload and myocardial infarction models',
        'Pulmonary hypertension: AM1 receptor on pulmonary artery smooth muscle; anti-proliferative',
        'Ischaemia-reperfusion: cardiomyocyte apoptosis reduced by ADM pre-treatment',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('IV Infusion Safety'),
      p(t('ADM IV infusion in human studies is well tolerated at haemodynamically active doses. The primary adverse effect is dose-proportional hypotension, managed by titration. Reflex tachycardia is common. Flushing and headache occur in 20–30% of subjects. No significant adverse effects on liver, kidney, or haematological parameters have been reported in published clinical studies.')),
      h3('Dose-Limiting Effects'),
      ul(
        'Hypotension: vasodilation-mediated; dose-limiting at >50 pmol/kg/min in HF patients',
        'Tachycardia: baroreflex activation; usually mild',
        'Flushing: CGRP superfamily class effect',
        'Headache: CGRP-like vasodilatory headache mechanism',
      ),
      h3('Therapeutic Window'),
      p(t('The therapeutic window for ADM infusion in heart failure and sepsis research appears adequate — haemodynamically beneficial doses are achievable without severe hypotension with careful titration. The development of adrecizumab (anti-ADM antibody) represents a pharmacologically distinct approach: by binding and stabilising circulating ADM, it enhances the endothelial barrier function while moderating systemic vasodilation, potentially offering a more controllable risk-benefit profile.')),
    ),
  },

  // ─── ANP ─────────────────────────────────────────────────────
  'anp': {
    mechanismOfAction: lex(
      h3('Atrial Natriuretic Peptide — Volume Regulation'),
      p(t('Atrial natriuretic peptide (ANP; atrial natriuretic factor, ANF) is a 28-amino acid peptide produced and stored in atrial cardiac myocytes, released in response to atrial wall stretch (increased intracardiac pressure/volume). ANP is the primary natriuretic peptide in cardiac physiology. It acts through natriuretic peptide receptor A (NPRA, also called NPR1) — a transmembrane guanylyl cyclase — generating cGMP as the second messenger in kidney, vasculature, and adrenal targets.')),
      h3('NPRA/cGMP Signalling'),
      p(t('NPRA activation by ANP generates cGMP, which activates protein kinase G (PKG). In the kidney: PKG phosphorylates aquaporin-2 and Na+/K+-ATPase, reducing tubular sodium and water reabsorption, increasing urinary sodium excretion (natriuresis) and urine output (diuresis). In the vasculature: cGMP/PKG relaxes vascular smooth muscle via MLCP dephosphorylation and KATP channel opening, producing vasodilation. In the adrenal: cGMP suppresses aldosterone synthesis.')),
      h3('Integrated Cardiovascular Actions'),
      ul(
        'Kidney: natriuresis and diuresis → volume contraction → reduced preload',
        'Vasculature: arterial and venous vasodilation → reduced afterload and preload',
        'Heart: negative chronotropy and reduced cardiac output (indirect; volume reduction)',
        'Adrenal: aldosterone suppression → sustained natriuresis',
        'RAAS: renin suppression (reduced juxtaglomerular RAAS activation)',
        'SNS: reduced sympathetic outflow to kidney (central NPR in brain)',
      ),
    ),
    pharmacokinetics: lex(
      h3('Endogenous ANP Kinetics'),
      p(t('ANP has a plasma half-life of approximately 2–3 minutes, cleared by: (1) NPRC (clearance receptor) — internalisation and lysosomal degradation; (2) neutral endopeptidase (neprilysin/NEP, CD10) — enzymatic cleavage of the ring structure. This rapid clearance maintains tight ANP regulation matching atrial stretch signals. Plasma ANP ranges from 10–100 pg/mL in healthy adults, rising to 100–3000 pg/mL in heart failure.')),
      h3('Recombinant ANP Therapeutics'),
      p(t('Carperitide (recombinant human ANP) is approved in Japan for acute decompensated heart failure (ADHF) at 0.1 mcg/kg/min IV continuous infusion. Nesiritide (recombinant human BNP) is FDA-approved for similar indications. The 2011 ASCEND-HF trial of nesiritide (the BNP equivalent) showed symptom improvement without mortality benefit, dampening enthusiasm for natriuretic peptide replacement in HF.')),
      h3('NEP Inhibition — Sacubitril'),
      ul(
        'Sacubitril (valsartan/sacubitril = Entresto): NEP inhibitor + ARB combination',
        'Inhibiting NEP raises endogenous ANP, BNP, and CNP — enhancing natriuresis and vasodilation',
        'PARADIGM-HF trial: 20% CV mortality reduction vs. enalapril in HFrEF',
        'ANP elevation with sacubitril: 2–4× above baseline; CNP elevation especially prominent',
      ),
    ),
    researchFindings: lex(
      h3('Heart Failure Biomarker — BNP vs. ANP'),
      p(t('Both ANP and BNP (brain natriuretic peptide) are elevated in heart failure proportional to ventricular wall stress. ANP primarily reflects atrial pressure (preload); BNP (and NT-proBNP) reflects ventricular wall stress. Clinical practice favours BNP/NT-proBNP for HF diagnosis and prognosis due to longer half-life and better stability in plasma handling. ANP is a superior marker for atrial overload (atrial fibrillation, atrial compliance).')),
      h3('Acute Myocardial Infarction'),
      p(t('ANP is released acutely after myocardial infarction from ischaemic atrial and ventricular myocytes. Post-MI ANP elevation is a marker of ventricular dysfunction severity and adverse remodelling risk. ANP infusion in rodent MI models reduces infarct size and adverse remodelling by: reducing oxidative stress (via cGMP/PKG anti-oxidant pathways), reducing cardiomyocyte apoptosis, and limiting early inflammatory infiltration.')),
      h3('Hypertension and Renal Protection'),
      p(t('In essential hypertension, ANP infusion reduces blood pressure by 10–20 mmHg and increases urinary sodium excretion. In diabetic nephropathy models, enhanced ANP signalling (via NEP inhibition or NPRA agonism) reduces glomerular hyperfiltration, albuminuria, and tubulointerstitial fibrosis. The renoprotective mechanism involves reduced angiotensin II activation of mesangial cells via cGMP-mediated Ang II receptor downregulation.')),
      h3('Adipose and Metabolic Research'),
      ul(
        'Adipocyte NPRA: ANP stimulates lipolysis and fatty acid oxidation in adipocytes',
        'Exercise ANP: cardiac ANP released during exercise promotes fat mobilisation',
        'Obesity paradox: obese individuals have blunted ANP response to stretch; ANP deficiency may contribute to metabolic syndrome',
        'ANP and insulin resistance: NPRA activation improves skeletal muscle insulin sensitivity via cGMP-AMPK pathway',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('IV ANP Safety Profile'),
      p(t('Carperitide (recombinant ANP) has an extensive safety record from Japanese clinical use over 20+ years. The most significant adverse effect is hypotension — dose-proportional and the primary dose-limiting factor. Standard monitoring includes continuous blood pressure measurement during infusion. At approved doses (0.1 mcg/kg/min), significant hypotension occurs in 5–10% of ADHF patients.')),
      h3('Adverse Effects'),
      ul(
        'Hypotension: most common dose-limiting adverse effect',
        'Tachycardia: baroreflex response to vasodilation',
        'Headache: vasodilation-mediated; usually mild',
        'Renal function: high-dose ANP paradoxically reduces GFR by reducing glomerular hydrostatic pressure below tubular pressure threshold',
      ),
      h3('Renal Considerations'),
      p(t('The renal effects of ANP are biphasic: low doses (physiological) promote natriuresis and maintain GFR; high doses reduce afferent arteriolar resistance excessively, dropping glomerular filtration pressure. In decompensated heart failure with very low renal perfusion pressure, ANP infusion occasionally worsens renal function — requiring careful dose titration and creatinine monitoring.')),
    ),
  },

  // ─── BNP ──────────────────────────────────────────────────────
  'bnp': {
    mechanismOfAction: lex(
      h3('Ventricular Wall Stress Natriuretic Peptide'),
      p(t('Brain natriuretic peptide (BNP; B-type natriuretic peptide) is a 32-amino acid peptide hormone primarily produced by ventricular cardiomyocytes in response to increased wall stress — pressure overload, volume overload, and myocyte stretch. Despite the "brain" misnomer (it was first identified in porcine brain), >95% of circulating BNP originates from ventricular myocardium. BNP acts through the same receptor as ANP: NPRA/NPR1, generating cGMP.')),
      h3('BNP Synthesis and Processing'),
      p(t('BNP is rapidly synthesised (de novo transcription within hours of stretch stimulus, unlike ANP which is pre-stored in atrial granules) and released as the precursor proBNP(1-108), which is cleaved by corin and furin to generate BNP(1-32) (biologically active) and NT-proBNP(1-76) (inactive N-terminal fragment used as a diagnostic biomarker). NT-proBNP has a half-life of 60–90 minutes vs. 20 minutes for BNP, making NT-proBNP the preferred clinical diagnostic.')),
      h3('Biological Actions via cGMP'),
      ul(
        'Kidney: natriuresis and diuresis via tubular PKG activation (same mechanism as ANP)',
        'Vasculature: arterial and venous vasodilation → reduced preload and afterload',
        'Heart: anti-hypertrophic and anti-fibrotic via cGMP/PKG in fibroblasts and myocytes',
        'Aldosterone: suppresses angiotensin II-stimulated aldosterone synthesis',
        'Anti-fibrosis: reduces TGF-β1-mediated cardiac and renal fibroblast activation',
        'CNS: NPRA in hypothalamus modulates sympathetic tone and appetite',
      ),
    ),
    pharmacokinetics: lex(
      h3('BNP vs. NT-proBNP Kinetics'),
      p(t('BNP(1-32) has a plasma half-life of 20 minutes, cleared by NPRC and neutral endopeptidase (NEP). NT-proBNP has a half-life of 60–120 minutes, cleared primarily by renal filtration (explaining why NT-proBNP rises disproportionately in renal failure). These kinetic differences affect the choice of assay: BNP reflects more acute ventricular stress changes; NT-proBNP is preferred for monitoring in CKD due to more predictable relationship with GFR.')),
      h3('Reference Ranges and Clinical Thresholds'),
      p(t('Healthy adults: BNP <35 pg/mL; NT-proBNP <125 pg/mL (age-adjusted). Acute heart failure rule-out: BNP <100 pg/mL (sensitivity 96%, specificity 62%); NT-proBNP <300 pg/mL (sensitivity 99%). Age-stratified NT-proBNP rule-in thresholds: <50 years = 450 pg/mL; 50-75 years = 900 pg/mL; >75 years = 1800 pg/mL (ESC guidelines). These thresholds are among the most widely used in emergency cardiology.')),
      h3('Nesiritide (Recombinant BNP)'),
      ul(
        'Nesiritide: recombinant human BNP, FDA-approved for ADHF at 2 mcg/kg IV bolus + 0.01 mcg/kg/min',
        'Half-life: 18 minutes with nesiritide infusion',
        'ASCEND-HF (2011): symptom improvement without mortality benefit; dampened enthusiasm',
        'Sacubitril (NEP inhibitor): raises endogenous BNP; preferred mechanism for BNP-mediated benefit',
      ),
    ),
    researchFindings: lex(
      h3('Heart Failure Diagnostics'),
      p(t('BNP and NT-proBNP transformed acute dyspnoea diagnosis. The landmark Breathing Not Properly trial (2002) demonstrated BNP measurement in the ED reduced time to appropriate treatment and cost of care vs. clinical assessment alone. Subsequent studies confirmed BNP/NT-proBNP is superior to clinical examination alone for HF diagnosis — AUC 0.90 vs. 0.75 for clinical assessment.')),
      h3('Prognosis and Risk Stratification'),
      p(t('BNP and NT-proBNP predict all-cause mortality in HF, post-MI, and community populations independently of ejection fraction. GUIDE-IT and PRIMA trials evaluated BNP-guided therapy intensification: BNP-guided treatment reduced HF hospitalisation by 20–25% in optimally selected populations. NT-proBNP trajectory (decreasing with treatment) is a stronger prognostic marker than single absolute values.')),
      h3('Anti-Fibrotic Research'),
      p(t('Beyond its haemodynamic role, BNP has direct anti-fibrotic effects on cardiac and renal fibroblasts via cGMP/PKG suppression of TGF-β1 and CTGF signalling. Recombinant BNP reduces cardiac fibrosis after MI in rodent models independently of blood pressure effects. This anti-remodelling property explains why natriuretic peptide augmentation (via NEP inhibition with sacubitril) reverses cardiac fibrosis in PARADIGM-HF patients.')),
      h3('Cardiometabolic Research'),
      ul(
        'Low BNP in obesity: adipose tissue increases BNP degradation; obese patients have lower BNP per unit cardiac stress',
        'Testosterone and BNP: androgens suppress BNP gene transcription (explains men <women in HF BNP levels)',
        'Exercise BNP: acute rise with exercise in HF patients; recovery rate predicts functional capacity',
        'SARS-CoV-2 myocarditis: BNP/NT-proBNP elevation correlates with COVID-cardiac involvement severity',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Nesiritide Clinical Safety'),
      p(t('Nesiritide has been the most extensively studied recombinant natriuretic peptide in clinical trials. The primary safety concern that emerged was hypotension (dose-dependent, occurring in 5–20% of patients) and a potential signal for worsened renal function in some analyses. The 2011 ASCEND-HF RCT (7,141 patients) definitively showed nesiritide was safe on mortality and renal function endpoints, though without mortality benefit.')),
      h3('Adverse Effects'),
      ul(
        'Hypotension: dose-limiting; blood pressure monitoring required during infusion',
        'Headache: vasodilatory; resolves after infusion cessation',
        'Nausea: mild; not dose-related',
        'Renal effects: initially controversial; ASCEND-HF showed no significant worsening',
      ),
      h3('BNP as Biomarker — Pre-analytical Considerations'),
      p(t('BNP measurement requires EDTA tubes and immediate cold centrifugation — plasma BNP degrades rapidly at room temperature. A known false positive source: nesiritide infusion markedly elevates BNP assay results for up to 24 hours post-infusion (as the recombinant molecule cross-reacts with BNP antibodies) — NT-proBNP should be used for monitoring treated patients. Analytical interference from heterophilic antibodies is rare but documented.')),
    ),
  },

  // ─── Cholecystokinin ─────────────────────────────────────────
  'cholecystokinin': {
    mechanismOfAction: lex(
      h3('Gut Hormone and Satiety Signal'),
      p(t('Cholecystokinin (CCK) is a gut peptide hormone existing as multiple bioactive molecular forms (CCK-8, CCK-33, CCK-58) produced by enteroendocrine I-cells of the duodenum and proximal jejunum in response to dietary protein and fat (particularly long-chain fatty acids and amino acids, especially phenylalanine and tryptophan). It acts through two GPCRs: CCK1R (predominantly GI tract and vagal afferents) and CCK2R (brain, stomach, and pancreas), both Gαq-coupled.')),
      h3('Gastrointestinal Actions'),
      p(t('CCK orchestrates postprandial digestive function: at the gallbladder, CCK1R stimulates contraction and bile release into the duodenum (essential for fat emulsification); at the pancreas, CCK1R (and CCK2R) stimulate exocrine enzyme secretion (lipase, amylase, trypsinogen); at the stomach, CCK1R inhibits gastric emptying and acid secretion. These coordinated actions optimise nutrient digestion and absorption timing.')),
      h3('Satiety Signalling — Vagal Axis'),
      ul(
        'Vagal afferents: CCK1R on nodose ganglion neurons → meal termination signal to NTS',
        'Hypothalamus: CCK in arcuate and PVN nuclei → POMC activation, NPY suppression',
        'CCK-GLP-1 synergy: co-released from I/L-cells; combined satiety potentiation',
        'Leptin interaction: CCK satiety effect requires intact leptin signalling',
        'CCK-gastrin family: CCK2R = gastrin receptor; gastrin and CCK share this receptor',
      ),
    ),
    pharmacokinetics: lex(
      h3('Endogenous CCK Kinetics'),
      p(t('Circulating CCK has a plasma half-life of approximately 2–5 minutes, degraded by serum proteases. However, meal-stimulated CCK elevation persists for 30–60 minutes due to continued I-cell secretion. Plasma CCK concentrations rise from fasting ~1-2 pM to postprandial peaks of 5–15 pM with normal meals, and higher with protein- or fat-rich meals.')),
      h3('CCK-8 as Research Tool'),
      p(t('The sulphated octapeptide CCK-8s (CCK-8 with tyrosine-7 sulphation) is the minimal biologically active fragment retaining full CCK1R/CCK2R potency. It is widely used in research as a CCK agonist: IV infusion at 0.5–4 ng/kg/min inhibits food intake, stimulates pancreatic secretion, and activates CNS satiety circuits. Sublingual CCK-8 has been tested for appetite suppression in obesity.')),
      h3('CCK Antagonists (Research Tools)'),
      ul(
        'Devazepide (MK-329): selective CCK1R antagonist; used to confirm CCK1R-mediated satiety',
        'L-365,260: selective CCK2R antagonist; used to characterise CCK2R gastric and CNS roles',
        'Loxiglumide: CCK1R antagonist; studied in clinical trials for IBS and pancreatitis',
        'Proglumide: weak CCK1R/CCK2R antagonist; historically studied for peptic ulcer',
      ),
    ),
    researchFindings: lex(
      h3('Satiety and Obesity Research'),
      p(t('The satiety role of CCK is among the best characterised of any gut peptide. Peripheral CCK infusion at physiological doses consistently reduces meal size by 15–40% in lean and obese humans — one of the earliest demonstrations that a peripheral peptide can regulate appetite. The devazepide studies confirming that CCK1R blockade increases meal size were landmark experiments in gut-brain communication.')),
      h3('Anxiety and CCK2R in Psychiatry'),
      p(t('CCK2R is expressed in amygdala, hippocampus, and cortex. Peripherally administered CCK (as pentagastrin or CCK-4) produces intense panic-like anxiety in humans at doses well below those producing GI effects. This CCK-induced panic is used as a pharmacological probe for anxiety vulnerability, PTSD, and panic disorder. CCK2R antagonists (CI-988, LY288513) showed anxiolytic effects in early clinical trials.')),
      h3('Gallbladder Disease'),
      p(t('CCK secretion deficiency (measured by low postprandial CCK elevation or gallbladder ejection fraction below 35% in response to sincalide/CCK-8 infusion) is associated with acalculous gallbladder dysfunction and biliary dyskinesia. Exogenous CCK (sincalide) injection during HIDA scintigraphy (cholecystokinin cholescintigraphy) is the clinical standard for gallbladder function assessment.')),
      h3('Pancreatic Research'),
      ul(
        'Acinar cell trophism: CCK is the primary growth factor for pancreatic acinar cells',
        'Pancreatitis: paradoxically, extreme CCK stimulation triggers premature intracellular enzyme activation',
        'Pancreatic cancer: CCK2R overexpression in pancreatic cancer promotes proliferation',
        'Cholecystokin-oma (PPoma): CCK-secreting neuroendocrine tumours cause recurrent pancreatitis',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('CCK Infusion Safety'),
      p(t('Sincalide (CCK-8) infused for diagnostic or research purposes is generally well tolerated. At standard diagnostic doses (0.02 mcg/kg IV), abdominal cramping occurs in 50% of subjects, nausea in 15%, and dizziness in 10%. Higher research doses (>0.1 mcg/kg) can trigger vomiting and more severe abdominal pain. Slowing infusion rate substantially reduces these adverse effects.')),
      h3('Endogenous CCK Pathological Effects'),
      ul(
        'Pancreatitis: high-fat meal CCK surge → premature pancreatic enzyme activation',
        'Gallbladder spasm: CCK1R hyperstimulation with cholelithiasis can trigger biliary colic',
        'CCK panic attacks: CCK-4/pentagastrin can trigger panic disorder in susceptible individuals',
        'CCK resistance: obesity is associated with reduced CCK satiety response — potential mechanism for hyperphagia',
      ),
      h3('CCK Receptor Agonist Development'),
      p(t('Oral CCK1R agonists have been developed for obesity treatment. SR146131 and GSK1838262 showed appetite-reducing effects in Phase 1/2 trials but dose-limiting GI adverse effects (nausea, vomiting, abdominal cramps) at therapeutically effective doses prevented advancement. The GI effects represent on-target CCK1R pharmacology in the gut at doses needed for CNS satiety — separating these effects is the primary challenge for CCK-based therapeutics.')),
    ),
  },

  // ─── CRH ─────────────────────────────────────────────────────
  'crh': {
    mechanismOfAction: lex(
      h3('Stress Axis Master Regulator'),
      p(t('Corticotropin-releasing hormone (CRH; corticotropin-releasing factor, CRF) is a 41-amino acid hypothalamic neuropeptide produced primarily by parvocellular neurons of the paraventricular nucleus (PVN). CRH is the apex of the hypothalamic-pituitary-adrenal (HPA) axis — the central stress response system. It acts through CRF1R and CRF2R (both Gαs-coupled GPCRs), with CRH having high affinity for CRF1R (Kd ~0.2-1 nM) and moderate affinity for CRF2R.')),
      h3('CRF1R Pituitary Signalling'),
      p(t('CRH released into the hypothalamo-hypophyseal portal system binds CRF1R on anterior pituitary corticotrophs, activating adenylyl cyclase → cAMP → PKA. PKA phosphorylates CREB, driving proopiomelanocortin (POMC) gene expression and ACTH secretion. ACTH travels through systemic circulation to the adrenal cortex, stimulating cortisol synthesis and release. The entire axis responds to physiological and psychological stressors within minutes.')),
      h3('Extra-Hypothalamic CRH Effects'),
      ul(
        'Amygdala: CRF1R drives anxiety and fear responses; basolateral → central amygdala CRH',
        'Locus coeruleus: CRF1R activates noradrenergic arousal → sympathetic activation',
        'Prefrontal cortex: CRH modulates working memory and executive function under stress',
        'Gut: CRF1R in enteric nervous system → stress-induced diarrhea and IBS',
        'Immune: CRH stimulates mast cell degranulation and pro-inflammatory cytokines',
        'CRF2R: stress resilience (Edinger-Westphal nucleus) — termination of acute stress response',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Half-life'),
      p(t('CRH has a plasma half-life of approximately 60–90 minutes — substantially longer than most hypothalamic releasing hormones — due to binding to CRH-binding protein (CRH-BP) in plasma and at the pituitary. Free CRH represents only 10–20% of immunoreactive CRH. CRH-BP functions as a buffer, modulating the magnitude of HPA axis activation during acute stress and limiting the duration of ACTH secretion.')),
      h3('CRH Stimulation Test'),
      p(t('The CRH stimulation test (oCRH 100 mcg IV; hCRH 1 mcg/kg IV) with ACTH and cortisol measurement at 15-minute intervals is used to distinguish pituitary Cushing\'s disease (exaggerated ACTH response) from ectopic ACTH syndrome (blunted/absent response) and from primary adrenal causes (absent ACTH, no cortisol augmentation). The inferior petrosal sinus sampling + CRH test localises pituitary microadenomas.')),
      h3('CRF1R Antagonist Development'),
      ul(
        'Antalarmin (CRF1R antagonist): stress, anxiety, and addiction research tool',
        'Pexacerfont, emicerfont: CRF1R antagonists in Phase 2 trials for anxiety and IBS',
        'Verucerfont, crinecerfont: CRF1R antagonists for congenital adrenal hyperplasia (reducing adrenal androgen excess)',
        'Crinecerfont: Phase 3 results (2023) show significant androgen reduction in CAH patients',
      ),
    ),
    researchFindings: lex(
      h3('Anxiety and Depression Neuroscience'),
      p(t('The CRH system is central to the neuroscience of anxiety disorders and depression. Elevated CSF CRH is documented in PTSD, major depressive disorder, and anxiety disorders. Amygdala CRH mediates conditioned fear and social avoidance. CRF1R knockout mice are stress-resilient and show reduced anxiety on multiple behavioural measures. CRF1R antagonists showed early promise in anxiety clinical trials, though later trials have been inconsistent.')),
      h3('IBS and GI Research'),
      p(t('The gut-brain stress axis via CRF1R in the enteric nervous system mediates stress-induced GI dysfunction. Exogenous CRH (peripheral or central) produces diarrhea and colonic hypermotility in rats and humans. CRF1R blockade reduces stress-induced visceral hypersensitivity and bowel transit changes. Pexacerfont and emicerfont reduced abdominal pain and altered stool frequency in IBS-D patients in Phase 2 trials, though Phase 3 results were disappointing.')),
      h3('Congenital Adrenal Hyperplasia'),
      p(t('In 21-hydroxylase deficiency (CAH), cortisol deficiency drives chronic CRH → ACTH hyperstimulation, causing adrenal androgen excess. Crinecerfont (CRF1R antagonist) reduces pituitary CRF1R stimulation, lowering ACTH drive to the adrenal, reducing androgen precursors (17-OH-progesterone, androstenedione) while allowing cortisol replacement dose reduction. Phase 3 data (2023) showed 30% reduction in androstenedione with preserved cortisol.')),
      h3('Stress and Cardiovascular Research'),
      ul(
        'CRH cardiac effects: direct CRF1R on cardiomyocytes increases contractility and heart rate',
        'Psychological stress → CRH → sympathetic → CAD events (Chandola et al. stress-heart disease link)',
        'CRH in atherosclerosis: mast cell CRF1R activation drives plaque inflammation',
        'ACTH secretagogue test: utility in assessment of secondary adrenal insufficiency after steroid cessation',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('CRH Stimulation Test Safety'),
      p(t('The diagnostic CRH stimulation test is very safe. The most common adverse effects are transient facial flushing (45–75%), tachycardia (20%), and a brief sensation of warmth and metallic taste — all related to CRH receptor activation on skin vasculature and vagal fibres. These resolve within 1–2 minutes. No serious adverse events have been reported in thousands of diagnostic CRH tests.')),
      h3('Sustained or High-Dose CRH Effects'),
      ul(
        'Cortisol elevation: ACTH → cortisol → glucose elevation, immune suppression, blood pressure rise',
        'Anxiety induction: high-dose CRH produces acute anxiety consistent with amygdala activation',
        'Cardiovascular: CRH stimulates heart rate and blood pressure; ECG monitoring advisable',
        'Chronic HPA stimulation: Cushing syndrome features with sustained CRH excess (as in ectopic CRH tumours)',
      ),
      h3('CRF1R Antagonist Safety'),
      p(t('CRF1R antagonists (the pharmacological opposite of CRH agonism) are being developed therapeutically. Their primary risk is HPA axis suppression — blocking ACTH secretion could impair cortisol response to acute illness. Clinical trial data for crinecerfont, pexacerfont, and emicerfont show generally good tolerability with the expected blunting of ACTH and need for glucocorticoid co-administration to prevent adrenal crisis.')),
    ),
  },

  // ─── Endothelin-1 ────────────────────────────────────────────
  'endothelin-1': {
    mechanismOfAction: lex(
      h3('Most Potent Endogenous Vasoconstrictor'),
      p(t('Endothelin-1 (ET-1) is a 21-amino acid peptide produced by vascular endothelial cells and is the most potent known endogenous vasoconstrictor. It is cleaved from the precursor big ET-1 (38 aa) by endothelin-converting enzyme (ECE-1). ET-1 acts through two GPCRs: ETA receptor (Gαq/Gα12) expressed on vascular smooth muscle cells — mediating vasoconstriction and proliferation — and ETB receptor (Gαi/Gαq) expressed on endothelial cells (mediating vasodilation via NO and prostacyclin) and smooth muscle (minor vasoconstriction).')),
      h3('ETA/ETB Signalling'),
      p(t('ETA on smooth muscle cells: Gαq → PLC → IP3 → Ca²⁺ + DAG → PKC → myosin light chain kinase activation → sustained vasoconstriction. Additionally, Gα12 activates RhoA/ROCK, maintaining Ca²⁺ sensitisation for prolonged contraction. ETA activation also drives VSMC proliferation and hypertrophy via MAPK/ERK. ETB on endothelium: Gαi reduces cAMP; but also stimulates eNOS via Gαq-Ca²⁺-calmodulin — producing vasodilatory NO as a partial counter-regulatory mechanism.')),
      h3('Pathophysiological Roles'),
      ul(
        'Vascular: ETA-mediated vasoconstriction contributes to hypertension and vasospasm',
        'Pulmonary: ETA/ETB on pulmonary arterial smooth muscle drive pulmonary arterial hypertension (PAH)',
        'Heart: cardiac ETA promotes fibrosis, hypertrophy, and adverse remodelling',
        'Kidney: ET-1 is a major autocrine regulator of renal tubular sodium excretion (via ETB in collecting duct)',
        'Endothelium clearance: ETB on endothelial cells is a major ET-1 clearance receptor (reduces circulating ET-1)',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Kinetics'),
      p(t('Circulating ET-1 concentrations are very low (1–3 pg/mL) in healthy adults, reflecting predominantly paracrine/autocrine action — ET-1 acts locally at the vascular wall rather than as a systemic hormone at baseline. Plasma half-life is 1–2 minutes, cleared predominantly by ETB receptor internalisation in the pulmonary circulation (which removes ~70% of circulating ET-1 on each pass). Big ET-1 (the stable precursor) has a longer half-life and is used as a clinical biomarker.')),
      h3('ET Receptor Antagonists — Therapeutic Reference'),
      p(t('The pharmacological significance of ET-1 is best understood through its approved antagonists. Bosentan (ETA/ETB dual antagonist), ambrisentan (selective ETA), and macitentan (ETA/ETB) are approved for pulmonary arterial hypertension. These have demonstrated 20–40% improvement in 6-minute walk distance and 30–40% reduction in clinical worsening events in PAH. ET-1 receptor antagonism is also used in hepatopulmonary syndrome.')),
      h3('ET-1 in Research'),
      ul(
        'IV ET-1 infusion: 0.5–5 pmol/kg/min produces dose-proportional vasoconstriction (MAP increase 10–20 mmHg)',
        'Forearm intrabrachial ET-1: 5 pmol/min produces local forearm vasoconstriction without systemic effects',
        'BQ-123 (ETA antagonist) + BQ-788 (ETB antagonist): selective pharmacological dissection tools',
        'Big ET-1: clinical research biomarker for endothelial ET-1 production',
      ),
    ),
    researchFindings: lex(
      h3('Pulmonary Arterial Hypertension'),
      p(t('ET-1 is the primary pathogenic driver of pulmonary arterial hypertension — plasma ET-1 is elevated 10-fold in PAH patients, and pulmonary vascular ET-1 production is dramatically upregulated. ETA/ETB expression changes in PAH vascular remodelling contribute to progressive obliteration of the pulmonary arterial tree. Endothelin receptor antagonists are established PAH therapies, and their efficacy confirms ET-1 pathway centrality in PAH pathogenesis.')),
      h3('Cardiovascular Disease'),
      p(t('ET-1 promotes adverse cardiac remodelling: myocyte hypertrophy, interstitial fibrosis, and impaired diastolic function. Plasma ET-1 elevation correlates with HF severity and mortality. Early HF trials with endothelin antagonists (ENABLE, RITZ studies) showed neutral outcomes in systolic HF, partly because ETB blockade (by dual antagonists) prevented endothelial NO-mediated vasodilation. Selective ETA antagonism remains under investigation.')),
      h3('Scleroderma and Raynaud\'s'),
      p(t('ET-1 drives digital vasospasm in scleroderma-associated Raynaud\'s phenomenon and contributes to pulmonary hypertension in SSc-PAH. Bosentan (dual ETA/ETB antagonist) reduced Raynaud\'s attack frequency and new digital ulcer formation in the RAPIDS trials (20–30% reduction in new ulcers). This establishes ET-1 as a key mediator of scleroderma vascular complications.')),
      h3('Renal Research'),
      ul(
        'Collecting duct ETB: ET-1 is a natriuretic autocrine signal; ETB deletion causes hypertension',
        'Glomerulosclerosis: ETA on mesangial cells drives progression in CKD',
        'Diabetic nephropathy: ET-1 elevated; sparsentan (ETA/angiotensin receptor dual antagonist) in Phase 3 for IgA nephropathy',
        'Hypertension: ETA antagonism reduces blood pressure in resistant hypertension',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('ET Receptor Antagonist Class Effects'),
      p(t('Safety data for the ET-1 system comes from endothelin antagonist trials. The major class adverse effect of dual ETA/ETB antagonism is fluid retention (ETB on endothelium mediates natriuresis; blocking it promotes fluid retention). Ambrisentan (ETA-selective) has lower fluid retention risk but more peripheral oedema from vasodilation.')),
      h3('Hepatotoxicity'),
      ul(
        'Bosentan: elevated liver transaminases in 10–12% of patients; monthly monitoring required',
        'Sitaxentan (withdrawn): severe hepatotoxicity; removed from market 2010',
        'Ambrisentan, macitentan: substantially improved hepatic safety profile',
        'Mechanism: bosentan inhibits BSEP (bile salt export pump) → intrahepatic bile acid accumulation',
      ),
      h3('Reproductive Toxicity'),
      p(t('All endothelin receptor antagonists are teratogenic (Category X in pregnancy) — ET-1 signalling is essential for branchial arch development, and ETA/ETB antagonism causes craniofacial and cardiovascular malformations in animal models. Mandatory pregnancy prevention programmes (monthly testing, dual contraception) are required for all approved endothelin antagonists. Male patients also require reproductive counselling (ET-1 role in testicular descent and sperm function).')),
    ),
  },

  // ─── Enkephalins ─────────────────────────────────────────────
  'enkephalins': {
    mechanismOfAction: lex(
      h3('Endogenous Opioid Pentapeptides'),
      p(t('Enkephalins are pentapeptide endogenous opioids — met-enkephalin (Tyr-Gly-Gly-Phe-Met) and leu-enkephalin (Tyr-Gly-Gly-Phe-Leu) — derived from proenkephalin A cleavage by prohormone convertases in enkephalinergic neurons of the striatum, limbic system, spinal dorsal horn, and peripheral sensory neurons. They are the primary endogenous ligands of δ-opioid receptors (DOR) and also bind μ-opioid receptors (MOR) with lower affinity, and κ-opioid receptors (KOR) minimally.')),
      h3('Opioid Receptor Signalling'),
      p(t('DOR (preferred enkephalin target): Gαi/o-coupled → inhibits adenylyl cyclase (reduces cAMP), activates GIRK channels (hyperpolarises neurons), and inhibits voltage-gated calcium channels. Net effect: reduced neuronal excitability and neurotransmitter release. In the spinal dorsal horn, DOR activation on primary afferent terminals and interneurons reduces nociceptive transmission — contributing to endogenous pain modulation alongside β-endorphin/MOR and dynorphin/KOR systems.')),
      h3('Functional Roles'),
      ul(
        'Pain modulation: spinal and supraspinal DOR/MOR activation → analgesia',
        'Mood: limbic enkephalin circuits modulate dopamine in NAc → reward and pleasure',
        'Stress response: enkephalin release buffers acute stress-induced pain and anxiety',
        'Immune modulation: DOR on T-cells and macrophages; anti-inflammatory effects',
        'GI motility: enkephalin in myenteric plexus reduces propulsive motility (target of loperamide)',
        'Memory: hippocampal DOR modulates spatial and contextual memory encoding',
      ),
    ),
    pharmacokinetics: lex(
      h3('Rapid Degradation'),
      p(t('Enkephalins have extremely short plasma half-lives (30–60 seconds) — rapidly degraded by enkephalinase (neutral endopeptidase/neprilysin, cleaving Gly-Phe bond) and aminopeptidase N (removing N-terminal Tyr). This rapid inactivation confines endogenous enkephalin signalling to synaptic and paracrine contexts. Extending enkephalin half-life by neprilysin inhibition is a key therapeutic strategy.')),
      h3('Enkephalinase Inhibitors'),
      p(t('Racecadotril (thiorphan prodrug) inhibits neprilysin in the intestinal epithelium, raising local enkephalin concentrations and reducing secretory diarrhea — without CNS opioid effects (peripheral action only). Selectively peripherally acting enkephalinase inhibitors represent a non-addictive approach to GI opioid modulation. Systemic neprilysin inhibition (sacubitril in HF) also raises enkephalins alongside natriuretic peptides, with unclear cardiovascular implications.')),
      h3('DOR Agonist Research'),
      ul(
        'DPDPE ([D-Pen2,5]-enkephalin): selective DOR agonist; spinal analgesia research',
        'Deltorphin II (frog-derived): high-affinity DOR agonist; used to define DOR biology',
        'SNC-80: small-molecule DOR agonist; tested for analgesia and depression (seizure liability identified)',
        'Enkephalin analogues with Aib substitutions: protease-resistant DOR agonists in development',
      ),
    ),
    researchFindings: lex(
      h3('Pain System and Endogenous Analgesia'),
      p(t('Enkephalins are released in the periaqueductal grey (PAG), rostral ventromedial medulla (RVM), and spinal dorsal horn during pain states, exercise, acupuncture, and social bonding — contributing to endogenous analgesia. DOR-knockout mice show normal baseline pain thresholds but impaired stress-induced analgesia and reduced analgesic response to inflammatory pain, confirming the non-redundant role of the enkephalin/DOR axis.')),
      h3('Depression and Anxiolysis'),
      p(t('Emerging research positions the enkephalin/DOR system as a rapidly acting antidepressant target. DOR activation in limbic circuits (hippocampus, amygdala, prefrontal cortex) produces antidepressant- and anxiolytic-like effects in rodent models independent of μ-opioid reward circuits. DOR knockout mice are more anxious and depression-prone. LY2456302 (aticaprant, a KOR antagonist rather than DOR agonist) is in Phase 3 for MDD, but the DOR agonist approach offers complementary mechanistic distinctions.')),
      h3('GI Physiology — Racecadotril'),
      p(t('Racecadotril (acetorphan) reduces intestinal secretion by raising local enkephalin concentrations in enteric neurons, activating DOR on enterocytes and reducing secretory cAMP. Multiple RCTs in paediatric and adult acute diarrhea show racecadotril reduces stool output and duration comparably to loperamide (MOR agonist), without the constipation and rebound effect associated with loperamide\'s colonic motility suppression.')),
      h3('Schizophrenia and Addiction'),
      ul(
        'Enkephalin in striatum: modulates dopamine release; dysregulated in schizophrenia',
        'DOR in NAc: mediates rewarding aspects of social interaction (distinct from MOR-based opioid reward)',
        'Alcohol dependence: endogenous enkephalin release during alcohol consumption; DOR antagonism reduces alcohol preference',
        'DOR-MOR heterodimer: co-localised in pain circuits; functional coupling modifies pharmacology of both receptors',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('DOR Agonist Adverse Effects'),
      p(t('DOR-selective agonists have a different adverse effect profile from MOR agonists (traditional opioids): reduced respiratory depression, less constipation, lower physical dependence liability, and minimal rewarding effects in rodent models. However, the DOR agonist SNC-80 revealed a critical safety liability — convulsions — linked to DOR activation of seizure circuits. This has driven development of biased DOR agonists that activate analgesia/antidepressant pathways without pro-convulsant effects.')),
      h3('Enkephalinase Inhibitor Safety'),
      ul(
        'Racecadotril (GI use): excellent safety record; approved in >80 countries for diarrhea',
        'Racecadotril GI-selective: minimal CNS penetration → no euphoria, sedation, or dependence',
        'Sacubitril (systemic NEP inhibition): raises enkephalins but CNS effects minimal at therapeutic doses',
        'Drug interactions: racecadotril does not affect CYP450 enzymes; minimal drug interactions',
      ),
      h3('Endogenous Enkephalin System Safety'),
      p(t('The endogenous enkephalin system is not associated with addiction or abuse liability because: (1) synaptic concentrations produce rapid, physiological analgesia without flooding reward circuits; (2) rapid enzymatic degradation prevents sustained receptor activation. Pharmacological augmentation via enkephalinase inhibition respects these constraints, producing peripheral effects without central opioid euphoria — the key safety advantage over direct opioid administration.')),
    ),
  },

  // ─── Relaxin-2 ───────────────────────────────────────────────
  'relaxin-2': {
    mechanismOfAction: lex(
      h3('Insulin-Family Connective Tissue Modulator'),
      p(t('Relaxin-2 is the primary circulating relaxin in humans, a two-chain disulfide-linked insulin-like peptide produced by the corpus luteum during pregnancy (rising dramatically in the first trimester) and by male prostate in trace amounts. It acts on RXFP1 (relaxin family peptide receptor 1) — a leucine-rich repeat-containing GPCR coupled to Gαs, Gαo, and Gαi depending on tissue — activating adenylyl cyclase (cAMP) in most tissues. RXFP2 also binds relaxin-2 with lower affinity.')),
      h3('Primary Physiological Actions'),
      p(t('Relaxin\'s principal function during pregnancy is preparation of the birth canal: cervical ripening (softening, dilation, effacement via collagenase induction and glycosaminoglycan upregulation), pelvic ligament remodelling, and inhibition of uterine contractions. These are mediated by RXFP1 on fibroblasts and smooth muscle. Beyond reproductive biology, relaxin-2 has important cardiovascular roles in pregnancy: renal vasodilation, increased GFR, increased cardiac output (the physiological cardiac adaptations of pregnancy).')),
      h3('Anti-Fibrotic and Vasodilatory Mechanisms'),
      ul(
        'Fibroblasts: RXFP1 → cAMP → inhibition of TGF-β1-mediated collagen synthesis',
        'Matrix metalloproteinase upregulation: collagen degradation (MMP-1, MMP-3, MMP-13)',
        'Endothelium: RXFP1 → PI3K/Akt/eNOS → NO production → vasodilation',
        'VEGF upregulation: angiogenesis support in injured/fibrotic tissue',
        'Kidney: RXFP1 on renal vasculature → afferent arteriolar dilation → GFR increase',
      ),
    ),
    pharmacokinetics: lex(
      h3('Recombinant Relaxin-2 (Serelaxin)'),
      p(t('Serelaxin (recombinant human relaxin-2) has a plasma half-life of approximately 2 hours following continuous IV infusion. The short half-life necessitates continuous infusion for haemodynamic applications. SC injection provides ~50% bioavailability with a longer apparent half-life (6–8 hours) due to sustained absorption, making SC delivery practical for chronic fibrosis applications.')),
      h3('Clinical Trials Dosing'),
      p(t('In the RELAX-AHF trials for acute heart failure, serelaxin was administered at 30 mcg/kg/day IV continuous infusion for 48 hours. For fibrosis and chronic cardiovascular applications, SC serelaxin at 30–100 mcg/kg/day twice daily has been studied. Native relaxin-2 concentrations in early pregnancy peak at 1–2 ng/mL, achieved by research doses of 10–30 mcg/kg/day.')),
      h3('Research Protocols'),
      ul(
        'Acute heart failure (RELAX-AHF protocol): 30 mcg/kg/day IV × 48 hours',
        'Pulmonary arterial hypertension (research): 30–60 mcg/kg/day SC twice daily',
        'Fibrosis models: 0.5–1 mg/kg/day SC in rodents',
        'Scleroderma: Phase 2 trial 25–250 mcg/kg SC daily × 24 weeks',
      ),
    ),
    researchFindings: lex(
      h3('RELAX-AHF Trials'),
      p(t('The RELAX-AHF trial (2013, Lancet) enrolled 1,161 patients with acute heart failure. Serelaxin 30 mcg/kg/day for 48 hours significantly reduced dyspnoea (primary endpoint) and produced a remarkable 37% reduction in 180-day cardiovascular mortality in the pre-specified secondary endpoint. However, RELAX-AHF-2 (2019) enrolled 6,600 patients and failed to replicate the mortality benefit — a major disappointment. Serelaxin remains investigational for AHF.')),
      h3('Organ Fibrosis Research'),
      p(t('Serelaxin has consistent anti-fibrotic effects across multiple organs in preclinical models: liver fibrosis (cirrhosis models: 50% reduction in collagen), kidney fibrosis (UUO model: 40% reduction in tubulointerstitial collagen), cardiac fibrosis (MI model: improved ventricular compliance), and pulmonary fibrosis (bleomycin model: 30–40% reduction in hydroxyproline). These consistent cross-organ effects generated broad therapeutic interest.')),
      h3('Scleroderma and Connective Tissue Disease'),
      p(t('In a Phase 2 RCT in diffuse cutaneous scleroderma (Khanna et al.), serelaxin improved modified Rodnan skin score by -5 units (vs. -1 unit placebo) at 24 weeks — a clinically meaningful reduction. Pulmonary function showed trends toward improvement. These results supported Phase 3 planning, though the RELAX-AHF-2 failure raised questions about the clinical translation of serelaxin\'s anti-fibrotic effects in harder endpoints.')),
      h3('Male Reproductive and Other Research'),
      ul(
        'RXFP1 in male reproductive tract: prostate relaxin promotes sperm motility',
        'Nipple hyperkeratosis: relaxin deficiency in mice causes nipple development failure',
        'Cartilage repair: relaxin promotes chondrocyte matrix remodelling and joint flexibility',
        'Cancer: RXFP1 on breast and prostate cancer cells — relaxin promotes invasion; dual role complicates therapeutic use',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('RELAX-AHF Safety Data'),
      p(t('Serelaxin was well tolerated in both RELAX-AHF trials. The most common adverse effect was symptomatic hypotension (3% serelaxin vs. 2% placebo in RELAX-AHF-2) — related to the vasodilatory mechanism. Renal function improved marginally with serelaxin vs. worsened slightly with placebo in the AHF setting, consistent with the renal vasodilatory mechanism. No significant arrhythmias or organ toxicity signals were identified.')),
      h3('Adverse Effects'),
      ul(
        'Hypotension: dose-dependent; most common adverse effect during IV infusion',
        'Renal effects: generally protective at therapeutic doses; renal vasodilation improves GFR',
        'Headache: vasodilation-related; uncommon at standard doses',
        'Injection site reactions: mild with SC administration',
      ),
      h3('Cancer Consideration'),
      p(t('RXFP1 expression in breast, prostate, and endometrial cancer cells, where relaxin promotes invasive phenotype, raises theoretical cancer safety concerns. The clinical trials in AHF (short duration, 48 hours) and scleroderma (6 months) have not demonstrated increased cancer incidence, but long-term exposure in cancer-susceptible populations requires careful surveillance in future trials. This mechanistic concern is a key consideration for chronic fibrosis applications.')),
    ),
  },

  // ─── Apelin ──────────────────────────────────────────────────
  'apelin': {
    mechanismOfAction: lex(
      h3('APJ Receptor Endogenous Ligand'),
      p(t('Apelin is the endogenous ligand of the APJ receptor (APLNR), a Gαi/Gαq-coupled GPCR that shares ~54% homology with angiotensin II type 1 receptor (AT1R) but does not bind angiotensin II. Apelin exists as multiple bioactive C-terminal fragments derived from the 77-amino acid pre-pro-apelin: apelin-36, apelin-17, apelin-13, and apelin-12 (the shortest active form). Apelin-13 and apelin-17 are the predominant circulating forms with highest APJ affinity.')),
      h3('APJ Receptor Signalling'),
      p(t('APJ/Gαi: inhibits adenylyl cyclase, reducing cAMP; activates GIRK channels and MAPK/ERK. APJ/Gαq: activates PLC → IP3 → Ca²⁺ → calmodulin → eNOS → NO in endothelial cells. The cardiovascular net effect of APJ activation is positive inotropy (direct cardiac APJ → PI3K/Akt → enhanced calcium handling) combined with vasodilation (endothelial NO), producing increased cardiac output without reflexive tachycardia — a haemodynamically favourable profile for heart failure.')),
      h3('Physiological Functions'),
      ul(
        'Cardiovascular: positive inotropy + vasodilation → increased cardiac output',
        'Fluid balance: APLN counteracts vasopressin (ADH) — reduces water reabsorption in collecting duct',
        'Adipose: expressed in adipocytes; regulates energy homeostasis',
        'Neurological: hypothalamic APLNR modulates GnRH pulsatility and food intake',
        'Pulmonary: anti-proliferative on pulmonary artery smooth muscle (PAH relevance)',
        'Angiogenesis: promotes endothelial survival and vessel formation',
      ),
    ),
    pharmacokinetics: lex(
      h3('Plasma Stability'),
      p(t('Native apelin peptides are rapidly degraded by ACE2 (which cleaves the C-terminal phenylalanine from apelin-13 and apelin-17 to generate des-Phe apelin) and by neprilysin. Apelin-17 has a plasma half-life of approximately 3–5 minutes; apelin-13 is slightly shorter. This rapid degradation has prompted development of pegylated, lactam-modified, and D-amino acid substituted analogues (ELA-32/elabela is a longer endogenous agonist with better stability).')),
      h3('Research Compounds'),
      p(t('Multiple stable APJ agonists have been developed: MM07 (palmitate-conjugated apelin-13 analogue with 30-minute half-life in vivo), LIT01-196 (PEGylated apelin analogue), and Elabela/ELA-32 (endogenous apelin system peptide expressed in placenta and kidney with longer half-life than apelin-13). These tools have enabled continuous infusion studies and chronic pharmacology experiments.')),
      h3('Research Dosing'),
      ul(
        'Apelin-13 IV infusion: 100–300 nmol/kg/min; haemodynamic effects within 5 minutes',
        'Intracoronary apelin: 10-100 nmol bolus in human cardiac catheterisation studies',
        'Elabela SC: 30 mcg/kg/day in rodent PAH models',
        'MM07 IV: 100 nmol/kg; 30-minute sustained haemodynamic response in HF models',
      ),
    ),
    researchFindings: lex(
      h3('Heart Failure Haemodynamics'),
      p(t('Intracoronary apelin infusion in humans (Japp et al., 2010) produced the largest ever recorded increase in cardiac output from an endogenous peptide — 40–50% increase in cardiac index and 10-mmHg reduction in mean arterial pressure, without tachycardia. This haemodynamic profile resembles the ideal heart failure therapeutic: increased contractility + reduced afterload without sympathetic side effects. Multiple Phase 1 studies have confirmed this haemodynamic signature.')),
      h3('Pulmonary Arterial Hypertension'),
      p(t('Apelin and APJ are dramatically downregulated in PAH patients and rodent PAH models — plasma apelin levels are 3–5× lower than controls. Restoration of apelin signalling (by apelin infusion, ACE2 supplementation to prevent apelin degradation, or APJ agonists) reverses experimental PAH: reducing pulmonary artery pressure, right ventricular hypertrophy, and vascular remodelling. Phase 2 clinical trials for APJ agonists in PAH are ongoing.')),
      h3('Pre-eclampsia and Renal Research'),
      p(t('Elabela/ELA-32 is expressed in the placenta and kidney. ELA deletion in mice causes severe pre-eclampsia-like syndrome (hypertension, proteinuria, placental insufficiency). In the kidney, APJ activation counters vasopressin (AVP) action — apelin reduces aquaporin-2 expression and urinary concentration. This apelin-AVP antagonism may be relevant to hyponatraemia management and fluid retention in heart failure.')),
      h3('Obesity and Metabolic Syndrome'),
      ul(
        'Apelin is expressed in adipocytes and increases with obesity (opposite of leptin resistance)',
        'Apelin improves insulin-stimulated glucose uptake in skeletal muscle via APJ/PI3K/AMPK',
        'Apelin knockout mice: obese, insulin resistant; apelin replacement restores sensitivity',
        'Ageing: apelin declines with age; apelin replacement improves muscle mass and strength in aged mice',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Human Safety Data'),
      p(t('Limited but reassuring human safety data from cardiac catheterisation and infusion studies. Intracoronary apelin is well tolerated — no significant arrhythmias, no severe hypotension at studied doses (100–300 nmol/kg/min). The primary haemodynamic risk is hypotension at higher infusion rates, given the vasodilatory mechanism. Blood pressure monitoring is essential during IV administration.')),
      h3('Adverse Effects'),
      ul(
        'Hypotension: vasodilatory; dose-proportional; the primary safety concern with IV administration',
        'Tachycardia: surprisingly minimal — positive inotropy without significant chronotropy at physiological doses',
        'Flushing: mild; endothelial NO-mediated',
        'No significant organ toxicity in Phase 1 published data',
      ),
      h3('Theoretical Concerns'),
      p(t('APJ is expressed in tumour endothelium, and apelin/APJ promotes tumour angiogenesis in multiple cancer models. Theoretically, chronic APJ agonism could promote tumour vascularisation and growth in cancer-susceptible individuals. This concern is balanced against the therapeutic potential in HF and PAH where the cardiovascular benefit is compelling. Long-term oncology surveillance will be essential in future clinical programmes.')),
    ),
  },

  // ─── Anserine ────────────────────────────────────────────────
  'anserine': {
    mechanismOfAction: lex(
      h3('β-Alanyl-L-Methylhistidine Dipeptide'),
      p(t('Anserine (β-alanyl-1-methylhistidine) is a naturally occurring histidine-containing dipeptide (HCD) found at high concentrations in the skeletal muscle of birds (particularly chicken and turkey) and some fish, alongside its structural relatives carnosine (β-alanyl-L-histidine) and balenine (β-alanyl-3-methylhistidine). Unlike carnosine, anserine contains N-π-methylhistidine rather than L-histidine, conferring distinct enzyme affinity and biological properties. Anserine is obtained from dietary sources or supplementation.')),
      h3('pH Buffering and Proton Sequestration'),
      p(t('The primary documented function of histidine-containing dipeptides, including anserine, is intramuscular pH buffering. The imidazole ring of methylhistidine has a pKa of approximately 7.04 (very close to physiological pH), making it an ideal proton acceptor/donor buffer in the physiological pH range. During high-intensity exercise, lactic acid production causes intracellular pH to fall from 7.1 to 6.5–6.8; HCDs buffer these protons, delaying acidification and extending the period of effective contractile function.')),
      h3('Additional Mechanisms'),
      ul(
        'Antioxidant: anserine scavenges reactive oxygen species and quenches singlet oxygen — imidazole ring mediates ROS chelation',
        'Anti-glycation: anserine inhibits advanced glycation end-product (AGE) formation by competing with protein amino groups for carbonyl reaction',
        'Metal chelation: imidazole-methylhistidine chelates copper and zinc ions — may modulate metalloprotease activity and oxidative stress',
        'Carnosinase resistance: N-methylation of histidine makes anserine resistant to carnosinase (which rapidly degrades carnosine) — extended plasma half-life',
        'Cognitive: animal data suggest anserine reduces amyloid-β aggregation and neuroinflammation',
      ),
    ),
    pharmacokinetics: lex(
      h3('Oral Bioavailability'),
      p(t('Anserine is absorbed intact via the peptide transporter PepT1 from the intestinal brush border, similarly to carnosine. Its oral bioavailability is approximately 50–70% in rodents and estimated similarly in humans based on plasma anserine appearance data. Critically, N-methylhistidine modification renders anserine resistant to serum carnosinase (CN1), which rapidly hydrolyses carnosine — anserine\'s plasma half-life (~2–4 hours) is substantially longer than carnosine\'s (~5 minutes).')),
      h3('Tissue Distribution'),
      p(t('After absorption, anserine distributes to muscle (high expression in fast-twitch fibres), brain, and kidney. Unlike carnosine which accumulates primarily in muscle and brain, anserine shows particularly high concentrations in avian muscle (50–100 mmol/kg dry weight in chicken breast) — the primary dietary source. Supplemental anserine appears in urine as anserine and 1-methylhistidine (its metabolite).')),
      h3('Dosing from Research'),
      ul(
        'Human studies: 800–1500 mg/day oral (typically chicken extract or purified anserine)',
        'Combined carnosine/anserine supplements: 1:1–2:1 ratio; common commercial form',
        'Cognitive research protocols: 1 g anserine + 0.5 g carnosine daily for 12–24 weeks',
        'Athletic performance: 3–6 g/day (high-dose protocols, limited human data)',
      ),
    ),
    researchFindings: lex(
      h3('Cognitive Enhancement and Neuroprotection'),
      p(t('Japanese research groups (Tomonaga et al., Kawahara et al.) have conducted the most rigorous clinical investigations of anserine/carnosine combinations in cognitive health. A 12-week RCT in older adults with mild cognitive impairment (800 mg anserine + 200 mg carnosine daily) showed significant improvement in verbal episodic memory (MMSE and delayed recall) and reduced plasma biomarkers of neuroinflammation (elevated TNF-α at baseline was reduced). The combination outperformed either compound alone in a subset analysis.')),
      h3('Anti-Glycation and Diabetes Research'),
      p(t('Anserine reduces AGE (advanced glycation end-product) formation in vitro more potently than carnosine — attributed to the electron-donating methyl group on the imidazole ring enhancing carbonyl-trapping capacity. In diabetic rodent models, anserine supplementation reduced AGE accumulation in kidney and retina, improving diabetic nephropathy markers. Human diabetic neuropathy and nephropathy trials are in early stages.')),
      h3('Exercise Performance'),
      p(t('Anserine\'s intramuscular pH-buffering role has been studied in sprint and high-intensity interval exercise. Unlike carnosine (where robust human RCT data support pH buffering and exercise capacity), anserine-specific human RCT data are limited. Animal studies show that anserine supplementation increases muscle carnosine and anserine concentrations proportionally to dietary intake, improving fatigue time-to-failure in swimming and running tests in rodents.')),
      h3('Kidney Disease Research'),
      ul(
        'Nephroprotection: anserine reduces oxidative stress in ischaemia-reperfusion renal injury',
        'Anti-inflammatory: reduces NF-κB in tubular epithelial cells during hypoxic challenge',
        'AGE accumulation: reduced in renal tissue of diabetic animals with anserine supplementation',
        'GFR preservation: modest but consistent in diabetic rat models (20–25% better GFR vs. control at 12 weeks)',
      ),
    ),
    sideEffectsAndSafety: lex(
      h3('Safety Profile'),
      p(t('Anserine has an excellent safety record consistent with its dietary origin and long history of human consumption from poultry. No significant adverse effects have been reported in clinical trials at doses up to 1500 mg/day for 24 weeks. Carnosinase resistance means anserine does not produce the "tingling" paresthesia characteristic of β-alanine supplementation — because anserine is not a free β-alanine source, the TRPV1-mediated paresthesia mechanism is absent.')),
      h3('Dietary Source Comparison'),
      ul(
        'Chicken breast: ~500–1500 mg anserine per 100 g (among highest natural concentrations)',
        'Fish (tuna, salmon): 100–800 mg anserine per 100 g',
        'Beef: anserine absent; carnosine present (lacks methylation enzyme)',
        'Plant foods: no significant anserine or carnosine content',
      ),
      h3('Contraindications and Cautions'),
      p(t('No significant contraindications have been identified for anserine supplementation at dietary or moderate therapeutic doses. Rare hypersensitivity to chicken/poultry protein would contraindicate supplementation from poultry-derived sources; synthetic anserine would be appropriate in this case. No significant drug-drug interactions have been documented. Kidney disease patients taking anserine for nephroprotection should have their GFR monitored, though anserine itself is not nephrotoxic.')),
    ),
  },
}
