import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Project, ProjectCategory } from '@/types/project'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

let _cache: Project[] | null = null

function loadProjects(): Project[] {
  if (_cache) return _cache

  if (!fs.existsSync(projectsDirectory)) return []

  const files = fs.readdirSync(projectsDirectory)
    .filter(f => f.endsWith('.md'))
    .sort()

  _cache = files.map(file => {
    const fullPath = path.join(projectsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return data as Project
  }).sort((a, b) => (a.order || 0) - (b.order || 0))

  return _cache
}

export function getAllProjects(): Project[] {
  return loadProjects()
}

export function getProjectById(id: string): Project | undefined {
  return loadProjects().find(p => p.id === id)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return loadProjects().find(p => p.slug === slug)
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return loadProjects().filter(p => p.category === category)
}

export function getProjectsByCountry(countryCode: string): Project[] {
  return loadProjects().filter(p => p.countryCode === countryCode)
}

export function getFeaturedProjects(count: number = 4): Project[] {
  return loadProjects()
    .filter(p => p.featured)
    .slice(0, count)
}

export function getSimilarProjects(projectId: string, count: number = 3): Project[] {
  const projects = loadProjects()
  const project = projects.find(p => p.id === projectId)
  if (!project) return []

  return projects
    .filter(p => p.id !== projectId)
    .sort((a, b) => {
      let scoreA = 0
      let scoreB = 0
      if (a.countryCode === project.countryCode) scoreA += 2
      if (b.countryCode === project.countryCode) scoreB += 2
      if (a.category === project.category) scoreA += 1
      if (b.category === project.category) scoreB += 1
      return scoreB - scoreA
    })
    .slice(0, count)
}

export function getProjectsByIds(ids: string[]): Project[] {
  const projects = loadProjects()
  return ids.map(id => projects.find(p => p.id === id)).filter(Boolean) as Project[]
}

export function getProjectStats() {
  const projects = loadProjects()
  const total = projects.length
  const major = projects.filter(p => p.category === 'major').length
  const micro = projects.filter(p => p.category === 'micro').length
  const countries = new Set(projects.map(p => p.countryCode)).size
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const avgProgress = Math.round(
    projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
  )
  return { total, major, micro, countries, totalBudget, avgProgress }
}

export function getUniqueCountries(): Array<{
  code: string
  name: { fr: string; en: string }
  flag: string
  count: number
}> {
  const countryMap = new Map<string, { name: { fr: string; en: string }; flag: string; count: number }>()

  loadProjects().forEach(p => {
    const existing = countryMap.get(p.countryCode)
    if (existing) {
      existing.count++
    } else {
      countryMap.set(p.countryCode, { name: p.country, flag: p.countryFlag, count: 1 })
    }
  })

  return Array.from(countryMap.entries()).map(([code, data]) => ({ code, ...data }))
}

export function getUniqueTechnologies(lang: 'fr' | 'en' = 'fr'): string[] {
  const techs = new Set<string>()
  loadProjects().forEach(p => {
    p.technologies[lang].forEach(t => techs.add(t))
  })
  return Array.from(techs).sort()
}

export function getProjectsByTechnology(technology: string, lang: 'fr' | 'en' = 'fr'): Project[] {
  return loadProjects().filter(p =>
    p.technologies[lang].some(t => t.toLowerCase().includes(technology.toLowerCase()))
  )
}

export function filterProjects(filters: {
  category?: "all" | "major" | "micro"
  country?: string | null
  technology?: string | null
}, lang: 'fr' | 'en' = 'fr'): Project[] {
  return loadProjects().filter(project => {
    if (filters.category && filters.category !== "all" && project.category !== filters.category) return false
    if (filters.country && project.countryCode !== filters.country) return false
    if (filters.technology) {
      const techMatch = project.technologies[lang].some(t =>
        t.toLowerCase().includes(filters.technology!.toLowerCase())
      )
      if (!techMatch) return false
    }
    return true
  })
}
