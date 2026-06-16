import { Metadata } from "next"
import { ogImageUrl } from "@/lib/og"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getAllNews, getFeaturedNews } from "@/lib/news"
import { ArrowRight, Calendar, User, Play } from "lucide-react"
import Image from "next/image"

interface NewsPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "fr" ? "Actualités | Election Civic Tech Fund" : "News | Election Civic Tech Fund",
    description: lang === "fr"
      ? "Suivez les dernières actualités de l'Election Civic Tech Fund"
      : "Follow the latest news from the Election Civic Tech Fund",
    openGraph: {
      images: [{ url: ogImageUrl(
        lang === "fr" ? "Actualités" : "News",
        lang === "fr" ? "Suivez les dernières actualités de l'Election Civic Tech Fund" : "Follow the latest news from the Election Civic Tech Fund",
        lang
      ), width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { lang } = await params
  const articles = await getAllNews(lang)
  const featured = await getFeaturedNews(lang)

  const t = {
    fr: {
      title: "Actualités",
      subtitle: "Suivez les avancées du Fonds et de ses projets",
      readMore: "Lire la suite",
      featured: "À la une",
      allNews: "Toutes les actualités",
      noArticles: "Aucune actualité pour le moment",
    },
    en: {
      title: "News",
      subtitle: "Follow the Fund's and projects' progress",
      readMore: "Read more",
      featured: "Featured",
      allNews: "All news",
      noArticles: "No news at the moment",
    },
  }

  const text = t[lang as "fr" | "en"]
  const currentLang = lang as "fr" | "en"

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const regularArticles = articles.filter(a => !a.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <Header lang={lang} />

      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
                {text.title}
              </h1>
              <p className="text-xl text-gray-200">
                {text.subtitle}
              </p>
            </div>

            {featured && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg mr-3">{text.featured}</span>
                </h2>
                <Card className="bg-slate-800/80 backdrop-blur-md border-yellow-500/50 overflow-hidden shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto bg-gradient-to-br from-slate-800 to-slate-700">
                      {featured.image ? (
                        <Image
                          src={featured.image}
                          alt={featured.title}
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
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(featured.date)}
                        </span>
                        {featured.author && (
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {featured.author}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {featured.title}
                      </h3>
                      <p className="text-gray-300 mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featured.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-yellow-400/60 text-yellow-300 bg-yellow-400/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        href={`/${lang}/news/${featured.slug}`}
                        className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold"
                      >
                        {text.readMore}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-white mb-6">{text.allNews}</h2>
              
              {regularArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularArticles.map((article) => (
                    <Link key={article.slug} href={`/${lang}/news/${article.slug}`}>
                      <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1 h-full shadow-lg">
                        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-700">
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
                                <div className="text-4xl mb-2">📰</div>
                              </div>
                            </div>
                          )}
                          {article.video && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="bg-red-600 rounded-full p-3 shadow-lg">
                                <Play className="w-6 h-6 text-white fill-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-gray-300 mb-3">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(article.date)}
                          </div>
                          <h3 className="font-bold text-white text-lg mb-3 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-slate-600 text-gray-300"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-300 text-lg">{text.noArticles}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
