import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { searchAll } from '../lib/search'
import { useStore } from '../store/AppStore'

const OPEN_EVENT = 'adf:open-search'

/** Trigger the global search from anywhere (nav buttons, shortcuts). */
export function openGlobalSearch() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export default function GlobalSearch() {
  const { state } = useStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(
    () => (open ? searchAll(query, state.journalEntries) : []),
    [open, query, state.journalEntries],
  )

  // Open via Cmd/Ctrl-K or the custom event; close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  // Reset + focus each time it opens.
  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // focus after the panel mounts
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const go = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active].to)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-4 pt-[10vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="shrink-0 text-mute" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search practices, paths, terms, readings, journal…"
                className="w-full bg-transparent py-4 text-[15px] text-ink outline-none placeholder:text-mute/70"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="shrink-0 rounded-full p-1 text-mute hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length >= 2 && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-mute">
                  Nothing matches “{query.trim()}”.
                </p>
              )}
              {results.map((r, i) => (
                <button
                  key={`${r.kind}-${r.id}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.to)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                    i === active ? 'bg-brand-soft' : 'hover:bg-panel-2'
                  }`}
                >
                  <span className="w-[70px] shrink-0 text-[11px] font-600 uppercase tracking-wide text-brand">
                    {r.kindLabel}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-500 text-ink">
                      {r.title}
                    </span>
                    <span className="block truncate text-xs text-mute">{r.subtitle}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
