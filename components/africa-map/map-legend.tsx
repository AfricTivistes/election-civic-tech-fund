'use client'

import { Card } from '@/components/ui/card'

interface MapLegendProps {
  lang: string
}

export function MapLegend({ lang }: MapLegendProps) {
  const text = {
    fr: {
      withProjects: 'Pays avec projets',
      withoutProjects: 'Autres pays',
      marker: 'Marqueur: projets actifs'
    },
    en: {
      withProjects: 'Countries with projects',
      withoutProjects: 'Other countries',
      marker: 'Marker: active projects'
    }
  }

  const t = text[lang as keyof typeof text] || text.fr

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-blue-500 to-blue-700" />
          <span className="text-white">{t.withProjects}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-slate-600" />
          <span className="text-white">{t.withoutProjects}</span>
        </div>
      </div>
    </Card>
  )
}
