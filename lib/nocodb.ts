
import { Api } from 'nocodb-sdk'

const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_NOCODB_URL || 'http://localhost:8080',
  headers: {
    'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN || ''
  }
})

// Types pour les données du formulaire
export interface ProjectSubmission {
  id?: string
  vision: string
  problem: string
  domain: string
  technologies: string[]
  impact_score: number
  team_members?: any[]
  status: 'draft' | 'submitted'
  created_at?: string
  updated_at?: string
}

export class NocoDBService {
  private tableName = 'democracy_projects'
  private baseId = process.env.NEXT_PUBLIC_NOCODB_BASE_ID || ''

  async createProject(data: Omit<ProjectSubmission, 'id'>): Promise<ProjectSubmission> {
    try {
      const response = await api.dbTableRow.create(
        'noco',
        this.baseId,
        this.tableName,
        {
          ...data,
          technologies: JSON.stringify(data.technologies),
          team_members: JSON.stringify(data.team_members || [])
        }
      )
      return response as ProjectSubmission
    } catch (error) {
      console.error('Erreur création projet:', error)
      throw error
    }
  }

  async updateProject(id: string, data: Partial<ProjectSubmission>): Promise<ProjectSubmission> {
    try {
      const updateData = { ...data }
      if (data.technologies) {
        updateData.technologies = JSON.stringify(data.technologies) as any
      }
      if (data.team_members) {
        updateData.team_members = JSON.stringify(data.team_members) as any
      }

      const response = await api.dbTableRow.update(
        'noco',
        this.baseId,
        this.tableName,
        id,
        updateData
      )
      return response as ProjectSubmission
    } catch (error) {
      console.error('Erreur mise à jour projet:', error)
      throw error
    }
  }

  async getProject(id: string): Promise<ProjectSubmission | null> {
    try {
      const response = await api.dbTableRow.read(
        'noco',
        this.baseId,
        this.tableName,
        id
      )
      
      return {
        ...response,
        technologies: JSON.parse(response.technologies || '[]'),
        team_members: JSON.parse(response.team_members || '[]')
      } as ProjectSubmission
    } catch (error) {
      console.error('Erreur récupération projet:', error)
      return null
    }
  }

  async getAllProjects(): Promise<ProjectSubmission[]> {
    try {
      const response = await api.dbTableRow.list(
        'noco',
        this.baseId,
        this.tableName
      )
      
      return response.list.map(item => ({
        ...item,
        technologies: JSON.parse(item.technologies || '[]'),
        team_members: JSON.parse(item.team_members || '[]')
      })) as ProjectSubmission[]
    } catch (error) {
      console.error('Erreur récupération projets:', error)
      return []
    }
  }
}

export const nocoDBService = new NocoDBService()
