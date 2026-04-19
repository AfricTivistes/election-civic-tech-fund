# PRD 10 - Structure des données projets

## Objectif

Définir la structure de données complète pour les 12 projets bénéficiaires, incluant les nouveaux champs demandés (budget, progression, durée) et en excluant les données sensibles (emails).

## Fichier de données

**Emplacement : `data/projects.ts`**

## Interface TypeScript

```typescript
// types/project.ts

export interface ProjectTranslation {
  fr: string
  en: string
}

export interface Project {
  // Identifiants
  id: string
  slug: string
  
  // Informations de base
  projectName: ProjectTranslation
  organization: string
  
  // Localisation
  country: ProjectTranslation
  countryCode: string  // ISO 3166-1 alpha-2
  countryFlag: string  // Emoji drapeau
  
  // Catégorie et budget
  category: "major" | "micro"
  budget: number  // en euros
  
  // Description
  domain: ProjectTranslation
  description: ProjectTranslation
  impact: ProjectTranslation
  
  // Technologies
  technologies: {
    fr: string[]
    en: string[]
  }
  
  // Médias
  projectImage: string
  logo?: string
  gallery?: string[]
  
  // Liens (PAS D'EMAIL)
  website?: string
  // contact: string  // SUPPRIMÉ - pas d'email public
  
  // Progression (NOUVEAUX CHAMPS)
  startDate: string      // ISO 8601: "2025-03-01"
  endDate: string        // ISO 8601: "2025-12-31"
  duration: number       // en mois
  progress: number       // 0-100
  status: ProjectStatus
  
  // Métadonnées
  featured?: boolean     // Mis en avant sur la page d'accueil
  order?: number         // Ordre d'affichage
}

export type ProjectStatus = "not_started" | "in_progress" | "completed"

export type ProjectCategory = "major" | "micro"
```

## Données des 12 projets

