import { CURRENT_VERSION, emptyState, type AppState } from './types'

const KEY = 'hey-there-warrior:v1'

/** Cross-browser id. crypto.randomUUID exists in all modern targets; guard anyway. */
export function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

/** Load state, tolerating absent/corrupt/older payloads. Never throws. */
export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as Partial<AppState>
    return migrate(parsed)
  } catch {
    return emptyState()
  }
}

/** Persist state. Silently no-ops if storage is unavailable (private mode, quota). */
export function saveState(state: AppState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable; app still works in-memory for the session */
  }
}

/** Merge an unknown/older payload onto a clean base so new fields are always present. */
function migrate(parsed: Partial<AppState>): AppState {
  const base = emptyState()
  const merged: AppState = {
    ...base,
    ...parsed,
    streak: { ...base.streak, ...(parsed.streak ?? {}) },
    pathProgress: { ...(parsed.pathProgress ?? {}) },
    completedSessions: parsed.completedSessions ?? [],
    journalEntries: parsed.journalEntries ?? [],
    version: CURRENT_VERSION,
  }
  return merged
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

/** Export the full state as a pretty JSON string (for the Settings backup action). */
export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2)
}
