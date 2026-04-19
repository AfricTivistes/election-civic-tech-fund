'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

interface CountryWithProjects {
  code: string
  name: { fr: string; en: string }
  flag: string
  projectCount: number
}

interface AfricaMapMobileProps {
  countries: CountryWithProjects[]
  lang: string
}

export function AfricaMapMobile({ countries, lang }: AfricaMapMobileProps) {
  const router = useRouter()

  const handleCountryClick = (countryCode: string) => {
    router.push(`/${lang}/projects?country=${countryCode}`)
  }

  const text = {
    fr: {
      title: 'Pays avec des projets',
      projects: 'projets',
      view: 'Voir les projets'
    },
    en: {
      title: 'Countries with projects',
      projects: 'projects',
      view: 'View projects'
    }
  }

  const t = text[lang as keyof typeof text]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        {t.title}
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {countries.map((country, index) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              onClick={() => handleCountryClick(country.code)}
              className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 border-white/20 backdrop-blur-md cursor-pointer hover:from-blue-800/50 hover:to-purple-800/40 transition-all duration-200 group"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h4 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                        {country.name[lang as keyof typeof country.name]}
                      </h4>
                      <div className="flex items-center gap-2 text-blue-300 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {country.projectCount} {t.projects}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="text-yellow-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
