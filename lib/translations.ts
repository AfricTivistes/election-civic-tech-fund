export interface Translation {
  header: {
    title: string
    subtitle: string
    estimatedTime: string
    funding: string
    possibilities: string
    homeButton: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    startButton: string
    features: {
      funding: string
      countries: string
      possibilities: string
    }
    footer: {
      ledBy: string
      poweredBy: string
      projectDescription: string
      copyright: string
      tagline: string
    }
  }
  steps: {
    step1: {
      title: string
      description: string
      expertTip: {
        title: string
        content: string
      }
    }
    step2: {
      title: string
      description: string
      expertTip: {
        title: string
        content: string
      }
    }
    step3: {
      title: string
      description: string
      expertTip: {
        title: string
        content: string
      }
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
      required: string
      uploaded: string
      replace: string
      upload: string
      projectSummary: string
      vision: string
      domain: string
      technologies: string
      team: string
      notProvided: string
      notSelected: string
      notSelectedTech: string
      members: string
      prevButton: string
      submitButton: string
      submitting: string
      completionMessage: string
    }
  }
  documents: {
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
    budget: {
      name: string
      description: string
    }
  }
  achievements: {
    title: string
  }
}

export const translations: Record<string, Translation> = {
  fr: {
    header: {
      title: "Election Civic Tech Fund",
      subtitle: "Parcours Démocratie Numérique",
      estimatedTime: "Temps estimé",
      funding: "175 000€ • 14 Pays",
      possibilities: "∞ Possibilités",
      homeButton: "Accueil",
    },
    hero: {
      title: "Election Civic Tech Fund",
      subtitle: "Transformez la démocratie africaine avec la technologie",
      description: "Rejoignez le mouvement pour une démocratie plus inclusive et transparente en Afrique",
      startButton: "Commencer ma candidature",
      features: {
        funding: "175 000€",
        countries: "14 Pays",
        possibilities: "∞ Possibilités",
      },
      footer: {
        ledBy: "Mené par",
        poweredBy: "Propulsé par",
        projectDescription: "Une initiative pour renforcer la démocratie en Afrique grâce à la technologie civique",
        copyright: "© 2024 Election Civic Tech Fund - AfricTivistes",
        tagline: "Ensemble, nous construisons l'avenir démocratique de l'Afrique",
      },
    },
    steps: {
      step1: {
        title: "Votre Vision Démocratique",
        description: "Décrivez votre ambition pour transformer la démocratie",
        expertTip: {
          title: "Conseil d'Expert",
          content:
            "Soyez précis et concret dans votre vision. Les projets les plus impactants ont une vision claire et mesurable.",
        },
      },
      step2: {
        title: "L'Impact Technologique",
        description: "Modélisez votre solution technologique",
        expertTip: {
          title: "Conseil d'Expert",
          content: "Choisissez des technologies adaptées à votre contexte local et à vos utilisateurs cibles.",
        },
      },
      step3: {
        title: "Votre Équipe Citoyenne",
        description: "Présentez les acteurs de votre projet",
        expertTip: {
          title: "Conseil d'Expert",
          content: "Une équipe diversifiée avec des compétences complémentaires augmente vos chances de succès.",
        },
      },
      step4: {
        title: "Votre Arsenal Numérique",
        description: "Téléversez vos documents justificatifs",
        expertTip: {
          title: "Conseil d'Expert",
          content:
            "Assurez-vous que tous vos documents sont au format PDF et lisibles. Notre IA les analysera automatiquement.",
        },
        completionScore: "Score de Completion",
        completionText: "Votre dossier est complété à",
        readySubmission: "Prêt pour soumission",
        requiredDocs: "Documents Requis",
        aiDescription: "Notre IA vérifie automatiquement vos documents",
        required: "*",
        uploaded: "Téléversé",
        replace: "Remplacer",
        upload: "Téléverser",
        projectSummary: "Résumé du Projet",
        vision: "Vision",
        domain: "Domaine",
        technologies: "Technologies",
        team: "Équipe",
        notProvided: "Non fourni",
        notSelected: "Non sélectionné",
        notSelectedTech: "Non sélectionnées",
        members: "membres",
        prevButton: "Précédent",
        submitButton: "Soumettre",
        submitting: "Soumission...",
        completionMessage: "Complétez votre dossier pour pouvoir soumettre",
      },
    },
    documents: {
      registration: {
        name: "Certificat d'enregistrement",
        description: "Document officiel d'enregistrement de votre organisation",
      },
      cvs: {
        name: "CVs de l'équipe",
        description: "Curriculum vitae des membres clés de l'équipe",
      },
      project: {
        name: "Description du projet",
        description: "Document détaillé décrivant votre projet",
      },
      theory: {
        name: "Théorie du changement",
        description: "Votre approche théorique pour créer l'impact",
      },
      budget: {
        name: "Budget détaillé",
        description: "Répartition financière complète du projet",
      },
    },
    achievements: {
      title: "Réalisations",
    },
  },
  en: {
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
        expertTip: {
          title: "Expert Tip",
          content:
            "Be precise and concrete in your vision. The most impactful projects have a clear and measurable vision.",
        },
      },
      step2: {
        title: "The Technological Impact",
        description: "Model your technological solution",
        expertTip: {
          title: "Expert Tip",
          content: "Choose technologies adapted to your local context and target users.",
        },
      },
      step3: {
        title: "Your Citizen Team",
        description: "Present the actors of your project",
        expertTip: {
          title: "Expert Tip",
          content: "A diverse team with complementary skills increases your chances of success.",
        },
      },
      step4: {
        title: "Your Digital Arsenal",
        description: "Upload your supporting documents",
        expertTip: {
          title: "Expert Tip",
          content:
            "Make sure all your documents are in PDF format and readable. Our AI will analyze them automatically.",
        },
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
      registration: {
        name: "Registration certificate",
        description: "Official registration document of your organization",
      },
      cvs: {
        name: "Team CVs",
        description: "Curriculum vitae of key team members",
      },
      project: {
        name: "Project description",
        description: "Detailed document describing your project",
      },
      theory: {
        name: "Theory of change",
        description: "Your theoretical approach to creating impact",
      },
      budget: {
        name: "Detailed budget",
        description: "Complete financial breakdown of the project",
      },
    },
    achievements: {
      title: "Achievements",
    },
  },
}
