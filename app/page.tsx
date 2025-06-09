"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Cette page ne devrait jamais être affichée car le middleware
    // redirige automatiquement vers la langue appropriée
    // Mais au cas où, on redirige vers l'anglais par défaut
    router.replace("/en")
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="text-white text-xl">Redirecting...</div>
    </div>
  )
}
```

```typescript
"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, FileText, Award, Zap, Star, Home, Clock, HelpCircle } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StepOne from "@/components/step-one"
import StepTwo from "@/components/step-two"
import StepThree from "@/components/step-three"
import StepFour from "@/components/step-four"
import ProgressTracker from "@/components/progress-tracker"
import FormGuide from "@/components/form-guide"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"
import { useIsMobile } from "@/hooks/use-mobile"

const badges = ["Badge 1", "Badge 2", "Badge 3"]

export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const { t, isLoading } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <div className="relative">
      <HeroSection />

      {/* Step section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.howItWorks?.title || "Comment ça marche ?"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepOne />
            <StepTwo />
            <StepThree />
            <StepFour />
          </div>
        </div>
      </section>

      {/* Progress tracker section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.progressTracker?.title || "Suivez votre progression"}</h2>
          <ProgressTracker />
        </div>
      </section>

      {/* Form guide section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">{t?.formGuide?.title || "Guide de formulaire"}</h2>
            <Button onClick={() => setIsGuideOpen(!isGuideOpen)}>{isGuideOpen ? "Fermer" : "Ouvrir"}</Button>
          </div>
          {isGuideOpen && <FormGuide />}
        </div>
      </section>

      {/* Badges sidebar - Hidden on mobile */}
      {Array.isArray(badges) && badges.length > 0 && !isMobile && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white flex items-center">
                <Award className="w-4 h-4 mr-2" />
                {t?.achievements?.title || "Réalisations"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {badges.map(
                (badge, index) =>
                  badge && (
                    <div key={`badge-${index}`} className="transition-all duration-300">
                      <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    </div>
                  ),
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
```

```
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, FileText, Award, Zap, Star, Home, Clock, HelpCircle } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StepOne from "@/components/step-one"
import StepTwo from "@/components/step-two"
import StepThree from "@/components/step-three"
import StepFour from "@/components/step-four"
import ProgressTracker from "@/components/progress-tracker"
import FormGuide from "@/components/form-guide"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"
import { useIsMobile } from "@/hooks/use-mobile"

const badges = ["Badge 1", "Badge 2", "Badge 3"]

export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const { t, isLoading } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <div className="relative">
      <HeroSection />

      {/* Step section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.howItWorks?.title || "Comment ça marche ?"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepOne />
            <StepTwo />
            <StepThree />
            <StepFour />
          </div>
        </div>
      </section>

      {/* Progress tracker section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.progressTracker?.title || "Suivez votre progression"}</h2>
          <ProgressTracker />
        </div>
      </section>

      {/* Form guide section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">{t?.formGuide?.title || "Guide de formulaire"}</h2>
            <Button onClick={() => setIsGuideOpen(!isGuideOpen)}>{isGuideOpen ? "Fermer" : "Ouvrir"}</Button>
          </div>
          {isGuideOpen && <FormGuide />}
        </div>
      </section>

      {/* Badges sidebar - Hidden on mobile */}
      {Array.isArray(badges) && badges.length > 0 && !isMobile && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white flex items-center">
                <Award className="w-4 h-4 mr-2" />
                {t?.achievements?.title || "Réalisations"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {badges.map(
                (badge, index) =>
                  badge && (
                    <div key={`badge-${index}`} className="transition-all duration-300">
                      <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    </div>
                  ),
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
```

```typescript
"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, FileText, Award, Zap, Star, Home, Clock, HelpCircle } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StepOne from "@/components/step-one"
import StepTwo from "@/components/step-two"
import StepThree from "@/components/step-three"
import StepFour from "@/components/step-four"
import ProgressTracker from "@/components/progress-tracker"
import FormGuide from "@/components/form-guide"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"
import { useIsMobile } from "@/hooks/use-mobile"

const badges = ["Badge 1", "Badge 2", "Badge 3"]

export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const { t, isLoading } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <div className="relative">
      <HeroSection />

      {/* Step section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.howItWorks?.title || "Comment ça marche ?"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepOne />
            <StepTwo />
            <StepThree />
            <StepFour />
          </div>
        </div>
      </section>

      {/* Progress tracker section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.progressTracker?.title || "Suivez votre progression"}</h2>
          <ProgressTracker />
        </div>
      </section>

      {/* Form guide section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">{t?.formGuide?.title || "Guide de formulaire"}</h2>
            <Button onClick={() => setIsGuideOpen(!isGuideOpen)}>{isGuideOpen ? "Fermer" : "Ouvrir"}</Button>
          </div>
          {isGuideOpen && <FormGuide />}
        </div>
      </section>

      {/* Badges sidebar - Hidden on mobile */}
      {Array.isArray(badges) && badges.length > 0 && !isMobile && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white flex items-center">
                <Award className="w-4 h-4 mr-2" />
                {t?.achievements?.title || "Réalisations"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {badges.map(
                (badge, index) =>
                  badge && (
                    <div key={`badge-${index}`} className="transition-all duration-300">
                      <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    </div>
                  ),
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
```

```typescript
"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, FileText, Award, Zap, Star, Home, Clock, HelpCircle } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StepOne from "@/components/step-one"
import StepTwo from "@/components/step-two"
import StepThree from "@/components/step-three"
import StepFour from "@/components/step-four"
import ProgressTracker from "@/components/progress-tracker"
import FormGuide from "@/components/form-guide"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"
import { useIsMobile } from "@/hooks/use-mobile"

const badges = ["Badge 1", "Badge 2", "Badge 3"]

export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const { t, isLoading } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <div className="relative">
      <HeroSection />

      {/* Step section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.howItWorks?.title || "Comment ça marche ?"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepOne />
            <StepTwo />
            <StepThree />
            <StepFour />
          </div>
        </div>
      </section>

      {/* Progress tracker section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.progressTracker?.title || "Suivez votre progression"}</h2>
          <ProgressTracker />
        </div>
      </section>

      {/* Form guide section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">{t?.formGuide?.title || "Guide de formulaire"}</h2>
            <Button onClick={() => setIsGuideOpen(!isGuideOpen)}>{isGuideOpen ? "Fermer" : "Ouvrir"}</Button>
          </div>
          {isGuideOpen && <FormGuide />}
        </div>
      </section>

      {/* Badges sidebar - Hidden on mobile */}
      {Array.isArray(badges) && badges.length > 0 && !isMobile && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white flex items-center">
                <Award className="w-4 h-4 mr-2" />
                {t?.achievements?.title || "Réalisations"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {badges.map(
                (badge, index) =>
                  badge && (
                    <div key={`badge-${index}`} className="transition-all duration-300">
                      <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    </div>
                  ),
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
```

```typescript
"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, FileText, Award, Zap, Star, Home, Clock, HelpCircle } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StepOne from "@/components/step-one"
import StepTwo from "@/components/step-two"
import StepThree from "@/components/step-three"
import StepFour from "@/components/step-four"
import ProgressTracker from "@/components/progress-tracker"
import FormGuide from "@/components/form-guide"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"
import { useIsMobile } from "@/hooks/use-mobile"

const badges = ["Badge 1", "Badge 2", "Badge 3"]

export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const { t, isLoading } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <div className="relative">
      <HeroSection />

      {/* Step section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.howItWorks?.title || "Comment ça marche ?"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepOne />
            <StepTwo />
            <StepThree />
            <StepFour />
          </div>
        </div>
      </section>

      {/* Progress tracker section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.progressTracker?.title || "Suivez votre progression"}</h2>
          <ProgressTracker />
        </div>
      </section>

      {/* Form guide section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">{t?.formGuide?.title || "Guide de formulaire"}</h2>
            <Button onClick={() => setIsGuideOpen(!isGuideOpen)}>{isGuideOpen ? "Fermer" : "Ouvrir"}</Button>
          </div>
          {isGuideOpen && <FormGuide />}
        </div>
      </section>

      {/* Badges sidebar - Hidden on mobile */}
      {Array.isArray(badges) && badges.length > 0 && !isMobile && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white flex items-center">
                <Award className="w-4 h-4 mr-2" />
                {t?.achievements?.title || "Réalisations"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {badges.map(
                (badge, index) =>
                  badge && (
                    <div key={`badge-${index}`} className="transition-all duration-300">
                      <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    </div>
                  ),
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
```

Analysis: The requested changes involve importing the `useIsMobile` hook and conditionally rendering the badges sidebar based on the value returned by this hook. The changes have been applied correctly by adding the import statement and updating the conditional rendering logic for the badges sidebar.

```typescript
"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, FileText, Award, Zap, Star, Home, Clock, HelpCircle } from "lucide-react"
import HeroSection from "@/components/hero-section"
import StepOne from "@/components/step-one"
import StepTwo from "@/components/step-two"
import StepThree from "@/components/step-three"
import StepFour from "@/components/step-four"
import ProgressTracker from "@/components/progress-tracker"
import FormGuide from "@/components/form-guide"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "@/components/language-switcher"
import { useIsMobile } from "@/hooks/use-mobile"

const badges = ["Badge 1", "Badge 2", "Badge 3"]

export default function Home() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const { t, isLoading } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <div className="relative">
      <HeroSection />

      {/* Step section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.howItWorks?.title || "Comment ça marche ?"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepOne />
            <StepTwo />
            <StepThree />
            <StepFour />
          </div>
        </div>
      </section>

      {/* Progress tracker section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">{t?.progressTracker?.title || "Suivez votre progression"}</h2>
          <ProgressTracker />
        </div>
      </section>

      {/* Form guide section */}
      <section className="mt-20 md:mt-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">{t?.formGuide?.title || "Guide de formulaire"}</h2>
            <Button onClick={() => setIsGuideOpen(!isGuideOpen)}>{isGuideOpen ? "Fermer" : "Ouvrir"}</Button>
          </div>
          {isGuideOpen && <FormGuide />}
        </div>
      </section>

      {/* Badges sidebar - Hidden on mobile */}
      {Array.isArray(badges) && badges.length > 0 && !isMobile && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white flex items-center">
                <Award className="w-4 h-4 mr-2" />
                {t?.achievements?.title || "Réalisations"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {badges.map(
                (badge, index) =>
                  badge && (
                    <div key={`badge-${index}`} className="transition-all duration-300">
                      <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    </div>
                  ),
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}