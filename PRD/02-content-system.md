# PRD 02 - Système de gestion de contenu Markdown

## Objectif

Permettre la gestion facile du contenu (actualités, descriptions projets) via des fichiers Markdown, sans nécessiter de base de données ni d'interface d'administration.

## Avantages du Markdown

1. **Simplicité** : Format texte lisible et éditable par tous
2. **Versionning** : Suivi des modifications via Git
3. **Portabilité** : Pas de dépendance à un CMS
4. **Performance** : Génération statique à la compilation
5. **Flexibilité** : Frontmatter YAML pour les métadonnées

## Structure des dossiers

```
content/
├── news/
│   ├── fr/
│   │   ├── 2025-01-15-lancement-fonds.md
│   │   ├── 2025-02-01-selection-beneficiaires.md
│   │   └── 2025-02-10-atelier-cameroun.md
│   └── en/
│       ├── 2025-01-15-fund-launch.md
│       ├── 2025-02-01-beneficiary-selection.md
│       └── 2025-02-10-cameroon-workshop.md
└── projects/
    ├── fr/
    │   └── updates/
    │       ├── project-1-update-janvier.md
    │       └── project-2-lancement-plateforme.md
    └── en/
        └── updates/
            ├── project-1-update-january.md
            └── project-2-platform-launch.md
```

## Format des fichiers Markdown

### Actualité générale (`content/news/fr/2025-01-15-lancement-fonds.md`)

```markdown
---
title: "Lancement officiel de l'Election Civic Tech Fund"
slug: "lancement-fonds"
date: "2025-01-15"
author: "Équipe AfricTivistes"
excerpt: "L'Election Civic Tech Fund annonce officiellement son lancement avec un budget de 175 000€ pour soutenir 12 projets innovants."
image: "/news/lancement-fonds.jpg"
tags:
  - lancement
  - annonce
  - afrique
relatedProjects: []
featured: true
---

# Lancement officiel de l'Election Civic Tech Fund

L'**Election Civic Tech Fund** est fier d'annoncer son lancement officiel...

## Contexte

Le fonds vise à soutenir des initiatives technologiques citoyennes...

## Les chiffres clés

- **175 000€** de budget total
- **14 pays** africains ciblés
- **12 projets** sélectionnés

## Prochaines étapes

1. Publication de l'appel à projets
2. Évaluation des candidatures
3. Annonce des bénéficiaires

---

*Pour plus d'informations, suivez-nous sur nos réseaux sociaux.*
```

### Actualité projet (`content/projects/fr/updates/project-1-update-janvier.md`)

```markdown
---
title: "Avancement du projet Electoral Fact-Checking au Soudan du Sud"
slug: "project-1-update-janvier-2025"
date: "2025-01-20"
projectId: "1"
excerpt: "Le projet a formé ses premiers 50 jeunes journalistes à la vérification des faits."
image: "/projects/updates/south-sudan-training.jpg"
tags:
  - soudan-du-sud
  - fact-checking
  - formation
---

# Avancement du projet Electoral Fact-Checking

## Janvier 2025 - Formation des premiers vérificateurs

L'Excellence Foundation for South Sudan a organisé son premier atelier de formation...

### Réalisations

- 50 jeunes journalistes formés
- Plateforme de fact-checking en développement
- Partenariats avec 3 médias locaux établis

### Prochaines étapes

- Lancement de la plateforme en février
- Formation de 100 journalistes supplémentaires
```

## Bibliothèques à utiliser

### Installation

```bash
npm install gray-matter remark remark-html
```

### Dépendances

| Package | Version | Usage |
|---------|---------|-------|
| `gray-matter` | ^4.0.3 | Parser le frontmatter YAML |
| `remark` | ^15.0.0 | Parser le Markdown |
| `remark-html` | ^16.0.0 | Convertir en HTML |

## Utilitaires de parsing

### `lib/markdown.ts`

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export interface MarkdownContent<T> {
  metadata: T
  content: string
  htmlContent: string
}

export async function parseMarkdownFile<T>(
  filePath: string
): Promise<MarkdownContent<T>> {
  const fullPath = path.join(contentDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // Parser le frontmatter
  const { data, content } = matter(fileContents)
  
  // Convertir le Markdown en HTML
  const processedContent = await remark()
    .use(html)
    .process(content)
  
  return {
    metadata: data as T,
    content,
    htmlContent: processedContent.toString()
  }
}

export function getAllMarkdownFiles(
  directory: string,
  lang: string = 'fr'
): string[] {
  const dirPath = path.join(contentDirectory, directory, lang)
  
  if (!fs.existsSync(dirPath)) {
    return []
  }
  
  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(directory, lang, file))
}
```

### `lib/news.ts`

```typescript
import { parseMarkdownFile, getAllMarkdownFiles } from './markdown'

