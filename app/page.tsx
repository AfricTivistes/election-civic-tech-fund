"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Cette page ne devrait jamais être affichée car le middleware
    // redirige automatiquement vers la langue appropriée
    // Mais au cas où, on redirige vers l'anglais par défaut
    router.replace("/en")
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="text-white text-xl">Redirecting...</div>
    </div>
  )
}
