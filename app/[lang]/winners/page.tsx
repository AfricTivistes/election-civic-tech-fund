
import WinnersShowcase from "@/components/winners-showcase"

interface WinnersPageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function WinnersPage({ params }: WinnersPageProps) {
  const { lang } = await params
  return <WinnersShowcase lang={lang} />
}
