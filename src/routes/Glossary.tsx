import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  X,
  BookOpen,
  Layers,
  ListChecks,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
} from 'lucide-react'
import { glossary, type GlossaryTerm } from '../data/glossary'
import { useDocMeta } from '../lib/useDocMeta'
import StudyNav from '../components/StudyNav'

type Mode = 'browse' | 'study' | 'quiz'

/** Inject a DefinedTermSet for the glossary while this route is mounted.
   Structured data as correctness (real definitions), not as a ranking trick. */
function useGlossaryJsonLd() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Stoic Glossary',
      url: 'https://amordelfato.app/glossary',
      description:
        'Plain-language definitions of the core vocabulary of Stoic philosophy.',
      hasDefinedTerm: glossary.map((t) => ({
        '@type': 'DefinedTerm',
        name: t.term,
        description: t.definition,
      })),
    }
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-generated', 'glossary')
    el.text = JSON.stringify(data)
    document.head.appendChild(el)
    return () => el.remove()
  }, [])
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const MODES: Array<{ key: Mode; label: string; icon: typeof BookOpen }> = [
  { key: 'browse', label: 'Browse', icon: BookOpen },
  { key: 'study', label: 'Flashcards', icon: Layers },
  { key: 'quiz', label: 'Quiz', icon: ListChecks },
]

