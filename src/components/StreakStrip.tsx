import { useNavigate } from 'react-router-dom'
import { lastNDays, parseLocal, todayLocal } from '../lib/date'
import DayDot from './DayDot'

/** Compact 7-day strip for the Today screen. Taps through to /progress. */
export default function StreakStrip({ practiced }: { practiced: Set<string> }) {
  const navigate = useNavigate()
  const today = todayLocal()
  const days = lastNDays(7, today)

  return (
    <button
      onClick={() => navigate('/progress')}
      className="flex w-full items-center justify-between rounded-2xl border border-line bg-panel px-4 py-3 transition-colors hover:bg-panel-2"
      aria-label="View your progress"
    >
      {days.map((d) => {
        const isToday = d === today
        const done = practiced.has(d)
        const state = isToday
          ? done
            ? 'today-done'
            : 'today'
          : done
            ? 'done'
            : 'missed'
        const label = parseLocal(d).toLocaleDateString(undefined, { weekday: 'short' })[0]
        return (
          <span key={d} className="flex flex-col items-center gap-2">
            <DayDot state={state} size={13} title={d} />
            <span className="text-[11px] font-500 text-mute">{label}</span>
          </span>
        )
      })}
    </button>
  )
}
