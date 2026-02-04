# PRD 03 - Page d'accueil

## Objectif

Transformer la page d'accueil actuelle (formulaire de soumission) en une page vitrine attractive qui présente le Fonds, ses projets et ses actualités, tout en conservant l'identité visuelle existante.

## URL

- `/fr` (français)
- `/en` (anglais)

## Wireframe textuel

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ [Logo] Election Civic Tech Fund    [Accueil] [À propos]         │
│                                    [Projets] [Actualités]       │
│                                    [Contact] [FR|EN]            │
├─────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                    │
│                                                                 │
│     ELECTION CIVIC TECH FUND                                    │
│     Digital Democracy for Election                              │
│                                                                 │
│     [175 000€]  [14 Pays]  [12 Projets]                        │
│                                                                 │
│     [Découvrir les projets →]                                   │
│                                                                 │
│     Logos: [AfricTivistes] [Digitalise Youth]                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ STATS ANIMÉS                                                    │
│                                                                 │
│   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐               │
│   │  12    │  │  14    │  │ 175K€  │  │   9    │               │
│   │Projets │  │ Pays   │  │ Budget │  │ Major  │               │
│   └────────┘  └────────┘  └────────┘  └────────┘               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ SECTION JEUNESSE & TECHNOLOGIE                                  │
│                                                                 │
│     "L'innovation au service de la démocratie"                  │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│   │ 🤖 IA       │  │ 📱 Mobile   │  │ 🔐 Sécurité │            │
│   │ Fact-check  │  │ Accessibilité│  │ Blockchain │            │
│   └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│   │ 🌐 Web      │  │ 🗣️ Langues  │  │ 👥 Jeunesse │            │
│   │ Open Source │  │ Locales     │  │ Leadership │             │
│   └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ PROJETS PHARES (3-4 projets mis en avant)                       │
│                                                                 │
│     "Découvrez les projets bénéficiaires"                       │
│                                                                 │
│   ┌──────────────────┐  ┌──────────────────┐                   │
│   │ [Image projet 1] │  │ [Image projet 2] │                   │
│   │ 🇸🇸 Soudan du Sud │  │ 🇧🇯 Bénin         │                   │
│   │ Fact-Checking    │  │ Vigilant Civic   │                   │
│   │ ████████░░ 80%   │  │ ██████░░░░ 60%   │                   │
│   │ [Voir le projet] │  │ [Voir le projet] │                   │
│   └──────────────────┘  └──────────────────┘                   │
│                                                                 │
│              [Voir tous les projets →]                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ CARTE INTERACTIVE DES PAYS                                      │
│                                                                 │
│     "14 pays, 12 initiatives innovantes"                        │
│                                                                 │
│   [Carte Afrique avec drapeaux cliquables]                      │
│   🇸🇳 🇲🇱 🇧🇯 🇹🇬 🇬🇳 🇲🇷 🇧🇫 🇨🇲 🇹🇩 🇳🇪 🇸🇩 🇸🇸 🇪🇹 🇸🇴             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ ACTUALITÉS RÉCENTES                                             │
│                                                                 │
│     "Dernières nouvelles du Fonds"                              │
│                                                                 │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│   │ [Thumbnail]  │ │ [Thumbnail]  │ │ [Thumbnail]  │           │
│   │ 15 Jan 2025  │ │ 01 Fév 2025  │ │ 10 Fév 2025  │           │
│   │ Lancement du │ │ Sélection    │ │ Atelier      │           │
│   │ Fonds        │ │ bénéficiaires│ │ Cameroun     │           │
│   └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                 │
│              [Toutes les actualités →]                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ TÉMOIGNAGES                                                     │
│                                                                 │
│   "Ce que disent les porteurs de projets"                       │
│                                                                 │
│   ┌─────────────────────────────────────────────┐              │
│   │ "Le Fonds nous permet de..."                │              │
│   │                                             │              │
│   │ - Nom, Organisation, Pays 🇸🇳                │              │
│   └─────────────────────────────────────────────┘              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ NEWSLETTER                                                      │
│                                                                 │
│   "Restez informé des avancées du Fonds"                        │
│                                                                 │
│   [       Votre email        ] [S'inscrire]                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER                                                          │
│                                                                 │
│   [AHEAD Africa]     [AfricTivistes]     [DDI]                  │
│    Mené par          Conçu et géré par   Propulsé par           │
│                                                                 │
│   © 2024 Election Civic Tech Fund - AfricTivistes               │
└─────────────────────────────────────────────────────────────────┘
```

## Composants à créer

### 1. Header (`components/layout/header.tsx`)

```typescript
interface HeaderProps {
  lang: string
  currentPath?: string
}
```

**Éléments :**
- Logo avec lien vers accueil
- Navigation desktop : Accueil, À propos, Projets, Actualités, Contact
- Sélecteur de langue FR/EN
- Menu hamburger mobile
- Effet sticky avec backdrop-blur

**Design :**
- Background: `bg-white/10 backdrop-blur-md`
- Border: `border-b border-white/20`
- Liens actifs en jaune

### 2. Hero Section repensée (`components/home/hero-section.tsx`)

**Différences avec l'actuel :**
- Supprimer le bouton "Commencer" (plus de soumissions)
- Garder les badges stats (175 000€, 14 Pays, 12 Projets)
- Ajouter un CTA vers la page projets
- Conserver les animations de particules

**Éléments :**
- Titre gradient animé
- Sous-titre "Digital Democracy for Election"
- 3 badges stats
- Bouton "Découvrir les projets"
- Logos partenaires discrets

### 3. Compteurs animés (`components/home/stats-counter.tsx`)

```typescript
interface StatItem {
  value: number
  label: { fr: string; en: string }
  suffix?: string
  icon: LucideIcon
}

const stats: StatItem[] = [
  { value: 12, label: { fr: "Projets", en: "Projects" }, icon: Award },
  { value: 14, label: { fr: "Pays", en: "Countries" }, icon: Globe },
  { value: 175, label: { fr: "Budget", en: "Budget" }, suffix: "K€", icon: Coins },
  { value: 9, label: { fr: "Projets Majeurs", en: "Major Projects" }, icon: Star }
]
```

**Animation :**
- Comptage progressif au scroll (intersection observer)
- Durée: 2 secondes
- Easing: ease-out

### 4. Section Jeunesse & Tech (`components/home/youth-tech-section.tsx`)

**Inspiré de `step-two.tsx` actuel**

```typescript
const technologies = [
  { id: "ai", name: "Intelligence Artificielle", icon: Brain, color: "violet" },
  { id: "mobile", name: "Applications Mobiles", icon: Smartphone, color: "emerald" },
  { id: "security", name: "Sécurité & Blockchain", icon: Shield, color: "red" },
  { id: "web", name: "Plateformes Web", icon: Globe, color: "orange" },
  { id: "languages", name: "Langues Locales", icon: Languages, color: "amber" },
  { id: "youth", name: "Leadership Jeunesse", icon: Users, color: "blue" }
]
```

**Design :**
- Grille 3x2 sur desktop, 2x3 sur tablette, 1x6 sur mobile
- Cards avec gradient et icône
- Animation au hover

### 5. Projets phares (`components/home/featured-projects.tsx`)

**Affiche 3-4 projets mis en avant**

```typescript
interface FeaturedProjectsProps {
  lang: string
  projects: Project[]
  count?: number // défaut: 4
}
```

**Pour chaque projet :**
- Image du projet
- Drapeau pays + nom pays
- Nom du projet
- Barre de progression mini
- Lien vers page détail

### 6. Actualités récentes (`components/home/recent-news.tsx`)

```typescript
interface RecentNewsProps {
  lang: string
  articles: NewsArticle[]
  count?: number // défaut: 3
}
```

**Pour chaque article :**
- Thumbnail (image ou placeholder)
- Date formatée
- Titre
- Excerpt (2 lignes max)
- Lien "Lire la suite"

### 7. Section témoignages (`components/home/testimonials.tsx`)

```typescript
interface Testimonial {
  quote: { fr: string; en: string }
  author: string
  organization: string
  country: string
  countryFlag: string
}
```

**Design :**
- Carrousel ou grille
- Citation en italique
- Photo (optionnel) ou avatar par défaut
- Nom, organisation, pays

### 8. Newsletter (`components/shared/newsletter-form.tsx`)

```typescript
interface NewsletterFormProps {
  lang: string
}
```

**Éléments :**
- Titre accrocheur
- Input email
- Bouton submit
- Message de succès/erreur
- Note RGPD

**Note :** L'implémentation backend (API) sera définie dans PRD-08-contact.

## Données requises

### Depuis `data/projects.ts`
- Liste des 12 projets
- 4 projets "featured" à marquer

### Depuis `lib/news.ts`
- 3 articles les plus récents

### Statique
- Stats (12, 14, 175K€, 9)
- Technologies (6 items)
- Témoignages (2-3)

## Responsive

| Breakpoint | Disposition |
|------------|-------------|
| Mobile (<640px) | 1 colonne, menu hamburger |
| Tablette (640-1024px) | 2 colonnes, navigation visible |
| Desktop (>1024px) | 3-4 colonnes, layout complet |

## Animations

| Élément | Animation | Trigger |
|---------|-----------|---------|
| Compteurs | Count up | Scroll into view |
| Cards tech | Scale + shadow | Hover |
| Projets | Fade in stagger | Scroll into view |
| Particules | Pulse | Continuous |
| CTA | Arrow slide | Hover |

## SEO

```html
<title>Election Civic Tech Fund | Démocratie numérique en Afrique</title>
<meta name="description" content="175 000€ pour 12 projets innovants dans 14 pays africains. Découvrez les initiatives technologiques citoyennes pour renforcer la démocratie électorale." />
```

## Critères d'acceptation

- [ ] La navigation principale fonctionne sur toutes les pages
- [ ] Les compteurs s'animent au scroll
- [ ] La section technologies affiche 6 items avec icônes
- [ ] 4 projets phares sont affichés avec leur progression
- [ ] 3 actualités récentes sont affichées
- [ ] Le formulaire newsletter capture l'email
- [ ] Le footer affiche les 3 partenaires avec logo DDI transparent
- [ ] La page est responsive (mobile, tablette, desktop)
- [ ] Les animations sont fluides (60fps)
- [ ] La page charge en moins de 3 secondes

## Dépendances

- PRD-01 : Architecture technique
- PRD-02 : Système de contenu (pour les actualités)
- PRD-10 : Structure des données projets
