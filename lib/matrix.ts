// Open-source style cognitive assessment generator + IRT EAP scoring utilities.

export type Shape = "circle" | "square" | "triangle" | "diamond" | "hexagon" | "star"

export interface Figure {
  shape: Shape
  count: number // 1..3 inner marks
  rotation: number // degrees
  fill: boolean
}

export type PuzzleType = "matrix" | "rotation" | "series" | "verbal"

export interface Cube3D {
  top: string
  front: string
  right: string
}

export interface Puzzle {
  id: number
  type: PuzzleType
  categoryName: string
  
  // Matrix specific
  grid?: (Figure | null)[] // 9 cells for matrix; index 8 is null
  
  // Rotation specific
  targetCube?: Cube3D
  cubeOptions?: Cube3D[]
  
  // Series / Verbal specific
  questionText?: string
  
  // Unified options and answer indexing
  options: (Figure | Cube3D | string)[]
  answerIndex: number
  
  // IRT parameters (difficulty b, discrimination a, pseudo-guessing c)
  b: number
  a: number
  c: number
}

// Standard normal cumulative distribution (Abramowitz & Stegun 7.1.26).
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989422804014327 * Math.exp(-(z * z) / 2)
  let p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  if (z > 0) p = 1 - p
  return p
}

// Fixed 24 Item pool representing a professional assessment battery.
// Includes 6 Matrix items, 6 Rotation items, 6 Series items, and 6 Verbal items.
export function getAssessmentItems(): Puzzle[] {
  return [
    // --- MATRIX REASONING (Fluid reasoning: Gf) ---
    {
      id: 1,
      type: "matrix",
      categoryName: "Matrix Pattern Completion (OR-1)",
      grid: [
        { shape: "circle", count: 1, rotation: 0, fill: false },
        { shape: "circle", count: 2, rotation: 0, fill: false },
        { shape: "circle", count: 3, rotation: 0, fill: false },
        { shape: "square", count: 1, rotation: 0, fill: false },
        { shape: "square", count: 2, rotation: 0, fill: false },
        { shape: "square", count: 3, rotation: 0, fill: false },
        { shape: "triangle", count: 1, rotation: 0, fill: false },
        { shape: "triangle", count: 2, rotation: 0, fill: false },
        null,
      ],
      options: [
        { shape: "triangle", count: 1, rotation: 0, fill: false },
        { shape: "triangle", count: 2, rotation: 0, fill: false },
        { shape: "triangle", count: 3, rotation: 0, fill: false }, // correct
        { shape: "circle", count: 3, rotation: 0, fill: false },
        { shape: "square", count: 3, rotation: 0, fill: true },
        { shape: "triangle", count: 3, rotation: 90, fill: false },
      ],
      answerIndex: 2,
      a: 1.5, b: -1.8, c: 0.167,
    },
    {
      id: 2,
      type: "matrix",
      categoryName: "Matrix Progressive Rotation (OR-2)",
      grid: [
        { shape: "arrow" as any, count: 1, rotation: 0, fill: true },
        { shape: "arrow" as any, count: 1, rotation: 45, fill: true },
        { shape: "arrow" as any, count: 1, rotation: 90, fill: true },
        { shape: "arrow" as any, count: 2, rotation: 90, fill: true },
        { shape: "arrow" as any, count: 2, rotation: 135, fill: true },
        { shape: "arrow" as any, count: 2, rotation: 180, fill: true },
        { shape: "arrow" as any, count: 3, rotation: 180, fill: true },
        { shape: "arrow" as any, count: 3, rotation: 225, fill: true },
        null,
      ],
      options: [
        { shape: "arrow" as any, count: 3, rotation: 270, fill: true }, // correct
        { shape: "arrow" as any, count: 3, rotation: 180, fill: true },
        { shape: "arrow" as any, count: 3, rotation: 315, fill: true },
        { shape: "arrow" as any, count: 2, rotation: 270, fill: true },
        { shape: "arrow" as any, count: 3, rotation: 270, fill: false },
        { shape: "star", count: 3, rotation: 0, fill: true },
      ],
      answerIndex: 0,
      a: 1.8, b: -0.8, c: 0.167,
    },
    {
      id: 3,
      type: "matrix",
      categoryName: "Matrix Boolean XOR (Logical)",
      grid: [
        { shape: "circle", count: 1, rotation: 0, fill: false },
        { shape: "circle", count: 1, rotation: 0, fill: true },
        { shape: "circle", count: 1, rotation: 0, fill: true }, // Row 1 XOR fill state
        { shape: "square", count: 2, rotation: 0, fill: true },
        { shape: "square", count: 2, rotation: 0, fill: true },
        { shape: "square", count: 2, rotation: 0, fill: false }, // Row 2 XOR fill state (T + T = F)
        { shape: "hexagon", count: 3, rotation: 0, fill: true },
        { shape: "hexagon", count: 3, rotation: 0, fill: false },
        null, // Row 3 XOR fill state (T + F = T)
      ],
      options: [
        { shape: "hexagon", count: 3, rotation: 0, fill: false },
        { shape: "hexagon", count: 3, rotation: 0, fill: true }, // correct
        { shape: "hexagon", count: 2, rotation: 0, fill: true },
        { shape: "circle", count: 3, rotation: 0, fill: true },
        { shape: "hexagon", count: 3, rotation: 90, fill: true },
        { shape: "hexagon", count: 1, rotation: 0, fill: false },
      ],
      answerIndex: 1,
      a: 2.1, b: 0.2, c: 0.167,
    },
    {
      id: 4,
      type: "matrix",
      categoryName: "Matrix Dual Dimension Scaling (OR-3)",
      grid: [
        { shape: "triangle", count: 1, rotation: 0, fill: false },
        { shape: "square", count: 2, rotation: 90, fill: false },
        { shape: "hexagon", count: 3, rotation: 180, fill: false },
        { shape: "square", count: 2, rotation: 90, fill: true },
        { shape: "hexagon", count: 3, rotation: 180, fill: true },
        { shape: "triangle", count: 1, rotation: 0, fill: true },
        { shape: "hexagon", count: 3, rotation: 180, fill: false },
        { shape: "triangle", count: 1, rotation: 0, fill: false },
        null,
      ],
      options: [
        { shape: "square", count: 2, rotation: 0, fill: false },
        { shape: "square", count: 2, rotation: 90, fill: true },
        { shape: "square", count: 2, rotation: 90, fill: false }, // correct
        { shape: "triangle", count: 2, rotation: 90, fill: false },
        { shape: "hexagon", count: 2, rotation: 180, fill: false },
        { shape: "square", count: 3, rotation: 90, fill: false },
      ],
      answerIndex: 2,
      a: 2.0, b: 1.1, c: 0.167,
    },
    {
      id: 5,
      type: "matrix",
      categoryName: "Matrix Intersect/AND (Logical)",
      grid: [
        { shape: "star", count: 2, rotation: 0, fill: true },
        { shape: "star", count: 2, rotation: 0, fill: true },
        { shape: "star", count: 2, rotation: 0, fill: true },
        { shape: "diamond", count: 1, rotation: 0, fill: true },
        { shape: "diamond", count: 1, rotation: 0, fill: false },
        { shape: "diamond", count: 1, rotation: 0, fill: false }, // AND fill state (T & F = F)
        { shape: "circle", count: 3, rotation: 0, fill: false },
        { shape: "circle", count: 3, rotation: 0, fill: false },
        null, // AND fill state (F & F = F)
      ],
      options: [
        { shape: "circle", count: 3, rotation: 0, fill: true },
        { shape: "circle", count: 3, rotation: 0, fill: false }, // correct
        { shape: "circle", count: 2, rotation: 0, fill: false },
        { shape: "diamond", count: 3, rotation: 0, fill: false },
        { shape: "circle", count: 3, rotation: 90, fill: false },
        { shape: "star", count: 3, rotation: 0, fill: false },
      ],
      answerIndex: 1,
      a: 1.7, b: 1.5, c: 0.167,
    },
    {
      id: 6,
      type: "matrix",
      categoryName: "Matrix Triple Parameter Integration (OR-3)",
      grid: [
        { shape: "circle", count: 1, rotation: 0, fill: true },
        { shape: "square", count: 2, rotation: 45, fill: false },
        { shape: "triangle", count: 3, rotation: 90, fill: true },
        { shape: "square", count: 2, rotation: 45, fill: true },
        { shape: "triangle", count: 3, rotation: 90, fill: false },
        { shape: "circle", count: 1, rotation: 0, fill: true },
        { shape: "triangle", count: 3, rotation: 90, fill: true },
        { shape: "circle", count: 1, rotation: 0, fill: false },
        null,
      ],
      options: [
        { shape: "square", count: 2, rotation: 45, fill: true }, // correct
        { shape: "square", count: 2, rotation: 45, fill: false },
        { shape: "square", count: 1, rotation: 45, fill: true },
        { shape: "circle", count: 2, rotation: 0, fill: true },
        { shape: "triangle", count: 2, rotation: 90, fill: true },
        { shape: "square", count: 3, rotation: 0, fill: true },
      ],
      answerIndex: 0,
      a: 2.3, b: 2.2, c: 0.167,
    },

    // --- 3D ROTATION (Visuospatial processing: Gv) ---
    {
      id: 7,
      type: "rotation",
      categoryName: "3D Cube Rotation (Orthogonal)",
      targetCube: { top: "★", front: "▲", right: "●" },
      options: [
        { top: "●", front: "★", right: "▲" }, // invalid
        { top: "▲", front: "●", right: "★" }, // invalid
        { top: "★", front: "●", right: "▼" }, // invalid
        { top: "●", front: "▼", right: "★" }, // correct rotation
        { top: "▼", front: "★", right: "●" }, // invalid
        { top: "■", front: "▲", right: "●" }, // invalid symbol
      ],
      answerIndex: 3,
      a: 1.6, b: -0.6, c: 0.167,
    },
    {
      id: 8,
      type: "rotation",
      categoryName: "3D Cube Rotation (Diagonal)",
      targetCube: { top: "A", front: "B", right: "C" },
      options: [
        { top: "B", front: "C", right: "A" }, // incorrect orientation
        { top: "C", front: "A", right: "B" }, // correct rotation
        { top: "A", front: "C", right: "B" }, // mirrored/incorrect
        { top: "D", front: "B", right: "C" }, // invalid face
        { top: "B", front: "A", right: "C" }, // mirrored
        { top: "C", front: "B", right: "A" }, // incorrect
      ],
      answerIndex: 1,
      a: 1.8, b: 0.1, c: 0.167,
    },
    {
      id: 9,
      type: "rotation",
      categoryName: "3D Cube Rotation (Inverted)",
      targetCube: { top: "1", front: "2", right: "3" },
      options: [
        { top: "3", front: "2", right: "4" },
        { top: "2", front: "3", right: "5" },
        { top: "3", front: "1", right: "2" }, // mirrored
        { top: "2", front: "1", right: "3" }, // correct rotation
        { top: "1", front: "3", right: "2" }, // incorrect
        { top: "3", front: "2", right: "1" }, // incorrect
      ],
      answerIndex: 3,
      a: 1.9, b: 0.8, c: 0.167,
    },
    {
      id: 10,
      type: "rotation",
      categoryName: "3D Cube Rotation (Complex Symbols)",
      targetCube: { top: "◆", front: "✖", right: "☁" },
      options: [
        { top: "✖", front: "☁", right: "◆" }, // correct rotation
        { top: "☁", front: "◆", right: "✖" }, // incorrect
        { top: "◆", front: "☁", right: "✖" }, // incorrect
        { top: "✖", front: "◆", right: "☁" }, // incorrect
        { top: "☁", front: "✖", right: "◆" }, // incorrect
        { top: "◆", front: "✖", right: "▲" }, // incorrect
      ],
      answerIndex: 0,
      a: 2.1, b: 1.4, c: 0.167,
    },
    {
      id: 11,
      type: "rotation",
      categoryName: "3D Cube Rotation (Double Rotation)",
      targetCube: { top: "X", front: "Y", right: "Z" },
      options: [
        { top: "Y", front: "X", right: "Z" },
        { top: "Z", front: "X", right: "Y" }, // incorrect
        { top: "Z", front: "Y", right: "W" },
        { top: "Y", front: "Z", right: "X" }, // incorrect
        { top: "Z", front: "Y", right: "X" }, // correct
        { top: "X", front: "Z", right: "Y" },
      ],
      answerIndex: 4,
      a: 2.2, b: 1.9, c: 0.167,
    },
    {
      id: 12,
      type: "rotation",
      categoryName: "3D Cube Rotation (High Relational Load)",
      targetCube: { top: "☼", front: "☾", right: "♥" },
      options: [
        { top: "☾", front: "☼", right: "♥" },
        { top: "♥", front: "☼", right: "☾" },
        { top: "♥", front: "☾", right: "☼" }, // correct
        { top: "☼", front: "♥", right: "☾" },
        { top: "☾", front: "♥", right: "☼" },
        { top: "☼", front: "☾", right: "♣" },
      ],
      answerIndex: 2,
      a: 2.5, b: 2.5, c: 0.167,
    },

    // --- LETTER & NUMBER SERIES (Fluid/Quantitative reasoning: Gf/Gq) ---
    {
      id: 13,
      type: "series",
      categoryName: "Arithmetic Series Expansion",
      questionText: "Identify the next element in the sequence: 3, 7, 11, 15, 19, ...",
      options: ["21", "22", "23", "24", "25", "26"],
      answerIndex: 2, // 23
      a: 1.4, b: -1.5, c: 0.167,
    },
    {
      id: 14,
      type: "series",
      categoryName: "Alphabetical Step Function",
      questionText: "Identify the next letter in the sequence: A, C, F, J, O, ...",
      options: ["T", "U", "V", "W", "X", "Y"],
      answerIndex: 1, // U (+2, +3, +4, +5, +6)
      a: 1.6, b: -0.5, c: 0.167,
    },
    {
      id: 15,
      type: "series",
      categoryName: "Alternating Step Sequence",
      questionText: "Identify the next element in the sequence: 2, 6, 4, 12, 10, 30, ...",
      options: ["26", "28", "32", "34", "38", "40"],
      answerIndex: 1, // 28 (*3, -2, *3, -2, *3, -2)
      a: 1.8, b: 0.3, c: 0.167,
    },
    {
      id: 16,
      type: "series",
      categoryName: "Fibonacci-Analogous Sequence",
      questionText: "Identify the next element in the sequence: 1, 2, 4, 7, 12, 20, ...",
      options: ["30", "31", "32", "33", "34", "35"],
      answerIndex: 3, // 33 (a_n = a_{n-1} + a_{n-2} + 1)
      a: 2.0, b: 1.0, c: 0.167,
    },
    {
      id: 17,
      type: "series",
      categoryName: "Double-Interleaved Series",
      questionText: "Identify the next element in the sequence: 16, 2, 8, 4, 4, 8, ...",
      options: ["2", "4", "6", "8", "10", "12"],
      answerIndex: 0, // 2 (Alternating series 1: 16, 8, 4, 2; series 2: 2, 4, 8, ...)
      a: 2.2, b: 1.7, c: 0.167,
    },
    {
      id: 18,
      type: "series",
      categoryName: "Complex Multi-Base Step Series",
      questionText: "Identify the next letter in the sequence: Z, Y, W, T, P, ...",
      options: ["J", "K", "L", "M", "N", "O"],
      answerIndex: 1, // K (-1, -2, -3, -4, -5 letters)
      a: 2.3, b: 2.3, c: 0.167,
    },

    // --- VERBAL LOGIC / SYLLOGISMS (Crystallized intelligence / Deductive Logic: Gc) ---
    {
      id: 19,
      type: "verbal",
      categoryName: "Verbal Relational Inference",
      questionText: "If Tom is taller than Jack, and Jack is taller than Fred, but Fred is taller than Will, who is the second tallest?",
      options: ["Tom", "Jack", "Fred", "Will", "Cannot be determined", "None of these"],
      answerIndex: 1, // Jack
      a: 1.5, b: -1.0, c: 0.167,
    },
    {
      id: 20,
      type: "verbal",
      categoryName: "Categorical Syllogism Validity",
      questionText: "Assume: 'All engineers are logical. Some logical people are creative.' Which of the following statement(s) MUST be true?",
      options: [
        "All engineers are creative.",
        "Some engineers are creative.",
        "Some logical people are engineers.",
        "No creative people are logical.",
        "None of the above are true.",
        "All creative people are logical."
      ],
      answerIndex: 2, // Some logical people are engineers.
      a: 1.7, b: 0.2, c: 0.167,
    },
    {
      id: 21,
      type: "verbal",
      categoryName: "Verbal Grid Mapping",
      questionText: "Four friends (Anna, Bill, Cleo, Dan) sit in a row. Anna is next to Bill but not Cleo. If Cleo is next to Dan, and Dan is on the far left, who is sitting next to Dan?",
      options: ["Anna", "Bill", "Cleo", "Cannot sit in this configuration", "Anna or Bill", "No sit order works"],
      answerIndex: 2, // Cleo
      a: 1.9, b: 0.9, c: 0.167,
    },
    {
      id: 22,
      type: "verbal",
      categoryName: "Logical Analogy Relation",
      questionText: "Glove is to Hand as Chimney is to: ",
      options: ["Smoke", "Roof", "Brick", "Fire", "House", "Heat"],
      answerIndex: 1, // Roof
      a: 1.6, b: 1.2, c: 0.167,
    },
    {
      id: 23,
      type: "verbal",
      categoryName: "Conditional Negation Logic",
      questionText: "If it is raining, the street is wet. The street is wet. Therefore, it is raining.",
      options: [
        "The conclusion is logically valid.",
        "The conclusion is logically invalid (affirming the consequent).",
        "The conclusion is only valid if it is cold outside.",
        "The conclusion is valid but false.",
        "The conclusion cannot be evaluated.",
        "None of the above."
      ],
      answerIndex: 1, // Invalid (affirming the consequent)
      a: 2.1, b: 1.8, c: 0.167,
    },
    {
      id: 24,
      type: "verbal",
      categoryName: "Verbal Deductive Ordering",
      questionText: "Five products (V, W, X, Y, Z) are ranked by price. V is more expensive than X. W is cheaper than Y but more expensive than Z. If Y is cheaper than X, which product is the most expensive?",
      options: ["V", "W", "X", "Y", "Z", "Cannot be determined"],
      answerIndex: 0, // V (V > X > Y > W > Z)
      a: 2.4, b: 2.4, c: 0.167,
    },
  ]
}

