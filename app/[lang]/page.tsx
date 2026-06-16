import { Metadata } from "next"
import { ogImageUrl } from "@/lib/og"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { YoungInnovators } from "@/components/home/young-innovators"
import { InnovationShowcase } from "@/components/home/innovation-showcase"
import { AfricaMapSection } from "@/components/africa-map/africa-map-section"
import { Testimonials } from "@/components/home/testimonials"
import { StatsDashboard } from "@/components/home/stats-dashboard"
import { CTASection } from "@/components/home/cta-section"
import { BeneficiaryVideos } from "@/components/home/beneficiary-videos"
import { getUniqueCountries, getAllProjects } from "@/lib/projects"

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
      ? "200 000€ pour 12 projets innovants dans 14 pays africains. Découvrez comment la technologie citoyenne transforme les processus électoraux."
      : "€200,000 for 12 innovative projects across 14 African countries. Discover how civic technology is transforming electoral processes.",
    openGraph: {
      title: lang === "fr" 
        ? "Election Civic Tech Fund" 
        : "Election Civic Tech Fund",
      description: lang === "fr"
        ? "200 000€ pour 12 projets innovants dans 14 pays africains"
        : "€200,000 for 12 innovative projects across 14 African countries",
      type: "website",
      images: [{ url: ogImageUrl(
        lang === "fr" ? "Election Civic Tech Fund" : "Election Civic Tech Fund",
        lang === "fr" ? "200 000€ pour 12 projets innovants dans 14 pays africains" : "€200,000 for 12 innovative projects across 14 African countries",
        lang
      ), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl(
        lang === "fr" ? "Election Civic Tech Fund" : "Election Civic Tech Fund",
        lang === "fr" ? "200 000€ pour 12 projets innovants dans 14 pays africains" : "€200,000 for 12 innovative projects across 14 African countries",
        lang
      )],
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params

  const allProjects = getAllProjects()
  const projectCounts: Record<string, number> = {}
  allProjects.forEach(p => {
    projectCounts[p.countryCode] = (projectCounts[p.countryCode] || 0) + 1
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />
      
      <main>
        {/* Hero Section - Existing but improved */}
        <HeroSection lang={lang} />

        {/* Africa Map Section - NEW */}
        <AfricaMapSection lang={lang} projectCounts={projectCounts} />
        
        {/* Young Innovators Section - NEW */}
        <YoungInnovators />
        
        {/* Innovation Showcase Section - NEW */}
        <InnovationShowcase />
        
        {/* Beneficiary Videos Section */}
        <BeneficiaryVideos lang={lang} />

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
