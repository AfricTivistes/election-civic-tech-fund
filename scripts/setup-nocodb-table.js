
// Script pour configurer la table democracy_projects dans NocoDB
// À exécuter une seule fois pour initialiser la base

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
    { column_name: 'country', uidt: 'SingleLineText' },
    { column_name: 'language', uidt: 'SingleSelect', 
      dtxp: "'fr','en'", cdf: "'fr'" },
    { column_name: 'submission_date', uidt: 'DateTime' },
    { column_name: 'reviewer_notes', uidt: 'LongText' },
    { column_name: 'funding_amount', uidt: 'Number' }
  ]
}

// Exemple de données pour tests
const sampleData = {
  vision: "Améliorer la transparence électorale via la blockchain",
  problem: "Manque de confiance dans le processus électoral",
  domain: "tech",
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
  country: "France",
  language: "fr",
  status: "draft"
}

console.log('Schéma de table:', tableSchema)
console.log('Exemple de données:', sampleData)
