"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MatrixFigure } from "@/components/matrix-figure"
import { Cube3DRender } from "@/components/cube-3d"
import type { Puzzle, Figure, Cube3D } from "@/lib/matrix"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Check, Clock, Sparkles } from "lucide-react"

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export function TestView({
  puzzles,
  onComplete,
  onExit,
}: {
  puzzles: Puzzle[]
  onComplete: (answers: (number | null)[]) => void
  onExit: () => void
}) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array(puzzles.length).fill(null),
  )
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const puzzle = puzzles[index]
  const selected = answers[index]
  const isLast = index === puzzles.length - 1
  const progress = ((index + 1) / puzzles.length) * 100

  const select = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = optionIndex
      return next
    })
  }

  const finish = () => {
    onComplete(answers)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20">
      
      {/* Top Header */}
      <nav className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white hover:text-primary transition-colors"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>OpenCognitive</span>
          </button>

          <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-2 bg-secondary/60 px-3.5 py-1.5 rounded-full border border-border">
              <Clock className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-white font-semibold font-mono">{formatTime(seconds)}</span>
            </span>
          </div>
        </div>
        
        {/* Subtle full-width top progress bar */}
        <div className="h-0.5 w-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </nav>

      {/* Main Focus Area */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 flex flex-col justify-between space-y-12">
        
        {/* Item Header & Instruction */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">
            Item {index + 1} of {puzzles.length}
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {puzzle.categoryName}
          </h2>
          <p className="text-sm text-muted-foreground">
            {puzzle.type === "matrix" && "Select the correct pattern that completes the 3x3 grid."}
            {puzzle.type === "rotation" && "Identify the option representing a valid spatial rotation of the target cube."}
            {puzzle.type === "series" && "Analyze the sequence progression and identify the next item."}
            {puzzle.type === "verbal" && "Read the logical scenario and select the valid conclusion."}
          </p>
        </div>

        {/* Dynamic Focus Stimulus Card */}
        <div className="flex justify-center">
          {puzzle.type === "matrix" && puzzle.grid && (
            <div className="w-full max-w-xs">
              <div className="grid grid-cols-3 gap-3">
                {puzzle.grid.map((fig, i) =>
                  fig ? (
                    <div
                      key={i}
                      className="aspect-square bg-card rounded-xl border border-border p-2.5 text-primary flex items-center justify-center transition-all"
                    >
                      <MatrixFigure figure={fig} />
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-primary bg-primary/5 text-2xl font-bold text-primary animate-pulse"
                    >
                      ?
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {puzzle.type === "rotation" && puzzle.targetCube && (
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Target Cube</span>
              <div className="h-44 w-44 text-primary">
                <Cube3DRender cube={puzzle.targetCube} />
              </div>
            </div>
          )}

          {(puzzle.type === "series" || puzzle.type === "verbal") && puzzle.questionText && (
            <div className="w-full max-w-xl text-center py-6">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-normal select-text">
                {puzzle.questionText}
              </p>
            </div>
          )}
        </div>

        {/* Options Selection block */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Options</span>
            <div className="h-px bg-border flex-1" />
          </div>

          {puzzle.type === "matrix" && (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 max-w-2xl mx-auto">
              {puzzle.options.map((opt, i) => {
                const isSelected = selected === i
                return (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className={cn(
                      "group relative aspect-square rounded-xl border bg-card p-2 text-primary transition-all duration-150 cursor-pointer hover:border-primary/60",
                      isSelected
                        ? "border-primary bg-primary/5 scale-102 ring-2 ring-primary/25"
                        : "border-border"
                    )}
                  >
                    <MatrixFigure figure={opt as Figure} />
                    <span className="absolute bottom-1 left-2 font-mono text-[9px] text-muted-foreground/60">
                      {i + 1}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {puzzle.type === "rotation" && (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 max-w-2xl mx-auto">
              {puzzle.options.map((opt, i) => {
                const isSelected = selected === i
                return (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className={cn(
                      "group relative aspect-square rounded-xl border bg-card p-2 text-primary transition-all duration-150 cursor-pointer hover:border-primary/60",
                      isSelected
                        ? "border-primary bg-primary/5 scale-102 ring-2 ring-primary/25"
                        : "border-border"
                    )}
                  >
                    <Cube3DRender cube={opt as Cube3D} />
                    <span className="absolute bottom-1 left-2 font-mono text-[9px] text-muted-foreground/60">
                      {i + 1}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {(puzzle.type === "series" || puzzle.type === "verbal") && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-xl mx-auto">
              {puzzle.options.map((opt, i) => {
                const isSelected = selected === i
                return (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className={cn(
                      "group flex items-center justify-between rounded-xl border bg-card px-5 py-4 text-left transition-all duration-150 cursor-pointer hover:border-primary/60 text-sm font-semibold",
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt as string}</span>
                    </span>
                    {isSelected && <span className="h-2 w-2 bg-primary rounded-full" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* bottom navigation bar */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <Button
            variant="ghost"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="text-xs uppercase text-muted-foreground hover:bg-secondary/40 rounded-full h-10 px-5 border border-transparent hover:border-border cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {isLast ? (
            <Button
              onClick={finish}
              disabled={selected === null}
              className="text-xs uppercase rounded-full h-10 px-8 bg-white hover:bg-neutral-200 text-black font-bold tracking-wider cursor-pointer"
            >
              Compile Results
              <Check className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => setIndex((i) => Math.min(puzzles.length - 1, i + 1))}
              disabled={selected === null}
              className="text-xs uppercase rounded-full h-10 px-8 bg-secondary hover:bg-secondary/80 text-foreground font-bold tracking-wider cursor-pointer"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

      </div>

    </main>
  )
}
