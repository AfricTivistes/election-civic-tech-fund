"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ArrowRight, Cpu, Users, Newspaper, Scale, Sparkles, Target } from "lucide-react"

interface StepOneProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onNext: () => void
}

const domains = [
  {
    id: "tech",
    title: "Technologies Citoyennes Électorales",
    description: "Blockchain, IA, outils civic tech, sécurité numérique",
    icon: Cpu,
    color: "from-blue-500 to-cyan-500",
    allocation: "70 000€ • 40%",
    examples: ["Blockchain pour la transparence", "IA pour l'analyse", "Apps mobiles citoyennes"],
  },
  {
    id: "engagement",
    title: "Engagement Citoyen",
    description: "Éducation civique, observation électorale, inclusion",
    icon: Users,
    color: "from-emerald-500 to-green-500",
    allocation: "43 750€ • 25%",
    examples: ["Éducation citoyenne", "Observation électorale", "Participation des jeunes"],
  },
  {
    id: "media",
    title: "Médias & Information",
    description: "Fact-checking, lutte contre la désinformation",
    icon: Newspaper,
    color: "from-violet-500 to-purple-500",
    allocation: "35 000€ • 20%",
    examples: ["Vérification des faits", "Médias citoyens", "Anti-désinformation"],
  },
  {
    id: "legal",
    title: "Cadre Légal",
    description: "Réformes électorales, contentieux, veille juridique",
    icon: Scale,
    color: "from-orange-500 to-red-500",
    allocation: "26 250€ • 15%",
    examples: ["Réformes électorales", "Suivi contentieux", "Veille juridique"],
  },
]

export default function StepOne({ data, onUpdate, onComplete, onNext }: StepOneProps) {
  const [vision, setVision] = useState(data.vision || "")
  const [selectedDomain, setSelectedDomain] = useState(data.domain || "")
  const [problem, setProblem] = useState(data.problem || "")

  const handleNext = () => {
    if (vision && selectedDomain && problem) {
      onUpdate({ vision, domain: selectedDomain, problem })
      onComplete("Democracy Pioneer")
      onNext()
    }
  }

  const isComplete = vision && selectedDomain && problem

  return (
    <div className="max-w-4xl mx-auto ectf-section-spacing">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="ectf-heading-section ectf-text-heading mb-3">Votre Vision Démocratique</h2>
        <p className="ectf-text-subheading text-lg">Quelle est l'idée citoyenne que vous souhaitez porter ?</p>
      </motion.div>

      {/* Vision description */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="ectf-card">
          <CardHeader className="ectf-card-header">
            <CardTitle className="ectf-card-title flex items-center">
              <Target className="w-6 h-6 mr-3 text-amber-400" />
              Décrivez votre ambition démocratique
            </CardTitle>
            <CardDescription className="ectf-card-description">
              Racontez-nous votre vision, ce que vous cherchez à transformer dans votre pays, et comment la technologie
              peut être un levier.
            </CardDescription>
          </CardHeader>
          <CardContent className="ectf-card-content">
            <Textarea
              placeholder="Décrivez votre vision pour transformer la démocratie dans votre pays..."
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="ectf-input min-h-32 resize-none"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Problem identification */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="ectf-card">
          <CardHeader className="ectf-card-header">
            <CardTitle className="ectf-card-title">Le problème électoral que vous ciblez</CardTitle>
            <CardDescription className="ectf-card-description">
              Identifiez clairement le défi démocratique que votre projet souhaite résoudre.
            </CardDescription>
          </CardHeader>
          <CardContent className="ectf-card-content">
            <Textarea
              placeholder="Quel problème électoral spécifique votre projet va-t-il résoudre ?"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="ectf-input min-h-24 resize-none"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Domain selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="ectf-card">
          <CardHeader className="ectf-card-header">
            <CardTitle className="ectf-card-title">Choisissez votre domaine prioritaire</CardTitle>
            <CardDescription className="ectf-card-description">
              Sélectionnez le domaine principal dans lequel votre projet s'inscrit.
            </CardDescription>
          </CardHeader>
          <CardContent className="ectf-card-content">
            <RadioGroup value={selectedDomain} onValueChange={setSelectedDomain}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {domains.map((domain) => {
                  const IconComponent = domain.icon
                  const isSelected = selectedDomain === domain.id

                  return (
                    <motion.div
                      key={domain.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group"
                    >
                      <Label
                        htmlFor={domain.id}
                        className={`
                          cursor-pointer block p-6 rounded-xl border-2 transition-all duration-300
                          ${
                            isSelected
                              ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20"
                              : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                          }
                        `}
                      >
                        <RadioGroupItem value={domain.id} id={domain.id} className="sr-only" />

                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${domain.color} shadow-md`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-white text-base">{domain.title}</h3>
                              <Badge className="ectf-badge ectf-badge-primary text-xs">{domain.allocation}</Badge>
                            </div>

                            <p className="ectf-text-body text-sm">{domain.description}</p>

                            <div className="flex flex-wrap gap-2">
                              {domain.examples.map((example, index) => (
                                <Badge key={index} className="ectf-badge ectf-badge-secondary text-xs">
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Label>
                    </motion.div>
                  )
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tip */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-violet-400/40 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Conseil d'Expert</h4>
                <p className="text-white font-medium leading-relaxed drop-shadow-sm">
                  Plus votre vision est claire et spécifique, plus elle aura d'impact. Ce que vous proposez ici
                  deviendra l'âme de votre projet et guidera toutes les étapes suivantes.
                </p>
              </div>
            </div>
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
            px-8 py-4 font-bold text-base transition-all duration-300 rounded-xl
            ${
              isComplete
                ? "ectf-button-primary"
                : "bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-500/30"
            }
          `}
        >
          Continuer vers l'Impact Technologique
          <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </motion.div>

      {!isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-amber-400 text-sm font-medium">
            Complétez tous les champs pour continuer votre parcours démocratique
          </p>
        </motion.div>
      )}
    </div>
  )
}
