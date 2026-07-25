// All streak/calendar math runs on local calendar-day strings ("YYYY-MM-DD"),
// never on raw timestamps. This is the single decision that avoids the classic
// timezone / DST / midnight-boundary off-by-one bugs in habit apps.

/** Local calendar day as "YYYY-MM-DD" (NOT UTC). */
export function todayLocal(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/** Parse a "YYYY-MM-DD" string to a Date at LOCAL midnight. */
export function parseLocal(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d) // local midnight
}

/**
 * Whole calendar days from `from` to `to` (to - from).
 * Uses local-midnight anchors and rounds, so a DST-transition day (23h or 25h)
 * still counts as exactly 1 day instead of 0.999 / 1.04.
 */
export function dayDiff(from: string, to: string): number {
  const a = parseLocal(from).getTime()
  const b = parseLocal(to).getTime()
  return Math.round((b - a) / 86_400_000)
}

/** Add n days to a "YYYY-MM-DD" string, returning a "YYYY-MM-DD" string. */
export function addDays(dateStr: string, n: number): string {
  const d = parseLocal(dateStr)
  d.setDate(d.getDate() + n)
  return todayLocal(d)
}

/** Human label, e.g. "Thursday, July 25". */
export function humanDate(d: Date = new Date()): string {
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

/** Last `n` local-day strings ending today (oldest first). */
export function lastNDays(n: number, end: string = todayLocal()): string[] {
  const out: string[] = []
  for (let i = n - 1; i >= 0; i--) out.push(addDays(end, -i))
  return out
}
