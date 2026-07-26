import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Shield, ChevronRight } from 'lucide-react'
import { useStore } from '../store/AppStore'
import { paths, type ThemeKey } from '../data/content'
import { FOCUS, TIMES, LENGTHS, recommendPath } from '../data/profileOptions'
import { APP_NAME } from '../config/brand'
import type { PracticeTime, Profile, SessionLength } from '../lib/types'

export default function Onboarding() {
  const { completeOnboarding } = useStore()
  const [step, setStep] = useState(0)
  const [focus, setFocus] = useState<ThemeKey[]>([])
  const [time, setTime] = useState<PracticeTime>('both')
  const [length, setLength] = useState<SessionLength>('standard')
  const [name, setName] = useState('')
  const [nudge, setNudge] = useState(false)

  const toggleFocus = (k: ThemeKey) => {
    setFocus((prev) => {
      if (prev.includes(k)) return prev.filter((x) => x !== k)
      if (prev.length >= 3) return prev // cap at 3, keep order
      return [...prev, k]
    })
  }

  const commit = (withProfile: boolean) => {
    const profile: Profile = withProfile
      ? {
          focusAreas: focus,
          practiceTime: time,
          sessionLength: length,
          name: name.trim() || null,
          recommendedPathId: focus.length ? recommendPath(focus) : paths[0].id,
        }
      : {
          focusAreas: [],
          practiceTime: 'both',
          sessionLength: 'standard',
          name: null,
          recommendedPathId: paths[0].id,
        }
    completeOnboarding(profile)
  }

  const next = () => {
    if (step === 0 && focus.length === 0) {
      setNudge(true)
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-canvas">
      <div className="flex items-center justify-between px-6 pt-6">
        <span className="flex items-center gap-2 text-mute">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-soft text-brand">
            <Shield size={16} />
          </span>
          <span className="font-head text-sm font-600 text-ink">{APP_NAME}</span>
        </span>
        <button
          onClick={() => commit(false)}
          className="text-sm font-500 text-mute transition-colors hover:text-ink"
        >
          Skip
        </button>
      </div>

      {/* step dots */}
      <div className="mt-6 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? 'w-6 bg-brand' : 'w-1.5 bg-line'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="focus"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg text-center"
            >
              <h1 className="font-head text-2xl font-700 text-ink md:text-3xl">
                What do you want to work on?
              </h1>
              <p className="mt-2 text-mute">Pick up to three. This shapes your path.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {FOCUS.map((f) => {
                  const active = focus.includes(f.key)
                  const order = focus.indexOf(f.key) + 1
                  return (
                    <button
                      key={f.key}
                      onClick={() => toggleFocus(f.key)}
                      className={`rounded-full border px-4 py-2 text-sm font-500 transition-colors ${
                        active
                          ? 'border-brand bg-brand-soft text-brand'
                          : 'border-line text-mute hover:text-ink'
                      }`}
                    >
                      {active && <span className="mr-1 text-xs">{order}.</span>}
                      {f.label}
                    </button>
                  )
                })}
              </div>
              {nudge && focus.length === 0 && (
                <p className="mt-4 text-sm text-brand">Pick at least one, or skip.</p>
              )}
              <button
                onClick={next}
                className="btn-conic mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 font-600 text-white transition-transform active:scale-95"
              >
                Continue <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="rhythm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md text-center"
            >
              <h1 className="font-head text-2xl font-700 text-ink md:text-3xl">
                When do you practice?
              </h1>
              <p className="mt-6 text-xs font-600 uppercase tracking-widest text-mute">
                Time of day
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {TIMES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTime(t.key)}
                    className={`rounded-xl border px-3 py-3 text-sm font-500 transition-colors ${
                      time === t.key
                        ? 'border-brand bg-brand-soft text-brand'
                        : 'border-line text-mute hover:text-ink'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-xs font-600 uppercase tracking-widest text-mute">
                Session length
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {LENGTHS.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => setLength(l.key)}
                    className={`flex flex-col items-center gap-0.5 rounded-xl border px-3 py-3 transition-colors ${
                      length === l.key
                        ? 'border-brand bg-brand-soft text-brand'
                        : 'border-line text-mute hover:text-ink'
                    }`}
                  >
                    <span className="text-sm font-500">{l.label}</span>
                    <span className="text-xs opacity-70">{l.hint}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={next}
                className="btn-conic mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 font-600 text-white transition-transform active:scale-95"
              >
                Continue <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm text-center"
            >
              <h1 className="font-head text-2xl font-700 text-ink md:text-3xl">
                What should we call you?
              </h1>
              <p className="mt-2 text-mute">Optional. Only ever shown to you.</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                maxLength={40}
                name="display-name"
                autoComplete="off"
                placeholder="Your name"
                aria-label="Your name (optional)"
                onKeyDown={(e) => e.key === 'Enter' && commit(true)}
                className="mt-6 w-full rounded-2xl border border-line bg-panel px-4 py-3.5 text-center text-lg text-ink outline-none placeholder:text-mute focus:border-brand"
              />
              <button
                onClick={() => commit(true)}
                className="btn-conic mt-8 w-full rounded-full bg-brand py-3.5 font-600 text-white transition-transform active:scale-[0.98]"
              >
                Begin
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
