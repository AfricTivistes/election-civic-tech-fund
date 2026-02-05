'use client'

import { useState } from 'react'
import { AfricaMapSvg } from './africa-map-svg'
import { AfricaMapMobile } from './africa-map-mobile'
import { MapLegend } from './map-legend'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface AfricaMapContainerProps {
  countries: Array<{
    code: string
    name: { fr: string; en: string }
    flag: string
    center: { x: number; y: number }
    path: string
    hasProjects: boolean
  }>
  projectCounts: Record<string, number>
  lang: string
}

export function AfricaMapContainer({ countries, projectCounts, lang }: AfricaMapContainerProps) {
  const [showMap, setShowMap] = useState(true)

  const text = {
    fr: {
      allProjects: 'Explorer tous les projets',
      toggleMap: 'Voir carte',
      toggleList: 'Voir liste'
    },
    en: {
      allProjects: 'Explore all projects',
      toggleMap: 'View map',
      toggleList: 'View list'
    }
  }

  const t = text[lang as keyof typeof text]

  const countriesWithProjects = countries
    .filter(c => c.hasProjects)
    .map(c => ({
      code: c.code,
      name: c.name,
      flag: c.flag,
      projectCount: projectCounts[c.code] || 0
    }))
    .sort((a, b) => b.projectCount - a.projectCount)

  const handleAllProjectsClick = () => {
    window.location.href = `/${lang}/projects`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <MapLegend lang={lang} />
        <Button
          onClick={handleAllProjectsClick}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
        >
          {t.allProjects}
        </Button>
      </div>

      <Card className="bg-white/5 backdrop-blur-md border-white/20 p-6">
        <div className="lg:hidden mb-4">
          <div className="flex gap-2">
            <Button
              variant={showMap ? 'default' : 'outline'}
              onClick={() => setShowMap(true)}
              className={`${
                showMap
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              {t.toggleMap}
            </Button>
            <Button
              variant={!showMap ? 'default' : 'outline'}
              onClick={() => setShowMap(false)}
              className={`${
                !showMap
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              {t.toggleList}
            </Button>
          </div>
        </div>

        {showMap ? (
          <div className="hidden lg:block">
            <AfricaMapSvg
              countries={countries}
              projectCounts={projectCounts}
              lang={lang}
            />
          </div>
        ) : (
          <div className="hidden lg:block">
            <AfricaMapMobile
              countries={countriesWithProjects}
              lang={lang}
            />
          </div>
        )}

        <div className="lg:hidden">
          {showMap ? (
            <AfricaMapSvg
              countries={countries}
              projectCounts={projectCounts}
              lang={lang}
            />
          ) : (
            <AfricaMapMobile
              countries={countriesWithProjects}
              lang={lang}
            />
          )}
        </div>
      </Card>
    </div>
  )
}
