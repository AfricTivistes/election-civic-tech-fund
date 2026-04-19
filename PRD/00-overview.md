# PRD 00 - Vue d'ensemble du projet

## Contexte

Le site Election Civic Tech Fund est actuellement une plateforme de soumission de projets avec un formulaire en 4 étapes. Suite à la clôture de l'appel à projets et la sélection des 12 bénéficiaires, le site doit être transformé en **site vitrine** pour :

- Présenter le Fonds et ses porteurs
- Mettre en valeur les projets bénéficiaires
- Communiquer sur l'avancement et les actualités
- Valoriser les composantes Jeunesse et Technologie

## Objectifs de la refonte

### Objectifs principaux

1. **Transformer le site en vitrine institutionnelle** tout en conservant l'identité visuelle actuelle (gradients bleu/violet, animations, particules)

2. **Améliorer la navigation et la compréhension** avec une structure claire :
   - Présentation du projet
   - Porteurs de projet (AHEAD Africa, AfricTivistes, DDI)
   - Projets bénéficiaires

3. **Valoriser Jeunesse & Technologie** en cohérence avec l'orientation stratégique

4. **Renforcer la transparence** avec :
   - Barres de progression des projets
   - Montants alloués visibles
   - Actualités régulières

5. **Protéger les données personnelles** en retirant les emails des présentations publiques

## Parties prenantes

| Partie prenante | Rôle | Responsabilité |
|-----------------|------|----------------|
| AHEAD Africa | Porteur principal | Mène le projet |
| AfricTivistes | Conception et gestion | Design, développement, gestion du site |
| DDI (Digital Democracy Initiative) | Propulseur | Financement et support |
| 12 Bénéficiaires | Projets sélectionnés | Contenu des fiches projets |

## Budget du Fonds

- **Budget total** : 175 000€
- **Projets Majeurs (Major)** : ~15 000€ par projet (9 projets)
- **Micro-subventions (Micro)** : ~5 000€ par projet (3 projets)
- **Pays couverts** : 14 pays africains

## Pages du nouveau site

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/[lang]` | Hero, stats, projets phares, actualités récentes |
| À propos | `/[lang]/about` | Présentation Fonds, porteurs, timeline |
| Projets | `/[lang]/projects` | Liste des 12 bénéficiaires avec filtres |
| Détail projet | `/[lang]/projects/[id]` | Fiche complète + actualités du projet |
| Actualités | `/[lang]/news` | Liste des articles |
| Article | `/[lang]/news/[slug]` | Détail d'un article |
| Contact | `/[lang]/contact` | Formulaire et coordonnées |

## Langues supportées

- Français (fr) - Langue principale
- Anglais (en)

## Éléments de design à conserver

- Gradient de fond : `from-slate-900 via-blue-900 to-slate-800`
- Particules animées dorées
- Badges colorés pour les technologies
- Cartes avec effet glassmorphism (`backdrop-blur-md`, `bg-white/10`)
- Animations d'entrée (`animate-fade-in`, `animate-slide-in-left/right`)
- Palette : jaune (#facc15), bleu (#60a5fa), vert (#4ade80)

## Critères de succès

- [ ] Navigation intuitive en moins de 3 clics vers n'importe quelle information
- [ ] Temps de chargement < 3 secondes
- [ ] Design responsive (mobile-first)
- [ ] Contenu facilement modifiable via fichiers Markdown
- [ ] SEO optimisé pour chaque page
- [ ] Accessibilité WCAG 2.1 AA

## Dépendances externes

- Pas de base de données requise (contenu statique Markdown)
- Images des projets déjà présentes dans `/public/`
- Logos partenaires dans `/public/partners/`

## Risques identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Données projets incomplètes | Moyen | Définir données minimales requises |
| Logo DDI non disponible en transparent | Faible | Demander le fichier ou retoucher |
| Contenu actualités manquant | Moyen | Préparer des templates et exemples |

## Prochaines étapes

1. Valider l'architecture technique (PRD/01-architecture.md)
2. Mettre en place le système de contenu Markdown (PRD/02-content-system.md)
3. Développer page par page selon les spécifications
