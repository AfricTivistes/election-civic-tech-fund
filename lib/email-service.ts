import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  name: string
  email: string
  organization?: string
  subject: string
  message: string
}

export async function sendContactEmail(data: EmailData, lang: string = "fr") {
  const { name, email, organization, subject, message } = data

  const subjectLabels: Record<string, Record<string, string>> = {
    fr: {
      general: "Question générale",
      project: "À propos d'un projet",
      partnership: "Proposition de partenariat",
      media: "Demande média/presse",
      other: "Autre",
    },
    en: {
      general: "General question",
      project: "About a project",
      partnership: "Partnership proposal",
      media: "Media/press inquiry",
      other: "Other",
    },
  }

  const subjectLabel = subjectLabels[lang]?.[subject] || subjectLabels.en[subject] || subject

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e293b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
        Nouveau message de contact
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>Nom :</strong> ${name}</p>
        <p style="margin: 10px 0;"><strong>Email :</strong> ${email}</p>
        ${organization ? `<p style="margin: 10px 0;"><strong>Organisation :</strong> ${organization}</p>` : ""}
        <p style="margin: 10px 0;"><strong>Sujet :</strong> ${subjectLabel}</p>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h3 style="color: #475569; margin-top: 0;">Message :</h3>
        <p style="color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
        <p>Ce message a été envoyé depuis le formulaire de contact du site Election Civic Tech Fund.</p>
        <p>Date : ${new Date().toLocaleString(lang === "fr" ? "fr-FR" : "en-US")}</p>
      </div>
    </div>
  `

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "contact@election-civic-tech-fund.org",
      to: process.env.RESEND_TO_EMAIL || "info@ahead.africa",
      replyTo: email,
      subject: `[Election Civic Tech Fund] ${subjectLabel} - ${name}`,
      html: htmlContent,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error("Error sending email:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send email" 
    }
  }
}
