import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame, Play, PenLine, Check } from 'lucide-react'
import { useStore } from '../store/AppStore'
import { liveStreak } from '../lib/streak'
import { humanDate, todayLocal } from '../lib/date'
import { practicedDaySet } from '../lib/selectors'
import {
  THEME_META,
  dailyForDate,
  defaultSession,
  pathById,
  sessionsOfPath,
} from '../data/content'
import StreakStrip from '../components/StreakStrip'

export default function Today() {
  const navigate = useNavigate()
  const { state, addJournalEntry } = useStore()
  const today = todayLocal()
  const streak = liveStreak(state.streak, today)
  const practiced = practicedDaySet(state)
  const practicedToday = practiced.has(today)

  // Determine the next practice: continue the active path, else a default session.
  const activePath = state.activePathId ? pathById(state.activePathId) : undefined
  let next = defaultSession()
  let progressLine: string | null = null
  if (activePath) {
    const list = sessionsOfPath(activePath)
    const idx = Math.min(
      state.pathProgress[activePath.id]?.currentSessionIndex ?? 0,
      list.length - 1,
    )
    next = list[idx] ?? next
    progressLine = `${activePath.title} · Day ${idx + 1} of ${list.length}`
  }

  const daily = dailyForDate(today)
  const [reflectOpen, setReflectOpen] = useState(false)
  const [reflectText, setReflectText] = useState('')
  const [saved, setSaved] = useState(false)

  const saveReflection = () => {
    if (!reflectText.trim()) return
    addJournalEntry({
      sessionId: null,
      prompt: daily.prompt,
      body: reflectText,
      quote: daily.quote,
    })
    setReflectText('')
    setReflectOpen(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-500 text-mute">{humanDate()}</p>
          <h1 className="font-head text-2xl font-700 tracking-tight text-ink">
            {practicedToday ? 'Well practiced.' : 'Begin today.'}
          </h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5">
          <Flame size={17} className={streak > 0 ? 'text-brand' : 'text-mute'} />
          <span className="font-600 text-ink">{streak}</span>
        </div>
      </div>

      {/* Primary action card */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate(`/session/${next.id}`)}
        className="group relative overflow-hidden rounded-3xl border border-line bg-panel p-6 text-left shadow-sm transition-shadow hover:shadow-md md:p-8"
      >
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-2xl"
          style={{ background: THEME_META[next.theme].tint }}
        />
        <p className="text-xs font-600 uppercase tracking-widest text-brand">
          Today&rsquo;s practice
        </p>
        <h2 className="mt-2 font-head text-2xl font-600 leading-tight text-ink md:text-3xl">
          {next.title}
        </h2>
        <p className="mt-2 max-w-md text-mute">{next.subtitle}</p>

        {progressLine && (
          <div className="mt-5">
            <p className="text-xs font-500 text-mute">{progressLine}</p>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-600 text-white transition-transform group-active:scale-95">
            <Play size={18} className="ml-0.5" />
            {practicedToday ? 'Practice again' : 'Start'}
          </span>
          <span className="text-sm font-500 text-mute">{next.durationMin} min</span>
        </div>
      </motion.button>

      {/* Daily reflection (secondary) */}
      <div className="rounded-2xl border border-line bg-panel-2 p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">
          Daily reflection
        </p>
        <p className="mt-2 font-serif text-lg leading-relaxed text-ink">
          &ldquo;{daily.quote.text}&rdquo;
        </p>
        <p className="mt-2 text-xs font-500 text-mute">
          {daily.quote.author}
          {daily.quote.source ? ` · ${daily.quote.source}` : ''}
        </p>
        <div className="mt-3 h-px w-full bg-line" />
        <p className="mt-3 text-[15px] text-ink">{daily.prompt}</p>

        {saved ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-500 text-brand-2">
            <Check size={16} /> Saved to your journal
          </p>
        ) : !reflectOpen ? (
          <button
            onClick={() => setReflectOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm font-500 text-ink transition-colors hover:bg-canvas"
          >
            <PenLine size={15} /> Reflect
          </button>
        ) : (
          <div className="mt-4">
            <textarea
              value={reflectText}
              onChange={(e) => setReflectText(e.target.value)}
              rows={4}
              autoFocus
              placeholder="A few honest lines."
              className="w-full resize-none rounded-xl border border-line bg-panel p-3 text-[15px] leading-relaxed text-ink outline-none placeholder:text-mute focus:border-brand"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={saveReflection}
                className="rounded-full bg-brand px-5 py-2 text-sm font-600 text-white"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setReflectOpen(false)
                  setReflectText('')
                }}
                className="rounded-full px-4 py-2 text-sm font-500 text-mute hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 7-day strip */}
      <StreakStrip practiced={practiced} />
    </div>
  )
}
