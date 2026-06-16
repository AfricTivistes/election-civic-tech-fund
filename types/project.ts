export interface ProjectTranslation {
  fr: string
  en: string
}

export interface ProjectTool {
  name: string
  url: string
  description: { fr: string; en: string }
  type: "web" | "mobile" | "chatbot" | "api" | "other"
}

export interface Project {
  id: string
  slug: string
  projectName: ProjectTranslation
  organization: string
  country: ProjectTranslation
  countryCode: string
  countryFlag: string
  category: "major" | "micro"
  budget: number
  domain: ProjectTranslation
  description: ProjectTranslation
  impact: ProjectTranslation
  technologies: {
    fr: string[]
    en: string[]
  }
  website?: string
  video?: string
  tools?: ProjectTool[]
  content?: string
  projectImage: string
  startDate: string
  endDate: string
  duration: number
  progress: number
  status: "not_started" | "in_progress" | "completed"
  featured?: boolean
  order?: number
}

export type ProjectStatus = "not_started" | "in_progress" | "completed"
export type ProjectCategory = "major" | "micro"

export interface NewsMetadata {
  title: string
  slug: string
  date: string
  author?: string
  excerpt: string
  image?: string
  video?: string
  tags: string[]
  relatedProjects?: string[]
  featured?: boolean
}

export interface NewsArticle extends NewsMetadata {
  content: string
  htmlContent: string
}