export default function Glossary() {
  useDocMeta(
    'Stoic Glossary & Study — Amor del Fato',
    'Plain-language definitions of Stoic terms (amor fati, the dichotomy of control, apatheia, and more), with flashcards and a quiz to help them stick.',
  )
  useGlossaryJsonLd()
  const [mode, setMode] = useState<Mode>('browse')

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <StudyNav />
      <div>
        <h1 className="font-head text-2xl font-700 tracking-tight text-ink">Glossary</h1>
        <p className="mt-1 text-mute">
          The core vocabulary of Stoic practice, in plain language. Browse it, or study it
          until it sticks.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {MODES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`flex items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-500 transition-colors ${
              mode === key
                ? 'border-brand bg-brand-soft text-brand'
                : 'border-line text-mute hover:text-ink'
            }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {mode === 'browse' && <Browse />}
          {mode === 'study' && <Flashcards />}
          {mode === 'quiz' && <Quiz />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ---------------------------------------------------------------- Browse -- */

function Browse() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return glossary
    return glossary.filter((t) =>
      `${t.term} ${t.origin} ${t.short} ${t.definition}`.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute"
        />
        <input
          type="search"
          name="glossary-search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms"
          aria-label="Search glossary terms"
          className="w-full rounded-full border border-line bg-panel py-2.5 pl-11 pr-10 text-[15px] text-ink outline-none placeholder:text-mute focus:border-brand"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-mute hover:text-ink"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-panel-2 px-6 py-12 text-center text-sm text-mute">
          No term matches &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {results.map((t) => (
            <li key={t.id} className="rounded-2xl border border-line bg-panel p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 className="font-head text-lg font-600 text-ink">{t.term}</h2>
                <span className="text-xs font-500 text-brand-2">{t.origin}</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">{t.definition}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ Flashcards -- */

function Flashcards() {
  const [order, setOrder] = useState<number[]>(() =>
    shuffle(glossary.map((_, i) => i)),
  )
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const term = glossary[order[pos]]

  const go = (delta: number) => {
    setFlipped(false)
    setPos((p) => (p + delta + order.length) % order.length)
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={() => setFlipped((f) => !f)}
        className="relative min-h-[16rem] w-full rounded-3xl border border-line bg-panel p-8 text-center transition-colors hover:border-brand"
        aria-label="Flip card"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${term.id}-${flipped}`}
            initial={{ opacity: 0, rotateX: -8 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-[12rem] flex-col items-center justify-center gap-3"
          >
            {!flipped ? (
              <>
                <p className="text-xs font-600 uppercase tracking-widest text-mute">Term</p>
                <p className="font-head text-3xl font-700 text-ink">{term.term}</p>
                <p className="text-sm font-500 text-brand-2">{term.origin}</p>
                <p className="mt-2 text-xs text-mute">Tap to reveal</p>
              </>
            ) : (
              <>
                <p className="text-xs font-600 uppercase tracking-widest text-mute">
                  Meaning
                </p>
                <p className="text-[17px] leading-relaxed text-ink">{term.definition}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => go(-1)}
          className="grid h-11 w-11 place-items-center rounded-full border border-line text-mute transition-colors hover:text-ink"
          aria-label="Previous card"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm font-500 text-mute">
          {pos + 1} of {order.length}
        </span>
        <button
          onClick={() => go(1)}
          className="grid h-11 w-11 place-items-center rounded-full border border-line text-mute transition-colors hover:text-ink"
          aria-label="Next card"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <button
        onClick={() => {
          setOrder(shuffle(glossary.map((_, i) => i)))
          setPos(0)
          setFlipped(false)
        }}
        className="inline-flex items-center gap-2 text-sm font-500 text-mute transition-colors hover:text-ink"
      >
        <Shuffle size={15} /> Shuffle
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ Quiz -- */

interface Question {
  term: GlossaryTerm
  options: string[]
  answer: string
}

function buildRound(count: number): Question[] {
  const picked = shuffle(glossary).slice(0, count)
  return picked.map((term) => {
    const distractors = shuffle(glossary.filter((t) => t.id !== term.id))
      .slice(0, 3)
      .map((t) => t.short)
    return {
      term,
      answer: term.short,
      options: shuffle([term.short, ...distractors]),
    }
  })
}

const ROUND_SIZE = 10

function Quiz() {
  const [round, setRound] = useState<Question[]>(() => buildRound(ROUND_SIZE))
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = round[qi]
  const answered = picked !== null

  const choose = (opt: string) => {
    if (answered) return
    setPicked(opt)
    if (opt === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (qi < round.length - 1) {
      setQi((i) => i + 1)
      setPicked(null)
    } else {
      setDone(true)
    }
  }

  const restart = () => {
    setRound(buildRound(ROUND_SIZE))
    setQi(0)
    setPicked(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-line bg-panel p-8 text-center">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">Round complete</p>
        <p className="mt-3 font-head text-4xl font-700 text-ink">
          {score} <span className="text-mute">/ {round.length}</span>
        </p>
        <p className="mt-2 text-mute">
          {score === round.length
            ? 'Every one. The words are becoming yours.'
            : 'Return to the ones you missed. Repetition is the practice.'}
        </p>
        <button
          onClick={restart}
          className="btn-conic mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-600 text-white"
        >
          <RotateCcw size={17} /> New round
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-500 text-mute">
          Question {qi + 1} of {round.length}
        </span>
        <span className="text-sm font-500 text-mute">Score {score}</span>
      </div>

      <div className="rounded-2xl border border-line bg-panel p-5 text-center">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">
          What does this mean?
        </p>
        <p className="mt-2 font-head text-2xl font-700 text-ink">{q.term.term}</p>
        <p className="mt-1 text-sm font-500 text-brand-2">{q.term.origin}</p>
      </div>

      <div className="flex flex-col gap-2">
        {q.options.map((opt) => {
          const isAnswer = opt === q.answer
          const isPicked = opt === picked
          let cls = 'border-line bg-panel text-ink hover:border-brand'
          if (answered && isAnswer) cls = 'border-brand-2 bg-brand-2/10 text-ink'
          else if (answered && isPicked) cls = 'border-brand bg-brand-soft text-ink'
          else if (answered) cls = 'border-line bg-panel text-mute'
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              disabled={answered}
              className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-[15px] leading-snug transition-colors ${cls}`}
            >
              <span>{opt}</span>
              {answered && isAnswer && <Check size={18} className="shrink-0 text-brand-2" />}
              {answered && isPicked && !isAnswer && (
                <X size={18} className="shrink-0 text-brand" />
              )}
            </button>
          )
        })}
      </div>

      {answered && (
        <button
          onClick={next}
          className="btn-conic w-full rounded-full bg-brand py-3.5 font-600 text-white transition-transform active:scale-[0.98]"
        >
          {qi < round.length - 1 ? 'Next' : 'See score'}
        </button>
      )}
    </div>
  )
}
