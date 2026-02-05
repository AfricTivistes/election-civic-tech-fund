'use client'

import { motion } from 'framer-motion'

interface CountryMarkerProps {
  x: number
  y: number
  countryName: string
  flag: string
  projectCount: number
  onClick: () => void
  show: boolean
}

export function CountryMarker({ x, y, countryName, flag, projectCount, onClick, show }: CountryMarkerProps) {
  if (!show) return null

  return (
    <g
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <motion.circle
        cx={x}
        cy={y}
        r={8}
        fill="#f59e0b"
        opacity={0.3}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={6}
        fill="#f59e0b"
        opacity={0.5}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.2, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={4}
        fill="#f59e0b"
        whileHover={{
          scale: 1.5,
          fill: "#fbbf24"
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      />
    </g>
  )
}
