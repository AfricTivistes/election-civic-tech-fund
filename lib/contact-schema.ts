import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  organization: z.string().optional(),
  subject: z.string().min(1, {
    message: "Veuillez sélectionner un sujet",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères",
  }),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const subjects = {
  fr: [
    { value: "general", label: "Question générale" },
    { value: "project", label: "À propos d'un projet" },
    { value: "partnership", label: "Proposition de partenariat" },
    { value: "media", label: "Demande média/presse" },
    { value: "other", label: "Autre" },
  ],
  en: [
    { value: "general", label: "General question" },
    { value: "project", label: "About a project" },
    { value: "partnership", label: "Partnership proposal" },
    { value: "media", label: "Media/press inquiry" },
    { value: "other", label: "Other" },
  ],
} as const
