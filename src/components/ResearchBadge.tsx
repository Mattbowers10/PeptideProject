import React from 'react'

type ResearchStatus = 'preclinical' | 'phase1' | 'phase2' | 'phase3' | 'approved' | 'discontinued'

const CONFIG: Record<ResearchStatus, { label: string; dot: string }> = {
  preclinical: { label: 'Preclinical', dot: 'bg-amber-400' },
  phase1: { label: 'Phase I', dot: 'bg-sky-400' },
  phase2: { label: 'Phase II', dot: 'bg-blue-400' },
  phase3: { label: 'Phase III', dot: 'bg-indigo-400' },
  approved: { label: 'Approved', dot: 'bg-emerald-400' },
  discontinued: { label: 'Discontinued', dot: 'bg-neutral-400' },
}

export function ResearchBadge({
  status,
  variant = 'light',
}: {
  status: string
  variant?: 'light' | 'dark'
}) {
  const cfg = CONFIG[status as ResearchStatus] ?? { label: status, dot: 'bg-neutral-400' }

  return (
    <span className={variant === 'dark' ? 'badge-dark' : 'badge-light'}>
      <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}
