"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, Brain, Cpu, BarChart3, HelpCircle } from "lucide-react"
import katex from "katex"

// Helper component to render math safely using KaTeX
function MathDisplay({ math, block = false }: { math: string; block?: boolean }) {
  const html = katex.renderToString(math, {
    displayMode: block,
    throwOnError: false,
    output: "html",
  })
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20">
      
      {/* Navigation Header */}
      <header className="max-w-4xl w-full mx-auto px-6 py-6 flex items-center justify-between border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white hover:text-primary transition-colors"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span>OpenCognitive</span>
        </button>
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-xs uppercase rounded-full h-8 px-4 border border-border hover:bg-secondary/40 text-muted-foreground hover:text-white cursor-pointer"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back
        </Button>
      </header>

      {/* Main Content Area */}
      <section className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 space-y-12">
        
        {/* Title */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">
            About & Scientific Foundations
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            How OpenCognitive Works
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed font-sans">
            OpenCognitive is a student research project dedicated to exploring unproctored, open-source cognitive testing methodologies. Below is a detailed breakdown of the visual task generation, psychometric scoring mathematics, and the scientific rationale behind the platform.
          </p>
        </div>

        {/* Section 1: Question Generation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Brain className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight font-mono">
              1. Task Generation & Cognitive Scales
            </h2>
          </div>
          
          <div className="pl-11 space-y-3 text-sm text-muted-foreground leading-relaxed font-sans">
            <p>
              To measure different dimensions of intelligence defined by the <strong>Cattell-Horn-Carroll (CHC)</strong> theory of cognitive abilities, the assessment integrates four distinct task methodologies based on open-source repositories:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Matrix Reasoning (Fluid Reasoning - <MathDisplay math="G_f" />):</strong> Inspired by the Sandia Matrices and MaRs-IB, these items challenge abstract pattern completion. Items scale in relational complexity (tracking shape, size, count, or rotation changes) or require Boolean logic operations (AND, OR, XOR) applied to superimposed shapes.
              </li>
              <li>
                <strong>3D Cube Rotation (Visuospatial Processing - <MathDisplay math="G_v" />):</strong> Based on the International Cognitive Ability Resource (ICAR) Three-Dimensional Rotation subtest, these items require the examinee to mentally rotate a target cube to match one of six options, preventing simplified feature-matching heuristics.
              </li>
              <li>
                <strong>Letter & Number Series (Quantitative Reasoning - <MathDisplay math="G_q" />):</strong> Evaluates sequential pattern identification through alphanumeric sequences governed by progressive mathematical step-functions.
              </li>
              <li>
                <strong>Verbal Logic (Crystallized Reasoning - <MathDisplay math="G_c" />):</strong> Utilizes relational syllogisms and deductive logic ordering matrices to measure verbal analytic logic.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: Evaluation & Scoring Math */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Cpu className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight font-mono">
              2. Psychometric Evaluation Mathematics
            </h2>
          </div>
          
          <div className="pl-11 space-y-4 text-sm text-muted-foreground leading-relaxed font-sans font-sans">
            <p>
              Rather than relying on Classical Test Theory (which simply adds up correct answers), OpenCognitive scores assessments using <strong>Item Response Theory (IRT)</strong>. This models the probability of a correct response as a function of the examinee's latent ability (<MathDisplay math="\theta" />) and calibrated item characteristics:
            </p>

            <div className="text-center text-white text-xl overflow-x-auto my-8 py-2">
              <MathDisplay math="P_i(\theta) = c_i + (1 - c_i) \frac{1}{1 + e^{-1.702 \cdot a_i (\theta - b_i)}}" block />
            </div>

            <p>
              Where <MathDisplay math="b_i" /> represents item difficulty, <MathDisplay math="a_i" /> represents item discrimination (slope), and <MathDisplay math="c_i" /> represents the pseudo-guessing parameter (fixed at <MathDisplay math="0.167" /> for 6-option multiple choice).
            </p>

            <p>
              Individual scores are computed using <strong>Bayesian Expected A Posteriori (EAP)</strong> ability estimation. EAP integrates the likelihood of response vectors over 41 Gauss-Hermite quadrature nodes (<MathDisplay math="x_k" />) representing a standard normal prior distribution:
            </p>

            <div className="text-center text-white text-xl overflow-x-auto my-8 py-2">
              <MathDisplay math="\hat{\theta} = \frac{\sum_k x_k L(x_k) W_k}{\sum_k L(x_k) W_k}" block />
            </div>

            <p>
              The resulting latent ability scalar <MathDisplay math="\theta" /> (typically bounded between <MathDisplay math="-3.0" /> and <MathDisplay math="+3.0" />) is then transformed to the globally recognized IQ scale with a mean of 100 and a standard deviation of 15:
            </p>
            
            <div className="text-center text-white text-xl overflow-x-auto my-8 py-2">
              <MathDisplay math="\text{IQ} = 100 + 15\theta" block />
            </div>
          </div>
        </div>

        {/* Section 3: Rationale */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight font-mono">
              3. Rationale: Why Open-Source Psychometrics?
            </h2>
          </div>
          
          <div className="pl-11 space-y-3 text-sm text-muted-foreground leading-relaxed font-sans">
            <p>
              Historically, cognitive assessment has been gatekept by commercial clinical instruments (like the WAIS-IV or Raven's APM), which carry high licensing costs. This creates barriers for independent student research, educational studies, and local self-exploration.
            </p>
            <p>
              Open-source batteries (such as those developed by the ICAR project and Sandia Laboratories) solve this issue by providing validated, public-domain items. OpenCognitive leverages these open instruments to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Guarantee Transparency:</strong> Every parameter and formula is audit-ready and inspectable.</li>
              <li><strong>Provide Pure Privacy:</strong> All computations are completed locally on the client side without data selling.</li>
              <li><strong>Ensure Equal Access:</strong> Offering a high-fidelity diagnostic battery without subscription prompts or paywalls.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Academic Disclaimer */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <HelpCircle className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-amber-400 uppercase tracking-tight font-mono">
              4. Project Scope & Clinical Disclaimer
            </h2>
          </div>
          
          <div className="pl-11 border-l-2 border-amber-500/20 py-1 space-y-3 text-sm text-amber-200/80 leading-relaxed font-sans">
            <p>
              This application is a <strong>student research project</strong>. It has been built under academic guidelines for educational exploration of cognitive test structures.
            </p>
            <p className="font-semibold text-white">
              The estimated scores generated by this system are illustrative simulations and CAN NEVER be substituted for a professional clinical diagnostic assessment by a licensed clinical psychologist or medical doctor.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center pt-6">
          <Button
            onClick={onBack}
            size="lg"
            className="h-12 rounded-full px-8 text-sm font-semibold bg-white hover:bg-neutral-200 text-black transition-all cursor-pointer"
          >
            Return to Welcome Page
          </Button>
        </div>

      </section>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto px-6 py-6 border-t border-border text-center text-xs text-muted-foreground">
        Developed by Ritesh. OpenCognitive research dossier. Developed for educational analysis.
      </footer>

    </main>
  )
}
