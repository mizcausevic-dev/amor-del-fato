import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { playBell, primeAudio } from '../lib/audio'

interface Props {
  initialSeconds: number
  onComplete: (elapsedSeconds: number) => void
}

const PRESETS = [3, 5, 10, 15, 20] // minutes

function fmt(total: number): string {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function MeditationTimer({ initialSeconds, onComplete }: Props) {
  const reduce = useReducedMotion()
  const [duration, setDuration] = useState(initialSeconds)
  const [remaining, setRemaining] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const deadlineRef = useRef<number | null>(null)
  const tickRef = useRef<number | null>(null)

  const stopTick = () => {
    if (tickRef.current !== null) {
      clearInterval(tickRef.current)
      tickRef.current = null
    }
  }

  // Drive the countdown from an absolute deadline so a throttled/background tab
  // can't accumulate drift. The interval only reads the clock.
  useEffect(() => {
    if (!running) return
    tickRef.current = window.setInterval(() => {
      if (deadlineRef.current === null) return
      const left = Math.max(0, Math.round((deadlineRef.current - Date.now()) / 1000))
      setRemaining(left)
      if (left <= 0) {
        stopTick()
        setRunning(false)
        setDone(true)
        deadlineRef.current = null
        playBell()
        onComplete(duration)
      }
    }, 200)
    return stopTick
  }, [running, duration, onComplete])

  const start = useCallback(() => {
    if (remaining <= 0) return
    primeAudio()
    deadlineRef.current = Date.now() + remaining * 1000
    setRunning(true)
    setDone(false)
  }, [remaining])

  const pause = useCallback(() => {
    setRunning(false)
    deadlineRef.current = null
  }, [])

  const reset = useCallback(() => {
    stopTick()
    setRunning(false)
    setDone(false)
    deadlineRef.current = null
    setRemaining(duration)
  }, [duration])

  const pickPreset = (min: number) => {
    stopTick()
    setRunning(false)
    setDone(false)
    deadlineRef.current = null
    setDuration(min * 60)
    setRemaining(min * 60)
  }

  const progress = duration > 0 ? 1 - remaining / duration : 0

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Breathing ring + numeral */}
      <div className="relative grid h-64 w-64 place-items-center">
        {/* Progress ring */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--line)" strokeWidth="2" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 46}
            strokeDashoffset={2 * Math.PI * 46 * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.4s linear' }}
          />
        </svg>

        {/* Breathing pulse: the one "alive" motion, only while running */}
        <motion.span
          className="absolute h-52 w-52 rounded-full bg-brand-soft"
          animate={
            running && !reduce
              ? { scale: [0.82, 1.06, 0.82], opacity: [0.5, 0.85, 0.5] }
              : { scale: 0.9, opacity: 0.4 }
          }
          transition={
            running && !reduce
              ? { duration: 8, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.6 }
          }
        />

        <div className="relative text-center">
          <div className="font-head text-5xl font-600 tabular-nums text-ink">
            {fmt(remaining)}
          </div>
          <div className="mt-1 text-xs font-500 uppercase tracking-widest text-mute">
            {done ? 'Complete' : running ? 'Breathe' : 'Ready'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="grid h-12 w-12 place-items-center rounded-full border border-line text-mute transition-colors hover:text-ink"
          aria-label="Reset timer"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={running ? pause : start}
          disabled={remaining <= 0 && !running}
          className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/20 transition-transform active:scale-95 disabled:opacity-40"
          aria-label={running ? 'Pause timer' : 'Start timer'}
        >
          {running ? <Pause size={26} /> : <Play size={26} className="ml-0.5" />}
        </button>
        <div className="h-12 w-12" aria-hidden />
      </div>

      {/* Duration presets */}
      <div className="flex flex-wrap justify-center gap-2">
        {PRESETS.map((min) => {
          const active = duration === min * 60
          return (
            <button
              key={min}
              onClick={() => pickPreset(min)}
              className={[
                'rounded-full px-3.5 py-1.5 text-sm font-500 transition-colors',
                active
                  ? 'bg-ink text-canvas'
                  : 'border border-line text-mute hover:text-ink',
              ].join(' ')}
            >
              {min}m
            </button>
          )
        })}
      </div>
    </div>
  )
}
