
"use client"

import React from "react"
import WinnersShowcase from "@/components/winners-showcase"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Home, Clock } from "lucide-react"

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

export default function WinnersPage({ params }: PageProps) {
  const resolvedParams = React.use(params)
  const { t, isLoading } = useLanguage()

  const goToHome = () => {
    try {
      window.location.href = `/${resolvedParams.lang || 'fr'}`
    } catch (error) {
      console.error("Error going to home:", error)
    }
  }

  if (isLoading || !t) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
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

            {/* Section centrale avec logos - cachée sur mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Logo AfricTivistes à gauche */}
              <img
                src="/logo-africtivites.svg"
                alt="AfricTivistes"
                className="h-6 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
                }}
              />

              {/* Logo Digitalise Youth à droite */}
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
        </div>
      </div>

      {/* Main content */}
      <WinnersShowcase />

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
