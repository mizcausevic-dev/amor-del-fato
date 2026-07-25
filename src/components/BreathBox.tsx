import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Box breathing: inhale 4, hold 4, exhale 4, hold 4. One ring, one label.
const PHASES = [
  { label: 'Inhale', scale: 1.0 },
  { label: 'Hold', scale: 1.0 },
  { label: 'Exhale', scale: 0.6 },
  { label: 'Hold', scale: 0.6 },
] as const

const PHASE_MS = 4000

export default function BreathBox({
  cycles = 4,
  onDone,
}: {
  cycles?: number
  onDone: () => void
}) {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      if (idx < PHASES.length - 1) {
        setIdx((i) => i + 1)
      } else {
        const nextCycle = cycle + 1
        if (nextCycle >= cycles) {
          onDone()
        } else {
          setCycle(nextCycle)
          setIdx(0)
        }
      }
    }, PHASE_MS)
    return () => clearTimeout(t)
  }, [idx, cycle, cycles, onDone])

  const phase = PHASES[idx]
  const R = 46
  const circumference = 2 * Math.PI * R

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative grid h-64 w-64 place-items-center">
        {/* per-phase tracing arc */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" stroke="var(--line)" strokeWidth="1.5" />
          {!reduce && (
            <motion.circle
              key={`${cycle}-${idx}`}
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: PHASE_MS / 1000, ease: 'linear' }}
            />
          )}
        </svg>

        {/* breathing ring */}
        <motion.span
          className="absolute h-48 w-48 rounded-full bg-brand-soft"
          animate={reduce ? { opacity: [0.4, 0.7, 0.4] } : { scale: phase.scale }}
          transition={
            reduce
              ? { duration: PHASE_MS / 1000, ease: 'easeInOut' }
              : { duration: PHASE_MS / 1000, ease: 'easeInOut' }
          }
          style={reduce ? { transform: 'scale(0.8)' } : undefined}
        />

        <div className="relative text-center">
          <motion.div
            key={phase.label + idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-head text-2xl font-600 text-ink"
          >
            {phase.label}
          </motion.div>
        </div>
      </div>

      <p className="text-sm text-mute">
        Cycle {cycle + 1} of {cycles}
      </p>
    </div>
  )
}
