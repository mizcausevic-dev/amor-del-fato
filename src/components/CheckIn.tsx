import { motion } from 'framer-motion'
import { CHECK_STATES } from '../lib/states'
import StateGlyph from './StateGlyph'

/** One-tap emotional-state check. No confirm, no numbers. Tap a word to advance. */
export default function CheckIn({
  title,
  onPick,
}: {
  title: string
  onPick: (value: number | null) => void
}) {
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
        {CHECK_STATES.map((s) => (
          <button
            key={s.value}
            onClick={() => onPick(s.value)}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel px-5 py-3.5 text-left transition-colors hover:border-brand hover:bg-panel-2"
          >
            <span className="font-500 text-ink">{s.label}</span>
            <span className="text-mute transition-colors group-hover:text-brand">
              <StateGlyph value={s.value} />
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onPick(null)}
        className="mt-5 text-sm font-500 text-mute transition-colors hover:text-ink"
      >
        Skip
      </button>
    </motion.div>
  )
}
