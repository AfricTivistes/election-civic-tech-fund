"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { QuoteCard } from "@/components/ui/quote-card"

const testimonials = [
  {
    quote: "Avant ce projet, les jeunes journalistes ne savaient pas comment vérifier les informations électorales. Aujourd'hui, nous formons une nouvelle génération de fact-checkers qui peuvent détecter la désinformation en temps réel.",
    author: "Équipe Excellence Foundation",
    organization: "Electoral Fact-Checking Initiative",
    country: "Soudan du Sud",
  },
  {
    quote: "L'IA nous permet de détecter la désinformation en temps réel. C'est révolutionnaire pour notre démocratie. Nous sommes la première plateforme africaine multilingue de vérification des faits.",
    author: "Brain Builders Youth Development",
    organization: "MyAIFactChecker Cameroon",
    country: "Cameroun",
  },
  {
    quote: "Notre plateforme multilingue donne une voix aux communautés qui étaient exclues du débat électoral. Nous croyons que chaque citoyen mérite d'être entendu, quelle que soit sa langue.",
    author: "Association des Blogueurs du Bénin",
    organization: "Vigilant Civic Voice",
    country: "Bénin",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          gradient="from-purple-400 to-pink-500"
          icon={MessageCircle}
          title="Ils Transforment la Démocratie"
          subtitle="Les porteurs de projet partagent leur vision"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <QuoteCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              organization={testimonial.organization}
              country={testimonial.country}
              delay={index * 0.15}
            />
          ))}
        </motion.div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-400/20 rounded-xl px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-purple-300 text-sm">Projets innovants</div>
            </div>
            <div className="w-px h-12 bg-purple-400/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">9</div>
              <div className="text-purple-300 text-sm">Pays africains</div>
            </div>
            <div className="w-px h-12 bg-purple-400/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">650+</div>
              <div className="text-purple-300 text-sm">Jeunes engagés</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
