"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  lang: string
}

const navItems = [
  { href: "/", labelFr: "Accueil", labelEn: "Home" },
  { href: "/about", labelFr: "À propos", labelEn: "About" },
  { href: "/projects", labelFr: "Projets", labelEn: "Projects" },
  { href: "/news", labelFr: "Actualités", labelEn: "News" },
  { href: "/contact", labelFr: "Contact", labelEn: "Contact" },
]

export function Header({ lang }: HeaderProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === `/${lang}` || pathname === "/"
    return pathname.startsWith(`/${lang}${href}`)
  }

  const toggleLanguage = () => {
    const currentPath = pathname.replace(`/${lang}`, "") || ""
    const newLang = lang === "fr" ? "en" : "fr"
    window.location.href = `/${newLang}${currentPath}`
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <img
              src="/Logo Fonds Election Civic Tech Fund.svg"
              alt="Election Civic Tech Fund"
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-yellow-400"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                {lang === "fr" ? item.labelFr : item.labelEn}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/10"
            >
              <Globe className="w-4 h-4 mr-2" />
              {lang === "fr" ? "EN" : "FR"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  className={`text-sm font-medium ${
                    isActive(item.href)
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {lang === "fr" ? item.labelFr : item.labelEn}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
