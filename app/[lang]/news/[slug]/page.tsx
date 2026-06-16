import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ogImageUrl } from "@/lib/og"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getAllNews, getNewsBySlug } from "@/lib/news"
import { getProjectsByIds, getAllProjects } from "@/lib/projects"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { YouTubeEmbed } from "@/components/youtube-embed"

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
      images: article.image
        ? [{ url: article.image, width: 1200, height: 630 }]
        : [{ url: ogImageUrl(article.title, article.excerpt, lang), width: 1200, height: 630 }],
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

  const relatedIds = article.relatedProjects || []
  const similarProjects = relatedIds.length > 0
    ? getProjectsByIds(relatedIds)
    : getAllProjects()

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Header lang={lang} />

      <main>
        <article className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link
              href={`/${lang}/news`}
              className="inline-flex items-center text-gray-300 hover:text-yellow-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {text.back}
            </Link>

            <Card className="bg-slate-900/80 backdrop-blur-md border-slate-800/50 overflow-hidden mb-8 shadow-2xl">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-slate-800 to-slate-700">
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
                <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
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
                      className="border-yellow-400/60 text-yellow-300 bg-yellow-400/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {article.video && (
                  <div className="mb-8">
                    <YouTubeEmbed url={article.video} title={article.title} />
                  </div>
                )}

                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-p:text-gray-200 prose-p:leading-relaxed
                    prose-h2:text-2xl prose-h2:text-yellow-300
                    prose-h3:text-xl prose-h3:text-gray-100
                    prose-strong:text-white
                    prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:text-yellow-300
                    prose-ul:text-gray-200 prose-ol:text-gray-200
                    prose-li:text-gray-200
                    prose-blockquote:text-gray-100 prose-blockquote:border-l-yellow-400/50
                    prose-code:text-yellow-300 prose-code:bg-yellow-400/10
                    prose-pre:bg-slate-800 prose-pre:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: article.htmlContent }}
                />
              </CardContent>
            </Card>

            <div className="flex items-center justify-between mb-8">
              <button className="inline-flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                {text.share}
              </button>
            </div>

            {similarProjects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {text.relatedProjects}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {similarProjects.map((project) => (
                    <Link key={project.id} href={`/${lang}/projects/${project.id}`}>
                      <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700/50 hover:border-yellow-400/50 transition-all duration-300 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-2xl">{project.countryFlag}</span>
                            <span className="text-sm text-gray-300">
                              {lang === "fr" ? project.country.fr : project.country.en}
                            </span>
                          </div>
                          <h3 className="font-bold text-white mb-2 line-clamp-2">
                            {lang === "fr" ? project.projectName.fr : project.projectName.en}
                          </h3>
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
