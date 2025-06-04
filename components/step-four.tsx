"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  ArrowLeft,
  Upload,
  CheckCircle,
  AlertCircle,
  FileCheck,
  Users,
  Building,
  DollarSign,
  Target,
  Sparkles,
  Send,
  Award,
} from "lucide-react"

interface StepFourProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onPrev: () => void
  formData: any
}

const requiredDocuments = [
  {
    id: "registration",
    name: "Enregistrement Officiel",
    description: "Document d'enregistrement de votre organisation",
    icon: Building,
    required: true,
  },
  {
    id: "cvs",
    name: "CV des Membres Clés",
    description: "CV des 2-3 membres principaux de l'équipe",
    icon: Users,
    required: true,
  },
  {
    id: "project",
    name: "Description Détaillée du Projet",
    description: "Maximum 5 pages selon le modèle fourni",
    icon: FileText,
    required: true,
  },
  {
    id: "theory",
    name: "Théorie du Changement",
    description: "Plan d'action sur 10 mois",
    icon: Target,
    required: true,
  },
  {
    id: "budget",
    name: "Budget Prévisionnel",
    description: "Budget détaillé selon le modèle",
    icon: DollarSign,
    required: true,
  },
]

export default function StepFour({ data, onUpdate, onComplete, onPrev, formData }: StepFourProps) {
  const [uploadedFiles, setUploadedFiles] = useState(data?.uploadedFiles || {})
  const [aiValidation, setAiValidation] = useState(data?.aiValidation || {})
  const [completionScore, setCompletionScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (documentId: string, file: File | null) => {
    if (!file) return

    const newUploadedFiles = { ...uploadedFiles, [documentId]: file }
    setUploadedFiles(newUploadedFiles)

    // Simulate AI validation
    setTimeout(() => {
      const validation = {
        ...aiValidation,
        [documentId]: {
          status: Math.random() > 0.2 ? "valid" : "warning",
          message: Math.random() > 0.2 ? "Document conforme aux exigences" : "Vérifiez le format et la complétude",
        },
      }
      setAiValidation(validation)
      calculateCompletionScore(newUploadedFiles, validation)
    }, 1500)
  }

  const calculateCompletionScore = (files: any, validation: any) => {
    const requiredCount = requiredDocuments.filter((doc) => doc.required).length
    const uploadedCount = Object.keys(files || {}).length
    const validCount = Object.values(validation || {}).filter((v: any) => v?.status === "valid").length

    const score = Math.min(100, (validCount / requiredCount) * 100)
    setCompletionScore(score)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate submission process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    onUpdate({ uploadedFiles, aiValidation, completionScore })
    onComplete("Submission Master")
    setIsSubmitting(false)

    // Show success message or redirect
    alert("Votre candidature a été soumise avec succès ! Vous recevrez une confirmation par email.")
  }

  const handleFileInputChange = (documentId: string) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf,.doc,.docx"

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target?.files?.[0] || null
      if (file) {
        handleFileUpload(documentId, file)
      }
    }

    input.addEventListener("change", handleChange)
    input.click()

    // Cleanup
    setTimeout(() => {
      input.removeEventListener("change", handleChange)
    }, 1000)
  }

  const isComplete = completionScore >= 80

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Votre Arsenal Numérique</h2>
        <p className="text-blue-200 text-lg">Faites décoller votre dossier avec les bons documents</p>
      </motion.div>

      {/* Completion score */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Score de Complétude
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{Math.round(completionScore)}%</div>
                <p className="text-purple-200">Votre dossier est prêt à {Math.round(completionScore)}%</p>
              </div>

              <Progress value={completionScore} className="h-3 bg-white/20">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${completionScore}%` }}
                />
              </Progress>

              {completionScore >= 80 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Prêt pour soumission
                  </Badge>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Document upload */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Documents Requis</CardTitle>
            <CardDescription className="text-blue-200">
              Une IA intégrée vous accompagne en temps réel pour vérifier la conformité et optimiser votre soumission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requiredDocuments.map((doc) => {
                const IconComponent = doc.icon
                const isUploaded = uploadedFiles[doc.id]
                const validation = aiValidation[doc.id]

                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-300
                      ${
                        isUploaded
                          ? validation?.status === "valid"
                            ? "border-green-400 bg-green-400/10"
                            : "border-yellow-400 bg-yellow-400/10"
                          : "border-white/20 bg-white/5"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`
                          p-3 rounded-lg
                          ${
                            isUploaded
                              ? validation?.status === "valid"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                              : "bg-gray-600"
                          }
                        `}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-white flex items-center">
                            {doc.name}
                            {doc.required && <span className="text-red-400 ml-1">*</span>}
                          </h3>
                          <p className="text-blue-200 text-sm">{doc.description}</p>

                          {validation && (
                            <div className="flex items-center mt-2">
                              {validation.status === "valid" ? (
                                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-yellow-400 mr-2" />
                              )}
                              <span
                                className={`text-sm ${
                                  validation.status === "valid" ? "text-green-300" : "text-yellow-300"
                                }`}
                              >
                                {validation.message}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {isUploaded && (
                          <Badge variant="outline" className="border-green-400 text-green-400">
                            <FileCheck className="w-3 h-3 mr-1" />
                            Uploadé
                          </Badge>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500/60 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 font-medium"
                          onClick={() => handleFileInputChange(doc.id)}
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          {isUploaded ? "Remplacer" : "Upload"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Récapitulatif de votre Projet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Vision</h4>
                <p className="text-blue-200 text-sm">{formData?.vision?.vision || "Non renseigné"}</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Domaine</h4>
                <p className="text-blue-200 text-sm">{formData?.vision?.domain || "Non sélectionné"}</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {formData?.technology?.technologies?.map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                      {tech}
                    </Badge>
                  )) || <span className="text-blue-200 text-sm">Non sélectionnées</span>}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Équipe</h4>
                <p className="text-blue-200 text-sm">{formData?.team?.teamMembers?.length || 0} membres</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tip */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Bonus Technologique</h4>
                <p className="text-white font-medium leading-relaxed drop-shadow-sm">
                  Tous les fichiers uploadés génèrent des animations visuelles holographiques, renforçant la sensation
                  de construire un projet technologique et vivant qui prend forme sous vos yeux.
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
        className="flex justify-between"
      >
        <Button
          onClick={onPrev}
          size="lg"
          className="ectf-button-secondary px-8 py-4 font-semibold text-base rounded-xl"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Retour à l'Équipe
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!isComplete || isSubmitting}
          size="lg"
          className={`
            px-8 py-3 font-semibold transition-all duration-300 relative overflow-hidden
            ${
              isComplete && !isSubmitting
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Soumission en cours...
            </>
          ) : (
            <>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center">
                Soumettre ma Vision
                <Send className="ml-2 w-5 h-5" />
              </span>
            </>
          )}
        </Button>
      </motion.div>

      {!isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-yellow-400 text-sm">
            Complétez au moins 80% des documents requis pour soumettre votre candidature
          </p>
        </motion.div>
      )}
    </div>
  )
}
