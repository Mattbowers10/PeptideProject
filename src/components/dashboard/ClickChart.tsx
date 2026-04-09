import React from 'react'

type DataPoint = { label: string; value: number }

type Props = {
  data: DataPoint[]
  maxHeight?: number
}

/**
 * Pure CSS vertical bar chart — no external dependencies.
 * Renders on midnight dark background with lavender bars.
 */
export function ClickChart({ data, maxHeight = 140 }: Props) {
  const maxValue = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex items-end gap-1" style={{ height: maxHeight }}>
      {data.map((point) => {
        const height = Math.max((point.value / maxValue) * maxHeight, 2)
        return (
          <div key={point.label} className="group flex flex-1 flex-col items-center gap-1">
            {/* Tooltip on hover */}
            <span className="mono-label-sm opacity-0 transition-opacity group-hover:opacity-100 text-white/60">
              {point.value}
            </span>
            {/* Bar */}
            <div
              className="w-full rounded-t-sm bg-lavender/60 transition-all group-hover:bg-lavender"
              style={{ height }}
            />
            {/* Label */}
            <span className="mt-1 font-mono text-[8px] text-white/25">
              {point.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
