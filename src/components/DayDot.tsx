type DotState = 'done' | 'missed' | 'today-done' | 'today'

/**
 * The day-dot motif. Circles, not squares (squares read "spreadsheet").
 * Filled brand = practiced, hollow = missed, current day gets a ring.
 */
export default function DayDot({
  state,
  size = 12,
  title,
}: {
  state: DotState
  size?: number
  title?: string
}) {
  const base = 'inline-block rounded-full'
  const style = { width: size, height: size }

  const cls =
    state === 'done'
      ? 'bg-brand'
      : state === 'today-done'
        ? 'bg-brand ring-2 ring-offset-2 ring-brand/40 ring-offset-canvas'
        : state === 'today'
          ? 'bg-transparent ring-2 ring-brand/50'
          : 'bg-transparent ring-1 ring-line'

  return <span className={`${base} ${cls}`} style={style} title={title} aria-label={title} />
}
