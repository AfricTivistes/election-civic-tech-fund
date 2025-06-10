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
      duration: language === "en" ? "15-20 minutes" : "15-20 minutes",
      durationEn: "15-20 minutes",
      sections: [
        {
          title: "Description de votre ambition démocratique",
          titleEn: "Description of your democratic ambition",
          icon: Target,
          content: [
            "Rédigez un texte de 300-500 mots décrivant votre vision pour transformer la démocratie dans votre pays",
            "Expliquez clairement quel changement vous voulez voir et pourquoi c'est important",
            "Mentionnez les bénéficiaires directs de votre projet (citoyens, électeurs, institutions)",
            "Décrivez l'impact à long terme que vous espérez avoir sur votre société",
            "Utilisez un langage accessible, évitez le jargon technique à cette étape",
          ],
          contentEn: [
            "Write a 300-500 word text describing your vision to transform democracy in your country",
            "Clearly explain what change you want to see and why it's important",
            "Mention the direct beneficiaries of your project (citizens, voters, institutions)",
            "Describe the long-term impact you hope to have on your society",
            "Use accessible language, avoid technical jargon at this stage",
          ],
        },
        {
          title: "Identification du problème électoral",
          titleEn: "Electoral problem identification",
          icon: AlertTriangle,
          content: [
            "Identifiez UN problème électoral spécifique et concret dans votre contexte",
            "Expliquez pourquoi ce problème est prioritaire et urgent à résoudre",
            "Décrivez qui est affecté par ce problème et comment",
            "Mentionnez les conséquences actuelles de ce problème sur la démocratie",
            "Évitez les problèmes trop généraux, concentrez-vous sur quelque chose de mesurable",
          ],
          contentEn: [
            "Identify ONE specific and concrete electoral problem in your context",
            "Explain why this problem is priority and urgent to solve",
            "Describe who is affected by this problem and how",
            "Mention the current consequences of this problem on democracy",
            "Avoid problems that are too general, focus on something measurable",
          ],
        },
        {
          title: "Choix du domaine prioritaire",
          titleEn: "Priority domain selection",
          icon: Settings,
          content: [
            "Sélectionnez le domaine qui correspond le mieux à votre projet parmi les 4 options",
            "Technologies Citoyennes (70 000€) : projets tech innovants, blockchain, IA, apps",
            "Engagement Citoyen (43 750€) : éducation civique, observation électorale, inclusion",
            "Médias & Information (35 000€) : fact-checking, lutte contre désinformation",
            "Cadre Légal (26 250€) : réformes électorales, contentieux, veille juridique",
            "Votre choix détermine le budget maximum et les critères d'évaluation",
          ],
          contentEn: [
            "Select the domain that best matches your project among the 4 options",
            "Civic Technologies (€70,000): innovative tech projects, blockchain, AI, apps",
            "Civic Engagement (€43,750): civic education, electoral observation, inclusion",
            "Media & Information (€35,000): fact-checking, fight against disinformation",
            "Legal Framework (€26,250): electoral reforms, litigation, legal monitoring",
            "Your choice determines the maximum budget and evaluation criteria",
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
      preparationEn: [
        "Research the specific democratic challenges in your country",
        "Consult reports from organizations like Freedom House, Transparency International",
        "Exchange with citizens to understand their electoral frustrations",
        "Analyze existing similar projects to identify gaps",
        "Prepare quantified data on the scale of the problem you're targeting",
      ],
    },
    {
      id: 2,
      title: "L'Impact Technologique",
      titleEn: "Technological Impact",
      icon: Zap,
      color: "from-blue-400 to-cyan-500",
      duration: language === "en" ? "10-15 minutes" : "10-15 minutes",
      durationEn: "10-15 minutes",
      sections: [
        {
          title: "Sélection des technologies",
          titleEn: "Technology selection",
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
          contentEn: [
            "Choose 1 to 3 technologies maximum among the 6 proposed options",
            "Blockchain: for transparency, traceability, secure voting",
            "Artificial Intelligence: data analysis, pattern detection, moderation",
            "Mobile Applications: accessibility, civic engagement, notifications",
            "Open-Source Web Platforms: collaboration, information sharing, communities",
            "Digital Security: data protection, encryption, anonymity",
            "Local Languages & Accessibility: digital inclusion, multilingual interfaces",
          ],
        },
        {
          title: "Calcul automatique de l'impact",
          titleEn: "Automatic impact calculation",
          icon: Target,
          content: [
            "Le système calcule automatiquement votre score d'impact basé sur vos choix",
            "Chaque technologie a un score d'impact prédéfini (80-95%)",
            "La combinaison de technologies peut créer des synergies",
            "Votre score final influence l'évaluation de votre dossier",
            "Un score élevé indique un potentiel d'impact social et technologique fort",
          ],
          contentEn: [
            "The system automatically calculates your impact score based on your choices",
            "Each technology has a predefined impact score (80-95%)",
            "The combination of technologies can create synergies",
            "Your final score influences the evaluation of your application",
            "A high score indicates strong social and technological impact potential",
          ],
        },
        {
          title: "Visualisation de votre ADN démocratique",
          titleEn: "Visualization of your democratic DNA",
          icon: Star,
          content: [
            "Une représentation graphique de votre profil technologique s'affiche",
            "Chaque technologie sélectionnée apparaît avec son score d'impact",
            "Cette visualisation aide les évaluateurs à comprendre votre approche",
            "Elle montre la cohérence entre vos choix technologiques et votre vision",
            "Utilisez cette vue pour vérifier que vos choix sont alignés avec vos objectifs",
          ],
          contentEn: [
            "A graphical representation of your technological profile is displayed",
            "Each selected technology appears with its impact score",
            "This visualization helps evaluators understand your approach",
            "It shows the coherence between your technological choices and your vision",
            "Use this view to verify that your choices are aligned with your objectives",
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
      preparationEn: [
        "Honestly assess your team's technical skills",
        "Research technologies already used in similar projects",
        "Consider the technological infrastructure available in your country",
        "Think about accessibility for your end users (connection, devices)",
        "Prepare a justification for each chosen technology",
      ],
    },
    {
      id: 3,
      title: "Votre Équipe Citoyenne",
      titleEn: "Your Civic Team",
      icon: Users,
      color: "from-green-400 to-emerald-500",
      duration: language === "en" ? "20-25 minutes" : "20-25 minutes",
      durationEn: "20-25 minutes",
      sections: [
        {
          title: "Ajout des membres d'équipe",
          titleEn: "Adding team members",
          icon: Users,
          content: [
            "Ajoutez minimum 2 membres, maximum recommandé 6 membres",
            "Pour chaque membre : nom complet, rôle précis dans le projet",
            "Sélectionnez les compétences parmi 4 catégories (Technique, Social, Terrain, Gestion)",
            "Rédigez l'expérience pertinente (100-200 mots par membre)",
            "Expliquez la motivation personnelle de chaque membre pour ce projet",
            "Assurez-vous que les rôles sont complémentaires et non redondants",
          ],
          contentEn: [
            "Add minimum 2 members, maximum recommended 6 members",
            "For each member: full name, precise role in the project",
            "Select skills among 4 categories (Technical, Social, Field, Management)",
            "Write relevant experience (100-200 words per member)",
            "Explain each member's personal motivation for this project",
            "Ensure roles are complementary and not redundant",
          ],
        },
        {
          title: "Radar de compétences automatique",
          titleEn: "Automatic skills radar",
          icon: Target,
          content: [
            "Le système génère automatiquement un radar des compétences de l'équipe",
            "4 axes : Technique (dev, data, cyber), Social (comm, formation), Terrain (observation, mobilisation), Gestion (management, finance)",
            "Chaque axe montre le ratio compétences présentes / compétences totales",
            "Visez un équilibre entre les 4 axes pour maximiser vos chances",
            "Une équipe déséquilibrée peut être un point faible dans l'évaluation",
          ],
          contentEn: [
            "The system automatically generates a team skills radar",
            "4 axes: Technical (dev, data, cyber), Social (comm, training), Field (observation, mobilization), Management (management, finance)",
            "Each axis shows the ratio of present skills / total skills",
            "Aim for balance between the 4 axes to maximize your chances",
            "An unbalanced team can be a weakness in the evaluation",
          ],
        },
        {
          title: "Gestion de l'équipe",
          titleEn: "Team management",
          icon: Settings,
          content: [
            "Vous pouvez modifier ou supprimer des membres à tout moment",
            "Chaque membre ajouté enrichit automatiquement le radar de compétences",
            "Le système vérifie que vous avez au minimum 2 membres avant de continuer",
            "Privilégiez la qualité à la quantité : mieux vaut 3 membres expérimentés que 6 novices",
            "Pensez à l'équilibre géographique si votre projet couvre plusieurs régions",
          ],
          contentEn: [
            "You can modify or remove members at any time",
            "Each added member automatically enriches the skills radar",
            "The system verifies that you have at least 2 members before continuing",
            "Prioritize quality over quantity: better 3 experienced members than 6 novices",
            "Think about geographical balance if your project covers multiple regions",
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
      preparationEn: [
        "Identify essential skills for your project",
        "Contact your future teammates to get their participation agreement",
        "Prepare detailed CVs for each key member",
        "Clearly define each person's roles and responsibilities",
        "Ensure each member's availability for 10 months",
        "Prepare commitment or motivation letters from members",
      ],
    },
    {
      id: 4,
      title: "Votre Arsenal Numérique",
      titleEn: "Your Digital Arsenal",
      icon: FileText,
      color: "from-purple-400 to-pink-500",
      duration: language === "en" ? "30-45 minutes" : "30-45 minutes",
      durationEn: "30-45 minutes",
      sections: [
        {
          title: "Documents obligatoires à préparer",
          titleEn: "Required documents to prepare",
          icon: FileCheck,
          content: [
            "Enregistrement Officiel : statuts, récépissé de déclaration, ou engagement d'enregistrement",
            "CV des Membres Clés : CV détaillés des 2-3 membres principaux (format PDF)",
            "Description Détaillée du Projet : maximum 5 pages selon le modèle fourni",
            "Théorie du Changement : plan d'action détaillé sur 10 mois avec indicateurs",
            "Budget Prévisionnel : budget ligne par ligne selon le modèle, justifié et réaliste",
            "Tous les documents doivent être en PDF, nommés clairement, et en français ou anglais",
          ],
          contentEn: [
            "Official Registration: statutes, declaration receipt, or registration commitment",
            "Key Members' CVs: detailed CVs of the 2-3 main members (PDF format)",
            "Detailed Project Description: maximum 5 pages according to the provided template",
            "Theory of Change: detailed 10-month action plan with indicators",
            "Budget Forecast: line-by-line budget according to the template, justified and realistic",
            "All documents must be in PDF, clearly named, and in French or English",
          ],
        },
        {
          title: "Validation IA en temps réel",
          titleEn: "Real-time AI validation",
          icon: Zap,
          content: [
            "Chaque document uploadé est analysé automatiquement par une IA",
            "Vérification du format, de la complétude, et de la conformité aux exigences",
            "Statuts possibles : Valide (vert), Attention (orange), ou À corriger (rouge)",
            "Messages d'aide personnalisés pour améliorer vos documents",
            "La validation IA ne remplace pas l'évaluation humaine finale",
            "Utilisez ces retours pour optimiser vos documents avant soumission",
          ],
          contentEn: [
            "Each uploaded document is automatically analyzed by an AI",
            "Verification of format, completeness, and compliance with requirements",
            "Possible statuses: Valid (green), Attention (orange), or To correct (red)",
            "Personalized help messages to improve your documents",
            "AI validation does not replace final human evaluation",
            "Use this feedback to optimize your documents before submission",
          ],
        },
        {
          title: "Score de complétude et soumission",
          titleEn: "Completion score and submission",
          icon: Target,
          content: [
            "Score calculé en temps réel basé sur les documents validés",
            "Minimum 80% requis pour pouvoir soumettre votre candidature",
            "Récapitulatif automatique de votre projet avec toutes les informations saisies",
            "Vérification finale de la cohérence entre vision, technologies, équipe et budget",
            "Une fois soumis, votre dossier ne peut plus être modifié",
            "Vous recevrez une confirmation par email avec un numéro de dossier",
          ],
          contentEn: [
            "Score calculated in real time based on validated documents",
            "Minimum 80% required to be able to submit your application",
            "Automatic summary of your project with all entered information",
            "Final verification of coherence between vision, technologies, team and budget",
            "Once submitted, your file can no longer be modified",
            "You will receive confirmation by email with a file number",
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
      preparationEn: [
        "Download all document templates from the official website",
        "Prepare your budget in detail with realistic quotes",
        "Write your theory of change with measurable indicators",
        "Scan all your official documents in high quality",
        "Carefully reread all your documents to avoid errors",
        "Prepare backup versions of all your files",
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
                  (language === "en" ? "Complete Application Guide" : "Guide complet de candidature")}
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
            <Card className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-blue-400/30 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex items-center md:block">
                    <Rocket className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 flex-shrink-0 mr-3 md:mr-0 md:mb-2" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center md:block">
                      <span className="md:block">
                        {t?.guide?.beforeStarting || (language === "en" ? "🚀 Before Starting" : "🚀 Avant de Commencer")}
                      </span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg border border-blue-400/30">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-white text-sm">
                              {language === "en" ? "Duration" : "Durée"}
                            </div>
                            <div className="text-blue-200 text-sm">
                              {t?.guide?.estimatedTime ||
                                (language === "en"
                                  ? "2-3 hours total"
                                  : "2-3 heures au total")}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg border border-blue-400/30">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-white text-sm">
                              {language === "en" ? "Auto-save" : "Sauvegarde"}
                            </div>
                            <div className="text-blue-200 text-sm">
                              {t?.guide?.autoSave ||
                                (language === "en"
                                  ? "Progress saved automatically"
                                  : "Progression sauvée automatiquement")}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg border border-blue-400/30">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-white text-sm">
                              {language === "en" ? "AI Validation" : "Validation IA"}
                            </div>
                            <div className="text-blue-200 text-sm">
                              {t?.guide?.aiValidation ||
                                (language === "en" ? "Real-time document checking" : "Vérification temps réel des documents")}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg border border-blue-400/30">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-white text-sm">
                              {language === "en" ? "Support" : "Assistance"}
                            </div>
                            <div className="text-blue-200 text-sm">
                              {t?.guide?.contextualHelp ||
                                (language === "en" ? "Contextual help available" : "Aide contextuelle disponible")}
                            </div>
                          </div>
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
                const stepDuration = language === "en" && step.durationEn ? step.durationEn : step.duration

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
                              {language === "en" ? "Step" : "Étape"} {step.id}: {stepTitle}
                            </CardTitle>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {stepDuration}
                              </Badge>
                              <Badge variant="outline" className="border-blue-400 text-blue-400">
                                {step.sections?.length || 0} {language === "en" ? "sections" : "sections"}
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
                              const sectionTitle = language === "en" && section.titleEn ? section.titleEn : section.title
                              const sectionContent = language === "en" && section.contentEn ? section.contentEn : section.content

                              return (
                                <div key={sectionIndex} className="border-l-2 border-white/20 pl-6">
                                  <h4 className="font-semibold text-white mb-3 flex items-center">
                                    <SectionIcon className="w-4 h-4 mr-2 text-yellow-400" />
                                    {sectionTitle}
                                  </h4>
                                  <div className="space-y-2">
                                    {sectionContent &&
                                      Array.isArray(sectionContent) &&
                                      sectionContent.map((item, itemIndex) => (
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
                              {language === "en" ? "Recommended Preparation" : "Préparation Recommandée"}
                            </h4>
                            <div className="space-y-2">
                              {(() => {
                                const preparationItems = language === "en" && step.preparationEn ? step.preparationEn : step.preparation
                                return preparationItems &&
                                  Array.isArray(preparationItems) &&
                                  preparationItems.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                      <PenTool className="w-3 h-3 text-purple-400 mt-1 flex-shrink-0" />
                                      <p className="text-purple-200 text-sm">{item}</p>
                                    </div>
                                  ))
                              })()}
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
            <Card className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-slate-400/30">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t?.guide?.personalizedSupport ||
                    (language === "en" ? "Personalized Support" : "Support Personnalisé")}
                </h3>
                <p className="text-slate-200 text-sm mb-4 font-medium">
                  {t?.guide?.supportTeam ||
                    (language === "en"
                      ? "Our team of experts is available to assist you with your application."
                      : "Notre équipe d'experts est disponible pour vous accompagner dans votre candidature.")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Badge variant="outline" className="border-cyan-400 text-cyan-200 bg-cyan-500/10">
                    📧 support@ectf.org
                  </Badge>
                  <Badge variant="outline" className="border-blue-400 text-blue-200 bg-blue-500/10">
                    {language === "en" ? "💬 Live chat 9am-5pm" : "💬 Chat en direct 9h-17h"}
                  </Badge>
                  <Badge variant="outline" className="border-green-400 text-green-200 bg-green-500/10">
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
