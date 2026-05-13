import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://electioncivictechfund.africtivistes.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Election Civic Tech Fund",
  description: "Soutenir l'innovation civique électorale dans 14 pays africains",
  openGraph: {
    siteName: "Election Civic Tech Fund",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}