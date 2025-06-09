
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, ExternalLink } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface Document {
  name: string
  filename: string
  description?: string
  size?: string
}

interface DocumentDownloaderProps {
  documents: Document[]
  title?: string
  className?: string
}

export default function DocumentDownloader({ 
  documents, 
  title,
  className = "" 
}: DocumentDownloaderProps) {
  const { t } = useLanguage()

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
  }

  if (!documents || documents.length === 0) {
    return null
  }

  return (
    <Card className={`bg-white/10 backdrop-blur-md border-white/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          {title || t?.documents?.title || "Documents"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {documents.map((doc, index) => (
          <div 
            key={`document-${index}`}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm">{doc.name}</h4>
              {doc.description && (
                <p className="text-blue-200 text-xs mt-1">{doc.description}</p>
              )}
              {doc.size && (
                <p className="text-blue-300 text-xs mt-1">{doc.size}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => handleView(doc.filename)}
                variant="ghost"
                size="sm"
                className="text-blue-200 hover:text-white hover:bg-white/10"
                title={t?.documents?.view || "Voir"}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleDownload(doc.filename)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                title={t?.documents?.download || "Télécharger"}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
