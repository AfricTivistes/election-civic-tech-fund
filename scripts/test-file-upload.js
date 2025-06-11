
const { Api } = require('nocodb-sdk')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_NOCODB_URL,
  headers: {
    'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN
  }
})

// Fonction pour uploader un fichier vers NocoDB
async function uploadFileToNocoDB(filePath, fileName) {
  try {
    console.log('📤 Upload fichier vers NocoDB:', { fileName, filePath })

    // Lire le fichier depuis le système de fichiers
    const fileBuffer = fs.readFileSync(filePath)
    
    // Créer un Blob/File-like object
    const formData = new FormData()
    const file = new Blob([fileBuffer], { type: 'application/pdf' })
    formData.append('file', file, fileName)

    // Utiliser l'API d'upload NocoDB
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
    console.log('✅ Fichier uploadé:', uploadResult)

    return uploadResult
  } catch (error) {
    console.error('❌ Erreur upload fichier:', error)
    throw error
  }
}

// Fonction alternative utilisant fetch avec buffer
async function uploadFileWithFetch(filePath, fileName) {
  try {
    console.log('📤 Upload fichier avec fetch:', { fileName, filePath })

    const fileBuffer = fs.readFileSync(filePath)
    
    const formData = new FormData()
    // Créer un Blob à partir du buffer
    const blob = new Blob([fileBuffer], { 
      type: fileName.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream' 
    })
    formData.append('file', blob, fileName)

    const response = await fetch(`${process.env.NEXT_PUBLIC_NOCODB_URL}/api/v1/db/storage/upload`, {
      method: 'POST',
      headers: {
        'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN,
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('✅ Upload réussi:', result)
    return result
  } catch (error) {
    console.error('❌ Erreur upload:', error)
    throw error
  }
}

async function testFileUploadAndSubmission() {
  try {
    console.log('🧪 Test d\'upload de fichier et soumission complète')
    console.log('📂 Vérification du dossier public/documents...')
    
    const documentsDir = path.join(process.cwd(), 'public', 'documents')
    const files = fs.readdirSync(documentsDir)
    console.log('📁 Fichiers disponibles:', files)
    
    // Utiliser le premier PDF trouvé
    const pdfFile = files.find(f => f.endsWith('.pdf'))
    if (!pdfFile) {
      console.error('❌ Aucun fichier PDF trouvé dans public/documents')
      return
    }
    
    const filePath = path.join(documentsDir, pdfFile)
    console.log('📄 Fichier de test sélectionné:', pdfFile)
    
    // 1. Tester l'upload du fichier
    console.log('\n🔄 Étape 1: Upload du fichier...')
    let uploadResult
    try {
      uploadResult = await uploadFileWithFetch(filePath, pdfFile)
    } catch (error) {
      console.error('❌ Échec de l\'upload, abandon du test:', error.message)
      return
    }
    
    // 2. Créer un projet de test avec le fichier uploadé
    console.log('\n🔄 Étape 2: Création d\'un projet de test...')
    
    // Formater le résultat d'upload selon le format NocoDB pour les colonnes Attachment
    const attachmentData = [{
      url: uploadResult.url || uploadResult.signedUrl,
      title: uploadResult.title || pdfFile,
      mimetype: uploadResult.mimetype || 'application/pdf',
      size: uploadResult.size || fs.statSync(filePath).size
    }]
    
    const testProjectData = {
      vision: "Test d'upload de fichier - Vision de test",
      problem: "Test du problème d'upload de fichiers",
      domain: "tech",
      country: "sn",
      technologies: JSON.stringify(["test", "upload", "nocodb"]),
      impact_score: 95,
      status: "submitted",
      language: "fr",
      submission_date: new Date().toISOString(),
      // Colonnes d'attachement avec le fichier uploadé
      document_cv: JSON.stringify(attachmentData),
      document_portfolio: JSON.stringify(attachmentData),
      document_budget: JSON.stringify(attachmentData),
      completion_score: 100
    }
    
    console.log('📝 Données du projet de test:', testProjectData)
    
    // Créer le projet dans NocoDB
    const createdProject = await api.dbTableRow.create(
      'noco',
      process.env.NEXT_PUBLIC_NOCODB_BASE_ID,
      'democracy_projects',
      testProjectData
    )
    
    console.log('✅ Projet de test créé! ID:', createdProject.id)
    
    // 3. Vérifier que le projet a été créé avec les fichiers
    console.log('\n🔄 Étape 3: Vérification du projet créé...')
    
    const retrievedProject = await api.dbTableRow.read(
      'noco',
      process.env.NEXT_PUBLIC_NOCODB_BASE_ID,
      'democracy_projects',
      createdProject.id
    )
    
    console.log('📊 Projet récupéré:')
    console.log('  - ID:', retrievedProject.id)
    console.log('  - Vision:', retrievedProject.vision)
    console.log('  - Status:', retrievedProject.status)
    console.log('  - Document CV:', retrievedProject.document_cv ? 'Présent ✅' : 'Absent ❌')
    console.log('  - Document Portfolio:', retrievedProject.document_portfolio ? 'Présent ✅' : 'Absent ❌')
    console.log('  - Document Budget:', retrievedProject.document_budget ? 'Présent ✅' : 'Absent ❌')
    
    if (retrievedProject.document_cv) {
      try {
        const cvData = JSON.parse(retrievedProject.document_cv)
        console.log('  - Détails CV:', cvData)
      } catch (e) {
        console.log('  - CV brut:', retrievedProject.document_cv)
      }
    }
    
    console.log('\n🎉 Test terminé avec succès!')
    console.log('💡 Le système d\'upload de fichiers fonctionne correctement')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
    if (error.response) {
      console.error('📄 Détails de l\'erreur:', error.response.data)
    }
  }
}

// Fonction pour tester juste l'upload sans création de projet
async function testUploadOnly() {
  try {
    console.log('🧪 Test d\'upload de fichier uniquement')
    
    const documentsDir = path.join(process.cwd(), 'public', 'documents')
    const files = fs.readdirSync(documentsDir)
    console.log('📁 Fichiers disponibles:', files)
    
    const pdfFile = files.find(f => f.endsWith('.pdf'))
    if (!pdfFile) {
      console.error('❌ Aucun fichier PDF trouvé')
      return
    }
    
    const filePath = path.join(documentsDir, pdfFile)
    console.log('📄 Test d\'upload:', pdfFile)
    
    const result = await uploadFileWithFetch(filePath, pdfFile)
    console.log('🎉 Upload réussi!', result)
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

// Exécuter le test
if (require.main === module) {
  const testType = process.argv[2] || 'full'
  
  if (testType === 'upload') {
    testUploadOnly()
  } else {
    testFileUploadAndSubmission()
  }
}

module.exports = { testFileUploadAndSubmission, testUploadOnly }
