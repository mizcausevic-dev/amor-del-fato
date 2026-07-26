import { CURRENT_VERSION, emptyState, type AppState } from './types'
import { parseLocal } from './date'

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

function coerceArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

function coerceObject<T extends object>(v: unknown, fallback: T): T {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as T) : fallback
}

/**
 * Merge an unknown/older payload onto a clean base so new fields are always
 * present, and coerce the collection fields to their expected shapes. This is
 * the boot path from localStorage, so a corrupt/tampered payload must never
 * throw or white-screen the app (e.g. journalEntries stored as a string would
 * crash the spread + sort in the Journal). Also the shared validation for
 * imported backups.
 */
export function migrate(parsed: Partial<AppState>): AppState {
  const base = emptyState()
  const merged: AppState = {
    ...base,
    ...parsed,
    streak: { ...base.streak, ...coerceObject(parsed.streak, {}) },
    pathProgress: coerceObject(parsed.pathProgress, {}),
    completedSessions: coerceArray(parsed.completedSessions),
    journalEntries: coerceArray<AppState['journalEntries'][number]>(
      parsed.journalEntries,
    ).filter((e) => e && typeof e === 'object' && typeof e.id === 'string'),
    profile:
      parsed.profile && typeof parsed.profile === 'object' && !Array.isArray(parsed.profile)
        ? parsed.profile
        : null,
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

/** Render the journal as human-readable Markdown for reading, printing, or sharing. */
export function journalToMarkdown(state: AppState): string {
  const entries = [...state.journalEntries].sort((a, b) =>
    a.createdAtISO < b.createdAtISO ? 1 : -1,
  )
  let md = '# Amor del Fato — Journal\n\n'
  md += `${entries.length} reflection${entries.length === 1 ? '' : 's'}.\n\n`
  for (const e of entries) {
    const date = parseLocal(e.dateLocal).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    md += `## ${date}\n\n`
    if (e.pinned) md += `**Kept as a lesson.**\n\n`
    if (e.prompt) md += `*${e.prompt}*\n\n`
    md += `${e.body}\n\n`
    if (e.quote) md += `> ${e.quote.text}\n>\n> — ${e.quote.author}\n\n`
    if (e.tags && e.tags.length) md += `Tags: ${e.tags.join(', ')}\n\n`
    md += `---\n\n`
  }
  return md
}
