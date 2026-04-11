'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-outline text-[13px] print:hidden"
    >
      Print / Save as PDF
    </button>
  )
}
