import { redirect } from "next/navigation"

interface WinnersPageProps {
  params: Promise<{ lang: string }>
}

export default async function WinnersPage({ params }: WinnersPageProps) {
  const { lang } = await params
  redirect(`/${lang}/projects`)
}
