"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowRight, ArrowLeft, Plus, X, Sparkles, UserPlus } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface TeamMember {
  id: string
  name: string
  role: string
  skills: string[]
  experience: string
  motivation: string
}

interface StepThreeProps {
  data: any
  onUpdate: (data: any) => void
  onComplete: (badge: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function StepThree({ data, onUpdate, onComplete, onNext, onPrev }: StepThreeProps) {
  const { t } = useLanguage()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>((data && data.teamMembers) || [])
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    skills: [],
    experience: "",
    motivation: "",
  })

  const skillCategories = [
    {
      name: t.steps.step3.skillCategories.technical,
      color: "bg-blue-500",
      skills: t.skills.technical,
    },
    {
      name: t.steps.step3.skillCategories.social,
      color: "bg-green-500",
      skills: t.skills.social,
    },
    {
      name: t.steps.step3.skillCategories.field,
      color: "bg-orange-500",
      skills: t.skills.field,
    },
    {
      name: t.steps.step3.skillCategories.management,
      color: "bg-purple-500",
      skills: t.skills.management,
    },
  ]

  const addTeamMember = () => {
    if (newMember.name && newMember.role) {
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name || "",
        role: newMember.role || "",
        skills: newMember.skills || [],
        experience: newMember.experience || "",
        motivation: newMember.motivation || "",
      }
      setTeamMembers([...teamMembers, member])
      setNewMember({ name: "", role: "", skills: [], experience: "", motivation: "" })
    }
  }

  const removeMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const toggleSkill = (skill: string) => {
    const currentSkills = newMember.skills || []
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill]
    setNewMember({ ...newMember, skills: updatedSkills })
  }

  const getTeamStats = () => {
    const allSkills = teamMembers.flatMap((member) => member.skills || [])
    const skillCounts = skillCategories.map((category) => ({
      category: category.name,
      count: category.skills.filter((skill) => allSkills.includes(skill)).length,
      total: category.skills.length,
      color: category.color,
    }))
    return skillCounts
  }

  const handleNext = () => {
    if (teamMembers.length >= 2) {
      onUpdate({ teamMembers })
      onComplete("Community Builder")
      onNext()
    }
  }

  const isComplete = teamMembers.length >= 2

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.steps.step3.title}</h2>
        <p className="text-blue-200 text-lg">{t.steps.step3.description}</p>
      </motion.div>

      {/* Conseil d'Expert - déplacé au début */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-green-900 mb-2 text-lg">{t.steps.step3.expertTip.title}</h4>
                <p className="text-green-800 font-medium leading-relaxed">{t.steps.step3.expertTip.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team stats radar */}
      {teamMembers.length > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/30">
            <CardHeader>
              <CardTitle className="text-white">{t.steps.step3.teamStats}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getTeamStats().map((stat) => (
                  <div key={stat.category} className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-2 rounded-full ${stat.color} flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-lg">
                        {stat.count}/{stat.total}
                      </span>
                    </div>
                    <p className="text-white font-medium">{stat.category}</p>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${stat.color}`}
                        style={{ width: `${(stat.count / stat.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Existing team members */}
      {teamMembers.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">
                {t.steps.step3.teamMembers} ({teamMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 relative"
                  >
                    <Button
                      onClick={() => removeMember(member.id)}
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-white">{member.name}</h3>
                        <p className="text-blue-200 text-sm">{member.role}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {(member.skills || []).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {member.experience && <p className="text-blue-200 text-sm">{member.experience}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Add new member */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              {t.steps.step3.addMember}
            </CardTitle>
            <CardDescription className="text-blue-200">{t.steps.step3.addMemberDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  {t.steps.step3.fullName}
                </Label>
                <Input
                  id="name"
                  value={newMember.name || ""}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder={t.steps.step3.fullNamePlaceholder}
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-white">
                  {t.steps.step3.role}
                </Label>
                <Input
                  id="role"
                  value={newMember.role || ""}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder={t.steps.step3.rolePlaceholder}
                />
              </div>
            </div>

            <div>
              <Label className="text-white">{t.steps.step3.skills}</Label>
              <div className="space-y-3 mt-2">
                {skillCategories.map((category) => (
                  <div key={category.name}>
                    <h4 className="text-sm font-medium text-blue-200 mb-2">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          variant={newMember.skills?.includes(skill) ? "default" : "outline"}
                          size="sm"
                          className={`text-xs ${
                            newMember.skills?.includes(skill)
                              ? `${category.color} text-white`
                              : "border-blue-500/50 text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500/70"
                          }`}
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="experience" className="text-white">
                {t.steps.step3.experience}
              </Label>
              <Textarea
                id="experience"
                value={newMember.experience || ""}
                onChange={(e) => setNewMember({ ...newMember, experience: e.target.value })}
                className="bg-white/5 border-white/20 text-white placeholder:text-blue-300"
                placeholder={t.steps.step3.experiencePlaceholder}
              />
            </div>

            <div>
              <Label htmlFor="motivation" className="text-white">
                {t.steps.step3.motivation}
              </Label>
              <Textarea
                id="motivation"
                value={newMember.motivation || ""}
                onChange={(e) => setNewMember({ ...newMember, motivation: e.target.value })}
                className="bg-white/5 border-white/20 text-white placeholder:text-blue-300"
                placeholder={t.steps.step3.motivationPlaceholder}
              />
            </div>

            <Button
              onClick={addTeamMember}
              disabled={!newMember.name || !newMember.role}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.steps.step3.addButton}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-between"
      >
        <Button
          onClick={onPrev}
          variant="outline"
          size="lg"
          className="px-8 py-3 border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          {t.steps.step3.prevButton}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isComplete}
          size="lg"
          className={`
            px-8 py-3 font-semibold transition-all duration-300
            ${
              isComplete
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          {t.steps.step3.nextButton}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>

      {!isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-yellow-400 text-sm">{t.steps.step3.completionMessage}</p>
        </motion.div>
      )}
    </div>
  )
}
