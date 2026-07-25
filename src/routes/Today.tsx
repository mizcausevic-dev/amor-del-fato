import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Flame, Play, PenLine, Wind, Shuffle, Check, ChevronRight, X } from 'lucide-react'
import { useStore } from '../store/AppStore'
import { liveStreak } from '../lib/streak'
import { humanDate, todayLocal } from '../lib/date'
import { practicedDaySet } from '../lib/selectors'
import {
  THEME_META,
  collections,
  dailyForDate,
  defaultSession,
  pathById,
  reflectionNoteFor,
  sessionsOfPath,
  surpriseSession,
  takeawayFor,
} from '../data/content'
import StreakStrip from '../components/StreakStrip'

function partOfDay(): string {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}

export default function Today() {
  const navigate = useNavigate()
  const { state, addJournalEntry } = useStore()
  const today = todayLocal()
  const streak = liveStreak(state.streak, today)
  const practiced = practicedDaySet(state)
  const practicedToday = practiced.has(today)
  const name = state.profile?.name ?? null

  // Next practice: continue the active path, else a default session.
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
  const dailyNote = reflectionNoteFor(daily.day)
  const takeaway = takeawayFor(next.id)
  const recent = state.journalEntries[0]

  const [reflectOpen, setReflectOpen] = useState(false)
  const [quickOpen, setQuickOpen] = useState(false)
  const [reflectText, setReflectText] = useState('')
  const [saved, setSaved] = useState(false)

  const saveReflection = (prompt: string, close: () => void) => {
    if (!reflectText.trim()) return
    addJournalEntry({ sessionId: null, prompt, body: reflectText, quote: daily.quote })
    setReflectText('')
    close()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const primaryCard = (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => navigate(`/session/${next.id}`)}
      className="group relative w-full overflow-hidden rounded-3xl border border-line bg-panel p-6 text-left shadow-sm transition-shadow hover:shadow-md md:p-8"
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
      {progressLine && <p className="mt-5 text-xs font-500 text-mute">{progressLine}</p>}
      <div className="mt-6 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-600 text-white transition-transform group-active:scale-95">
          <Play size={18} className="ml-0.5" />
          {practicedToday ? 'Practice again' : 'Start'}
        </span>
        <span className="text-sm font-500 text-mute">{next.durationMin} min</span>
      </div>
    </motion.button>
  )

  const quickActions = (
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: 'Breathe', icon: Wind, onClick: () => navigate('/breathe') },
        { label: 'Reflect', icon: PenLine, onClick: () => setQuickOpen(true) },
        {
          label: 'Surprise me',
          icon: Shuffle,
          onClick: () => navigate(`/session/${surpriseSession(today).id}`),
        },
      ].map(({ label, icon: Icon, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-panel py-4 text-sm font-500 text-ink transition-colors hover:bg-panel-2"
        >
          <Icon size={20} className="text-brand" />
          {label}
        </button>
      ))}
    </div>
  )

  const carryLine = takeaway && (
    <div className="rounded-2xl border-l-2 border-brand bg-brand-soft/40 px-4 py-3">
      <p className="text-xs font-600 uppercase tracking-widest text-brand">
        Carry this into your day
      </p>
      <p className="mt-1 text-[15px] leading-relaxed text-ink">{takeaway}</p>
    </div>
  )

  const collectionsRail = (
    <div>
      <p className="mb-2 text-xs font-600 uppercase tracking-widest text-mute">Collections</p>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 lg:mx-0 lg:grid lg:grid-cols-1 lg:gap-2 lg:overflow-visible lg:px-0">
        {collections.slice(0, 6).map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/session/${c.sessionIds[0]}`)}
            className="flex min-w-[190px] shrink-0 items-center gap-3 rounded-2xl border border-line bg-panel p-3 text-left transition-colors hover:bg-panel-2 lg:min-w-0"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-panel-2 text-xl">
              {c.emoji}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-500 text-ink">{c.title}</span>
              <span className="block truncate text-xs text-mute">{c.subtitle}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )

  const dailyCard = (
    <div className="rounded-2xl border border-line bg-panel-2 p-5">
      <p className="text-xs font-600 uppercase tracking-widest text-mute">Daily reflection</p>
      <p className="mt-2 font-serif text-lg leading-relaxed text-ink">
        &ldquo;{daily.quote.text}&rdquo;
      </p>
      <p className="mt-2 text-xs font-500 text-mute">
        {daily.quote.author}
        {daily.quote.source ? ` · ${daily.quote.source}` : ''}
      </p>
      <div className="mt-3 h-px w-full bg-line" />
      {dailyNote && <p className="mt-3 text-sm leading-relaxed text-mute">{dailyNote}</p>}
      <p className="mt-2 text-[15px] text-ink">{daily.prompt}</p>

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
              onClick={() => saveReflection(daily.prompt, () => setReflectOpen(false))}
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
  )

  const journalGlimpse = recent && (
    <button
      onClick={() => navigate('/journal')}
      className="w-full rounded-2xl border border-line bg-panel p-4 text-left transition-colors hover:bg-panel-2"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Recent reflection</p>
        <ChevronRight size={15} className="text-mute" />
      </div>
      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink">{recent.body}</p>
    </button>
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-500 text-mute">{humanDate()}</p>
          <h1 className="font-head text-2xl font-700 tracking-tight text-ink">
            Good {partOfDay()}
            {name ? `, ${name}` : ''}.
          </h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5">
          <Flame size={17} className={streak > 0 ? 'text-brand' : 'text-mute'} />
          <span className="font-600 text-ink">{streak}</span>
        </div>
      </div>

      {/* Body: single column on mobile, two columns on desktop */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="flex flex-col gap-4">
          {primaryCard}
          {quickActions}
          {carryLine}
          <div className="lg:hidden">{collectionsRail}</div>
          {dailyCard}
        </div>
        <div className="flex flex-col gap-4">
          <div className="hidden lg:block">{collectionsRail}</div>
          <StreakStrip practiced={practiced} />
          {journalGlimpse}
        </div>
      </div>

      {/* Quick reflect modal */}
      <AnimatePresence>
        {quickOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setQuickOpen(false)
              setReflectText('')
            }}
          >
            <motion.div
              className="w-full max-w-lg rounded-t-3xl border border-line bg-canvas p-6 md:rounded-3xl"
              initial={{ y: 40, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-600 uppercase tracking-widest text-mute">
                  Free reflection
                </p>
                <button
                  onClick={() => {
                    setQuickOpen(false)
                    setReflectText('')
                  }}
                  className="grid h-8 w-8 place-items-center rounded-full text-mute hover:bg-panel-2 hover:text-ink"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <textarea
                value={reflectText}
                onChange={(e) => setReflectText(e.target.value)}
                rows={6}
                autoFocus
                placeholder="What is on your mind right now?"
                className="mt-3 w-full resize-none rounded-2xl border border-line bg-panel p-4 text-[16px] leading-relaxed text-ink outline-none placeholder:text-mute focus:border-brand"
              />
              <button
                onClick={() => saveReflection('Free reflection', () => setQuickOpen(false))}
                className="mt-3 w-full rounded-full bg-brand py-3 font-600 text-white"
              >
                Save to journal
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
