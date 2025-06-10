
const { Api } = require('nocodb-sdk')

// Configuration NocoDB
const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_NOCODB_URL || 'http://localhost:8080',
  headers: {
    'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN || ''
  }
})

const baseId = process.env.NEXT_PUBLIC_NOCODB_BASE_ID || 'noco'

// Schéma de la table
const tableSchema = {
  table_name: 'democracy_projects',
  columns: [
    // Colonnes système
    { column_name: 'id', uidt: 'ID', pk: true },
    { column_name: 'created_at', uidt: 'DateTime', system: true },
    { column_name: 'updated_at', uidt: 'DateTime', system: true },
    
    // Données principales
    { column_name: 'status', uidt: 'SingleSelect', 
      dtxp: "'draft','submitted','under_review','approved','rejected'",
      cdf: "'draft'" },
    
    // Step 1 - Vision
    { column_name: 'vision', uidt: 'LongText' },
    { column_name: 'problem', uidt: 'LongText' },
    { column_name: 'domain', uidt: 'SingleSelect',
      dtxp: "'tech','engagement','media','legal'" },
    { column_name: 'country', uidt: 'SingleLineText' },
    
    // Step 2 - Technologies
    { column_name: 'technologies', uidt: 'LongText' }, // JSON stringifié
    { column_name: 'impact_score', uidt: 'Number', cdf: '0' },
    
    // Step 3 - Équipe
    { column_name: 'team_members', uidt: 'LongText' }, // JSON stringifié
    { column_name: 'team_size', uidt: 'Number', cdf: '0' },
    
    // Step 4 - Documents
    { column_name: 'uploaded_documents', uidt: 'LongText' }, // JSON stringifié
    { column_name: 'completion_score', uidt: 'Number', cdf: '0' },
    
    // Métadonnées
    { column_name: 'language', uidt: 'SingleSelect', 
      dtxp: "'fr','en'", cdf: "'fr'" },
    { column_name: 'submission_date', uidt: 'DateTime' },
    { column_name: 'reviewer_notes', uidt: 'LongText' },
    { column_name: 'funding_amount', uidt: 'Number' }
  ]
}

async function createTable() {
  try {
    console.log('🚀 Création de la table democracy_projects...')
    
    // Créer la table
    const table = await api.dbTable.create(baseId, tableSchema)
    console.log('✅ Table créée avec succès:', table.title)
    
    return table
  } catch (error) {
    if (error.message?.includes('already exists')) {
      console.log('⚠️ La table existe déjà')
      return null
    }
    console.error('❌ Erreur lors de la création:', error)
    throw error
  }
}

async function insertSampleData() {
  try {
    console.log('📝 Insertion des données d\'exemple...')
    
    const sampleData = {
      vision: "Améliorer la transparence électorale via la blockchain au Sénégal",
      problem: "Manque de confiance dans le processus électoral",
      domain: "tech",
      country: "sn",
      technologies: JSON.stringify(["blockchain", "mobile", "ai"]),
      impact_score: 85,
      team_members: JSON.stringify([
        {
          name: "Jean Dupont",
          role: "Chef de projet",
          skills: ["management", "blockchain"],
          experience: "5 ans en civic tech"
        }
      ]),
      team_size: 3,
      language: "fr",
      status: "draft"
    }
    
    const result = await api.dbTableRow.create(
      'noco',
      baseId,
      'democracy_projects',
      sampleData
    )
    
    console.log('✅ Données d\'exemple insérées:', result.id)
    return result
  } catch (error) {
    console.error('❌ Erreur insertion données:', error)
    throw error
  }
}

async function setupNocoDB() {
  try {
    console.log('🔧 Configuration de NocoDB pour Democracy Projects')
    console.log('📋 Base ID:', baseId)
    console.log('🌐 URL:', process.env.NEXT_PUBLIC_NOCODB_URL)
    
    // Créer la table
    await createTable()
    
    // Insérer des données d'exemple
    await insertSampleData()
    
    console.log('🎉 Configuration terminée avec succès!')
  } catch (error) {
    console.error('💥 Erreur de configuration:', error)
    process.exit(1)
  }
}

// Exécution du script
if (require.main === module) {
  setupNocoDB()
}

module.exports = { setupNocoDB, createTable, insertSampleData }
