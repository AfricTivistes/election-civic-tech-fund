"use client"

import { motion } from "framer-motion"
import { Zap, Brain, Smartphone, Link, Shield, Cpu, Target, Lightbulb, FileText, Scale } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { GradientCard } from "@/components/ui/gradient-card"
import { Progress } from "@/components/ui/progress"

const technologies = [
  {
    id: "ai",
    name: "Intelligence Artificielle",
    description: "Analyse de tendances, modération, détection de désinformation",
    icon: Brain,
    impact: 90,
    color: "from-violet-500 to-purple-500",
    projects: 4,
  },
  {
    id: "mobile",
    name: "Applications Mobiles",
    description: "Accessibilité universelle des électeurs",
    icon: Smartphone,
    impact: 95,
    color: "from-emerald-500 to-green-500",
    projects: 8,
  },
  {
    id: "blockchain",
    name: "Blockchain",
    description: "Sécurisation et transparence des données électorales",
    icon: Link,
    impact: 85,
    color: "from-blue-500 to-cyan-500",
    projects: 2,
  },
  {
    id: "web",
    name: "Plateformes Web Open-Source",
    description: "Solutions collaboratives et transparentes",
    icon: Target,
    impact: 80,
    color: "from-orange-500 to-red-500",
    projects: 6,
  },
  {
    id: "security",
    name: "Sécurité Numérique",
    description: "Protection des données et cybersécurité",
    icon: Shield,
    impact: 88,
    color: "from-red-500 to-pink-500",
    projects: 5,
  },
  {
    id: "local",
    name: "Langues Locales & Accessibilité",
    description: "Inclusion numérique pour tous",
    icon: Cpu,
    impact: 92,
    color: "from-amber-500 to-yellow-500",
    projects: 7,
  },
]

const domains = [
  {
    id: "tech",
    title: "Technologies Citoyennes",
    description: "Blockchain, IA, civic tech",
    icon: Lightbulb,
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "engagement",
    title: "Engagement Citoyen",
    description: "Éducation, observation, inclusion",
    icon: Target,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "media",
    title: "Médias & Information",
    description: "Fact-checking, anti-désinformation",
    icon: FileText,
    color: "from-purple-400 to-pink-500",
  },
  {
    id: "legal",
    title: "Cadre Légal",
    description: "Réformes, contentieux, veille",
    icon: Scale,
    color: "from-orange-400 to-red-500",
  },
]

export function InnovationShowcase() {
  const globalImpact = Math.round(
    technologies.reduce((sum, tech) => sum + tech.impact, 0) / technologies.length
  )

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-900/20 to-transparent">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          gradient="from-blue-500 to-cyan-500"
          icon={Zap}
          title="Innovation Technologique"
          subtitle="L'ADN des projets du Fonds"
        />

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
        >
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon
            return (
              <GradientCard key={tech.id} delay={index * 0.1}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${tech.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">{tech.impact}%</span>
                  </div>
                  <h4 className="font-bold text-white mb-2">{tech.name}</h4>
                  <p className="text-blue-200 text-sm mb-4">{tech.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <Progress value={tech.impact} className="h-2" />
                    </div>
                    <span className="text-blue-300 text-xs">{tech.projects} projets</span>
                  </div>
                </div>
              </GradientCard>
            )
          })}
        </motion.div>

        {/* Global Impact Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-md border border-blue-400/20 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-6">
              Score Global d'Innovation
            </h3>
            <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 mb-4">
              {globalImpact}%
            </div>
            <p className="text-blue-200 mb-6">
              Impact moyen des technologies utilisées par les projets
            </p>
            <div className="max-w-md mx-auto">
              <Progress value={globalImpact} className="h-3" />
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech.id}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full"
                >
                  {tech.name.split(" ")[0]}: {tech.impact}%
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Domain Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">
            Répartition par domaine
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, index) => {
              const IconComponent = domain.icon
              return (
                <GradientCard key={domain.id} delay={index * 0.1}>
                  <div className="p-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${domain.color} w-fit mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-white mb-2">{domain.title}</h4>
                    <p className="text-blue-200 text-sm mb-4">{domain.description}</p>
                  </div>
                </GradientCard>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
