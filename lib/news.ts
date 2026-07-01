import { parseMarkdownFile, getAllMarkdownFiles } from './markdown'
import { NewsArticle, NewsMetadata } from '@/types/project'

export async function getAllNews(lang: string = 'fr'): Promise<NewsArticle[]> {
  const files = getAllMarkdownFiles('news', lang)

  const articles = await Promise.all(
    files.map(async (file) => {
      const { metadata, content, htmlContent } =
        await parseMarkdownFile<NewsMetadata>(file)
      return { ...metadata, content, htmlContent }
    })
  )

  return articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getNewsBySlug(
  slug: string,
  lang: string = 'fr'
): Promise<NewsArticle | null> {
  const allNews = await getAllNews(lang)
  return allNews.find(article => article.slug === slug) || null
}

export async function getRecentNews(
  count: number = 3,
  lang: string = 'fr'
): Promise<NewsArticle[]> {
  const allNews = await getAllNews(lang)
  return allNews.slice(0, count)
}

export async function getNewsByProject(
  projectId: string,
  lang: string = 'fr'
): Promise<NewsArticle[]> {
  const allNews = await getAllNews(lang)
  return allNews.filter(article =>
    article.relatedProjects?.includes(projectId)
  )
}

export async function getNewsByTag(
  tag: string,
  lang: string = 'fr'
): Promise<NewsArticle[]> {
  const allNews = await getAllNews(lang)
  return allNews.filter(article =>
    article.tags?.includes(tag)
  )
}

export async function getAllTags(lang: string = 'fr'): Promise<string[]> {
  const allNews = await getAllNews(lang)
  const tags = new Set<string>()
  allNews.forEach(article => {
    article.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export async function getFeaturedNews(lang: string = 'fr'): Promise<NewsArticle | null> {
  const allNews = await getAllNews(lang)
  return allNews.find(article => article.featured) || null
}
