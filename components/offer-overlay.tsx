"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, ExternalLink, Star } from "lucide-react"
import { fetchOffers, getUserIP, type Offer } from "@/lib/offer-api"
import { ProgressBar } from "@/components/progress-bar"
import Image from "next/image"
import { detectCountryAndGetLanguage, getTranslation } from "@/lib/country-translator"

interface OfferOverlayProps {
  isOpen: boolean
  onClose: () => void
  gameName: string
  gameLogo: string
  onOfferComplete: () => void
}

const difficultyConfig = {
  "VERY EASY": {
    color: "rgba(77, 255, 77, 0.3)",
    borderColor: "#4dff4d",
    textColor: "#4dff4d",
    icon: Star,
  },
}

export function OfferOverlay({ isOpen, onClose, gameName, gameLogo, onOfferComplete }: OfferOverlayProps) {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<string>("en")
  const [tasksCompleted, setTasksCompleted] = useState(0)
  const [completedOffers, setCompletedOffers] = useState<Set<string>>(new Set())
  const [showDownloadLink, setShowDownloadLink] = useState(false)
  const [scriptUrl, setScriptUrl] = useState<string>("")
  const [offerTimers, setOfferTimers] = useState<{ [key: string]: NodeJS.Timeout | null }>({})

  useEffect(() => {
    const initLanguage = async () => {
      const detectedLanguage = await detectCountryAndGetLanguage()
      setLanguage(detectedLanguage)
    }
    initLanguage()
  }, [])

  useEffect(() => {
    if (isOpen) {
      loadOffers()
      setTasksCompleted(0)
      setCompletedOffers(new Set())
      setShowDownloadLink(false)
    }
  }, [isOpen])

  const loadOffers = async () => {
    setLoading(true)
    setError(null)

    try {
      const userIP = await getUserIP()
      const userAgent = typeof window !== "undefined" ? navigator.userAgent : "Mozilla/5.0"
      const response = await fetchOffers(userIP, userAgent, 6)

      if (response && response.success) {
        setOffers(response.offers || [])
      } else {
        setError(getTranslation(language, "failed_to_load"))
      }
    } catch (err) {
      setError(getTranslation(language, "failed_to_load"))
      console.error("Error loading offers:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleOfferClick = async (offer: Offer, offerIndex: number) => {
    if (completedOffers.has(offer.id)) return

    // Only allow completing up to 3 tasks
    if (tasksCompleted >= 3) {
      return
    }

    try {
      // Send completion notification to API
      const response = await fetch("/api/offer-completed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer_id: offer.id,
          user_ip: "0.0.0.0",
          user_agent: navigator.userAgent,
          status: "completed",
          game_name: gameName,
        }),
      })

      const data = await response.json()
      if (data.success && data.scriptUrl) {
        setScriptUrl(data.scriptUrl)
      }
    } catch (err) {
      console.error("Error getting script URL:", err)
    }

    // Open offer in new tab
    window.open(offer.url, "_blank", "noopener,noreferrer")

    // Mark offer as completed immediately
    const newCompleted = new Set(completedOffers)
    newCompleted.add(offer.id)
    setCompletedOffers(newCompleted)

    const timer = setTimeout(() => {
      setTasksCompleted((prev) => {
        const newCount = prev + 1
        // Show download link when all 3 tasks are completed
        if (newCount === 3) {
          setShowDownloadLink(true)
        }
        return newCount
      })
    }, 30000)

    setOfferTimers((prev) => ({
      ...prev,
      [offer.id]: timer,
    }))
  }

  return (
    <>
      <style jsx>{`
        @keyframes goldGlow {
          0%, 100% {
            color: #ffcc00;
            text-shadow: 0 0 6px #ffcc00, 0 0 12px rgba(255,204,0,0.7);
          }
          50% {
            color: #fff4c2;
            text-shadow: 0 0 12px #ffcc00, 0 0 24px rgba(255,215,0,0.9);
          }
        }
        
        .gold-glow {
          animation: goldGlow 1.2s ease-in-out infinite;
        }
      `}</style>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-border/50 animate-in fade-in-0 zoom-in-95 duration-300 relative sm:max-w-lg md:max-w-2xl lg:max-w-4xl !fixed !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2"
          showCloseButton={false}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <span className="text-red-400 text-lg font-bold">×</span>
          </button>

          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {getTranslation(language, "unlock_premium").toUpperCase()}
            </DialogTitle>

            {/* Game Info Card */}
            <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border/50 animate-in slide-in-from-top-4 duration-500">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-primary/20">
                <Image src={gameLogo || "/placeholder.svg"} alt={gameName} fill className="object-cover" unoptimized />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">
                  {getTranslation(language, "complete_3_tasks").replace("get", "")} {gameName}{" "}
                  <span className="gold-glow font-black">premium scripts</span>{" "}
                  {getTranslation(language, "instantly") || "instantly"}!
                </p>
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <ProgressBar completed={tasksCompleted} total={3} language={language} />
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {showDownloadLink && (
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg animate-in fade-in-0 zoom-in-95 duration-500">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-green-500">✓</div>
                  <p className="text-lg font-semibold text-foreground">
                    {getTranslation(language, "all_tasks_completed")}
                  </p>
                  <Button
                    onClick={() => {
                      if (scriptUrl) {
                        window.open(scriptUrl, "_blank")
                      }
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-white font-semibold"
                    size="lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {getTranslation(language, "download_scripts")}
                  </Button>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-muted-foreground">{getTranslation(language, "loading_offers")}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={loadOffers} variant="outline">
                  {getTranslation(language, "try_again")}
                </Button>
              </div>
            )}

            {!loading && !error && offers && offers.length > 0 && (
              <>
                <div className="grid gap-4">
                  {offers.slice(0, 6).map((offer, index) => {
                    const isCompleted = completedOffers.has(offer.id)
                    const isDisabled = tasksCompleted >= 3
                    const config = difficultyConfig["VERY EASY"]

                    return (
                      <Card
                        key={offer.id}
                        className={`group relative overflow-hidden border-border/50 transition-all duration-500 animate-in slide-in-from-bottom-4 duration-700 ${
                          isCompleted
                            ? "bg-green-500/10 border-green-500/30 opacity-60 cursor-not-allowed"
                            : isDisabled
                              ? "bg-card/30 border-border/20 opacity-50 cursor-not-allowed"
                              : "bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute top-3 right-3 z-10">
                          <div
                            className="text-xs font-bold px-2 py-1 rounded-lg border whitespace-nowrap"
                            style={{
                              background: config.color,
                              color: config.textColor,
                              borderColor: config.borderColor,
                              fontSize: "10px",
                              padding: "2px 8px",
                              borderRadius: "8px",
                              border: `1px solid ${config.borderColor}`,
                            }}
                          >
                            {getTranslation(language, "very_easy")}
                          </div>
                        </div>

                        {/* Completed checkmark */}
                        {isCompleted && (
                          <div className="absolute top-3 left-3 z-10">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <span className="text-white text-sm font-bold">✓</span>
                            </div>
                          </div>
                        )}

                        <div className="p-6 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border/50 flex-shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20">
                              <Image
                                src={offer.icon || "/placeholder.svg"}
                                alt={offer.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                unoptimized
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "https://cdn-icons-png.flaticon.com/512/888/888857.png"
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                {offer.title}
                              </h4>
                              <p
                                className="text-sm font-semibold mt-1"
                                style={{
                                  color: "#00ff88",
                                  textShadow: "0 0 8px #00ff88, 0 0 16px rgba(0,255,136,0.6)",
                                }}
                              >
                                {offer.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>
                              {getTranslation(language, "reward")} {offer.reward}
                            </span>
                          </div>

                          <Button
                            onClick={() => handleOfferClick(offer, index)}
                            disabled={isCompleted || isDisabled}
                            className={`w-full font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                              isCompleted
                                ? "bg-gray-500 opacity-50 cursor-not-allowed"
                                : isDisabled
                                  ? "bg-gray-500 opacity-50 cursor-not-allowed"
                                  : "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                            }`}
                            size="lg"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {isCompleted
                              ? getTranslation(language, "task_completed")
                              : getTranslation(language, "start_task")}
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}

            {!loading && !error && offers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">{getTranslation(language, "no_offers")}</p>
                <Button onClick={loadOffers} variant="outline">
                  {getTranslation(language, "refresh")}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
