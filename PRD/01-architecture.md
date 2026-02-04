# PRD 01 - Architecture technique

## Stack technologique actuel

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **UI Components** : shadcn/ui (Card, Button, Badge, etc.)
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Internationalisation** : Custom hook `useLanguage`

## Structure des dossiers actuelle

```
/
├── app/
│   ├── [lang]/
│   │   ├── page.tsx          # Page actuelle (formulaire)
│   │   ├── layout.tsx
│   │   └── winners/
│   │       └── page.tsx      # Page bénéficiaires actuelle
│   ├── api/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                   # Composants shadcn/ui
│   ├── hero-section.tsx
│   ├── winners-showcase.tsx
│   ├── step-one.tsx
│   ├── step-two.tsx
│   ├── step-three.tsx
│   ├── step-four.tsx
│   └── ...
├── hooks/
│   └── use-language.ts
├── locales/
│   ├── fr.json
│   └── en.json
├── public/
│   ├── partners/
│   │   ├── ahead-africa.webp
│   │   ├── africtivistes.svg
│   │   ├── ddi-logo.jpeg     # À remplacer par PNG transparent
│   │   └── ...
│   ├── 1.jpg ... 13.jpg      # Images des projets
│   └── Logo Fonds Election Civic Tech Fund.svg
└── PRD/                      # Documentation (nouveau)
```

## Structure des dossiers cible

```
/
├── app/
│   ├── [lang]/
│   │   ├── page.tsx              # REFONTE: Nouvelle page d'accueil
│   │   ├── layout.tsx
│   │   ├── about/
│   │   │   └── page.tsx          # NOUVEAU: Page À propos
│   │   ├── projects/
│   │   │   ├── page.tsx          # NOUVEAU: Liste des projets
│   │   │   └── [id]/
│   │   │       └── page.tsx      # NOUVEAU: Détail projet
│   │   ├── news/
│   │   │   ├── page.tsx          # NOUVEAU: Liste des actualités
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # NOUVEAU: Détail article
│   │   ├── contact/
│   │   │   └── page.tsx          # NOUVEAU: Page contact
│   │   └── winners/
│   │       └── page.tsx          # REDIRECT vers /projects
│   └── api/
│       └── contact/
│           └── route.ts          # NOUVEAU: API formulaire contact
├── components/
│   ├── ui/                       # Existant
│   ├── layout/                   # NOUVEAU
│   │   ├── header.tsx            # Navigation principale
│   │   ├── footer.tsx            # Footer commun
│   │   └── mobile-nav.tsx        # Menu mobile
│   ├── home/                     # NOUVEAU
│   │   ├── hero-section.tsx      # Hero repensé
│   │   ├── youth-tech-section.tsx
│   │   ├── featured-projects.tsx
│   │   ├── recent-news.tsx
│   │   └── stats-counter.tsx
│   ├── projects/                 # NOUVEAU
│   │   ├── project-card.tsx
│   │   ├── project-filters.tsx
│   │   ├── project-map.tsx
│   │   ├── progress-bar.tsx
│   │   └── project-detail.tsx
│   ├── news/                     # NOUVEAU
│   │   ├── news-card.tsx
│   │   ├── news-list.tsx
│   │   └── article-content.tsx
│   └── shared/                   # NOUVEAU
│       ├── partners-banner.tsx
│       ├── testimonial-card.tsx
│       └── newsletter-form.tsx
├── content/                      # NOUVEAU: Contenu Markdown
│   ├── news/
│   │   ├── fr/
│   │   │   └── 2025-01-lancement-fonds.md
│   │   └── en/
│   │       └── 2025-01-fund-launch.md
│   └── projects/
│       ├── fr/
│       │   └── electoral-fact-checking-south-sudan.md
│       └── en/
│           └── electoral-fact-checking-south-sudan.md
├── lib/                          # NOUVEAU: Utilitaires
│   ├── markdown.ts               # Parsing Markdown
│   ├── projects.ts               # Données et helpers projets
│   └── news.ts                   # Données et helpers actualités
├── data/                         # NOUVEAU: Données structurées
│   └── projects.ts               # Données des 12 projets
└── types/                        # NOUVEAU: Types TypeScript
    ├── project.ts
    └── news.ts
```

## Routing Next.js App Router

