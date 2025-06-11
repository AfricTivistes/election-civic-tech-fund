"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { translations, type Translation } from "@/lib/translations"

type Language = "fr" | "en"

export function useLanguage() {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("en")
  const [t, setT] = useState<Translation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Available languages definition
  const availableLanguages = [
    { code: "en" as Language, name: "English", flag: "🇬🇧" },
    { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  ]

  // Detect language from URL parameters
  useEffect(() => {
    try {
      // Determine language from URL parameters
      const lang = params?.lang as string
      console.log('🌍 Langue détectée depuis URL:', lang)

      // Check if the language is supported, otherwise use English
      const supportedLang = lang === "fr" || lang === "en" ? (lang as Language) : "en"
      console.log('🌍 Langue supportée sélectionnée:', supportedLang)

      setLanguage(supportedLang)

      // Get translations
      const translationData = translations[supportedLang]

      // Check if translations are complete
      if (!translationData || !translationData.domains || !translationData.domains.tech) {
        console.error("Translations incomplete or missing domains.tech:", translationData)
        // Create a fallback with minimum required properties
        const fallbackTranslation = createFallbackTranslation(supportedLang)
        setT(fallbackTranslation)
      } else {
        setT(translationData)
      }
    } catch (error) {
      console.error("Error loading translations:", error)
      // In case of error, use a fallback
      setT(createFallbackTranslation("en"))
    } finally {
      setIsLoading(false)
    }
  }, [params])

  // Change language function
  const changeLanguage = (newLanguage: Language) => {
    try {
      if (!newLanguage || (newLanguage !== "fr" && newLanguage !== "en")) {
        console.warn("Invalid language:", newLanguage)
        return
      }

      setLanguage(newLanguage)

      // Build new URL with selected language
      if (typeof window === "undefined" || !router) return

      // Save preference in localStorage
      try {
        localStorage.setItem("ectf-language", newLanguage)
      } catch (error) {
        console.warn("Error saving to localStorage:", error)
      }

      // Navigate to new URL - wrapped in try/catch to prevent unhandled rejections
      try {
        const pathname = window.location.pathname
        let newPath = pathname

        if (pathname.startsWith("/fr") || pathname.startsWith("/en")) {
          newPath = `/${newLanguage}${pathname.substring(3)}`
        } else {
          newPath = `/${newLanguage}${pathname}`
        }

        // Use replace instead of push to avoid adding to history stack
        router.replace(newPath)
      } catch (routerError) {
        console.error("Error navigating with router:", routerError)
        // Fallback to window.location if router fails
        try {
          const pathname = window.location.pathname
          let newPath = pathname

          if (pathname.startsWith("/fr") || pathname.startsWith("/en")) {
            newPath = `/${newLanguage}${pathname.substring(3)}`
          } else {
            newPath = `/${newLanguage}${pathname}`
          }

          window.location.href = newPath
        } catch (locationError) {
          console.error("Error navigating with window.location:", locationError)
        }
      }
    } catch (error) {
      console.error("Error changing language:", error)
    }
  }

  return {
    language,
    changeLanguage,
    t,
    isLoading,
    availableLanguages,
  }
}

// Function to create a fallback translation with minimum required properties
function createFallbackTranslation(lang: string): Translation {
  const isEnglish = lang === "en"

  return {
    header: {
      title: isEnglish ? "Election Civic Tech Fund" : "Election Civic Tech Fund",
      subtitle: isEnglish ? "Digital Democracy Journey" : "Parcours Démocratie Numérique",
      estimatedTime: isEnglish ? "Estimated time" : "Temps estimé",
      homeButton: isEnglish ? "Home" : "Accueil",
      funding: isEnglish ? "€175,000 • 14 Countries" : "175 000€ • 14 Pays",
      countries: isEnglish ? "14 Countries" : "14 Pays",
      possibilities: isEnglish ? "∞ Possibilities" : "∞ Possibilités",
    },
    hero: {
      title: isEnglish ? "ELECTION CIVIC TECH FUND" : "ELECTION CIVIC TECH FUND",
      subtitle: isEnglish ? "Digital Democracy Journey" : "Parcours Démocratie Numérique",
      description: isEnglish ? "Transform democracy with technology" : "Transformez la démocratie avec la technologie",
      secondDescription: isEnglish ? "Interactive journey" : "Parcours interactif",
      startButton: isEnglish ? "Start" : "Commencer",
      features: {
        innovation: isEnglish ? "Innovation" : "Innovation",
        impact: isEnglish ? "Impact" : "Impact",
        solutions: isEnglish ? "Solutions" : "Solutions",
        democracy: isEnglish ? "Democracy" : "Démocratie",
      },
      stats: {
        majorProjects: "4-6",
        majorProjectsDesc: isEnglish ? "Major Projects" : "Projets Majeurs",
        microGrants: "10+",
        microGrantsDesc: isEnglish ? "Micro-grants" : "Micro-subventions",
        support: "10",
        supportDesc: isEnglish ? "Months of support" : "Mois d'accompagnement",
      },
      footer: {
        ledBy: isEnglish ? "Led by" : "Mené par",
        poweredBy: isEnglish ? "Powered by" : "Propulsé par",
        projectDescription: isEnglish ? "Project description" : "Description du projet",
        copyright: "© 2024 Election Civic Tech Fund",
        tagline: isEnglish ? "Building Africa's future" : "Construire l'avenir de l'Afrique",
      },
      countries: {
        title: isEnglish ? "Fund Target Countries" : "Pays Cibles du Fonds",
        subtitle: isEnglish ? "Click on a country to discover its democratic challenges" : "Cliquez sur un pays pour découvrir ses défis démocratiques",
        challengesTitle: isEnglish ? "Priority Democratic Challenges" : "Défis Démocratiques Prioritaires",
      },
    },
    steps: {
      step1: {
        title: isEnglish ? "Your Vision" : "Votre Vision",
        description: isEnglish ? "Describe your idea" : "Décrivez votre idée",
        expertTip: {
          title: isEnglish ? "Expert Tip" : "Conseil d'Expert",
          content: isEnglish ? "Be specific" : "Soyez précis",
        },
        visionTitle: isEnglish ? "Your ambition" : "Votre ambition",
        visionDescription: isEnglish ? "Tell us your vision" : "Racontez-nous votre vision",
        visionPlaceholder: isEnglish ? "Describe..." : "Décrivez...",
        problemTitle: isEnglish ? "Problem" : "Problème",
        problemDescription: isEnglish ? "Identify the challenge" : "Identifiez le défi",
        problemPlaceholder: isEnglish ? "What problem..." : "Quel problème...",
        domainTitle: isEnglish ? "Domain" : "Domaine",
        domainDescription: isEnglish ? "Select domain" : "Sélectionnez le domaine",
        nextButton: isEnglish ? "Next" : "Suivant",
        completionMessage: isEnglish ? "Complete all fields" : "Complétez tous les champs",
      },
      step2: {
        title: isEnglish ? "Technology" : "Technologie",
        description: isEnglish ? "Select technologies" : "Sélectionnez les technologies",
        expertTip: {
          title: isEnglish ? "Expert Tip" : "Conseil d'Expert",
          content: isEnglish ? "Choose wisely" : "Choisissez judicieusement",
        },
        selectTech: isEnglish ? "Select technologies" : "Sélectionnez les technologies",
        selectTechDesc: isEnglish ? "Choose tools" : "Choisissez les outils",
        impactTitle: isEnglish ? "Impact" : "Impact",
        impactSubtitle: isEnglish ? "Score" : "Score",
        nextButton: isEnglish ? "Next" : "Suivant",
        prevButton: isEnglish ? "Previous" : "Précédent",
        completionMessage: isEnglish ? "Select at least one" : "Sélectionnez au moins une",
      },
      step3: {
        title: isEnglish ? "Team" : "Équipe",
        description: isEnglish ? "Your team" : "Votre équipe",
        expertTip: {
          title: isEnglish ? "Expert Tip" : "Conseil d'Expert",
          content: isEnglish ? "Diverse team" : "Équipe diverse",
        },
        teamStats: isEnglish ? "Skills" : "Compétences",
        teamMembers: isEnglish ? "Members" : "Membres",
        addMember: isEnglish ? "Add member" : "Ajouter un membre",
        addMemberDesc: isEnglish ? "Add key people" : "Ajoutez des personnes clés",
        fullName: isEnglish ? "Full name" : "Nom complet",
        fullNamePlaceholder: isEnglish ? "Name" : "Nom",
        role: isEnglish ? "Role" : "Rôle",
        rolePlaceholder: isEnglish ? "Role" : "Rôle",
        skills: isEnglish ? "Skills" : "Compétences",
        skillCategories: {
          technical: isEnglish ? "Technical" : "Technique",
          social: isEnglish ? "Social" : "Social",
          field: isEnglish ? "Field" : "Terrain",
          management: isEnglish ? "Management" : "Gestion",
        },
        experience: isEnglish ? "Experience" : "Expérience",
        experiencePlaceholder: isEnglish ? "Experience..." : "Expérience...",
        motivation: isEnglish ? "Motivation" : "Motivation",
        motivationPlaceholder: isEnglish ? "Motivation..." : "Motivation...",
        addButton: isEnglish ? "Add" : "Ajouter",
        nextButton: isEnglish ? "Next" : "Suivant",
        prevButton: isEnglish ? "Previous" : "Précédent",
        completionMessage: isEnglish ? "Add at least 2 members" : "Ajoutez au moins 2 membres",
        uploaded: isEnglish ? "Uploaded" : "Téléversé",
        replace: isEnglish ? "Replace" : "Remplacer",
      },
      step4: {
        title: isEnglish ? "Documents" : "Documents",
        description: isEnglish ? "Upload documents" : "Téléversez les documents",
        expertTip: {
          title: isEnglish ? "Expert Tip" : "Conseil d'Expert",
          content: isEnglish ? "Complete all" : "Complétez tout",
        },
        completionScore: isEnglish ? "Completion" : "Complétion",
        completionText: isEnglish ? "Ready at" : "Prêt à",
        readySubmission: isEnglish ? "Ready" : "Prêt",
        requiredDocs: isEnglish ? "Required" : "Requis",
        aiDescription: isEnglish ? "AI verification" : "Vérification IA",
        projectSummary: isEnglish ? "Summary" : "Résumé",
        vision: isEnglish ? "Vision" : "Vision",
        domain: isEnglish ? "Domain" : "Domaine",
        technologies: isEnglish ? "Technologies" : "Technologies",
        team: isEnglish ? "Team" : "Équipe",
        members: isEnglish ? "members" : "membres",
        notProvided: isEnglish ? "Not provided" : "Non fourni",
        notSelected: isEnglish ? "Not selected" : "Non sélectionné",
        notSelectedTech: isEnglish ? "Not selected" : "Non sélectionnées",
        submitButton: isEnglish ? "Submit" : "Soumettre",
        submitting: isEnglish ? "Submitting..." : "Soumission...",
        prevButton: isEnglish ? "Previous" : "Précédent",
        completionMessage: isEnglish ? "Complete 80%" : "Complétez 80%",
        uploaded: isEnglish ? "Uploaded" : "Téléversé",
        replace: isEnglish ? "Replace" : "Remplacer",
        upload: isEnglish ? "Upload" : "Téléverser",
        required: "*",
      },
    },
    progress: {
      title: isEnglish ? "Progress" : "Progression",
      estimatedTime: isEnglish ? "Time remaining" : "Temps restant",
    },
    achievements: {
      title: isEnglish ? "Achievements" : "Réalisations",
    },
    domains: {
      tech: {
        title: isEnglish ? "Technology" : "Technologie",
        description: isEnglish ? "Tech solutions" : "Solutions tech",
        examples: isEnglish ? ["Blockchain", "AI", "Mobile"] : ["Blockchain", "IA", "Mobile"],
      },
      engagement: {
        title: isEnglish ? "Engagement" : "Engagement",
        description: isEnglish ? "Civic engagement" : "Engagement civique",
        examples: isEnglish ? ["Education", "Observation"] : ["Éducation", "Observation"],
      },
      media: {
        title: isEnglish ? "Media" : "Médias",
        description: isEnglish ? "Information" : "Information",
        examples: isEnglish ? ["Fact-checking", "Media"] : ["Fact-checking", "Médias"],
      },
      legal: {
        title: isEnglish ? "Legal" : "Juridique",
        description: isEnglish ? "Legal framework" : "Cadre juridique",
        examples: isEnglish ? ["Reforms", "Monitoring"] : ["Réformes", "Suivi"],
      },
    },
    technologies: {
      blockchain: {
        name: isEnglish ? "Blockchain" : "Blockchain",
        description: isEnglish ? "Security" : "Sécurité",
      },
      ai: {
        name: isEnglish ? "AI" : "IA",
        description: isEnglish ? "Analysis" : "Analyse",
      },
      mobile: {
        name: isEnglish ? "Mobile" : "Mobile",
        description: isEnglish ? "Accessibility" : "Accessibilité",
      },
      web: {
        name: isEnglish ? "Web" : "Web",
        description: isEnglish ? "Platforms" : "Plateformes",
      },
      security: {
        name: isEnglish ? "Security" : "Sécurité",
        description: isEnglish ? "Protection" : "Protection",
      },
      local: {
        name: isEnglish ? "Local" : "Local",
        description: isEnglish ? "Inclusion" : "Inclusion",
      },
    },
    skills: {
      technical: isEnglish
        ? ["Development", "Data", "Security", "UX/UI"]
        : ["Développement", "Données", "Sécurité", "UX/UI"],
      social: isEnglish
        ? ["Communication", "Community", "Training", "Mediation"]
        : ["Communication", "Communauté", "Formation", "Médiation"],
      field: isEnglish
        ? ["Observation", "Mobilization", "Research", "Advocacy"]
        : ["Observation", "Mobilisation", "Recherche", "Plaidoyer"],
      management: isEnglish
        ? ["Management", "Finance", "Legal", "Strategy"]
        : ["Gestion", "Finance", "Juridique", "Stratégie"],
    },
    documents: {
      registration: {
        name: isEnglish ? "Registration" : "Enregistrement",
        description: isEnglish ? "Official document" : "Document officiel",
      },
      cvs: {
        name: isEnglish ? "CVs" : "CVs",
        description: isEnglish ? "Team CVs" : "CVs de l'équipe",
      },
      project: {
        name: isEnglish ? "Project" : "Projet",
        description: isEnglish ? "Description" : "Description",
      },
      theory: {
        name: isEnglish ? "Theory" : "Théorie",
        description: isEnglish ? "Change theory" : "Théorie du changement",
      },
      budget: {
        name: isEnglish ? "Budget" : "Budget",
        description: isEnglish ? "Financial plan" : "Plan financier",
      },
    },
    countries: {
      [isEnglish ? "Senegal" : "Sénégal"]: {
        challenges: isEnglish ? ["Transparency", "Youth"] : ["Transparence", "Jeunesse"],
      },
      Mali: {
        challenges: isEnglish ? ["Stability", "Security"] : ["Stabilité", "Sécurité"],
      },
      Niger: {
        challenges: isEnglish ? ["Information", "Education"] : ["Information", "Éducation"],
      },
    },
  }
}
