"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Mail, MapPin, Phone, Globe, Send, CheckCircle } from "lucide-react"

interface ContactPageProps {
  params: { lang: string }
}

export default function ContactPage({ params }: ContactPageProps) {
  const { lang } = params
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
    privacyAccepted: false,
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const t = {
    fr: {
      title: "Nous contacter",
      subtitle: "Une question ? Une suggestion ? Écrivez-nous !",
      contactInfo: "Informations de contact",
      aheadAfrica: "AHEAD Africa",
      africtivistes: "AfricTivistes",
      ddi: "Digital Democracy Initiative",
      form: {
        name: "Nom complet *",
        email: "Email *",
        organization: "Organisation",
        subject: "Sujet *",
        message: "Message *",
        privacy: "J'accepte la politique de confidentialité",
        submit: "Envoyer",
        sending: "Envoi en cours...",
        success: "Votre message a été envoyé avec succès !",
        error: "Une erreur est survenue. Veuillez réessayer.",
      },
      subjects: [
        { value: "general", label: "Question générale" },
        { value: "project", label: "À propos d'un projet" },
        { value: "partnership", label: "Proposition de partenariat" },
        { value: "media", label: "Demande média/presse" },
        { value: "other", label: "Autre" },
      ],
      required: "Champs obligatoires",
    },
    en: {
      title: "Contact Us",
      subtitle: "A question? A suggestion? Write to us!",
      contactInfo: "Contact Information",
      aheadAfrica: "AHEAD Africa",
      africtivistes: "AfricTivistes",
      ddi: "Digital Democracy Initiative",
      form: {
        name: "Full name *",
        email: "Email *",
        organization: "Organization",
        subject: "Subject *",
        message: "Message *",
        privacy: "I accept the privacy policy",
        submit: "Send",
        sending: "Sending...",
        success: "Your message has been sent successfully!",
        error: "An error occurred. Please try again.",
      },
      subjects: [
        { value: "general", label: "General question" },
        { value: "project", label: "About a project" },
        { value: "partnership", label: "Partnership proposal" },
        { value: "media", label: "Media/press inquiry" },
        { value: "other", label: "Other" },
      ],
      required: "Required fields",
    },
  }

  const text = t[lang as "fr" | "en"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({
          name: "",
          email: "",
          organization: "",
          subject: "",
          message: "",
          privacyAccepted: false,
        })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header lang={lang} />

      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 mb-4">
                {text.title}
              </h1>
              <p className="text-xl text-blue-200">
                {text.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {text.contactInfo}
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{text.aheadAfrica}</h3>
                        <p className="text-blue-200 text-sm">contact@aheadafrica.org</p>
                        <p className="text-blue-300 text-sm">aheadafrica.org</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{text.africtivistes}</h3>
                        <p className="text-blue-200 text-sm">contact@africtivistes.org</p>
                        <p className="text-blue-300 text-sm">africtivistes.org</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{text.ddi}</h3>
                        <p className="text-blue-300 text-sm">ddi.org</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8">
                  {status === "success" ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">
                        {text.form.success}
                      </h3>
                      <Button
                        onClick={() => setStatus("idle")}
                        variant="outline"
                        className="mt-4"
                      >
                        {lang === "fr" ? "Envoyer un autre message" : "Send another message"}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          {text.form.name}
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">
                          {text.form.email}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="organization" className="text-white">
                          {text.form.organization}
                        </Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData({ ...formData, organization: e.target.value })
                          }
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-white">
                          {text.form.subject}
                        </Label>
                        <select
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          required
                          className="w-full bg-white/5 border-white/20 text-white rounded-md px-3 py-2"
                        >
                          <option value="">
                            {lang === "fr" ? "Sélectionnez un sujet" : "Select a subject"}
                          </option>
                          {text.subjects.map((subj) => (
                            <option key={subj.value} value={subj.value}>
                              {subj.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-white">
                          {text.form.message}
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          required
                          rows={5}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="privacy"
                          checked={formData.privacyAccepted}
                          onChange={(e) =>
                            setFormData({ ...formData, privacyAccepted: e.target.checked })
                          }
                          required
                          className="w-4 h-4 rounded border-white/20"
                        />
                        <Label htmlFor="privacy" className="text-blue-200 text-sm">
                          {text.form.privacy}
                        </Label>
                      </div>

                      {status === "error" && (
                        <p className="text-red-400 text-sm">{text.form.error}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold"
                      >
                        {status === "submitting" ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {text.form.sending}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Send className="w-4 h-4 mr-2" />
                            {text.form.submit}
                          </span>
                        )}
                      </Button>

                      <p className="text-xs text-blue-300 text-center">
                        {text.required}
                      </p>
                    </form>
                  )}
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
