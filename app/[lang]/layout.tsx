import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Election Civic Tech Fund",
  description: "Digital Democracy Journey",
  generator: "v0.dev",
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
          }
        `
      }} />
    </>
  )
}