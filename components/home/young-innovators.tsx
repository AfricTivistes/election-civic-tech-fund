"use client"

import { motion } from "framer-motion"
import { Users, Target, Award, Globe, TrendingUp } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { GradientCard } from "@/components/ui/gradient-card"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { ProgressRing } from "@/components/ui/progress-ring"

const youthStats = [
  { icon: Users, value: 650, suffix: "+", label: "Jeunes directement impliqués", color: "#10b981" },
  { icon: Target, value: 2500, suffix: "+", label: "Bénéficiaires indirects formés", color: "#3b82f6" },
  { icon: Award, value: 27, suffix: " ans", label: "Âge moyen des équipes", color: "#8b5cf6" },
  { icon: Globe, value: 73, suffix: "%", label: "Porteurs de projet < 35 ans", color: "#f59e0b" },
]

const youthProjects = [
  {
    country: "Soudan du Sud",
    flag: "🇸🇸",
    project: "Electoral Fact-Checking Initiative",
    youthFocus: "Formation jeunes journalistes",
    impact: "500+ jeunes formés",
    technologies: ["Fact-checking", "Mobile", "Média"],
  },
  {
    country: "Cameroun",
    flag: "🇨🇲",
    project: "MyAIFactChecker",
    youthFocus: "IA et fact-checking",
    impact: "Première plateforme africaine",
    technologies: ["IA", "Multilingue"],
  },
  {
    country: "Bénin",
    flag: "🇧🇯",
    project: "Vigilant Civic Voice",
    youthFocus: "Participation citoyenne",
    impact: "Plateforme collaborative",
    technologies: ["Plateforme", "Multilingue", "Podcasts"],
  },
]

export function YoungInnovators() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          gradient="from-green-400 to-emerald-500"
          icon={Users}
          title="Jeunes Innovateurs"
          subtitle="La nouvelle génération transforme la démocratie africaine"
        />

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {youthStats.map((stat, index) => (
            <GradientCard key={stat.label} delay={index * 0.1}>
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            </GradientCard>
          ))}
        </motion.div>

        {/* Youth Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-400/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white text-center mb-8">
              Répartition par domaine d'impact jeunesse
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              <ProgressRing value={85} label="Formation" color="#10b981" delay={0} />
              <ProgressRing value={72} label="Technologie" color="#3b82f6" delay={0.1} />
              <ProgressRing value={68} label="Média" color="#8b5cf6" delay={0.2} />
              <ProgressRing value={90} label="Engagement" color="#f59e0b" delay={0.3} />
            </div>
          </div>
        </motion.div>

        {/* Youth Projects Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">
            Projets portés par la jeunesse
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {youthProjects.map((project, index) => (
              <GradientCard key={project.project} delay={index * 0.1}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{project.flag}</span>
                    <div>
                      <h4 className="font-bold text-white">{project.country}</h4>
                      <p className="text-green-400 text-sm">{project.project}</p>
                    </div>
                  </div>
                  <p className="text-blue-200 text-sm mb-4">{project.youthFocus}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">{project.impact}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GradientCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