export interface NewsMetadata {
  title: string
  slug: string
  date: string
  author?: string
  excerpt: string
  image?: string
  tags: string[]
  relatedProjects?: string[]
  featured?: boolean
}

export interface NewsArticle extends NewsMetadata {
  content: string
  htmlContent: string
}

export async function getAllNews(lang: string = 'fr'): Promise<NewsArticle[]> {
  const files = getAllMarkdownFiles('news', lang)
  
  const articles = await Promise.all(
    files.map(async (file) => {
      const { metadata, content, htmlContent } = 
        await parseMarkdownFile<NewsMetadata>(file)
      return { ...metadata, content, htmlContent }
    })
  )
  
  // Trier par date décroissante
  return articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getNewsBySlug(
  slug: string,
  lang: string = 'fr'
): Promise<NewsArticle | null> {
  const allNews = await getAllNews(lang)
  return allNews.find(article => article.slug === slug) || null
}

export async function getRecentNews(
  count: number = 3,
  lang: string = 'fr'
): Promise<NewsArticle[]> {
  const allNews = await getAllNews(lang)
  return allNews.slice(0, count)
}

export async function getNewsByProject(
  projectId: string,
  lang: string = 'fr'
): Promise<NewsArticle[]> {
  const allNews = await getAllNews(lang)
  return allNews.filter(article => 
    article.relatedProjects?.includes(projectId)
  )
}
```

## Exemple d'utilisation dans une page

### Page liste actualités (`app/[lang]/news/page.tsx`)

```typescript
import { getAllNews } from '@/lib/news'

interface NewsPageProps {
  params: Promise<{ lang: string }>
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { lang } = await params
  const articles = await getAllNews(lang)
  
  return (
    <div>
      <h1>Actualités</h1>
      {articles.map(article => (
        <article key={article.slug}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <a href={`/${lang}/news/${article.slug}`}>Lire la suite</a>
        </article>
      ))}
    </div>
  )
}
```

### Page détail article (`app/[lang]/news/[slug]/page.tsx`)

```typescript
import { getNewsBySlug, getAllNews } from '@/lib/news'

interface ArticlePageProps {
  params: Promise<{ lang: string; slug: string }>
}

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
    return <div>Article non trouvé</div>
  }
  
  return (
    <article>
      <h1>{article.title}</h1>
      <time>{article.date}</time>
      <div dangerouslySetInnerHTML={{ __html: article.htmlContent }} />
    </article>
  )
}
```

## Validation du frontmatter

Créer un script de validation pour s'assurer que tous les fichiers Markdown ont les champs requis :

### `scripts/validate-content.ts`

```typescript
import { getAllMarkdownFiles, parseMarkdownFile } from '../lib/markdown'

const requiredNewsFields = ['title', 'slug', 'date', 'excerpt']
const requiredProjectUpdateFields = ['title', 'slug', 'date', 'projectId', 'excerpt']

async function validateContent() {
  const errors: string[] = []
  
  // Valider les actualités
  for (const lang of ['fr', 'en']) {
    const files = getAllMarkdownFiles('news', lang)
    for (const file of files) {
      const { metadata } = await parseMarkdownFile(file)
      for (const field of requiredNewsFields) {
        if (!metadata[field]) {
          errors.push(`${file}: champ "${field}" manquant`)
        }
      }
    }
  }
  
  if (errors.length > 0) {
    console.error('Erreurs de validation:')
    errors.forEach(e => console.error(`  - ${e}`))
    process.exit(1)
  }
  
  console.log('✓ Tous les fichiers de contenu sont valides')
}

validateContent()
```

## Critères d'acceptation

- [ ] Le dossier `content/` est créé avec la structure définie
- [ ] Les fichiers `lib/markdown.ts` et `lib/news.ts` sont implémentés
- [ ] Un article de test peut être créé et affiché
- [ ] Les articles sont triés par date décroissante
- [ ] Le frontmatter est correctement parsé
- [ ] Le contenu Markdown est converti en HTML
- [ ] Les articles peuvent être filtrés par projet

## Workflow d'ajout de contenu

1. Créer un fichier `.md` dans le bon dossier (`content/news/fr/`)
2. Remplir le frontmatter selon le template
3. Rédiger le contenu en Markdown
4. Commit et push
5. Rebuild automatique (ou ISR si configuré)
