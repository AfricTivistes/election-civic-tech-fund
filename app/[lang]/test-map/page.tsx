import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AfricaMapSimpleMaps } from '@/components/africa-map/solution1'
import { AfricaMapProfessional } from '@/components/africa-map/solution2'
import { AfricaMapCustom } from '@/components/africa-map/solution3'
import { projects } from '@/data/projects'
import { getProjectsByCountry } from '@/lib/projects'

interface TestMapPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: TestMapPageProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'fr' ? 'Test Carte Afrique' : 'Test Africa Map',
    description: lang === 'fr'
      ? 'Comparaison des 3 solutions de carte interactive'
      : 'Comparison of 3 interactive map solutions',
  }
}

export default async function TestMapPage({ params }: TestMapPageProps) {
  const { lang } = await params

  const countriesWithProjects = projects.map(p => p.countryCode)
  const uniqueCountries = Array.from(new Set(countriesWithProjects))
  
  const projectCounts: Record<string, number> = {}
  uniqueCountries.forEach(code => {
    projectCounts[code] = getProjectsByCountry(code).length
  })

  const currentLang = lang as 'fr' | 'en'

  const t = {
    fr: {
      title: 'Test Comparatif - Carte Interactive de l\'Afrique',
      subtitle: '3 solutions techniques pour afficher les projets par pays',
      description: 'Comparez les différentes approches implémentées et choisissez la plus adaptée à vos besoins.',
      solution1Title: 'Solution 1 : React-Simple-Maps',
      solution1Desc: 'Librairie React avec TopoJSON - Moderne et performant',
      solution2Title: 'Solution 2 : SVG Professionnel',
      solution2Desc: 'Carte vectorielle intégrée - Design professionnel',
      solution3Title: 'Solution 3 : SVG Personnalisé',
      solution3Desc: 'SVG natif avec contrôles complets',
      chooseText: 'Choisissez la solution qui convient le mieux',
      allProjects: 'Voir tous les projets',
      back: '← Retour à l\'accueil'
    },
    en: {
      title: 'Comparative Test - Interactive Africa Map',
      subtitle: '3 technical solutions to display projects by country',
      description: 'Compare the different implemented approaches and choose the best one for your needs.',
      solution1Title: 'Solution 1: React-Simple-Maps',
      solution1Desc: 'React Library with TopoJSON - Modern and performant',
      solution2Title: 'Solution 2: Professional SVG',
      solution2Desc: 'Integrated vector map - Professional design',
      solution3Title: 'Solution 3: Custom SVG',
      solution3Desc: 'Native SVG with full design control',
      chooseText: 'Choose the solution that works best for you',
      allProjects: 'View all projects',
      back: '← Back to home'
    }
  }

  const text = t[currentLang] || t.fr

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />

      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
                {text.title}
              </h1>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-4">
                {text.subtitle}
              </p>
              <p className="text-lg text-blue-300/80 max-w-3xl mx-auto">
                {text.description}
              </p>
              <p className="text-lg text-blue-200 mt-6">
                {text.chooseText}
              </p>
            </div>

            <div className="space-y-20">
              {/* Solution 1 */}
              <div>
                <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 border-2 border-blue-400/30 rounded-lg px-6 py-4 mb-8 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">{text.solution1Title}</h3>
                  <p className="text-blue-200">{text.solution1Desc}</p>
                </div>
                
                <AfricaMapSimpleMaps
                  projectCounts={projectCounts}
                  lang={lang}
                />
              </div>

              {/* Separator */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="text-white/50 text-sm font-medium">↓</span>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Solution 2 */}
              <div>
                <div className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 border-2 border-green-400/30 rounded-lg px-6 py-4 mb-8 text-center">
                  <h3 className="text-2xl font-bold text-green-400 mb-2">{text.solution2Title}</h3>
                  <p className="text-green-200">{text.solution2Desc}</p>
                </div>
                
                <AfricaMapProfessional
                  projectCounts={projectCounts}
                  lang={lang}
                />
              </div>

              {/* Separator */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="text-white/50 text-sm font-medium">↓</span>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Solution 3 */}
              <div>
                <div className="bg-gradient-to-br from-yellow-500/10 to-purple-500/10 border-2 border-purple-400/30 rounded-lg px-6 py-4 mb-8 text-center">
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">{text.solution3Title}</h3>
                  <p className="text-purple-200">{text.solution3Desc}</p>
                </div>
                
                <AfricaMapCustom
                  projectCounts={projectCounts}
                  lang={lang}
                />
              </div>
            </div>

            {/* Final CTAs */}
            <div className="flex justify-center gap-4 mt-20">
              <a
                href={`/${lang}/projects`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-lg transition-all text-lg"
              >
                {text.allProjects}
              </a>
              <a
                href={`/${lang}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold rounded-lg transition-all text-lg"
              >
                {text.back}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
