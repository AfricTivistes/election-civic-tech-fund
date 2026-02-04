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
    domain: { fr: "Fact-checking électoraux", en: "Electoral Fact-checking" },
    description: {
      fr: "Le projet vise à renforcer l'intégrité de l'information électorales en formant les jeunes journalistes, les étudiants et le grand public à la vérification des faits et à la littératie médiatique. Grâce à une plateforme numérique, à des programmes de formation et à des bourses, il encourage la production de contenus fiables, lutte contre la désinformation et soutient la création de réseaux de vérificateurs ainsi que de clubs de médias scolaires.",
      en: "The project aims to strengthen the integrity of electoral information by training young journalists, students, and the general public in fact-checking and media literacy."
    },
    impact: {
      fr: "Renforcer la confiance citoyenne et la transparence du processus électorals au Soudan du Sud",
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
    domain: { fr: "Surveillance citoyenne électorales", en: "Electoral Citizen Monitoring" },
    description: {
      fr: "Le projet vise à renforcer la transparence et la participation citoyenne au Bénin en période électorales à travers une plateforme numérique collaborative et un site web avec des contenus multimédias plurilingue en fon, dendi, bariba, yoruba et mina.",
      en: "The project aims to strengthen transparency and citizen participation in Benin during electoral periods through a collaborative digital platform and multilingual website."
    },
    impact: {
      fr: "Favoriser la transparence et l'éducation numérique électorales au Bénin",
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
    domain: { fr: "IA et fact-checking électorals", en: "AI and Electoral Fact-checking" },
    description: {
      fr: "Le projet déploie myaifactchecker.org, la première plateforme africaine multilingue de vérification de faits basée sur l'IA, pour lutter contre la désinformation électorales au Cameroun.",
      en: "The project deploys myaifactchecker.org, the first African multilingual AI-powered fact-checking platform, to combat electoral disinformation in Cameroon."
    },
    impact: {
      fr: "Contrer la désinformation électorales et promouvoir l'information fiable au Cameroun",
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
      fr: "Plateforme électorales citoyenne du Sénégal",
      en: "Citizen Electoral Platform of Senegal"
    },
    organization: "Vie Publique Sénégal",
    country: { fr: "Sénégal", en: "Senegal" },
    countryCode: "sn",
    countryFlag: "🇸🇳",
    category: "major",
    budget: 15000,
    domain: { fr: "Open data et transparence électorales", en: "Open Data and Electoral Transparency" },
    description: {
      fr: "Le projet renforce la transparence et la participation citoyenne à travers une plateforme numérique open source d'information et de suivi électorals.",
      en: "The project strengthens transparency and citizen participation through an open-source digital platform for electoral information and monitoring."
    },
    impact: {
      fr: "Faciliter la transparence et l'accès à l'information électorales en temps réel au Sénégal",
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
      fr: "PACTE - Participation Active et Citoyenne des jeunes pour une Transition Électorales inclusive",
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
      fr: "Le projet vise à renforcer la participation civique des jeunes Guinéens, notamment les jeunes femmes, en mobilisant les technologies civiques.",
      en: "The project aims to strengthen the civic participation of young Guineans, particularly young women, by using civic technologies."
    },
    impact: {
      fr: "Renforcer la participation démocratique et la transparence électorales en Guinée",
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
      fr: "Le projet vise à renforcer la transparence électorales, l'engagement citoyen et la participation crédible au Cameroun.",
      en: "The project aims to strengthen electoral transparency, civic engagement, and credible participation in Cameroon."
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
      fr: "Le projet vise à outiller les jeunes de Nouakchott afin de renforcer leur accès à l'information juridique électorales.",
      en: "The project aims to equip young people in Nouakchott with improved access to electoral legal information."
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
      fr: "Le projet est une extension numérique de la plateforme Senegalvote.org, conçue pour permettre aux citoyens de suivre et d'évaluer les engagements pris par les responsables publics.",
      en: "The project is a digital extension of the SenegalVote.org platform, designed to enable citizens to track and evaluate commitments."
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
      fr: "Renforcement des OSC dirigées par les jeunes et les femmes pour une participation électorales inclusive dans la région d'Amhara",
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
      fr: "Le projet vise à renforcer la participation électorales inclusive, transparente et pacifique dans la région d'Amhara.",
      en: "The project aims to strengthen inclusive, transparent, and peaceful electoral participation in the Amhara region."
    },
    impact: {
      fr: "Promouvoir l'implication active des OSC dans la gouvernance électorales en Amhara",
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
    domain: { fr: "Sensibilisation électorales multilingue", en: "Multilingual Electoral Awareness" },
    description: {
      fr: "Le projet est une initiative de civic tech visant à renforcer la participation significative des jeunes Somaliens.",
      en: "The project is a civic tech initiative aiming to strengthen meaningful participation of Somali youth."
    },
    impact: {
      fr: "Renforcer la participation civique et la transparence électorales en Somalie",
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
      fr: "Le projet vise à renforcer la sensibilisation électorales, la participation et le leadership des jeunes et des femmes somaliennes.",
      en: "The project aims to strengthen electoral awareness, participation, and leadership among Somali youth and women."
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
      fr: "Exploitation des outils numériques pour l'autonomisation des jeunes et des femmes dans le processus électorals éthiopien de 2025",
      en: "Harnessing Digital Tools for Youth and Women's Empowerment in Ethiopia's 2025 Electoral Process"
    },
    organization: "Ethiopian Women Federation",
    country: { fr: "Éthiopie", en: "Ethiopia" },
    countryCode: "et",
    countryFlag: "🇪🇹",
    category: "micro",
    budget: 5000,
    domain: { fr: "Autonomisation numérique électorales", en: "Digital Electoral Empowerment" },
    description: {
      fr: "Le projet vise à outiller les jeunes et les femmes éthiopiennes pour une participation active et influente aux élections de 2025.",
      en: "The project aims to equip Ethiopian youth and women for active and influential participation in the 2025 elections."
    },
    impact: {
      fr: "Contribuer à une participation électorales inclusive, sûre et informée en Éthiopie",
      en: "Contribute to inclusive, safe, and informed electoral participation in Ethiopia"
    },
    technologies: {
      fr: ["Plateforme Numérique", "SMS", "IVR", "Leadership Féminin"],
      en: ["Digital Platform", "SMS", "IVR", "Women's Leadership"]
    },
    projectImage: "/9.jpg",
    website: "https://ethiopianwomenfederation.org/",
    startDate: "2025-03-01",
    endDate: "2025-11-30",
    duration: 9,
    progress: 10,
    status: "in_progress",
    order: 12
  }
]
