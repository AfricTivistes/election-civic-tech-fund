"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

interface CTASectionProps {
  lang: string
}

export function CTASection({ lang }: CTASectionProps) {
  const t = {
    fr: {
      title: "Rejoignez le Mouvement",
      subtitle: "Découvrez les 12 projets qui transforment la démocratie en Afrique",
      button: "Explorer les Projets",
    },
    en: {
      title: "Join the Movement",
      subtitle: "Discover the 12 projects transforming democracy in Africa",
      button: "Explore Projects",
    },
  }

  const text = t[lang as "fr" | "en"] || t.fr

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-blue-400/20 to-green-400/20 animate-gradient-shift" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <div className="p-4 bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 rounded-full shadow-lg shadow-yellow-400/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-6">
            {text.title}
          </h2>
          
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            {text.subtitle}
          </p>

          <Link href={`/${lang}/projects`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-shadow"
            >
              {text.button}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
    </section>
  )
}
