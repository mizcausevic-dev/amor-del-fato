import { dayDiff } from './date'
import type { StreakState } from './types'

/**
 * Pure streak transition, with ONE compassionate grace day per run. Tying your
 * peace to an unbroken chain is itself un-Stoic, so a single missed day does not
 * reset the streak; a second miss in the same run does. Grace is not restored by
 * later consecutive days (exactly one forgiven miss per run), so it can't be
 * gamed into an every-other-day "streak".
 *
 *  - Second session the same day is idempotent (no double count).
 *  - gap 1 (practiced yesterday): continue, carry grace state.
 *  - gap 2 (missed one day) and grace unused: continue, mark grace used.
 *  - otherwise: reset to 1, grace fresh.
 *  - longestStreak never decreases.
 *
 * Pure and dependency-light so it is trivially unit-testable across a DST
 * boundary, a midnight-boundary completion, and the grace edge.
 */
export function advanceStreak(prev: StreakState, today: string): StreakState {
  if (prev.lastCompletedDateLocal === today) {
    return prev // already practiced today
  }

  let current: number
  let graceUsed: boolean
  if (prev.lastCompletedDateLocal === null) {
    current = 1
    graceUsed = false
  } else {
    const gap = dayDiff(prev.lastCompletedDateLocal, today)
    const prevGrace = prev.graceUsedInRun ?? false
    if (gap === 1) {
      current = prev.currentStreak + 1
      graceUsed = prevGrace
    } else if (gap === 2 && !prevGrace) {
      current = prev.currentStreak + 1 // one missed day, forgiven
      graceUsed = true
    } else {
      current = 1
      graceUsed = false
    }
  }

  return {
    currentStreak: current,
    longestStreak: Math.max(prev.longestStreak, current),
    lastCompletedDateLocal: today,
    graceUsedInRun: graceUsed,
  }
}

/**
 * The streak as it should DISPLAY right now, accounting for time passing since
 * the last completion and the one grace day. Alive if practiced today or
 * yesterday, or two days ago with grace still available.
 */
export function liveStreak(streak: StreakState, today: string): number {
  if (!streak.lastCompletedDateLocal) return 0
  const gap = dayDiff(streak.lastCompletedDateLocal, today)
  if (gap <= 1) return streak.currentStreak
  if (gap === 2 && !(streak.graceUsedInRun ?? false)) return streak.currentStreak
  return 0
}

/**
 * Whether a grace day is currently protecting the streak (missed yesterday, but
 * the run is still alive). Used for an honest, gentle nudge in the UI.
 */
export function streakOnGrace(streak: StreakState, today: string): boolean {
  if (!streak.lastCompletedDateLocal) return false
  const gap = dayDiff(streak.lastCompletedDateLocal, today)
  return gap === 2 && !(streak.graceUsedInRun ?? false)
}
