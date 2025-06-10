
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
      
      console.log('💾 Sauvegarde des données:', updatedData)

      if (savedProjectId) {
        // Mise à jour d'un projet existant
        console.log('🔄 Mise à jour du projet existant ID:', savedProjectId)
        await nocoDBService.updateProject(savedProjectId, updatedData)
      } else {
        // Création d'un nouveau projet
        console.log('🆕 Création d\'un nouveau projet')
        const created = await nocoDBService.createProject({
          ...updatedData,
          status: updatedData.status || 'draft'
        } as Omit<ProjectSubmission, 'id'>)
        setSavedProjectId(created.id!)
        console.log('✅ Nouveau projet créé avec ID:', created.id)
      }
      
      setData(updatedData)
      console.log('✅ Sauvegarde réussie!')
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde:', err)
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
        status: 'submitted',
        submission_date: new Date().toISOString()
      })
      setData(prev => ({ 
        ...prev, 
        status: 'submitted',
        submission_date: new Date().toISOString()
      }))
      console.log('📤 Projet soumis avec succès!')
    } catch (err) {
      setError('Erreur lors de la soumission')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fonction de test pour vérifier les données
  const testSaveWithCountry = async (testData: Partial<ProjectSubmission>) => {
    console.log('🧪 Test de sauvegarde avec pays:', testData)
    
    if (!testData.country) {
      console.warn('⚠️ Aucun pays détecté dans les données de test')
      return
    }
    
    console.log(`🏳️ Pays détecté: ${testData.country}`)
    
    try {
      await saveData(testData, true)
      console.log('✅ Test de sauvegarde réussi')
    } catch (error) {
      console.error('❌ Échec du test de sauvegarde:', error)
    }
  }

  return {
    data,
    loading,
    error,
    savedProjectId,
    saveData,
    submitProject,
    testSaveWithCountry,
    setData
  }
}
