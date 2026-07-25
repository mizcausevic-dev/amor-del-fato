import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  clearState,
  loadState,
  saveState,
  uid,
} from '../lib/storage'
import { todayLocal } from '../lib/date'
import { advanceStreak } from '../lib/streak'
import {
  emptyState,
  type AppState,
  type JournalEntry,
  type Profile,
  type ThemePref,
} from '../lib/types'

interface CompleteSessionInput {
  sessionId: string
  pathId: string | null
  durationSeconds: number
  pathSessionIds?: string[] // lets the store advance a path pointer without importing content
  arrivalState?: number | null
  departureState?: number | null
  reflection?: {
    prompt: string
    body: string
    quote?: { text: string; author: string; source: string }
  } | null
}

interface AddJournalInput {
  sessionId: string | null
  prompt: string
  body: string
  quote?: { text: string; author: string; source: string }
}

interface Store {
  state: AppState
  completeSession: (input: CompleteSessionInput) => void
  addJournalEntry: (input: AddJournalInput) => void
  deleteJournalEntry: (id: string) => void
  setActivePath: (pathId: string | null) => void
  setTheme: (pref: ThemePref) => void
  completeOnboarding: (profile: Profile) => void
  updateProfile: (patch: Partial<Profile>) => void
  resetAll: () => void
  importState: (json: string) => boolean
}

const Ctx = createContext<Store | null>(null)

function applyTheme(pref: ThemePref) {
  const root = document.documentElement
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = pref === 'dark' || (pref === 'system' && systemDark)
  root.classList.toggle('dark', dark)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', dark ? '#1A1815' : '#F5F1EA')
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())
  const firstRun = useRef(true)

  // Persist on every change (skip the very first render, already loaded).
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    saveState(state)
  }, [state])

  // Apply theme now and whenever the preference or the system setting changes.
  useEffect(() => {
    applyTheme(state.theme)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme(state.theme)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [state.theme])

  const completeSession = useCallback((input: CompleteSessionInput) => {
    setState((prev) => {
      const today = todayLocal()
      const now = new Date().toISOString()

      let journalId: string | null = null
      let journalEntries = prev.journalEntries
      if (input.reflection && input.reflection.body.trim()) {
        journalId = uid()
        const entry: JournalEntry = {
          id: journalId,
          createdAtISO: now,
          dateLocal: today,
          sessionId: input.sessionId,
          prompt: input.reflection.prompt,
          body: input.reflection.body.trim(),
          quote: input.reflection.quote,
        }
        journalEntries = [entry, ...prev.journalEntries]
      }

      const completed = [
        {
          id: uid(),
          sessionId: input.sessionId,
          pathId: input.pathId,
          completedDateLocal: today,
          completedAtISO: now,
          durationSeconds: Math.max(0, Math.round(input.durationSeconds)),
          journalEntryId: journalId,
          arrivalState: input.arrivalState ?? null,
          departureState: input.departureState ?? null,
        },
        ...prev.completedSessions,
      ]

      // Advance path pointer if this session belongs to the active/known path.
      const pathProgress = { ...prev.pathProgress }
      if (input.pathId && input.pathSessionIds) {
        const idx = input.pathSessionIds.indexOf(input.sessionId)
        const existing = pathProgress[input.pathId]
        const startedAtISO = existing?.startedAtISO ?? now
        const nextIndex = Math.max(existing?.currentSessionIndex ?? 0, idx + 1)
        pathProgress[input.pathId] = {
          pathId: input.pathId,
          startedAtISO,
          currentSessionIndex: Math.min(nextIndex, input.pathSessionIds.length),
          completed: nextIndex >= input.pathSessionIds.length,
        }
      }

      const streak = advanceStreak(prev.streak, today)
      const totalMinutes =
        prev.totalMinutes + Math.round(input.durationSeconds / 60)

      return {
        ...prev,
        completedSessions: completed,
        journalEntries,
        pathProgress,
        streak,
        totalMinutes,
        onboarded: true,
      }
    })
  }, [])

  const addJournalEntry = useCallback((input: AddJournalInput) => {
    if (!input.body.trim()) return
    setState((prev) => {
      const now = new Date().toISOString()
      const entry: JournalEntry = {
        id: uid(),
        createdAtISO: now,
        dateLocal: todayLocal(),
        sessionId: input.sessionId,
        prompt: input.prompt,
        body: input.body.trim(),
        quote: input.quote,
      }
      return { ...prev, journalEntries: [entry, ...prev.journalEntries] }
    })
  }, [])

  const deleteJournalEntry = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      journalEntries: prev.journalEntries.filter((e) => e.id !== id),
    }))
  }, [])

  const setActivePath = useCallback((pathId: string | null) => {
    setState((prev) => ({ ...prev, activePathId: pathId }))
  }, [])

  const setTheme = useCallback((pref: ThemePref) => {
    setState((prev) => ({ ...prev, theme: pref }))
  }, [])

  const completeOnboarding = useCallback((profile: Profile) => {
    setState((prev) => ({
      ...prev,
      profile,
      onboarded: true,
      activePathId: profile.recommendedPathId ?? prev.activePathId,
    }))
  }, [])

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setState((prev) => ({
      ...prev,
      profile: prev.profile ? { ...prev.profile, ...patch } : prev.profile,
    }))
  }, [])

  const resetAll = useCallback(() => {
    clearState()
    setState(() => ({ ...emptyState(), onboarded: true }))
  }, [])

  const importState = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json)
      if (typeof parsed !== 'object' || parsed === null) return false
      setState(() => ({ ...emptyState(), ...parsed }))
      return true
    } catch {
      return false
    }
  }, [])

  const value = useMemo<Store>(
    () => ({
      state,
      completeSession,
      addJournalEntry,
      deleteJournalEntry,
      setActivePath,
      setTheme,
      completeOnboarding,
      updateProfile,
      resetAll,
      importState,
    }),
    [
      state,
      completeSession,
      addJournalEntry,
      deleteJournalEntry,
      setActivePath,
      setTheme,
      completeOnboarding,
      updateProfile,
      resetAll,
      importState,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): Store {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used within AppProvider')
  return ctx
}
