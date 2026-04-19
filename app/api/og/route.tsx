import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "Election Civic Tech Fund"
  const description = searchParams.get("description") || "Soutenir l'innovation civique électorale en Afrique"
  const lang = searchParams.get("lang") || "fr"

  const tagline = lang === "fr"
    ? "14 pays · €175 000 · Innovation électorale"
    : "14 countries · €175,000 · Electoral Innovation"

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(250, 204, 21, 0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.08)",
            display: "flex",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "40px 60px 0",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#facc15",
                display: "flex",
              }}
            />
            <span style={{ color: "#facc15", fontSize: "16px", fontWeight: 600, letterSpacing: "2px" }}>
              AFRICTIVISTES
            </span>
          </div>
          <span style={{ color: "#94a3b8", fontSize: "14px" }}>
            electioncivictechfund.africtivistes.com
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "40px 60px 50px",
            justifyContent: "center",
          }}
        >
          {/* Tagline badge */}
          <div
            style={{
              display: "flex",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                background: "rgba(250, 204, 21, 0.15)",
                border: "1px solid rgba(250, 204, 21, 0.4)",
                color: "#facc15",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {tagline}
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 50 ? "44px" : "56px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "24px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              lineHeight: 1.5,
              maxWidth: "800px",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 60px 40px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "4px",
                height: "40px",
                background: "linear-gradient(to bottom, #facc15, #3b82f6)",
                borderRadius: "2px",
                display: "flex",
              }}
            />
            <span style={{ color: "#e2e8f0", fontSize: "18px", fontWeight: 700 }}>
              Election Civic Tech Fund
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#facc15", display: "flex" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#3b82f6", display: "flex" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", display: "flex" }} />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
