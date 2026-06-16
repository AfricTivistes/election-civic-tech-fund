import { YouTubeEmbed } from "@/components/youtube-embed"
import Link from "next/link"

const videos = [
  {
    url: "https://youtube.com/shorts/r6wYiX1tXow",
    flag: "🇸🇸",
    organization: "Excellence Foundation",
    country: { fr: "Soudan du Sud", en: "South Sudan" },
    projectId: "1",
  },
  {
    url: "https://www.youtube.com/shorts/kYr5MLQ-MOk",
    flag: "🇸🇳",
    organization: "Vie Publique Sénégal",
    country: { fr: "Sénégal", en: "Senegal" },
    projectId: "4",
  },
  {
    url: "https://youtube.com/shorts/i0kWOA1_wSk",
    flag: "🇨🇲",
    organization: "ADE Cameroun",
    country: { fr: "Cameroun", en: "Cameroon" },
    projectId: "6",
  },
  {
    url: "https://youtube.com/shorts/qgRxHkI4Mz4",
    flag: "🇲🇷",
    organization: "ADRES",
    country: { fr: "Mauritanie", en: "Mauritania" },
    projectId: "7",
  },
  {
    url: "https://www.youtube.com/shorts/Ea-AGNPjfD4",
    flag: "🇪🇹",
    organization: "COND",
    country: { fr: "Éthiopie", en: "Ethiopia" },
    projectId: "9",
  },
]

interface BeneficiaryVideosProps {
  lang: string
}

export function BeneficiaryVideos({ lang }: BeneficiaryVideosProps) {
  const t = {
    fr: {
      title: "Bénéficiaires en action",
      subtitle: "Découvrez les projets financés par l'Election Civic Tech Fund",
      cta: "Voir le projet",
    },
    en: {
      title: "Beneficiaries in Action",
      subtitle: "Discover the projects funded by the Election Civic Tech Fund",
      cta: "View project",
    },
  }

  const text = t[lang as "fr" | "en"] ?? t.fr

  return (
    <section className="py-16 px-4 bg-slate-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-gray-300">{text.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {videos.map((v) => (
            <div key={v.projectId} className="flex flex-col items-center gap-3 w-[200px]">
              <YouTubeEmbed url={v.url} title={v.organization} className="w-full" />
              <div className="text-center">
                <div className="text-2xl mb-1">{v.flag}</div>
                <p className="text-white font-semibold text-sm">{v.organization}</p>
                <p className="text-gray-400 text-xs">
                  {lang === "fr" ? v.country.fr : v.country.en}
                </p>
                <Link
                  href={`/${lang}/projects/${v.projectId}`}
                  className="text-yellow-400 hover:text-yellow-300 text-xs font-medium mt-1 inline-block"
                >
                  {text.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
