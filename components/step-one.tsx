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
import { useLanguage } from "@/hooks/use-language"

interface StepOneProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onNext: () => void
}

export default function StepOne({ data, onUpdate, onComplete, onNext }: StepOneProps) {
  const { t } = useLanguage()
  const [vision, setVision] = useState((data && data.vision) || "")
  const [selectedDomain, setSelectedDomain] = useState((data && data.domain) || "")
  const [problem, setProblem] = useState((data && data.problem) || "")

  const domains = [
    {
      id: "tech",
      title: t.domains.tech.title,
      description: t.domains.tech.description,
      icon: Cpu,
      color: "from-blue-500 to-cyan-500",
      allocation: "70 000€ • 40%",
      examples: t.domains.tech.examples,
    },
    {
      id: "engagement",
      title: t.domains.engagement.title,
      description: t.domains.engagement.description,
      icon: Users,
      color: "from-emerald-500 to-green-500",
      allocation: "43 750€ • 25%",
      examples: t.domains.engagement.examples,
    },
    {
      id: "media",
      title: t.domains.media.title,
      description: t.domains.media.description,
      icon: Newspaper,
      color: "from-violet-500 to-purple-500",
      allocation: "35 000€ • 20%",
      examples: t.domains.media.examples,
    },
    {
      id: "legal",
      title: t.domains.legal.title,
      description: t.domains.legal.description,
      icon: Scale,
      color: "from-orange-500 to-red-500",
      allocation: "26 250€ • 15%",
      examples: t.domains.legal.examples,
    },
  ]

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
        <h2 className="ectf-heading-section ectf-text-heading mb-3">{t.steps.step1.title}</h2>
        <p className="ectf-text-subheading text-lg">{t.steps.step1.description}</p>
      </motion.div>

      {/* Conseil d'Expert - déplacé au début */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-400/50 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-orange-900 mb-2 text-lg">{t.steps.step1.expertTip.title}</h4>
                <p className="text-orange-800 font-medium leading-relaxed">{t.steps.step1.expertTip.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vision description */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="ectf-card">
          <CardHeader className="ectf-card-header">
            <CardTitle className="ectf-card-title flex items-center">
              <Target className="w-6 h-6 mr-3 text-amber-400" />
              {t.steps.step1.visionTitle}
            </CardTitle>
            <CardDescription className="ectf-card-description">{t.steps.step1.visionDescription}</CardDescription>
          </CardHeader>
          <CardContent className="ectf-card-content">
            <Textarea
              placeholder={t.steps.step1.visionPlaceholder}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="ectf-input min-h-32 resize-none"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Problem identification */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="ectf-card">
          <CardHeader className="ectf-card-header">
            <CardTitle className="ectf-card-title">{t.steps.step1.problemTitle}</CardTitle>
            <CardDescription className="ectf-card-description">{t.steps.step1.problemDescription}</CardDescription>
          </CardHeader>
          <CardContent className="ectf-card-content">
            <Textarea
              placeholder={t.steps.step1.problemPlaceholder}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="ectf-input min-h-24 resize-none"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Domain selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="ectf-card">
          <CardHeader className="ectf-card-header">
            <CardTitle className="ectf-card-title">{t.steps.step1.domainTitle}</CardTitle>
            <CardDescription className="ectf-card-description">{t.steps.step1.domainDescription}</CardDescription>
          </CardHeader>
          <CardContent className="ectf-card-content">
            <RadioGroup value={selectedDomain} onValueChange={setSelectedDomain}>
              <div className="grid grid-cols-1 gap-6">
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
            w-full md:w-auto px-6 md:px-8 py-3 md:py-4 font-bold text-sm md:text-base transition-all duration-300 rounded-xl
            ${
              isComplete
                ? "ectf-button-primary"
                : "bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-500/30"
            }
          `}
        >
          {t.steps.step1.nextButton}
          <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </motion.div>

      {!isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-amber-400 text-sm font-medium">{t.steps.step1.completionMessage}</p>
        </motion.div>
      )}
    </div>
  )
}
