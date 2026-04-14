'use client'

import React, { useState } from 'react'
import type { Peptide } from '@/payload-types'

type FAQItem = { q: string; a: string }

const STATUS_DESCRIPTIONS: Record<string, string> = {
  preclinical:
    'Preclinical research — studied in cell cultures and animal models, with no approved human clinical trials.',
  phase1:
    'Phase I clinical trials — early human safety and dosing studies have been conducted.',
  phase2:
    'Phase II clinical trials — preliminary efficacy and safety data in larger patient groups.',
  phase3:
    'Phase III clinical trials — large-scale pivotal trials evaluating efficacy and safety.',
  approved:
    'Approved — this compound has received regulatory approval for specific clinical indications.',
  discontinued: 'Discontinued — clinical development has been halted.',
}

function buildFAQs(peptide: Peptide): FAQItem[] {
  const faqs: FAQItem[] = []

  // Always include
  faqs.push({
    q: `What is ${peptide.name}?`,
    a:
      peptide.summary ??
      `${peptide.name} is a research peptide currently being studied for its biological effects.`,
  })

  // Half-life
  if (peptide.halfLife) {
    faqs.push({
      q: `What is the half-life of ${peptide.name}?`,
      a: `The reported half-life of ${peptide.name} is ${peptide.halfLife}. Half-life refers to the time required for the plasma concentration to decrease by half through metabolic clearance.`,
    })
  }

  // Administration routes
  if (peptide.administrationRoutes?.length) {
    const routes = peptide.administrationRoutes.map((r) => r.route).join(', ')
    faqs.push({
      q: `How is ${peptide.name} administered?`,
      a: `In research settings, ${peptide.name} is typically administered via: ${routes}. Route selection affects onset, bioavailability, and duration of action.`,
    })
  }

  // Research status
  if (peptide.researchStatus) {
    faqs.push({
      q: `What is the research status of ${peptide.name}?`,
      a: `${peptide.name} is currently at the ${STATUS_DESCRIPTIONS[peptide.researchStatus] ?? peptide.researchStatus} stage.`,
    })
  }

  // Molecular formula
  if (peptide.molecularFormula) {
    faqs.push({
      q: `What is the molecular formula of ${peptide.name}?`,
      a: `The molecular formula of ${peptide.name} is ${peptide.molecularFormula}${peptide.molecularWeight ? `, with a molecular weight of ${peptide.molecularWeight}` : ''}.`,
    })
  }

  // Always add disclaimer
  faqs.push({
    q: `Is ${peptide.name} for human use?`,
    a: `${peptide.name} profiles on Peptide United are for research and educational purposes only. This compound is not approved for human therapeutic use unless specifically noted. Always consult a qualified healthcare professional.`,
  })

  return faqs
}

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[14px] font-medium text-white/85">{item.q}</span>
        <span className="shrink-0 font-mono text-[16px] font-light text-white/30">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[600px] pb-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[13px] leading-[1.65] text-white/50">{item.a}</p>
      </div>
    </div>
  )
}

export function PeptideFAQ({ peptide }: { peptide: Peptide }) {
  const faqs = buildFAQs(peptide)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="card-dark p-6">
      <p className="mono-label mb-4 text-white/30">Frequently Asked Questions</p>
      <div>
        {faqs.map((item, i) => (
          <FAQItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
