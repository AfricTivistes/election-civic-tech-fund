"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  gradient: string
  icon: LucideIcon
  title: string
  subtitle: string
  delay?: number
}

export function SectionHeader({ gradient, icon: Icon, title, subtitle, delay = 0 }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center mb-4">
        <div className={`p-3 bg-gradient-to-r ${gradient} rounded-full shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      <p className="text-blue-200 text-lg max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  )
}
