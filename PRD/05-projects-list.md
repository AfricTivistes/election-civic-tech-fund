# PRD 05 - Page Liste des Projets/Bénéficiaires

## Objectif

Présenter les 12 projets bénéficiaires du Fonds avec des options de filtrage et une vue d'ensemble attrayante, permettant aux visiteurs de découvrir facilement les initiatives soutenues.

## URL

- `/fr/projects`
- `/en/projects`

## Redirection

`/fr/winners` → Redirect 301 vers `/fr/projects`
`/en/winners` → Redirect 301 vers `/en/projects`

## Wireframe textuel

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (commun)                                                 │
├─────────────────────────────────────────────────────────────────┤
│ HERO PROJETS                                                    │
│                                                                 │
│     LES BÉNÉFICIAIRES DU FONDS                                  │
│     "12 projets innovants pour transformer                      │
│      la démocratie en Afrique"                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ STATISTIQUES                                                    │
│                                                                 │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│   │    12    │  │    9     │  │    3     │  │    9     │       │
│   │ Projets  │  │  Pays    │  │  Micro   │  │  Major   │       │
│   │  Total   │  │ Couverts │  │ Grants   │  │ Grants   │       │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FILTRES                                                         │
│                                                                 │
│   Catégorie:  [Tous] [Major] [Micro]                           │
│                                                                 │
│   Pays:       [Tous les pays ▾]                                 │
│                                                                 │
│   Technologie: [Toutes] [IA] [Mobile] [Web] [Fact-check] ...   │
│                                                                 │
│   Vue:        [☷ Grille] [☰ Liste]                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ GRILLE DES PROJETS                                              │
│                                                                 │
│   ┌─────────────────────┐  ┌─────────────────────┐             │
│   │ [Image projet]      │  │ [Image projet]      │             │
│   │ 🇸🇸 Soudan du Sud    │  │ 🇧🇯 Bénin            │             │
│   │                     │  │                     │             │
│   │ Electoral Fact-     │  │ Vigilant Civic      │             │
│   │ Checking Initiative │  │ Voice               │             │
│   │                     │  │                     │             │
│   │ [MAJOR] 15 000€     │  │ [MAJOR] 15 000€     │             │
│   │                     │  │                     │             │
│   │ ████████░░ 80%      │  │ ██████░░░░ 60%      │             │
│   │ 10 mois restants    │  │ 8 mois restants     │             │
│   │                     │  │                     │             │
│   │ [IA] [Mobile] [Web] │  │ [Fact-check] [Web]  │             │
│   │                     │  │                     │             │
│   │ [Voir le projet →]  │  │ [Voir le projet →]  │             │
│   └─────────────────────┘  └─────────────────────┘             │
│                                                                 │
│   ┌─────────────────────┐  ┌─────────────────────┐             │
│   │ ...                 │  │ ...                 │             │
│   └─────────────────────┘  └─────────────────────┘             │
│                                                                 │
│   [Page 1] [2] [3] [Suivant →]                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ CARTE INTERACTIVE (toggle)                                      │
│                                                                 │
│   [Voir sur la carte 🗺️]                                        │
│                                                                 │
│   ┌─────────────────────────────────────────────────┐          │
│   │                                                 │          │
│   │     [Carte Afrique avec markers]                │          │
│   │     🇸🇸(1) 🇧🇯(1) 🇨🇲(2) 🇸🇳(2) 🇬🇳(1)            │          │
│   │     🇲🇷(1) 🇪🇹(2) 🇸🇴(2)                         │          │
│   │                                                 │          │
│   └─────────────────────────────────────────────────┘          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER (commun)                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Composants à créer

### 1. Hero Projets (`components/projects/hero-projects.tsx`)

```typescript
interface HeroProjectsProps {
  lang: string
  totalProjects: number
}
```

### 2. Stats Projets (`components/projects/projects-stats.tsx`)

```typescript
interface ProjectsStatsProps {
  total: number
  countries: number
  major: number
  micro: number
}
```

### 3. Filtres (`components/projects/project-filters.tsx`)

```typescript
interface ProjectFiltersProps {
  lang: string
  selectedCategory: "all" | "major" | "micro"
  selectedCountry: string | null
  selectedTechnology: string | null
  viewMode: "grid" | "list"
  onCategoryChange: (category: string) => void
  onCountryChange: (country: string | null) => void
  onTechnologyChange: (tech: string | null) => void
  onViewModeChange: (mode: "grid" | "list") => void
}
```

**Options de filtres :**

```typescript
const categories = [
  { value: "all", label: { fr: "Tous", en: "All" } },
  { value: "major", label: { fr: "Major (15 000€)", en: "Major (€15,000)" } },
  { value: "micro", label: { fr: "Micro (5 000€)", en: "Micro (€5,000)" } }
]

const countries = [
  { value: "ss", label: { fr: "Soudan du Sud", en: "South Sudan" }, flag: "🇸🇸" },
  { value: "bj", label: { fr: "Bénin", en: "Benin" }, flag: "🇧🇯" },
  { value: "cm", label: { fr: "Cameroun", en: "Cameroon" }, flag: "🇨🇲" },
  { value: "sn", label: { fr: "Sénégal", en: "Senegal" }, flag: "🇸🇳" },
  { value: "gn", label: { fr: "Guinée", en: "Guinea" }, flag: "🇬🇳" },
  { value: "mr", label: { fr: "Mauritanie", en: "Mauritania" }, flag: "🇲🇷" },
  { value: "et", label: { fr: "Éthiopie", en: "Ethiopia" }, flag: "🇪🇹" },
  { value: "so", label: { fr: "Somalie", en: "Somalia" }, flag: "🇸🇴" }
]

const technologies = [
  { value: "ai", label: { fr: "Intelligence Artificielle", en: "Artificial Intelligence" } },
  { value: "mobile", label: { fr: "Application Mobile", en: "Mobile App" } },
  { value: "web", label: { fr: "Plateforme Web", en: "Web Platform" } },
  { value: "factcheck", label: { fr: "Fact-checking", en: "Fact-checking" } },
  { value: "opendata", label: { fr: "Open Data", en: "Open Data" } },
  { value: "chatbot", label: { fr: "Chatbot", en: "Chatbot" } }
]
```

