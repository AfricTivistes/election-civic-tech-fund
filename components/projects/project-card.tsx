"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Project } from "@/types/project"
import { Globe, ArrowRight, Clock } from "lucide-react"

interface ProjectCardProps {
  project: Project
  lang: string
}

export function ProjectCard({ project, lang }: ProjectCardProps) {
  const t = {
    fr: {
      major: "Majeur",
      micro: "Micro",
      monthsLeft: "mois restants",
      viewProject: "Voir le projet",
      budget: "Budget",
    },
    en: {
      major: "Major",
      micro: "Micro",
      monthsLeft: "months left",
      viewProject: "View project",
      budget: "Budget",
    },
  }

  const text = t[lang as "fr" | "en"]

  const remainingMonths = Math.max(
    0,
    Math.ceil(
      (new Date(project.endDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24 * 30)
    )
  )

  return (
    <Link href={`/${lang}/projects/${project.id}`}>
      <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden h-full">
        <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-600">
          {project.projectImage ? (
            <Image
              src={project.projectImage}
              alt={project.projectName[lang as "fr" | "en"]}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Globe className="w-12 h-12 text-white/30" />
            </div>
          )}

          <div className="absolute top-3 right-3">
            <Badge
              className={
                project.category === "major"
                  ? "bg-yellow-500 text-black"
                  : "bg-blue-500 text-white"
              }
            >
              {project.category === "major" ? text.major : text.micro}
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3">
            <span className="text-2xl drop-shadow-lg">{project.countryFlag}</span>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-blue-300">
              {lang === "fr" ? project.country.fr : project.country.en}
            </span>
          </div>

          <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
            {lang === "fr" ? project.projectName.fr : project.projectName.en}
          </h3>

          <p className="text-blue-200 text-sm mb-4 line-clamp-2">
            {lang === "fr" ? project.description.fr : project.description.en}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {(lang === "fr" ? project.technologies.fr : project.technologies.en)
              .slice(0, 3)
              .map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs border-purple-400/50 text-purple-300 bg-purple-400/10"
                >
                  {tech}
                </Badge>
              ))}
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-white/10">
            <span className="text-white text-sm flex items-center group-hover:translate-x-1 transition-transform">
              {text.viewProject}
              <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
