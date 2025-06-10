"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Cpu, Smartphone, Globe, Shield, Brain, Link, Sparkles, ArrowRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface StepTwoProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onNext: () => void
  onPrev: () => void
  onSave?: (data: any) => Promise<void>
}

export default function StepTwo({ data, onUpdate, onComplete, onNext, onPrev }: StepTwoProps) {
  const { t } = useLanguage()
  const [selectedTechnologies, setSelectedTechnologies] = useState((data && data.technologies) || [])
  const [impactScore, setImpactScore] = useState((data && data.impactScore) || 0)

  // Fallback pour les technologies si t.technologies est undefined
  const techData = t?.technologies || {
    blockchain: {
      name: "Blockchain",
      description: "Sécurisation des données électorales",
    },
    ai: {
      name: "Intelligence Artificielle",
      description: "Analyse de tendances, modération",
    },
    mobile: {
      name: "Applications Mobiles",
      description: "Accessibilité des électeurs",
    },
    web: {
      name: "Plateformes Web Open-Source",
      description: "Solutions collaboratives",
    },
    security: {
      name: "Sécurité Numérique",
      description: "Protection des données",
    },
    local: {
      name: "Langues Locales & Accessibilité",
      description: "Inclusion numérique",
    },
  }

  const technologies = [
    {
      id: "blockchain",
      name: techData.blockchain.name,
      description: techData.blockchain.description,
      icon: Link,
      color: "from-blue-500 to-cyan-500",
      impact: 85,
    },
    {
      id: "ai",
      name: techData.ai.name,
      description: techData.ai.description,
      icon: Brain,
      color: "from-violet-500 to-purple-500",
      impact: 90,
    },
    {
      id: "mobile",
      name: techData.mobile.name,
      description: techData.mobile.description,
      icon: Smartphone,
      color: "from-emerald-500 to-green-500",
      impact: 95,
    },
    {
      id: "web",
      name: techData.web.name,
      description: techData.web.description,
      icon: Globe,
      color: "from-orange-500 to-red-500",
      impact: 80,
    },
    {
      id: "security",
      name: techData.security.name,
      description: techData.security.description,
      icon: Shield,
      color: "from-red-500 to-pink-500",
      impact: 88,
    },
    {
      id: "local",
      name: techData.local.name,
      description: techData.local.description,
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

  const handleNext = async () => {
    if (selectedTechnologies.length > 0) {
      const stepData = {
        technologies: selectedTechnologies,
        impact_score: impactScore,
      }
      
      onUpdate(stepData)
      
      // Sauvegarde automatique si disponible
      if (onSave) {
        try {
          await onSave(stepData)
        } catch (error) {
          console.error('Erreur sauvegarde:', error)
        }
      }
      
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
        <h2 className="ectf-heading-section ectf-text-heading mb-3">
          {t?.steps?.step2?.title || "L'Impact Technologique"}
        </h2>
        <p className="ectf-text-subheading text-lg">
          {t?.steps?.step2?.description || "Comment la technologie va-t-elle renforcer votre impact citoyen ?"}
        </p>
      </motion.div>

      {/* Conseil d'Expert - déplacé au début */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 mb-2 text-lg">
                  {t?.steps?.step2?.expertTip?.title || "Impact Estimé"}
                </h4>
                <p className="text-blue-800 font-medium leading-relaxed">
                  {t?.steps?.step2?.expertTip?.content ||
                    "Notre outil calcule en direct un score d'impact social et technologique pour vous aider à affiner votre proposition et maximiser votre potentiel démocratique."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technology selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="ectf-card">
          <CardHeader className="ectf-card-header">
            <CardTitle className="ectf-card-title">
              {t?.steps?.step2?.selectTech || "Sélectionnez vos technologies"}
            </CardTitle>
            <CardDescription className="ectf-card-description">
              {t?.steps?.step2?.selectTechDesc ||
                "Choisissez les outils technologiques que vous utiliserez. Vous pouvez en sélectionner plusieurs."}
            </CardDescription>
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
                        <h3 className="font-bold text-white text-lg mb-2">{tech.name}</h3>
                        <p className="text-blue-200 text-sm leading-relaxed mb-3">{tech.description}</p>

                        <div className="flex items-center justify-center">
                          <Badge
                            variant="outline"
                            className={`
                              text-xs font-medium transition-colors duration-300
                              ${
                                isSelected
                                  ? "border-amber-400 text-amber-300 bg-amber-400/20"
                                  : "border-blue-400 text-blue-300 bg-blue-400/10"
                              }
                            `}
                          >
                            Impact: {tech.impact}%
                          </Badge>
                        </div>
                      </div>
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
          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30">
            <CardHeader>
              <CardTitle className="text-gray-800 text-center">
                {t?.steps?.step2?.impactTitle || "Visualisation de votre ADN Démocratique"}
              </CardTitle>
              <CardDescription className="text-gray-700 text-center">
                {t?.steps?.step2?.impactSubtitle || "Score d'Impact Social et Technologique"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                {/* Score principal */}
                <div className="relative">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 mb-2">
                    {impactScore}%
                  </div>
                  <p className="text-gray-700 text-lg">Score d'Impact Calculé</p>
                </div>

                {/* Technologies sélectionnées */}
                <div className="flex flex-wrap justify-center gap-3">
                  {selectedTechnologies.map((techId) => {
                    const tech = technologies.find((t) => t.id === techId)
                    if (!tech) return null

                    const IconComponent = tech.icon
                    return (
                      <div
                        key={techId}
                        className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 border border-white/20"
                      >
                        <div className={`p-1 rounded-full bg-gradient-to-r ${tech.color}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-800 text-sm font-medium">{tech.name}</span>
                        <Badge variant="outline" className="border-green-500 text-green-700 text-xs">
                          {tech.impact}%
                        </Badge>
                      </div>
                    )
                  })}
                </div>

                {/* Barre de progression visuelle */}
                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${impactScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 rounded-full shadow-lg"
                  />
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
        className="flex justify-between"
      >
        <Button
          onClick={onPrev}
          variant="outline"
          size="lg"
          className="px-8 py-3 font-semibold rounded-xl bg-white/10 border-white/50 text-white hover:bg-white/20 hover:border-white/70 hover:text-sky-300 transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          {t?.steps?.step2?.prevButton || "Retour à la Vision"}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isComplete}
          size="lg"
          className={`
            px-8 py-3 font-semibold transition-all duration-300 rounded-xl
            ${
              isComplete
                ? "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white hover:text-gray-900 shadow-lg"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          {t?.steps?.step2?.nextButton || "Continuer vers l'Équipe"}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>

      {!isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-yellow-400 text-sm">
            {t?.steps?.step2?.completionMessage || "Sélectionnez au moins une technologie pour continuer"}
          </p>
        </motion.div>
      )}
    </div>
  )
}
