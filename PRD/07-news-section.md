# PRD 07 - Section Actualités

## Objectif

Permettre la publication et l'affichage d'actualités liées au Fonds et aux projets bénéficiaires, avec une gestion de contenu simplifiée via fichiers Markdown.

## URLs

- `/fr/news` - Liste des actualités
- `/en/news` - News list
- `/fr/news/[slug]` - Détail article
- `/en/news/[slug]` - Article detail

## Wireframe - Page Liste

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (commun)                                                 │
├─────────────────────────────────────────────────────────────────┤
│ HERO ACTUALITÉS                                                 │
│                                                                 │
│     ACTUALITÉS                                                  │
│     "Suivez les avancées du Fonds et de ses projets"           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ ARTICLE À LA UNE (featured)                                     │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │            [Grande image article featured]              │   │
│   │                                                         │   │
│   │   15 Février 2025                                       │   │
│   │                                                         │   │
│   │   Atelier de lancement au Cameroun : les deux projets   │   │
│   │   bénéficiaires réunis                                  │   │
│   │                                                         │   │
│   │   Les équipes de MyAIFactChecker et My Vote My Voice    │   │
│   │   se sont réunies pour le lancement officiel...         │   │
│   │                                                         │   │
│   │   [Lire l'article →]                                    │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FILTRES (optionnel)                                             │
│                                                                 │
│   Tags: [Tous] [Lancement] [Formation] [Cameroun] [Sénégal]... │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ GRILLE ACTUALITÉS                                               │
│                                                                 │
│   ┌──────────────────┐  ┌──────────────────┐                   │
│   │ [Image]          │  │ [Image]          │                   │
│   │                  │  │                  │                   │
│   │ 01 Fév 2025      │  │ 15 Jan 2025      │                   │
│   │                  │  │                  │                   │
│   │ Sélection des 12 │  │ Lancement officiel│                  │
│   │ bénéficiaires    │  │ du Fonds         │                   │
│   │                  │  │                  │                   │
│   │ L'Election Civic │  │ L'Election Civic │                   │
│   │ Tech Fund...     │  │ Tech Fund...     │                   │
│   │                  │  │                  │                   │
│   │ [Lancement]      │  │ [Annonce]        │                   │
│   │                  │  │                  │                   │
│   │ [Lire →]         │  │ [Lire →]         │                   │
│   └──────────────────┘  └──────────────────┘                   │
│                                                                 │
│   ┌──────────────────┐  ┌──────────────────┐                   │
│   │ ...              │  │ ...              │                   │
│   └──────────────────┘  └──────────────────┘                   │
│                                                                 │
│   [← Précédent]  Page 1 de 3  [Suivant →]                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ NEWSLETTER                                                      │
│                                                                 │
│   "Ne manquez aucune actualité"                                 │
│   [        Votre email        ] [S'inscrire]                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER (commun)                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Wireframe - Page Article

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (commun)                                                 │
├─────────────────────────────────────────────────────────────────┤
│ BREADCRUMB                                                      │
│                                                                 │
│   Accueil > Actualités > Atelier de lancement au Cameroun      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ ARTICLE                                                         │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │                   [Image de couverture]                 │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   [Formation] [Cameroun]                                        │
│                                                                 │
│   Atelier de lancement au Cameroun : les deux projets           │
│   bénéficiaires réunis                                          │
│                                                                 │
│   📅 15 Février 2025  |  ✍️ Équipe AfricTivistes               │
│                                                                 │
│   ─────────────────────────────────────────────────────────     │
│                                                                 │
│   Les équipes des deux projets camerounais soutenus par le     │
│   Fonds – **MyAIFactChecker Cameroon** et **My Vote My Voice   │
│   2.0** – se sont réunies à Yaoundé pour le lancement          │
│   officiel de leurs initiatives...                              │
│                                                                 │
│   ## Objectifs de l'atelier                                     │
│                                                                 │
│   - Présenter les projets aux parties prenantes                 │
│   - Établir les synergies entre les deux équipes               │
│   - Définir le calendrier des prochaines étapes                │
│                                                                 │
│   ## Participants                                               │
│                                                                 │
│   Plus de 50 personnes ont participé...                         │
│                                                                 │
│   [Image: Photo des participants]                               │
│                                                                 │
│   ## Prochaines étapes                                          │
│                                                                 │
│   ...                                                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ PROJETS MENTIONNÉS                                              │
│                                                                 │
│   ┌────────────────────┐  ┌────────────────────┐               │
│   │ [Mini card projet] │  │ [Mini card projet] │               │
│   │ MyAIFactChecker    │  │ My Vote My Voice   │               │
│   │ [Voir le projet →] │  │ [Voir le projet →] │               │
│   └────────────────────┘  └────────────────────┘               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ PARTAGE                                                         │
│                                                                 │
│   Partager cet article:                                         │
│   [Twitter] [Facebook] [LinkedIn] [Copier le lien]              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ ARTICLES RÉCENTS                                                │
│                                                                 │
│   ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│   │ [Mini card]    │  │ [Mini card]    │  │ [Mini card]    │   │
│   │ Article 1      │  │ Article 2      │  │ Article 3      │   │
│   └────────────────┘  └────────────────┘  └────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER (commun)                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Composants à créer

### 1. Hero Actualités (`components/news/hero-news.tsx`)

```typescript
interface HeroNewsProps {
  lang: string
}
```

### 2. Article Featured (`components/news/featured-article.tsx`)

```typescript
interface FeaturedArticleProps {
  article: NewsArticle
  lang: string
}
```

### 3. Card Actualité (`components/news/news-card.tsx`)

```typescript
interface NewsCardProps {
  article: NewsArticle
  lang: string
  size?: "small" | "medium" | "large"
}
```

**Éléments :**
- Image (ratio 16:9)
- Date formatée
- Titre
- Excerpt (2-3 lignes)
- Tags
- Lien "Lire"

### 4. Filtres par tags (`components/news/news-filters.tsx`)

```typescript
interface NewsFiltersProps {
  tags: string[]
  selectedTag: string | null
  onTagChange: (tag: string | null) => void
  lang: string
}
```

### 5. Pagination (`components/shared/pagination.tsx`)

```typescript
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  lang: string
}
```

### 6. Contenu Article (`components/news/article-content.tsx`)

```typescript
interface ArticleContentProps {
  article: NewsArticle
  lang: string
}
```

**Styling du contenu Markdown :**
```css
.article-content h2 { @apply text-2xl font-bold mt-8 mb-4; }
.article-content h3 { @apply text-xl font-semibold mt-6 mb-3; }
.article-content p { @apply mb-4 leading-relaxed; }
.article-content ul { @apply list-disc ml-6 mb-4; }
.article-content ol { @apply list-decimal ml-6 mb-4; }
.article-content img { @apply rounded-lg my-6; }
.article-content blockquote { @apply border-l-4 border-yellow-400 pl-4 italic my-4; }
```

### 7. Projets mentionnés (`components/news/related-projects.tsx`)

```typescript
interface RelatedProjectsProps {
  projectIds: string[]
  lang: string
}
```

### 8. Boutons de partage (`components/shared/share-buttons.tsx`)

```typescript
interface ShareButtonsProps {
  url: string
  title: string
  lang: string
}
```

**Réseaux :**
- Twitter/X
- Facebook
- LinkedIn
- Copier le lien

## Structure fichier Markdown

Voir PRD-02 pour le format complet.

### Exemple article

```markdown
---
title: "Atelier de lancement au Cameroun"
slug: "atelier-lancement-cameroun"
date: "2025-02-15"
author: "Équipe AfricTivistes"
excerpt: "Les équipes des deux projets camerounais se sont réunies pour le lancement officiel."
image: "/news/cameroun-atelier.jpg"
tags:
  - formation
  - cameroun
  - lancement
relatedProjects:
  - "3"  # MyAIFactChecker
  - "6"  # My Vote My Voice 2.0
featured: false
---

Les équipes des deux projets camerounais soutenus par le Fonds...
```

## Logique d'affichage

### Page liste (`app/[lang]/news/page.tsx`)

```typescript
export default async function NewsPage({ params }: NewsPageProps) {
  const { lang } = await params
  
  // Récupérer tous les articles
  const allArticles = await getAllNews(lang)
  
  // Séparer featured et reste
  const featuredArticle = allArticles.find(a => a.featured)
  const otherArticles = allArticles.filter(a => !a.featured)
  
  // Extraire tous les tags
  const allTags = [...new Set(allArticles.flatMap(a => a.tags))]
  
  return (
    // ...
  )
}
```

### Page article (`app/[lang]/news/[slug]/page.tsx`)

```typescript
export async function generateStaticParams() {
  const frArticles = await getAllNews('fr')
  const enArticles = await getAllNews('en')
  
  return [
    ...frArticles.map(a => ({ lang: 'fr', slug: a.slug })),
    ...enArticles.map(a => ({ lang: 'en', slug: a.slug }))
  ]
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { lang, slug } = await params
  const article = await getNewsBySlug(slug, lang)
  
  if (!article) {
    notFound()
  }
  
  // Récupérer les projets liés
  const relatedProjects = article.relatedProjects 
    ? article.relatedProjects.map(id => getProjectById(id))
    : []
  
  // Récupérer les articles récents (excluant l'actuel)
  const recentArticles = (await getAllNews(lang))
    .filter(a => a.slug !== slug)
    .slice(0, 3)
  
  return (
    // ...
  )
}
```

## Pagination

```typescript
const ARTICLES_PER_PAGE = 6

// Avec query params: /fr/news?page=2
const currentPage = searchParams.page ? parseInt(searchParams.page) : 1
const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
const paginatedArticles = otherArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)
const totalPages = Math.ceil(otherArticles.length / ARTICLES_PER_PAGE)
```

## SEO

### Page liste
```html
<title>Actualités | Election Civic Tech Fund</title>
<meta name="description" content="Suivez les dernières actualités de l'Election Civic Tech Fund et de ses 12 projets bénéficiaires en Afrique." />
```

### Page article
```typescript
export async function generateMetadata({ params }: ArticlePageProps) {
  const { lang, slug } = await params
  const article = await getNewsBySlug(slug, lang)
  
  return {
    title: `${article.title} | Election Civic Tech Fund`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
      type: 'article',
      publishedTime: article.date
    }
  }
}
```

## Articles de départ (exemples)

Créer 3-4 articles exemples pour le lancement :

1. **Lancement du Fonds** (Jan 2025)
   - Annonce officielle
   - Présentation du budget et des objectifs

2. **Sélection des bénéficiaires** (Fév 2025)
   - Annonce des 12 projets
   - Présentation rapide de chaque projet

3. **Premier atelier** (Fév 2025)
   - Exemple d'activité terrain
   - Photos et témoignages

## Critères d'acceptation

- [ ] La page liste affiche tous les articles triés par date
- [ ] L'article featured est mis en avant en haut
- [ ] Les tags sont affichables et filtrables
- [ ] La pagination fonctionne
- [ ] La page article affiche le contenu Markdown correctement
- [ ] Les projets mentionnés sont liés
- [ ] Les boutons de partage fonctionnent
- [ ] Les articles récents sont suggérés
- [ ] La newsletter est intégrée
- [ ] Les métadonnées SEO sont correctes
- [ ] La page est responsive

## Dépendances

- PRD-01 : Architecture
- PRD-02 : Système de contenu Markdown
- PRD-06 : Page détail projet (liens)
