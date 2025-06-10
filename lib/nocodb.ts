
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
  created_at?: string
  updated_at?: string
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  
  // Step 1 - Vision
  vision: string
  problem: string
  domain: 'tech' | 'engagement' | 'media' | 'legal'
  
  // Step 2 - Technologies
  technologies: string[]
  impact_score: number
  
  // Step 3 - Équipe
  team_members?: any[]
  team_size?: number
  
  // Step 4 - Documents
  uploaded_documents?: any
  completion_score?: number
  
  // Métadonnées
  country?: string
  language?: 'fr' | 'en'
  submission_date?: string
  reviewer_notes?: string
  funding_amount?: number
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