// --- IRT Bayesian Expected A Posteriori (EAP) Scoring Engine -----------------

export interface ScoreResult {
  correct: number
  total: number
  theta: number
  sem: number
  iq: number
  percentile: number
  subscales: {
    fluid: number
    spatial: number
    verbal: number
  }
}

// 41-node Gauss-Hermite quadrature nodes from -4.0 to +4.0 (step 0.2)
const QUAD_NODES: number[] = Array.from({ length: 41 }, (_, i) => -4.0 + i * 0.2)

// Density weights representing the standard normal distribution N(0, 1)
const QUAD_WEIGHTS: number[] = QUAD_NODES.map((x) => {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
})

// Normalize weights to sum up to 1
const SUM_WEIGHTS = QUAD_WEIGHTS.reduce((sum, w) => sum + w, 0)
const NORM_WEIGHTS = QUAD_WEIGHTS.map((w) => w / SUM_WEIGHTS)

export function calculateEapTheta(responses: number[]): { theta: number; sem: number } {
  const items = getAssessmentItems()
  const numItems = Math.min(responses.length, items.length)

  const likelihoods = QUAD_NODES.map((thetaVal) => {
    let L = 1.0
    for (let i = 0; i < numItems; i++) {
      const item = items[i]
      const resp = responses[i]
      
      const exponent = 1.702 * item.a * (thetaVal - item.b)
      const p1 = 1 / (1 + Math.exp(-exponent))
      const p = item.c + (1 - item.c) * p1

      if (resp === 1) {
        L *= p
      } else {
        L *= (1 - p)
      }
    }
    return L
  })

  const posteriors = NORM_WEIGHTS.map((prior, k) => likelihoods[k] * prior)
  const sumPosteriors = posteriors.reduce((sum, p) => sum + p, 0)

  if (sumPosteriors === 0) {
    return { theta: 0.0, sem: 1.0 }
  }

  let expectedTheta = 0
  for (let k = 0; k < QUAD_NODES.length; k++) {
    expectedTheta += QUAD_NODES[k] * (posteriors[k] / sumPosteriors)
  }

  let varianceTheta = 0
  for (let k = 0; k < QUAD_NODES.length; k++) {
    varianceTheta += Math.pow(QUAD_NODES[k] - expectedTheta, 2) * (posteriors[k] / sumPosteriors)
  }

  return {
    theta: expectedTheta,
    sem: Math.sqrt(varianceTheta),
  }
}

