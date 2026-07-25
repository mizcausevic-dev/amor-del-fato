// A single line-stroke that reads as one continuum: jagged at Rattled (1),
// flat/smooth at Grounded (5). Not five different icon metaphors, so the whole
// set scans as one axis at a glance.

export default function StateGlyph({
  value,
  width = 40,
  height = 18,
  className = '',
  strokeWidth = 2,
}: {
  value: number // 1..5
  width?: number
  height?: number
  className?: string
  strokeWidth?: number
}) {
  const mid = height / 2
  // amplitude shrinks to 0 as value climbs to 5
  const amp = ((5 - value) / 4) * (height / 2 - strokeWidth)
  const segments = 6
  const step = width / segments
  let d = `M 0 ${mid}`
  for (let i = 1; i <= segments; i++) {
    const x = i * step
    const y = mid + (i % 2 === 0 ? amp : -amp)
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
