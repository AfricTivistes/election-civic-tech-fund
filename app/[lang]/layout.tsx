import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Election Civic Tech Fund",
  description: "Digital Democracy Journey",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  )
}
