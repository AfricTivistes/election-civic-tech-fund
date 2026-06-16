interface YouTubeEmbedProps {
  url: string
  title?: string
  className?: string
}

function extractVideoId(url: string): { id: string; isShort: boolean } | null {
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
  if (shortsMatch) return { id: shortsMatch[1], isShort: true }

  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (watchMatch) return { id: watchMatch[1], isShort: false }

  return null
}

export function YouTubeEmbed({ url, title = "Video", className = "" }: YouTubeEmbedProps) {
  const video = extractVideoId(url)
  if (!video) return null

  const embedUrl = `https://www.youtube.com/embed/${video.id}`

  if (video.isShort) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="relative w-full max-w-[320px]" style={{ paddingTop: "177.78%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full rounded-xl overflow-hidden ${className}`} style={{ paddingTop: "56.25%" }}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
