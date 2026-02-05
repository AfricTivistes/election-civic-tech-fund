import { projects } from '@/data/projects'
import { getAllCountries, getCountriesWithProjects } from '@/data/africa-geo'
import { getProjectsByCountry } from '@/lib/projects'
import { AfricaMapContainer } from './africa-map-container'

interface AfricaMapSectionProps {
  lang: string
}

export function AfricaMapSection({ lang }: AfricaMapSectionProps) {
  const countriesWithProjects = projects.map(p => p.countryCode)
  const uniqueCountries = Array.from(new Set(countriesWithProjects))
  
  const projectCounts: Record<string, number> = {}
  uniqueCountries.forEach(code => {
    projectCounts[code] = getProjectsByCountry(code).length
  })

  const text = {
    fr: {
      title: 'Nos Projets à travers l\'Afrique',
      subtitle: 'Découvrez les 12 initiatives innovantes dans 8 pays',
      description: 'La technologie citoyenne transforme les processus électoraux à travers le continent africain. Explorez les projets pays par pays.'
    },
    en: {
      title: 'Our Projects Across Africa',
      subtitle: 'Discover 12 innovative initiatives in 8 countries',
      description: 'Civic technology is transforming electoral processes across the African continent. Explore projects country by country.'
    }
  }

  const t = text[lang as keyof typeof text] || text.fr

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-4">
            {t.subtitle}
          </p>
          <p className="text-lg text-blue-300/80 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <AfricaMapContainer
          countries={getAllCountries()}
          projectCounts={projectCounts}
          lang={lang}
        />
      </div>
    </section>
  )
}
