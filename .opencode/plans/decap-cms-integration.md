# Plan d'intégration Decap CMS - ECTF

## Contexte
Intégrer Decap CMS (ex-Netlify CMS) pour permettre l'édition des actualités (Markdown) via une interface web à `/admin/`.

**Choix validés :**
- Contenu : Actualités uniquement (`content/news/en/` et `content/news/fr/`)
- Backend : Git Gateway (Netlify Identity)
- Route admin : `public/admin/` (fichier statique)

---

## Fichiers à créer/modifier

### 1. Créer `public/admin/index.html`

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Content Manager | ECTF</title>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</head>
<body>
</body>
</html>
```

**Remarque :** On utilise le CDN Decap CMS v3.x. Le widget Netlify Identity est intégré nativement dans Decap CMS avec le backend `git-gateway`, pas besoin de script supplémentaire.

### 2. Créer `public/admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

publish_mode: editorial_workflow

media_folder: public/news
public_folder: /news

locale: "fr"

collections:
  - name: news_en
    label: "Actualités (English)"
    folder: content/news/en
    create: true
    delete: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    extension: md
    format: yaml-frontmatter
    fields:
      - label: "Titre"
        name: title
        widget: string
      - label: "Slug"
        name: slug
        widget: string
      - label: "Date"
        name: date
        widget: datetime
        format: "YYYY-MM-DD"
      - label: "Auteur"
        name: author
        widget: string
        required: false
      - label: "Extrait"
        name: excerpt
        widget: text
      - label: "Image"
        name: image
        widget: image
        required: false
      - label: "Tags"
        name: tags
        widget: list
      - label: "Projets liés"
        name: relatedProjects
        widget: list
        required: false
      - label: "Mis en avant"
        name: featured
        widget: boolean
        default: false
      - label: "Contenu"
        name: body
        widget: markdown

  - name: news_fr
    label: "Actualités (Français)"
    folder: content/news/fr
    create: true
    delete: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    extension: md
    format: yaml-frontmatter
    fields:
      - label: "Titre"
        name: title
        widget: string
      - label: "Slug"
        name: slug
        widget: string
      - label: "Date"
        name: date
        widget: datetime
        format: "YYYY-MM-DD"
      - label: "Auteur"
        name: author
        widget: string
        required: false
      - label: "Extrait"
        name: excerpt
        widget: text
      - label: "Image"
        name: image
        widget: image
        required: false
      - label: "Tags"
        name: tags
        widget: list
      - label: "Projets liés"
        name: relatedProjects
        widget: list
        required: false
      - label: "Mis en avant"
        name: featured
        widget: boolean
        default: false
      - label: "Contenu"
        name: body
        widget: markdown
```

**Points clés de la config :**
- `publish_mode: editorial_workflow` : active le mode brouillon/review/publié
- `media_folder: public/news` : les images uploadées vont dans `public/news/`
- `public_folder: /news` : les images sont référencées avec le chemin `/news/...` dans le frontmatter
- `locale: "fr"` : interface Decap CMS en français
- Deux collections séparées `news_en` et `news_fr` (pas de mode i18n, car les noms de fichiers diffèrent entre langues)

### 3. Modifier `middleware.ts` - Exclure `/admin`

Ajouter `admin` dans le matcher d'exclusion du middleware pour que `/admin` ne soit pas redirigé par le i18n.

**Avant :**
```typescript
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
```

**Après :**
```typescript
export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|favicon.ico).*)"],
}
```

Ajouter aussi une vérification explicite dans le middleware :

**Avant (ligne ~67-73) :**
```typescript
if (
  pathname.startsWith("/_next") ||
  pathname.startsWith("/api") ||
  pathname.includes(".")
) {
  return NextResponse.next()
}
```

**Après :**
```typescript
if (
  pathname.startsWith("/_next") ||
  pathname.startsWith("/api") ||
  pathname.startsWith("/admin") ||
  pathname.includes(".")
) {
  return NextResponse.next()
}
```

---

## Prérequis Netlify (à faire manuellement)

1. **Créer un site Netlify** connecté au repo GitHub du projet
2. **Activer Netlify Identity** : Paramètres du site > Identity > Enable
3. **Configurer Git Gateway** : Identity > Services > Git Gateway > Enable
4. **Inviter les éditeurs** : Identity > Invite users (rôle "editor" ou "admin")
5. Le déploiement Vercel reste inchangé : les commits créés par Decap CMS déclenchent un rebuild Vercel automatiquement

## Pour le développement local

Pour tester Decap CMS en local, ajouter temporairement dans `config.yml` :

```yaml
backend:
  name: git-gateway
  branch: main
  # Pour développement local uniquement :
  # local_backend: true
```

Puis lancer le proxy local :
```bash
npx decap-server
```

Et démarrer le dev Next.js sur le port 5000. Le CMS sera accessible à `http://localhost:5000/admin/`.

---

## Résumé des modifications

| Fichier | Action |
|---------|--------|
| `public/admin/index.html` | Créer |
| `public/admin/config.yml` | Créer |
| `middleware.ts` | Modifier (2 changements) |