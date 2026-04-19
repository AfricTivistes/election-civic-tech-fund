# PRD 08 - Page Contact

## Objectif

Permettre aux visiteurs de contacter l'équipe du Fonds via un formulaire de contact et leur fournir les coordonnées des organisations partenaires.

## URL

- `/fr/contact`
- `/en/contact`

## Wireframe textuel

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (commun)                                                 │
├─────────────────────────────────────────────────────────────────┤
│ HERO CONTACT                                                    │
│                                                                 │
│     NOUS CONTACTER                                              │
│     "Une question ? Une suggestion ? Écrivez-nous !"           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ CONTENU PRINCIPAL (2 colonnes sur desktop)                      │
│                                                                 │
│   ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│   │ FORMULAIRE DE CONTACT   │  │ COORDONNÉES                 │  │
│   │                         │  │                             │  │
│   │ Nom *                   │  │ ┌─────────────────────────┐ │  │
│   │ [                    ]  │  │ │ AHEAD Africa            │ │  │
│   │                         │  │ │ Mène le projet          │ │  │
│   │ Email *                 │  │ │                         │ │  │
│   │ [                    ]  │  │ │ 📧 contact@aheadafrica  │ │  │
│   │                         │  │ │ 🌐 aheadafrica.org      │ │  │
│   │ Organisation            │  │ └─────────────────────────┘ │  │
│   │ [                    ]  │  │                             │  │
│   │                         │  │ ┌─────────────────────────┐ │  │
│   │ Sujet *                 │  │ │ AfricTivistes           │ │  │
│   │ [Question générale  ▾]  │  │ │ Gestion de la plateforme│ │  │
│   │                         │  │ │                         │ │  │
│   │ Message *               │  │ │ 📧 contact@africtivistes│ │  │
│   │ ┌─────────────────────┐ │  │ │ 🌐 africtivistes.org    │ │  │
│   │ │                     │ │  │ └─────────────────────────┘ │  │
│   │ │                     │ │  │                             │  │
│   │ │                     │ │  │ ┌─────────────────────────┐ │  │
│   │ │                     │ │  │ │ DDI                     │ │  │
│   │ └─────────────────────┘ │  │ │ Financement             │ │  │
│   │                         │  │ │                         │ │  │
│   │ ☐ J'accepte la politique│  │ │ 🌐 ddi.org              │ │  │
│   │   de confidentialité    │  │ └─────────────────────────┘ │  │
│   │                         │  │                             │  │
│   │ [    Envoyer →    ]     │  │ ─────────────────────────── │  │
│   │                         │  │                             │  │
│   │ * Champs obligatoires   │  │ RÉSEAUX SOCIAUX             │  │
│   │                         │  │                             │  │
│   └─────────────────────────┘  │ [Twitter] [LinkedIn]        │  │
│                                │ [Facebook] [YouTube]        │  │
│                                │                             │  │
│                                └─────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FAQ (optionnel)                                                 │
│                                                                 │
│   Questions fréquentes                                          │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ ▶ Comment puis-je postuler au Fonds ?                   │   │
│   └─────────────────────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ ▶ Quels types de projets sont éligibles ?               │   │
│   └─────────────────────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ ▶ Comment suivre l'avancement des projets ?             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ CARTE / LOCALISATION (optionnel)                                │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │            [Carte OpenStreetMap ou statique]            │   │
│   │                    Dakar, Sénégal                       │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER (commun)                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Composants à créer

### 1. Hero Contact (`components/contact/hero-contact.tsx`)

```typescript
interface HeroContactProps {
  lang: string
}
```

### 2. Formulaire de contact (`components/contact/contact-form.tsx`)

```typescript
interface ContactFormProps {
  lang: string
}

interface ContactFormData {
  name: string
  email: string
  organization?: string
  subject: string
  message: string
  privacyAccepted: boolean
}
```

**Champs :**

| Champ | Type | Obligatoire | Validation |
|-------|------|-------------|------------|
| Nom | text | Oui | Min 2 caractères |
| Email | email | Oui | Format email valide |
| Organisation | text | Non | - |
| Sujet | select | Oui | Valeur sélectionnée |
| Message | textarea | Oui | Min 10 caractères |
| Confidentialité | checkbox | Oui | Doit être coché |

**Options sujet :**
```typescript
const subjects = [
  { value: "general", label: { fr: "Question générale", en: "General question" } },
  { value: "project", label: { fr: "À propos d'un projet", en: "About a project" } },
  { value: "partnership", label: { fr: "Proposition de partenariat", en: "Partnership proposal" } },
  { value: "media", label: { fr: "Demande média/presse", en: "Media/press inquiry" } },
  { value: "other", label: { fr: "Autre", en: "Other" } }
]
```

### 3. Card Organisation (`components/contact/organization-card.tsx`)

```typescript
interface OrganizationCardProps {
  organization: {
    name: string
    role: { fr: string; en: string }
    email?: string
    website: string
    logo: string
  }
  lang: string
}
```

### 4. Réseaux sociaux (`components/contact/social-links.tsx`)

```typescript
interface SocialLinksProps {
  links: {
    twitter?: string
    facebook?: string
    linkedin?: string
    youtube?: string
    instagram?: string
  }
  lang: string
}
```

### 5. FAQ Accordion (`components/contact/faq-accordion.tsx`)

```typescript
interface FAQItem {
  question: { fr: string; en: string }
  answer: { fr: string; en: string }
}

interface FAQAccordionProps {
  items: FAQItem[]
  lang: string
}
```

## API Contact

