
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
      url: uploadResult[0]?.url || uploadResult[0]?.signedUrl,
      title: uploadResult[0]?.title || pdfFile,
      mimetype: uploadResult[0]?.mimetype || 'application/pdf',
      size: uploadResult[0]?.size || fs.statSync(filePath).size,
      icon: uploadResult[0]?.icon || 'mdi-pdf-box'
    }]
    
    const testProjectData = {
      // Données obligatoires pour la validation
      vision: "Développer une plateforme numérique révolutionnaire pour la démocratie participative en Afrique. Cette vision vise à transformer la manière dont les citoyens interagissent avec leurs gouvernements et participent aux décisions qui affectent leur vie quotidienne.",
      problem: "L'engagement civique en Afrique souffre d'un manque d'outils numériques adaptés au contexte local. Les citoyens ont des difficultés à accéder à l'information gouvernementale, à participer aux consultations publiques et à faire entendre leur voix dans les processus démocratiques.",
      solution: "Création d'une application mobile et web multilingue qui permet aux citoyens de suivre les activités gouvernementales, participer à des sondages, signaler des problèmes communautaires et recevoir des notifications sur les consultations publiques.",
      domain: "tech",
      country: "sn",
      
      // Informations techniques
      technologies: JSON.stringify(["React Native", "Node.js", "MongoDB", "Socket.io", "AI/ML"]),
      technical_approach: "Architecture microservices avec API REST, base de données NoSQL pour la scalabilité, intégration d'IA pour l'analyse de sentiment et notifications push en temps réel.",
      
      // Équipe
      team_members: JSON.stringify([
        {
          name: "Marie Diop",
          role: "Chef de projet",
          experience: "10 ans en développement d'applications citoyennes",
          email: "marie@test-project.org"
        },
        {
          name: "Amadou Ba",
          role: "Développeur Full-stack",
          experience: "8 ans en développement web/mobile",
          email: "amadou@test-project.org"
        },
        {
          name: "Fatou Sall",
          role: "Designer UX/UI",
          experience: "6 ans en design d'interfaces utilisateur",
          email: "fatou@test-project.org"
        }
      ]),
      team_size: 3,
      
      // Impact et métriques
      impact_score: 95,
      target_beneficiaries: "2 millions de citoyens sénégalais, avec extension prévue dans 5 pays d'Afrique de l'Ouest",
      expected_outcomes: "Augmentation de 40% de la participation citoyenne aux consultations publiques, amélioration de 60% de la transparence gouvernementale perçue",
      success_metrics: JSON.stringify([
        "Nombre d'utilisateurs actifs mensuels",
        "Taux de participation aux sondages",
        "Nombre de problèmes communautaires signalés et résolus",
        "Score de satisfaction utilisateur"
      ]),
      
      // Informations projet
      project_timeline: JSON.stringify({
        "Phase 1": "Recherche et conception (3 mois)",
        "Phase 2": "Développement MVP (6 mois)", 
        "Phase 3": "Tests et déploiement pilote (3 mois)",
        "Phase 4": "Lancement et scaling (6 mois)"
      }),
      budget_breakdown: JSON.stringify({
        "Développement": 45000,
        "Design et UX": 15000,
        "Infrastructure": 10000,
        "Marketing": 8000,
        "Formation": 5000,
        "Autres": 2000
      }),
      funding_amount: 85000,
      
      // Fichiers uploadés - toutes les colonnes d'attachement
      document_cv: JSON.stringify(attachmentData),
      document_portfolio: JSON.stringify(attachmentData), 
      document_budget: JSON.stringify(attachmentData),
      document_presentation: JSON.stringify(attachmentData),
      document_other: JSON.stringify(attachmentData),
      
      // Statut et métadonnées
      status: "submitted",
      language: "fr",
      submission_date: new Date().toISOString(),
      completion_score: 100,
      
      // Informations additionnelles
      sustainability_plan: "Modèle freemium avec abonnements premium pour les organisations, partenariats avec les gouvernements locaux, formation continue des équipes techniques locales",
      risks_mitigation: "Stratégie de sécurité des données robuste, conformité RGPD, tests de charge réguliers, plan de continuité d'activité",
      innovation_aspects: "Utilisation d'IA pour l'analyse de sentiment des retours citoyens, interface vocale en langues locales, blockchain pour la transparence des votes"
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
    console.log('  - Vision:', retrievedProject.vision?.substring(0, 80) + '...')
    console.log('  - Problème:', retrievedProject.problem?.substring(0, 80) + '...')
    console.log('  - Domaine:', retrievedProject.domain)
    console.log('  - Pays:', retrievedProject.country)
    console.log('  - Statut:', retrievedProject.status)
    console.log('  - Score d\'impact:', retrievedProject.impact_score)
    console.log('  - Score de completion:', retrievedProject.completion_score)
    console.log('  - Taille équipe:', retrievedProject.team_size)
    console.log('  - Budget demandé:', retrievedProject.funding_amount, '€')
    
    // Vérifier tous les documents
    console.log('📁 Documents uploadés:')
    console.log('  - Document CV:', retrievedProject.document_cv ? 'Présent ✅' : 'Absent ❌')
    console.log('  - Document Portfolio:', retrievedProject.document_portfolio ? 'Présent ✅' : 'Absent ❌')
    console.log('  - Document Budget:', retrievedProject.document_budget ? 'Présent ✅' : 'Absent ❌')
    console.log('  - Document Présentation:', retrievedProject.document_presentation ? 'Présent ✅' : 'Absent ❌')
    console.log('  - Document Autre:', retrievedProject.document_other ? 'Présent ✅' : 'Absent ❌')
    
    // Détails d'un document
    if (retrievedProject.document_cv) {
      try {
        const cvData = JSON.parse(retrievedProject.document_cv)
        console.log('  - Détails CV:', {
          titre: cvData[0]?.title,
          taille: cvData[0]?.size + ' bytes',
          type: cvData[0]?.mimetype,
          url: cvData[0]?.url ? 'URL présente ✅' : 'URL manquante ❌'
        })
      } catch (e) {
        console.log('  - CV brut:', retrievedProject.document_cv)
      }
    }
    
    // Vérifier les technologies et équipe
    if (retrievedProject.technologies) {
      try {
        const tech = JSON.parse(retrievedProject.technologies)
        console.log('  - Technologies:', tech)
      } catch (e) {
        console.log('  - Technologies brut:', retrievedProject.technologies)
      }
    }
    
    if (retrievedProject.team_members) {
      try {
        const team = JSON.parse(retrievedProject.team_members)
        console.log('  - Équipe:', team.length + ' membres')
      } catch (e) {
        console.log('  - Équipe brut:', retrievedProject.team_members)
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
