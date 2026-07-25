import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { exercises } from '../data/content'

/** The classic Stoic exercises as a quiet reference accordion. */
export default function ExercisesSection() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="mt-2">
      <h2 className="font-head text-lg font-600 text-ink">Stoic exercises</h2>
      <p className="mt-1 text-sm text-mute">
        Short practices to carry off the cushion and into the day.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {exercises.map((ex) => {
          const isOpen = open === ex.id
          return (
            <div
              key={ex.id}
              className="overflow-hidden rounded-2xl border border-line bg-panel"
            >
              <button
                onClick={() => setOpen(isOpen ? null : ex.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
                aria-expanded={isOpen}
              >
                <span>
                  <span className="block font-500 text-ink">{ex.title}</span>
                  <span className="mt-0.5 block text-sm text-mute">{ex.premise}</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-mute transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ol className="flex list-none flex-col gap-3 border-t border-line p-4">
                      {ex.steps.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-600 text-brand">
                            {i + 1}
                          </span>
                          <span className="text-[15px] leading-relaxed text-ink">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
