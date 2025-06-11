export interface Translation {
  // Header
  header: {
    title: string
    subtitle: string
    estimatedTime: string
    homeButton: string
    funding: string
    countries: string
    possibilities: string
  }

  // Hero Section
  hero: {
    title: string
    subtitle: string
    description: string
    secondDescription: string
    startButton: string
    features: {
      innovation: string
      impact: string
      solutions: string
      democracy: string
    }
    stats: {
      majorProjects: string
      majorProjectsDesc: string
      microGrants: string
      microGrantsDesc: string
      support: string
      supportDesc: string
    }
    footer: {
      ledBy: string
      designedBy: string
      poweredBy: string
      projectDescription: string
      copyright: string
      tagline: string
    }
    guide: {
      title: string
      subtitle: string
      description: {
        title: string
        content: string
      }
      videoTitle: string
      videoDescription: string
      features: {
        practicalTips: string
        practicalTipsDesc: string
        checklists: string
        checklistsDesc: string
        faq: string
        faqDesc: string
        strategies: string
        strategiesDesc: string
      }
      accessButton: string
    }
  }

  // Steps
  steps: {
    step1: {
      title: string
      description: string
      expertTip: {
        title: string
        content: string
      }
      visionTitle: string
      visionDescription: string
      visionPlaceholder: string
      problemTitle: string
      problemDescription: string
      problemPlaceholder: string
      domainTitle: string
      domainDescription: string
      nextButton: string
      completionMessage: string
    }
    step2: {
      title: string
      description: string
      expertTip: {
        title: string
        content: string
      }
      selectTech: string
      selectTechDesc: string
      impactTitle: string
      impactSubtitle: string
      nextButton: string
      prevButton: string
      completionMessage: string
    }
    step3: {
      title: string
      description: string
      expertTip: {
        title: string
        content: string
      }
      teamOverview: string
      totalMembers: string
      totalSkills: string
      membersWithExperience: string
      completionRate: string
      teamStats: string
      teamMembers: string
      addMember: string
      addMemberDesc: string
      fullName: string
      fullNamePlaceholder: string
      role: string
      rolePlaceholder: string
      skills: string
      skillCategories: {
        technical: string
        social: string
        field: string
        management: string
      }
      experience: string
      experiencePlaceholder: string
      motivation: string
      motivationPlaceholder: string
      addButton: string
      nextButton: string
      prevButton: string
      completionMessage: string
      uploaded: string
      replace: string
    }
    step4: {
      title: string
      description: string
      expertTip: {
        title: string
        content: string
      }
      completionScore: string
      completionText: string
      readySubmission: string
      requiredDocs: string
      aiDescription: string
      projectSummary: string
      vision: string
      domain: string
      technologies: string
      team: string
      members: string
      notProvided: string
      notSelected: string
      notSelectedTech: string
      submitButton: string
      submitting: string
      prevButton: string
      completionMessage: string
      uploaded: string
      replace: string
      upload: string
      required: string
    }
  }

  // Progress
  progress: {
    title: string
    estimatedTime: string
  }

  // Achievements
  achievements: {
    title: string
  }

  // Domains
  domains: {
    tech: {
      title: string
      description: string
      examples: string[]
    }
    engagement: {
      title: string
      description: string
      examples: string[]
    }
    media: {
      title: string
      description: string
      examples: string[]
    }
    legal: {
      title: string
      description: string
      examples: string[]
    }
  }

  // Technologies
  technologies: {
    blockchain: {
      name: string
      description: string
    }
    ai: {
      name: string
      description: string
    }
    mobile: {
      name: string
      description: string
    }
    web: {
      name: string
      description: string
    }
    security: {
      name: string
      description: string
    }
    local: {
      name: string
      description: string
    }
  }

  // Skills
  skills: {
    technical: string[]
    social: string[]
    field: string[]
    management: string[]
  }

  // Documents
  documents: {
    cv: {
      name: string
      description: string
    }
    portfolio: {
      name: string
      description: string
    }
    budget: {
      name: string
      description: string
    }
    presentation: {
      name: string
      description: string
    }
    other: {
      name: string
      description: string
    }
    registration: {
      name: string
      description: string
    }
    cvs: {
      name: string
      description: string
    }
    project: {
      name: string
      description: string
    }
    theory: {
      name: string
      description: string
    }
  }

  home: {
    documents: {
      title: string
      subtitle: string
      conceptNote: {
        name: string
        description: string
      }
      callForProposals: {
        name: string
        description: string
      }
      projectDescription: {
        name: string
        description: string
      }
      budgetTemplate: {
        name: string
        description: string
      }
      preview: string
      download: string
      readyTitle: string
      readyText: string
      tip: string
    }
  }

  // Countries challenges
  countries: {
    [key: string]: {
      challenges: string[]
    }
  }
}

