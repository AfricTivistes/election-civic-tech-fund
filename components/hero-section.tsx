"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Globe, Zap, Heart, ArrowRight, Target, Users, TrendingUp, Vote, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"
import FormGuide from "@/components/form-guide"

interface HeroSectionProps {
  onStart: () => void
}

const africanCountries = [
  {
    name: "Sénégal",
    flag: "🇸🇳",
    x: "15%",
    y: "25%",
    population: "17.2M",
    democraticIndex: "6.2/10",
    challenges: ["Transparence électorale", "Participation jeunesse"],
    countryCode: "sn",
  },
  {
    name: "Mali",
    flag: "🇲🇱",
    x: "25%",
    y: "35%",
    population: "21.9M",
    democraticIndex: "4.1/10",
    challenges: ["Stabilité politique", "Sécurité électorale"],
    countryCode: "ml",
  },
  {
    name: "Niger",
    flag: "🇳🇪",
    x: "45%",
    y: "20%",
    population: "25.1M",
    democraticIndex: "4.5/10",
    challenges: ["Accès à l'information", "Éducation civique"],
    countryCode: "ne",
  },
  {
    name: "Tchad",
    flag: "🇹🇩",
    x: "65%",
    y: "30%",
    population: "16.8M",
    democraticIndex: "3.8/10",
    challenges: ["Transition démocratique", "Institutions électorales"],
    countryCode: "td",
  },
  {
    name: "Soudan",
    flag: "🇸🇩",
    x: "75%",
    y: "15%",
    population: "44.9M",
    democraticIndex: "2.3/10",
    challenges: ["Reconstruction démocratique", "Paix civile"],
    countryCode: "sd",
  },
  {
    name: "Éthiopie",
    flag: "🇪🇹",
    x: "85%",
    y: "45%",
    population: "117.9M",
    democraticIndex: "3.4/10",
    challenges: ["Unité nationale", "Processus électoral inclusif"],
    countryCode: "et",
  },
  {
    name: "Cameroun",
    flag: "🇨🇲",
    x: "35%",
    y: "65%",
    population: "27.2M",
    democraticIndex: "3.2/10",
    challenges: ["Alternance politique", "Dialogue national"],
    countryCode: "cm",
  },
  {
    name: "Bénin",
    flag: "🇧🇯",
    x: "20%",
    y: "70%",
    population: "12.5M",
    democraticIndex: "5.8/10",
    challenges: ["Consolidation démocratique", "Participation citoyenne"],
    countryCode: "bj",
  },
  {
    name: "Togo",
    flag: "🇹🇬",
    x: "15%",
    y: "55%",
    population: "8.3M",
    democraticIndex: "4.7/10",
    challenges: ["Réformes constitutionnelles", "Société civile"],
    countryCode: "tg",
  },
  {
    name: "Burkina Faso",
    flag: "🇧🇫",
    x: "10%",
    y: "45%",
    population: "22.7M",
    democraticIndex: "4.4/10",
    challenges: ["Sécurité électorale", "Cohésion sociale"],
    countryCode: "bf",
  },
  {
    name: "Guinée",
    flag: "🇬🇳",
    x: "5%",
    y: "60%",
    population: "13.5M",
    democraticIndex: "3.9/10",
    challenges: ["Transition politique", "Réconciliation nationale"],
    countryCode: "gn",
  },
  {
    name: "Mauritanie",
    flag: "🇲🇷",
    x: "8%",
    y: "15%",
    population: "4.8M",
    democraticIndex: "4.2/10",
    challenges: ["Inclusion sociale", "Modernisation électorale"],
    countryCode: "mr",
  },
  {
    name: "Soudan du Sud",
    flag: "🇸🇸",
    x: "70%",
    y: "55%",
    population: "11.4M",
    democraticIndex: "2.1/10",
    challenges: ["Construction étatique", "Processus de paix"],
    countryCode: "ss",
  },
  {
    name: "Somalie",
    flag: "🇸🇴",
    x: "90%",
    y: "65%",
    population: "16.4M",
    democraticIndex: "1.8/10",
    challenges: ["Reconstruction institutionnelle", "Sécurité"],
    countryCode: "so",
  },
]

