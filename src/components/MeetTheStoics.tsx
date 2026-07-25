import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { philosophers } from '../data/content'

/** Philosopher bios as a quiet reference accordion. Public-domain facts only. */
export default function MeetTheStoics() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="mt-2">
      <h2 className="font-head text-lg font-600 text-ink">Meet the Stoics</h2>
      <p className="mt-1 text-sm text-mute">The voices behind the words.</p>
      <div className="mt-4 flex flex-col gap-2">
        {philosophers.map((p) => {
          const isOpen = open === p.id
          return (
            <div key={p.id} className="overflow-hidden rounded-2xl border border-line bg-panel">
              <button
                onClick={() => setOpen(isOpen ? null : p.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
                aria-expanded={isOpen}
              >
                <span>
                  <span className="block font-600 text-ink">{p.name}</span>
                  <span className="mt-0.5 block text-sm text-mute">
                    {p.role} · {p.era}
                  </span>
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-mute transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
                    <div className="border-t border-line p-4">
                      <p className="text-[15px] leading-relaxed text-ink">{p.bio}</p>
                      <p className="mt-3 text-xs font-500 text-mute">
                        Key work: <span className="text-ink">{p.work}</span>
                      </p>
                    </div>
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
