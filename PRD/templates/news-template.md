# Template - Article Actualité

Ce fichier sert de modèle pour créer de nouvelles actualités.

## Instructions

1. Copier ce template dans `/content/news/fr/` ou `/content/news/en/`
2. Renommer le fichier au format : `YYYY-MM-DD-slug.md`
3. Remplir le frontmatter et le contenu
4. Commit et push

---

## Template à copier

```markdown
---
title: "Titre de l'article"
slug: "slug-url-friendly"
date: "2025-MM-DD"
author: "Équipe AfricTivistes"
excerpt: "Résumé de l'article en 1-2 phrases (max 160 caractères pour SEO)."
image: "/news/nom-image.jpg"
tags:
  - tag1
  - tag2
  - tag3
relatedProjects:
  - "1"  # ID du projet lié (optionnel)
  - "3"
featured: false
---

# Titre de l'article

Introduction de l'article. Contextualisez le sujet et captez l'attention du lecteur.

## Sous-titre 1

Développez le premier point...

### Sous-sous-titre (si nécessaire)

Détails supplémentaires...

## Sous-titre 2

Développez le deuxième point...

## Chiffres clés (optionnel)

- **X** participants formés
- **Y** pays représentés
- **Z** heures de formation

## Citation (optionnel)

> "Citation d'un participant ou d'un responsable."
> — Nom, Organisation

## Prochaines étapes

1. Première étape à venir
2. Deuxième étape
3. Troisième étape

---

*Pour plus d'informations, [contactez-nous](/contact) ou suivez nos [actualités](/news).*
```

---

## Champs du frontmatter

| Champ | Obligatoire | Type | Description |
|-------|-------------|------|-------------|
| `title` | Oui | string | Titre de l'article |
| `slug` | Oui | string | URL-friendly, sans accents ni espaces |
| `date` | Oui | string | Format ISO : YYYY-MM-DD |
| `author` | Non | string | Nom de l'auteur |
| `excerpt` | Oui | string | Résumé court (max 160 car.) |
| `image` | Non | string | Chemin vers l'image de couverture |
| `tags` | Non | array | Liste de tags pour le filtrage |
| `relatedProjects` | Non | array | IDs des projets liés |
| `featured` | Non | boolean | Si true, mis en avant sur la page |

## Tags suggérés

- `lancement` - Annonces de lancement
- `formation` - Ateliers et formations
- `partenariat` - Nouveaux partenaires
- `rapport` - Rapports et bilans
- `cameroun`, `senegal`, `guinee`, etc. - Par pays
- `fact-checking` - Thématique vérification
- `jeunesse` - Focus jeunesse
- `technologie` - Innovation tech

## Bonnes pratiques

1. **Titre** : Court et accrocheur (60-70 caractères max)
2. **Excerpt** : Résumé complet mais concis
3. **Images** : Ratio 16:9, min 1200x675px
4. **Liens** : Utiliser des liens relatifs (`/projects/1`)
5. **Tags** : 3-5 tags maximum
6. **Projets liés** : Ajouter si l'article concerne un projet spécifique

## Exemple complet

```markdown
---
title: "Atelier de lancement au Cameroun : deux projets, une vision commune"
slug: "atelier-lancement-cameroun-2025"
date: "2025-02-15"
author: "Équipe AfricTivistes"
excerpt: "Les équipes de MyAIFactChecker et My Vote My Voice se sont réunies à Yaoundé pour lancer officiellement leurs initiatives."
image: "/news/cameroun-atelier-2025.jpg"
tags:
  - lancement
  - cameroun
  - formation
  - fact-checking
relatedProjects:
  - "3"
  - "6"
featured: true
---

# Atelier de lancement au Cameroun

Les 14 et 15 février 2025, les équipes des deux projets camerounais soutenus par l'Election Civic Tech Fund se sont réunies à Yaoundé...

## Une collaboration prometteuse

Les projets **MyAIFactChecker Cameroon** et **My Vote My Voice 2.0** partagent...

## Participants

Plus de 50 personnes ont participé à l'atelier, dont :
- 30 jeunes journalistes
- 15 représentants de la société civile
- 5 formateurs

> "Cette initiative nous donne les moyens de lutter efficacement contre la désinformation."
> — Participant, atelier de Yaoundé

## Prochaines étapes

1. Formation des premiers fact-checkers (Mars 2025)
2. Lancement de la plateforme IA (Avril 2025)
3. Campagne de sensibilisation nationale (Mai 2025)
```
