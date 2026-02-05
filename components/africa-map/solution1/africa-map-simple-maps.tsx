'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { countriesWithCoordinates } from './africa-simple-maps-data'

const ISO_NUMERIC_TO_ALPHA2: Record<string, string> = {
  '012': 'dz', '024': 'ao', '072': 'bw', '086': 'io', '108': 'bi',
  '120': 'cm', '132': 'cv', '140': 'cf', '148': 'td', '174': 'km',
  '178': 'cg', '180': 'cd', '204': 'bj', '226': 'gq', '231': 'et',
  '232': 'er', '262': 'dj', '266': 'ga', '270': 'gm', '288': 'gh',
  '324': 'gn', '384': 'ci', '404': 'ke', '426': 'ls', '430': 'lr',
  '434': 'ly', '450': 'mg', '454': 'mw', '466': 'ml', '478': 'mr',
  '480': 'mu', '504': 'ma', '508': 'mz', '516': 'na', '562': 'ne',
  '566': 'ng', '624': 'gw', '638': 're', '646': 'rw', '678': 'st',
  '686': 'sn', '690': 'sc', '694': 'sl', '706': 'so', '710': 'za',
  '728': 'ss', '729': 'sd', '732': 'eh', '748': 'sz', '768': 'tg',
  '788': 'tn', '800': 'ug', '818': 'eg', '834': 'tz', '854': 'bf',
  '894': 'zm', '716': 'zw'
}

const AFRICA_ISO_CODES = Object.keys(ISO_NUMERIC_TO_ALPHA2)

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

  const projectCodes = Object.keys(projectCounts).map(c => c.toLowerCase())

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
                geographies
                  .filter((geo: any) => AFRICA_ISO_CODES.includes(geo.id))
                  .map((geo: any) => {
                    const alpha2Code = ISO_NUMERIC_TO_ALPHA2[geo.id] || ''
                    const hasProject = projectCodes.includes(alpha2Code)
                    const isHovered = hoveredCountry === alpha2Code

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
                        onClick={() => hasProject && handleCountryClick(alpha2Code)}
                        onMouseEnter={() => setHoveredCountry(alpha2Code)}
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
