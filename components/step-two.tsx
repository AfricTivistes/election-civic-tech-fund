"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Smartphone,
  Globe,
  Shield,
  Brain,
  Link,
  Sparkles,
  BarChart3,
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface StepTwoProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function StepTwo({ data, onUpdate, onComplete, onNext, onPrev }: StepTwoProps) {
  const { t } = useLanguage()
  const [selectedTechnologies, setSelectedTechnologies] = useState((data && data.technologies) || [])
  const [impactScore, setImpactScore] = useState((data && data.impactScore) || 0)

  const technologies = [
    {
      id: "blockchain",
      name: t.technologies.blockchain.name,
      description: t.technologies.blockchain.description,
      icon: Link,
      color: "from-blue-500 to-cyan-500",
      impact: 85,
    },
    {
      id: "ai",
      name: t.technologies.ai.name,
      description: t.technologies.ai.description,
      icon: Brain,
      color: "from-violet-500 to-purple-500",
      impact: 90,
    },
    {
      id: "mobile",
      name: t.technologies.mobile.name,
      description: t.technologies.mobile.description,
      icon: Smartphone,
      color: "from-emerald-500 to-green-500",
      impact: 95,
    },
    {
      id: "web",
      name: t.technologies.web.name,
      description: t.technologies.web.description,
      icon: Globe,
      color: "from-orange-500 to-red-500",
      impact: 80,
    },
    {
      id: "security",
      name: t.technologies.security.name,
      description: t.technologies.security.description,
      icon: Shield,
      color: "from-red-500 to-pink-500",
      impact: 88,
    },
    {
      id: "local",
      name: t.technologies.local.name,
      description: t.technologies.local.description,
      icon: Cpu,
      color: "from-amber-500 to-yellow-500",
      impact: 92,
    },
  ]

  const toggleTechnology = (techId: string) => {
    const newSelection = selectedTechnologies.includes(techId)
      ? selectedTechnologies.filter((id: string) => id !== techId)
      : [...selectedTechnologies, techId]

    setSelectedTechnologies(newSelection)
    calculateImpact(newSelection)
  }

  const calculateImpact = (techs: string[]) => {
    const selectedTechs = technologies.filter((t) => techs.includes(t.id))
    const avgImpact =
      selectedTechs.length > 0 ? selectedTechs.reduce((sum, tech) => sum + tech.impact, 0) / selectedTechs.length : 0
    setImpactScore(Math.round(avgImpact))
  }

  const handleNext = () => {
    if (selectedTechnologies.length > 0) {
      onUpdate({
        technologies: selectedTechnologies,
        impactScore,
      })
      onComplete("Tech Innovator")
      onNext()
    }
  }

  const isComplete = selectedTechnologies.length > 0

  return (
    <div className="max-w-4xl mx-auto ectf-section-spacing">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="ectf-heading-section ectf-text-heading mb-3">{t.steps.step2.title}</h2>
        <p className="ectf-text-subheading text-lg">{t.steps.step2.description}</p>
      </motion.div>

      {/* Conseil d'Expert - déplacé au début */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 mb-2 text-lg">{t.steps.step2.expertTip.title}</h4>
                <p className="text-blue-800 font-medium leading-relaxed">{t.steps.step2.expertTip.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technology selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="ectf-card">
          <CardHeader className="ectf-card-header">
            <CardTitle className="ectf-card-title">{t.steps.step2.selectTech}</CardTitle>
            <CardDescription className="ectf-card-description">{t.steps.step2.selectTechDesc}</CardDescription>
          </CardHeader>
          <CardContent className="ectf-card-content">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {technologies.map((tech) => {
                const IconComponent = tech.icon
                const isSelected = selectedTechnologies.includes(tech.id)

                return (
                  <motion.div
                    key={tech.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleTechnology(tech.id)}
                    className={`
                      cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 group
                      ${
                        isSelected
                          ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20"
                          : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                      }
                    `}
                  >
                    <div className="text-center ectf-element-spacing">
                      <div
                        className={`mx-auto w-14 h-14 rounded-xl bg-gradient-to-r ${tech.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>

                      <div>
                        <h3 className="font-bold text-white text-base mb-1">{tech.name}</h3>
                        <p className="ectf-text-muted text-sm">{tech.description}</p>
                      </div>

                      <Badge
                        className={`ectf-badge text-xs ${isSelected ? "ectf-badge-primary" : "ectf-badge-secondary"}`}
                      >
                        Impact: {tech.impact}%
                      </Badge>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Impact visualization */}
      {selectedTechnologies.length > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-400/40 shadow-xl">
            <CardHeader className="ectf-card-header">
              <CardTitle className="ectf-card-title flex items-center text-2xl">
                <BarChart3 className="w-7 h-7 mr-3 text-emerald-400" />
                {t.steps.step2.impactTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="ectf-card-content">
              <div className="ectf-content-spacing">
                <div className="text-center">
                  <div className="text-6xl font-bold text-emerald-300 mb-4 drop-shadow-lg">{impactScore}%</div>
                  <p className="text-emerald-100 font-semibold text-xl">{t.steps.step2.impactSubtitle}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedTechnologies.map((techId) => {
                    const tech = technologies.find((t) => t.id === techId)
                    if (!tech) return null

                    return (
                      <div key={techId} className="text-center">
                        <div className="w-18 h-18 mx-auto mb-3 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center shadow-lg">
                          <tech.icon className="w-9 h-9 text-white drop-shadow-sm" />
                        </div>
                        <p className="text-white text-sm font-bold drop-shadow-sm">{tech.name}</p>
                        <p className="text-emerald-200 text-xs font-semibold">{tech.impact}% impact</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between items-center"
      >
        <Button
          onClick={onPrev}
          size="lg"
          className="ectf-button-secondary px-8 py-4 font-semibold text-base rounded-xl"
        >
          <ArrowLeft className="mr-3 w-5 h-5" />
          {t.steps.step2.prevButton}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isComplete}
          size="lg"
          className={`
            px-8 py-4 font-bold text-base transition-all duration-300 rounded-xl
            ${
              isComplete
                ? "ectf-button-primary"
                : "bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-500/30"
            }
          `}
        >
          {t.steps.step2.nextButton}
          <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </motion.div>

      {!isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-amber-400 text-sm font-medium">{t.steps.step2.completionMessage}</p>
        </motion.div>
      )}
    </div>
  )
}
