import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShieldAlert, Eye, Users, BookOpen, ShieldCheck } from "lucide-react"

interface AboutPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "fr" ? "À propos | Election Civic Tech Fund" : "About | Election Civic Tech Fund",
    description: lang === "fr"
      ? "Découvrez l'Election Civic Tech Fund, une initiative panafricaine soutenant 12 projets innovants"
      : "Discover the Election Civic Tech Fund, a pan-African initiative supporting 12 innovative projects",
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params

  const t = {
    fr: {
      title: "À propos du Fonds",
      subtitle: "Soutenir l'innovation citoyenne pour des élections transparentes et inclusives en Afrique",
      aboutTitle: "Le Projet",
      aboutText: `L'Election Civic Tech Fund est une initiative panafricaine lancée pour renforcer les processus électoraux à travers l'innovation technologique citoyenne.

      Avec un budget de 200 000€, le Fonds soutient 12 projets innovants dans 14 pays africains, avec un focus particulier sur la jeunesse et la technologie.`,
      objectivesTitle: "Objectifs",
      objectives: [
        {
          title: "Lutter contre la désinformation électorale",
          icon: ShieldAlert,
          color: "from-red-500 to-orange-500",
        },
        {
          title: "Renforcer la transparence des processus de vote",
          icon: Eye,
          color: "from-blue-500 to-cyan-500",
        },
        {
          title: "Favoriser la participation citoyenne des jeunes",
          icon: Users,
          color: "from-emerald-500 to-green-500",
        },
        {
          title: "Améliorer l'accès à l'information électorale",
          icon: BookOpen,
          color: "from-yellow-500 to-orange-500",
        },
        {
          title: "Promouvoir l'observation électorale citoyenne",
          icon: ShieldCheck,
          color: "from-purple-500 to-pink-500",
        },
      ],
      ledBy: "Mené par",
      designedBy: "Conçu et géré par",
      poweredBy: "Propulsé par",
      budget: "Budget total",
      projects: "Projets",
      countries: "Pays",
      timeline: "Calendrier",
      months: "Mois",
    },
    en: {
      title: "About the Fund",
      subtitle: "Supporting citizen innovation for transparent and inclusive elections in Africa",
      aboutTitle: "The Project",
      aboutText: `The Election Civic Tech Fund is a pan-African initiative launched to strengthen electoral processes through citizen-driven technological innovation.

      With a budget of €200,000, the Fund supports 12 innovative projects across 14 African countries, with a particular focus on youth and technology.`,
      objectivesTitle: "Objectives",
      objectives: [
        {
          title: "Combat electoral disinformation",
          icon: ShieldAlert,
          color: "from-red-500 to-orange-500",
        },
        {
          title: "Strengthen voting process transparency",
          icon: Eye,
          color: "from-blue-500 to-cyan-500",
        },
        {
          title: "Foster youth civic participation",
          icon: Users,
          color: "from-emerald-500 to-green-500",
        },
        {
          title: "Improve access to electoral information",
          icon: BookOpen,
          color: "from-yellow-500 to-orange-500",
        },
        {
          title: "Promote citizen electoral observation",
          icon: ShieldCheck,
          color: "from-purple-500 to-pink-500",
        },
      ],
      ledBy: "Led by",
      designedBy: "Designed and managed by",
      poweredBy: "Powered by",
      budget: "Total Budget",
      projects: "Projects",
      countries: "Countries",
      timeline: "Timeline",
      months: "Months",
    },
  }

  const text = t[lang as "fr" | "en"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />

      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
                {text.title}
              </h1>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                {text.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">200K€</div>
                  <div className="text-white">{text.budget}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">12</div>
                  <div className="text-white">{text.projects}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">14</div>
                  <div className="text-white">{text.countries}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">10</div>
                  <div className="text-white">{text.months} Mois</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <img
                      src="/partners/ahead-africa.webp"
                      alt="AHEAD Africa"
                      className="h-16 w-auto mx-auto"
                    />
                  </div>
                  <Badge className="bg-yellow-500 text-black mb-4">{text.ledBy}</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">AHEAD Africa</h3>
                  <p className="text-blue-200 text-sm">
                    African Hub for Evidence and Development
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <img
                      src="/logo-africtivites.svg"
                      alt="AfricTivistes"
                      className="h-16 w-auto mx-auto"
                      style={{
                        filter: "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
                      }}
                    />
                  </div>
                  <Badge className="bg-blue-500 text-white mb-4">{text.designedBy}</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">AfricTivistes</h3>
                  <p className="text-blue-200 text-sm">
                    Ligue des Blogueurs et Cyber-Activistes pour la Démocratie en Afrique
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <img
                      src="/partners/ddi-logo.png"
                      alt="Digital Democracy Initiative"
                      className="h-16 w-auto mx-auto"
                    />
                  </div>
                  <Badge className="bg-green-500 text-black mb-4">{text.poweredBy}</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">DDI</h3>
                  <p className="text-blue-200 text-sm">
                    Digital Democracy Initiative
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8 mb-16">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">{text.aboutTitle}</h2>
                <p className="text-blue-200 text-lg leading-relaxed">
                  {text.aboutText}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">{text.objectivesTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {text.objectives.map((objective, index) => {
                    const Icon = objective.icon
                    return (
                      <Card
                        key={index}
                        className="bg-white/10 backdrop-blur-md border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
                      >
                        <CardContent className="p-6 text-center">
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${objective.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white leading-snug">
                            {objective.title}
                          </h3>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
