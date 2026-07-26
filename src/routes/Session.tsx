import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronRight, Check, Flame, Sparkles } from 'lucide-react'
import MeditationTimer from '../components/MeditationTimer'
import CheckIn from '../components/CheckIn'
import { pathOfSession, sessionById, takeawayFor, THEME_META } from '../data/content'
import { useStore } from '../store/AppStore'
import { liveStreak } from '../lib/streak'
import { todayLocal } from '../lib/date'
import { LENGTH_MINUTES } from '../lib/types'

type Phase = 'arrive' | 'anchor' | 'script' | 'timer' | 'reflection' | 'leave' | 'done'
const SEGMENTS: Phase[] = ['anchor', 'script', 'timer', 'reflection']

export default function Session() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { state, completeSession } = useStore()

  const session = id ? sessionById(id) : undefined
  const path = useMemo(() => (id ? pathOfSession(id) : undefined), [id])

  const [phase, setPhase] = useState<Phase>('arrive')
  const [para, setPara] = useState(0)
  const [canBegin, setCanBegin] = useState(false)
  const [reflection, setReflection] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [arrival, setArrival] = useState<number | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [includeReflection, setIncludeReflection] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setCanBegin(true), 2200)
    return () => clearTimeout(t)
  }, [])

  if (!session) {
    return (
      <div className="grid min-h-svh place-items-center bg-canvas p-8 text-center">
        <div>
          <p className="text-mute">That session could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 rounded-full bg-brand px-5 py-2 text-white"
          >
            Back to Today
          </button>
        </div>
      </div>
    )
  }

  const tint = THEME_META[session.theme].tint
  const timerSeconds = state.profile?.sessionLength
    ? LENGTH_MINUTES[state.profile.sessionLength] * 60
    : session.durationMin * 60

  const coreIndex =
    phase === 'arrive'
      ? -1
      : phase === 'leave' || phase === 'done'
        ? SEGMENTS.length - 1
        : SEGMENTS.indexOf(phase)

  const finish = (departureState: number | null) => {
    completeSession({
      sessionId: session.id,
      pathId: path?.id ?? null,
      durationSeconds: elapsed || timerSeconds,
      pathSessionIds: path?.sessionIds,
      arrivalState: arrival,
      departureState,
      tags,
      reflection: includeReflection
        ? { prompt: session.reflection, body: reflection, quote: session.quote }
        : null,
    })
    setPhase('done')
  }

  const takeaway = takeawayFor(session.id)

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-canvas">
      {/* Ambient themed backdrop, capped low so it never competes with text */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10]"
        style={{
          background: `radial-gradient(60% 50% at 50% 30%, ${tint} 0%, transparent 70%)`,
        }}
      />

      {/* Top bar */}
      <div className="flex items-center gap-4 px-5 pt-5">
        <button
          onClick={() => navigate(-1)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-mute transition-colors hover:bg-panel-2 hover:text-ink"
          aria-label="Close session"
        >
          <X size={20} />
        </button>
        <div className="flex flex-1 gap-1.5">
          {SEGMENTS.map((s, i) => (
            <span
              key={s}
              className={`h-1 flex-1 rounded-full ${i <= coreIndex ? 'bg-brand' : 'bg-line'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-y-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* PHASE 0 — Arrive check-in */}
          {phase === 'arrive' && (
            <CheckIn
              key="arrive"
              title="How do you arrive?"
              withTags
              onPick={(v, picked) => {
                setArrival(v)
                setTags(picked)
                setPhase('anchor')
              }}
            />
          )}

          {/* PHASE 1 — Anchor quote */}
          {phase === 'anchor' && (
            <motion.div
              key="anchor"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mx-auto max-w-xl text-center"
            >
              <p className="font-serif text-2xl leading-relaxed text-ink md:text-[28px]">
                &ldquo;{session.quote.text}&rdquo;
              </p>
              <div className="mx-auto mt-6 h-px w-10 bg-line" />
              <p className="mt-4 text-xs font-600 uppercase tracking-widest text-mute">
                {session.quote.author}
                {session.quote.source ? ` · ${session.quote.source}` : ''}
              </p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: canBegin ? 1 : 0.35 }}
                onClick={() => canBegin && setPhase('script')}
                disabled={!canBegin}
                className="btn-conic mt-10 rounded-full bg-brand px-8 py-3 font-500 text-white shadow-lg shadow-brand/20 transition-transform active:scale-95"
              >
                Begin
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2 — Guided script */}
          {phase === 'script' && (
            <motion.div
              key="script"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto flex w-full max-w-[60ch] flex-col items-center"
            >
              <p className="mb-8 text-xs font-500 uppercase tracking-widest text-mute">
                {session.title}
              </p>
              <div className="min-h-[8rem] w-full text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={para}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-xl leading-[1.75] text-ink"
                  >
                    {session.script[para]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <button
                onClick={() => {
                  if (para < session.script.length - 1) setPara((p) => p + 1)
                  else setPhase('timer')
                }}
                className="mt-10 flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-500 text-white transition-transform active:scale-95"
              >
                {para < session.script.length - 1 ? 'Next' : 'Begin sitting'}
                <ChevronRight size={18} />
              </button>
              <p className="mt-3 text-xs text-mute">
                {para + 1} of {session.script.length}
              </p>
            </motion.div>
          )}

          {/* PHASE 3 — Silent timer */}
          {phase === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <MeditationTimer
                initialSeconds={timerSeconds}
                onComplete={(sec) => {
                  setElapsed(sec)
                  setTimeout(() => setPhase('reflection'), 1400)
                }}
              />
              <button
                onClick={() => setPhase('reflection')}
                className="mt-8 text-sm font-500 text-mute underline-offset-4 hover:text-ink hover:underline"
              >
                Skip to reflection
              </button>
            </motion.div>
          )}

          {/* PHASE 4 — Closing reflection */}
          {phase === 'reflection' && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-full max-w-xl"
            >
              <p className="text-center text-xs font-500 uppercase tracking-widest text-mute">
                Reflection
              </p>
              <h2 className="mt-3 text-center font-head text-2xl font-600 text-ink">
                {session.reflection}
              </h2>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={6}
                autoFocus
                placeholder="Write freely. This is only for you."
                aria-label={`Reflection: ${session.reflection}`}
                className="mt-6 w-full resize-none rounded-2xl border border-line bg-panel p-4 text-[17px] leading-relaxed text-ink outline-none placeholder:text-mute focus:border-brand"
              />
              <button
                onClick={() => {
                  setIncludeReflection(true)
                  setPhase('leave')
                }}
                className="btn-conic mt-4 w-full rounded-full bg-brand py-3.5 font-600 text-white transition-transform active:scale-[0.98]"
              >
                Complete practice
              </button>
              <button
                onClick={() => {
                  setIncludeReflection(false)
                  setPhase('leave')
                }}
                className="mt-3 w-full text-center text-sm font-500 text-mute hover:text-ink"
              >
                Skip reflection
              </button>
            </motion.div>
          )}

          {/* PHASE 5 — Leave check-in */}
          {phase === 'leave' && (
            <CheckIn key="leave" title="How do you leave?" onPick={(v) => finish(v)} />
          )}

          {/* Completion summary */}
          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-sm text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white"
              >
                <Check size={30} />
              </motion.span>
              <h2 className="mt-6 font-head text-2xl font-600 text-ink">Practice complete</h2>
              <p className="mt-2 text-mute">
                You showed up today. That is the whole discipline.
              </p>

              {takeaway && (
                <div className="mt-6 rounded-2xl border border-line bg-panel p-4 text-left">
                  <p className="flex items-center gap-2 text-xs font-600 uppercase tracking-widest text-brand">
                    <Sparkles size={14} /> Carry this into your day
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink">{takeaway}</p>
                </div>
              )}

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-ink">
                <Flame size={18} className="text-brand" />
                <span className="font-600">{liveStreak(state.streak, todayLocal())}</span>
                <span className="text-mute">day streak</span>
              </div>
              <button
                onClick={() => navigate('/')}
                className="mt-8 block w-full rounded-full bg-ink py-3.5 font-600 text-canvas"
              >
                Back to Today
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
