import { useState } from 'react'
import { motion } from 'framer-motion'
import { CHECK_STATES, CONTEXT_TAGS } from '../lib/states'
import StateGlyph from './StateGlyph'

/**
 * Emotional-state check. No numbers ever shown.
 * - Default (leave): one tap on a state advances immediately.
 * - withTags (arrive): tap a state to select, optionally name the externals
 *   shaping today, then Continue. Tags are optional and never required.
 */
export default function CheckIn({
  title,
  onPick,
  withTags = false,
}: {
  title: string
  onPick: (value: number | null, tags: string[]) => void
  withTags?: boolean
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [tags, setTags] = useState<string[]>([])

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto w-full max-w-sm text-center"
    >
      <p className="text-xs font-600 uppercase tracking-widest text-mute">Check in</p>
      <h2 className="mt-3 font-head text-2xl font-600 text-ink">{title}</h2>

      <div className="mt-8 flex flex-col gap-2">
        {CHECK_STATES.map((s) => {
          const active = selected === s.value
          return (
            <button
              key={s.value}
              onClick={() => (withTags ? setSelected(s.value) : onPick(s.value, []))}
              className={`group flex items-center justify-between gap-4 rounded-2xl border px-5 py-3.5 text-left transition-colors ${
                active
                  ? 'border-brand bg-brand-soft'
                  : 'border-line bg-panel hover:border-brand hover:bg-panel-2'
              }`}
            >
              <span className={`font-500 ${active ? 'text-brand' : 'text-ink'}`}>
                {s.label}
              </span>
              <span
                className={`transition-colors ${active ? 'text-brand' : 'text-mute group-hover:text-brand'}`}
              >
                <StateGlyph value={s.value} />
              </span>
            </button>
          )
        })}
      </div>

      {withTags && (
        <div className="mt-6">
          <p className="text-xs font-500 text-mute">What is shaping today? (optional)</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {CONTEXT_TAGS.map((t) => {
              const on = tags.includes(t)
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-500 transition-colors ${
                    on
                      ? 'border-brand bg-brand-soft text-brand'
                      : 'border-line text-mute hover:text-ink'
                  }`}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {withTags ? (
        <button
          onClick={() => onPick(selected, tags)}
          disabled={selected === null}
          className="mt-8 w-full rounded-full bg-brand py-3 font-600 text-white transition-transform active:scale-[0.98] disabled:opacity-40"
        >
          Continue
        </button>
      ) : null}

      <button
        onClick={() => onPick(null, [])}
        className="mt-4 text-sm font-500 text-mute transition-colors hover:text-ink"
      >
        Skip
      </button>
    </motion.div>
  )
}
