import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PeptideCard } from '@/components/PeptideCard'
import type { Category, Peptide } from '@/payload-types'

export const revalidate = 3600

// ─── Content map ────────────────────────────────────────────────────────────

type CategoryContent = {
  metaTitle: string
  metaDescription: string
  heroSubtitle: string
  intro: string
  applications: Array<{ heading: string; body: string }>
  relatedTerms: string[]
  faqQuestion: string
  faqAnswer: string
}

const CATEGORY_CONTENT: Record<string, CategoryContent> = {
  'growth-hormone-axis': {
    metaTitle: 'Growth hormone peptides — GHRPs & GHRH analogs | Peptide United',
    metaDescription:
      'Research overview of growth hormone peptides including ipamorelin, CJC-1295, sermorelin, and tesamorelin. How GHRPs and GHRH analogs stimulate pulsatile GH release.',
    heroSubtitle:
      'Peptides that act on the growth hormone axis — either mimicking GHRH at the pituitary or stimulating ghrelin receptors to drive pulsatile GH secretion. Includes both GHRPs and GHRH analogs studied for IGF-1 modulation and metabolic effects.',
    intro: `The growth hormone axis is regulated by two opposing hypothalamic signals: growth hormone-releasing hormone (GHRH), which stimulates GH secretion, and somatostatin, which suppresses it. Peptides in this category work at one or both points in that system. GHRH analogs like sermorelin and CJC-1295 bind the GHRH receptor on somatotroph cells, while growth hormone-releasing peptides (GHRPs) such as ipamorelin and GHRP-2 act on the ghrelin receptor (GHSR-1a) through a distinct pathway. Many protocols combine both classes to amplify the GH pulse.

The downstream effects of GH secretion are largely mediated through IGF-1, produced primarily in the liver. Tesamorelin, a stabilized GHRH analog, is the only FDA-approved peptide in this category — indicated for HIV-associated lipodystrophy — which provides a useful window into the established pharmacology. Research into this axis spans body composition, recovery, and metabolic regulation, though most peptides here remain investigational outside that single approved indication.`,
    applications: [
      {
        heading: 'Pulsatile GH stimulation',
        body:
          'CJC-1295 with DAC extends the half-life of GHRH signaling by binding albumin, producing sustained elevation of GH and IGF-1 compared to native GHRH. Ipamorelin is studied alongside it for its selectivity — unlike GHRP-6, it does not significantly raise cortisol or prolactin at research doses.',
      },
      {
        heading: 'Body composition research',
        body:
          'Tesamorelin has been studied in randomized controlled trials showing statistically significant reductions in visceral adipose tissue in HIV-positive adults. Research on sermorelin in age-related GH decline suggests modest improvements in lean mass and sleep architecture, though effect sizes vary considerably.',
      },
      {
        heading: 'IGF-1 axis modulation',
        body:
          'Because GH stimulates hepatic IGF-1 production, secretagogue peptides are frequently studied as indirect tools for examining the GH/IGF-1 axis without exogenous GH. This makes them useful in models investigating growth, tissue repair, and metabolic regulation where direct IGF-1 administration would be confounding.',
      },
    ],
    relatedTerms: ['ipamorelin', 'CJC-1295', 'sermorelin', 'GHRP-2', 'tesamorelin', 'IGF-1'],
    faqQuestion: 'What are growth hormone peptides?',
    faqAnswer:
      'Growth hormone peptides are synthetic compounds that stimulate the pituitary gland to produce and release growth hormone. They fall into two main classes: GHRH analogs (like sermorelin and CJC-1295) that mimic the hypothalamic signal, and GHRPs (like ipamorelin and GHRP-2) that activate ghrelin receptors through a separate pathway. Both classes are studied for their effects on IGF-1 levels, body composition, and metabolic function.',
  },

  'healing-recovery': {
    metaTitle: 'Peptides for tissue repair — BPC-157, TB-500 & wound healing | Peptide United',
    metaDescription:
      'Research on tissue repair peptides including BPC-157, TB-500 (thymosin beta-4), and GHK-Cu. How these peptides influence tendon repair, wound healing, and regenerative signaling.',
    heroSubtitle:
      'A group of peptides studied for their roles in soft tissue repair, angiogenesis, and wound healing. BPC-157, TB-500, and GHK-Cu represent three distinct mechanisms, all relevant to how damaged tissue is signaled to rebuild.',
    intro: `Tissue repair is a coordinated process involving inflammation, angiogenesis, fibroblast proliferation, and matrix remodeling. The peptides grouped here each interact with one or more of those phases. BPC-157 (body protection compound, a 15-amino-acid sequence derived from human gastric juice) has been studied extensively in rat and rodent models for its effects on tendon-to-bone healing, gastrointestinal integrity, and neurological recovery — though human trial data remain limited. TB-500 is a synthetic analog of thymosin beta-4, an endogenous protein that promotes actin polymerization and has a well-characterized role in cardiac repair and angiogenesis.

GHK-Cu (glycine-histidine-lysine bound to copper) works differently, functioning as a chemoattractant for repair cells and a regulator of gene expression involved in collagen synthesis and antioxidant response. It is found naturally in human plasma and declines with age. The mechanistic overlap between these three — particularly around growth factor upregulation and vascular remodeling — is why they are frequently co-studied in recovery contexts, though they are not interchangeable and have distinct receptor interactions.`,
    applications: [
      {
        heading: 'Tendon and ligament repair',
        body:
          'BPC-157 has been studied in models of Achilles tendon transection, rotator cuff injury, and ligament damage, showing accelerated histological repair and improved biomechanical properties in treated animals. The proposed mechanism involves upregulation of the growth hormone receptor in tendon fibroblasts and FAK-paxillin pathway activation.',
      },
      {
        heading: 'Gastrointestinal integrity',
        body:
          'One of the more consistent findings in BPC-157 research is its protective effect on the gut lining. Studies in models of NSAID-induced ulceration, inflammatory bowel disease, and short bowel syndrome show it reduces mucosal damage and accelerates healing, likely through nitric oxide pathway modulation and angiogenesis promotion.',
      },
      {
        heading: 'Wound healing and skin repair',
        body:
          'GHK-Cu has been shown in cell culture and animal studies to increase collagen and glycosaminoglycan synthesis, attract immune cells to wound sites, and stimulate nerve outgrowth. In clinical cosmetic research it is applied topically for its ability to stimulate dermal remodeling — one of the few peptides in this category with meaningful human application data.',
      },
    ],
    relatedTerms: [
      'BPC-157',
      'TB-500',
      'thymosin beta-4',
      'GHK-Cu',
      'peptide for tendon repair',
      'wound healing peptide',
    ],
    faqQuestion: 'What peptide is used for tissue repair and recovery?',
    faqAnswer:
      'BPC-157 and TB-500 (thymosin beta-4 fragment) are the most studied peptides for tissue repair. BPC-157 has shown consistent results in animal models for tendon, ligament, and gut healing. TB-500 promotes actin dynamics and angiogenesis, which are important in muscle and cardiac repair. GHK-Cu is studied for its role in collagen synthesis and skin remodeling, with topical human application data available.',
  },

  'cognitive-enhancement': {
    metaTitle: 'Nootropic peptides — semax, selank & cognitive research | Peptide United',
    metaDescription:
      'Research on nootropic peptides including semax, selank, and neuropeptide analogs studied for cognitive enhancement, BDNF upregulation, and anxiety modulation.',
    heroSubtitle:
      'Neuropeptides and their synthetic analogs studied for effects on memory, attention, BDNF expression, and stress response. Semax and selank are the most characterized in this class, with documented research from Russian clinical programs spanning several decades.',
    intro: `Cognitive-acting peptides work through several mechanisms that differ substantially from small-molecule nootropics. Semax is a synthetic heptapeptide analog of ACTH(4-10) that has been shown to upregulate BDNF and its receptor TrkB in the prefrontal cortex and hippocampus, which may account for its reported effects on attention and working memory in human studies. It was developed and has been clinically used in Russia for stroke recovery and cognitive decline. Selank is a synthetic analog of tuftsin (an immunopeptide) with anxiolytic properties, studied for its interaction with GABA-A receptors and its influence on serotonin and dopamine metabolism without the sedation profile of benzodiazepines.

Other neuropeptides in this category include Dihexa, a hepatocyte growth factor modulator that shows potent pro-cognitive effects in rodent models at extremely low doses, and cerebrolysin, a hydrolysate of porcine brain protein used clinically in parts of Europe and Asia for vascular dementia and Alzheimer's disease. The common thread is interaction with neuroplasticity signaling — BDNF, NGF, or synaptic growth factor pathways — rather than simple monoamine manipulation.`,
    applications: [
      {
        heading: 'Attention and working memory',
        body:
          'Semax has been studied in human subjects in the context of vascular brain lesions, showing improvements in attention and short-term memory retention compared to controls. Its ACTH-analog structure allows it to cross the blood-brain barrier efficiently, and intranasal administration produces rapid CNS distribution, which is why this route is most commonly used in research protocols.',
      },
      {
        heading: 'Anxiety modulation without sedation',
        body:
          'Selank has been studied in clinical trials in Russia as an anxiolytic, with some data showing effects comparable to benzodiazepines on anxiety measures without the cognitive dampening or dependency risk. It appears to normalize enkephalin metabolism and modulate serotonin transport, producing a calming effect without receptor downregulation seen with GABAergic drugs.',
      },
      {
        heading: 'Neuroplasticity and recovery',
        body:
          'BDNF upregulation is a central mechanism in several peptides in this category. Higher BDNF expression is associated with synaptic density, long-term potentiation, and resilience to neuronal damage. Semax in particular has been studied for its role in ischemic brain injury recovery, where BDNF induction may help spare penumbral tissue and accelerate functional recovery.',
      },
    ],
    relatedTerms: [
      'semax peptide',
      'selank peptide',
      'BDNF',
      'nootropic peptides',
      'Dihexa',
      'peptides for brain fog',
    ],
    faqQuestion: 'What are nootropic peptides and how do they work?',
    faqAnswer:
      'Nootropic peptides are neuropeptides or their synthetic analogs that influence brain function through neuroplasticity signaling rather than simple neurotransmitter manipulation. Semax works primarily by upregulating BDNF and TrkB receptors, enhancing neuronal growth and synaptic plasticity. Selank modulates enkephalin metabolism and GABA-A receptor activity to reduce anxiety without sedation. Unlike most small-molecule nootropics, these peptides act on growth factor pathways that support long-term neural structure.',
  },

  'fat-loss-metabolic': {
    metaTitle: 'Peptides for fat loss — AOD-9604, HGH fragment 176-191 & metabolic research | Peptide United',
    metaDescription:
      'Research on fat loss peptides including AOD-9604, HGH fragment 176-191, and metabolic peptides studied for lipolysis, body composition, and adipose tissue regulation.',
    heroSubtitle:
      'Peptides studied for their influence on lipolysis, adipogenesis, and metabolic rate. This category includes fragments of growth hormone, GLP-1 receptor agonists, and other compounds studied for their direct effects on adipose tissue without the full anabolic profile of intact GH.',
    intro: `Human growth hormone has a well-characterized lipolytic domain in its C-terminal region, specifically around amino acids 176-191. AOD-9604 (anti-obesity drug) is a synthetic version of this fragment that retains fat-metabolizing activity while lacking the insulin-like effects that make full-length GH problematic at pharmacological doses. It activates the beta-3 adrenergic receptor pathway and mimics the lipolytic action of GH in adipocytes without causing glucose intolerance or IGF-1 elevation. This selectivity was the basis of its development as an obesity drug, though clinical trials for that indication were ultimately disappointing at the doses tested.

Metabolic peptides extend beyond simple fat-burning compounds. MOTS-c, a mitochondrially encoded peptide, regulates AMPK and one-carbon metabolism pathways, improving insulin sensitivity and metabolic flexibility. GLP-1 receptor agonists, while developed as drugs (semaglutide, tirzepatide), have their origins in the study of incretin peptides and remain relevant to this category from a mechanistic standpoint. Research in this area increasingly focuses on the interplay between fat mass, metabolic rate, and energy substrate preference rather than simple caloric effects.`,
    applications: [
      {
        heading: 'Direct lipolysis stimulation',
        body:
          'AOD-9604 and HGH fragment 176-191 stimulate fat breakdown in adipocytes through beta-adrenergic mechanisms independent of GH receptor binding. In animal studies, these compounds reduce body fat percentage without measurable effects on linear growth or insulin sensitivity, which distinguishes them from intact growth hormone at equivalent lipolytic doses.',
      },
      {
        heading: 'Insulin sensitivity and glucose metabolism',
        body:
          'MOTS-c has been studied for its role in regulating folate and methionine metabolism via AMPK activation, which improves skeletal muscle glucose uptake. In aged mice, MOTS-c administration improves insulin sensitivity to levels comparable to those seen with exercise. This positions it as a metabolic peptide with implications beyond fat loss alone.',
      },
      {
        heading: 'Adipogenesis inhibition',
        body:
          'Some peptides in this category, including AOD-9604, have been shown to inhibit differentiation of pre-adipocytes into mature fat cells, not just accelerate fat breakdown in existing adipocytes. This dual action — reducing both adipocyte size and number in research models — makes the mechanism relevant to long-term body composition research rather than acute weight loss.',
      },
    ],
    relatedTerms: [
      'AOD-9604',
      'HGH fragment 176-191',
      'peptides for fat loss',
      'lipolysis peptide',
      'metabolic peptides',
      'MOTS-c',
    ],
    faqQuestion: 'What peptides are studied for fat loss?',
    faqAnswer:
      'AOD-9604 and HGH fragment 176-191 are the most directly studied peptides for lipolysis. Both are derived from the C-terminal region of human growth hormone and activate beta-adrenergic fat-burning pathways without raising IGF-1. MOTS-c is studied for improving insulin sensitivity and metabolic flexibility via AMPK activation. GLP-1 receptor agonists like semaglutide, originally peptide-based drugs, have reshaped metabolic research by demonstrating potent appetite and fat mass regulation through gut hormone signaling.',
  },

  'sexual-health': {
    metaTitle: 'PT-141 peptide & bremelanotide — melanocortin sexual health research | Peptide United',
    metaDescription:
      'Research on PT-141 (bremelanotide) and melanocortin peptides studied for sexual dysfunction, libido, and central arousal pathways in men and women.',
    heroSubtitle:
      'Melanocortin receptor agonists and related peptides studied for their effects on sexual function and arousal. PT-141 (bremelanotide) operates centrally rather than through vascular mechanisms, distinguishing this class from phosphodiesterase inhibitors.',
    intro: `Sexual response involves coordinated signaling across central and peripheral nervous systems, and the melanocortin system plays a specific role in initiating sexual arousal at the CNS level. PT-141, also known as bremelanotide, is a cyclic analog of alpha-MSH (alpha-melanocyte-stimulating hormone) that acts on MC3R and MC4R receptors in the hypothalamus. Unlike sildenafil or similar drugs that work by increasing penile blood flow, PT-141 acts upstream — modulating the neural circuits that generate arousal and desire. It was FDA-approved in 2019 under the name Vyleesi for hypoactive sexual desire disorder in premenopausal women, making it one of the few peptides in this entire encyclopedia with a documented regulatory approval pathway.

The broader category of melanocortin peptides includes MT-II (melanotan II), which was investigated earlier for tanning and sexual function but has a less selective receptor profile. Research interest in this area has expanded to include peptides targeting specific receptor subtypes (MC4R selectivity in particular) to separate sexual function effects from the nausea and blood pressure changes that can accompany non-selective melanocortin activation. Understanding the central mechanism makes this category distinct from peripheral vascular or hormonal approaches to sexual dysfunction.`,
    applications: [
      {
        heading: 'Central arousal pathway activation',
        body:
          'PT-141 has been studied in both male and female subjects, with early phase II trials showing increased sexual desire and arousal events compared to placebo in women with HSDD. In men with erectile dysfunction who were non-responsive to sildenafil, PT-141 showed additive effects — suggesting the central melanocortin pathway contributes to arousal independently of penile vascular tone.',
      },
      {
        heading: 'Receptor selectivity research',
        body:
          'A significant portion of research in this category focuses on separating MC4R-mediated sexual effects from MC1R and MC3R-mediated side effects including nausea and hyperpigmentation. Selective MC4R agonists remain an active area of drug development, using the existing PT-141 data as a proof of concept for central arousal modulation.',
      },
      {
        heading: 'Hypoactive sexual desire in women',
        body:
          'HSDD is poorly served by existing pharmacology, which is why bremelanotide\'s approval pathway attracted attention. Clinical data showed statistically significant improvement in satisfying sexual events and desire scores. Unlike flibanserin (the other approved agent), PT-141 is used on-demand rather than daily, which aligns better with how patients actually seek treatment.',
      },
    ],
    relatedTerms: [
      'PT-141',
      'bremelanotide',
      'melanocortin peptide',
      'MC4R agonist',
      'peptides for libido',
      'HSDD treatment research',
    ],
    faqQuestion: 'How does PT-141 work for sexual dysfunction?',
    faqAnswer:
      'PT-141 (bremelanotide) is a melanocortin receptor agonist that acts on MC3R and MC4R receptors in the hypothalamus to stimulate central arousal pathways. Unlike PDE5 inhibitors that work on penile vasculature, PT-141 modulates the neural circuits governing sexual desire and arousal. It was FDA-approved in 2019 for hypoactive sexual desire disorder (HSDD) in premenopausal women under the brand name Vyleesi, and has been studied in men with erectile dysfunction as a centrally-acting complement to vascular therapies.',
  },

  'anti-aging-longevity': {
    metaTitle: 'Longevity peptides — epithalon, MOTS-c & cellular repair research | Peptide United',
    metaDescription:
      'Research on anti-aging peptides including epithalon, MOTS-c, and compounds studied for telomere regulation, cellular repair, and healthspan extension.',
    heroSubtitle:
      'Peptides studied for their effects on cellular aging mechanisms — telomere dynamics, mitochondrial function, epigenetic regulation, and inflammatory signaling. This is a mechanistically diverse category united by focus on the biology of aging rather than any single pathway.',
    intro: `Aging at the cellular level involves multiple converging processes: telomere shortening, accumulation of senescent cells, mitochondrial dysfunction, altered proteostasis, and shifts in gene expression driven by epigenetic changes. The peptides in this category each target one or more of these hallmarks. Epithalon (Epitalon), a tetrapeptide originally isolated from the pineal gland extract Epithalamin by the researcher Vladimir Khavinson, has been studied for its ability to activate telomerase — the enzyme that extends telomere length — in both cell culture and some animal lifespan studies. These findings are biologically interesting but require cautious interpretation given the small body of human data.

MOTS-c is a mitochondrially derived peptide that regulates nuclear gene expression through AMPK pathways and is studied for its role in maintaining metabolic homeostasis with age. Thymalin and other thymic peptides address immune system aging (immunosenescence), a significant but underappreciated dimension of the aging phenotype. Longer-lived healthspan research is now examining these compounds in combination rather than in isolation, reflecting growing understanding that no single pathway drives aging — and no single peptide is likely to address it comprehensively.`,
    applications: [
      {
        heading: 'Telomerase activation and telomere length',
        body:
          'Epithalon has been shown in cell culture studies to increase telomerase activity and slow telomere shortening in human cells, including fetal lung fibroblasts and lymphocytes. Khavinson\'s group reported extended lifespan in mice and fruit flies treated with epithalon, though the translation of these findings to human biology requires substantially more controlled research.',
      },
      {
        heading: 'Senescence and inflammatory signaling',
        body:
          'Senescent cells accumulate with age and secrete a pro-inflammatory cocktail (the senescence-associated secretory phenotype, or SASP) that damages surrounding tissue. Some peptides in this category, including certain bioregulator peptides from Khavinson\'s work, appear to reduce markers of cellular senescence in aged animal models, though the mechanisms are not fully characterized.',
      },
      {
        heading: 'Metabolic healthspan',
        body:
          'MOTS-c declines with age and its administration in older mice restores insulin sensitivity, exercise capacity, and metabolic rate to levels closer to young animals. This positions it as a regulator of metabolic aging rather than a simple fat-loss compound, with implications for age-related metabolic disease prevention.',
      },
    ],
    relatedTerms: [
      'epithalon peptide',
      'MOTS-c',
      'telomerase activator',
      'longevity peptides',
      'Humanin',
      'bioregulator peptides',
    ],
    faqQuestion: 'What are longevity peptides and what do they target?',
    faqAnswer:
      'Longevity peptides are compounds studied for their effects on the biological mechanisms of aging, including telomere dynamics, mitochondrial function, and cellular senescence. Epithalon is studied for telomerase activation and has been shown to extend telomere length in human cell cultures. MOTS-c targets AMPK and mitochondrial metabolic pathways that decline with age. Unlike anti-aging cosmetics, these peptides work at the cellular signaling level, though human evidence for most remains limited and largely preclinical.',
  },

  'immune-support': {
    metaTitle: 'Thymosin alpha-1, KPV & immunomodulatory peptides | Peptide United',
    metaDescription:
      'Research on immune peptides including thymosin alpha-1, KPV, and LL-37. How immunomodulatory peptides regulate T-cell maturation, innate immunity, and inflammatory balance.',
    heroSubtitle:
      'Peptides that modulate immune function through thymic signaling, toll-like receptor pathways, and cytokine regulation. Thymosin alpha-1 is the most clinically developed compound in this class, with approved use in multiple countries for viral hepatitis and as a vaccine adjuvant.',
    intro: `The immune system\'s peptide-based regulation is ancient and complex. Thymic peptides play a particularly well-studied role: the thymus produces several proteins that govern T-cell maturation, and synthetic analogs have been developed to replicate this signaling in conditions where thymic function is compromised. Thymosin alpha-1 (Ta1), a 28-amino-acid peptide originally isolated from thymosin fraction 5, is the most clinically developed. It is approved in over 35 countries for chronic hepatitis B and C, and has been studied as an adjuvant in cancer immunotherapy, COVID-19, and vaccine protocols. Its mechanism involves TLR-9 activation on dendritic cells and direct enhancement of Th1 cytokine production.

KPV, a tripeptide derived from the C-terminus of alpha-MSH (Lys-Pro-Val), has anti-inflammatory and antimicrobial properties through MC1R binding on immune cells and intestinal epithelium. It has been studied in models of inflammatory bowel disease and Candida infection. LL-37, the only known human cathelicidin, sits at the intersection of antimicrobial and immunomodulatory functions — it kills bacteria directly while also signaling immune cell recruitment and dampening excessive inflammatory responses. These peptides collectively represent how the immune system uses short sequences to coordinate complex, context-dependent responses.`,
    applications: [
      {
        heading: 'T-cell maturation and adaptive immunity',
        body:
          'Thymosin alpha-1 promotes differentiation of naive T-cells and enhances NK cell activity. In immunocompromised patients, it has been studied as a means of restoring functional immune responses without the toxicity of broader immunostimulants. Post-COVID studies have examined it for persistent immune dysregulation in long-COVID presentations.',
      },
      {
        heading: 'Intestinal immune regulation',
        body:
          'KPV has been studied specifically in gut models, where it appears to reduce NF-kB activation in intestinal epithelial cells and reduce secretion of pro-inflammatory cytokines including IL-8 and TNF-alpha. Oral and rectal formulations have been tested in animal models of colitis, positioning KPV as a candidate for gut-targeted immune modulation.',
      },
      {
        heading: 'Innate immune defense',
        body:
          'LL-37 is produced by neutrophils, macrophages, and epithelial cells in response to infection. Beyond its direct antimicrobial function, it acts as a chemoattractant for monocytes and T-cells, enhances toll-like receptor expression, and modulates the inflammatory response to avoid septic-spectrum overactivation. Its deficiency has been linked to increased susceptibility to skin, lung, and gut infections.',
      },
    ],
    relatedTerms: [
      'thymosin alpha-1',
      'KPV peptide',
      'LL-37',
      'immunomodulatory peptide',
      'thymic peptides',
      'immune support peptide',
    ],
    faqQuestion: 'What is thymosin alpha-1 and how does it support immunity?',
    faqAnswer:
      'Thymosin alpha-1 is a 28-amino-acid peptide derived from thymosin fraction 5, the thymic secretion that governs T-cell development. It works by activating toll-like receptor 9 on dendritic cells, enhancing Th1 cytokine responses, and improving T-cell and NK cell activity. It is approved in over 35 countries for hepatitis B and C treatment, and has been studied as an immune adjuvant in cancer therapy, vaccine protocols, and, more recently, in managing viral infection sequelae.',
  },

  'muscle-performance': {
    metaTitle: 'Peptides for muscle growth — IGF-1 LR3, follistatin & performance research | Peptide United',
    metaDescription:
      'Research on muscle performance peptides including IGF-1 LR3, follistatin, and compounds studied for muscle protein synthesis, satellite cell activation, and recovery.',
    heroSubtitle:
      'Peptides studied for their influence on muscle fiber hypertrophy, satellite cell activation, myostatin inhibition, and recovery from mechanical loading. IGF-1 LR3 and follistatin represent two distinct but complementary mechanisms for increasing muscle mass in research models.',
    intro: `Skeletal muscle growth at the cellular level requires satellite cell activation, myonuclei accretion, increased protein synthesis, and suppression of atrophy signaling. Peptides in this category intervene at one or more of these steps. IGF-1 LR3 (long Arg3 IGF-1) is a modified form of insulin-like growth factor 1 with an extended half-life — native IGF-1 is rapidly bound by IGF binding proteins, while the Arg3 substitution reduces this binding, allowing more free IGF-1 to interact with muscle IGF-1 receptors. This activates PI3K/Akt/mTOR signaling and promotes both satellite cell proliferation and protein synthesis.

Follistatin is a glycoprotein that inhibits myostatin and activin A — both members of the TGF-beta superfamily that normally limit muscle growth. Elevated follistatin in animal models produces dramatic muscle mass increases, and certain follistatin-activating peptides or gene therapy approaches have attracted significant research interest. MGF (mechano-growth factor), a splice variant of IGF-1 expressed locally in response to mechanical loading, is another peptide in this class with distinct signaling from systemic IGF-1. The interplay between these systemic and local growth signals is central to understanding how muscle adapts to training.`,
    applications: [
      {
        heading: 'Myofibrillar protein synthesis',
        body:
          'IGF-1 LR3 activates the mTOR pathway in skeletal muscle, increasing ribosomal biogenesis and translational efficiency for myosin heavy chain and actin synthesis. In cell culture and animal models, it produces significant increases in muscle fiber cross-sectional area, and is used extensively in myogenesis research as a positive control for anabolic signaling.',
      },
      {
        heading: 'Myostatin inhibition and hyperplasia',
        body:
          'Follistatin-344 and follistatin-315 are the two main isoforms studied in research. By sequestering myostatin, they remove the primary brake on muscle growth, allowing satellite cell proliferation and fiber hypertrophy beyond what IGF-1/mTOR alone would produce. Myostatin knockout mice exhibit roughly double the muscle mass of wild-type animals, illustrating the magnitude of this pathway\'s effect.',
      },
      {
        heading: 'Recovery from eccentric damage',
        body:
          'MGF is expressed acutely in response to muscle fiber damage from eccentric loading. Its role appears to be in activating quiescent satellite cells and priming them for proliferation before systemic IGF-1 takes over for the later anabolic phase. Understanding this temporal separation between local (MGF) and systemic (IGF-1) growth signaling has changed how researchers model exercise-induced hypertrophy.',
      },
    ],
    relatedTerms: [
      'IGF-1 LR3',
      'follistatin',
      'MGF',
      'myostatin inhibitor',
      'peptides for muscle growth',
      'muscle recovery peptide',
    ],
    faqQuestion: 'What peptides are studied for muscle growth?',
    faqAnswer:
      'IGF-1 LR3 and follistatin are the most studied peptides for muscle hypertrophy. IGF-1 LR3 activates the mTOR pathway to increase protein synthesis and satellite cell proliferation. Follistatin inhibits myostatin — the primary negative regulator of muscle growth — and its overexpression in animal models produces dramatic increases in muscle mass. MGF (mechano-growth factor), a splice variant of IGF-1, is specifically expressed in response to mechanical loading and plays a distinct role in early satellite cell activation after exercise-induced damage.',
  },

  'skin-cosmetic': {
    metaTitle: 'GHK-Cu & peptides in skincare — collagen synthesis research | Peptide United',
    metaDescription:
      'Research on skin peptides including GHK-Cu (copper peptide), collagen-stimulating sequences, and what peptides do in skincare for dermal remodeling and wound repair.',
    heroSubtitle:
      'Peptides applied topically or studied in dermal models for collagen synthesis, wound repair, antioxidant signaling, and skin structure maintenance. GHK-Cu is the most extensively characterized compound in this category, with decades of peer-reviewed research.',
    intro: `Skin aging involves loss of collagen density (especially types I and III), reduced glycosaminoglycan content, decreased fibroblast activity, and impaired wound healing response. Several classes of peptides have been developed or identified to address these changes at the cellular level. GHK-Cu (glycine-histidine-lysine with a copper ion) is a naturally occurring peptide found in human plasma that acts as a potent tissue remodeling signal. It promotes fibroblast proliferation, stimulates collagen and elastin synthesis, activates matrix metalloproteinases for collagen remodeling, and has antioxidant and anti-inflammatory properties. Plasma GHK-Cu levels decline substantially with age, from around 200 ng/mL at age 20 to near undetectable levels by age 60.

Beyond copper peptides, the skincare peptide category includes signal peptides (like Matrixyl/Palmitoyl pentapeptide-4, which mimics procollagen fragments to stimulate synthesis), carrier peptides, and neurotransmitter-inhibiting sequences (like Argireline, an analog of SNAP-25 that reduces acetylcholine release at the neuromuscular junction). The mechanisms are real, though penetration through the stratum corneum remains a limiting factor for many — which is why delivery system research and peptide lipidation are active areas in cosmetic science.`,
    applications: [
      {
        heading: 'Collagen and elastin stimulation',
        body:
          'GHK-Cu has been shown in fibroblast culture and human skin biopsy studies to increase type I collagen synthesis, fibronectin, and decorin while simultaneously stimulating the enzymes that remodel and cross-link new collagen. This dual effect — synthesis plus remodeling — is more physiologically complete than approaches that simply stimulate collagen production without improving matrix organization.',
      },
      {
        heading: 'Wound healing acceleration',
        body:
          'In partial-thickness wound models, GHK-Cu attracts macrophages and mast cells to the wound site, increases blood vessel formation, and reduces scarring versus untreated controls. These wound-healing properties informed its cosmetic applications: the same signaling that speeds surgical wound closure also improves the skin\'s ability to repair chronic low-level damage from UV, pollution, and mechanical stress.',
      },
      {
        heading: 'Gene expression and anti-aging signaling',
        body:
          'Microarray analyses of cells treated with GHK-Cu show broad changes in gene expression affecting DNA repair, antioxidant enzyme systems, and growth factor production. Studies suggest it resets fibroblast gene expression closer to a younger phenotype, which aligns with its observed effects on skin thickness, firmness, and reduction in fine line depth in human clinical trials.',
      },
    ],
    relatedTerms: [
      'GHK-Cu',
      'copper peptide',
      'Matrixyl',
      'what are peptides in skincare',
      'collagen synthesis peptide',
      'peptide skincare',
    ],
    faqQuestion: 'What do peptides do in skincare?',
    faqAnswer:
      'Peptides in skincare work by mimicking or triggering the signaling sequences the skin uses to regulate collagen production, wound repair, and cellular renewal. GHK-Cu, a copper-binding peptide naturally found in young skin, stimulates fibroblast activity and collagen synthesis while remodeling existing matrix through metalloproteinase activation. Signal peptides like Matrixyl work by mimicking procollagen fragments that signal the skin to produce more collagen. Neurotransmitter-inhibiting peptides like Argireline reduce muscle contraction intensity at injection-free doses. The limiting factor for most topical peptides is skin penetration through the outer epidermal barrier.',
  },

  cardiovascular: {
    metaTitle: 'Cardiovascular peptides — BPC-157, thymosin beta-4 & vascular research | Peptide United',
    metaDescription:
      'Research on cardiovascular peptides including BPC-157, thymosin beta-4, and compounds studied for cardiac repair, vascular remodeling, and heart protection.',
    heroSubtitle:
      'Peptides studied in cardiac and vascular models for their effects on angiogenesis, cardiomyocyte protection, vascular tone regulation, and recovery from ischemic injury. Thymosin beta-4 has the strongest cardiac data in this class.',
    intro: `The heart and vasculature use peptide signaling extensively. Natriuretic peptides (ANP, BNP) regulate blood pressure and fluid balance; angiotensin peptides control vascular tone; and endogenous fragments of various proteins mediate local tissue repair after ischemia. Research into exogenous peptides for cardiovascular applications focuses on two main areas: protecting cardiomyocytes from ischemia-reperfusion injury, and stimulating angiogenesis or vascular remodeling in damaged tissue. Thymosin beta-4 is the most studied single compound in this category, originally characterized for its role in actin sequestration but later found to be a potent mediator of cardiac progenitor cell activation and blood vessel formation.

BPC-157 has also been studied in cardiovascular models, showing protective effects on endothelial function, vascular healing after injury, and protection against NSAID- and alcohol-induced damage to the vascular endothelium. Its proposed mechanisms in this context involve nitric oxide pathway modulation and promotion of collateral vessel growth. Natriuretic peptide analogs, thymosin fragments, and apelin receptor agonists represent areas of active drug development, with several compounds entering clinical trials for heart failure and post-infarction repair.`,
    applications: [
      {
        heading: 'Cardiac repair after ischemia',
        body:
          'Thymosin beta-4 has been studied in mouse and rat models of myocardial infarction, where it activates epicardial progenitor cells (epicardium-derived cells, or EPDCs) that normally remain quiescent in adult hearts. In these models, TB4 treatment increased cardiomyocyte survival in the border zone and reduced infarct size, suggesting a role in reactivating embryonic repair programs that are normally silenced after birth.',
      },
      {
        heading: 'Angiogenesis and collateral vessel formation',
        body:
          'Multiple peptides in this category promote therapeutic angiogenesis — growth of new blood vessels to bypass or supplement occluded arteries. BPC-157 and thymosin beta-4 both upregulate VEGF and promote endothelial migration and tube formation in vitro. In limb ischemia models, treated animals show improved perfusion and reduced tissue necrosis compared to controls.',
      },
      {
        heading: 'Endothelial protection and vascular tone',
        body:
          'The endothelium is not simply a passive lining but an active signaling organ producing nitric oxide, prostacyclin, and endothelin to regulate vascular tone. BPC-157 has been shown to protect against endothelial dysfunction induced by NSAIDs, ethanol, and oxidative stress, with several studies pointing to NO synthase pathway upregulation as the primary mechanism.',
      },
    ],
    relatedTerms: [
      'thymosin beta-4 heart',
      'BPC-157 cardiovascular',
      'cardiac repair peptide',
      'angiogenesis peptide',
      'vascular peptide',
      'heart peptide research',
    ],
    faqQuestion: 'What peptides are studied for cardiovascular health?',
    faqAnswer:
      'Thymosin beta-4 is the most studied peptide for cardiovascular repair, with evidence in animal models showing activation of cardiac progenitor cells and reduced infarct size after myocardial injury. BPC-157 has been studied for endothelial protection and collateral vessel formation. Both compounds promote angiogenesis through VEGF pathway activation. Natriuretic peptide analogs are used clinically for heart failure diagnosis and treatment, and represent the most developed cardiovascular peptide drug class.',
  },

  neuroprotection: {
    metaTitle: 'Neuroprotective peptides — semax, cerebrolysin & brain protection research | Peptide United',
    metaDescription:
      'Research on neuroprotective peptides including semax, cerebrolysin, and compounds studied for neurodegeneration, ischemic brain injury, and neuronal survival.',
    heroSubtitle:
      'Peptides studied for their ability to protect neurons from ischemic damage, excitotoxicity, and neurodegenerative processes. This category overlaps with cognitive enhancement but focuses specifically on disease-state neuroprotection rather than healthy cognition optimization.',
    intro: `Neurodegeneration and acute brain injury involve overlapping but distinct mechanisms. In acute ischemia, neurons die from energy failure, excitotoxic glutamate release, and oxidative stress within hours of blood flow interruption. In chronic neurodegeneration (Alzheimer's, Parkinson's, ALS), the timeline is years to decades, with protein aggregation, mitochondrial dysfunction, and neuroinflammation as primary drivers. Peptides studied for neuroprotection must therefore be evaluated against the specific injury context — a compound protective in stroke models may have no relevance to Alzheimer's pathology, and vice versa.

Semax's neuroprotective properties are well-studied in ischemic contexts, where its BDNF-upregulating effects appear to reduce penumbral neuron death and improve functional recovery. Cerebrolysin, a defined mixture of neuropeptides from porcine brain protein hydrolysis, is approved in Russia, China, and several European countries for ischemic stroke and Alzheimer's disease, and has completed multiple randomized controlled trials. Dihexa, a hepatocyte growth factor system modulator, shows remarkably potent pro-cognitive and neuroprotective effects in animal models at nanomolar concentrations, with a mechanism distinct from BDNF-pathway peptides.`,
    applications: [
      {
        heading: 'Ischemic stroke recovery',
        body:
          'Semax administered intranasally within hours of experimental ischemia reduces infarct volume and improves neurological function scores in rat stroke models. Human clinical data from Russia support its use as an adjunct in acute ischemic stroke, with studies showing improved neurological outcomes versus standard care alone. The drug is registered in Russia and Ukraine for this indication.',
      },
      {
        heading: 'Neurodegenerative disease modification',
        body:
          'Cerebrolysin has completed over 20 randomized controlled trials across Alzheimer\'s disease, vascular dementia, and stroke recovery. Meta-analyses show modest but consistent improvements in cognitive and clinical global assessments. The proposed mechanism involves upregulation of NGF and BDNF, synaptic stabilization, and reduction of amyloid precursor protein processing — though the exact active components within the complex mixture remain partly uncharacterized.',
      },
      {
        heading: 'Excitotoxicity and oxidative stress protection',
        body:
          'BDNF-upregulating peptides protect neurons against glutamate-induced excitotoxicity by activating TrkB receptors that suppress pro-apoptotic signaling and maintain mitochondrial membrane potential. This mechanism is relevant to multiple injury types including traumatic brain injury, hypoxia, and the oxidative stress component of neurodegenerative disease.',
      },
    ],
    relatedTerms: [
      'semax neuroprotection',
      'cerebrolysin',
      'neuroprotective peptides',
      'brain ischemia peptide',
      'BDNF peptide',
      'neurodegeneration research',
    ],
    faqQuestion: 'What are neuroprotective peptides?',
    faqAnswer:
      'Neuroprotective peptides are compounds that reduce neuronal death or dysfunction in the context of brain injury or neurodegenerative disease. Semax protects neurons from ischemic damage by upregulating BDNF and suppressing apoptotic pathways. Cerebrolysin, a peptide mixture, has demonstrated efficacy in multiple clinical trials for Alzheimer\'s disease and stroke recovery. These peptides generally act through growth factor signaling (BDNF, NGF), mitochondrial protection, or anti-inflammatory mechanisms rather than the receptor antagonism used in conventional neuroprotective drug strategies.',
  },

  'sleep-circadian': {
    metaTitle: 'Peptides for sleep — DSIP, epithalon & circadian rhythm research | Peptide United',
    metaDescription:
      'Research on sleep peptides including DSIP (delta sleep-inducing peptide), epithalon, and compounds studied for sleep architecture, circadian rhythm regulation, and melatonin pathways.',
    heroSubtitle:
      'Peptides studied for their effects on sleep initiation, slow-wave sleep quality, and circadian rhythm entrainment. DSIP and epithalon represent two distinct mechanisms, one acting on sleep pressure and the other on the circadian clock itself.',
    intro: `Sleep is regulated by two interacting systems: the circadian clock (a roughly 24-hour oscillator driven by the suprachiasmatic nucleus) and sleep homeostasis (the build-up of sleep pressure, primarily signaled by adenosine). Peptides in this category interact with one or both. Delta sleep-inducing peptide (DSIP), a nonapeptide first isolated from rabbit brain by Monnier in 1977, promotes slow-wave (delta) sleep when administered centrally or peripherally. Despite decades of research, its receptor has not been definitively characterized, which has hampered mechanistic clarity. Nevertheless, DSIP has been studied in models of insomnia, opiate withdrawal, and stress-induced sleep disturbance.

Epithalon\'s relevance here comes from its effects on the pineal gland, where it appears to restore circadian melatonin synthesis that declines with age. The pineal gland produces melatonin in a tightly circadian-regulated pattern, and this rhythm becomes dampened and phase-shifted in older adults, contributing to sleep fragmentation and early waking. Research suggests epithalon can partially restore the amplitude and timing of melatonin secretion, linking it to circadian biology rather than simply hypnotic drug effects.`,
    applications: [
      {
        heading: 'Slow-wave sleep enhancement',
        body:
          'DSIP has been studied in human subjects in several small trials from the 1980s and 1990s, showing increases in delta (slow-wave) sleep percentage and subjective sleep quality in patients with insomnia and disturbed sleep. The peptide appears to be sleep-stage specific in its action, promoting deep sleep without suppressing REM, which distinguishes it from most sedative-hypnotic drugs.',
      },
      {
        heading: 'Circadian melatonin restoration',
        body:
          'Epithalon\'s effects on melatonin secretion have been studied in both aged rats and elderly humans. In aged animals with low baseline melatonin, epithalon treatment partially restored the nocturnal melatonin spike that had declined with age. Human studies from Khavinson\'s group suggest improvements in sleep quality and circadian rhythm amplitude in older subjects receiving epithalon courses.',
      },
      {
        heading: 'Stress-related sleep disruption',
        body:
          'DSIP has been studied as an adjunct in conditions where sleep is disrupted by physiological stress, including chronic pain, opiate withdrawal, and HPA axis dysregulation. It appears to reduce nighttime cortisol peaks and may normalize stress-hormone circadian patterns in animal models of chronic stress, though human data on this specific application remain sparse.',
      },
    ],
    relatedTerms: [
      'DSIP peptide',
      'delta sleep-inducing peptide',
      'epithalon sleep',
      'peptides for sleep',
      'circadian peptide',
      'melatonin restoration',
    ],
    faqQuestion: 'What is delta sleep-inducing peptide (DSIP)?',
    faqAnswer:
      'Delta sleep-inducing peptide (DSIP) is a nonapeptide first isolated from rabbit brain in 1977. When administered to humans, it increases the proportion of slow-wave (delta) sleep — the deepest, most restorative sleep stage — without suppressing REM sleep. Unlike sedative drugs that work by GABA-A enhancement, DSIP\'s receptor mechanism is not fully characterized. It has been studied for insomnia, opiate withdrawal sleep disruption, and stress-related sleep changes. Epithalon is a separate peptide studied for circadian melatonin restoration, addressing the age-related dampening of the pineal melatonin rhythm rather than sleep pressure directly.',
  },

  antimicrobial: {
    metaTitle: 'Antimicrobial peptides — LL-37, defensins & host defense research | Peptide United',
    metaDescription:
      'Research on antimicrobial peptides including LL-37, alpha- and beta-defensins, and host defense peptides studied for antibacterial, antifungal, and antiviral activity.',
    heroSubtitle:
      'Host defense peptides and their synthetic analogs studied for direct antimicrobial activity and immune-modulatory signaling. LL-37, the only human cathelicidin, is active against bacteria, fungi, and enveloped viruses through membrane disruption and immune cell recruitment.',
    intro: `Antimicrobial peptides (AMPs) are components of the innate immune system found in organisms from bacteria to mammals. They typically kill microorganisms by disrupting cell membranes — their cationic and amphipathic structure allows them to insert into microbial lipid bilayers and form pores or cause membrane disintegration, a mechanism that is difficult for bacteria to develop resistance to quickly. In humans, the primary AMP classes are cathelicidins (LL-37 is the only known human cathelicidin) and defensins (alpha-defensins produced by neutrophils and small intestinal Paneth cells; beta-defensins produced by epithelial cells throughout the body).

LL-37 is produced at sites of infection and inflammation, where it kills Gram-positive and Gram-negative bacteria, fungi, and enveloped viruses including influenza and HIV. Beyond direct killing, it chemotactically recruits neutrophils and monocytes, promotes dendritic cell maturation, and stimulates wound healing through keratinocyte migration. Synthetic LL-37 analogs are in development as next-generation antibiotics, and there is particular research interest in AMP-based approaches to drug-resistant infections given the distinct mechanism of action from traditional antibiotics.`,
    applications: [
      {
        heading: 'Broad-spectrum membrane disruption',
        body:
          'LL-37 and defensins kill bacteria by inserting into bacterial membranes (which have negatively charged surfaces that attract cationic peptides) and disrupting membrane integrity. This mechanism differs fundamentally from antibiotic targets like cell wall synthesis, protein synthesis, or DNA replication, which means most existing antibiotic resistance mechanisms do not confer resistance to AMPs.',
      },
      {
        heading: 'Immune cell recruitment and activation',
        body:
          'LL-37 binds the formyl peptide receptor 2 (FPR2) on neutrophils and monocytes, stimulating chemotaxis toward infection sites. It also activates keratinocytes, promotes angiogenesis during wound repair, and modulates TLR signaling on macrophages. This dual antimicrobial-immunomodulatory role means it functions as both a first responder and a coordinator of adaptive immune responses.',
      },
      {
        heading: 'Drug-resistant pathogen research',
        body:
          'As MRSA, carbapenem-resistant Enterobacteriaceae, and other drug-resistant organisms become increasingly prevalent, AMP research has intensified. Several LL-37 analogs with improved stability and selectivity for bacterial over mammalian membranes have entered preclinical development. Research also examines synergy between AMPs and conventional antibiotics — combinations often show markedly improved activity against resistant strains compared to either agent alone.',
      },
    ],
    relatedTerms: [
      'LL-37 peptide',
      'antimicrobial peptides',
      'defensin',
      'host defense peptide',
      'antibacterial peptide',
      'cathelicidin',
    ],
    faqQuestion: 'What are antimicrobial peptides and how do they kill bacteria?',
    faqAnswer:
      'Antimicrobial peptides (AMPs) are short, positively charged peptides produced by the immune system that kill bacteria by disrupting their cell membranes. Unlike conventional antibiotics that target specific metabolic pathways, AMPs physically insert into microbial membranes and cause structural disruption — a mechanism that is harder for bacteria to develop specific resistance against. LL-37, the only human cathelicidin, kills a broad range of bacteria, fungi, and enveloped viruses while also recruiting immune cells and promoting wound healing. Beta-defensins provide epithelial surface defense in the skin, gut, and airways.',
  },

  'pain-inflammation': {
    metaTitle: 'Anti-inflammatory peptides — BPC-157, KPV & pain research | Peptide United',
    metaDescription:
      'Research on anti-inflammatory and analgesic peptides including BPC-157, KPV, and compounds studied for pain modulation, NF-kB inhibition, and inflammatory pathway regulation.',
    heroSubtitle:
      'Peptides studied for their effects on inflammatory signaling cascades, analgesic pathways, and conditions where chronic inflammation drives tissue damage. BPC-157 and KPV operate through distinct mechanisms but both show consistent anti-inflammatory effects across multiple research models.',
    intro: `Inflammation is not a single process but a coordinated cascade involving pattern recognition, cytokine release, immune cell recruitment, arachidonic acid metabolism, and resolution signaling. Therapeutic peptides in this category target specific nodes in that cascade rather than broadly suppressing the entire system, which is one potential advantage over NSAIDs or corticosteroids. BPC-157 appears to work primarily through nitric oxide pathway modulation and direct inhibition of NF-kB activation, the transcription factor that controls expression of most pro-inflammatory cytokines including TNF-alpha, IL-1beta, and IL-6. This translates to reduced inflammation in multiple organ systems — gut, tendon, brain, and muscle — across a wide range of insult models.

KPV (Lys-Pro-Val) is an alpha-MSH tripeptide that binds melanocortin receptors on macrophages and intestinal epithelial cells, reducing pro-inflammatory cytokine secretion and NF-kB nuclear translocation. It has been studied particularly in gut inflammation models. Other peptides in this category include spadin (a natriuretic peptide prohormone fragment with antidepressant-adjacent analgesic properties) and ziconotide, a synthetic version of omega-conotoxin from cone snail venom — the only peptide-based intrathecal analgesic currently in clinical use for severe chronic pain.`,
    applications: [
      {
        heading: 'NF-kB inhibition and cytokine reduction',
        body:
          'BPC-157 has been shown across multiple models to reduce TNF-alpha, IL-1beta, and IL-6 levels in inflamed tissue. Its NF-kB inhibitory effect appears to be downstream of its interaction with the nitric oxide system, with studies showing it both reduces oxidative stress and normalizes eNOS activity in endothelial cells under inflammatory conditions.',
      },
      {
        heading: 'Gut inflammation and mucosal protection',
        body:
          'KPV administered orally or locally in colon models significantly reduces inflammatory markers and histological damage in animal models of inflammatory bowel disease. Given that KPV is a small tripeptide resistant to gastric degradation (the Pro-Val bond is unusually stable), it reaches intestinal tissue intact, making oral administration feasible — an important practical advantage over peptides requiring injection.',
      },
      {
        heading: 'Analgesic pathway research',
        body:
          'Ziconotide (Prialt) demonstrates that peptide-based analgesia through selective ion channel blockade is clinically viable. It blocks N-type voltage-gated calcium channels in dorsal horn neurons, preventing nociceptive signal transmission without the tolerance or dependency associated with opioid analgesics. This serves as proof of concept for the broader research interest in peptide-based pain management.',
      },
    ],
    relatedTerms: [
      'BPC-157 inflammation',
      'KPV anti-inflammatory',
      'anti-inflammatory peptides',
      'peptide pain relief',
      'NF-kB peptide',
      'analgesic peptide',
    ],
    faqQuestion: 'How do anti-inflammatory peptides work?',
    faqAnswer:
      'Anti-inflammatory peptides work through several distinct mechanisms. BPC-157 suppresses NF-kB activation and modulates nitric oxide signaling, reducing pro-inflammatory cytokine production in multiple tissues without broadly suppressing immune function. KPV binds melanocortin receptors on immune cells and intestinal epithelium to dampen cytokine secretion specifically in gut inflammation. Ziconotide blocks calcium channels in spinal pain neurons, providing analgesia through a non-opioid mechanism. Unlike NSAIDs, most peptide-based approaches target specific inflammatory nodes rather than systemically suppressing prostaglandin synthesis.',
  },

  'mitochondrial-health': {
    metaTitle: 'Mitochondrial peptides — MOTS-c, SS-31, Humanin & biogenesis research | Peptide United',
    metaDescription:
      'Research on mitochondrial peptides including MOTS-c, SS-31, and Humanin, studied for mitochondrial biogenesis, oxidative stress reduction, and metabolic health.',
    heroSubtitle:
      'A class of peptides either derived from mitochondrial DNA or designed to target mitochondrial function. MOTS-c and Humanin are encoded within the mitochondrial genome itself, making them unique among peptide research targets.',
    intro: `Mitochondria contain their own genome — a small, circular DNA molecule encoding 13 proteins plus the RNA machinery needed for their translation. For decades, researchers focused almost exclusively on these 13 protein-coding genes. In 2013, the discovery of Humanin and subsequently MOTS-c revealed that mitochondrial DNA also encodes small peptides that are secreted and act as systemic signaling molecules. This was a significant conceptual shift: mitochondria are not simply energy factories but active participants in whole-body metabolic signaling through these peptides.

MOTS-c (mitochondrial open reading frame of the 12S rRNA type-c) regulates nuclear gene expression by activating AMPK and modulating the folate and methionine cycle in a way that improves metabolic flexibility and insulin sensitivity. Humanin is cytoprotective, particularly in the context of amyloid toxicity and ischemic injury, and declines with age. SS-31 (elamipretide) is not mitochondrially encoded but specifically targets the inner mitochondrial membrane by binding cardiolipin, stabilizing the electron transport chain under oxidative stress and restoring ATP production in damaged mitochondria. It has entered phase II and III clinical trials for heart failure and Barth syndrome.`,
    applications: [
      {
        heading: 'Metabolic regulation via AMPK',
        body:
          'MOTS-c activates AMPK in skeletal muscle and liver, increasing glucose uptake, beta-oxidation, and mitochondrial biogenesis. In aged mice with diet-induced insulin resistance, MOTS-c administration improves insulin sensitivity to near-normal levels. The peptide\'s effects on one-carbon metabolism also suggest involvement in epigenetic regulation, as this pathway supplies methyl groups for DNA and histone methylation.',
      },
      {
        heading: 'Neuroprotection from amyloid toxicity',
        body:
          'Humanin binds amyloid beta peptide directly and reduces its aggregation and cytotoxicity in neuronal cultures. It also activates the STAT3 and PI3K/Akt survival pathways, protecting cells from apoptosis induced by amyloid, oxidative stress, and ischemia. CSF levels of Humanin are lower in Alzheimer\'s patients than in age-matched controls, suggesting a potential deficit in endogenous neuroprotective signaling.',
      },
      {
        heading: 'Inner membrane stabilization',
        body:
          'SS-31 (elamipretide) penetrates the inner mitochondrial membrane and binds cardiolipin, a phospholipid critical for organizing the electron transport chain complexes. Under oxidative stress, cardiolipin peroxidation disrupts this organization and releases cytochrome C, triggering apoptosis. SS-31 prevents this cascade, preserving ATP production in ischemia-reperfusion models and improving cardiac and renal function in disease models.',
      },
    ],
    relatedTerms: [
      'MOTS-c',
      'SS-31 peptide',
      'Humanin peptide',
      'mitochondrial peptides',
      'elamipretide',
      'mitochondrial biogenesis',
    ],
    faqQuestion: 'What are mitochondrial peptides?',
    faqAnswer:
      'Mitochondrial peptides are a recently discovered class of signaling molecules encoded within the mitochondrial genome itself. MOTS-c and Humanin are the two best characterized: both are produced by mitochondria and secreted to regulate systemic metabolism, stress responses, and cell survival. MOTS-c improves insulin sensitivity and metabolic flexibility via AMPK activation. Humanin provides neuroprotection against amyloid toxicity and ischemic injury. SS-31 (elamipretide) is a synthetic peptide that targets the inner mitochondrial membrane to preserve electron transport chain function under oxidative stress, and is in clinical trials for heart failure.',
  },

  'glp1-metabolic-hormones': {
    metaTitle: 'GLP-1 peptides — semaglutide, retatrutide & incretin research | Peptide United',
    metaDescription:
      'Research on GLP-1 receptor agonists including semaglutide, tirzepatide, and retatrutide. How incretin peptides regulate appetite, insulin secretion, and metabolic hormones.',
    heroSubtitle:
      'Incretin-based peptides and GLP-1 receptor agonists that regulate appetite, glucose homeostasis, and body weight through gut-brain hormonal signaling. This is the fastest-moving class in peptide pharmacology, with several approved drugs and a robust pipeline.',
    intro: `GLP-1 (glucagon-like peptide-1) is a 30-amino-acid incretin hormone secreted by L-cells in the distal small intestine and colon in response to food intake. It stimulates glucose-dependent insulin secretion, suppresses glucagon, slows gastric emptying, and acts on hypothalamic neurons to reduce appetite. Native GLP-1 has a half-life of under 2 minutes due to rapid degradation by DPP-4 enzyme, which is why pharmaceutical development focused on creating resistant analogs: exenatide (a Gila monster-derived peptide), liraglutide, and ultimately semaglutide — which binds albumin through a fatty acid chain, extending its half-life to roughly one week.

The field has moved decisively toward dual and triple receptor agonism. Tirzepatide targets both GLP-1 and GIP (glucose-dependent insulinotropic polypeptide) receptors, producing greater weight loss and glucose control than GLP-1 agonism alone in the SURPASS trials. Retatrutide adds glucagon receptor agonism to this combination, producing even larger weight loss signals in phase II trials — up to 24% body weight reduction at 48 weeks, results that rival bariatric surgery in magnitude. GLP-2 analogs (teduglutide) act on intestinal GLP-2 receptors to promote gut mucosal growth and are used clinically for short bowel syndrome. This category represents the intersection of peptide science and mainstream pharmacology at its most active.`,
    applications: [
      {
        heading: 'Appetite regulation and weight loss',
        body:
          'GLP-1 receptors in the hypothalamus and brainstem reduce appetite by signaling satiety and slowing gastric emptying. Semaglutide in the STEP trials achieved 15-17% mean body weight reduction in adults with obesity — a result that fundamentally changed expectations for pharmacological weight management. The mechanism involves both peripheral gut signaling and direct central nervous system effects on hunger circuits.',
      },
      {
        heading: 'Glucose homeostasis and type 2 diabetes',
        body:
          'GLP-1 receptor agonists stimulate insulin secretion in a glucose-dependent manner, meaning they lower blood glucose when it is elevated but do not cause hypoglycemia when glucose is normal. This is mechanistically superior to sulfonylureas, which stimulate insulin release regardless of glucose level. Tirzepatide, by adding GIP receptor agonism, addresses insulin resistance in adipose tissue as well, producing superior HbA1c reduction compared to GLP-1 agonism alone.',
      },
      {
        heading: 'Cardiovascular and organ protection',
        body:
          'Beyond glycemia and weight, GLP-1 receptor agonists have demonstrated cardiovascular mortality reduction in major outcome trials (LEADER for liraglutide, SUSTAIN-6 and SELECT for semaglutide). The mechanisms appear to include direct cardiac and vascular effects — reduced inflammation, improved endothelial function, and reduced atherosclerotic plaque instability — independent of their weight loss effects.',
      },
    ],
    relatedTerms: [
      'GLP-1 receptor agonist',
      'semaglutide research',
      'tirzepatide',
      'retatrutide',
      'incretin peptide',
      'GLP-2 peptide',
    ],
    faqQuestion: 'What is a GLP-1 peptide and how does it cause weight loss?',
    faqAnswer:
      'GLP-1 (glucagon-like peptide-1) is a gut hormone released after eating that stimulates insulin secretion, suppresses glucagon, slows gastric emptying, and reduces appetite through hypothalamic receptor activation. Pharmaceutical GLP-1 receptor agonists like semaglutide are modified versions resistant to enzymatic degradation, allowing once-weekly dosing. Weight loss occurs through reduced appetite, slower gastric emptying (increasing satiety duration), and direct effects on brain hunger circuits. Tirzepatide adds GIP receptor agonism for enhanced metabolic effects, and retatrutide further adds glucagon receptor activation, producing phase II trial weight loss data comparable in magnitude to bariatric surgery.',
  },
}

