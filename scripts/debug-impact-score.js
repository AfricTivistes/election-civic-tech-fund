
const { Api } = require('nocodb-sdk')
require('dotenv').config({ path: '.env.local' })

const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_NOCODB_URL,
  headers: {
    'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN
  }
})

async function debugImpactScore() {
  try {
    console.log('🔍 Vérification des impact_score dans la base...')
    
    const response = await api.dbTableRow.list(
      'noco',
      process.env.NEXT_PUBLIC_NOCODB_BASE_ID,
      'democracy_projects',
      {
        limit: 10,
        sort: ['-created_at']
      }
    )
    
    console.log('📊 Derniers projets avec impact_score:')
    response.list?.forEach((project, index) => {
      console.log(`${index + 1}. ID: ${project.id}`)
      console.log(`   - Impact Score: ${project.impact_score} (type: ${typeof project.impact_score})`)
      console.log(`   - Technologies: ${project.technologies}`)
      console.log(`   - Status: ${project.status}`)
      console.log('---')
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

debugImpactScore()
