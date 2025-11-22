"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { translations, countryToLanguage } from "@/lib/translations"

interface VideoOverlayProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  lockerUrl: string
  gameName: string
}

export function VideoOverlay({ isOpen, onClose, onContinue, lockerUrl, gameName }: VideoOverlayProps) {
  const [language, setLanguage] = useState<string>("en")
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const detectLanguage = async () => {
      try {
        let countryCode = null
        try {
          const response = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(5000) })
          if (response.ok) {
            const data = await response.json()
            countryCode = data.country_code?.toLowerCase()
          }
        } catch (error) {}

        if (!countryCode) {
          try {
            const response = await fetch("https://freegeoip.app/json/", { signal: AbortSignal.timeout(5000) })
            if (response.ok) {
              const data = await response.json()
              countryCode = data.country_code?.toLowerCase()
            }
          } catch (error) {}
        }

        const detectedLanguage = countryCode ? countryToLanguage[countryCode] || "en" : "en"
        setLanguage(detectedLanguage)
      } catch {
        setLanguage("en")
      }
    }

    detectLanguage()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    setIsButtonEnabled(false)
    let secondsElapsed = 0
    timerRef.current = setInterval(() => {
      secondsElapsed += 1
      if (secondsElapsed >= 50) { // Changed from 60 → 50
        setIsButtonEnabled(true)
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isOpen])

  const handleContinue = () => {
    if (isButtonEnabled) {
      onContinue()
      setTimeout(() => {
        window.location.href = lockerUrl
      }, 300)
    }
  }

  const currentTranslation = translations[language] || translations.en

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md sm:max-w-2xl h-full sm:h-[95vh] bg-card border border-border/50 rounded-none sm:rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border/50 px-3 py-2 sm:py-3 text-center flex-shrink-0">
          <h1 className="text-sm sm:text-xl font-bold text-foreground truncate">{currentTranslation.title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Script: <span className="font-semibold text-primary">{gameName}</span>
          </p>
        </header>

        {/* Video fills remaining space */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <iframe
            src="https://streamable.com/e/3meq0b?nocontrols=0"
            allowFullScreen
            title="Premium Scripts Tutorial"
            className="w-full h-full"
            style={{ border: "none", display: "block" }}
          />
        </div>

        {/* Button */}
        <footer className="border-t border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-3 sm:py-4 flex-shrink-0">
          <Button
            onClick={handleContinue}
            disabled={!isButtonEnabled}
            className={`w-full font-bold py-3 sm:py-4 rounded-lg transition-all duration-300 ${
              isButtonEnabled
                ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:scale-105 text-white shadow-lg text-base sm:text-lg"
                : "bg-gray-600 cursor-not-allowed text-gray-300 text-base sm:text-lg"
            }`}
          >
            {currentTranslation.button}
          </Button>
        </footer>
      </div>
    </div>
  )
}
