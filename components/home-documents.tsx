
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, ExternalLink, File, FileSpreadsheet, ArrowRight } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { Badge } from "@/components/ui/badge"

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
  icon: any
  color: string
}

export default function HomeDocuments() {
  const { t, language } = useLanguage()

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
        fr: 'AHEAD Africa DDI - Note de cadrage - Election Civic Tech Fund.pdf',
        en: 'ENG - AHEAD Africa DDI - Concept Note - Election Civic Tech Fund.pdf'
      },
      type: 'pdf',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: "call-for-proposals",
      name: {
        fr: "Appel à projets",
        en: "Call for Proposals"
      },
      description: {
        fr: "Termes de référence détaillés pour la soumission de votre projet innovant",
        en: "Detailed terms of reference for submitting your innovative project"
      },
      filename: {
        fr: 'TDR - Appel à projets - Election Civic Tech Fund - AfricTivistes.pdf',
        en: 'ENG ToR - Call for proposals - Election Civic Tech Fund - AfricTivistes.pdf'
      },
      type: 'pdf',
      icon: FileText,
      color: 'from-purple-500 to-pink-500'
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
        fr: 'Descriptif projet - Appel à projet - Election Civic Tech Fund - AfricTivistes.docx',
        en: 'ENG Project Description – Call for Proposals – Election Civic Tech Fund – AfricTivistes.docx'
      },
      type: 'docx',
      icon: File,
      color: 'from-emerald-500 to-green-500'
    },
    {
      id: "budget-template",
      name: {
        fr: "Budget",
        en: "Budget Template"
      },
      description: {
        fr: "Modèle Excel détaillé pour structurer votre budget prévisionnel et vos ressources",
        en: "Detailed Excel template to structure your projected budget and resources"
      },
      filename: {
        fr: 'Template Budget - Election Civic Tech Fund - AfricTivistes.xlsx',
        en: 'ENG Template Budget - Election Civic Tech Fund - AfricTivistes.xlsx'
      },
      type: 'xlsx',
      icon: FileSpreadsheet,
      color: 'from-orange-500 to-red-500'
    }
  ]</old_str>

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
      // Fallback: open in new tab
      window.open(`/documents/${filename}`, '_blank')
    }
  }

  const handleView = (filename: string) => {
    window.open(`/documents/${filename}`, '_blank')
  }</old_str>

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-500/20 text-red-200 border-red-500/40'
      case 'docx': return 'bg-blue-500/20 text-blue-200 border-blue-500/40'
      case 'xlsx': return 'bg-green-500/20 text-green-200 border-green-500/40'
      default: return 'bg-gray-500/20 text-gray-200 border-gray-500/40'
    }
  }

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄'
      case 'docx': return '📝'
      case 'xlsx': return '📊'
      default: return '📁'
    }
  }

  return (
    <section className="container mx-auto px-6 py-16">
      {/* En-tête de section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-blue-200 bg-clip-text text-transparent">
          {language === 'en' ? 'Essential Documents' : 'Documents Essentiels'}
        </h2>

        <p className="text-blue-200/90 text-xl max-w-4xl mx-auto leading-relaxed">
          {language === 'en' 
            ? 'Download all necessary documents to transform your democratic vision into reality with the Election Civic Tech Fund.'
            : 'Téléchargez tous les documents nécessaires pour transformer votre vision démocratique en réalité avec le Election Civic Tech Fund.'
          }
        </p>
      </div>

      {/* Grille de documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        {documents.map((doc, index) => {
          const Icon = doc.icon
          const currentFilename = doc.filename[language]
          
          return (
            <Card 
              key={`${language}-${doc.id}`} 
              className="group bg-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient de fond dynamique */}
              <div className={`absolute inset-0 bg-gradient-to-br ${doc.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              <CardHeader className="pb-4 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`relative p-4 bg-gradient-to-br ${doc.color} bg-opacity-20 rounded-2xl border border-white/30 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                      <span className="absolute -top-2 -right-2 text-xl bg-white/20 rounded-full p-1 backdrop-blur-sm">
                        {getFileTypeIcon(doc.type)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-2xl group-hover:text-yellow-200 transition-colors mb-3 font-bold">
                        {doc.name[language]}
                      </CardTitle>
                      <Badge className={`${getFileTypeColor(doc.type)} border font-bold px-3 py-1`}>
                        {doc.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-blue-200/90 leading-relaxed pl-16 text-base">
                  {doc.description[language]}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-end space-x-4 pl-16">
                  <Button
                    onClick={() => handleView(currentFilename)}
                    variant="ghost"
                    size="lg"
                    className="text-blue-200 hover:text-white hover:bg-white/15 transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm group/btn"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    {language === 'en' ? 'Preview' : 'Aperçu'}
                  </Button>
                  <Button
                    onClick={() => handleDownload(currentFilename)}
                    size="lg"
                    className={`bg-gradient-to-r ${doc.color} hover:scale-105 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 font-bold group/btn`}
                  >
                    <Download className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    {language === 'en' ? 'Download' : 'Télécharger'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Section informative en bas */}
      <div className="text-center">
        <div className="inline-flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-10 py-8 shadow-2xl max-w-4xl">
          <h3 className="text-2xl font-bold text-white mb-2">
            {language === 'en' ? 'Ready to Start?' : 'Prêt à Commencer ?'}
          </h3>

          <p className="text-blue-200/90 text-lg leading-relaxed mb-4">
            {language === 'en' 
              ? 'All documents are regularly updated to ensure the best chances of success for your application.'
              : 'Tous les documents sont régulièrement mis à jour pour garantir les meilleures chances de succès à votre candidature.'
            }
          </p>

          <div className="flex items-center space-x-2 text-sm text-blue-300">
            <span>💡</span>
            <span className="font-medium">
              {language === 'en' 
                ? 'Tip: Read each document carefully before starting your application'
                : 'Conseil : Lisez attentivement chaque document avant de commencer votre candidature'
              }
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
