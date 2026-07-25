import { dayDiff } from './date'
import type { StreakState } from './types'

/**
 * Pure streak transition. Given the prior streak state and the local day a
 * session was just completed, return the next streak state.
 *
 * Rules (from the design spec):
 *  - Completing a second session on the same day is idempotent (no double count).
 *  - Exactly 1 day since last completion continues the streak.
 *  - More than 1 day (or no prior) starts a fresh streak at 1.
 *  - longestStreak never decreases.
 *
 * Kept pure and dependency-light so it is trivially unit-testable across a DST
 * boundary and a midnight-boundary completion.
 */
export function advanceStreak(prev: StreakState, today: string): StreakState {
  if (prev.lastCompletedDateLocal === today) {
    return prev // already practiced today
  }

  let current: number
  if (prev.lastCompletedDateLocal === null) {
    current = 1
  } else {
    const gap = dayDiff(prev.lastCompletedDateLocal, today)
    current = gap === 1 ? prev.currentStreak + 1 : 1
  }

  return {
    currentStreak: current,
    longestStreak: Math.max(prev.longestStreak, current),
    lastCompletedDateLocal: today,
  }
}

/**
 * The streak as it should DISPLAY right now, accounting for time passing since
 * the last completion. If the user practiced yesterday the streak still stands;
 * if the last practice was 2+ days ago the live streak reads 0 even though the
 * stored counter (a historical high-water for the run) may be higher.
 */
export function liveStreak(streak: StreakState, today: string): number {
  if (!streak.lastCompletedDateLocal) return 0
  const gap = dayDiff(streak.lastCompletedDateLocal, today)
  if (gap <= 1) return streak.currentStreak
  return 0
}
