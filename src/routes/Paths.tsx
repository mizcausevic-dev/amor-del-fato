import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronRight, Play, X } from 'lucide-react'
import { paths, sessionsOfPath, THEME_META, type Path } from '../data/content'
import { useStore } from '../store/AppStore'
import ExercisesSection from '../components/ExercisesSection'
import MeetTheStoics from '../components/MeetTheStoics'

export default function Paths() {
  const navigate = useNavigate()
  const { state, setActivePath } = useStore()
  const [selected, setSelected] = useState<Path | null>(null)

  const completedIds = useMemo(
    () => new Set(state.completedSessions.map((c) => c.sessionId)),
    [state.completedSessions],
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-head text-2xl font-700 tracking-tight text-ink">Paths</h1>
        <p className="mt-1 text-mute">
          Guided courses through the core disciplines of Stoic practice.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {paths.map((p) => {
          const list = sessionsOfPath(p)
          const doneCount = list.filter((s) => completedIds.has(s.id)).length
          const progress = list.length ? doneCount / list.length : 0
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="group flex flex-col rounded-2xl border border-line bg-panel p-5 text-left transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl" aria-hidden>
                  {p.emoji}
                </span>
                <ChevronRight
                  size={18}
                  className="text-mute transition-transform group-hover:translate-x-0.5"
                />
              </div>
              <h2 className="mt-3 font-head text-lg font-600 leading-tight text-ink">
                {p.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-mute">{p.description}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <span className="text-xs font-500 text-mute">
                  {doneCount}/{list.length}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <ExercisesSection />

      <MeetTheStoics />

      {/* Path detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="max-h-[85svh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-line bg-canvas p-6 md:rounded-3xl"
              initial={{ y: 40, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl" aria-hidden>
                  {selected.emoji}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="grid h-9 w-9 place-items-center rounded-full text-mute hover:bg-panel-2 hover:text-ink"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-3 text-xs font-600 uppercase tracking-widest text-brand">
                {THEME_META[selected.theme].label}
              </p>
              <h2 className="mt-1 font-head text-2xl font-700 text-ink">{selected.title}</h2>
              <p className="mt-2 text-mute">{selected.description}</p>

              <ul className="mt-6 flex flex-col gap-2">
                {sessionsOfPath(selected).map((s, i) => {
                  const done = completedIds.has(s.id)
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => {
                          setActivePath(selected.id)
                          navigate(`/session/${s.id}`)
                        }}
                        className="flex w-full items-center gap-3 rounded-xl border border-line bg-panel p-3 text-left transition-colors hover:bg-panel-2"
                      >
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-600 ${
                            done ? 'bg-brand text-white' : 'bg-panel-2 text-mute'
                          }`}
                        >
                          {done ? <Check size={16} /> : i + 1}
                        </span>
                        <span className="flex-1">
                          <span className="block font-500 text-ink">{s.title}</span>
                          <span className="block text-xs text-mute">
                            {s.durationMin} min
                          </span>
                        </span>
                        <Play size={16} className="text-mute" />
                      </button>
                    </li>
                  )
                })}
              </ul>

              <button
                onClick={() => {
                  const list = sessionsOfPath(selected)
                  const idx = Math.min(
                    state.pathProgress[selected.id]?.currentSessionIndex ?? 0,
                    list.length - 1,
                  )
                  setActivePath(selected.id)
                  navigate(`/session/${list[idx].id}`)
                }}
                className="mt-6 w-full rounded-full bg-brand py-3.5 font-600 text-white"
              >
                {state.pathProgress[selected.id] ? 'Continue path' : 'Start path'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
