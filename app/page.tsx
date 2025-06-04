"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, FileText, Award, Zap, Star } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StepOne from "@/components/step-one"
import StepTwo from "@/components/step-two"
import StepThree from "@/components/step-three"
import StepFour from "@/components/step-four"
import ProgressTracker from "@/components/progress-tracker"

const steps = [
  {
    id: 1,
    title: "Votre Vision Démocratique",
    description: "Décrivez votre ambition pour transformer la démocratie",
    icon: Lightbulb,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 2,
    title: "L'Impact Technologique",
    description: "Modélisez votre solution technologique",
    icon: Zap,
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 3,
    title: "Votre Équipe Citoyenne",
    description: "Présentez les acteurs de votre projet",
    icon: Users,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 4,
    title: "Votre Arsenal Numérique",
    description: "Téléversez vos documents justificatifs",
    icon: FileText,
    color: "from-purple-400 to-pink-500",
  },
]

export default function ElectionCivicTechFund() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    vision: {},
    technology: {},
    team: {},
    documents: {},
  })
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [badges, setBadges] = useState<string[]>([])

  // Effet pour faire défiler la page vers le haut lorsque l'étape change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [currentStep])

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step as keyof typeof prev], ...data },
    }))
  }

  const completeStep = (stepNumber: number, badge?: string) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps((prev) => [...prev, stepNumber])
    }
    if (badge && !badges.includes(badge)) {
      setBadges((prev) => [...prev, badge])
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateProgress = () => {
    return (completedSteps.length / 4) * 100
  }

  if (currentStep === 0) {
    return <HeroSection onStart={() => setCurrentStep(1)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header with progress */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative p-2 bg-white/15 backdrop-blur-sm rounded-lg border border-white/30">
                  <img
                    src="/logo-ectf.png"
                    alt="Election Civic Tech Fund - Logo avec continent africain"
                    className="h-10 w-auto"
                    style={{ filter: "brightness(1.3) contrast(1.2)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-blue-400/10 rounded-lg"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Election Civic Tech Fund</h1>
                  <p className="text-sm text-blue-200">Digital Democracy Journey</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-white font-medium">175 000€ • 14 Pays</p>
                  <p className="text-xs text-blue-200">∞ Possibilités</p>
                </div>
              </div>
            </div>

            <ProgressTracker
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              progress={calculateProgress()}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {currentStep === 1 && (
                <StepOne
                  data={formData.vision}
                  onUpdate={(data) => updateFormData("vision", data)}
                  onComplete={(badge) => completeStep(1, badge)}
                  onNext={nextStep}
                />
              )}
              {currentStep === 2 && (
                <StepTwo
                  data={formData.technology}
                  onUpdate={(data) => updateFormData("technology", data)}
                  onComplete={(badge) => completeStep(2, badge)}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  data={formData.team}
                  onUpdate={(data) => updateFormData("team", data)}
                  onComplete={(badge) => completeStep(3, badge)}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              {currentStep === 4 && (
                <StepFour
                  data={formData.documents}
                  onUpdate={(data) => updateFormData("documents", data)}
                  onComplete={(badge) => completeStep(4, badge)}
                  onPrev={prevStep}
                  formData={formData}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <footer className="mt-20 border-t border-white/10 pt-8">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src="/logo-africtivites.svg"
                    alt="AfricTivites - Activisme numérique pour l'Afrique"
                    className="h-8 w-auto opacity-90 hover:opacity-100 transition-all duration-300"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
                    }}
                    onError={(e) => {
                      console.error("Error loading AfricTivites logo:", e)
                      // Fallback to placeholder if SVG fails to load
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = "flex"
                    }}
                  />
                  <div
                    className="h-8 w-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full items-center justify-center hidden"
                    style={{ display: "none" }}
                  >
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div className="text-sm text-blue-200">
                    <p className="font-medium">Propulsé par AfricTivites</p>
                    <p className="text-xs text-blue-300">Activisme numérique pour une Afrique démocratique</p>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-sm text-blue-200">© 2024 Election Civic Tech Fund - AfricTivites</p>
                  <p className="text-xs text-blue-300 mt-1">
                    Ensemble, nous construisons l'avenir démocratique de l'Afrique
                  </p>
                </div>
              </motion.div>
            </div>
          </footer>
        </div>

        {/* Badges sidebar */}
        {badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {badge}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
