"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface HomeDocument {
  id: string
  name: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  filename: {
    fr: string
    en: string
  }
  type: 'pdf' | 'docx' | 'xlsx'
}

export default function HomeDocuments() {
  const { language } = useLanguage()

  const documents: HomeDocument[] = [
    {
      id: "concept-note",
      name: {
        fr: "Note de cadrage",
        en: "Concept Note"
      },
      description: {
        fr: "Document cadre présentant les objectifs et la vision du fonds d'innovation démocratique",
        en: "Framework document presenting the objectives and vision of the democratic innovation fund"
      },
      filename: {
        fr: 'note_de_cadrage_fr.pdf',
        en: 'framing_note_en.pdf'
      },
      type: 'pdf'
    },
    {
      id: "call-for-proposals",
      name: {
        fr: "Appel à projet",
        en: "Call for Projects"
      },
      description: {
        fr: "Termes de référence détaillés pour la soumission de votre projet innovant",
        en: "Detailed terms of reference for submitting your innovative project"
      },
      filename: {
        fr: 'appel_a_projet_fr.pdf',
        en: 'call_for_projects_en.pdf'
      },
      type: 'pdf'
    },
    {
      id: "project-description",
      name: {
        fr: "Descriptif projet",
        en: "Project Description"
      },
      description: {
        fr: "Template structuré pour présenter votre vision et votre impact démocratique",
        en: "Structured template to present your vision and democratic impact"
      },
      filename: {
        fr: 'descriptif_projet_fr.docx',
        en: 'project_description_en.docx'
      },
      type: 'docx'
    },
    {
      id: "budget-template",
      name: {
        fr: "Budget",
        en: "Budget"
      },
      description: {
        fr: "Modèle Excel détaillé pour structurer votre budget prévisionnel et vos ressources",
        en: "Detailed Excel template to structure your projected budget and resources"
      },
      filename: {
        fr: 'budget_fr.xlsx',
        en: 'budget_en.xlsx'
      },
      type: 'xlsx'
    }
  ]

  const handleDownload = (filename: string) => {
    try {
      const link = document.createElement('a')
      link.href = `/documents/${filename}`
      link.download = filename
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
      window.open(`/documents/${filename}`, '_blank')
    }
  }

  // Traductions pour les textes de l'interface
  const texts = {
    fr: {
      sectionTitle: "Documents de Réponse à l'Appel à Projets",
      downloadButton: "Télécharger"
    },
    en: {
      sectionTitle: "Call for Projects Response Documents", 
      downloadButton: "Télécharger"
    }
  }

  const currentTexts = texts[language] || texts.en

  return (
    <section className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16">
      <div className="container mx-auto px-6">
        {/* Titre de la section */}
        <div className="mb-12">
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            {currentTexts.sectionTitle}
          </h2>
        </div>

        {/* Grille de documents en format horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc) => {
            const currentFilename = doc.filename[language] || doc.filename.en

            return (
              <Card 
                key={`${language}-${doc.id}`} 
                className="bg-blue-800/40 border border-blue-600/30 backdrop-blur-sm hover:bg-blue-700/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  {/* Titre du document */}
                  <h3 className="text-white text-lg font-semibold mb-4">
                    {doc.name[language] || doc.name.en}
                  </h3>

                  {/* Bouton de téléchargement */}
                  <Button
                    onClick={() => handleDownload(currentFilename)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {currentTexts.downloadButton}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}