```typescript
// data/projects.ts

import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: "1",
    slug: "electoral-fact-checking-south-sudan",
    projectName: { 
      fr: "Electoral Fact-Checking Initiative South Sudan", 
      en: "Electoral Fact-Checking Initiative South Sudan" 
    },
    organization: "Excellence Foundation for South Sudan",
    country: { fr: "Soudan du Sud", en: "South Sudan" },
    countryCode: "ss",
    countryFlag: "🇸🇸",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 15,
    status: "in_progress",
    featured: true,
    order: 1
  },
  {
    id: "2",
    slug: "vigilant-civic-voice-benin",
    projectName: { 
      fr: "Vigilant Civic Voice", 
      en: "Vigilant Civic Voice" 
    },
    organization: "Association des blogueurs du Bénin & SOS Civisme Bénin",
    country: { fr: "Bénin", en: "Benin" },
    countryCode: "bj",
    countryFlag: "🇧🇯",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 20,
    status: "in_progress",
    featured: true,
    order: 2
  },
  {
    id: "3",
    slug: "myaifactchecker-cameroon",
    projectName: { 
      fr: "MyAIFactChecker Cameroon", 
      en: "MyAIFactChecker Cameroon" 
    },
    organization: "Brain Builders Youth Development Initiative",
    country: { fr: "Cameroun", en: "Cameroon" },
    countryCode: "cm",
    countryFlag: "🇨🇲",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 25,
    status: "in_progress",
    featured: true,
    order: 3
  },
  {
    id: "4",
    slug: "plateforme-electorale-senegal",
    projectName: { 
      fr: "Plateforme électorale citoyenne du Sénégal", 
      en: "Citizen Electoral Platform of Senegal" 
    },
    organization: "Vie Publique Sénégal",
    country: { fr: "Sénégal", en: "Senegal" },
    countryCode: "sn",
    countryFlag: "🇸🇳",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 30,
    status: "in_progress",
    featured: true,
    order: 4
  },
  {
    id: "5",
    slug: "pacte-guinee",
    projectName: { 
      fr: "PACTE - Participation Active et Citoyenne des jeunes pour une Transition Électorale inclusive", 
      en: "PACTE - Active Citizen Participation of Youth for an Inclusive Electoral Transition" 
    },
    organization: "ABLOGUI - Association des Blogueurs de Guinée",
    country: { fr: "Guinée", en: "Guinea" },
    countryCode: "gn",
    countryFlag: "🇬🇳",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 10,
    status: "in_progress",
    order: 5
  },
  {
    id: "6",
    slug: "my-vote-my-voice-cameroon",
    projectName: { 
      fr: "My Vote My Voice 2.0: Civic Tech for Transparent and Inclusive Elections", 
      en: "My Vote My Voice 2.0: Civic Tech for Transparent and Inclusive Elections" 
    },
    organization: "Actions for Development and Empowerment (ADE)",
    country: { fr: "Cameroun", en: "Cameroon" },
    countryCode: "cm",
    countryFlag: "🇨🇲",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 20,
    status: "in_progress",
    order: 6
  },
  {
    id: "7",
    slug: "veille-juridique-mauritanie",
    projectName: { 
      fr: "Veille et accompagnement juridique des jeunes aux processus électoraux", 
      en: "Monitoring and Legal Support for Youth on Electoral Processes" 
    },
    organization: "ADRES – Association pour le Développement et la Résilience Sociale",
    country: { fr: "Mauritanie", en: "Mauritania" },
    countryCode: "mr",
    countryFlag: "🇲🇷",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 15,
    status: "in_progress",
    order: 7
  },
  {
    id: "8",
    slug: "senegal-vote-civicrise",
    projectName: { 
      fr: "SENEGAL VOTE CIVICRISE - Plateforme Toopko", 
      en: "SENEGAL VOTE CIVICRISE - Toopko Platform" 
    },
    organization: "Association Wa Mbedmi",
    country: { fr: "Sénégal", en: "Senegal" },
    countryCode: "sn",
    countryFlag: "🇸🇳",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 25,
    status: "in_progress",
    order: 8
  },
  {
    id: "9",
    slug: "osc-amhara-ethiopie",
    projectName: { 
      fr: "Renforcement des OSC dirigées par les jeunes et les femmes pour une participation électorale inclusive dans la région d'Amhara", 
      en: "Strengthening Youth and Women-Led CSOs for Inclusive Electoral Participation in Amhara Region" 
    },
    organization: "Consortium for Networking and Development (COND)",
    country: { fr: "Éthiopie", en: "Ethiopia" },
    countryCode: "et",
    countryFlag: "🇪🇹",
    category: "major",
    budget: 15000,
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
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    duration: 10,
    progress: 10,
    status: "in_progress",
    order: 9
  },
  {
    id: "10",
    slug: "doorashokaab-somalie",
    projectName: { 
      fr: "DoorashoKaab", 
      en: "DoorashoKaab" 
    },
    organization: "Bareedo Platform",
    country: { fr: "Somalie", en: "Somalia" },
    countryCode: "so",
    countryFlag: "🇸🇴",
    category: "micro",
    budget: 5000,
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
    startDate: "2025-03-01",
    endDate: "2025-11-30",
    duration: 9,
    progress: 20,
    status: "in_progress",
    order: 10
  },
  {
    id: "11",
    slug: "inclusive-voices-somalie",
    projectName: { 
      fr: "Inclusive Voices", 
      en: "Inclusive Voices" 
    },
    organization: "Hopeline Foundation",
    country: { fr: "Somalie", en: "Somalia" },
    countryCode: "so",
    countryFlag: "🇸🇴",
    category: "micro",
    budget: 5000,
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
    startDate: "2025-03-01",
    endDate: "2025-11-30",
    duration: 9,
    progress: 15,
    status: "in_progress",
    order: 11
  },
  {
    id: "12",
    slug: "digital-empowerment-ethiopie",
    projectName: { 
      fr: "Exploitation des outils numériques pour l'autonomisation des jeunes et des femmes dans le processus électoral éthiopien de 2025", 
      en: "Harnessing Digital Tools for Youth and Women's Empowerment in Ethiopia's 2025 Electoral Process" 
    },
    organization: "Ethiopian Women Federation",
    country: { fr: "Éthiopie", en: "Ethiopia" },
    countryCode: "et",
    countryFlag: "🇪🇹",
    category: "micro",
    budget: 5000,
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
    startDate: "2025-03-01",
    endDate: "2025-11-30",
    duration: 9,
    progress: 10,
    status: "in_progress",
    order: 12
  }
]
```

