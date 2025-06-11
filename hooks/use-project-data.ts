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
      console.log('💾 Sauvegarde des données:', { ...data, ...newData })
      console.log('🎯 Impact Score à sauvegarder:', newData.impact_score || data.impact_score)

      // Validation des données requises sera faite après la fusion des données

      // Fusionner les données avant de les utiliser
      const updatedData = { ...data, ...newData }

      // Processor les team_members si nécessaire
      if (updatedData.team_members && Array.isArray(updatedData.team_members)) {
        updatedData.team_members = JSON.stringify(updatedData.team_members)
      }

      // Calculer team_size si pas déjà défini
      if (updatedData.team_members && !updatedData.team_size) {
        const teamArray = Array.isArray(updatedData.team_members) 
          ? updatedData.team_members 
          : JSON.parse(updatedData.team_members || '[]')
        updatedData.team_size = teamArray.length
      }

      if (savedProjectId && typeof savedProjectId === 'string' && savedProjectId.trim() !== '') {
        // Mise à jour d'un projet existant
        console.log('🔄 Mise à jour du projet existant ID:', savedProjectId)
        try {
          await nocoDBService.updateProject(savedProjectId, updatedData)
        } catch (error: any) {
          console.error('❌ Erreur lors de la mise à jour, tentative de création:', error)
          // Si la mise à jour échoue, essayer de créer un nouveau projet
          const created = await nocoDBService.createProject({
            ...updatedData,
            status: updatedData.status || 'draft'
          } as Omit<ProjectSubmission, 'id'>)
          setSavedProjectId(created.id!)
          console.log('✅ Nouveau projet créé après échec de mise à jour, ID:', created.id)
        }
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

      // Vérifier le format des documents reçus (format JSON string comme dans le script de test)
      console.log('📋 Données reçues pour la sauvegarde:', {
        ...updatedData,
        document_cv: updatedData.document_cv ? '(JSON présent)' : '(absent)',
        document_portfolio: updatedData.document_portfolio ? '(JSON présent)' : '(absent)',
        document_budget: updatedData.document_budget ? '(JSON présent)' : '(absent)',
        document_presentation: updatedData.document_presentation ? '(JSON présent)' : '(absent)',
        document_other: updatedData.document_other ? '(JSON présent)' : '(absent)'
      })

      // Vérifier que les documents sont bien au format JSON string
      ['document_cv', 'document_portfolio', 'document_budget', 'document_presentation', 'document_other'].forEach(docCol => {
        if (updatedData[docCol]) {
          try {
            const parsed = JSON.parse(updatedData[docCol])
            console.log(`✅ ${docCol} validé:`, {
              url: parsed[0]?.url ? 'Présente' : 'Manquante',
              title: parsed[0]?.title,
              size: parsed[0]?.size
            })
          } catch (e) {
            console.error(`❌ ${docCol} format invalide:`, e.message)
          }
        }
      })

      // Validation des données requises
      if (!updatedData.vision || !updatedData.problem || !updatedData.domain || !updatedData.country) {
        throw new Error('Données obligatoires manquantes (vision, problem, domain, country)')
      }

      setData(updatedData)
      console.log('✅ Sauvegarde réussie!')
    } catch (err: any) {
      console.error('❌ Erreur lors de la sauvegarde:', err)
      console.error('📄 Détails de l\'erreur:', err.response?.data || err.message)
      setError(`Erreur lors de la sauvegarde: ${err.message}`)
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

  const saveProject = async (finalData: any) => {
    console.log('💾 Sauvegarde du projet...', finalData)

    try {
      // Fusionner toutes les données
      const completeData = {
        ...data,
        ...finalData
      }

      // Traiter les données step par step
      const processedData = {
        // Step 1 - Vision
        vision: completeData.vision?.vision || '',
        problem: completeData.vision?.problem || '',
        domain: completeData.vision?.domain || '',
        country: completeData.vision?.country || '',

        // Step 2 - Technology
        technologies: completeData.technology?.technologies ? 
          JSON.stringify(completeData.technology.technologies) : 
          JSON.stringify([]),
        impact_score: completeData.technology?.impactScore || 0,

        // Step 3 - Team
        team_members: completeData.team?.teamMembers ? 
          JSON.stringify(completeData.team.teamMembers) : 
          JSON.stringify([]),
        team_size: completeData.team?.teamMembers?.length || 0,

        // Step 4 - Documents (les colonnes d'attachement)
        document_cv: finalData.document_cv || null,
        document_portfolio: finalData.document_portfolio || null,
        document_budget: finalData.document_budget || null,
        document_presentation: finalData.document_presentation || null,
        document_other: finalData.document_other || null,

        // Métadonnées
        completion_score: finalData.completion_score || 0,
        status: finalData.status || 'submitted',
        language: 'fr',
        submission_date: finalData.submission_date || new Date().toISOString()
      }

      console.log('📝 Données traitées pour NocoDB:', {
        ...processedData,
        document_cv: processedData.document_cv ? '(présent)' : '(absent)',
        document_portfolio: processedData.document_portfolio ? '(présent)' : '(absent)',
        document_budget: processedData.document_budget ? '(présent)' : '(absent)',
        document_presentation: processedData.document_presentation ? '(présent)' : '(absent)',
        document_other: processedData.document_other ? '(présent)' : '(absent)'
      })

      if (!savedProjectId) {
        // Créer un nouveau projet
        const newProject = await nocoDBService.createProject(processedData)

        console.log('✅ Nouveau projet créé:', newProject.id)
        setSavedProjectId(newProject.id)
        return newProject
      } else {
        // Mettre à jour le projet existant
        const updatedProject = await nocoDBService.updateProject(savedProjectId, processedData)

        console.log('✅ Projet mis à jour:', updatedProject.id)
        return updatedProject
      }
    } catch (error) {
      console.error('❌ Erreur sauvegarde projet:', error)
      throw error
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
    setData,
    saveProject
  }
}