export const translations: Record<string, Translation> = {
  fr: {
    header: {
      title: "Election Civic Tech Fund",
      subtitle: "Digital Democracy Journey",
      estimatedTime: "Temps estimé",
      homeButton: "Accueil",
      funding: "175 000€ • 14 Pays",
      countries: "14 Pays",
      possibilities: "∞ Possibilités",
    },
    hero: {
      title: "ELECTION CIVIC TECH FUND",
      subtitle: "Digital Democracy Journey",
      description:
        "Transforme la participation citoyenne en Afrique grâce aux technologies innovantes. Notre mission : démocratiser l'accès aux outils numériques pour renforcer la transparence électorale et l'engagement civique.",
      platformDescription: "Cette plateforme est conçue comme un outil interactif pour faciliter votre candidature. Ce présent appel à projets vous invite à proposer vos idées innovantes à travers quatre étapes clés.",
      secondDescription:
        "Rejoignez une communauté de 175 000€ dédiée à l'innovation démocratique dans 14 pays africains. Ensemble, construisons l'avenir numérique de la démocratie africaine.",
      startButton: "Soumettez maintenant votre dossier",
      features: {
        innovation: "Innovation Technologique",
        impact: "Impact Panafricain",
        solutions: "Solutions Citoyennes",
        democracy: "Démocratie Inclusive",
      },
      stats: {
        majorProjects: "4-6",
        majorProjectsDesc: "Projets Majeurs",
        microGrants: "10+",
        microGrantsDesc: "Micro-subventions",
        support: "10",
        supportDesc: "Mois d'accompagnement",
      },
      footer: {
        ledBy: "Mené par",
        designedBy: "Conçu et géré par",
        poweredBy: "Propulsé par",
        projectDescription:
          "Ce fonds s'inscrit dans le cadre du projet « Digitalise Youth », qui vise à lutter contre le rétrécissement de l'espace civique et la désinformation rampante dans les régions du Sahel, de l'Ouest et de la Corne de l'Afrique en renforçant les compétences numériques des jeunes militants locaux et des organisations de la société civile, en promouvant des solutions technologiques civiques et en sensibilisant le public à l'engagement politique en ligne.",
        copyright: "© 2024 Election Civic Tech Fund - AfricTivistes",
        tagline: "Ensemble, nous construisons l'avenir démocratique de l'Afrique",
      },
      guide: {
        title: "Prêt à impacter positivement les processus électoraux en Afrique ?",
        subtitle: "Consultez notre guide expert pour maximiser vos chances de succès",
        description: {
          title: "Découvrez ce qui vous attend",
          content:
            "Notre guide interactif vous accompagne étape par étape pour construire un dossier parfait. Préparez-vous efficacement et évitez les erreurs courantes.",
        },
        videoTitle: "Guide Vidéo : Comment Réussir sa Candidature",
        videoDescription: "Découvrez les secrets d'un dossier gagnant",
        features: {
          practicalTips: "✨ Conseils pratiques",
          practicalTipsDesc: "Pour chaque section",
          checklists: "📋 Listes de vérification",
          checklistsDesc: "Documents requis",
          faq: "❓ FAQ détaillée",
          faqDesc: "Réponses aux questions",
          strategies: "🎯 Stratégies gagnantes",
          strategiesDesc: "Maximisez vos chances",
        },
        accessButton: "Accéder au Guide Complet",
      },
    },
    steps: {
      step1: {
        title: "Votre Vision Démocratique",
        description: "Quelle est l'idée citoyenne que vous souhaitez porter ?",
        expertTip: {
          title: "Conseil d'Expert",
          content:
            "Plus votre vision est claire et spécifique, plus elle aura d'impact. Ce que vous proposez ici deviendra l'âme de votre projet et guidera toutes les étapes suivantes.",
        },
        visionTitle: "Décrivez votre ambition démocratique",
        visionDescription:
          "Racontez-nous votre vision, ce que vous cherchez à transformer dans votre pays, et comment la technologie peut être un levier.",
        visionPlaceholder: "Décrivez votre vision pour transformer la démocratie dans votre pays...",
        problemTitle: "Le problème électoral que vous ciblez",
        problemDescription: "Identifiez clairement le défi démocratique que votre projet souhaite résoudre.",
        problemPlaceholder: "Quel problème électoral spécifique votre projet va-t-il résoudre ?",
        domainTitle: "Choisissez votre domaine prioritaire",
        domainDescription: "Sélectionnez le domaine principal dans lequel votre projet s'inscrit.",
        nextButton: "Continuer vers l'Impact Technologique",
        completionMessage: "Complétez tous les champs pour continuer votre parcours démocratique",
      },
      step2: {
        title: "L'Impact Technologique",
        description: "Comment la technologie va-t-elle renforcer votre impact citoyen ?",
        expertTip: {
          title: "Impact Estimé",
          content:
            "Notre outil calcule en direct un score d'impact social et technologique pour vous aider à affiner votre proposition et maximiser votre potentiel démocratique.",
        },
        selectTech: "Sélectionnez vos technologies",
        selectTechDesc:
          "Choisissez les outils technologiques que vous utiliserez. Vous pouvez en sélectionner plusieurs.",
        impactTitle: "Visualisation de votre ADN Démocratique",
        impactSubtitle: "Score d'Impact Social et Technologique",
        nextButton: "Continuer vers l'Équipe",
        prevButton: "Retour à la Vision",
        completionMessage: "Sélectionnez au moins une technologie pour continuer",
      },
      step3: {
        title: "Votre Équipe Citoyenne",
        description: "Qui êtes-vous ? Avec qui allez-vous porter ce projet ?",
        expertTip: {
          title: "Conseil d'Expert",
          content:
            "Mettez en avant la diversité, l'équilibre, l'expérience terrain et l'ancrage local. Une démocratie forte repose sur des équipes engagées.",
        },
        teamOverview: "Aperçu de l'équipe",
        totalMembers: "Nombre total de membres",
        totalSkills: "Nombre total de compétences",
        membersWithExperience: "Membres avec expérience",
        completionRate: "Taux de complétion",
        teamStats: "Radar de Compétences de l'Équipe",
        teamMembers: "Membres de l'équipe",
        addMember: "Ajouter un membre d'équipe",
        addMemberDesc: "Présentez les personnes clés qui porteront votre initiative.",
        fullName: "Nom complet",
        fullNamePlaceholder: "Nom et prénom",
        role: "Rôle dans le projet",
        rolePlaceholder: "Ex: Chef de projet, Développeur, etc.",
        skills: "Compétences",
        skillCategories: {
          technical: "Technique",
          social: "Social",
          field: "Terrain",
          management: "Gestion",
        },
        experience: "Expérience pertinente",
        experiencePlaceholder: "Décrivez l'expérience pertinente de ce membre...",
        motivation: "Motivation personnelle",
        motivationPlaceholder: "Pourquoi cette personne s'engage-t-elle dans ce projet ?",
        addButton: "Ajouter ce membre",
        nextButton: "Continuer vers les Documents",
        prevButton: "Retour à la Technologie",
        completionMessage: "Ajoutez au moins 2 membres d'équipe pour continuer",
        uploaded: "Uploadé",
        replace: "Remplacer",
      },
      step4: {
        title: "Votre Arsenal Numérique",
        description: "Faites décoller votre dossier avec les bons documents",
        expertTip: {
          title: "Bonus Technologique",
          content:
            "Tous les fichiers uploadés génèrent des animations visuelles holographiques, renforçant la sensation de construire un projet technologique et vivant qui prend forme sous vos yeux.",
        },
        completionScore: "Score de Complétude",
        completionText: "Votre dossier est prêt à",
        readySubmission: "Prêt pour soumission",
        requiredDocs: "Documents Requis",
        aiDescription:
          "Une IA intégrée vous accompagne en temps réel pour vérifier la conformité et optimiser votre soumission.",
        projectSummary: "Récapitulatif de votre Projet",
        vision: "Vision",
        domain: "Domaine",
        technologies: "Technologies",
        team: "Équipe",
        members: "membres",
        notProvided: "Non renseigné",
        notSelected: "Non sélectionné",
        notSelectedTech: "Non sélectionnées",
        submitButton: "Soumettre ma Vision",
        submitting: "Soumission en cours...",
        prevButton: "Retour à l'Équipe",
        completionMessage: "Complétez au moins 80% des documents requis pour soumettre votre candidature",
        uploaded: "Uploadé",
        replace: "Remplacer",
        upload: "Upload",
        required: "*",
      },
    },
    progress: {
      title: "Progression du Democracy Builder",
      estimatedTime: "Temps estimé restant",
    },
    achievements: {
      title: "Réalisations",
    },
    domains: {
      tech: {
        title: "Technologies Citoyennes Électorales",
        description: "Blockchain, IA, outils civic tech, sécurité numérique",
        examples: ["Blockchain pour la transparence", "IA pour l'analyse", "Apps mobiles citoyennes"],
      },
      engagement: {
        title: "Engagement Citoyen",
        description: "Éducation civique, observation électorale, inclusion",
        examples: ["Éducation citoyenne", "Observation électorale", "Participation des jeunes"],
      },
      media: {
        title: "Médias & Information",
        description: "Fact-checking, lutte contre la désinformation",
        examples: ["Vérification des faits", "Médias citoyens", "Anti-désinformation"],
      },
      legal: {
        title: "Cadre Légal",
        description: "Réformes électorales, contentieux, veille juridique",
        examples: ["Réformes électorales", "Suivi contentieux", "Veille juridique"],
      },
    },
    technologies: {
      blockchain: {
        name: "Blockchain",
        description: "Sécurisation des données électorales",
      },
      ai: {
        name: "Intelligence Artificielle",
        description: "Analyse de tendances, modération",
      },
      mobile: {
        name: "Applications Mobiles",
        description: "Accessibilité des électeurs",
      },
      web: {
        name: "Plateformes Web Open-Source",
        description: "Solutions collaboratives",
      },
      security: {
        name: "Sécurité Numérique",
        description: "Protection des données",
      },
      local: {
        name: "Langues Locales & Accessibilité",
        description: "Inclusion numérique",
      },
    },
    skills: {
      technical: ["Développement", "Data Science", "Cybersécurité", "UX/UI"],
      social: ["Communication", "Community Management", "Formation", "Médiation"],
      field: ["Observation électorale", "Mobilisation", "Recherche", "Plaidoyer"],
      management: ["Management", "Finance", "Juridique", "Stratégie"],
    },
    documents: {
      cv: {
        name: "CV du porteur",
        description: "Curriculum vitae du porteur de projet",
      },
      portfolio: {
        name: "Portfolio",
        description: "Portfolio ou exemples de travaux antérieurs",
      },
      budget: {
        name: "Budget détaillé",
        description: "Budget complet du projet",
      },
      presentation: {
        name: "Présentation projet",
        description: "Présentation détaillée du projet",
      },
      other: {
        name: "Autres documents",
        description: "Documents complémentaires",
      },
      registration: {
        name: "Enregistrement Officiel",
        description: "Document d'enregistrement de votre organisation",
      },
      cvs: {
        name: "CV des Membres Clés",
        description: "CV des 2-3 membres principaux de l'équipe",
      },
      project: {
        name: "Description Détaillée du Projet",
        description: "Maximum 5 pages selon le modèle fourni",
      },
      theory: {
        name: "Théorie du Changement",
        description: "Plan d'action sur 10 mois",
      },
    },
    home: {
      documents: {
        title: "Documents de réponse à l'appel à projets",
        subtitle: "Téléchargez tous les documents nécessaires pour transformer votre vision démocratique en réalité avec le Election Civic Tech Fund.",
        conceptNote: {
          name: "Note de cadrage",
          description: "Document cadre présentant les objectifs et la vision du fonds d'innovation démocratique"
        },
        callForProposals: {
          name: "Appel à projets",
          description: "Termes de référence détaillés pour la soumission de votre projet innovant"
        },
        projectDescription: {
          name: "Descriptif projet",
          description: "Template structuré pour présenter votre vision et votre impact démocratique"
        },
        budgetTemplate: {
          name: "Template Budget",
          description: "Modèle Excel détaillé pour structurer votre budget prévisionnel et vos ressources"
        },
        preview: "Aperçu",
        download: "Télécharger",
        readyTitle: "Prêt à Commencer ?",
        readyText: "Tous les documents sont régulièrement mis à jour pour garantir les meilleures chances de succès à votre candidature.",
        tip: "Conseil : Lisez attentivement chaque document avant de commencer votre candidature"
      }
    },
    countries: {
      Sénégal: {
        challenges: ["Transparence électorale", "Participation jeunesse"],
      },
      Mali: {
        challenges: ["Stabilité politique", "Sécurité électorale"],
      },
      Niger: {
        challenges: ["Accès à l'information", "Éducation civique"],
      },
    },
  },
  en: {
    header: {
      title: "Election Civic Tech Fund",
      subtitle: "Digital Democracy Journey",
      estimatedTime: "Estimated time",
      homeButton: "Home",
      funding: "€175,000 • 14 Countries",
      countries: "14 Countries",
      possibilities: "∞ Possibilities",
    },
    hero: {
      title: "ELECTION CIVIC TECH FUND",
      subtitle: "Digital Democracy Journey",
      description: "Transforms citizen participation in Africa through innovative technologies. Our mission: democratize access to digital tools to strengthen electoral transparency and civic engagement.",
      platformDescription: "This platform is designed as an interactive tool to facilitate your application. This call for projects invites you to propose your innovative ideas through four key steps.",
      secondDescription: "Join a €175,000 community dedicated to democratic innovation in 14 African countries. Together, let's build the digital future of African democracy.",
      startButton: "Submit your application now",
      features: {
        innovation: "Technological Innovation",
        impact: "Pan-African Impact",
        solutions: "Civic Solutions",
        democracy: "Inclusive Democracy",
      },
      stats: {
        majorProjects: "4-6",
        majorProjectsDesc: "Major Projects",
        microGrants: "10+",
        microGrantsDesc: "Micro-grants",
        support: "10",
        supportDesc: "Months of support",
      },
      footer: {
        ledBy: "Led by",
        designedBy: "Designed and managed by",
        poweredBy: "Powered by",
        projectDescription:
          "This fund is part of the 'Digitalise Youth' project, which aims to combat the shrinking civic space and rampant disinformation in the Sahel, West and Horn of Africa regions by strengthening the digital skills of local young activists and civil society organizations, promoting civic technology solutions and raising public awareness of online political engagement.",
        copyright: "© 2024 Election Civic Tech Fund - AfricTivistes",
        tagline: "Together, we are building Africa's democratic future",
      },
      guide: {
        title: "Ready to positively impact electoral processes in Africa?",
        subtitle: "Consult our expert guide to maximize your chances of success",
        description: {
          title: "Discover what awaits you",
          content:
            "Our interactive guide accompanies you step by step to build a perfect application. Prepare effectively and avoid common mistakes.",
        },
        videoTitle: "Video Guide: How to Succeed in Your Application",
        videoDescription: "Discover the secrets of a winning application",
        features: {
          practicalTips: "✨ Practical tips",
          practicalTipsDesc: "For each section",
          checklists: "📋 Checklists",
          checklistsDesc: "Required documents",
          faq: "❓ Detailed FAQ",
          faqDesc: "Answers to questions",
          strategies: "🎯 Winning strategies",
          strategiesDesc: "Maximize your chances",
        },
        accessButton: "Access Complete Guide",
      },
    },
    steps: {
      step1: {
        title: "Your Democratic Vision",
        description: "What is the civic idea you want to champion?",
        expertTip: {
          title: "Expert Advice",
          content:
            "The clearer and more specific your vision, the greater its impact. What you propose here will become the soul of your project and guide all subsequent steps.",
        },
        visionTitle: "Describe your democratic ambition",
        visionDescription:
          "Tell us about your vision, what you seek to transform in your country, and how technology can be a lever.",
        visionPlaceholder: "Describe your vision to transform democracy in your country...",
        problemTitle: "The electoral problem you're targeting",
        problemDescription: "Clearly identify the democratic challenge your project aims to solve.",
        problemPlaceholder: "What specific electoral problem will your project solve?",
        domainTitle: "Choose your priority domain",
        domainDescription: "Select the main domain in which your project fits.",
        nextButton: "Continue to Technological Impact",
        completionMessage: "Complete all fields to continue your democratic journey",
      },
      step2: {
        title: "Technological Impact",
        description: "How will technology strengthen your civic impact?",
        expertTip: {
          title: "Estimated Impact",
          content:
            "Our tool calculates a real-time social and technological impact score to help you refine your proposal and maximize your democratic potential.",
        },
        selectTech: "Select your technologies",
        selectTechDesc: "Choose the technological tools you will use. You can select multiple ones.",
        impactTitle: "Visualization of your Democratic DNA",
        impactSubtitle: "Social and Technological Impact Score",
        nextButton: "Continue to Team",
        prevButton: "Back to Vision",
        completionMessage: "Select at least one technology to continue",
      },
      step3: {
        title: "Your Civic Team",
        description: "Who are you? Who will you carry this project with?",
        expertTip: {
          title: "Expert Advice",
          content:
            "Highlight diversity, balance, field experience and local anchoring. A strong democracy relies on committed teams.",
        },
        teamOverview: "Team Overview",
        totalMembers: "Total Members",
        totalSkills: "Total Skills",
        membersWithExperience: "Members with experience",
        completionRate: "Completion Rate",
        teamStats: "Team Skills Radar",
        teamMembers: "Team members",
        addMember: "Add team member",
        addMemberDesc: "Present the key people who will carry your initiative.",
        fullName: "Full name",
        fullNamePlaceholder: "First and last name",
        role: "Role in the project",
        rolePlaceholder: "Ex: Project Manager, Developer, etc.",
        skills: "Skills",
        skillCategories: {
          technical: "Technical",
          social: "Social",
          field: "Field",
          management: "Management",
        },
        experience: "Relevant experience",
        experiencePlaceholder: "Describe this member's relevant experience...",
        motivation: "Personal motivation",
        motivationPlaceholder: "Why is this person committed to this project?",
        addButton: "Add this member",
        nextButton: "Continue to Documents",
        prevButton: "Back to Technology",
        completionMessage: "Add at least 2 team members to continue",
        uploaded: "Uploaded",
        replace: "Replace",
      },
      step4: {
        title: "Your Digital Arsenal",
        description: "Launch your application with the right documents",
        expertTip: {
          title: "Technological Bonus",
          content:
            "All uploaded files generate holographic visual animations, reinforcing the feeling of building a technological and living project that takes shape before your eyes.",
        },
        completionScore: "Completion Score",
        completionText: "Your file is ready at",
        readySubmission: "Ready for submission",
        requiredDocs: "Required Documents",
        aiDescription:
          "An integrated AI accompanies you in real time to verify compliance and optimize your submission.",
        projectSummary: "Summary of your Project",
        vision: "Vision",
        domain: "Domain",
        technologies: "Technologies",
        team: "Team",
        members: "members",
        notProvided: "Not provided",
        notSelected: "Not selected",
        submitButton: "Submit my Vision",
        submitting: "Submitting...",
        prevButton: "Back to Team",
        completionMessage: "Complete at least 80% of required documents to submit your application",
        uploaded: "Uploaded",
        replace: "Replace",
        upload: "Upload",
        required: "*",
      },
    },
    progress: {
      title: "Democracy Builder Progress",
      estimatedTime: "Estimated time remaining",
    },
    achievements: {
      title: "Achievements",
    },
    domains: {
      tech: {
        title: "Electoral Civic Technologies",
        description: "Blockchain, AI, civic tech tools, digital security",
        examples: ["Blockchain for transparency", "AI for analysis", "Civic mobile apps"],
      },
      engagement: {
        title: "Civic Engagement",
        description: "Civic education, electoral observation, inclusion",
        examples: ["Civic education", "Electoral observation", "Youth participation"],
      },
      media: {
        title: "Media & Information",
        description: "Fact-checking, fight against disinformation",
        examples: ["Fact verification", "Civic media", "Anti-disinformation"],
      },
      legal: {
        title: "Legal Framework",
        description: "Electoral reforms, litigation, legal monitoring",
        examples: ["Electoral reforms", "Litigation monitoring", "Legal watch"],
      },
    },
    technologies: {
      blockchain: {
        name: "Blockchain",
        description: "Electoral data security",
      },
      ai: {
        name: "Artificial Intelligence",
        description: "Trend analysis, moderation",
      },
      mobile: {
        name: "Mobile Applications",
        description: "Voter accessibility",
      },
      web: {
        name: "Open-Source Web Platforms",
        description: "Collaborative solutions",
      },
      security: {
        name: "Digital Security",
        description: "Data protection",
      },
      local: {
        name: "Local Languages & Accessibility",
        description: "Digital inclusion",
      },
    },
    skills: {
      technical: ["Development", "Data Science", "Cybersecurity", "UX/UI"],
      social: ["Communication", "Community Management", "Training", "Mediation"],
      field: ["Electoral observation", "Mobilization", "Research", "Advocacy"],
      management: ["Management", "Finance", "Legal", "Strategy"],
    },
    documents: {
      cv: {
        name: "CV of the lead",
        description: "Curriculum vitae of the project lead",
      },
      portfolio: {
        name: "Portfolio",
        description: "Portfolio or examples of previous work",
      },
      budget: {
        name: "Detailed budget",
        description: "Complete project budget",
      },
      presentation: {
        name: "Project presentation",
        description: "Detailed project presentation",
      },
      other: {
        name: "Other documents",
        description: "Additional supporting documents",
      },
      registration: {
        name: "Official Registration",
        description: "Your organization's registration document",
      },
      cvs: {
        name: "Key Members' CVs",
        description: "CVs of the 2-3 main team members",
      },
      project: {
        name: "Detailed Project Description",
        description: "Maximum 5 pages according to the provided template",
      },
      theory: {
        name: "Theory of Change",
        description: "10-month action plan",
      },
    },
    home: {
      documents: {
        title: "Call for Projects Response Documents",
        subtitle: "Download all necessary documents to transform your democratic vision into reality with the Election Civic Tech Fund.",
        conceptNote: {
          name: "Concept Note",
          description: "Framework document presenting the objectives and vision of the democratic innovation fund"
        },
        callForProposals: {
          name: "Call for Proposals",
          description: "Detailed terms of reference for submitting your innovative project"
        },
        projectDescription: {
          name: "Project Description",
          description: "Structured template to present your vision and democratic impact"
        },
        budgetTemplate: {
          name: "Budget Template",
          description: "Detailed Excel template to structure your projected budget and resources"
        },
        preview: "Preview",
        download: "Download",
        readyTitle: "Ready to Start?",
        readyText: "All documents are regularly updated to ensure the best chances of success for your application.",
        tip: "Tip: Read each document carefully before starting your application"
      }
    },
    countries: {
      Senegal: {
        challenges: ["Electoral transparency", "Youth participation"],
      },
      Mali: {
        challenges: ["Political stability", "Electoral security"],
      },
      Niger: {
        challenges: ["Access to information", "Civic education"],
      },
    },
  },
}