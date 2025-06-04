import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Election Civic Tech Fund - Digital Democracy Journey",
  description:
    "Transformez votre vision citoyenne en outil technologique au service de la démocratie en Afrique. 175 000€ pour 14 pays, ∞ possibilités.",
  keywords: ["démocratie", "technologie", "Afrique", "élections", "civic tech", "innovation", "citoyenneté"],
  authors: [{ name: "AfricTivites" }],
  creator: "AfricTivites",
  publisher: "Election Civic Tech Fund",
  robots: "index, follow",
  openGraph: {
    title: "Election Civic Tech Fund - Digital Democracy Journey",
    description: "Transformez votre vision citoyenne en outil technologique au service de la démocratie en Afrique",
    url: "https://election-civic-tech-fund.vercel.app",
    siteName: "Election Civic Tech Fund",
    images: [
      {
        url: "/logo-ectf.png",
        width: 1200,
        height: 630,
        alt: "Election Civic Tech Fund - Logo avec continent africain",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Election Civic Tech Fund - Digital Democracy Journey",
    description: "Transformez votre vision citoyenne en outil technologique au service de la démocratie en Afrique",
    images: ["/logo-ectf.png"],
    creator: "@AfricTivites",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.png", color: "#f59e0b" }],
  },
  manifest: "/site.webmanifest",
  themeColor: "#f59e0b",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
