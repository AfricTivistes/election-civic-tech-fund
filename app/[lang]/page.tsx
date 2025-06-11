"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, FileText, Award, Zap, Star, Home, Clock, HelpCircle } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StepOne from "@/components/step-one"
import StepTwo from "@/components/step-two"
import StepThree from "@/components/step-three"
import StepFour from "@/components/step-four"
import ProgressTracker from "@/components/progress-tracker"
import FormGuide from "@/components/form-guide"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"
import HomeDocuments from "@/components/home-documents"
import { useProjectData } from "@/hooks/use-project-data"


interface PageProps {
  params: Promise<{
    lang: string
  }>
}

export default function ElectionCivicTechFund({ params }: PageProps) {
  const resolvedParams = React.use(params)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    vision: {},
    technology: {},
    team: {},
    documents: {},
  })
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [badges, setBadges] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const { t, isLoading } = useLanguage()

  // Hook pour la sauvegarde dans NocoDB
  const { data: projectData, loading: saving, saveData, testSaveWithCountry, savedProjectId } = useProjectData()

  const steps = [
    {
      id: 1,
      title: (t && t.steps && t.steps.step1 && t.steps.step1.title) || "Votre Vision Démocratique",
      description:
        (t && t.steps && t.steps.step1 && t.steps.step1.description) ||
        "Décrivez votre ambition pour transformer la démocratie",
      icon: Lightbulb,
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: 2,
      title: (t && t.steps && t.steps.step2 && t.steps.step2.title) || "L'Impact Technologique",
      description:
        (t && t.steps && t.steps.step2 && t.steps.step2.description) || "Modélisez votre solution technologique",
      icon: Zap,
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: 3,
      title: (t && t.steps && t.steps.step3 && t.steps.step3.title) || "Votre Équipe Citoyenne",
      description:
        (t && t.steps && t.steps.step3 && t.steps.step3.description) || "Présentez les acteurs de votre projet",
      icon: Users,
      color: "from-green-400 to-emerald-500",
    },
    {
      id: 4,
      title: (t && t.steps && t.steps.step4 && t.steps.step4.title) || "Votre Arsenal Numérique",
      description:
        (t && t.steps && t.steps.step4 && t.steps.step4.description) || "Téléversez vos documents justificatifs",
      icon: FileText,
      color: "from-purple-400 to-pink-500",
    },
  ]

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    try {
      setMounted(true)
    } catch (error) {
      console.error("Error setting mounted state:", error)
    }
  }, [])

  // Effet pour faire défiler la page vers le haut lorsque l'étape change
  useEffect(() => {
    try {
      if (mounted && typeof window !== "undefined") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    } catch (error) {
      console.error("Error scrolling to top:", error)
    }
  }, [currentStep, mounted])

  const updateFormData = (step: string, data: any) => {
    try {
      if (!step || typeof step !== "string" || !data) {
        console.warn("Invalid parameters for updateFormData:", { step, data })
        return
      }

      setFormData((prev) => {
        if (!prev || typeof prev !== "object") {
          return { vision: {}, technology: {}, team: {}, documents: {}, [step]: data }
        }

        const currentStepData = prev[step as keyof typeof prev]
        return {
          ...prev,
          [step]: { ...(currentStepData || {}), ...data },
        }
      })
    } catch (error) {
      console.error("Error updating form data:", error)
    }
  }

  const completeStep = (stepNumber: number, badge?: string) => {
    try {
      if (typeof stepNumber !== "number" || stepNumber < 1 || stepNumber > 4) {
        console.warn("Invalid step number:", stepNumber)
        return
      }

      if (!completedSteps.includes(stepNumber)) {
        setCompletedSteps((prev) => {
          const currentSteps = Array.isArray(prev) ? prev : []
          return [...currentSteps, stepNumber]
        })
      }

      if (badge && typeof badge === "string" && badge.trim() !== "") {
        setBadges((prev) => {
          const currentBadges = Array.isArray(prev) ? prev : []
          if (!currentBadges.includes(badge)) {
            return [...currentBadges, badge]
          }
          return currentBadges
        })
      }
    } catch (error) {
      console.error("Error completing step:", error)
    }
  }

  const nextStep = () => {
    try {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    } catch (error) {
      console.error("Error going to next step:", error)
    }
  }

  const prevStep = () => {
    try {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1)
      }
    } catch (error) {
      console.error("Error going to previous step:", error)
    }
  }

  const goToHome = () => {
    try {
      setCurrentStep(0)
    } catch (error) {
      console.error("Error going to home:", error)
    }
  }

  const calculateProgress = () => {
    try {
      const completed = Array.isArray(completedSteps) ? completedSteps.length : 0
      return Math.min(100, Math.max(0, (completed / 4) * 100))
    } catch (error) {
      console.error("Error calculating progress:", error)
      return 0
    }
  }

  const estimatedTimeRemaining = Math.max(1, Math.round((4 - (completedSteps?.length || 0)) * 3))

  const handleGuideOpen = () => {
    try {
      setIsGuideOpen(true)
    } catch (error) {
      console.error("Error opening guide:", error)
    }
  }

  const handleGuideClose = () => {
    try {
      setIsGuideOpen(false)
    } catch (error) {
      console.error("Error closing guide:", error)
    }
  }

    const handleStart = () => {
        try {
            setCurrentStep(1);
        } catch (error) {
            console.error("Error starting:", error);
        }
    };

  // Afficher un loader pendant le montage ou le chargement des traductions
  if (!mounted || isLoading || !t) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <HeroSection onStart={handleStart} />
        <HomeDocuments />

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8">
          <div className="container mx-auto px-4">
            {/* Bannière partenaires améliorée */}
            <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8 shadow-xl animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              {/* Mené par AHEAD Africa */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <span className="text-blue-200 text-lg font-medium block mb-3">
                  {t?.hero?.footer?.ledBy || "Mené par"}
                </span>
                <img
                  src="/partners/ahead-africa.webp"
                  alt="AHEAD Africa"
                  className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 filter brightness-110 mx-auto"
                  onError={() => {
                    console.error("Error loading AHEAD Africa logo")
                  }}
                />
              </div>

              {/* Séparateur décoratif */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              {/* Conçu et géré par AfricTivistes */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <span className="text-blue-200 text-lg font-medium block mb-3">
                  {t?.hero?.footer?.designedBy || "Conçu et géré par"}
                </span>
                <img
                  src="/logo-africtivites.svg"
                  alt="AfricTivistes"
                  className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 filter brightness-110 mx-auto"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
                  }}
                  onError={() => {
                    console.error("Error loading AfricTivistes logo")
                  }}
                />
              </div>

              {/* Séparateur décoratif */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              {/* Propulsé par DDI */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <span className="text-blue-200 text-lg font-medium block mb-3">
                  {t?.hero?.footer?.poweredBy || "Propulsé par"}
                </span>
                <img
                  src="/partners/ddi-logo.jpeg"
                  alt="Digital Democracy Initiative"
                  className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 filter brightness-110 mx-auto"
                  onError={() => {
                    console.error("Error loading DDI logo")
                  }}
                />
              </div>
            </div>

              {/* Message inspirant */}
              <div className="mt-6 text-center border-t border-white/10 pt-4">
                <p className="text-blue-200 text-sm font-medium leading-relaxed">
                  {t?.hero?.footer?.projectDescription || "Description du projet..."}
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-blue-200">
                {t?.hero?.footer?.copyright || "© 2024 Election Civic Tech Fund - AfricTivistes"}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                {t?.hero?.footer?.tagline || "Ensemble, nous construisons l'avenir démocratique de l'Afrique"}
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Fonction pour sauvegarder les données du projet
  const saveProjectData = async (stepData: any) => {
    try {
      console.log('💾 Sauvegarde des données du projet:', stepData)
      await saveData(stepData)
      console.log('✅ Données sauvegardées avec succès!')
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error)
      // Ne pas bloquer l'interface utilisateur en cas d'erreur
    }
  }

  // Fonction pour soumettre le projet final
  const submitFinalProject = async (finalData: any) => {
    try {
      console.log('📤 Soumission finale du projet:', finalData)

      // Compiler toutes les données du formulaire avec le format exact du script de test
      const completeData = {
        // Step 1 - Vision
        vision: formData.vision?.vision || '',
        problem: formData.vision?.problem || '',
        domain: formData.vision?.domain || '',
        country: formData.vision?.country || '',

        // Step 2 - Technologies  
        technologies: formData.technology?.technologies || [],
        impact_score: formData.technology?.impact_score || formData.technology?.impactScore || 0,

        // Step 3 - Équipe
        team_members: formData.team?.teamMembers || [],
        team_size: formData.team?.teamMembers?.length || 0,

        // Step 4 - Documents avec colonnes exactes comme dans le script de test
        document_cv: finalData.document_cv || null,
        document_portfolio: finalData.document_portfolio || null,
        document_budget: finalData.document_budget || null,
        document_presentation: finalData.document_presentation || null,
        document_other: finalData.document_other || null,
        
        // Métadonnées
        completion_score: finalData.completion_score || 0,
        status: 'submitted' as const,
        submission_date: new Date().toISOString(),
        language: 'fr' as const
      }

      console.log('📋 Données complètes à sauvegarder (format script de test):', {
        ...completeData,
        document_cv: completeData.document_cv ? '(JSON présent)' : '(absent)',
        document_portfolio: completeData.document_portfolio ? '(JSON présent)' : '(absent)',
        document_budget: completeData.document_budget ? '(JSON présent)' : '(absent)',
        document_presentation: completeData.document_presentation ? '(JSON présent)' : '(absent)',
        document_other: completeData.document_other ? '(JSON présent)' : '(absent)'
      })
      console.log('🎯 Impact Score dans les données finales:', completeData.impact_score)
      console.log('🔍 FormData technology:', formData.technology)
      console.log('🔍 savedProjectId actuel:', savedProjectId)

      // Toujours utiliser saveData qui gère automatiquement création vs mise à jour
      await saveData(completeData, true) // Force la sauvegarde

      console.log('✅ Projet soumis avec succès!')

      // Show success message
      // alert("Votre candidature a été soumise avec succès ! Vous recevrez une confirmation par email.")
    } catch (error) {
      console.error('❌ Erreur lors de la soumission finale:', error)
      alert(`Erreur lors de la soumission: ${error.message}. Veuillez réessayer.`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header with progress */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                {/* Logo principal et titre à gauche */}
                <div
                  className="flex items-center space-x-2 md:space-x-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  onClick={goToHome}
                >
                  <div className="relative p-1 md:p-2 bg-white/15 backdrop-blur-sm rounded-lg border border-white/30">
                    <img
                      src="/Logo Fonds Election Civic Tech Fund.svg"
                      alt="Election Civic Tech Fund - Logo avec continent africain"
                      className="h-6 md:h-10 w-auto"
                      style={{ filter: "brightness(1.3) contrast(1.2)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-blue-400/10 rounded-lg"></div>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-sm md:text-xl font-bold text-white">
                      {t?.header?.title || "Election Civic Tech Fund"}
                    </h1>
                    <p className="text-xs md:text-sm text-blue-200">
                      {t?.header?.subtitle || "Digital Democracy Journey"}
                    </p>
                  </div>
                </div>

                {/* Section centrale avec logos et temps - cachée sur mobile */}
                <div className="hidden lg:flex items-center space-x-6">
                  {/* Logo AfricTivistes à gauche du temps */}
                  <img
                    src="/logo-africtivites.svg"
                    alt="AfricTivistes"
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
                    }}
                  />

                  {/* Temps estimé au centre */}
                  <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <Clock className="w-4 h-4 text-blue-300 mr-2" />
                    <span className="text-sm font-medium text-blue-200">
                      {t?.header?.estimatedTime || "Temps estimé"}:{" "}
                      <span className="text-white">{estimatedTimeRemaining} min</span>
                    </span>
                  </div>

                  {/* Logo Digitalise Youth à droite du temps */}
                  <img
                    src="/partners/digitalise-youth.webp"
                    alt="Digitalise Youth"
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
                  />
                </div>

                {/* Bouton accueil et infos à droite */}
                <div className="flex items-center space-x-2 md:space-x-4">
                  <LanguageSwitcher />

                  <Button
                    onClick={goToHome}
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-white hover:bg-white/10 transition-colors p-2"
                    aria-label={t?.header?.homeButton || "Accueil"}
                  >
                    <Home className="w-4 h-4" />
                  </Button>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs md:text-sm text-white font-medium">
                      {t?.header?.funding || "175 000€ • 14 Pays"}
                    </p>
                    <p className="text-xs text-blue-200">{t?.header?.possibilities || "∞ Possibilités"}</p>
                  </div>
                </div>
              </div>

              {/* Temps estimé sur mobile */}
              <div className="lg:hidden flex justify-center mb-4">
                <div className="flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <Clock className="w-3 h-3 text-blue-300 mr-1" />
                  <span className="text-xs font-medium text-blue-200">
                    {t?.header?.estimatedTime || "Temps estimé"}:{" "}
                    <span className="text-white">{estimatedTimeRemaining} min</span>
                  </span>
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
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="transition-all duration-500 ease-in-out">
            {currentStep === 1 && (
              <StepOne
                data={formData && formData.vision ? formData.vision : {}}
                onUpdate={(data) => data && updateFormData("vision", data)}
                onComplete={(badge) => badge && completeStep(1, badge)}
                onNext={nextStep}
                onSave={saveProjectData}
                testSaveWithCountry={testSaveWithCountry}
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                data={formData && formData.technology ? formData.technology : {}}
                onUpdate={(data) => data && updateFormData("technology", data)}
                onComplete={(badge) => completeStep(2, badge)}
                onNext={nextStep}
                onPrev={prevStep}
                onSave={saveProjectData}
              />
            )}
            {currentStep === 3 && (
              <StepThree
                data={formData && formData.team ? formData.team : {}}
                onUpdate={(data) => data && updateFormData("team", data)}
                onComplete={(badge) => completeStep(3, badge)}
                onNext={nextStep}
                onPrev={prevStep}
                onSave={saveProjectData}
              />
            )}
            {currentStep === 4 && (
              <StepFour
                data={formData && formData.documents ? formData.documents : {}}
                onUpdate={(data) => data && updateFormData("documents", data)}
                onComplete={(badge) => completeStep(4, badge)}
                onPrev={prevStep}
                formData={formData || {}}
                onSave={submitFinalProject}
              />
            )}
          </div>


        </div>

        {/* Badges sidebar */}
        {Array.isArray(badges) && badges.length > 0 && (
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 hidden lg:block">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  {t?.achievements?.title || "Réalisations"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {badges.map(
                  (badge, index) =>
                    badge && (
                      <div key={`badge-${index}`} className="transition-all duration-300">
                        <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      </div>
                    ),
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bouton flottant d'aide */}
        {!isGuideOpen && (
          <Button
            onClick={handleGuideOpen}
            className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full p-4"
            size="lg"
          >
            <HelpCircle className="w-6 h-6 mr-2" />
            {(() => {
              try {
                const currentLang = resolvedParams?.lang || "fr"
                return currentLang === "en" ? "Help" : "Aide"
              } catch (error) {
                console.error("Error determining language for help button:", error)
                return "Aide"
              }
            })()}
          </Button>
        )}

        {/* Guide Modal */}
        {mounted && <FormGuide isOpen={isGuideOpen} onClose={handleGuideClose} currentStep={currentStep} params={resolvedParams} />}
      </div>
    </div>
  )
}