import WinnersShowcase from "@/components/winners-showcase"
import { useLanguage } from "@/hooks/use-language"

interface WinnersPageProps {
  params: {
    lang: string
  }
}

export default function WinnersPage({ params }: WinnersPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <WinnersShowcase lang={params.lang} />

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 pt-8">
        <div className="container mx-auto px-4">
          {/* Bannière partenaires améliorée */}
          <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8 shadow-xl animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              {/* Mené par AHEAD Africa */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <span className="text-blue-200 text-lg font-medium block mb-3">
                  Mené par
                </span>
                <img
                  src="/partners/ahead-africa.webp"
                  alt="AHEAD Africa"
                  className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 filter brightness-110 mx-auto"
                  onError={() => {
                    console.error("Error loading AHEAD Africa logo")
                  }}
                />
              </div>

              {/* Séparateur décoratif */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              {/* Conçu et géré par AfricTivistes */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <span className="text-blue-200 text-lg font-medium block mb-3">
                  Conçu et géré par
                </span>
                <img
                  src="/logo-africtivites.svg"
                  alt="AfricTivistes"
                  className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 filter brightness-110 mx-auto"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(94%) sepia(6%) saturate(1044%) hue-rotate(183deg) brightness(106%) contrast(94%)",
                  }}
                  onError={() => {
                    console.error("Error loading AfricTivistes logo")
                  }}
                />
              </div>

              {/* Séparateur décoratif */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              {/* Propulsé par DDI */}
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <span className="text-blue-200 text-lg font-medium block mb-3">
                  Propulsé par
                </span>
                <img
                  src="/partners/ddi-logo.jpeg"
                  alt="Digital Democracy Initiative"
                  className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 filter brightness-110 mx-auto"
                  onError={() => {
                    console.error("Error loading DDI logo")
                  }}
                />
              </div>
            </div>

            {/* Message inspirant */}
            <div className="mt-6 text-center border-t border-white/10 pt-4">
              <p className="text-blue-200 text-sm font-medium leading-relaxed">
                Ensemble pour une démocratie numérique inclusive en Afrique
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-blue-200">
              © 2024 Election Civic Tech Fund - AfricTivistes
            </p>
            <p className="text-xs text-blue-300 mt-1">
              Ensemble, nous construisons l'avenir démocratique de l'Afrique
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}