import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isFr = lang === "fr"
  return {
    title: isFr
      ? "Nous contacter | Election Civic Tech Fund"
      : "Contact Us | Election Civic Tech Fund",
    description: isFr
      ? "Une question sur le Fonds Election Civic Tech ? Contactez l'équipe AfricTivistes."
      : "Have a question about the Election Civic Tech Fund? Contact the AfricTivistes team.",
    openGraph: {
      title: isFr
        ? "Nous contacter | Election Civic Tech Fund"
        : "Contact Us | Election Civic Tech Fund",
      description: isFr
        ? "Une question sur le Fonds Election Civic Tech ? Contactez l'équipe AfricTivistes."
        : "Have a question about the Election Civic Tech Fund? Contact the AfricTivistes team.",
    },
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
