import { useEffect } from 'react'

const DEFAULT_TITLE = 'Amor del Fato — A Daily Stoic Practice'
const DEFAULT_DESC =
  'A calm daily Stoic practice: guided sessions, a silent timer, an arrive-and-leave check-in, streaks, a glossary, and a private reflection journal. Local-first, no account, no tracking.'

/**
 * Per-route document title + meta description. Client-side SPA, so this updates
 * on navigation and improves shared-link previews and JS-rendering crawlers.
 * Resets to the app defaults on unmount so no route leaks its title to another.
 */
export function useDocMeta(title?: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title
    const meta = document.querySelector('meta[name="description"]')
    const prev = meta?.getAttribute('content') ?? DEFAULT_DESC
    if (meta && description) meta.setAttribute('content', description)
    return () => {
      document.title = DEFAULT_TITLE
      if (meta) meta.setAttribute('content', prev)
    }
  }, [title, description])
}
