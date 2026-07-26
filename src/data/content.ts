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

import {
  philosophers,
  collections,
  sessionTakeaways,
  reflectionNotes,
  type PhilosopherBio,
  type Collection,
} from './enrichment'

export { philosophers, collections, sessionTakeaways, reflectionNotes }
export type { PhilosopherBio, Collection }

const sessionMap = new Map(sessions.map((s) => [s.id, s]))
const pathMap = new Map(paths.map((p) => [p.id, p]))
const philosopherMap = new Map(philosophers.map((p) => [p.id, p]))
const collectionMap = new Map(collections.map((c) => [c.id, c]))

export function philosopherById(id: string): PhilosopherBio | undefined {
  return philosopherMap.get(id)
}

/** Match a quote's author string (e.g. "Marcus Aurelius") to a bio. */
export function philosopherByAuthor(author: string): PhilosopherBio | undefined {
  const a = author.trim().toLowerCase()
  return philosophers.find((p) => p.name.toLowerCase() === a)
}

export function collectionById(id: string): Collection | undefined {
  return collectionMap.get(id)
}

export function takeawayFor(sessionId: string): string | undefined {
  return sessionTakeaways[sessionId]
}

export function reflectionNoteFor(day: number): string | undefined {
  return reflectionNotes[day]
}

/** Sessions of a collection, dropping any dangling ids defensively. */
export function collectionSessions(c: Collection): Session[] {
  return c.sessionIds
    .map((id) => sessionMap.get(id))
    .filter((s): s is Session => Boolean(s))
}

/** A deterministic "surprise" session: stable within a day, varies by day. */
export function surpriseSession(dateLocal: string): Session {
  const seed = hashString('surprise-' + dateLocal)
  return sessions[seed % sessions.length]
}

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

// Map an external context tag to the theme it most naturally calls for.
const TAG_THEME: Record<string, ThemeKey> = {
  Work: 'control',
  Money: 'control',
  Family: 'relationships',
  People: 'relationships',
  Health: 'mortality',
  Solitude: 'purpose',
  World: 'adversity',
  Sleep: 'resilience',
}

interface Recommendation {
  path: Path
  reason: string
}

/**
 * A gentle recommendation from the user's own recent check-ins. This is a
 * suggestion, never a dashboard or a score: it looks at how you have been
 * ARRIVING and the externals you named, and points to a path that meets it.
 * Returns null unless there is a real, recent signal.
 */
export function recommendPractice(
  completed: Array<{ arrivalState: number | null; tags?: string[] }>,
  activePathId: string | null,
): Recommendation | null {
  const recent = completed.filter((c) => c.arrivalState != null).slice(0, 8)
  if (recent.length < 3) return null
  const avg = recent.reduce((a, c) => a + (c.arrivalState as number), 0) / recent.length
  if (avg > 2.8) return null // arriving fairly steady; no nudge needed

  const tagCounts = new Map<string, number>()
  for (const c of recent) for (const t of c.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
  let topTag: string | null = null
  let topN = 0
  for (const [t, n] of tagCounts) if (n > topN) { topTag = t; topN = n }

  const theme: ThemeKey = topTag ? (TAG_THEME[topTag] ?? 'fear') : 'fear'
  let path =
    paths.find((p) => p.theme === theme && p.id !== activePathId) ??
    paths.find((p) => (p.theme === 'fear' || p.theme === 'control') && p.id !== activePathId)
  if (!path) return null

  const reason = topTag
    ? `You have been arriving unsettled, often around ${topTag.toLowerCase()}. This path meets that.`
    : 'You have arrived unsettled a few times lately. This path is built for that.'
  return { path, reason }
}
