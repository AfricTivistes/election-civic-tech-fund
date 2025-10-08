"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Award, 
  Globe, 
  Users, 
  Sparkles, 
  Target, 
  TrendingUp,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Heart,
  Zap,
  Image as ImageIcon
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

interface Winner {
  id: string
  projectName: string
  organization: string
  country: string
  countryFlag: string
  category: "major" | "micro"
  amount: number
  domain: string
  description: string
  impact: string
  technologies: string[]
  teamSize: number
  website?: string
  logo?: string
  projectImage?: string
  selectedDate: string
}

// Données des bénéficiaires
const winners: Winner[] = [
  {
    id: "1",
    projectName: "Electoral Fact-Checking Initiative South Sudan",
    organization: "Excellence Foundation for South Sudan",
    country: "Soudan du Sud",
    countryFlag: "🇸🇸",
    category: "major",
    amount: 25000,
    domain: "Fact-checking électoral",
    description: "Initiative de vérification des faits électoraux pour renforcer l'intégrité du processus démocratique",
    impact: "Améliorer la transparence électorale au Soudan du Sud",
    technologies: ["Fact-checking", "Digital Tools", "Media Literacy"],
    teamSize: 4,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "2",
    projectName: "Vigilant Civic Voice",
    organization: "Association des blogueurs du Bénin",
    country: "Bénin",
    countryFlag: "🇧🇯",
    category: "major",
    amount: 25000,
    domain: "Voix citoyenne vigilante",
    description: "Plateforme de surveillance citoyenne pour renforcer la participation démocratique",
    impact: "Mobiliser la société civile béninoise pour des élections transparentes",
    technologies: ["Social Media", "Citizen Monitoring", "Digital Advocacy"],
    teamSize: 5,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "3",
    projectName: "MyAIFactChecker Cameroon",
    organization: "Brain Builders Youth Development Initiative",
    country: "Cameroun",
    countryFlag: "🇨🇲",
    category: "major",
    amount: 25000,
    domain: "Intelligence artificielle pour l'intégrité électorale",
    description: "Outil de fact-checking propulsé par l'IA et éducation civique pour renforcer l'intégrité électorale",
    impact: "Combattre la désinformation électorale au Cameroun",
    technologies: ["AI/ML", "Fact-checking", "Civic Education"],
    teamSize: 6,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "4",
    projectName: "Plateforme électorale citoyenne du Sénégal",
    organization: "Vie Publique Sénégal",
    country: "Sénégal",
    countryFlag: "🇸🇳",
    category: "major",
    amount: 25000,
    domain: "Participation citoyenne électorale",
    description: "Plateforme numérique pour renforcer l'engagement citoyen dans les processus électoraux",
    impact: "Améliorer la participation citoyenne aux élections sénégalaises",
    technologies: ["Web Platform", "Citizen Engagement", "Digital Democracy"],
    teamSize: 5,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "5",
    projectName: "Strengthening Youth and Women's Digital Participation in Benin 2026 General Elections",
    organization: "Réseau des Femmes Leaders pour le Développement (RFLD)",
    country: "Bénin",
    countryFlag: "🇧🇯",
    category: "major",
    amount: 25000,
    domain: "Participation digitale jeunes et femmes",
    description: "Renforcer la participation numérique des jeunes et des femmes aux élections générales de 2026",
    impact: "Mobiliser jeunes et femmes pour les élections de 2026 au Bénin",
    technologies: ["Digital Training", "Youth Engagement", "Gender Inclusion"],
    teamSize: 5,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "6",
    projectName: "Plateforme d'Actions Citoyennes pour la Transparence Électorale (PACTE)",
    organization: "Association des Blogueurs de Guinée - ABLOGUI",
    country: "Guinée",
    countryFlag: "🇬🇳",
    category: "major",
    amount: 25000,
    domain: "Transparence électorale",
    description: "Plateforme citoyenne pour promouvoir la transparence dans les processus électoraux",
    impact: "Renforcer la transparence électorale en Guinée",
    technologies: ["Civic Platform", "Electoral Monitoring", "Digital Advocacy"],
    teamSize: 5,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "7",
    projectName: "My Vote My Voice 2.0: Civic Tech for Transparent and Inclusive Elections",
    organization: "Actions for Development and Empowerment (ADE)",
    country: "Cameroun",
    countryFlag: "🇨🇲",
    category: "major",
    amount: 25000,
    domain: "Civic tech pour élections inclusives",
    description: "Solution civic tech pour des élections transparentes et inclusives",
    impact: "Promouvoir des élections transparentes et inclusives au Cameroun",
    technologies: ["Civic Tech", "Electoral Transparency", "Digital Inclusion"],
    teamSize: 6,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "8",
    projectName: "Veille et accompagnement juridique des jeunes aux processus électoraux",
    organization: "ADRES – Association pour le Développement et la Résilience Sociale",
    country: "Mauritanie",
    countryFlag: "🇲🇷",
    category: "major",
    amount: 25000,
    domain: "Accompagnement juridique électoral",
    description: "Veille et accompagnement juridique des jeunes dans les processus électoraux",
    impact: "Renforcer les connaissances juridiques des jeunes en Mauritanie",
    technologies: ["Legal Tech", "Youth Empowerment", "Electoral Education"],
    teamSize: 4,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "9",
    projectName: "SENEGAL VOTE CIVICRISE",
    organization: "Association Wa Mbedmi",
    country: "Sénégal",
    countryFlag: "🇸🇳",
    category: "major",
    amount: 25000,
    domain: "Mobilisation citoyenne électorale",
    description: "Plateforme de mobilisation citoyenne pour des élections transparentes",
    impact: "Mobiliser les citoyens sénégalais pour une participation démocratique accrue",
    technologies: ["Citizen Mobilization", "Electoral Awareness", "Digital Campaign"],
    teamSize: 5,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "10",
    projectName: "Strengthening Youth and Women-Led CSOs for Inclusive Electoral Participation in Amhara Region",
    organization: "Consortium for Networking and Development (COND) of CSOs in Amhara Region",
    country: "Éthiopie",
    countryFlag: "🇪🇹",
    category: "major",
    amount: 25000,
    domain: "Participation électorale inclusive",
    description: "Renforcer les OSC dirigées par des jeunes et des femmes pour une participation électorale inclusive",
    impact: "Promouvoir l'inclusion dans le processus électoral en région Amhara",
    technologies: ["CSO Empowerment", "Youth & Women Leadership", "Electoral Inclusion"],
    teamSize: 6,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "11",
    projectName: "DoorashoKaab",
    organization: "Bareedo Platform Somalia",
    country: "Somalie",
    countryFlag: "🇸🇴",
    category: "micro",
    amount: 10000,
    domain: "Engagement électoral digital",
    description: "Plateforme d'engagement électoral numérique pour la Somalie",
    impact: "Améliorer l'engagement citoyen dans les processus électoraux somaliens",
    technologies: ["Digital Platform", "Electoral Engagement", "Civic Participation"],
    teamSize: 4,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "12",
    projectName: "Inclusive Voices",
    organization: "Hopeline Foundation",
    country: "Somalie",
    countryFlag: "🇸🇴",
    category: "micro",
    amount: 10000,
    domain: "Voix inclusives",
    description: "Promouvoir des voix inclusives dans les processus démocratiques",
    impact: "Donner une voix aux communautés marginalisées en Somalie",
    technologies: ["Community Engagement", "Inclusive Democracy", "Digital Advocacy"],
    teamSize: 3,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  },
  {
    id: "13",
    projectName: "Harnessing Digital Tools for Youth and Women's Empowerment in Ethiopia's 2025 Electoral Process",
    organization: "Ethiopian Women Federation",
    country: "Éthiopie",
    countryFlag: "🇪🇹",
    category: "micro",
    amount: 10000,
    domain: "Autonomisation digitale",
    description: "Exploiter les outils numériques pour l'autonomisation des jeunes et des femmes dans le processus électoral 2025",
    impact: "Renforcer la participation des jeunes et des femmes aux élections éthiopiennes de 2025",
    technologies: ["Digital Empowerment", "Youth & Women Participation", "Electoral Tools"],
    teamSize: 5,
    projectImage: "/placeholder.jpg",
    selectedDate: "2025-01-15"
  }
]

