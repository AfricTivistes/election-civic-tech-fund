"use client"

import { useState, useEffect } from "react"
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
  onSave?: (data: any) => Promise<void>
}

interface DocumentState {
  document_cv?: File[]
  document_portfolio?: File[]
  document_budget?: File[]
  document_presentation?: File[]
  document_other?: File[]
}

export default function StepFour({ data, onUpdate, onComplete, onPrev, formData, onSave }: StepFourProps) {
  const { t } = useLanguage()
  const [uploadedFiles, setUploadedFiles] = useState((data && data.uploadedFiles) || {})
  const [aiValidation, setAiValidation] = useState((data && data.aiValidation) || {})
  const [uploadingFiles, setUploadingFiles] = useState<{[key: string]: boolean}>({})
  const [completionScore, setCompletionScore] = useState(data?.completionScore || 0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Recalculer le score quand les fichiers ou validations changent
  useEffect(() => {
    calculateCompletionScore(uploadedFiles, aiValidation)
  }, [uploadedFiles, aiValidation])

  const requiredDocuments = [
    {
      id: "cv",
      name: t?.documents?.cv?.name || "CV du porteur",
      description: t?.documents?.cv?.description || "Curriculum vitae du porteur de projet",
      icon: Users,
      required: true,
    },
    {
      id: "portfolio",
      name: t?.documents?.portfolio?.name || "Portfolio",
      description: t?.documents?.portfolio?.description || "Portfolio ou exemples de travaux antérieurs",
      icon: FileText,
      required: true,
    },
    {
      id: "budget",
      name: t?.documents?.budget?.name || "Budget détaillé",
      description: t?.documents?.budget?.description || "Budget complet du projet",
      icon: DollarSign,
      required: true,
    },
    {
      id: "presentation",
      name: t?.documents?.presentation?.name || "Présentation projet",
      description: t?.documents?.presentation?.description || "Présentation détaillée du projet",
      icon: Target,
      required: true,
    },
    {
      id: "other",
      name: t?.documents?.other?.name || "Autres documents",
      description: t?.documents?.other?.description || "Documents complémentaires",
      icon: Building,
      required: false,
    },
  ]

  const handleFileUpload = async (documentId: string, file: File | null) => {
    if (!file) return

    console.log('📎 Upload de fichier:', { documentId, fileName: file.name, fileSize: file.size })

    // Marquer le fichier comme en cours d'upload
    setUploadingFiles(prev => ({ ...prev, [documentId]: true }))

    try {
      // Utiliser notre API route Next.js pour l'upload
      console.log('📤 Upload via API route...')

      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error('❌ Erreur upload:', errorText)
        throw new Error(`Erreur upload: ${uploadResponse.status} ${uploadResponse.statusText}`)
      }

      const uploadResult = await uploadResponse.json()
      console.log('✅ Upload NocoDB réussi:', uploadResult)

      // Utiliser exactement le même format que le script de test qui fonctionne
      const attachmentData = [{
        url: uploadResult[0]?.url,
        title: uploadResult[0]?.title,
        mimetype: uploadResult[0]?.mimetype,
        size: uploadResult[0]?.size,
        icon: uploadResult[0]?.icon
      }]

      console.log('📁 Document formaté selon script de test:', attachmentData)

      // Stocker SEULEMENT localement, ne pas sauvegarder maintenant
      setUploadedFiles(prev => ({
        ...prev,
        [documentId]: {
          name: file.name,
          size: file.size,
          type: file.type,
          attachmentData: attachmentData // Format exact du script de test
        }
      }))

      // Marquer comme validé
      setAiValidation(prev => ({
        ...prev,
        [documentId]: {
          status: "valid",
          message: `${file.name} uploadé avec succès`,
        }
      }))

      setUploadingFiles(prev => ({ ...prev, [documentId]: false }))

      console.log('✅ Fichier stocké localement, sera envoyé lors de la soumission finale')
    } catch (error) {
      console.error('❌ Erreur lors de l\'upload:', error)
      alert(`Erreur lors de l'upload de ${file.name}: ${error.message}`)

      // Marquer la validation comme échouée
      setAiValidation(prev => ({
        ...prev,
        [documentId]: {
          status: "error",
          message: "Erreur lors de l'upload du document",
        }
      }))
    } finally {
      setUploadingFiles(prev => ({ ...prev, [documentId]: false }))
    }
  }

  const calculateCompletionScore = (files: any, validation: any) => {
    const requiredCount = requiredDocuments.filter((doc) => doc.required).length
    const uploadedCount = Object.keys(files || {}).length
    const validCount = Object.values(validation || {}).filter((v: any) => v && v.status === "valid").length

    const score = Math.min(100, (validCount / requiredCount) * 100)
    setCompletionScore(score)
    
    // Mettre à jour les données locales avec le score
    onUpdate({
      uploadedFiles: files,
      aiValidation: validation,
      completionScore: score
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      console.log('📤 Soumission finale du formulaire...')
      console.log('📁 Fichiers uploadés localement:', uploadedFiles)

      // Préparer les données selon le format exact du script de test
      const documentData = {}

      // Traiter chaque document uploadé avec le format exact du script
      Object.entries(uploadedFiles).forEach(([docId, fileInfo]) => {
        const columnName = `document_${docId}`
        if (fileInfo && fileInfo.attachmentData) {
          // Format JSON exact comme dans le script de test
          documentData[columnName] = JSON.stringify(fileInfo.attachmentData)
          console.log(`📋 ${columnName}:`, fileInfo.attachmentData)
        }
      })

      // Calculer le score de completion
      const requiredCount = requiredDocuments.filter(doc => doc.required).length
      const uploadedCount = Object.keys(uploadedFiles).length
      const completionScore = Math.round((uploadedCount / requiredCount) * 100)

      const finalData = {
        ...documentData,
        completion_score: completionScore,
        status: 'submitted',
        submission_date: new Date().toISOString()
      }

      console.log('📝 Données finales pour soumission (format script de test):')
      console.log('🎯 Colonnes document envoyées:')
      Object.entries(documentData).forEach(([key, value]) => {
        console.log(`  - ${key}:`, value ? 'Présent ✅' : 'Absent ❌')
        if (value) {
          try {
            const parsed = JSON.parse(value)
            console.log(`    • URL: ${parsed[0]?.url ? 'Présente ✅' : 'Manquante ❌'}`)
            console.log(`    • Title: ${parsed[0]?.title || 'N/A'}`)
            console.log(`    • Mimetype: ${parsed[0]?.mimetype || 'N/A'}`)
            console.log(`    • Size: ${parsed[0]?.size || 'N/A'}`)
          } catch (e) {
            console.log(`    ❌ Erreur parsing: ${e.message}`)
          }
        }
      })

      // Sauvegarder UNE SEULE FOIS avec toutes les données
      await onSave(finalData)

      onComplete("Submission Master")

      console.log('✅ Soumission réussie avec documents!')
    } catch (error) {
      console.error('❌ Erreur lors de la soumission:', error)
      alert(`Erreur lors de la soumission: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileInputChange = (documentId: string) => {
    try {
      console.log('🔍 Ouverture du sélecteur de fichier pour:', documentId)

      const input = document.createElement("input")
      if (!input) {
        console.error("❌ Impossible de créer l'élément input")
        return
      }

      input.type = "file"
      input.accept = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
      input.style.display = "none"

      const handleChange = (e: Event) => {
        console.log('📂 Événement de changement de fichier déclenché')

        try {
          if (!e || !e.target) {
            console.warn("⚠️ Événement ou target null")
            return
          }

          const target = e.target as HTMLInputElement
          if (!target || !target.files || target.files.length === 0) {
            console.warn("⚠️ Aucun fichier sélectionné")
            return
          }

          const file = target.files[0]
          if (!file) {
            console.warn("⚠️ Fichier null")
            return
          }

          console.log('📎 Fichier sélectionné:', {
            name: file.name,
            size: file.size,
            type: file.type
          })

          // Vérifier que le fichier a les propriétés nécessaires
          if (typeof file.name !== "string" || typeof file.size !== "number") {
            console.error("❌ Objet fichier invalide")
            return
          }

          // Vérifier la taille du fichier (max 10MB)
          if (file.size > 10 * 1024 * 1024) {
            alert("Le fichier est trop volumineux (max 10MB)")
            return
          }

          handleFileUpload(documentId, file)
        } catch (error) {
          console.error("❌ Erreur lors du traitement du fichier:", error)
        }
      }

      input.addEventListener("change", handleChange, { once: true })

      // Ajouter l'input au DOM temporairement
      document.body.appendChild(input)
      input.click()

      // Cleanup après un délai
      setTimeout(() => {
        try {
          if (document.body.contains(input)) {
            document.body.removeChild(input)
          }
        } catch (error) {
          console.error("❌ Erreur lors du nettoyage:", error)
        }
      }, 5000)
    } catch (error) {
      console.error("❌ Erreur lors de la création de l'input:", error)
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
            <CardTitle className="text-gray-800 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              {t?.steps?.step4?.completionScore || "Completion Score"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{Math.round(completionScore)}%</div>
                <p className="text-gray-800">
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
                const isUploading = uploadingFiles[doc.id]

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

                          {isUploaded && (
                            <p className="text-green-300 text-sm mt-1">
                              📎 {isUploaded.name} ({(isUploaded.size / 1024).toFixed(1)} KB)
                            </p>
                          )}

                          {isUploading && (
                            <p className="text-yellow-300 text-sm mt-1 animate-pulse">
                              ⏳ Upload en cours...
                            </p>
                          )}

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
                          disabled={isUploading}
                          className="border-blue-500/60 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 font-medium disabled:opacity-50"
                          onClick={() => handleFileInputChange(doc.id)}
                        >
                          {isUploading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-4 h-4 border border-blue-400 border-t-transparent rounded-full mr-1"
                              />
                              Upload...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-1" />
                              {isUploaded ? t?.steps?.step4?.replace || "Remplacer" : t?.steps?.step4?.upload || "Upload"}
                            </>
                          )}
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
          onClick={handleSubmit}
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