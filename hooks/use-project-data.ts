
import { useState, useEffect } from 'react'
import { nocoDBService, ProjectSubmission } from '@/lib/nocodb'

export function useProjectData(projectId?: string) {
  const [data, setData] = useState<Partial<ProjectSubmission>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedProjectId, setSavedProjectId] = useState<string | null>(projectId || null)

  useEffect(() => {
    if (projectId) {
      loadProject(projectId)
    }
  }, [projectId])

  const loadProject = async (id: string) => {
    setLoading(true)
    try {
      const project = await nocoDBService.getProject(id)
      if (project) {
        setData(project)
      }
    } catch (err) {
      setError('Erreur lors du chargement du projet')
    } finally {
      setLoading(false)
    }
  }

  const saveData = async (newData: Partial<ProjectSubmission>, autoSave = true) => {
    if (!autoSave) {
      setData(prev => ({ ...prev, ...newData }))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const updatedData = { ...data, ...newData }

      if (savedProjectId) {
        // Mise à jour d'un projet existant
        await nocoDBService.updateProject(savedProjectId, updatedData)
      } else {
        // Création d'un nouveau projet
        const created = await nocoDBService.createProject({
          ...updatedData,
          status: 'draft'
        } as Omit<ProjectSubmission, 'id'>)
        setSavedProjectId(created.id!)
      }

      setData(updatedData)
    } catch (err) {
      setError('Erreur lors de la sauvegarde')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const submitProject = async () => {
    if (!savedProjectId) {
      throw new Error('Aucun projet à soumettre')
    }

    setLoading(true)
    try {
      await nocoDBService.updateProject(savedProjectId, {
        status: 'submitted'
      })
      setData(prev => ({ ...prev, status: 'submitted' }))
    } catch (err) {
      setError('Erreur lors de la soumission')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    savedProjectId,
    saveData,
    submitProject,
    setData
  }
}
