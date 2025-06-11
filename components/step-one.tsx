"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Lightbulb, ArrowRight, Sparkles, Cpu, Users, FileText, Scale } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/hooks/use-language"

interface StepOneProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onNext: () => void
  onSave?: (data: any) => Promise<void>
  testSaveWithCountry?: (data: any) => Promise<void>
}

const africanCountries = [
  { code: "sn", name: "Sénégal", flag: "🇸🇳" },
  { code: "ml", name: "Mali", flag: "🇲🇱" },
  { code: "ne", name: "Niger", flag: "🇳🇪" },
  { code: "td", name: "Tchad", flag: "🇹🇩" },
  { code: "sd", name: "Soudan", flag: "🇸🇩" },
  { code: "et", name: "Éthiopie", flag: "🇪🇹" },
  { code: "cm", name: "Cameroun", flag: "🇨🇲" },
  { code: "bj", name: "Bénin", flag: "🇧🇯" },
  { code: "tg", name: "Togo", flag: "🇹🇬" },
  { code: "bf", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "gn", name: "Guinée", flag: "🇬🇳" },
  { code: "mr", name: "Mauritanie", flag: "🇲🇷" },
  { code: "ss", name: "Soudan du Sud", flag: "🇸🇸" },
  { code: "so", name: "Somalie", flag: "🇸🇴" },
]

export default function StepOne({ data, onUpdate, onComplete, onNext, onSave, testSaveWithCountry }: StepOneProps) {
  const { t, language } = useLanguage()
  const [vision, setVision] = useState(data?.vision || "")
  const [problem, setProblem] = useState(data?.problem || "")
  const [selectedDomain, setSelectedDomain] = useState(data?.domain || "")
  const [selectedCountry, setSelectedCountry] = useState(data?.country || "")

  // Configuration des domaines avec montants et pourcentages
  const domains = [
    {
      id: "tech",
      title: t?.domains?.tech?.title || "Technologies Citoyennes Électorales",
      description: t?.domains?.tech?.description || "Blockchain, IA, outils civic tech, sécurité numérique",
      examples: t?.domains?.tech?.examples || ["Blockchain pour la transparence", "IA pour l'analyse", "Apps mobiles citoyennes"],
      allocation: "70 000€ • 40%",
      icon: Cpu,
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: "engagement",
      title: t?.domains?.engagement?.title || "Engagement Citoyen",
      description: t?.domains?.engagement?.description || "Éducation civique, observation électorale, inclusion",
      examples: t?.domains?.engagement?.examples || ["Éducation citoyenne", "Observation électorale", "Participation des jeunes"],
      allocation: "43 750€ • 25%",
      icon: Users,
      color: "from-green-400 to-emerald-500",
    },
    {
      id: "media",
      title: t?.domains?.media?.title || "Médias & Information",
      description: t?.domains?.media?.description || "Fact-checking, lutte contre la désinformation",
      examples: t?.domains?.media?.examples || ["Vérification des faits", "Médias citoyens", "Anti-désinformation"],
      allocation: "35 000€ • 20%",
      icon: FileText,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "legal",
      title: t?.domains?.legal?.title || "Cadre Légal",
      description: t?.domains?.legal?.description || "Réformes électorales, contentieux, veille juridique",
      examples: t?.domains?.legal?.examples || ["Réformes électorales", "Suivi contentieux", "Veille juridique"],
      allocation: "26 250€ • 15%",
      icon: Scale,
      color: "from-orange-400 to-red-500",
    },
  ]

  const handleNext = async () => {
    if (isComplete) {
      const stepData = {
        vision,
        problem,
        domain: selectedDomain,
        country: selectedCountry,
        language: language || 'en', // Ajouter la langue actuelle
      }

      console.log('📝 Données Step 1 complètes:', stepData)
      console.log(`🌍 Pays sélectionné: ${selectedCountry}`)
      
      // Vérifier que le pays est bien présent
      if (!selectedCountry) {
        console.error('❌ Aucun pays sélectionné!')
        return
      }

      const countryName = africanCountries.find(c => c.code === selectedCountry)?.name
      console.log(`🏳️ Nom du pays: ${countryName}`)

      onUpdate(stepData)

      // Sauvegarde automatique si disponible
      if (onSave) {
        try {
          console.log('💾 Tentative de sauvegarde...')
          await onSave(stepData)
          console.log('✅ Sauvegarde réussie!')
        } catch (error) {
          console.error('❌ Erreur sauvegarde:', error)
          // Continuer même en cas d'erreur de sauvegarde
        }
      }

      onComplete("Visionary")
      onNext()
    }
  }

  const isComplete = vision.trim().length > 0 && problem.trim().length > 0 && selectedDomain.trim().length > 0 && selectedCountry.trim().length > 0

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

      {/* Pays */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              {t?.steps?.step1?.countryTitle || "Sélectionnez votre pays"}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {t?.steps?.step1?.countryDescription || "Choisissez le pays dans lequel votre projet sera mis en œuvre."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedCountry} onValueChange={setSelectedCountry}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {africanCountries.map((country) => {
                  const isSelected = selectedCountry === country.code

                  return (
                    <motion.div
                      key={country.code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group"
                    >
                      <Label
                        htmlFor={country.code}
                        className={`
                          cursor-pointer block p-4 rounded-xl border-2 transition-all duration-300
                          ${
                            isSelected
                              ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20"
                              : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                          }
                        `}
                      >
                        <RadioGroupItem value={country.code} id={country.code} className="sr-only" />

                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{country.flag}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-base">{country.name}</h3>
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

      {/* Domaine */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              {t?.steps?.step1?.domainTitle || "Choisissez votre domaine prioritaire"}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {t?.steps?.step1?.domainDescription || "Sélectionnez le domaine principal dans lequel votre projet s'inscrit."}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                              <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs">
                                {domain.allocation}
                              </Badge>
                            </div>

                            <p className="text-blue-200 text-sm">{domain.description}</p>

                            <div className="flex flex-wrap gap-2">
                              {domain.examples.map((example, index) => (
                                <Badge key={index} className="bg-white/10 text-blue-300 border-white/20 text-xs">
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
        transition={{ delay: 0.8 }}
        className="flex justify-end"
      >
        <Button
          onClick={handleNext}
          disabled={!isComplete}
          size="lg"
          className={`
            px-8 py-3 font-semibold transition-all duration-300 rounded-xl
            ${
              isComplete
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black hover:text-white shadow-lg"
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
              "Complétez tous les champs (vision, problème, pays et domaine) pour continuer votre parcours démocratique"}
          </p>
        </motion.div>
      )}
    </div>
  )
}