export default function HeroSection({ onStart }: HeroSectionProps) {
  const [selectedCountry, setSelectedCountry] = useState<(typeof africanCountries)[0] | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCountryClick = (country: (typeof africanCountries)[0]) => {
    try {
      if (!country || !mounted) return
      setSelectedCountry(country)
    } catch (error) {
      console.error("Error selecting country:", error)
    }
  }

  const handleCountryHover = (countryName: string | null) => {
    try {
      if (!mounted) return
      setHoveredCountry(countryName)
    } catch (error) {
      console.error("Error hovering country:", error)
    }
  }

  const handleCloseCountry = () => {
    try {
      if (!mounted) return
      setSelectedCountry(null)
    } catch (error) {
      console.error("Error closing country:", error)
    }
  }

  const handleStartClick = () => {
    try {
      if (!mounted || typeof onStart !== "function") return
      onStart()
    } catch (error) {
      console.error("Error starting:", error)
    }
  }

  const handleGuideOpen = () => {
    try {
      if (!mounted) return
      setIsGuideOpen(true)
    } catch (error) {
      console.error("Error opening guide:", error)
    }
  }

  const handleGuideClose = () => {
    try {
      if (!mounted) return
      setIsGuideOpen(false)
    } catch (error) {
      console.error("Error closing guide:", error)
    }
  }

  if (!mounted || !t) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header avec logos */}
        <div className="text-center mb-12 relative animate-fade-in">
          {/* Logo AfricTivites en haut à gauche */}
          <div className="absolute top-0 left-0">
            <img
              src="/logo-africtivites.svg"
              alt="AfricTivites - Activisme numérique pour l'Afrique"
              className="h-12 w-auto opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
              }}
              onError={() => {
                console.error("Error loading image")
              }}
            />
          </div>

          {/* Logo Digitalise Youth en haut à droite */}
          <div className="absolute top-0 right-0">
            <img
              src="/partners/digitalise-youth.webp"
              alt="Digitalise Youth"
              className="h-12 w-auto opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
              onError={() => {
                console.error("Error loading image")
              }}
            />
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              <img
                src="/Logo Fonds Election Civic Tech Fund.svg"
                alt="Election Civic Tech Fund - Logo avec continent africain"
                className="h-32 w-auto relative z-10 drop-shadow-lg"
                style={{ filter: "brightness(1.2) contrast(1.1)" }}
                onError={() => {
                  console.error("Error loading image")
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-2xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
            {t?.hero?.title || "ELECTION CIVIC TECH FUND"}
          </h1>

          <div className="flex justify-center items-center space-x-4 text-xl text-blue-200 mb-8">
            <Badge variant="outline" className="border-yellow-400 text-yellow-400 px-4 py-2">
              175 000€
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="border-blue-400 text-blue-400 px-4 py-2">
              14 Pays
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="border-green-400 text-green-400 px-4 py-2">
              ∞ Possibilités
            </Badge>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Description */}
          <div className="space-y-8 animate-slide-in-left">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Digital Democracy for Election</h2>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed mb-6">
                  {t?.hero?.description || ""}
                </p>
                <p className="text-blue-200 text-base leading-relaxed mb-4 border-l-4 border-yellow-400 pl-4 bg-white/5 rounded-r-lg py-3">
                  {t?.hero?.platformDescription || "Cette plateforme est conçue comme un outil interactif pour faciliter votre candidature. Ce présent appel à projets vous invite à proposer vos idées innovantes à travers quatre étapes clés."}
                </p>
                <p className="text-blue-200 mb-6">{t?.hero?.secondDescription || ""}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-green-300">
                    <Target className="w-5 h-5 mr-2" />
                    <span>{t?.hero?.features?.innovation || "Innovation"}</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Globe className="w-5 h-5 mr-2" />
                    <span>{t?.hero?.features?.impact || "Impact"}</span>
                  </div>
                  <div className="flex items-center text-yellow-300">
                    <Zap className="w-5 h-5 mr-2" />
                    <span>{t?.hero?.features?.solutions || "Solutions"}</span>
                  </div>
                  <div className="flex items-center text-pink-300">
                    <Heart className="w-5 h-5 mr-2" />
                    <span>{t?.hero?.features?.democracy || "Démocratie"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="hover:scale-105 transition-transform duration-300">
              <Button
                onClick={handleStartClick}
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-6 text-xl relative overflow-hidden group"
              >
                <span className="relative flex items-center justify-center">
                  {t?.hero?.startButton || "Commencer"}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </span>
              </Button>
            </div>
          </div>

          {/* Right side - Pays Cibles avec Drapeaux */}
          <div className="space-y-6 animate-slide-in-right">
            <Card className="bg-gradient-to-br from-slate-800/90 via-blue-900/80 to-slate-800/90 backdrop-blur-md border-yellow-400/30 p-4 md:p-6 shadow-xl">
              <h3 className="text-xl md:text-2xl font-bold text-yellow-100 mb-4 md:mb-6 text-center flex items-center justify-center">
                <Globe className="w-5 md:w-6 h-5 md:h-6 mr-2 text-yellow-400" />
                {t?.countries?.title || "Pays Cibles du Fonds"}
              </h3>

              {/* Zone des drapeaux avec fond dégradé */}
              <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-slate-700/80 via-blue-800/60 to-slate-800/80 rounded-xl overflow-hidden border border-yellow-400/40 shadow-inner">
                {/* Effet de particules subtiles */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`map-particle-${i}`}
                      className="absolute w-1 h-1 bg-blue-300/30 rounded-full animate-pulse"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Drapeaux des pays dans des cercles dorés */}
                {africanCountries.map((country, index) => {
                  if (!country || !country.name || !country.flag) return null

                  return (
                    <div
                      key={`country-${country.countryCode || index}`}
                      className="absolute cursor-pointer group animate-float"
                      style={{
                        left: country.x || "50%",
                        top: country.y || "50%",
                        transform: "translate(-50%, -50%)",
                        animationDelay: `${index * 0.2}s`,
                      }}
                      onMouseEnter={() => handleCountryHover(country.name)}
                      onMouseLeave={() => handleCountryHover(null)}
                      onClick={() => handleCountryClick(country)}
                    >
                      <div className="relative hover:scale-120 transition-transform duration-300">
                        {/* Cercle doré avec drapeau */}
                        <div
                          className={`
                            w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-2xl
                            bg-gradient-to-br from-yellow-400 to-yellow-600 
                            border-2 border-yellow-300 shadow-lg
                            transition-all duration-300
                            ${
                              hoveredCountry === country.name
                                ? "shadow-yellow-400/50 shadow-xl border-yellow-200"
                                : "shadow-yellow-400/30"
                            }
                          `}
                        >
                          {country.flag}
                        </div>

                        {/* Tooltip nom du pays */}
                        <div
                          className={`
                            absolute top-16 left-1/2 transform -translate-x-1/2 
                            bg-black/90 text-white px-3 py-1 rounded-lg text-sm 
                            whitespace-nowrap border border-yellow-400/30 z-10
                            transition-all duration-300
                            ${hoveredCountry === country.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                          `}
                        >
                          <div className="font-semibold">{country.name}</div>
                          <div
                            className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                                        w-2 h-2 bg-black/90 rotate-45 border-l border-t border-yellow-400/30"
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 text-center">
                <p className="text-yellow-200 text-sm flex items-center justify-center font-medium">
                  <Target className="w-4 h-4 mr-2 text-yellow-400" />
                  {t?.countries?.clickInstruction || "Cliquez sur un pays pour découvrir ses défis démocratiques"}
                </p>
              </div>
            </Card>

            {/* Panel détaillé du pays sélectionné */}
            {selectedCountry && selectedCountry.challenges && Array.isArray(selectedCountry.challenges) && (
              <div className="animate-fade-in">
                <Card className="bg-gradient-to-br from-slate-800/95 via-blue-900/90 to-slate-800/95 border-blue-400/40 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 
                                        flex items-center justify-center text-2xl mr-3 border-2 border-blue-300 shadow-lg"
                        >
                          {selectedCountry.flag}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">
                            {t?.countries?.countryNames?.[selectedCountry.name] || selectedCountry.name}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-blue-200">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {selectedCountry.population}
                            </span>
                            <span className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              {selectedCountry.democraticIndex}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCloseCountry}
                        className="text-white hover:bg-white/10"
                      >
                        ✕
                      </Button>
                    </div>

                    <div>
                      <h5 className="font-semibold text-white mb-3 flex items-center">
                        <Vote className="w-4 h-4 mr-2" />
                        {t?.countries?.challengesTitle || "Défis Démocratiques Prioritaires"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {(() => {
                          // Get translated challenges based on current language
                          const countryKey = selectedCountry.name === "Sénégal" ? "Sénégal" : selectedCountry.name;
                          const translatedChallenges = t?.countries?.[countryKey]?.challenges || selectedCountry.challenges;
                          
                          return translatedChallenges.map((challenge, index) => (
                            <Badge
                              key={`challenge-${index}`}
                              variant="outline"
                              className="border-blue-400/60 text-blue-200 bg-blue-900/30 text-xs font-medium"
                            >
                              {challenge}
                            </Badge>
                          ));
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{t?.hero?.stats?.majorProjects || "4-6"}</div>
              <div className="text-white">{t?.hero?.stats?.majorProjectsDesc || "Projets Majeurs"}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">{t?.hero?.stats?.microGrants || "10+"}</div>
              <div className="text-white">{t?.hero?.stats?.microGrantsDesc || "Micro-subventions"}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">{t?.hero?.stats?.support || "10"}</div>
              <div className="text-white">{t?.hero?.stats?.supportDesc || "Mois d'accompagnement"}</div>
            </CardContent>
          </Card>
        </div>

        {/* Section Guide - Repositionnée et redesignée */}
        <div className="mt-20 animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
              {t?.hero?.guide?.title || "🚀 Prêt à Transformer la Démocratie ?"}
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              {t?.hero?.guide?.subtitle || "Consultez notre guide expert pour maximiser vos chances de succès"}
            </p>
          </div>

          <div className="relative">
            {/* Effet de glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/20 to-yellow-400/10 blur-3xl rounded-3xl"></div>

            <Card className="relative bg-gradient-to-br from-slate-800/90 via-blue-900/80 to-slate-800/90 border border-yellow-400/30 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Côté gauche - Vidéo YouTube */}
                  <div className="relative p-4 md:p-8 bg-gradient-to-br from-yellow-400/20 to-orange-500/30 flex flex-col justify-center">
                    <div className="relative w-full h-full min-h-[250px] md:min-h-[400px] rounded-xl overflow-hidden shadow-2xl">
                      {/* YouTube iframe */}
                      <iframe
                        src="https://www.youtube.com/embed/u3U9R9Bwp14"
                        title="Guide Vidéo : Comment Réussir sa Candidature"
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />

                      {/* Overlay avec titre de la vidéo */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h4 className="text-white font-semibold text-lg mb-1">
                          {t?.hero?.guide?.videoTitle || "Guide Vidéo : Comment Réussir sa Candidature"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {t?.hero?.guide?.videoDescription || "Découvrez les secrets d'un dossier gagnant"}
                        </p>
                      </div>

                      {/* Effet de particules dans la zone vidéo - réduit pour ne pas gêner */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={`video-particle-${i}`}
                            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.5}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Côté droit - Contenu et CTA */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-white mb-3">
                        {t?.hero?.guide?.description?.title || "Découvrez ce qui vous attend"}
                      </h4>
                      <p className="text-blue-200 leading-relaxed mb-4">
                        {t?.hero?.guide?.description?.content ||
                          "Notre guide interactif vous accompagne étape par étape pour construire un dossier parfait. Préparez-vous efficacement et évitez les erreurs courantes."}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="text-sm font-medium text-white">
                            {t?.hero?.guide?.features?.practicalTips || "✨ Conseils pratiques"}
                          </div>
                          <div className="text-xs text-blue-300">
                            {t?.hero?.guide?.features?.practicalTipsDesc || "Pour chaque section"}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="text-sm font-medium text-white">
                            {t?.hero?.guide?.features?.checklists || "📋 Listes de vérification"}
                          </div>
                          <div className="text-xs text-blue-300">
                            {t?.hero?.guide?.features?.checklistsDesc || "Documents requis"}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="text-sm font-medium text-white">
                            {t?.hero?.guide?.features?.faq || "❓ FAQ détaillée"}
                          </div>
                          <div className="text-xs text-blue-300">
                            {t?.hero?.guide?.features?.faqDesc || "Réponses aux questions"}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <div className="text-sm font-medium text-white">
                            {t?.hero?.guide?.features?.strategies || "🎯 Stratégies gagnantes"}
                          </div>
                          <div className="text-xs text-blue-300">
                            {t?.hero?.guide?.features?.strategiesDesc || "Maximisez vos chances"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleGuideOpen}
                      size="lg"
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      {t?.hero?.guide?.accessButton || "Accéder au Guide Complet"}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {mounted && <FormGuide isOpen={isGuideOpen} onClose={handleGuideClose} />}
    </div>
  )
}