
import { Api } from 'nocodb-sdk'

const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_NOCODB_URL || 'https://app.nocodb.com/api/v2',
  headers: {
    'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN || ''
  }
})

export interface ProjectSubmission {
  id?: string
  vision: string
  problem: string
  domain: 'tech' | 'engagement' | 'media' | 'legal'
  country: string
  technologies?: string[] | string
  impact_score?: number
  team_members?: any[] | string
  team_size?: number
  document_cv?: any[] | string
  document_portfolio?: any[] | string
  document_budget?: any[] | string
  document_presentation?: any[] | string
  document_other?: any[] | string
  completion_score?: number
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  language?: 'fr' | 'en'
  submission_date?: string
  reviewer_notes?: string
  funding_amount?: number
  created_at?: string
  updated_at?: string
}

export class NocoDBService {
  private tableName = 'democracy_projects'
  private baseId = process.env.NEXT_PUBLIC_NOCODB_BASE_ID || ''

  async createProject(data: Omit<ProjectSubmission, 'id'>): Promise<ProjectSubmission> {
    try {
      console.log('🚀 Création projet:', data)
      
      // Validation des données requises
      if (!data.vision || !data.problem || !data.domain || !data.country) {
        throw new Error('Données obligatoires manquantes pour la création du projet')
      }
      
      // Convertir les arrays en JSON strings si nécessaire
      const processedData = {
        ...data,
        technologies: Array.isArray(data.technologies) 
          ? JSON.stringify(data.technologies) 
          : (data.technologies || JSON.stringify([])),
        team_members: Array.isArray(data.team_members) 
          ? JSON.stringify(data.team_members) 
          : (data.team_members || JSON.stringify([])),
        uploaded_documents: typeof data.uploaded_documents === 'object' 
          ? JSON.stringify(data.uploaded_documents) 
          : (data.uploaded_documents || JSON.stringify({})),
        status: data.status || 'draft',
        language: data.language || 'fr'
      }

      console.log('📝 Données traitées pour NocoDB:', processedData)

      const response = await api.dbTableRow.create(
        'noco',
        this.baseId,
        this.tableName,
        processedData
      )
      
      console.log('✅ Projet créé avec ID:', response.id)
      return this.parseProject(response)
    } catch (error: any) {
      console.error('❌ Erreur création projet:', error)
      console.error('📄 Détails de l\'erreur:', error.response?.data || error.message)
      throw new Error(`Erreur lors de la création du projet: ${error.response?.data?.message || error.message}`)
    }
  }

  async updateProject(id: string, data: Partial<ProjectSubmission>): Promise<ProjectSubmission> {
    try {
      console.log('🔄 Mise à jour projet ID:', id)
      
      if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error('ID du projet manquant ou invalide pour la mise à jour')
      }
      
      // Convertir les arrays en JSON strings si nécessaire
      const processedData = { ...data }
      if (data.technologies && Array.isArray(data.technologies)) {
        processedData.technologies = JSON.stringify(data.technologies)
      }
      if (data.team_members && Array.isArray(data.team_members)) {
        processedData.team_members = JSON.stringify(data.team_members)
      }
      // Les attachements sont gérés directement par NocoDB, pas besoin de JSON.stringify

      const response = await api.dbTableRow.update(
        'noco',
        this.baseId,
        this.tableName,
        id,
        processedData
      )
      
      console.log('✅ Projet mis à jour')
      return this.parseProject(response)
    } catch (error) {
      console.error('❌ Erreur mise à jour projet:', error)
      throw new Error(`Erreur lors de la mise à jour: ${error.message}`)
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
      
      return response ? this.parseProject(response) : null
    } catch (error) {
      console.error('❌ Erreur récupération projet:', error)
      return null
    }
  }

  async listProjects(filters?: any): Promise<ProjectSubmission[]> {
    try {
      const response = await api.dbTableRow.list(
        'noco',
        this.baseId,
        this.tableName,
        {
          limit: 100,
          ...filters
        }
      )
      
      return response.list?.map(project => this.parseProject(project)) || []
    } catch (error) {
      console.error('❌ Erreur liste projets:', error)
      return []
    }
  }

  private parseProject(rawProject: any): ProjectSubmission {
    return {
      ...rawProject,
      technologies: this.parseJSON(rawProject.technologies),
      team_members: this.parseJSON(rawProject.team_members)
    }
  }

  private parseJSON(value: any): any {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    }
    return value
  }
}

export const nocoDBService = new NocoDBService()
