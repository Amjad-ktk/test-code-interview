"use client"

import { useState, useEffect } from "react"

export function useBrowserSupport() {
  const [support, setSupport] = useState({
    supportsFullscreen: false,
    supportsVisibilityAPI: false,
    supportsPostMessage: false,
    supportsResizeObserver: false,
    isCompatible: false,
  })

  useEffect(() => {
    // Check fullscreen support
    const supportsFullscreen = !!(
      document.documentElement.requestFullscreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.mozRequestFullScreen ||
      document.documentElement.msRequestFullscreen
    )

    // Check Visibility API support
    const supportsVisibilityAPI = typeof document.hidden !== "undefined"

    // Check postMessage support
    const supportsPostMessage = typeof window.postMessage === "function"

    // Check ResizeObserver support
    const supportsResizeObserver = typeof window.ResizeObserver === "function"

    // Determine overall compatibility
    const isCompatible = supportsFullscreen && supportsVisibilityAPI && supportsPostMessage

    setSupport({
      supportsFullscreen,
      supportsVisibilityAPI,
      supportsPostMessage,
      supportsResizeObserver,
      isCompatible,
    })
  }, [])

  return support
}
