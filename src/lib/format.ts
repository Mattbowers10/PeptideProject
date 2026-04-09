/**
 * Formats a timestamp into a relative time string.
 * e.g. "2 hours ago", "3 days ago", "just now"
 */
export function formatRelativeTime(date: string | number | Date): string {
  const now = Date.now()
  const then = new Date(date).getTime()
  const diffMs = now - then

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  if (weeks < 5) return `${weeks}w ago`
  return `${months}mo ago`
}

/**
 * Formats a number with compact notation.
 * e.g. 1234 → "1,234", 15000 → "15K"
 */
export function formatNumber(n: number): string {
  if (n >= 10_000) {
    return `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1)}K`
  }
  return n.toLocaleString('en-US')
}

/**
 * Formats a date string into a readable format.
 * e.g. "2025-11-03T10:00:00.000Z" → "Nov 3, 2025"
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
