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

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params
  const projects = getAllProjects()
  const stats = getProjectStats()
  const countries = getUniqueCountries()
  const technologies = getUniqueTechnologies(lang as "fr" | "en")

  const currentLang = lang as "fr" | "en"

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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    <AnimatedCounter end={stats.major} />
                  </div>
                  <div className="text-white">{text.statsMajor}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    <AnimatedCounter end={stats.micro} />
                  </div>
                  <div className="text-white">{text.statsMicro}</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="cursor-pointer bg-white/10 text-white hover:bg-yellow-400 hover:text-black">
                {text.allProjects}
              </Badge>
              <Badge className="cursor-pointer bg-white/10 text-white hover:bg-yellow-400 hover:text-black">
                {text.major}
              </Badge>
              <Badge className="cursor-pointer bg-white/10 text-white hover:bg-blue-400 hover:text-black">
                {text.micro}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
