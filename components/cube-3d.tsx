"use client"

import type { Cube3D } from "@/lib/matrix"

export function Cube3DRender({ cube, className }: { cube: Cube3D; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`3D Cube with visible faces: Top ${cube.top}, Front ${cube.front}, Right ${cube.right}`}
    >
      <defs>
        {/* Subtle, premium gradients to give faces a realistic 3D volumetric feel */}
        <linearGradient id="topFaceGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.06} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.12} />
        </linearGradient>
        <linearGradient id="frontFaceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.15} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.25} />
        </linearGradient>
        <linearGradient id="rightFaceGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.20} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.35} />
        </linearGradient>
      </defs>

      {/* Top Face */}
      <polygon
        points="50,14 86,32 50,50 14,32"
        fill="url(#topFaceGrad)"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {/* Front Face */}
      <polygon
        points="14,32 50,50 50,86 14,68"
        fill="url(#frontFaceGrad)"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {/* Right Face */}
      <polygon
        points="50,50 86,32 86,68 50,86"
        fill="url(#rightFaceGrad)"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Top Face Symbol - Perfectly aligned without aggressive skews that cause text clipping */}
      <g transform="translate(50, 32)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
          fontWeight="900"
          fill="currentColor"
          className="font-sans tracking-tight selection:bg-transparent"
        >
          {cube.top}
        </text>
      </g>

      {/* Front Face Symbol */}
      <g transform="translate(32, 59)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
          fontWeight="900"
          fill="currentColor"
          className="font-sans tracking-tight selection:bg-transparent"
        >
          {cube.front}
        </text>
      </g>

      {/* Right Face Symbol */}
      <g transform="translate(68, 59)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
          fontWeight="900"
          fill="currentColor"
          className="font-sans tracking-tight selection:bg-transparent"
        >
          {cube.right}
        </text>
      </g>
    </svg>
  )
}
