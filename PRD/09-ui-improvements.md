# PRD 09 - Améliorations visuelles

## Objectif

Implémenter les améliorations visuelles demandées et ajouter des éléments enrichissant l'expérience utilisateur tout en conservant l'identité graphique existante.

## Améliorations prioritaires

### 1. Logo DDI avec fond transparent

**Problème actuel :**
Le logo DDI (`/partners/ddi-logo.jpeg`) a un fond non transparent qui détonne dans le footer.

**Solution :**

Option A : Demander le logo PNG/SVG transparent à DDI

Option B : Retoucher le logo existant
```bash
# Avec ImageMagick
convert ddi-logo.jpeg -fuzz 10% -transparent white ddi-logo.png
```

Option C : Utiliser CSS pour masquer le fond (solution temporaire)
```css
.ddi-logo {
  mix-blend-mode: multiply;
  background: transparent;
}
```

**Fichiers à modifier :**
- `app/[lang]/page.tsx` (footer)
- `app/[lang]/winners/page.tsx` → `app/[lang]/projects/page.tsx`
- `components/layout/footer.tsx` (nouveau)

**Changement :**
```diff
- src="/partners/ddi-logo.jpeg"
+ src="/partners/ddi-logo.png"
```

### 2. Compteurs animés

**Composant : `components/home/animated-counter.tsx`**

```typescript
"use client"

import { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number // en ms
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '' 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [isVisible])
  
  useEffect(() => {
    if (!isVisible) return
    
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setCount(Math.floor(easeOut * end))
      
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    
    requestAnimationFrame(step)
  }, [isVisible, end, duration])
  
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
```

**Usage :**
```tsx
<AnimatedCounter end={200} suffix="K€" />
<AnimatedCounter end={12} />
<AnimatedCounter end={14} />
```

### 3. Section Témoignages

**Composant : `components/home/testimonials.tsx`**

```typescript
"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  quote: { fr: string; en: string }
  author: string
  role: string
  organization: string
  country: string
  countryFlag: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: {
      fr: "Le soutien du Fonds nous permet de développer des outils innovants pour lutter contre la désinformation électorale et renforcer la confiance des citoyens.",
      en: "The Fund's support enables us to develop innovative tools to combat electoral disinformation and strengthen citizen trust."
    },
    author: "Représentant",
    role: "Coordinateur de projet",
    organization: "Excellence Foundation for South Sudan",
    country: "Soudan du Sud",
    countryFlag: "🇸🇸"
  },
  {
    id: "2",
    quote: {
      fr: "Grâce à ce financement, nous pouvons former des jeunes journalistes à la vérification des faits et créer une communauté de vérificateurs engagés.",
      en: "Thanks to this funding, we can train young journalists in fact-checking and create a community of engaged fact-checkers."
    },
    author: "Représentant",
    role: "Directeur",
    organization: "Association des Blogueurs du Bénin",
    country: "Bénin",
    countryFlag: "🇧🇯"
  },
  {
    id: "3",
    quote: {
      fr: "L'Election Civic Tech Fund nous offre l'opportunité de déployer notre plateforme d'IA pour la vérification des faits à l'échelle nationale.",
      en: "The Election Civic Tech Fund gives us the opportunity to deploy our AI fact-checking platform at a national scale."
    },
    author: "Représentant",
    role: "Fondateur",
    organization: "Brain Builders Youth Development Initiative",
    country: "Cameroun",
    countryFlag: "🇨🇲"
  }
]

interface TestimonialsProps {
  lang: string
}

export function Testimonials({ lang }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  
  const testimonial = testimonials[currentIndex]
  
  return (
    <div className="relative">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <Quote className="w-12 h-12 text-yellow-400/50 mb-4" />
          
          <blockquote className="text-xl text-white italic mb-6">
            "{testimonial.quote[lang as 'fr' | 'en']}"
          </blockquote>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl mr-4">
              {testimonial.countryFlag}
            </div>
            <div>
              <div className="font-semibold text-white">
                {testimonial.author}
              </div>
              <div className="text-blue-200 text-sm">
                {testimonial.role}, {testimonial.organization}
              </div>
              <div className="text-blue-300 text-sm">
                {testimonial.countryFlag} {testimonial.country}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation */}
      <div className="flex justify-center mt-4 space-x-4">
        <button 
          onClick={prev}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        {/* Dots */}
        <div className="flex items-center space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-yellow-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={next}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
```

