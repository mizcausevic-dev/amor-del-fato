import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, NotebookPen } from 'lucide-react'
import { useStore } from '../store/AppStore'
import { sessionById } from '../data/content'
import { parseLocal } from '../lib/date'

export default function Journal() {
  const { state, deleteJournalEntry } = useStore()
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const entries = useMemo(
    () =>
      [...state.journalEntries].sort((a, b) =>
        a.createdAtISO < b.createdAtISO ? 1 : -1,
      ),
    [state.journalEntries],
  )

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-head text-2xl font-700 tracking-tight text-ink">Journal</h1>
        <p className="mt-1 text-mute">
          {entries.length
            ? `${entries.length} reflection${entries.length === 1 ? '' : 's'} recorded.`
            : 'Your reflections will collect here.'}
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border border-dashed border-line bg-panel-2 px-6 py-16 text-center">
          <NotebookPen size={28} className="text-mute" />
          <p className="mt-3 font-500 text-ink">Nothing written yet</p>
          <p className="mt-1 max-w-xs text-sm text-mute">
            Finish a session, or tap Reflect on Today, and your words will live here to
            return to later.
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-4">
          {entries.map((e) => {
            const linked = e.sessionId ? sessionById(e.sessionId) : undefined
            const date = parseLocal(e.dateLocal).toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
            return (
              <motion.li
                key={e.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-line bg-panel p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-600 uppercase tracking-widest text-mute">
                    {date}
                  </p>
                  {confirmId === e.id ? (
                    <span className="flex items-center gap-2 text-xs">
                      <button
                        onClick={() => deleteJournalEntry(e.id)}
                        className="font-600 text-brand"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="text-mute"
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button
                      onClick={() => setConfirmId(e.id)}
                      className="text-mute transition-colors hover:text-brand"
                      aria-label="Delete entry"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                {e.prompt && (
                  <p className="mt-3 text-sm font-500 text-mute">{e.prompt}</p>
                )}
                <p className="mt-1 whitespace-pre-wrap text-[17px] leading-relaxed text-ink">
                  {e.body}
                </p>

                {(e.quote || linked) && <div className="mt-4 h-px w-full bg-line" />}
                {e.quote && (
                  <p className="mt-3 font-serif text-sm italic text-mute">
                    &ldquo;{e.quote.text}&rdquo; — {e.quote.author}
                  </p>
                )}
                {linked && (
                  <p className="mt-2 text-xs font-500 text-brand-2">
                    From: {linked.title}
                  </p>
                )}
              </motion.li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
