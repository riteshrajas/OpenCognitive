import type { Figure, Shape } from "@/lib/matrix"
import { cn } from "@/lib/utils"

function shapeElement(shape: Shape, fill: boolean) {
  const fillProps = {
    fill: fill ? "currentColor" : "none",
    fillOpacity: fill ? 0.18 : 0,
    stroke: "currentColor",
    strokeWidth: 4,
    strokeLinejoin: "round" as const,
  }

  switch (shape as string) {
    case "circle":
      return <circle cx={50} cy={50} r={30} {...fillProps} />
    case "square":
      return <rect x={22} y={22} width={56} height={56} rx={6} {...fillProps} />
    case "triangle":
      return <polygon points="50,18 82,76 18,76" {...fillProps} />
    case "diamond":
      return <polygon points="50,16 84,50 50,84 16,50" {...fillProps} />
    case "hexagon":
      return (
        <polygon
          points="50,16 79,33 79,67 50,84 21,67 21,33"
          {...fillProps}
        />
      )
    case "star":
      return (
        <polygon
          points="50,14 59,39 86,39 64,55 72,82 50,66 28,82 36,55 14,39 41,39"
          {...fillProps}
        />
      )
    case "arrow":
      return (
        <polygon
          points="50,15 80,45 65,45 65,85 35,85 35,45 20,45"
          {...fillProps}
        />
      )
    default:
      return null
  }
}

export function MatrixFigure({
  figure,
  className,
}: {
  figure: Figure
  className?: string
}) {
  const dots = Array.from({ length: figure.count })
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden="true"
    >
      <g transform={`rotate(${figure.rotation} 50 50)`}>
        {shapeElement(figure.shape, figure.fill)}
      </g>
      <g>
        {dots.map((_, i) => {
          const spread = 10
          const offset = (i - (figure.count - 1) / 2) * spread
          return (
            <circle
              key={i}
              cx={50 + offset}
              cy={50}
              r={3}
              fill="currentColor"
            />
          )
        })}
      </g>
    </svg>
  )
}
