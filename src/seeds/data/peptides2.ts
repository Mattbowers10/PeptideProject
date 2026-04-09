// Additional peptides — completes the top 100

export const peptidesData2 = [
  {
    name: 'Ghrelin',
    slug: 'ghrelin',
    aliases: [
      { alias: 'Motilin-related peptide' },
      { alias: 'Growth hormone secretagogue' },
    ],
    casNumber: '258279-04-8',
    categories: ['growth-hormone-axis', 'fat-loss-metabolic', 'sleep-circadian'],
    researchStatus: 'preclinical',
    summary:
      'Ghrelin is a 28-amino-acid acylated peptide hormone primarily produced by gastric X/A-like cells and is the endogenous ligand for the growth hormone secretagogue receptor (GHS-R1a). It stimulates GH release, increases appetite and food intake, promotes energy storage, and modulates sleep and mood. Research explores ghrelin axis manipulation for obesity, cachexia, heart failure, and neurodegenerative diseases.',
    halfLife: '~27 minutes (acylated); des-acyl ghrelin longer',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Clinical GH stimulation research' },
      { route: 'subcutaneous', notes: 'Metabolic and appetite studies' },
    ],
    pubmedSearchTerms: [
      { term: 'ghrelin GHS-R appetite growth hormone' },
      { term: 'ghrelin obesity cachexia metabolic' },
    ],
  },

  {
    name: 'Somatostatin',
    slug: 'somatostatin',
    aliases: [
      { alias: 'SRIF' },
      { alias: 'Somatotropin Release-Inhibiting Factor' },
      { alias: 'SST-14' },
    ],
    casNumber: '38916-34-6',
    categories: ['growth-hormone-axis', 'glp1-metabolic-hormones'],
    researchStatus: 'approved',
    summary:
      'Somatostatin is a 14-amino-acid cyclic peptide and the primary endogenous inhibitor of growth hormone secretion. It also inhibits insulin, glucagon, gastrin, cholecystokinin, and secretin release, slows GI motility, and reduces splanchnic blood flow. Its short half-life drove the development of longer-acting analogs (octreotide, lanreotide) used clinically for acromegaly, neuroendocrine tumors, and GI bleeding.',
    halfLife: '~1–3 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Clinical use and research' },
    ],
    pubmedSearchTerms: [
      { term: 'somatostatin SRIF growth hormone inhibition' },
      { term: 'somatostatin neuroendocrine GI regulation' },
    ],
  },

  {
    name: 'Octreotide',
    slug: 'octreotide',
    aliases: [
      { alias: 'Sandostatin' },
      { alias: 'SMS 201-995' },
    ],
    casNumber: '79517-01-4',
    categories: ['growth-hormone-axis', 'glp1-metabolic-hormones'],
    researchStatus: 'approved',
    summary:
      'Octreotide is a synthetic 8-amino-acid somatostatin analog with a much longer half-life than native somatostatin. FDA-approved for acromegaly, carcinoid syndrome, VIPomas, and variceal bleeding, it is also used off-label for Cushing\'s disease, thyroid cancer, and refractory diarrhea. Long-acting release (LAR) formulations allow monthly dosing. It is among the most clinically important peptide drugs in endocrinology.',
    halfLife: '~1.7 hours (immediate); ~23 days (LAR microspheres)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Thrice-daily for acromegaly and carcinoid' },
      { route: 'intravenous', notes: 'Acute GI bleeding' },
      { route: 'intramuscular', notes: 'Monthly LAR formulation' },
    ],
    pubmedSearchTerms: [
      { term: 'octreotide somatostatin analog acromegaly' },
      { term: 'octreotide carcinoid neuroendocrine tumor' },
    ],
  },

  {
    name: 'Cholecystokinin',
    slug: 'cholecystokinin',
    aliases: [
      { alias: 'CCK' },
      { alias: 'CCK-8' },
      { alias: 'CCK-33' },
    ],
    casNumber: '9011-97-6',
    categories: ['fat-loss-metabolic', 'cognitive-enhancement'],
    researchStatus: 'preclinical',
    summary:
      'Cholecystokinin (CCK) is a peptide hormone produced by duodenal I-cells and neurons in the CNS. It triggers gallbladder contraction, pancreatic enzyme secretion, and potently suppresses appetite via vagal nerve CCK1 receptors. In the brain, CCK neurons modulate anxiety, pain, memory consolidation, and dopamine release. CCK antagonists are studied for anxiety and pain; CCK agonists for obesity and eating disorders.',
    halfLife: '~1–2 minutes (native peptide)',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Satiety, pancreatic function, and anxiety research' },
    ],
    pubmedSearchTerms: [
      { term: 'cholecystokinin CCK satiety appetite' },
      { term: 'CCK-8 anxiety pain CNS' },
    ],
  },

  {
    name: 'Neuropeptide Y',
    slug: 'neuropeptide-y',
    aliases: [{ alias: 'NPY' }],
    casNumber: '82785-45-3',
    categories: ['cognitive-enhancement', 'fat-loss-metabolic', 'cardiovascular'],
    researchStatus: 'preclinical',
    summary:
      'Neuropeptide Y (NPY) is a 36-amino-acid peptide and the most abundant neuropeptide in the mammalian CNS, acting through Y1–Y6 receptors. It is a potent orexigenic signal (stimulating appetite and fat storage), anxiolytic agent, vasoconstrictor, and regulator of circadian rhythms. Paradoxically, peripheral NPY promotes fat accumulation while central NPY drives food intake — making it a complex but high-priority metabolic research target.',
    halfLife: '~2 minutes in plasma',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Metabolic and cardiovascular research' },
    ],
    pubmedSearchTerms: [
      { term: 'neuropeptide Y NPY appetite obesity' },
      { term: 'NPY Y receptor anxiety stress' },
    ],
  },

  {
    name: 'Peptide YY',
    slug: 'peptide-yy',
    aliases: [
      { alias: 'PYY' },
      { alias: 'PYY3-36' },
    ],
    categories: ['fat-loss-metabolic'],
    researchStatus: 'phase2',
    summary:
      'Peptide YY (PYY) is a 36-amino-acid gut hormone released by L-cells postprandially. The truncated form PYY3-36 is the predominant circulating form and acts as a potent satiety signal by inhibiting NPY neurons in the hypothalamic arcuate nucleus. Research and early clinical trials demonstrate that PYY3-36 administration significantly reduces food intake. It represents a key component of gut-brain appetite regulation studied for obesity treatment.',
    halfLife: '~90 minutes (PYY3-36)',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Clinical satiety studies' },
      { route: 'intravenous', notes: 'Acute meal suppression research' },
    ],
    pubmedSearchTerms: [
      { term: 'PYY peptide YY satiety food intake' },
      { term: 'PYY3-36 obesity appetite arcuate nucleus' },
    ],
  },

  {
    name: 'Glucagon',
    slug: 'glucagon',
    aliases: [{ alias: 'GCG' }],
    casNumber: '16941-32-5',
    categories: ['glp1-metabolic-hormones', 'fat-loss-metabolic'],
    researchStatus: 'approved',
    summary:
      'Glucagon is a 29-amino-acid pancreatic alpha-cell hormone and physiological counter-regulator to insulin. It raises blood glucose through hepatic glycogenolysis and gluconeogenesis and is also lipolytic and thermogenic at supraphysiological doses. FDA-approved for hypoglycemia rescue and GI relaxation, it is now a major drug design target as a component of dual (GLP-1/glucagon) and triple agonists for obesity and NASH treatment.',
    halfLife: '~3–6 minutes',
    administrationRoutes: [
      { route: 'intramuscular', notes: 'Hypoglycemia rescue' },
      { route: 'subcutaneous', notes: 'Research and nasal powder rescue' },
      { route: 'intranasal', notes: 'Baqsimi nasal powder — FDA-approved for hypoglycemia' },
    ],
    pubmedSearchTerms: [
      { term: 'glucagon hepatic glycogenolysis alpha cell' },
      { term: 'glucagon receptor agonist obesity NASH' },
    ],
  },

  {
    name: 'ANP',
    slug: 'anp',
    aliases: [
      { alias: 'Atrial Natriuretic Peptide' },
      { alias: 'ANF' },
      { alias: 'Carperitide' },
    ],
    categories: ['cardiovascular'],
    researchStatus: 'approved',
    summary:
      'ANP (Atrial Natriuretic Peptide) is a 28-amino-acid cardiac hormone secreted by atrial cardiomyocytes in response to volume overload. It reduces blood pressure through natriuresis, vasodilation, and inhibition of the RAAS. Carperitide (synthetic ANP) is approved in Japan for acute heart failure. ANP is a key biomarker and drug target for heart failure and hypertension, studied alongside BNP and C-type natriuretic peptide.',
    halfLife: '~2–5 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Acute heart failure — carperitide clinical use in Japan' },
    ],
    pubmedSearchTerms: [
      { term: 'atrial natriuretic peptide ANP heart failure' },
      { term: 'ANP natriuresis blood pressure RAAS' },
    ],
  },

  {
    name: 'Endothelin-1',
    slug: 'endothelin-1',
    aliases: [{ alias: 'ET-1' }, { alias: 'Big endothelin-1' }],
    categories: ['cardiovascular'],
    researchStatus: 'preclinical',
    summary:
      'Endothelin-1 (ET-1) is a 21-amino-acid vasoconstrictor peptide produced primarily by vascular endothelial cells. It is the most potent endogenous vasoconstrictor known, acting through ETA and ETB receptors on vascular smooth muscle and endothelium. Elevated ET-1 is implicated in pulmonary arterial hypertension, heart failure, and renal disease — driving the development of endothelin receptor antagonists (bosentan, ambrisentan, macitentan) as clinical drugs.',
    halfLife: '~1–2 minutes (systemic); longer in tissues',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Research tool for cardiovascular studies' },
    ],
    pubmedSearchTerms: [
      { term: 'endothelin-1 ET-1 vasoconstriction hypertension' },
      { term: 'endothelin receptor pulmonary arterial hypertension' },
    ],
  },

  {
    name: 'Substance P',
    slug: 'substance-p',
    aliases: [{ alias: 'SP' }, { alias: 'NK1 ligand' }],
    casNumber: '33507-63-0',
    categories: ['pain-inflammation', 'cognitive-enhancement'],
    researchStatus: 'preclinical',
    summary:
      'Substance P is an 11-amino-acid neuropeptide of the tachykinin family and a primary neurotransmitter of pain signaling in the spinal cord. It binds NK1 receptors to mediate neurogenic inflammation, pain hypersensitivity, and emotional processing. NK1 antagonists have been developed for pain, depression (aprepitant), and nausea. Research also implicates substance P in wound healing, immune activation, and neuroinflammation.',
    halfLife: '~1–2 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Pain and inflammation research' },
    ],
    pubmedSearchTerms: [
      { term: 'substance P NK1 receptor pain nociception' },
      { term: 'substance P neuroinflammation wound healing' },
    ],
  },

  {
    name: 'Neurotensin',
    slug: 'neurotensin',
    aliases: [{ alias: 'NT' }, { alias: 'NTS' }],
    casNumber: '55508-42-4',
    categories: ['pain-inflammation', 'fat-loss-metabolic', 'cognitive-enhancement'],
    researchStatus: 'preclinical',
    summary:
      'Neurotensin is a 13-amino-acid neuropeptide found in the brain and GI tract. Centrally, it modulates dopamine circuits, acts as an endogenous antipsychotic-like agent, and is analgesic. Peripherally, it inhibits gastric acid secretion, stimulates pancreatic secretion, and promotes fat absorption. Research explores neurotensin analogs for pain, schizophrenia, Parkinson\'s disease, and metabolic regulation.',
    halfLife: '~30 seconds in blood; stable in tissues',
    administrationRoutes: [
      { route: 'intracerebroventricular', notes: 'CNS pharmacology research' },
      { route: 'intravenous', notes: 'Peripheral metabolic studies' },
    ],
    pubmedSearchTerms: [
      { term: 'neurotensin dopamine schizophrenia analgesia' },
      { term: 'neurotensin GI metabolic fat absorption' },
    ],
  },

  {
    name: 'Galanin',
    slug: 'galanin',
    aliases: [{ alias: 'GAL' }],
    categories: ['cognitive-enhancement', 'pain-inflammation', 'fat-loss-metabolic'],
    researchStatus: 'preclinical',
    summary:
      'Galanin is a 29-30 amino acid neuropeptide widely distributed throughout the CNS and peripheral nervous system. It modulates memory, mood, pain, seizures, appetite, and sleep via three receptor subtypes (GALR1–3). Research focuses on its roles in Alzheimer\'s disease (galanin hyperinnervation of cholinergic neurons), depression, epilepsy, and eating behavior. Both agonists and antagonists have therapeutic potential depending on the target condition.',
    halfLife: '~2–3 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'CNS and metabolic research' },
    ],
    pubmedSearchTerms: [
      { term: 'galanin neuropeptide memory Alzheimer cholinergic' },
      { term: 'galanin receptor pain appetite mood' },
    ],
  },

  {
    name: 'Adrenomedullin',
    slug: 'adrenomedullin',
    aliases: [{ alias: 'AM' }],
    casNumber: '148498-78-6',
    categories: ['cardiovascular', 'healing-recovery'],
    researchStatus: 'phase2',
    summary:
      'Adrenomedullin is a 52-amino-acid vasoactive peptide originally isolated from human pheochromocytoma. It is a potent vasodilator acting through CGRP receptors, promotes natriuresis, reduces inflammation, protects vascular endothelial barrier function, and enhances wound healing. Circulating AM levels rise in heart failure, sepsis, and critical illness — making it both a biomarker and emerging therapeutic target.',
    halfLife: '~22 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Heart failure and septic shock research' },
    ],
    pubmedSearchTerms: [
      { term: 'adrenomedullin cardiovascular vasodilation' },
      { term: 'adrenomedullin sepsis endothelial barrier' },
    ],
  },

  {
    name: 'TRH',
    slug: 'trh',
    aliases: [
      { alias: 'Thyrotropin-Releasing Hormone' },
      { alias: 'Thyroliberin' },
      { alias: 'pGlu-His-Pro-NH2' },
    ],
    casNumber: '24305-27-9',
    categories: ['cognitive-enhancement', 'neuroprotection'],
    researchStatus: 'approved',
    summary:
      'TRH is a tripeptide (pGlu-His-Pro-NH2) produced in the hypothalamus that stimulates TSH and prolactin release from the anterior pituitary. Beyond thyroid regulation, TRH has direct CNS effects — it is alerting, antidepressant, neuroprotective, and anticonvulsant. Research explores TRH analogs (taltirelin, approved in Japan) for ALS, spinal cord injury, Alzheimer\'s disease, and treatment-resistant depression, avoiding thyroid side effects.',
    halfLife: '~5–8 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Thyroid function testing; acute neurological research' },
      { route: 'intranasal', notes: 'CNS delivery without thyroid activation' },
    ],
    pubmedSearchTerms: [
      { term: 'TRH thyrotropin releasing hormone neuroprotection' },
      { term: 'TRH ALS spinal cord antidepressant' },
    ],
  },

  {
    name: 'Orexin A',
    slug: 'orexin-a',
    aliases: [
      { alias: 'Hypocretin-1' },
      { alias: 'OXA' },
    ],
    casNumber: '205640-90-0',
    categories: ['sleep-circadian', 'cognitive-enhancement'],
    researchStatus: 'preclinical',
    summary:
      'Orexin A (Hypocretin-1) is a 33-amino-acid neuropeptide produced exclusively by lateral hypothalamic neurons. It promotes wakefulness, arousal, and energy expenditure via OX1R and OX2R receptors, and its deficiency (due to autoimmune destruction of orexin neurons) is the cause of narcolepsy with cataplexy. Orexin receptor antagonists (suvorexant, lemborexant) are approved for insomnia; orexin agonists are under development for narcolepsy.',
    halfLife: '~20 minutes (CSF); shorter in blood',
    administrationRoutes: [
      { route: 'intranasal', notes: 'CNS delivery research for narcolepsy' },
      { route: 'intravenous', notes: 'Pharmacological studies' },
    ],
    pubmedSearchTerms: [
      { term: 'orexin hypocretin narcolepsy wakefulness' },
      { term: 'orexin A OX1R sleep arousal cognition' },
    ],
  },

  {
    name: 'Urocortin 1',
    slug: 'urocortin-1',
    aliases: [
      { alias: 'UCN1' },
      { alias: 'Urocortin' },
    ],
    categories: ['cardiovascular', 'cognitive-enhancement'],
    researchStatus: 'phase2',
    summary:
      'Urocortin 1 (UCN1) is a 40-amino-acid member of the CRH peptide family that activates both CRHR1 and CRHR2 receptors. It has potent cardioprotective effects — improving cardiac contractility, reducing ischemia-reperfusion injury, and stimulating natriuresis — making it a significant heart failure research target. It also modulates anxiety and appetite centrally. Phase 2 trials for chronic heart failure showed improvements in cardiac function.',
    halfLife: '~40 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Cardiac function studies and heart failure trials' },
    ],
    pubmedSearchTerms: [
      { term: 'urocortin CRH CRHR2 cardioprotection heart failure' },
      { term: 'urocortin 1 anxiety appetite CRH receptor' },
    ],
  },

  {
    name: 'SHLP2',
    slug: 'shlp2',
    aliases: [
      { alias: 'Small Humanin-Like Peptide 2' },
    ],
    categories: ['mitochondrial-health', 'anti-aging-longevity'],
    researchStatus: 'preclinical',
    summary:
      'SHLP2 is a mitochondria-derived peptide (MDP) encoded in the 16S rRNA region of the mitochondrial genome, from the same region as humanin. It promotes mitochondrial biogenesis, reduces reactive oxygen species, and inhibits apoptosis in multiple cell types. Research shows it protects against age-related macular degeneration, reduces atherosclerosis risk, and is inversely correlated with type 2 diabetes and Parkinson\'s disease. Circulating SHLP2 declines with age.',
    halfLife: 'Unknown; under investigation',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Preclinical research' },
    ],
    pubmedSearchTerms: [
      { term: 'SHLP2 small humanin-like peptide mitochondria' },
      { term: 'SHLP2 aging macular degeneration diabetes' },
    ],
  },

  {
    name: 'Cortexin',
    slug: 'cortexin',
    aliases: [{ alias: 'Cortexin polypeptide complex' }],
    categories: ['neuroprotection', 'cognitive-enhancement'],
    researchStatus: 'approved',
    summary:
      'Cortexin is a polypeptide complex derived from the cerebral cortex of calves or pigs, containing a mixture of neuropeptides and neurotrophic factors. Approved in Russia for stroke, TBI, epilepsy, and cognitive disorders, it exhibits neuroprotective, nootropic, and anticonvulsant properties. Research supports improvements in cognitive function, reduced neurological deficit after stroke, and accelerated recovery from brain injury. It is conceptually similar to Cerebrolysin but derived from cortical tissue.',
    halfLife: 'Complex mixture; variable',
    administrationRoutes: [
      { route: 'intramuscular', notes: 'Standard clinical route (daily courses of 10 injections)' },
    ],
    pubmedSearchTerms: [
      { term: 'cortexin neuropeptide TBI stroke cognitive' },
      { term: 'cortexin neuroprotection cerebral cortex' },
    ],
  },

  {
    name: 'IGF-2',
    slug: 'igf-2',
    aliases: [
      { alias: 'Insulin-like Growth Factor 2' },
      { alias: 'Somatomedin A' },
    ],
    categories: ['growth-hormone-axis', 'cognitive-enhancement'],
    researchStatus: 'preclinical',
    summary:
      'IGF-2 is a 67-amino-acid peptide growth factor closely related to IGF-1, primarily active during fetal and neonatal development. In adults, research highlights its potent cognitive effects — IGF-2 administration after training enhances long-term memory consolidation in rodents by a remarkable degree, acting through IGF2R and mannose-6-phosphate receptors in the hippocampus. It has also emerged as a candidate for treating cognitive deficits in aging and neurodegenerative disease.',
    halfLife: '~20–30 minutes (free); longer when bound to IGFBPs',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Systemic metabolic research' },
      { route: 'intrahippocampal', notes: 'Memory consolidation research (animal models)' },
    ],
    pubmedSearchTerms: [
      { term: 'IGF-2 memory consolidation hippocampus' },
      { term: 'insulin-like growth factor 2 cognitive aging' },
    ],
  },

  {
    name: 'Bradykinin',
    slug: 'bradykinin',
    aliases: [
      { alias: 'BK' },
      { alias: 'Kallidin precursor fragment' },
    ],
    casNumber: '58-82-2',
    categories: ['cardiovascular', 'pain-inflammation'],
    researchStatus: 'preclinical',
    summary:
      'Bradykinin is a 9-amino-acid vasoactive peptide of the kinin-kallikrein system. It produces vasodilation, increased vascular permeability, pain, and inflammation by acting on B1 and B2 receptors. ACE inhibitors (a major drug class) lower blood pressure partly by preventing bradykinin degradation. Icatibant, a B2 antagonist, is approved for hereditary angioedema. Research also implicates bradykinin in COVID-19 pathology (bradykinin storm hypothesis).',
    halfLife: '~30 seconds in plasma (cleaved by kininases)',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Research tool; clinical pain and vascular studies' },
    ],
    pubmedSearchTerms: [
      { term: 'bradykinin kinin kallikrein pain vasodilation' },
      { term: 'bradykinin B2 receptor angioedema ACE' },
    ],
  },

  {
    name: 'Enkephalins',
    slug: 'enkephalins',
    aliases: [
      { alias: 'Leu-Enkephalin' },
      { alias: 'Met-Enkephalin' },
      { alias: 'LENK' },
      { alias: 'MENK' },
    ],
    categories: ['pain-inflammation', 'immune-support', 'cognitive-enhancement'],
    researchStatus: 'preclinical',
    summary:
      'Enkephalins are endogenous opioid pentapeptides (Met-enkephalin and Leu-enkephalin) acting as natural ligands for delta and mu opioid receptors. They modulate pain, mood, reward, and immune function. Low-dose naltrexone (LDN) works partly by transiently blocking opioid receptors to upregulate enkephalin production. Methionine enkephalin (met-enkephalin) has shown immune-modulating and anti-tumor properties in research, particularly for HIV and cancer.',
    halfLife: '~1–2 minutes (rapidly cleaved by peptidases)',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Pharmacological research' },
    ],
    pubmedSearchTerms: [
      { term: 'enkephalin opioid receptor pain analgesia' },
      { term: 'met-enkephalin immune cancer low dose naltrexone' },
    ],
  },

  {
    name: 'GHRH',
    slug: 'ghrh',
    aliases: [
      { alias: 'Growth Hormone-Releasing Hormone' },
      { alias: 'Somatoliberin' },
      { alias: 'GHRH(1-44)' },
    ],
    casNumber: '83150-76-9',
    categories: ['growth-hormone-axis'],
    researchStatus: 'preclinical',
    summary:
      'GHRH is the endogenous 44-amino-acid hypothalamic peptide that drives the pulsatile secretion of growth hormone from the anterior pituitary. Native GHRH acts through GHRHR, stimulating GH gene transcription and secretion. It has a very short half-life in vivo, making it impractical as a therapeutic — which drove the development of modified analogs like sermorelin, CJC-1295, and tesamorelin. Research into GHRH receptor signaling underpins the entire GH secretagogue drug class.',
    halfLife: '~7 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'GH stimulation diagnostic testing' },
    ],
    pubmedSearchTerms: [
      { term: 'GHRH growth hormone releasing hormone pituitary' },
      { term: 'somatoliberin GHRHR somatotroph GH secretion' },
    ],
  },

  {
    name: 'Relaxin-2',
    slug: 'relaxin-2',
    aliases: [{ alias: 'Serelaxin' }, { alias: 'H2 relaxin' }],
    casNumber: '18734-94-6',
    categories: ['cardiovascular', 'healing-recovery'],
    researchStatus: 'phase3',
    summary:
      'Relaxin-2 is an endogenous peptide hormone structurally related to insulin, primarily known for its role in pregnancy (cervical ripening, joint laxity). Research discovered its potent anti-fibrotic properties — it remodels collagen networks in heart, kidney, lung, and liver — making it a leading candidate for fibrosis and acute heart failure. Serelaxin (recombinant relaxin) reached Phase 3 trials for acute heart failure with promising early signals but did not meet primary endpoints.',
    halfLife: '~10 minutes',
    administrationRoutes: [
      { route: 'intravenous', notes: 'Continuous infusion in acute heart failure trials' },
      { route: 'subcutaneous', notes: 'Chronic fibrosis research' },
    ],
    pubmedSearchTerms: [
      { term: 'relaxin serelaxin heart failure fibrosis' },
      { term: 'relaxin-2 collagen anti-fibrotic renal' },
    ],
  },

  {
    name: 'Elafin',
    slug: 'elafin',
    aliases: [{ alias: 'Trappin-2' }, { alias: 'SKALP' }],
    categories: ['antimicrobial', 'immune-support', 'healing-recovery'],
    researchStatus: 'phase2',
    summary:
      'Elafin is an endogenous serine protease inhibitor (serpin-like) peptide produced by epithelial cells at mucosal surfaces. It inhibits neutrophil elastase and proteinase 3, protecting tissues from excessive inflammatory damage, while also exhibiting direct antimicrobial activity against bacteria and fungi. Research focuses on inflammatory bowel disease, cystic fibrosis, ARDS, and vaginal microbiome modulation, where recombinant elafin is in Phase 2 trials.',
    halfLife: '~4–8 hours',
    administrationRoutes: [
      { route: 'topical', notes: 'Vaginal and pulmonary delivery research' },
      { route: 'intravenous', notes: 'Systemic anti-inflammatory trials' },
    ],
    pubmedSearchTerms: [
      { term: 'elafin trappin-2 neutrophil elastase inhibitor' },
      { term: 'elafin antimicrobial mucosal epithelium' },
    ],
  },

  {
    name: 'Fibroblast Growth Factor 21',
    slug: 'fgf-21',
    aliases: [{ alias: 'FGF-21' }],
    categories: ['fat-loss-metabolic', 'anti-aging-longevity'],
    researchStatus: 'phase2',
    summary:
      'FGF-21 is a 181-amino-acid endocrine fibroblast growth factor secreted by the liver under fasting conditions. It promotes fatty acid oxidation, ketogenesis, insulin sensitization, and thermogenesis in brown adipose tissue. Animal studies show it extends lifespan and reverses metabolic syndrome. Long-acting FGF-21 analogs and fusion proteins (efruxifermin, pegbelfermin) are in Phase 2–3 trials for NASH, type 2 diabetes, and dyslipidemia.',
    halfLife: '~30 minutes (native); analogs engineered for days',
    administrationRoutes: [
      { route: 'subcutaneous', notes: 'Clinical trial protocols for NASH and metabolic disease' },
    ],
    pubmedSearchTerms: [
      { term: 'FGF-21 fibroblast growth factor metabolic NASH' },
      { term: 'FGF21 insulin sensitivity brown adipose lifespan' },
    ],
  },
]
