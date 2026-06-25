"use client"

// Smooth normal-distribution chart with a vertical marker at the user's IQ.
export function BellCurve({
  iq,
  percentile,
}: {
  iq: number
  percentile: number
}) {
  const W = 640
  const H = 240
  const padX = 24
  const padBottom = 36
  const minIq = 55
  const maxIq = 145
  const mean = 100
  const sd = 15

  const xFor = (val: number) =>
    padX + ((val - minIq) / (maxIq - minIq)) * (W - padX * 2)

  const pdf = (val: number) =>
    Math.exp(-0.5 * ((val - mean) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI))

  const peak = pdf(mean)
  const yFor = (val: number) =>
    H - padBottom - (pdf(val) / peak) * (H - padBottom - 18)

  const step = 1
  const points: [number, number][] = []
  for (let v = minIq; v <= maxIq; v += step) {
    points.push([xFor(v), yFor(v)])
  }

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ")

  // Shaded area up to the user's score (their percentile region).
  const clampedIq = Math.max(minIq, Math.min(maxIq, iq))
  const fillPoints = points.filter(([x]) => x <= xFor(clampedIq))
  const areaPath =
    `M${xFor(minIq).toFixed(2)},${(H - padBottom).toFixed(2)} ` +
    fillPoints
      .map(([x, y]) => `L${x.toFixed(2)},${y.toFixed(2)}`)
      .join(" ") +
    ` L${xFor(clampedIq).toFixed(2)},${(H - padBottom).toFixed(2)} Z`

  const markerX = xFor(clampedIq)
  const markerY = yFor(clampedIq)
  const ticks = [70, 85, 100, 115, 130]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full text-primary"
      role="img"
      aria-label={`Normal distribution chart showing an IQ of ${iq} at the ${percentile}th percentile`}
    >
      <defs>
        <linearGradient id="bellFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* baseline */}
      <line
        x1={padX}
        y1={H - padBottom}
        x2={W - padX}
        y2={H - padBottom}
        stroke="currentColor"
        strokeOpacity={0.25}
        strokeWidth={1}
      />

      {/* shaded percentile area */}
      <path d={areaPath} fill="url(#bellFill)" />

      {/* curve */}
      <path
        d={linePath}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ticks */}
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={xFor(t)}
            y1={H - padBottom}
            x2={xFor(t)}
            y2={H - padBottom + 6}
            stroke="currentColor"
            strokeOpacity={0.4}
          />
          <text
            x={xFor(t)}
            y={H - padBottom + 22}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize={12}
          >
            {t}
          </text>
        </g>
      ))}

      {/* user marker */}
      <line
        x1={markerX}
        y1={16}
        x2={markerX}
        y2={H - padBottom}
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="5 5"
      />
      <circle cx={markerX} cy={markerY} r={6} fill="currentColor" />
      <circle
        cx={markerX}
        cy={markerY}
        r={11}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.4}
        strokeWidth={2}
      />
      <text
        x={markerX}
        y={10}
        textAnchor="middle"
        className="fill-foreground"
        fontSize={13}
        fontWeight={700}
      >
        You
      </text>
    </svg>
  )
}
