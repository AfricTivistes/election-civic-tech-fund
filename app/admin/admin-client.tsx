"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    CMS_MANUAL_INIT?: boolean
    CMS?: {
      init: (config: { configPath: string }) => void
    }
  }
}

export default function AdminClient() {
  useEffect(() => {
    window.CMS_MANUAL_INIT = true

    const identityScript = document.createElement("script")
    identityScript.src = "https://unpkg.com/netlify-identity-widget@1.9.1/dist/netlify-identity-widget.js"
    identityScript.async = true
    document.head.appendChild(identityScript)

    const cmsScript = document.createElement("script")
    cmsScript.src = "https://unpkg.com/decap-cms@3.3.3/dist/decap-cms.js"
    cmsScript.async = true
    cmsScript.onload = () => {
      if (window.CMS) {
        window.CMS.init({ configPath: "/config.yml" })
      }
    }
    document.head.appendChild(cmsScript)

    return () => {
      identityScript.remove()
      cmsScript.remove()
    }
  }, [])

  return <div id="nc-root" />
}