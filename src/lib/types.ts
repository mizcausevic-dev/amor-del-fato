// Persisted app state. Independent of the static content shape (see data/library.ts).

export interface CompletedSession {
  id: string // uuid
  sessionId: string // references a static Session id
  pathId: string | null // null if standalone / default
  completedDateLocal: string // "YYYY-MM-DD" local day of completion (streak source)
  completedAtISO: string // full timestamp, display/sort only, never streak math
  durationSeconds: number // actual silent-timer seconds completed
  journalEntryId: string | null
  arrivalState: number | null // 1..5 how they arrived, null if skipped
  departureState: number | null // 1..5 how they left, null if skipped
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

export type ThemePref = 'light' | 'dark' | 'serene' | 'system'
export type PracticeTime = 'morning' | 'evening' | 'both'
export type SessionLength = 'short' | 'standard' | 'deep'

export interface Profile {
  focusAreas: string[] // ThemeKey values, ordered, first = primary. Max 3.
  practiceTime: PracticeTime
  sessionLength: SessionLength
  name: string | null
  recommendedPathId: string | null
}

/** Map a chosen session-length preference to a default timer duration. */
export const LENGTH_MINUTES: Record<SessionLength, number> = {
  short: 5,
  standard: 10,
  deep: 15,
}

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
  profile: Profile | null
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
    profile: null,
  }
}