export function scoreAssessment(responses: number[]): ScoreResult {
  const items = getAssessmentItems()
  const total = items.length

  let correct = 0
  let fluidCorrect = 0, fluidTotal = 0
  let spatialCorrect = 0, spatialTotal = 0
  let verbalCorrect = 0, verbalTotal = 0

  for (let i = 0; i < responses.length; i++) {
    const item = items[i]
    const isCorrect = responses[i] === 1
    if (isCorrect) correct++

    if (item.type === "matrix" || item.type === "series") {
      fluidTotal++
      if (isCorrect) fluidCorrect++
    } else if (item.type === "rotation") {
      spatialTotal++
      if (isCorrect) spatialCorrect++
    } else if (item.type === "verbal") {
      verbalTotal++
      if (isCorrect) verbalCorrect++
    }
  }

  const { theta, sem } = calculateEapTheta(responses)

  const rawIq = 100 + theta * 15
  const iq = Math.round(Math.max(55, Math.min(145, rawIq)))
  const percentile = Math.round(normalCdf(theta) * 100)

  return {
    correct,
    total,
    theta,
    sem,
    iq,
    percentile: Math.max(1, Math.min(99, percentile)),
    subscales: {
      fluid: fluidTotal > 0 ? Math.round((fluidCorrect / fluidTotal) * 100) : 0,
      spatial: spatialTotal > 0 ? Math.round((spatialCorrect / spatialTotal) * 100) : 0,
      verbal: verbalTotal > 0 ? Math.round((verbalCorrect / verbalTotal) * 100) : 0,
    },
  }
}
