import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://electioncivictechfund.africtivistes.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Election Civic Tech Fund",
    template: "%s | Election Civic Tech Fund",
  },
  description: "200 000€ pour 12 projets innovants de civic tech électorale dans 14 pays africains.",
  applicationName: "Election Civic Tech Fund",
  publisher: "Election Civic Tech Fund",
  openGraph: {
    siteName: "Election Civic Tech Fund",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Election Civic Tech Fund" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AfricTivistes",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo-ectf.png",
    apple: "/logo-ectf.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Election Civic Tech Fund",
        alternateName: "ECTF",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo-ectf.png`,
        },
        sameAs: ["https://africtivistes.com"],
        founder: { "@type": "Organization", name: "AfricTivistes" },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Election Civic Tech Fund",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: ["fr", "en"],
      },
    ],
  }

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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