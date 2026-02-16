import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getProjectById, getAllProjects, getSimilarProjects } from "@/lib/projects"
import { getRecentNews, getNewsByProject } from "@/lib/news"
import { ArrowLeft, Globe, Calendar, Clock, TrendingUp, Target, ExternalLink } from "lucide-react"

interface ProjectPageProps {
  params: Promise<{ lang: string; id: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.flatMap((project) => [
    { lang: "fr", id: project.id },
    { lang: "en", id: project.id },
  ])
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, id } = await params
  const project = getProjectById(id)

  if (!project) {
    return { title: "Project not found" }
  }

  const projectName = lang === "fr" ? project.projectName.fr : project.projectName.en

  return {
    title: `${projectName} | Election Civic Tech Fund`,
    description: lang === "fr" ? project.description.fr : project.description.en,
    openGraph: {
      title: projectName,
      description: lang === "fr" ? project.description.fr : project.description.en,
      images: [project.projectImage],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  const similarProjects = getSimilarProjects(id, 3)
  const projectNews = await getNewsByProject(id, lang)
  const recentNews = await getRecentNews(3, lang)

  const t = {
    fr: {
      back: "Retour aux projets",
      organization: "Organisation",
      country: "Pays",
      category: "Catégorie",
      duration: "Durée",
      progress: "Avancement",
      status: "Statut",
      description: "Description",
      impact: "Impact attendu",
      technologies: "Technologies",
      timeline: "Timeline",
      startDate: "Démarré le",
      endDate: "Fin prévue",
      recentNews: "Actualités du projet",
      similarProjects: "Projets similaires",
      website: "Site web",
      notStarted: "Pas encore commencé",
      inProgress: "En cours",
      completed: "Terminé",
      months: "mois",
    },
    en: {
      back: "Back to projects",
      organization: "Organization",
      country: "Country",
      category: "Category",
      duration: "Duration",
      progress: "Progress",
      status: "Status",
      description: "Description",
      impact: "Expected Impact",
      technologies: "Technologies",
      timeline: "Timeline",
      startDate: "Started on",
      endDate: "End date",
      recentNews: "Project news",
      similarProjects: "Similar projects",
      website: "Website",
      notStarted: "Not started",
      inProgress: "In progress",
      completed: "Completed",
      months: "months",
    },
  }

  const text = t[lang as "fr" | "en"]
  const currentLang = lang as "fr" | "en"

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const remainingMonths = Math.max(
    0,
    Math.ceil(
      (new Date(project.endDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24 * 30)
    )
  )

  const getStatusBadge = () => {
    switch (project.status) {
      case "not_started":
        return <Badge className="bg-gray-500 text-white">{text.notStarted}</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500 text-white">{text.inProgress}</Badge>
      case "completed":
        return <Badge className="bg-green-500 text-white">{text.completed}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />

      <main>
        <article className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <Link
              href={`/${lang}/projects`}
              className="inline-flex items-center text-blue-300 hover:text-yellow-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {text.back}
            </Link>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden mb-8">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-slate-700 to-slate-600">
                {project.projectImage ? (
                  <Image
                    src={project.projectImage}
                    alt={project.projectName[currentLang]}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Target className="w-24 h-24 text-white/30" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-4xl">{project.countryFlag}</span>
                    <div>
                      <h1 className="text-2xl md:text-4xl font-bold text-white">
                        {project.projectName[currentLang]}
                      </h1>
                      <p className="text-blue-200">{project.organization}</p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{project.progress}%</div>
                    <div className="text-sm text-blue-200">{text.progress}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{remainingMonths}</div>
                    <div className="text-sm text-blue-200">{text.months}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    {getStatusBadge()}
                    <div className="text-sm text-blue-200 mt-1">{text.status}</div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between text-sm text-blue-300 mb-2">
                    <span>{text.progress}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">{text.description}</h2>
                    <p className="text-blue-200 leading-relaxed">
                      {project.description[currentLang]}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">{text.impact}</h2>
                    <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30">
                      <CardContent className="p-4">
                        <p className="text-blue-400 font-medium">
                          {project.impact[currentLang]}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-4">{text.technologies}</h2>
                  <div className="flex flex-wrap gap-2">
                    {(currentLang === "fr" ? project.technologies.fr : project.technologies.en).map(
                      (tech, index) => (
                        <Badge
                          key={index}
                          className="bg-purple-500/20 text-purple-300 border-purple-400/50"
                        >
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                {project.website && (
                  <div className="mb-8">
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {text.website}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                )}

                <div className="border-t border-white/10 pt-8">
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-300">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      <span>
                        {text.startDate}: {formatDate(project.startDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                      <span>
                        {text.endDate}: {formatDate(project.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {projectNews.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{text.recentNews}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectNews.slice(0, 3).map((news) => (
                    <Link key={news.slug} href={`/${lang}/news/${news.slug}`}>
                      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-yellow-400/50 transition-all h-full">
                        <CardContent className="p-6">
                          <div className="flex items-center text-xs text-blue-300 mb-3">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(news.date)}
                          </div>
                          <h3 className="font-bold text-white mb-2 line-clamp-2">
                            {news.title}
                          </h3>
                          <p className="text-blue-200 text-sm line-clamp-2">
                            {news.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {similarProjects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">{text.similarProjects}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {similarProjects.map((proj) => (
                    <Link key={proj.id} href={`/${lang}/projects/${proj.id}`}>
                      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-yellow-400/50 transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-2xl">{proj.countryFlag}</span>
                            <span className="text-sm text-blue-300">
                              {currentLang === "fr" ? proj.country.fr : proj.country.en}
                            </span>
                          </div>
                          <h3 className="font-bold text-white line-clamp-2 mb-2">
                            {currentLang === "fr" ? proj.projectName.fr : proj.projectName.en}
                          </h3>
                          <div className="flex items-center justify-between">
                            <Badge
                              className={
                                proj.category === "major"
                                  ? "bg-yellow-500 text-black"
                                  : "bg-blue-500 text-white"
                              }
                            >
                              {proj.category === "major" ? "Majeur" : "Micro"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
