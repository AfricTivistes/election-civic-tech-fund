"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  X,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Zap,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Star,
  Target,
  Rocket,
  BookOpen,
  MessageSquare,
  Clock,
  FileCheck,
  Clipboard,
  PenTool,
  Settings,
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useParams } from "next/navigation"

interface FormGuideProps {
  isOpen: boolean
  onClose: () => void
  currentStep?: number
  params?: { lang?: string }
}

export default function FormGuide({ isOpen, onClose, currentStep = 0, params }: FormGuideProps) {
  const { t } = useLanguage()
  const languageParams = useParams()
  const language =
    languageParams && typeof languageParams === "object" && "lang" in languageParams
      ? String(languageParams.lang)
      : "fr"
  const [expandedSection, setExpandedSection] = useState<number | null>(currentStep || 1)

  // Vérifications de sécurité
  if (!isOpen) return null

  const handleSectionToggle = (sectionId: number) => {
    try {
      setExpandedSection(expandedSection === sectionId ? null : sectionId)
    } catch (error) {
      console.error("Error toggling section:", error)
    }
  }

  const handleClose = () => {
    try {
      if (typeof onClose === "function") {
        onClose()
      }
    } catch (error) {
      console.error("Error closing guide:", error)
    }
  }

  const guideData = [
    {
      id: 1,
      title: "Votre Vision Démocratique",
      titleEn: "Your Democratic Vision",
      icon: Lightbulb,
      color: "from-yellow-400 to-orange-500",
      duration: "15-20 minutes",
      sections: [
        {
          title: "Description de votre ambition démocratique",
          icon: Target,
          content: [
            "Rédigez un texte de 300-500 mots décrivant votre vision pour transformer la démocratie dans votre pays",
            "Expliquez clairement quel changement vous voulez voir et pourquoi c'est important",
            "Mentionnez les bénéficiaires directs de votre projet (citoyens, électeurs, institutions)",
            "Décrivez l'impact à long terme que vous espérez avoir sur votre société",
            "Utilisez un langage accessible, évitez le jargon technique à cette étape",
          ],
        },
        {
          title: "Identification du problème électoral",
          icon: AlertTriangle,
          content: [
            "Identifiez UN problème électoral spécifique et concret dans votre contexte",
            "Expliquez pourquoi ce problème est prioritaire et urgent à résoudre",
            "Décrivez qui est affecté par ce problème et comment",
            "Mentionnez les conséquences actuelles de ce problème sur la démocratie",
            "Évitez les problèmes trop généraux, concentrez-vous sur quelque chose de mesurable",
          ],
        },
        {
          title: "Choix du domaine prioritaire",
          icon: Settings,
          content: [
            "Sélectionnez le domaine qui correspond le mieux à votre projet parmi les 4 options",
            "Technologies Citoyennes (70 000€) : projets tech innovants, blockchain, IA, apps",
            "Engagement Citoyen (43 750€) : éducation civique, observation électorale, inclusion",
            "Médias & Information (35 000€) : fact-checking, lutte contre désinformation",
            "Cadre Légal (26 250€) : réformes électorales, contentieux, veille juridique",
            "Votre choix détermine le budget maximum et les critères d'évaluation",
          ],
        },
      ],
      preparation: [
        "Recherchez les défis démocratiques spécifiques de votre pays",
        "Consultez des rapports d'organisations comme Freedom House, Transparency International",
        "Échangez avec des citoyens pour comprendre leurs frustrations électorales",
        "Analysez les projets similaires existants pour identifier les gaps",
        "Préparez des données chiffrées sur l'ampleur du problème que vous ciblez",
      ],
    },
    {
      id: 2,
      title: "L'Impact Technologique",
      titleEn: "Technological Impact",
      icon: Zap,
      color: "from-blue-400 to-cyan-500",
      duration: "10-15 minutes",
      sections: [
        {
          title: "Sélection des technologies",
          icon: Settings,
          content: [
            "Choisissez 1 à 3 technologies maximum parmi les 6 options proposées",
            "Blockchain : pour la transparence, traçabilité, votes sécurisés",
            "Intelligence Artificielle : analyse de données, détection de patterns, modération",
            "Applications Mobiles : accessibilité, engagement citoyen, notifications",
            "Plateformes Web Open-Source : collaboration, partage d'information, communautés",
            "Sécurité Numérique : protection des données, chiffrement, anonymat",
            "Langues Locales & Accessibilité : inclusion numérique, interfaces multilingues",
          ],
        },
        {
          title: "Calcul automatique de l'impact",
          icon: Target,
          content: [
            "Le système calcule automatiquement votre score d'impact basé sur vos choix",
            "Chaque technologie a un score d'impact prédéfini (80-95%)",
            "La combinaison de technologies peut créer des synergies",
            "Votre score final influence l'évaluation de votre dossier",
            "Un score élevé indique un potentiel d'impact social et technologique fort",
          ],
        },
        {
          title: "Visualisation de votre ADN démocratique",
          icon: Star,
          content: [
            "Une représentation graphique de votre profil technologique s'affiche",
            "Chaque technologie sélectionnée apparaît avec son score d'impact",
            "Cette visualisation aide les évaluateurs à comprendre votre approche",
            "Elle montre la cohérence entre vos choix technologiques et votre vision",
            "Utilisez cette vue pour vérifier que vos choix sont alignés avec vos objectifs",
          ],
        },
      ],
      preparation: [
        "Évaluez honnêtement les compétences techniques de votre équipe",
        "Recherchez les technologies déjà utilisées dans des projets similaires",
        "Considérez l'infrastructure technologique disponible dans votre pays",
        "Pensez à l'accessibilité pour vos utilisateurs finaux (connexion, appareils)",
        "Préparez une justification pour chaque technologie choisie",
      ],
    },
    {
      id: 3,
      title: "Votre Équipe Citoyenne",
      titleEn: "Your Civic Team",
      icon: Users,
      color: "from-green-400 to-emerald-500",
      duration: "20-25 minutes",
      sections: [
        {
          title: "Ajout des membres d'équipe",
          icon: Users,
          content: [
            "Ajoutez minimum 2 membres, maximum recommandé 6 membres",
            "Pour chaque membre : nom complet, rôle précis dans le projet",
            "Sélectionnez les compétences parmi 4 catégories (Technique, Social, Terrain, Gestion)",
            "Rédigez l'expérience pertinente (100-200 mots par membre)",
            "Expliquez la motivation personnelle de chaque membre pour ce projet",
            "Assurez-vous que les rôles sont complémentaires et non redondants",
          ],
        },
        {
          title: "Radar de compétences automatique",
          icon: Target,
          content: [
            "Le système génère automatiquement un radar des compétences de l'équipe",
            "4 axes : Technique (dev, data, cyber), Social (comm, formation), Terrain (observation, mobilisation), Gestion (management, finance)",
            "Chaque axe montre le ratio compétences présentes / compétences totales",
            "Visez un équilibre entre les 4 axes pour maximiser vos chances",
            "Une équipe déséquilibrée peut être un point faible dans l'évaluation",
          ],
        },
        {
          title: "Gestion de l'équipe",
          icon: Settings,
          content: [
            "Vous pouvez modifier ou supprimer des membres à tout moment",
            "Chaque membre ajouté enrichit automatiquement le radar de compétences",
            "Le système vérifie que vous avez au minimum 2 membres avant de continuer",
            "Privilégiez la qualité à la quantité : mieux vaut 3 membres expérimentés que 6 novices",
            "Pensez à l'équilibre géographique si votre projet couvre plusieurs régions",
          ],
        },
      ],
      preparation: [
        "Identifiez les compétences essentielles pour votre projet",
        "Contactez vos futurs coéquipiers pour obtenir leur accord de participation",
        "Préparez les CV détaillés de chaque membre clé",
        "Définissez clairement les rôles et responsabilités de chacun",
        "Assurez-vous de la disponibilité de chaque membre pour 10 mois",
        "Préparez des lettres d'engagement ou de motivation des membres",
      ],
    },
    {
      id: 4,
      title: "Votre Arsenal Numérique",
      titleEn: "Your Digital Arsenal",
      icon: FileText,
      color: "from-purple-400 to-pink-500",
      duration: "30-45 minutes",
      sections: [
        {
          title: "Documents obligatoires à préparer",
          icon: FileCheck,
          content: [
            "Enregistrement Officiel : statuts, récépissé de déclaration, ou engagement d'enregistrement",
            "CV des Membres Clés : CV détaillés des 2-3 membres principaux (format PDF)",
            "Description Détaillée du Projet : maximum 5 pages selon le modèle fourni",
            "Théorie du Changement : plan d'action détaillé sur 10 mois avec indicateurs",
            "Budget Prévisionnel : budget ligne par ligne selon le modèle, justifié et réaliste",
            "Tous les documents doivent être en PDF, nommés clairement, et en français ou anglais",
          ],
        },
        {
          title: "Validation IA en temps réel",
          icon: Zap,
          content: [
            "Chaque document uploadé est analysé automatiquement par une IA",
            "Vérification du format, de la complétude, et de la conformité aux exigences",
            "Statuts possibles : Valide (vert), Attention (orange), ou À corriger (rouge)",
            "Messages d'aide personnalisés pour améliorer vos documents",
            "La validation IA ne remplace pas l'évaluation humaine finale",
            "Utilisez ces retours pour optimiser vos documents avant soumission",
          ],
        },
        {
          title: "Score de complétude et soumission",
          icon: Target,
          content: [
            "Score calculé en temps réel basé sur les documents validés",
            "Minimum 80% requis pour pouvoir soumettre votre candidature",
            "Récapitulatif automatique de votre projet avec toutes les informations saisies",
            "Vérification finale de la cohérence entre vision, technologies, équipe et budget",
            "Une fois soumis, votre dossier ne peut plus être modifié",
            "Vous recevrez une confirmation par email avec un numéro de dossier",
          ],
        },
      ],
      preparation: [
        "Téléchargez tous les modèles de documents depuis le site officiel",
        "Préparez votre budget en détail avec des devis réalistes",
        "Rédigez votre théorie du changement avec des indicateurs mesurables",
        "Scannez tous vos documents officiels en haute qualité",
        "Relisez attentivement tous vos documents pour éviter les erreurs",
        "Préparez des versions de sauvegarde de tous vos fichiers",
      ],
    },
  ]

  const faqData = [
    {
      question: "Combien de temps faut-il pour remplir complètement le formulaire ?",
      questionEn: "How long does it take to complete the form?",
      answer:
        "Comptez 2-3 heures au total si vous avez préparé tous vos documents. La préparation en amont peut prendre plusieurs jours.",
      answerEn:
        "Allow 2-3 hours total if you have prepared all your documents. Advance preparation may take several days.",
    },
    {
      question: "Puis-je sauvegarder et reprendre plus tard ?",
      questionEn: "Can I save and resume later?",
      answer:
        "Oui, vos données sont automatiquement sauvegardées à chaque étape. Vous pouvez fermer et reprendre à tout moment.",
      answerEn: "Yes, your data is automatically saved at each step. You can close and resume at any time.",
    },
    {
      question: "Que se passe-t-il si je n'ai pas tous les documents ?",
      questionEn: "What happens if I don't have all the documents?",
      answer:
        "Vous pouvez commencer sans tous les documents, mais vous devez atteindre 80% de complétude pour soumettre.",
      answerEn: "You can start without all documents, but you must reach 80% completion to submit.",
    },
    {
      question: "Comment sont évalués les dossiers ?",
      questionEn: "How are applications evaluated?",
      answer:
        "Évaluation en 3 phases : pré-sélection automatique, évaluation par experts, puis entretiens pour les finalistes.",
      answerEn: "3-phase evaluation: automatic pre-selection, expert evaluation, then interviews for finalists.",
    },
    {
      question: "Puis-je candidater si mon organisation est informelle ?",
      questionEn: "Can I apply if my organization is informal?",
      answer: "Oui, mais vous devez vous engager à formaliser votre structure avant le démarrage du financement.",
      answerEn: "Yes, but you must commit to formalizing your structure before funding begins.",
    },
    {
      question: "Y a-t-il des restrictions géographiques ?",
      questionEn: "Are there geographical restrictions?",
      answer: "Le fonds cible 14 pays spécifiques en Afrique de l'Ouest, du Sahel et de la Corne de l'Afrique.",
      answerEn: "The fund targets 14 specific countries in West Africa, Sahel and Horn of Africa.",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border border-white/20 rounded-xl md:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/20">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="p-2 md:p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-white">
                {t?.guide?.title ||
                  (language === "en" ? "Complete Democracy Builder Guide" : "Guide Complet du Democracy Builder")}
              </h2>
              <p className="text-sm md:text-base text-blue-200">
                {t?.guide?.subtitle ||
                  (language === "en" ? "Prepare for a perfect application" : "Préparez-vous pour un dossier parfait")}
              </p>
            </div>
          </div>
          <Button onClick={handleClose} variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-100px)] md:max-h-[calc(90vh-120px)]">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Quick Start */}
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Rocket className="w-8 h-8 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-green-50 mb-3">
                      {t?.guide?.beforeStarting || (language === "en" ? "🚀 Before Starting" : "🚀 Avant de Commencer")}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center text-green-100">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          <span>
                            {t?.guide?.estimatedTime ||
                              (language === "en"
                                ? "Estimated total time: 2-3 hours"
                                : "Temps total estimé : 2-3 heures")}
                          </span>
                        </div>
                        <div className="flex items-center text-green-100">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          <span>
                            {t?.guide?.autoSave ||
                              (language === "en"
                                ? "Automatic save at each step"
                                : "Sauvegarde automatique à chaque étape")}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-green-100">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          <span>
                            {t?.guide?.aiValidation ||
                              (language === "en" ? "Real-time AI validation" : "Validation IA en temps réel")}
                          </span>
                        </div>
                        <div className="flex items-center text-green-100">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          <span>
                            {t?.guide?.contextualHelp ||
                              (language === "en" ? "Contextual help available" : "Aide contextuelle disponible")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guide par étapes */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-yellow-400" />
                {t?.guide?.detailedGuide ||
                  (language === "en" ? "Detailed Step-by-Step Guide" : "Guide Détaillé par Étapes")}
              </h3>

              {guideData.map((step) => {
                if (!step || typeof step !== "object" || !step.icon) return null

                const IconComponent = step.icon
                const isExpanded = expandedSection === step.id

                // Utiliser le titre en anglais ou en français selon la langue
                const stepTitle = language === "en" && step.titleEn ? step.titleEn : step.title

                return (
                  <Card key={step.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader className="cursor-pointer" onClick={() => handleSectionToggle(step.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${step.color}`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">
                              {t?.guide?.step || "Étape"} {step.id}: {stepTitle}
                            </CardTitle>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {step.duration}
                              </Badge>
                              <Badge variant="outline" className="border-blue-400 text-blue-400">
                                {step.sections?.length || 0} {t?.guide?.sections || "sections"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-white" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="pt-0 pb-6">
                        <div className="space-y-6">
                          {/* Sections détaillées */}
                          {step.sections &&
                            Array.isArray(step.sections) &&
                            step.sections.map((section, sectionIndex) => {
                              if (!section || typeof section !== "object" || !section.icon) return null

                              const SectionIcon = section.icon
                              return (
                                <div key={sectionIndex} className="border-l-2 border-white/20 pl-6">
                                  <h4 className="font-semibold text-white mb-3 flex items-center">
                                    <SectionIcon className="w-4 h-4 mr-2 text-yellow-400" />
                                    {section.title}
                                  </h4>
                                  <div className="space-y-2">
                                    {section.content &&
                                      Array.isArray(section.content) &&
                                      section.content.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-start space-x-3">
                                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                          <p className="text-blue-200 text-sm leading-relaxed">{item}</p>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )
                            })}

                          {/* Préparation recommandée */}
                          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                            <h4 className="font-semibold text-white mb-3 flex items-center">
                              <Clipboard className="w-4 h-4 mr-2 text-purple-400" />
                              {t?.guide?.recommendedPrep || "Préparation Recommandée"}
                            </h4>
                            <div className="space-y-2">
                              {step.preparation &&
                                Array.isArray(step.preparation) &&
                                step.preparation.map((item, index) => (
                                  <div key={index} className="flex items-start space-x-3">
                                    <PenTool className="w-3 h-3 text-purple-400 mt-1 flex-shrink-0" />
                                    <p className="text-purple-200 text-sm">{item}</p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>

            {/* FAQ */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
                {t?.guide?.faq || "Questions Fréquentes"}
              </h3>

              <div className="space-y-3">
                {faqData.map((faq, index) => {
                  if (!faq) return null
                  // Utiliser la question et réponse en anglais ou en français selon la langue
                  const question = language === "en" && faq.questionEn ? faq.questionEn : faq.question || ""
                  const answer = language === "en" && faq.answerEn ? faq.answerEn : faq.answer || ""

                  return (
                    <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-white mb-2 flex items-center">
                          <HelpCircle className="w-4 h-4 mr-2 text-blue-400" />
                          {question}
                        </h4>
                        <p className="text-blue-200 text-sm pl-6">{answer}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Contact d'aide */}
            <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">
                  {t?.guide?.personalizedSupport ||
                    (language === "en" ? "Personalized Support" : "Support Personnalisé")}
                </h3>
                <p className="text-slate-200 text-sm mb-4">
                  {t?.guide?.supportTeam ||
                    (language === "en"
                      ? "Our team of experts is available to assist you with your application."
                      : "Notre équipe d'experts est disponible pour vous accompagner dans votre candidature.")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Badge variant="outline" className="border-blue-400 text-blue-300">
                    📧 support@ectf.org
                  </Badge>
                  <Badge variant="outline" className="border-purple-400 text-purple-300">
                    {language === "en" ? "💬 Live chat 9am-5pm" : "💬 Chat en direct 9h-17h"}
                  </Badge>
                  <Badge variant="outline" className="border-green-400 text-green-300">
                    📞 {language === "en" ? "Hotline: +221 XX XXX XXXX" : "Hotline : +221 XX XXX XXXX"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
