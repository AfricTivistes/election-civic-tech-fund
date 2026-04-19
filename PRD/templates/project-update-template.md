# Template - Actualité Projet

Ce fichier sert de modèle pour créer des actualités liées à un projet spécifique.

## Instructions

1. Copier ce template dans `/content/projects/fr/updates/` ou `/content/projects/en/updates/`
2. Renommer le fichier au format : `project-[ID]-[slug].md`
3. Remplir le frontmatter et le contenu
4. Commit et push

---

## Template à copier

```markdown
---
title: "Titre de l'actualité projet"
slug: "project-[ID]-update-[mois]-[annee]"
date: "2025-MM-DD"
projectId: "[ID]"
excerpt: "Résumé de l'avancement en 1-2 phrases."
image: "/projects/updates/nom-image.jpg"
tags:
  - pays
  - thematique
---

# Titre de l'actualité

Introduction contextualisant cette mise à jour du projet.

## Réalisations

Décrivez les accomplissements récents :

- **Réalisation 1** : Détails...
- **Réalisation 2** : Détails...
- **Réalisation 3** : Détails...

## Chiffres clés

| Indicateur | Valeur |
|------------|--------|
| Personnes formées | X |
| Événements organisés | Y |
| Couverture médiatique | Z articles |

## Défis rencontrés (optionnel)

Description des obstacles et comment ils ont été surmontés...

## Témoignage (optionnel)

> "Citation d'un bénéficiaire ou participant."
> — Nom, Rôle

## Prochaines étapes

1. Prochaine action planifiée
2. Objectif à court terme
3. Jalon à atteindre

## Galerie (optionnel)

![Description image 1](/projects/updates/image1.jpg)
*Légende de l'image 1*

![Description image 2](/projects/updates/image2.jpg)
*Légende de l'image 2*
```

---

## Champs du frontmatter

| Champ | Obligatoire | Type | Description |
|-------|-------------|------|-------------|
| `title` | Oui | string | Titre de l'actualité |
| `slug` | Oui | string | Format : `project-[ID]-[description]` |
| `date` | Oui | string | Format ISO : YYYY-MM-DD |
| `projectId` | Oui | string | ID du projet (1-12) |
| `excerpt` | Oui | string | Résumé court |
| `image` | Non | string | Chemin vers l'image |
| `tags` | Non | array | Tags pour le filtrage |

## Correspondance ID - Projet

| ID | Projet | Pays |
|----|--------|------|
| 1 | Electoral Fact-Checking Initiative | 🇸🇸 Soudan du Sud |
| 2 | Vigilant Civic Voice | 🇧🇯 Bénin |
| 3 | MyAIFactChecker Cameroon | 🇨🇲 Cameroun |
| 4 | Plateforme électorale citoyenne | 🇸🇳 Sénégal |
| 5 | PACTE | 🇬🇳 Guinée |
| 6 | My Vote My Voice 2.0 | 🇨🇲 Cameroun |
| 7 | Veille juridique jeunes | 🇲🇷 Mauritanie |
| 8 | SENEGAL VOTE CIVICRISE | 🇸🇳 Sénégal |
| 9 | Renforcement OSC Amhara | 🇪🇹 Éthiopie |
| 10 | DoorashoKaab | 🇸🇴 Somalie |
| 11 | Inclusive Voices | 🇸🇴 Somalie |
| 12 | Digital Empowerment Ethiopia | 🇪🇹 Éthiopie |

## Exemple complet

```markdown
---
title: "MyAIFactChecker : Formation de 50 vérificateurs IA"
slug: "project-3-formation-verificateurs-mars-2025"
date: "2025-03-20"
projectId: "3"
excerpt: "Le projet MyAIFactChecker a formé ses 50 premiers vérificateurs à l'utilisation de l'intelligence artificielle pour le fact-checking électoral."
image: "/projects/updates/cameroun-formation-ia.jpg"
tags:
  - cameroun
  - intelligence-artificielle
  - formation
  - fact-checking
---

# Formation de 50 vérificateurs IA au Cameroun

L'équipe de **MyAIFactChecker Cameroon** a organisé du 15 au 18 mars 2025 sa première session de formation intensive...

## Réalisations

- **50 journalistes formés** à l'utilisation de la plateforme myaifactchecker.org
- **3 langues couvertes** : français, anglais, et langues locales
- **10 médias partenaires** engagés dans le réseau de fact-checking

## Chiffres clés

| Indicateur | Valeur |
|------------|--------|
| Participants | 50 |
| Jours de formation | 4 |
| Fake news analysées | 25 |
| Taux de satisfaction | 92% |

## Témoignage

> "Cette formation m'a donné les outils pour vérifier rapidement les informations avant de les publier. L'IA nous fait gagner un temps précieux."
> — Marie Nguemo, Journaliste, Cameroon Tribune

## Prochaines étapes

1. **Avril 2025** : Lancement public de la plateforme
2. **Mai 2025** : Formation de 100 journalistes supplémentaires
3. **Juin 2025** : Couverture des primaires électorales

![Formation en cours](/projects/updates/formation-ia-1.jpg)
*Les participants découvrent l'interface de myaifactchecker.org*
```

## Bonnes pratiques

1. **Régularité** : Publier une mise à jour par mois par projet
2. **Concret** : Inclure des chiffres et des réalisations tangibles
3. **Visuel** : Ajouter des photos quand possible
4. **Humain** : Inclure des témoignages de bénéficiaires
5. **Prospectif** : Toujours mentionner les prochaines étapes
