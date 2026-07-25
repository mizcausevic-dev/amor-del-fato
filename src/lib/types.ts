// Persisted app state. Independent of the static content shape (see data/library.ts).

export interface CompletedSession {
  id: string // uuid
  sessionId: string // references a static Session id
  pathId: string | null // null if standalone / default
  completedDateLocal: string // "YYYY-MM-DD" local day of completion (streak source)
  completedAtISO: string // full timestamp, display/sort only, never streak math
  durationSeconds: number // actual silent-timer seconds completed
  journalEntryId: string | null
}

export interface JournalEntry {
  id: string // uuid
  createdAtISO: string
  dateLocal: string // "YYYY-MM-DD" local day
  sessionId: string | null // null for a freeform entry
  prompt: string // snapshot of the prompt shown
  body: string
  quote?: { text: string; author: string; source: string } // snapshot, for re-reading
}

export interface PathProgress {
  pathId: string
  currentSessionIndex: number // 0-based pointer into the path's session list
  startedAtISO: string
  completed: boolean
}

export interface StreakState {
  currentStreak: number
  longestStreak: number
  lastCompletedDateLocal: string | null
}

export type ThemePref = 'light' | 'dark' | 'system'

export interface AppState {
  version: number
  completedSessions: CompletedSession[]
  journalEntries: JournalEntry[]
  pathProgress: Record<string, PathProgress>
  streak: StreakState
  totalMinutes: number // cached sum, recomputed on write
  activePathId: string | null
  theme: ThemePref
  onboarded: boolean
}

export const CURRENT_VERSION = 1

export function emptyState(): AppState {
  return {
    version: CURRENT_VERSION,
    completedSessions: [],
    journalEntries: [],
    pathProgress: {},
    streak: { currentStreak: 0, longestStreak: 0, lastCompletedDateLocal: null },
    totalMinutes: 0,
    activePathId: null,
    theme: 'system',
    onboarded: false,
  }
}