### Route API (`app/api/contact/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  organization?: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactPayload = await request.json()
    
    // Validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Option 1: Envoi email via service tiers (Resend, SendGrid, etc.)
    // Option 2: Stockage dans un service externe
    // Option 3: Notification Slack/Discord
    
    // Pour MVP: Log + réponse succès
    console.log('Contact form submission:', data)
    
    // TODO: Implémenter l'envoi réel
    // await sendEmail({
    //   to: 'contact@africtivistes.org',
    //   subject: `[Contact Form] ${data.subject}`,
    //   html: `...`
    // })
    
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Intégration email (optionnel)

Pour l'envoi réel d'emails, envisager :

1. **Resend** (recommandé)
```bash
npm install resend
```

2. **SendGrid**
```bash
npm install @sendgrid/mail
```

3. **Nodemailer** (SMTP)
```bash
npm install nodemailer
```

## Données des organisations

```typescript
const organizations = [
  {
    name: "AHEAD Africa",
    role: { fr: "Mène le projet", en: "Leads the project" },
    email: "contact@aheadafrica.org",
    website: "https://aheadafrica.org",
    logo: "/partners/ahead-africa.webp"
  },
  {
    name: "AfricTivistes",
    role: { fr: "Gestion de la plateforme", en: "Platform management" },
    email: "contact@africtivistes.org",
    website: "https://africtivistes.org",
    logo: "/logo-africtivites.svg"
  },
  {
    name: "Digital Democracy Initiative",
    role: { fr: "Financement", en: "Funding" },
    website: "https://...",
    logo: "/partners/ddi-logo.png"  // Version transparente
  }
]
```

## Données réseaux sociaux

```typescript
const socialLinks = {
  twitter: "https://twitter.com/africtivistes",
  facebook: "https://facebook.com/africtivistes",
  linkedin: "https://linkedin.com/company/africtivistes",
  youtube: "https://youtube.com/@africtivistes"
}
```

## Questions FAQ

```typescript
const faqItems: FAQItem[] = [
  {
    question: {
      fr: "Comment puis-je postuler au Fonds ?",
      en: "How can I apply to the Fund?"
    },
    answer: {
      fr: "L'appel à projets est actuellement fermé. Les 12 bénéficiaires ont été sélectionnés. Suivez nos actualités pour être informé des prochains appels.",
      en: "The call for projects is currently closed. The 12 beneficiaries have been selected. Follow our news to be informed about future calls."
    }
  },
  {
    question: {
      fr: "Quels types de projets sont éligibles ?",
      en: "What types of projects are eligible?"
    },
    answer: {
      fr: "Le Fonds soutient des projets technologiques citoyens visant à renforcer les processus électoraux en Afrique : fact-checking, plateformes de transparence, applications de participation citoyenne, etc.",
      en: "The Fund supports citizen technology projects aimed at strengthening electoral processes in Africa: fact-checking, transparency platforms, citizen participation applications, etc."
    }
  },
  {
    question: {
      fr: "Comment suivre l'avancement des projets ?",
      en: "How can I follow project progress?"
    },
    answer: {
      fr: "Visitez la page Projets pour découvrir chaque initiative et suivre son avancement. Les actualités sont régulièrement mises à jour dans la section Actualités.",
      en: "Visit the Projects page to discover each initiative and track its progress. News is regularly updated in the News section."
    }
  },
  {
    question: {
      fr: "Puis-je soutenir le Fonds ou ses projets ?",
      en: "Can I support the Fund or its projects?"
    },
    answer: {
      fr: "Pour toute proposition de partenariat ou de soutien, utilisez le formulaire de contact ci-dessus ou contactez directement AfricTivistes.",
      en: "For any partnership or support proposal, use the contact form above or contact AfricTivistes directly."
    }
  }
]
```

## État du formulaire

```typescript
interface FormState {
  status: "idle" | "submitting" | "success" | "error"
  message?: string
}

// Gestion côté client
const [formState, setFormState] = useState<FormState>({ status: "idle" })

const handleSubmit = async (data: ContactFormData) => {
  setFormState({ status: "submitting" })
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      setFormState({ 
        status: "success", 
        message: "Votre message a été envoyé avec succès !" 
      })
      // Reset form
    } else {
      throw new Error('Failed to send')
    }
  } catch (error) {
    setFormState({ 
      status: "error", 
      message: "Une erreur est survenue. Veuillez réessayer." 
    })
  }
}
```

## SEO

```html
<title>Contact | Election Civic Tech Fund</title>
<meta name="description" content="Contactez l'équipe de l'Election Civic Tech Fund. Questions, partenariats, demandes média - nous sommes à votre écoute." />
```

## Critères d'acceptation

- [ ] Le formulaire valide les champs obligatoires
- [ ] Le formulaire affiche les erreurs de validation
- [ ] L'envoi du formulaire fonctionne (API)
- [ ] Le message de succès s'affiche après envoi
- [ ] Les coordonnées des 3 organisations sont affichées
- [ ] Les liens vers les sites web fonctionnent
- [ ] Les réseaux sociaux sont liés
- [ ] La FAQ est fonctionnelle (accordéon)
- [ ] La politique de confidentialité est liée
- [ ] La page est responsive
- [ ] Le formulaire est accessible (labels, focus)

## Dépendances

- PRD-01 : Architecture
- Optionnel : Service d'envoi d'emails (Resend, SendGrid)

## Notes de sécurité

- Rate limiting sur l'API contact (max 5 requêtes/minute/IP)
- Honeypot field pour anti-spam
- Sanitization des inputs
- Pas de stockage des données personnelles sans consentement
