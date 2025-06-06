"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { usePathname } from "next/navigation"

export default function LanguageSwitcher() {
  const { language, changeLanguage, availableLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = availableLanguages.find((lang) => lang?.code === language) || availableLanguages[0]

  // Fonction pour générer l'URL avec la nouvelle langue
  const getLanguageUrl = (lang: string) => {
    try {
      if (!pathname || typeof pathname !== "string") return `/${lang}`

      if (pathname.startsWith("/fr") || pathname.startsWith("/en")) {
        return `/${lang}${pathname.substring(3)}`
      }
      return `/${lang}${pathname}`
    } catch (error) {
      console.error("Error generating language URL:", error)
      return `/${lang}`
    }
  }

  // Fermer le menu lors du clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        if (dropdownRef.current && event.target && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      } catch (error) {
        console.error("Error in click outside handler:", error)
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Vérification supplémentaire pour éviter les erreurs
  const handleLanguageChange = (langCode: string) => {
    try {
      if (langCode && (langCode === "fr" || langCode === "en")) {
        changeLanguage(langCode as "fr" | "en")
        setIsOpen(false)
      }
    } catch (error) {
      console.error("Error changing language:", error)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 text-white hover:bg-white/10 transition-colors"
        onClick={(e) => {
          try {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(!isOpen)
          } catch (error) {
            console.error("Error toggling dropdown:", error)
          }
        }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLanguage?.flag || "🇫🇷"}</span>
        <span className="text-sm hidden sm:inline">{currentLanguage?.name || "Français"}</span>
        <ChevronDown className="w-3 h-3" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50 min-w-[120px]">
          {availableLanguages.map((lang) => {
            if (!lang || !lang.code) return null

            return (
              <button
                key={lang.code}
                className={`
                  w-full px-4 py-2 text-left text-sm transition-colors
                  hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg
                  flex items-center space-x-2
                  ${language === lang.code ? "bg-white/20 text-white" : "text-blue-200"}
                `}
                onClick={(e) => {
                  try {
                    e.preventDefault()
                    e.stopPropagation()
                    handleLanguageChange(lang.code)
                  } catch (error) {
                    console.error("Error in language button click:", error)
                  }
                }}
              >
                <span>{lang.flag || "🏳️"}</span>
                <span>{lang.name || lang.code}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