// ─── DB helpers ─────────────────────────────────────────────────────────────

async function getCategory(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] as Category | undefined
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'categories',
      limit: 100,
      depth: 0,
    })
    return result.docs.map((cat: Category) => ({ slug: cat.slug }))
  } catch {
    return []
  }
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) return { title: 'Category not found' }

  const content = CATEGORY_CONTENT[slug]

  const title = content?.metaTitle ?? `${category.name} peptides | Peptide United`
  const description =
    content?.metaDescription ?? category.description ?? undefined

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      type: 'website',
    },
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const category = await getCategory(slug)
  if (!category) notFound()

  const { docs: peptides, totalDocs } = await payload.find({
    collection: 'peptides',
    where: { categories: { contains: category.id } },
    limit: 100,
    depth: 1,
    sort: 'name',
  })

  const content = CATEGORY_CONTENT[slug]

  // Split intro into two paragraphs at the blank-line boundary
  const introParagraphs = content?.intro.split(/\n\n/) ?? []

  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <section className="gradient-pastel py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-[13px]">
            <Link href="/" className="text-black/30 transition-colors hover:text-black">
              Home
            </Link>
            <span className="text-black/20">/</span>
            <Link href="/categories" className="text-black/30 transition-colors hover:text-black">
              Categories
            </Link>
            <span className="text-black/20">/</span>
            <span className="text-black/60">{category.name}</span>
          </nav>

          {/* Eyebrow */}
          <p className="mono-label mb-3 text-black/40">Category</p>

          {/* H1 */}
          <h1 className="text-[36px] font-medium leading-[1.1] tracking-display text-black sm:text-[52px]">
            {category.name}
          </h1>

          {/* Subtitle */}
          {content?.heroSubtitle ? (
            <p className="mt-4 max-w-2xl text-[16px] leading-[1.55] text-black/60">
              {content.heroSubtitle}
            </p>
          ) : category.description ? (
            <p className="mt-4 max-w-2xl text-[16px] leading-[1.55] text-black/60">
              {category.description}
            </p>
          ) : null}

          {/* Pill count */}
          <p className="mono-label mt-5 text-black/40">
            {totalDocs} peptide{totalDocs !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </section>

      {/* ── 2. QUICK REFERENCE ───────────────────────────────────── */}
      {content && (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              {/* Left: FAQ + intro */}
              <div>
                <h2 className="mb-4 text-[22px] font-medium leading-[1.25] tracking-heading text-black">
                  {content.faqQuestion}
                </h2>
                <p className="mb-4 text-[15px] leading-[1.65] text-black/60">
                  {content.faqAnswer}
                </p>

                {introParagraphs.length > 0 && (
                  <div className="mt-6 border-t pt-6" style={{ borderColor: 'var(--border-light)' }}>
                    {introParagraphs.map((para, i) => (
                      <p
                        key={i}
                        className="mb-4 text-[15px] leading-[1.65] text-black/60 last:mb-0"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Related terms */}
              <div>
                <p className="mono-label mb-4 text-black/40">Related terms</p>
                <div className="flex flex-wrap gap-2">
                  {content.relatedTerms.map((term) => (
                    <Link
                      key={term}
                      href={`/peptides?q=${encodeURIComponent(term)}`}
                      className="badge-light transition-colors hover:bg-stone-100"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. PEPTIDE GRID ──────────────────────────────────────── */}
      <section className="bg-stone-50 py-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mono-label mb-2 text-black/40">Compounds</p>
          <h2 className="mb-8 text-[22px] font-medium leading-[1.25] tracking-heading text-black">
            Peptides in this category
          </h2>

          {peptides.length === 0 ? (
            <div className="card-light p-12 text-center">
              <p className="text-[16px] font-medium tracking-heading text-black">
                No peptides found in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(peptides as Peptide[]).map((peptide) => (
                <PeptideCard key={peptide.id} peptide={peptide} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. RESEARCH APPLICATIONS ─────────────────────────────── */}
      {content && (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <p className="mono-label mb-2 text-black/40">Research applications</p>
            <h2 className="mb-8 text-[22px] font-medium leading-[1.25] tracking-heading text-black">
              What researchers are studying
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.applications.map((app, i) => (
                <div key={i} className="card-light p-6">
                  <p className="mb-2 text-[13px] font-medium tracking-tight text-black">
                    {app.heading}
                  </p>
                  <p className="text-[14px] leading-[1.6] text-black/55">
                    {app.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. CTA STRIP ─────────────────────────────────────────── */}
      <section className="border-t py-12" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[15px] font-medium text-black">
              Want the full research picture?
            </p>
            <p className="mt-0.5 text-[13px] text-black/45">
              Full peptide profiles include mechanism details, study data, dosing research, and sourcing.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/peptides" className="btn-outline text-black">
              Browse all peptides
            </Link>
            <Link href="/research" className="btn-dark">
              Research hub
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. BOTTOM NAV ────────────────────────────────────────── */}
      <section className="border-t py-8" style={{ borderColor: 'var(--border-light)' }}>
        <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between">
          <Link
            href="/categories"
            className="text-[13px] tracking-tight text-black/40 transition-colors hover:text-black"
          >
            ← All categories
          </Link>
          <Link
            href="/peptides"
            className="text-[13px] tracking-tight text-black/40 transition-colors hover:text-black"
          >
            Browse all peptides →
          </Link>
        </div>
      </section>
    </>
  )
}
