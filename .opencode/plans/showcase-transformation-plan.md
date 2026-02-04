# Plan d'Amélioration - Election Civic Tech Fund

## 📊 Résumé Exécutif

**Objectif**: Transformer le site de soumission de projets en site vitrine pour présenter les 12 bénéficiaires du Fund.

**Version actuelle**: Next.js 16, TypeScript, Tailwind CSS, Shadcn/ui
**Nouvelle branche**: `feature/showcase-transformation`

---

## Phase 1: Nouvelle structure de données

### 1.1 Créer les types TypeScript
**Fichier**: `types/project.ts`

```typescript
export interface Project {
  id: string
  slug: string
  projectName: { fr: string; en: string }
  organization: string
  country: { fr: string; en: string }
  countryCode: string
  countryFlag: string
  category: "major" | "micro"
  budget: number  // 15000 ou 5000
  domain: { fr: string; en: string }
  description: { fr: string; en: string }
  impact: { fr: string; en: string }
  technologies: { fr: string[]; en: string[] }
  website?: string
  projectImage: string
  startDate: string
  endDate: string
  duration: number
  progress: number
  status: "not_started" | "in_progress" | "completed"
  featured?: boolean
  order?: number
}
```

### 1.2 Créer `data/projects.ts`
Migrer depuis `components/winners-showcase.tsx`:
- Ajouter: budget, dates, progress, duration, status, featured
- Supprimer: contact field (protection données)

### 1.3 Créer `lib/projects.ts`
Fonctions: getAllProjects, getProjectById, getFeaturedProjects, getSimilarProjects, getProjectStats, getUniqueCountries, getUniqueTechnologies

---

## Phase 2: Système Markdown pour actualités

### 2.1 Installer dépendances
```bash
npm install gray-matter remark remark-html
```

### 2.2 Créer `lib/markdown.ts`
parseMarkdownFile<T>(), getAllMarkdownFiles(directory, lang)

### 2.3 Créer `lib/news.ts`
getAllNews(), getNewsBySlug(), getRecentNews(), getNewsByProject()

### 2.4 Dossiers contenu
```
content/news/fr/ et en/
```

---

## Phase 3: Nouvelles pages

```
app/[lang]/
├── page.tsx          (MOF: nouvelle accueil vitrine)
├── about/page.tsx    (NOUVEAU)
├── projects/
│   ├── page.tsx      (NOUVEAU: liste 12 projets)
│   └── [id]/page.tsx (NOUVEAU: détail)
├── news/
│   ├── page.tsx      (NOUVEAU: liste)
│   └── [slug]/page.tsx (NOUVEAU: article)
├── contact/page.tsx  (NOUVEAU)
└── winners/page.tsx  (REDIRECT 301 → /projects)
```

### Composants layout
- `components/layout/header.tsx` (navigation, FR/EN, mobile)
- `components/layout/footer.tsx` (partenaires, logo DDI transparent)

---

## Phase 4: Composants

### Page d'accueil
- home/hero-section.tsx (repensé)
- home/stats-counter.tsx (compteurs animés)
- home/youth-tech-section.tsx
- home/featured-projects.tsx
- home/recent-news.tsx
- home/testimonials.tsx
- shared/newsletter-form.tsx

### Projets
- projects/project-card.tsx (avec progress bar)
- projects/project-filters.tsx
- projects/projects-map.tsx
- projects/project-hero.tsx
- projects/project-metrics.tsx
- projects/technologies-grid.tsx
- projects/similar-projects.tsx

### News
- news/hero-news.tsx
- news/featured-article.tsx
- news/news-card.tsx
- news/article-content.tsx
- news/related-projects.tsx
- shared/share-buttons.tsx
- shared/pagination.tsx

### Contact
- contact/contact-form.tsx
- contact/organization-card.tsx
- contact/faq-accordion.tsx

### Partagés
- shared/breadcrumb.tsx
- animated-counter.tsx (nouveau)

---

## Phase 5: Améliorations visuelles

### 5.1 Logo DDI transparent
Remplacer `/partners/ddi-logo.jpeg` par version PNG transparent

### 5.2 Compteurs animés
`components/animated-counter.tsx` - IntersectionObserver, ease-out, 2s duration

### 5.3 Nouvelles CSS
Dans `app/globals.css`:
- animate-fade-in, slide-up, slide-in-left/right
- animate-float, pulse-glow

### 5.4 Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Phase 6: API Contact

**app/api/contact/route.ts**
- POST endpoint
- Validation: name, email, subject, message, privacy checkbox
- Options: email via Resend/SendGrid

---

## Phase 7: SEO

Chaque page avec metadata dynamique:
- Title, description, OpenGraph
- Structured data JSON-LD pour projets

---

## Phase 8: Tests

Critères d'acceptation:
- Navigation fonctionnelle
- Filtres projets (catégorie, pays, techno)
- Progress visible sur cards détails
- Budget visible (15K€/5K€)
- **Aucun email public**
- Responsive
- Logo DDI transparent
- Animations fluides 60fps
- Temps chargement < 3s

---

## Ordre implémentation

1. Types + data/projects.ts + lib/projects.ts
2. Système Markdown (lib/markdown.ts, lib/news.ts)
3. Routes de base (about, projects list)
4. Page détail projet
5. Page news
6. Page contact + API
7. Page accueil repensée
8. Améliorations visuelles
9. Tests

---

## Créer branche

```bash
git checkout -b feature/showcase-transformation
```