| Route | Fichier | Description |
|-------|---------|-------------|
| `/` | `app/page.tsx` | Redirect vers `/fr` |
| `/fr` | `app/[lang]/page.tsx` | Accueil FR |
| `/en` | `app/[lang]/page.tsx` | Accueil EN |
| `/fr/about` | `app/[lang]/about/page.tsx` | À propos FR |
| `/fr/projects` | `app/[lang]/projects/page.tsx` | Liste projets FR |
| `/fr/projects/1` | `app/[lang]/projects/[id]/page.tsx` | Détail projet |
| `/fr/news` | `app/[lang]/news/page.tsx` | Actualités FR |
| `/fr/news/lancement-fonds` | `app/[lang]/news/[slug]/page.tsx` | Article |
| `/fr/contact` | `app/[lang]/contact/page.tsx` | Contact FR |
| `/fr/winners` | Redirect | Redirect vers `/fr/projects` |

## Composants partagés (Layout)

### Header (`components/layout/header.tsx`)

```tsx
interface HeaderProps {
  lang: string
}

// Éléments :
// - Logo Election Civic Tech Fund (lien vers accueil)
// - Navigation principale : Accueil, À propos, Projets, Actualités, Contact
// - Sélecteur de langue FR/EN
// - Responsive : menu hamburger sur mobile
```

### Footer (`components/layout/footer.tsx`)

```tsx
interface FooterProps {
  lang: string
}

// Éléments :
// - Bannière partenaires (AHEAD, AfricTivistes, DDI)
// - Logo DDI avec fond TRANSPARENT
// - Liens rapides
// - Réseaux sociaux
// - Copyright
```

## Types TypeScript

### Project (`types/project.ts`)

```typescript
interface Project {
  id: string
  slug: string
  projectName: { fr: string; en: string }
  organization: string
  country: { fr: string; en: string }
  countryCode: string
  countryFlag: string
  category: "major" | "micro"
  budget: number // 15000 ou 5000
  domain: { fr: string; en: string }
  description: { fr: string; en: string }
  impact: { fr: string; en: string }
  technologies: { fr: string[]; en: string[] }
  website?: string
  // contact: string  // SUPPRIMÉ - pas d'email public
  projectImage: string
  
  // Nouveaux champs
  startDate: string // ISO date
  endDate: string   // ISO date
  progress: number  // 0-100
  status: "not_started" | "in_progress" | "completed"
  duration: number  // en mois
}
```

### News Article (`types/news.ts`)

```typescript
interface NewsArticle {
  slug: string
  title: { fr: string; en: string }
  excerpt: { fr: string; en: string }
  content: string // Markdown
  date: string
  author?: string
  image?: string
  tags: string[]
  relatedProjects?: string[] // IDs des projets liés
}
```

## Gestion des données

### Option retenue : Fichiers statiques + Markdown

1. **Données projets** : Fichier TypeScript (`data/projects.ts`)
   - Avantage : Typage fort, pas de parsing
   - Mise à jour : Édition directe du fichier

2. **Actualités** : Fichiers Markdown (`content/news/`)
   - Avantage : Édition facile par non-développeurs
   - Parsing : gray-matter + remark

3. **Traductions** : Fichiers JSON existants (`locales/`)

### Pas de base de données

Le contenu est statique et ne nécessite pas de BDD :
- 12 projets fixes
- Actualités ajoutées occasionnellement
- Pas de fonctionnalité utilisateur (auth, etc.)

## Performance

- **SSG (Static Site Generation)** pour toutes les pages
- **Image optimization** avec next/image
- **Lazy loading** pour les composants lourds
- **ISR (Incremental Static Regeneration)** si besoin de mise à jour sans rebuild

## SEO

Chaque page doit avoir :
- `<title>` dynamique
- `<meta description>`
- Open Graph tags
- Structured data (JSON-LD) pour les projets

## Dépendances à ajouter

```json
{
  "dependencies": {
    "gray-matter": "^4.0.3",    // Parsing frontmatter Markdown
    "remark": "^15.0.0",        // Markdown to HTML
    "remark-html": "^16.0.0"
  }
}
```

## Migration progressive

1. **Phase 1** : Créer nouvelle structure sans casser l'existant
2. **Phase 2** : Implémenter les nouvelles pages
3. **Phase 3** : Refondre la page d'accueil
4. **Phase 4** : Rediriger `/winners` vers `/projects`
5. **Phase 5** : Supprimer le code du formulaire (optionnel, garder pour historique)
