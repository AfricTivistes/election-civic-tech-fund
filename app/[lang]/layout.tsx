import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: {
    template: "%s | Election Civic Tech Fund",
    default: "Election Civic Tech Fund",
  },
  description: "Fonds de soutien à 12 projets innovants de civic tech électorale dans 14 pays africains.",
  applicationName: "Election Civic Tech Fund",
  authors: [{ name: "AfricTivistes", url: "https://africtivistes.com" }],
  creator: "AfricTivistes",
  publisher: "Election Civic Tech Fund",
  robots: { index: true, follow: true },
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <>
      {children}
      <script dangerouslySetInnerHTML={{
        __html: `
          if (typeof document !== 'undefined') {
            document.documentElement.removeAttribute('data-google-analytics-opt-out');
            document.documentElement.lang = '${lang}';
          }
        `
      }} />
    </>
  )
}