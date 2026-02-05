import Link from "next/link"

interface FooterProps {
  lang: string
}

const currentYear = new Date().getFullYear()

export function Footer({ lang }: FooterProps) {
  const t = {
    fr: {
      ledBy: "Mené par",
      designedBy: "Conçu et géré par",
      poweredBy: "Propulsé par",
      tagline: "Construire l'avenir démocratique de l'Afrique",
      copyright: `© ${currentYear} Election Civic Tech Fund - AfricTivistes`,
      quickLinks: "Liens rapides",
      projects: "Projets",
      about: "À propos",
      news: "Actualités",
      contact: "Contact",
    },
    en: {
      ledBy: "Led by",
      designedBy: "Designed and managed by",
      poweredBy: "Powered by",
      tagline: "Building Africa's democratic future",
      copyright: `© ${currentYear} Election Civic Tech Fund - AfricTivistes`,
      quickLinks: "Quick links",
      projects: "Projects",
      about: "About",
      news: "News",
      contact: "Contact",
    },
  }

  const text = t[lang as "fr" | "en"] || t.fr

  return (
    <footer className="bg-white/10 border-t border-white/20 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="/Logo Fonds Election Civic Tech Fund.svg"
                alt="Election Civic Tech Fund"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-blue-200 text-sm mb-4">
              {text.tagline}
            </p>
            <p className="text-sm text-blue-300">
              {text.copyright}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{text.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/projects`} className="text-blue-200 hover:text-yellow-400 text-sm">
                  {text.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-blue-200 hover:text-yellow-400 text-sm">
                  {text.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/news`} className="text-blue-200 hover:text-yellow-400 text-sm">
                  {text.news}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-blue-200 hover:text-yellow-400 text-sm">
                  {text.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{text.designedBy}</h4>
            <div className="flex items-center space-x-2 mb-2">
              <img
                src="/logo-africtivites.svg"
                alt="AfricTivistes"
                className="h-8 w-auto"
                style={{
                  filter: "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
                }}
              />
            </div>
            <p className="text-blue-200 text-sm">
              Ligue des Blogueurs et Cyber-Activistes pour la Démocratie en Afrique
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <span className="text-blue-200 text-sm block">{text.ledBy}</span>
                <img
                  src="/partners/ahead-africa.webp"
                  alt="AHEAD Africa"
                  className="h-8 w-auto mt-1"
                />
              </div>

              <div className="hidden md:block w-px h-12 bg-white/20" />

              <div className="text-center">
                <span className="text-blue-200 text-sm block">{text.poweredBy}</span>
                <img
                  src="/partners/ddi-logo.png"
                  alt="Digital Democracy Initiative"
                  className="h-8 w-auto mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
