"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Script } from "@/lib/scripts-data"
import Image from "next/image"
import { useState } from "react"
import { VideoOverlay } from "./video-overlay"

interface ScriptCardProps {
  script: Script
}

export function ScriptCard({ script }: ScriptCardProps) {
  const [isPreparing, setIsPreparing] = useState(false)
  const [showVideoOverlay, setShowVideoOverlay] = useState(false)

  const handleCardClick = async () => {
    if (isPreparing) return

    setIsPreparing(true)

    // Show video overlay instead of direct redirect
    setShowVideoOverlay(true)

    setIsPreparing(false)
  }

  const handleVideoClose = () => {
    setShowVideoOverlay(false)
  }

  const handleVideoContinue = () => {
    setShowVideoOverlay(false)
  }

  return (
    <>
      <style jsx>{`
        @keyframes greenGlow {
          0%, 100% {
            color: #00ff88;
            text-shadow: 0 0 8px #00ff88, 0 0 16px rgba(0, 255, 136, 0.6);
          }
          50% {
            color: #33ffaa;
            text-shadow: 0 0 16px #00ff88, 0 0 32px rgba(0, 255, 136, 0.8);
          }
        }

        .green-glow {
          animation: greenGlow 2s ease-in-out infinite;
        }
      `}</style>

      <Card
        className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col h-full"
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />

        <div className="relative w-full aspect-video bg-muted overflow-hidden">
          <Image
            src={script.thumbnailUrl || "/placeholder.svg"}
            alt={script.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>

        <div className="relative p-4 sm:p-5 space-y-3 flex-1 flex flex-col">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {script.name}
            </h3>
            <p className="text-xs sm:text-sm text-primary font-semibold">{script.game}</p>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {script.description}
          </p>

          <Button
            className={`w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 text-sm py-5 font-semibold mt-auto ${
              isPreparing ? "animate-pulse" : ""
            }`}
            disabled={isPreparing}
            onClick={handleCardClick}
          >
            <Download className={`w-4 h-4 mr-2 ${isPreparing ? "animate-spin" : ""}`} />
            {isPreparing ? "Preparing..." : "Get Script"}
          </Button>
        </div>
      </Card>

      <VideoOverlay
        isOpen={showVideoOverlay}
        onClose={handleVideoClose}
        onContinue={handleVideoContinue}
        lockerUrl={script.lockerUrl}
        gameName={script.name}
      />
    </>
  )
}
