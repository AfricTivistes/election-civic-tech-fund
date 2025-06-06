"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { translations, type Translation } from "@/lib/translations"

type Language = "fr" | "en"

export function useLanguage() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState<Language>("en")

  // Détecter la langue actuelle à partir de l'URL
  useEffect(() => {
    let isMounted = true

    try {
      const detectLanguage = (): Language => {
        // Vérifier si pathname est défini et valide
        if (pathname && typeof pathname === "string" && pathname.length > 0) {
          if (pathname.startsWith("/en")) return "en"
          if (pathname.startsWith("/fr")) return "fr"
        }

        // Vérifier localStorage seulement côté client
        if (typeof window !== "undefined") {
          try {
            const savedLanguage = localStorage.getItem("ectf-language")
            if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
              return savedLanguage as Language
            }
          } catch (error) {
            console.warn("Error accessing localStorage:", error)
          }

          // Détecter la langue du navigateur côté client comme fallback
          try {
            const browserLang = navigator.language.split("-")[0].toLowerCase()
            if (browserLang === "fr") {
              console.log("Browser language detected as French")
              return "fr"
            }
          } catch (error) {
            console.warn("Error detecting browser language:", error)
          }
        }

        return "en" // Par défaut anglais
      }

      const detectedLanguage = detectLanguage()

      if (isMounted) {
        setLanguage(detectedLanguage)
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error in language detection:", error)
      if (isMounted) {
        setLanguage("en") // Fallback vers anglais
        setIsLoading(false)
      }
    }

    return () => {
      isMounted = false
    }
  }, [pathname])

  // Changer de langue en naviguant vers la nouvelle URL
  const changeLanguage = (newLanguage: Language) => {
    try {
      if (!newLanguage || (newLanguage !== "fr" && newLanguage !== "en")) {
        console.warn("Invalid language:", newLanguage)
        return
      }

      if (typeof window === "undefined") return

      // Sauvegarder la préférence dans localStorage
      try {
        localStorage.setItem("ectf-language", newLanguage)
      } catch (error) {
        console.warn("Error saving to localStorage:", error)
      }

      setLanguage(newLanguage)

      // Construire la nouvelle URL avec la langue sélectionnée
      if (!pathname || typeof pathname !== "string") {
        router.push(`/${newLanguage}`)
        return
      }

      // Remplacer le préfixe de langue actuel ou ajouter un nouveau
      let newPath = pathname
      if (newPath.startsWith("/fr") || newPath.startsWith("/en")) {
        newPath = `/${newLanguage}${newPath.substring(3)}`
      } else {
        newPath = `/${newLanguage}${newPath}`
      }

      // Naviguer vers la nouvelle URL
      router.push(newPath)
    } catch (error) {
      console.error("Error changing language:", error)
    }
  }

  // Assurons-nous que t est toujours un objet valide avec une structure complète
  const getTranslation = (): Translation => {
    try {
      if (!translations || typeof translations !== "object") {
        console.error("Translations object is not available")
        return createFallbackTranslation()
      }

      const translation = translations[language]
      if (translation && typeof translation === "object") {
        return translation
      }

      // Fallback vers anglais si la langue actuelle n'est pas disponible
      const fallbackTranslation = translations.en || translations.fr
      if (fallbackTranslation && typeof fallbackTranslation === "object") {
        return fallbackTranslation
      }

      console.error("No valid translation found")
      return createFallbackTranslation()
    } catch (error) {
      console.error("Error getting translation:", error)
      return createFallbackTranslation()
    }
  }

  // Créer une traduction de fallback en cas d'erreur
  const createFallbackTranslation = (): Translation => {
    return {
      header: {
        title: "Election Civic Tech Fund",
        subtitle: "Digital Democracy Journey",
        estimatedTime: "Estimated time",
        funding: "€175,000 • 14 Countries",
        possibilities: "∞ Possibilities",
        homeButton: "Home",
      },
      hero: {
        title: "Election Civic Tech Fund",
        subtitle: "Transform African democracy with technology",
        description: "Join the movement for a more inclusive and transparent democracy in Africa",
        startButton: "Start my application",
        features: {
          funding: "€175,000",
          countries: "14 Countries",
          possibilities: "∞ Possibilities",
        },
        footer: {
          ledBy: "Led by",
          poweredBy: "Powered by",
          projectDescription: "An initiative to strengthen democracy in Africa through civic technology",
          copyright: "© 2024 Election Civic Tech Fund - AfricTivistes",
          tagline: "Together, we build Africa's democratic future",
        },
      },
      steps: {
        step1: {
          title: "Your Democratic Vision",
          description: "Describe your ambition to transform democracy",
          expertTip: { title: "Expert Tip", content: "Be precise and concrete in your vision." },
        },
        step2: {
          title: "The Technological Impact",
          description: "Model your technological solution",
          expertTip: { title: "Expert Tip", content: "Choose appropriate technologies." },
        },
        step3: {
          title: "Your Citizen Team",
          description: "Present the actors of your project",
          expertTip: { title: "Expert Tip", content: "Build a diverse team." },
        },
        step4: {
          title: "Your Digital Arsenal",
          description: "Upload your supporting documents",
          expertTip: { title: "Expert Tip", content: "Ensure documents are in PDF format." },
          completionScore: "Completion Score",
          completionText: "Your application is",
          readySubmission: "Ready for submission",
          requiredDocs: "Required Documents",
          aiDescription: "Our AI automatically verifies your documents",
          required: "*",
          uploaded: "Uploaded",
          replace: "Replace",
          upload: "Upload",
          projectSummary: "Project Summary",
          vision: "Vision",
          domain: "Domain",
          technologies: "Technologies",
          team: "Team",
          notProvided: "Not provided",
          notSelected: "Not selected",
          notSelectedTech: "Not selected",
          members: "members",
          prevButton: "Previous",
          submitButton: "Submit",
          submitting: "Submitting...",
          completionMessage: "Complete your application to submit",
        },
      },
      documents: {
        registration: { name: "Registration certificate", description: "Official registration document" },
        cvs: { name: "Team CVs", description: "Curriculum vitae of key team members" },
        project: { name: "Project description", description: "Detailed project description" },
        theory: { name: "Theory of change", description: "Your theoretical approach" },
        budget: { name: "Detailed budget", description: "Complete financial breakdown" },
      },
      achievements: {
        title: "Achievements",
      },
    }
  }

  const t: Translation = getTranslation()

  return {
    language,
    changeLanguage,
    t,
    isLoading,
    availableLanguages: [
      { code: "en" as Language, name: "English", flag: "🇬🇧" },
      { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
    ],
  }
}
