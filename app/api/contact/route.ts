import { NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email-service"
import { rateLimit } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const data = await request.json()
    const { name, email, organization, subject, message, privacyAccepted } = data

    // Validation des champs requis
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validation de l'acceptation de la politique de confidentialité
    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "Privacy policy acceptance required" },
        { status: 400 }
      )
    }

    // Validation de la longueur du message
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      )
    }

    // Récupération de la langue depuis le header ou utilisation de l'anglais par défaut
    const lang = request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] || "en"

    // Tentative d'envoi de l'email
    const result = await sendContactEmail(
      {
        name,
        email,
        organization,
        subject,
        message,
      },
      lang
    )

    if (!result.success) {
      console.error("Email sending failed:", result.error)
      // En mode développement ou si Resend n'est pas configuré, on accepte quand même
      if (process.env.NODE_ENV === "development" || !process.env.RESEND_API_KEY) {
        console.log("Contact form submission (email not sent - dev mode or missing API key):", {
          name,
          email,
          organization,
          subject,
          message: message.substring(0, 100) + "...",
          timestamp: new Date().toISOString(),
        })
        return NextResponse.json(
          { 
            success: true, 
            message: "Message received (email service not configured)",
            dev: true 
          },
          { status: 200 }
        )
      }
      
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    console.log("Contact form submitted and email sent:", {
      name,
      email,
      subject,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
