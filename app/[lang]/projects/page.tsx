import { Metadata } from "next"
import { getAllProjects, getProjectStats, getUniqueCountries, getUniqueTechnologies } from "@/lib/projects"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProjectCard } from "@/components/projects/project-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/shared/animated-counter"

interface ProjectsPageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ country?: string }>
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "fr" ? "Projets Bénéficiaires | Election Civic Tech Fund" : "Beneficiary Projects | Election Civic Tech Fund",
    description: lang === "fr"
      ? "Découvrez les 12 projets innovants soutenus par l'Election Civic Tech Fund"
      : "Discover the 12 innovative projects supported by the Election Civic Tech Fund",
  }
}

export default async function ProjectsPage({ params, searchParams }: ProjectsPageProps) {
  const { lang } = await params
  const { country: countryCode } = await searchParams
  
  const allProjects = getAllProjects()
  const stats = getProjectStats()
  const countries = getUniqueCountries()
  const technologies = getUniqueTechnologies(lang as "fr" | "en")

  let filteredProjects = allProjects
  let title: string
  let subtitle: string
  
  const currentLang = lang as "fr" | "en"

  if (countryCode) {
    filteredProjects = allProjects.filter(p => p.countryCode === countryCode)
    const countryName = countries.find(c => c.code === countryCode)?.name[currentLang] || countryCode
    
    title = currentLang === 'fr' 
      ? `Projets en ${countryName}`
      : `Projects in ${countryName}`
    
    subtitle = currentLang === 'fr'
      ? `${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''} en ${countryName}`
      : `${filteredProjects.length} project${filteredProjects.length > 1 ? 's' : ''} in ${countryName}`
  } else {
    title = currentLang === 'fr' 
      ? "Les Bénéficiaires du Fonds"
      : "Fund Beneficiaries"
    
    subtitle = currentLang === 'fr'
      ? "12 projets innovants pour transformer la démocratie en Afrique"
      : "12 innovative projects to transform democracy in Africa"
  }

  const t = {
    fr: {
      title: "Les Bénéficiaires du Fonds",
      subtitle: "12 projets innovants pour transformer la démocratie en Afrique",
      allProjects: "Tous les projets",
      major: "Projets Majeurs",
      micro: "Micro-grants",
      filterByCategory: "Filtrer par catégorie",
      filterByCountry: "Filtrer par pays",
      filterByTech: "Filtrer par technologie",
      noProjects: "Aucun projet ne correspond à ces critères",
      statsProjects: "Projets",
      statsCountries: "Pays",
      statsMajor: "Majeurs",
      statsMicro: "Micro",
      viewAllProjects: "Voir tous les projets",
      backToMap: "Retour à la carte",
    },
    en: {
      title: "Fund Beneficiaries",
      subtitle: "12 innovative projects to transform democracy in Africa",
      allProjects: "All projects",
      major: "Major Projects",
      micro: "Micro-grants",
      filterByCategory: "Filter by category",
      filterByCountry: "Filter by country",
      filterByTech: "Filter by technology",
      noProjects: "No projects match these criteria",
      statsProjects: "Projects",
      statsCountries: "Countries",
      statsMajor: "Major",
      statsMicro: "Micro",
      viewAllProjects: "View all projects",
      backToMap: "Back to map",
    },
  }

  const text = t[currentLang]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />

      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
                {text.title}
              </h1>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                {text.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    <AnimatedCounter end={stats.total} />
                  </div>
                  <div className="text-white">{text.statsProjects}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    <AnimatedCounter end={stats.countries} />
                  </div>
                  <div className="text-white">{text.statsCountries}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} lang={lang} />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-blue-200 text-xl">{text.noProjects}</p>
              </div>
            )}
            
            {countryCode && (
              <div className="text-center mt-8">
                <a
                  href={`/${lang}/projects`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold rounded-lg transition-all"
                >
                  {currentLang === 'fr' ? '← Voir tous les projets' : '← View all projects'}
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
