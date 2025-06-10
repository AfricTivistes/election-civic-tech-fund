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
import { useLanguage } from "@/hooks/use-language"

interface StepFourProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onPrev: () => void
  formData: any
}

export default function StepFour({ data, onUpdate, onComplete, onPrev, formData }: StepFourProps) {
  const { t } = useLanguage()
  const [uploadedFiles, setUploadedFiles] = useState((data && data.uploadedFiles) || {})
  const [aiValidation, setAiValidation] = useState((data && data.aiValidation) || {})
  const [completionScore, setCompletionScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const requiredDocuments = [
    {
      id: "registration",
      name: t?.documents?.registration?.name || "Registration certificate",
      description: t?.documents?.registration?.description || "Official registration document",
      icon: Building,
      required: true,
    },
    {
      id: "cvs",
      name: t?.documents?.cvs?.name || "Team CVs",
      description: t?.documents?.cvs?.description || "Curriculum vitae of key team members",
      icon: Users,
      required: true,
    },
    {
      id: "project",
      name: t?.documents?.project?.name || "Project description",
      description: t?.documents?.project?.description || "Detailed project description",
      icon: FileText,
      required: true,
    },
    {
      id: "theory",
      name: t?.documents?.theory?.name || "Theory of change",
      description: t?.documents?.theory?.description || "Your theoretical approach",
      icon: Target,
      required: true,
    },
    {
      id: "budget",
      name: t?.documents?.budget?.name || "Detailed budget",
      description: t?.documents?.budget?.description || "Complete financial breakdown",
      icon: DollarSign,
      required: true,
    },
  ]

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
    const validCount = Object.values(validation || {}).filter((v: any) => v && v.status === "valid").length

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
    try {
      const input = document.createElement("input")
      if (!input) {
        console.error("Failed to create input element")
        return
      }

      input.type = "file"
      input.accept = ".pdf,.doc,.docx"

      const handleChange = (e: Event) => {
        try {
          if (!e || !e.target) {
            console.warn("Event or target is null")
            return
          }

          const target = e.target as HTMLInputElement
          if (!target || !target.files || target.files.length === 0) {
            console.warn("No files selected")
            return
          }

          const file = target.files[0]
          if (!file) {
            console.warn("File is null")
            return
          }

          // Vérifier que le fichier a les propriétés nécessaires
          if (typeof file.name !== "string" || typeof file.size !== "number") {
            console.error("Invalid file object")
            return
          }

          handleFileUpload(documentId, file)
        } catch (error) {
          console.error("Error handling file change:", error)
        }
      }

      input.addEventListener("change", handleChange, { once: true })
      input.click()

      // Cleanup
      setTimeout(() => {
        try {
          input.removeEventListener("change", handleChange)
        } catch (error) {
          console.error("Error removing event listener:", error)
        }
      }, 1000)
    } catch (error) {
      console.error("Error creating file input:", error)
    }
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
        <h2 className="text-3xl font-bold text-white mb-2">{t?.steps?.step4?.title || "Your Digital Arsenal"}</h2>
        <p className="text-blue-200 text-lg">{t?.steps?.step4?.description || "Upload your supporting documents"}</p>
      </motion.div>

      {/* Conseil d'Expert */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-purple-900 mb-2 text-lg">
                  {t?.steps?.step4?.expertTip?.title || "Expert Tip"}
                </h4>
                <p className="text-purple-800 font-medium leading-relaxed">
                  {t?.steps?.step4?.expertTip?.content || "Ensure all documents are in PDF format and readable."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Completion score */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="w-5 h-5 mr-2" />
              {t?.steps?.step4?.completionScore || "Completion Score"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{Math.round(completionScore)}%</div>
                <p className="text-purple-200">
                  {t?.steps?.step4?.completionText || "Your application is"} {Math.round(completionScore)}%
                </p>
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
                    {t?.steps?.step4?.readySubmission || "Ready for submission"}
                  </Badge>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Document upload */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">{t?.steps?.step4?.requiredDocs || "Required Documents"}</CardTitle>
            <CardDescription className="text-blue-200">
              {t?.steps?.step4?.aiDescription || "Our AI automatically verifies your documents"}
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
                          ? validation && validation.status === "valid"
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
                              ? validation && validation.status === "valid"
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
                            {doc.required && (
                              <span className="text-red-400 ml-1">{t?.steps?.step4?.required || "*"}</span>
                            )}
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
                            {t?.steps?.step4?.uploaded || "Uploaded"}
                          </Badge>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500/60 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 font-medium"
                          onClick={() => handleFileInputChange(doc.id)}
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          {isUploaded ? t?.steps?.step4?.replace || "Replace" : t?.steps?.step4?.upload || "Upload"}
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">{t?.steps?.step4?.projectSummary || "Project Summary"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-2">{t?.steps?.step4?.vision || "Vision"}</h4>
                <p className="text-blue-200 text-sm">
                  {(formData && formData.vision && formData.vision.vision) ||
                    t?.steps?.step4?.notProvided ||
                    "Not provided"}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">{t?.steps?.step4?.domain || "Domain"}</h4>
                <p className="text-blue-200 text-sm">
                  {(formData && formData.vision && formData.vision.domain) ||
                    t?.steps?.step4?.notSelected ||
                    "Not selected"}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">{t?.steps?.step4?.technologies || "Technologies"}</h4>
                <div className="flex flex-wrap gap-1">
                  {formData &&
                  formData.technology &&
                  formData.technology.technologies &&
                  Array.isArray(formData.technology.technologies) ? (
                    formData.technology.technologies.map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                        {tech}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-blue-200 text-sm">{t?.steps?.step4?.notSelectedTech || "Not selected"}</span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">{t?.steps?.step4?.team || "Team"}</h4>
                <p className="text-blue-200 text-sm">
                  {(formData &&
                    formData.team &&
                    formData.team.teamMembers &&
                    Array.isArray(formData.team.teamMembers) &&
                    formData.team.teamMembers.length) ||
                    0}{" "}
                  {t?.steps?.step4?.members || "members"}
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
          variant="outline"
          size="lg"
          className="px-8 py-3 font-semibold rounded-xl bg-white/10 border-white/50 text-white hover:bg-white/20 hover:border-white/70 hover:text-sky-300 transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          {t?.steps?.step4?.prevButton || "Previous"}
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!isComplete || isSubmitting}
          size="lg"
          className={`
            px-8 py-3 font-semibold transition-all duration-300 relative overflow-hidden rounded-xl
            ${
              isComplete && !isSubmitting
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black hover:text-white shadow-lg"
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
              {t?.steps?.step4?.submitting || "Submitting..."}
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
                {t?.steps?.step4?.submitButton || "Submit"}
                <Send className="ml-2 w-5 h-5" />
              </span>
            </>
          )}
        </Button>
      </motion.div>

      {!isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-yellow-400 text-sm">
            {t?.steps?.step4?.completionMessage || "Complete your application to submit"}
          </p>
        </motion.div>
      )}
    </div>
  )
}