## Fonctions utilitaires

```typescript
// lib/projects.ts

import { projects } from '@/data/projects'
import { Project, ProjectCategory } from '@/types/project'

export function getAllProjects(): Project[] {
  return projects.sort((a, b) => (a.order || 0) - (b.order || 0))
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter(p => p.category === category)
}

export function getProjectsByCountry(countryCode: string): Project[] {
  return projects.filter(p => p.countryCode === countryCode)
}

export function getFeaturedProjects(count: number = 4): Project[] {
  return projects
    .filter(p => p.featured)
    .slice(0, count)
}

export function getSimilarProjects(
  projectId: string, 
  count: number = 3
): Project[] {
  const project = getProjectById(projectId)
  if (!project) return []
  
  return projects
    .filter(p => p.id !== projectId)
    .sort((a, b) => {
      let scoreA = 0
      let scoreB = 0
      
      // Même pays = +2
      if (a.countryCode === project.countryCode) scoreA += 2
      if (b.countryCode === project.countryCode) scoreB += 2
      
      // Même catégorie = +1
      if (a.category === project.category) scoreA += 1
      if (b.category === project.category) scoreB += 1
      
      return scoreB - scoreA
    })
    .slice(0, count)
}

export function getProjectStats() {
  const total = projects.length
  const major = projects.filter(p => p.category === 'major').length
  const micro = projects.filter(p => p.category === 'micro').length
  const countries = new Set(projects.map(p => p.countryCode)).size
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  
  return { total, major, micro, countries, totalBudget }
}

export function getUniqueCountries(): Array<{
  code: string
  name: { fr: string; en: string }
  flag: string
  count: number
}> {
  const countryMap = new Map<string, {
    name: { fr: string; en: string }
    flag: string
    count: number
  }>()
  
  projects.forEach(p => {
    const existing = countryMap.get(p.countryCode)
    if (existing) {
      existing.count++
    } else {
      countryMap.set(p.countryCode, {
        name: p.country,
        flag: p.countryFlag,
        count: 1
      })
    }
  })
  
  return Array.from(countryMap.entries()).map(([code, data]) => ({
    code,
    ...data
  }))
}

export function getUniqueTechnologies(lang: 'fr' | 'en' = 'fr'): string[] {
  const techs = new Set<string>()
  projects.forEach(p => {
    p.technologies[lang].forEach(t => techs.add(t))
  })
  return Array.from(techs).sort()
}
```

## Statistiques clés

| Métrique | Valeur |
|----------|--------|
| Total projets | 12 |
| Projets Major | 9 |
| Micro-grants | 3 |
| Budget Major | 15 000€ |
| Budget Micro | 5 000€ |
| Budget total | 165 000€* |
| Pays couverts | 9 (avec doublons) |
| Pays uniques | 8 |

*Note: Le budget total des 12 projets = 9×15000 + 3×5000 = 150 000€
Le budget du Fonds est de 175 000€ (différence = frais de gestion)

## Critères d'acceptation

- [ ] Tous les 12 projets ont leurs données complètes
- [ ] Les nouveaux champs (budget, dates, progression) sont renseignés
- [ ] **Aucun email de contact n'est présent**
- [ ] Les fonctions utilitaires sont implémentées
- [ ] Les types TypeScript sont corrects
- [ ] Les slugs sont uniques et URL-friendly

## Migration depuis `winners-showcase.tsx`

Les données actuelles dans `components/winners-showcase.tsx` doivent être migrées vers `data/projects.ts` :

1. Copier les données existantes
2. Ajouter les nouveaux champs (budget, dates, progression)
3. Supprimer le champ `contact`
4. Ajouter `slug`, `featured`, `order`
5. Mettre à jour les imports dans les composants
