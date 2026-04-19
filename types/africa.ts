export interface Country {
  code: string
  name: { fr: string; en: string }
  flag: string
  center: { x: number; y: number }
  path: string
  hasProjects: boolean
}

export interface CountryWithProjects extends Country {
  projectCount: number
  projects: Array<{
    id: string
    slug: string
    name: { fr: string; en: string }
    category: 'major' | 'micro'
    budget: number
  }>
}
