'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { solution2Coordinates } from './africa-map-coords'

interface AfricaMapProfessionalProps {
  projectCounts: Record<string, number>
  lang: string
}

export function AfricaMapProfessional({ projectCounts, lang }: AfricaMapProfessionalProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const router = useRouter()

  const handleCountryClick = (countryCode: string) => {
    router.push(`/${lang}/projects?country=${countryCode}`)
  }

  const projectsCountries = Object.keys(projectCounts)

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-amber-400 mb-2">SVG Professionnel</h3>
        Solution 2 : Carte vectorielle professionnelle intégrée
      </div>

      <Card className="bg-white/5 backdrop-blur-md border-white/20 p-6 border-2 border-amber-500/30">
        <div className="relative w-full aspect-[4/3]">
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 800 700"
              className="w-full h-full"
            >
              <defs>
                {/* Effet relief et ombre portée */}
                <filter id="relief-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="3" dy="3" stdDeviation="2" floodOpacity="0.4" />
                </filter>

                {/* Gradient pour pays avec projets */}
                <linearGradient id="active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4a574" />
                  <stop offset="50%" stopColor="#b8956a" />
                  <stop offset="100%" stopColor="#9a7b5a" />
                </linearGradient>

                {/* Gradient pour pays sans projets */}
                <linearGradient id="inactive-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5b7f8f" />
                  <stop offset="50%" stopColor="#4a6670" />
                  <stop offset="100%" stopColor="#3d5558" />
                </linearGradient>

                {/* Pattern pour pays sans projets */}
                <pattern id="inactive-pattern" patternUnits="userSpaceOnUse" width="8" height="8">
                  <rect width="8" height="8" fill="#4a6670" />
                  <circle cx="2" cy="2" r="1" fill="#5a7a9f" />
                  <circle cx="6" cy="6" r="1" fill="#5a7a9f" />
                </pattern>

                {/* Glow effect */}
                <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect width="800" height="700" fill="#1c2e36" rx="12" />

              {/* Copier Tous les paths du fichier africa-political-map.svg ici */}
              <g id="countries">
                {/* Algeria */}
                <path id="DZ" d="M280,150 L375,155 L380,210 L285,205 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Angola */}
                <path id="AO" d="M450,480 L490,485 L485,580 L445,560 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Benin */}
                <path id="BJ" d="M395,315 L410,315 L410,330 L395,330 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Botswana */}
                <path id="BW" d="M495,550 L525,555 L530,610 L500,605 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Burkina Faso */}
                <path id="BF" d="M325,330 L350,335 L348,355 L328,352 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Burundi */}
                <path id="BI" d="M520,385 L535,385 L535,400 L520,400 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Cameroon */}
                <path id="CM" d="M425,345 L450,350 L455,375 L435,385 L420,370 L425,345 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Cape Verde */}
                <path id="CV" d="M205,280 L220,280 L220,295 L205,295 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Central African Republic */}
                <path id="CF" d="M475,305 L520,310 L515,340 L475,335 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Chad */}
                <path id="TD" d="M420,245 L480,250 L485,290 L425,285 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Republic of Congo */}
                <path id="CG" d="M445,420 L490,425 L488,465 L445,455 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Democratic Republic of Congo */}
                <path id="CD" d="M455,380 L510,385 L520,480 L460,460 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Ivory Coast */}
                <path id="CI" d="M335,370 L360,375 L358,400 L335,395 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Djibouti */}
                <path id="DJ" d="M585,260 L600,260 L600,275 L585,275 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Egypt */}
                <path id="EG" d="M475,140 L520,145 L515,185 L470,180 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Equatorial Guinea */}
                <path id="GQ" d="M440,425 L455,425 L455,440 L440,440 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Eritrea */}
                <path id="ER" d="M565,220 L600,225 L595,245 L570,240 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Eswatini */}
                <path id="SZ" d="M540,615 L555,615 L555,630 L540,630 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Ethiopia */}
                <path id="ET" d="M560,260 L605,270 L600,310 L570,300 L560,260 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Gabon */}
                <path id="GA" d="M430,425 L465,430 L462,470 L428,460 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Gambia */}
                <path id="GM" d="M250,265 L265,265 L265,278 L250,278 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Ghana */}
                <path id="GH" d="M345,360 L370,365 L368,390 L345,385 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Guinea */}
                <path id="GN" d="M260,295 L285,295 L280,320 L260,315 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Guinea-Bissau */}
                <path id="GW" d="M250,300 L270,300 L270,315 L250,315 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Kenya */}
                <path id="KE" d="M575,330 L620,340 L615,385 L580,365 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Lesotho */}
                <path id="LS" d="M535,630 L550,630 L550,645 L535,645 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Liberia */}
                <path id="LR" d="M325,385 L350,390 L348,410 L325,405 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Libya */}
                <path id="LY" d="M380,115 L475,120 L480,175 L385,170 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Madagascar */}
                <path id="MG" d="M615,460 L650,465 L655,560 L620,545 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Malawi */}
                <path id="MW" d="M540,475 L575,480 L572,530 L542,520 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Mali */}
                <path id="ML" d="M265,230 L350,235 L355,295 L260,290 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Morocco */}
                <path id="MA" d="M235,150 L280,155 L285,205 L240,200 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Mauritania */}
                <path id="MR" d="M220,200 L280,200 L285,235 L220,230 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Mauritius */}
                <path id="MU" d="M655,530 L670,530 L670,545 L655,545 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Mozambique */}
                <path id="MZ" d="M530,505 L590,515 L595,620 L540,600 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Namibia */}
                <path id="NA" d="M470,545 L515,550 L525,650 L475,635 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Niger */}
                <path id="NE" d="M355,250 L420,260 L425,300 L355,295 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Nigeria */}
                <path id="NG" d="M355,325 L410,330 L405,380 L355,375 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Rwanda */}
                <path id="RW" d="M515,390 L530,390 L530,405 L515,405 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Sao Tome and Principe */}
                <path id="ST" d="M445,475 L460,475 L460,490 L445,490 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Senegal */}
                <path id="SN" d="M250,270 L275,270 L275,290 L250,290 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Seychelles */}
                <path id="SC" d="M680,490 L695,490 L695,505 L680,505 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Sierra Leone */}
                <path id="SL" d="M265,305 L280,310 L278,325 L265,320 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Somalia */}
                <path id="SO" d="M600,305 L630,310 L635,355 L610,345 L600,305 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* South Africa */}
                <path id="ZA" d="M480,560 L555,570 L560,700 L485,680 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* South Sudan */}
                <path id="SS" d="M530,170 L550,170 L555,185 L545,195 L525,190 L520,175 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Sudan */}
                <path id="SD" d="M475,185 L525,190 L530,245 L475,240 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Tanzania */}
                <path id="TZ" d="M575,400 L625,415 L620,510 L570,490 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Togo */}
                <path id="TG" d="M380,350 L395,350 L395,368 L380,368 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Tunisia */}
                <path id="TN" d="M290,160 L340,165 L345,195 L295,190 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Uganda */}
                <path id="UG" d="M560,345 L595,350 L590,385 L560,380 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Zambia */}
                <path id="ZM" d="M510,500 L565,510 L565,570 L505,555 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
                {/* Zimbabwe */}
                <path id="ZW" d="M525,550 L570,560 L568,620 L523,605 Z" fill="url(#inactive-pattern)" stroke="#5b7f8f" strokeWidth="1.2" />
              </g>
            </svg>
          </div>

          {/* Marqueurs positionnés en % - APPROCHE DIFFÉRENTE */}
          {solution2Coordinates.map((country) => {
            const hasProject = projectsCountries.includes(country.code)
            const isHovered = hoveredCountry === country.code

            return (
              <div
                key={country.code}
                className="absolute"
                style={{
                  left: `${country.xPercent}%`,
                  top: `${country.yPercent}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <div onClick={() => handleCountryClick(country.code)} style={{ cursor: 'pointer' }}>
                  <g filter="url(#relief-shadow)">
                    <circle
                      cx={0}
                      cy={0}
                      r={7}
                      fill="#f39c12"
                      stroke="#2c3e50"
                      strokeWidth="1"
                    />
                    <motion.circle
                      cx={0}
                      cy={0}
                      r={11}
                      stroke="#f39c12"
                      strokeWidth="2"
                      fill="none"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </g>
                  <rect
                    x={-10}
                    y={-28}
                    width={20}
                    height={16}
                    rx="3"
                    fill="#2c3e50"
                    stroke="#f39c12"
                    strokeWidth="1"
                    opacity={0.9}
                  />
                  <text
                    x={0}
                    y={-17}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                      fill: '#f39c12',
                      fontSize: '10px',
                      fontWeight: '700',
                      fontFamily: 'system-ui, sans-serif'
                    }}
                  >
                    {country.projectCount}
                  </text>
                </div>
              </div>
            )
          })}
        </div>

        {hoveredCountry && (
          <div className="absolute top-20 right-20 bg-slate-900/95 backdrop-blur-md border-2 border-amber-400/50 rounded-lg px-4 py-3 shadow-xl">
            <div className="text-amber-300 text-sm font-medium">
              {hoveredCountry}
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-center">
        <a
          href={`/${lang}/projects`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-semibold rounded-lg transition-all border border-amber-400/30"
        >
          {lang === 'fr' ? 'Voir tous les projets' : 'View all projects'}
        </a>
      </div>
    </div>
  )
}
