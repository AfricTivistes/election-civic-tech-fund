"use client"

import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface Step {
  id: number
  title: string
  description: string
  icon: any
  color: string
}

interface ProgressTrackerProps {
  steps: Step[]
  currentStep: number
  completedSteps: number[]
  progress: number
}

export default function ProgressTracker({ steps, currentStep, completedSteps, progress }: ProgressTrackerProps) {
  const { t } = useLanguage()

  // Vérifications de sécurité
  const safeSteps = steps || []
  const safeCompletedSteps = completedSteps || []
  const safeProgress = typeof progress === "number" ? progress : 0

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-white">
          <span>{t?.progress?.title || "Progression du Democracy Builder"}</span>
          <span>{Math.round(safeProgress)}%</span>
        </div>
        <Progress value={safeProgress} className="h-2 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${safeProgress}%` }}
          />
        </Progress>
      </div>

      {/* Steps indicator */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {safeSteps.map((step, index) => {
          if (!step || typeof step.id !== "number") return null

          const isCompleted = safeCompletedSteps.includes(step.id)
          const isCurrent = currentStep === step.id
          const IconComponent = step.icon || null

          return (
            <div key={`step-${step.id}`} className="flex items-center w-full md:flex-col md:w-auto">
              <div
                className={`
                  relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300
                  animate-fade-in
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-400 scale-110"
                      : isCurrent
                        ? "bg-blue-500 border-blue-400 scale-110"
                        : "bg-white/10 border-white/30"
                  }
                `}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: "both",
                }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                ) : IconComponent ? (
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                ) : (
                  <div className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </div>

              {index < safeSteps.length - 1 && null}

              {/* Step info - inline with progress */}
              {(isCurrent || isCompleted) && (
                <div className="ml-4 flex-1 md:ml-0 md:mt-2 md:text-center">
                  <h3 className="text-sm md:text-lg font-semibold text-white">{step.title || ""}</h3>
                  <p className="text-xs md:text-sm text-blue-200 hidden md:block">{step.description || ""}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
