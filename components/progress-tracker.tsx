"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"

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
  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-white">
          <span>Progression du Democracy Builder</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = currentStep === step.id
          const IconComponent = step.icon

          return (
            <div key={step.id} className="flex items-center w-full">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: isCurrent ? 1.1 : isCompleted ? 1 : 0.8,
                  opacity: isCurrent || isCompleted ? 1 : 0.6,
                }}
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full border-2
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-400"
                      : isCurrent
                        ? "bg-blue-500 border-blue-400"
                        : "bg-white/10 border-white/30"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <IconComponent className="w-6 h-6 text-white" />
                )}

                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>

              {index < steps.length - 1 && null}

              {/* Step info - inline with progress */}
              {(isCurrent || isCompleted) && (
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm text-blue-200">{step.description}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
