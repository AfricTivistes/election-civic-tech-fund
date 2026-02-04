"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface QuoteCardProps {
  quote: string
  author: string
  organization: string
  country: string
  delay?: number
}

export function QuoteCard({ quote, author, organization, country, delay = 0 }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-400/20 rounded-xl p-8 relative"
    >
      <Quote className="w-10 h-10 text-purple-400/30 absolute top-4 left-4" />
      <div className="relative z-10">
        <p className="text-white text-lg leading-relaxed mb-6 italic">
          "{quote}"
        </p>
        <div className="border-t border-purple-400/20 pt-4">
          <p className="text-purple-300 font-semibold">{author}</p>
          <p className="text-blue-300 text-sm">{organization}, {country}</p>
        </div>
      </div>
    </motion.div>
  )
}