### 4. Galerie média

**Composant : `components/shared/media-gallery.tsx`**

```typescript
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  src: string
  thumbnail: string
  caption: { fr: string; en: string }
  projectId?: string
}

interface MediaGalleryProps {
  items: MediaItem[]
  lang: string
}

export function MediaGallery({ items, lang }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  
  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)
  const next = () => setSelectedIndex((i) => i !== null ? (i + 1) % items.length : null)
  const prev = () => setSelectedIndex((i) => i !== null ? (i - 1 + items.length) % items.length : null)
  
  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => openLightbox(index)}
            className="relative aspect-video rounded-lg overflow-hidden group"
          >
            <Image
              src={item.thumbnail}
              alt={item.caption[lang as 'fr' | 'en']}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          </button>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={prev}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <div className="max-w-4xl max-h-[80vh] relative">
            <Image
              src={items[selectedIndex].src}
              alt={items[selectedIndex].caption[lang as 'fr' | 'en']}
              width={1200}
              height={800}
              className="object-contain"
            />
            <p className="text-white text-center mt-4">
              {items[selectedIndex].caption[lang as 'fr' | 'en']}
            </p>
          </div>
          
          <button
            onClick={next}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  )
}
```

### 5. Améliorations des cards projets

**Effets au hover :**

```css
/* Dans globals.css */
.project-card {
  @apply transition-all duration-300;
}

.project-card:hover {
  @apply transform -translate-y-2;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.project-card:hover .project-image {
  @apply scale-105;
}
```

### 6. Animations d'entrée

**Utiliser Framer Motion pour les animations au scroll :**

```typescript
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Usage
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeInUp}>
      {/* contenu */}
    </motion.div>
  ))}
</motion.div>
```

### 7. Skeleton loaders

**Composant : `components/ui/skeleton.tsx`**

```typescript
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-white/10',
        className
      )}
    />
  )
}

// Usage pour card projet
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden">
      <Skeleton className="aspect-video" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}
```

### 8. Mode sombre / clair (optionnel)

Le site est actuellement en mode sombre. Si besoin d'un mode clair :

```typescript
// hooks/use-theme.ts
import { create } from 'zustand'

interface ThemeStore {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  }))
}))
```

## Améliorations CSS globales

### Nouvelles animations (`app/globals.css`)

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from { 
    opacity: 0;
    transform: translateX(-20px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from { 
    opacity: 0;
    transform: translateX(20px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4); }
  50% { box-shadow: 0 0 20px 10px rgba(250, 204, 21, 0.2); }
}

.animate-fade-in { animation: fade-in 0.5s ease-out; }
.animate-slide-up { animation: slide-up 0.5s ease-out; }
.animate-slide-in-left { animation: slide-in-left 0.5s ease-out; }
.animate-slide-in-right { animation: slide-in-right 0.5s ease-out; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
```

## Checklist des améliorations

### Priorité haute
- [ ] Remplacer logo DDI par version transparente
- [ ] Implémenter compteurs animés sur la page d'accueil
- [ ] Ajouter barre de progression sur les cards projets

### Priorité moyenne
- [ ] Ajouter section témoignages
- [ ] Améliorer animations des cards (hover effects)
- [ ] Ajouter skeleton loaders

### Priorité basse (nice to have)
- [ ] Galerie média
- [ ] Mode clair (optionnel)
- [ ] Export PDF des fiches projets

## Critères d'acceptation

- [ ] Le logo DDI a un fond transparent
- [ ] Les compteurs s'animent au scroll (de 0 à valeur finale)
- [ ] Les témoignages sont affichés avec carrousel
- [ ] Les cards projets ont des effets hover fluides
- [ ] Les animations d'entrée sont présentes sur les sections
- [ ] Les skeleton loaders apparaissent pendant le chargement
- [ ] Toutes les animations sont fluides (60fps)
- [ ] Les animations respectent `prefers-reduced-motion`

## Note accessibilité

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
