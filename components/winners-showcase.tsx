"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Award, 
  Globe, 
  Sparkles, 
  Target, 
  TrendingUp,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Heart,
  Zap,
  Image as ImageIcon,
  Mail
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

interface WinnerData {
  id: string
  projectName: { fr: string; en: string }
  organization: string
  country: { fr: string; en: string }
  countryFlag: string
  category: "major" | "micro"
  domain: { fr: string; en: string }
  description: { fr: string; en: string }
  impact: { fr: string; en: string }
  technologies: { fr: string[]; en: string[] }
  website?: string
  contact?: string
  logo?: string
  projectImage?: string
}

const winnersData: WinnerData[] = [
  {
    id: "1",
    projectName: { 
      fr: "Electoral Fact-Checking Initiative South Sudan", 
      en: "Electoral Fact-Checking Initiative South Sudan" 
    },
    organization: "Excellence Foundation for South Sudan",
    country: { fr: "Soudan du Sud", en: "South Sudan" },
    countryFlag: "🇸🇸",
    category: "major",
    domain: { fr: "Fact-checking électoral", en: "Electoral Fact-checking" },
    description: { 
      fr: "Le projet vise à renforcer l'intégrité de l'information électorale en formant les jeunes journalistes, les étudiants et le grand public à la vérification des faits et à la littératie médiatique. Grâce à une plateforme numérique, à des programmes de formation et à des bourses, il encourage la production de contenus fiables, lutte contre la désinformation et soutient la création de réseaux de vérificateurs ainsi que de clubs de médias scolaires.",
      en: "The project aims to strengthen the integrity of electoral information by training young journalists, students, and the general public in fact-checking and media literacy. Through a digital platform, training programmes, and fellowships, it promotes the production of reliable content, combats disinformation, and supports the creation of fact-checking networks and school media clubs."
    },
    impact: { 
      fr: "Renforcer la confiance citoyenne et la transparence du processus électoral au Soudan du Sud",
      en: "Strengthen citizen trust and transparency in South Sudan's electoral process"
    },
    technologies: { 
      fr: ["Fact-checking", "Application Mobile", "Média Web", "Radio"],
      en: ["Fact-checking", "Mobile App", "Web Media", "Radio"]
    },
    projectImage: "/1.jpg",
    website: "https://www.excellencefoundationss.org/",
    contact: "hello@excellencefoundationss.org"
  },
  {
    id: "2",
    projectName: { 
      fr: "Vigilant Civic Voice", 
      en: "Vigilant Civic Voice" 
    },
    organization: "Association des blogueurs du Bénin & SOS Civisme Bénin",
    country: { fr: "Bénin", en: "Benin" },
    countryFlag: "🇧🇯",
    category: "major",
    domain: { fr: "Surveillance citoyenne électorale", en: "Electoral Citizen Monitoring" },
    description: { 
      fr: "Le projet vise à renforcer la transparence et la participation citoyenne au Bénin en période électorale à travers une plateforme numérique collaborative et un site web avec des contenus multimédias plurilingue (podcasts, vidéos) en fon, dendi, bariba, yoruba et mina. Il permet aux citoyens de signaler les irrégularités électorales et de soumettre les infox pour vérification par une cellule de fact-checking.",
      en: "The project aims to strengthen transparency and citizen participation in Benin during electoral periods through a collaborative digital platform and a multilingual website featuring multimedia content (podcasts, videos) in Fon, Dendi, Bariba, Yoruba, and Mina. It enables citizens to report electoral irregularities and submit misinformation for verification by a fact-checking unit."
    },
    impact: { 
      fr: "Favoriser la transparence et l'éducation numérique électorale au Bénin",
      en: "Promote transparency and digital electoral education in Benin"
    },
    technologies: { 
      fr: ["Plateforme Collaborative", "Fact-checking", "Multilingue", "Podcasts"],
      en: ["Collaborative Platform", "Fact-checking", "Multilingual", "Podcasts"]
    },
    projectImage: "/2.jpg",
    website: "https://www.blogueurs.bj",
    contact: "contact@blogueurs.bj"
  },
  {
    id: "3",
    projectName: { 
      fr: "MyAIFactChecker Cameroon", 
      en: "MyAIFactChecker Cameroon" 
    },
    organization: "Brain Builders Youth Development Initiative",
    country: { fr: "Cameroun", en: "Cameroon" },
    countryFlag: "🇨🇲",
    category: "major",
    domain: { fr: "IA et fact-checking électoral", en: "AI and Electoral Fact-checking" },
    description: { 
      fr: "Le projet déploie myaifactchecker.org, la première plateforme africaine multilingue de vérification de faits basée sur l'IA, pour lutter contre la désinformation électorale au Cameroun. Lancé à l'occasion de l'élection présidentielle d'octobre 2025, il vise à renforcer la transparence, la littératie civique et la culture du fact-checking au sein de la société civile et des médias.",
      en: "The project deploys myaifactchecker.org, the first African multilingual AI-powered fact-checking platform, to combat electoral disinformation in Cameroon. Launched ahead of the October 2025 presidential election, it aims to strengthen transparency, civic literacy, and the culture of fact-checking within civil society and the media."
    },
    impact: { 
      fr: "Contrer la désinformation électorale et promouvoir l'information fiable au Cameroun",
      en: "Counter electoral disinformation and promote reliable information in Cameroon"
    },
    technologies: { 
      fr: ["Intelligence Artificielle", "Fact-checking", "Formation IA", "Multilingue"],
      en: ["Artificial Intelligence", "Fact-checking", "AI Training", "Multilingual"]
    },
    projectImage: "/7.jpg",
    website: "https://thebrainbuilders.org/",
    contact: "brainbuilderedu@gmail.com"
  },
  {
    id: "4",
    projectName: { 
      fr: "Plateforme électorale citoyenne du Sénégal", 
      en: "Citizen Electoral Platform of Senegal" 
    },
    organization: "Vie Publique Sénégal",
    country: { fr: "Sénégal", en: "Senegal" },
    countryFlag: "🇸🇳",
    category: "major",
    domain: { fr: "Open data et transparence électorale", en: "Open Data and Electoral Transparency" },
    description: { 
      fr: "Le projet renforce la transparence et la participation citoyenne à travers une plateforme numérique open source d'information et de suivi électoral. Basée sur l'outil déjà utilisé lors des législatives de 2024, la solution sera améliorée pour les élections municipales de 2027 avec six modules : information électorale, tableaux de bord, cartographie des bureaux de vote, signalement citoyen, open data et lecture automatisée des PV.",
      en: "The project strengthens transparency and citizen participation through an open-source digital platform for electoral information and monitoring. Based on a tool already used during the 2024 legislative elections, the solution will be improved for the 2027 municipal elections with six modules: electoral information, dashboards, mapping of polling stations, citizen reporting, open data, and automated tally sheet reading."
    },
    impact: { 
      fr: "Faciliter la transparence et l'accès à l'information électorale en temps réel au Sénégal",
      en: "Facilitate transparency and real-time access to electoral information in Senegal"
    },
    technologies: { 
      fr: ["Open Data", "Cartographie", "API", "OCR", "GitHub"],
      en: ["Open Data", "Mapping", "API", "OCR", "GitHub"]
    },
    projectImage: "/4.jpg",
    website: "https://www.vie-publique.sn/",
    contact: "contact@vie-publique.sn"
  },
  {
    id: "5",
    projectName: { 
      fr: "PACTE - Participation Active et Citoyenne des jeunes pour une Transition Électorale inclusive", 
      en: "PACTE - Active Citizen Participation of Youth for an Inclusive Electoral Transition" 
    },
    organization: "ABLOGUI - Association des Blogueurs de Guinée",
    country: { fr: "Guinée", en: "Guinea" },
    countryFlag: "🇬🇳",
    category: "major",
    domain: { fr: "Éducation civique et monitoring citoyen", en: "Civic Education and Citizen Monitoring" },
    description: { 
      fr: "Le projet vise à renforcer la participation civique des jeunes Guinéens, notamment les jeunes femmes, en mobilisant les technologies civiques pour l'éducation civique et électorale, la lutte contre la désinformation et le développement d'un monitoring citoyen décentralisé, contribuant ainsi à une participation démocratique accrue et à une plus grande transparence électorale en Guinée.",
      en: "The project aims to strengthen the civic participation of young Guineans, particularly young women, by using civic technologies for civic and electoral education, combating disinformation, and developing decentralised citizen monitoring, thereby contributing to increased democratic participation and greater electoral transparency in Guinea."
    },
    impact: { 
      fr: "Renforcer la participation démocratique et la transparence électorale en Guinée",
      en: "Strengthen democratic participation and electoral transparency in Guinea"
    },
    technologies: { 
      fr: ["MOOC", "WhatsApp Bot", "Plateforme Web", "Infographies"],
      en: ["MOOC", "WhatsApp Bot", "Web Platform", "Infographics"]
    },
    projectImage: "/12.jpg",
    website: "https://ablogui.org/",
    contact: "contact@ablogui.org"
  },
  {
    id: "6",
    projectName: { 
      fr: "My Vote My Voice 2.0: Civic Tech for Transparent and Inclusive Elections", 
      en: "My Vote My Voice 2.0: Civic Tech for Transparent and Inclusive Elections" 
    },
    organization: "Actions for Development and Empowerment (ADE)",
    country: { fr: "Cameroun", en: "Cameroon" },
    countryFlag: "🇨🇲",
    category: "major",
    domain: { fr: "Civic tech et éducation civique", en: "Civic Tech and Civic Education" },
    description: { 
      fr: "Le projet vise à renforcer la transparence électorale, l'engagement citoyen et la participation crédible au Cameroun. Basé sur l'application VoteCam, le projet intègre le signalement en temps réel des irrégularités et la soumission de données hors ligne. Des Journées de littératie civique permettront aux jeunes et aux femmes de se familiariser avec ces outils, tandis que le podcast 'Know Your Rep' expliquera le fonctionnement des élections.",
      en: "The project aims to strengthen electoral transparency, civic engagement, and credible participation in Cameroon. Based on the VoteCam application, it integrates real-time reporting of irregularities and offline data submission. Civic literacy days will familiarise youth and women with these tools, while the 'Know Your Rep' podcast will explain how elections work."
    },
    impact: { 
      fr: "Encourager la participation active et informée des jeunes et femmes aux élections",
      en: "Encourage active and informed participation of youth and women in elections"
    },
    technologies: { 
      fr: ["Application Mobile", "Signalement", "Podcast", "Formation Citoyenne"],
      en: ["Mobile App", "Reporting", "Podcast", "Citizen Training"]
    },
    projectImage: "/10.jpg",
    website: "https://adeinternational.org/",
    contact: "info@adeinternational.org"
  },
  {
    id: "7",
    projectName: { 
      fr: "Veille et accompagnement juridique des jeunes aux processus électoraux", 
      en: "Monitoring and Legal Support for Youth on Electoral Processes" 
    },
    organization: "ADRES – Association pour le Développement et la Résilience Sociale",
    country: { fr: "Mauritanie", en: "Mauritania" },
    countryFlag: "🇲🇷",
    category: "major",
    domain: { fr: "Accompagnement juridique et numérique", en: "Legal and Digital Support" },
    description: { 
      fr: "Le projet vise à outiller les jeunes de Nouakchott, en particulier dans les quartiers marginalisés de Dar Naim et Toujounine, afin de renforcer leur accès à l'information juridique électorale et de stimuler leur participation citoyenne. Il met en place un observatoire citoyen numérique et un chatbot juridique via WhatsApp, accompagné d'une campagne numérique ciblée.",
      en: "The project aims to equip young people in Nouakchott—particularly in marginalised districts of Dar Naim and Toujounine—with improved access to electoral legal information and foster their civic participation. It establishes a digital citizen observatory and deploys a WhatsApp legal chatbot supported by a targeted digital campaign."
    },
    impact: { 
      fr: "Promouvoir une citoyenneté responsable et prévenir les tensions électorales",
      en: "Promote responsible citizenship and prevent electoral tensions"
    },
    technologies: { 
      fr: ["Legal Tech", "Chatbot WhatsApp", "Observatoire Citoyen", "Documentaire"],
      en: ["Legal Tech", "WhatsApp Chatbot", "Citizen Observatory", "Documentary"]
    },
    projectImage: "/6.jpg",
    website: "",
    contact: "adresrim@gmail.com"
  },
  {
    id: "8",
    projectName: { 
      fr: "SENEGAL VOTE CIVICRISE - Plateforme Toopko", 
      en: "SENEGAL VOTE CIVICRISE - Toopko Platform" 
    },
    organization: "Association Wa Mbedmi",
    country: { fr: "Sénégal", en: "Senegal" },
    countryFlag: "🇸🇳",
    category: "major",
    domain: { fr: "Redevabilité et suivi des engagements", en: "Accountability and Commitment Tracking" },
    description: { 
      fr: "Le projet est une extension numérique de la plateforme Senegalvote.org, conçue pour permettre aux citoyens de suivre et d'évaluer les engagements pris par les responsables publics au Sénégal. Accessible en ligne et optimisée pour mobile, Toopko centralise les promesses et engagements et offre aux citoyens un espace interactif pour mesurer leur niveau de réalisation.",
      en: "The project is a digital extension of the SenegalVote.org platform, designed to enable citizens to track and evaluate commitments made by public officials in Senegal. Accessible online and mobile-optimised, Toopko centralises promises and public commitments and offers an interactive space for citizens to assess their fulfilment."
    },
    impact: { 
      fr: "Renforcer la redevabilité et promouvoir la transparence au Sénégal",
      en: "Strengthen accountability and promote transparency in Senegal"
    },
    technologies: { 
      fr: ["Plateforme Web", "Mobile", "Suivi des Promesses", "Open Data"],
      en: ["Web Platform", "Mobile", "Promise Tracking", "Open Data"]
    },
    projectImage: "/8.jpg",
    website: "https://senegalvote.org/",
    contact: "contact@wambedmi.org"
  },
  {
    id: "9",
    projectName: { 
      fr: "Renforcement des OSC dirigées par les jeunes et les femmes pour une participation électorale inclusive dans la région d'Amhara", 
      en: "Strengthening Youth and Women-Led CSOs for Inclusive Electoral Participation in Amhara Region" 
    },
    organization: "Consortium for Networking and Development (COND)",
    country: { fr: "Éthiopie", en: "Ethiopia" },
    countryFlag: "🇪🇹",
    category: "major",
    domain: { fr: "Renforcement des OSC jeunes et femmes", en: "Strengthening Youth and Women-Led CSOs" },
    description: { 
      fr: "Le projet vise à renforcer la participation électorale inclusive, transparente et pacifique dans la région d'Amhara en outillant les organisations de la société civile dirigées par des jeunes et des femmes avec des technologies civiques numériques. Sur 10 mois, le projet renforce les capacités de plus de 30 OSC locales pour mener des actions d'éducation civique, d'observation électorale et de sensibilisation.",
      en: "The project aims to strengthen inclusive, transparent, and peaceful electoral participation in the Amhara region by equipping youth- and women-led CSOs with digital civic technologies. Over 10 months, the project builds the capacity of more than 30 local CSOs to conduct civic education, electoral observation, and awareness activities."
    },
    impact: { 
      fr: "Promouvoir l'implication active des OSC dans la gouvernance électorale en Amhara",
      en: "Promote active CSO involvement in electoral governance in Amhara"
    },
    technologies: { 
      fr: ["Formation Numérique", "Réseautage", "Observation Électorale", "Base de données"],
      en: ["Digital Training", "Networking", "Electoral Observation", "Database"]
    },
    projectImage: "/5.jpg",
    website: "https://www.condnet.org/",
    contact: "nigatu@cond.org"
  },
  {
    id: "10",
    projectName: { 
      fr: "DoorashoKaab", 
      en: "DoorashoKaab" 
    },
    organization: "Bareedo Platform",
    country: { fr: "Somalie", en: "Somalia" },
    countryFlag: "🇸🇴",
    category: "micro",
    domain: { fr: "Sensibilisation électorale multilingue", en: "Multilingual Electoral Awareness" },
    description: { 
      fr: "Le projet est une initiative de civic tech visant à renforcer la participation significative des jeunes Somaliens, qui demeurent largement sous-représentés dans les processus électoraux. Sur une période de 9 mois, le projet co-développe et déploie une plateforme numérique multilingue et open source proposant des outils interactifs d'éducation civique, des informations électorales et des dispositifs de signalement d'incidents à destination des jeunes.",
      en: "The project is a civic tech initiative aiming to strengthen meaningful participation of Somali youth, who remain largely underrepresented in electoral processes. Over 9 months, the project co-develops and deploys a multilingual, open-source digital platform offering interactive civic education tools, electoral information, and incident reporting for young people."
    },
    impact: { 
      fr: "Renforcer la participation civique et la transparence électorale en Somalie",
      en: "Strengthen civic participation and electoral transparency in Somalia"
    },
    technologies: { 
      fr: ["Plateforme Multilingue", "Open Source", "Éducation Civique", "Signalement"],
      en: ["Multilingual Platform", "Open Source", "Civic Education", "Reporting"]
    },
    projectImage: "/3.jpg",
    website: "https://bareedo.org/",
    contact: "info@bareedo.org"
  },
  {
    id: "11",
    projectName: { 
      fr: "Inclusive Voices", 
      en: "Inclusive Voices" 
    },
    organization: "Hopeline Foundation",
    country: { fr: "Somalie", en: "Somalia" },
    countryFlag: "🇸🇴",
    category: "micro",
    domain: { fr: "Participation politique équitable", en: "Equitable Political Participation" },
    description: { 
      fr: "Le projet vise à renforcer la sensibilisation électorale, la participation et le leadership des jeunes et des femmes somaliennes dans les districts de Hodan, Waberi et Kahda à Mogadiscio. Le projet utilise le storytelling numérique, l'éducation civique mobile, des forums de dialogue communautaire, des formations en leadership et des campagnes d'éducation civique.",
      en: "The project aims to strengthen electoral awareness, participation, and leadership among Somali youth and women in the districts of Hodan, Waberi, and Kahda in Mogadishu. Using digital storytelling, mobile civic education, community dialogue forums, leadership training, and civic education campaigns."
    },
    impact: { 
      fr: "Amplifier la voix des femmes et jeunes et prévenir les discours haineux",
      en: "Amplify the voice of women and youth and prevent hate speech"
    },
    technologies: { 
      fr: ["Storytelling Numérique", "SMS", "Leadership", "Éducation Civique"],
      en: ["Digital Storytelling", "SMS", "Leadership", "Civic Education"]
    },
    projectImage: "/13.jpg",
    website: "",
    contact: "mulki8452@gmail.com"
  },
  {
    id: "12",
    projectName: { 
      fr: "Exploitation des outils numériques pour l'autonomisation des jeunes et des femmes dans le processus électoral éthiopien de 2025", 
      en: "Harnessing Digital Tools for Youth and Women's Empowerment in Ethiopia's 2025 Electoral Process" 
    },
    organization: "Ethiopian Women Federation",
    country: { fr: "Éthiopie", en: "Ethiopia" },
    countryFlag: "🇪🇹",
    category: "micro",
    domain: { fr: "Autonomisation numérique électorale", en: "Digital Electoral Empowerment" },
    description: { 
      fr: "Le projet vise à outiller les jeunes et les femmes éthiopiennes pour une participation active et influente aux élections de 2025. En combinant formation civique, sensibilisation numérique et renforcement du leadership féminin, il favorise une participation électorale plus inclusive, sécurisée et informée.",
      en: "The project aims to equip Ethiopian youth and women for active and influential participation in the 2025 elections. By combining civic training, digital awareness, and women's leadership development, it promotes a more inclusive, secure, and informed electoral participation."
    },
    impact: { 
      fr: "Contribuer à une participation électorale inclusive, sûre et informée en Éthiopie",
      en: "Contribute to inclusive, safe, and informed electoral participation in Ethiopia"
    },
    technologies: { 
      fr: ["Plateforme Numérique", "SMS", "IVR", "Leadership Féminin"],
      en: ["Digital Platform", "SMS", "IVR", "Women's Leadership"]
    },
    projectImage: "/9.jpg",
    website: "https://692597ce177c5a83d2d98b8d--ethiopianwomenfederation.netlify.app/",
    contact: "info@ewfethiopia.com"
  }
]

