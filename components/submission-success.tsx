"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  Sparkles, 
  Calendar, 
  Mail, 
  Download, 
  Share2, 
  ArrowRight,
  Trophy,
  Users,
  FileText,
  Clock
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface SubmissionSuccessProps {
  projectData: any
  onNewSubmission: () => void
  onDownloadSummary?: () => void
}

export default function SubmissionSuccess({ 
  projectData, 
  onNewSubmission, 
  onDownloadSummary 
}: SubmissionSuccessProps) {
  const { t } = useLanguage()
  const [showConfetti, setShowConfetti] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setData(projectData)
  }, [projectData])

  const nextSteps = [
    {
      icon: Mail,
      title: "Confirmation par email",
      description: "Vous recevrez un email de confirmation sous 24h",
      timeframe: "24h",
      status: "pending"
    },
    {
      icon: Users,
      title: "Évaluation par le comité",
      description: "Nos experts évalueront votre projet",
      timeframe: "2-3 semaines",
      status: "upcoming"
    },
    {
      icon: Trophy,
      title: "Résultats et financement",
      description: "Notification des projets sélectionnés",
      timeframe: "4-6 semaines",
      status: "upcoming"
    }
  ]

  const projectStats = [
    {
      label: "Score d'impact",
      value: data?.formData?.technology?.impactScore || data?.technology?.impactScore || 0,
      max: 100,
      color: "from-green-400 to-emerald-500"
    },
    {
      label: "Score de completion",
      value: data?.formData?.details?.completionScore || data?.details?.completionScore || 0,
      max: 100,
      color: "from-blue-400 to-cyan-500"
    },
    {
      label: "Financement demandé",
      value: `${data?.formData?.funding?.fundingAmount || data?.funding?.fundingAmount || 0}€`,
      max: null,
      color: "from-yellow-400 to-orange-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <motion.div
          className="absolute -top-4 -left-4 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Effet confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 10,
                x: Math.random() * window.innerWidth,
                opacity: 0,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header de confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-2xl"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            🎉 Félicitations !
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-blue-200 mb-2"
          >
            Votre projet a été soumis avec succès
          </motion.p>
        </motion.div>

        {/* Prochaines étapes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Prochaines étapes de votre candidature
              </h2>

              <div className="space-y-6">
                {nextSteps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.2 }}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">{step.title}</h3>
                          <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.timeframe}
                          </Badge>
                        </div>
                        <p className="text-blue-200 text-sm">{step.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >

          <Button
            onClick={onNewSubmission}
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8"
          >
            Nouveau projet
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

      </div>
    </div>
  )
}