interface WinnersShowcaseProps {
  lang?: string
}

export default function WinnersShowcase({ lang }: WinnersShowcaseProps) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "major" | "micro">("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredWinners = selectedCategory === "all" 
    ? winners 
    : winners.filter(w => w.category === selectedCategory)

  const nextWinner = () => {
    if (filteredWinners.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredWinners.length)
    }
  }

  const prevWinner = () => {
    if (filteredWinners.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + filteredWinners.length) % filteredWinners.length)
    }
  }

  const majorProjects = winners.filter(w => w.category === "major")
  const microGrants = winners.filter(w => w.category === "micro")
  const totalFunding = winners.reduce((sum, w) => sum + w.amount, 0)
  const countriesCount = new Set(winners.map(w => w.country)).size

  // Use fallback translations if t is not available
  const getTranslation = (key: string, fallback: string) => {
    try {
      const keys = key.split('.')
      let value = t as any
      for (const k of keys) {
        value = value?.[k]
      }
      return value || fallback
    } catch {
      return fallback
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
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
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <Trophy className="h-16 w-16 text-yellow-400 mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-2xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
            🏆 {getTranslation('winners.title', 'Bénéficiaires Sélectionnés')}
          </h1>

          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            {getTranslation('winners.subtitle', 'Découvrez les projets innovants qui transformeront la démocratie en Afrique')}
          </p>

          <div className="flex justify-center items-center space-x-4 text-lg text-blue-200">
            <Badge variant="outline" className="border-yellow-400 text-yellow-400 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              {winners.length} {getTranslation('winners.projects', 'Projets')}
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="border-blue-400 text-blue-400 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              {countriesCount} {getTranslation('winners.countries', 'Pays')}
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="border-green-400 text-green-400 px-4 py-2">
              <DollarSign className="w-4 h-4 mr-2" />
              {totalFunding.toLocaleString()}€
            </Badge>
          </div>
        </motion.div>

        {/* Statistics Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-yellow-600 mb-2">3</div>
              <div className="text-gray-800 font-semibold">{getTranslation('winners.majorProjects', 'Projets Majeurs')}</div>
              <div className="text-yellow-700 text-sm">jusqu'à 25,000€</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <div className="text-gray-800 font-semibold">{getTranslation('winners.microGrants', 'Micro-subventions')}</div>
              <div className="text-blue-700 text-sm">jusqu'à 10,000€</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">4</div>
              <div className="text-gray-800 font-semibold">{getTranslation('winners.beneficiaryCountries', 'Pays Bénéficiaires')}</div>
              <div className="text-green-700 text-sm">{getTranslation('winners.continentalImpact', 'Impact continental')}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
            <div className="flex space-x-2">
              {[
                { key: "all", label: getTranslation('winners.allProjects', 'Tous les projets'), icon: Globe },
                { key: "major", label: getTranslation('winners.majorProjects', 'Projets Majeurs'), icon: Trophy },
                { key: "micro", label: getTranslation('winners.microGrants', 'Micro-subventions'), icon: Zap }
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "ghost"}
                  className={`
                    rounded-full px-6 py-2 font-medium transition-all duration-300
                    ${selectedCategory === key
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600"
                      : "text-white hover:bg-white/10"
                    }
                  `}
                  onClick={() => setSelectedCategory(key as any)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Winner Carousel */}
        {filteredWinners.length > 0 && filteredWinners[currentIndex] && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.4 }}
            className="relative mb-12"
          >
            <Card className="bg-gradient-to-br from-slate-800/90 via-blue-900/80 to-slate-800/90 border border-yellow-400/30 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Project Info */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center justify-between mb-6">
                      <Badge 
                        className={`px-4 py-2 text-sm font-bold ${
                          filteredWinners[currentIndex]?.category === "major"
                            ? "bg-yellow-500 text-black"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {filteredWinners[currentIndex]?.category === "major" ? getTranslation('winners.majorProjects', 'Projets Majeurs') : getTranslation('winners.microGrants', 'Micro-subventions')}
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {filteredWinners[currentIndex]?.amount?.toLocaleString() || '0'}€
                        </div>
                        <div className="text-blue-200 text-sm">{getTranslation('winners.funding', 'Financement')}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {filteredWinners[currentIndex]?.projectName || 'Nom du projet'}
                      </h2>
                      <div className="flex items-center text-blue-200 mb-4">
                        <span className="text-2xl mr-2">{filteredWinners[currentIndex]?.countryFlag || '🌍'}</span>
                        <span className="font-semibold">{filteredWinners[currentIndex]?.organization || 'Organisation'}</span>
                        <MapPin className="w-4 h-4 mx-2" />
                        <span>{filteredWinners[currentIndex]?.country || 'Pays'}</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-white mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-yellow-400" />
                          {getTranslation('winners.domain', 'Domaine d\'intervention')}
                        </h4>
                        <Badge variant="outline" className="border-yellow-400/60 text-yellow-300 bg-yellow-400/10">
                          {filteredWinners[currentIndex]?.domain || getTranslation('winners.domain', 'Domaine d\'intervention')}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-2">{getTranslation('winners.description', 'Description du projet')}</h4>
                        <p className="text-blue-200 leading-relaxed">
                          {filteredWinners[currentIndex]?.description || getTranslation('winners.description', 'Description du projet')}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                          {getTranslation('winners.expectedImpact', 'Impact attendu')}
                        </h4>
                        <p className="text-green-300 font-medium">
                          {filteredWinners[currentIndex]?.impact || getTranslation('winners.expectedImpact', 'Impact attendu')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-white font-semibold flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {getTranslation('winners.team', 'Équipe')}
                        </div>
                        <div className="text-blue-300">{filteredWinners[currentIndex]?.teamSize || 0} {getTranslation('winners.members', 'membres')}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-white font-semibold flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {getTranslation('winners.selection', 'Date de sélection')}
                        </div>
                        <div className="text-blue-300">
                          {filteredWinners[currentIndex]?.selectedDate ? new Date(filteredWinners[currentIndex].selectedDate).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR') : getTranslation('winners.selection', 'Date de sélection')}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                        {getTranslation('winners.technologiesUsed', 'Technologies utilisées')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(filteredWinners[currentIndex]?.technologies || []).map((tech, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="border-purple-400/60 text-purple-300 bg-purple-400/10"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Side with Project Image */}
                  <div className="relative bg-gradient-to-br from-yellow-400/20 to-blue-500/30 flex flex-col items-center justify-center p-8">
                    {/* Project Image */}
                    <div className="w-full h-48 bg-white/10 rounded-2xl mb-6 overflow-hidden border border-white/20 shadow-xl">
                      {filteredWinners[currentIndex]?.projectImage ? (
                        <Image
                          src={filteredWinners[currentIndex].projectImage!}
                          alt={filteredWinners[currentIndex]?.projectName || 'Project'}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-600">
                          <ImageIcon className="w-16 h-16 text-white/50" />
                        </div>
                      )}
                    </div>

                    {/* Country Flag and Info */}
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-blue-500 rounded-full flex items-center justify-center text-4xl mb-4 shadow-2xl">
                        {filteredWinners[currentIndex]?.countryFlag || '🌍'}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        #{currentIndex + 1} / {filteredWinners.length}
                      </h3>
                      <p className="text-blue-200">
                        {filteredWinners[currentIndex]?.country || 'Pays'}
                      </p>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute inset-0">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={`floating-particle-${i}`}
                          className="absolute w-2 h-2 bg-yellow-400/40 rounded-full animate-float"
                          style={{
                            left: `${(i * 43 + 15) % 100}%`,
                            top: `${(i * 29 + 10) % 100}%`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={prevWinner}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={nextWinner}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Winners Grid with Images */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredWinners.map((winner, index) => (
            <motion.div
              key={winner.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "ring-2 ring-yellow-400" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-600 relative">
                    {winner.projectImage ? (
                      <Image
                        src={winner.projectImage}
                        alt={winner.projectName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge 
                        className={`text-xs ${
                          winner.category === "major"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/50"
                            : "bg-blue-500/20 text-blue-300 border-blue-400/50"
                        }`}
                      >
                        {winner.amount.toLocaleString()}€
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-3xl drop-shadow-lg">{winner.countryFlag}</span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-white text-lg mb-2">{winner.projectName}</h3>
                    <p className="text-blue-200 text-sm mb-3">{winner.organization}</p>
                    <p className="text-blue-300 text-sm mb-4 line-clamp-2">{winner.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-200 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        {winner.teamSize} {getTranslation('winners.members', 'membres')}
                      </div>
                      <Badge variant="outline" className="border-green-400/60 text-green-300 text-xs">
                        {winner.domain}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 backdrop-blur-sm max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-500/20 rounded-full">
                  <Sparkles className="w-12 h-12 text-green-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {getTranslation('winners.congratulations', '🎉 Félicitations à tous les bénéficiaires !')}
              </h2>
              <p className="text-gray-800 text-lg leading-relaxed">
                {getTranslation('winners.transformMessage', 'Ces 14 projets innovants vont transformer la démocratie en Afrique. Ensemble, ils représentent l\'avenir de l\'engagement civique numérique et contribueront à renforcer les processus démocratiques sur le continent.')}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}