interface WinnersShowcaseProps {
  lang?: string
}

export default function WinnersShowcase({ lang }: WinnersShowcaseProps) {
  const { t, language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "major" | "micro">("all")
  const [mounted, setMounted] = useState(false)

  const currentLang = language || lang || "fr"

  useEffect(() => {
    setMounted(true)
  }, [])

  const winners = winnersData.map(w => ({
    id: w.id,
    projectName: w.projectName[currentLang as "fr" | "en"] || w.projectName.fr,
    organization: w.organization,
    country: w.country[currentLang as "fr" | "en"] || w.country.fr,
    countryFlag: w.countryFlag,
    category: w.category,
    domain: w.domain[currentLang as "fr" | "en"] || w.domain.fr,
    description: w.description[currentLang as "fr" | "en"] || w.description.fr,
    impact: w.impact[currentLang as "fr" | "en"] || w.impact.fr,
    technologies: w.technologies[currentLang as "fr" | "en"] || w.technologies.fr,
    website: w.website,
    contact: w.contact,
    projectImage: w.projectImage
  }))

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
  const countriesCount = new Set(winners.map(w => w.country)).size

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

  const texts = {
    title: currentLang === "en" ? "Selected Beneficiaries" : "Bénéficiaires Sélectionnés",
    subtitle: currentLang === "en" ? "Discover the innovative projects that will transform democracy in Africa" : "Découvrez les projets innovants qui transformeront la démocratie en Afrique",
    projects: currentLang === "en" ? "Projects" : "Projets",
    countries: currentLang === "en" ? "Countries" : "Pays",
    majorProjects: currentLang === "en" ? "Major Projects" : "Projets Majeurs",
    microGrants: currentLang === "en" ? "Micro-grants" : "Micro-subventions",
    beneficiaryCountries: currentLang === "en" ? "Beneficiary Countries" : "Pays Bénéficiaires",
    continentalImpact: currentLang === "en" ? "Continental impact" : "Impact continental",
    allProjects: currentLang === "en" ? "All projects" : "Tous les projets",
    domain: currentLang === "en" ? "Area of intervention" : "Domaine d'intervention",
    description: currentLang === "en" ? "Description" : "Description",
    expectedImpact: currentLang === "en" ? "Expected Impact" : "Impact attendu",
    website: currentLang === "en" ? "Website" : "Site Web",
    contact: currentLang === "en" ? "Contact" : "Contact",
    technologiesUsed: currentLang === "en" ? "Technologies used" : "Technologies utilisées",
    notAvailable: currentLang === "en" ? "Not available" : "Non disponible",
    congratulations: currentLang === "en" ? "🎉 Congratulations to all beneficiaries!" : "🎉 Félicitations à tous les bénéficiaires !",
    transformMessage: currentLang === "en" 
      ? "These 12 innovative projects will transform democracy in Africa. Together, they represent the future of digital civic engagement and will contribute to strengthening democratic processes across the continent."
      : "Ces 12 projets innovants vont transformer la démocratie en Afrique. Ensemble, ils représentent l'avenir de l'engagement civique numérique et contribueront à renforcer les processus démocratiques sur le continent.",
    majorProject: currentLang === "en" ? "Major Project" : "Projet Majeur",
    microGrant: currentLang === "en" ? "Micro-grant" : "Micro-subvention",
    visitWebsite: currentLang === "en" ? "Website" : "Site web"
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
            🏆 {texts.title}
          </h1>

          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            {texts.subtitle}
          </p>

          <div className="flex justify-center items-center space-x-4 text-lg text-blue-200">
            <Badge variant="outline" className="border-yellow-400 text-yellow-400 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              {winners.length} {texts.projects}
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="border-blue-400 text-blue-400 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              {countriesCount} {texts.countries}
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
              <div className="text-3xl font-bold text-yellow-600 mb-2">{majorProjects.length}</div>
              <div className="text-gray-800 font-semibold">{texts.majorProjects}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">{microGrants.length}</div>
              <div className="text-gray-800 font-semibold">{texts.microGrants}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">{countriesCount}</div>
              <div className="text-gray-800 font-semibold">{texts.beneficiaryCountries}</div>
              <div className="text-green-700 text-sm">{texts.continentalImpact}</div>
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
                { key: "all", label: texts.allProjects, icon: Globe },
                { key: "major", label: texts.majorProjects, icon: Trophy },
                { key: "micro", label: texts.microGrants, icon: Zap }
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
                        {filteredWinners[currentIndex]?.category === "major" ? texts.majorProjects : texts.microGrants}
                      </Badge>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {filteredWinners[currentIndex]?.projectName || 'Project Name'}
                      </h2>
                      <div className="flex items-center text-blue-200 mb-4">
                        <span className="text-2xl mr-2">{filteredWinners[currentIndex]?.countryFlag || '🌍'}</span>
                        <span className="font-semibold">{filteredWinners[currentIndex]?.organization || 'Organization'}</span>
                        <MapPin className="w-4 h-4 mx-2" />
                        <span>{filteredWinners[currentIndex]?.country || 'Country'}</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-white mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-yellow-400" />
                          {texts.domain}
                        </h4>
                        <Badge variant="outline" className="border-yellow-400/60 text-yellow-300 bg-yellow-400/10">
                          {filteredWinners[currentIndex]?.domain || 'Domain'}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-2">
                          {texts.description}
                        </h4>
                        <p className="text-blue-200 leading-relaxed">
                          {filteredWinners[currentIndex]?.description || 'Project description'}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                          {texts.expectedImpact}
                        </h4>
                        <p className="text-green-300 font-medium">
                          {filteredWinners[currentIndex]?.impact || texts.expectedImpact}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-white font-semibold flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {texts.website}
                        </div>
                        <div className="text-blue-300 text-sm truncate">
                          {filteredWinners[currentIndex]?.website ? (
                            <a href={filteredWinners[currentIndex].website} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                              {filteredWinners[currentIndex].website.replace('https://', '').replace('http://', '')}
                            </a>
                          ) : (
                            <span className="text-gray-400">{texts.notAvailable}</span>
                          )}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-white font-semibold flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {texts.contact}
                        </div>
                        <div className="text-blue-300 text-sm truncate">
                          {filteredWinners[currentIndex]?.contact ? (
                            <a href={`mailto:${filteredWinners[currentIndex].contact}`} className="hover:text-yellow-400 transition-colors">
                              {filteredWinners[currentIndex].contact}
                            </a>
                          ) : (
                            <span className="text-gray-400">{texts.notAvailable}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                        {texts.technologiesUsed}
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
                    <div className="w-full h-96 bg-white/10 rounded-2xl mb-6 overflow-hidden border border-white/20 shadow-xl">
                      {filteredWinners[currentIndex]?.projectImage ? (
                        <Image
                          src={filteredWinners[currentIndex].projectImage!}
                          alt={filteredWinners[currentIndex]?.projectName || 'Project'}
                          width={400}
                          height={600}
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
                        {filteredWinners[currentIndex]?.country || 'Country'}
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

            {/* Navigation Arrows - Bottom Center */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={prevWinner}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
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
                        {winner.category === "major" ? texts.majorProject : texts.microGrant}
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
                      {winner.website && (
                        <a 
                          href={winner.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-200 text-sm hover:text-yellow-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          {texts.visitWebsite}
                        </a>
                      )}
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
                {texts.congratulations}
              </h2>
              <p className="text-gray-800 text-lg leading-relaxed">
                {texts.transformMessage}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
