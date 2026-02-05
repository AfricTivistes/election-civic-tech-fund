"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Globe, Target, Zap, Users, Wallet, FolderKanban, Award } from "lucide-react"
import Link from "next/link"
import { AnimatedCounter } from "@/components/shared/animated-counter"

interface HeroSectionProps {
  lang: string
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = {
    fr: {
      title: "Election Civic Tech Fund",
      subtitle: "Transformer la démocratie africaine par l'innovation technologique",
      description: "175 000€ pour 12 projets innovants dans 14 pays africains, portés par la jeunesse et propulsés par la technologie.",
      ctaPrimary: "Découvrir les projets",
      ctaSecondary: "En savoir plus",
    },
    en: {
      title: "Election Civic Tech Fund",
      subtitle: "Transforming African democracy through technological innovation",
      description: "€175,000 for 12 innovative projects across 14 African countries, driven by youth and powered by technology.",
      ctaPrimary: "Discover the projects",
      ctaSecondary: "Learn more",
    },
  }

  const text = t[lang as "fr" | "en"] || t.fr

  const stats = [
    { icon: Wallet, value: 175, suffix: "K€", label: lang === "fr" ? "Budget" : "Budget" },
    { icon: FolderKanban, value: 12, suffix: "", label: lang === "fr" ? "Projets" : "Projects" },
    { icon: Globe, value: 14, suffix: "", label: lang === "fr" ? "Pays" : "Countries" },
    { icon: Users, value: 650, suffix: "+", label: lang === "fr" ? "Jeunes" : "Youth" },
  ]

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
      
{/* Animated particles background - Valeurs déterministes pour éviter l'hydratation */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { left: 15, top: 20, duration: 3.5, delay: 0 },
        { left: 25, top: 45, duration: 4.2, delay: 0.3 },
        { left: 35, top: 70, duration: 3.8, delay: 0.6 },
        { left: 45, top: 15, duration: 4.5, delay: 0.9 },
        { left: 55, top: 55, duration: 3.2, delay: 1.2 },
        { left: 65, top: 30, duration: 4.0, delay: 0.2 },
        { left: 75, top: 75, duration: 3.7, delay: 0.5 },
        { left: 85, top: 40, duration: 4.3, delay: 0.8 },
        { left: 10, top: 60, duration: 3.4, delay: 1.1 },
        { left: 20, top: 85, duration: 4.1, delay: 1.4 },
        { left: 30, top: 10, duration: 3.9, delay: 0.4 },
        { left: 40, top: 35, duration: 4.4, delay: 0.7 },
        { left: 50, top: 80, duration: 3.3, delay: 1.0 },
        { left: 60, top: 25, duration: 4.6, delay: 1.3 },
        { left: 70, top: 50, duration: 3.6, delay: 1.5 },
        { left: 80, top: 65, duration: 4.2, delay: 0.1 },
        { left: 90, top: 15, duration: 3.8, delay: 0.4 },
        { left: 5, top: 45, duration: 4.0, delay: 0.7 },
        { left: 95, top: 55, duration: 3.5, delay: 1.0 },
        { left: 50, top: 5, duration: 4.3, delay: 1.2 },
      ].map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {lang === "fr" ? "Édition 2025" : "2025 Edition"}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400">
              {text.title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-white font-semibold mb-4 max-w-3xl mx-auto"
          >
            {text.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto"
          >
            {text.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href={`/${lang}/projects`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all"
              >
                {text.ctaPrimary}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href={`/${lang}/about`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                {text.ctaSecondary}
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-blue-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
