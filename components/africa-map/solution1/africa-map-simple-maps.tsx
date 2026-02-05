'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { countriesWithCoordinates } from './africa-simple-maps-data'

interface AfricaMapSimpleMapsProps {
  projectCounts: Record<string, number>
  lang: string
}

export function AfricaMapSimpleMaps({ projectCounts, lang }: AfricaMapSimpleMapsProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const router = useRouter()

  const text = {
    fr: {
      title: 'React-Simple-Maps',
      subtitle: 'Solution 1 : Librairie React avec TopoJSON',
      description: 'Approche officielle React-Simple-Maps avec données TopoJSON et marqueurs géographiques.'
    },
    en: {
      title: 'React-Simple-Maps',
      subtitle: 'Solution 1: React Library with TopoJSON',
      description: 'Official React-Simple-Maps approach with TopoJSON data and geographic markers.'
    }
  }

  const t = text[lang as keyof typeof text] || text.fr

  const handleCountryClick = (countryCode: string) => {
    router.push(`/${lang}/projects?country=${countryCode}`)
  }

  const projectCodes = Object.keys(projectCounts)

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-blue-400 mb-2">{t.title}</h3>
        {t.subtitle}
      </div>

      <Card className="bg-white/5 backdrop-blur-md border-white/20 p-6 border-2 border-blue-400/30">
        <div className="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-slate-900/50 to-blue-900/30 rounded-lg">
          <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [-20, 0, 0],
              scale: 600
            }}
            width={800}
            height={700}
            style={{
              width: '100%',
              height: 'auto'
            }}
          >
            <Geographies geography="/africa-topojson.json">
              {({ geographies }: any) => (
                geographies.map((geo: any) => {
                  const countryCode = geo.properties.id || geo.properties.ISO_A2 || geo.properties.ADM0_A3
                  const hasProject = projectCodes.includes(countryCode)
                  const isHovered = hoveredCountry === countryCode

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        hasProject
                          ? isHovered ? '#60a5fa' : '#3b82f6'
                          : isHovered ? '#64748b' : '#475569'
                      }
                      stroke={isHovered ? '#fbbf24' : '#94a3b8'}
                      strokeWidth={isHovered ? '1.5' : '1'}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => hasProject && handleCountryClick(countryCode)}
                      onMouseEnter={() => setHoveredCountry(countryCode)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      style={{
                        opacity: hasProject ? 1 : 0.6
                      }}
                    />
                  )
                })
              )}
            </Geographies>

            {countriesWithCoordinates.map((country) => {
              const projectCount = projectCounts[country.code]
              if (!projectCount) return null

              return (
                <Marker
                  key={country.code}
                  coordinates={[country.lng, country.lat]}
                >
                  <g onClick={() => handleCountryClick(country.code)} style={{ cursor: 'pointer' }}>
                    <motion.circle
                      r={8}
                      fill="#f59e0b"
                      opacity={0.5}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.2, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <circle
                      r={6}
                      fill="#f59e0b"
                      className="hover:fill-yellow-300 transition-colors"
                    />
                    <text
                      textAnchor="middle"
                      y={-12}
                      style={{
                        fill: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {projectCount}
                    </text>
                  </g>
                </Marker>
              )
            })}
          </ComposableMap>
        </div>

        {hoveredCountry && (
          <div className="absolute top-20 right-20 bg-slate-900/95 backdrop-blur-md border-2 border-blue-400/50 rounded-lg px-4 py-3 shadow-xl">
            <div className="text-blue-300 text-sm font-medium">
              {hoveredCountry}
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-center">
        <a
          href={`/${lang}/projects`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
        >
          {lang === 'fr' ? 'Voir tous les projets' : 'View all projects'}
        </a>
      </div>
    </div>
  )
}
