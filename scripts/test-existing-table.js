
const { Api } = require('nocodb-sdk')
require('dotenv').config({ path: '.env.local' })

const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_NOCODB_URL,
  headers: {
    'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN
  }
})

async function testTable() {
  try {
    console.log('🔍 Test de la table democracy_projects...')
    console.log('🌐 URL:', process.env.NEXT_PUBLIC_NOCODB_URL)
    console.log('📋 Base ID:', process.env.NEXT_PUBLIC_NOCODB_BASE_ID)
    
    // Test de lecture des données existantes
    const response = await api.dbTableRow.list(
      'noco',
      process.env.NEXT_PUBLIC_NOCODB_BASE_ID,
      'democracy_projects'
    )
    
    console.log('✅ Connexion réussie!')
    console.log('📄 Nombre d\'enregistrements:', response.list?.length || 0)
    
    if (response.list && response.list.length > 0) {
      console.log('📝 Premier enregistrement:', response.list[0])
    }
    
    // Test d'insertion d'un nouveau projet
    const testData = {
      vision: "Test d'intégration complète avec l'application",
      problem: "Vérification du fonctionnement end-to-end",
      domain: "tech",
      country: "sn",
      technologies: JSON.stringify(["test", "integration"]),
      impact_score: 75,
      status: "draft",
      language: "fr"
    }
    
    console.log('🧪 Test d\'insertion d\'un nouveau projet...')
    const created = await api.dbTableRow.create(
      'noco',
      process.env.NEXT_PUBLIC_NOCODB_BASE_ID,
      'democracy_projects',
      testData
    )
    
    console.log('✅ Nouveau projet créé! ID:', created.id)
    console.log('📊 Données insérées:', created)
    
    // Vérifier les projets soumis
    console.log('\n🔍 Vérification des projets soumis...')
    const submittedProjects = await api.dbTableRow.list(
      'noco',
      process.env.NEXT_PUBLIC_NOCODB_BASE_ID,
      'democracy_projects',
      {
        where: 'status=submitted'
      }
    )
    
    console.log('📊 Nombre de projets soumis:', submittedProjects.list?.length || 0)
    if (submittedProjects.list && submittedProjects.list.length > 0) {
      console.log('📝 Derniers projets soumis:')
      submittedProjects.list.slice(0, 3).forEach((project, index) => {
        console.log(`  ${index + 1}. ID: ${project.id}, Vision: ${project.vision?.substring(0, 50)}...`)
      })
    }

    console.log('🎉 Tous les tests sont réussis!')
    console.log('💡 Votre application peut maintenant sauvegarder les données!')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    if (error.response) {
      console.error('📄 Détails de l\'erreur:', error.response.data)
    }
  }
}

testTable()
