
import WinnersShowcase from "@/components/winners-showcase"

interface WinnersPageProps {
  params: {
    lang: string
  }
}

export default function WinnersPage({ params }: WinnersPageProps) {
  return <WinnersShowcase lang={params.lang} />
}
