import { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { YoungInnovators } from "@/components/home/young-innovators"
import { InnovationShowcase } from "@/components/home/innovation-showcase"
import { AfricaMapSection } from "@/components/africa-map/africa-map-section"
import { Testimonials } from "@/components/home/testimonials"
import { StatsDashboard } from "@/components/home/stats-dashboard"
import { CTASection } from "@/components/home/cta-section"

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params
  
  return {
    title: lang === "fr" 
      ? "Election Civic Tech Fund | Transformer la démocratie en Afrique" 
      : "Election Civic Tech Fund | Transforming Democracy in Africa",
    description: lang === "fr"
      ? "175 000€ pour 12 projets innovants dans 14 pays africains. Découvrez comment la technologie citoyenne transforme les processus électoraux."
      : "€175,000 for 12 innovative projects across 14 African countries. Discover how civic technology is transforming electoral processes.",
    openGraph: {
      title: lang === "fr" 
        ? "Election Civic Tech Fund" 
        : "Election Civic Tech Fund",
      description: lang === "fr"
        ? "175 000€ pour 12 projets innovants dans 14 pays africains"
        : "€175,000 for 12 innovative projects across 14 African countries",
      type: "website",
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />
      
      <main>
        {/* Hero Section - Existing but improved */}
        <HeroSection lang={lang} />
        
        {/* Young Innovators Section - NEW */}
        <YoungInnovators />
        
        {/* Innovation Showcase Section - NEW */}
        <InnovationShowcase />
        
        {/* Africa Map Section - NEW */}
        <AfricaMapSection lang={lang} />
        
        {/* Testimonials Section - NEW */}
        <Testimonials />
        
        {/* Stats Dashboard Section - NEW */}
        <StatsDashboard />
        
        {/* CTA Section - NEW */}
        <CTASection lang={lang} />
      </main>
      
      <Footer lang={lang} />
    </div>
  )
}
