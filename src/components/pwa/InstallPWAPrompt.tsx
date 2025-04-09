"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export const InstallPWAPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [deviceInfo, setDeviceInfo] = useState<{
    os: "ios" | "android" | "other"
    browser: "chrome" | "firefox" | "safari" | "samsung" | "edge" | "opera" | "other"
  }>({ os: "other", browser: "other" })

  useEffect(() => {
    // Don't show on larger screens
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches
    if (isLargeScreen) return

    // Check if hidden by user preference
    const hideUntil = localStorage.getItem('pwaPromptHideUntil')
    if (hideUntil && Number(hideUntil) > Date.now()) {
      return
    }

    // Check if the app is already installed
    const isInstalled = window.matchMedia("(display-mode: standalone)").matches
    if (isInstalled) return

    // Detect OS and browser
    const userAgent = navigator.userAgent.toLowerCase()
    const isIos = /ipad|iphone|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)

    let browser = "other"
    if (/chrome/.test(userAgent) && !/edg/.test(userAgent) && !/opr/.test(userAgent) && !/samsung/.test(userAgent)) {
      browser = "chrome"
    } else if (/firefox/.test(userAgent)) {
      browser = "firefox"
    } else if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) {
      browser = "safari"
    } else if (/edg/.test(userAgent)) {
      browser = "edge"
    } else if (/opr/.test(userAgent)) {
      browser = "opera"
    } else if (/samsung/.test(userAgent)) {
      browser = "samsung"
    }

    setDeviceInfo({
      os: isIos ? "ios" : isAndroid ? "android" : "other",
      browser: browser as "chrome" | "firefox" | "safari"
    })

    const handler = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEvent
      e.preventDefault()
      setDeferredPrompt(promptEvent)
      setShowPrompt(true)
    }

    // Show prompt for iOS devices
    if (isIos) {
      setShowPrompt(true)
      return
    }

    // For Android and other devices, wait for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      setShowPrompt(false)
      return
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setShowPrompt(false)
      }
    } catch (error) {
      console.error("Installation failed:", error)
    } finally {
      setDeferredPrompt(null)
    }
  }

  const handleNotNow = () => {
    setShowConfirmation(true)
  }

  const getInstallInstructions = () => {
    const { os, browser } = deviceInfo

    if (os === "ios") {
      return (
        <span className="">
          To install our app, tap the share button at the bottom of the screen and select <strong>Add to Home screen</strong>.
        </span>
      )
    }

    if (os === "android") {
      switch (browser) {
        case "chrome":
          
          return 'Tap the menu (⋮) in the top right, then select "Install app" or "Add to Home screen"'
        case "firefox":
          return 'Tap the menu (⋮) in the top right, then select "Install" or "Add to Home screen"'
        case "samsung":
          return 'Tap the menu (⋮) in the bottom right, then select "Add page to" and "Home screen"'
        case "edge":
          return 'Tap the menu (…) in the bottom, then select "Add to phone" and "Install"'
        case "opera":
          return 'Tap the menu (≡) at the bottom, then select "Home screen"'
        default:
          return 'Tap the browser menu, then look for "Add to Home screen" or "Install app" option'
      }
    }

    return "Install our app for a better shopping experience with faster checkout and easy access to your cart!"
  }

  const canUseInstallButton = deviceInfo.os !== "ios" && !!deferredPrompt

  const handleConfirmHide = () => {
    const hideUntil = Date.now() + (48 * 60 * 60 * 1000) // 48 hours in milliseconds
    localStorage.setItem('pwaPromptHideUntil', hideUntil.toString())
    setShowPrompt(false)
    setShowConfirmation(false)
  }

  if (!showPrompt) return null

  if (showConfirmation) {
    return (
      <div className="fixed bottom-4 left-4 right-4 border bg-white rounded-xl shadow-lg p-4 z-50 max-w-md mx-auto">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium">Hide Installation Prompt?</h3>
          <button onClick={() => setShowConfirmation(false)} className="p-1">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Would you like to hide this prompt for 48 hours?
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleConfirmHide}
            className="flex-1 bg-[#184193] text-white py-2 rounded-full font-medium"
          >
            Yes, hide it
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex-1 border border-gray-200 py-2 rounded-full font-medium"
          >
            No, keep it
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 border bg-white rounded-xl shadow-lg p-4 z-50 max-w-md mx-auto hidden md:block lg:hidden">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">Install Steadfast App</h3>
        <button onClick={() => setShowPrompt(false)} className="p-1">
          <X size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">{getInstallInstructions()}</p>
      <div className="flex gap-3">
        {canUseInstallButton ? (
          <button onClick={handleInstall} className="flex-1 bg-[#184193] text-white py-2 rounded-full font-medium">
            Install
          </button>
        ) : (
          <button
            onClick={() => setShowPrompt(false)}
            className="flex-1 bg-[#184193] text-white py-2 rounded-full font-medium"
          >
            Got it
          </button>
        )}
        <button
          onClick={handleNotNow}
          className="flex-1 border border-gray-200 py-2 rounded-full font-medium"
        >
          Not now
        </button>
      </div>
    </div>
  )
}

