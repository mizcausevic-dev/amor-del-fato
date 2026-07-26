import { sessions, paths } from '../data/content'
import { glossary } from '../data/glossary'
import { readings } from '../data/readings'
import type { JournalEntry } from './types'

export type SearchKind = 'session' | 'path' | 'term' | 'reading' | 'journal'

export interface SearchResult {
  kind: SearchKind
  kindLabel: string
  id: string
  title: string
  subtitle: string
  to: string // route to navigate to
}

const KIND_LABEL: Record<SearchKind, string> = {
  session: 'Practice',
  path: 'Path',
  term: 'Glossary',
  reading: 'Reading',
  journal: 'Journal',
}

/** Truncate a long body to a one-line preview around nothing fancy. */
function preview(text: string, max = 90): string {
  const t = text.replace(/\s+/g, ' ').trim()
  return t.length > max ? t.slice(0, max - 1) + '…' : t
}

/**
 * Cross-content search. Runs entirely in memory over the static content plus the
 * user's own journal — no network, consistent with the local-first design. A
 * match on the title/term ranks above a match found only in the body, so the
 * most recognizable results surface first within each group.
 */
export function searchAll(query: string, journal: JournalEntry[]): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []

  const results: Array<SearchResult & { rank: number }> = []
  const push = (r: SearchResult, primaryHit: boolean) =>
    results.push({ ...r, rank: primaryHit ? 0 : 1 })

  for (const s of sessions) {
    const inTitle = `${s.title} ${s.subtitle}`.toLowerCase().includes(q)
    const inBody =
      inTitle ||
      `${s.intro} ${s.quote.text} ${s.quote.author} ${s.reflection}`
        .toLowerCase()
        .includes(q)
    if (inBody) {
      push(
        {
          kind: 'session',
          kindLabel: KIND_LABEL.session,
          id: s.id,
          title: s.title,
          subtitle: s.subtitle,
          to: `/session/${s.id}`,
        },
        inTitle,
      )
    }
  }

  for (const p of paths) {
    const inTitle = p.title.toLowerCase().includes(q)
    if (inTitle || p.description.toLowerCase().includes(q)) {
      push(
        {
          kind: 'path',
          kindLabel: KIND_LABEL.path,
          id: p.id,
          title: `${p.emoji} ${p.title}`,
          subtitle: preview(p.description),
          to: '/paths',
        },
        inTitle,
      )
    }
  }

  for (const t of glossary) {
    const inTitle = t.term.toLowerCase().includes(q)
    if (inTitle || `${t.short} ${t.definition} ${t.origin}`.toLowerCase().includes(q)) {
      push(
        {
          kind: 'term',
          kindLabel: KIND_LABEL.term,
          id: t.id,
          title: t.term,
          subtitle: preview(t.short),
          to: '/glossary',
        },
        inTitle,
      )
    }
  }

  for (const r of readings) {
    const inTitle = `${r.author} ${r.sourceLabel}`.toLowerCase().includes(q)
    if (inTitle || r.text.toLowerCase().includes(q)) {
      push(
        {
          kind: 'reading',
          kindLabel: KIND_LABEL.reading,
          id: r.id,
          title: `${r.author} · ${r.sourceLabel} ${r.ref}`,
          subtitle: preview(r.text),
          to: '/readings',
        },
        inTitle,
      )
    }
  }

  for (const e of journal) {
    const hay = `${e.body} ${e.prompt} ${e.quote?.text ?? ''} ${e.quote?.author ?? ''}`
    if (hay.toLowerCase().includes(q)) {
      push(
        {
          kind: 'journal',
          kindLabel: KIND_LABEL.journal,
          id: e.id,
          title: preview(e.body, 48),
          subtitle: e.dateLocal,
          to: '/journal',
        },
        false,
      )
    }
  }

  results.sort((a, b) => a.rank - b.rank)
  return results.slice(0, 24).map(({ rank: _rank, ...r }) => r)
}
