'use client'

import { useState } from 'react'
import { Country } from '@/types/africa'
import { CountryMarker } from './country-marker'
import { MapTooltip } from './map-tooltip'
import { useRouter } from 'next/navigation'

interface AfricaMapSvgProps {
  countries: Country[]
  projectCounts: Record<string, number>
  lang: string
}

export function AfricaMapSvg({ countries, projectCounts, lang }: AfricaMapSvgProps) {
  const router = useRouter()
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleCountryClick = (countryCode: string) => {
    router.push(`/${lang}/projects?country=${countryCode}`)
  }

  const handleMouseEnter = (e: React.MouseEvent<SVGElement>, countryCode: string) => {
    setHoveredCountry(countryCode)
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: rect.left, y: rect.top })
  }

  const getCountryCenter = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode)
    return country ? country.center : { x: 0, y: 0 }
  }

  const renderMap = () => {
    return countries.map((country) => {
      const projectCount = projectCounts[country.code] || 0
      const isHovered = hoveredCountry === country.code
      const hasActiveProjects = projectCount > 0

      const fillColor = hasActiveProjects
        ? isHovered
          ? '#3b82f6'
          : 'url(#countryGradient)'
        : isHovered
          ? '#5a7a9f'
          : 'url(#emptyCountryPattern)'

      const strokeColor = isHovered ? '#fbbf24' : '#5a7a9f'
      const strokeWidth = isHovered ? '2' : '1'

      return (
        <g key={country.code}>
          <path
            d={country.path}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            className="transition-all duration-200 cursor-pointer"
            onClick={() => hasActiveProjects && handleCountryClick(country.code)}
            onMouseEnter={(e) => hasActiveProjects && handleMouseEnter(e, country.code)}
            onMouseLeave={() => setHoveredCountry(null)}
            style={{
              filter: isHovered ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' : ''
            }}
          />
          
          {hasActiveProjects && country.center && (
            <CountryMarker
              x={country.center.x}
              y={country.center.y}
              countryName={country.name[lang as keyof typeof country.name]}
              flag={country.flag}
              projectCount={projectCount}
              onClick={() => handleCountryClick(country.code)}
              show={true}
            />
          )}
          
          {hoveredCountry === country.code && (
            <MapTooltip
              countryName={country.name[lang as keyof typeof country.name]}
              flag={country.flag}
              projectCount={projectCount}
              x={country.center.x}
              y={country.center.y}
              show={true}
              lang={lang}
            />
          )}
        </g>
      )
    })
  }

  return (
    <svg
      viewBox="150 100 600 600"
      className="w-full h-full"
      style={{ maxHeight: '700px' }}
    >
      <defs>
        <linearGradient id="countryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a6fa5" />
          <stop offset="50%" stopColor="#3d5a8f" />
          <stop offset="100%" stopColor="#2d4a6f" />
        </linearGradient>
        
        <pattern id="emptyCountryPattern" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="#3d4f5f" />
          <circle cx="2" cy="2" r="1" fill="#4d5f6f" />
          <circle cx="6" cy="6" r="1" fill="#4d5f6f" />
        </pattern>
        
        <filter id="countryShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>

      <rect x="150" y="100" width="600" height="600" fill="#1e3a5f" rx="12" />
      
      <g filter="url(#countryShadow)">
        {renderMap()}
      </g>
    </svg>
  )
}
