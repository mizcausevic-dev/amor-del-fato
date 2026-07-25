// Single adapter over the static content library. Routes import from HERE, never
// from ./library directly, so the (agent-authored) library's export names are
// reconciled in exactly one place.

import {
  sessions,
  paths,
  dailyReflections,
  exercises,
  type Quote,
  type Session,
  type Path,
  type DailyReflection,
  type Exercise,
  type ThemeKey,
} from './library'

export { sessions, paths, dailyReflections, exercises }
export type { Quote, Session, Path, DailyReflection, Exercise, ThemeKey }

const sessionMap = new Map(sessions.map((s) => [s.id, s]))
const pathMap = new Map(paths.map((p) => [p.id, p]))

export function sessionById(id: string): Session | undefined {
  return sessionMap.get(id)
}

export function pathById(id: string): Path | undefined {
  return pathMap.get(id)
}

/** Ordered, existing sessions for a path (drops any dangling ids defensively). */
export function sessionsOfPath(path: Path): Session[] {
  return path.sessionIds
    .map((id) => sessionMap.get(id))
    .filter((s): s is Session => Boolean(s))
}

export function pathOfSession(sessionId: string): Path | undefined {
  return paths.find((p) => p.sessionIds.includes(sessionId))
}

/** Deterministic daily reflection: same calendar day always yields the same one. */
export function dailyForDate(dateLocal: string): DailyReflection {
  const seed = hashString(dateLocal)
  return dailyReflections[seed % dailyReflections.length]
}

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

/** Presentation metadata per theme (label + a soft tint used on cards/badges). */
export const THEME_META: Record<ThemeKey, { label: string; tint: string }> = {
  control: { label: 'The Dichotomy of Control', tint: '#6B7F6B' },
  resilience: { label: 'Resilience', tint: '#B5502D' },
  mortality: { label: 'Memento Mori', tint: '#8A6D5B' },
  anger: { label: 'Mastering Anger', tint: '#A6503A' },
  gratitude: { label: 'Gratitude', tint: '#9A8248' },
  discipline: { label: 'Discipline & Will', tint: '#5E6E7A' },
  fear: { label: 'Fear & Anxiety', tint: '#6E6A82' },
  purpose: { label: 'Purpose', tint: '#7A6A3E' },
  relationships: { label: 'Relationships', tint: '#6B7F6B' },
  adversity: { label: 'Adversity', tint: '#8A5A3C' },
}

/** A stable default first session when the user has no active path. */
export function defaultSession(): Session {
  return sessions[0]
}
