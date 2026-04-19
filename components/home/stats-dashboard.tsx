"use client"

import { motion } from "framer-motion"
import { BarChart3, Wallet, FolderKanban, Globe, TrendingUp, Clock, Users, Award, Zap } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { GradientCard } from "@/components/ui/gradient-card"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { Progress } from "@/components/ui/progress"

const stats = [
  { icon: Wallet, value: 200, suffix: "K€", label: "Budget total", color: "#f59e0b", progress: 100 },
  { icon: FolderKanban, value: 12, suffix: "", label: "Projets sélectionnés", color: "#3b82f6", progress: 100 },
  { icon: Globe, value: 14, suffix: "", label: "Pays couverts", color: "#10b981", progress: 100 },
  { icon: TrendingUp, value: 9, suffix: "", label: "Projets majeurs", color: "#8b5cf6", progress: 75 },
  { icon: Award, value: 3, suffix: "", label: "Micro-grants", color: "#f59e0b", progress: 25 },
  { icon: Clock, value: 10, suffix: " mois", label: "Durée d'accompagnement", color: "#3b82f6", progress: 83 },
  { icon: Users, value: 650, suffix: "+", label: "Jeunes impliqués", color: "#10b981", progress: 87 },
  { icon: Zap, value: 2500, suffix: "+", label: "Bénéficiaires formés", color: "#8b5cf6", progress: 92 },
  { icon: BarChart3, value: 88, suffix: "%", label: "Score d'innovation", color: "#f59e0b", progress: 88 },
]

export function StatsDashboard() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-yellow-900/10 to-transparent">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          gradient="from-yellow-400 to-orange-500"
          icon={BarChart3}
          title="Le Fonds en Chiffres"
          subtitle="L'impact du Election Civic Tech Fund"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <GradientCard key={stat.label} delay={index * 0.08}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                  </div>
                </div>
                <p className="text-blue-200 text-sm mb-3">{stat.label}</p>
                <div className="relative">
                  <Progress value={stat.progress} className="h-2" />
                  <span className="absolute right-0 -top-5 text-xs text-blue-300">
                    {stat.progress}%
                  </span>
                </div>
              </div>
            </GradientCard>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-md border border-yellow-400/20 rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  <AnimatedCounter end={200} suffix="K€" />
                </div>
                <p className="text-blue-200">Budget total</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  <AnimatedCounter end={12} />
                </div>
                <p className="text-blue-200">Projets</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  <AnimatedCounter end={14} />
                </div>
                <p className="text-blue-200">Pays</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  <AnimatedCounter end={88} suffix="%" />
                </div>
                <p className="text-blue-200">Innovation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
