"use client"

import { useState, use } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeContainer, ThemeBody } from "@/components/ui/theme-container"
import { Globe, Send, CheckCircle, Loader2 } from "lucide-react"
import { contactFormSchema, ContactFormData, subjects } from "@/lib/contact-schema"

// Import dynamique du Select pour éviter les problèmes d'hydratation
const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  { ssr: false }
)
const SelectContent = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectContent),
  { ssr: false }
)
const SelectItem = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectItem),
  { ssr: false }
)
const SelectTrigger = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectTrigger),
  { ssr: false }
)
const SelectValue = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectValue),
  { ssr: false }
)

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

const translations = {
  fr: {
    title: "Nous contacter",
    subtitle: "Une question ? Une suggestion ? Écrivez-nous !",
    contactInfo: "Informations de contact",
    organizations: {
      aheadAfrica: "AHEAD Africa",
      africtivistes: "AfricTivistes",
      ddi: "Digital Democracy Initiative",
    },
    form: {
      name: "Nom complet",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      organization: "Organisation (optionnel)",
      organizationPlaceholder: "Nom de votre organisation",
      subject: "Sujet",
      subjectPlaceholder: "Sélectionnez un sujet",
      message: "Message",
      messagePlaceholder: "Votre message...",
      privacy: "J'accepte la politique de confidentialité",
      submit: "Envoyer le message",
      sending: "Envoi en cours...",
    },
    success: {
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
      button: "Envoyer un autre message",
    },
    errors: {
      required: "Ce champ est requis",
      email: "Veuillez entrer une adresse email valide",
      message: "Le message doit contenir au moins 10 caractères",
      privacy: "Vous devez accepter la politique de confidentialité",
      submit: "Une erreur est survenue. Veuillez réessayer.",
    },
  },
  en: {
    title: "Contact Us",
    subtitle: "Have a question? A suggestion? Get in touch!",
    contactInfo: "Contact Information",
    organizations: {
      aheadAfrica: "AHEAD Africa",
      africtivistes: "AfricTivistes",
      ddi: "Digital Democracy Initiative",
    },
    form: {
      name: "Full name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      organization: "Organization (optional)",
      organizationPlaceholder: "Your organization name",
      subject: "Subject",
      subjectPlaceholder: "Select a subject",
      message: "Message",
      messagePlaceholder: "Your message...",
      privacy: "I accept the privacy policy",
      submit: "Send message",
      sending: "Sending...",
    },
    success: {
      title: "Message sent!",
      description: "We will get back to you as soon as possible.",
      button: "Send another message",
    },
    errors: {
      required: "This field is required",
      email: "Please enter a valid email address",
      message: "Message must be at least 10 characters",
      privacy: "You must accept the privacy policy",
      submit: "An error occurred. Please try again.",
    },
  },
} as const

export default function ContactPage({ params }: ContactPageProps) {
  const { lang } = use(params)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const t = translations[lang as keyof typeof translations] || translations.en

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      subject: "",
      message: "",
      privacyAccepted: false,
    },
  })

  const privacyAccepted = watch("privacyAccepted")

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.error || t.errors.submit)
      }
    } catch {
      setSubmitError(t.errors.submit)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      name: t.organizations.aheadAfrica,
      email: "contact@aheadafrica.org",
      website: "aheadafrica.org",
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      name: t.organizations.africtivistes,
      email: "contact@africtivistes.org",
      website: "africtivistes.org",
      gradient: "from-emerald-400 to-green-500",
    },
    {
      name: t.organizations.ddi,
      email: "",
      website: "https://digitaldemocracyinitiative.net/",
      gradient: "from-violet-400 to-purple-500",
    },
  ]

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Header lang={lang} />
        <main className="flex items-center justify-center min-h-[calc(100vh-200px)] py-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.success.title}
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
              {t.success.description}
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white"
            >
              {t.success.button}
            </Button>
          </motion.div>
        </main>
        <Footer lang={lang} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />

      <main>
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4">
                {t.title}
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <ThemeContainer theme="contact" variant="highlight" animate>
                <h2 className="text-2xl font-bold text-white mb-8">
                  {t.contactInfo}
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((org, index) => (
                    <motion.div
                      key={org.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${org.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{org.name}</h3>
                        {org.email && (
                          <a 
                            href={`mailto:${org.email}`}
                            className="text-slate-300 hover:text-blue-400 transition-colors text-sm"
                          >
                            {org.email}
                          </a>
                        )}
                        <a 
                          href={`https://${org.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-slate-400 hover:text-blue-400 transition-colors text-sm"
                        >
                          {org.website}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ThemeContainer>

              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-200">
                        {t.form.name} <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder={t.form.namePlaceholder}
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200">
                        {t.form.email} <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder={t.form.emailPlaceholder}
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization" className="text-slate-200">
                        {t.form.organization}
                      </Label>
                      <Input
                        id="organization"
                        {...register("organization")}
                        placeholder={t.form.organizationPlaceholder}
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-200">
                        {t.form.subject} <span className="text-red-400">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => setValue("subject", value)}
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20">
                          <SelectValue placeholder={t.form.subjectPlaceholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          {subjects[lang as keyof typeof subjects]?.map((subj) => (
                            <SelectItem
                              key={subj.value}
                              value={subj.value}
                              className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                            >
                              {subj.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-red-400 text-sm">{errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-200">
                        {t.form.message} <span className="text-red-400">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder={t.form.messagePlaceholder}
                        rows={5}
                        className="bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy"
                        checked={privacyAccepted}
                        onCheckedChange={(checked) =>
                          setValue("privacyAccepted", checked as boolean)
                        }
                        className="mt-1 border-white/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <div className="space-y-1">
                        <Label htmlFor="privacy" className="text-slate-300 text-sm cursor-pointer">
                          {t.form.privacy}
                        </Label>
                        {errors.privacyAccepted && (
                          <p className="text-red-400 text-sm">{errors.privacyAccepted.message}</p>
                        )}
                      </div>
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm">{submitError}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold py-6 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t.form.sending}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          {t.form.submit}
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
