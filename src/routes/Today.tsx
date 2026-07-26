import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Flame, Play, PenLine, Wind, Shuffle, Check, ChevronRight, X, Pin, Share2 } from 'lucide-react'
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
  recommendPractice,
  reflectionNoteFor,
  sessionsOfPath,
  surpriseSession,
  takeawayFor,
} from '../data/content'
import StreakStrip from '../components/StreakStrip'
import { createQuoteCard, shareOrDownload } from '../lib/shareCard'

function partOfDay(): string {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}

/** Stable per-day hash so a resurfaced lesson is the same all day, rotates daily. */
function dayHash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

export default function Today() {
  const navigate = useNavigate()
  const { state, addJournalEntry, setActivePath } = useStore()
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

  // Resurface one kept "lesson", stable for the day, rotating across pinned entries.
  const pinned = state.journalEntries.filter((e) => e.pinned)
  const lesson = pinned.length ? pinned[dayHash(today) % pinned.length] : null

  // A gentle recommendation from recent check-ins (suggestion, not analytics).
  const rec = recommendPractice(state.completedSessions, state.activePathId)

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
        <span className="btn-conic inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-600 text-white transition-transform group-active:scale-95">
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

  const shareQuote = async () => {
    const blob = await createQuoteCard(daily.quote.text, daily.quote.author)
    if (blob) await shareOrDownload(blob, 'amor-del-fato-quote.png')
  }

  const dailyCard = (
    <div className="rounded-2xl border border-line bg-panel-2 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">
          Daily reflection
        </p>
        <button
          onClick={shareQuote}
          aria-label="Share this quote as an image"
          className="grid h-7 w-7 place-items-center rounded-full text-mute transition-colors hover:text-brand"
        >
          <Share2 size={15} />
        </button>
      </div>
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
            aria-label={`Reflection: ${daily.prompt}`}
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

  const lessonCard = lesson && (
    <button
      onClick={() => navigate('/journal')}
      className="w-full rounded-2xl border border-brand/30 bg-brand-soft/30 p-4 text-left transition-colors hover:bg-brand-soft/50"
    >
      <p className="flex items-center gap-1.5 text-xs font-600 uppercase tracking-widest text-brand">
        <Pin size={13} className="fill-current" /> A lesson you kept
      </p>
      <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink">{lesson.body}</p>
      {lesson.quote && (
        <p className="mt-2 font-serif text-xs italic text-mute">
          &ldquo;{lesson.quote.text}&rdquo; — {lesson.quote.author}
        </p>
      )}
    </button>
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header. Extra right padding on mobile keeps the streak chip clear of the
          floating search button (which only exists on mobile). */}
      <div className="flex items-center justify-between pr-12 md:pr-0">
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

      {/* Body: single column on mobile, two columns on desktop.
          min-w-0 on both columns is load-bearing: without it the grid tracks
          size to max-content, and the horizontal-scroll collections rail forces
          the whole page ~5x wider than the viewport (which mobile browsers react
          to by zooming out, pushing content off-screen). */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="flex min-w-0 flex-col gap-4">
          {primaryCard}
          {quickActions}
          {carryLine}
          <div className="lg:hidden">{collectionsRail}</div>
          {dailyCard}
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          {rec && (
            <button
              onClick={() => {
                const list = sessionsOfPath(rec.path)
                setActivePath(rec.path.id)
                if (list[0]) navigate(`/session/${list[0].id}`)
              }}
              className="w-full rounded-2xl border border-brand/30 bg-brand-soft/30 p-4 text-left transition-colors hover:bg-brand-soft/50"
            >
              <p className="text-xs font-600 uppercase tracking-widest text-brand">
                Suggested for you
              </p>
              <p className="mt-2 font-head text-lg font-600 leading-tight text-ink">
                {rec.path.title}
              </p>
              <p className="mt-1 text-sm text-mute">{rec.reason}</p>
            </button>
          )}
          <div className="hidden lg:block">{collectionsRail}</div>
          <StreakStrip practiced={practiced} />
          {lessonCard}
          {journalGlimpse}
        </div>
      </div>

      {/* Quick reflect modal */}
      <AnimatePresence>
        {quickOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Free reflection"
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
                aria-label="Free reflection"
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
