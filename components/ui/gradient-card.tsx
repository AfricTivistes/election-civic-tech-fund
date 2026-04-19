"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GradientCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function GradientCard({ children, className = "", hover = true, delay = 0 }: GradientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.3, ease: "easeOut" } } : undefined}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}
