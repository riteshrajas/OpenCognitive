"use client"

import { useMemo, useState } from "react"
import { LandingView } from "@/components/landing-view"
import { TestView } from "@/components/test-view"
import { ResultsView } from "@/components/results-view"
import { AboutView } from "@/components/about-view"
import {
  getAssessmentItems,
  scoreAssessment,
  type ScoreResult,
} from "@/lib/matrix"

type Stage = "landing" | "test" | "results" | "about"

export default function Page() {
  const [stage, setStage] = useState<Stage>("landing")
  const [result, setResult] = useState<ScoreResult | null>(null)

  const puzzles = useMemo(
    () => getAssessmentItems(),
    [],
  )

  if (stage === "about") {
    return <AboutView onBack={() => setStage("landing")} />
  }

  if (stage === "test") {
    return (
      <TestView
        puzzles={puzzles}
        onExit={() => setStage("landing")}
        onComplete={(answers) => {
          const responses = puzzles.map((p, i) => 
            answers[i] === p.answerIndex ? 1 : 0
          )
          setResult(scoreAssessment(responses))
          setStage("results")
        }}
      />
    )
  }

  if (stage === "results" && result) {
    return (
      <ResultsView
        result={result}
        onRestart={() => {
          setResult(null)
          setStage("landing")
        }}
      />
    )
  }

  return (
    <LandingView
      onStart={() => setStage("test")}
      onAbout={() => setStage("about")}
    />
  )
}
