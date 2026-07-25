import { useMemo } from 'react'
import { Flame, Clock, CheckCircle, Trophy } from 'lucide-react'
import { useStore } from '../store/AppStore'
import { liveStreak } from '../lib/streak'
import { addDays, lastNDays, parseLocal, todayLocal } from '../lib/date'
import { practicedDaySet } from '../lib/selectors'
import DayDot from '../components/DayDot'
import ShiftChart from '../components/ShiftChart'

const WEEKS = 13

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Flame
  value: string | number
  label: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-4">
      <Icon size={20} className="text-brand" />
      <p className="mt-3 font-head text-2xl font-700 text-ink">{value}</p>
      <p className="text-xs font-500 text-mute">{label}</p>
    </div>
  )
}

export default function Progress() {
  const { state } = useStore()
  const today = todayLocal()
  const practiced = practicedDaySet(state)
  const streak = liveStreak(state.streak, today)

  // Build a weekday-aligned grid: columns are weeks, rows are Sun..Sat.
  const { columns } = useMemo(() => {
    const todayDow = parseLocal(today).getDay()
    const gridEnd = addDays(today, 6 - todayDow) // Saturday of current week
    const totalDays = WEEKS * 7
    const days = lastNDays(totalDays, gridEnd) // days[0] is a Sunday
    const cols: string[][] = []
    for (let c = 0; c < WEEKS; c++) cols.push(days.slice(c * 7, c * 7 + 7))
    return { columns: cols }
  }, [today])

  const totalSessions = state.completedSessions.length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-head text-2xl font-700 tracking-tight text-ink">Progress</h1>
        <p className="mt-1 text-mute">The record of showing up.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={Flame} value={streak} label="Day streak" />
        <Stat icon={Trophy} value={state.streak.longestStreak} label="Longest streak" />
        <Stat icon={CheckCircle} value={totalSessions} label="Sessions" />
        <Stat icon={Clock} value={state.totalMinutes} label="Minutes" />
      </div>

      <ShiftChart sessions={state.completedSessions} />

      {/* Day-dot heatmap */}
      <div className="rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs font-600 uppercase tracking-widest text-mute">
          Last {WEEKS} weeks
        </p>
        <div className="mt-4 overflow-x-auto">
          <div className="flex gap-1.5">
            {columns.map((week, ci) => (
              <div key={ci} className="flex flex-col gap-1.5">
                {week.map((d) => {
                  const future = d > today
                  if (future) return <span key={d} className="h-3 w-3" />
                  const isToday = d === today
                  const done = practiced.has(d)
                  const st = isToday
                    ? done
                      ? 'today-done'
                      : 'today'
                    : done
                      ? 'done'
                      : 'missed'
                  return <DayDot key={d} state={st} size={12} title={d} />
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-mute">
          <span className="flex items-center gap-1.5">
            <DayDot state="done" size={10} /> Practiced
          </span>
          <span className="flex items-center gap-1.5">
            <DayDot state="missed" size={10} /> Missed
          </span>
        </div>
      </div>
    </div>
  )
}
