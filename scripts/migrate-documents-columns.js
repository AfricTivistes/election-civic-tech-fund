
const { Api } = require('nocodb-sdk')
require('dotenv').config({ path: '.env.local' })

const api = new Api({
  baseURL: process.env.NEXT_PUBLIC_NOCODB_URL,
  headers: {
    'xc-token': process.env.NEXT_PUBLIC_NOCODB_TOKEN
  }
})

async function migrateDocumentColumns() {
  try {
    console.log('🔄 Migration vers les colonnes d\'attachement...')
    
    const baseId = process.env.NEXT_PUBLIC_NOCODB_BASE_ID
    const tableName = 'democracy_projects'
    
    // Ajouter les nouvelles colonnes d'attachement
    const newColumns = [
      { column_name: 'document_cv', uidt: 'Attachment' },
      { column_name: 'document_portfolio', uidt: 'Attachment' },
      { column_name: 'document_budget', uidt: 'Attachment' },
      { column_name: 'document_presentation', uidt: 'Attachment' },
      { column_name: 'document_other', uidt: 'Attachment' }
    ]
    
    for (const column of newColumns) {
      try {
        await api.dbTableColumn.create(baseId, tableName, column)
        console.log(`✅ Colonne ajoutée: ${column.column_name}`)
      } catch (error) {
        if (error.message?.includes('already exists')) {
          console.log(`⚠️ Colonne ${column.column_name} existe déjà`)
        } else {
          console.error(`❌ Erreur pour ${column.column_name}:`, error.message)
        }
      }
    }
    
    console.log('🎉 Migration terminée!')
    console.log('💡 Vous pouvez maintenant uploader des fichiers directement dans NocoDB')
    
  } catch (error) {
    console.error('❌ Erreur de migration:', error)
  }
}

migrateDocumentColumns()