### 4. Card Projet (`components/projects/project-card.tsx`)

```typescript
interface ProjectCardProps {
  project: Project
  lang: string
  viewMode: "grid" | "list"
}
```

**Éléments de la card :**
- Image du projet (ratio 16:9)
- Drapeau + nom du pays
- Nom du projet
- Badge catégorie (Major/Micro) avec montant
- Barre de progression avec pourcentage
- Durée restante
- Tags technologies (max 3 visibles)
- Bouton "Voir le projet"

**PAS d'affichage d'email** (conformément aux demandes)

### 5. Barre de progression (`components/projects/progress-bar.tsx`)

```typescript
interface ProgressBarProps {
  progress: number  // 0-100
  startDate: string
  endDate: string
  lang: string
}
```

**Affichage :**
- Barre colorée (gradient vert)
- Pourcentage à droite
- Texte "X mois restants" en dessous

**Calcul durée restante :**
```typescript
function getRemainingMonths(endDate: string): number {
  const end = new Date(endDate)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24 * 30)))
}
```

### 6. Carte Interactive (`components/projects/projects-map.tsx`)

```typescript
interface ProjectsMapProps {
  projects: Project[]
  lang: string
  onProjectClick: (projectId: string) => void
}
```

**Fonctionnalités :**
- Réutiliser le style de carte existant
- Markers sur chaque pays avec nombre de projets
- Clic sur marker → popup avec liste des projets du pays
- Clic sur projet → navigation vers page détail

### 7. Vue Liste (`components/projects/project-list-item.tsx`)

```typescript
interface ProjectListItemProps {
  project: Project
  lang: string
}
```

**Pour la vue liste (alternative à la grille) :**
- Layout horizontal
- Thumbnail à gauche
- Infos condensées à droite
- Plus de texte descriptif visible

## Logique de filtrage

```typescript
function filterProjects(
  projects: Project[],
  filters: {
    category: "all" | "major" | "micro"
    country: string | null
    technology: string | null
  }
): Project[] {
  return projects.filter(project => {
    // Filtre catégorie
    if (filters.category !== "all" && project.category !== filters.category) {
      return false
    }
    
    // Filtre pays
    if (filters.country && project.countryCode !== filters.country) {
      return false
    }
    
    // Filtre technologie
    if (filters.technology) {
      const techMatch = project.technologies.fr.some(t => 
        t.toLowerCase().includes(filters.technology!.toLowerCase())
      )
      if (!techMatch) return false
    }
    
    return true
  })
}
```

## Pagination

```typescript
const PROJECTS_PER_PAGE = 6 // ou 9 selon layout

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
```

## URL avec query params

Permettre le filtrage via URL pour le partage :
- `/fr/projects?category=major`
- `/fr/projects?country=sn`
- `/fr/projects?tech=ai`
- `/fr/projects?category=micro&country=cm`

## Données des projets

Voir PRD-10 pour la structure complète des données.

Résumé des 12 projets :

| ID | Projet | Pays | Catégorie |
|----|--------|------|-----------|
| 1 | Electoral Fact-Checking Initiative | 🇸🇸 Soudan du Sud | Major |
| 2 | Vigilant Civic Voice | 🇧🇯 Bénin | Major |
| 3 | MyAIFactChecker Cameroon | 🇨🇲 Cameroun | Major |
| 4 | Plateforme électorale citoyenne | 🇸🇳 Sénégal | Major |
| 5 | PACTE | 🇬🇳 Guinée | Major |
| 6 | My Vote My Voice 2.0 | 🇨🇲 Cameroun | Major |
| 7 | Veille juridique jeunes | 🇲🇷 Mauritanie | Major |
| 8 | SENEGAL VOTE CIVICRISE | 🇸🇳 Sénégal | Major |
| 9 | Renforcement OSC Amhara | 🇪🇹 Éthiopie | Major |
| 10 | DoorashoKaab | 🇸🇴 Somalie | Micro |
| 11 | Inclusive Voices | 🇸🇴 Somalie | Micro |
| 12 | Digital Empowerment Ethiopia | 🇪🇹 Éthiopie | Micro |

## SEO

```html
<title>Projets Bénéficiaires | Election Civic Tech Fund</title>
<meta name="description" content="Découvrez les 12 projets innovants soutenus par l'Election Civic Tech Fund : fact-checking, plateformes citoyennes, applications mobiles pour la démocratie en Afrique." />
```

## Critères d'acceptation

- [ ] Les 12 projets sont affichés avec leurs informations
- [ ] Les filtres par catégorie fonctionnent (Major/Micro)
- [ ] Les filtres par pays fonctionnent
- [ ] Les filtres par technologie fonctionnent
- [ ] La barre de progression est affichée pour chaque projet
- [ ] Le montant alloué est visible (15 000€ ou 5 000€)
- [ ] **Aucun email n'est affiché**
- [ ] La vue grille/liste est disponible
- [ ] La carte interactive montre les projets par pays
- [ ] Les URL avec query params fonctionnent
- [ ] La page est responsive
- [ ] Redirect de /winners vers /projects fonctionne

## Dépendances

- PRD-01 : Architecture
- PRD-10 : Structure des données projets
- PRD-06 : Page détail projet (lien)
