import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import {
  readings,
  readingsBySource,
  dailyReading,
  type ReadingSource,
} from '../data/readings'
import { todayLocal } from '../lib/date'
import { useDocMeta } from '../lib/useDocMeta'
import StudyNav from '../components/StudyNav'

type Filter = 'all' | ReadingSource

export default function Readings() {
  useDocMeta(
    'Stoic Source Readings — Amor del Fato',
    'Short, verbatim excerpts from the Stoics — Marcus Aurelius, Epictetus, and Seneca — in trusted public-domain translations, with precise citations.',
  )

  const groups = useMemo(() => readingsBySource(), [])
  const daily = useMemo(() => dailyReading(todayLocal()), [])
  const [filter, setFilter] = useState<Filter>('all')

  const filters: Array<{ key: Filter; label: string }> = [
    { key: 'all', label: 'All' },
    ...groups.map((g) => ({ key: g.source as Filter, label: g.label })),
  ]

  const visible = filter === 'all' ? groups : groups.filter((g) => g.source === filter)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <StudyNav />

      <div>
        <h1 className="font-head text-2xl font-700 tracking-tight text-ink">Readings</h1>
        <p className="mt-1 text-mute">
          {readings.length} short passages from the Stoics themselves, in trusted
          public-domain translations. The source is always cited so you can read further.
        </p>
      </div>

      {/* Reading of the day */}
      <section className="rounded-2xl border border-brand/30 bg-brand-soft/50 p-5">
        <p className="flex items-center gap-2 text-xs font-600 uppercase tracking-widest text-brand">
          <Sparkles size={14} /> Reading of the day
        </p>
        <blockquote className="mt-3 font-head text-lg leading-relaxed text-ink">
          {daily.text}
        </blockquote>
        <p className="mt-3 text-sm text-mute">
          {daily.author} · <span className="italic">{daily.sourceLabel}</span>, {daily.ref}
        </p>
      </section>

      {/* Source filter */}
      <div className="flex flex-wrap gap-2">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-500 transition-colors ${
              filter === key
                ? 'border-brand bg-brand-soft text-brand'
                : 'border-line text-mute hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-8"
        >
          {visible.map((group) => (
            <section key={group.source}>
              <h2 className="font-head text-sm font-600 uppercase tracking-widest text-mute">
                {group.label}
                <span className="ml-2 font-400 normal-case tracking-normal text-mute/70">
                  {group.items.length}
                </span>
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {group.items.map((r) => (
                  <article
                    key={r.id}
                    className="rounded-2xl border border-line bg-panel p-5"
                  >
                    <blockquote className="text-[15px] leading-relaxed text-ink">
                      {r.text}
                    </blockquote>
                    <p className="mt-3 text-xs text-mute">
                      {r.author} · <span className="italic">{r.sourceLabel}</span>, {r.ref}
                      <span className="text-mute/70"> · tr. {r.translator}</span>
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="mt-2 text-xs leading-relaxed text-mute/80">
        All passages are in the public domain. Each is reproduced verbatim from the cited
        translation and verified against a primary digitization.
      </p>
    </div>
  )
}
