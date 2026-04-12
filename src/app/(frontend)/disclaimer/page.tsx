import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Research Disclaimer | Peptide United',
  description:
    'Research disclaimer for Peptide United — important information about the nature of the content and its limitations.',
}

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mono-label mb-2 text-black/30">Legal</p>
        <h1 className="text-[36px] font-medium tracking-heading text-black">Research Disclaimer</h1>
        <p className="mt-3 text-[14px] text-black/40">Last updated: April 9, 2026</p>
      </div>

      {/* Critical notice */}
      <div className="mb-10 rounded-comfortable border-l-4 border-amber-400 bg-amber-50 px-6 py-5">
        <p className="text-[14px] font-medium text-amber-900">Important Notice</p>
        <p className="mt-1 text-[14px] leading-[1.7] text-amber-800">
          Peptide United provides information for research and educational purposes only. Nothing on
          this site should be interpreted as medical advice, diagnosis, or a recommendation to use
          any substance. Consult a licensed healthcare provider before considering any peptide
          compound.
        </p>
      </div>

      <div className="space-y-10">

        {/* 1 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">1. Not Medical Advice</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            The content on Peptide United — including peptide profiles, mechanism of action
            descriptions, pharmacokinetic data, research summaries, and safety information — is
            compiled from publicly available scientific literature and is intended solely for
            educational and research purposes.
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            This content does not constitute and should not be construed as medical advice,
            medical diagnosis, medical prognosis, or a recommendation to use any drug, compound,
            or treatment protocol. The information is not a substitute for professional medical
            advice from a qualified healthcare provider who knows your individual medical history.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">2. Research Status of Compounds</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            Many peptide compounds described on this Site are investigational — meaning they are
            still in preclinical or clinical research phases and have not been approved by the FDA,
            EMA, or other regulatory bodies for human therapeutic use. The fact that a compound
            has been studied in human trials does not mean it is safe, effective, or legal to
            use in your jurisdiction.
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            Even FDA-approved compounds described here (such as semaglutide or tirzepatide) are
            only approved for specific indications under licensed medical supervision. Using
            pharmaceutical-grade or research-grade versions of these compounds outside of a
            licensed medical context may be illegal and is not endorsed by this Site.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">3. Accuracy and Completeness</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            We strive to provide accurate, up-to-date summaries of published research. However,
            scientific understanding of peptide compounds evolves rapidly. Information presented
            here may be:
          </p>
          <ul className="mt-3 space-y-2 pl-4">
            {[
              'Incomplete — we summarize key studies but do not reproduce every study ever conducted',
              'Superseded — newer research may contradict earlier findings we have documented',
              'Contested — scientific findings are often subject to debate, replication failures, or conflicting interpretations',
              'Biased by publication — published literature tends to over-represent positive or significant findings',
            ].map((item) => (
              <li key={item} className="flex gap-2 text-[14px] leading-[1.7] text-black/60">
                <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/20" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] leading-[1.75] text-black/60">
            We make no warranty — express or implied — regarding the accuracy, completeness,
            or reliability of any information on this Site.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">4. Legal Status of Compounds</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            The legal status of peptide compounds varies significantly by country, region, and
            context. What is legally available for research purposes in one jurisdiction may be
            a controlled substance, prescription-only medication, or prohibited substance in
            another.
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            It is your sole responsibility to research and comply with the laws applicable in
            your jurisdiction before acquiring, possessing, or working with any compound
            referenced on this Site. Peptide United takes no responsibility for any legal
            consequences arising from your use of information provided here.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">5. Affiliate Partner Disclosure</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            Peptide United links to third-party research chemical suppliers (&ldquo;Partners&rdquo;) through
            an affiliate program. When you purchase from a Partner using our tracking links, we
            may receive a commission. This financial relationship does not influence our editorial
            assessments or research summaries.
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-black/60">
            We do not endorse, warrant, or guarantee the quality, purity, or legality of any
            products sold by Partner vendors. Research chemical vendors typically sell compounds
            labeled &ldquo;for research purposes only.&rdquo; We are not responsible for any harm arising
            from the purchase or use of products from Partner vendors.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">6. No Endorsement of Self-Experimentation</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            Peptide United does not endorse, encourage, or provide guidance on human
            self-experimentation with any compound. Self-administering research peptides outside
            of a licensed clinical setting carries significant risks including but not limited
            to: unknown impurities, incorrect dosing, adverse reactions, drug interactions,
            and legal liability.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">7. Limitation of Liability</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            Peptide United, its operators, contributors, and affiliates expressly disclaim all
            liability for any harm — direct, indirect, incidental, or consequential — that may
            arise from reliance on the information provided on this Site, including decisions
            to acquire or use any peptide compound.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="mb-3 text-[18px] font-medium tracking-tight text-black">8. Who This Site Is For</h2>
          <p className="text-[15px] leading-[1.75] text-black/60">
            Peptide United is designed for:
          </p>
          <ul className="mt-3 space-y-2 pl-4">
            {[
              'Researchers, scientists, and academics studying peptide compounds',
              'Healthcare professionals seeking to understand the scientific literature',
              'Curious individuals interested in the science of peptide biology',
              'Investors and analysts following the research chemical and biotech space',
            ].map((item) => (
              <li key={item} className="flex gap-2 text-[14px] leading-[1.7] text-black/60">
                <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/20" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] leading-[1.75] text-black/60">
            If you are seeking medical treatment or considering using any compound for health
            purposes, please consult a licensed medical professional.
          </p>
        </section>

        {/* Contact box */}
        <section className="rounded-comfortable border bg-black/[0.02] p-6" style={{ borderColor: 'var(--border-light)' }}>
          <h2 className="mb-2 text-[16px] font-medium tracking-tight text-black">Questions</h2>
          <p className="text-[14px] leading-[1.75] text-black/60">
            For questions about this disclaimer or the nature of our content, use the{' '}
            <Link href="/dashboard" className="text-black underline underline-offset-2 hover:text-black/70">
              dashboard
            </Link>{' '}
            to contact us.
          </p>
        </section>

        {/* Legal nav */}
        <div className="flex gap-6 border-t pt-8" style={{ borderColor: 'var(--border-light)' }}>
          <Link href="/terms" className="text-[13px] text-black/40 underline underline-offset-2 hover:text-black/70">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-[13px] text-black/40 underline underline-offset-2 hover:text-black/70">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
