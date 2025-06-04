"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Globe, Zap, Heart, ArrowRight, Target, Users, TrendingUp, Vote, Link2 } from "lucide-react"
import { useState } from "react"

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

const partners = [
  {
    name: "Norway",
    logo: "/partners/norway-logo.png",
    description: "Gouvernement de Norvège",
    category: "institutional",
  },
  {
    name: "European Union",
    logo: "/partners/eu-logo.webp",
    description: "Union Européenne",
    category: "institutional",
  },
  {
    name: "Ministry of Foreign Affairs of Denmark",
    logo: "/partners/ministry-denmark.png",
    description: "Ministère des Affaires Étrangères du Danemark",
    category: "institutional",
  },
  {
    name: "Digital Democracy Initiative",
    logo: "/partners/ddi-logo.jpeg",
    description: "Initiative pour la Démocratie Numérique",
    category: "organization",
  },
  {
    name: "Digitalise Youth",
    logo: "/partners/digitalise-youth.webp",
    description: "Digitalisation de la Jeunesse",
    category: "organization",
  },
  {
    name: "AHEAD Africa",
    logo: "/partners/ahead-africa.webp",
    description: "Avancement de l'Afrique",
    category: "organization",
  },
]

export default function HeroSection({ onStart }: HeroSectionProps) {
  const [selectedCountry, setSelectedCountry] = useState<(typeof africanCountries)[0] | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const handleCountryClick = (country: (typeof africanCountries)[0]) => {
    try {
      setSelectedCountry(country)
    } catch (error) {
      console.error("Error selecting country:", error)
    }
  }

  const handleCountryHover = (countryName: string | null) => {
    try {
      setHoveredCountry(countryName)
    } catch (error) {
      console.error("Error hovering country:", error)
    }
  }

  const handleCloseCountry = () => {
    try {
      setSelectedCountry(null)
    } catch (error) {
      console.error("Error closing country:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              <img
                src="/logo-ectf.png"
                alt="Election Civic Tech Fund - Logo avec continent africain"
                className="h-32 w-auto relative z-10 drop-shadow-lg"
                style={{ filter: "brightness(1.2) contrast(1.1)" }}
                onError={(e) => {
                  console.error("Error loading logo:", e)
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-2xl animate-pulse"></div>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            ELECTION CIVIC TECH FUND
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center space-x-4 text-xl text-blue-200 mb-8"
          >
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
          </motion.div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-8"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Digital Democracy Journey</h2>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed mb-6">
                  <strong>Election Civic Tech Fund</strong> n'est pas un simple appel à projets. C'est une opportunité
                  unique de transformer votre vision citoyenne en un outil technologique au service de la démocratie en
                  Afrique.
                </p>
                <p className="text-blue-200 mb-6">
                  Ce formulaire est conçu comme un <strong>voyage interactif</strong> : à travers quatre étapes clés,
                  vous allez façonner un dossier vivant, évolutif, et profondément connecté aux réalités panafricaines.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-green-300">
                    <Target className="w-5 h-5 mr-2" />
                    <span>Innovation Technologique</span>
                  </div>
                  <div className="flex items-center text-blue-300">
                    <Globe className="w-5 h-5 mr-2" />
                    <span>Impact Panafricain</span>
                  </div>
                  <div className="flex items-center text-yellow-300">
                    <Zap className="w-5 h-5 mr-2" />
                    <span>Solutions Citoyennes</span>
                  </div>
                  <div className="flex items-center text-pink-300">
                    <Heart className="w-5 h-5 mr-2" />
                    <span>Démocratie Inclusive</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onStart}
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-6 text-xl relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center justify-center">
                  Transformer la Démocratie Africaine
                  <ArrowRight className="ml-2 w-6 h-6" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Pays Cibles avec Drapeaux */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="space-y-6"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <Globe className="w-6 h-6 mr-2" />
                Pays Cibles du Fonds
              </h3>

              {/* Zone des drapeaux avec fond dégradé */}
              <div className="relative w-full h-80 bg-gradient-to-br from-blue-800/60 via-blue-700/40 to-blue-900/60 rounded-xl overflow-hidden border border-blue-400/20">
                {/* Effet de particules subtiles */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`map-particle-${i}`}
                      className="absolute w-1 h-1 bg-blue-300/30 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                      }}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Drapeaux des pays dans des cercles dorés */}
                {africanCountries.map((country, index) => (
                  <motion.div
                    key={`country-${country.countryCode}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 1.2 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="absolute cursor-pointer group"
                    style={{
                      left: country.x,
                      top: country.y,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => handleCountryHover(country.name)}
                    onMouseLeave={() => handleCountryHover(null)}
                    onClick={() => handleCountryClick(country)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        y: [0, -3, 0],
                        rotate: [0, index % 2 === 0 ? 2 : -2, 0],
                      }}
                      transition={{
                        duration: 3 + (index % 3),
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                      className="relative"
                    >
                      {/* Cercle doré avec drapeau */}
                      <div
                        className={`
                          w-14 h-14 rounded-full flex items-center justify-center text-2xl
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

                      {/* Effet de pulse au survol */}
                      {hoveredCountry === country.name && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-yellow-300"
                          animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      )}

                      {/* Effet de brillance subtil */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-yellow-300/20"
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 2 + (index % 4),
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }}
                      />

                      {/* Tooltip nom du pays */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{
                          opacity: hoveredCountry === country.name ? 1 : 0,
                          y: hoveredCountry === country.name ? -25 : 10,
                          scale: hoveredCountry === country.name ? 1 : 0.8,
                        }}
                        className="absolute top-16 left-1/2 transform -translate-x-1/2 
                                 bg-black/90 text-white px-3 py-1 rounded-lg text-sm 
                                 whitespace-nowrap border border-yellow-400/30 z-10"
                      >
                        <div className="font-semibold">{country.name}</div>
                        <div
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                                      w-2 h-2 bg-black/90 rotate-45 border-l border-t border-yellow-400/30"
                        ></div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Lignes de connexion subtiles entre pays */}
                <svg className="absolute inset-0 w-full h-full z-0 opacity-30">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(250, 204, 21, 0.2)" />
                      <stop offset="50%" stopColor="rgba(250, 204, 21, 0.6)" />
                      <stop offset="100%" stopColor="rgba(250, 204, 21, 0.2)" />
                    </linearGradient>
                  </defs>

                  {/* Quelques connexions stratégiques entre pays */}
                  {[
                    { from: "Sénégal", to: "Mali" },
                    { from: "Mali", to: "Niger" },
                    { from: "Niger", to: "Tchad" },
                    { from: "Tchad", to: "Soudan" },
                    { from: "Soudan", to: "Éthiopie" },
                    { from: "Cameroun", to: "Tchad" },
                    { from: "Bénin", to: "Togo" },
                    { from: "Togo", to: "Burkina Faso" },
                    { from: "Burkina Faso", to: "Mali" },
                    { from: "Guinée", to: "Sénégal" },
                  ].map((connection, index) => {
                    const fromCountry = africanCountries.find((c) => c.name === connection.from)
                    const toCountry = africanCountries.find((c) => c.name === connection.to)

                    if (!fromCountry || !toCountry) return null

                    const fromX = Number.parseFloat(fromCountry.x)
                    const fromY = Number.parseFloat(fromCountry.y)
                    const toX = Number.parseFloat(toCountry.x)
                    const toY = Number.parseFloat(toCountry.y)

                    return (
                      <motion.path
                        key={`connection-${index}`}
                        d={`M ${fromX}% ${fromY}% Q ${(fromX + toX) / 2 + (Math.random() * 5 - 2.5)}% ${
                          (fromY + toY) / 2 + (Math.random() * 5 - 2.5)
                        }%, ${toX}% ${toY}%`}
                        stroke="url(#connectionGradient)"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: 0.6,
                          strokeDashoffset: [0, -20],
                        }}
                        transition={{
                          pathLength: { delay: 2 + index * 0.2, duration: 1.5, ease: "easeInOut" },
                          opacity: { delay: 2 + index * 0.2, duration: 1 },
                          strokeDashoffset: {
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 3 + (index % 3),
                            ease: "linear",
                            repeatType: "loop",
                          },
                        }}
                        strokeDasharray="5,5"
                      />
                    )
                  })}
                </svg>
              </div>

              <div className="mt-4 text-center">
                <p className="text-blue-200 text-sm flex items-center justify-center">
                  <Target className="w-4 h-4 mr-2" />
                  Cliquez sur un pays pour découvrir ses défis démocratiques
                </p>
              </div>
            </Card>

            {/* Panel détaillé du pays sélectionné */}
            {selectedCountry && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <Card className="bg-gradient-to-br from-yellow-400/10 to-blue-400/10 border-yellow-400/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 
                                        flex items-center justify-center text-2xl mr-3 border-2 border-yellow-300"
                        >
                          {selectedCountry.flag}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{selectedCountry.name}</h4>
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
                        Défis Démocratiques Prioritaires
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedCountry.challenges.map((challenge, index) => (
                          <Badge
                            key={`challenge-${index}`}
                            variant="outline"
                            className="border-yellow-400/50 text-yellow-300 text-xs"
                          >
                            {challenge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">4-6</div>
              <div className="text-white">Projets Majeurs</div>
              <div className="text-blue-200 text-sm">25 000€ maximum</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">10+</div>
              <div className="text-white">Micro-subventions</div>
              <div className="text-blue-200 text-sm">10 000€ minimum</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">10</div>
              <div className="text-white">Mois d'accompagnement</div>
              <div className="text-blue-200 text-sm">Formation & suivi</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section Partenaires */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-20"
        >
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                  <Link2 className="w-6 h-6 mr-2" />
                  Nos Partenaires Stratégiques
                </h3>
                <p className="text-blue-200">
                  Une coalition internationale pour renforcer la démocratie numérique en Afrique
                </p>
              </div>

              {/* Logos des partenaires */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                {partners.map((partner, index) => (
                  <motion.div
                    key={`partner-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 2.2 + index * 0.1,
                      duration: 0.5,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative p-4 bg-white/10 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="w-full h-16 object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
                        onError={(e) => {
                          console.error("Error loading partner logo:", e)
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=64&width=120&text=" + encodeURIComponent(partner.name)
                        }}
                      />

                      {/* Tooltip au survol */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        whileHover={{ opacity: 1, y: -10, scale: 1 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                                   bg-black/90 text-white px-3 py-2 rounded-lg text-sm 
                                   whitespace-nowrap border border-white/30 z-20 pointer-events-none"
                      >
                        <div className="font-semibold">{partner.name}</div>
                        <div className="text-xs text-gray-300">{partner.description}</div>
                        <div
                          className="absolute top-full left-1/2 transform -translate-x-1/2 
                                      w-2 h-2 bg-black/90 rotate-45 border-r border-b border-white/30"
                        ></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message de remerciement */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="mt-8 text-center"
              >
                <p className="text-blue-200 text-sm italic">
                  "Ensemble, nous construisons l'avenir démocratique de l'Afrique grâce à l'innovation technologique"
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 }}
              className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src="/logo-africtivites.svg"
                  alt="AfricTivites - Activisme numérique pour l'Afrique"
                  className="h-8 w-auto opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
                  }}
                  onError={(e) => {
                    console.error("Error loading AfricTivites logo:", e)
                    // Fallback to placeholder if SVG fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = "flex"
                  }}
                />
                <div
                  className="h-8 w-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full items-center justify-center hidden"
                  style={{ display: "none" }}
                >
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="text-sm text-blue-200">
                  <p className="font-medium">Propulsé par AfricTivites</p>
                  <p className="text-xs text-blue-300">Activisme numérique pour une Afrique démocratique</p>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-sm text-blue-200">© 2024 Election Civic Tech Fund - AfricTivites</p>
                <p className="text-xs text-blue-300 mt-1">
                  Ensemble, nous construisons l'avenir démocratique de l'Afrique
                </p>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  )
}
