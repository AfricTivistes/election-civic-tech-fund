import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getAllNews, getNewsBySlug } from "@/lib/news"
import { getSimilarProjects } from "@/lib/projects"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ArticlePageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const frArticles = await getAllNews("fr")
  const enArticles = await getAllNews("en")

  return [
    ...frArticles.map((a) => ({ lang: "fr", slug: a.slug })),
    ...enArticles.map((a) => ({ lang: "en", slug: a.slug })),
  ]
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const article = await getNewsBySlug(slug, lang)

  if (!article) {
    return { title: "Article not found" }
  }

  return {
    title: `${article.title} | Election Civic Tech Fund`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
      type: "article",
      publishedTime: article.date,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { lang, slug } = await params
  const article = await getNewsBySlug(slug, lang)

  if (!article) {
    notFound()
  }

  const similarProjects = getSimilarProjects("1", 3)

  const t = {
    fr: {
      back: "Retour aux actualités",
      share: "Partager",
      relatedProjects: "Projets liés",
      tags: "Tags",
    },
    en: {
      back: "Back to news",
      share: "Share",
      relatedProjects: "Related projects",
      tags: "Tags",
    },
  }

  const text = t[lang as "fr" | "en"]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />

      <main>
        <article className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link
              href={`/${lang}/news`}
              className="inline-flex items-center text-blue-300 hover:text-yellow-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {text.back}
            </Link>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden mb-8">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-slate-700 to-slate-600">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📰</div>
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 text-sm text-blue-300 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(article.date)}
                  </span>
                  {article.author && (
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {article.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-yellow-400/50 text-yellow-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.htmlContent }}
                />
              </CardContent>
            </Card>

            <div className="flex items-center justify-between mb-8">
              <button className="inline-flex items-center text-blue-300 hover:text-yellow-400 transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                {text.share}
              </button>
            </div>

            {similarProjects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {text.relatedProjects}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarProjects.map((project) => (
                    <Link key={project.id} href={`/${lang}/projects/${project.id}`}>
                      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-yellow-400/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-2xl">{project.countryFlag}</span>
                            <span className="text-sm text-blue-300">
                              {lang === "fr" ? project.country.fr : project.country.en}
                            </span>
                          </div>
                          <h3 className="font-bold text-white mb-2 line-clamp-2">
                            {lang === "fr" ? project.projectName.fr : project.projectName.en}
                          </h3>
                          <Badge
                            className={
                              project.category === "major"
                                ? "bg-yellow-500 text-black"
                                : "bg-blue-500 text-white"
                            }
                          >
                            {project.category === "major" ? "Majeur" : "Micro"}
                          </Badge>
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
