
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('📤 API Route: Upload de fichier...')
    
    const data = await request.formData()
    const file = data.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    console.log('📎 Fichier reçu:', { 
      name: file.name, 
      size: file.size, 
      type: file.type 
    })

    // Créer un nouveau FormData pour l'upload vers NocoDB
    const formData = new FormData()
    formData.append('file', file)

    // Variables d'environnement côté serveur
    const nocoUrl = process.env.NEXT_PUBLIC_NOCODB_URL
    const nocoToken = process.env.NEXT_PUBLIC_NOCODB_TOKEN

    if (!nocoUrl || !nocoToken) {
      console.error('❌ Variables d\'environnement manquantes')
      return NextResponse.json({ 
        error: 'Configuration NocoDB manquante' 
      }, { status: 500 })
    }

    console.log('🔗 Upload vers NocoDB:', `${nocoUrl}/api/v1/db/storage/upload`)

    // Upload vers NocoDB (même méthode que le script de test)
    const uploadResponse = await fetch(`${nocoUrl}/api/v1/db/storage/upload`, {
      method: 'POST',
      headers: {
        'xc-token': nocoToken,
      },
      body: formData
    })

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('❌ Erreur NocoDB:', errorText)
      return NextResponse.json({ 
        error: `Erreur NocoDB: ${uploadResponse.status} ${uploadResponse.statusText}`,
        details: errorText
      }, { status: uploadResponse.status })
    }

    const uploadResult = await uploadResponse.json()
    console.log('✅ Upload NocoDB réussi:', uploadResult)

    return NextResponse.json(uploadResult)
  } catch (error) {
    console.error('❌ Erreur API upload:', error)
    return NextResponse.json({ 
      error: 'Erreur serveur lors de l\'upload',
      details: error.message 
    }, { status: 500 })
  }
}
