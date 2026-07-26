import { useMemo } from 'react'
import type { CompletedSession } from '../lib/types'
import { stateLabel } from '../lib/states'
import { dayDiff, todayLocal } from '../lib/date'

/**
 * "The Shift": how sessions tend to move the user along the equanimity axis.
 * Per session, a hollow dot at arrival and a filled dot at departure on a
 * shared 5-point scale, joined by a line. Direction (up = toward Grounded) is
 * the only thing meant to read. No numbers, no axis labels, no gridlines.
 */
export default function ShiftChart({ sessions }: { sessions: CompletedSession[] }) {
  const withStates = useMemo(
    () =>
      sessions
        .filter((s) => s.arrivalState != null && s.departureState != null)
        .slice(0, 24)
        .reverse(), // oldest -> newest, left to right
    [sessions],
  )

  const caption = useMemo(() => {
    const today = todayLocal()
    const week = withStates.filter((s) => dayDiff(s.completedDateLocal, today) <= 7)
    if (week.length < 2) return null
    // Mode, not average. The equanimity axis is ordinal, so the mean of
    // Rattled and Grounded is not "Steady" — averaging it is a category error
    // that manufactures a number the app deliberately never shows. Report the
    // most frequent arrival and departure state instead.
    const mode = (fn: (s: CompletedSession) => number) => {
      const counts = new Map<number, number>()
      for (const s of week) {
        const v = fn(s)
        counts.set(v, (counts.get(v) ?? 0) + 1)
      }
      // highest count wins; ties break toward the higher (calmer) state
      let best = -1
      let bestCount = -1
      for (const [v, c] of counts) {
        if (c > bestCount || (c === bestCount && v > best)) {
          best = v
          bestCount = c
        }
      }
      return best
    }
    const a = mode((s) => s.arrivalState as number)
    const d = mode((s) => s.departureState as number)
    const aL = stateLabel(a)
    const dL = stateLabel(d)
    if (d > a) return `Most sessions this week moved you from ${aL} toward ${dL}.`
    if (a > d) return `This week you often arrived ${aL} and settled gently.`
    return `This week you most often arrived and left ${dL}.`
  }, [withStates])

  if (withStates.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">The shift</p>
        <p className="mt-3 text-sm text-mute">
          After a few sessions, this will show how your practice tends to move you, from how
          you arrive to how you leave.
        </p>
      </div>
    )
  }

  const H = 72
  const pt = 10
  const dx = 22
  const width = Math.max(withStates.length * dx + 20, 120)
  const yFor = (v: number) => pt + ((5 - v) / 4) * H

  return (
    <div className="rounded-2xl border border-line bg-panel p-5">
      <p className="text-xs font-600 uppercase tracking-widest text-mute">The shift</p>
      <div className="mt-3 flex justify-between text-[11px] font-500 text-mute">
        <span>Grounded</span>
      </div>
      <div className="overflow-x-auto">
        <svg width={width} height={H + pt * 2} className="block">
          {withStates.map((s, i) => {
            const x = 12 + i * dx
            const ay = yFor(s.arrivalState as number)
            const dy = yFor(s.departureState as number)
            const improved = (s.departureState as number) >= (s.arrivalState as number)
            const stroke = improved ? 'var(--brand)' : 'var(--brand-2)'
            return (
              <g key={s.id}>
                <line x1={x} y1={ay} x2={x} y2={dy} stroke={stroke} strokeWidth={2} strokeLinecap="round" />
                <circle cx={x} cy={ay} r={3} fill="var(--canvas)" stroke="var(--mute)" strokeWidth={1.5} />
                <circle cx={x} cy={dy} r={3.5} fill={stroke} />
              </g>
            )
          })}
        </svg>
      </div>
      <div className="flex justify-between text-[11px] font-500 text-mute">
        <span>Rattled</span>
      </div>
      {caption && <p className="mt-3 text-sm leading-relaxed text-ink">{caption}</p>}
      <div className="mt-3 flex items-center gap-4 text-xs text-mute">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-mute" /> Arrived
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand" /> Left
        </span>
      </div>
    </div>
  )
}
