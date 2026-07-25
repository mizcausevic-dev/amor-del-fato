import type { AppState } from './types'

/** Set of local-day strings on which at least one session was completed. */
export function practicedDaySet(state: AppState): Set<string> {
  const s = new Set<string>()
  for (const c of state.completedSessions) s.add(c.completedDateLocal)
  return s
}

/** Count of sessions completed on a given local day. */
export function countForDay(state: AppState, dayLocal: string): number {
  return state.completedSessions.filter((c) => c.completedDateLocal === dayLocal)
    .length
}
