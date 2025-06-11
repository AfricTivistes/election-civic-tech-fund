
const { Api } = require('nocodb-sdk')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const fetch = require('node-fetch')

// Configuration de l'API NocoDB
const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_NOCODB_URL,
  headers: {
    'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN
  }
})

// Fonction pour uploader un fichier avec fetch
async function uploadFileWithFetch(filePath, fileName) {
  try {
    console.log('📤 Upload fichier avec fetch:', { fileName, filePath })

    const fileBuffer = fs.readFileSync(filePath)
    const formData = new FormData()
    const blob = new Blob([fileBuffer], { type: 'application/pdf' })
    formData.append('file', blob, fileName)

    const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_NOCODB_URL}/api/v1/db/storage/upload`, {
      method: 'POST',
      headers: {
        'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN,
      },
      body: formData
    })

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('❌ Réponse d\'erreur:', errorText)
      throw new Error(`Erreur upload: ${uploadResponse.status} ${uploadResponse.statusText}`)
    }

    const uploadResult = await uploadResponse.json()
    console.log('✅ Upload réussi:', uploadResult)
    return uploadResult
  } catch (error) {
    console.error('❌ Erreur upload fichier:', error)
    throw error
  }
}

async function testCompleteSubmission() {
  try {
    console.log('🧪 Test de soumission complète du formulaire')
    console.log('📂 Vérification du dossier public/documents...')
    
    const documentsDir = path.join(process.cwd(), 'public', 'documents')
    const files = fs.readdirSync(documentsDir)
    console.log('📁 Fichiers disponibles:', files)
    
    // Sélectionner des fichiers pour chaque type de document
    const pdfFile = files.find(f => f.endsWith('.pdf'))
    const xlsxFile = files.find(f => f.endsWith('.xlsx'))
    const docxFile = files.find(f => f.endsWith('.docx'))
    
    if (!pdfFile || !xlsxFile || !docxFile) {
      console.error('❌ Fichiers de test manquants (PDF, XLSX, DOCX)')
      return
    }
    
    console.log('📄 Fichiers sélectionnés:', { pdfFile, xlsxFile, docxFile })
    
    // 1. Upload des fichiers
    console.log('\n🔄 Étape 1: Upload des documents...')
    
    const cvUpload = await uploadFileWithFetch(
      path.join(documentsDir, pdfFile), 
      pdfFile
    )
    
    const portfolioUpload = await uploadFileWithFetch(
      path.join(documentsDir, docxFile), 
      docxFile
    )
    
    const budgetUpload = await uploadFileWithFetch(
      path.join(documentsDir, xlsxFile), 
      xlsxFile
    )
    
    const presentationUpload = await uploadFileWithFetch(
      path.join(documentsDir, pdfFile), 
      `presentation_${pdfFile}`
    )
    
    // 2. Créer un projet complet avec tous les documents
    console.log('\n🔄 Étape 2: Création du projet complet...')
    
    const completeProjectData = {
      // Step 1 - Vision
      vision: "Test de soumission complète - Vision innovante pour la démocratie numérique",
      problem: "Test du problème de transparence électorale à résoudre",
      domain: 'tech',
      country: 'sn',
      
      // Step 2 - Technologies
      technologies: JSON.stringify(["blockchain", "ai", "mobile"]),
      impact_score: 95,
      
      // Step 3 - Équipe
      team_members: JSON.stringify([
        {
          id: "1",
          name: "Jean Dupont",
          role: "Chef de projet",
          skills: ["Management", "Blockchain"],
          experience: "5 ans d'expérience en projets tech",
          motivation: "Passionné par la démocratie numérique"
        },
        {
          id: "2", 
          name: "Marie Martin",
          role: "Développeuse",
          skills: ["Development", "UX/UI"],
          experience: "3 ans en développement web",
          motivation: "Créer des solutions accessibles"
        }
      ]),
      team_size: 2,
      
      // Step 4 - Documents (format NocoDB Attachment)
      document_cv: JSON.stringify([{
        url: cvUpload[0]?.url || cvUpload[0]?.signedUrl,
        title: cvUpload[0]?.title || pdfFile,
        mimetype: cvUpload[0]?.mimetype || 'application/pdf',
        size: cvUpload[0]?.size || 0
      }]),
      
      document_portfolio: JSON.stringify([{
        url: portfolioUpload[0]?.url || portfolioUpload[0]?.signedUrl,
        title: portfolioUpload[0]?.title || docxFile,
        mimetype: portfolioUpload[0]?.mimetype || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: portfolioUpload[0]?.size || 0
      }]),
      
      document_budget: JSON.stringify([{
        url: budgetUpload[0]?.url || budgetUpload[0]?.signedUrl,
        title: budgetUpload[0]?.title || xlsxFile,
        mimetype: budgetUpload[0]?.mimetype || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: budgetUpload[0]?.size || 0
      }]),
      
      document_presentation: JSON.stringify([{
        url: presentationUpload[0]?.url || presentationUpload[0]?.signedUrl,
        title: presentationUpload[0]?.title || `presentation_${pdfFile}`,
        mimetype: presentationUpload[0]?.mimetype || 'application/pdf',
        size: presentationUpload[0]?.size || 0
      }]),
      
      // Métadonnées
      completion_score: 100,
      status: 'submitted',
      language: 'fr',
      submission_date: new Date().toISOString()
    }
    
    console.log('📝 Données du projet complet:', {
      ...completeProjectData,
      document_cv: '(fichier uploadé)',
      document_portfolio: '(fichier uploadé)', 
      document_budget: '(fichier uploadé)',
      document_presentation: '(fichier uploadé)'
    })
    
    // 3. Sauvegarder le projet dans NocoDB
    console.log('\n🔄 Étape 3: Sauvegarde dans NocoDB...')
    
    const response = await api.dbTableRow.create(
      'noco',
      process.env.NEXT_PUBLIC_NOCODB_BASE_ID,
      'democracy_projects',
      completeProjectData
    )
    
    console.log('✅ Projet créé avec succès!')
    console.log('🆔 ID du projet:', response.id)
    console.log('📊 Score d\'impact:', response.impact_score)
    console.log('👥 Taille équipe:', response.team_size)
    console.log('📋 Statut:', response.status)
    console.log('📁 Documents attachés:')
    console.log('  - CV:', response.document_cv ? 'Oui' : 'Non')
    console.log('  - Portfolio:', response.document_portfolio ? 'Oui' : 'Non') 
    console.log('  - Budget:', response.document_budget ? 'Oui' : 'Non')
    console.log('  - Présentation:', response.document_presentation ? 'Oui' : 'Non')
    
    console.log('\n🎉 Test de soumission complète réussi!')
    console.log('💡 Le formulaire devrait maintenant fonctionner correctement')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
    if (error.response?.data) {
      console.error('📄 Détails de l\'erreur:', error.response.data)
    }
  }
}

// Exécution du script
if (require.main === module) {
  testCompleteSubmission()
}

module.exports = { testCompleteSubmission }
