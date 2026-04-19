const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://electioncivictechfund.africtivistes.com"

export function ogImageUrl(title: string, description: string, lang: string): string {
  const params = new URLSearchParams({ title, description, lang })
  return `${BASE_URL}/api/og?${params.toString()}`
}
