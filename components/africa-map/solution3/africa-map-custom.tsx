'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { getAllCountries } from '@/data/africa-geo'

interface AfricaMapCustomProps {
  projectCounts: Record<string, number>
  lang: string
}

export function AfricaMapCustom({ projectCounts, lang }: AfricaMapCustomProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const router = useRouter()

  const countries = getAllCountries()
  const projectsCountries = Object.keys(projectCounts)

  const text = {
    fr: {
      title: 'SVG Personnalisé',
      subtitle: 'Solution 3 : SVG personnalisé avec paths améliorés',
      description: 'Approche SVG natif avec contrôles complets sur le design.'
    },
    en: {
      title: 'Custom SVG',
      subtitle: 'Solution 3: Custom SVG with improved paths',
      description: 'Native SVG approach with full design control.'
    }
  }

  const t = text[lang as keyof typeof text] || text.fr

  const handleCountryClick = (countryCode: string) => {
    router.push(`/${lang}/projects?country=${countryCode}`)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-purple-400 mb-2">{t.title}</h3>
        {t.subtitle}
      </div>

      <Card className="bg-white/5 backdrop-blur-md border-white/20 p-6">
        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
          <svg
            viewBox="150 100 600 600"
            className="w-full h-auto"
            style={{ maxHeight: '700px' }}
          >
            <defs>
              <linearGradient id="countryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a6fa5" />
                <stop offset="50%" stopColor="#3d5a8f" />
                <stop offset="100%" stopColor="#2d4a6f" />
              </linearGradient>
              
              <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              
              <pattern id="emptyCountryPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                <rect width="8" height="8" fill="#3d4f5f" />
                <circle cx="2" cy="2" r="1" fill="#4d5f6f" />
                <circle cx="6" cy="6" r="1" fill="#4d5f6f" />
              </pattern>
              
              <filter id="countryShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
              </filter>
              
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <rect x="150" y="100" width="600" height="600" fill="#1e3a5f" rx="12" />
            
            <g filter="url(#countryShadow)">
              {countries.map((country) => {
                const hasProject = projectsCountries.includes(country.code)
                const isHovered = hoveredCountry === country.code
                const projectCount = projectCounts[country.code] || 0

                return (
                  <g key={country.code}>
                    <path
                      d={country.path}
                      fill={
                        hasProject
                          ? 'url(#activeGradient)'
                          : isHovered
                            ? '#5a7a9f'
                            : 'url(#emptyCountryPattern)'
                      }
                      stroke={isHovered ? '#fbbf24' : '#5a7a9f'}
                      strokeWidth={isHovered ? '2' : '1'}
                      className="transition-all duration-200"
                      onClick={() => hasProject && handleCountryClick(country.code)}
                      onMouseEnter={() => hasProject && setHoveredCountry(country.code)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      style={{
                        cursor: hasProject ? 'pointer' : 'default',
                        filter: isHovered ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' : ''
                      }}
                    />
                    
                    {hasProject && country.center && (
                      <g
                        onClick={() => handleCountryClick(country.code)}
                        style={{ cursor: 'pointer' }}
                      >
                        <motion.circle
                          cx={country.center.x}
                          cy={country.center.y}
                          r={8}
                          fill="#f59e0b"
                          opacity={0.3}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.1, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <circle
                          cx={country.center.x}
                          cy={country.center.y}
                          r={6}
                          fill="#f59e0b"
                          filter="url(#glow)"
                        />
                        <text
                          x={country.center.x}
                          y={country.center.y - 12}
                          textAnchor="middle"
                          style={{
                            fill: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                          }}
                        >
                          {projectCount}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}
            </g>
          </svg>
        </div>

        {hoveredCountry && (
          <div className="absolute top-20 right-20 bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 shadow-xl">
            <div className="text-white text-sm">
              {hoveredCountry}
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-center">
        <button
          onClick={() => window.location.href = `/${lang}/projects`}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold rounded-lg transition-all"
        >
          {lang === 'fr' ? 'Voir tous les projets' : 'View all projects'}
        </button>
      </div>
    </div>
  )
}
