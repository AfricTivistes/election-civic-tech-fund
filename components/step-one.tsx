"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface StepOneProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onNext: () => void
}

export default function StepOne({ data, onUpdate, onComplete, onNext }: StepOneProps) {
  const { t } = useLanguage()
  const [vision, setVision] = useState(data?.vision || "")
  const [problem, setProblem] = useState(data?.problem || "")
  const [domain, setDomain] = useState(data?.domain || "")

  // Fallback pour les domaines si t.domains est undefined
  const domains = t?.domains || {
    tech: {
      title: "Technologies Citoyennes Électorales",
      description: "Blockchain, IA, outils civic tech, sécurité numérique",
      examples: ["Blockchain pour la transparence", "IA pour l'analyse", "Apps mobiles citoyennes"],
    },
    engagement: {
      title: "Engagement Citoyen",
      description: "Éducation civique, observation électorale, inclusion",
      examples: ["Éducation citoyenne", "Observation électorale", "Participation des jeunes"],
    },
    media: {
      title: "Médias & Information",
      description: "Fact-checking, lutte contre la désinformation",
      examples: ["Vérification des faits", "Médias citoyens", "Anti-désinformation"],
    },
    legal: {
      title: "Cadre Légal",
      description: "Réformes électorales, contentieux, veille juridique",
      examples: ["Réformes électorales", "Suivi contentieux", "Veille juridique"],
    },
  }

  const handleNext = () => {
    if (isComplete) {
      onUpdate({
        vision,
        problem,
        domain,
      })
      onComplete("Visionary")
      onNext()
    }
  }

  const isComplete = vision.trim().length > 0 && problem.trim().length > 0 && domain.trim().length > 0

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t?.steps?.step1?.title || "Votre Vision Démocratique"}</h2>
        <p className="text-blue-200 text-lg">
          {t?.steps?.step1?.description || "Quelle est l'idée citoyenne que vous souhaitez porter ?"}
        </p>
      </motion.div>

      {/* Conseil d'Expert */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400/50 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-900 mb-2 text-lg">
                  {t?.steps?.step1?.expertTip?.title || "Conseil d'Expert"}
                </h4>
                <p className="text-yellow-800 font-medium leading-relaxed">
                  {t?.steps?.step1?.expertTip?.content ||
                    "Plus votre vision est claire et spécifique, plus elle aura d'impact. Ce que vous proposez ici deviendra l'âme de votre projet et guidera toutes les étapes suivantes."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vision */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              {t?.steps?.step1?.visionTitle || "Décrivez votre ambition démocratique"}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {t?.steps?.step1?.visionDescription ||
                "Racontez-nous votre vision, ce que vous cherchez à transformer dans votre pays, et comment la technologie peut être un levier."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder={
                t?.steps?.step1?.visionPlaceholder ||
                "Décrivez votre vision pour transformer la démocratie dans votre pays..."
              }
              className="min-h-32 bg-white/5 border-white/20 text-white placeholder:text-blue-300"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Problème */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              {t?.steps?.step1?.problemTitle || "Le problème électoral que vous ciblez"}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {t?.steps?.step1?.problemDescription ||
                "Identifiez clairement le défi démocratique que votre projet souhaite résoudre."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder={
                t?.steps?.step1?.problemPlaceholder ||
                "Quel problème électoral spécifique votre projet va-t-il résoudre ?"
              }
              className="min-h-24 bg-white/5 border-white/20 text-white placeholder:text-blue-300"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Domaine */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              {t?.steps?.step1?.domainTitle || "Choisissez votre domaine prioritaire"}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {t?.steps?.step1?.domainDescription ||
                "Sélectionnez le domaine principal dans lequel votre projet s'inscrit."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={domain} onValueChange={setDomain}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(domains).map(([key, value]) => {
                  const isSelected = domain === key
                  
                  return (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group"
                    >
                      <Label
                        htmlFor={key}
                        className={`
                          cursor-pointer block p-6 rounded-xl border-2 transition-all duration-300
                          ${
                            isSelected
                              ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20"
                              : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                          }
                        `}
                      >
                        <RadioGroupItem value={key} id={key} className="sr-only" />

                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-500 shadow-md">
                            <Lightbulb className="w-6 h-6 text-white" />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-white text-base">{value.title}</h3>
                              {isSelected && (
                                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                              )}
                            </div>

                            <p className="text-blue-200 text-sm leading-relaxed">{value.description}</p>

                            <div className="flex flex-wrap gap-2">
                              {value.examples.map((example, i) => (
                                <span
                                  key={i}
                                  className={`
                                    text-xs px-3 py-1 rounded-full border transition-all duration-300
                                    ${
                                      isSelected
                                        ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"
                                        : "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30"
                                    }
                                  `}
                                >
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Indicateur de sélection */}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-3 right-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                          >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </motion.div>
                        )}
                      </Label>
                    </motion.div>
                  )
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-end"
      >
        <Button
          onClick={handleNext}
          disabled={!isComplete}
          size="lg"
          className={`
            px-8 py-3 font-semibold transition-all duration-300
            ${
              isComplete
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          {t?.steps?.step1?.nextButton || "Continuer vers l'Impact Technologique"}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>

      {!isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-yellow-400 text-sm">
            {t?.steps?.step1?.completionMessage ||
              "Complétez tous les champs pour continuer votre parcours démocratique"}
          </p>
        </motion.div>
      )}
    </div>
  )
}
