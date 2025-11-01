"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { getTranslation } from "@/lib/country-translator"

interface CountdownTimerProps {
  durationSeconds?: number
  scriptUrl: string
  gameName: string
  gameLogo: string
  onComplete?: () => void
  language?: string
}

export function CountdownTimer({
  durationSeconds = 300,
  scriptUrl,
  gameName,
  gameLogo,
  onComplete,
  language = "en",
}: CountdownTimerProps) {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true)
      onComplete?.()
    }, durationSeconds * 1000)

    return () => clearTimeout(timer)
  }, [durationSeconds, onComplete])

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      {!isComplete && (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-foreground">{getTranslation(language, "checking_completion")}</p>
          <p className="text-sm text-muted-foreground">Waiting for verification...</p>
        </div>
      )}

      {isComplete && (
        <div className="w-full space-y-4 animate-in fade-in-0 zoom-in-95 duration-500">
          <div className="text-center animate-in fade-in-0 zoom-in-95 duration-500 mb-6">
            <div className="text-4xl font-bold text-green-500 mb-2">✓</div>
            <p className="text-lg font-semibold text-green-500">{getTranslation(language, "final_task")}</p>
            <p className="text-sm text-muted-foreground">Your scripts are ready</p>
          </div>

          {/* Game Info Card */}
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/50">
                <Image src={gameLogo || "/placeholder.svg"} alt={gameName} fill className="object-cover" unoptimized />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{gameName}</h3>
                <p className="text-sm text-muted-foreground">Premium Scripts Unlocked</p>
              </div>
            </div>
          </Card>

          {/* Download Button */}
          <Button
            onClick={() => window.open(scriptUrl, "_blank")}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-white font-semibold"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Premium Scripts
          </Button>
        </div>
      )}
    </div>
  )
}
