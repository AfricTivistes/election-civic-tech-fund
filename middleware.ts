import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Liste des langues supportées
const supportedLocales = ["en", "fr"]
const defaultLocale = "en" // Changé de "fr" à "en" comme fallback

// Fonction pour détecter la langue préférée du navigateur
function getLocaleFromHeaders(request: NextRequest): string {
  // Vérifier si la langue est déjà stockée dans un cookie
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value
  if (localeCookie && supportedLocales.includes(localeCookie)) {
    return localeCookie
  }

  // Détecter la langue du navigateur
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    // Parser l'en-tête Accept-Language plus précisément
    const parsedLocales = acceptLanguage
      .split(",")
      .map((locale) => {
        const [lang, q = "1"] = locale.trim().split(";q=")
        // Extraire le code de langue principal (ex: "fr-FR" -> "fr")
        const langCode = lang.split("-")[0].toLowerCase()
        return { lang: langCode, q: Number.parseFloat(q) || 1 }
      })
      .filter((locale) => !isNaN(locale.q)) // Filtrer les valeurs q invalides

    // Trier par préférence (q) décroissante
    parsedLocales.sort((a, b) => b.q - a.q)

    // Trouver la première langue supportée
    for (const locale of parsedLocales) {
      if (supportedLocales.includes(locale.lang)) {
        console.log(`Detected browser language: ${locale.lang} (q=${locale.q})`)
        return locale.lang
      }
    }

    // Si français est détecté dans n'importe quelle variante (fr, fr-FR, fr-CA, etc.)
    const hasFrench = parsedLocales.some((locale) => locale.lang === "fr" || locale.lang.startsWith("fr"))
    if (hasFrench) {
      console.log("French variant detected, using 'fr'")
      return "fr"
    }

    console.log(`No supported language found in: ${acceptLanguage}, using default: ${defaultLocale}`)
  } else {
    console.log("No Accept-Language header found, using default:", defaultLocale)
  }

  return defaultLocale
}

// Ajouter des vérifications supplémentaires dans le middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérification supplémentaire pour s'assurer que pathname n'est pas null
  if (!pathname) {
    console.log("No pathname found, redirecting to default locale")
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // Ignorer les requêtes pour les fichiers statiques et API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // fichiers statiques comme images, css, etc.
  ) {
    return NextResponse.next()
  }

  // Vérifier si l'URL contient déjà un préfixe de langue
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // Si l'URL n'a pas de préfixe de langue, rediriger vers la langue préférée
  if (!pathnameHasLocale) {
    const detectedLocale = getLocaleFromHeaders(request)
    const newUrl = new URL(`/${detectedLocale}${pathname === "/" ? "" : pathname}`, request.url)

    // Conserver les paramètres de requête
    request.nextUrl.searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value)
    })

    console.log(`Redirecting from ${pathname} to ${newUrl.pathname} (detected locale: ${detectedLocale})`)

    // Créer une réponse avec la redirection
    const response = NextResponse.redirect(newUrl)

    // Stocker la langue dans un cookie pour les futures requêtes
    response.cookies.set("NEXT_LOCALE", detectedLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 an
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return response
  }

  // Si l'URL a déjà un préfixe de langue, mettre à jour le cookie si nécessaire
  const currentLocale = pathname.split("/")[1]
  if (supportedLocales.includes(currentLocale)) {
    const response = NextResponse.next()

    // Mettre à jour le cookie avec la langue actuelle
    response.cookies.set("NEXT_LOCALE", currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 an
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
