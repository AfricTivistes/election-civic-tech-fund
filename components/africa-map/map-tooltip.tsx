'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface MapTooltipProps {
  countryName: string
  flag: string
  projectCount: number
  x: number
  y: number
  show: boolean
  lang: string
}

export function MapTooltip({ countryName, flag, projectCount, x, y, show, lang }: MapTooltipProps) {
  const text = {
    fr: {
      projects: projectCount === 1 ? '1 projet' : `${projectCount} projets`,
      viewProjects: 'Voir les projets'
    },
    en: {
      projects: projectCount === 1 ? '1 project' : `${projectCount} projects`,
      viewProjects: 'View projects'
    }
  }

  const t = text[lang as keyof typeof text]

  return (
    <AnimatePresence>
      {show && (
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <foreignObject x={x + 15} y={y - 50} width={200} height={80}>
            <div className="bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 shadow-xl pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{flag}</span>
                <span className="text-white font-semibold text-sm">{countryName}</span>
              </div>
              <div className="text-yellow-400 text-sm font-medium">
                {t.projects}
              </div>
            </div>
          </foreignObject>
          <polygon
            points={`${x + 25},${y + 30} ${x + 35},${y + 20} ${x + 35},${y + 40}`}
            fill="rgba(15, 23, 42, 0.95)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
        </motion.g>
      )}
    </AnimatePresence>
  )
}
